import { buildContactActions } from "../contact/actions.ts";
import type {
  Article,
  ContentField,
  Media,
  Service,
  SiteSettings,
} from "../../types/domain/index.ts";
import { isPublicSeoRecord } from "./eligibility.ts";
import { canonicalUrl } from "./origin.ts";

export type JsonLdObject = Record<string, unknown>;

export interface BreadcrumbItem {
  readonly name: string;
  readonly path: string;
}

function approved<T>(field: ContentField<T> | undefined): T | undefined {
  return field?.status === "APPROVED" ? field.value : undefined;
}

function approvedMediaUrl(media: Media | undefined): string | undefined {
  if (!media) return undefined;
  const asset = approved(media.asset);
  const authorization = approved(media.authorization);
  const publishability = approved(media.publishability_status);
  const alt = approved(media.alt_text);
  if (!asset || !authorization?.trim() || !publishability?.trim() || !alt?.trim()) return undefined;
  try {
    const url = new URL(asset.src);
    return ["http:", "https:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function createBreadcrumbList(
  items: readonly BreadcrumbItem[],
  origin: URL,
): JsonLdObject | undefined {
  const publicItems = items.filter((item) => item.name.trim() && item.path.startsWith("/"));
  if (publicItems.length < 2) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: publicItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name.trim(),
      item: canonicalUrl(origin, item.path),
    })),
  };
}

export function createServiceStructuredData(
  service: Service,
  origin: URL,
): JsonLdObject | undefined {
  if (!isPublicSeoRecord(service)) return undefined;
  const name = approved(service.title);
  const description = approved(service.seo)?.description;
  const serviceType = approved(service.service_group);
  const canonicalPath = approved(service.seo)?.canonicalPath;
  if (!name?.trim() || !description?.trim() || !serviceType?.trim() || !canonicalPath) {
    return undefined;
  }
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: canonicalUrl(origin, canonicalPath),
  };
}

export function createArticleStructuredData(
  article: Article,
  origin: URL,
): JsonLdObject | undefined {
  if (!isPublicSeoRecord(article)) return undefined;
  const headline = approved(article.title);
  const seo = approved(article.seo);
  const author = approved(article.author);
  const datePublished = approved(article.published_at);
  if (!headline?.trim() || !seo || !author?.trim() || !datePublished?.trim()) return undefined;
  const image = approvedMediaUrl(approved(article.featured_media));
  const dateModified = approved(article.updated_at);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description: seo.description,
    mainEntityOfPage: canonicalUrl(origin, seo.canonicalPath),
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    author: { "@type": "Person", name: author },
    ...(image ? { image } : {}),
  };
}

export function createOrganizationStructuredData(
  settings: SiteSettings,
  origin: URL,
): JsonLdObject | undefined {
  const name = approved(settings.public_display_name);
  const address = approved(settings.address);
  const legalIdentifiers = approved(settings.legal_identifiers)?.filter((value) => value.trim());
  const phone = buildContactActions(settings).find((action) => action.channel === "phone");
  if (!name?.trim() || !address?.trim() || !legalIdentifiers?.length || !phone) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: origin.href,
    address,
    telephone: phone.href.slice("tel:".length),
    identifier: legalIdentifiers,
  };
}

export function serializeJsonLd(value: JsonLdObject): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
