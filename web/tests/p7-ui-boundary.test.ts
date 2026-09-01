import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";
import test from "node:test";

const contactDirectory = readFileSync(
  new URL("../components/content/ContactDirectory.tsx", import.meta.url),
  "utf8",
);

test("contact UI consumes the centralized action and analytics boundaries", () => {
  assert.match(contactDirectory, /buildContactActions/);
  assert.match(contactDirectory, /TrackedContactLink/);
  assert.match(contactDirectory, /placement: ContactPlacement/);
  assert.doesNotMatch(contactDirectory, /`tel:\$\{/);
  assert.doesNotMatch(contactDirectory, /gtag\(|fbq\(|ttq\(/);
});

function sourceFiles(directory: URL): string[] {
  const root = directory.pathname.replace(/^\/(?:[A-Za-z]:)/, (match) => match.slice(1));
  return readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && [".ts", ".tsx"].includes(extname(entry.name)))
    .map((entry) => readFileSync(join(entry.parentPath, entry.name), "utf8"));
}

test("UI and route sources contain no direct vendor analytics calls or dormant pixel loaders", () => {
  const publicSources = [
    ...sourceFiles(new URL("../app/", import.meta.url)),
    ...sourceFiles(new URL("../components/", import.meta.url)),
  ].join("\n");
  assert.doesNotMatch(publicSources, /\b(?:gtag|fbq|ttq)\s*\(/);
  assert.doesNotMatch(
    publicSources,
    /googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|analytics\.tiktok\.com/,
  );
});
