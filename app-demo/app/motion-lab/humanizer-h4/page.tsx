import type { Metadata } from "next";

import { H4Prototype } from "./_components/H4Prototype";

export const metadata: Metadata = {
  title: "Prototype H4 — Hồ Sơ Sống",
  robots: { index: false, follow: false },
};

export default function HumanizerH4Page() {
  return <H4Prototype />;
}
