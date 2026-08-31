import type { Article, ArticleType } from "@/types/domain";
import { cmsTags } from "@/lib/cms/cache";
import { fetchAllCmsItems } from "@/lib/cms/collection";
import { CmsNotFoundError } from "@/lib/cms/errors";
import { normalizeArticle } from "@/lib/cms/normalizers";
import { fetchCmsJson } from "@/lib/cms/wp-client";

export function getCmsArticles(type?: ArticleType): Promise<readonly Article[]> {
  const query = type ? new URLSearchParams({ type }) : undefined;
  const tags = [cmsTags.articles, ...(type ? [cmsTags.articleType(type)] : [])];
  return fetchAllCmsItems("articles", normalizeArticle, tags, query);
}

export async function getCmsArticleBySlug(
  slug: string,
  type?: ArticleType,
): Promise<Article | undefined> {
  try {
    const article = normalizeArticle(
      await fetchCmsJson(`articles/${encodeURIComponent(slug)}`, undefined, {
        tags: [
          cmsTags.articles,
          cmsTags.article(slug),
          ...(type ? [cmsTags.articleType(type)] : []),
        ],
      }),
    );
    return type && article.article_type.value !== type ? undefined : article;
  } catch (error) {
    if (error instanceof CmsNotFoundError) return undefined;
    throw error;
  }
}
