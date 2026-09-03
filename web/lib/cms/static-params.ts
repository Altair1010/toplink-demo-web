import { CmsUnavailableError } from "./errors";

interface SlugRecord {
  slug: { value: string };
}

export async function safeStaticSlugs(
  loadRecords: () => Promise<readonly SlugRecord[]>,
): Promise<Array<{ slug: string }>> {
  try {
    return (await loadRecords()).map((record) => ({ slug: record.slug.value }));
  } catch (error) {
    if (error instanceof CmsUnavailableError) return [];
    throw error;
  }
}
