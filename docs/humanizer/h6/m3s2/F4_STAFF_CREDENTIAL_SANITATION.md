# M3S-2 F4 — Staff, Credential And Statistics Sanitation

## Decision

- **Authority:** `DEC-H6-CONSOLIDATED-01 / C5.F4`
- **Baseline:** `22faf8ee4095c968cbf3e3bf070f9070b7d36884`
- **Mutation:** true collapse of unverified staff identities, roles, experience and trust statistics
- **Source retained:** no staff or statistic record is promoted from demo data

## Exact diff

`app-demo/app/gioi-thieu/page.tsx` no longer imports or renders `TEAM`, `STATS` or `StatCounter`.
The unsupported “trained staff” core-value claim is replaced with the approved brand behavior of
respecting the user's own consideration and decision.

The `TEAM` and `STATS` exports remain in `app-demo/data/content.ts` pending the zero-consumer M5
audit. This batch changes reachability, not source ownership.

## Verification

- build and TypeScript pass;
- `/gioi-thieu` contains no demo staff name, role, experience or trust statistic;
- the pre-existing route starts at `h2`; F4 introduces no new heading skip and records the missing
  `h1` for the coverage audit rather than silently redesigning the route;
- review/testimonial content remains unchanged for the independent F5 batch;
- metadata-only browser inspection returns HTTP 200 with zero console errors and zero mutating
  requests.

## Rollback

Revert only the F4 commit. Reintroducing the removed claims requires verified staff records and
separate publication authority; rollback is not evidence authority.
