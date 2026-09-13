import assert from "node:assert/strict";
import { cameraEase } from "./ease.ts";
import { closestIndex } from "./snap.ts";
import { SCALE_OUT, zoomFromScroll } from "./zoom.ts";

assert.equal(zoomFromScroll(0, 967), 1);
assert.equal(zoomFromScroll(967, 967), SCALE_OUT);
assert.equal(zoomFromScroll(2000, 967), SCALE_OUT);
assert.ok(zoomFromScroll(483.5, 967) > SCALE_OUT && zoomFromScroll(483.5, 967) < 1);
assert.equal(cameraEase(0), 0);
assert.equal(cameraEase(1), 1);
// snap spring hits most of the travel early (stiffness 1218 / damping 70)
assert.ok(cameraEase(0.5) > 0.7 && cameraEase(0.5) < 1);
assert.equal(closestIndex([0, 967, 1934], 0), 0);
assert.equal(closestIndex([0, 967, 1934], 960), 1);
assert.equal(closestIndex([0, 967, 1934], 2000), 2);
console.log("zoomFromScroll ok");
