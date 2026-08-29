"use client";

import { useReducer, useRef, useState } from "react";

import { HeroCover } from "./HeroCover";
import { ProofIndex } from "./ProofIndex";
import { GuidedAction } from "./GuidedAction";
import { INITIAL_PROTOTYPE_STATE, reducePrototypeState } from "./prototype-state.mjs";
import styles from "./h4-prototype.module.css";

export function H4Prototype() {
  const [state, dispatch] = useReducer(reducePrototypeState, INITIAL_PROTOTYPE_STATE);
  const [unsureEntry, setUnsureEntry] = useState(false);
  const guidedRef = useRef<HTMLDivElement>(null);

  const moveToGuidedOrientation = (fromUnsurePath: boolean) => {
    setUnsureEntry(fromUnsurePath);
    dispatch({ type: "edit" });
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    guidedRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.requestAnimationFrame(() => {
      guidedRef.current?.querySelector<HTMLElement>("#h4-guided-title")?.focus({
        preventScroll: true,
      });
    });
  };

  return (
    <article className={styles.prototype} data-h4-prototype="true">
      <p className={styles.internalBanner} role="note">
        <strong>Prototype nội bộ · H4</strong>
        <span>Không phải trang đặt lịch và không gửi dữ liệu.</span>
      </p>

      <HeroCover
        onShare={() => moveToGuidedOrientation(false)}
        onUnsure={() => moveToGuidedOrientation(true)}
      />
      <ProofIndex />
      <div ref={guidedRef} className={styles.guidedAnchor}>
        <GuidedAction
          state={state}
          dispatch={dispatch}
          unsureEntry={unsureEntry}
          onChoosePhrase={() => setUnsureEntry(false)}
        />
      </div>
    </article>
  );
}
