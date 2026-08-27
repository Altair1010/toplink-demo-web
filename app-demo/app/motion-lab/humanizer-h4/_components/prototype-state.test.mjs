import test from "node:test";
import assert from "node:assert/strict";

import { INITIAL_PROTOTYPE_STATE, reducePrototypeState } from "./prototype-state.mjs";

test("không chuyển sang review khi cụm từ còn trống", () => {
  const next = reducePrototypeState(INITIAL_PROTOTYPE_STATE, { type: "review" });

  assert.deepEqual(next, INITIAL_PROTOTYPE_STATE);
});

test("giữ đúng cụm từ người dùng khi chuyển sang review", () => {
  const selected = reducePrototypeState(INITIAL_PROTOTYPE_STATE, {
    type: "setPhrase",
    phrase: "Cổ vai gáy đang căng",
  });
  const reviewed = reducePrototypeState(selected, { type: "review" });

  assert.deepEqual(reviewed, {
    stage: "review",
    phrase: "Cổ vai gáy đang căng",
  });
});

test("retry từ failure quay lại sending specimen mà không mất cụm từ", () => {
  const failure = {
    stage: "failure",
    phrase: "Lưng eo khó chịu",
  };

  assert.deepEqual(reducePrototypeState(failure, { type: "retry" }), {
    stage: "sending",
    phrase: "Lưng eo khó chịu",
  });
});

test("nhánh uncertainty không tạo trạng thái confirmed", () => {
  const sending = {
    stage: "sending",
    phrase: "Khó ngủ",
  };

  assert.deepEqual(reducePrototypeState(sending, { type: "showUncertainty" }), {
    stage: "uncertainty",
    phrase: "Khó ngủ",
  });
});

test("reset xóa phrase và trở lại request", () => {
  const uncertainty = {
    stage: "uncertainty",
    phrase: "Điều khác cần trao đổi",
  };

  assert.deepEqual(reducePrototypeState(uncertainty, { type: "reset" }), {
    stage: "request",
    phrase: "",
  });
});
