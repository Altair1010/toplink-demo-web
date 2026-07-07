import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import HealingProcessMotion from "@/components/HealingProcessMotion";

export const metadata = { title: "Quy trình trị liệu" };

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        center
        eyebrow="Quy trình trị liệu"
        title="Một hành trình chăm sóc bài bản"
        desc="Y Viện làm việc có quy trình, minh bạch và tôn trọng cơ thể của chị/anh ở mỗi bước."
      />

      {/* 4 bước motion — di cư từ homepage (đại cách tân) */}
      <div className="mt-12">
        <HealingProcessMotion />
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/dat-lich"
          className="inline-block rounded-sm bg-gold-500 px-7 py-3.5 text-base font-semibold text-wood-700 transition-colors hover:bg-gold-400"
        >
          Bắt đầu hành trình của chị/anh
        </Link>
      </div>
    </div>
  );
}
