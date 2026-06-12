"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ArrowLeft, ArrowRight, Sparkles, PartyPopper } from "lucide-react";
import { NEEDS, SERVICES, BRANCHES } from "@/data/content";

const STEPS = ["Chọn nhu cầu", "Chọn dịch vụ", "Thông tin liên hệ"];

export default function BookingStepper() {
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [letAdvise, setLetAdvise] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", datetime: "", branch: BRANCHES[0].slug, note: "" });

  // Read the optional ?need= query param on the client (static export can't read it server-side).
  useEffect(() => {
    const n = new URLSearchParams(window.location.search).get("need");
    if (n) {
      setNeed(n);
      setStep(1);
    }
  }, []);

  const suggested = need ? SERVICES.filter((s) => s.needs.includes(need)) : SERVICES;

  if (submitted) {
    return (
      <div className="animate-fade-up mx-auto max-w-xl rounded-3xl border border-sand bg-white/70 p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-jade-500/15 text-jade-600">
          <PartyPopper className="h-8 w-8" />
        </div>
        <h2 className="mt-6 font-display text-2xl font-semibold text-clay-700">Cảm ơn chị/anh 🌿</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Toplink đã nhận yêu cầu đặt lịch và sẽ liên hệ xác nhận trong thời gian sớm nhất.
        </p>
        <div className="mt-6 rounded-xl bg-cream/60 p-4 text-left text-sm text-ink-soft">
          <p><span className="font-medium text-ink">Họ tên:</span> {form.name || "—"}</p>
          <p><span className="font-medium text-ink">Điện thoại:</span> {form.phone || "—"}</p>
          <p>
            <span className="font-medium text-ink">Nhu cầu:</span>{" "}
            {NEEDS.find((n) => n.key === need)?.label ?? "Để Toplink tư vấn"}
          </p>
          <p>
            <span className="font-medium text-ink">Dịch vụ:</span>{" "}
            {letAdvise ? "Để Toplink tư vấn" : SERVICES.find((s) => s.slug === service)?.name ?? "—"}
          </p>
        </div>
        <Link href="/" className="mt-7 inline-block rounded-full bg-clay-700 px-6 py-2.5 text-sm font-semibold text-ivory hover:bg-clay-800">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper indicator */}
      <ol className="mb-8 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  i < step
                    ? "bg-jade-500 text-white"
                    : i === step
                    ? "bg-clay-700 text-ivory"
                    : "bg-sand text-ink-soft"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className="mt-1.5 hidden text-xs text-ink-soft sm:block">{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <span className={`mx-2 h-0.5 flex-1 ${i < step ? "bg-jade-500" : "bg-sand"}`} />
            )}
          </li>
        ))}
      </ol>

      <div className="rounded-3xl border border-sand bg-white/70 p-6 shadow-sm sm:p-8">
        {/* STEP 1 */}
        {step === 0 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-2xl font-semibold text-clay-700">Cơ thể chị/anh đang cần gì?</h2>
            <p className="mt-1 text-sm text-ink-soft">Chọn nhu cầu chính để Toplink gợi ý đúng hướng.</p>
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {NEEDS.map((n) => (
                <button
                  key={n.key}
                  onClick={() => setNeed(n.key)}
                  className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                    need === n.key ? "border-clay-700 bg-clay-700 text-ivory" : "border-sand bg-ivory hover:border-gold-400"
                  }`}
                >
                  <span className="mr-1" aria-hidden>{n.emoji}</span>
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-2xl font-semibold text-clay-700">Chọn dịch vụ phù hợp</h2>
            <p className="mt-1 text-sm text-ink-soft">Hoặc để Toplink tư vấn liệu trình cho chị/anh.</p>

            <button
              onClick={() => {
                setLetAdvise(true);
                setService(null);
              }}
              className={`mt-5 flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                letAdvise ? "border-gold-500 bg-gold-500/10" : "border-dashed border-gold-400 bg-gold-500/5 hover:bg-gold-500/10"
              }`}
            >
              <Sparkles className="h-5 w-5 text-gold-600" />
              <span>
                <span className="block font-semibold text-clay-700">Tôi chưa biết chọn dịch vụ nào</span>
                <span className="block text-xs text-ink-soft">Toplink sẽ gọi lại tư vấn liệu trình phù hợp.</span>
              </span>
            </button>

            <div className="mt-4 grid gap-2.5">
              {suggested.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => {
                    setService(s.slug);
                    setLetAdvise(false);
                  }}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                    service === s.slug ? "border-clay-700 bg-clay-50" : "border-sand bg-ivory hover:border-gold-400"
                  }`}
                >
                  <span>
                    <span className="block font-medium text-ink">{s.name}</span>
                    <span className="block text-xs text-ink-soft">{s.duration} · từ {s.priceFrom}</span>
                  </span>
                  {service === s.slug && <Check className="h-5 w-5 text-clay-700" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <div className="animate-fade-up space-y-4">
            <h2 className="font-display text-2xl font-semibold text-clay-700">Thông tin liên hệ</h2>
            <p className="text-sm text-ink-soft">Toplink sẽ gọi lại xác nhận lịch hẹn cho chị/anh.</p>

            <Field label="Họ tên">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nguyễn Văn A"
                className="input"
              />
            </Field>
            <Field label="Số điện thoại">
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="09xx xxx xxx"
                inputMode="tel"
                className="input"
              />
            </Field>
            <Field label="Ngày/giờ mong muốn">
              <input
                type="datetime-local"
                value={form.datetime}
                onChange={(e) => setForm({ ...form, datetime: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Cơ sở muốn đến">
              <select
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                className="input"
              >
                {BRANCHES.map((b) => (
                  <option key={b.slug} value={b.slug}>{b.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Ghi chú thêm (nếu có)">
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                rows={3}
                placeholder="Mô tả tình trạng cơ thể hiện tại..."
                className="input resize-none"
              />
            </Field>
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-7 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-ink-soft hover:text-clay-700"
            >
              <ArrowLeft className="h-4 w-4" /> Quay lại
            </button>
          ) : (
            <span />
          )}

          {step < 2 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={(step === 0 && !need) || (step === 1 && !service && !letAdvise)}
              className="flex items-center gap-1.5 rounded-full bg-clay-700 px-6 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-clay-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Tiếp tục <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              disabled={!form.name || !form.phone}
              className="flex items-center gap-1.5 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-wood-700 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Gửi yêu cầu đặt lịch
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-sand);
          background: var(--color-ivory);
          padding: 0.65rem 0.9rem;
          font-size: 0.95rem;
          color: var(--color-ink);
          outline: none;
        }
        :global(.input:focus) {
          border-color: var(--color-gold-500);
          box-shadow: 0 0 0 3px rgba(193, 154, 46, 0.15);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}
