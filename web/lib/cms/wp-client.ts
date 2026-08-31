import "server-only";

import { CMS_REVALIDATE_SECONDS } from "@/lib/cms/cache";
import { CmsNotFoundError, CmsUnavailableError } from "@/lib/cms/errors";
import { CmsSchemaError } from "@/lib/cms/schemas";

const REQUEST_TIMEOUT_MS = 5_000;

interface CmsRequestOptions {
  readonly tags?: readonly string[];
  readonly previewIntent?: string;
}

function cmsBaseUrl(): URL {
  const configured = process.env.TOPLINK_CMS_BASE_URL?.trim();
  if (!configured) throw new CmsUnavailableError("TOPLINK_CMS_BASE_URL chưa được cấu hình");
  let url: URL;
  try {
    url = new URL(configured.endsWith("/") ? configured : `${configured}/`);
  } catch (error) {
    throw new CmsUnavailableError("TOPLINK_CMS_BASE_URL không hợp lệ", { cause: error });
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new CmsUnavailableError("CMS URL phải dùng HTTP(S)");
  }
  if (url.protocol === "http:" && !["127.0.0.1", "localhost"].includes(url.hostname)) {
    throw new CmsUnavailableError("HTTP CMS chỉ được phép trên loopback local");
  }
  return url;
}

function requestUrl(path: string, query?: URLSearchParams): URL {
  const cleanPath = path.replace(/^\/+/, "");
  if (cleanPath.includes("..")) throw new CmsSchemaError("CMS path không hợp lệ");
  const url = new URL(cleanPath, cmsBaseUrl());
  if (query) url.search = query.toString();
  return url;
}

export async function fetchCmsJson(
  path: string,
  query?: URLSearchParams,
  options: CmsRequestOptions = {},
): Promise<unknown> {
  const preview = Boolean(options.previewIntent);
  let response: Response;
  try {
    response = await fetch(requestUrl(path, query), {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(options.previewIntent ? { "X-Toplink-Preview-Intent": options.previewIntent } : {}),
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      ...(preview
        ? { cache: "no-store" as const }
        : {
            next: {
              revalidate: CMS_REVALIDATE_SECONDS,
              tags: [...(options.tags ?? [])],
            },
          }),
    });
  } catch (error) {
    throw new CmsUnavailableError("Không thể kết nối CMS", { cause: error });
  }

  if (response.status === 404) throw new CmsNotFoundError();
  if (!response.ok) {
    throw new CmsUnavailableError(`CMS trả về HTTP ${response.status}`);
  }
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("application/json")) {
    throw new CmsSchemaError("CMS không trả về JSON");
  }
  try {
    return await response.json();
  } catch (error) {
    throw new CmsSchemaError("CMS trả về JSON không hợp lệ", { cause: error });
  }
}
