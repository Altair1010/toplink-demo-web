# 03 — Full Reverse Decision Graph

## Reading key

- **Real/runtime:** Toplink evidence or current code supporting the node.
- **Sen / Triều:** lane-pure input actually loaded. `—` means that lane is not authoritative for the question.
- **Humanizer:** governing contract.
- **Lane:** `PASS`, `REFRAME` or `BLOCK`.
- **Frontier:** earliest bounded amendment point; this is not an instruction to edit historical artifacts.

R0 is used when the rebound references have no direct or identified indirect effect. R1 requires an allowed-lane supporting edge. A forbidden visual lane cannot “reinforce” a decision merely because the target rejects it. R2 reframes surviving scope/grammar; R3 changes a bounded contract; R4 invalidates a core approved edge; R5 adds a dependency that blocks an otherwise surviving decision.

## A. Complete reverse graph

```text
MIGRATION
M0 aliases ─ M1 type ─ M2 homepage ─ M3 trust ─ M4 transport ─ M5 cleanup
     ▲           ▲            ▲             ▲            ▲            ▲
     └───────────┴────────────┴──── exact target delta / rollback ─────┘
                                   ▲
                                   │
H5  thesis / 45 roles / 8 primitives / voice / states / motion / a11y
                                   ▲
H4  Cover ─ Proof ─ Guided Phrase ─ Action Receipt prototype evidence
                                   ▲
H3  A ─ B Hồ Sơ Sống ─ C ─ recommendation ─ bounded hybrid ─ Gate A
                                   ▲
H2  IA ─ narrative ─ Body Signal B ─ evidence deps ─ consequence/booking
                                   ▲
H1  J-01 ─ J-02 ─ J-03 ─ J-04 ─ J-05 ─ J-06
                                   ▲
H0  evidence inventory ─ gaps ─ specificity/runtime truth
                    ▲                              ▲
                    │                              │
        SEN STRUCTURAL CONSTRAINT       TRIỀU KNOWLEDGE CONSTRAINT
                    └──────────┬───────────────────┘
                               ▼
                     HUMANIZER SYNTHESIS
                               ▲
                               │
                  TOPLINK REAL / RUNTIME TRUTH
```

## B. Decision dependency DAG

```text
H0-EVIDENCE ──► H1-JOBS ──► H2-NARRATIVE ──► H3-DIRECTION
     │               │              │                │
     │               └── J-06 ──────┼──────┐         │
     │                               │      │         ▼
     └── ED-01..09 ──────────────────┼──────┼────► H4-PROTOTYPE
                                     │      │         │
SEN-STRUCT ──────────────────────────┘      │         ▼
TRIEU-KNOW ─────────────────────────────────┘     H5-SYSTEM
                                                       │
                ┌──────────────────────────────────────┼─────────────┐
                ▼                                      ▼             ▼
          M0/M1 foundation                      M2/M3 content     M4 operation
                │                                      │             │
                └──────────────────────┬───────────────┴─────────────┘
                                       ▼
                                  M5 cleanup
```

## C. Foundation → decision trace graph

```text
S-STRUCT-01/02/05
  └─ orientation → place/people → scope/service → visit → action
       └─ H2 narrative (valid)
            ├─ H5 eight-job system (valid, names need reframe)
            └─ pre-H5.5 M2 partial subset (insufficient as full homepage)

T-KNOW-01/03/04/05
  └─ understand/support split + explanation/provenance grammar
       ├─ H1 J-06 (underrepresented)
       ├─ H2 HP-03/HP-08 (valid but too compact)
       ├─ H5 voice/scope/source contracts (valid)
       └─ H5.5 Knowledge Entry/Detail/Bridge/Review amendment

TRIEU “living medical archive”
  └─ combined thesis/material/composition collision
       ├─ H3/H5 “Hồ Sơ Sống” name                 ┐
       ├─ 680–760 reading measure + paper/ink      ├─► R4 VISUAL/BRAND SPINE
       ├─ vermilion threshold + ruled record rows ┘
       └─ evidence/scope/consequence jobs ───────────► KEEP BEHAVIOR
```

