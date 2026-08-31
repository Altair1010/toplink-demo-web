import type { Service } from "@/types/domain";
import { cmsTags } from "@/lib/cms/cache";
import { fetchAllCmsItems } from "@/lib/cms/collection";
import { CmsNotFoundError } from "@/lib/cms/errors";
import { normalizeService } from "@/lib/cms/normalizers";
import { fetchCmsJson } from "@/lib/cms/wp-client";

export function getCmsServices(): Promise<readonly Service[]> {
  return fetchAllCmsItems("services", normalizeService, [cmsTags.services]);
}

export async function getCmsServiceBySlug(slug: string): Promise<Service | undefined> {
  try {
    return normalizeService(
      await fetchCmsJson(`services/${encodeURIComponent(slug)}`, undefined, {
        tags: [cmsTags.services, cmsTags.service(slug)],
      }),
    );
  } catch (error) {
    if (error instanceof CmsNotFoundError) return undefined;
    throw error;
  }
}
