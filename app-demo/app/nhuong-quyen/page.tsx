import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import BrandVisual from "@/components/BrandVisual";
import { FRANCHISE, CONTACT } from "@/data/content";

export const metadata = {
  title: "Nhượng quyền & Hợp tác — Y Viện Toplink",
  description:
    "Hợp tác cùng Y Viện Toplink: hỗ trợ trọn gói set-up, vận hành, đào tạo đội ngũ, sản phẩm và marketing để phát triển mô hình dưỡng sinh.",
};

export default function FranchisePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        eyebrow="Nhượng quyền & Hợp tác"
        title="Cùng phát triển mô hình Y Viện"
        emphasis="Y Viện"
        desc={FRANCHISE.intro}
      />

      <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-sand bg-cream p-8 shadow-sm">
          <Handshake className="h-9 w-9 text-gold-600" />
          <h2 className="mt-4 font-display text-3xl font-black text-crimson-600">Hỗ trợ dành cho đối tác</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {FRANCHISE.supports.map((s) => (
              <div key={s.title} className="border-l-2 border-gold-500 pl-4">
                <h3 className="font-display text-xl text-crimson-600">{s.title}</h3>
                <p className="mt-1 text-base text-ink-soft">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden frame-gold lg:aspect-auto">
          <BrandVisual variant="crimson" label="Hợp tác cùng Toplink" />
        </div>
      </div>

      <div className="on-dark mt-12 flex flex-col items-center gap-4 frame-gold bg-wood-700 p-8 text-center text-ivory sm:p-12">
        <h2 className="font-display text-4xl text-gold-200">Trở thành <span className="emph emph-light">đối tác</span> Toplink</h2>
        <p className="max-w-xl text-lg text-cream/85">Liên hệ để nhận hồ sơ hợp tác và trao đổi chi tiết về mô hình, chi phí và lộ trình triển khai.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/dat-lich" className="flex items-center gap-2 rounded-sm bg-gold-500 px-7 py-3.5 text-base font-semibold text-wood-700 hover:bg-gold-400">
            Đăng ký hợp tác <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`} className="rounded-sm border border-gold-500 px-7 py-3.5 text-base font-semibold text-gold-300 transition-colors hover:bg-gold-500 hover:text-wood-700">
            Gọi {CONTACT.hotline}
          </a>
        </div>
      </div>
    </div>
  );
}
