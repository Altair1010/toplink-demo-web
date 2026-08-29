export const MAX_ORIENTATION_LENGTH = 240;

export const ORIENTATION_OPTIONS = Object.freeze([
  Object.freeze({
    id: "body-area",
    label: "Một vùng cơ thể đang căng hoặc khó chịu",
    kind: "ordinary",
  }),
  Object.freeze({
    id: "visit-understanding",
    label: "Tôi muốn hiểu một buổi chăm sóc diễn ra thế nào",
    kind: "ordinary",
  }),
  Object.freeze({
    id: "not-sure",
    label: "Tôi chưa biết nên bắt đầu từ đâu",
    kind: "uncertain",
  }),
  Object.freeze({
    id: "other",
    label: "Khác — tôi muốn tự viết",
    kind: "other",
  }),
]);

export function createOrientationState() {
  return {
    stage: "idle",
    optionId: null,
    originalText: "",
    summary: "",
    error: null,
  };
}

export function selectOrientationOption(state, optionId) {
  const option = ORIENTATION_OPTIONS.find(({ id }) => id === optionId);

  if (!option) {
    throw new RangeError(`Lựa chọn định hướng không hợp lệ: ${optionId}`);
  }

  const wording = option.kind === "other" ? "" : option.label;

  return {
    ...state,
    stage: "editing",
    optionId: option.id,
    originalText: wording,
    summary: wording,
    error: null,
  };
}

export function writeOrientationSummary(state, summary) {
  return {
    ...state,
    stage: "editing",
    summary,
    error: null,
  };
}

export function reviewOrientation(state) {
  if (!state.optionId) {
    return {
      ...state,
      error: "Hãy chọn một cách bắt đầu, kể cả khi anh/chị chưa biết.",
    };
  }

  if (!state.summary.trim()) {
    return {
      ...state,
      stage: "editing",
      error: "Hãy viết một câu ngắn về điều anh/chị muốn chia sẻ.",
    };
  }

  if (state.summary.length > MAX_ORIENTATION_LENGTH) {
    return {
      ...state,
      stage: "editing",
      error: `Phần chia sẻ cần ngắn hơn hoặc bằng ${MAX_ORIENTATION_LENGTH} ký tự.`,
    };
  }

  return {
    ...state,
    stage: "review",
    error: null,
  };
}

export function editOrientation(state) {
  return {
    ...state,
    stage: "editing",
    error: null,
  };
}

export function removeOrientation() {
  return createOrientationState();
}

export function stopOrientation() {
  return {
    ...createOrientationState(),
    stage: "stopped",
  };
}

export function restartOrientation() {
  return createOrientationState();
}
