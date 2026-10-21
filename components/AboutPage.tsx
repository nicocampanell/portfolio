import {
  ABOUT_BIO,
  EDUCATION,
  EXPERIENCE,
  HELLO,
} from "@/content/about";
import { SiteFooter } from "./SiteFooter";
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
                  hi, i’m nico
                </h1>
                <div className={`${s.bio} ${s.body}`}>
                  {ABOUT_BIO.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
              </section>

              <section className={`${s.section} ${s.rise}`} aria-labelledby="about-exp">
                <h2 className={`${s.head} ${s.mono}`} id="about-exp">
                  experience and leadership
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

          <SiteFooter />
        </div>
      </div>
    </AboutShell>
  );
}
