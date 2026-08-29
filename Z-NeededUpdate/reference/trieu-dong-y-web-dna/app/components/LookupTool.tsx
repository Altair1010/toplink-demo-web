"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Item = { title: string; excerpt: string; baseline_path: string; archetype: string };

const groups = [
  { id: "pain", label: "Đau & vận động", terms: ["đau", "khớp", "vai", "lưng", "cổ"] },
  { id: "sleep", label: "Giấc ngủ & thần kinh", terms: ["mất ngủ", "thần kinh", "đầu"] },
  { id: "digest", label: "Tiêu hóa", terms: ["dạ dày", "tiêu hóa", "bụng"] },
  { id: "energy", label: "Khí huyết & thể trạng", terms: ["khí huyết", "suy nhược", "mệt"] },
];

export default function LookupTool({ items }: { items: Item[] }) {
  const [selected, setSelected] = useState("pain");
  const group = groups.find((x) => x.id === selected) ?? groups[0];
  const results = useMemo(() => items.filter((item) => group.terms.some((term) => `${item.title} ${item.excerpt}`.toLocaleLowerCase("vi").includes(term))).slice(0, 8), [items, group]);
  return <div className="lookup-panel">
    <div className="lookup-tabs" role="tablist" aria-label="Nhóm nhu cầu">
      {groups.map((item) => <button role="tab" aria-selected={selected === item.id} onClick={() => setSelected(item.id)} key={item.id}>{item.label}</button>)}
    </div>
    <div className="lookup-results">
      <div><p className="eyebrow"><span />Gợi ý đọc tiếp</p><h2>{group.label}</h2><p>Các kết quả dưới đây là liên kết kiến thức theo từ khóa, không phải chẩn đoán hay phác đồ cá nhân.</p></div>
      <ol>{results.map((item) => <li key={item.baseline_path}><Link href={item.baseline_path}><span>{item.archetype.replaceAll("-", " ")}</span><strong>{item.title}</strong><i>→</i></Link></li>)}</ol>
    </div>
  </div>;
}

