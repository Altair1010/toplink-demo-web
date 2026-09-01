import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { JsonLd } from "@/components/content/JsonLd";
import { PreviewNotice } from "@/components/content/PreviewNotice";
import { Gateway } from "@/components/structural/Gateway";
import { ReadingHall } from "@/components/structural/ReadingHall";
import { Release } from "@/components/structural/Release";
import { getArticleBySlug, getArticles, getContentRedirect } from "@/lib/content";
import { isPublicSeoRecord } from "@/lib/seo/eligibility";
import { createArticleMetadata } from "@/lib/seo/metadata";
import { configuredPublicSiteOrigin, currentPublicSiteEnvironment } from "@/lib/seo/origin";
import { createArticleStructuredData, createBreadcrumbList } from "@/lib/seo/structured-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const newsArticles = async () =>
  (await getArticles()).filter((article) => article.article_type.value !== "knowledge");

export async function generateStaticParams() {
  return (await newsArticles()).map((article) => ({ slug: article.slug.value }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug);
  return article && article.article_type.value !== "knowledge"
    ? createArticleMetadata(article, currentPublicSiteEnvironment())
    : {};
}

export default async function NewsDetailPage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = await getArticleBySlug(slug);
  if (!article || article.article_type.value === "knowledge") {
    const redirect = await getContentRedirect("articles", slug);
    if (redirect?.startsWith("/tin-tuc/")) permanentRedirect(redirect);
    notFound();
  }
  const breadcrumbItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Tin tức", path: "/tin-tuc" },
    { name: article.title.value, path: article.seo.value.canonicalPath },
  ];
  const publicOrigin = configuredPublicSiteOrigin(currentPublicSiteEnvironment());

  return (
    <main id="main">
      <JsonLd
        data={
          publicOrigin && isPublicSeoRecord(article)
            ? createBreadcrumbList(breadcrumbItems, publicOrigin)
            : undefined
        }
      />
      <JsonLd
        data={publicOrigin ? createArticleStructuredData(article, publicOrigin) : undefined}
      />
      <PreviewNotice lifecycle={article.editorial_lifecycle} />
      <Breadcrumbs items={breadcrumbItems} />
      <Gateway
        eyebrow={`${article.article_type.value} · ${article.published_at.value}`}
        title={article.title.value}
        lead={article.summary.value}
      />
      <ReadingHall>
        <section>
          <p className="chapter-mark">Bản ghi có ngày</p>
          <h2>Bối cảnh</h2>
          {article.body.value.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="evidence-note">
            <strong>Trạng thái evidence</strong>
            <p>{article.evidence_reference_state.value}</p>
          </div>
        </section>
      </ReadingHall>
      <Release eyebrow="Editorial release" title="Tiếp tục theo đúng ngữ cảnh">
        <p>Bản tin không tự động trở thành bằng chứng bán hàng hoặc lời chứng thực.</p>
        <Link className="text-link" href="/tin-tuc">
          Trở lại editorial docket
        </Link>
      </Release>
    </main>
  );
}
