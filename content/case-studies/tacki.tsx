import type { ComponentProps } from "react";
import type { CaseStudy } from "@/lib/case-study";
import { ProblemConversation } from "@/components/case-studies/tacki/ProblemConversation";
import { ResearchArtifacts } from "@/components/case-studies/ResearchArtifacts";
import { IterationComparison } from "@/components/case-studies/IterationComparison";
import { DesignDecisions } from "@/components/case-studies/tacki/DesignDecisions";
import { ProjectTags } from "@/components/case-studies/CaseStudyBlocks";
import s from "@/components/case-studies/CaseStudy.module.css";

const project = {
  slug: "tacki",
  name: "Tacki",
  caption: "Tacki: Simplifying the experience for providing and receiving student services · Shipped 2026",
  description: "Designing Tacki, a student service marketplace: research, prototyping, and building trust between peers.",
  tags: ["0-1 Design", "Product Design", "User Research", "Visual Identity"],
  cover: {
    type: "animation",
    src: "/tacki/home-to-search.html",
    title: "Tacki home-to-search animation",
    background: "#3e4e47",
  },
} satisfies Omit<CaseStudy, "sections">;

const journeyCustomer = "/tacki/2f7c0.png";
const journeyProvider = "/tacki/7c1e6.png";
const competitiveAnalysis = "/tacki/9a058.png";
const interviewNotes = "/tacki/b2a78.png";
const interviewFindings = "/tacki/defa5.png";
const researchSynthesis = "/tacki/9878a.png";
const homeBefore = "/tacki/e0393.png";
const homeAfter = "/tacki/8e97c.png";
const searchBefore = "/tacki/af2a2.png";
const searchAfter = "/tacki/994c7.png";
const listingBefore = "/tacki/918f0.png";
const listingAfter = "/tacki/896fe.png";
const quoteLine = "/tacki/a43c0.svg";
const mailIcon = "/tacki/af581.svg";

const iterations: ComponentProps<typeof IterationComparison>[] = [
  {
    title: "Iteration #1 - Home Page",
    before: {
      image: homeBefore,
      alt: "Home page before user testing",
      crop: "homeBefore",
      insights: [
        "Testing found users wanted home to be for discovery",
        "Tags were not very valuable & too prioritized",
        "Cards were visually heavy",
      ],
    },
    after: {
      image: homeAfter,
      alt: "Home page after user testing",
      crop: "homeAfter",
      insights: [
        "Search is the main action",
        "Better IA from research insights",
        "Breaks up repetitive cards",
      ],
    },
  },
  {
    title: "Iteration #2 - Search",
    before: {
      image: searchBefore,
      alt: "Search page before user testing",
      crop: "searchBefore",
      insights: [
        "Too large of cards caused not enough info on page",
        "Too many CTAs caused decision paralysis",
        "“~” Created pricing ambiguity",
      ],
    },
    after: {
      image: searchAfter,
      alt: "Search page after user testing",
      crop: "searchAfter",
      insights: [
        "Search had important filters",
        "Better IA & sizing on cards",
      ],
    },
  },
  {
    title: "Iteration #3 - Listings",
    tallImages: true,
    before: {
      image: listingBefore,
      alt: "Service listing before user testing",
      insights: [
        "Send message was not the correct CTA",
        "Decision overload with multiple actions",
        "Only one image highlighted",
      ],
    },
    after: {
      image: listingAfter,
      alt: "Service listing and booking after user testing",
      insights: [
        "Gallery allows for a better view of the portfolio",
        "Added trust with friends booked",
        "Location added for ease of use but kept privacy",
      ],
    },
  }
];

