import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import BrandVisual from "@/components/BrandVisual";
import { POSTS } from "@/data/content";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} — Y Viện Toplink` : "Tin tức — Y Viện Toplink",
    description: post?.excerpt,
  };
}

function formatDate(d: string) {
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/tin-tuc" className="inline-flex items-center gap-1.5 text-base font-medium text-ink-soft hover:text-crimson-600">
        <ArrowLeft className="h-4 w-4" /> Tất cả bài viết
      </Link>

      <span className="mt-6 block text-sm font-semibold uppercase tracking-wide text-gold-700">{post.cat}</span>
      <h1 className="mt-2 font-display text-4xl leading-tight text-crimson-600 sm:text-5xl">{post.title}</h1>
      <p className="mt-3 flex items-center gap-1.5 text-base text-ink-soft">
        <CalendarDays className="h-4 w-4" /> {formatDate(post.date)}
      </p>

      <div className="mt-6 aspect-[16/9] overflow-hidden frame-gold">
        <BrandVisual variant="cream" label={post.cat} />
      </div>

      <article className="mt-8 space-y-5">
        <p className="border-l-2 border-gold-500 bg-cream p-6 font-display text-2xl italic leading-snug text-ink">
          {post.excerpt}
        </p>
        {post.body.map((para, i) => (
          <p key={i} className="text-lg leading-relaxed text-ink">{para}</p>
        ))}
      </article>

      <p className="mt-8 rounded-md border border-sand bg-cream p-6 text-base leading-relaxed text-ink-soft">
        Lưu ý: Nội dung mang tính chia sẻ kiến thức dưỡng sinh, không thay thế tư vấn y khoa chuyên môn.
      </p>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-2xl font-black text-crimson-600">Bài viết liên quan</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <Link key={p.slug} href={`/tin-tuc/${p.slug}`} className="group rounded-md border border-sand bg-cream p-6 transition-all hover:border-gold-500">
                <span className="text-sm font-semibold uppercase tracking-wide text-gold-700">{p.cat}</span>
                <h3 className="mt-1 font-display text-xl text-crimson-600 group-hover:text-crimson-700">{p.title}</h3>
                <span className="mt-2 inline-flex items-center gap-1 text-base font-semibold text-gold-700">
                  Đọc tiếp <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
