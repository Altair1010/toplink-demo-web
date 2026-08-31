import type { CmsCollection } from "@/lib/cms/schemas";
import { parseCollection } from "@/lib/cms/schemas";
import { fetchCmsJson } from "@/lib/cms/wp-client";

const PER_PAGE = 100;
const MAX_PAGES = 1_000;

export async function fetchAllCmsItems<T>(
  path: string,
  parseItem: (item: unknown) => T,
  tags: readonly string[],
  baseQuery?: URLSearchParams,
): Promise<readonly T[]> {
  const items: T[] = [];
  let page = 1;
  while (page <= MAX_PAGES) {
    const query = new URLSearchParams(baseQuery);
    query.set("page", String(page));
    query.set("per_page", String(PER_PAGE));
    const result: CmsCollection<T> = parseCollection(
      await fetchCmsJson(path, query, { tags }),
      parseItem,
    );
    items.push(...result.items);
    if (result.pagination.nextPage === null) return items;
    if (result.pagination.nextPage !== page + 1) {
      throw new Error("CMS pagination sequence is invalid");
    }
    page = result.pagination.nextPage;
  }
  throw new Error("CMS pagination exceeded the safety limit");
}
