import { useCallback, useSyncExternalStore } from "react";

/**
 * Reads a media query without tripping hydration: the server snapshot is always
 * `false`, so the first client render matches the HTML and the real value lands
 * in the commit that follows.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => false,
  );
}
