/**
 * Kiểm token mồ côi — thứ `next build` KHÔNG bắt được.
 *
 * Tailwind chỉ sinh CSS cho class có token tương ứng trong `@theme`. Nếu JSX viết
 * `bg-crimson-900` mà `--color-crimson-900` không tồn tại, Tailwind lặng lẽ không
 * sinh gì: build vẫn xanh, còn nền thì trong suốt. Script này bắt đúng ca đó.
 *
 * Chạy: node scripts/check-tokens.mjs   (hoặc `npm run check:tokens`)
 * Thoát 1 nếu có class trỏ tới token không tồn tại.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// KHÔNG dùng import.meta.dirname — chỉ có từ Node 20.11. CI pin `node-version: 20`
// nên bản resolve được có thể cũ hơn. Dạng dưới chạy từ Node 18 trở lên.
const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TOKENS = path.join(APP, "styles/tokens.css");

// Tiền tố utility Tailwind ăn vào namespace --color-*
const COLOR_PREFIXES = [
  "bg",
  "text",
  "border",
  "from",
  "to",
  "via",
  "fill",
  "stroke",
  "ring",
  "divide",
  "outline",
  "decoration",
  "shadow",
  "placeholder",
  "caret",
  "accent",
];

// Họ màu do dự án khai (không tính scale mặc định của Tailwind như red-500)
const BRAND_FAMILIES =
  /^(crimson|gold|wood|jade|ink|clay|sand|mist|cream|ivory|paper|accent-red)(-[a-z0-9]+)*$/;

function readSources() {
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) {
        if (!["node_modules", ".next", "out", "scripts"].includes(e.name)) walk(p);
      } else if (/\.tsx?$/.test(e.name)) {
        out.push(p);
      }
    }
  })(APP);
  return out;
}

const tokensCss = fs.readFileSync(TOKENS, "utf8");
const defined = new Set([...tokensCss.matchAll(/--color-([a-z0-9-]+)\s*:/g)].map((m) => m[1]));

const problems = [];
for (const file of readSources()) {
  const src = fs.readFileSync(file, "utf8");
  src.split(/\r?\n/).forEach((line, i) => {
    for (const m of line.matchAll(/[\w-]*class(?:Name)?\s*=\s*[{"'`]([^"'`}]+)/g)) {
      for (const raw of m[1].split(/\s+/)) {
        if (!raw) continue;
        const cls = raw.replace(/^[a-z-]+:/, "").split("/")[0]; // bỏ variant: và /opacity
        const dash = cls.indexOf("-");
        if (dash < 0) continue;
        const prefix = cls.slice(0, dash);
        const name = cls.slice(dash + 1);
        if (!COLOR_PREFIXES.includes(prefix)) continue;
        if (!BRAND_FAMILIES.test(name)) continue;
        if (defined.has(name)) continue;
        problems.push({
          file: path.relative(APP, file),
          line: i + 1,
          cls,
          need: `--color-${name}`,
        });
      }
    }
  });
}

if (problems.length === 0) {
  console.log(`check-tokens: OK — ${defined.size} token màu, 0 class mồ côi.`);
  process.exit(0);
}

console.error(`check-tokens: ${problems.length} class trỏ tới token KHÔNG tồn tại\n`);
for (const p of problems) {
  console.error(`  ${p.file}:${p.line}  ${p.cls}  → cần ${p.need} trong styles/tokens.css`);
}
console.error("\nTailwind không sinh CSS cho các class này. Build vẫn xanh, giao diện thì sai.");
process.exit(1);
