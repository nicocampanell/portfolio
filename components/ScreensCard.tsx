import { Card } from "./Card";
import { Panel } from "./Panel";
import s from "./ScreensCard.module.css";

type Props = { id: string; caption: string };

export function ScreensCard({ id, caption }: Props) {
  return (
    <Card id={id} caption={caption}>
      <Panel className={s.screens} data-cursor="case" aria-hidden="true">
        <span className={s.screen} />
        <span className={s.screen} />
        <span className={s.screen} />
      </Panel>
    </Card>
  );
}
