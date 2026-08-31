import { NextResponse } from "next/server";

import { PREVIEW_COOKIE } from "@/lib/cms/preview-session";
import { verifyPreviewIntent } from "@/lib/cms/signatures";
import { webOrigin } from "@/lib/cms/web-origin";

function canonicalPath(payload: NonNullable<ReturnType<typeof verifyPreviewIntent>>): string {
  if (payload.post_type === "service") return `/dich-vu/${payload.slug}`;
  if (payload.post_type === "product") return `/san-pham/${payload.slug}`;
  return payload.article_type === "knowledge"
    ? `/kien-thuc/${payload.slug}`
    : `/tin-tuc/${payload.slug}`;
}

export async function GET(request: Request): Promise<Response> {
  const intent = new URL(request.url).searchParams.get("intent") ?? "";
  const secret = process.env.TOPLINK_PREVIEW_SECRET ?? "";
  const payload = secret ? verifyPreviewIntent(intent, secret) : undefined;
  if (!payload) {
    return new Response("Preview intent không hợp lệ hoặc đã hết hạn.", { status: 401 });
  }

  const origin = webOrigin();
  const response = NextResponse.redirect(new URL(canonicalPath(payload), origin));
  response.cookies.set(PREVIEW_COOKIE, intent, {
    httpOnly: true,
    sameSite: "lax",
    secure: origin.protocol === "https:",
    path: "/",
    maxAge: Math.max(1, payload.exp - Math.floor(Date.now() / 1000)),
  });
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}
