import assert from "node:assert/strict";
import test from "node:test";

import {
  createArticleMetadata,
  createPageMetadata,
  createProductMetadata,
  createServiceMetadata,
  createStaticPageMetadata,
} from "../lib/seo/metadata.ts";
import {
  isProductionIndexingEnabled,
  parsePublicSiteOrigin,
  type PublicSiteEnvironment,
} from "../lib/seo/origin.ts";
import { createRobotsPolicy } from "../lib/seo/robots.ts";
import { createSitemap } from "../lib/seo/sitemap.ts";
import type {
  Article,
  ContentField,
  Product,
  Service,
  SiteSettings,
} from "../types/domain/index.ts";

function field<T>(
  value: T,
  owner: ContentField<T>["owner"] = "BUSINESS",
  source = "approved source",
): ContentField<T> {
  return { value, owner, source, status: "APPROVED" };
}

const productionEnvironment: PublicSiteEnvironment = {
  TOPLINK_PUBLIC_SITE_URL: "https://www.toplink-approved.example",
  TOPLINK_INDEXING_ENABLED: "1",
};

function service(slug: string, source = "approved service source"): Service {
  return {
    title: field(`Service ${slug}`, "BUSINESS", source),
    slug: field(slug, "SYSTEM", source),
    service_group: field("Approved service group", "BUSINESS", source),
    seo: field(
      {
        title: `SEO ${slug}`,
        description: `Description ${slug}`,
        canonicalPath: `/dich-vu/${slug}`,
      },
      "EDITORIAL/SYSTEM",
      source,
    ),
    editorial_lifecycle: "published",
  } as Service;
}

function product(slug: string): Product {
  return {
    title: field(`Product ${slug}`),
    slug: field(slug, "SYSTEM"),
    safe_positioning: field("Approved informational positioning"),
    seo: field(
      {
        title: `SEO ${slug}`,
        description: `Description ${slug}`,
        canonicalPath: `/san-pham/${slug}`,
      },
      "EDITORIAL/SYSTEM",
    ),
    editorial_lifecycle: "published",
  } as Product;
}

function article(slug: string, type: "knowledge" | "news", updated?: string): Article {
  const base = type === "knowledge" ? "/kien-thuc" : "/tin-tuc";
  return {
    title: field(`Article ${slug}`, "EDITORIAL"),
    slug: field(slug, "SYSTEM"),
    article_type: field(type, "EDITORIAL"),
    author: field("Verified editor", "EDITORIAL"),
    published_at: field("2026-08-20T00:00:00.000Z", "SYSTEM"),
    ...(updated ? { updated_at: field(updated, "SYSTEM") } : {}),
    seo: field(
      {
        title: `SEO ${slug}`,
        description: `Description ${slug}`,
        canonicalPath: `${base}/${slug}`,
      },
      "EDITORIAL/SYSTEM",
    ),
    editorial_lifecycle: "published",
  } as Article;
}

function siteSettings(overrides: Partial<SiteSettings> = {}): SiteSettings {
  return { public_display_name: field("Y Viện Toplink"), ...overrides };
}

test("public origin accepts loopback HTTP and nonlocal HTTPS only", () => {
  assert.equal(parsePublicSiteOrigin("http://127.0.0.1:3000").origin, "http://127.0.0.1:3000");
  assert.equal(parsePublicSiteOrigin("http://localhost:3000/").origin, "http://localhost:3000");
  assert.equal(parsePublicSiteOrigin("https://toplink.example").origin, "https://toplink.example");
  for (const invalid of [
    "http://toplink.example",
    "https://user:pass@toplink.example",
    "https://toplink.example/path",
    "https://toplink.example?preview=1",
    "javascript:alert(1)",
  ]) {
    assert.throws(() => parsePublicSiteOrigin(invalid));
  }
});

test("indexing requires explicit enable plus a nonlocal HTTPS public origin", () => {
  assert.equal(isProductionIndexingEnabled({}), false);
  assert.equal(
    isProductionIndexingEnabled({
      TOPLINK_PUBLIC_SITE_URL: "http://127.0.0.1:3000",
      TOPLINK_INDEXING_ENABLED: "1",
    }),
    false,
  );
  assert.equal(isProductionIndexingEnabled(productionEnvironment), true);
});

test("metadata composes canonical and OpenGraph URLs while omitting unavailable images", () => {
  const metadata = createPageMetadata(
    {
      title: "Approved title",
      description: "Approved description",
      canonicalPath: "/dich-vu/approved-service?tracking=forbidden",
      siteName: "Y Viện Toplink",
      type: "website",
    },
    productionEnvironment,
  );
  assert.equal(
    metadata.alternates?.canonical,
    "https://www.toplink-approved.example/dich-vu/approved-service",
  );
  assert.equal(
    metadata.openGraph?.url,
    "https://www.toplink-approved.example/dich-vu/approved-service",
  );
  assert.equal(metadata.openGraph?.siteName, "Y Viện Toplink");
  assert.equal("images" in (metadata.openGraph ?? {}), false);
  assert.deepEqual(metadata.robots, { index: true, follow: true });
});

test("preview metadata is noindex/nofollow and missing origin never fabricates canonical", () => {
  const preview = createPageMetadata(
    {
      title: "Approved preview title",
      description: "Approved preview description",
      canonicalPath: "/dich-vu/private-preview",
      siteName: "Y Viện Toplink",
      type: "website",
      preview: true,
    },
    productionEnvironment,
  );
  assert.deepEqual(preview.robots, { index: false, follow: false });

  const unconfigured = createPageMetadata(
    {
      title: "Approved title",
      description: "Approved description",
      canonicalPath: "/dich-vu/approved-service",
      siteName: "Y Viện Toplink",
      type: "website",
    },
    {},
  );
  assert.equal(unconfigured.alternates, undefined);
  assert.equal(unconfigured.openGraph?.url, undefined);
  assert.deepEqual(unconfigured.robots, { index: false, follow: false });
});

