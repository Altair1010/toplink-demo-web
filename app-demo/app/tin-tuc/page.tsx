import SectionHeader from "@/components/SectionHeader";
import { POSTS } from "@/data/content";

export const metadata = { title: "Tin tức — Y Viện Toplink" };

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        eyebrow="Tin tức & kiến thức"
        title="Kiến thức sức khỏe & dưỡng sinh"
        desc="Những bài viết giúp chị/anh chăm sóc cơ thể chủ động mỗi ngày."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {POSTS.map((post) => (
          <article key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-white/70 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="aspect-[16/9] bg-gradient-to-br from-wood-500/25 to-clay-700/25">
              <div className="flex h-full items-center justify-center text-xs text-ink-soft/60">Ảnh bài viết</div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">{post.cat}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-clay-700 group-hover:text-clay-800">{post.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
              <span className="mt-4 text-sm font-semibold text-gold-600">Đọc tiếp →</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
