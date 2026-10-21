import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";

const directory = new URL("../public/tacki/cached/", import.meta.url);

test("immutable media URLs change when file contents change", () => {
  const files = readdirSync(directory);
  assert.ok(files.length > 0);
  for (const file of files) {
    const digest = createHash("sha256").update(readFileSync(new URL(file, directory))).digest("hex").slice(0, 12);
    assert.ok(file.includes(`.${digest}.`), `${file}: update the filename and its references when replacing cached content`);
  }
});

test("standalone demo references only existing fingerprinted media", () => {
  const html = readFileSync(new URL("../public/tacki/home-to-search.html", import.meta.url), "utf8");
  const files = new Set(readdirSync(directory));
  const urls = [...html.matchAll(/\/tacki\/cached\/([a-z0-9.-]+)/g)];
  assert.ok(urls.length > 0);
  for (const [, file] of urls) assert.ok(files.has(file), `Missing demo image ${file}`);
});
