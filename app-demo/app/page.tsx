import Link from "next/link";
import Img from "@/components/Img";
import { MessageCircle, ArrowRight, Leaf, HeartHandshake, Sparkles, ShieldCheck, Flame, Droplets, Hand, Snowflake } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import NeedSelector from "@/components/NeedSelector";
import FaqAccordion from "@/components/FaqAccordion";
import HealingProcessMotion from "@/components/HealingProcessMotion";
import YVienSpaceExperience from "@/components/YVienSpaceExperience";
import ServiceFilterGrid from "@/components/ServiceFilterGrid";
import ReviewWall from "@/components/ReviewWall";
import ScrollConvergeScene from "@/components/motion/ScrollConvergeScene";
import ConvergeBlock from "@/components/motion/ConvergeBlock";
import { TECHNOLOGIES, CONTACT, STATS, ABOUT_BLOCKS, HERO_IMAGE } from "@/data/content";

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
  return (
    <>
      {/* ===== 1 · HERO — ảnh người thật + CTA Zalo nổi bật ===== */}
      <section className="on-dark bg-crimson-800">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="animate-fade-up text-ivory">
            <span className="inline-block border border-gold-500 px-4 py-1.5 text-base font-semibold uppercase tracking-[0.18em] text-gold-300">
              Y Viện Dưỡng Thân · Tỉnh Thức
            </span>
            <h1 className="mt-6 text-balance font-display text-4xl leading-[1.1] sm:text-5xl">
              Dưỡng thân bằng Đông y,
              <span className="block">tìm lại sự <span className="emph">nhẹ nhõm</span></span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl">
              Trị liệu dưỡng sinh, thảo dược và không gian tĩnh tại, để anh/chị được chăm sóc đúng cách,
              an toàn và thư thái hơn.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={CONTACT.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-sm bg-gold-500 px-7 py-3.5 text-base font-semibold text-wood-700 transition-colors hover:bg-gold-400"
              >
                <MessageCircle className="h-5 w-5" /> Inbox Zalo để được tư vấn
              </a>
              <Link
                href="/khong-gian"
                className="flex items-center gap-2 rounded-sm border border-gold-500 px-7 py-3.5 text-base font-semibold text-gold-300 transition-colors hover:bg-gold-500 hover:text-wood-700"
              >
                Khám phá không gian <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="animate-fade-up delay-2">
            <div className="relative aspect-[4/5] overflow-hidden frame-gold bg-crimson-700">
              {/* TODO: thay HERO_IMAGE bằng ảnh thật KTV/khách trải nghiệm của Y Viện */}
              <Img
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-crimson-900/70 via-crimson-900/10 to-transparent" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-8 text-center text-ivory">
                <span className="seal flex h-14 w-14 items-center justify-center text-2xl text-gold-300">Y</span>
                <p className="text-2xl text-ivory">Được chăm sóc bởi người thật</p>
                <p className="text-sm uppercase tracking-[0.2em] text-gold-300">Kỹ thuật viên · Chuyên viên</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE khẩu hiệu */}
      <Marquee items={SLOGANS} className="on-dark bg-crimson-700 py-4 text-gold-300" />

      {/* ===== 2 · VỀ Y VIỆN — sticky converge scene: khối trượt & HỘI TỤ về giữa
           theo nhịp cuộn (cơ chế học từ opening brand.dropbox.com) ===== */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <SectionHeader center eyebrow="Về Y Viện" title="Chăm sóc bắt đầu từ lắng nghe" emphasis="lắng nghe" />
      </section>
      <ScrollConvergeScene className="mx-auto max-w-6xl px-4 sm:px-6" stageClassName="py-12">
        <div className="mx-auto w-full max-w-4xl space-y-8 sm:space-y-10">
          {ABOUT_BLOCKS.map((b, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={i}
                className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,240px)_1fr]"
              >
                <ConvergeBlock from={flip ? "right" : "left"} index={i} className={flip ? "lg:order-2" : ""}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md frame-gold bg-cream">
                    {/* TODO: thay bằng ảnh người thật của Y Viện */}
                    <Img src={b.image} alt={b.alt} fill sizes="(max-width: 1024px) 240px, 100vw" className="object-cover" />
                  </div>
                </ConvergeBlock>
                <ConvergeBlock from={flip ? "left" : "right"} index={i}>
                  <p className="font-display text-3xl leading-tight text-crimson-600 sm:text-4xl">{b.lead}</p>
                  <p className="mt-3 text-xl leading-relaxed text-ink-soft">{b.body}</p>
                </ConvergeBlock>
              </div>
            );
          })}
        </div>
      </ScrollConvergeScene>

      {/* NEED SELECTOR */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <NeedSelector />
      </section>

      {/* VÌ SAO CHỌN TOPLINK */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeader
          center
          eyebrow="Vì sao chọn Toplink"
          title="Lắng nghe cơ thể, chăm sóc từ gốc"
          emphasis="từ gốc"
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

      {/* SỐ LIỆU / NIỀM TIN */}
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

      {/* ===== 3 · KHÔNG GIAN — 4 tầng (Breath & Flow: sticky-pin spatial journey,
           nguyên lý chắt lọc từ MyWebLab "ExpandingCards / DNA Digitale") ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader center eyebrow="Không gian Y Viện" title="Bốn tầng · một hành trình" emphasis="một hành trình" desc="Cuộn để đi qua từng tầng — mỗi tầng là một trạng thái cơ thể được chăm sóc." />
        <YVienSpaceExperience />
      </section>

      {/* ===== 4 · QUY TRÌNH TRỊ LIỆU — 4 bước (kỹ thuật MyWebLab Il Metodo) ===== */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader center eyebrow="Quy trình trị liệu" title="Bốn bước chăm sóc bài bản" emphasis="bài bản" desc="Một hành trình rõ ràng, tôn trọng cơ thể anh/chị ở mỗi bước." />
          <HealingProcessMotion />
          <div className="mt-8 text-center">
            <Link href="/quy-trinh-tri-lieu" className="inline-flex items-center gap-1.5 text-base font-semibold text-crimson-600 hover:text-crimson-700">
              Xem chi tiết quy trình <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CÔNG NGHỆ & THIẾT BỊ */}
      <section className="on-dark bg-wood-700 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            center
            dark
            eyebrow="Công nghệ & thiết bị"
            title="Đông y kết hợp công nghệ hiện đại"
            emphasis="công nghệ"
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

      {/* ===== 5 · SẢN PHẨM & DỊCH VỤ — card grid có filter (kỹ thuật Autodesk) ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader center eyebrow="Sản phẩm & Dịch vụ" title="Liệu trình theo nhu cầu của anh/chị" emphasis="nhu cầu" desc="Chọn nhóm phù hợp để xem nhanh các liệu trình tương ứng." />
        <div className="mt-10">
          <ServiceFilterGrid />
        </div>
      </section>

      {/* ===== 6 · CẢM NHẬN KHÁCH HÀNG ===== */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader center eyebrow="Cảm nhận khách hàng" title="Những chia sẻ thật" emphasis="thật" desc="Ảnh, video và trích cảm nhận — sẽ được thay bằng dữ liệu thật của khách hàng." />
          <ReviewWall />
        </div>
      </section>

      {/* ===== 7 · FAQ ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader center eyebrow="Câu hỏi thường gặp" title="Có thể anh/chị đang thắc mắc" emphasis="thắc mắc" />
        <div className="mt-10">
          <FaqAccordion />
        </div>
      </section>

      {/* ===== 8 · CTA CUỐI TRANG ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="on-dark frame-gold bg-crimson-600 px-6 py-14 text-center text-ivory sm:px-12">
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
            Bạn đã chăm sóc mọi người cả ngày rồi, hãy dành 90 phút để <span className="emph">yêu thương chính mình</span> nhé.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={CONTACT.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-sm bg-gold-500 px-7 py-3.5 text-base font-semibold text-wood-700 transition-colors hover:bg-gold-400"
            >
              <MessageCircle className="h-5 w-5" /> Inbox Zalo để được tư vấn
            </a>
            <Link
              href="/dich-vu"
              className="flex items-center gap-2 rounded-sm border border-gold-500 px-7 py-3.5 text-base font-semibold text-gold-300 transition-colors hover:bg-gold-500 hover:text-wood-700"
            >
              Xem liệu trình phù hợp <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
