import Link from "next/link";
import { PageShell } from "./Shell";

type RecordItem = { source_url:string; source_path:string; title:string; h1:string[]; description:string; body_text:string; headings:{level:string;text:string}[]; archetype:string; hero:{src:string;alt:string;width:number;height:number}|null; provenance:{captured_at:string;method:string;status:string;capture_sha256:string} };

export default function BaselineArticle({ item }: { item: RecordItem }) {
  const paragraphs = item.body_text.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ỹ])/).filter((x) => x.length > 35).slice(0, 28);
  return <PageShell baseline>
    <article className="source-article">
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/baseline">Baseline</Link><span>/</span><span>{item.archetype.replaceAll("-", " ")}</span></nav>
      <header className="source-hero">
        <div><p className="source-type">{item.archetype.replaceAll("-", " ")}</p><h1>{item.h1[0] || item.title}</h1><p>{item.description}</p></div>
        {item.hero?.src && <img src={item.hero.src} alt={item.hero.alt || ""} />}
      </header>
      <div className="source-layout">
        <aside><strong>Mục lục nguồn</strong>{item.headings.slice(0, 12).map((h, i) => <a href={`#part-${i}`} key={`${h.text}-${i}`}>{h.text}</a>)}</aside>
        <div className="source-prose">
          {paragraphs.length ? paragraphs.map((text, i) => <p id={`part-${i}`} key={i}>{text}</p>) : <p>{item.body_text || "Trang nguồn không có phần văn bản được trích xuất."}</p>}
          <section className="provenance"><span>Source trace</span><p>Captured bằng {item.provenance.method}; trạng thái {item.provenance.status}.</p><a href={item.source_url}>Mở nguồn gốc ↗</a><code>{item.provenance.capture_sha256.slice(0, 20)}…</code></section>
        </div>
      </div>
    </article>
  </PageShell>;
}

