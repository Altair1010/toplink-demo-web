import type { Article, EditorialLifecycle, Product, Service } from "@/types/domain";
import { normalizeArticle, normalizeProduct, normalizeService } from "@/lib/cms/normalizers";
import type { PreviewSession } from "@/lib/cms/preview-session";
import { CmsSchemaError } from "@/lib/cms/schemas";
import { fetchCmsJson } from "@/lib/cms/wp-client";

type PreviewRecord = Service | Product | Article;

function previewEnvelope<T extends PreviewRecord>(
  input: unknown,
  normalize: (value: unknown) => T,
): T {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new CmsSchemaError("preview response must be an object");
  }
  const raw = input as Record<string, unknown>;
  if (!["draft", "in_review", "approved", "published"].includes(String(raw.lifecycle))) {
    throw new CmsSchemaError("preview lifecycle is invalid");
  }
  return {
    ...normalize(raw.item),
    editorial_lifecycle: raw.lifecycle as EditorialLifecycle,
  };
}

export async function getPreviewService(session: PreviewSession): Promise<Service> {
  return previewEnvelope(
    await fetchCmsJson(`preview/service/${session.payload.id}`, undefined, {
      previewIntent: session.intent,
    }),
    normalizeService,
  );
}

export async function getPreviewProduct(session: PreviewSession): Promise<Product> {
  return previewEnvelope(
    await fetchCmsJson(`preview/product/${session.payload.id}`, undefined, {
      previewIntent: session.intent,
    }),
    normalizeProduct,
  );
}

export async function getPreviewArticle(session: PreviewSession): Promise<Article> {
  return previewEnvelope(
    await fetchCmsJson(`preview/post/${session.payload.id}`, undefined, {
      previewIntent: session.intent,
    }),
    normalizeArticle,
  );
}