## Major decision-lineage audit

### H0 / H1

| Node ID | Phase / decision          | Parent nodes              | Real/runtime evidence                    | Sen input                           | Triều input                     | Humanizer authority            | Lane purity | Reference delta | Current status         | Post-H5.5 status                           | Earliest reopen frontier | Migration impact                         |
| ------- | ------------------------- | ------------------------- | ---------------------------------------- | ----------------------------------- | ------------------------------- | ------------------------------ | ----------- | --------------- | ---------------------- | ------------------------------------------ | ------------------------ | ---------------------------------------- |
| H0-01   | H0 evidence inventory     | runtime/media/content     | mock header, placeholders, false success | —                                   | —                               | evidence classes               | PASS        | R0              | PARTIAL                | KEEP                                       | none                     | evidence population stays blocked        |
| H0-02   | H0 missing-evidence model | H0-01                     | ED-01→09 absent                          | S-STRUCT-02 reinforces place/people | T-KNOW-10 reinforces review gap | no fabrication                 | PASS        | R1              | OPEN                   | KEEP                                       | none                     | M3/M4 conditions remain                  |
| H0-03   | H0 specificity findings   | H0-01/02                  | generic/other-brand assets, mock claims  | structural trust relation           | authority/provenance caution    | anti-AI/specificity            | PASS        | R1              | APPROVED audit         | KEEP                                       | none                     | sanitation reinforced                    |
| H1-J01  | body concern orientation  | H0-03/runtime Body Signal | current symptom flow                     | orientation before choice           | familiar-language bridge        | user reality + non-diagnosis   | PASS        | R1              | PROPOSED               | KEEP                                       | none                     | M2A supports job                         |
| H1-J02  | “chưa biết chọn gì”       | booking runtime           | explicit branch                          | conversion after orientation        | support path                    | interaction humanity           | PASS        | R1              | PROPOSED               | KEEP                                       | none                     | keep first-class no-choice path          |
| H1-J03  | understand a visit        | process runtime/H0 gap    | authored process only                    | visit expectation relation          | care-detail process grammar     | evidence/consequence           | PASS        | R1              | PROPOSED               | KEEP                                       | none                     | population remains evidence-blocked      |
| H1-J04  | trust place/people        | H0-02/03                  | proof absent/misattributed               | direct structural support           | provenance discipline           | trust system                   | PASS        | R1              | UNVALIDATED            | KEEP                                       | none                     | M2 cannot claim complete trust narrative |
| H1-J05  | reliable handoff          | booking runtime           | false success                            | action/booking continuation         | contact not interruptive        | state/consequence              | PASS        | R1              | PROPOSED               | KEEP                                       | none                     | M4 remains blocked                       |
| H1-J06  | understand term safely    | runtime articles/terms    | `/tin-tuc`, service jargon, FAQ          | —                                   | T-KNOW-01/03/04/05/06           | plain language + health safety | PASS        | R3              | UNVALIDATED/supporting | KEEP; bounded knowledge expansion PROPOSED | H5.5 proposal            | no implementation/authority              |

### H2

