import type { ReactNode } from "react";

/**
 * Callout — khối nhấn mạnh ĐỨNG RIÊNG với khung họa tiết đông y (.frame-herb),
 * tiêu đề IN HOA. Dùng cho cam kết / lưu ý nổi bật, KHÔNG dùng nhấn từ khóa inline.
 */
export default function Callout({
  title,
  children,
  dark,
  className = "",
}: {
  title: string;
  children?: ReactNode;
  /** Đặt trên nền tối (đỏ sơn mài) */
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`frame-herb ${dark ? "on-dark bg-crimson-800 text-gold-200" : "bg-cream text-ink"} px-8 py-7 text-center ${className}`}
    >
      <h3
        className={`heading-font text-xl font-extrabold tracking-[0.12em] ${dark ? "text-gold-300" : "text-crimson-600"}`}
      >
        {title}
      </h3>
      {children && (
        <div className={`mt-3 text-base leading-relaxed ${dark ? "text-cream/85" : "text-ink-soft"}`}>
          {children}
        </div>
      )}
    </div>
  );
}
