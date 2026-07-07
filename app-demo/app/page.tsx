import type { Metadata } from "next";
import HomeExperience from "@/components/home-experience/HomeExperience";
import RitualTimeline from "@/components/home-experience/RitualTimeline";
import SpaceAsTherapy from "@/components/home-experience/SpaceAsTherapy";
import HomeFinalCTA from "@/components/home-experience/HomeFinalCTA";

/**
 * HOMEPAGE — "Nghi thức chẩn thân" (body-first experience).
 * Không phải mục lục của các tab: người dùng bước vào bằng câu hỏi về cơ thể,
 * chọn dấu hiệu → trạng thái Tắc/Hàn/Hư/Loạn → gợi ý liệu trình → đặt lịch.
 * Motion budget = 3 (region glow / state expand / drawer slide) — thuần CSS, 0 GSAP.
 * SEO thương mại nằm ở metadata; H1 hiển thị giữ giọng trải nghiệm.
 */
export const metadata: Metadata = {
  title: "Y Viện Toplink — Trị liệu Đông y, cổ vai gáy, lưng eo & dưỡng sinh tại Hà Nội",
  description:
    "Không gian chăm sóc sức khỏe chủ động: dưỡng sinh Đông y, trị liệu thủ công cổ vai gáy · lưng eo, thảo dược và công nghệ hỗ trợ phục hồi. Đặt lịch tại Y Viện Toplink Hà Nội.",
};

export default function HomePage() {
  return (
    <>
      {/* 1+2 · Body Signal Interface + 4 trạng thái + drawer (client boundary duy nhất) */}
      <HomeExperience />

      {/* 3 · Một ngày ở Y Viện — timeline cảm giác */}
      <RitualTimeline />

      {/* 4 · Không gian như liệu pháp */}
      <SpaceAsTherapy />

      {/* 5 · CTA cuối: đặt lịch / Zalo / chỉ đường */}
      <HomeFinalCTA />
    </>
  );
}
