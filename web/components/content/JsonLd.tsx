import { serializeJsonLd, type JsonLdObject } from "@/lib/seo/structured-data";

export function JsonLd({ data }: { readonly data: JsonLdObject | undefined }) {
  return data ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  ) : null;
}
