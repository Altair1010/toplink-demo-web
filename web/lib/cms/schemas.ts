import type {
  Article,
  ArticleType,
  ContentField,
  IdentityClass,
  Media,
  MediaRole,
  Owner,
  Product,
  SeoFields,
  Service,
  SiteSettings,
} from "@/types/domain";

const owners = new Set(["BUSINESS", "EDITORIAL", "MEDIA", "SYSTEM"]);
const statuses = new Set(["APPROVED", "PENDING", "REJECTED", "REFERENCE_ONLY"]);
const articleTypes = new Set<ArticleType>([
  "knowledge",
  "news",
  "operational_update",
  "customer_story",
]);
const mediaRoles = new Set<MediaRole>(["orientation", "evidence", "explanation", "atmosphere"]);
const identityClasses = new Set<IdentityClass>(["actual_toplink", "generic_stock", "abstract"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type UnknownRecord = Record<string, unknown>;
type ValueParser<T> = (value: unknown, path: string) => T;

export class CmsSchemaError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "CmsSchemaError";
  }
}

export interface CmsPagination {
  readonly page: number;
  readonly perPage: number;
  readonly totalItems: number;
  readonly totalPages: number;
  readonly nextPage: number | null;
}

export interface CmsCollection<T> {
  readonly items: readonly T[];
  readonly count: number;
  readonly pagination: CmsPagination;
}

function record(value: unknown, path: string): UnknownRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new CmsSchemaError(`${path} must be an object`);
  }
  return value as UnknownRecord;
}

function string(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new CmsSchemaError(`${path} must be a non-empty string`);
  }
  return value;
}

function nullableString(value: unknown, path: string): string | null {
  return value === null ? null : string(value, path);
}

function integer(value: unknown, path: string): number {
  if (!Number.isSafeInteger(value) || (value as number) < 0) {
    throw new CmsSchemaError(`${path} must be a non-negative integer`);
  }
  return value as number;
}

function positiveInteger(value: unknown, path: string): number {
  const parsed = integer(value, path);
  if (parsed === 0) throw new CmsSchemaError(`${path} must be positive`);
  return parsed;
}

function stringList(value: unknown, path: string): readonly string[] {
  if (!Array.isArray(value)) throw new CmsSchemaError(`${path} must be a string array`);
  return value.map((item, index) => string(item, `${path}[${index}]`));
}

function nullableStringList(value: unknown, path: string): readonly string[] | null {
  return value === null ? null : stringList(value, path);
}

function relationList(value: unknown, path: string): readonly string[] {
  const slugs = stringList(value, path);
  if (slugs.some((slug) => !slugPattern.test(slug))) {
    throw new CmsSchemaError(`${path} must contain route-safe slugs, not WordPress IDs`);
  }
  return slugs;
}

function faq(value: unknown, path: string): readonly [string, string][] {
  if (!Array.isArray(value)) throw new CmsSchemaError(`${path} must be an FAQ array`);
  return value.map((item, index) => {
    if (!Array.isArray(item) || item.length !== 2) {
      throw new CmsSchemaError(`${path}[${index}] must be a question/answer pair`);
    }
    return [string(item[0], `${path}[${index}][0]`), string(item[1], `${path}[${index}][1]`)];
  });
}

function enumValue<T extends string>(allowed: Set<T>): ValueParser<T> {
  return (value, path) => {
    const parsed = string(value, path) as T;
    if (!allowed.has(parsed)) throw new CmsSchemaError(`${path} has an unsupported value`);
    return parsed;
  };
}

function isOwner(value: string): value is ContentField<unknown>["owner"] {
  const segments = value.split("/");
  return segments.length <= 2 && segments.every((segment) => owners.has(segment));
}

