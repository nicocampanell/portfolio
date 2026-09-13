import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import s from "./Panel.module.css";

type Props<T extends ElementType> = {
  as?: T;
  textured?: boolean;
  /** Paper overlay; defaults to `textured`. */
  paper?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export function Panel<T extends ElementType = "div">({
  as,
  textured = true,
  paper = textured,
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = as ?? "div";
  return (
    <Tag className={[s.panel, className].filter(Boolean).join(" ")} {...rest}>
      {textured ? <div className={s.grain} aria-hidden="true" /> : null}
      {paper ? <div className={s.paper} aria-hidden="true" /> : null}
      {children}
    </Tag>
  );
}
