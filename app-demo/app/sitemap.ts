import type { MetadataRoute } from "next";
import { SERVICES, POSTS } from "@/data/content";

const BASE = "https://altair1010.github.io/toplink-demo-web";

// Static export: file sitemap.xml được sinh lúc build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/gioi-thieu",
    "/dich-vu",
    "/quy-trinh-tri-lieu",
    "/khong-gian",
    "/dat-lich",
    "/lien-he",
    "/san-pham",
    "/dao-tao",
    "/nhuong-quyen",
    "/tin-tuc",
  ].map((path) => ({
    url: `${BASE}${path}/`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/dich-vu" || path === "/dat-lich" ? 0.9 : 0.7,
  }));

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${BASE}/dich-vu/${s.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postRoutes = POSTS.map((p) => ({
    url: `${BASE}/tin-tuc/${p.slug}/`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
