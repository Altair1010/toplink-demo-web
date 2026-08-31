import type { SiteSettings } from "@/types/domain";
import { cmsTags } from "@/lib/cms/cache";
import { normalizeSiteSettings } from "@/lib/cms/normalizers";
import { fetchCmsJson } from "@/lib/cms/wp-client";

export async function getCmsSiteSettings(): Promise<SiteSettings> {
  return normalizeSiteSettings(
    await fetchCmsJson("site-settings", undefined, { tags: [cmsTags.siteSettings] }),
  );
}
