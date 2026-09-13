import type { RefObject } from "react";
import s from "./ProgressBar.module.css";

type Props = {
  barRef: RefObject<HTMLDivElement | null>;
  fillRef: RefObject<HTMLDivElement | null>;
};

export function ProgressBar({ barRef, fillRef }: Props) {
  return (
    <div
      ref={barRef}
      className={s.bar}
      role="progressbar"
      aria-label="Portfolio progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <div ref={fillRef} className={s.fill} />
    </div>
  );
}
