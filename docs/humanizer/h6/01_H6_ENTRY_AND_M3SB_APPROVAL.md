# 01 — H6 Entry and M3S-B Approval

## Decision

- Decision ID: `DEC-MIGR-H6-M3SB-01`
- Human approval: **M3S-B ONLY — BOOKING FALSE-SUCCESS SANITATION**
- Baseline: `162242c528f38fa581e0e4ba426e7b5df0c4cf23`
- Branch: `main`
- Migration Gate-R: `PASS — PROPOSED FOR HUMAN MIGRATION APPROVAL`
- H6 execution scope: active only for the named M3S-B batch

The approval permits production mutation only in:

- `app-demo/app/dat-lich/page.tsx`
- `app-demo/components/BookingStepper.tsx`

`app-demo/lib/booking.ts` and `app-demo/data/content.ts` were read-only context. No third production
file was required. M3S-1, M0R, M1, M2A0, M2A1, M2B, M3S-2, M3P, M4 and M5 remain unauthorized.

## Runtime finding at entry

The booking owner graph was reproduced in source and browser before mutation:

- `BookingStepper.tsx` owned a hidden Google Form POST and placeholder field mapping;
- when configuration was absent, a 600ms timer still completed the flow;
- when configuration was present, a 1200ms fallback plus hidden form submission completed it;
- the terminal branch used `submitted`, success toast and callback/recipient promises;
- `page.tsx` promised a confirmation call before the visitor entered the flow;
- the browser reached “Y Viện Toplink đã ghi nhận yêu cầu…” without a transport request.

`lib/booking.ts` still contains the historical placeholder configuration but has zero runtime
consumers after M3S-B. It was deliberately not edited because it is outside the approved mutation
scope and cannot be reached from the booking route.

## Batch target

```text
LOCAL CHOICE
    |
    v
LOCAL REVIEW
    |
    v
NO-SEND CONSEQUENCE
    |
    +--> EDIT
    +--> REMAIN UNCERTAIN
    `--> STOP AND CLEAR
```

No transport, recipient, callback, queue, pending state, success state or confirmation semantics are
introduced. M4 remains the only future authority for real booking transport.
