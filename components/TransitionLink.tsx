"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type ComponentProps,
  type MouseEvent,
  startTransition,
} from "react";
import { exitThen, type NavMode } from "@/lib/page-transition";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = ComponentProps<typeof Link> & { mode?: NavMode };

export function TransitionLink({
  href,
  mode = "fade",
  onClick,
  children,
  ...rest
}: Props) {
  const router = useRouter();
  const reduce = usePrefersReducedMotion();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      reduce ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const url = typeof href === "string" ? href : href.pathname || "/";
    if (url.startsWith("http") || url.startsWith("mailto:")) return;

    event.preventDefault();
    const enter = url === "/about" || url.startsWith("/about?") ? "rise" : "fade";
    void exitThen(mode, () => {
      startTransition(() => {
        router.push(url);
      });
    }, enter);
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
