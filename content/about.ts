export const ABOUT_BIO = [
  "I’m currently a student at the University of Texas at Austin studying UX Design & Data Science with a certificate in Design Strategies. With my background in data science and design I have a passion for storytelling, breaking down complex problems, & innovation!",
  "In my free time, you can probably find me hiking a mountain in a foreign country, finding new clothes thrifting, discovering new music, or doing anything active.",
] as const;

export const EXPERIENCE = [
  { org: "Nerava", role: "product designer", when: "current" },
  { org: "Texas Product Engineering Org", role: "design fellow", when: "current" },
  { org: "Texas Wranglers", role: "public relations chair", when: "current" },
  { org: "Develop For Good", role: "product designer", when: "summer 2026" },
  { org: "GW Biostatistics", role: "data science research assistant", when: "2025" },
] as const;

export const EDUCATION = {
  org: "UT Austin",
  detail: "B.S. Informatics, Certificate in Design Strategies",
  when: "2025-2028",
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
