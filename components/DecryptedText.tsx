"use client";

import { useEffect, useRef } from "react";
import s from "./DecryptedText.module.css";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@";
const FRAME = 40;
const PASSES = 12;

const isLetter = (ch: string) => /\p{L}/u.test(ch);
const randomGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

type Props = {
  text: string;
  /** Milliseconds before the reveal starts. */
  delay: number;
  /** Reveal left-to-right rather than resolving the whole string at once. */
  sequential?: boolean;
  /** Multi-line layout that preserves authored line breaks. */
  block?: boolean;
};

export function DecryptedText({ text, delay, sequential = false, block = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;
    const scramble = (revealed = 0) =>
      Array.from(text, (ch, i) =>
        ch === " " || ch === "\n" || i < revealed || !isLetter(ch) ? ch : randomGlyph(),
      ).join("");

    const settle = () => {
      el.textContent = text;
      el.classList.remove(s.cipher);
    };

    el.classList.add(s.cipher);
    el.textContent = scramble();

    if (sequential) {
      let revealed = 0;
      const step = () => {
        revealed += 1;
        el.textContent = scramble(revealed);
        if (revealed < text.length) timer = setTimeout(step, FRAME);
        else settle();
      };
      timer = setTimeout(step, delay);
    } else {
      let pass = 0;
      const step = () => {
        pass += 1;
        if (pass >= PASSES) return settle();
        el.textContent = scramble();
        timer = setTimeout(step, FRAME);
      };
      timer = setTimeout(step, delay);
    }

    return () => {
      clearTimeout(timer);
      settle();
    };
  }, [text, delay, sequential]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span className={block ? `${s.wrap} ${s.block}` : s.wrap} aria-hidden="true">
        <span className={s.ghost}>{text}</span>
        <span ref={ref} className={s.text}>
          {text}
        </span>
      </span>
    </>
  );
}
