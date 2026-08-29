import assert from "node:assert/strict";
import test from "node:test";

import { INITIAL_H4R_STATE, reduceH4RState } from "./prototype-state.mjs";

test("chọn một cụm từ chỉ tạo định hướng, không tự chọn dịch vụ", () => {
  const next = reduceH4RState(INITIAL_H4R_STATE, {
    type: "togglePhrase",
    phrase: "Một vùng đang khó chịu",
  });

  assert.deepEqual(next, {
    stage: "oriented",
    phrases: ["Một vùng đang khó chịu"],
  });
  assert.equal("service" in next, false);
});

test("người dùng có thể bỏ một cụm từ đã chọn", () => {
  const state = {
    stage: "oriented",
    phrases: ["Một vùng đang khó chịu", "Tôi chưa biết nên chọn gì"],
  };

  assert.deepEqual(
    reduceH4RState(state, { type: "removePhrase", phrase: "Một vùng đang khó chịu" }),
    { stage: "oriented", phrases: ["Tôi chưa biết nên chọn gì"] },
  );
});

test("review chỉ mở khi đã có ngôn ngữ do người dùng chọn", () => {
  assert.deepEqual(reduceH4RState(INITIAL_H4R_STATE, { type: "review" }), INITIAL_H4R_STATE);

  const oriented = { stage: "oriented", phrases: ["Tôi muốn hiểu thêm trước"] };
  assert.deepEqual(reduceH4RState(oriented, { type: "review" }), {
    stage: "review",
    phrases: oriented.phrases,
  });
});

test("tiếp tục xem chỉ tạo trạng thái local-only", () => {
  const review = { stage: "review", phrases: ["Tôi chưa biết nên chọn gì"] };

  assert.deepEqual(reduceH4RState(review, { type: "continueLocal" }), {
    stage: "local-only",
    phrases: review.phrases,
  });
});

test("failure có nhánh retry specimen nhưng không tạo confirmed", () => {
  const failure = { stage: "failure", phrases: ["Một vùng đang khó chịu"] };
  const retry = reduceH4RState(failure, { type: "retry" });

  assert.deepEqual(retry, { stage: "retry", phrases: failure.phrases });
  assert.notEqual(retry.stage, "confirmed");
});

test("uncertain là trạng thái ngang hàng và giữ cụm từ", () => {
  const review = { stage: "review", phrases: ["Tôi muốn hiểu thêm trước"] };

  assert.deepEqual(reduceH4RState(review, { type: "remainUncertain" }), {
    stage: "uncertain",
    phrases: review.phrases,
  });
});

test("không thể bỏ qua các điều kiện tiên quyết của hành trình", () => {
  for (const event of [
    { type: "continueLocal" },
    { type: "showFailure" },
    { type: "retry" },
    { type: "remainUncertain" },
  ]) {
    assert.deepEqual(reduceH4RState(INITIAL_H4R_STATE, event), INITIAL_H4R_STATE);
  }
});

test("retry chỉ đi từ failure và local-only/uncertain chỉ đi từ review", () => {
  const phrases = ["Tôi muốn hiểu thêm trước"];
  const oriented = { stage: "oriented", phrases };
  const review = { stage: "review", phrases };

  assert.deepEqual(reduceH4RState(oriented, { type: "retry" }), oriented);
  assert.deepEqual(reduceH4RState(oriented, { type: "continueLocal" }), oriented);
  assert.deepEqual(reduceH4RState(oriented, { type: "remainUncertain" }), oriented);
  assert.deepEqual(reduceH4RState(review, { type: "continueLocal" }), {
    stage: "local-only",
    phrases,
  });
  assert.deepEqual(reduceH4RState(review, { type: "remainUncertain" }), {
    stage: "uncertain",
    phrases,
  });
});