| Node ID | Phase / decision            | Parent nodes | Real/runtime evidence                 | Sen input                    | Triều input                 | Humanizer authority        | Lane purity | Reference delta | Current status | Post-H5.5 status                             | Earliest reopen frontier | Migration impact                     |
| ------- | --------------------------- | ------------ | ------------------------------------- | ---------------------------- | --------------------------- | -------------------------- | ----------- | --------------- | -------------- | -------------------------------------------- | ------------------------ | ------------------------------------ |
| H2-01   | semantic homepage narrative | J-01→06      | current homepage is unsafe/incomplete | S-STRUCT-05                  | T-KNOW-01                   | editorial narrative        | PASS        | R2              | APPROVED       | KEEP; knowledge/trust clarification PROPOSED | H5.5 proposal            | M2 future split                      |
| H2-02   | page roles                  | H2-01/jobs   | real routes exist, content mock       | Sen IA relation              | archetypes/knowledge detail | task/page grammar          | PASS        | R2              | APPROVED       | KEEP; knowledge entry/detail PROPOSED        | H5.5 proposal            | later content gate                   |
| H2-03   | Body Signal disposition B   | J-01/J-02    | verdict/match runtime                 | orientation before selection | familiar sign → explanation | non-diagnostic interaction | PASS        | R1              | APPROVED       | KEEP                                         | none                     | M2A retains edited phrase + boundary |
| H2-04   | evidence dependencies       | H0 gaps      | ED-01→09                              | place/people/service proof   | source/reviewer             | evidence system            | PASS        | R1              | APPROVED       | KEEP                                         | none                     | M3/M4 blocked as before              |
| H2-05   | interaction consequence     | J-02/J-05    | false success                         | action after orientation     | contact handoff restraint   | Interaction Humanity       | PASS        | R1              | APPROVED       | KEEP                                         | none                     | review/no-send safe mode valid       |
| H2-06   | booking state contract      | H2-05        | placeholder Google Form/timer         | —                            | —                           | state completeness/privacy | PASS        | R0              | APPROVED       | KEEP                                         | none                     | M4 block reinforced                  |

### H3

| Node ID | Phase / decision   | Parent nodes          | Real/runtime evidence       | Sen input               | Triều input                                                        | Humanizer authority        | Lane purity | Reference delta | Current status      | Post-H5.5 status                                  | Earliest reopen frontier | Migration impact                     |
| ------- | ------------------ | --------------------- | --------------------------- | ----------------------- | ------------------------------------------------------------------ | -------------------------- | ----------- | --------------- | ------------------- | ------------------------------------------------- | ------------------------ | ------------------------------------ |
| H3-A    | Ngưỡng Sơn Mài     | H2                    | runtime crimson/readability | orientation relation    | language bridge only                                               | art-direction challenger   | PASS        | R1              | losing proposal     | KEEP historical                                   | none                     | bounded warm threshold remains valid |
| H3-B    | Hồ Sơ Sống         | H2/H0 false-proof gap | evidence and booking gaps   | trust before conversion | thesis + measure + paper/ink/vermilion + record/provenance overlap | Gate A                     | BLOCK       | R4              | selected spine      | REOPEN visual/brand subtree; keep behavioral jobs | H3-B visual spine        | all visual migration blocked         |
| H3-C    | Dòng Chia Sẻ       | H2 Body Signal B      | user-language interaction   | orientation             | familiar language                                                  | challenger under Humanizer | PASS        | R1              | bounded import      | KEEP                                              | none                     | Guided Intake relation survives      |
| H3-REC  | B recommendation   | A/B/C rubric          | B best repairs runtime gap  | reinforces trust spine  | combined visual collision was not controlled                       | Gate A comparison          | BLOCK       | R4              | APPROVED via Gate A | REOPEN rubric for sanitized B versus A/C          | H3 recommendation        | visual migration blocked             |
| H3-HYB  | bounded A/C hybrid | Gate A                | H4 later validated          | no material new input   | no material new input                                              | explicit Human Gate        | PASS        | R0              | APPROVED            | REASSESS only as descendant of reopened rubric    | H3 visual subtree        | no migration authority               |

### H4

| Node ID | Phase / decision | Parent nodes | Real/runtime evidence | Sen input | Triều input | Humanizer authority | Lane purity | Reference delta | Current status | Post-H5.5 status | Earliest reopen frontier | Migration impact |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| H4-S1 | Cover Record | H3-B + A bound | browser prototype | orientation/arrival | — | H4 prototype contract | REFRAME name | R2 | PASS | KEEP CONTRACT / RENAME Bounded Entry | H5 primitive naming | M2A rename |
| H4-S2 | Proof Index | H3-B/H2 trust | empty honest slots, browser pass | place/people/service relationship | provenance grammar | evidence system | REFRAME | R3 | PASS with dependency | KEEP CONTRACT / RENAME Trust Evidence | H5 primitive naming | M3 names/content model rebase |
| H4-S3a | Guided Phrase | H3-C bound/H2-03 | reducer/browser evidence | orientation | everyday language | non-diagnosis | PASS | R1 | PASS | KEEP | none | M2A valid after ED-02 copy review |
| H4-S3b | Action Receipt | H2-05/06/H3-B | no-send failure/uncertainty states | — | — | state contract | REFRAME name | R0 | PASS | KEEP behavioral evidence; visitor-facing expression subject to retest | H4 visual retest | M2A blocked |
| H4-RES | B-spine prototype result | H4-S1/S2/S3 | 5 tests/browser/screenshots | structural order | inherited archive/provenance composition | H4 Gate | BLOCK | R4 | PASS | RETEST brand/visual independence after H3 correction | H3-B visual spine | visual migration blocked |

