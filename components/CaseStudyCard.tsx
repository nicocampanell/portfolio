import { AnimationFrame } from "@/components/AnimationFrame";
import type { CaseStudy } from "@/lib/case-study";
import { Card } from "./Card";
import { Panel } from "./Panel";
import { TransitionLink } from "./TransitionLink";
import panel from "./Panel.module.css";
import s from "./CaseStudyCard.module.css";

type Props = { id: string; study: CaseStudy };

export function BlankCaseStudyCard({ id, src, caption = "", tags = [], cursor }: { id: string; src?: string; caption?: string; tags?: readonly string[]; cursor?: string }) {
  return (
    <Card id={id} caption={caption} cursor={cursor}>
      <Panel textured={false} className={s.screens} aria-label={src ? "Lumen case study preview" : "Future case study"}>
        {src ? <img className={s.preview} src={src} alt="Lumen app concept case study cover" loading="lazy" decoding="async" /> : null}
        {tags.length > 0 && <span className={s.tags}>{tags.map((tag) => <span className={s.tag} key={tag}>{tag}</span>)}</span>}
      </Panel>
    </Card>
  );
}

export function CaseStudyCard({ id, study }: Props) {
  return (
    <Card id={id} caption={study.caption}>
      <Panel as={TransitionLink} href={`/${study.slug}`} textured={false} className={`${s.screens} ${panel.link}`} data-case-study={study.slug} data-cursor="case" aria-label={`View ${study.name} case study`} style={{ background: study.cover.background }}>
        {study.cover.type === "animation" ? (
          <AnimationFrame
            eager
            className={s.preview}
            src={study.cover.src}
            title={study.cover.title}
            sandbox="allow-scripts"
            tabIndex={-1}
            aria-hidden="true"
            loading="lazy"
          />
        ) : (
          <img className={s.preview} src={study.cover.src} alt={study.cover.title} loading="lazy" decoding="async" />
        )}
        <span className={s.tags}>
          {study.tags.map((tag) => <span className={s.tag} key={tag}>{tag}</span>)}
        </span>
      </Panel>
    </Card>
  );
}
