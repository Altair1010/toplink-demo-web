# 07 — H5 Gate B Report

- **H5 status:** `PASS — PROPOSED FOR GATE B`
- **Decision status:** `PROPOSED FOR GATE B`
- **Gate B:** `AWAITING HUMAN APPROVAL`
- **Production/migration status:** `NOT APPROVED / NOT STARTED`
- **Date:** 2026-08-28

## System thesis

Toplink là một hồ sơ chăm sóc sống, ấm ở đúng ngưỡng và rõ ở mọi giới hạn: người đọc bắt đầu bằng lời đời thường, gặp bằng chứng trước lời mời, rồi chỉ hành động khi hậu quả được nói thật.

## Candidate system summary

| System area          | Gate B proposal                                                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Semantic tokens      | 45 human-facing tokens: surface 6, text 6, rule 5, action 5, state 6, spacing 5, type 8, motion 4.                                                                          |
| Typography           | One existing Vietnamese-safe family: Be Vietnam Pro; roles hero/chapter/heading/body/body-strong/utility/metadata/action; no new dependency.                                |
| Color/material       | Paper/ink dominant; warm crimson behavior rare at HP-01/HP-07 and action/selected emphasis; exact hex deferred to migration calibration; physical motifs wait for evidence. |
| Editorial primitives | Cover Record, Guided Intake, Scope Boundary, Proof Index, Service Scope Register, Visit / Process Record, Action Receipt, Quiet Continuation.                               |
| Content voice        | Professional specificity + plain Vietnamese + calm responsibility + clear limits + visible consequence.                                                                     |
| State language       | Full request/review/send/failure/retry/uncertain/handoff contract; `CONFIRMED` explicitly future-only until real transport + handoff.                                       |
| Motion               | KHAI / DẪN / TỤ / AN systemized with allowed surfaces, reduced-motion parity and forbidden use; GSAP invariant preserved.                                                   |
| Responsive/a11y      | 375/768/1280/1440/200% acceptance rules; DOM=reading order, metadata collapses first, visible focus, keyboard, labels, contrast, reduced motion, 44px target baseline.      |

## Independent critique pass 1 — Design-system coherence

### Critique

| Finding                                                                            | Severity | Correction applied                                                                                                                                         | Re-run result                                                      |
| ---------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Threshold and decision surfaces could create two decorative reds.                  | P2       | `surface.decision` may alias `surface.threshold`; it expresses consequence ownership, not a new palette color. Exact values remain calibration candidates. | `PASS` — semantic role retained without requiring another raw hue. |
| H4 local hex/clamps/timings could be mistaken for final tokens.                    | P1       | Token artifact explicitly classifies current/H4 values as candidate starting points and locks behavior/relationships only.                                 | `PASS` — no prototype literal is promoted automatically.           |
| Proof X-frames, ED labels and archive-like rows could become the visual signature. | P1       | Public evidence grammar now requires render-or-omit/restructure; X-frames, ED codes, stamps and ornamental metadata are forbidden.                         | `PASS` — proof identity comes from real context, not placeholders. |
| A/C imports could spread through the system.                                       | P1       | A is audited only at HP-01/HP-07; C seam ends after HP-03 and before receipt; other A/C traits are explicitly rejected.                                    | `PASS` — B remains the spine.                                      |
| Forty-five tokens could still become an implementation dump.                       | P2       | Each token has one reusable job; raw ramps/radii/shadows/breakpoints stay private and aliases may share values.                                            | `PASS` — count remains within requested 30–45 boundary.            |

### Pass 1 conclusion

**PASS.** The system is one evidence/consequence-led grammar, not a fourth direction or an A/B/C blend. Semantics are stronger than aesthetic naming, and accidental H4 geometry/values are excluded.

## Independent critique pass 2 — UX / content / trust

### Critique

| Finding                                                                           | Severity | Correction applied                                                                                                                                               | Re-run result |
| --------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Record metadata could overpower visitor meaning and make the site administrative. | P1       | Hierarchy locks meaning → boundary/evidence → consequence → optional provenance; public metadata is minimal, ≥16px and collapses before meaning.                 | `PASS`        |
| H4/late-report ED shorthand could mis-map dependencies.                           | P1       | Artifact 01 restores the canonical H2 ED-01→09 register and states later shorthand cannot redefine it.                                                           | `PASS`        |
| Confirmation examples could be copied before the operation exists.                | P0       | `state.confirmed-future` and `CONFIRMED` are future-only; bracketed facts are declared non-publishable; transport + receiving handoff + E2E proof are mandatory. | `PASS`        |
| Familiar phrases could solicit unnecessary private health data.                   | P1       | Guided Intake now requires minimization warning, editable/removable input, explicit transfer/review and no identifying detail without purpose/policy.            | `PASS`        |
| Missing evidence could surface as visitor-facing ED placeholders.                 | P0       | Production rule is render real permitted evidence or omit/restructure/use truthful generic scope; internal codes never render publicly.                          | `PASS`        |
| Health voice could drift into slogans or pseudo-clinical authority.               | P1       | Vietnamese-first examples cover heading/body/boundary/action/uncertainty/evidence/service/error/retry/review/confirmation/FAQ; rejected language is explicit.    | `PASS`        |

### UX/state severity audit

