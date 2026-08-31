import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");

function filesUnder(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory()
      ? filesUnder(path)
      : [".ts", ".tsx"].includes(extname(path))
        ? [path]
        : [];
  });
}

test("public runtime has no fixture source import or notice", () => {
  const runtimeFiles = filesUnder(join(root, "app")).concat(
    filesUnder(join(root, "components")),
    filesUnder(join(root, "lib", "content")),
    filesUnder(join(root, "lib", "cms")),
  );
  const violations = runtimeFiles.filter((path) => {
    if (path.endsWith(`${join("components", "content", "FixtureNotice.tsx")}`)) return false;
    const source = readFileSync(path, "utf8");
    return source.includes("@/lib/fixtures") || source.includes("FixtureNotice");
  });
  assert.deepEqual(violations, []);
});

test("CMS transport is explicitly server-only and fixture-free", () => {
  const client = readFileSync(join(root, "lib", "cms", "wp-client.ts"), "utf8");
  assert.match(client, /^import ["']server-only["'];/);
  assert.doesNotMatch(client, /fixtures/);
});

test("Client Components cannot import the CMS or content server boundary", () => {
  const clientFiles = filesUnder(join(root, "app"))
    .concat(filesUnder(join(root, "components")))
    .filter((path) => readFileSync(path, "utf8").trimStart().startsWith('"use client"'));
  const violations = clientFiles.filter((path) =>
    /@\/lib\/(?:cms|content)/.test(readFileSync(path, "utf8")),
  );
  assert.deepEqual(violations, []);
});
