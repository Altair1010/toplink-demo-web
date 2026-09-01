import type { MetadataRoute } from "next";

import {
  canonicalUrl,
  configuredPublicSiteOrigin,
  isProductionIndexingEnabled,
  type PublicSiteEnvironment,
} from "./origin.ts";

export function createRobotsPolicy(environment: PublicSiteEnvironment): MetadataRoute.Robots {
  const origin = configuredPublicSiteOrigin(environment);
  const sitemap = origin ? canonicalUrl(origin, "/sitemap.xml") : undefined;
  if (!isProductionIndexingEnabled(environment)) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      ...(sitemap ? { sitemap } : {}),
    };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/wordpress/"] },
    ...(sitemap ? { sitemap } : {}),
  };
}
