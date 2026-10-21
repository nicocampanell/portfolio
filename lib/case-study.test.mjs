import assert from "node:assert/strict";
import { test } from "node:test";
import { validateCaseStudies } from "./case-study.ts";

const study = {
  slug: "example", name: "Example", caption: "Example project", description: "A case study",
  tags: [], cover: { type: "image", src: "/example/cover.png", title: "Example cover" },
  sections: [{ id: "overview", navLabel: "overview", content: null }],
};

test("independent case studies can reuse section names", () => {
  assert.doesNotThrow(() => validateCaseStudies([study, { ...study, slug: "another-project" }]));
});

test("duplicate and reserved routes fail before publishing", () => {
  assert.throws(() => validateCaseStudies([study, study]), /duplicate case study slug/);
  assert.throws(() => validateCaseStudies([{ ...study, slug: "about" }]), /reserved/);
  assert.throws(() => validateCaseStudies([{ ...study, slug: "../about" }]), /Invalid/);
});

test("missing sections and ambiguous sidebar anchors fail before publishing", () => {
  assert.throws(() => validateCaseStudies([{ ...study, sections: [] }]), /at least one section/);
  assert.throws(() => validateCaseStudies([{ ...study, sections: [...study.sections, ...study.sections] }]), /duplicate section id/);
});
