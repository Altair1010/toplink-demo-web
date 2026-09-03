import type { MetadataRoute } from "next";

import { CmsUnavailableError } from "@/lib/cms/errors";
import { getArticles, getProducts, getServices, getSiteSettings } from "@/lib/content";
import { currentPublicSiteEnvironment } from "@/lib/seo/origin";
import { createSitemap } from "@/lib/seo/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [services, products, articles, settings] = await Promise.all([
      getServices(),
      getProducts(),
      getArticles(),
      getSiteSettings(),
    ]);
    return createSitemap(
      { services, products, articles, settings },
      currentPublicSiteEnvironment(),
    );
  } catch (error) {
    if (error instanceof CmsUnavailableError) return [];
    throw error;
  }
}
