import type { Metadata } from "next";

import { H4RPrototype } from "./_components/H4RPrototype";

export const metadata: Metadata = {
  title: "Prototype H4R — Nhịp Hỏi — Đáp Rõ",
  robots: { index: false, follow: false },
};

export default function HumanizerH4RPage() {
  return <H4RPrototype />;
}
