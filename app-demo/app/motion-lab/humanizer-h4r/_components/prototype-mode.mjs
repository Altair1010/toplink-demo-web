/**
 * Tùy chọn hiển thị chỉ phục vụ prototype H4R. Blind mode luôn loại control nội bộ.
 *
 * @param {string} search
 * @returns {{
 *   captureMode: "grayscale" | "calibrated" | "blind" | "no-evidence",
 *   showSpecimenControls: boolean,
 * }}
 */
export function readPrototypeOptions(search) {
  const params = new URLSearchParams(search);
  const mode = params.get("mode");
  const captureMode =
    mode === "calibrated" || mode === "blind" || mode === "no-evidence" ? mode : "grayscale";

  return {
    captureMode,
    showSpecimenControls: captureMode !== "blind" && params.get("specimen") === "1",
  };
}
