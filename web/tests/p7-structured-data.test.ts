import assert from "node:assert/strict";
import test from "node:test";

import {
  createArticleStructuredData,
  createBreadcrumbList,
  createOrganizationStructuredData,
  createServiceStructuredData,
  serializeJsonLd,
} from "../lib/seo/structured-data.ts";
import { parsePublicSiteOrigin } from "../lib/seo/origin.ts";
import type { Article, ContentField, Service, SiteSettings } from "../types/domain/index.ts";

function field<T>(value: T, owner: ContentField<T>["owner"] = "BUSINESS"): ContentField<T> {
  return { value, owner, source: "approved source", status: "APPROVED" };
}

function service(): Service {
  return {
    title: field("Dịch vụ đã xác minh"),
    slug: field("dich-vu-da-xac-minh", "SYSTEM"),
    summary: field("Mô tả có giới hạn và đã duyệt.", "EDITORIAL"),
    service_group: field("Nhóm dịch vụ đã duyệt"),
    body: field(["Nội dung đã duyệt."], "EDITORIAL"),
    who_it_may_fit: field(["Ngữ cảnh phù hợp đã duyệt"]),
    limitations_cautions: field(["Giới hạn đã duyệt"]),
    professional_evaluation: field("Cần đánh giá chuyên môn khi phù hợp."),
    experience_process: field(["Bước đã duyệt"]),
    display_order: field(1, "SYSTEM"),
    seo: field(
      {
        title: "SEO dịch vụ đã xác minh",
        description: "Mô tả SEO đã xác minh",
        canonicalPath: "/dich-vu/dich-vu-da-xac-minh",
      },
      "EDITORIAL/SYSTEM",
    ),
    evidence_state: field("Đã duyệt"),
    editorial_lifecycle: "published",
  };
}

function article(): Article {
  return {
    title: field("Bài viết đã xác minh", "EDITORIAL"),
    slug: field("bai-viet-da-xac-minh", "SYSTEM"),
    summary: field("Tóm tắt đã xác minh", "EDITORIAL"),
    body: field(["Nội dung đã xác minh"], "EDITORIAL"),
    article_type: field("knowledge", "EDITORIAL"),
    author: field("Biên tập viên đã xác minh", "EDITORIAL"),
    published_at: field("2026-08-20T00:00:00.000Z", "SYSTEM"),
    updated_at: field("2026-08-31T00:00:00.000Z", "SYSTEM"),
    evidence_reference_state: field("Đã duyệt", "EDITORIAL/BUSINESS"),
    seo: field(
      {
        title: "SEO bài viết đã xác minh",
        description: "Mô tả SEO bài viết đã xác minh",
        canonicalPath: "/kien-thuc/bai-viet-da-xac-minh",
      },
      "EDITORIAL/SYSTEM",
    ),
    editorial_lifecycle: "published",
  };
}

function collectKeys(value: unknown, keys = new Set<string>()): Set<string> {
  if (Array.isArray(value)) value.forEach((item) => collectKeys(item, keys));
  else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      keys.add(key);
      collectKeys(item, keys);
    }
  }
  return keys;
}

const origin = parsePublicSiteOrigin("https://www.toplink-approved.example");

test("BreadcrumbList uses only the supplied public canonical ancestry", () => {
  assert.deepEqual(
    createBreadcrumbList(
      [
        { name: "Trang chủ", path: "/" },
        { name: "Dịch vụ", path: "/dich-vu" },
        { name: "Dịch vụ đã xác minh", path: "/dich-vu/dich-vu-da-xac-minh" },
      ],
      origin,
    ),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: "https://www.toplink-approved.example/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Dịch vụ",
          item: "https://www.toplink-approved.example/dich-vu",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Dịch vụ đã xác minh",
          item: "https://www.toplink-approved.example/dich-vu/dich-vu-da-xac-minh",
        },
      ],
    },
  );
});

test("Service structured data contains verified descriptive facts and no commercial claims", () => {
  const data = createServiceStructuredData(service(), origin);
  assert.equal(data?.["@type"], "Service");
  assert.equal(data?.name, "Dịch vụ đã xác minh");
  assert.equal(data?.url, "https://www.toplink-approved.example/dich-vu/dich-vu-da-xac-minh");
  const keys = collectKeys(data);
  for (const prohibited of ["offers", "price", "aggregateRating", "review", "availability"]) {
    assert.equal(keys.has(prohibited), false);
  }
});

test("Article structured data uses verified author/dates and omits publisher or fake media", () => {
  const data = createArticleStructuredData(article(), origin);
  assert.equal(data?.["@type"], "BlogPosting");
  assert.deepEqual(data?.author, { "@type": "Person", name: "Biên tập viên đã xác minh" });
  assert.equal(data?.datePublished, "2026-08-20T00:00:00.000Z");
  assert.equal(data?.dateModified, "2026-08-31T00:00:00.000Z");
  assert.equal("publisher" in (data ?? {}), false);
  assert.equal("image" in (data ?? {}), false);
});

test("Organization fails closed with current identity-only facts and LocalBusiness is not fabricated", () => {
  const settings: SiteSettings = { public_display_name: field("Y Viện Toplink") };
  assert.equal(createOrganizationStructuredData(settings, origin), undefined);
  assert.equal(
    createOrganizationStructuredData(
      {
        public_display_name: field("Y Viện Toplink"),
        address: field("Verified address"),
        opening_hours: field("Verified hours"),
        hotline: field("02412345678"),
      },
      origin,
    ),
    undefined,
  );
  assert.deepEqual(
    createOrganizationStructuredData(
      {
        public_display_name: field("Y Viện Toplink"),
        address: field("Verified address"),
        hotline: field("02412345678"),
        legal_identifiers: field(["Verified legal identifier"]),
      },
      origin,
    ),
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Y Viện Toplink",
      url: "https://www.toplink-approved.example/",
      address: "Verified address",
      telephone: "02412345678",
      identifier: ["Verified legal identifier"],
    },
  );
  assert.equal(JSON.stringify(settings).includes("LocalBusiness"), false);
});

test("JSON-LD serialization stays valid JSON and escapes script-context less-than characters", () => {
  const serialized = serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "Thing",
    name: "</script><script>alert(1)</script>",
  });
  assert.equal(serialized.includes("<"), false);
  assert.deepEqual(JSON.parse(serialized), {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: "</script><script>alert(1)</script>",
  });
});

test("preview or unpublished records emit no Service/Article structured data", () => {
  const previewService = { ...service(), editorial_lifecycle: "draft" as const };
  const previewArticle = { ...article(), editorial_lifecycle: "in_review" as const };
  assert.equal(createServiceStructuredData(previewService, origin), undefined);
  assert.equal(createArticleStructuredData(previewArticle, origin), undefined);
});

test("test-owned or canonical-mismatched records emit no production structured data", () => {
  const testOwnedService = {
    ...service(),
    title: {
      ...service().title,
      source: "__P6_INTEGRATION_TEST__ local source",
    },
  };
  const mismatchedArticle = {
    ...article(),
    seo: field(
      {
        title: "Approved title",
        description: "Approved description",
        canonicalPath: "/wrong-route",
      },
      "EDITORIAL/SYSTEM",
    ),
  };
  assert.equal(createServiceStructuredData(testOwnedService, origin), undefined);
  assert.equal(createArticleStructuredData(mismatchedArticle, origin), undefined);
});
