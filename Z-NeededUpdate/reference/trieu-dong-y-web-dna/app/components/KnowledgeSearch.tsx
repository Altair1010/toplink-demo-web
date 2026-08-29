"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Item = { id: string; title: string; excerpt: string; archetype: string; baseline_path: string; hero: { src: string; alt: string } | null };

export default function KnowledgeSearch({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const kinds = useMemo(() => ["all", ...Array.from(new Set(items.map((x) => x.archetype))).sort()], [items]);
  const results = useMemo(() => {
    const q = query.toLocaleLowerCase("vi").trim();
    return items.filter((item) => (kind === "all" || item.archetype === kind) && (!q || `${item.title} ${item.excerpt}`.toLocaleLowerCase("vi").includes(q))).slice(0, 36);
  }, [items, query, kind]);

  return (
    <section className="search-workspace" aria-label="Tra cứu tàng thư">
      <div className="search-controls">
        <label><span>Từ khóa</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ví dụ: huyệt, mất ngủ, khí huyết…" /></label>
        <label><span>Loại nội dung</span><select value={kind} onChange={(event) => setKind(event.target.value)}>{kinds.map((value) => <option key={value} value={value}>{value === "all" ? "Tất cả chuyên mục" : value.replaceAll("-", " ")}</option>)}</select></label>
      </div>
      <p className="result-count"><strong>{results.length}</strong> kết quả đang hiển thị · tìm trong {items.length} bản ghi</p>
      <div className="knowledge-grid">
        {results.map((item) => <article className="knowledge-card" key={item.id}>
          <div className="card-index">{item.archetype.replaceAll("-", " ")}</div>
          <h2><Link href={item.baseline_path}>{item.title}</Link></h2>
          <p>{item.excerpt || "Bản ghi nguồn đã được capture và gắn provenance."}</p>
          <Link className="read-link" href={item.baseline_path}>Mở bản ghi <span>→</span></Link>
        </article>)}
      </div>
    </section>
  );
}

