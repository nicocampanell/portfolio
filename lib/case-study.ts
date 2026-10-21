import type { ReactNode } from "react";

export type CaseStudySection = {
  id: string;
  /** Omit to show a section without adding it to the sidebar. */
  navLabel?: string;
  className?: string;
  content: ReactNode;
};

export type CaseStudy = {
  slug: string;
  name: string;
  caption: string;
  description: string;
  tags: readonly string[];
  cover: {
    type: "animation" | "image";
    src: string;
    title: string;
    background?: string;
  };
  sections: readonly CaseStudySection[];
  closing?: ReactNode;
};

/** Fail at build time instead of silently publishing broken routes or anchors. */
export function validateCaseStudies(studies: readonly CaseStudy[]) {
  const slugs = new Set<string>();
  for (const study of studies) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(study.slug) || study.slug === "about" || slugs.has(study.slug)) {
      throw new Error(`Invalid, reserved, or duplicate case study slug: ${study.slug}`);
    }
    slugs.add(study.slug);
    if (!study.sections.length) throw new Error(`${study.slug}: add at least one section`);
    const ids = new Set<string>();
    for (const section of study.sections) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id) || ids.has(section.id)) {
        throw new Error(`${study.slug}: invalid or duplicate section id: ${section.id}`);
      }
      ids.add(section.id);
    }
  }
}
