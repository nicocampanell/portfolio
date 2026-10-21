import { type RefObject, useEffect } from "react";
import { cardScrollPos, closestIndex } from "@/lib/snap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useCardFocus(
  contentRef: RefObject<HTMLElement | null>,
  wrapperRef: RefObject<HTMLElement | null>,
) {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const content = contentRef.current;
    const wrapper = wrapperRef.current;
    if (!content || !wrapper) return;

    const cards = [...content.children] as HTMLElement[];
    for (const card of cards) {
      card.style.setProperty("--tilt", `${Math.random() < 0.5 ? -1 : 1}deg`);
      card.removeAttribute("data-focus");
    }
    if (reduce || !cards.length) return;

    let offsets: number[] = [];
    let active = -1;
    const update = () => {
      const best = closestIndex(offsets, wrapper.scrollLeft);
      if (best === active) return;
      cards[active]?.removeAttribute("data-focus");
      cards[best].setAttribute("data-focus", "");
      active = best;
    };
    const measure = () => {
      offsets = cards.map((card) => cardScrollPos(card, wrapper, false));
      update();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    observer.observe(wrapper);
    window.addEventListener("resize", measure);
    wrapper.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      wrapper.removeEventListener("scroll", update);
    };
  }, [contentRef, wrapperRef, reduce]);
}
