"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Img from "@/components/Img";
import { gsap, ScrollTrigger, registerMotion } from "@/lib/motion/scrollTrigger";
import { registerEases } from "@/lib/motion/easings";
import { motionConfig, breathFlow, PIN_MIN_WIDTH } from "@/lib/motion/config";
import { SPACES } from "@/data/content";

/**
 * KHÔNG GIAN Y VIỆN — "vertical spatial experience" 4 tầng (hệ Breath & Flow).
 * Nguyên lý chắt lọc từ MyWebLab "ExpandingCards" (một panel nổi bật, phần còn lại
 * lùi/mờ) nhưng dựng thành HÀNH TRÌNH DỌC: container pin, mỗi tầng lần lượt vào
 * CENTER viewport theo nhịp cuộn.
 *
 * - Desktop (≥lg, cho phép motion): pin stage; panel xếp lớp (absolute) — tầng active
 *   scale 1 + rõ + shadow, tầng trước lùi lên & mờ, tầng sau chờ phía dưới & mờ → chiều sâu.
 * - Mobile / reduced-motion: KHÔNG pin — các tầng ở luồng thường, stack dọc, hiện đủ
 *   (reveal nhẹ), không lag.
 * Chỉ ghi transform/opacity qua quickSetter (GPU, không reflow).
 */
export default function YVienSpaceExperience() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const N = SPACES.length;

  useGSAP(
    () => {
      registerMotion();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const canPin = !reduced && window.innerWidth >= PIN_MIN_WIDTH;
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!panels.length) return;

      // ----- MOBILE / REDUCED: reveal nhẹ theo luồng thường, không pin -----
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

      // ----- DESKTOP: deck xếp lớp, tầng active vào center theo progress -----
      // Mỗi panel chồng tuyệt đối lên stage; JS nội suy transform/opacity.
      gsap.set(panels, { position: "absolute", inset: 0 });

      registerEases(); // CustomEase "floorRitual" có trước parseEase
      const recede = breathFlow.stack.recedeDistance;
      const { activeScale, inactiveScale, activeOpacity, inactiveOpacity } = breathFlow.stack;
      const ease = gsap.parseEase(breathFlow.stack.ease);

      const setters = panels.map((p) => ({
        y: gsap.quickSetter(p, "y", "px") as (v: number) => void,
        scale: gsap.quickSetter(p, "scale") as (v: number) => void,
        opacity: gsap.quickSetter(p, "opacity") as (v: number) => void,
        z: gsap.quickSetter(p, "zIndex") as (v: number) => void,
      }));

      const apply = (progress: number) => {
        const pos = progress * (N - 1); // vị trí "tầng đang ở giữa" (0..N-1)
        panels.forEach((_, i) => {
          const rel = pos - i; // >0: đã qua (lùi lên) · <0: chờ (phía dưới) · 0: active
          const dist = Math.min(Math.abs(rel), 1.4);
          const e = ease(dist / 1.4); // 0 ở center → 1 ở xa
          setters[i].y(-rel * recede); // qua rồi trôi lên, chưa tới nằm dưới
          setters[i].scale(activeScale + (inactiveScale - activeScale) * e);
          setters[i].opacity(activeOpacity + (inactiveOpacity - activeOpacity) * e);
          setters[i].z(Math.round(100 - Math.abs(rel) * 10)); // gần center nổi lên trên
        });
      };

      apply(0);
      const st = ScrollTrigger.create({
        trigger: sceneRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stageRef.current,
        pinSpacing: motionConfig.pinSpacing,
        scrub: motionConfig.scrub,
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      });

      return () => st.kill();
    },
    { scope: sceneRef, dependencies: [] }
  );

  return (
    <div
      ref={sceneRef}
      className="floor-scene"
      style={{ ["--floor-scene-h" as string]: `${N * breathFlow.stack.perFloorVh}vh` }}
    >
      <div
        ref={stageRef}
        className="relative flex flex-col gap-6 lg:block lg:h-screen lg:gap-0"
      >
        {SPACES.map((sp, i) => (
          <div
            key={sp.floor}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            data-floor-panel
            className="lg:flex lg:h-full lg:items-center lg:justify-center"
            style={{ willChange: "transform, opacity" }}
          >
            <article className="grid w-full overflow-hidden rounded-md border border-gold-700 bg-crimson-800 shadow-soft lg:max-w-5xl lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
                {/* TODO: thay bằng ảnh thật từng tầng của Y Viện */}
                <Img src={sp.image} alt={sp.floor} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-crimson-900/70 to-transparent lg:bg-gradient-to-r" aria-hidden />
              </div>
              <div className="flex flex-col justify-center p-8 text-ivory sm:p-10">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
                  0{i + 1} / 0{N}
                </span>
                <h3 className="mt-3 font-display text-3xl text-gold-200 sm:text-4xl">{sp.floor}</h3>
                <p className="mt-4 text-lg leading-relaxed text-cream/85">{sp.desc}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
