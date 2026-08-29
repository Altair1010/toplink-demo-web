import Link from "next/link";
import content from "@/data/content-index-lite.json";
import { Eyebrow, PageShell } from "./components/Shell";

const clusters = [
  ["Huyệt đạo", "166 bản ghi", "/knowledge?type=entity-huyet", "穴"],
  ["Dược liệu", "55 vị thuốc", "/knowledge?type=entity-vi-thuoc", "藥"],
  ["Kinh mạch", "29 chuyên mục", "/knowledge?type=entity-kinh-mach", "經"],
  ["Lý luận", "41 học thuyết", "/knowledge?type=theory-detail", "理"],
];

export default function Home() {
  const featured = content.filter((x) => x.hero && ["entity-huyet", "entity-vi-thuoc", "article"].includes(x.archetype)).slice(0, 3);
  return <PageShell>
    <section className="home-hero">
      <div className="hero-copy"><Eyebrow>Y học cổ truyền · Một hệ tri thức sống</Eyebrow><h1>Hiểu cơ thể.<br/><em>Chọn đúng hành trình.</em></h1><p>Một nền tảng kết nối tàng thư Y học cổ truyền với hành trình tìm hiểu phương pháp hỗ trợ—rõ nguồn, đúng bối cảnh và không thay thế tư vấn chuyên môn.</p></div>
      <div className="entry-doors">
        <Link className="entry primary" href="/knowledge"><span>01 · TÌM HIỂU</span><strong>Khám phá<br/>Tàng thư Đông Y</strong><p>634 bản ghi về huyệt, kinh mạch, dược liệu, lý luận và bệnh học.</p><i>Khám phá ngay →</i></Link>
        <Link className="entry" href="/care"><span>02 · NHU CẦU HỖ TRỢ</span><strong>Tìm hiểu<br/>hành trình trị liệu</strong><p>Phạm vi, phương pháp, quy trình và những câu hỏi cần chuẩn bị.</p><i>Xem hành trình →</i></Link>
      </div>
    </section>

    <section className="collection-section"><div className="section-intro"><div><Eyebrow>Tàng thư có cấu trúc</Eyebrow><h2>Tri thức không nằm trong những danh sách phẳng.</h2></div><p>Corpus nguồn được tổ chức lại thành graph: mỗi bản ghi giữ URL gốc, thời điểm capture và quan hệ đến các chủ đề liên quan.</p></div><div className="cluster-grid">{clusters.map(([title,count,href,mark])=><Link href={href} className="cluster" key={title}><span>{mark}</span><div><strong>{title}</strong><small>{count}</small></div><i>↗</i></Link>)}</div></section>

    <section className="principle-section"><div className="principle-mark">證</div><div><Eyebrow>Nguyên tắc biên tập</Eyebrow><h2>Evidence trước.<br/>Lời khuyên sau.</h2></div><div className="principles"><p><strong>01</strong><span>Nguồn gốc hiển thị</span>Mỗi nội dung có source trace và trạng thái capture.</p><p><strong>02</strong><span>Không chẩn đoán</span>Công cụ tra cứu chỉ giúp khám phá kiến thức liên quan.</p><p><strong>03</strong><span>Ranh giới rõ ràng</span>Kiến thức truyền thống không bị trình bày như kết luận lâm sàng.</p></div></section>

    <section className="featured-section"><div className="section-intro"><div><Eyebrow>Đọc từ tàng thư</Eyebrow><h2>Ba lối vào hệ tri thức.</h2></div><Link className="inline-link" href="/knowledge">Xem toàn bộ 634 bản ghi →</Link></div><div className="feature-grid">{featured.map((item,i)=><article key={item.id}>{item.hero&&<img src={item.hero.src} alt={item.hero.alt||""}/>}<span>0{i+1} · {item.archetype.replaceAll("-"," ")}</span><h3>{item.title}</h3><p>{item.excerpt}</p><Link href={item.baseline_path}>Đọc bản ghi →</Link></article>)}</div></section>
  </PageShell>;
}

