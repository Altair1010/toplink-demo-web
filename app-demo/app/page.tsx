import type { Metadata } from "next";
import HomeHero from "@/components/home-experience/HomeHero";
import NarrativeCompletion from "@/components/home-experience/corrected/NarrativeCompletion";
import OrientationCore from "@/components/home-experience/corrected/OrientationCore";

/**
 * HOMEPAGE — M2B hoàn tất narrative an toàn sau định hướng, không dùng mock fact hoặc evidence.
 */
export const metadata: Metadata = {
  title: "Y Viện Toplink — Dưỡng thân, tỉnh thức",
  description:
    "Bắt đầu từ điều đang quan tâm, xem phạm vi thông tin và giới hạn trước khi quyết định.",
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
