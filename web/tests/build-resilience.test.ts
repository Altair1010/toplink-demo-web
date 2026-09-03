import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { CmsUnavailableError } from "../lib/cms/errors.ts";
import { safeStaticSlugs } from "../lib/cms/static-params.ts";

test("static slug generation maps CMS records when the CMS is available", async () => {
  const result = await safeStaticSlugs(async () => [
    { slug: { value: "mot" } },
    { slug: { value: "hai" } },
  ]);

  assert.deepEqual(result, [{ slug: "mot" }, { slug: "hai" }]);
});

test("static slug generation defers to runtime when the CMS is unavailable", async () => {
  const result = await safeStaticSlugs(async () => {
    throw new CmsUnavailableError("offline during build");
  });

  assert.deepEqual(result, []);
});

test("static slug generation does not hide non-availability defects", async () => {
  await assert.rejects(
    safeStaticSlugs(async () => {
      throw new TypeError("invalid CMS record");
    }),
    /invalid CMS record/,
  );
});

test("CMS-backed index routes remain runtime-rendered for cold deployment builds", async () => {
  const pages = [
    "app/page.tsx",
    "app/dich-vu/page.tsx",
    "app/san-pham/page.tsx",
    "app/kien-thuc/page.tsx",
    "app/tin-tuc/page.tsx",
    "app/lien-he/page.tsx",
  ];

  for (const page of pages) {
    const source = await readFile(page, "utf8");
    assert.match(source, /export const dynamic = ["']force-dynamic["'];/, page);
  }
});
