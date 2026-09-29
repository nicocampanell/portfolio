import Lenis from "lenis";
import Snap from "lenis/snap";
import { type RefObject, useCallback, useEffect, useRef } from "react";
import { CAMERA_S, cameraEase } from "@/lib/ease";
import { cardScrollPos } from "@/lib/snap";
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
  const reduce = usePrefersReducedMotion();

  const scrollTo = useCallback(
    (card: HTMLElement | null) => {
      if (!card) return;
      const wrapper = wrapperRef.current;
      const pos = wrapper ? cardScrollPos(card, wrapper, false) : 0;
      const current = wrapper?.scrollLeft ?? 0;
      const delta = pos - current;
      const lenis = lenisRef.current;

      if (lenis && !reduce) {
        lenis.scrollTo(lenis.scroll + delta, { duration: CAMERA_S, easing: cameraEase });
        return;
      }
      if (!wrapper) return;
      wrapper.scrollTo({ left: wrapper.scrollLeft + delta, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce, wrapperRef],
  );

  useEffect(() => {
    if (reduce) return;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
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
    let removeSnaps: (() => void)[] = [];
    const updateSnaps = () => {
      removeSnaps.forEach((remove) => remove());
      removeSnaps = cards.map((card) => snap.add(cardScrollPos(card, wrapper, false)));
    };
    updateSnaps();
    addEventListener("resize", updateSnaps);

    lenisRef.current = lenis;
    return () => {
      removeEventListener("resize", updateSnaps);
      snap.destroy();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [wrapperRef, contentRef, reduce]);

  return scrollTo;
}
