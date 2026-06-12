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
          <div key={b.slug} className="rounded-2xl border border-sand bg-white/70 p-6 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-clay-700">{b.name}</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" /> {b.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold-600" />
                <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="hover:text-clay-700">{b.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold-600" /> {b.hours}
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 rounded-full bg-clay-700 px-4 py-2 text-sm font-semibold text-ivory hover:bg-clay-800">
                <Phone className="h-4 w-4" /> Gọi ngay
              </a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`} className="flex items-center gap-1.5 rounded-full border border-clay-700 px-4 py-2 text-sm font-semibold text-clay-700 hover:bg-clay-50">
                <Navigation className="h-4 w-4" /> Chỉ đường
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-r from-clay-700 to-wood-700 p-8 text-center text-ivory">
        <h2 className="font-display text-2xl font-semibold">Cần tư vấn nhanh?</h2>
        <p className="text-cream/85">Nhắn Zalo, đội ngũ Toplink sẽ phản hồi trong giờ làm việc.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={CONTACT.zalo} className="flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-wood-700 hover:bg-gold-400">
            <MessageCircle className="h-4 w-4" /> Nhắn Zalo tư vấn
          </a>
          <a href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`} className="rounded-full border border-ivory/40 px-6 py-3 text-sm font-semibold text-ivory hover:bg-ivory/10">
            Gọi {CONTACT.hotline}
          </a>
        </div>
      </div>
    </div>
  );
}
