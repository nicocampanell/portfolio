import { cards } from "@/content/cards";
import { ContactCard } from "@/components/ContactCard";
import { Deck } from "@/components/Deck";
import { IntroCard } from "@/components/IntroCard";
import { LetteringCard } from "@/components/LetteringCard";
import { PageEnter } from "@/components/PageEnter";
import { ScreensCard } from "@/components/ScreensCard";

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
            case "screens":
              return <ScreensCard key={card.id} id={card.id} caption={card.caption} />;
            case "contact":
              return <ContactCard key="contact" />;
          }
        })}
      </Deck>
    </PageEnter>
  );
}
