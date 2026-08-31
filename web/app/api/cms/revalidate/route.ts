import { revalidatePath, revalidateTag } from "next/cache";

import { revalidationForEvent } from "@/lib/cms/cache";
import { parseWebhookEvent, ReplayWindow, verifyWebhookSignature } from "@/lib/cms/signatures";

const MAX_BODY_BYTES = 16 * 1024;
const replayWindow = new ReplayWindow(300);

function response(status: number, code: string): Response {
  return Response.json({ ok: false, error: code }, { status });
}

export async function POST(request: Request): Promise<Response> {
  const configuredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(configuredLength) && configuredLength > MAX_BODY_BYTES) {
    return response(413, "payload_too_large");
  }

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    return response(413, "payload_too_large");
  }

  const timestampHeader = request.headers.get("x-toplink-timestamp") ?? "";
  const signature = request.headers.get("x-toplink-signature") ?? "";
  const secret = process.env.TOPLINK_WEBHOOK_SECRET ?? "";
  if (!secret) return response(503, "integration_not_configured");
  if (
    !verifyWebhookSignature({
      rawBody,
      timestamp: timestampHeader,
      signature,
      secret,
    })
  ) {
    return response(401, "invalid_signature");
  }

  const timestamp = Number(timestampHeader);
  if (!replayWindow.accept(signature, timestamp)) {
    return response(409, "replayed_request");
  }

  let event;
  try {
    event = parseWebhookEvent(JSON.parse(rawBody));
  } catch {
    return response(400, "invalid_event");
  }
  if (event.timestamp !== timestamp) return response(400, "timestamp_mismatch");

  const target = revalidationForEvent(event);
  for (const tag of target.tags) revalidateTag(tag, "max");
  for (const path of target.paths) revalidatePath(path);

  console.info(
    "Toplink CMS revalidation",
    JSON.stringify({
      event: event.event,
      domain: event.domain,
      id: event.id,
      slug: event.slug ?? null,
      result: "accepted",
      timestamp: event.timestamp,
    }),
  );
  return Response.json({ ok: true, revalidated: target });
}
