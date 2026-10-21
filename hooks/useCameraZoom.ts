import { type RefObject, useEffect } from "react";
import { zoomFromScroll } from "@/lib/zoom";
import { useNarrow } from "./useNarrow";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const EASE = 0.08;
const SETTLE = 0.0004;

/** Keep layout measurements out of the scroll/animation loop. */
export function useCameraZoom(
  deckRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
) {
  const narrow = useNarrow();
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const deck = deckRef.current;
    const track = trackRef.current;
    if (!deck || !track) return;

    if (narrow || reduce) {
      track.style.removeProperty("transform");
      track.style.removeProperty("transform-origin");
      return;
    }

    let cam = 1;
    let camTarget = 1;
    let ticking = false;
    let raf = 0;
    let padding = 0;
    let step = 1;
    let center = innerWidth / 2;

    const origin = () => {
      track.style.transformOrigin = `${deck.scrollLeft + center - padding}px 50%`;
    };
    const tick = () => {
      cam += (camTarget - cam) * EASE;
      if (Math.abs(camTarget - cam) < SETTLE) cam = camTarget;
      track.style.transform = `scale(${cam})`;
      origin();
      if (cam !== camTarget) raf = requestAnimationFrame(tick);
      else ticking = false;
    };
    const follow = () => {
      camTarget = zoomFromScroll(deck.scrollLeft, step);
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const measure = () => {
      const css = getComputedStyle(document.documentElement);
      step = parseFloat(css.getPropertyValue("--card")) + parseFloat(css.getPropertyValue("--gap"));
      padding = parseFloat(getComputedStyle(deck).paddingInlineStart);
      center = innerWidth / 2;
      follow();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(deck);
    observer.observe(track);
    window.addEventListener("resize", measure);
    deck.addEventListener("scroll", follow, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      deck.removeEventListener("scroll", follow);
      cancelAnimationFrame(raf);
      track.style.removeProperty("transform");
      track.style.removeProperty("transform-origin");
    };
  }, [deckRef, trackRef, narrow, reduce]);
}
