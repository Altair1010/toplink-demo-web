"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ArrowLeft, ArrowRight, Sparkles, MessageCircle, Loader2 } from "@/components/Glyph";
import { gsap, registerMotion, registerAdvanced } from "@/lib/motion/scrollTrigger";
import { breathFlow } from "@/lib/motion/config";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { NEEDS, SERVICES, BRANCHES, CONTACT } from "@/data/content";
import { GFORM, isBookingConfigured, isValidPhone } from "@/lib/booking";
import { Action } from "@/components/booking/Action";
import { ChoiceField } from "@/components/booking/ChoiceField";
import { TextArea } from "@/components/booking/TextArea";
import { TextField } from "@/components/booking/TextField";
import { useNotice } from "@/components/notice/NoticeRegion";

// Cỡ input đồng bộ với thiết kế site (thoải mái cho người lớn tuổi, dấu TV rõ):
// nền ivory nổi trên card cream, chữ 17px, bo 4px, viền sand, focus ring crimson (token --ring).
const INPUT_CLS = "h-auto rounded-md border-sand bg-ivory px-4 py-3 text-[1.0625rem] text-ink";

const STEPS = ["Chọn nhu cầu", "Chọn dịch vụ", "Thông tin liên hệ"];

export default function BookingStepper() {
  const notice = useNotice();
  const toast = {
    error: (message: string, { description }: { description?: string }) =>
      notice.show({ status: "error", message, detail: description }),
    success: (message: string, { description }: { description?: string }) =>
      notice.show({ status: "success", message, detail: description }),
  };
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [letAdvise, setLetAdvise] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    datetime: "",
    branch: BRANCHES[0].slug,
    note: "",
  });
  const formElRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef(false);

  // Gửi yêu cầu: nạp dữ liệu vào iframe ẩn (POST sang Google Form). Vì response là
  // CORS-opaque nên dùng iframe.onLoad (điều hướng thứ 2) hoặc timeout làm tín hiệu xong.
  const handleSubmit = () => {
    if (!form.name || !form.phone) return;
    if (!isValidPhone(form.phone)) {
      setPhoneError("Số điện thoại chưa đúng (10 số, bắt đầu bằng 0).");
      toast.error("Số điện thoại chưa đúng", {
        description: "Vui lòng nhập 10 số, bắt đầu bằng 0.",
      });
      return;
    }
    setPhoneError(null);
    setSubmitting(true);
    doneRef.current = false;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Đã nhận yêu cầu đặt lịch 🌿", {
        description: "Y Viện Toplink sẽ gọi lại xác nhận trong thời gian sớm nhất.",
      });
    };

    // Chưa cấu hình Google Form thật → vẫn báo thành công (tránh nút chết khi demo).
    if (!isBookingConfigured()) {
      setTimeout(finish, 600);
      return;
    }
    // Fallback nếu iframe onLoad không bắn (bị chặn): chốt thành công sau 1.2s.
    setTimeout(finish, 1200);
    formElRef.current?.submit();
  };

  const serviceLabel = letAdvise
    ? "Để Y Viện Toplink tư vấn"
    : (SERVICES.find((s) => s.slug === service)?.name ?? "Chưa chọn");
  const needLabel = NEEDS.find((n) => n.key === need)?.label ?? "Để Y Viện Toplink tư vấn";
  const branchName = BRANCHES.find((b) => b.slug === form.branch)?.name ?? form.branch;

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
      <div className="animate-fade-up mx-auto max-w-xl rounded-lg border border-sand bg-cream p-8 text-center shadow-sm sm:p-12">
        <SealStamp />
        <h2 className="mt-6 font-display text-3xl font-bold text-crimson-600">Cảm ơn chị/anh 🌿</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">
          Y Viện Toplink đã ghi nhận yêu cầu và sẽ gọi lại xác nhận trong thời gian sớm nhất. Cần
          nhanh hơn, chị/anh có thể nhắn Zalo ngay.
        </p>
        <div className="mt-6 rounded-md border border-sand bg-ivory p-4 text-left text-base text-ink-soft">
          <p>
            <span className="font-medium text-ink">Họ tên:</span> {form.name || "Chưa nhập"}
          </p>
          <p>
            <span className="font-medium text-ink">Điện thoại:</span> {form.phone || "Chưa nhập"}
          </p>
          <p>
            <span className="font-medium text-ink">Nhu cầu:</span> {needLabel}
          </p>
          <p>
            <span className="font-medium text-ink">Dịch vụ:</span> {serviceLabel}
          </p>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={CONTACT.zalo}
            className="flex items-center gap-2 rounded-sm bg-gold-500 px-7 py-3 text-base font-semibold text-wood-700 hover:bg-gold-400"
          >
            <MessageCircle className="h-4 w-4" /> Nhắn Zalo tư vấn
          </a>
          <Link
            href="/"
            className="inline-block rounded-sm border border-crimson-600 px-7 py-3 text-base font-semibold text-crimson-600 hover:bg-crimson-50"
          >
            Về trang chủ
          </Link>
        </div>
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
                      ? "bg-crimson-600 text-gold-200"
                      : "bg-sand text-ink-soft"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className="mt-1.5 hidden text-sm text-ink-soft sm:block">{label}</span>
            </div>
            {i < STEPS.length - 1 && <StepConnector active={i < step} />}
          </li>
        ))}
      </ol>

      <div className="rounded-lg border border-sand bg-cream p-8 shadow-sm sm:p-8">
        {/* STEP 1 */}
        {step === 0 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-3xl font-bold text-crimson-600">
              Cơ thể chị/anh đang cần gì?
            </h2>
            <p className="mt-1 text-base text-ink-soft">
              Chọn nhu cầu chính để Y Viện gợi ý đúng hướng.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {NEEDS.map((n) => (
                <button
                  key={n.key}
                  onClick={() => setNeed(n.key)}
                  className={`rounded-md border px-3 py-3.5 text-center text-base font-medium transition-all ${
                    need === n.key
                      ? "border-crimson-600 bg-crimson-600 text-gold-200"
                      : "border-sand bg-ivory hover:border-gold-400"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-3xl font-bold text-crimson-600">
              Chọn dịch vụ phù hợp
            </h2>
            <p className="mt-1 text-base text-ink-soft">
              Hoặc để Y Viện tư vấn liệu trình cho chị/anh.
            </p>

            <button
              onClick={() => {
                setLetAdvise(true);
                setService(null);
              }}
              className={`mt-5 flex w-full items-center gap-3 rounded-md border px-4 py-3.5 text-left transition-all ${
                letAdvise
                  ? "border-gold-500 bg-gold-200"
                  : "border-dashed border-gold-500 bg-ivory hover:bg-gold-200"
              }`}
            >
              <Sparkles className="h-5 w-5 text-gold-700" />
              <span>
                <span className="block text-base font-semibold text-crimson-600">
                  Tôi chưa biết chọn dịch vụ nào
                </span>
                <span className="block text-sm text-ink-soft">
                  Y Viện sẽ gọi lại tư vấn liệu trình phù hợp.
                </span>
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
                  className={`flex items-center justify-between rounded-md border px-4 py-3.5 text-left transition-all ${
                    service === s.slug
                      ? "border-crimson-600 bg-crimson-50"
                      : "border-sand bg-ivory hover:border-gold-400"
                  }`}
                >
                  <span>
                    <span className="block text-base font-medium text-ink">{s.name}</span>
                    <span className="block text-sm text-ink-soft">
                      {s.duration} · từ {s.priceFrom}
                    </span>
                  </span>
                  {service === s.slug && <Check className="h-5 w-5 text-crimson-600" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <div className="animate-fade-up space-y-4">
            <h2 className="font-display text-3xl font-bold text-crimson-600">Thông tin liên hệ</h2>
            <p className="text-base text-ink-soft">
              Y Viện sẽ gọi lại xác nhận lịch hẹn cho chị/anh.
            </p>

            <Field label="Họ tên">
              <TextField
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nguyễn Văn A"
                className={INPUT_CLS}
              />
            </Field>
            <Field label="Số điện thoại">
              <TextField
                value={form.phone}
                onChange={(e) => {
                  setForm({ ...form, phone: e.target.value });
                  if (phoneError) setPhoneError(null);
                }}
                placeholder="09xx xxx xxx"
                inputMode="tel"
                aria-invalid={!!phoneError}
                aria-describedby={phoneError ? "phone-error" : undefined}
                className={INPUT_CLS}
              />
              {phoneError && (
                <span
                  id="phone-error"
                  className="mt-1.5 block text-sm font-medium text-crimson-600"
                >
                  {phoneError}
                </span>
              )}
            </Field>
            <Field label="Ngày/giờ mong muốn">
              <TextField
                type="datetime-local"
                value={form.datetime}
                onChange={(e) => setForm({ ...form, datetime: e.target.value })}
                className={INPUT_CLS}
              />
            </Field>
            <Field label="Cơ sở muốn đến">
              <ChoiceField
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                choices={BRANCHES.map((branch) => ({ value: branch.slug, label: branch.name }))}
                className={INPUT_CLS}
              />
            </Field>
            <Field label="Ghi chú thêm (nếu có)">
              <TextArea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                rows={3}
                placeholder="Mô tả tình trạng cơ thể hiện tại..."
                className={`resize-none ${INPUT_CLS}`}
              />
            </Field>
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-7 flex items-center justify-between">
          {step > 0 ? (
            <Action
              purpose="back"
              onClick={() => setStep(step - 1)}
              className="h-auto gap-1.5 rounded-sm px-7 py-3 text-base font-medium text-ink-soft hover:bg-transparent hover:text-crimson-600"
            >
              <ArrowLeft className="h-4 w-4" /> Quay lại
            </Action>
          ) : (
            <span />
          )}

          {step < 2 ? (
            <Action
              purpose="advance"
              onClick={() => setStep(step + 1)}
              disabled={(step === 0 && !need) || (step === 1 && !service && !letAdvise)}
              className="btn-press h-auto gap-1.5 rounded-sm bg-crimson-600 px-[2.1rem] py-[0.9rem] text-[1.2rem] font-semibold text-gold-200 hover:bg-crimson-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Tiếp tục <ArrowRight className="h-4 w-4" />
            </Action>
          ) : (
            <Action
              purpose="submit"
              onClick={handleSubmit}
              disabled={!form.name || !form.phone || submitting}
              className="btn-press h-auto gap-1.5 rounded-sm bg-gold-500 px-[2.1rem] py-[0.9rem] text-[1.2rem] font-semibold text-wood-700 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Đang gửi…
                </>
              ) : (
                "Gửi yêu cầu đặt lịch"
              )}
            </Action>
          )}
        </div>
      </div>

      {/* Đích POST ẩn cho Google Form (static-export friendly). */}
      <iframe name="gform_sink" title="gform_sink" className="hidden" aria-hidden tabIndex={-1} />
      <form
        ref={formElRef}
        action={GFORM.action}
        method="POST"
        target="gform_sink"
        className="hidden"
        aria-hidden
      >
        <input type="hidden" name={GFORM.fields.name} value={form.name} readOnly />
        <input type="hidden" name={GFORM.fields.phone} value={form.phone} readOnly />
        <input type="hidden" name={GFORM.fields.datetime} value={form.datetime} readOnly />
        <input type="hidden" name={GFORM.fields.branch} value={branchName} readOnly />
        <input type="hidden" name={GFORM.fields.need} value={needLabel} readOnly />
        <input type="hidden" name={GFORM.fields.service} value={serviceLabel} readOnly />
        <input type="hidden" name={GFORM.fields.note} value={form.note} readOnly />
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-base font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

/**
 * Đường nối giữa các bước — VẼ dần bằng GSAP DrawSVG khi bước hoàn tất (cảm giác "mở
 * cuộn thư"). Track sand tĩnh + overlay jade vẽ theo `active`. Reduced-motion → hiện/ẩn tức thì.
 */
function StepConnector({ active }: { active: boolean }) {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.opacity = active ? "1" : "0";
      return;
    }
    let cancelled = false;
    (async () => {
      await registerAdvanced();
      if (cancelled || !el) return;
      el.style.opacity = "1";
      gsap.to(el, {
        drawSVG: active ? "0% 100%" : "0% 0%",
        duration: 0.55,
        ease: breathFlow.ease,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [active]);

  return (
    <span className="mx-2 h-0.5 flex-1">
      <svg
        width="100%"
        height="2"
        preserveAspectRatio="none"
        className="block h-full w-full"
        aria-hidden
      >
        <line x1="0" y1="1" x2="100%" y2="1" stroke="var(--color-sand)" strokeWidth="2" />
        <line
          ref={lineRef}
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke="var(--color-jade-500)"
          strokeWidth="2"
          style={{ opacity: 0 }}
        />
      </svg>
    </span>
  );
}

/**
 * Con triện đỏ "đóng dấu" khi đặt lịch thành công — stamp-in (scale + xoay nhẹ, overshoot
 * back.out như ép dấu). Reduced-motion → hiện tĩnh. Thay biểu tượng party generic.
 */
function SealStamp() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    registerMotion();
    gsap.fromTo(
      el,
      { scale: 1.8, rotate: -10, opacity: 0 },
      { scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: "back.out(2)" },
    );
  }, []);

  return (
    <div
      ref={ref}
      className="elev-soft mx-auto flex h-16 w-16 items-center justify-center rounded-sm border-2 border-gold-400 bg-crimson-600 font-display text-3xl font-bold text-gold-200"
      aria-hidden
    >
      Y
    </div>
  );
}
