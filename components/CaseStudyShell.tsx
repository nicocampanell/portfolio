"use client";

import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import "lenis/dist/lenis.css";
import { useLenisVertical } from "@/hooks/useLenisVertical";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { consumePageEnter, fadeInPage } from "@/lib/page-transition";
import { ProgressBar } from "./ProgressBar";
import s from "./CaseStudyShell.module.css";

export function CaseStudyShell({ children, ...props }: ComponentPropsWithoutRef<"div">) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const edge = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const lenis = useLenisVertical(wrapper, content);

  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;
    if (consumePageEnter() && !reduce) void fadeInPage(element);
    const links = [...element.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]')];
    const sections = [...element.querySelectorAll<HTMLElement>("[data-section]")]
      .filter((section) => links.some((link) => link.hash === `#${section.id}`));
    const nav = element.querySelector<HTMLElement>("[data-case-nav]");
    const crumb = element.querySelector<HTMLElement>("[data-crumb]");
    let frame = 0;
    function update() {
      if (!element) return;
      if (nav && crumb) {
        const visible = crumb.getBoundingClientRect().bottom <= 32;
        nav.dataset.visible = String(visible);
        nav.inert = !visible && matchMedia("(min-width: 1241px)").matches;
      }
      const range = element.scrollHeight - element.clientHeight;
      const progress = range > 0 ? element.scrollTop / range : 0;
      if (edge.current) edge.current.style.opacity = String(Math.min(1, Math.max(0, (range - element.scrollTop) / 160)));
      if (fill.current) fill.current.style.transform = `scaleX(${progress})`;
      bar.current?.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
      let active = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 200) active = section.id;
      }
      for (const link of links) {
        if (link.hash === `#${active}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }
    update();
    element.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  return (
    <>
      <ProgressBar barRef={bar} fillRef={fill} />
      <div {...props} ref={wrapper} data-page onClick={(event) => {
        const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = document.getElementById(link.hash.slice(1));
        const element = wrapper.current;
        if (!target || !element) return;
        event.preventDefault();
        const offset = -parseFloat(getComputedStyle(target).scrollMarginTop || "0");
        if (lenis.current) lenis.current.scrollTo(target, { offset });
        else element.scrollTop += target.getBoundingClientRect().top - element.getBoundingClientRect().top + offset;
        history.pushState(null, "", link.hash);
      }}>
        <div ref={content}>{children}</div>
        <div ref={edge} className={s.edge} aria-hidden="true" />
      </div>
    </>
  );
}
