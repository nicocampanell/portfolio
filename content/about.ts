export const ABOUT_BIO = [
  "I'm currently studying at UT Austin. As an interdisciplinary creative, I've always been driven by curiosity. That curiosity has led me to explore everything from design and data to development and AI. I'm always looking for new opportunities to build impactful products.",
  "In my free time, you can probably find me hiking a mountain in a foreign country, finding new clothes thrifting, editing videos, or doing anything active.",
] as const;

export const EXPERIENCE = [
  { org: "Longhorn Developers", role: "user experience designer", when: "current" },
  { org: "Leadership Austin", role: "lead product designer", when: "current" },
  { org: "Nerava", role: "lead product engineer", when: "current" },
  { org: "Texas Product Engineering Org", role: "design fellow", when: "current" },
  { org: "Develop For Good", role: "product designer", when: "summer 2026" },
  { org: "GW Biostatistics", role: "data science research assistant", when: "2025" },
] as const;

export const EDUCATION = {
  org: "UT Austin",
  detail: "b.s. informatics, minors in design & entrepreneurship",
  when: "may 2028",
} as const;

export const HELLO = [
  { href: "mailto:nicocampanell@gmail.com", label: "nicocampanell@gmail.com" },
  { href: "https://www.instagram.com/nicocampanell", label: "Instagram", rel: "me" as const },
  { href: "https://www.linkedin.com/in/nicocampanell", label: "LinkedIn", rel: "me" as const },
  { href: "https://x.com/nicocampanell", label: "X", rel: "me" as const },
] as const;

export const SOCIAL_ICONS = [
  {
    href: "https://www.instagram.com/nicocampanell",
    src: "/about/instagram.svg",
    label: "Instagram",
    size: 24,
  },
  {
    href: "https://www.linkedin.com/in/nicocampanell",
    src: "/about/linkedin.svg",
    label: "LinkedIn",
    size: 24,
  },
  { href: "https://x.com/nicocampanell", src: "/about/x.svg", label: "X", size: 22 },
] as const;
