import content from "@/data/content-index-lite.json";
import KnowledgeSearch from "../components/KnowledgeSearch";
import { Eyebrow, PageShell } from "../components/Shell";

export default function KnowledgePage(){return <PageShell><section className="page-hero compact"><Eyebrow>634 bản ghi · 21 archetype</Eyebrow><h1>Tàng thư<br/><em>Đông Y.</em></h1><p>Tìm trong corpus đã capture của trieudongy.vn. Kết quả mở sang baseline record để bạn đối chiếu nội dung và provenance.</p></section><KnowledgeSearch items={content}/></PageShell>}

