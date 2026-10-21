import { AnimationFrame } from "@/components/AnimationFrame";
import type { ReactNode } from "react";
import s from "./CaseStudy.module.css";

export function ProjectTags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className={s.projectTags} aria-label="Project disciplines">
      {tags.map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  );
}

export function SectionIntro({ label, title, children, first = false }: {
  label: string;
  title: string;
  children?: ReactNode;
  first?: boolean;
}) {
  const Heading = first ? "h1" : "h2";
  return (
    <div className={s.sectionIntro}>
      <p className={s.eyebrow}>{label}</p>
      <Heading className={s.sectionHeading}>{title}</Heading>
      {children && <div className={s.body}>{children}</div>}
    </div>
  );
}

export function CaseStudyMedia({ src, title, type = "image" }: {
  src: string;
  title: string;
  type?: "animation" | "image";
}) {
  return (
    <figure className={s.media}>
      {type === "animation" ? (
        <AnimationFrame src={src} title={title} sandbox="allow-scripts" loading="lazy" />
      ) : (
        <img src={src} alt={title} loading="lazy" decoding="async" />
      )}
    </figure>
  );
}
