import type { Metadata } from "next";

import type { Article, Media, Product, Service } from "../../types/domain/index.ts";
import { isPublicSeoRecord } from "./eligibility.ts";

import {
  canonicalUrl,
  configuredPublicSiteOrigin,
  isProductionIndexingEnabled,
  type PublicSiteEnvironment,
} from "./origin.ts";

export interface SocialImageInput {
  readonly url: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface PageMetadataInput {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string;
  readonly canonicalEligible?: boolean;
  readonly siteName: string;
  readonly type: "website" | "article";
  readonly preview?: boolean;
  readonly indexable?: boolean;
  readonly image?: SocialImageInput;
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
  readonly authors?: readonly string[];
}

function socialImage(input: SocialImageInput, origin?: URL) {
  let url: URL;
  try {
    url = new URL(input.url, origin);
  } catch {
    return undefined;
  }
  if (!origin && !/^https?:$/.test(url.protocol)) return undefined;
  if (
    !/^https?:$/.test(url.protocol) ||
    input.width <= 0 ||
    input.height <= 0 ||
    !input.alt.trim()
  ) {
    return undefined;
  }
  return { url: url.href, width: input.width, height: input.height, alt: input.alt };
}

export function createPageMetadata(
  input: PageMetadataInput,
  environment: PublicSiteEnvironment,
): Metadata {
  const origin = configuredPublicSiteOrigin(environment);
  const canonical =
    origin && input.canonicalEligible !== false
      ? canonicalUrl(origin, input.canonicalPath)
      : undefined;
  const image = input.image ? socialImage(input.image, origin) : undefined;
  const index =
    !input.preview &&
    input.indexable !== false &&
    input.canonicalEligible !== false &&
    isProductionIndexingEnabled(environment);
  const openGraph: NonNullable<Metadata["openGraph"]> =
    input.type === "article"
      ? {
          title: input.title,
          description: input.description,
          siteName: input.siteName,
          type: "article",
          ...(canonical ? { url: canonical } : {}),
          ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
          ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
          ...(input.authors?.length ? { authors: [...input.authors] } : {}),
          ...(image ? { images: [image] } : {}),
        }
      : {
          title: input.title,
          description: input.description,
          siteName: input.siteName,
          type: "website",
          ...(canonical ? { url: canonical } : {}),
          ...(image ? { images: [image] } : {}),
        };

  return {
    title: input.title,
    description: input.description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph,
    robots: { index, follow: index },
  };
}

function mediaInput(media: Media | undefined): SocialImageInput | undefined {
  if (
    !media ||
    media.asset.status !== "APPROVED" ||
    media.alt_text.status !== "APPROVED" ||
    media.authorization.status !== "APPROVED" ||
    media.publishability_status.status !== "APPROVED" ||
    !media.authorization.value.trim() ||
    !media.publishability_status.value.trim()
  ) {
    return undefined;
  }
  return {
    url: media.asset.value.src,
    width: media.asset.value.width,
    height: media.asset.value.height,
    alt: media.alt_text.value,
  };
}

export function createServiceMetadata(
  service: Service,
  environment: PublicSiteEnvironment,
): Metadata {
  const seo = service.seo.value;
  return createPageMetadata(
    {
      title: seo.title,
      description: seo.description,
      canonicalPath: seo.canonicalPath,
      canonicalEligible: isPublicSeoRecord(service),
      siteName: "Y Viện Toplink",
      type: "website",
      preview: service.editorial_lifecycle !== "published",
      image: mediaInput(seo.image),
    },
    environment,
  );
}

export function createProductMetadata(
  product: Product,
  environment: PublicSiteEnvironment,
): Metadata {
  const seo = product.seo.value;
  return createPageMetadata(
    {
      title: seo.title,
      description: seo.description,
      canonicalPath: seo.canonicalPath,
      canonicalEligible: isPublicSeoRecord(product),
      siteName: "Y Viện Toplink",
      type: "website",
      preview: product.editorial_lifecycle !== "published",
      image: mediaInput(seo.image),
    },
    environment,
  );
}

export function createArticleMetadata(
  article: Article,
  environment: PublicSiteEnvironment,
): Metadata {
  const seo = article.seo.value;
  return createPageMetadata(
    {
      title: seo.title,
      description: seo.description,
      canonicalPath: seo.canonicalPath,
      canonicalEligible: isPublicSeoRecord(article),
      siteName: "Y Viện Toplink",
      type: "article",
      preview: article.editorial_lifecycle !== "published",
      image: mediaInput(article.featured_media?.value ?? seo.image),
      publishedTime: article.published_at.value,
      modifiedTime: article.updated_at?.value,
      authors: [article.author.value],
    },
    environment,
  );
}

const staticMetadata = {
  "/": {
    title: "Y Viện Toplink",
    description: "Website thông tin và liên hệ con người tùy chọn của Y Viện Toplink.",
  },
  "/gioi-thieu": {
    title: "Giới thiệu",
    description: "Tìm hiểu vai trò, phạm vi và giới hạn thông tin của Y Viện Toplink.",
  },
  "/dich-vu": {
    title: "Dịch vụ",
    description: "Khám phá các dịch vụ đã được phê duyệt cùng phạm vi và giới hạn rõ ràng.",
  },
  "/san-pham": {
    title: "Sản phẩm",
    description: "Thông tin sản phẩm đã được phê duyệt; đây không phải trang mua hàng.",
  },
  "/kien-thuc": {
    title: "Kiến thức",
    description: "Kiến thức dưỡng sinh đã qua quy trình biên tập với giới hạn an toàn rõ ràng.",
  },
  "/tin-tuc": {
    title: "Tin tức",
    description: "Tin tức và cập nhật đã qua quy trình biên tập của Y Viện Toplink.",
  },
  "/khong-gian": {
    title: "Không gian",
    description: "Thông tin không gian chỉ xuất hiện khi có bằng chứng Toplink được ủy quyền.",
  },
  "/lien-he": {
    title: "Liên hệ",
    description: "Kênh liên hệ chính thức chỉ xuất hiện khi đã được xác minh và phê duyệt.",
  },
} as const;

export type StaticCanonicalPath = keyof typeof staticMetadata;

export function createStaticPageMetadata(
  path: StaticCanonicalPath,
  environment: PublicSiteEnvironment,
  indexable: boolean,
): Metadata {
  const content = staticMetadata[path];
  const metadata = createPageMetadata(
    {
      ...content,
      canonicalPath: path,
      siteName: "Y Viện Toplink",
      type: "website",
      indexable,
    },
    environment,
  );
  return path === "/" ? { ...metadata, title: { absolute: content.title } } : metadata;
}
