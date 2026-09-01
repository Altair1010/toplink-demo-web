import type { Article, Product, Service } from "../../types/domain/index.ts";

export type PublicRecord = Service | Product | Article;

const integrationRecordPattern = /__P[567]_(?:INTEGRATION|CONTRACT)_TEST__/i;

function expectedCanonicalPath(record: PublicRecord): string {
  if ("article_type" in record) {
    const base = record.article_type.value === "knowledge" ? "/kien-thuc" : "/tin-tuc";
    return `${base}/${record.slug.value}`;
  }
  return "service_group" in record
    ? `/dich-vu/${record.slug.value}`
    : `/san-pham/${record.slug.value}`;
}

export function hasValidRecordCanonical(record: PublicRecord): boolean {
  return record.seo.value.canonicalPath === expectedCanonicalPath(record);
}

export function isTestOwnedRecord(record: PublicRecord): boolean {
  return (
    integrationRecordPattern.test(record.title.source) ||
    integrationRecordPattern.test(record.title.value) ||
    integrationRecordPattern.test(record.slug.source) ||
    integrationRecordPattern.test(record.seo.source)
  );
}

export function isPublicSeoRecord(record: PublicRecord): boolean {
  return (
    record.editorial_lifecycle === "published" &&
    !isTestOwnedRecord(record) &&
    hasValidRecordCanonical(record)
  );
}
