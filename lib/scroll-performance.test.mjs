import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { test } from "node:test";
import ts from "typescript";

function harness(source, hook) {
  const metrics = { styles: 0, offsets: 0, attributes: 0 };
  const events = new Map();
  const frames = new Map();
  const observers = [];
  let frameId = 0;
  let cleanup;
  const style = () => ({ setProperty() {}, removeProperty() {} });
  const wrapper = {
    scrollLeft: 0, style: style(),
    addEventListener: (type, fn) => events.set(type, fn),
    removeEventListener: (type) => events.delete(type),
  };
  const content = { children: [], style: style() };
  let spacing = 967;
  content.children = Array.from({ length: 7 }, (_, index) => ({
    style: style(), parentElement: content, offsetParent: content, focused: false,
    get offsetLeft() { metrics.offsets++; return index * spacing; },
    setAttribute() { metrics.attributes++; this.focused = true; },
    removeAttribute() { metrics.attributes++; this.focused = false; },
  }));
  const context = {
    innerWidth: 1280,
    document: { documentElement: {} },
    window: { addEventListener() {}, removeEventListener() {} },
    getComputedStyle: () => {
      metrics.styles++;
      return { zoom: "1", paddingInlineStart: "192", getPropertyValue: (key) => key === "--card" ? "896" : "71" };
    },
    requestAnimationFrame: (fn) => { const id = ++frameId; frames.set(id, fn); return id; },
    cancelAnimationFrame: (id) => frames.delete(id),
    ResizeObserver: class {
      constructor(fn) { observers.push(fn); }
      observe() {}
      disconnect() {}
    },
  };
  function load(text) {
    const module = { exports: {} };
    const require = (name) => {
      if (name === "react") return { useEffect: (fn) => { cleanup = fn(); } };
      if (name.includes("useNarrow")) return { useNarrow: () => false };
      if (name.includes("usePrefersReducedMotion")) return { usePrefersReducedMotion: () => false };
      if (name.startsWith("@/lib/")) return load(readFileSync(new URL(`../${name.slice(2)}.ts`, import.meta.url), "utf8"));
      throw new Error(`Unexpected module: ${name}`);
    };
    const js = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    runInNewContext(js, { ...context, module, exports: module.exports, require });
    return module.exports;
  }
  const hooks = load(source);
  if (hook === "useCameraZoom") hooks[hook]({ current: wrapper }, { current: content });
  else hooks[hook]({ current: content }, { current: wrapper });
  function flush() {
    for (let count = 0; frames.size; count++) {
      assert.ok(count < 500, "camera must settle instead of running forever");
      const pending = [...frames.values()]; frames.clear(); pending.forEach((fn) => fn());
    }
  }
  return {
    metrics, content, wrapper, flush,
    scroll(position) { wrapper.scrollLeft = position; events.get("scroll")?.(); flush(); },
    resize(step) { spacing = step; observers.forEach((fn) => fn()); flush(); },
    cleanup: () => cleanup(),
  };
}

const cameraSource = readFileSync(new URL("../hooks/useCameraZoom.ts", import.meta.url), "utf8");
const focusSource = readFileSync(new URL("../hooks/useCardFocus.ts", import.meta.url), "utf8");

export function measureScrollWork(camera = cameraSource, focus = focusSource) {
  const a = harness(camera, "useCameraZoom"), b = harness(focus, "useCardFocus");
  a.flush();
  const start = { styles: a.metrics.styles + b.metrics.styles, offsets: b.metrics.offsets, attributes: b.metrics.attributes };
  for (let frame = 1; frame <= 100; frame++) { a.scroll(frame); b.scroll(frame); }
  return {
    styleReads: a.metrics.styles + b.metrics.styles - start.styles,
    offsetReads: b.metrics.offsets - start.offsets,
    focusWrites: b.metrics.attributes - start.attributes,
  };
}

test("100 scroll updates perform no style/layout reads or redundant focus writes", () => {
  assert.deepEqual(measureScrollWork(), { styleReads: 0, offsetReads: 0, focusWrites: 0 });
});

test("cached camera retains the original zoom and reverses to full size", () => {
  const h = harness(cameraSource, "useCameraZoom");
  h.scroll(967); assert.equal(h.content.style.transform, "scale(0.734)");
  h.scroll(0); assert.equal(h.content.style.transform, "scale(1)");
  h.cleanup();
});

test("focus cache refreshes when layout changes", () => {
  const h = harness(focusSource, "useCardFocus");
  h.scroll(900); assert.equal(h.content.children[1].focused, true);
  h.resize(2000); assert.equal(h.content.children[0].focused, true);
  assert.equal(h.content.children[1].focused, false);
  h.cleanup();
});
