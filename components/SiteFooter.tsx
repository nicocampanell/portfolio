import { SOCIAL_ICONS } from "@/content/about";
import { AboutClock } from "./AboutClock";
import s from "./AboutPage.module.css";

export function SiteFooter() {
  return (
    <footer className={s.foot} data-about-rest data-page-reveal="5">
      <div className={s.wordmark} aria-hidden="true">
        <img className={s.nico} src="/about/nico.svg" width={330} height={101} alt="" />
        <img
          className={s.campanell}
          src="/about/campanell.svg"
          width={827}
          height={101}
          alt=""
        />
      </div>
      <p className="sr-only">Nico Campanell</p>

      <div className={`${s.meta} ${s.mono}`}>
        <div className={s.contact}>
          <p>contact:</p>
          <a className={`u-link ${s.mail}`} href="mailto:nicocampanell@gmail.com">
            nicocampanell@gmail.com
          </a>
          <div className={s.icons}>
            {SOCIAL_ICONS.map((icon) => (
              <a key={icon.href} href={icon.href} rel="me" aria-label={icon.label}>
                <img src={icon.src} width={icon.size} height={icon.size} alt="" />
              </a>
            ))}
          </div>
        </div>
        <div className={s.legal}>
          <p>© all rights reserved</p>
          <AboutClock />
          <p>austin, tx</p>
        </div>
      </div>
    </footer>
  );
}
