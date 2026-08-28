# 03 — M3S-B Verification and Rollback

## Source assertions

The pre-change assertion failed for the intended reasons: hidden POST, `GFORM`, timeout,
`submitted`/`submitting` and missing no-send/edit/uncertain/stop contracts. The same assertion passed
after the change.

Post-change owner graph:

- `BookingStepper` consumers: one, `app/dat-lich/page.tsx`;
- `lib/booking.ts` consumers: zero;
- hidden POST form: absent;
- placeholder action/field IDs in reachable DOM: absent;
- iframe sink and iframe success callback: absent;
- timer-based terminal transition: absent;
- reachable `submitted`, `pending`, `sent`, `confirmed` or `success`: zero;
- callback/recipient promise in the two approved files: absent;
- decorative/disabled submit affordance: absent.

## Browser and state verification

Playwright CLI exercised initial, need choice, service choice, review, edit, uncertainty, stop,
restart and reload/reset. Results:

| Check                                                                     | Result |
| ------------------------------------------------------------------------- | ------ |
| Consequence appears before terminal actions                               | PASS   |
| Edit returns to service choice and focuses its heading                    | PASS   |
| “Tôi vẫn chưa chắc” is keyboard-activatable and updates the local summary | PASS   |
| Stop clears choices, exposes no-send truth and focuses the stop heading   | PASS   |
| Restart and reload both return to a disabled initial continuation         | PASS   |
| Hidden form / iframe in DOM                                               | 0      |
| Mutating `POST/PUT/PATCH/DELETE` requests through reachable states        | 0      |
| Unexpected console errors                                                 | 0      |

## Responsive / accessibility matrix

| Viewport                                | Overflow | Consequence before action | Minimum route button height | Vietnamese text |
| --------------------------------------- | -------- | ------------------------- | --------------------------- | --------------- |
| 375                                     | PASS     | PASS                      | 48px                        | PASS            |
| 768                                     | PASS     | PASS                      | 48px                        | PASS            |
| 1280                                    | PASS     | PASS                      | 48px                        | PASS            |
| 1440                                    | PASS     | PASS                      | 48px                        | PASS            |
| 200%-equivalent (1280 / 2 = 640 CSS px) | PASS     | PASS                      | ~48px                       | PASS            |

Keyboard order after review-heading focus is `Chỉnh lại → Tôi vẫn chưa chắc → Dừng và xoá thông
tin`. Reduced-motion emulation exposed the same review and no-send content immediately. The
route-owned headings remain two peer `h2` elements as before; M3S-B introduces no heading-level
skip or global shell change.

## Visual review

The intentional visual delta is bounded to the booking body: contact/send/success UI is replaced by
a local review and no-send stopping state. Header, footer, homepage, global type, global color,
tokens, skins and shared production components are unchanged. At 375px all three terminal actions
remain visible when scrolled into view above the fixed mobile navigation.

## Static verification

Final recorded commands and results belong to the batch report:

- `npm run verify` from `app-demo`;
- `git diff --check`;
- exact source/staged-scope scans;
- credential/private-data scan.

## Rollback

**Technical revert boundary:**

- `app-demo/app/dat-lich/page.tsx`
- `app-demo/components/BookingStepper.tsx`

**Safe release fallback:** do not restore the known false-success baseline. If the corrected UI has
a release defect, retain or reduce it to a fail-closed local state that sends nothing. Restoration
of hidden POST, timer success, recipient/callback promises or fake confirmation is not an acceptable
operational recovery.
