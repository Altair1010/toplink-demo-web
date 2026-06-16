import Link from "next/link";
import Img from "@/components/Img";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, UserRound } from "lucide-react";
import { POSTS } from "@/data/content";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} · Y Viện Toplink` : "Tin tức · Y Viện Toplink",
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

      <span className="mt-6 block text-sm font-bold uppercase tracking-[0.15em] text-crimson-600">{post.cat}</span>
      <h1 className="mt-2 text-balance text-3xl leading-tight text-crimson-600 sm:text-4xl">{post.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-base text-ink-mute">
        <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {formatDate(post.date)}</span>
        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
        {post.author && <span className="flex items-center gap-1.5"><UserRound className="h-4 w-4" /> {post.author}</span>}
      </div>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden frame-gold">
        <Img src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
      </div>

      <article className="mt-8 space-y-5">
        <p className="border-l-4 border-gold-500 bg-cream p-6 text-xl leading-relaxed text-ink">
          {post.excerpt}
        </p>
        {post.body.map((para, i) => (
          <p key={i} className="text-lg leading-[1.85] text-ink">{para}</p>
        ))}
      </article>

      <p className="mt-8 rounded-md border border-sand bg-cream p-6 text-base leading-relaxed text-ink-soft">
        Lưu ý: Nội dung mang tính chia sẻ kiến thức dưỡng sinh, không thay thế tư vấn y khoa chuyên môn.
      </p>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-black text-crimson-600">Bài viết liên quan</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <Link key={p.slug} href={`/tin-tuc/${p.slug}`} className="lift group flex overflow-hidden rounded-md border border-sand bg-cream">
                <div className="relative w-28 shrink-0 overflow-hidden">
                  <Img src={p.image} alt={p.title} fill sizes="112px" className="object-cover" />
                </div>
                <div className="flex-1 p-5">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-gold-600">{p.cat}</span>
                  <h3 className="mt-1 text-lg leading-snug text-crimson-600 group-hover:text-crimson-700">{p.title}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-crimson-600">
                    Đọc tiếp <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
