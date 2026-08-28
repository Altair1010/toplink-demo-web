/**
 * @typedef {"idle" | "oriented" | "review" | "local-only" | "failure" | "retry" | "uncertain"} H4RStage
 * @typedef {{ stage: H4RStage, phrases: string[] }} H4RState
 * @typedef {
 *   | { type: "togglePhrase", phrase: string }
 *   | { type: "removePhrase", phrase: string }
 *   | { type: "review" }
 *   | { type: "edit" }
 *   | { type: "continueLocal" }
 *   | { type: "showFailure" }
 *   | { type: "retry" }
 *   | { type: "remainUncertain" }
 *   | { type: "reset" }
 * } H4REvent
 */

/** @type {Readonly<H4RState>} */
export const INITIAL_H4R_STATE = Object.freeze({ stage: "idle", phrases: [] });

/**
 * State cục bộ cho prototype H4R. Không event nào gửi dữ liệu hoặc tạo trạng thái confirmed.
 *
 * @param {H4RState} state
 * @param {H4REvent} event
 * @returns {H4RState}
 */
export function reduceH4RState(state, event) {
  switch (event.type) {
    case "togglePhrase": {
      const exists = state.phrases.includes(event.phrase);
      const phrases = exists
        ? state.phrases.filter((phrase) => phrase !== event.phrase)
        : [...state.phrases, event.phrase];
      return { stage: phrases.length ? "oriented" : "idle", phrases };
    }
    case "removePhrase": {
      const phrases = state.phrases.filter((phrase) => phrase !== event.phrase);
      return { stage: phrases.length ? "oriented" : "idle", phrases };
    }
    case "review":
      return state.phrases.length ? { ...state, stage: "review" } : state;
    case "edit":
      return { ...state, stage: state.phrases.length ? "oriented" : "idle" };
    case "continueLocal":
      return state.stage === "review" ? { ...state, stage: "local-only" } : state;
    case "showFailure":
      return state.stage === "review" ? { ...state, stage: "failure" } : state;
    case "retry":
      return state.stage === "failure" ? { ...state, stage: "retry" } : state;
    case "remainUncertain":
      return state.stage === "review" ? { ...state, stage: "uncertain" } : state;
    case "reset":
      return { stage: "idle", phrases: [] };
    default:
      return state;
  }
}
