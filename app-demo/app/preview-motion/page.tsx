import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import Reveal from "@/components/Reveal";

/**
 * TRANG PREVIEW CHUYỂN ĐỘNG (tạm) — để duyệt cảm giác motion trước khi áp vào trang chính.
 * Công thức: video hero (Ken Burns fallback) + reveal-on-scroll + hover tinh tế.
 */

// Ảnh dược liệu (Unsplash, hotlink ổn định). Lúc launch thay bằng ảnh thật của Y Viện.
const HERO_POSTER =
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&q=70";

const HERBS = [
  {
    name: "Đương Quy",
    desc: "Bổ huyết, điều kinh — nền tảng nhiều bài thuốc dưỡng sinh.",
    img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=900&q=70",
  },
  {
    name: "Gừng Sao",
    desc: "Ôn trung, tán hàn — làm ấm tỳ vị, hỗ trợ tuần hoàn.",
    img: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=900&q=70",
  },
  {
    name: "Hoa Cúc & Trà Dưỡng",
    desc: "Thanh nhiệt, an thần — dịu mắt, dễ ngủ, thư giãn tâm trí.",
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&q=70",
  },
];

export default function PreviewMotionPage() {
  return (
    <>
      {/* ── HERO: slot video + Ken Burns poster + lớp phủ đỏ sơn mài ── */}
      <section className="relative isolate overflow-hidden on-dark">
        <div className="absolute inset-0 -z-10">
          {/* Lớp nền ảnh Ken Burns (luôn hiển thị — fallback khi video chưa có) */}
          <div
            className="ken-burns absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_POSTER})` }}
          />
          {/* Slot VIDEO thật: thả file vào app-demo/public/media/hero-herbs.mp4 là tự phát.
              (Trình duyệt thật phát mp4 bình thường; nền ảnh trên là lớp dự phòng.) */}
          <video
            className="ken-burns absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_POSTER}
          >
            <source src="/toplink-demo-web/media/hero-herbs.mp4" type="video/mp4" />
          </video>
          {/* Lớp phủ phẳng giữ chữ luôn đọc rõ — đúng tông sơn mài, không gradient */}
          <div className="absolute inset-0 bg-crimson-800/78" />
        </div>

        <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-28 sm:px-6">
          <div className="max-w-2xl text-ivory">
            <span className="animate-fade-up inline-block border border-gold-500 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.22em] text-gold-300">
              Y Viện Dưỡng Thân · Tỉnh Thức
            </span>
            <h1 className="animate-fade-up delay-1 mt-6 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Dưỡng thân từ gốc,
              <span className="block">
                phục hồi từ <span className="emph">tâm</span>
              </span>
            </h1>
            <p className="animate-fade-up delay-2 mt-6 max-w-xl text-lg leading-relaxed text-cream/90 sm:text-xl">
              Không gian Đông y cao cấp — trị liệu thủ công, dưỡng liệu tự nhiên và
              công nghệ hiện đại, giúp cơ thể được lắng nghe và cân bằng.
            </p>
            <div className="animate-fade-up delay-3 mt-9 flex flex-wrap gap-3">
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
        </div>
      </section>

      {/* ── DẢI DƯỢC LIỆU: reveal khi cuộn + hover nhấc + ảnh zoom chậm ── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-700">
              Dược liệu dưỡng sinh
            </span>
            <h2 className="mt-3 font-display text-4xl text-crimson-600 sm:text-5xl">
              Mỗi vị thuốc, một <span className="emph">công năng</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
              Thảo dược được tuyển chọn và chuẩn hóa, đưa vào từng liệu trình theo thể trạng riêng.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HERBS.map((herb, i) => (
            <Reveal key={herb.name} delay={i * 130}>
              <article className="lift group h-full overflow-hidden rounded-md border border-sand bg-ivory">
                <div className="aspect-[4/3] overflow-hidden">
                  <div
                    className="zoom-media h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${herb.img})` }}
                    role="img"
                    aria-label={herb.name}
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 text-gold-600">
                    <Leaf className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                      Thảo dược
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl text-crimson-600">{herb.name}</h3>
                  <p className="mt-2 text-base text-ink-soft">{herb.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
