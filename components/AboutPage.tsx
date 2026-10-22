import Image from "next/image";
import portrait from "@/public/about/portrait.webp";
import cycling from "@/public/about/cycling.webp";
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
            <p className={`${s.crumb} ${s.body}`} data-crumb data-page-reveal="0">
              <TransitionLink href="/" mode="collapse-flip" className="u-link">
                NICO CAMPANELL
              </TransitionLink>
              <svg
                className={s.chevron}
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                data-chevron
              >
                <path d="M10 8.5 15 12l-5 3.5V8.5Z" fill="currentColor" />
              </svg>
              <span className={`${s.here} ${s.caption}`} aria-current="page">
                about
              </span>
            </p>

            <div className={s.rest} data-about-rest>
              <section className={s.intro} data-page-reveal="1" aria-labelledby="about-hi">
                <h1 className={s.hi} id="about-hi">
                  hi, im nico!
                </h1>
                <div className={s.photos}>
                  <div className={s.photoFrame} data-cursor="nyc">
                    <Image
                      className={s.portrait}
                      src={portrait}
                      alt="Nico on a snowy street beneath the Manhattan Bridge"
                      sizes="(max-width: 864px) calc(33.5vw - 20.1px), (max-width: 938px) calc(33.5vw - 36.18px), 278px"
                      quality={90}
                      loading="eager"
                    />
                  </div>
                  <div className={s.photoFrame} data-cursor="tandem">
                    <Image
                      className={s.cycling}
                      src={cycling}
                      alt="Two people cycling beside a lake and mountains"
                      sizes="(max-width: 864px) calc(66.5vw - 39.9px), (max-width: 938px) calc(66.5vw - 71.82px), 552px"
                      quality={90}
                      preload
                    />
                  </div>
                </div>
                <div className={`${s.bio} ${s.body}`}>
                  {ABOUT_BIO.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
              </section>

              <section className={s.section} data-page-reveal="2" aria-labelledby="about-exp">
                <h2 className={s.head} id="about-exp">
                  experience &amp; leadership
                  <img className={s.rule} src="/about/experience-rule.svg" width={601} height={1} alt="" aria-hidden="true" />
                </h2>
                <ul className={s.rows}>
                  {EXPERIENCE.map((row) => (
                    <li key={row.org} className={s.row}>
                      <div className={`${s.left} ${s.body}`}>
                        <span className={s.org}>{row.org}</span>
                        <span className={s.role}>{row.role}</span>
                      </div>
                      <span className={`${s.when} ${s.caption}`}>{row.when}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={s.section} data-page-reveal="3" aria-labelledby="about-edu">
                <h2 className={s.head} id="about-edu">
                  education
                  <img className={s.rule} src="/about/education-rule.svg" width={728} height={1} alt="" aria-hidden="true" />
                </h2>
                <ul className={s.rows}>
                  <li className={s.row}>
                    <div className={`${s.left} ${s.body}`}>
                      <span className={s.org}>{EDUCATION.org}</span>
                      <span className={s.role}>{EDUCATION.detail}</span>
                    </div>
                    <span className={`${s.when} ${s.caption}`}>{EDUCATION.when}</span>
                  </li>
                </ul>
              </section>

              <section className={s.section} data-page-reveal="4" aria-labelledby="about-hello">
                <h2 className={s.head} id="about-hello">
                  say hello
                  <img className={s.rule} src="/about/hello-rule.svg" width={740} height={1} alt="" aria-hidden="true" />
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
