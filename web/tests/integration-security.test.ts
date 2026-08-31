import assert from "node:assert/strict";
import test from "node:test";

import { revalidationForEvent } from "../lib/cms/cache.ts";
import {
  ReplayWindow,
  createPreviewIntent,
  parseWebhookEvent,
  signWebhook,
  verifyPreviewIntent,
  verifyWebhookSignature,
} from "../lib/cms/signatures.ts";

const webhookSecret = "__P6_INTEGRATION_TEST__ webhook secret with enough entropy";
const previewSecret = "__P6_INTEGRATION_TEST__ preview secret with enough entropy";
const now = 1_788_200_000;
const rawBody = JSON.stringify({
  event: "content.updated",
  domain: "Service",
  id: 123,
  slug: "p6-service",
  timestamp: now,
});

test("accepts a fresh valid webhook signature exactly once", () => {
  const signature = signWebhook(rawBody, now, webhookSecret);
  assert.equal(
    verifyWebhookSignature({
      rawBody,
      timestamp: String(now),
      signature,
      secret: webhookSecret,
      now,
    }),
    true,
  );
  const replay = new ReplayWindow(300);
  assert.equal(replay.accept(signature, now, now), true);
  assert.equal(replay.accept(signature, now, now + 1), false);
});

test("rejects missing, invalid, stale, and tampered webhook authentication", () => {
  const signature = signWebhook(rawBody, now, webhookSecret);
  assert.equal(
    verifyWebhookSignature({ rawBody, timestamp: "", signature, secret: webhookSecret, now }),
    false,
  );
  assert.equal(
    verifyWebhookSignature({
      rawBody,
      timestamp: String(now),
      signature: "bad",
      secret: webhookSecret,
      now,
    }),
    false,
  );
  assert.equal(
    verifyWebhookSignature({
      rawBody,
      timestamp: String(now - 301),
      signature,
      secret: webhookSecret,
      now,
    }),
    false,
  );
  assert.equal(
    verifyWebhookSignature({
      rawBody: `${rawBody} `,
      timestamp: String(now),
      signature,
      secret: webhookSecret,
      now,
    }),
    false,
  );
});

test("validates webhook event shape before revalidation", () => {
  const event = parseWebhookEvent(JSON.parse(rawBody));
  assert.equal(event.domain, "Service");
  assert.throws(
    () => parseWebhookEvent({ ...JSON.parse(rawBody), event: "unsupported.event" }),
    /event/,
  );
  assert.throws(() => parseWebhookEvent({ ...JSON.parse(rawBody), domain: "Page" }), /domain/);
  assert.throws(() => parseWebhookEvent({ ...JSON.parse(rawBody), slug: "../unsafe" }), /slug/);
});

test("maps Service updates to scoped cache tags and paths only", () => {
  const result = revalidationForEvent(parseWebhookEvent(JSON.parse(rawBody)));
  assert.deepEqual(result.tags, ["cms:services", "cms:service:p6-service"]);
  assert.deepEqual(result.paths, ["/", "/dich-vu", "/dich-vu/p6-service"]);
  assert.equal(
    result.tags.some((tag) => tag.includes("products")),
    false,
  );
});

test("slug changes invalidate both canonical identities", () => {
  const event = parseWebhookEvent({
    ...JSON.parse(rawBody),
    event: "content.slug_changed",
    previous_slug: "p6-service-old",
  });
  const result = revalidationForEvent(event);
  assert.deepEqual(result.tags, [
    "cms:services",
    "cms:service:p6-service",
    "cms:service:p6-service-old",
  ]);
  assert.ok(result.paths.includes("/dich-vu/p6-service-old"));
});

test("media deletion remains a valid scoped invalidation event", () => {
  const event = parseWebhookEvent({
    event: "content.deleted",
    domain: "Media",
    id: 91,
    dependencies: [{ domain: "Service", slug: "p6-service" }],
    timestamp: 1_788_200_000,
  });
  const target = revalidationForEvent(event);
  assert.ok(target.tags.includes("cms:media:91"));
  assert.ok(target.tags.includes("cms:service:p6-service"));
  assert.ok(target.paths.includes("/dich-vu/p6-service"));
});

test("preview intents are signed, bounded to five minutes, and tamper-evident", () => {
  const intent = createPreviewIntent(
    { post_type: "service", id: 123, slug: "p6-service" },
    previewSecret,
    now,
  );
  const verified = verifyPreviewIntent(intent, previewSecret, now + 299);
  assert.equal(verified?.slug, "p6-service");
  assert.equal(verifyPreviewIntent(intent, previewSecret, now + 301), undefined);
  assert.equal(verifyPreviewIntent(`${intent}x`, previewSecret, now), undefined);
  assert.equal(verifyPreviewIntent(intent, `${previewSecret}x`, now), undefined);
});
