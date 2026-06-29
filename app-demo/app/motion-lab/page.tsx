import ScrollConvergeScene from "@/components/motion/ScrollConvergeScene";
import ConvergeBlock from "@/components/motion/ConvergeBlock";
import YVienSpaceExperience from "@/components/YVienSpaceExperience";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";

/**
 * MOTION LAB (dev) — bàn thử cô lập cho hệ "Converging Ritual Motion System".
 * Mục đích: duyệt cảm giác từng component motion TÁCH KHỎI nội dung trang chính,
 * và kiểm thử nhanh reduced-motion / mobile fallback.
 *
 * Cách test (xem design-research/motion-qa-checklist.md):
 *  - Desktop ≥1024px: scene pin, 4 khối trượt 4 hướng → hội tụ về giữa theo cuộn;
 *    deck 4 tầng đổi tầng active theo progress.
 *  - Thu < 1024px (hoặc DevTools 375): KHÔNG pin, các khối/tầng hiện tĩnh, stack dọc.
 *  - Bật prefers-reduced-motion (OS hoặc DevTools rendering): mọi thứ tĩnh, đủ chữ.
 * Route dev-only: không link trong nav; chỉ truy cập trực tiếp /motion-lab.
 */
export const metadata = { robots: { index: false, follow: false } };

const LAB_BLOCKS = [
  { from: "left" as const, label: "Block · vào từ TRÁI", tone: "bg-crimson-600 text-ivory" },
  { from: "right" as const, label: "Block · vào từ PHẢI", tone: "bg-gold-500 text-wood-700" },
  { from: "up" as const, label: "Block · vào từ DƯỚI", tone: "bg-wood-700 text-ivory" },
  { from: "down" as const, label: "Block · vào từ TRÊN", tone: "bg-crimson-800 text-gold-200" },
];

export default function MotionLabPage() {
  return (
    <SmoothScrollProvider>
    <div className="bg-ivory">
      <header className="mx-auto max-w-6xl px-4 pt-16 pb-8 sm:px-6">
        <span className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-700">
          Dev · Motion Lab
        </span>
        <h1 className="mt-3 font-display text-4xl text-crimson-600 sm:text-5xl">
          Converging Ritual Motion System
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Bàn thử cô lập: <code>ScrollConvergeScene</code> + <code>ConvergeBlock</code> và{" "}
          <code>YVienSpaceExperience</code>. Cuộn để xem hội tụ; thu hẹp cửa sổ hoặc bật
          reduced-motion để kiểm thử fallback.
        </p>
      </header>

      {/* 1 · CONVERGE SCENE — 4 khối, 4 hướng, hội tụ về giữa */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl text-crimson-600">1 · ScrollConvergeScene + ConvergeBlock</h2>
      </section>
      <ScrollConvergeScene className="mx-auto max-w-6xl px-4 sm:px-6" stageClassName="py-12">
        <div className="mx-auto grid w-full max-w-3xl gap-6">
          {LAB_BLOCKS.map((b, i) => (
            <ConvergeBlock key={b.from} from={b.from} index={i}>
              <div className={`rounded-md p-10 text-center font-display text-2xl shadow-soft ${b.tone}`}>
                {b.label}
              </div>
            </ConvergeBlock>
          ))}
        </div>
      </ScrollConvergeScene>

      {/* 2 · SPATIAL FLOORS — deck 4 tầng */}
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <h2 className="font-display text-2xl text-crimson-600">2 · YVienSpaceExperience (deck 4 tầng)</h2>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <YVienSpaceExperience />
      </section>
    </div>
    </SmoothScrollProvider>
  );
}
