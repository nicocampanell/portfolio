import { Card } from "./Card";
import { Panel } from "./Panel";
import { PostcardOpening } from "./PostcardOpening";
import s from "./IntroCard.module.css";

const META =
  "made with figma, next.js & curosr - based in atx -  product designer - informatics @ ut austin";

const BIO =
  "A designer crafting human products at the intersection of design, data, and innovation driven by visual craft!";

export function IntroCard() {
  return (
    <Card id="intro" caption="Intro" intro>
      <PostcardOpening>
      <Panel className={s.panel}>
        <img
          className={s.floral}
          src="/intro/floral.webp?v=5"
          alt=""
          width={331}
          height={488}
          aria-hidden="true"
          decoding="async"
        />

        <div className={s.layout}>
          <div className={s.identity}>
            <p className={s.role}>Product Designer</p>
            <h1 className={s.name}>
              <span className="sr-only">Nico Campanell</span>
              <img
                className={s.nico}
                src="/intro/nico.svg"
                alt=""
                width={145}
                height={61}
                aria-hidden="true"
                decoding="async"
              />
              <img
                className={s.campanell}
                src="/intro/campanell.svg"
                alt=""
                width={369}
                height={61}
                aria-hidden="true"
                decoding="async"
              />
            </h1>
          </div>

          <p className={s.meta} aria-hidden="true">
            <span>{META}</span>
          </p>

          <div className={s.bioWrap}>
            <img
              className={s.bioLines}
              src="/intro/bio-lines.svg"
              width={369}
              height={85}
              alt=""
              aria-hidden="true"
            />
            <p className={s.bio}>{BIO}</p>
          </div>
        </div>

        <img
          className={`${s.stamp} ${s.postage}`}
          src="/stamps/postage.webp?v=5"
          alt=""
          width={165}
          height={112}
          aria-hidden="true"
          decoding="async"
        />
        <img
          className={`${s.stamp} ${s.texas}`}
          src="/stamps/texas.webp?v=5"
          alt=""
          width={112}
          height={110}
          aria-hidden="true"
          decoding="async"
        />
      </Panel>
      </PostcardOpening>
    </Card>
  );
}
