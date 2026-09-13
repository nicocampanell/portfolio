import Lenis from "lenis";
import { type RefObject, useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const LERP = 0.14;

/** Vertical Lenis on a scrollport (about + future vertical routes). */
export function useLenisVertical(
  wrapperRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
) {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      autoRaf: true,
      lerp: LERP,
    });

    return () => lenis.destroy();
  }, [wrapperRef, contentRef, reduce]);
}
