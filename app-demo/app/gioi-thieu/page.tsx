import Link from "next/link";
import Img from "@/components/Img";
import SectionHeader from "@/components/SectionHeader";
import { Leaf, Target, Eye, Heart } from "lucide-react";
import { ConvergeItem } from "@/components/ConvergeOnScroll";
import WindLeafField from "@/components/motion/WindLeafField";
import SplitReveal from "@/components/motion/SplitReveal";
import { TEAM } from "@/data/content";

export const metadata = {
  title: "Giới thiệu · Y Viện Toplink",
  description:
    "Y Viện Toplink · Dưỡng Thân, Tỉnh Thức. Sứ mệnh, triết lý dưỡng sinh và đội ngũ chuyên viên chăm sóc sức khỏe cá nhân hóa.",
};

const HERO_IMAGES = [
  { src: "/images/spaces/tang-1-tinh.jpg", from: "left" as const, dist: 280 },
  { src: "/images/spaces/tang-3-duong.jpg", from: "up" as const, dist: 200 },
  { src: "/images/spaces/tang-4-tinh.jpg", from: "right" as const, dist: 280 },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <WindLeafField preset="ambient" />
      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Giới thiệu"
          title="Y Viện Dưỡng Thân · Tỉnh Thức"
          desc="Toplink kết hợp Đông y dưỡng sinh, lý liệu trị liệu và công nghệ cao để chăm sóc sức khỏe một cách cá nhân hóa và có chiều sâu."
        />

        {/* HERO converge — ba khối không gian trôi về giữa khi cuộn (kỹ thuật Dropbox) */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {HERO_IMAGES.map((im, i) => (
            <ConvergeItem
              key={im.src}
              from={im.from}
              dist={im.dist}
              className={`aspect-[3/4] overflow-hidden frame-gold ${i === 1 ? "sm:-mt-6" : "sm:mt-6"}`}
            >
              <div className="relative h-full w-full">
                <Img src={im.src} alt="Không gian Y Viện Toplink" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
            </ConvergeItem>
          ))}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <ConvergeItem from="left" dist={180} className="rounded-md border border-sand bg-cream p-8 shadow-sm">
            <Target className="h-8 w-8 text-gold-600" />
            <h3 className="mt-4 text-2xl font-black text-crimson-600">Sứ mệnh</h3>
            <p className="mt-2 text-lg leading-relaxed text-ink-soft">
              Giúp mỗi người được lắng nghe cơ thể, phục hồi năng lượng và tìm lại sự cân bằng thân · tâm · trí giữa
              nhịp sống hiện đại.
            </p>
          </ConvergeItem>
          <ConvergeItem from="right" dist={180} className="rounded-md border border-sand bg-cream p-8 shadow-sm">
            <Eye className="h-8 w-8 text-gold-600" />
            <h3 className="mt-4 text-2xl font-black text-crimson-600">Tầm nhìn</h3>
            <p className="mt-2 text-lg leading-relaxed text-ink-soft">
              Trở thành hệ thống Y Viện dưỡng sinh được tin cậy, lan tỏa lối sống chăm sóc sức khỏe chủ động.
            </p>
          </ConvergeItem>
        </div>

        <div className="on-dark mt-10 frame-gold bg-crimson-800 p-8 text-ivory sm:p-12">
          <Leaf className="h-10 w-10 text-gold-300" />
          <SplitReveal as="h2" className="mt-4 text-4xl text-gold-200 sm:text-5xl">Triết lý <span className="emph emph-light">dưỡng sinh</span></SplitReveal>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-cream/85">
            Chúng tôi tin rằng cơ thể có khả năng tự cân bằng khi được chăm sóc đúng cách và đủ tĩnh tại. Mỗi liệu
            trình tại Toplink bắt đầu từ việc lắng nghe, không vội vàng, không cam kết quá lời.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-black text-crimson-600">Giá trị cốt lõi</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Heart, t: "Tận tâm", d: "Chăm sóc bằng sự thấu hiểu và tôn trọng." },
              { icon: Leaf, t: "Tự nhiên", d: "Ưu tiên liệu pháp dưỡng sinh an toàn." },
              { icon: Target, t: "Chuyên môn", d: "Kỹ thuật viên được đào tạo bài bản." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-md border border-sand bg-cream p-8">
                <Icon className="h-7 w-7 text-crimson-600" />
                <h3 className="mt-3 text-xl font-black text-crimson-600">{t}</h3>
                <p className="mt-1 text-base text-ink-soft">{d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-3xl font-black text-crimson-600">Đội ngũ chuyên viên</h2>
          <p className="mt-2 text-lg text-ink-soft">Lương y và kỹ thuật viên được đào tạo bài bản, đồng hành cùng chị/anh trên hành trình dưỡng thân.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {TEAM.map((m) => (
              <div key={m.name} className="flex gap-5 rounded-md border border-sand bg-cream p-6 shadow-sm">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md border border-gold-500/60">
                  <Img src={m.image} alt={m.name} fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-crimson-600">{m.name}</h3>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">{m.title}</p>
                  <p className="mt-2 text-base text-ink">{m.expertise}</p>
                  <p className="mt-1 text-base text-ink-soft">{m.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/dat-lich" className="inline-block rounded-sm bg-gold-500 px-7 py-3.5 text-lg font-semibold uppercase tracking-wide text-wood-700 hover:bg-gold-400">
            Đặt lịch trải nghiệm
          </Link>
        </div>
      </div>
    </div>
  );
}
