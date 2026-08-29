# 09 — H7.1 Contact Deferral Decision

## Record

- id: `DEC-H7-CONTACT-DEFER-01`;
- phase: `H7.1`;
- status: `APPROVED / LOCKED`;
- approver: human owner;
- date: `2026-08-29`.

## Scope

This decision governs one thing only: whether the missing exact Zalo destination and the missing
exact Facebook Page destination block the public release. It does not change product scope, route
graph, runtime source, evidence policy or design authority.

## Decision

The exact Zalo URL and the exact Facebook Page URL are **intentionally deferred**. They are
**non-blocking post-release configuration**, not release blockers.

Consequently the H7 gate result

`PASS — TECHNICALLY RELEASE READY / BLOCKED BY RELEASE INPUT`

becomes

`PASS — FINAL RELEASE READY`

provided every technical and runtime gate remains valid.

## Hard invariant

`PENDING != FAKE.`

Until approved destinations are supplied, the public surface must keep zero of each:

- guessed `href`;
- `href="#"` presented as a working action;
- fabricated account or profile identity;
- search-result URL standing in for an official channel;
- simulated contact success or delivery state;
- invented response-time or availability promise.

The current truthful non-link contact state — channel type named, destination openly absent — is
approved for public demo deployment.

## Evidence

`05_H7_CONTACT_AND_RELEASE_INPUT_GATE.md` searched the workspace production/config files and the
approved brand profile and found no approved `zalo.me`, `facebook.com`, `fb.com` or `m.me`
destination. Historical mock material and personal/guessed identities were rejected. Fake URL count
is `0`.

## Alternatives rejected

- publish a guessed or search URL — violates the hard invariant;
- render `href="#"` so the control looks live — a false affordance;
- hold the entire release until an operational source responds — blocks a verified-correct surface
  on content that is independently patchable after deployment.

## Affected surfaces

Homepage human-contact handoff and `/lien-he`. Both already render the truthful non-link state; no
runtime change is required by this decision.

## Reversal cost

Low. Supplying a verified destination is an additive content patch: add the real link, run
`npm run verify`, commit, push `main`, let GitHub Pages deploy, then smoke-test the link. No
Humanizer phase reopening is required.

## Remaining register

- blocking release inputs: **NONE**;
- non-blocking post-release configuration: exact Zalo URL; exact Facebook Page URL;
- M3P people/place/process/service evidence: **DEFERRED TO ADMIN**;
- official brand font, logo and digital palette: still unlocked;
- booking: **RETIRED**;
- M4: **DEPRECATED — REMOVED FROM TARGET PRODUCT**.
