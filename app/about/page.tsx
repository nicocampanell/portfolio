import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About — Nico Campanell",
  description:
    "Nico Campanell — UX Design & Data Science at UT Austin. Experience, education, and how to say hello.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return <AboutPage />;
}
