import type { MetadataRoute } from "next";

import { buildContactActions } from "../contact/actions.ts";
import type { Article, Product, Service, SiteSettings } from "../../types/domain/index.ts";
import { isPublicSeoRecord } from "./eligibility.ts";
import {
  canonicalUrl,
  configuredPublicSiteOrigin,
  isProductionIndexingEnabled,
  type PublicSiteEnvironment,
} from "./origin.ts";

export interface SitemapContent {
  readonly services: readonly Service[];
  readonly products: readonly Product[];
  readonly articles: readonly Article[];
  readonly settings: SiteSettings;
}

export function isPublicSitemapRecord(record: Service | Product | Article): boolean {
  return isPublicSeoRecord(record);
}

function uniqueEntries(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return [...new Map(entries.map((entry) => [entry.url, entry])).values()];
}

export function createSitemap(
  content: SitemapContent,
  environment: PublicSiteEnvironment,
): MetadataRoute.Sitemap {
  const origin = configuredPublicSiteOrigin(environment);
  if (!origin || !isProductionIndexingEnabled(environment)) return [];

  const services = content.services.filter(isPublicSitemapRecord);
  const products = content.products.filter(isPublicSitemapRecord);
  const articles = content.articles.filter(isPublicSitemapRecord);
  const knowledge = articles.filter((record) => record.article_type.value === "knowledge");
  const news = articles.filter((record) => record.article_type.value !== "knowledge");

  const entries: MetadataRoute.Sitemap = [
    { url: canonicalUrl(origin, "/") },
    { url: canonicalUrl(origin, "/gioi-thieu") },
  ];
  if (services.length) entries.push({ url: canonicalUrl(origin, "/dich-vu") });
  if (products.length) entries.push({ url: canonicalUrl(origin, "/san-pham") });
  if (knowledge.length) entries.push({ url: canonicalUrl(origin, "/kien-thuc") });
  if (news.length) entries.push({ url: canonicalUrl(origin, "/tin-tuc") });
  if (buildContactActions(content.settings).length) {
    entries.push({ url: canonicalUrl(origin, "/lien-he") });
  }

  for (const record of services) {
    entries.push({ url: canonicalUrl(origin, record.seo.value.canonicalPath) });
  }
  for (const record of products) {
    entries.push({ url: canonicalUrl(origin, record.seo.value.canonicalPath) });
  }
  for (const record of articles) {
    entries.push({
      url: canonicalUrl(origin, record.seo.value.canonicalPath),
      lastModified: record.updated_at?.value ?? record.published_at.value,
    });
  }
  return uniqueEntries(entries);
}
