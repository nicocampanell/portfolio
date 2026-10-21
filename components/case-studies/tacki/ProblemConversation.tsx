"use client";

import { useEffect, useRef } from "react";

import s from "../CaseStudy.module.css";
import c from "./ProblemConversation.module.css";

const messages = [
  { who: "me", text: "Hello John, I heard you give haircuts. I would love to have one. Let me know more details." },
  { who: "them", text: "Yeah, I love cutting hair. What do you want??" },
  { who: "me", text: "I want a wolf cut-style haircut." },
  { who: "them", text: "Yeah, I can do something similar." },
  { who: "me", text: "Okay, nice. How much do you charge?" },
  { who: "them", text: "Anywhere from $30 to $60." },
  { who: "me", text: "That’s a very big range. What time works for you?" },
  { who: "them", text: "Maybe Thursday? Not sure yet, let me check." },
  { who: "me", text: "Thursday works! Where are you located?" },
  { who: "them", ghost: true },
  { who: "me", text: "Hello? Are you still available?", hold: true },
];

export function ProblemConversation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const thread = threadRef.current;
    if (!container || !stage || !thread) return;

    const fit = () => { stage.style.transform = `scale(${container.clientWidth / 1280})`; };
    fit();
    const resize = new ResizeObserver(fit);
    resize.observe(container);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    let cancelled = false;
    let started = false;
    const sleep = (ms: number) => new Promise<void>((resolve) => {
      const timer = setTimeout(() => { timers.delete(timer); resolve(); }, ms);
      timers.add(timer);
    });

    function makeRow(who: string, text?: string) {
      const row = document.createElement("div");
      row.className = `${c.row} ${who === "me" ? c.me : c.them}`;
      const bubble = document.createElement("div");
      bubble.className = c.bubble;
      if (text) bubble.textContent = text;
      else {
        const dots = document.createElement("div");
        dots.className = c.dots;
        dots.setAttribute("aria-label", "Typing");
        dots.append(document.createElement("i"), document.createElement("i"), document.createElement("i"));
        bubble.append(dots);
      }
      row.append(bubble);
      return row;
    }

    function push(row: HTMLElement, animate = true) {
      const previous = [...thread!.children].map((child) => [child, child.getBoundingClientRect().top] as const);
      thread!.append(row);
      if (!animate || reduce) return;
      previous.forEach(([child, top]) => {
        const delta = top - child.getBoundingClientRect().top;
        if (delta && child.animate) child.animate([
          { transform: `translateY(${delta}px)` }, { transform: "translateY(0)" },
        ], { duration: 480, easing: "cubic-bezier(.2,.8,.2,1)" });
      });
      const bubble = row.firstElementChild as HTMLElement;
      bubble.style.transformOrigin = row.classList.contains(c.them) ? "0 100%" : "100% 100%";
      bubble.animate?.([
        { opacity: 0, transform: "scale(.4) translateY(10px)" },
        { opacity: 1, transform: "scale(1) translateY(0)" },
      ], { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" });
    }

    function status(row: HTMLElement, text: string) {
      let label = row.querySelector<HTMLDivElement>(`.${c.status}`);
      if (!label) {
        label = document.createElement("div");
        label.className = c.status;
        row.append(label);
      }
      label.textContent = text;
      if (!reduce) label.animate?.([{ opacity: 0 }, { opacity: 1 }], { duration: 220 });
    }

    function remove(row: HTMLElement) {
      const previous = [...thread!.children].filter((child) => child !== row)
        .map((child) => [child, child.getBoundingClientRect().top] as const);
      row.remove();
      if (reduce) return;
      previous.forEach(([child, top]) => {
        const delta = top - child.getBoundingClientRect().top;
        if (delta) child.animate?.([
          { transform: `translateY(${delta}px)` }, { transform: "translateY(0)" },
        ], { duration: 380, easing: "cubic-bezier(.2,.8,.2,1)" });
      });
    }

    async function play() {
      while (!cancelled) {
        thread!.replaceChildren();
        for (const message of messages) {
          if (cancelled) return;
          if (message.ghost) {
            const typing = makeRow("them");
            push(typing);
            await sleep(2600);
            if (cancelled) return;
            remove(typing);
            await sleep(1500);
          } else {
            if (message.who === "me") thread!.querySelectorAll(`.${c.status}`).forEach((label) => label.remove());
            const row = makeRow(message.who, message.text);
            push(row);
            if (message.who === "me") {
              status(row, "Delivered");
              await sleep(650);
              if (cancelled) return;
              status(row, "Read");
              await sleep(message.hold ? 5200 : 550);
            } else await sleep(1500);
          }
        }
      }
    }

    function start() {
      if (started) return;
      started = true;
      void play();
    }

    let observer: IntersectionObserver | undefined;
    if (reduce) {
      thread.replaceChildren();
      messages.forEach((message) => { if (message.text) push(makeRow(message.who, message.text), false); });
      status(thread.lastElementChild as HTMLElement, "Read");
    } else if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        start();
        observer?.disconnect();
      }, { root: container.closest("[data-page]"), threshold: 0.1 });
      observer.observe(container);
    } else start();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      observer?.disconnect();
      resize.disconnect();
      thread.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <div ref={containerRef} className={s.image2} data-node-id="771:72" data-name="Image">
      <div ref={stageRef} className={c.stage}>
        <div ref={threadRef} className={c.thread} role="img" aria-label="A text conversation showing unclear pricing, scheduling, and a service provider who stops replying">
          <div className={`${c.row} ${c.me}`}>
            <div className={c.bubble}>{messages[0].text}</div>
            <div className={c.status}>Delivered</div>
          </div>
        </div>
      </div>
    </div>
  );
}
