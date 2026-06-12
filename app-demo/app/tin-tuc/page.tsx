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
          <article key={post.slug} className="group flex flex-col overflow-hidden rounded-md border border-sand bg-cream shadow-sm transition-all hover:-translate-y-1 hover:border-gold-500 hover:shadow-md">
            <div className="aspect-[16/9] border-b border-sand bg-mist">
              <div className="flex h-full items-center justify-center text-sm text-ink-soft/60">Ảnh bài viết</div>
            </div>
            <div className="flex flex-1 flex-col p-8">
              <span className="text-sm font-semibold uppercase tracking-wide text-gold-700">{post.cat}</span>
              <h3 className="mt-2 font-display text-xl font-bold text-crimson-600 group-hover:text-crimson-700">{post.title}</h3>
              <p className="mt-2 flex-1 text-base leading-relaxed text-ink-soft">{post.excerpt}</p>
              <span className="mt-4 rounded-sm text-base font-semibold text-gold-700">Đọc tiếp →</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
