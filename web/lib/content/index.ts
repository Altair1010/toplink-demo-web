import { articles, fixtureManifest, products, services, siteSettings } from "@/lib/fixtures/data";
import type { Article, ArticleType, Product, Service, SiteSettings } from "@/types/domain";

export interface ContentSnapshot {
  readonly fixtureOnly: boolean;
  readonly source: string;
}

export function getContentSnapshot(): ContentSnapshot {
  return { fixtureOnly: fixtureManifest.fixtureOnly, source: fixtureManifest.source };
}

export function getSiteSettings(): SiteSettings {
  return siteSettings;
}

export function getServices(): readonly Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug.value === slug);
}

export function getProducts(): readonly Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug.value === slug);
}

export function getArticles(type?: ArticleType): readonly Article[] {
  return type ? articles.filter((article) => article.article_type.value === type) : articles;
}

export function getArticleBySlug(slug: string, type?: ArticleType): Article | undefined {
  return articles.find(
    (article) => article.slug.value === slug && (!type || article.article_type.value === type),
  );
}
