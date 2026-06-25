import Img from "@/components/Img";
import { Play, Quote, ImageIcon, BadgeCheck } from "lucide-react";
import { REVIEWS } from "@/data/content";

/**
 * Cảm nhận khách hàng — layout có thứ bậc: 1 video lớn + ảnh feedback + 1 quote lớn,
 * kèm dòng tin cậy. Tất cả là placeholder trung tính, KHÔNG review giả, dễ thay thật.
 * TODO: Replace placeholders with real customer feedback images/videos.
 */
const GLASS = "rounded-2xl border border-gold-500/35 bg-ivory/80 shadow-soft backdrop-blur-md";

export default function ReviewWall() {
  const video = REVIEWS.find((r) => r.type === "video");
  const image = REVIEWS.find((r) => r.type === "image");
  const quote = REVIEWS.find((r) => r.type === "quote");

  return (
    <div className="mt-10">
      <div className="grid gap-6 lg:grid-cols-12">
        {/* VIDEO lớn — chiếm phần lớn chiều ngang */}
        {video && (
          <figure className={`lift overflow-hidden lg:col-span-7 ${GLASS}`}>
            {/* TODO: thay bằng <video> với nguồn thật + poster. */}
            <div className="img-overlay relative aspect-video w-full overflow-hidden bg-crimson-900">
              {video.poster && (
                <Img src={video.poster} alt="Video cảm nhận khách hàng (placeholder)" fill sizes="(max-width:1024px) 100vw, 58vw" className="img-grade object-cover" />
              )}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ivory/90 text-crimson-600 shadow-soft">
                  <Play className="h-9 w-9 translate-x-0.5" fill="currentColor" />
                </span>
              </div>
              <span className="absolute left-4 top-4 z-10 rounded-sm bg-ivory/90 px-2.5 py-1 text-xs font-semibold text-crimson-600">
                Video chia sẻ
              </span>
            </div>
            <figcaption className="p-6 text-lg leading-relaxed text-ink">“{video.text}”</figcaption>
          </figure>
        )}

        {/* Cột phải: ảnh feedback + quote */}
        <div className="grid gap-6 lg:col-span-5">
          {image && (
            <figure className={`lift overflow-hidden ${GLASS}`}>
              <div className="img-overlay relative aspect-[16/10] overflow-hidden bg-cream">
                {image.image && (
                  <Img src={image.image} alt="Ảnh cảm nhận khách hàng (placeholder)" fill sizes="(max-width:1024px) 100vw, 40vw" className="img-grade object-cover" />
                )}
                <span className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-sm bg-ivory/90 px-2.5 py-1 text-xs font-semibold text-crimson-600">
                  <ImageIcon className="h-3.5 w-3.5" /> Ảnh chia sẻ
                </span>
              </div>
              <figcaption className="p-6 text-base leading-relaxed text-ink">“{image.text}”</figcaption>
            </figure>
          )}

          {quote && (
            <figure className="flex flex-1 flex-col justify-center rounded-2xl border border-gold-500/40 bg-crimson-600 p-8 text-ivory shadow-soft">
              <Quote className="h-8 w-8 text-gold-300" aria-hidden />
              <blockquote className="mt-4 font-serif-display text-[length:var(--text-statement)] leading-snug">
                “{quote.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm uppercase tracking-[0.18em] text-gold-300">Cảm nhận khách hàng</figcaption>
            </figure>
          )}
        </div>
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-base text-ink-soft">
        <BadgeCheck className="h-5 w-5 text-jade-500" aria-hidden />
        Đã được khách hàng đồng ý chia sẻ.
      </p>
    </div>
  );
}
