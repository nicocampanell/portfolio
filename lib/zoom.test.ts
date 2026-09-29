import assert from "node:assert/strict";
import { cameraEase, cssTimeMs } from "./ease.ts";
import { cardScrollPos, closestIndex } from "./snap.ts";
import { SCALE_OUT, zoomFromScroll } from "./zoom.ts";
import { POSTCARD_FACES, POSTCARD_REST, postcardFold } from "./postcard-fold.ts";

assert.equal(zoomFromScroll(0, 967), 1);
assert.equal(zoomFromScroll(967, 967), SCALE_OUT);
assert.equal(zoomFromScroll(2000, 967), SCALE_OUT);
assert.ok(zoomFromScroll(483.5, 967) > SCALE_OUT && zoomFromScroll(483.5, 967) < 1);
assert.equal(cameraEase(0), 0);
assert.equal(cameraEase(1), 1);
assert.equal(cssTimeMs("500ms"), 500);
assert.equal(cssTimeMs(".5s"), 500);
assert.equal(cssTimeMs(" 0.5s "), 500);
// snap spring hits most of the travel early (stiffness 1218 / damping 70)
assert.ok(cameraEase(0.5) > 0.7 && cameraEase(0.5) < 1);
assert.equal(closestIndex([0, 967, 1934], 0), 0);
assert.equal(closestIndex([0, 967, 1934], 960), 1);
assert.equal(closestIndex([0, 967, 1934], 2000), 2);
const getStyle = globalThis.getComputedStyle;
globalThis.getComputedStyle = () => ({ zoom: "0.381696" }) as CSSStyleDeclaration;
const track = {} as HTMLElement;
assert.equal(
  cardScrollPos({ offsetLeft: 967, parentElement: track, offsetParent: track } as HTMLElement, {} as HTMLElement, false),
  967 * 0.381696,
);
globalThis.getComputedStyle = getStyle;
console.log("zoomFromScroll ok");
assert.equal(POSTCARD_REST, 0.99);

// Each folded triangle must settle exactly onto the desktop/mobile artwork.
for (const [width, height] of [[896, 582.4], [336, 520]]) {
  for (const face of POSTCARD_FACES) {
    const resting = postcardFold(face, POSTCARD_REST, width, height);
    assert.ok(resting.matrix.every(Number.isFinite));
    assert.ok(resting.matrix.some((value, i) => Math.abs(value - [1, 0, 0, 1, 0, 0][i]) > 1e-5));
    const flat = postcardFold(face, 1, width, height);
    flat.matrix.forEach((value, i) => {
      assert.ok(Math.abs(value - [1, 0, 0, 1, 0, 0][i]) < 1e-9);
    });
    assert.ok(Math.abs(flat.depth) < 1e-9);
    assert.equal(flat.shade, 1);
    for (let frame = 0; frame <= 30; frame++) {
      assert.ok(postcardFold(face, frame / 30, width, height).matrix.every(Number.isFinite));
    }
    const [a, b, c, d, e, f] = postcardFold(face, 0, width, height).matrix;
    for (const [x, y] of face) {
      const px = a * x * width + c * y * height + e;
      const py = b * x * width + d * y * height + f;
      assert.ok(Math.hypot(px - width / 2, py - height / 2) <= Math.min(width, height) * 0.083);
    }
  }
  assert.ok(POSTCARD_FACES.some(face => postcardFold(face, POSTCARD_REST, width, height).shade < 0.98));
}
console.log("postcard folds: compact ball, finite frames, exact flat finish ok");
