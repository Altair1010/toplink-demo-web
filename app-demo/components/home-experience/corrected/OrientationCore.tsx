"use client";

import { useEffect, useRef, useState } from "react";
import ClearBoundary from "./ClearBoundary";
import ConsequenceBeforeAction from "./ConsequenceBeforeAction";
import GuidedOrientation from "./GuidedOrientation";
import OpeningQuestion from "./OpeningQuestion";
import {
  createOrientationState,
  editOrientation,
  removeOrientation,
  restartOrientation,
  reviewOrientation,
  selectOrientationOption,
  stopOrientation,
  writeOrientationSummary,
} from "./orientation-state.mjs";
import type { OrientationOptionId, OrientationState } from "./orientation-state.mjs";

export default function OrientationCore() {
  const [state, setState] = useState<OrientationState>(createOrientationState);
  const hasInteracted = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!hasInteracted.current) return;
    const frame = window.requestAnimationFrame(() => {
      sectionRef.current?.querySelector<HTMLElement>("[data-orientation-focus]")?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [state.stage]);

  const updateState = (nextState: OrientationState) => {
    hasInteracted.current = true;
    setState(nextState);
  };

  const selectOption = (optionId: OrientationOptionId) => {
    updateState(selectOrientationOption(state, optionId));
  };

  const review = () => updateState(reviewOrientation(state));

  return (
    <section
      ref={sectionRef}
      className="hh-orientation"
      aria-labelledby="hh-orientation-title"
      data-humanizer-home="m2a1"
    >
      <OpeningQuestion />
      <GuidedOrientation
        state={state}
        onSelect={selectOption}
        onWrite={(summary) => updateState(writeOrientationSummary(state, summary))}
        onReview={review}
        onRemove={() => updateState(removeOrientation(state))}
      />
      {(state.stage === "editing" || state.stage === "review") && <ClearBoundary />}
      <ConsequenceBeforeAction
        state={state}
        onEdit={() => updateState(editOrientation(state))}
        onRemove={() => updateState(removeOrientation(state))}
        onStop={() => updateState(stopOrientation(state))}
        onRestart={() => updateState(restartOrientation(state))}
      />
    </section>
  );
}
