"use client";

import { useEffect, useRef, useState } from "react";
import s from "./Cursor.module.css";

type Mode = "dot" | "case" | "meet";

const LABEL: Record<Exclude<Mode, "dot">, string> = {
  case: "View Case Study!",
  meet: "Meet Me!",
};

function modeFromTarget(t: EventTarget | null): Mode {
  const el = t instanceof Element ? t.closest("[data-cursor]") : null;
  const v = el?.getAttribute("data-cursor");
  return v === "case" || v === "meet" ? v : "dot";
}

export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("dot");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = root.current;
    if (!el) return;

    document.documentElement.dataset.cursor = "custom";
    setReady(true);

    let x = -100;
    let y = -100;
    let raf = 0;

    const draw = () => {
      raf = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(draw);
      setMode(modeFromTarget(e.target));
    };

    const onOver = (e: PointerEvent) => setMode(modeFromTarget(e.target));

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerover", onOver);
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  return (
    <div
      ref={root}
      className={s.root}
      data-opening-reveal
      data-mode={mode}
      data-ready={ready ? "" : undefined}
      aria-hidden="true"
    >
      <span className={s.dot} />
      <span className={s.pill}>
        <span className={s.label}>{mode === "dot" ? "\u00a0" : LABEL[mode]}</span>
      </span>
    </div>
  );
}
