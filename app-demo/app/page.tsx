import type { Metadata } from "next";
import HomeHero from "@/components/home-experience/HomeHero";
import StaticOrientationShell from "@/components/home-experience/corrected/StaticOrientationShell";
import RitualTimeline from "@/components/home-experience/RitualTimeline";
import SpaceAsTherapy from "@/components/home-experience/SpaceAsTherapy";
import HomeFinalCTA from "@/components/home-experience/HomeFinalCTA";

/**
 * HOMEPAGE — M2A0 dùng một sàn định hướng tĩnh, không chẩn đoán hay tự chọn dịch vụ.
 * Các section legacy lân cận được giữ nguyên để những batch sau xử lý độc lập.
 */
export const metadata: Metadata = {
  title: "Y Viện Toplink — Trị liệu Đông y, cổ vai gáy, lưng eo & dưỡng sinh tại Hà Nội",
  description:
    "Không gian chăm sóc sức khỏe chủ động: dưỡng sinh Đông y, trị liệu thủ công cổ vai gáy · lưng eo, thảo dược và công nghệ hỗ trợ phục hồi. Đặt lịch tại Y Viện Toplink Hà Nội.",
};

export default function HomePage() {
  return (
    <>
      {/* 1 · HERO nền đỏ — định vị thương hiệu, đẩy lên đầu */}
      <HomeHero />

      {/* 2 · M2A0: định hướng tĩnh, giới hạn rõ, không gửi dữ liệu */}
      <StaticOrientationShell />

      {/* 3 · Một ngày ở Y Viện — timeline cảm giác */}
      <RitualTimeline />

      {/* 4 · Không gian như liệu pháp */}
      <SpaceAsTherapy />

      {/* 5 · CTA cuối: đặt lịch / Zalo / chỉ đường */}
      <HomeFinalCTA />
    </>
  );
}
