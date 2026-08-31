import { getCmsArticleBySlug, getCmsArticles } from "@/lib/cms/articles";
import { getPreviewArticle, getPreviewProduct, getPreviewService } from "@/lib/cms/preview";
import { getPreviewSession } from "@/lib/cms/preview-session";
import { getCmsRedirect, type RedirectResource } from "@/lib/cms/redirects";
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

export function getContentRedirect(
  resource: RedirectResource,
  oldSlug: string,
): Promise<string | undefined> {
  return getCmsRedirect(resource, oldSlug);
}

export function getSiteSettings(): Promise<SiteSettings> {
  return getCmsSiteSettings();
}

export function getServices(): Promise<readonly Service[]> {
  return getCmsServices();
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const preview = await getPreviewSession("service", slug);
  return preview ? getPreviewService(preview) : getCmsServiceBySlug(slug);
}

export function getProducts(): Promise<readonly Product[]> {
  return getCmsProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const preview = await getPreviewSession("product", slug);
  return preview ? getPreviewProduct(preview) : getCmsProductBySlug(slug);
}

export function getArticles(type?: ArticleType): Promise<readonly Article[]> {
  return getCmsArticles(type);
}

export async function getArticleBySlug(
  slug: string,
  type?: ArticleType,
): Promise<Article | undefined> {
  const preview = await getPreviewSession("post", slug);
  if (!preview) return getCmsArticleBySlug(slug, type);
  const article = await getPreviewArticle(preview);
  return type && article.article_type.value !== type ? undefined : article;
}
