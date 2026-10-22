"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";
import { useLenisVertical } from "@/hooks/useLenisVertical";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { enterPage } from "@/lib/page-transition";

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

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (el) void enterPage(el, reduce);
  }, [reduce]);

  return (
    <div ref={wrapRef} data-page className={className}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
