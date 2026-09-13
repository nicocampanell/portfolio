"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { useLenisVertical } from "@/hooks/useLenisVertical";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { consumePageEnter, fadeInPage } from "@/lib/page-transition";

export function AboutShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useLenisVertical(wrapRef, contentRef);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduce) return;
    const mode = consumePageEnter();
    if (mode === "rise") {
      el.dataset.enter = "rise";
      return;
    }
    if (mode === "fade") void fadeInPage(el);
  }, [reduce]);

  return (
    <div ref={wrapRef} data-page className={className}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
