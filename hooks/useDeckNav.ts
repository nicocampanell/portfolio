import { type RefObject, useEffect } from "react";
import { cardScrollPos, closestIndex } from "@/lib/snap";
import { useNarrow } from "./useNarrow";

/**
 * Keyboard paging. Wheel is Lenis. Cards live in the track, which is the only
 * child of the deck, so the index scan reads that track.
 */
export function useDeckNav(
  deckRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  scrollTo: (card: HTMLElement | null) => void,
) {
  const narrow = useNarrow();

  useEffect(() => {
    const deck = deckRef.current;
    const content = contentRef.current;
    if (!deck || !content) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const cards = [...content.children] as HTMLElement[];
      const scroll = narrow ? scrollY : deck.scrollLeft;
      const i = closestIndex(
        cards.map((card) => cardScrollPos(card, deck, narrow)),
        scroll,
      );
      const go = {
        ArrowRight: Math.min(i + 1, cards.length - 1),
        ArrowLeft: Math.max(i - 1, 0),
        Home: 0,
        End: cards.length - 1,
      }[event.key];
      if (go == null) return;
      event.preventDefault();
      scrollTo(cards[go]);
    };

    deck.addEventListener("keydown", onKeyDown);
    return () => deck.removeEventListener("keydown", onKeyDown);
  }, [deckRef, contentRef, narrow, scrollTo]);
}
