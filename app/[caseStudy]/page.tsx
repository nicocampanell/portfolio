import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case-studies/CaseStudyPage";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

type Props = { params: Promise<{ caseStudy: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ caseStudy: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).caseStudy);
  if (!study) notFound();
  const title = `${study.name} — Nico Campanell`;
  return {
    title,
    description: study.description,
    alternates: { canonical: `/${study.slug}` },
    openGraph: { title, url: `/${study.slug}` },
  };
}

export default async function CaseStudyRoute({ params }: Props) {
  const study = getCaseStudy((await params).caseStudy);
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
