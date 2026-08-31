import { NextResponse } from "next/server";

import { PREVIEW_COOKIE } from "@/lib/cms/preview-session";
import { webOrigin } from "@/lib/cms/web-origin";

export async function GET(request: Request): Promise<Response> {
  void request;
  const origin = webOrigin();
  const response = NextResponse.redirect(new URL("/", origin));
  response.cookies.set(PREVIEW_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: origin.protocol === "https:",
    path: "/",
    maxAge: 0,
  });
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}
