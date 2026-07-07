import Img from "@/components/Img";
import AmbientLeaves from "@/components/motion/AmbientLeaves";

/**
 * Section 1 — HERO nền đỏ (khôi phục từ bản cũ, tinh gọn).
 * Text căn giữa 1/4 trái, ảnh không gian y viện 3/4 phải; mép trái ảnh fade dần
 * vào nền đỏ bằng mask-image. Không CTA — hero chỉ định vị thương hiệu.
 * Thuần CSS (fade-up + lá) — homepage vẫn 0 GSAP.
 */
export default function HomeHero() {
  return (
    <section className="on-dark relative overflow-hidden bg-crimson-800">
      {/* Nền gradient chiều sâu: quầng vàng góc trên-trái → tối dần mép dưới (CSS thuần) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 85% at 12% -10%, rgba(216,170,75,0.14), transparent 55%), linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.28))",
        }}
      />
      <AmbientLeaves />

      <div className="relative z-10 mx-auto grid min-h-[70svh] max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_3fr] lg:gap-4">
        {/* 1/4 trái — line text căn giữa dọc */}
        <div className="animate-fade-up text-ivory">
          <span className="inline-block border border-gold-500 px-4 py-1.5 text-base font-semibold uppercase tracking-[0.18em] text-gold-300">
            Y Viện Dưỡng Thân · Tỉnh Thức
          </span>
          <h1 className="mt-7 text-balance font-serif-display uppercase text-[length:var(--text-hero)] leading-[1.05]">
            Dưỡng thân từ gốc, phục hồi từ tâm
          </h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-cream/85">
            Không gian chăm sóc sức khỏe Đông y cao cấp, kết hợp trị liệu thủ công, dưỡng liệu tự
            nhiên và công nghệ hiện đại, giúp cơ thể được lắng nghe và cân bằng.
          </p>
        </div>

        {/* 3/4 phải — ảnh không gian, mép trái fade dần vào nền đỏ */}
        <div className="animate-fade-up delay-2 relative h-[38svh] min-h-72 lg:h-[64svh]">
          <Img
            src="/images/home/spa-ambience.jpg"
            alt="Không gian trị liệu tại Y Viện Toplink"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 75vw"
            className="img-grade object-cover"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 38%)",
              maskImage: "linear-gradient(to right, transparent 0%, #000 38%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
