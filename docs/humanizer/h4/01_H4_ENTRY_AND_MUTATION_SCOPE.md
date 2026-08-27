# 01 — H4 Entry and Mutation Scope

- **Phase:** H4 — Gate-A Prototype
- **Ngày:** 2026-08-27
- **Trạng thái:** `PASS — ISOLATED PROTOTYPE VALIDATED`
- **Gate A:** `APPROVED FOR H4 PROTOTYPE`

## Context Load Report

| Mục                       | Kết quả                                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Canonical phase authority | `FOUNDATION/18_TOPLINK_EXECUTION_BRIEF.md`; H4 = Prototype. Package `ROUTER.md` chỉ định tuyến skill/tool.                               |
| Runtime Truth             | App Router static export; global tokens/skins và legacy `DESIGN.md` đang vận hành; homepage/booking hiện tại không thuộc mutation scope. |
| Target Design Truth       | Gate A chọn B — Hồ Sơ Sống; A/C chỉ có hai import được ghi tại `docs/humanizer/h3/07_H3_GATE_A_DECISION.md`.                             |
| Evidence posture          | H0/H1 vẫn `PARTIAL`; ED-01→ED-09 chưa trở thành real-world Toplink evidence.                                                             |
| Skill route               | `toplink-humanizer-orchestrator → humanizer-art-direction + humanizer-ux-state-review`; browser verification dùng Playwright CLI.        |
| Next decision             | H4 phải pass/fail trên prototype thực tế trước H5 Gate B.                                                                                |

## Mutation boundary

### Được phép

- route `/motion-lab/humanizer-h4/` dưới internal lab hiện có;
- component, state fixture, CSS Module và test chỉ được import bởi route đó;
- screenshot/browser evidence dưới `docs/humanizer/h4/screenshots/`;
- H3 Gate A record, H4 artifacts và cập nhật tối thiểu `HUMANIZER.md`.

### Không được phép

- thay `/`, route sản xuất, navigation hoặc layout behavior;
- thay shared production components hoặc production content;
- thay `tokens.css`, `skins.css`, `DESIGN.md`, booking transport/provider;
- thêm dependency/font/network typography;
- đưa prototype vào navigation hoặc coi nó là migration.

## Exactly three prototype surfaces

1. **H4-S1 — Hero / Cover Record:** B cover record với A warm threshold chỉ tại opening.
2. **H4-S2 — Proof Index:** place, public role/person, process/operating fact dưới dạng evidence slot trống có progressive disclosure.
3. **H4-S3 — Guided Orientation + Action Receipt:** C editable phrase cục bộ, B scope boundary/review/sending/failure/retry/uncertainty specimen và A warm threshold chỉ tại decision.

Không prototype full homepage, service register, production process page hoặc real booking.

## Evidence legend

- **REAL EVIDENCE:** chưa có real-world Toplink item được chấp nhận cho ba surface.
- **REFERENCE EVIDENCE:** Humanizer/H2/H3 grammar; Sen/Triều chỉ giữ lane đã phê duyệt.
- **RUNTIME EVIDENCE:** source hiện tại chứng minh demo và false-success risk, không chứng minh fact kinh doanh.
- **PROPOSED DESIGN:** toàn bộ giá trị màu, type behavior, composition và state specimen của route H4.
- **MISSING EVIDENCE:** ED-01→ED-09; slot phải để trống và có nhãn development rõ.

## Pre-mutation integrity baseline

Trước mutation đã lưu SHA-256 cho `DESIGN.md`, `tokens.css`, `skins.css`, production homepage, `BookingStepper.tsx`, `package.json` và `package-lock.json`. H4 exit review phải so lại cùng tập file.
