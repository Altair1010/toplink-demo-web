# 03 — Corrected Semantic Token Model

- **Status:** `PROPOSED FOR GATE B-R`
- **Audit base:** the exact 45 roles locked historically by `DEC-H5-GB-01`
- **Runtime aliases/values:** not decided here

The audit classifies every historical role once. It produces **41 active conceptual public roles**
after two source roles merge into one and three operational roles remain private/deferred. This is
not a command to create 41 CSS variables; Migration Gate-R must derive the exact alias/consumer map.

| Historical role               | Disposition       | Corrected role / rationale                                                            |
| ----------------------------- | ----------------- | ------------------------------------------------------------------------------------- |
| `surface.canvas`              | KEEP              | page ground                                                                           |
| `surface.paper`               | RENAME            | `surface.reading`; reading is the job, paper is not the identity                      |
| `surface.paper-raised`        | RENAME            | `surface.response`; distinguishes a bounded answer without simulated material         |
| `surface.threshold`           | MERGE             | joins `surface.decision` as `surface.attention`                                       |
| `surface.decision`            | MERGE             | joins `surface.threshold`; one bounded attention/action relation avoids color theatre |
| `surface.evidence-neutral`    | RENAME            | `surface.evidence`; contextual verified answer, never a placeholder                   |
| `text.primary`                | KEEP              | main reading                                                                          |
| `text.secondary`              | KEEP              | supporting explanation                                                                |
| `text.muted`                  | KEEP              | optional readable context                                                             |
| `text.inverse`                | KEEP              | contrast on dark/attention surface                                                    |
| `text.action`                 | KEEP              | identifiable action text                                                              |
| `text.provenance`             | RENAME            | `text.context`; only visitor-useful source/role/update context                        |
| `rule.subtle`                 | KEEP              | related-item separation without card chrome                                           |
| `rule.structural`             | KEEP              | real hierarchy                                                                        |
| `rule.evidence`               | RENAME            | `rule.context`; binds answer to relevant caption/context, not “proof styling”         |
| `rule.focus`                  | KEEP              | visible keyboard focus                                                                |
| `rule.boundary`               | KEEP              | scope/uncertainty limit with text, never color-only                                   |
| `action.primary`              | KEEP              | one truthful next step                                                                |
| `action.secondary`            | KEEP              | valid peer/no-choice route                                                            |
| `action.quiet`                | KEEP              | edit/remove/back/disclosure                                                           |
| `action.danger`               | COMPONENT-PRIVATE | only when a real destructive action exists; not a global identity role                |
| `action.disabled`             | KEEP              | unavailable action with understandable reason                                         |
| `state.selected`              | KEEP              | editable selected choice                                                              |
| `state.focus`                 | KEEP              | focus state relationship                                                              |
| `state.pending`               | DEFER             | public only when a real operation exists                                              |
| `state.error`                 | KEEP              | specific failure + recovery                                                           |
| `state.uncertain`             | KEEP              | first-class unresolved state                                                          |
| `state.confirmed-future`      | DEFER             | prohibited until transport and receiving handoff are proven                           |
| `space.reading`               | KEEP              | readable continuity                                                                   |
| `space.chapter`               | KEEP              | unequal major transition                                                              |
| `space.evidence-interruption` | RENAME            | `space.evidence`; contextual pause for an approved answer                             |
| `space.compact-record`        | RENAME            | `space.compact`; related facts/scope without record metaphor                          |
| `space.action-receipt`        | RENAME            | `space.consequence`; state, edit/recovery and action grouping                         |
| `type.hero`                   | KEEP              | bounded opening question/thought                                                      |
| `type.chapter`                | KEEP              | chapter relation                                                                      |
| `type.heading`                | KEEP              | direct answer/primitive heading                                                       |
| `type.body`                   | KEEP              | primary Vietnamese reading                                                            |
| `type.body-strong`            | KEEP              | meaningful emphasis                                                                   |
| `type.utility`                | KEEP              | restrained helper/navigation/form text                                                |
| `type.metadata`               | RENAME            | `type.context`; useful public context, not metadata density                           |
| `type.action`                 | KEEP              | verb/consequence-first controls                                                       |
| `motion.KHAI`                 | KEEP              | answer/possibility becomes available                                                  |
| `motion.DAN`                  | KEEP              | attention moves to next meaningful relation                                           |
| `motion.TU`                   | KEEP              | selected language gathers into a clear summary                                        |
| `motion.AN`                   | KEEP              | state/consequence settles                                                             |

## Disposition count

| Disposition                  |  Count |
| ---------------------------- | -----: |
| KEEP                         |     31 |
| RENAME                       |      9 |
| MERGE                        |      2 |
| REMOVE                       |      0 |
| COMPONENT-PRIVATE / DEFER    |      3 |
| **Historical roles audited** | **45** |

## Role rules

- A semantic role exists only for a reusable user, content, state, evidence or accessibility job.
- Renaming does not authorize values or aliases. Raw palette, duration, radius, shadow and
  breakpoint primitives remain private.
- `surface.attention` may support a bounded choice/focus/action event; it is not a new brand field.
- Evidence roles may have zero consumers while evidence is absent. They do not justify empty UI.
- `state.pending` and confirmation become public only when a real operation and consequences exist.
- Exact count, CSS names, legacy consumers and skin relationships are Migration Gate-R work.
