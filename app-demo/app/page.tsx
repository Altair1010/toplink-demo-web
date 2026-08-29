import type { Metadata } from "next";
import HomeHero from "@/components/home-experience/HomeHero";
import NarrativeCompletion from "@/components/home-experience/corrected/NarrativeCompletion";
import OrientationCore from "@/components/home-experience/corrected/OrientationCore";

/**
 * HOMEPAGE — M2B hoàn tất narrative an toàn sau định hướng, không dùng mock fact hoặc evidence.
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

      {/* 2 · M2A1: định hướng có thể sửa, giới hạn rõ, không gửi dữ liệu */}
      <OrientationCore />

      {/* 3 · M2B: phạm vi → kỳ vọng quy trình → evidence collapse → tiếp tục hiểu */}
      <NarrativeCompletion />
    </>
  );
}
