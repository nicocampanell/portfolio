import type { CaseStudy } from "@/lib/case-study";
import { Card } from "./Card";
import { Panel } from "./Panel";
import { TransitionLink } from "./TransitionLink";
import panel from "./Panel.module.css";
import s from "./CaseStudyCard.module.css";

type Props = { id: string; study: CaseStudy };

export function BlankCaseStudyCard({ id }: { id: string }) {
  return (
    <Card id={id} caption="">
      <Panel textured={false} className={s.screens} aria-label="Future case study">{null}</Panel>
    </Card>
  );
}

export function CaseStudyCard({ id, study }: Props) {
  return (
    <Card id={id} caption={study.caption}>
      <Panel as={TransitionLink} href={`/${study.slug}`} textured={false} className={`${s.screens} ${panel.link}`} data-cursor="case" aria-label={`View ${study.name} case study`} style={{ background: study.cover.background }}>
        {study.cover.type === "animation" ? (
          <iframe
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
