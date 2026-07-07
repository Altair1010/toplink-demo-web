import type { BodyRegionKey } from "@/data/content";

/**
 * BodyMap — hình người trừu tượng tối giản (SVG line-art, không y khoa).
 * 6 vùng <g id="region-*"> khớp BODY_REGIONS.svgId; vùng active sáng lên
 * bằng CSS (opacity + drop-shadow transition trong home-experience.css).
 * Thuần SVG + CSS — không GSAP, không JS runtime riêng.
 */
export default function BodyMap({ activeRegions }: { activeRegions: BodyRegionKey[] }) {
  const isOn = (key: BodyRegionKey) => activeRegions.includes(key);
  return (
    <svg
      viewBox="0 0 200 420"
      className="body-map mx-auto h-full max-h-[520px] w-auto"
      aria-hidden
      fill="none"
    >
      {/* dáng người: nét mảnh màu mực, tĩnh */}
      <g stroke="var(--color-ink-mute)" strokeWidth="1.5">
        {/* đầu */}
        <circle cx="100" cy="46" r="26" />
        {/* thân */}
        <path d="M74 92 C70 130 68 170 74 210 C80 240 120 240 126 210 C132 170 130 130 126 92" />
        {/* vai + tay */}
        <path d="M74 96 C56 104 46 140 42 190 C40 210 44 224 48 236" />
        <path d="M126 96 C144 104 154 140 158 190 C160 210 156 224 152 236" />
        {/* chân */}
        <path d="M82 226 C80 280 78 330 80 380" />
        <path d="M118 226 C120 280 122 330 120 380" />
      </g>

      {/* các vùng glow — fill crimson mờ, sáng khi active */}
      <g id="region-dau" data-active={isOn("dau")} className="body-region">
        <circle cx="100" cy="46" r="24" fill="var(--color-crimson-400)" />
      </g>
      <g id="region-tam-tri" data-active={isOn("tam-tri")} className="body-region">
        {/* vầng quanh đầu — thần trí */}
        <circle
          cx="100"
          cy="46"
          r="34"
          stroke="var(--color-gold-500)"
          strokeWidth="2"
          strokeDasharray="4 7"
          fill="none"
        />
      </g>
      <g id="region-co-vai-gay" data-active={isOn("co-vai-gay")} className="body-region">
        <path
          d="M72 88 C88 78 112 78 128 88 L126 112 C110 102 90 102 74 112 Z"
          fill="var(--color-crimson-400)"
        />
      </g>
      <g id="region-lung-eo" data-active={isOn("lung-eo")} className="body-region">
        <path
          d="M74 150 C90 142 110 142 126 150 L126 200 C110 208 90 208 74 200 Z"
          fill="var(--color-crimson-400)"
        />
      </g>
      <g id="region-tay-chan" data-active={isOn("tay-chan")} className="body-region">
        <circle cx="48" cy="236" r="10" fill="var(--color-crimson-400)" />
        <circle cx="152" cy="236" r="10" fill="var(--color-crimson-400)" />
        <circle cx="80" cy="380" r="10" fill="var(--color-crimson-400)" />
        <circle cx="120" cy="380" r="10" fill="var(--color-crimson-400)" />
      </g>
      <g id="region-toan-than" data-active={isOn("toan-than")} className="body-region">
        <path
          d="M74 92 C70 130 68 170 74 210 C80 240 120 240 126 210 C132 170 130 130 126 92 C112 82 88 82 74 92 Z"
          fill="var(--color-gold-400)"
        />
      </g>
    </svg>
  );
}
