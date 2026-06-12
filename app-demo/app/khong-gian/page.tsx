import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { SPACES } from "@/data/content";

export const metadata = { title: "Không gian Y Viện — Y Viện Toplink" };

export default function SpacePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        center
        eyebrow="Không gian Y Viện"
        title="Tĩnh · Thông · Dưỡng · Tỉnh"
        desc="Bốn tầng được thiết kế như một hành trình đưa cơ thể từ trạng thái căng thẳng về sự cân bằng."
      />

      <div className="mt-12 space-y-10">
        {SPACES.map((sp, i) => (
          <div key={sp.floor} className={`grid items-center gap-6 lg:grid-cols-2 ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
            <div className={`aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br ${sp.tone} shadow-lg [direction:ltr]`}>
              <div className="flex h-full items-center justify-center text-ivory/70">Ảnh / video không gian</div>
            </div>
            <div className="[direction:ltr]">
              <h2 className="font-display text-3xl font-semibold text-clay-700">{sp.floor}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{sp.desc}</p>
              <Link href="/dat-lich" className="mt-5 inline-block rounded-full border border-clay-700 px-5 py-2.5 text-sm font-semibold text-clay-700 transition-colors hover:bg-clay-700 hover:text-ivory">
                Đặt lịch trải nghiệm
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
