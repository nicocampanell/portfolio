import { PrivacyDiagram, StudentRolesDiagram } from "./DecisionDiagrams";
import s from "./DesignDecisions.module.css";

const trustExamples = [
  {
    concern: "Is this actually another student?",
    mechanism: "University email verification",
    rationale: "Establishes university affiliation",
    icon: "verification",
  },
  {
    concern: "Can this person do the job?",
    mechanism: "Provider portfolios",
    rationale: "Makes experience and work visible",
    icon: "portfolio",
  },
  {
    concern: "Have others had good experiences?",
    mechanism: "Reviews",
    rationale: "Provides social proof",
    icon: "reviews",
  },
  {
    concern: "Can I clarify details before committing?",
    mechanism: "In-app messaging",
    rationale: "Reduces uncertainty through communication",
    icon: "messaging",
  },
  {
    concern: "Does anyone I know recognize this person?",
    mechanism: "Friend connections",
    rationale: "Existing social relationships build familiarity",
    icon: "connections",
  },
];

function Arrow() {
  return (
    <svg className={s.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12h18m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DesignDecisions() {
  return (
    <div className={s.decisions}>
      <article className={s.decision}>
        <div className={s.intro}>
          <h3>#1 Balancing Convenience with Privacy</h3>
          <p>Optimizing for customer&apos;s convenience could come at the expense of the provider&apos;s privacy. I redesigned the listing location section so it had a radius instead of an address and once confirmed with the provider it will have the exact location.</p>
        </div>
        <PrivacyDiagram />
      </article>

      <article className={s.decision}>
        <div className={s.intro}>
          <h3>#2 Building a flow that had trust</h3>
          <p>Trust was the most prevalent insight in research. Trust wasn’t a single feature, but a design challenge that lived across many aspects of the app to get students to trust other students they don&apos;t know with services.</p>
        </div>
        <div className={s.trustFlow}>
          <div className={s.flowHeadings} aria-hidden="true">
            <p>User concern</p><span /><p>Trust mechanism</p><span /><p>Design rationale</p>
          </div>
          <ol className={s.flowRows} aria-label="How student concerns shaped trust in Tacki">
            {trustExamples.map((example) => (
              <li className={s.flowRow} key={example.icon}>
                <div className={s.card}>
                  <p className={s.cardLabel}>User concern</p>
                  <p>“{example.concern}”</p>
                </div>
                <Arrow />
                <div className={s.card}>
                  <p className={s.cardLabel}>Trust mechanism</p>
                  <div className={s.mechanismContent}>
                    <span className={s.icon}><img src={`/tacki/trust/${example.icon}.svg`} alt="" /></span>
                    <p>{example.mechanism}</p>
                  </div>
                </div>
                <Arrow />
                <div className={s.card}>
                  <p className={s.cardLabel}>Design rationale</p>
                  <p>{example.rationale}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </article>

      <article className={s.decision}>
        <div className={s.intro}>
          <h3>#3: Designing for students who are providers and customers.</h3>
          <p>During development the product manager, and engineers originally wanted the user flow for signing up to be a provider to be when you already were logged in and you would have to complete another flow.</p>
          <p>However, I challenged this advocating for the there to be no separate onboarding for providers. I talked to providers and similar apps like Depop and Facebook Marketplace where users are both customers &amp; sellers. With this information I worked with my product managers &amp; engineers to create a flow that allowed anybody to have a selling profile to initially become a seller where all you had to do was create a listing.</p>
        </div>
        <StudentRolesDiagram />
      </article>
    </div>
  );
}
