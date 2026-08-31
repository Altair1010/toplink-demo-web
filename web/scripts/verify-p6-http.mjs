import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function envFile(path) {
  const values = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) values[match[1]] = match[2];
  }
  return values;
}

const local = envFile(resolve(process.cwd(), ".env.local"));
const secret = local.TOPLINK_WEBHOOK_SECRET;
if (!secret || secret.length < 32) throw new Error("P6 webhook secret is not configured locally");
const endpoint = new URL("/api/cms/revalidate", local.TOPLINK_WEB_BASE_URL).toString();

function signature(body, timestamp) {
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

async function send(body, timestamp, signed = true) {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-toplink-timestamp": String(timestamp),
      ...(signed ? { "x-toplink-signature": signature(body, timestamp) } : {}),
    },
    body,
  });
}

function assertStatus(actual, expected, label) {
  if (actual !== expected) throw new Error(`${label}: expected ${expected}, got ${actual}`);
  process.stdout.write(`PASS: ${label}\n`);
}

const now = Math.floor(Date.now() / 1000);
const validBody = JSON.stringify({
  event: "content.updated",
  domain: "Service",
  id: now,
  slug: `p6-http-${now}`,
  timestamp: now,
});
assertStatus((await send(validBody, now)).status, 200, "valid signed webhook is accepted");
assertStatus((await send(validBody, now)).status, 409, "same signed request is replay-rejected");
assertStatus((await send(validBody, now, false)).status, 401, "missing signature is rejected");

const stale = now - 301;
const staleBody = JSON.stringify({
  event: "content.updated",
  domain: "Service",
  id: stale,
  slug: `p6-http-${stale}`,
  timestamp: stale,
});
assertStatus((await send(staleBody, stale)).status, 401, "stale timestamp is rejected");

const tamperedBody = validBody.replace("content.updated", "content.deleted");
const tampered = await fetch(endpoint, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-toplink-timestamp": String(now),
    "x-toplink-signature": signature(validBody, now),
  },
  body: tamperedBody,
});
assertStatus(tampered.status, 401, "tampered body is rejected");

const unsupportedTimestamp = now + 1;
const unsupportedBody = JSON.stringify({
  event: "content.unsupported",
  domain: "Service",
  id: unsupportedTimestamp,
  slug: `p6-http-${unsupportedTimestamp}`,
  timestamp: unsupportedTimestamp,
});
assertStatus(
  (await send(unsupportedBody, unsupportedTimestamp)).status,
  400,
  "signed unsupported event is safely rejected",
);
