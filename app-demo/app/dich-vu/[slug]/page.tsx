import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Check, AlertTriangle, MessageCircle, ArrowLeft } from "lucide-react";
import BrandVisual from "@/components/BrandVisual";
import { SERVICES, CONTACT } from "@/data/content";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/dich-vu" className="inline-flex items-center gap-1.5 text-base font-medium text-ink-soft hover:text-crimson-600">
        <ArrowLeft className="h-4 w-4" /> Tất cả dịch vụ
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2">
          <span className="rounded-sm bg-gold-500 px-3 py-1 text-sm font-semibold text-wood-700">{service.levelLabel}</span>
          <h1 className="mt-4 text-balance font-display text-3xl leading-tight text-crimson-600 sm:text-4xl">{service.name}</h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">{service.short}</p>

          <div className="mt-8 aspect-[16/9] overflow-hidden frame-gold">
            <BrandVisual variant="crimson" src={service.image ?? "/images/spaces/tang-2-treatment.jpg"} label={service.name} />
          </div>

          <Block title="Ai nên dùng" icon={<Check className="h-5 w-5 text-jade-600" />}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {service.suitableFor.map((x) => (
                <li key={x} className="flex items-start gap-2 text-base text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-jade-500" /> {x}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Cần thận trọng" icon={<AlertTriangle className="h-5 w-5 text-crimson-600" />}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {service.cautions.map((x) => (
                <li key={x} className="flex items-start gap-2 text-base text-ink">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-crimson-600" /> {x}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Quy trình buổi trị liệu">
            <ol className="space-y-3">
              {service.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-crimson-600 text-sm font-semibold text-gold-200">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-base text-ink">{step}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block title="Cảm giác sau buổi trị liệu">
            <p className="border-l-2 border-gold-500 bg-cream p-8 font-display text-2xl italic leading-snug text-ink">“{service.feeling}”</p>
          </Block>

          <p className="mt-8 rounded-md border border-sand bg-cream p-8 text-base leading-relaxed text-ink-soft">
            Lưu ý: Liệu trình hỗ trợ thư giãn, lưu thông khí huyết và cải thiện cảm giác căng mỏi, góp phần cân bằng
            thân · tâm · trí. Không thay thế tư vấn y khoa chuyên môn.
          </p>
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 rounded-md border border-sand bg-cream p-8 shadow-sm">
            <h3 className="font-display text-xl font-black text-crimson-600">{service.name}</h3>
            <dl className="mt-4 space-y-3 text-base">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-ink-soft"><Clock className="h-4 w-4" /> Thời lượng</dt>
                <dd className="font-medium text-ink">{service.duration}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Giá từ</dt>
                <dd className="font-semibold text-crimson-600">{service.priceFrom}</dd>
              </div>
            </dl>
            <Link
              href={`/dat-lich?need=${service.needs[0]}`}
              className="mt-5 block rounded-sm bg-crimson-600 px-[2.1rem] py-[1.05rem] text-center text-[1.2rem] font-semibold text-gold-200 transition-colors hover:bg-crimson-700"
            >
              Đặt lịch dịch vụ này
            </Link>
            <a
              href={CONTACT.zalo}
              className="mt-3 flex items-center justify-center gap-2 rounded-sm border border-gold-500 px-7 py-3.5 text-base font-semibold text-gold-700 transition-colors hover:bg-gold-200"
            >
              <MessageCircle className="h-4 w-4" /> Nhắn Zalo tư vấn
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Block({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="flex items-center gap-2 font-display text-2xl font-black text-crimson-600">
        {icon} {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
