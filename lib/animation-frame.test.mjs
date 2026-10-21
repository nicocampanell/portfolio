import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { test } from "node:test";
import ts from "typescript";

function mount(eager = false) {
  let active = eager, effect, observer, disconnected = false;
  const listeners = new Map();
  const document = {
    hidden: false,
    addEventListener: (type, fn) => listeners.set(type, fn),
    removeEventListener: (type) => listeners.delete(type),
  };
  class IntersectionObserver {
    constructor(fn) { observer = fn; }
    observe() {}
    disconnect() { disconnected = true; }
  }
  const module = { exports: {} };
  const require = (name) => {
    if (name === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }) };
    if (name === "react") return {
      useRef: () => ({ current: {} }),
      useState: () => [active, (value) => { active = value; }],
      useEffect: (fn) => { effect = fn; },
    };
    throw Error(`Unexpected module ${name}`);
  };
  const source = readFileSync(new URL("../components/AnimationFrame.tsx", import.meta.url), "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  runInNewContext(js, { module, exports: module.exports, require, document, IntersectionObserver, window: { IntersectionObserver } });
  const render = () => module.exports.AnimationFrame({ src: "/demo.html", title: "Demo", eager });
  const initial = render();
  const cleanup = effect();
  return {
    initial, render,
    nearby(value) { observer([{ isIntersecting: value }]); },
    hidden(value) { document.hidden = value; listeners.get("visibilitychange")?.(); },
    cleanup() { cleanup(); assert.equal(disconnected, true); assert.equal(listeners.size, 0); },
  };
}

test("offscreen demos have no source until nearby and unload again after leaving", () => {
  const frame = mount();
  assert.equal(frame.initial.props.src, undefined);
  frame.nearby(true); assert.equal(frame.render().props.src, "/demo.html");
  frame.nearby(false); assert.equal(frame.render().props.src, undefined);
  frame.cleanup();
});

test("hero demos render immediately, stop in a hidden tab, and resume on return", () => {
  const frame = mount(true);
  assert.equal(frame.initial.props.src, "/demo.html");
  frame.nearby(true);
  frame.hidden(true); assert.equal(frame.render().props.src, undefined);
  frame.hidden(false); assert.equal(frame.render().props.src, "/demo.html");
  frame.cleanup();
});
