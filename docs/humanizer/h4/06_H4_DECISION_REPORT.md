# 06 — H4 Decision Report

- **H4 status:** `PASS`
- **Decision status:** `PROTOTYPE VALIDATED IN BOUNDED H4 SCOPE`
- **Production status:** `NOT APPROVED FOR MIGRATION`
- **Next gate:** `H5 — GATE B / SYSTEM LOCK`

## Decision

Ba surface thực tế đủ sức mang Gate A thesis mà không vi phạm evidence, health, trust, UX hoặc accessibility constraints:

1. **Hero / Cover Record:** `PASS`.
2. **Evidence-heavy Proof Index:** `PASS`.
3. **Guided Orientation + Action Receipt:** `PASS`.

Selected spine vẫn là **B — Hồ Sơ Sống**. Import A chỉ còn warm threshold ở HP-01 và HP-07. Import C chỉ còn editable phrase/relationship ở HP-02 và HP-03; receipt đã được tách khỏi rail để boundary này nhìn thấy được.

## Approved runtime facts

- Route cô lập tồn tại tại `/motion-lab/humanizer-h4/` và không nằm trong production navigation.
- Route có đúng ba `data-surface` ở 375/768/1280/1440.
- State reducer không có `confirmed`; route không gửi network request.
- State tests 5/5, TypeScript và browser verification pass.
- Focus continuity và reduced-motion equivalent pass sau correction.
- Sáu screenshot evidence tồn tại dưới `docs/humanizer/h4/screenshots/`.

## Proposed target decisions validated for H5 consideration

- bounded cover/record composition;
- paper/ink field với accountable gaps;
- warm threshold chỉ tại opening/decision;
- sans-first Vietnamese hierarchy;
- guided phrase là intake, không phải diagnosis;
- proof index dùng progressive disclosure;
- action receipt phải nói rõ consequence, failure, retry và uncertainty.

Những điểm này là input cho H5 System Lock, không tự động trở thành production token/component contract.

## Missing evidence remains open

- ED-01 human language;
- ED-02 approved voice/copy;
- ED-03 real Toplink place;
- ED-04 public person/role + consent;
- ED-05 service facts/scope;
- ED-06 booking owner/channel/SLA/provider;
- ED-07 verified process;
- ED-08 verified contact/location;
- ED-09 reviewed health content.

Không gap nào được đóng bằng placeholder, source demo, screenshot prototype hoặc reference website.

## Exit criteria

| Criterion                            | Result                                             |
| ------------------------------------ | -------------------------------------------------- |
| Gate A decision recorded precisely   | `PASS`                                             |
| Isolated prototype exists            | `PASS`                                             |
| Exactly three required surfaces      | `PASS`                                             |
| B spine preserved                    | `PASS`                                             |
| A import bounded HP-01/HP-07         | `PASS`                                             |
| C import bounded HP-02/HP-03         | `PASS`                                             |
| H2 contracts recoverable             | `PASS`                                             |
| Body Signal remains non-diagnostic   | `PASS`                                             |
| Missing evidence explicit            | `PASS`                                             |
| Proof index not administrative       | `PASS`                                             |
| Receipt avoids false certainty       | `PASS`                                             |
| Desktop/mobile screenshot evidence   | `PASS`                                             |
| Keyboard/focus/reduced motion        | `PASS`                                             |
| No Humanizer hard fail               | `PASS`                                             |
| Production surfaces unchanged        | `PASS` — final SHA-256/diff audit matched baseline |
| Tokens/DESIGN/dependencies unchanged | `PASS` — final SHA-256 values matched baseline     |

## H5 boundary

H4 PASS cho phép trình Gate B, không bắt đầu H5 tự động. Gate B cần quyết định riêng về semantic tokens, component/editorial grammar, content voice, interaction language và motion verbs. Nó chưa phải Migration Gate và không cho phép rewrite homepage, tokens, `DESIGN.md` hoặc booking transport.
