"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";
import { enterPage } from "@/lib/page-transition";
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

  useLayoutEffect(() => {
    const el = ref.current;
    if (el) void enterPage(el, reduce);
  }, [reduce]);

  return (
    <div ref={ref} data-page className={className}>
      {children}
    </div>
  );
}
