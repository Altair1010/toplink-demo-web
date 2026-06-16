import Link from "next/link";
import Img from "@/components/Img";
import { MessageCircle, ArrowRight, Leaf, HeartHandshake, Sparkles, ShieldCheck, Flame, Droplets, Hand, Snowflake } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import BookCard from "@/components/BookCard";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import NeedSelector from "@/components/NeedSelector";
import FaqAccordion from "@/components/FaqAccordion";
import { SERVICES, PROCESS_STEPS, SPACES, REVIEWS, TECHNOLOGIES, CONTACT, STATS } from "@/data/content";

const SLOGANS = [
  "Dưỡng thân từ gốc",
  "Phục hồi từ tâm",
  "Đông y dưỡng sinh",
  "Khí huyết điều hòa",
  "Thân · Tâm · Trí",
  "Lắng nghe cơ thể",
];

const TECH_ICONS = [Flame, Droplets, Hand, Snowflake];

export default function HomePage() {
  const featured = SERVICES.filter((s) => ["goi-dau-duong-sinh", "tri-lieu-co-vai-gay", "lieu-trinh-than-tam-tri"].includes(s.slug));

  return (
    <>
      {/* HERO, khối đỏ sơn mài phẳng, viền vàng triện, chữ editorial */}
      <section className="on-dark bg-crimson-800">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="animate-fade-up text-ivory">
            <span className="inline-block border border-gold-500 px-4 py-1.5 text-base font-semibold uppercase tracking-[0.18em] text-gold-300">
              Y Viện Dưỡng Thân · Tỉnh Thức
            </span>
            <h1 className="mt-6 text-balance font-display text-4xl leading-[1.1] sm:text-5xl">
              Dưỡng thân từ gốc,
              <span className="block">phục hồi từ <span className="emph">tâm</span></span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl">
              Không gian chăm sóc sức khỏe Đông y cao cấp, kết hợp trị liệu thủ công, dưỡng liệu tự nhiên và
              công nghệ hiện đại, giúp cơ thể được lắng nghe và cân bằng.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/dat-lich"
                className="flex items-center gap-2 rounded-sm bg-gold-500 px-7 py-3.5 text-base font-semibold text-wood-700 transition-colors hover:bg-gold-400"
              >
                Đặt lịch tư vấn <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dich-vu"
                className="flex items-center gap-2 rounded-sm border border-gold-500 px-7 py-3.5 text-base font-semibold text-gold-300 transition-colors hover:bg-gold-500 hover:text-wood-700"
              >
                Xem liệu trình
              </Link>
            </div>
          </div>

          <div className="animate-fade-up delay-2">
            <div className="relative aspect-[4/5] overflow-hidden frame-gold bg-crimson-700">
              <Img
                src="/images/spaces/tang-1-tinh.jpg"
                alt="Không gian Y Viện Toplink"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-crimson-900/70 via-crimson-900/10 to-transparent" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-8 text-center text-ivory">
                <span className="seal flex h-14 w-14 items-center justify-center text-2xl text-gold-300">Y</span>
                <p className="text-2xl text-ivory">Không gian Y Viện</p>
                <p className="text-sm uppercase tracking-[0.2em] text-gold-300">Dưỡng thân · Tỉnh thức</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE, dải khẩu hiệu chạy ngang (kỹ thuật Vibrasonic) */}
      <Marquee items={SLOGANS} className="on-dark bg-crimson-700 py-4 text-gold-300" />

      {/* NEED SELECTOR */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <NeedSelector />
      </section>

      {/* VÌ SAO CHỌN TOPLINK */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeader
          center
          eyebrow="Vì sao chọn Toplink"
          title="Lắng nghe cơ thể, chăm sóc từ gốc"
          emphasis="từ gốc"
          desc="Toplink không vội vàng. Mỗi buổi trị liệu bắt đầu từ việc hiểu cơ thể chị/anh đang cần gì."
        />
        <div className="mt-10 grid gap-px overflow-hidden border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Leaf, title: "Đông y dưỡng sinh", desc: "Thảo dược và liệu pháp truyền thống được chuẩn hóa." },
            { icon: HeartHandshake, title: "Cá nhân hóa", desc: "Liệu trình theo thể trạng và nhu cầu riêng." },
            { icon: Sparkles, title: "Công nghệ cao", desc: "Kết hợp thiết bị hiện đại nâng hiệu quả phục hồi." },
            { icon: ShieldCheck, title: "An toàn, minh bạch", desc: "Ngôn ngữ trung thực, không cam kết quá lời." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} from={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="bg-ivory">
              <div className="h-full p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-crimson-600 text-gold-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-crimson-600">{title}</h3>
                <p className="mt-2 text-base text-ink-soft">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SỐ LIỆU / NIỀM TIN, dải cam kết chất lượng (không phóng đại) */}
      <section className="on-dark bg-crimson-800 py-12">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden border border-gold-700 bg-gold-700 px-0 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-crimson-800 px-6 py-8 text-center">
              <div className="font-display text-4xl font-bold text-gold-300 sm:text-5xl">{s.value}</div>
              <p className="mt-2 text-base leading-snug text-cream/85">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader eyebrow="Dịch vụ nổi bật" title="Liệu trình được yêu thích" emphasis="yêu thích" />
          <Link href="/dich-vu" className="flex items-center gap-1.5 text-base font-semibold text-gold-700 hover:text-crimson-600">
            Xem tất cả dịch vụ <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <Reveal key={s.slug} from="up" delay={i * 120}>
              <BookCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* KHÔNG GIAN, khối trôi vào khi cuộn (kỹ thuật Dropbox) */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader center eyebrow="Không gian Y Viện" title="Bốn tầng · một hành trình" emphasis="một hành trình" desc="Tĩnh · Thông · Dưỡng · Tỉnh, mỗi tầng là một trạng thái cơ thể được chăm sóc." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPACES.map((sp, i) => (
            <Reveal key={sp.floor} from="up" delay={i * 120}>
              <div className="lift group h-full overflow-hidden rounded-md border border-gold-700">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Img src={sp.image} alt={sp.floor} fill sizes="(max-width: 768px) 100vw, 25vw" className="zoom-media object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-crimson-900/85 via-crimson-900/20 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                    <h3 className="text-2xl text-gold-200">{sp.floor}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ivory/85">{sp.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CÔNG NGHỆ & THIẾT BỊ, khối nâu gỗ phẳng */}
      <section className="on-dark bg-wood-700 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            center
            dark
            eyebrow="Công nghệ & thiết bị"
            title="Đông y kết hợp công nghệ hiện đại"
            emphasis="công nghệ"
            desc="Không nói chung chung. Mỗi công nghệ được giải thích theo tác động lên cơ thể và lợi ích cảm nhận."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {TECHNOLOGIES.map((t, i) => {
              const Icon = TECH_ICONS[i % TECH_ICONS.length];
              return (
                <div key={t.name} className="border border-gold-700 bg-wood-500 p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500 text-gold-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-2xl text-gold-200">{t.name}</h3>
                  </div>
                  <dl className="mt-5 space-y-2.5 text-base text-cream/85">
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-semibold text-gold-300">Tác động:</dt>
                      <dd>{t.effect}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-semibold text-gold-300">Lợi ích:</dt>
                      <dd>{t.benefit}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-semibold text-gold-300">Phù hợp:</dt>
                      <dd>{t.forWhom}</dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader center eyebrow="Quy trình trị liệu" title="8 bước chăm sóc bài bản" emphasis="bài bản" desc="Mỗi hành trình tại Y Viện đều có quy trình rõ ràng, từ tiếp nhận đến hẹn lịch chăm sóc tiếp theo." />
          <div className="mt-10 grid gap-px overflow-hidden border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.slice(0, 4).map((step, i) => (
              <div key={i} className="bg-ivory p-7">
                <span className="font-display text-4xl text-gold-600">0{i + 1}</span>
                <h4 className="mt-2 font-display text-xl text-crimson-600">{step.title}</h4>
                <p className="mt-1 text-base text-ink-soft">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/quy-trinh-tri-lieu" className="inline-flex items-center gap-1.5 text-base font-semibold text-crimson-600 hover:text-crimson-700">
              Xem đầy đủ quy trình <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader center eyebrow="Cảm nhận khách hàng" title="Những chia sẻ thật" emphasis="thật" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="border border-sand bg-ivory p-8">
                <div className="text-gold-600">★★★★★</div>
                <blockquote className="mt-3 font-display text-2xl italic leading-snug text-ink">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-base">
                  <span className="font-semibold text-crimson-600">{r.name}</span>
                  <span className="block text-sm text-ink-soft">{r.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader center eyebrow="Câu hỏi thường gặp" title="Có thể chị/anh đang thắc mắc" emphasis="thắc mắc" />
        <div className="mt-10">
          <FaqAccordion />
        </div>
      </section>

      {/* CTA, khối đỏ dược liệu phẳng */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="on-dark frame-gold bg-crimson-600 px-6 py-14 text-center text-ivory sm:px-12">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            Hôm nay, hãy để cơ thể được <span className="emph">nghỉ ngơi</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-cream/85">Đặt lịch trải nghiệm tại Y Viện Toplink, hoặc nhắn Zalo để được tư vấn liệu trình phù hợp.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/dat-lich" className="rounded-sm bg-gold-500 px-7 py-3.5 text-base font-semibold text-wood-700 transition-colors hover:bg-gold-400">
              Đặt lịch trị liệu
            </Link>
            <a href={CONTACT.zalo} className="flex items-center gap-2 rounded-sm border border-gold-500 px-7 py-3.5 text-base font-semibold text-gold-300 transition-colors hover:bg-gold-500 hover:text-wood-700">
              <MessageCircle className="h-4 w-4" /> Nhắn Zalo tư vấn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
