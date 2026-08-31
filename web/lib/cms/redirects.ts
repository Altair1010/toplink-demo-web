import { cmsTags } from "@/lib/cms/cache";
import { CmsNotFoundError } from "@/lib/cms/errors";
import { CmsSchemaError } from "@/lib/cms/schemas";
import { fetchCmsJson } from "@/lib/cms/wp-client";

export type RedirectResource = "services" | "products" | "articles";

export async function getCmsRedirect(
  resource: RedirectResource,
  oldSlug: string,
): Promise<string | undefined> {
  const familyTag =
    resource === "services"
      ? cmsTags.services
      : resource === "products"
        ? cmsTags.products
        : cmsTags.articles;
  try {
    const input = await fetchCmsJson(
      `redirects/${resource}/${encodeURIComponent(oldSlug)}`,
      undefined,
      { tags: [familyTag] },
    );
    if (!input || typeof input !== "object" || Array.isArray(input)) {
      throw new CmsSchemaError("redirect response must be an object");
    }
    const path = (input as Record<string, unknown>).path;
    const allowedPrefix =
      resource === "services" ? "/dich-vu/" : resource === "products" ? "/san-pham/" : undefined;
    if (
      typeof path !== "string" ||
      path.includes("..") ||
      path.includes(":") ||
      (allowedPrefix
        ? !path.startsWith(allowedPrefix)
        : !path.startsWith("/kien-thuc/") && !path.startsWith("/tin-tuc/"))
    ) {
      throw new CmsSchemaError("redirect path is invalid");
    }
    return path;
  } catch (error) {
    if (error instanceof CmsNotFoundError) return undefined;
    throw error;
  }
}
