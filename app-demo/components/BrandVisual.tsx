import Img from "@/components/Img";

// Visual on-brand: nếu có `src` thì hiển thị ảnh thật (next/image, tự thêm basePath),
// phủ overlay họa tiết mây nhẹ giữ chất Đông y. Không có src thì fallback SVG triện.
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
  src,
}: {
  label?: string;
  variant?: Variant;
  className?: string;
  /** Đường dẫn ảnh thật trong /public, vd "/images/spaces/tang-1-tinh.jpg" */
  src?: string;
}) {
  const onLight = variant === "cream";
  const ink = onLight ? "text-crimson-600" : "text-ivory";
  const sub = onLight ? "text-ink-soft" : "text-cream/60";
  const stroke = onLight ? "#a9802c" : "#f3d27a";

  if (src) {
    return (
      <div className={`relative isolate h-full w-full overflow-hidden ${className}`} role="img" aria-label={label ?? "Hình ảnh Y Viện Toplink"}>
        <Img src={src} alt={label ?? "Hình ảnh Y Viện Toplink"} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        {/* lớp phủ mỏng giữ chữ/đường nét đọc rõ, tông đông y */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-crimson-800/35 to-transparent" aria-hidden />
        {label && (
          <span className="absolute bottom-3 left-4 right-4 text-base font-semibold uppercase tracking-wide text-ivory drop-shadow">
            {label}
          </span>
        )}
      </div>
    );
  }

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
