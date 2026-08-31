export const CMS_REVALIDATE_SECONDS = 3600;

export const cmsTags = {
  services: "cms:services",
  service: (slug: string) => `cms:service:${slug}`,
  products: "cms:products",
  product: (slug: string) => `cms:product:${slug}`,
  articles: "cms:articles",
  article: (slug: string) => `cms:article:${slug}`,
  articleType: (type: string) => `cms:article-type:${type}`,
  media: "cms:media",
  mediaItem: (id: number) => `cms:media:${id}`,
  siteSettings: "cms:site-settings",
} as const;
