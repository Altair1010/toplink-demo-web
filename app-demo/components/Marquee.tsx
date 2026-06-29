"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Marquee — dải chữ/khẩu hiệu chạy ngang liên tục.
 * Nhân đôi nội dung + dịch translateX(-50%) linear vô hạn → chạy liền mạch.
 * CSS lo phần chạy; nút Tạm dừng/Chạy (điều khiển bằng bàn phím) đáp ứng WCAG 2.2.2
 * "Pause, Stop, Hide" cho nội dung chuyển động tự khởi.
 */
export default function Marquee({
  items,
  speed = 40,
  separator = "·",
  className = "",
}: {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);

  const Group = ({ ariaHidden }: { ariaHidden?: boolean }) => (
    <ul
      className="m-0 flex shrink-0 list-none items-center gap-10 pr-10"
      aria-hidden={ariaHidden}
    >
      {items.map((text, i) => (
        <li key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-xl tracking-wide sm:text-2xl">{text}</span>
          <span className="text-gold-400/70" aria-hidden>
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`relative ${className}`}>
      <div
        className={`marquee select-none ${paused ? "is-paused" : ""}`}
        style={{ ["--marquee-speed" as string]: `${speed}s` }}
      >
        <div className="marquee-track">
          <Group />
          <Group ariaHidden />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        aria-label={paused ? "Cho dải chữ chạy lại" : "Tạm dừng dải chữ chạy"}
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/80 text-crimson-600 shadow-sm transition-colors hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600"
      >
        {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </button>
    </div>
  );
}
