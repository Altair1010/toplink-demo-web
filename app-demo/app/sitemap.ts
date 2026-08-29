import type { MetadataRoute } from "next";
const BASE = "https://altair1010.github.io/toplink-demo-web";

// Static export: file sitemap.xml được sinh lúc build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/gioi-thieu",
    "/dich-vu",
    "/quy-trinh-tri-lieu",
    "/lien-he",
    "/tin-tuc",
  ].map((path) => ({
    url: `${BASE}${path}/`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/dich-vu" ? 0.9 : 0.7,
  }));
  return staticRoutes;
}
