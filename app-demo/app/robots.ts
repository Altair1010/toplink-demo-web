import type { MetadataRoute } from "next";

const BASE = "https://altair1010.github.io/toplink-demo-web";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
