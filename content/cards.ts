export type Card =
  | { kind: "intro" }
  | {
      kind: "lettering";
      id: string;
      caption: string;
      art: string;
      variant: "playground" | "about";
      href?: string;
    }
  | { kind: "case-study"; id: string; slug: string }
  | { kind: "placeholder"; id: string }
  | { kind: "contact" };

export const cards: Card[] = [
  { kind: "intro" },
  { kind: "case-study", id: "tacki-1", slug: "tacki" },
  { kind: "placeholder", id: "project-2" },
  { kind: "placeholder", id: "project-3" },
  {
    kind: "lettering",
    id: "playground",
    caption: "Playground",
    art: "/lettering/playground.svg",
    variant: "playground",
    href: "/cell-form.html",
  },
  {
    kind: "lettering",
    id: "about",
    caption: "About",
    art: "/lettering/about.svg",
    variant: "about",
    href: "/about",
  },
  { kind: "contact" },
];
