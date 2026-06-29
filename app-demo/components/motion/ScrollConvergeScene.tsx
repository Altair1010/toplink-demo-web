"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, registerMotion } from "@/lib/motion/scrollTrigger";
import { motionConfig, PIN_MIN_WIDTH } from "@/lib/motion/config";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * SCROLL CONVERGE SCENE — “sân khấu” sticky kiểu opening brand.dropbox.com.
 * Container cao `heightVh`; bên trong là một stage dán sticky giữa màn hình.
 * Khi cuộn qua, ScrollTrigger pin stage và phát `progress 0→1` (scrub) cho các
 * <ConvergeBlock/> con qua context — block tự nội suy translate/scale/opacity.
 *
 * Reduced-motion HOẶC < lg (mobile/tablet): không pin, phát progress = 1 ngay
 * → block hiển thị đầy đủ, tĩnh, không gây chóng mặt / không lag.
 */
type SceneCtx = {
  /** Đăng ký nhận progress; gọi ngay với progress hiện tại khi subscribe. */
  subscribe: (cb: (p: number) => void) => () => void;
};

const ConvergeSceneContext = createContext<SceneCtx | null>(null);

export function useConvergeScene(): SceneCtx {
  const ctx = useContext(ConvergeSceneContext);
  if (!ctx) {
    throw new Error("ConvergeBlock phải nằm trong <ScrollConvergeScene>");
  }
  return ctx;
}

export default function ScrollConvergeScene({
  children,
  heightVh = motionConfig.sceneHeightVh,
  className = "",
  stageClassName = "",
}: {
  children: ReactNode;
  heightVh?: number;
  className?: string;
  stageClassName?: string;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const subs = useRef(new Set<(p: number) => void>());
  const progress = useRef(0);

  const notify = useCallback((p: number) => {
    progress.current = p;
    subs.current.forEach((cb) => cb(p));
  }, []);

  const subscribe = useCallback<SceneCtx["subscribe"]>((cb) => {
    subs.current.add(cb);
    cb(progress.current);
    return () => {
      subs.current.delete(cb);
    };
  }, []);

  useGSAP(
    () => {
      registerMotion();
      const reduced = prefersReducedMotion();
      const canPin = !reduced && window.innerWidth >= PIN_MIN_WIDTH;

      if (!canPin) {
        notify(1); // hiển thị đầy đủ, không pin
        return;
      }

      const st = ScrollTrigger.create({
        trigger: sceneRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stageRef.current,
        pinSpacing: motionConfig.pinSpacing,
        scrub: motionConfig.scrub,
        onUpdate: (self) => notify(self.progress),
        onRefresh: (self) => notify(self.progress),
      });

      return () => st.kill();
    },
    { scope: sceneRef, dependencies: [] }
  );

  return (
    <ConvergeSceneContext.Provider value={{ subscribe }}>
      <div
        ref={sceneRef}
        className={`converge-scene ${className}`}
        style={{ ["--scene-h" as string]: `${heightVh}vh` }}
      >
        <div
          ref={stageRef}
          className={`flex flex-col justify-center lg:min-h-screen ${stageClassName}`}
        >
          {children}
        </div>
      </div>
    </ConvergeSceneContext.Provider>
  );
}
