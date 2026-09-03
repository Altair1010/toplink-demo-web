import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { JsonLd } from "@/components/content/JsonLd";
import { PreviewNotice } from "@/components/content/PreviewNotice";
import { Gateway } from "@/components/structural/Gateway";
import { ReadingHall } from "@/components/structural/ReadingHall";
import { Release } from "@/components/structural/Release";
import { Threshold } from "@/components/structural/Threshold";
import { getArticleBySlug, getArticles, getContentRedirect } from "@/lib/content";
import { safeStaticSlugs } from "@/lib/cms/static-params";
import { isPublicSeoRecord } from "@/lib/seo/eligibility";
import { createArticleMetadata } from "@/lib/seo/metadata";
import { configuredPublicSiteOrigin, currentPublicSiteEnvironment } from "@/lib/seo/origin";
import { createArticleStructuredData, createBreadcrumbList } from "@/lib/seo/structured-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return safeStaticSlugs(() => getArticles("knowledge"));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug, "knowledge");
  return article ? createArticleMetadata(article, currentPublicSiteEnvironment()) : {};
}

export default async function KnowledgeDetailPage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = await getArticleBySlug(slug, "knowledge");
  if (!article) {
    const redirect = await getContentRedirect("articles", slug);
    if (redirect?.startsWith("/kien-thuc/")) permanentRedirect(redirect);
    notFound();
  }

  const chapterNames = [
    "Câu hỏi học tập",
    "Giải thích dễ hiểu",
    "Áp dụng có giới hạn",
    "Khi cần chuyển tiếp",
  ];
  const breadcrumbItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Kiến thức", path: "/kien-thuc" },
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
        variant="reading"
        eyebrow="Knowledge detail · reading hall"
        title={article.title.value}
        lead={article.summary.value}
      />
      <ReadingHall
        navigation={
          <nav aria-label="Mục lục bài đọc">
            <ul>
              {chapterNames.slice(0, article.body.value.length).map((name, index) => (
                <li key={name}>
                  <a href={`#reading-${index + 1}`}>
                    <span>0{index + 1}</span>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      >
        {article.body.value.map((paragraph, index) => (
          <section id={`reading-${index + 1}`} key={paragraph}>
            <p className="chapter-mark">0{index + 1}</p>
            <h2>{chapterNames[index] ?? "Giải thích"}</h2>
            <p>{paragraph}</p>
            {index === 1 ? (
              <div className="evidence-note">
                <strong>Trạng thái bằng chứng</strong>
                <p>{article.evidence_reference_state.value}</p>
              </div>
            ) : null}
          </section>
        ))}
        <Threshold title="Điểm dừng an toàn">
          <p>
            Nội dung giáo dục không xác nhận lựa chọn phù hợp cho từng người và không thay thế đánh
            giá chuyên môn.
          </p>
        </Threshold>
      </ReadingHall>
      <Release eyebrow="Related reading" title="Tiếp tục bằng nội dung liên quan">
        <p>Đường đọc có thể kết thúc tại đây. Liên hệ không phải điều kiện để hiểu.</p>
        <Link className="text-link" href="/kien-thuc">
          Trở lại reading hall
        </Link>
      </Release>
    </main>
  );
}
