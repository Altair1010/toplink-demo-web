import { readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourceRoots = ["app", "components", "lib", "types", "styles"];
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".css"]);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : sourceExtensions.has(extname(path)) ? [path] : [];
  });
}

const files = sourceRoots.flatMap((directory) => walk(join(root, directory)));
const failures = [];
const directFixtureImport = /(?:from|import\s*\()\s*["']@\/lib\/fixtures/;
const forbiddenCode = [
  [/\bprice\s*[:=]/i, "price field"],
  [/\b(checkout|cart|bookingDatabase|leadDatabase)\b/i, "commerce or booking contract"],
  [/href=["']#["']/i, "fake hash destination"],
  [/0123456789|example\.com/i, "placeholder destination"],
];

for (const file of files) {
  const content = readFileSync(file, "utf8");
  const path = relative(root, file).replaceAll("\\", "/");

  if (!path.startsWith("lib/content/") && directFixtureImport.test(content)) {
    failures.push(`${path}: imports fixtures outside lib/content`);
  }

  for (const [pattern, label] of forbiddenCode) {
    if (pattern.test(content)) failures.push(`${path}: contains ${label}`);
  }
}

const routeFiles = [
  "app/page.tsx",
  "app/gioi-thieu/page.tsx",
  "app/dich-vu/page.tsx",
  "app/dich-vu/[slug]/page.tsx",
  "app/san-pham/page.tsx",
  "app/san-pham/[slug]/page.tsx",
  "app/kien-thuc/page.tsx",
  "app/kien-thuc/[slug]/page.tsx",
  "app/tin-tuc/page.tsx",
  "app/tin-tuc/[slug]/page.tsx",
  "app/khong-gian/page.tsx",
  "app/lien-he/page.tsx",
];

for (const route of routeFiles) {
  if (!files.some((file) => relative(root, file).replaceAll("\\", "/") === route)) {
    failures.push(`${route}: required route pattern missing`);
  }
}

const franchiseRoute = join(root, "app", "nhuong-quyen");
if (
  readdirSync(join(root, "app"), { withFileTypes: true }).some(
    (entry) => entry.name === "nhuong-quyen",
  )
) {
  failures.push(`${relative(root, franchiseRoute)}: backlog route must not be public`);
}

if (failures.length > 0) {
  console.error(`P4 content boundary failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `P4 content boundary passed: ${routeFiles.length} route patterns, ${files.length} source files.`,
);
