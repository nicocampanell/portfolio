import type { ReactNode } from "react";
import s from "./Card.module.css";

type Props = {
  id: string;
  caption: string;
  as?: "article" | "section";
  labelled?: boolean;
  intro?: boolean;
  children: ReactNode;
};

export function Card({
  id,
  caption,
  as: Tag = "article",
  labelled = false,
  intro = false,
  children,
}: Props) {
  const captionId = `${id}-caption`;
  return (
    <Tag
      className={`${s.card} ${intro ? s.intro : s.fade}`}
      id={id}
      data-opening-reveal={intro ? undefined : ""}
      {...(labelled ? { "aria-labelledby": captionId } : {})}
    >
      {children}
      <p className={s.caption} id={labelled ? captionId : undefined} data-opening-reveal={intro ? "" : undefined}>
        {caption}
      </p>
    </Tag>
  );
}
