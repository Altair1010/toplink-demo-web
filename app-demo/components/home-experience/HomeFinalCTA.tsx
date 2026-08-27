import Link from "next/link";
import { CalendarPlus, MessageCircle, Navigation } from "@/components/Glyph";
import { CONTACT, BRANCHES } from "@/data/content";

/**
 * CTA cuối homepage — đặt lịch / Zalo / chỉ đường. Một khối, ba lối đi rõ.
 */
export default function HomeFinalCTA() {
  const branch = BRANCHES[0];
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
      <div className="cta-glow on-dark frame-gold px-6 py-16 text-center text-ivory sm:px-12">
        <h2 className="mx-auto max-w-2xl font-serif-display text-3xl leading-tight text-gold-200">
          Khi cơ thể đã lên tiếng, đừng để nó đợi lâu.
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dat-lich"
            className="flex items-center gap-2 rounded-sm bg-gold-500 px-[2.4rem] py-[1.2rem] text-[1.35rem] font-semibold text-wood-700 elev-soft transition-colors hover:bg-gold-400"
          >
            <CalendarPlus className="h-6 w-6" /> Đặt lịch ngay
          </Link>
          <a
            href={CONTACT.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-sm border border-gold-500 px-7 py-4 text-base font-semibold text-gold-300 transition-colors hover:bg-gold-500 hover:text-wood-700"
          >
            <MessageCircle className="h-5 w-5" /> Nhắn Zalo tư vấn
          </a>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-4 text-base font-semibold text-gold-200 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
          >
            <Navigation className="h-5 w-5" /> Chỉ đường đến cơ sở
          </a>
        </div>
      </div>
    </section>
  );
}
