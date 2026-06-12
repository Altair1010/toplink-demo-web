import { Fragment } from "react";

export default function SectionHeader({
  eyebrow,
  title,
  desc,
  center,
  emphasis,
  dark,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  center?: boolean;
  /** Substring trong title được nhấn bằng italic vàng cùng họ chữ (kỹ thuật taste) */
  emphasis?: string;
  /** Header đặt trên nền tối */
  dark?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className={`font-script text-2xl tracking-[0.05em] ${dark ? "text-gold-300" : "text-gold-700"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-2 font-display text-4xl leading-tight sm:text-5xl ${dark ? "text-gold-200" : "text-crimson-600"}`}>
        {renderEmphasis(title, emphasis, dark)}
      </h2>
      {desc && <p className={`mt-3 max-w-3xl text-lg leading-relaxed ${dark ? "text-cream/80" : "text-ink-soft"}`}>{desc}</p>}
      <div className={`gold-rule mt-5 w-28 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

function renderEmphasis(title: string, emphasis: string | undefined, dark?: boolean) {
  if (!emphasis || !title.includes(emphasis)) return title;
  const [before, after] = title.split(emphasis);
  return (
    <Fragment>
      {before}
      <span className={dark ? "emph emph-light" : "emph"}>{emphasis}</span>
      {after}
    </Fragment>
  );
}
