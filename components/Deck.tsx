"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";
import "lenis/dist/lenis.css";
import { useCameraZoom } from "@/hooks/useCameraZoom";
import { useCardFocus } from "@/hooks/useCardFocus";
import { useDeckNav } from "@/hooks/useDeckNav";
import { useDeckProgress } from "@/hooks/useDeckProgress";
import { useLenisDeck } from "@/hooks/useLenisDeck";
import { ProgressBar } from "./ProgressBar";
import s from "./Deck.module.css";

export function Deck({ children }: { children: ReactNode }) {
  const deckRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useCameraZoom(deckRef, trackRef);
  useDeckProgress(deckRef, barRef, fillRef);
  useCardFocus(trackRef, deckRef);
  const scrollTo = useLenisDeck(deckRef, trackRef);
  useDeckNav(deckRef, trackRef, scrollTo);

  useLayoutEffect(() => {
    const deck = deckRef.current;
    const track = trackRef.current;
    if (!deck || !track) return;

    const fitCards = () => {
      const deckStyle = getComputedStyle(deck);
      const inset =
        parseFloat(deckStyle.paddingInlineStart) + parseFloat(deckStyle.paddingInlineEnd);
      const cardWidth = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--card"),
      );
      track.style.setProperty("--card-fit", String(Math.min(1, (deck.clientWidth - inset) / cardWidth)));
    };

    fitCards();
    const observer = new ResizeObserver(fitCards);
    observer.observe(deck);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        className="skip"
        href="#intro"
        onClick={(event) => {
          event.preventDefault();
          scrollTo(document.getElementById("intro"));
        }}
      >
        Skip to content
      </a>
      <ProgressBar barRef={barRef} fillRef={fillRef} />
      <div className={s.viewport}>
        <main ref={deckRef} className={s.deck} tabIndex={0} aria-label="Portfolio" data-page-reveal="0">
          <div className={s.scene}>
            {/* Grid stays on the unscaled scene so camera zoom only shrinks cards. */}
            <div className={s.grid} aria-hidden="true" />
            <div ref={trackRef} className={s.track}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