function field<T>(
  input: unknown,
  path: string,
  expectedOwner: ContentField<T>["owner"],
  parseValue: ValueParser<T>,
  required = true,
): ContentField<T> | undefined {
  if (input === undefined && !required) return undefined;
  const raw = record(input, path);
  const status = raw.status;
  if (typeof status !== "string" || !statuses.has(status)) {
    throw new CmsSchemaError(`${path}.status is invalid`);
  }
  if (status !== "APPROVED") {
    if (!required) return undefined;
    throw new CmsSchemaError(`${path}.status must be APPROVED`);
  }
  const owner = string(raw.owner, `${path}.owner`);
  if (!isOwner(owner) || owner !== expectedOwner) {
    throw new CmsSchemaError(`${path}.owner must be ${expectedOwner}`);
  }
  const source = string(raw.source, `${path}.source`);
  return { value: parseValue(raw.value, `${path}.value`), owner, source, status: "APPROVED" };
}

function requiredField<T>(
  input: unknown,
  path: string,
  owner: ContentField<T>["owner"],
  parser: ValueParser<T>,
): ContentField<T> {
  return field(input, path, owner, parser, true) as ContentField<T>;
}

function optionalField<T>(
  input: unknown,
  path: string,
  owner: ContentField<T>["owner"],
  parser: ValueParser<T>,
): ContentField<T> | undefined {
  return field(input, path, owner, parser, false);
}

function parseSeo(value: unknown, path: string): SeoFields {
  const raw = record(value, path);
  const canonicalPath = string(raw.canonicalPath, `${path}.canonicalPath`);
  if (!canonicalPath.startsWith("/") || canonicalPath.startsWith("//")) {
    throw new CmsSchemaError(`${path}.canonicalPath must be root-relative`);
  }
  return {
    title: string(raw.title, `${path}.title`),
    description: string(raw.description, `${path}.description`),
    canonicalPath,
  };
}

function parseAsset(value: unknown, path: string): { src: string; width: number; height: number } {
  const raw = record(value, path);
  const src = string(raw.src, `${path}.src`);
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    throw new CmsSchemaError(`${path}.src must be an absolute URL`);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new CmsSchemaError(`${path}.src must use http or https`);
  }
  return {
    src: url.toString(),
    width: positiveInteger(raw.width, `${path}.width`),
    height: positiveInteger(raw.height, `${path}.height`),
  };
}

export function parseMedia(input: unknown): Media {
  const raw = record(input, "Media");
  const media: Media = {
    asset: requiredField(raw.asset, "Media.asset", "SYSTEM", parseAsset),
    source_provenance: requiredField(
      raw.source_provenance,
      "Media.source_provenance",
      "MEDIA",
      string,
    ),
    authorization: requiredField(raw.authorization, "Media.authorization", "MEDIA", string),
    alt_text: requiredField(raw.alt_text, "Media.alt_text", "MEDIA/EDITORIAL", string),
    caption: optionalField(raw.caption, "Media.caption", "EDITORIAL", string),
    media_role: requiredField(raw.media_role, "Media.media_role", "MEDIA", enumValue(mediaRoles)),
    identity_class: requiredField(
      raw.identity_class,
      "Media.identity_class",
      "MEDIA",
      enumValue(identityClasses),
    ),
    publishability_status: requiredField(
      raw.publishability_status,
      "Media.publishability_status",
      "MEDIA",
      string,
    ),
  };
  if (media.identity_class.value === "generic_stock" && media.media_role.value !== "atmosphere") {
    throw new CmsSchemaError("Media generic_stock is publishable only as atmosphere");
  }
  return media;
}

const mediaList: ValueParser<readonly Media[]> = (value, path) => {
  if (!Array.isArray(value)) throw new CmsSchemaError(`${path} must be a Media array`);
  return value.map(parseMedia);
};

