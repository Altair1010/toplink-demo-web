export type H4RStage =
  "idle" | "oriented" | "review" | "local-only" | "failure" | "retry" | "uncertain";

export type H4RState = {
  stage: H4RStage;
  phrases: string[];
};

export type H4REvent =
  | { type: "togglePhrase"; phrase: string }
  | { type: "removePhrase"; phrase: string }
  | { type: "review" }
  | { type: "edit" }
  | { type: "continueLocal" }
  | { type: "showFailure" }
  | { type: "retry" }
  | { type: "remainUncertain" }
  | { type: "reset" };

export const INITIAL_H4R_STATE: Readonly<H4RState>;

export function reduceH4RState(state: H4RState, event: H4REvent): H4RState;
