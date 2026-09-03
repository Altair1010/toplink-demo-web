import { RecordLink } from "@/components/content/RecordLink";
import { Gateway } from "@/components/structural/Gateway";
import { getArticles } from "@/lib/content";
import { createStaticPageMetadata } from "@/lib/seo/metadata";
import { currentPublicSiteEnvironment } from "@/lib/seo/origin";
import { isPublicSitemapRecord } from "@/lib/seo/sitemap";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const articles = (await getArticles()).filter(
    (article) => article.article_type.value !== "knowledge",
  );
  return createStaticPageMetadata(
    "/tin-tuc",
    currentPublicSiteEnvironment(),
    articles.some(isPublicSitemapRecord),
  );
}

export default async function NewsIndexPage() {
  const articles = (await getArticles()).filter(
    (article) => article.article_type.value !== "knowledge",
  );

  return (
    <main id="main">
      <Gateway
        eyebrow="Editorial docket"
        title="Điều gì đã xảy ra, thay đổi hoặc được ghi nhận?"
        lead="Tin tức giữ loại bài, ngày và bối cảnh như dữ liệu hạng nhất. Nó không trộn với kiến thức evergreen."
      />
      <section className="route-frame" aria-labelledby="docket-title">
        <p className="chapter-mark">Docket · published</p>
        <h2 id="docket-title">Bản ghi theo thời điểm</h2>
        <div className="editorial-docket">
          {articles.map((article) => (
            <RecordLink
              key={article.slug.value}
              href={`/tin-tuc/${article.slug.value}`}
              eyebrow={`${article.article_type.value} · ${article.published_at.value}`}
              title={article.title.value}
              summary={article.summary.value}
              meta={<span>{article.evidence_reference_state.value}</span>}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
