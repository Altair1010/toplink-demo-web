export type Owner = "BUSINESS" | "EDITORIAL" | "MEDIA" | "SYSTEM";
export type FactStatus = "APPROVED" | "PENDING" | "REJECTED" | "REFERENCE_ONLY";
export type EditorialLifecycle = "draft" | "in_review" | "approved" | "published";

export interface ContentField<T> {
  value: T;
  owner: Owner | `${Owner}/${Owner}`;
  source: string;
  status: FactStatus;
}

export interface SeoFields {
  title: string;
  description: string;
  canonicalPath: string;
  image?: Media;
}

export interface Service {
  title: ContentField<string>;
  slug: ContentField<string>;
  summary: ContentField<string>;
  service_group: ContentField<string>;
  body: ContentField<readonly string[]>;
  who_it_may_fit: ContentField<readonly string[]>;
  limitations_cautions: ContentField<readonly string[]>;
  professional_evaluation: ContentField<string>;
  experience_process: ContentField<readonly string[]>;
  faq?: ContentField<readonly [string, string][]>;
  media?: ContentField<readonly Media[]>;
  related_knowledge?: ContentField<readonly string[]>;
  display_order: ContentField<number>;
  seo: ContentField<SeoFields>;
  evidence_state: ContentField<string>;
  editorial_lifecycle: EditorialLifecycle;
}

export interface Product {
  title: ContentField<string>;
  slug: ContentField<string>;
  summary: ContentField<string>;
  safe_positioning: ContentField<string>;
  supported_use_statements: ContentField<readonly string[]>;
  limitations_cautions: ContentField<readonly string[]>;
  documentation_status: ContentField<string>;
  body: ContentField<readonly string[]>;
  faq?: ContentField<readonly [string, string][]>;
  media?: ContentField<readonly Media[]>;
  related_knowledge?: ContentField<readonly string[]>;
  seo: ContentField<SeoFields>;
  evidence_state: ContentField<string>;
  editorial_lifecycle: EditorialLifecycle;
}

export type ArticleType = "knowledge" | "news" | "operational_update" | "customer_story";

export interface Article {
  title: ContentField<string>;
  slug: ContentField<string>;
  summary: ContentField<string>;
  body: ContentField<readonly string[]>;
  article_type: ContentField<ArticleType>;
  author: ContentField<string>;
  published_at: ContentField<string>;
  updated_at?: ContentField<string>;
  featured_media?: ContentField<Media>;
  related_services?: ContentField<readonly string[]>;
  related_articles?: ContentField<readonly string[]>;
  evidence_reference_state: ContentField<string>;
  seo: ContentField<SeoFields>;
  editorial_lifecycle: EditorialLifecycle;
}

export type MediaRole = "orientation" | "evidence" | "explanation" | "atmosphere";
export type IdentityClass = "actual_toplink" | "generic_stock" | "abstract";

export interface Media {
  asset: ContentField<{ src: string; width: number; height: number }>;
  source_provenance: ContentField<string>;
  authorization: ContentField<string>;
  alt_text: ContentField<string>;
  caption?: ContentField<string>;
  media_role: ContentField<MediaRole>;
  identity_class: ContentField<IdentityClass>;
  publishability_status: ContentField<string>;
}

export interface SiteSettings {
  public_display_name: ContentField<string>;
  address?: ContentField<string | null>;
  opening_hours?: ContentField<string | null>;
  hotline?: ContentField<string | null>;
  zalo_destination?: ContentField<string | null>;
  facebook_destination?: ContentField<string | null>;
  social_links?: ContentField<readonly string[] | null>;
  legal_identifiers?: ContentField<readonly string[] | null>;
}

export function approvedValue<T>(field: ContentField<T> | undefined): T | undefined {
  return field?.status === "APPROVED" ? field.value : undefined;
}

export function fixtureValue<T>(field: ContentField<T>): T {
  return field.value;
}
