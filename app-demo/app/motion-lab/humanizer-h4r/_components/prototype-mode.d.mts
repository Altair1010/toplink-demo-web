export type CaptureMode = "grayscale" | "calibrated" | "blind" | "no-evidence";

export type PrototypeOptions = {
  captureMode: CaptureMode;
  showSpecimenControls: boolean;
};

export function readPrototypeOptions(search: string): PrototypeOptions;
