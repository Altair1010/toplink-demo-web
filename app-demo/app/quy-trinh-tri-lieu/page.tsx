import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { PROCESS_STEPS } from "@/data/content";

export const metadata = { title: "Quy trình trị liệu — Y Viện Toplink" };

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <SectionHeader
        center
        eyebrow="Quy trình trị liệu"
        title="Một hành trình chăm sóc bài bản"
        desc="Toplink làm việc có quy trình, minh bạch và tôn trọng cơ thể của chị/anh ở mỗi bước."
      />

      <ol className="mt-12 space-y-2">
        {PROCESS_STEPS.map((step, i) => (
          <li key={i} className="relative flex gap-6 pb-8 last:pb-0">
            {i < PROCESS_STEPS.length - 1 && (
              <span className="absolute left-[1.4rem] top-12 h-[calc(100%-2rem)] w-px bg-sand" aria-hidden />
            )}
            <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-crimson-600 font-display text-3xl font-black text-gold-500">
              {i + 1}
            </span>
            <div className="rounded-md border border-sand bg-white/60 p-8 shadow-sm">
              <h3 className="font-display text-xl font-black text-crimson-600">{step.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-ink-soft">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 text-center">
        <Link href="/dat-lich" className="inline-block rounded-sm bg-gold-500 px-7 py-3.5 text-base font-semibold text-wood-700 transition-colors hover:bg-gold-400">
          Bắt đầu hành trình của chị/anh
        </Link>
      </div>
    </div>
  );
}
