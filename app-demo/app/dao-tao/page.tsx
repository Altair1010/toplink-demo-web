import Link from "next/link";
import { GraduationCap, Check, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import BrandVisual from "@/components/BrandVisual";
import { TRAINING, CONTACT } from "@/data/content";

export const metadata = {
  title: "Đào tạo KTV — Y Viện Toplink",
  description:
    "Đào tạo kỹ thuật viên trị liệu Đông y dưỡng sinh bài bản tại Y Viện Toplink: lộ trình từ nền tảng đến thực hành và chứng nhận.",
};

export default function TrainingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        eyebrow="Học viện Toplink"
        title="Đào tạo kỹ thuật viên dưỡng sinh"
        emphasis="dưỡng sinh"
        desc={TRAINING.intro}
      />

      <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden frame-gold">
          <BrandVisual variant="wood" label="Học viện đào tạo" />
        </div>
        <div className="rounded-md border border-sand bg-cream p-8 shadow-sm">
          <GraduationCap className="h-9 w-9 text-gold-600" />
          <h2 className="mt-4 font-display text-3xl font-black text-crimson-600">Quyền lợi học viên</h2>
          <ul className="mt-5 space-y-3">
            {TRAINING.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-lg text-ink">
                <Check className="mt-1 h-5 w-5 shrink-0 text-jade-500" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="mt-14 font-display text-3xl font-black text-crimson-600">Lộ trình đào tạo</h2>
      <div className="mt-6 grid gap-px overflow-hidden border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
        {TRAINING.roadmap.map((step, i) => (
          <div key={step.title} className="bg-ivory p-7">
            <span className="font-display text-4xl text-gold-600">0{i + 1}</span>
            <h3 className="mt-2 font-display text-xl text-crimson-600">{step.title}</h3>
            <p className="mt-1 text-base text-ink-soft">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="on-dark mt-12 flex flex-col items-center gap-4 frame-gold bg-crimson-800 p-8 text-center text-ivory sm:p-12">
        <h2 className="font-display text-4xl text-gold-200">Quan tâm khóa <span className="emph emph-light">đào tạo</span>?</h2>
        <p className="max-w-xl text-lg text-cream/85">Để lại thông tin hoặc nhắn Zalo, đội ngũ Toplink sẽ tư vấn lộ trình và lịch khai giảng phù hợp.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/dat-lich" className="flex items-center gap-2 rounded-sm bg-gold-500 px-7 py-3.5 text-base font-semibold text-wood-700 hover:bg-gold-400">
            Đăng ký tư vấn <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={CONTACT.zalo} className="rounded-sm border border-gold-500 px-7 py-3.5 text-base font-semibold text-gold-300 transition-colors hover:bg-gold-500 hover:text-wood-700">
            Nhắn Zalo
          </a>
        </div>
      </div>
    </div>
  );
}
