import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/Glyph";
import { POSTS } from "@/data/content";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exists = POSTS.some((post) => post.slug === slug);
  return {
    title: exists ? "Nội dung đang được rà soát" : "Nội dung kiến thức",
    description:
      "Nội dung sức khỏe chỉ được công bố sau khi có nguồn và trạng thái review phù hợp.",
  };
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!POSTS.some((post) => post.slug === slug)) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/tin-tuc"
        className="inline-flex min-h-11 items-center gap-1.5 text-base font-medium text-ink-soft hover:text-crimson-600"
      >
        <ArrowLeft className="h-4 w-4" /> Trạng thái nội dung kiến thức
      </Link>

      <span className="mt-8 block text-sm font-semibold uppercase tracking-[0.15em] text-crimson-600">
        Nội dung đang rà soát
      </span>
      <h1 className="mt-2 text-balance font-display text-3xl leading-tight text-crimson-600 sm:text-4xl">
        Bài viết này chưa đủ điều kiện công bố
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">
        Trang giữ lại địa chỉ cũ để không làm đứt liên kết, nhưng không hiển thị tiêu đề, tác giả,
        hình ảnh hay nội dung sức khỏe từ dữ liệu demo.
      </p>

      <section
        className="mt-10 border-l-2 border-gold-500 bg-cream p-8"
        aria-labelledby="article-boundary"
      >
        <h2 id="article-boundary" className="text-2xl font-semibold text-crimson-600">
          Vì sao nội dung được ẩn
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink">
          Một bài viết chỉ được xuất bản khi có nguồn và trạng thái review phù hợp. Hiện chưa có hồ
          sơ được duyệt cho nội dung này.
        </p>
      </section>
    </div>
  );
}
