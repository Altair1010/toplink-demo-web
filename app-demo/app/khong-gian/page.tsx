import Link from "next/link";
import BrandVisual from "@/components/BrandVisual";
import SectionHeader from "@/components/SectionHeader";
import { ConvergeItem, LeafField } from "@/components/ConvergeOnScroll";
import { SPACES } from "@/data/content";

export const metadata = {
  title: "Không gian Y Viện · Y Viện Toplink",
  description: "Bốn tầng Tĩnh · Thông · Dưỡng · Tỉnh, hành trình đưa cơ thể từ căng thẳng về cân bằng tại Y Viện Toplink.",
};

export default function SpacePage() {
  return (
    <div className="relative overflow-hidden">
      <LeafField />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeader
          center
          eyebrow="Không gian Y Viện"
          title="Tĩnh · Thông · Dưỡng · Tỉnh"
          desc="Bốn tầng được thiết kế như một hành trình đưa cơ thể từ trạng thái căng thẳng về sự cân bằng. Cuộn để các khối trôi về trung tâm."
        />

        <div className="mt-16 space-y-20">
          {SPACES.map((sp, i) => {
            const imgFromLeft = i % 2 === 0;
            return (
              <div key={sp.floor} className="grid items-center gap-8 lg:grid-cols-2">
                <ConvergeItem
                  from={imgFromLeft ? "left" : "right"}
                  dist={260 - i * 20}
                  className={`aspect-[4/3] overflow-hidden frame-gold ${imgFromLeft ? "" : "lg:order-2"}`}
                >
                  <BrandVisual src={sp.image} label={sp.floor} />
                </ConvergeItem>
                <ConvergeItem
                  from={imgFromLeft ? "right" : "left"}
                  dist={200 - i * 16}
                  className={imgFromLeft ? "" : "lg:order-1"}
                >
                  <h2 className="text-3xl font-black text-crimson-600 sm:text-4xl">{sp.floor}</h2>
                  <div className="gold-rule mt-4 w-20" />
                  <p className="mt-4 text-lg leading-relaxed text-ink-soft">{sp.desc}</p>
                  <Link
                    href="/dat-lich"
                    className="mt-6 inline-block rounded-sm border border-crimson-600 px-7 py-3.5 text-base font-semibold uppercase tracking-wide text-crimson-600 transition-colors hover:bg-crimson-600 hover:text-ivory"
                  >
                    Đặt lịch trải nghiệm
                  </Link>
                </ConvergeItem>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