- Unresolved P0 in the **proposal contracts:** none.
- Operational P0 dependencies ED-01→06 remain open and therefore block population/confirmation, not Gate B review of the system grammar.
- No primitive removes the no-choice route, automatic edit/recovery, focus continuity or truthful failure.

### Pass 2 conclusion

**PASS.** Every primitive answers a job and can handle missing evidence honestly. Health uncertainty, state consequence and Vietnamese visitor language are explicit without pretending content has completed ED-02 review.

## Independent critique pass 3 — Engineering / migration

### Critique

| Finding                                                                         | Severity | Correction applied                                                                                                                        | Re-run result |
| ------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Direction B originally proposed new font candidates.                            | P2       | H5 recommends the already-loaded Be Vietnam Pro; no font/dependency change is proposed.                                                   | `PASS`        |
| Semantic migration could tempt a global token rewrite.                          | P1       | Proposed map stages aliases and bounded consumers; raw/legacy aliases remain until consumer count is zero and each batch passes.          | `PASS`        |
| Seasonal skins do not map cleanly to the new semantics yet.                     | P2       | Skin policy and jade roles are deferred; `skins.css` stays untouched pending a later consumer/contrast matrix.                            | `PASS`        |
| Booking state completion could silently select backend/data architecture.       | P0       | Provider, owner, SLA and architecture are outside H5; booking is a separate critical-risk Migration Gate batch with fail-closed rollback. | `PASS`        |
| Legacy art direction and hard invariants could be mixed in supersession.        | P1       | Matrix explicitly classifies engineering invariant, system default and legacy art-direction rule before KEEP/SUPERSEDE/DEFER.             | `PASS`        |
| Motion-system proposal could change engines or duplicate timings in TypeScript. | P1       | GSAP/native-scroll/theme-reader invariants are retained; H5 adds semantic verbs only and defers timing calibration.                       | `PASS`        |

### Pass 3 conclusion

**PASS.** The system maps to the current repository without an architecture change or dependency addition. Migration is substantial but separable, risk-classified, reversible and not authorized by this report.

## Contract re-run

| Contract                                                | Result |
| ------------------------------------------------------- | ------ |
| Gate A B spine preserved                                | `PASS` |
| A warm threshold bounded to HP-01/HP-07                 | `PASS` |
| C editable phrase bounded to HP-02/HP-03                | `PASS` |
| Evidence classes and missing-evidence behavior explicit | `PASS` |
| Eight primitive contracts complete                      | `PASS` |
| Guided orientation non-diagnostic/no-match              | `PASS` |
| Proof index evidence-first/non-bureaucratic             | `PASS` |
| Action receipt states/consequences/recovery complete    | `PASS` |
| Content voice Vietnamese-first with examples            | `PASS` |
| KHAI/DẪN/TỤ/AN complete                                 | `PASS` |
| Responsive/a11y invariants complete                     | `PASS` |
| Anti-AI rules explicit                                  | `PASS` |
| Legacy supersession + proposed migration map complete   | `PASS` |

## H5 exit criteria

| Criterion                                                            | Result | Evidence                                                                    |
| -------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------- |
| Semantic model exists and is not a raw-value dump                    | `PASS` | artifact 03: 45 semantic roles with private primitive layer                 |
| Typography roles coherent                                            | `PASS` | Be Vietnam Pro single-family recommendation; eight roles                    |
| Bounded color/material semantics                                     | `PASS` | paper/ink dominant; exact threshold hex and physical motifs not auto-locked |
| Editorial primitive contracts                                        | `PASS` | artifact 04: eight required contracts and narrative map                     |
| Guided orientation, proof/evidence and booking consequence contracts | `PASS` | artifacts 04–05                                                             |
| Content voice explicit and Vietnamese-first                          | `PASS` | artifact 05 examples and rejection list                                     |
| Motion, responsive and accessibility systems                         | `PASS` | artifacts 02, 03 and 05                                                     |
| Anti-AI rules                                                        | `PASS` | artifact 02 and primitive forbidden-use fields                              |
| Legacy matrix and proposed Migration Map                             | `PASS` | artifact 06                                                                 |
| Production source, tokens, skins, DESIGN and dependencies unchanged  | `PASS` | final Git/hash scope audit for H5 publication                               |
| No architecture mutation                                             | `PASS` | documentation-only diff; map marks booking architecture as later approval   |
| H0/H1 gaps explicit                                                  | `PASS` | canonical ED-01→09 remains open                                             |

## Remaining evidence gaps

H0/H1 remain `PARTIAL — EXTERNAL EVIDENCE REQUIRED`. ED-01→06 P0, ED-07/08 P1 and ED-09 P2 retain their canonical H2 meanings. H5 changes no gap status and introduces no real-world evidence claim.

## Gate B decision required

Gate B may:

1. approve `DEC-H5-GB-01` exactly and record it as the target system;
2. request named revisions while keeping the current proposal status; or
3. reject the proposal and return H5 to system revision.

Until that explicit human decision, this artifact and all H5 contracts remain **`PROPOSED FOR GATE B`**, not `LOCKED`.

## Next only after Gate B approval

`MIGRATION GATE → approve exact current→target delta → H6 Design/Code Loop`

Do not begin Migration or H6 automatically.
