import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES, LEVELS } from "@/data/content";

export const metadata = { title: "Dịch vụ — Y Viện Toplink" };

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        eyebrow="Dịch vụ"
        title="Các liệu trình tại Y Viện Toplink"
        desc="Từ chăm sóc nhẹ nhàng mỗi ngày đến liệu trình chuyên sâu cá nhân hóa Thân – Tâm – Trí."
      />

      {LEVELS.map((level) => {
        const items = SERVICES.filter((s) => s.level === level.key);
        return (
          <section key={level.key} className="mt-12">
            <div className="flex items-baseline gap-3">
              <h2 className="font-display text-3xl font-black text-crimson-600">{level.label}</h2>
              <span className="text-base text-ink-soft">{level.desc}</span>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
