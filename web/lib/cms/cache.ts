export const CMS_REVALIDATE_SECONDS = 3600;

export const cmsTags = {
  services: "cms:services",
  service: (slug: string) => `cms:service:${slug}`,
  products: "cms:products",
  product: (slug: string) => `cms:product:${slug}`,
  articles: "cms:articles",
  article: (slug: string) => `cms:article:${slug}`,
  articleType: (type: string) => `cms:article-type:${type}`,
  media: "cms:media",
  mediaItem: (id: number) => `cms:media:${id}`,
  siteSettings: "cms:site-settings",
} as const;

import type { WebhookDependency, WebhookEvent } from "@/lib/cms/signatures";

export interface RevalidationTarget {
  readonly tags: readonly string[];
  readonly paths: readonly string[];
}

function appendDependency(dependency: WebhookDependency, tags: string[], paths: string[]): void {
  if (dependency.domain === "Service") {
    tags.push(cmsTags.services, cmsTags.service(dependency.slug));
    paths.push("/", "/dich-vu", `/dich-vu/${dependency.slug}`);
  } else if (dependency.domain === "Product") {
    tags.push(cmsTags.products, cmsTags.product(dependency.slug));
    paths.push("/san-pham", `/san-pham/${dependency.slug}`);
  } else {
    tags.push(
      cmsTags.articles,
      cmsTags.article(dependency.slug),
      cmsTags.articleType(dependency.article_type ?? "news"),
    );
    const base = dependency.article_type === "knowledge" ? "/kien-thuc" : "/tin-tuc";
    paths.push(base, `${base}/${dependency.slug}`);
    if (dependency.article_type === "knowledge") paths.push("/");
  }
}

export function revalidationForEvent(event: WebhookEvent): RevalidationTarget {
  const tags: string[] = [];
  const paths: string[] = [];
  if (event.domain === "Service" && event.slug) {
    appendDependency({ domain: "Service", slug: event.slug }, tags, paths);
    if (event.previous_slug) {
      tags.push(cmsTags.service(event.previous_slug));
      paths.push(`/dich-vu/${event.previous_slug}`);
    }
  } else if (event.domain === "Product" && event.slug) {
    appendDependency({ domain: "Product", slug: event.slug }, tags, paths);
    if (event.previous_slug) {
      tags.push(cmsTags.product(event.previous_slug));
      paths.push(`/san-pham/${event.previous_slug}`);
    }
  } else if (event.domain === "Article" && event.slug) {
    appendDependency(
      { domain: "Article", slug: event.slug, article_type: event.article_type },
      tags,
      paths,
    );
    if (event.previous_slug) {
      tags.push(cmsTags.article(event.previous_slug));
      const base = event.article_type === "knowledge" ? "/kien-thuc" : "/tin-tuc";
      paths.push(`${base}/${event.previous_slug}`);
    }
  } else if (event.domain === "Media") {
    tags.push(cmsTags.media, cmsTags.mediaItem(event.id));
    for (const dependency of event.dependencies ?? []) {
      appendDependency(dependency, tags, paths);
    }
  } else if (event.domain === "SiteSettings") {
    tags.push(cmsTags.siteSettings);
    paths.push("/", "/lien-he");
  }
  return { tags: [...new Set(tags)], paths: [...new Set(paths)] };
}
