import { createHmac, timingSafeEqual } from "node:crypto";

const WEBHOOK_WINDOW_SECONDS = 300;
const PREVIEW_TTL_SECONDS = 300;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const webhookEvents = new Set([
  "content.published",
  "content.updated",
  "content.unpublished",
  "content.deleted",
  "content.slug_changed",
  "settings.updated",
  "media.updated",
]);
const domains = new Set(["Service", "Product", "Article", "Media", "SiteSettings"]);
const articleTypes = new Set(["knowledge", "news", "operational_update", "customer_story"]);
const postTypes = new Set(["service", "product", "post"]);

export type WebhookEventName =
  | "content.published"
  | "content.updated"
  | "content.unpublished"
  | "content.deleted"
  | "content.slug_changed"
  | "settings.updated"
  | "media.updated";
export type WebhookDomain = "Service" | "Product" | "Article" | "Media" | "SiteSettings";

export interface WebhookDependency {
  readonly domain: "Service" | "Product" | "Article";
  readonly slug: string;
  readonly article_type?: "knowledge" | "news" | "operational_update" | "customer_story";
}

export interface WebhookEvent {
  readonly event: WebhookEventName;
  readonly domain: WebhookDomain;
  readonly id: number;
  readonly slug?: string;
  readonly previous_slug?: string;
  readonly article_type?: "knowledge" | "news" | "operational_update" | "customer_story";
  readonly dependencies?: readonly WebhookDependency[];
  readonly timestamp: number;
}

export interface PreviewIntentPayload {
  readonly post_type: "service" | "product" | "post";
  readonly id: number;
  readonly slug: string;
  readonly article_type?: "knowledge" | "news" | "operational_update" | "customer_story";
  readonly exp: number;
}

