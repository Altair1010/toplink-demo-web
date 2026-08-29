# M3S-2 F5 — Review And Testimonial Sanitation

## Decision

- **Authority:** `DEC-H6-CONSOLIDATED-01 / C5.F5`
- **Baseline:** `8b341671cc1e67efdf5edfb41df839f59d94b1fe`
- **Production evidence set:** zero
- **Mutation:** true collapse of the only reachable review/testimonial surface

## Exact diff

`app-demo/app/gioi-thieu/page.tsx` no longer imports or renders `ReviewWall`, its “Những chia sẻ
thật” heading, placeholder media or the unsupported customer-consent statement.

`app-demo/components/ReviewWall.tsx` remains source-only until M5 proves zero runtime, test and
rollback consumers. M3P remains the only authority for future approved evidence population and is
deferred to admin.

## Verification

- build, TypeScript, formatting and token checks pass;
- `/gioi-thieu` contains zero review/testimonial/placeholder nodes and none of the former claims;
- the route remains reachable and its downstream local action remains present;
- metadata-only browser inspection returns HTTP 200 with zero console errors and zero mutating
  requests.

## Rollback

Revert only the F5 commit. Rollback does not authorize publishing placeholders or unapproved
customer evidence.
