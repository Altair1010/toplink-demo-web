"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Img from "@/components/Img";
import { gsap, ScrollTrigger, registerMotion } from "@/lib/motion/scrollTrigger";
import { registerEases } from "@/lib/motion/easings";
import { breathFlow, PIN_MIN_WIDTH } from "@/lib/motion/config";
import { SPACES } from "@/data/content";

/**
 * KHÔNG GIAN Y VIỆN — "hành trình NGANG" 4 tầng (kỹ thuật ScrollTrigger horizontal-pin
 * của gsap.com). Stage được PIN, một TRACK NGANG trượt sang trái theo nhịp cuộn; mỗi lúc
 * chỉ MỘT tầng ở giữa khung — KHÔNG còn ảnh chồng lên ảnh (deck cũ đã bỏ).
 *
 * - Desktop (≥lg, cho motion): pin stage; track flex-row trượt x: 0 → -(maxX); snap về
 *   từng tầng; ảnh trong panel parallax ngược (containerAnimation) tạo chiều sâu.
 * - Mobile / reduced-motion: track flex-col, các tầng xếp dọc, reveal nhẹ — không pin.
 */
export default function YVienSpaceExperience() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const N = SPACES.length;

  useGSAP(
    () => {
      registerMotion();
      registerEases();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const canPin = !reduced && window.innerWidth >= PIN_MIN_WIDTH;
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!panels.length) return;

      // ----- MOBILE / REDUCED: reveal dọc theo luồng thường, không pin -----
      if (!canPin) {
        if (reduced) return;
        panels.forEach((p, i) => {
          gsap.fromTo(
            p,
            { y: breathFlow.revealDistance, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: breathFlow.slow,
              ease: breathFlow.ease,
              delay: (i % 2) * 0.06,
              scrollTrigger: { trigger: p, start: "top 88%", toggleActions: "play none none none" },
            }
          );
        });
        return;
      }

      if (!track || !stage) return;

      // ----- DESKTOP: track ngang trượt theo cuộn -----
      // Mỗi panel rộng đúng bằng stage → article canh giữa sạch, không tràn/lệch.
      const setPanelWidth = () => gsap.set(panels, { width: stage.clientWidth });
      setPanelWidth();
      ScrollTrigger.addEventListener("refreshInit", setPanelWidth);

      const getMaxX = () => Math.max(0, track.scrollWidth - stage.clientWidth);

      const tween = gsap.to(track, {
        x: () => -getMaxX(),
        ease: "none",
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: () => "+=" + getMaxX(),
          pin: stage,
          pinSpacing: true,
          scrub: 1,
          snap: { snapTo: 1 / (N - 1), duration: { min: 0.2, max: 0.5 }, ease: "floorRitual" },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (N - 1));
            setActive((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      // Parallax ảnh trong từng panel (ngược chiều track → chiều sâu).
      const imgs = imgRefs.current.filter(Boolean) as HTMLDivElement[];
      imgs.forEach((img, i) => {
        gsap.fromTo(
          img,
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: panels[i],
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", setPanelWidth);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sceneRef, dependencies: [] }
  );

  return (
    <div
      ref={sceneRef}
      className="floor-scene"
      style={{ ["--floor-scene-h" as string]: `${N * 85}vh` }}
    >
      <div ref={stageRef} className="relative lg:h-screen lg:overflow-hidden">
        <div
          ref={trackRef}
          className="floor-track flex flex-col gap-6 lg:h-full lg:flex-row lg:gap-0"
        >
          {SPACES.map((sp, i) => (
            <div
              key={sp.floor}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              data-floor-panel
              className="shrink-0 lg:flex lg:h-full lg:items-center lg:justify-center lg:px-10"
              style={{ willChange: "transform, opacity" }}
            >
              <article className={`grid w-full overflow-hidden rounded-3xl border border-gold-700 shadow-soft lg:max-w-5xl lg:grid-cols-2 ${sp.tone}`}>
                <div className="img-overlay relative aspect-[4/3] overflow-hidden lg:aspect-auto">
                  <div
                    ref={(el) => {
                      imgRefs.current[i] = el;
                    }}
                    className="absolute inset-0 lg:-inset-x-[12%]"
                  >
                    {/* TODO: thay bằng ảnh thật từng tầng của Y Viện */}
                    <Img src={sp.image} alt={sp.floor} fill sizes="(max-width: 1024px) 100vw, 45vw" className="img-grade object-cover" />
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 text-ivory sm:p-10">
                  <div className="flex items-baseline gap-2 text-gold-300">
                    <span className="font-serif-display text-6xl leading-none text-gold-400">0{i + 1}</span>
                    <span className="text-base font-semibold uppercase tracking-[0.2em] text-gold-300/70">/ 0{N}</span>
                  </div>
                  <h3 className="mt-4 font-serif-display text-2xl text-gold-200 sm:text-3xl">{sp.floor}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-cream/85">{sp.desc}</p>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Dots tiến trình (chỉ desktop) — đồng bộ tầng đang ở giữa. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden items-center justify-center gap-3 lg:flex">
          {SPACES.map((sp, i) => (
            <span
              key={sp.floor}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === active ? "w-8 bg-gold-400" : "w-2 bg-gold-400/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
