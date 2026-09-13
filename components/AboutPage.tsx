import {
  ABOUT_BIO,
  EDUCATION,
  EXPERIENCE,
  HELLO,
  SOCIAL_ICONS,
} from "@/content/about";
import { AboutClock } from "./AboutClock";
import { AboutShell } from "./AboutShell";
import { TransitionLink } from "./TransitionLink";
import s from "./AboutPage.module.css";

export function AboutPage() {
  return (
    <AboutShell className={s.shell}>
      <div className={s.inner}>
        <div className={s.page}>
          <div className={s.main}>
            <p className={`${s.crumb} ${s.body} ${s.rise}`} data-crumb>
              <TransitionLink href="/" mode="collapse-flip" className="u-link">
                NICO CAMPANELL
              </TransitionLink>
              <img
                className={s.chevron}
                src="/about/chevron.svg"
                width={24}
                height={24}
                alt=""
                data-chevron
              />
              <span className={`${s.here} ${s.mono}`} aria-current="page">
                about me
              </span>
            </p>

            <div className={s.rest} data-about-rest>
              <section className={`${s.intro} ${s.rise}`} aria-labelledby="about-hi">
                <h1 className={`${s.hi} ${s.mono}`} id="about-hi">
                  hi, im nico!
                </h1>
                <div className={`${s.bio} ${s.body}`}>
                  {ABOUT_BIO.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
              </section>

              <section className={`${s.section} ${s.rise}`} aria-labelledby="about-exp">
                <h2 className={`${s.head} ${s.mono}`} id="about-exp">
                  experience & leadership
                </h2>
                <ul className={s.rows}>
                  {EXPERIENCE.map((row) => (
                    <li key={row.org} className={s.row}>
                      <div className={`${s.left} ${s.body}`}>
                        <span className={s.org}>{row.org}</span>
                        <span className={s.role}>{row.role}</span>
                      </div>
                      <span className={`${s.when} ${s.mono}`}>{row.when}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={`${s.section} ${s.rise}`} aria-labelledby="about-edu">
                <h2 className={`${s.head} ${s.mono}`} id="about-edu">
                  education
                </h2>
                <ul className={s.rows}>
                  <li className={s.row}>
                    <div className={`${s.left} ${s.body}`}>
                      <span className={s.org}>{EDUCATION.org}</span>
                      <span className={s.role}>{EDUCATION.detail}</span>
                    </div>
                    <span className={`${s.when} ${s.mono}`}>{EDUCATION.when}</span>
                  </li>
                </ul>
              </section>

              <section className={`${s.section} ${s.rise}`} aria-labelledby="about-hello">
                <h2 className={`${s.head} ${s.mono}`} id="about-hello">
                  say hello
                </h2>
                <ul className={`${s.hello} ${s.body}`}>
                  {HELLO.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        rel={"rel" in link ? link.rel : undefined}
                        className="u-link"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <footer className={`${s.foot} ${s.rise}`} data-about-rest>
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
        </div>
      </div>
    </AboutShell>
  );
}