### H5

| Node ID | Phase / decision          | Parent nodes        | Real/runtime evidence                 | Sen input                | Triều input                                                | Humanizer authority  | Lane purity | Reference delta | Current status  | Post-H5.5 status                                                           | Earliest reopen frontier | Migration impact             |
| ------- | ------------------------- | ------------------- | ------------------------------------- | ------------------------ | ---------------------------------------------------------- | -------------------- | ----------- | --------------- | --------------- | -------------------------------------------------------------------------- | ------------------------ | ---------------------------- |
| H5-01   | system thesis             | H3-B/H4             | Toplink evidence/consequence gap      | trust sequence           | combined archive visual system                             | Gate B               | BLOCK       | R4              | LOCKED          | REOPEN visual/brand thesis; `Dòng Chăm Sóc Rõ Ràng` is a proposal only     | H3-B visual spine        | visual migration blocked     |
| H5-02   | Hồ Sơ Sống name           | H3-B                | independent functional support exists | —                        | direct semantic collision                                  | Gate B               | REFRAME     | R3              | LOCKED          | REMOVE as target codename; preserve historically                           | H5 name                  | M0/M2 naming rebase          |
| H5-03   | paper/ink dominance       | H4 visual proof     | H4 readable matte field               | no visual authority      | paper/ink + vermilion + ruled record composition collision | Gate A/B             | BLOCK       | R4              | LOCKED behavior | REOPEN material/composition grammar; retain readability constraints only   | H3-B visual spine        | M0/M2 visual targets blocked |
| H5-04   | 45 semantic roles         | H4/system contracts | implementation map                    | —                        | record/provenance naming overlap                           | Gate B               | BLOCK       | R3              | LOCKED roles    | KEEP exact schema; affected map reopens; nine renames proposed             | H3/H5 visual subtree     | M0 blocked                   |
| H5-05   | Be Vietnam Pro sans-first | H4 + runtime        | already loaded/readable               | —                        | —                                                          | Gate B/a11y          | PASS        | R0              | LOCKED          | KEEP independently                                                         | none                     | M1 rationale survives        |
| H5-06   | eight primitives          | H2/H4               | prototype + runtime gaps              | structure relation       | knowledge gap + record-name overlap                        | Gate B               | BLOCK       | R3              | LOCKED          | KEEP jobs; public expression reopens; renames/knowledge contracts proposed | H3/H5 visual subtree     | M2/M3 blocked                |
| H5-07   | evidence grammar          | H0/H4               | missing evidence behavior             | trust proof relation     | provenance discipline                                      | evidence system      | PASS        | R1              | LOCKED          | KEEP                                                                       | none                     | population stays gated       |
| H5-08   | content voice             | H1/H4               | runtime jargon/claims                 | —                        | plain explanation grammar                                  | content voice        | PASS        | R1              | LOCKED          | KEEP + add source-class language                                           | H5 voice appendix        | ED-02/09 review              |
| H5-09   | state contract            | H2/H4               | false success/reducer                 | —                        | contact/lookup boundary                                    | interaction humanity | PASS        | R1              | LOCKED          | KEEP                                                                       | none                     | M2 local/M4 blocked          |
| H5-10   | motion verbs              | H3/H4               | reduced-motion/browser                | structural sequence only | no visual authority                                        | motion semantics     | PASS        | R1              | LOCKED          | KEEP                                                                       | none                     | semantic mapping survives    |
| H5-11   | anti-AI rules             | H0/H3/H4            | generic/mock/runtime risks            | rejects visual copying   | rejects archive cosplay                                    | anti-pattern library | PASS        | R1              | LOCKED          | KEEP; explicitly add metadata fetish                                       | H5 anti-AI appendix      | migration scans add rule     |
| H5-12   | legacy supersession       | H5 target/runtime   | pervasive legacy consumers            | —                        | —                                                          | governance bridge    | PASS        | R0              | LOCKED target   | DEFER mapping until corrected target relocks                               | H3 visual subtree        | M5 zero-consumer gated       |

