import type { ReactNode } from "react";

interface ReadingHallProps {
  navigation?: ReactNode;
  children: ReactNode;
}

export function ReadingHall({ navigation, children }: ReadingHallProps) {
  return (
    <article className="reading-hall">
      {navigation ? <aside className="reading-spine">{navigation}</aside> : null}
      <div className="reading-body">{children}</div>
    </article>
  );
}
