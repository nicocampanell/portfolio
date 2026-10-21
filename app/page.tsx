import { cards } from "@/content/cards";
import { ContactCard } from "@/components/ContactCard";
import { Deck } from "@/components/Deck";
import { IntroCard } from "@/components/IntroCard";
import { LetteringCard } from "@/components/LetteringCard";
import { PageEnter } from "@/components/PageEnter";
import { BlankCaseStudyCard, CaseStudyCard } from "@/components/CaseStudyCard";
import { getCaseStudy } from "@/content/case-studies";

export default function Home() {
  return (
    <PageEnter>
      <Deck>
        {cards.map((card) => {
          switch (card.kind) {
            case "intro":
              return <IntroCard key="intro" />;
            case "lettering":
              return (
                <LetteringCard
                  key={card.id}
                  id={card.id}
                  caption={card.caption}
                  art={card.art}
                  variant={card.variant}
                  href={card.href}
                />
              );
            case "case-study": {
              const study = getCaseStudy(card.slug);
              if (!study) throw new Error(`Missing case study: ${card.slug}`);
              return <CaseStudyCard key={card.id} id={card.id} study={study} />;
            }
            case "contact":
              return <ContactCard key="contact" />;
            case "placeholder":
              return <BlankCaseStudyCard key={card.id} id={card.id} />;
          }
        })}
      </Deck>
    </PageEnter>
  );
}
