import { validateCaseStudies, type CaseStudy } from "@/lib/case-study";
import { tacki } from "./tacki";

/** Add a case study here to make its route available. */
export const caseStudies: readonly CaseStudy[] = [tacki];
validateCaseStudies(caseStudies);

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
