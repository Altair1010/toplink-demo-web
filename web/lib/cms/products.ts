import type { Product } from "@/types/domain";
import { cmsTags } from "@/lib/cms/cache";
import { fetchAllCmsItems } from "@/lib/cms/collection";
import { CmsNotFoundError } from "@/lib/cms/errors";
import { normalizeProduct } from "@/lib/cms/normalizers";
import { fetchCmsJson } from "@/lib/cms/wp-client";

export function getCmsProducts(): Promise<readonly Product[]> {
  return fetchAllCmsItems("products", normalizeProduct, [cmsTags.products]);
}

export async function getCmsProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    return normalizeProduct(
      await fetchCmsJson(`products/${encodeURIComponent(slug)}`, undefined, {
        tags: [cmsTags.products, cmsTags.product(slug)],
      }),
    );
  } catch (error) {
    if (error instanceof CmsNotFoundError) return undefined;
    throw error;
  }
}
