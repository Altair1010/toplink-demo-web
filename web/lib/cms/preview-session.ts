import "server-only";

import { cookies } from "next/headers";

import { verifyPreviewIntent, type PreviewIntentPayload } from "@/lib/cms/signatures";

export const PREVIEW_COOKIE = "toplink_preview";

export interface PreviewSession {
  readonly intent: string;
  readonly payload: PreviewIntentPayload;
}

export async function getPreviewSession(
  postType: PreviewIntentPayload["post_type"],
  slug: string,
): Promise<PreviewSession | undefined> {
  const intent = (await cookies()).get(PREVIEW_COOKIE)?.value;
  const secret = process.env.TOPLINK_PREVIEW_SECRET ?? "";
  if (!intent || !secret) return undefined;
  const payload = verifyPreviewIntent(intent, secret);
  if (!payload || payload.post_type !== postType || payload.slug !== slug) return undefined;
  return { intent, payload };
}
