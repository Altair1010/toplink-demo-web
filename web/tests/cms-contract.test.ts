import assert from "node:assert/strict";
import test from "node:test";

import {
  parseArticle,
  parseCollection,
  parseMedia,
  parseProduct,
  parseService,
  parseSiteSettings,
} from "../lib/cms/schemas.ts";

const field = (value: unknown, owner = "BUSINESS") => ({
  value,
  owner,
  source: "__P6_INTEGRATION_TEST__ source",
  status: "APPROVED",
});

const seo = field(
  { title: "P6 test", description: "P6 test description", canonicalPath: "/p6-test" },
  "EDITORIAL/SYSTEM",
);

const servicePayload = {
  title: field("__P6_INTEGRATION_TEST__ service"),
  slug: field("p6-service", "SYSTEM"),
  summary: field("summary", "EDITORIAL"),
  service_group: field("p6-group"),
  body: field(["body"], "EDITORIAL"),
  who_it_may_fit: field(["bounded fit"]),
  limitations_cautions: field(["caution"]),
  professional_evaluation: field("evaluation"),
  experience_process: field(["step"]),
  related_knowledge: field(["p6-knowledge"], "SYSTEM"),
  display_order: field(0, "SYSTEM"),
  seo,
  evidence_state: field("accepted"),
};

const productPayload = {
  title: field("__P6_INTEGRATION_TEST__ product"),
  slug: field("p6-product", "SYSTEM"),
  summary: field("summary", "EDITORIAL"),
  safe_positioning: field("positioning"),
  supported_use_statements: field(["statement"]),
  limitations_cautions: field(["caution"]),
  documentation_status: field("accepted"),
  body: field(["body"], "EDITORIAL"),
  seo,
  evidence_state: field("accepted"),
};

const articlePayload = {
  title: field("__P6_INTEGRATION_TEST__ article", "EDITORIAL"),
  slug: field("p6-article", "SYSTEM"),
  summary: field("summary", "EDITORIAL"),
  body: field(["body"], "EDITORIAL"),
  article_type: field("knowledge", "EDITORIAL"),
  author: field("P6 Editor", "SYSTEM"),
  published_at: field("2026-09-01T00:00:00+00:00", "SYSTEM"),
  related_services: field(["p6-service"], "SYSTEM"),
  related_articles: field(["p6-related"], "SYSTEM"),
  evidence_reference_state: field("accepted", "EDITORIAL/BUSINESS"),
  seo,
};

const mediaPayload = {
  asset: field({ src: "http://127.0.0.1:8085/p6.png", width: 12, height: 8 }, "SYSTEM"),
  source_provenance: field("generated local test asset", "MEDIA"),
  authorization: field("local test authorization", "MEDIA"),
  alt_text: field("P6 test image", "MEDIA/EDITORIAL"),
  media_role: field("atmosphere", "MEDIA"),
  identity_class: field("abstract", "MEDIA"),
  publishability_status: field("publishable", "MEDIA"),
};

test("normalizes all five public domains and relation slugs", () => {
  const service = parseService(servicePayload);
  const product = parseProduct(productPayload);
  const article = parseArticle(articlePayload);
  const media = parseMedia(mediaPayload);
  const settings = parseSiteSettings({ public_display_name: field("Y Viện Toplink") });

  assert.equal(service.editorial_lifecycle, "published");
  assert.deepEqual(service.related_knowledge?.value, ["p6-knowledge"]);
  assert.equal(product.slug.value, "p6-product");
  assert.deepEqual(article.related_services?.value, ["p6-service"]);
  assert.equal(media.asset.value.width, 12);
  assert.equal(settings.public_display_name.value, "Y Viện Toplink");
});

test("validates a bounded paginated collection envelope", () => {
  const collection = parseCollection(
    {
      items: [servicePayload],
      count: 1,
      pagination: { page: 1, per_page: 20, total_items: 1, total_pages: 1, next_page: null },
    },
    parseService,
  );
  assert.equal(collection.items.length, 1);
  assert.equal(collection.pagination.totalPages, 1);
});

test("fails closed on malformed required fields and governance", () => {
  assert.throws(() => parseService({ ...servicePayload, summary: undefined }), /summary/);
  assert.throws(
    () =>
      parseService({ ...servicePayload, title: { ...servicePayload.title, status: "PENDING" } }),
    /APPROVED/,
  );
  assert.throws(
    () => parseService({ ...servicePayload, title: { ...servicePayload.title, owner: "MEDIA" } }),
    /owner/,
  );
  assert.throws(
    () => parseService({ ...servicePayload, title: { ...servicePayload.title, source: "" } }),
    /source/,
  );
  assert.throws(
    () => parseArticle({ ...articlePayload, article_type: field("unexpected", "EDITORIAL") }),
    /article_type/,
  );
});

test("rejects invalid media URLs, dimensions, and stock evidence", () => {
  assert.throws(
    () =>
      parseMedia({
        ...mediaPayload,
        asset: field({ src: "javascript:alert(1)", width: 1, height: 1 }, "SYSTEM"),
      }),
    /asset/,
  );
  assert.throws(
    () =>
      parseMedia({
        ...mediaPayload,
        asset: field({ src: "https://example.test/a.png", width: 0, height: 1 }, "SYSTEM"),
      }),
    /asset/,
  );
  assert.throws(
    () =>
      parseMedia({
        ...mediaPayload,
        media_role: field("evidence", "MEDIA"),
        identity_class: field("generic_stock", "MEDIA"),
      }),
    /generic_stock/,
  );
});

test("omits optional non-approved fields but rejects them when required", () => {
  const optionalPending = {
    value: ["hidden"],
    owner: "SYSTEM",
    source: "internal",
    status: "PENDING",
  };
  const parsed = parseService({ ...servicePayload, related_knowledge: optionalPending });
  assert.equal(parsed.related_knowledge, undefined);
  assert.throws(
    () =>
      parseProduct({ ...productPayload, title: { ...productPayload.title, status: "REJECTED" } }),
    /APPROVED/,
  );
});
