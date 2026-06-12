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
        <span className="font-script text-2xl tracking-[0.05em] text-gold-700">{eyebrow}</span>
      )}
      <h2 className="mt-2 font-display text-4xl font-black text-crimson-600 sm:text-5xl">{title}</h2>
      {desc && <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-soft">{desc}</p>}
      <div className={`gold-rule mt-5 w-28 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
