/**
 * AmbientLeaves — lá thảo dược trôi nhẹ, THUẦN CSS (thay WindLeafField/Three.js).
 * Server component, 0 JS runtime: chỉ SVG + keyframe `leaf-float` (styles/utilities.css).
 * Reduced-motion: keyframe tự tắt trong utilities.css; lá đứng yên, mờ nhẹ.
 */
const LEAVES = [
  { top: "12%", left: "6%", size: 34, rotate: -18, delay: "" },
  { top: "28%", left: "88%", size: 26, rotate: 24, delay: "leaf-delay-1" },
  { top: "62%", left: "12%", size: 22, rotate: 40, delay: "leaf-delay-2" },
  { top: "74%", left: "82%", size: 30, rotate: -32, delay: "leaf-delay-3" },
  { top: "44%", left: "48%", size: 18, rotate: 10, delay: "leaf-delay-1" },
];

export default function AmbientLeaves() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {LEAVES.map((leaf, i) => (
        <svg
          key={i}
          className={`leaf-float absolute opacity-30 ${leaf.delay}`}
          style={{
            top: leaf.top,
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            transform: `rotate(${leaf.rotate}deg)`,
          }}
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* lá đơn giản: phiến + gân giữa */}
          <path d="M12 2C7 6 4 11 4 15a8 8 0 0 0 16 0c0-4-3-9-8-13Z" fill="var(--color-jade-500)" />
          <path d="M12 5v14" stroke="var(--color-gold-300)" strokeWidth="0.8" />
        </svg>
      ))}
    </div>
  );
}
