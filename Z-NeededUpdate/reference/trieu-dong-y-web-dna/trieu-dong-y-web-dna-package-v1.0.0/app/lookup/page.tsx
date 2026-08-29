import content from "@/data/content-index-lite.json";
import LookupTool from "../components/LookupTool";
import { Eyebrow, PageShell } from "../components/Shell";

export default function LookupPage(){return <PageShell><section className="page-hero lookup-hero"><Eyebrow>Knowledge navigation · Không chẩn đoán</Eyebrow><h1>Từ nhu cầu<br/><em>đến kiến thức.</em></h1><p>Chọn một nhóm vấn đề để khám phá các bản ghi liên quan. Kết quả không phải chỉ định huyệt, bài thuốc hay phương pháp điều trị cá nhân.</p></section><section className="lookup-wrap"><LookupTool items={content}/></section></PageShell>}

