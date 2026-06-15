/**
 * Marquee — dải chữ/khẩu hiệu chạy ngang liên tục (kỹ thuật Vibrasonic).
 * Nhân đôi nội dung + dịch translateX(-50%) linear vô hạn → chạy liền mạch.
 * Pure CSS (pause-on-hover bằng :hover), không cần JS → an toàn static export.
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
    <div
      className={`marquee select-none ${className}`}
      style={{ ["--marquee-speed" as string]: `${speed}s` }}
    >
      <div className="marquee-track">
        <Group />
        <Group ariaHidden />
      </div>
    </div>
  );
}
