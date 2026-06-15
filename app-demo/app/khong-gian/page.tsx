import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import BrandVisual from "@/components/BrandVisual";
import { SPACES } from "@/data/content";

export const metadata = {
  title: "Không gian Y Viện — Y Viện Toplink",
  description: "Bốn tầng Tĩnh · Thông · Dưỡng · Tỉnh — hành trình đưa cơ thể từ căng thẳng về cân bằng tại Y Viện Toplink.",
};

const SPACE_VARIANTS = ["crimson", "wood", "jade", "crimson"] as const;

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
            <div className="aspect-[4/3] overflow-hidden frame-gold [direction:ltr]">
              <BrandVisual variant={SPACE_VARIANTS[i % SPACE_VARIANTS.length]} label={sp.floor} />
            </div>
            <div className="[direction:ltr]">
              <h2 className="font-display text-3xl font-black text-crimson-600 sm:text-4xl">{sp.floor}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">{sp.desc}</p>
              <Link href="/dat-lich" className="mt-5 inline-block rounded-sm border border-crimson-600 px-7 py-3.5 text-base font-semibold text-crimson-600 transition-colors hover:bg-crimson-600 hover:text-ivory">
                Đặt lịch trải nghiệm
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
