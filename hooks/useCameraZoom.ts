import { type RefObject, useEffect } from "react";
import { zoomFromScroll } from "@/lib/zoom";
import { useNarrow } from "./useNarrow";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Per-frame lerp toward the target; hand-tuned, do not round. */
const EASE = 0.08;
const SETTLE = 0.0004;

/**
 * Drives the track (cards only) scale from deck scroll. Grid sits on the
 * unscaled scene sibling so zoom-out reveals more grid instead of clipping it.
 */
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
      track.style.removeProperty("--s");
      track.style.removeProperty("transform-origin");
      return;
    }

    let cam = 1;
    let camTarget = 1;
    let ticking = false;
    let raf = 0;

    const origin = () => {
      const pad = parseFloat(getComputedStyle(deck).paddingInlineStart);
      track.style.transformOrigin = `${deck.scrollLeft + innerWidth / 2 - pad}px 50%`;
    };

    const tick = () => {
      ticking = true;
      cam += (camTarget - cam) * EASE;
      if (Math.abs(camTarget - cam) < SETTLE) cam = camTarget;
      track.style.setProperty("--s", String(cam));
      origin();
      if (cam !== camTarget) raf = requestAnimationFrame(tick);
      else ticking = false;
    };

    const follow = () => {
      const css = getComputedStyle(document.documentElement);
      const step =
        parseFloat(css.getPropertyValue("--card")) +
        parseFloat(css.getPropertyValue("--gap"));
      camTarget = zoomFromScroll(deck.scrollLeft, step);
      origin();
      if (!ticking) raf = requestAnimationFrame(tick);
    };

    follow();
    deck.addEventListener("scroll", follow, { passive: true });
    return () => {
      deck.removeEventListener("scroll", follow);
      cancelAnimationFrame(raf);
    };
  }, [deckRef, trackRef, narrow, reduce]);
}
