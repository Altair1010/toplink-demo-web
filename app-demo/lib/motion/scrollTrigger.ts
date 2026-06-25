/**
 * Đăng ký plugin GSAP MỘT LẦN (guard SSR + tránh đăng ký lặp).
 * Gọi trong useGSAP/useEffect của component motion phía client.
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

export { gsap, ScrollTrigger };
