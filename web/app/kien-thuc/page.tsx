import type { Metadata } from "next";

import { FixtureNotice } from "@/components/content/FixtureNotice";
import { RecordLink } from "@/components/content/RecordLink";
import { Court } from "@/components/structural/Court";
import { Gateway } from "@/components/structural/Gateway";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = { title: "Kiến thức" };

export default function KnowledgeIndexPage() {
  const articles = getArticles("knowledge");

  return (
    <main id="main">
      <FixtureNotice />
      <Gateway
        variant="reading"
        eyebrow="Learning gateway"
        title="Đọc để hiểu, không bị dẫn tới bán hàng"
        lead="Kiến thức evergreen là một điểm đến độc lập: người đọc có thể hoàn thành nhu cầu học tập và rời đi an toàn."
      />
      <Court
        eyebrow="Reading halls"
        title="Các đường đọc tham chiếu"
        intro="Các bài dưới đây là fixture P4, không phải bài đã qua quy trình biên tập xuất bản."
        tone="muted"
      >
        <div className="record-list">
          {articles.map((article) => (
            <RecordLink
              key={article.slug.value}
              href={`/kien-thuc/${article.slug.value}`}
              eyebrow="Evergreen · fixture"
              title={article.title.value}
              summary={article.summary.value}
              meta={<span>{article.evidence_reference_state.value}</span>}
            />
          ))}
        </div>
      </Court>
    </main>
  );
}
