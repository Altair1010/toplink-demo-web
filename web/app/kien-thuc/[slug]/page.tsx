import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FixtureNotice } from "@/components/content/FixtureNotice";
import { Gateway } from "@/components/structural/Gateway";
import { ReadingHall } from "@/components/structural/ReadingHall";
import { Release } from "@/components/structural/Release";
import { Threshold } from "@/components/structural/Threshold";
import { getArticleBySlug, getArticles } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getArticles("knowledge").map((article) => ({ slug: article.slug.value }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleBySlug((await params).slug, "knowledge");
  return article ? { title: article.title.value } : {};
}

export default async function KnowledgeDetailPage({ params }: PageProps) {
  const article = getArticleBySlug((await params).slug, "knowledge");
  if (!article) notFound();

  const chapterNames = [
    "Câu hỏi học tập",
    "Giải thích dễ hiểu",
    "Áp dụng có giới hạn",
    "Khi cần chuyển tiếp",
  ];

  return (
    <main id="main">
      <FixtureNotice />
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
