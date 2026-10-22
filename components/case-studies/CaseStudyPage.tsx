import type { CSSProperties } from "react";
import type { CaseStudy } from "@/lib/case-study";
import { CaseStudyShell } from "../CaseStudyShell";
import { SiteFooter } from "../SiteFooter";
import { TransitionLink } from "../TransitionLink";
import s from "./CaseStudy.module.css";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const navigation = study.sections.filter((section) => section.navLabel);
  const firstSection = study.sections[0].id;

  return (
    <CaseStudyShell className={s.shell} data-case-study={study.slug}>
      <a className="skip" href={`#${firstSection}`}>Skip to case study</a>
      <nav
        className={s.sectionNav}
        aria-label="Case study navigation"
        data-case-nav
        data-visible="false"
        style={{ "--nav-count": navigation.length } as CSSProperties}
      >
        <TransitionLink href="/" mode="collapse-flip" className={`${s.sectionHome} u-link`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          home
        </TransitionLink>
        {navigation.map((section, index) => (
          <a key={section.id} className="u-link" href={`#${section.id}`} style={{ "--nav-order": index + 1 } as CSSProperties}>
            {section.navLabel}
          </a>
        ))}
      </nav>
      <header className={s.breadcrumb} data-crumb data-page-reveal="0">
        <TransitionLink href="/" mode="collapse-flip" className="u-link">NICO CAMPANELL</TransitionLink>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" data-chevron>
          <path d="M10 8.5 15 12l-5 3.5V8.5Z" fill="currentColor" />
        </svg>
        <span>{study.name.toUpperCase()}</span>
      </header>
      <main data-about-rest className={s.main}>
        {study.sections.map((section, index) => (
          <section key={section.id} id={section.id} data-section data-page-reveal={Math.min(index + 1, 5)} className={section.className ?? s.section}>
            {section.content}
          </section>
        ))}
        {study.closing}
      </main>
      <div className={s.footer}><SiteFooter /></div>
    </CaseStudyShell>
  );
}
