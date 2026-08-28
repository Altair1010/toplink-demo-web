"use client";

import { useEffect, useReducer, useRef, useState } from "react";

import { ArrivalExchange } from "./ArrivalExchange";
import { BoundaryExchange } from "./BoundaryExchange";
import { ConsequenceExchange } from "./ConsequenceExchange";
import { INITIAL_H4R_STATE, reduceH4RState } from "./prototype-state.mjs";
import styles from "./h4r-prototype.module.css";

type CaptureMode = "grayscale" | "calibrated" | "blind" | "no-evidence";

function readCaptureMode(): CaptureMode {
  const mode = new URLSearchParams(window.location.search).get("mode");
  return mode === "calibrated" || mode === "blind" || mode === "no-evidence" ? mode : "grayscale";
}

export function H4RPrototype() {
  const [state, dispatch] = useReducer(reduceH4RState, INITIAL_H4R_STATE);
  const [captureMode, setCaptureMode] = useState<CaptureMode>("grayscale");
  const arrivalRef = useRef<HTMLElement | null>(null);
  const boundaryRef = useRef<HTMLElement | null>(null);
  const consequenceRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setCaptureMode(readCaptureMode());
    arrivalRef.current = document.querySelector("#h4r-arrival");
    boundaryRef.current = document.querySelector("#h4r-boundary");
    consequenceRef.current = document.querySelector("#h4r-consequence");
  }, []);

  const moveFocus = (target: HTMLElement | null, headingId: string) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.requestAnimationFrame(() => {
      target?.querySelector<HTMLElement>(`#${headingId}`)?.focus({ preventScroll: true });
    });
  };

  const showBoundary = () => moveFocus(boundaryRef.current, "h4r-boundary-question");
  const showConsequence = () => {
    dispatch({ type: "review" });
    moveFocus(consequenceRef.current, "h4r-consequence-question");
  };
  const editOrientation = () => {
    dispatch({ type: "edit" });
    moveFocus(arrivalRef.current, "h4r-arrival-question");
  };
  const settleConsequence = (
    event: "continueLocal" | "remainUncertain" | "showFailure" | "retry",
  ) => {
    dispatch({ type: event });
    window.requestAnimationFrame(() => {
      consequenceRef.current
        ?.querySelector<HTMLElement>("[data-consequence-response=true]")
        ?.focus({ preventScroll: true });
    });
  };

  return (
    <article
      className={styles.prototype}
      data-h4r-prototype="true"
      data-capture-mode={captureMode}
      data-evidence-state="collapsed-unavailable"
    >
      <div className={styles.prototypeNotice} role="note">
        <span>Prototype nội bộ · H4R</span>
        <strong className={styles.brandName}>Nhịp Hỏi — Đáp Rõ</strong>
        <p data-blind-removable="true">
          Không phải trang đặt lịch. Không gửi dữ liệu. Không dùng bằng chứng giả.
        </p>
      </div>

      <ArrivalExchange
        state={state}
        onToggle={(phrase) => dispatch({ type: "togglePhrase", phrase })}
        onRemove={(phrase) => dispatch({ type: "removePhrase", phrase })}
        onContinue={showBoundary}
      />

      <BoundaryExchange enabled={state.phrases.length > 0} onContinue={showConsequence} />

      <ConsequenceExchange
        state={state}
        onEdit={editOrientation}
        onContinueLocal={() => settleConsequence("continueLocal")}
        onUncertain={() => settleConsequence("remainUncertain")}
        onFailure={() => settleConsequence("showFailure")}
        onRetry={() => settleConsequence("retry")}
      />

      <footer className={styles.prototypeFooter}>
        <p>H4R chỉ kiểm tra một hệ thống hỏi/đáp cục bộ. Migration vẫn đóng băng.</p>
      </footer>
    </article>
  );
}
