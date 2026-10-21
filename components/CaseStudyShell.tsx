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
    let range = 0;
    let crumbBottom = 0;
    let sectionTops: number[] = [];
    let currentSection: string | undefined;
    let navVisible: boolean | undefined;
    let percentage = -1;
    const desktop = matchMedia("(min-width: 1241px)");

    function update() {
      if (!element) return;
      const scroll = element.scrollTop;
      const visible = crumbBottom - scroll <= 32;
      if (nav && visible !== navVisible) {
        nav.dataset.visible = String(visible);
        navVisible = visible;
      }
      const inert = !visible && desktop.matches;
      if (nav && nav.inert !== inert) nav.inert = inert;
      const progress = range > 0 ? scroll / range : 0;
      if (edge.current) edge.current.style.opacity = String(Math.min(1, Math.max(0, (range - scroll) / 160)));
      if (fill.current) fill.current.style.transform = `scaleX(${progress})`;
      const nextPercentage = Math.round(progress * 100);
      if (nextPercentage !== percentage) {
        bar.current?.setAttribute("aria-valuenow", String(nextPercentage));
        percentage = nextPercentage;
      }
      let active = sections[0]?.id;
      sectionTops.forEach((top, index) => {
        if (top - scroll <= 200) active = sections[index].id;
      });
      if (active !== currentSection) {
        for (const link of links) {
          if (link.hash === `#${active}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        }
        currentSection = active;
      }
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
    }
    function measure() {
      if (!element) return;
      const origin = element.getBoundingClientRect().top - element.scrollTop;
      range = element.scrollHeight - element.clientHeight;
      crumbBottom = crumb ? crumb.getBoundingClientRect().bottom - origin : Infinity;
      sectionTops = sections.map((section) => section.getBoundingClientRect().top - origin);
      schedule();
    }
    measure();
    const observer = new ResizeObserver(measure);
    if (content.current) observer.observe(content.current);
    observer.observe(element);
    element.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
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
