import assert from "node:assert/strict";
import test from "node:test";

import { readPrototypeOptions } from "./prototype-mode.mjs";

test("mode không hợp lệ trở về grayscale và không mở control nội bộ", () => {
  assert.deepEqual(readPrototypeOptions("?mode=unknown"), {
    captureMode: "grayscale",
    showSpecimenControls: false,
  });
});

test("control specimen chỉ mở bằng tham số riêng trong mode nhận diện", () => {
  assert.deepEqual(readPrototypeOptions("?mode=calibrated&specimen=1"), {
    captureMode: "calibrated",
    showSpecimenControls: true,
  });
});

test("blind mode luôn ẩn control nội bộ dù URL yêu cầu specimen", () => {
  assert.deepEqual(readPrototypeOptions("?mode=blind&specimen=1"), {
    captureMode: "blind",
    showSpecimenControls: false,
  });
});
