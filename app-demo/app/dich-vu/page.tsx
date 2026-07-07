import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ServiceFilterGrid from "@/components/ServiceFilterGrid";
import { SERVICES } from "@/data/content";

export const metadata = { title: "Dịch vụ" };

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        eyebrow="Dịch vụ"
        title="Các liệu trình tại Y Viện Toplink"
        desc="Từ chăm sóc nhẹ nhàng mỗi ngày đến liệu trình chuyên sâu cá nhân hóa Thân · Tâm · Trí. Lọc theo cấp độ để tìm liệu trình phù hợp."
      />

      {/* Grid có filter theo cấp độ (GSAP Flip) — 1 danh sách duy nhất, không lặp 3 khối */}
      <div className="mt-10">
        <ServiceFilterGrid />
      </div>

      {/* BẢNG GIÁ — anchor từ menu "Bảng giá" */}
      <section id="bang-gia" className="mt-20 scroll-mt-24">
        <SectionHeader
          center
          eyebrow="Bảng giá"
          title="Bảng giá liệu trình"
          desc="Giá khởi điểm từng liệu trình — chi phí chính xác được tư vấn theo thể trạng khi tiếp nhận."
        />
        <div className="mt-8 overflow-x-auto rounded-md border border-sand">
          <table className="w-full min-w-[560px] border-collapse bg-ivory text-left">
            <thead>
              <tr className="bg-cream text-sm uppercase tracking-wide text-ink-soft">
                <th scope="col" className="px-5 py-4 font-semibold">Liệu trình</th>
                <th scope="col" className="px-5 py-4 font-semibold">Thời lượng</th>
                <th scope="col" className="px-5 py-4 font-semibold">Giá từ</th>
                <th scope="col" className="px-5 py-4 font-semibold sr-only">Đặt lịch</th>
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((s) => (
                <tr key={s.slug} className="border-t border-sand transition-colors hover:bg-cream/60">
                  <td className="px-5 py-4">
                    <Link href={`/dich-vu/${s.slug}`} className="font-semibold text-crimson-600 hover:text-crimson-700">
                      {s.name}
                    </Link>
                    <span className="mt-0.5 block text-sm text-ink-mute">{s.levelLabel}</span>
                  </td>
                  <td className="px-5 py-4 text-ink-soft">{s.duration}</td>
                  <td className="px-5 py-4 font-semibold text-crimson-700">{s.priceFrom}</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href="/dat-lich"
                      className="inline-block rounded-sm border border-crimson-600 px-4 py-2 text-sm font-semibold text-crimson-600 transition-colors hover:bg-crimson-600 hover:text-ivory"
                    >
                      Đặt lịch
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-sm text-ink-mute">
          Giá có thể thay đổi theo chương trình ưu đãi tại cơ sở. Vui lòng liên hệ để được báo giá chính xác.
        </p>
      </section>
    </div>
  );
}
