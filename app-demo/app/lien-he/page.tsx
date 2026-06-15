import { Phone, MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { BRANCHES, CONTACT } from "@/data/content";

export const metadata = { title: "Liên hệ — Y Viện Toplink" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        eyebrow="Liên hệ"
        title="Hệ thống cơ sở Y Viện Toplink"
        desc="Chị/anh có thể gọi hotline, nhắn Zalo hoặc ghé trực tiếp các cơ sở của Toplink."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {BRANCHES.map((b) => (
          <div key={b.slug} className="rounded-md border border-sand bg-cream p-8 shadow-sm">
            <h3 className="font-display text-2xl font-black text-crimson-600">{b.name}</h3>
            <ul className="mt-4 space-y-3 text-base text-ink">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" /> {b.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gold-600" />
                <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="hover:text-crimson-600">{b.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold-600" /> {b.hours}
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 rounded-sm bg-crimson-600 px-6 py-3 text-base font-semibold text-gold-200 hover:bg-crimson-700">
                <Phone className="h-5 w-5" /> Gọi ngay
              </a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`} className="flex items-center gap-1.5 rounded-sm border border-crimson-600 px-6 py-3 text-base font-semibold text-crimson-600 hover:bg-crimson-50">
                <Navigation className="h-5 w-5" /> Chỉ đường
              </a>
            </div>
            <div className="mt-5 overflow-hidden rounded-md border border-sand">
              <iframe
                title={`Bản đồ ${b.name}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(b.address)}&output=embed`}
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="on-dark mt-8 flex flex-col items-center gap-4 frame-gold bg-crimson-800 p-8 text-center text-gold-200">
        <h2 className="font-display text-4xl text-gold-200">Cần tư vấn <span className="emph emph-light">nhanh</span>?</h2>
        <p className="text-lg text-cream/85">Nhắn Zalo, đội ngũ Toplink sẽ phản hồi trong giờ làm việc.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={CONTACT.zalo} className="flex items-center gap-2 rounded-sm bg-gold-500 px-7 py-3.5 text-base font-semibold text-wood-700 hover:bg-gold-400">
            <MessageCircle className="h-5 w-5" /> Nhắn Zalo tư vấn
          </a>
          <a href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`} className="rounded-sm border border-gold-500 px-7 py-3.5 text-base font-semibold text-gold-300 transition-colors hover:bg-gold-500 hover:text-wood-700">
            Gọi {CONTACT.hotline}
          </a>
        </div>
      </div>
    </div>
  );
}
