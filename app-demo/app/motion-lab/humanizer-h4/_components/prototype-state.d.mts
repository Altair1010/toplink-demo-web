export type PrototypeStage = "request" | "review" | "sending" | "failure" | "uncertainty";

export type PrototypeState = {
  stage: PrototypeStage;
  phrase: string;
};

export type PrototypeEvent =
  | { type: "setPhrase"; phrase: string }
  | { type: "review" }
  | { type: "edit" }
  | { type: "showSending" }
  | { type: "showFailure" }
  | { type: "retry" }
  | { type: "showUncertainty" }
  | { type: "reset" };

export const INITIAL_PROTOTYPE_STATE: Readonly<PrototypeState>;

export function reducePrototypeState(state: PrototypeState, event: PrototypeEvent): PrototypeState;