test("domain metadata uses normalized SEO facts and preview lifecycle", () => {
  const serviceRecord = service("approved-service");
  const serviceMetadata = createServiceMetadata(serviceRecord, productionEnvironment);
  assert.equal(serviceMetadata.title, "SEO approved-service");
  assert.equal(
    serviceMetadata.alternates?.canonical,
    "https://www.toplink-approved.example/dich-vu/approved-service",
  );
  assert.deepEqual(serviceMetadata.robots, { index: true, follow: true });

  const previewMetadata = createServiceMetadata(
    { ...serviceRecord, editorial_lifecycle: "draft" },
    productionEnvironment,
  );
  assert.deepEqual(previewMetadata.robots, { index: false, follow: false });

  const productMetadata = createProductMetadata(product("approved-product"), productionEnvironment);
  assert.equal(productMetadata.title, "SEO approved-product");

  const articleMetadata = createArticleMetadata(
    article("approved-news", "news", "2026-08-31T00:00:00.000Z"),
    productionEnvironment,
  );
  const articleOpenGraph = articleMetadata.openGraph as Record<string, unknown>;
  assert.equal(articleOpenGraph.type, "article");
  assert.deepEqual(articleOpenGraph.authors, ["Verified editor"]);
  assert.equal(articleOpenGraph.modifiedTime, "2026-08-31T00:00:00.000Z");
  assert.equal("images" in (articleMetadata.openGraph ?? {}), false);

  const mismatchedCanonical = createServiceMetadata(
    {
      ...serviceRecord,
      seo: field(
        {
          title: "Approved title with mismatched route",
          description: "Approved description",
          canonicalPath: "/wrong-route",
        },
        "EDITORIAL/SYSTEM",
      ),
    },
    productionEnvironment,
  );
  assert.deepEqual(mismatchedCanonical.robots, { index: false, follow: false });
  assert.equal(mismatchedCanonical.alternates, undefined);

  const testOwned = createServiceMetadata(
    service("canonical-looking-test-record", "__P7_INTEGRATION_TEST__ source"),
    productionEnvironment,
  );
  assert.deepEqual(testOwned.robots, { index: false, follow: false });
  assert.equal(testOwned.alternates, undefined);
});

test("static metadata stays minimal and held routes are noindex", () => {
  const home = createStaticPageMetadata("/", productionEnvironment, true);
  assert.deepEqual(home.title, { absolute: "Y Viện Toplink" });
  assert.deepEqual(home.robots, { index: true, follow: true });
  const heldContact = createStaticPageMetadata("/lien-he", productionEnvironment, false);
  assert.equal(heldContact.title, "Liên hệ");
  assert.deepEqual(heldContact.robots, { index: false, follow: false });
});

test("sitemap contains only useful current public canonical routes without duplicates or fake dates", () => {
  const entries = createSitemap(
    {
      services: [
        service("approved-service"),
        service("old-slug", "__P6_INTEGRATION_TEST__ source"),
        service("p5-test-record", "__P5_CONTRACT_TEST__ source"),
      ],
      products: [product("approved-product")],
      articles: [
        article("approved-knowledge", "knowledge", "2026-08-31T00:00:00.000Z"),
        article("approved-news", "news"),
      ],
      settings: siteSettings(),
    },
    productionEnvironment,
  );
  const urls = entries.map((entry) => entry.url);
  assert.deepEqual(urls, [...new Set(urls)]);
  assert.ok(urls.includes("https://www.toplink-approved.example/"));
  assert.ok(urls.includes("https://www.toplink-approved.example/dich-vu"));
  assert.ok(urls.includes("https://www.toplink-approved.example/dich-vu/approved-service"));
  assert.ok(urls.includes("https://www.toplink-approved.example/san-pham/approved-product"));
  assert.ok(urls.includes("https://www.toplink-approved.example/kien-thuc/approved-knowledge"));
  assert.ok(urls.includes("https://www.toplink-approved.example/tin-tuc/approved-news"));
  assert.equal(
    urls.some((url) => /old-slug|p5-test-record|preview|api|wordpress|nhuong-quyen/.test(url)),
    false,
  );
  assert.equal(
    urls.some((url) => url.endsWith("/lien-he") || url.endsWith("/khong-gian")),
    false,
  );
  assert.equal(
    entries.find((entry) => entry.url.endsWith("/kien-thuc/approved-knowledge"))?.lastModified,
    "2026-08-31T00:00:00.000Z",
  );
  assert.equal(entries.find((entry) => entry.url.endsWith("/dich-vu"))?.lastModified, undefined);
});

test("contact enters sitemap only with a safely actionable approved channel", () => {
  const entries = createSitemap(
    {
      services: [],
      products: [],
      articles: [],
      settings: siteSettings({ zalo_destination: field("https://zalo.me/verified-channel") }),
    },
    productionEnvironment,
  );
  assert.ok(entries.some((entry) => entry.url.endsWith("/lien-he")));
});

test("robots is deny-all unless production indexing is explicitly enabled", () => {
  assert.deepEqual(createRobotsPolicy({}), {
    rules: { userAgent: "*", disallow: "/" },
  });
  assert.deepEqual(createRobotsPolicy(productionEnvironment), {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/wordpress/"] },
    sitemap: "https://www.toplink-approved.example/sitemap.xml",
  });
});
