import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { Leaf, Target, Eye, Heart } from "lucide-react";

export const metadata = { title: "Giới thiệu — Y Viện Toplink" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeader
        eyebrow="Giới thiệu"
        title="Y Viện Dưỡng Thân – Tỉnh Thức"
        desc="Toplink kết hợp Đông y dưỡng sinh, lý liệu trị liệu và công nghệ cao để chăm sóc sức khỏe một cách cá nhân hóa và có chiều sâu."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-md border border-sand bg-cream p-8 shadow-sm">
          <Target className="h-8 w-8 text-gold-600" />
          <h3 className="mt-4 font-display text-2xl font-black text-crimson-600">Sứ mệnh</h3>
          <p className="mt-2 text-lg leading-relaxed text-ink-soft">
            Giúp mỗi người được lắng nghe cơ thể, phục hồi năng lượng và tìm lại sự cân bằng thân – tâm – trí giữa
            nhịp sống hiện đại.
          </p>
        </div>
        <div className="rounded-md border border-sand bg-cream p-8 shadow-sm">
          <Eye className="h-8 w-8 text-gold-600" />
          <h3 className="mt-4 font-display text-2xl font-black text-crimson-600">Tầm nhìn</h3>
          <p className="mt-2 text-lg leading-relaxed text-ink-soft">
            Trở thành hệ thống Y Viện dưỡng sinh được tin cậy, lan tỏa lối sống chăm sóc sức khỏe chủ động.
          </p>
        </div>
      </div>

      <div className="on-dark mt-10 frame-gold bg-crimson-800 p-8 text-ivory sm:p-12">
        <Leaf className="h-10 w-10 text-gold-300" />
        <h2 className="mt-4 font-display text-4xl text-gold-200 sm:text-5xl">Triết lý <span className="emph emph-light">dưỡng sinh</span></h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-cream/85">
          Chúng tôi tin rằng cơ thể có khả năng tự cân bằng khi được chăm sóc đúng cách và đủ tĩnh tại. Mỗi liệu
          trình tại Toplink bắt đầu từ việc lắng nghe, không vội vàng, không cam kết quá lời.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-3xl font-black text-crimson-600">Giá trị cốt lõi</h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Heart, t: "Tận tâm", d: "Chăm sóc bằng sự thấu hiểu và tôn trọng." },
            { icon: Leaf, t: "Tự nhiên", d: "Ưu tiên liệu pháp dưỡng sinh an toàn." },
            { icon: Target, t: "Chuyên môn", d: "Kỹ thuật viên được đào tạo bài bản." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-md border border-sand bg-cream p-8">
              <Icon className="h-7 w-7 text-crimson-600" />
              <h3 className="mt-3 font-display text-xl font-black text-crimson-600">{t}</h3>
              <p className="mt-1 text-base text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/dat-lich" className="inline-block rounded-sm bg-gold-500 px-7 py-3.5 text-lg font-semibold text-wood-700 hover:bg-gold-400">
          Đặt lịch trải nghiệm
        </Link>
      </div>
    </div>
  );
}
