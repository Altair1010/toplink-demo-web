import Img from "@/components/Img";
import AmbientLeaves from "@/components/motion/AmbientLeaves";

/**
 * Section 1 — HERO nền đỏ (căn giữa).
 * Ảnh không gian phủ full chiều cao section (hết gãy mép trên/dưới), bo 2 góc phải,
 * mép trái fade dần vào nền đỏ. Cụm eyebrow + heading + description căn giữa, nằm
 * trên ảnh. Không CTA. Thuần CSS — homepage vẫn 0 GSAP.
 */
export default function HomeHero() {
  return (
    <section className="on-dark relative isolate flex min-h-[46svh] items-center overflow-hidden bg-crimson-800">
      {/* Ảnh không gian — full chiều cao section, bo 2 góc phải, fade mép trái */}
      <div className="absolute inset-y-0 right-0 z-0 w-[68%] overflow-hidden rounded-l-none rounded-r-[2rem]">
        <Img
          src="/images/home/spa-ambience.jpg"
          alt="Không gian trị liệu tại Y Viện Toplink"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 68vw"
          className="img-grade object-cover"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 42%)",
            maskImage: "linear-gradient(to right, transparent 0%, #000 42%)",
          }}
        />
      </div>

      {/* Scrim đỏ: giữ vùng chữ (trái → giữa) đủ tối để đọc, mép phải lộ ảnh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 90% at 12% -10%, rgba(216,170,75,0.14), transparent 55%), linear-gradient(to right, rgba(106,5,17,0.92) 32%, rgba(106,5,17,0.35) 60%, transparent 78%)",
        }}
      />
      <AmbientLeaves />

      {/* Nội dung căn giữa (ngang + dọc) */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-12">
        <span className="inline-block border border-gold-500 px-4 py-1.5 text-base font-semibold uppercase tracking-[0.18em] text-gold-300">
          Y Viện Dưỡng Thân · Tỉnh Thức
        </span>
        <h1 className="animate-fade-up mt-4 font-display text-xl font-semibold uppercase leading-snug tracking-wide text-ivory">
          Dưỡng thân từ gốc, phục hồi từ tâm
        </h1>
        <p className="animate-fade-up delay-1 mt-5 max-w-2xl text-center text-xl leading-relaxed text-cream/90 sm:text-justify sm:[text-align-last:center]">
          Không gian chăm sóc sức khỏe Đông y cao cấp, kết hợp trị liệu thủ công, dưỡng liệu tự nhiên
          và công nghệ hiện đại, giúp cơ thể được lắng nghe và cân bằng.
        </p>
      </div>
    </section>
  );
}
