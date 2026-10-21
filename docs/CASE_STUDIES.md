# Adding a case study

Case studies share the Tacki layout, navigation, progress bar, transitions, typography, and footer. Each project owns its content and media.

## Where to edit

- `content/case-studies/tacki.tsx`: Tacki's title, description, tags, cover, sections, screenshots, and iteration notes.
- `components/case-studies/tacki/`: Tacki's custom conversation and design-decision diagrams. These are optional project-specific visuals.
- `components/case-studies/CaseStudyPage.tsx`: shared page frame. Section entries create the sidebar automatically.
- `components/case-studies/CaseStudyBlocks.tsx`: section introductions, gray tags, and image/animation frames.
- `components/case-studies/CaseStudy.module.css`: shared page styles. Use `SectionIntro` for new headings instead of Figma node-specific selectors.
- `components/case-studies/IterationComparison.tsx`: reusable before/after comparisons.
- `components/case-studies/ResearchArtifacts.tsx`: horizontal research gallery; pass matching `labels` and child cards. Each gallery has its own animated indicator.
- `components/CaseStudyCard.tsx`: shared homepage cover and hover tags.
- `content/cards.ts`: homepage card order.

## 1. Create the content file

Add `content/case-studies/my-project.tsx`. The content can include any combination of the shared blocks and custom React components; it does not have to copy Tacki's animations or section count.

```tsx
import type { CaseStudy } from "@/lib/case-study";
import { CaseStudyMedia, ProjectTags, SectionIntro } from "@/components/case-studies/CaseStudyBlocks";

const tags = ["Product Design", "User Research"];

export const myProject: CaseStudy = {
  slug: "my-project",
  name: "My Project",
  caption: "My Project: A short outcome · Shipped 2026",
  description: "A brief description for search engines and sharing.",
  tags,
  cover: {
    type: "image", // Use "animation" for an HTML animation.
    src: "/my-project/cover.png",
    title: "My Project product preview",
    background: "#f0f0f0",
  },
  sections: [
    {
      id: "overview",
      navLabel: "overview",
      content: <>
        <SectionIntro first label="overview" title="The problem and outcome" />
        <ProjectTags tags={tags} />
        <CaseStudyMedia src="/my-project/overview.png" title="Product overview" />
      </>,
    },
    {
      id: "problem",
      navLabel: "problem",
      content: <SectionIntro label="problem" title="What needed to change">
        <p>Your research, context, and problem statement.</p>
      </SectionIntro>,
    },
    // Add research, prototyping, design decisions, solution, and reflection
    // sections in the same way. Omit navLabel for content outside the sidebar.
  ],
};
```

Store project assets in `public/my-project/`. Reference them as `/my-project/...`. Section IDs must be unique within a project; separate projects can use the same section IDs. Slugs must be unique and use lowercase letters, digits, and hyphens. `/about` is reserved.

## 2. Register it

Import `myProject` in `content/case-studies/index.ts` and add it to `caseStudies`. Its page becomes available at `/my-project`; the route generates metadata automatically. Do not create another route file or copy the page frame.

## 3. Add its homepage card

Add this entry to `content/cards.ts` in the desired position:

```ts
{ kind: "case-study", id: "my-project-cover", slug: "my-project" },
```

The caption, tags, cover, and destination come from the case study entry, so they stay in sync. Blank slots use `{ kind: "placeholder", id: "project-2" }`. Replace a placeholder with a case-study entry when the next project is ready.

## Verify

Run `npm run check` and `npm run build`. The checks catch duplicate routes and section IDs. Then preview the new page at desktop and mobile widths, check its sidebar links and homepage cover, and play its media.

## Responsive screenshots and caching

For before/after comparisons, prefer static image imports (for example, `import before from "@/public/my-project/before.webp"`). `IterationComparison` derives the correct dimensions and responsive sources from them. If using a string URL, supply `width` and `height` in that before/after entry.

Keep content-fingerprinted files in `public/tacki/cached/` immutable. Their filenames contain the first 12 hexadecimal characters of SHA-256; replacing an image requires a new hash/filename and updated references. The checks enforce this rule. HTML files deliberately remain revalidatable.
