export type OrientationStage = "idle" | "editing" | "review" | "stopped";
export type OrientationOptionId = "body-area" | "visit-understanding" | "not-sure" | "other";

export interface OrientationOption {
  readonly id: OrientationOptionId;
  readonly label: string;
  readonly kind: "ordinary" | "uncertain" | "other";
}

export interface OrientationState {
  stage: OrientationStage;
  optionId: OrientationOptionId | null;
  originalText: string;
  summary: string;
  error: string | null;
}

export const MAX_ORIENTATION_LENGTH: number;
export const ORIENTATION_OPTIONS: readonly OrientationOption[];

export function createOrientationState(): OrientationState;
export function selectOrientationOption(
  state: OrientationState,
  optionId: OrientationOptionId,
): OrientationState;
export function writeOrientationSummary(state: OrientationState, summary: string): OrientationState;
export function reviewOrientation(state: OrientationState): OrientationState;
export function editOrientation(state: OrientationState): OrientationState;
export function removeOrientation(state?: OrientationState): OrientationState;
export function stopOrientation(state?: OrientationState): OrientationState;
export function restartOrientation(state?: OrientationState): OrientationState;
