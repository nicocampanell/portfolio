import { type RefObject, useEffect } from "react";
/**
 * Fills the top line as the deck scrolls. Writes transform and aria-valuenow directly to the nodes for
 * the same reason the camera does: this runs on every scroll frame.
 */
export function useDeckProgress(
  deckRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>,
  fillRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const deck = deckRef.current;
    const bar = barRef.current;
    const fill = fillRef.current;
    if (!deck || !bar || !fill) return;

    const update = () => {
      const max = deck.scrollWidth - deck.clientWidth;
      const travelled = deck.scrollLeft;
      const p = max <= 0 ? 0 : Math.min(1, Math.max(0, travelled / max));
      fill.style.transform = `scaleX(${p})`;
      bar.setAttribute("aria-valuenow", String(Math.round(p * 100)));
    };

    update();
    deck.addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update, { passive: true });
    return () => {
      deck.removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [deckRef, barRef, fillRef]);
}
