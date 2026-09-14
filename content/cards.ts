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
  | { kind: "screens"; id: string; caption: string }
  | { kind: "contact" };

export const cards: Card[] = [
  { kind: "intro" },
  { kind: "screens", id: "tacki-1", caption: "TACKI - Student Service Marketplace" },
  { kind: "screens", id: "tacki-2", caption: "TACKI - Student Service Marketplace" },
  { kind: "screens", id: "tacki-3", caption: "TACKI - Student Service Marketplace" },
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
