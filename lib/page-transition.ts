/** Exit/enter timings for route changes (ms). */
export const FADE_MS = 100;
export const COLLAPSE_MS = 340;
export const RISE_MS = 340;

const FADE_EASE = "ease-out";
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
 * Only the top crumb bar collapses into the chevron, then flips up.
 * The rest of the page fades out in parallel.
 */
export function collapseFlipPage() {
  const crumb = document.querySelector<HTMLElement>("[data-crumb]");
  const chevron = document.querySelector<HTMLElement>("[data-chevron]");
  const rest = document.querySelectorAll<HTMLElement>("[data-about-rest]");
  const stage = crumb?.parentElement;

  for (const el of rest) {
    void el.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: FADE_MS,
      easing: FADE_EASE,
      fill: "forwards",
    }).finished;
  }

  if (!crumb) return fadeOutPage();

  const page = pageEl();
  if (page) page.style.overflow = "visible";

  const cr = crumb.getBoundingClientRect();
  if (chevron) {
    const ch = chevron.getBoundingClientRect();
    const x = ((ch.left + ch.width / 2 - cr.left) / Math.max(cr.width, 1)) * 100;
    const y = ((ch.top + ch.height / 2 - cr.top) / Math.max(cr.height, 1)) * 100;
    crumb.style.transformOrigin = `${x}% ${y}%`;
  } else {
    crumb.style.transformOrigin = "50% 50%";
  }

  if (stage) {
    stage.style.perspective = "900px";
    stage.style.perspectiveOrigin = "50% 0%";
  }
  crumb.style.transformStyle = "preserve-3d";
  crumb.style.backfaceVisibility = "hidden";
  crumb.style.willChange = "transform, opacity";

  return crumb
    .animate(
      [
        { transform: "scale(1) rotateX(0deg)", opacity: 1 },
        { transform: "scale(0.14) rotateX(0deg)", opacity: 1, offset: 0.48 },
        { transform: "scale(0.14) rotateX(-90deg)", opacity: 0 },
      ],
      { duration: COLLAPSE_MS, easing: COLLAPSE_EASE, fill: "forwards" },
    )
    .finished.then(() => undefined);
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
      duration: FADE_MS,
      easing: FADE_EASE,
      fill: "forwards",
    })
    .finished.then(() => {
      el.style.opacity = "";
    });
}
