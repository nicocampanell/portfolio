"use client";

import { useEffect, useId, useRef } from "react";
import s from "./DesignDecisions.module.css";

export function PrivacyDiagram() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const privacy = svg.querySelector("[data-privacy]")!;
    const convenience = svg.querySelector("[data-convenience]")!;
    const privacyLabel = svg.querySelector("[data-privacy-label]")!;
    const convenienceLabel = svg.querySelector("[data-convenience-label]")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start = 0;
    let visible = false;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const out = (value: number) => 1 - (1 - value) ** 3;
    const inOut = (value: number) => value < .5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;

    function draw(time: number) {
      let change = [1, 2.1, 3.3, 4.6].reduce((sum, beat) => sum + out(clamp((time - beat) / .4)) / 4, 0);
      change *= 1 - inOut(clamp((time - 7) / .9));
      const radius = 65 + 70 * change;
      const x = 370 + radius;
      const otherRadius = 270 - radius;
      const otherX = 370 + 2 * radius + otherRadius;
      privacy.setAttribute("r", String(radius));
      privacy.setAttribute("cx", String(x));
      convenience.setAttribute("r", String(otherRadius));
      convenience.setAttribute("cx", String(otherX));
      privacyLabel.setAttribute("x", String(x));
      convenienceLabel.setAttribute("x", String(otherX));
    }

    function tick(now: number) {
      if (!start) start = now;
      draw(((now - start) / 1000) % 8.8);
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      start = 0;
      if (reduce.matches) draw(6);
      else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { root: svg.closest("[data-page]"), threshold: .15 });
    observer.observe(svg);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <figure className={s.diagram}>
      <svg ref={ref} viewBox="330 150 620 460" role="img" aria-label="Privacy and convenience circles grow toward an equal balance">
        <circle data-privacy cx="435" cy="380" r="65" fill="#fc671e" />
        <circle data-convenience cx="705" cy="380" r="205" fill="none" stroke="#7a716a" strokeWidth="1.5" />
        <text data-privacy-label className={s.diagramText} x="435" y="380" fill="#faf9f7">Privacy</text>
        <text data-convenience-label className={s.diagramText} x="705" y="380" fill="#5c544e">Convenience</text>
      </svg>
    </figure>
  );
}

const people = [
  { x: 220, y: 170, both: false }, { x: 548, y: 175, both: false }, { x: 375, y: 195, both: true },
  { x: 260, y: 245, both: false }, { x: 510, y: 250, both: false }, { x: 395, y: 252, both: true },
  { x: 210, y: 300, both: false }, { x: 560, y: 310, both: false }, { x: 370, y: 310, both: true },
  { x: 300, y: 325, both: false }, { x: 490, y: 330, both: false }, { x: 388, y: 150, both: true },
];

export function StudentRolesDiagram() {
  const ref = useRef<HTMLElement>(null);
  const clipId = useId().replaceAll(":", "");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = false;
    const sync = () => { element.dataset.running = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { root: element.closest("[data-page]"), threshold: .15 });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <figure ref={ref} className={`${s.diagram} ${s.venn}`} data-running="false">
      <svg viewBox="0 0 767 440" role="img" aria-label="Customers and sellers overlap: students can buy, sell, or do both using one profile">
        <defs><clipPath id={clipId}><circle cx="292" cy="230" r="160" /></clipPath></defs>
        <circle cx="292" cy="230" r="160" fill="#f0f0f0" />
        <circle cx="475" cy="230" r="160" fill="#f0f0f0" />
        <circle cx="475" cy="230" r="160" fill="#fc671e" fillOpacity=".12" clipPath={`url(#${clipId})`} />
        <g fill="none" stroke="#fc671e" strokeOpacity=".65" strokeWidth="1.5">
          <circle cx="292" cy="230" r="160" /><circle cx="475" cy="230" r="160" />
        </g>
        <text className={s.roleLabel} x="292" y="48">Customers</text>
        <text className={s.roleLabel} x="475" y="48">Sellers</text>
        {people.map((person, index) => (
          <g key={index} transform={`translate(${person.x} ${person.y})`} aria-hidden="true">
            <g className={s.person} style={{ animationDelay: `${index * .22}s`, color: person.both ? "#fc671e" : "#7a716a" }}>
              <circle cy="-6" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M-12 15v-3a7 7 0 0 1 7-7H5a7 7 0 0 1 7 7v3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        ))}
      </svg>
    </figure>
  );
}
