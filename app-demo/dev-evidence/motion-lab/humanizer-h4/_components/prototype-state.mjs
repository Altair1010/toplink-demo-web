/**
 * @typedef {"request" | "review" | "sending" | "failure" | "uncertainty"} PrototypeStage
 * @typedef {{ stage: PrototypeStage, phrase: string }} PrototypeState
 * @typedef {
 *   | { type: "setPhrase", phrase: string }
 *   | { type: "review" }
 *   | { type: "edit" }
 *   | { type: "showSending" }
 *   | { type: "showFailure" }
 *   | { type: "retry" }
 *   | { type: "showUncertainty" }
 *   | { type: "reset" }
 * } PrototypeEvent
 */

/** @type {Readonly<PrototypeState>} */
export const INITIAL_PROTOTYPE_STATE = Object.freeze({
  stage: "request",
  phrase: "",
});

/**
 * State model cục bộ cho H4. Không event nào gửi dữ liệu hoặc tạo trạng thái confirmed.
 *
 * @param {PrototypeState} state
 * @param {PrototypeEvent} event
 * @returns {PrototypeState}
 */
export function reducePrototypeState(state, event) {
  switch (event.type) {
    case "setPhrase":
      return { stage: "request", phrase: event.phrase };
    case "review":
      return state.phrase.trim() ? { ...state, stage: "review" } : state;
    case "edit":
      return { ...state, stage: "request" };
    case "showSending":
    case "retry":
      return { ...state, stage: "sending" };
    case "showFailure":
      return { ...state, stage: "failure" };
    case "showUncertainty":
      return { ...state, stage: "uncertainty" };
    case "reset":
      return { stage: "request", phrase: "" };
    default:
      return state;
  }
}