### Migration

| Node ID     | Phase / decision          | Parent nodes           | Real/runtime evidence                             | Sen input                          | Triều input              | Humanizer authority    | Lane purity            | Reference delta | Current status            | Post-H5.5 status                                                         | Earliest reopen frontier | Migration impact                              |
| ----------- | ------------------------- | ---------------------- | ------------------------------------------------- | ---------------------------------- | ------------------------ | ---------------------- | ---------------------- | --------------- | ------------------------- | ------------------------------------------------------------------------ | ------------------------ | --------------------------------------------- |
| MIG-ALIAS   | 18 global aliases         | H5-04                  | token/skin inventory                              | —                                  | —                        | migration protocol     | PASS                   | R0              | READY proposal            | BLOCK until corrected H5 visual/token target relocks                     | H3 visual subtree        | exact map/count must be regenerated           |
| MIG-M0      | semantic alias foundation | MIG-ALIAS              | one-file visual no-op feasible                    | —                                  | —                        | migration gate         | PASS                   | R0              | READY NOW                 | BLOCK; visual no-op alone cannot validate a conflicted target vocabulary | H3 visual subtree        | no implementation                             |
| MIG-M1      | scoped typography         | H5-05                  | Be Vietnam/Noto counts                            | —                                  | —                        | a11y/migration         | PASS                   | R0              | READY WITH CALIBRATION    | KEEP independently but no batch activation before reapproval             | migration gate           | separate dependency from M0                   |
| MIG-M2      | HP-01/02/03/07 core       | H2/H5                  | current unsafe homepage                           | S-STRUCT-05 challenges omission    | knowledge bridge absent  | narrative/migration    | REFRAME                | R3              | conditional               | SPLIT: M2A orientation/sanitation; M2B narrative completion blocked      | H2/H5 bounded amendment  | not ready as one batch                        |
| MIG-M3S     | trust sanitation          | H0/runtime JSON-LD     | root, service, FAQ and breadcrumb claims observed | —                                  | source/review discipline | no-fabrication         | BLOCK/EXPAND INVENTORY | R3              | root omission conditional | BLOCK until exact claim/path/behavior inventory                          | M3S                      | return to rebuilt gate only                   |
| MIG-M3P     | evidence population       | H5 evidence primitives | ED-01/03/04/05/07/08/09 absent                    | reinforces need                    | reinforces review        | evidence system        | PASS                   | R1              | BLOCKED                   | BLOCKED BY EVIDENCE                                                      | none                     | references cannot unblock                     |
| MIG-M4      | booking transport         | H5 state contract      | ED-06/provider/privacy absent                     | —                                  | —                        | security/state         | PASS                   | R0              | BLOCKED                   | BLOCKED BY ARCHITECTURE + OPERATION + SECURITY + PRIVACY                 | none                     | references cannot unblock                     |
| MIG-M5      | M5A/B/C/D cleanup         | verified consumers     | zero-count not reached                            | —                                  | —                        | migration protocol     | PASS                   | R0              | DEFERRED                  | DEFER; remap only after corrected target                                 | H3 visual subtree        | no cleanup now                                |
| MIG-CRIMSON | threshold calibration     | H5 warm threshold      | current/H4 candidates measured                    | forbidden/no effect                | forbidden/no effect      | H4/Gate A              | BLOCK                  | R0              | M2 calibration            | BLOCK pending independent visual direction                               | H3-B visual spine        | no calibration target                         |
| MIG-NOTO    | Noto strategy             | H5-05                  | 55 sites/26 files                                 | —                                  | —                        | a11y/runtime inventory | PASS                   | R0              | retirement deferred       | KEEP independently                                                       | none                     | M1 scoped; M5B zero-consumer                  |
| MIG-HOME    | homepage target mapping   | H2/H5                  | exact legacy graph                                | Sen sequence challenges partiality | bounded knowledge gap    | narrative/migration    | REFRAME                | R3              | exact conditional map     | PARTIAL REBUILD of plan, not app                                         | H2/H5 amendment          | M2 split; M3/K lanes explicit                 |
| MIG-RB      | rollback logic            | migration protocol     | old path is misleading                            | —                                  | —                        | fail-closed safety     | PASS                   | R0              | approved proposal         | KEEP principle; rebuild units after target relock                        | H3 visual subtree        | never reactivate known inference post-release |

