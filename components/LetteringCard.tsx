"use client";

import { Card } from "./Card";
import { Panel } from "./Panel";
import { TransitionLink } from "./TransitionLink";
import panel from "./Panel.module.css";
import s from "./LetteringCard.module.css";

type Variant = "projects" | "playground" | "about";

type Props = {
  id: string;
  caption: string;
  art: string;
  variant: Variant;
  href?: string;
};

export function LetteringCard({ id, caption, art, variant, href }: Props) {
  const img = (
    <img
      className={`${s.lettering} ${s[variant]}`}
      src={art}
      alt=""
      aria-hidden="true"
      decoding="async"
      draggable={false}
    />
  );

  const internal = href?.startsWith("/");

  const cursor = variant === "about" ? "meet" : undefined;

  return (
    <Card id={id} caption={caption} as={href ? "article" : "section"} labelled={!href}>
      {internal ? (
        <Panel
          as={TransitionLink}
          href={href!}
          mode="fade"
          className={panel.link}
          aria-label={caption}
          data-cursor={cursor}
        >
          {img}
        </Panel>
      ) : href ? (
        <Panel as="a" href={href} className={panel.link} aria-label={caption} data-cursor={cursor}>
          {img}
        </Panel>
      ) : (
        <Panel data-cursor={cursor}>{img}</Panel>
      )}
    </Card>
  );
}
