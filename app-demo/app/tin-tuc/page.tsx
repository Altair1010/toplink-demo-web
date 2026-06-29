import SectionHeader from "@/components/SectionHeader";
import BlogIndex from "@/components/BlogIndex";
import { POSTS } from "@/data/content";

export const metadata = {
  title: "Tin tức",
  description: "Kiến thức sức khỏe và dưỡng sinh Đông y giúp chị/anh chăm sóc cơ thể chủ động mỗi ngày.",
};

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        eyebrow="Tin tức & kiến thức"
        title="Kiến thức sức khỏe & dưỡng sinh"
        desc="Những bài viết giúp chị/anh chăm sóc cơ thể chủ động mỗi ngày."
      />
      <BlogIndex posts={POSTS} />
    </div>
  );
}