## Reference-delta totals for 49 major nodes

| Delta                  | Count |
| ---------------------- | ----: |
| R0 — No effect         |    14 |
| R1 — Reinforces        |    19 |
| R2 — Reframe           |     3 |
| R3 — Bounded amendment |     8 |
| R4 — Core conflict     |     5 |
| R5 — New blocker       |     0 |

R1 is the largest single class, but five inherited nodes carry the same material H3-B visual/brand conflict. No new evidence blocker is invented: ED-01→09 and architecture/operation/security/privacy blockers already existed.

## D. Earliest reopen frontier graph

```text
H0 evidence ─────────────── KEEP
  ↓
H1 jobs ────────────────── KEEP + J-06 amendment
  ↓
H2 narrative ───────────── KEEP + bounded knowledge/sequence clarification
  ↓
H3 A/B/C behavior contracts ───── KEEP AS INPUT
  └─ FIRST INVALID EDGE: H3-B visual/brand spine
       ├─ living-record thesis
       ├─ paper/ink + vermilion material field
       ├─ 680–760 measure + ruled record composition
       └─ provenance density as identity
  ↓
REOPEN H3 VISUAL SUBTREE ONLY
  ↓
RETEST H4 BRAND/VISUAL INDEPENDENCE
  ↓
REOPEN AFFECTED H5 GATE-B VISUAL/TOKEN SUBTREE
  ├─ target thesis/material/composition
  ├─ semantic names and alias map
  └─ primitive visitor-facing expression
  ↓
PARTIAL REBUILD OF MIGRATION PLAN
```

**Earliest R4 reopen frontier: H3-B VISUAL/BRAND SPINE.** H0–H2 jobs, safety, state and narrative contracts remain valid. H4 behavioral evidence remains useful, but its brand/visual result requires retest after the corrected H3 comparison.

## E. Corrected forward replay graph

```text
TOPLINK REAL / RUNTIME
  + HUMANIZER GOVERNANCE
  + SEN STRUCTURAL CONSTRAINT
  + TRIỀU KNOWLEDGE CONSTRAINT
              │
              ▼
H0 evidence/gaps ── VALID
              ▼
H1 jobs ─────────── VALID; J-06 amendment remains proposed/unvalidated
              ▼
H2 narrative ────── VALID CORE; knowledge bridge remains proposed
              ▼
H3 direction ────── FAIL at B visual/brand independence
              ▼
H4 prototype ────── BEHAVIOR VALID / BRAND RETEST REQUIRED
              ▼
H5 system ───────── BEHAVIORAL CONTRACTS RETAINED;
                    VISUAL/TOKEN SUBTREE REOPENED
              ▼
Migration Gate ──── BLOCK / PARTIAL REBUILD
              ▼
CORRECT H3 VISUAL SUBTREE + H4 RETEST + H5 RELOCK
              ▼
HUMAN REVIEW OF CORRECTED GATES
              ▼
REBUILT MIGRATION GATE
```

Forward replay stops at H3-B. It cannot reach an eligible migration batch until the affected subtree is corrected and reapproved. H6 remains inactive.
