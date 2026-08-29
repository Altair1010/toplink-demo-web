import test from "node:test";
import assert from "node:assert/strict";

import {
  MAX_ORIENTATION_LENGTH,
  ORIENTATION_OPTIONS,
  createOrientationState,
  editOrientation,
  removeOrientation,
  restartOrientation,
  reviewOrientation,
  selectOrientationOption,
  stopOrientation,
  writeOrientationSummary,
} from "./orientation-state.mjs";

test("khởi tạo ở IDLE không mang taxonomy, dịch vụ hay trạng thái gửi", () => {
  const state = createOrientationState();

  assert.deepEqual(state, {
    stage: "idle",
    optionId: null,
    originalText: "",
    summary: "",
    error: null,
  });
  assert.equal("diagnosis" in state, false);
  assert.equal("service" in state, false);
  assert.equal("submitted" in state, false);
  assert.equal("confirmed" in state, false);
});

test("lựa chọn đời thường giữ nguyên câu chữ hiển thị", () => {
  const option = ORIENTATION_OPTIONS.find(({ id }) => id === "body-area");
  const state = selectOrientationOption(createOrientationState(), "body-area");

  assert.equal(state.stage, "editing");
  assert.equal(state.originalText, option.label);
  assert.equal(state.summary, option.label);
});

test("tôi chưa biết là lựa chọn bình đẳng và không sinh gợi ý dịch vụ", () => {
  const state = selectOrientationOption(createOrientationState(), "not-sure");

  assert.equal(state.stage, "editing");
  assert.equal(state.optionId, "not-sure");
  assert.match(state.summary, /chưa biết/i);
  assert.equal("recommendation" in state, false);
});

test("nhánh khác giữ nguyên từ ngữ tiếng Việt do người dùng viết", () => {
  const selected = selectOrientationOption(createOrientationState(), "other");
  const wording = "Tôi khó diễn tả; vai trái nặng hơn vào cuối ngày.";
  const state = writeOrientationSummary(selected, wording);

  assert.equal(state.originalText, "");
  assert.equal(state.summary, wording);
  assert.equal(state.error, null);
});

test("review từ nhánh khác rỗng trả lỗi có thể sửa", () => {
  const selected = selectOrientationOption(createOrientationState(), "other");
  const state = reviewOrientation(selected);

  assert.equal(state.stage, "editing");
  assert.match(state.error, /viết|chia sẻ/i);
});

test("input quá dài không bị cắt âm thầm", () => {
  const selected = selectOrientationOption(createOrientationState(), "other");
  const wording = "ă".repeat(MAX_ORIENTATION_LENGTH + 1);
  const written = writeOrientationSummary(selected, wording);
  const state = reviewOrientation(written);

  assert.equal(state.summary, wording);
  assert.equal(state.stage, "editing");
  assert.match(state.error, new RegExp(String(MAX_ORIENTATION_LENGTH)));
});

test("không lựa chọn thì không thể sang REVIEW", () => {
  const state = reviewOrientation(createOrientationState());

  assert.equal(state.stage, "idle");
  assert.match(state.error, /chọn/i);
});

test("review chỉ đổi trạng thái cục bộ và giữ nguyên câu chữ", () => {
  const selected = selectOrientationOption(createOrientationState(), "visit-understanding");
  const state = reviewOrientation(selected);

  assert.equal(state.stage, "review");
  assert.equal(state.summary, selected.summary);
  assert.equal("pending" in state, false);
  assert.equal("sent" in state, false);
});

test("edit quay lại đúng bản tóm tắt; remove xoá toàn bộ lựa chọn", () => {
  const reviewed = reviewOrientation(
    selectOrientationOption(createOrientationState(), "body-area"),
  );

  assert.equal(editOrientation(reviewed).stage, "editing");
  assert.deepEqual(removeOrientation(reviewed), createOrientationState());
});

test("stop xoá wording và restart trở về IDLE", () => {
  const selected = selectOrientationOption(createOrientationState(), "not-sure");
  const stopped = stopOrientation(selected);

  assert.deepEqual(stopped, {
    stage: "stopped",
    optionId: null,
    originalText: "",
    summary: "",
    error: null,
  });
  assert.deepEqual(restartOrientation(stopped), createOrientationState());
});
