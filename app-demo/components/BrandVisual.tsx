// Visual on-brand thay cho ảnh thật (chưa có ảnh). Inline SVG nên không phụ thuộc
// basePath, không cần file nhị phân. Họa tiết: triện vàng + mây lành Đông phương.
type Variant = "crimson" | "wood" | "cream" | "jade";

const BG: Record<Variant, string> = {
  crimson: "bg-crimson-800",
  wood: "bg-wood-500",
  cream: "bg-cream",
  jade: "bg-jade-600",
};

export default function BrandVisual({
  label,
  variant = "crimson",
  className = "",
}: {
  label?: string;
  variant?: Variant;
  className?: string;
}) {
  const onLight = variant === "cream";
  const ink = onLight ? "text-crimson-600" : "text-ivory";
  const sub = onLight ? "text-ink-soft" : "text-cream/60";
  const stroke = onLight ? "#a9802c" : "#f3d27a";

  return (
    <div
      className={`relative isolate flex h-full w-full items-center justify-center overflow-hidden ${BG[variant]} ${className}`}
      role="img"
      aria-label={label ?? "Họa tiết Y Viện Toplink"}
    >
      {/* Họa tiết mây lành lặp lại — tiết chế, vàng kim mờ */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.13]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 240 180"
      >
        <g fill="none" stroke={stroke} strokeWidth="1.4">
          {[28, 96, 164].map((cx) =>
            [36, 110].map((cy) => (
              <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
                <circle cx="0" cy="0" r="14" />
                <circle cx="0" cy="0" r="8" />
                <path d="M-20 18 q10 -10 20 0 q10 10 20 0" />
              </g>
            ))
          )}
        </g>
      </svg>

      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="seal flex h-14 w-14 items-center justify-center font-display text-2xl text-gold-300">
          Y
        </span>
        {label && <span className={`font-display text-xl leading-tight ${ink}`}>{label}</span>}
        <span className={`text-xs uppercase tracking-[0.2em] ${sub}`}>Y Viện Toplink</span>
      </div>
    </div>
  );
}
