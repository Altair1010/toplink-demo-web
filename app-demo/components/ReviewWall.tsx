import Img from "@/components/Img";
import { Play, Quote, ImageIcon } from "lucide-react";
import { REVIEWS } from "@/data/content";

/**
 * Cảm nhận khách hàng — 3 dạng (ảnh feedback / video 9:16 / trích ngắn).
 * Tất cả là placeholder trung tính, KHÔNG review giả, dễ thay dữ liệu thật.
 * TODO: Replace placeholders with real customer feedback images/videos.
 */
export default function ReviewWall() {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {REVIEWS.map((r, i) => {
        if (r.type === "image") {
          return (
            <figure key={i} className="lift overflow-hidden rounded-md border border-sand bg-ivory shadow-soft">
              <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                {r.image && (
                  <Img src={r.image} alt="Ảnh cảm nhận khách hàng (placeholder)" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                )}
                <span className="absolute left-3 top-3 flex items-center gap-1 rounded-sm bg-ivory/90 px-2.5 py-1 text-xs font-semibold text-crimson-600">
                  <ImageIcon className="h-3.5 w-3.5" /> Ảnh chia sẻ
                </span>
              </div>
              <figcaption className="p-6 text-base leading-relaxed text-ink">“{r.text}”</figcaption>
            </figure>
          );
        }
        if (r.type === "video") {
          return (
            <figure key={i} className="lift overflow-hidden rounded-md border border-sand bg-ivory shadow-soft">
              {/* TODO: thay bằng <video> dọc 9:16 với nguồn thật. */}
              <div className="relative mx-auto aspect-[9/16] max-h-[22rem] w-full overflow-hidden bg-crimson-900">
                {r.poster && (
                  <Img src={r.poster} alt="Video cảm nhận khách hàng (placeholder)" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover opacity-90" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ivory/90 text-crimson-600 shadow-soft">
                    <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
                  </span>
                </div>
                <span className="absolute left-3 top-3 rounded-sm bg-ivory/90 px-2.5 py-1 text-xs font-semibold text-crimson-600">
                  Video chia sẻ
                </span>
              </div>
              <figcaption className="p-6 text-base leading-relaxed text-ink">“{r.text}”</figcaption>
            </figure>
          );
        }
        return (
          <figure key={i} className="flex flex-col justify-center rounded-md border border-sand bg-crimson-600 p-8 text-ivory shadow-soft">
            <Quote className="h-8 w-8 text-gold-300" aria-hidden />
            <blockquote className="mt-4 font-display text-2xl leading-snug">“{r.text}”</blockquote>
            <figcaption className="mt-4 text-sm uppercase tracking-[0.18em] text-gold-300">Cảm nhận khách hàng</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
