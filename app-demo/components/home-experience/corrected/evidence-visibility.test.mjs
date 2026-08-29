import test from "node:test";
import assert from "node:assert/strict";

import { selectVisibleEvidence } from "./evidence-visibility.mjs";

const approved = {
  id: "ev-01",
  question: "Điều gì giúp tôi hiểu giới hạn của phần này?",
  answer: "Một câu trả lời đã được duyệt.",
  context: "Bối cảnh công khai tối thiểu.",
  reviewStatus: "approved",
};

test("0 record trả về tập rỗng để production collapse", () => {
  assert.deepEqual(selectVisibleEvidence([]), []);
});

test("1 approved fixture được hiển thị với nguyên nội dung", () => {
  assert.deepEqual(selectVisibleEvidence([approved]), [approved]);
});

test("multiple approved fixtures giữ thứ tự câu hỏi, không tự xếp hạng", () => {
  const second = {
    ...approved,
    id: "ev-02",
    question: "Câu hỏi thứ hai",
    answer: "Câu trả lời thứ hai",
  };

  assert.deepEqual(
    selectVisibleEvidence([approved, second]).map(({ id }) => id),
    ["ev-01", "ev-02"],
  );
});

test("revoked và unapproved fixtures đều fail closed", () => {
  const revoked = { ...approved, id: "ev-revoked", revoked: true };
  const unapproved = { ...approved, id: "ev-draft", reviewStatus: "unreviewed" };

  assert.deepEqual(selectVisibleEvidence([revoked, unapproved]), []);
});
