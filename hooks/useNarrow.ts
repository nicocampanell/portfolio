import { useMediaQuery } from "./useMediaQuery";

/** Matches the 54rem breakpoint where the deck flips from horizontal to stacked. */
export const useNarrow = () => useMediaQuery("(max-width: 54rem)");
