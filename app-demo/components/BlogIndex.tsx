"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Img from "@/components/Img";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";
import type { Post } from "@/data/content";

function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function BlogIndex({ posts }: { posts: Post[] }) {
  const cats = useMemo(() => ["Tất cả", ...Array.from(new Set(posts.map((p) => p.cat)))], [posts]);
  const [active, setActive] = useState("Tất cả");

  const filtered = active === "Tất cả" ? posts : posts.filter((p) => p.cat === active);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div>
      {/* Filter danh mục */}
      <div className="mt-8 flex flex-wrap gap-2.5">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`rounded-full border px-5 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
              active === c
                ? "border-crimson-600 bg-crimson-600 text-gold-200"
                : "border-sand text-ink-soft hover:border-crimson-600 hover:text-crimson-600"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {featured && (
        <Link
          href={`/tin-tuc/${featured.slug}`}
          className="lift group mt-8 grid overflow-hidden rounded-lg border border-sand bg-cream shadow-sm lg:grid-cols-2"
        >
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
            <Img src={featured.image} alt={featured.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="zoom-media object-cover" priority />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="rounded-sm bg-crimson-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold-200">{featured.cat}</span>
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-gold-600">Bài nổi bật</span>
            </div>
            <h2 className="mt-4 text-3xl leading-tight text-crimson-600 sm:text-4xl">{featured.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">{featured.excerpt}</p>
            <div className="mt-5 flex items-center gap-4 text-sm text-ink-mute">
              <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {fmtDate(featured.date)}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {featured.readTime}</span>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-base font-bold uppercase tracking-wide text-crimson-600">
              Đọc bài viết <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/tin-tuc/${post.slug}`}
            className="lift group flex flex-col overflow-hidden rounded-md border border-sand bg-cream shadow-sm"
          >
            <div className="relative aspect-[16/9] overflow-hidden border-b border-sand">
              <Img src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="zoom-media object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-gold-600">{post.cat}</span>
              <h3 className="mt-2 text-xl font-bold leading-snug text-crimson-600 group-hover:text-crimson-700">{post.title}</h3>
              <p className="mt-2 flex-1 text-base leading-relaxed text-ink-soft">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-ink-mute">
                <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {fmtDate(post.date)}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
