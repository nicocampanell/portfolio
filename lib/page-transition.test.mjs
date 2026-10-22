import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { test } from "node:test";
import ts from "typescript";

function setup(withCrumb = true) {
  const animations = [];
  const element = (left, width) => ({
    style: {},
    dataset: {},
    listeners: new Map(),
    addEventListener(type, listener) { this.listeners.set(type, listener); },
    removeEventListener(type) { this.listeners.delete(type); },
    querySelectorAll: () => [],
    getAnimations() { return animations.filter((animation) => animation.element === this); },
    getBoundingClientRect: () => ({ left, width, top: 64, height: 28 }),
    animate(frames, options) {
      let finish;
      const finished = new Promise((resolve) => { finish = resolve; });
      animations.push({ element: this, frames, options, finish, finished });
      return { finished };
    },
  });
  const left = element(280, 150), arrow = element(438, 24), right = element(470, 70);
  const crumb = element(0, 900);
  crumb.children = [left, arrow, right];
  const rest = element(0, 900), page = element(0, 900);
  const storage = new Map();
  const document = {
    documentElement: {},
    querySelector: (selector) => ({ "[data-crumb]": withCrumb ? crumb : null, "[data-chevron]": arrow, "[data-page]": page })[selector],
    querySelectorAll: () => [rest],
  };
  const module = { exports: {} };
  const source = readFileSync(new URL("./page-transition.ts", import.meta.url), "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  runInNewContext(js, {
    module, exports: module.exports, document,
    getComputedStyle: () => ({ getPropertyValue: () => "cubic-bezier(0.23, 1, 0.32, 1)" }),
    sessionStorage: {
      setItem: (key, value) => storage.set(key, value),
      getItem: (key) => storage.get(key),
      removeItem: (key) => storage.delete(key),
    },
  });
  return { ...module.exports, animations, left, right, arrow, page, storage };
}

test("return-home converges full-size labels and waits for their upward flips before navigating", async () => {
  const nav = setup();
  let navigated = false;
  const done = nav.exitThen("collapse-flip", () => { navigated = true; });
  const labels = nav.animations.filter((a) => a.element === nav.left || a.element === nav.right);
  const fade = nav.animations.find((a) => a.element === nav.page);
  assert.equal(fade.frames[1].opacity, 0.72);
  assert.equal(fade.options.duration, nav.COLLAPSE_MS + 35);
  assert.equal(labels.length, 2);
  assert.match(labels[0].frames[1].transform, /translate3d\(61\.75px/);
  assert.match(labels[1].frames[1].transform, /translate3d\(-35\.75px/);
  for (const animation of labels) {
    assert.ok(animation.frames.every((frame) => !frame.transform.includes("scale")));
    assert.match(animation.frames.at(-1).transform, /-14px.*rotateX\(90deg\)/);
    assert.equal(animation.frames.at(-1).opacity, 0);
  }
  assert.equal(navigated, false);
  for (const animation of nav.animations.slice(0, -1)) animation.finish();
  await Promise.resolve();
  assert.equal(navigated, false);
  nav.animations.at(-1).finish();
  await done;
  assert.equal(navigated, true);
  assert.equal(nav.storage.get("page-enter"), "fade");
});

test("incoming pages start transparent and fade in before the opacity override is cleared", async () => {
  const nav = setup();
  const done = nav.fadeInPage(nav.page);
  assert.equal(nav.page.style.opacity, "0");
  const animation = nav.animations[0];
  assert.equal(animation.frames[0].opacity, 0);
  assert.equal(animation.frames.at(-1).opacity, 1);
  assert.equal(animation.options.duration, nav.ENTER_MS);
  animation.finish();
  await done;
  assert.equal(nav.page.style.opacity, "");
});

test("all routes share the staggered rise entrance, including direct page loads", async () => {
  for (const stored of [undefined, "fade", "rise"]) {
    const nav = setup();
    if (stored) nav.storage.set("page-enter", stored);
    const done = nav.enterPage(nav.page, false);
    assert.equal(nav.page.dataset.enter, "rise");
    assert.equal(nav.storage.has("page-enter"), false);
    assert.equal(nav.animations.length, 1);
    nav.animations[0].finish();
    await done;
  }
});

test("reduced motion skips the shared entrance and clears pending navigation", () => {
  const nav = setup();
  nav.storage.set("page-enter", "rise");
  nav.enterPage(nav.page, true);
  assert.equal(nav.animations.length, 0);
  assert.equal(nav.page.dataset.enter, undefined);
  assert.equal(nav.storage.has("page-enter"), false);
});

test("scrolling or scroll intent completes the entrance immediately and removes its listeners", async () => {
  for (const event of ["scroll", "wheel", "touchmove"]) {
    const nav = setup();
    const done = nav.enterPage(nav.page, false);
    assert.equal(nav.page.style.opacity, "0");
    nav.page.listeners.get(event)();
    assert.equal(nav.page.style.opacity, "1");
    assert.equal(nav.page.dataset.enter, undefined);
    assert.equal(nav.page.listeners.size, 0);
    await done;
    assert.equal(nav.page.style.opacity, "");
  }
});

test("scrolling still reveals delayed sections after the whole-page fade has finished", async () => {
  const nav = setup();
  let finishReveal;
  const finished = new Promise((resolve) => { finishReveal = resolve; });
  nav.page.querySelectorAll = () => [{ getAnimations: () => [{ animationName: "page-rise", finished }] }];
  const done = nav.enterPage(nav.page, false);
  nav.animations[0].finish();
  await Promise.resolve();
  await Promise.resolve();
  assert.equal(nav.page.dataset.enter, "rise");
  nav.page.listeners.get("scroll")();
  assert.equal(nav.page.dataset.enter, undefined);
  assert.equal(nav.page.style.opacity, "1");
  finishReveal();
  await done;
  assert.equal(nav.page.listeners.size, 0);
});

test("pages without a breadcrumb fall back to fading before navigation", async () => {
  const nav = setup(false);
  let navigated = false;
  const done = nav.exitThen("collapse-flip", () => { navigated = true; });
  assert.equal(navigated, false);
  for (const animation of nav.animations) animation.finish();
  await done;
  assert.equal(navigated, true);
});
