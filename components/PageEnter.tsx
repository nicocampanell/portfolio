"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { consumePageEnter, fadeInPage } from "@/lib/page-transition";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function PageEnter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const mode = consumePageEnter();
    if (mode === "fade" || mode === "rise") void fadeInPage(el);
  }, [reduce]);

  return (
    <div ref={ref} data-page className={className}>
      {children}
    </div>
  );
}
