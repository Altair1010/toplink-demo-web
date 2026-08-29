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
    <section className="on-dark relative isolate flex min-h-[64svh] items-center overflow-hidden bg-crimson-800">
      {/* Ảnh không gian — full chiều cao section, bo 2 góc phải, fade mép trái */}
      <div className="absolute inset-y-0 right-0 z-0 w-[68%] overflow-hidden rounded-l-none rounded-r-[2rem]">
        <Img
          src="/images/home/spa-ambience.jpg"
          alt=""
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

      {/* Scrim đỏ: giữ vùng chữ (trái → giữa) đủ tối để đọc, mép phải lộ ảnh.
          Dựng từ token trong styles/home-experience.css → skin đổi theo. */}
      <div aria-hidden className="home-hero-scrim pointer-events-none absolute inset-0 z-[1]" />
      <AmbientLeaves />

      {/* Nội dung — dồn về NỬA TRÁI (vùng đỏ thuần, đọc rõ), căn giữa dọc */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col items-center text-center lg:w-[52%] lg:pr-6">
          <span className="inline-block border border-gold-500 px-4 py-1.5 text-base font-semibold uppercase tracking-[0.18em] text-gold-300">
            Y Viện Dưỡng Thân · Tỉnh Thức
          </span>
          {/* H1 dùng --text-hero (48→76px) — token vốn được tạo riêng cho chỗ này.
              KHÔNG uppercase: tiếng Việt có dấu viết hoa toàn bộ làm chậm đọc, nhất
              là nhóm khách lớn tuổi (DESIGN.md §Typography). */}
          <h1 className="animate-fade-up mt-5 text-balance font-serif-display text-[length:var(--text-hero)] text-ivory">
            Dành một nhịp để xem điều mình đang quan tâm
          </h1>
          <p className="animate-fade-up stagger-1 mt-5 max-w-lg text-center text-xl leading-relaxed text-cream/90 sm:text-justify sm:[text-align-last:center]">
            Không cần tự kết luận điều gì đang xảy ra. Phần định hướng bên dưới chỉ giúp chị/anh sắp
            xếp câu chữ, xem giới hạn thông tin và giữ quyền quyết định cho mình.
          </p>
        </div>
      </div>
    </section>
  );
}
