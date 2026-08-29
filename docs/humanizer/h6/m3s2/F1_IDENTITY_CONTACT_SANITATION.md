# M3S-2 F1 — Identity, Branch And Contact Sanitation

## Decision

- **Authority:** `DEC-H6-CONSOLIDATED-01 / C5.F1`
- **Baseline:** `24ae1386363a20b4100d77ae326a57b02d0f3b85`
- **Mutation:** true collapse of every reachable mock branch and contact channel
- **Verified identity retained:** brand name and approved communication behavior only

## Exact diff

- `/lien-he` becomes a truthful availability boundary with no branch, address, phone, hours, map,
  response promise or health FAQ;
- `SiteFooter` removes mock facility/contact columns and links to the local status boundary;
- `MobileBottomBar` removes phone, Zalo and map actions and retains only the local fail-closed need
  review path;
- `FloatingZalo` is removed from the root runtime graph;
- training, franchise, service detail and product cards lose their exact external contact actions.

`CONTACT`, `BRANCHES`, `FloatingZalo` and unreachable legacy homepage consumers remain in source
until M5 proves their zero-consumer and rollback status. F1 does not claim a real contact channel.

## Verification

- build, TypeScript, formatting and token checks pass;
- production source has no reachable `CONTACT` or `BRANCHES` consumer;
- `/lien-he`, footer, mobile bar, training, franchise, service detail and product routes contain no
  telephone, Zalo, email, Facebook, map or invented facility action;
- `/lien-he` has `h1` then `h2`, a truthful continuation, and no empty contact shell;
- the M3S-B browser graph still reaches local review with zero form, submit control, iframe or
  mutating request; no dedicated M3S-B unit test exists in the current repository;
- browser inspection records zero unexpected console errors and zero mutating requests.

## Rollback

Revert only the F1 commit. Restoring an external contact route requires verified operational data
and publication authority; the mock values are not a safe rollback target.
