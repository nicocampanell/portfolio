import { Card } from "./Card";
import { Panel } from "./Panel";
import s from "./ContactCard.module.css";

const LINKS = [
  { href: "https://github.com/nicocampanell", label: "GitHub", rel: "me" as const },
  { href: "https://www.instagram.com/nicocampanell", label: "Instagram", rel: "me" as const },
  { href: "https://x.com/nicocampanell", label: "X", rel: "me" as const },
  { href: "mailto:nicocampanell@utexas.edu", label: "Email" },
];

export function ContactCard() {
  return (
    <Card id="contact" caption="Contact" as="section" labelled>
      <Panel as="nav" textured={false} className={s.contact} aria-label="Social">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} rel={link.rel} className="u-link">
            {link.label}
          </a>
        ))}
      </Panel>
    </Card>
  );
}
