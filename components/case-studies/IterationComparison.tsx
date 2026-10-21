import s from "./IterationComparison.module.css";

type IterationState = {
  image: string;
  alt: string;
  insights: string[];
  crop?: "searchBefore" | "searchAfter" | "homeBefore" | "homeAfter";
};

export function IterationComparison({ title, before, after, tallImages = false }: {
  title: string;
  before: IterationState;
  after: IterationState;
  tallImages?: boolean;
}) {
  return (
    <section className={s.iteration} aria-label={title}>
      <h3 className={s.title}>{title}</h3>
      <div className={`${s.panel} ${tallImages ? s.tallImages : ""}`}>
        {([before, after] as const).map((state, index) => (
          <div className={s.row} key={index}>
            <div className={`${s.screenshot} ${index === 1 ? s.afterScreenshot : ""}`}>
              <img
                src={state.image}
                alt={state.alt}
                className={state.crop ? s[state.crop] : undefined}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={s.notes}>
              <p className={s.label}>{index === 0 ? "Before:" : "After:"}</p>
              <ol className={`${s.list} ${index === 1 ? s.afterList : ""}`}>
                {state.insights.map((insight) => <li key={insight}>{insight}</li>)}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
