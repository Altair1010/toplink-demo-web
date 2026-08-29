import { existsSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const outputRoot = join(process.cwd(), "out");
const basePath = "/toplink-demo-web";
const publicRoutes = [
  "/",
  "/gioi-thieu",
  "/dich-vu",
  "/quy-trinh-tri-lieu",
  "/lien-he",
  "/tin-tuc",
];
const forbiddenRoutes = [
  "/dat-lich",
  "/motion-lab",
  "/motion-lab/humanizer-h4",
  "/motion-lab/humanizer-h4r",
  "/dich-vu/goi-dau-duong-sinh",
  "/khong-gian",
  "/san-pham",
  "/dao-tao",
  "/nhuong-quyen",
  "/tin-tuc/cham-soc-co-vai-gay",
];

if (!existsSync(outputRoot)) {
  throw new Error("Thiếu thư mục out/. Hãy chạy npm run build trước check:release.");
}

const routeFile = (route) =>
  route === "/" ? join(outputRoot, "index.html") : join(outputRoot, route.slice(1), "index.html");
const failures = [];

for (const route of publicRoutes) {
  const file = routeFile(route);
  if (!existsSync(file)) {
    failures.push(`Thiếu public route ${route}`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) failures.push(`${route}: cần đúng 1 h1, nhận ${h1Count}`);
  if (/\/dat-lich|Đặt lịch|đặt lịch|BookingStepper|\?need=/iu.test(html)) {
    failures.push(`${route}: còn dấu vết booking trong HTML công khai`);
  }
  if (/<form\b|type=["']submit["']/iu.test(html)) {
    failures.push(`${route}: còn form/submit trên bề mặt thông tin`);
  }
}

for (const route of forbiddenRoutes) {
  if (existsSync(routeFile(route))) failures.push(`Route bị cấm vẫn được export: ${route}`);
}

const htmlFiles = publicRoutes.map(routeFile);
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const href of html.matchAll(/href=["']([^"']+)["']/giu)) {
    const target = normalizeInternalHref(href[1]);
    if (!target) continue;
    if (!existsSync(routeFile(target))) {
      failures.push(`${relative(outputRoot, file)}: liên kết nội bộ chết ${href[1]}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`check-release-surface: FAIL (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `check-release-surface: OK — ${publicRoutes.length} public routes, 0 booking trace, 0 forbidden route, 0 dead internal link.`,
);

function normalizeInternalHref(value) {
  if (/^(?:https?:|mailto:|tel:|#)/iu.test(value)) return null;
  const withoutQuery = value.split(/[?#]/u)[0];
  if (!withoutQuery.startsWith("/")) return null;
  const withoutBase = withoutQuery.startsWith(basePath)
    ? withoutQuery.slice(basePath.length) || "/"
    : withoutQuery;
  const route = `/${withoutBase.replace(/^\/+|\/+$/gu, "")}`.split(sep).join("/");
  if (route.startsWith("/_next/") || /\.[a-z0-9]+$/iu.test(route)) return null;
  return route === "//" ? "/" : route;
}
