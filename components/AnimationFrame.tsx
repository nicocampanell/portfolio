"use client";

import { type ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

/** Unload offscreen demos so their timers, animation loops, and DOM stop running. */
export function AnimationFrame({ src, eager = false, ...props }: ComponentPropsWithoutRef<"iframe"> & { eager?: boolean }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [active, setActive] = useState(eager);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    let nearby = eager;
    const sync = () => setActive(nearby && !document.hidden);
    if (!("IntersectionObserver" in window)) {
      nearby = true;
      sync();
      document.addEventListener("visibilitychange", sync);
      return () => document.removeEventListener("visibilitychange", sync);
    }
    const observer = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      sync();
    }, { rootMargin: "200px" });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [eager]);

  return <iframe {...props} ref={frame} src={active ? src : undefined} />;
}
