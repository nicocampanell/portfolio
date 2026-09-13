import Lenis from "lenis";
import Snap from "lenis/snap";
import { type RefObject, useCallback, useEffect, useRef } from "react";
import { CAMERA_S, cameraEase } from "@/lib/ease";
import { cardScrollPos } from "@/lib/snap";
import { useNarrow } from "./useNarrow";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const LERP = 0.14;

/**
 * Lenis owns wheel/touch. Native overflow stays hidden so the two don't fight.
 * Snap is proximity-only so it settles near a card instead of yanking mid-gesture.
 */
export function useLenisDeck(
  wrapperRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
) {
  const lenisRef = useRef<Lenis | null>(null);
  const narrow = useNarrow();
  const reduce = usePrefersReducedMotion();

  const scrollTo = useCallback(
    (card: HTMLElement | null) => {
      if (!card) return;
      const wrapper = wrapperRef.current;
      const pos = wrapper ? cardScrollPos(card, wrapper, narrow) : 0;
      const current = narrow ? scrollY : (wrapper?.scrollLeft ?? 0);
      const delta = pos - current;
      const lenis = lenisRef.current;

      if (lenis && !reduce) {
        lenis.scrollTo(lenis.scroll + delta, { duration: CAMERA_S, easing: cameraEase });
        return;
      }
      if (narrow) {
        window.scrollTo({ top: Math.max(0, scrollY + delta), behavior: reduce ? "auto" : "smooth" });
        return;
      }
      if (!wrapper) return;
      wrapper.scrollTo({ left: wrapper.scrollLeft + delta, behavior: reduce ? "auto" : "smooth" });
    },
    [narrow, reduce, wrapperRef],
  );

  useEffect(() => {
    if (reduce) return;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const lenis = narrow
      ? new Lenis({ autoRaf: true, lerp: LERP })
      : new Lenis({
          wrapper,
          content,
          orientation: "horizontal",
          gestureOrientation: "both",
          autoRaf: true,
          lerp: LERP,
        });

    const snap = new Snap(lenis, {
      type: "proximity",
      distanceThreshold: 48,
      debounce: 80,
      duration: CAMERA_S,
      easing: cameraEase,
    });

    const cards = [...content.children] as HTMLElement[];
    for (const card of cards) snap.add(cardScrollPos(card, wrapper, narrow));

    lenisRef.current = lenis;
    return () => {
      snap.destroy();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [wrapperRef, contentRef, narrow, reduce]);

  return scrollTo;
}
