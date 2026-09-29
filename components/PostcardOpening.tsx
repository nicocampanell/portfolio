"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";
import { animate } from "motion";
import { cameraEase, cssTimeMs } from "@/lib/ease";
import { POSTCARD_FACES, POSTCARD_REST, postcardFold } from "@/lib/postcard-fold";
import s from "./PostcardOpening.module.css";

export function PostcardOpening({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const shell = ref.current;
    if (!shell) return;
    shell.dataset.ready = "";
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      shell.dataset.complete = "";
      return;
    }
    const live = shell.querySelector<HTMLElement>("[data-postcard-live]")!;
    const folds = shell.querySelector<HTMLElement>("[data-postcard-folds]")!;
    let width = live.offsetWidth;
    let height = live.offsetHeight;
    if (!width || !height) {
      shell.dataset.complete = "";
      shell.dataset.revealing = "";
      return;
    }
    const tokens = getComputedStyle(document.documentElement);
    const cameraMs = cssTimeMs(tokens.getPropertyValue("--camera-ms"));
    const easing = tokens.getPropertyValue("--ease-out").trim();
    const foldEasing = tokens.getPropertyValue("--ease-camera").trim();
    const duration = cssTimeMs(getComputedStyle(folds).getPropertyValue("--opening-duration"));
    let stopFold = () => {};
    let finished = false;
    let revealTimer: number | undefined;
    const animations: Animation[] = [];
    delete shell.dataset.complete;
    folds.style.setProperty("--ball-size", `${Math.min(width, height) * 0.15}px`);

    // Copies are visual only; the original remains the single accessible postcard.
    const pieces = POSTCARD_FACES.map((face, i) => {
      const piece = document.createElement("div");
      piece.className = s.facet;
      piece.style.clipPath = `polygon(${face.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(",")})`;
      const artwork = live.cloneNode(true) as HTMLElement;
      artwork.removeAttribute("data-postcard-live");
      artwork.className = s.artwork;
      piece.append(artwork);
      folds.append(piece);
      const { matrix, depth, shade } = postcardFold(face, 0, width, height);
      piece.style.transform = `matrix(${matrix.join(",")})`;
      // Stable layer order avoids facets popping in front of each other mid-unfold.
      piece.style.zIndex = String(Math.round(depth + height) + i);
      const crease = document.createElement("div");
      crease.className = s.crease;
      crease.style.opacity = String(Math.max(0, 1 - shade));
      piece.append(crease);
      return piece;
    });
    shell.dataset.unfolding = "";
    const bounds = shell.getBoundingClientRect();
    const rotation = parseFloat(getComputedStyle(shell).rotate) || 0;
    const origin = new DOMMatrix().rotate(-rotation).transformPoint(new DOMPoint(
      innerWidth / 2 - (bounds.left + bounds.width / 2),
      innerHeight / 2 - (bounds.top + bounds.height / 2),
    ));
    animations.push(folds.animate([
      { opacity: 0.35, transform: `translate(${origin.x}px, ${origin.y}px)` },
      { opacity: 1, transform: "translate(0, 0)" },
    ], { duration, easing: foldEasing, fill: "both" }));

    const reveal = () => {
      shell.dataset.revealing = "";
      document.querySelectorAll<HTMLElement>("[data-opening-reveal]").forEach(element => {
        animations.push(element.animate([
          { opacity: 0 }, { opacity: getComputedStyle(element).opacity },
        ], { duration: cameraMs, easing, fill: "both" }));
      });
    };
    const finish = () => {
      if (finished) return;
      finished = true;
      stopFold();
      shell.dataset.complete = "";
      animations.forEach(animation => animation.cancel());
      width = live.offsetWidth;
      height = live.offsetHeight;
      // Keep the actual 99% pose, including its remaining facet shadows, at rest.
      pieces.forEach((piece, i) => {
        const { matrix, shade } = postcardFold(POSTCARD_FACES[i], POSTCARD_REST, width, height);
        piece.style.transform = `matrix(${matrix.join(",")})`;
        (piece.lastElementChild as HTMLElement).style.opacity = String(Math.max(0, 1 - shade));
      });
      revealTimer = window.setTimeout(reveal, 0);
    };
    const foldAnimation = animate(0, POSTCARD_REST, {
      duration: duration / 1000,
      ease: "linear",
      onUpdate(progress) {
        const eased = cameraEase(progress / POSTCARD_REST) * POSTCARD_REST;
        pieces.forEach((piece, i) => {
          const { matrix, shade } = postcardFold(POSTCARD_FACES[i], eased, width, height);
          // Artwork and shadows share each facet's exact folded pose.
          piece.style.transform = `matrix(${matrix.join(",")})`;
          (piece.lastElementChild as HTMLElement).style.opacity = String(Math.max(0, 1 - shade));
        });
      },
    });
    stopFold = () => foldAnimation.stop();
    foldAnimation.then(finish);
    // Refit the resting folds when the responsive postcard changes size.
    window.addEventListener("resize", finish);
    reduced.addEventListener("change", finish, { once: true });
    return () => {
      window.removeEventListener("resize", finish);
      reduced.removeEventListener("change", finish);
      finish();
      window.clearTimeout(revealTimer);
      folds.replaceChildren();
      delete shell.dataset.unfolding;
      delete shell.dataset.revealing;
    };
  }, []);

  return (
    <div ref={ref} className={s.shell} data-postcard-opening>
      <div data-postcard-live className={s.live}>{children}</div>
      <div data-postcard-folds className={s.folds} aria-hidden="true" inert />
      <noscript><style>{`.${s.live} { opacity: 1 !important; } [data-opening-reveal] { visibility: visible !important; }`}</style></noscript>
    </div>
  );
}
