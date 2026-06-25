/**
 * Đăng ký plugin GSAP MỘT LẦN (guard SSR + tránh đăng ký lặp).
 * Gọi trong useGSAP/useEffect của component motion phía client.
 *
 * GSAP 3.13 đã MIỄN PHÍ toàn bộ plugin (kèm trong gói npm) — dùng làm engine chính:
 * SplitText (reveal chữ), Flip (layout transition), DrawSVG (đường tự vẽ),
 * MotionPath (bay theo path), Observer/Inertia (parallax + kéo quán tính).
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerMotion() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    // Native scroll vẫn cập nhật được khi không dùng Lenis.
    markers: false,
  });
  registered = true;
}

/**
 * Đăng ký các plugin "nâng cao" (chỉ khi component cần) — client-only, idempotent.
 * Import động để KHÔNG kéo vào bundle SSR và giữ guard window an toàn.
 */
let advancedRegistered = false;

export async function registerAdvanced() {
  if (advancedRegistered || typeof window === "undefined") return;
  registerMotion();
  const [{ SplitText }, { Flip }, { DrawSVGPlugin }, { MotionPathPlugin }, { Observer }] =
    await Promise.all([
      import("gsap/SplitText"),
      import("gsap/Flip"),
      import("gsap/DrawSVGPlugin"),
      import("gsap/MotionPathPlugin"),
      import("gsap/Observer"),
    ]);
  gsap.registerPlugin(SplitText, Flip, DrawSVGPlugin, MotionPathPlugin, Observer);
  advancedRegistered = true;
}

export { gsap, ScrollTrigger };
