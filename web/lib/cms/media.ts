import type { Media } from "@/types/domain";
import { cmsTags } from "@/lib/cms/cache";
import { fetchAllCmsItems } from "@/lib/cms/collection";
import { CmsNotFoundError } from "@/lib/cms/errors";
import { normalizeMedia } from "@/lib/cms/normalizers";
import { fetchCmsJson } from "@/lib/cms/wp-client";

export function getCmsMedia(): Promise<readonly Media[]> {
  return fetchAllCmsItems("media", normalizeMedia, [cmsTags.media]);
}

export async function getCmsMediaById(id: number): Promise<Media | undefined> {
  try {
    return normalizeMedia(
      await fetchCmsJson(`media/${id}`, undefined, {
        tags: [cmsTags.media, cmsTags.mediaItem(id)],
      }),
    );
  } catch (error) {
    if (error instanceof CmsNotFoundError) return undefined;
    throw error;
  }
}