export const tacki: CaseStudy = {
  ...project,
  sections: [
    {
      id: "overview",
      navLabel: "overview",
      className: s.projectOverview,
      content: (
        <>
          <div className={s.sectionIntro} data-node-id="590:12" data-name="Overview Content">
            <p className={s.sectionLabel} data-node-id="605:1000">
              overview
            </p>
            <h1 className={s.sectionTitle} data-node-id="590:10">
              Solo designing a 0-1 shipped solution to simplify how students receive and provided services between each other.
            </h1>
            <ProjectTags tags={project.tags} />
          </div>
          <div className={s.hero} data-node-id="156:501" data-name="Project Details">
            <div className={s.heroMediaWrapper} data-node-id="842:2554" data-name="Project Details Content">
              <div className={s.heroMedia} data-node-id="842:2557" data-name="Image">
                <iframe
                  className={s.heroFrame}
                  src="/tacki/home-to-search.html"
                  title="Tacki home-to-search walkthrough"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
            <div className={s.projectFacts} data-node-id="156:503" data-name="Project Info">
              <div className={s.timelineFact} data-node-id="156:504" data-name="Timeline">
                <p className={s.timelineLabel} data-node-id="156:505">
                  timeline
                </p>
                <p className={s.factValue} data-node-id="156:506">
                  3 months
                </p>
              </div>
              <div className={s.projectFact} data-node-id="156:507" data-name="Role">
                <p className={s.factLabel} data-node-id="156:508">
                  role
                </p>
                <div className={s.factLines} data-node-id="156:509">
                  <p className={s.layout}>Lead Designer</p>
                  <p className={s.layout2}>User Research</p>
                </div>
              </div>
              <div className={s.projectFact} data-node-id="156:510" data-name="Tools">
                <p className={s.factLabel} data-node-id="156:511">
                  tools
                </p>
                <div className={s.factLines} data-node-id="156:512">
                  <p className={s.layout}>Figma,</p>
                  <p className={s.layout2}>FigJam</p>
                </div>
              </div>
              <div className={s.projectFact} data-node-id="156:513" data-name="Team">
                <p className={s.factLabel} data-node-id="156:514">
                  team
                </p>
                <div className={s.factLines} data-node-id="156:515">
                  <p className={s.layout}>2 Engineers</p>
                  <p className={s.layout}>1 Product</p>
                  <p className={s.layout2}>1 Designer</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "problem",
      navLabel: "problem",
      className: s.sectionStack,
      content: (
        <>
          <div className={s.sectionStack} data-node-id="590:67" data-name="Problem Content">
            <div className={s.sectionIntro} data-node-id="590:13" data-name="Problem Description">
              <p className={s.sectionLabel} data-node-id="590:14">
                problem
              </p>
              <h2 className={s.sectionTitle} data-node-id="590:15">
                Students struggled to find services that were affordable, quick, and reliable, while service providers relied on word-of-mouth and missed income opportunities.
              </h2>
              <p className={s.sectionBody} data-node-id="590:16">
                Discovery was fragmented across social media and personal recommendations, and booking often meant messaging back and forth without clear availability or a dependable way to assess quality for both sides. Students also had busy schedules and low purchasing power to act.
              </p>
            </div>
            <div className={s.userQuotes} data-node-id="590:63" data-name="User Quotes">
              <div className={s.quote} data-node-id="590:23" data-name="Quote">
                <div className={s.layout3} data-node-id="590:21">
                  <div className={s.layout4}>
                    <div className={s.layout5}>
                      <div className={s.layout6}>
                        <img alt="" className={s.layout7} src={quoteLine} />
                      </div>
                    </div>
                  </div>
                </div>
                <p className={s.quoteText} data-node-id="590:22">
                  “I would rather drive 3 hours home than to try to get a haircut here”
                </p>
              </div>
              <div className={s.quote} data-node-id="590:64" data-name="Quote">
                <div className={s.layout3} data-node-id="590:65">
                  <div className={s.layout4}>
                    <div className={s.layout5}>
                      <div className={s.layout6}>
                        <img alt="" className={s.layout7} src={quoteLine} />
                      </div>
                    </div>
                  </div>
                </div>
                <p className={s.quoteText} data-node-id="590:66">
                  “I paid $40 more for a haircut in Austin compared to home at a barber”
                </p>
              </div>
              <div className={s.quote2} data-node-id="590:24" data-name="Quote">
                <div className={s.layout3} data-node-id="590:25">
                  <div className={s.layout4}>
                    <div className={s.layout5}>
                      <div className={s.layout6}>
                        <img alt="" className={s.layout7} src={quoteLine} />
                      </div>
                    </div>
                  </div>
                </div>
                <p className={s.quoteText} data-node-id="590:26">
                  “I’ve been ghosted 6 times trying to get my nails done”
                </p>
              </div>
            </div>
          </div>
          <ProblemConversation />
        </>
      ),
    },
    {
      id: "research",
      navLabel: "research",
      className: s.researchFindings,
      content: (
        <>
          <div className={s.sectionIntro} data-node-id="590:17" data-name="Research Content">
            <p className={s.sectionLabel} data-node-id="590:18">
              research
            </p>
            <h2 className={s.sectionTitle} data-node-id="590:19">
              Understanding current behavior and pain points
            </h2>
            <div className={s.researchCopy} data-node-id="590:20">
              <p className={s.researchLead}>
                <span className={s.layout2}>{`We conducted `}</span>
                <span className={s.emphasis}>8 user interviews, 3 competitive analyses, 2 journey maps, and 1 field study</span>
                <span className={s.layout2}>{`  to get a better understanding of what current issues there were that were not visible at the surface.  `}</span>
              </p>
              <p className={s.researchParagraph}>​</p>
              <p className={s.researchParagraph}>Goals:</p>
              <ol className={s.layout8} start={1}>
                <li className={s.researchGoal}>
                  <span className={s.researchGoalText}>Understand what tools users are already using and whats working/failing</span>
                </li>
                <li className={s.researchGoalLast}>
                  <span className={s.researchGoalText}>Identify potential drivers for a good user experience when getting a service provided</span>
                </li>
              </ol>
            </div>
          </div>
          <ResearchArtifacts labels={["Journey mapping", "Competitive analysis", "Interviews"]}>
              <div className={s.imageColumn} data-node-id="592:359" data-name="Image Column">
                <div className={s.imageContainer} data-node-id="592:360" data-name="Image Container">
                  <div className={s.layout10} data-node-id="592:361">
                    <div className={s.layout11}>
                      <div className={s.image3} data-name="Image">
                        <img alt="Journey map for students booking services" loading="lazy" decoding="async" className={s.layout12} src={journeyCustomer} />
                      </div>
                    </div>
                  </div>
                  <div className={s.layout13} data-node-id="592:362">
                    <div className={s.layout14}>
                      <div className={s.image4} data-name="Image">
                        <img alt="Journey map for student service providers" loading="lazy" decoding="async" className={s.layout12} src={journeyProvider} />
                      </div>
                    </div>
                  </div>
                </div>
                <p className={s.researchCaption}>Journey mapping</p>
              </div>
              <div className={s.imageColumn2} data-node-id="771:78" data-name="Image Column">
                <div className={s.screen} data-node-id="771:82" data-name="Screenshot 2026-10-07 at 6.16.06 PM 1">
                  <img alt="Competitive analysis of student service platforms" loading="lazy" decoding="async" className={s.layout12} src={competitiveAnalysis} />
                </div>
                <p className={s.researchCaption}>Competitive analysis</p>
              </div>
              <div className={s.imageColumn3} data-node-id="771:84" data-name="Image Column">
                <div className={s.layout15} data-node-id="771:86">
                  <div className={s.layout16}>
                    <div className={s.screen2} data-name="Screenshot 2026-10-01 at 10.40.16 PM 1">
                      <img alt="Student interview notes" loading="lazy" decoding="async" className={s.layout12} src={interviewNotes} />
                    </div>
                  </div>
                </div>
                <div className={s.layout17} data-node-id="848:2586">
                  <div className={s.layout18}>
                    <div className={s.screen3} data-name="Screenshot 2026-10-14 at 12.24.10 AM 1">
                      <img alt="Interview findings for student service discovery" loading="lazy" decoding="async" className={s.layout12} src={interviewFindings} />
                      <div className={s.object} data-node-id="848:2588" data-name="Object">
                        <div className={s.layout19}>
                          <img alt="Research synthesis" loading="lazy" decoding="async" className={s.layout20} src={researchSynthesis} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className={s.researchCaption}>Interviews</p>
              </div>
          </ResearchArtifacts>
          <p className={s.researchSummary} data-node-id="596:406">
            <span className={s.researchSummaryText}>{`Research revealed both students’ schedules were packed and finding a `}</span>
            <span className={s.researchSummaryEmphasis}>time</span>
            <span className={s.researchSummaryText}>{` that worked was difficult; `}</span>
            <span className={s.researchSummaryEmphasis}>pricing</span>
            <span className={s.researchSummaryText}>{` was something that needed transparency; both sides need to `}</span>
            <span className={s.researchSummaryEmphasis}>trust</span>
            <span className={s.researchSummaryText}>{` each other to not cancel and to do a good job at the service; and they wished for a `}</span>
            <span className={s.researchSummaryEmphasis}>centralized</span>
            <span className={s.researchSummaryText}>{` place for all steps from discovery to booking`}</span>
          </p>
        </>
      ),
    },
    {
      id: "research-insights",
      className: s.sectionStack,
      content: (
        <>
          <div className={s.sectionIntro} data-node-id="593:400" data-name="Section Header">
            <p className={s.sectionLabel} data-node-id="593:401">
              research
            </p>
            <h2 className={s.sectionTitle} data-node-id="593:402">{`Insights on what mattered to students `}</h2>
            <p className={s.sectionBody} data-node-id="593:403">
              From research we got a better understanding of the problem space, user needs and failures within the system
            </p>
          </div>
          <div className={s.insights} data-node-id="681:77" data-name="Insights">
            <div className={s.insightColumn} data-node-id="681:76" data-name="Insight Column">
              <div className={s.insight} data-node-id="681:68" data-name="Insight">
                <p className={s.trustInsight} data-node-id="604:432">{`Trust booking services from peers they don’t  know`}</p>
              </div>
              <div className={s.insight} data-node-id="681:71" data-name="Insight">
                <p className={s.discoveryInsight} data-node-id="681:65">
                  Better discovery for services
                </p>
              </div>
            </div>
            <div className={s.insightColumn} data-node-id="681:75" data-name="Insight Column">
              <div className={s.insight} data-node-id="681:72" data-name="Insight">
                <p className={s.bookingInsight} data-node-id="681:73">
                  Convenience for booking services
                </p>
              </div>
              <div className={s.insight} data-node-id="681:70" data-name="Insight">
                <p className={s.providerInsight} data-node-id="681:67">
                  Providers want better outreach and tracking of service
                </p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "prototyping",
      navLabel: "prototyping",
      className: s.sectionStack,
      content: (
        <>
          <div className={s.prototypingIntro} data-node-id="771:71" data-name="Prototyping Intro">
            <div className={s.sectionIntro} data-node-id="601:412" data-name="Prototyping Content">
              <p className={s.sectionLabel} data-node-id="601:413">
                prototyping
              </p>
              <h2 className={s.sectionTitle} data-node-id="601:414">
                Ideation, iteration, addressing feedback
              </h2>
              <p className={s.sectionBody} data-node-id="601:415">{`From the insights found from research I developed several mid-fi frames and conducted user testing to fully understand what are users needed/valued. `}</p>
            </div>
          </div>
          <div className={s.iterations} data-node-id="842:1479" data-name="Sidebar">
            {iterations.map((iteration) => <IterationComparison key={iteration.title} {...iteration} />)}
          </div>
        </>
      ),
    },
    {
      id: "design-choices",
      navLabel: "design decisions",
      className: s.sectionStack,
      content: (
        <>
          <div className={s.sectionIntro} data-node-id="685:115" data-name="Design Decisions Intro">
            <p className={s.sectionLabel} data-node-id="685:116">
              design decisions
            </p>
            <h2 className={s.sectionTitle} data-node-id="685:117">
              Figuring out what worked &amp; what we needed
            </h2>
            <p className={s.sectionBody} data-node-id="685:118">
              During ideation and prototyping there were a few design decisions I had to fight for or take a deeper dive into based on research insights
            </p>
          </div>
          <DesignDecisions />
        </>
      ),
    },
    {
      id: "solution",
      navLabel: "solution",
      className: s.solutions,
      content: (
        <>
          <div className={s.sectionIntro} data-node-id="601:416" data-name="Solutions Intro">
            <p className={s.sectionLabel} data-node-id="601:417">
              solutions
            </p>
            <h2 className={s.sectionTitle} data-node-id="601:418">
              What I landed on
            </h2>
          </div>
          <div className={s.finalScreens} data-node-id="865:2784" data-name="Sidebar">
            <div className={s.demoSection} data-node-id="865:2786" data-name="Solutions Content">
              <p className={s.demoTitle} data-node-id="865:2785">
                Home to search
              </p>
              <div className={s.demoMedia} data-node-id="865:2779" data-name="Image">
                <iframe className={s.demoFrame} src="/tacki/home-to-search.html" title="Home to search animation" sandbox="allow-scripts" loading="lazy" />
              </div>
            </div>
            <div className={s.demoSection} data-node-id="865:2787" data-name="Solution Title">
              <p className={s.demoTitle} data-node-id="865:2788">
                Booking a listing
              </p>
              <div className={s.demoMedia} data-node-id="865:2789" data-name="Solution Title">
                <iframe className={s.demoFrame} src="/tacki/booking-demo.html" title="Booking a listing animation" sandbox="allow-scripts" loading="lazy" />
              </div>
            </div>
            <div className={s.demoSection} data-node-id="865:2796" data-name="Image">
              <p className={s.demoTitle} data-node-id="865:2797">
                Messaging
              </p>
              <div className={s.demoMedia} data-node-id="865:2798" data-name="Image">
                <iframe className={s.demoFrame} src="/tacki/messages.html?v=2" title="Tacki in-app messaging animation" sandbox="allow-scripts" />
              </div>
            </div>
            <div className={s.demoSection} data-node-id="865:2793" data-name="Solution Title">
              <p className={s.demoTitle} data-node-id="865:2794">
                Stats
              </p>
              <div className={s.demoMedia} data-node-id="865:2795" data-name="Solution Title">
                <iframe className={s.demoFrame} src="/tacki/stats.html" title="Stats animation" sandbox="allow-scripts" loading="lazy" />
              </div>
            </div>
            <div className={s.demoSection} data-node-id="865:2790" data-name="Image">
              <p className={s.demoTitle} data-node-id="865:2791">
                Log in with .edu
              </p>
              <div className={s.demoMedia} data-node-id="865:2792" data-name="Image">
                <iframe className={s.demoFrame} src="/tacki/login.html" title="Log in with .edu animation" sandbox="allow-scripts" loading="lazy" />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "reflection",
      navLabel: "reflection",
      className: s.sectionIntro,
      content: (
        <>
          <p className={s.sectionLabel} data-node-id="601:425">reflection</p>
          <h2 className={s.reflectionHeading} data-node-id="601:426">What I learned and whats next</h2>
          <div className={s.reflectionGroup} data-node-id="601:427">
            <p>Learnings:</p>
            <ul>
              <li><strong>Research and understand your user before designing.</strong> In my design process I made assumptions that were later proven wrong. To fully serve the user you need to understand their pain points</li>
              <li><strong>Cross-functional communication keeps teams moving.</strong> While working on this project I worked closely with my PM and engineers asking for their input on whether my designs were viable both technically and for the user.</li>
              <li><strong>Navigating ambiguity.</strong> With such a broad problem statement and multifaceted problem I had to think through each step so the user flow made sense.</li>
            </ul>
          </div>
          <div className={s.reflectionGroup} data-node-id="994:80">
            <p>Next Steps:</p>
            <ul>
              <li><strong>GTM strategy.</strong> Pilot beta by onboarding 5-10 student service providers and get their clients on the app</li>
              <li><strong>Continue user testing.</strong> Find and test more gaps in designs to create a better user experience</li>
              <li><strong>Establish presence on campus.</strong> Target incoming freshman without existing habits to change behavior</li>
            </ul>
          </div>
        </>
      ),
    },
  ],
  closing: (
        <div className={s.contactCallout} data-node-id="862:2689" data-name="Contact Info">
          <div className={s.calloutCopy} data-node-id="862:2688">
            <p className={s.calloutTitle}>This is just a snapshot of the full story and my design thinking</p>
            <p className={s.calloutBody}>Reach out to nicocampanell@gmail.com for the full story</p>
          </div>
          <a href="mailto:nicocampanell@gmail.com" aria-label="Email Nico about Tacki" className={s.emailIcon} data-node-id="862:2692" data-name="Email Icon">
            <div className={s.mailIcon} data-node-id="862:2690" data-name="mail_ai_regular">
              <img alt="" className={s.layout25} src={mailIcon} />
            </div>
          </a>
        </div>
  ),
};
