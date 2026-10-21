"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import s from "./CaseStudy.module.css";

export function ResearchArtifacts({ children, labels }: { children: ReactNode; labels: readonly string[] }) {
  const id = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = [...viewport.firstElementChild!.children] as HTMLElement[];
      const index = cards.reduce((closest, card, current) =>
        Math.abs(card.offsetLeft - viewport.scrollLeft) < Math.abs(cards[closest].offsetLeft - viewport.scrollLeft)
          ? current : closest, 0);
      setActive((current) => current === index ? current : index);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    viewport.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  function goTo(index: number) {
    const viewport = viewportRef.current;
    const card = viewport?.firstElementChild?.children[index] as HTMLElement | undefined;
    if (!viewport || !card) return;
    viewport.scrollTo({
      left: card.offsetLeft,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <div className={s.layout9} data-node-id="865:2807">
      <div ref={viewportRef} className={s.researchViewport} role="region" aria-label="Research artifacts, scroll horizontally to explore" tabIndex={0}>
        <div className={s.researchImages} data-node-id="848:2590" data-name="Research Images">
          {children}
        </div>
      </div>
      <div className={s.researchPills} aria-label="Research artifact slides">
        {labels.map((label, index) => (
          <button key={label} type="button" aria-label={`Show ${label}`} aria-pressed={active === index} onClick={() => goTo(index)}>
            {active === index && (
              <motion.span
                layoutId={`${id}-research-active-pill`}
                className={s.researchPillActive}
                aria-hidden="true"
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 1218, damping: 70 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