export function parseService(input: unknown): Service {
  const raw = record(input, "Service");
  return {
    title: requiredField(raw.title, "Service.title", "BUSINESS", string),
    slug: requiredField(raw.slug, "Service.slug", "SYSTEM", (value, path) => {
      const slug = string(value, path);
      if (!slugPattern.test(slug)) throw new CmsSchemaError(`${path} is not route-safe`);
      return slug;
    }),
    summary: requiredField(raw.summary, "Service.summary", "EDITORIAL", string),
    service_group: requiredField(raw.service_group, "Service.service_group", "BUSINESS", string),
    body: requiredField(raw.body, "Service.body", "EDITORIAL", stringList),
    who_it_may_fit: requiredField(
      raw.who_it_may_fit,
      "Service.who_it_may_fit",
      "BUSINESS",
      stringList,
    ),
    limitations_cautions: requiredField(
      raw.limitations_cautions,
      "Service.limitations_cautions",
      "BUSINESS",
      stringList,
    ),
    professional_evaluation: requiredField(
      raw.professional_evaluation,
      "Service.professional_evaluation",
      "BUSINESS",
      string,
    ),
    experience_process: requiredField(
      raw.experience_process,
      "Service.experience_process",
      "BUSINESS",
      stringList,
    ),
    faq: optionalField(raw.faq, "Service.faq", "EDITORIAL", faq),
    media: optionalField(raw.media, "Service.media", "MEDIA", mediaList),
    related_knowledge: optionalField(
      raw.related_knowledge,
      "Service.related_knowledge",
      "SYSTEM",
      relationList,
    ),
    display_order: requiredField(raw.display_order, "Service.display_order", "SYSTEM", integer),
    seo: requiredField(raw.seo, "Service.seo", "EDITORIAL/SYSTEM", parseSeo),
    evidence_state: requiredField(raw.evidence_state, "Service.evidence_state", "BUSINESS", string),
    editorial_lifecycle: "published",
  };
}

export function parseProduct(input: unknown): Product {
  const raw = record(input, "Product");
  return {
    title: requiredField(raw.title, "Product.title", "BUSINESS", string),
    slug: requiredField(raw.slug, "Product.slug", "SYSTEM", (value, path) => {
      const slug = string(value, path);
      if (!slugPattern.test(slug)) throw new CmsSchemaError(`${path} is not route-safe`);
      return slug;
    }),
    summary: requiredField(raw.summary, "Product.summary", "EDITORIAL", string),
    safe_positioning: requiredField(
      raw.safe_positioning,
      "Product.safe_positioning",
      "BUSINESS",
      string,
    ),
    supported_use_statements: requiredField(
      raw.supported_use_statements,
      "Product.supported_use_statements",
      "BUSINESS",
      stringList,
    ),
    limitations_cautions: requiredField(
      raw.limitations_cautions,
      "Product.limitations_cautions",
      "BUSINESS",
      stringList,
    ),
    documentation_status: requiredField(
      raw.documentation_status,
      "Product.documentation_status",
      "BUSINESS",
      string,
    ),
    body: requiredField(raw.body, "Product.body", "EDITORIAL", stringList),
    faq: optionalField(raw.faq, "Product.faq", "EDITORIAL", faq),
    media: optionalField(raw.media, "Product.media", "MEDIA", mediaList),
    related_knowledge: optionalField(
      raw.related_knowledge,
      "Product.related_knowledge",
      "SYSTEM",
      relationList,
    ),
    seo: requiredField(raw.seo, "Product.seo", "EDITORIAL/SYSTEM", parseSeo),
    evidence_state: requiredField(raw.evidence_state, "Product.evidence_state", "BUSINESS", string),
    editorial_lifecycle: "published",
  };
}