function hmac(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

function safeHexEqual(left: string, right: string): boolean {
  if (!/^[a-f0-9]{64}$/i.test(left) || !/^[a-f0-9]{64}$/i.test(right)) return false;
  const leftBytes = Buffer.from(left, "hex");
  const rightBytes = Buffer.from(right, "hex");
  return leftBytes.length === rightBytes.length && timingSafeEqual(leftBytes, rightBytes);
}

export function signWebhook(rawBody: string, timestamp: number, secret: string): string {
  return hmac(`${timestamp}.${rawBody}`, secret);
}

export function verifyWebhookSignature(input: {
  readonly rawBody: string;
  readonly timestamp: string;
  readonly signature: string;
  readonly secret: string;
  readonly now?: number;
}): boolean {
  const timestamp = Number(input.timestamp);
  const now = input.now ?? Math.floor(Date.now() / 1000);
  if (
    input.secret.length < 32 ||
    !Number.isSafeInteger(timestamp) ||
    Math.abs(now - timestamp) > WEBHOOK_WINDOW_SECONDS
  ) {
    return false;
  }
  return safeHexEqual(input.signature, signWebhook(input.rawBody, timestamp, input.secret));
}

export class ReplayWindow {
  private readonly seen = new Map<string, number>();
  private readonly windowSeconds: number;

  constructor(windowSeconds = WEBHOOK_WINDOW_SECONDS) {
    this.windowSeconds = windowSeconds;
  }

  accept(signature: string, timestamp: number, now = Math.floor(Date.now() / 1000)): boolean {
    for (const [knownSignature, expires] of this.seen) {
      if (expires < now) this.seen.delete(knownSignature);
    }
    if (Math.abs(now - timestamp) > this.windowSeconds || this.seen.has(signature)) return false;
    this.seen.set(signature, timestamp + this.windowSeconds);
    return true;
  }
}

function object(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
  return value as Record<string, unknown>;
}

function safeSlug(value: unknown, label: string): string {
  if (typeof value !== "string" || !slugPattern.test(value)) {
    throw new Error(`${label} must be a route-safe slug`);
  }
  return value;
}

function safeArticleType(value: unknown, required: boolean): WebhookEvent["article_type"] {
  if (value === undefined && !required) return undefined;
  if (typeof value !== "string" || !articleTypes.has(value)) {
    throw new Error("article_type is invalid");
  }
  return value as WebhookEvent["article_type"];
}

export function parseWebhookEvent(input: unknown): WebhookEvent {
  const raw = object(input, "webhook");
  if (typeof raw.event !== "string" || !webhookEvents.has(raw.event)) {
    throw new Error("event is unsupported");
  }
  if (typeof raw.domain !== "string" || !domains.has(raw.domain)) {
    throw new Error("domain is unsupported");
  }
  const domain = raw.domain as WebhookDomain;
  const event = raw.event as WebhookEventName;
  const id = Number(raw.id);
  if (!Number.isSafeInteger(id) || id < 0 || (domain !== "SiteSettings" && id === 0)) {
    throw new Error("id is invalid");
  }
  const timestamp = Number(raw.timestamp);
  if (!Number.isSafeInteger(timestamp) || timestamp <= 0) throw new Error("timestamp is invalid");
  if ((event === "settings.updated") !== (domain === "SiteSettings")) {
    throw new Error("settings event/domain mismatch");
  }
  if (event === "media.updated" && domain !== "Media") {
    throw new Error("media event/domain mismatch");
  }
  if (domain === "Media" && event !== "media.updated" && event !== "content.deleted") {
    throw new Error("media event/domain mismatch");
  }
  const needsSlug = domain === "Service" || domain === "Product" || domain === "Article";
  const slug = needsSlug ? safeSlug(raw.slug, "slug") : undefined;
  const previousSlug =
    raw.previous_slug === undefined ? undefined : safeSlug(raw.previous_slug, "previous_slug");
  if (event === "content.slug_changed" && !previousSlug) {
    throw new Error("previous_slug is required for slug changes");
  }
  const articleType = safeArticleType(raw.article_type, domain === "Article");
  let dependencies: readonly WebhookDependency[] | undefined;
  if (raw.dependencies !== undefined) {
    if (!Array.isArray(raw.dependencies)) throw new Error("dependencies must be an array");
    dependencies = raw.dependencies.map((dependency, index) => {
      const item = object(dependency, `dependencies[${index}]`);
      if (!["Service", "Product", "Article"].includes(String(item.domain))) {
        throw new Error(`dependencies[${index}].domain is invalid`);
      }
      const dependencyDomain = item.domain as WebhookDependency["domain"];
      return {
        domain: dependencyDomain,
        slug: safeSlug(item.slug, `dependencies[${index}].slug`),
        article_type: safeArticleType(item.article_type, dependencyDomain === "Article"),
      };
    });
  }
  return {
    event,
    domain,
    id,
    ...(slug ? { slug } : {}),
    ...(previousSlug ? { previous_slug: previousSlug } : {}),
    ...(articleType ? { article_type: articleType } : {}),
    ...(dependencies ? { dependencies } : {}),
    timestamp,
  };
}

function base64urlEncode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodePreviewPayload(encoded: string): unknown {
  try {
    return JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  } catch {
    return undefined;
  }
}

export function createPreviewIntent(
  payload: Omit<PreviewIntentPayload, "exp">,
  secret: string,
  now = Math.floor(Date.now() / 1000),
): string {
  if (secret.length < 32) throw new Error("preview secret is too short");
  const encoded = base64urlEncode(JSON.stringify({ ...payload, exp: now + PREVIEW_TTL_SECONDS }));
  return `${encoded}.${hmac(encoded, secret)}`;
}

export function verifyPreviewIntent(
  intent: string,
  secret: string,
  now = Math.floor(Date.now() / 1000),
): PreviewIntentPayload | undefined {
  if (secret.length < 32 || !intent.includes(".")) return undefined;
  const [encoded, signature, extra] = intent.split(".");
  if (!encoded || !signature || extra || !safeHexEqual(signature, hmac(encoded, secret))) {
    return undefined;
  }
  const raw = decodePreviewPayload(encoded);
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const payload = raw as Record<string, unknown>;
  const id = Number(payload.id);
  const exp = Number(payload.exp);
  if (
    typeof payload.post_type !== "string" ||
    !postTypes.has(payload.post_type) ||
    !Number.isSafeInteger(id) ||
    id <= 0 ||
    !Number.isSafeInteger(exp) ||
    exp < now ||
    exp > now + PREVIEW_TTL_SECONDS
  ) {
    return undefined;
  }
  let slug: string;
  try {
    slug = safeSlug(payload.slug, "slug");
  } catch {
    return undefined;
  }
  const postType = payload.post_type as PreviewIntentPayload["post_type"];
  let articleType: PreviewIntentPayload["article_type"];
  try {
    articleType = safeArticleType(payload.article_type, postType === "post");
  } catch {
    return undefined;
  }
  return {
    post_type: postType,
    id,
    slug,
    ...(articleType ? { article_type: articleType } : {}),
    exp,
  };
}
