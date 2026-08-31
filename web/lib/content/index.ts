import { getCmsArticleBySlug, getCmsArticles } from "@/lib/cms/articles";
import { getCmsProductBySlug, getCmsProducts } from "@/lib/cms/products";
import { getCmsServiceBySlug, getCmsServices } from "@/lib/cms/services";
import { getCmsSiteSettings } from "@/lib/cms/site-settings";
import type { Article, ArticleType, Product, Service, SiteSettings } from "@/types/domain";

export interface ContentSnapshot {
  readonly fixtureOnly: boolean;
  readonly source: string;
}

export function getContentSnapshot(): ContentSnapshot {
  return { fixtureOnly: false, source: "wordpress" };
}

export function getSiteSettings(): Promise<SiteSettings> {
  return getCmsSiteSettings();
}

export function getServices(): Promise<readonly Service[]> {
  return getCmsServices();
}

export function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return getCmsServiceBySlug(slug);
}

export function getProducts(): Promise<readonly Product[]> {
  return getCmsProducts();
}

export function getProductBySlug(slug: string): Promise<Product | undefined> {
  return getCmsProductBySlug(slug);
}

export function getArticles(type?: ArticleType): Promise<readonly Article[]> {
  return getCmsArticles(type);
}

export function getArticleBySlug(slug: string, type?: ArticleType): Promise<Article | undefined> {
  return getCmsArticleBySlug(slug, type);
}
