import Link from "next/link";
import { MessageCircle, ArrowRight, Leaf, HeartHandshake, Sparkles, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import NeedSelector from "@/components/NeedSelector";
import FaqAccordion from "@/components/FaqAccordion";
import { SERVICES, PROCESS_STEPS, SPACES, REVIEWS, CONTACT } from "@/data/content";

export default function HomePage() {
  const featured = SERVICES.filter((s) => ["goi-dau-duong-sinh", "tri-lieu-co-vai-gay", "lieu-trinh-than-tam-tri"].includes(s.slug));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-clay-800 via-clay-700 to-wood-700" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #d4af37 0, transparent 40%)" }} />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-up text-ivory">
            <span className="inline-block rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              Y Viện Dưỡng Thân – Tỉnh Thức
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Dưỡng Thân, Tỉnh Thức,
              <span className="block text-gold-400">Cân Bằng Từ Gốc</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              Không gian chăm sóc sức khỏe kết hợp Đông y dưỡng sinh, lý liệu trị liệu và công nghệ cao — giúp cơ
              thể được lắng nghe, phục hồi và cân bằng.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dat-lich"
                className="flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-wood-700 shadow-lg transition-colors hover:bg-gold-400"
              >
                Đặt lịch trị liệu <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={CONTACT.zalo}
                className="flex items-center gap-2 rounded-full border border-ivory/40 px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-ivory/10"
              >
                <MessageCircle className="h-4 w-4" /> Nhắn Zalo tư vấn
              </a>
            </div>
          </div>

          <div className="animate-fade-up delay-2 relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-gold-400/30 bg-gradient-to-b from-wood-500/40 to-clay-800/60 shadow-2xl">
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-cream/80">
                <Leaf className="h-14 w-14 text-gold-400" />
                <p className="font-display text-xl">Không gian Y Viện</p>
                <p className="text-sm text-cream/60">Ảnh thật sẽ được cập nhật tại đây</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEED SELECTOR */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <NeedSelector />
      </section>

      {/* PROBLEMS → SOLUTION */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeader
          center
          eyebrow="Vì sao chọn Toplink"
          title="Lắng nghe cơ thể, chăm sóc từ gốc"
          desc="Toplink không vội vàng. Mỗi buổi trị liệu bắt đầu từ việc hiểu cơ thể chị/anh đang cần gì."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Leaf, title: "Đông y dưỡng sinh", desc: "Thảo dược và liệu pháp truyền thống được chuẩn hóa." },
            { icon: HeartHandshake, title: "Cá nhân hóa", desc: "Liệu trình theo thể trạng và nhu cầu riêng." },
            { icon: Sparkles, title: "Công nghệ cao", desc: "Kết hợp thiết bị hiện đại nâng hiệu quả phục hồi." },
            { icon: ShieldCheck, title: "An toàn, minh bạch", desc: "Ngôn ngữ trung thực, không cam kết quá lời." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-sand bg-white/60 p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-clay-700/10 text-clay-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-clay-700">{title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader eyebrow="Dịch vụ nổi bật" title="Liệu trình được yêu thích" />
          <Link href="/dich-vu" className="flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-500">
            Xem tất cả dịch vụ <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-cream/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader center eyebrow="Quy trình trị liệu" title="8 bước chăm sóc bài bản" desc="Mỗi hành trình tại Y Viện đều có quy trình rõ ràng, từ tiếp nhận đến hẹn lịch chăm sóc tiếp theo." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.slice(0, 4).map((step, i) => (
              <div key={i} className="rounded-2xl border border-sand bg-white/70 p-5">
                <span className="font-display text-2xl font-semibold text-gold-500">0{i + 1}</span>
                <h4 className="mt-2 font-display text-base font-semibold text-clay-700">{step.title}</h4>
                <p className="mt-1 text-sm text-ink-soft">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/quy-trinh-tri-lieu" className="inline-flex items-center gap-1.5 text-sm font-semibold text-clay-700 hover:text-clay-800">
              Xem đầy đủ quy trình <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SPACE */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader center eyebrow="Không gian Y Viện" title="Bốn tầng – một hành trình" desc="Tĩnh · Thông · Dưỡng · Tỉnh — mỗi tầng là một trạng thái cơ thể được chăm sóc." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPACES.map((sp) => (
            <div key={sp.floor} className={`overflow-hidden rounded-2xl bg-gradient-to-br ${sp.tone} p-6 text-ivory shadow-md`}>
              <h3 className="font-display text-xl font-semibold">{sp.floor}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/85">{sp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-cream/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader center eyebrow="Cảm nhận khách hàng" title="Những chia sẻ thật" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="rounded-2xl border border-sand bg-white/70 p-6 shadow-sm">
                <div className="text-gold-500">★★★★★</div>
                <blockquote className="mt-3 text-sm leading-relaxed text-ink">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-clay-700">{r.name}</span>
                  <span className="block text-xs text-ink-soft">{r.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader center eyebrow="Câu hỏi thường gặp" title="Có thể chị/anh đang thắc mắc" />
        <div className="mt-10">
          <FaqAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-clay-700 to-wood-700 px-6 py-14 text-center text-ivory sm:px-12">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Hôm nay, hãy để cơ thể được nghỉ ngơi</h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/85">Đặt lịch trải nghiệm tại Y Viện Toplink, hoặc nhắn Zalo để được tư vấn liệu trình phù hợp.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/dat-lich" className="rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-wood-700 transition-colors hover:bg-gold-400">
              Đặt lịch trị liệu
            </Link>
            <a href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`} className="rounded-full border border-ivory/40 px-7 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-ivory/10">
              Gọi ngay {CONTACT.hotline}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
