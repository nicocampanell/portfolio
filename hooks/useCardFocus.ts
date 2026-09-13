import { type RefObject, useEffect } from "react";
import { cardScrollPos, closestIndex } from "@/lib/snap";
import { useNarrow } from "./useNarrow";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Marks the card closest to the snap edge using layout offsets (not transformed
 * rects), so the 1.2× focus zoom cannot steal the scroll. Random ±1deg tilt is
 * baked onto each card once; off-focus eases back to 1 / 0deg. The intro card
 * never takes focus zoom — it stays at the opening rest pose.
 */
export function useCardFocus(
  contentRef: RefObject<HTMLElement | null>,
  wrapperRef: RefObject<HTMLElement | null>,
) {
  const narrow = useNarrow();
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const content = contentRef.current;
    const wrapper = wrapperRef.current;
    if (!content || !wrapper) return;

    const cards = [...content.children] as HTMLElement[];
    for (const card of cards) {
      card.style.setProperty("--tilt", `${Math.random() < 0.5 ? -1 : 1}deg`);
    }
    if (reduce) return;

    const update = () => {
      const scroll = narrow ? scrollY : wrapper.scrollLeft;
      const offsets = cards.map((card) => cardScrollPos(card, wrapper, narrow));
      const best = closestIndex(offsets, scroll);
      cards.forEach((card, i) => {
        if (i === best && i > 0) card.setAttribute("data-focus", "");
        else card.removeAttribute("data-focus");
      });
    };

    update();
    const source: EventTarget = narrow ? window : wrapper;
    source.addEventListener("scroll", update, { passive: true });
    return () => source.removeEventListener("scroll", update);
  }, [contentRef, wrapperRef, narrow, reduce]);
}
