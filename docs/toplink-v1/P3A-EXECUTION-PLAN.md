# P3A Art-Direction Sprint Execution Plan

> **Execution mode:** one Codex agent, one active route, bounded browser evidence loop.

**Goal:** create three materially distinct, product-true Toplink art-direction worlds on the same
representative content, prove them in desktop/mobile browsers, and stop at the human direction gate.

**Architecture:** keep all comparison UI in a dependency-free static prototype under
`prototypes/toplink-v1/p3-direction-sprint/`. Toplink product/brand contracts own meaning; pinned
Hallmark contributes structural review and pinned Impeccable contributes craft review. Candidate CSS
values remain provisional and never become production design authority.

**Tech stack:** semantic HTML, authored CSS, minimal native JavaScript, local static HTTP server,
Playwright browser capture, Markdown evidence.

**Spec:** current P3A execution prompt plus `execution/PHASE-3-ART-DIRECTION.md`.

## Global constraints

- Base is exactly `c568ff39fd640d383b84c150a3be65d1ac04c9ca`.
- Do not change `app-demo/**`, delete tracked files, add production dependencies or select a winner.
- Use the same content obligations and wording in A/B/C; comparison scaffolds are not production facts.
- Store upstream tools only under ignored `.toplink-tools/upstreams/` at their exact pins.
- Build, batch inspect, make at most one batch correction, confirm once, then stop.
- Do not create authoritative `DESIGN.md`, `TOKENS.md`, `MOTION.md` or structure memory.

## Task 1 — Recover state and pin tools

- [x] Verify clean linked worktree, P2 approval SHA, `origin/main`, P2 WORKSTATE and branch absence.
- [x] Create `design/v1-direction` exactly from the approved P2 SHA.
- [x] Add `/.toplink-tools/` to root `.gitignore` and verify the cache is ignored.
- [x] Fetch Hallmark and Impeccable with the package bootstrap script/fallback; verify exact HEADs.
- [x] Consult only the bounded method surfaces and record them in `design/P3-TOOL-LEDGER.md`.

## Task 2 — Lock comparison inputs and structural mechanisms

- [x] Distill one neutral, source-located representative content pack for all directions.
- [x] Define A/B/C briefs with different composition, morphology, material and motion mechanisms.
- [x] Prove A != B != C in `DIRECTION-DISTINCTNESS-MATRIX.md` before browser implementation.

## Task 3 — Build the isolated browser sprint

- [x] Implement one accessible static harness with direction navigation and semantic page structure.
- [x] Implement A as axial ceremonial restraint with quiet fields and threshold framing.
- [x] Implement B as annotated living-apothecary knowledge system with progressive disclosure.
- [x] Implement C as sequential contemporary procession with compression/release chapters.
- [x] Add service-detail and knowledge-detail morphology probes for every direction.
- [x] Add semantic native/CSS motion and complete reduced-motion fallbacks; do not add GSAP.

## Task 4 — Produce and inspect browser evidence

- [x] Serve the prototype locally and capture first/full home views at 1440 and 375 for A/B/C.
- [x] Sanity-check all directions at 768 and 1280, including overflow, hierarchy and readable order.
- [x] Inspect console, keyboard focus, reduced motion and shared-content invariants.
- [x] Run Hallmark structural and Impeccable craft reviews against source, DOM and screenshots.
- [x] Apply one batch correction only if a fatal truth, accessibility, mobile or template issue exists.
- [x] Run one confirmation capture/check after any correction.

## Task 5 — Assemble the human comparison gate

- [x] Complete audience stress test, motion comparison, blind identity critique and provisional rubric.
- [x] Classify all ten open visual questions without resolving missing evidence by assumption.
- [x] Write the scannable `DIRECTION-COMPARISON.md` with evidence locators and no winner.
- [x] Update SOURCE-REGISTER and WORKSTATE with exactly one next action.
- [x] Verify scope, paths, screenshots, overflow, pins, ignored tools, no app diff/deletion/secrets.
- [x] Run `npm run verify` once from `app-demo`, inspect full diff, commit logically and push branch.

## Plan self-review

- Spec coverage: every P3A exit item maps to Tasks 1–5.
- Scope: static comparison harness only; no production application or final design-system files.
- Placeholders: unknown operational/identity facts explicitly fail closed; no fake values are required.
- Human control: scores remain provisional and the plan ends at direction selection, not P3B.