export function parseArticle(input: unknown): Article {
  const raw = record(input, "Article");
  return {
    title: requiredField(raw.title, "Article.title", "EDITORIAL", string),
    slug: requiredField(raw.slug, "Article.slug", "SYSTEM", (value, path) => {
      const slug = string(value, path);
      if (!slugPattern.test(slug)) throw new CmsSchemaError(`${path} is not route-safe`);
      return slug;
    }),
    summary: requiredField(raw.summary, "Article.summary", "EDITORIAL", string),
    body: requiredField(raw.body, "Article.body", "EDITORIAL", stringList),
    article_type: requiredField(
      raw.article_type,
      "Article.article_type",
      "EDITORIAL",
      enumValue(articleTypes),
    ),
    author: requiredField(raw.author, "Article.author", "SYSTEM", string),
    published_at: requiredField(raw.published_at, "Article.published_at", "SYSTEM", string),
    updated_at: optionalField(raw.updated_at, "Article.updated_at", "SYSTEM", string),
    featured_media: optionalField(raw.featured_media, "Article.featured_media", "MEDIA", (value) =>
      parseMedia(value),
    ),
    related_services: optionalField(
      raw.related_services,
      "Article.related_services",
      "SYSTEM",
      relationList,
    ),
    related_articles: optionalField(
      raw.related_articles,
      "Article.related_articles",
      "SYSTEM",
      relationList,
    ),
    evidence_reference_state: requiredField(
      raw.evidence_reference_state,
      "Article.evidence_reference_state",
      "EDITORIAL/BUSINESS",
      string,
    ),
    seo: requiredField(raw.seo, "Article.seo", "EDITORIAL/SYSTEM", parseSeo),
    editorial_lifecycle: "published",
  };
}

export function parseSiteSettings(input: unknown): SiteSettings {
  const raw = record(input, "SiteSettings");
  return {
    public_display_name: requiredField(
      raw.public_display_name,
      "SiteSettings.public_display_name",
      "BUSINESS",
      string,
    ),
    address: optionalField(raw.address, "SiteSettings.address", "BUSINESS", nullableString),
    opening_hours: optionalField(
      raw.opening_hours,
      "SiteSettings.opening_hours",
      "BUSINESS",
      nullableString,
    ),
    hotline: optionalField(raw.hotline, "SiteSettings.hotline", "BUSINESS", nullableString),
    zalo_destination: optionalField(
      raw.zalo_destination,
      "SiteSettings.zalo_destination",
      "BUSINESS",
      nullableString,
    ),
    facebook_destination: optionalField(
      raw.facebook_destination,
      "SiteSettings.facebook_destination",
      "BUSINESS",
      nullableString,
    ),
    social_links: optionalField(
      raw.social_links,
      "SiteSettings.social_links",
      "BUSINESS",
      nullableStringList,
    ),
    legal_identifiers: optionalField(
      raw.legal_identifiers,
      "SiteSettings.legal_identifiers",
      "BUSINESS",
      nullableStringList,
    ),
  };
}

export function parseCollection<T>(
  input: unknown,
  parseItem: (item: unknown) => T,
): CmsCollection<T> {
  const raw = record(input, "collection");
  if (!Array.isArray(raw.items)) throw new CmsSchemaError("collection.items must be an array");
  const pagination = record(raw.pagination, "collection.pagination");
  const page = positiveInteger(pagination.page, "collection.pagination.page");
  const perPage = positiveInteger(pagination.per_page, "collection.pagination.per_page");
  const totalItems = integer(pagination.total_items, "collection.pagination.total_items");
  const totalPages = integer(pagination.total_pages, "collection.pagination.total_pages");
  const nextPage =
    pagination.next_page === null
      ? null
      : positiveInteger(pagination.next_page, "collection.pagination.next_page");
  const items = raw.items.map(parseItem);
  const count = integer(raw.count, "collection.count");
  if (count !== items.length) throw new CmsSchemaError("collection.count must equal items.length");
  if (page > Math.max(totalPages, 1) || totalItems < items.length || perPage > 100) {
    throw new CmsSchemaError("collection.pagination is inconsistent or unbounded");
  }
  return {
    items,
    count,
    pagination: { page, perPage, totalItems, totalPages, nextPage },
  };
}
