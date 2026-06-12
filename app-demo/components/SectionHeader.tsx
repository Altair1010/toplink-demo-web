export default function SectionHeader({
  eyebrow,
  title,
  desc,
  center,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">{eyebrow}</span>
      )}
      <h2 className="mt-2 font-display text-3xl font-semibold text-clay-700 sm:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-base leading-relaxed text-ink-soft">{desc}</p>}
      <div className={`gold-rule mt-5 w-24 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
