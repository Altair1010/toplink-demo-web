"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ArrowLeft, ArrowRight, Sparkles } from "@/components/Glyph";
import { gsap, registerAdvanced } from "@/lib/motion/scrollTrigger";
import { breathFlow } from "@/lib/motion/config";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { NEEDS, SERVICES } from "@/data/content";
import { Action } from "@/components/booking/Action";

const STEPS = ["Chọn nhu cầu", "Chọn dịch vụ", "Xem lại"];

type LocalState = "editing" | "review" | "uncertain" | "stopped";

export default function BookingStepper() {
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [letAdvise, setLetAdvise] = useState(false);
  const [localState, setLocalState] = useState<LocalState>("editing");
  const stateHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasChangedStateRef = useRef(false);

  const serviceLabel = letAdvise
    ? "Chưa chọn dịch vụ"
    : (SERVICES.find((s) => s.slug === service)?.name ?? "Chưa chọn");
  const needLabel = NEEDS.find((n) => n.key === need)?.label ?? "Chưa chọn";

  // Read the optional ?need= query param on the client (static export can't read it server-side).
  useEffect(() => {
    const n = new URLSearchParams(window.location.search).get("need");
    if (n) {
      setNeed(n);
      setStep(1);
    }
  }, []);

  useEffect(() => {
    if (!hasChangedStateRef.current) return;
    const frame = window.requestAnimationFrame(() => stateHeadingRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [step, localState]);

  const suggested = need ? SERVICES.filter((s) => s.needs.includes(need)) : SERVICES;

  const moveToStep = (nextStep: number) => {
    hasChangedStateRef.current = true;
    setLocalState(nextStep === 2 ? "review" : "editing");
    setStep(nextStep);
  };

  const stopFlow = () => {
    hasChangedStateRef.current = true;
    setNeed(null);
    setService(null);
    setLetAdvise(false);
    setLocalState("stopped");
  };

  const startAgain = () => {
    hasChangedStateRef.current = true;
    setStep(0);
    setLocalState("editing");
  };

  if (localState === "stopped") {
    return (
      <div className="animate-fade-up mx-auto max-w-xl rounded-lg border border-sand bg-cream p-8 text-center shadow-sm sm:p-12">
        <h2
          ref={stateHeadingRef}
          tabIndex={-1}
          className="font-display text-3xl font-bold text-crimson-600 outline-none"
        >
          Chị/anh đã dừng tại đây
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">
          Các lựa chọn vừa xem đã được xoá khỏi trang. Chưa có yêu cầu nào được gửi đi.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Action
            purpose="advance"
            onClick={startAgain}
            className="h-auto rounded-sm bg-crimson-600 px-7 py-3 text-base font-semibold text-gold-200 hover:bg-crimson-700"
          >
            Bắt đầu lại
          </Action>
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
            <h2
              ref={stateHeadingRef}
              tabIndex={-1}
              className="font-display text-3xl font-bold text-crimson-600 outline-none"
            >
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
            <h2
              ref={stateHeadingRef}
              tabIndex={-1}
              className="font-display text-3xl font-bold text-crimson-600 outline-none"
            >
              Chọn dịch vụ phù hợp
            </h2>
            <p className="mt-1 text-base text-ink-soft">
              Nếu chưa chắc, chị/anh có thể giữ lựa chọn mở và dừng ở bước xem lại.
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
                  Không cần chọn dịch vụ để tiếp tục xem lại.
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
          <div className="animate-fade-up">
            <h2
              ref={stateHeadingRef}
              tabIndex={-1}
              className="font-display text-3xl font-bold text-crimson-600 outline-none"
            >
              Xem lại điều chị/anh đang quan tâm
            </h2>
            <dl className="mt-5 space-y-3 rounded-md border border-sand bg-ivory p-5 text-base">
              <div>
                <dt className="font-medium text-ink">Nhu cầu đã chọn</dt>
                <dd className="mt-1 text-ink-soft">{needLabel}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink">Dịch vụ</dt>
                <dd className="mt-1 text-ink-soft">{serviceLabel}</dd>
              </div>
            </dl>

            <div className="mt-6 border-l-4 border-crimson-600 pl-5">
              <p className="text-xl font-semibold leading-relaxed text-ink" role="status">
                Thông tin này mới chỉ đang được xem lại trên trang. Chưa có yêu cầu nào được gửi đi.
              </p>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">
                Chị/anh có thể chỉnh lại, giữ nguyên sự chưa chắc chắn hoặc dừng và xoá các lựa
                chọn.
              </p>
            </div>

            {localState === "uncertain" && (
              <p
                className="mt-5 rounded-md bg-ivory p-4 text-base leading-relaxed text-ink-soft"
                role="status"
              >
                Chị/anh chưa cần quyết định dịch vụ lúc này. Các lựa chọn vẫn chỉ ở trên trang và sẽ
                được xoá khi dừng hoặc tải lại.
              </p>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Action
                purpose="back"
                onClick={() => moveToStep(1)}
                className="h-auto justify-center rounded-sm border border-crimson-600 px-6 py-3 text-base font-semibold text-crimson-600 hover:bg-crimson-50"
              >
                <ArrowLeft className="h-4 w-4" /> Chỉnh lại
              </Action>
              <Action
                purpose="back"
                onClick={() => {
                  hasChangedStateRef.current = true;
                  setLetAdvise(true);
                  setService(null);
                  setLocalState("uncertain");
                }}
                className="h-auto justify-center rounded-sm border border-sand bg-ivory px-6 py-3 text-base font-semibold text-ink hover:border-gold-400"
              >
                Tôi vẫn chưa chắc
              </Action>
              <Action
                purpose="back"
                onClick={stopFlow}
                className="h-auto justify-center rounded-sm px-6 py-3 text-base font-medium text-ink-soft hover:bg-transparent hover:text-crimson-600"
              >
                Dừng và xoá thông tin
              </Action>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-7 flex items-center justify-between">
          {step > 0 && step < 2 ? (
            <Action
              purpose="back"
              onClick={() => moveToStep(step - 1)}
              className="h-auto gap-1.5 rounded-sm px-7 py-3 text-base font-medium text-ink-soft hover:bg-transparent hover:text-crimson-600"
            >
              <ArrowLeft className="h-4 w-4" /> Quay lại
            </Action>
          ) : (
            <span />
          )}

          {step < 2 && (
            <Action
              purpose="advance"
              onClick={() => moveToStep(step + 1)}
              disabled={(step === 0 && !need) || (step === 1 && !service && !letAdvise)}
              className="btn-press h-auto gap-1.5 rounded-sm bg-crimson-600 px-[2.1rem] py-[0.9rem] text-[1.2rem] font-semibold text-gold-200 hover:bg-crimson-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Tiếp tục <ArrowRight className="h-4 w-4" />
            </Action>
          )}
        </div>
      </div>
    </div>
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
