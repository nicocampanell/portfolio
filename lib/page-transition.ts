/** Exit/enter timings for route changes (ms). */
export const FADE_MS = 180;
export const ENTER_MS = 240;
export const COLLAPSE_MS = 420;
export const RISE_MS = 340;

const FADE_EASE = "cubic-bezier(0.77, 0, 0.175, 1)";
const COLLAPSE_EASE = "cubic-bezier(0.2, 0, 0, 1)";

export type NavMode = "fade" | "collapse-flip";
export type EnterMode = "fade" | "rise";

const ENTER_KEY = "page-enter";

export function markPageEnter(mode: EnterMode = "fade") {
  try {
    sessionStorage.setItem(ENTER_KEY, mode);
  } catch {
    /* ignore */
  }
}

export function consumePageEnter(): EnterMode | null {
  try {
    const v = sessionStorage.getItem(ENTER_KEY);
    if (v !== "fade" && v !== "rise") return null;
    sessionStorage.removeItem(ENTER_KEY);
    return v;
  } catch {
    return null;
  }
}

function pageEl() {
  return document.querySelector<HTMLElement>("[data-page]");
}

export function fadeOutPage() {
  const el = pageEl();
  if (!el) return Promise.resolve();
  return el
    .animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: FADE_MS,
      easing: FADE_EASE,
      fill: "forwards",
    })
    .finished.then(() => undefined);
}

/**
 * The two labels converge at the arrow at full type size, then flip upward.
 * The whole page gently fades through the same sequence.
 */
export async function collapseFlipPage() {
  const crumb = document.querySelector<HTMLElement>("[data-crumb]");
  const chevron = document.querySelector<HTMLElement>("[data-chevron]");
  if (!crumb) return fadeOutPage();

  const pageFade = pageEl()?.animate([
    { opacity: 1 },
    { opacity: 0.72, offset: 0.48 },
    { opacity: 0 },
  ], { duration: COLLAPSE_MS + 35, easing: FADE_EASE, fill: "forwards" }).finished;

  const cr = crumb.getBoundingClientRect();
  const arrow = chevron?.getBoundingClientRect();
  const center = arrow ? arrow.left + arrow.width / 2 : cr.left + cr.width / 2;
  const easing = getComputedStyle(document.documentElement).getPropertyValue("--ease-camera").trim() || COLLAPSE_EASE;
  const children = Array.from(crumb.children) as HTMLElement[];
  // Read every position before starting animations, keeping layout work out of the sequence.
  const positions = children.map((child) => child.getBoundingClientRect());
  await Promise.all([pageFade, ...children.map((child, index) => {
    const rect = positions[index];
    const isArrow = child === chevron;
    const inward = isArrow ? 0 : (center - rect.left - rect.width / 2) * 0.65;
    const clip = isArrow ? "inset(0)" : inward > 0 ? "inset(0 35% 0 0)" : "inset(0 0 0 35%)";
    child.style.transformOrigin = "50% 0%";
    child.style.backfaceVisibility = "hidden";
    return child.animate([
      { transform: "perspective(600px) translate3d(0, 0, 0) rotateX(0deg)", clipPath: "inset(0)", opacity: 1, easing },
      { transform: `perspective(600px) translate3d(${inward}px, 0, 0) rotateX(0deg)`, clipPath: clip, opacity: 1, offset: 0.48, easing },
      { transform: `perspective(600px) translate3d(${inward}px, -14px, 0) rotateX(90deg)`, clipPath: clip, opacity: 0 },
    ], {
      duration: COLLAPSE_MS,
      delay: isArrow ? 35 : index === 0 ? 0 : 25,
      easing: "linear",
      fill: "forwards",
    }).finished;
  })]);
}

export async function exitThen(mode: NavMode, go: () => void, enter: EnterMode = "fade") {
  if (mode === "collapse-flip") await collapseFlipPage();
  else await fadeOutPage();
  markPageEnter(enter);
  go();
}

export function fadeInPage(el: HTMLElement) {
  el.style.opacity = "0";
  return el
    .animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: ENTER_MS,
      easing: FADE_EASE,
      fill: "forwards",
    })
    .finished.then(() => {
      el.style.opacity = "";
    });
}

/** Shared entrance for every route; individual sections use the same stagger. */
export function enterPage(el: HTMLElement, reduce: boolean) {
  consumePageEnter();
  if (reduce) return;
  el.dataset.enter = "rise";
  const fade = fadeInPage(el);
  const pageAnimations = el.getAnimations();
  const reveals = Array.from(el.querySelectorAll<HTMLElement>("[data-page-reveal]"))
    .flatMap((section) => section.getAnimations())
    .filter((animation) => (animation as CSSAnimation).animationName === "page-rise");

  function cleanup() {
    for (const event of ["scroll", "wheel", "touchmove"]) {
      el.removeEventListener(event, finishEntrance, true);
    }
    delete el.dataset.enter;
  }

  function finishEntrance() {
    for (const animation of pageAnimations) animation.finish();
    el.style.opacity = "1";
    cleanup();
  }

  for (const event of ["scroll", "wheel", "touchmove"]) {
    el.addEventListener(event, finishEntrance, { capture: true, passive: true });
  }
  return Promise.allSettled([fade, ...reveals.map((animation) => animation.finished)])
    .then(cleanup);
}
