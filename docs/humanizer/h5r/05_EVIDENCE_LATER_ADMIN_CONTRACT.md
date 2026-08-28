# 05 — Evidence-Later and Admin Contract

**Status:** `PROPOSED FOR GATE B-R`

**Nature:** conceptual content/design contract; no CMS, database, auth or backend decision

## Runtime contract

```text
EVIDENCE AVAILABLE AND APPROVED?
             |
       +-----+-----+
       |           |
      YES          NO
       |           |
verified answer   TRUE COLLAPSE
       |           |-- no placeholder
       |           |-- no fake image/fact
       |           |-- no empty frame
       |           `-- no virtue/coming-soon copy
       +-----+-----+
             |
       NARRATIVE CONTINUES
```

Evidence is an optional truthful enhancement, not a structural dependency. The system must remain
coherent, warm, usable and commercially understandable with zero evidence units.

## Future admin evidence record

| Conceptual field         | Contract                                                          |
| ------------------------ | ----------------------------------------------------------------- |
| `EVIDENCE_ID`            | stable content identity                                           |
| `TYPE`                   | `place`, `person`, `process`, `service-fact`, `material`, `other` |
| `PUBLIC_ASSET`           | publishable asset/reference; absent for text-only fact            |
| `PUBLIC_ALT`             | functional alternative text where the asset needs it              |
| `PUBLIC_CAPTION`         | minimum visitor-useful context                                    |
| `SUPPORTED_FACT`         | exact claim the item supports                                     |
| `TOPLINK_RELATIONSHIP`   | verified relation to Toplink                                      |
| `SOURCE / PROVENANCE`    | sufficient origin/custody/source record                           |
| `PUBLICATION_PERMISSION` | permission scope for publication                                  |
| `CONSENT_STATUS`         | required for identifiable people or sensitive context             |
| `REVIEW_OWNER`           | accountable reviewer, not a decorative public badge               |
| `REVIEW_STATUS`          | draft/rejected/approved operational state                         |
| `REVIEWED_AT`            | review timestamp/date when applicable                             |
| `PUBLIC_VISIBILITY`      | fail-closed publication switch                                    |

`PUBLIC_VISIBILITY = true` only when the Toplink relationship is verified, provenance is sufficient,
permission/consent is appropriate and review is approved. Unknown or incomplete fields keep
visibility off. Reference/demo filenames never satisfy these conditions.

## Insertion compatibility

- Zero units: branch collapses and the next valid question follows.
- One unit: insert beside/after the question it answers.
- Multiple units: sequence by visitor question and context-before-detail, not a generic card grid.
- Local media ratio and density may adapt; global visual thesis, type, color, navigation and route
  architecture must not change.

If approved evidence later requires another art direction, surface system or route architecture,
this contract has failed and must return to Gate B-R rather than be patched with novelty.

## Deferred evidence debt register

| ID      | Class                 | Status                                            | Blocks                                                        |
| ------- | --------------------- | ------------------------------------------------- | ------------------------------------------------------------- |
| `DE-01` | PLACE                 | DEFERRED — ADMIN POPULATION AFTER PRIVATE OPENING | named facility/place proof                                    |
| `DE-02` | PERSON / ROLE         | DEFERRED — ADMIN POPULATION AFTER PRIVATE OPENING | staff/role/credential claims                                  |
| `DE-03` | PROCESS / SERVICE     | DEFERRED — ADMIN POPULATION AFTER PRIVATE OPENING | treatment/process photography and operational sequence claims |
| `DE-04` | REVIEWED SERVICE FACT | DEFERRED — ADMIN POPULATION AFTER PRIVATE OPENING | published service/process/scope facts                         |

These are content/reality debt, not design blockers. They may become H7 quality-uplift items. They
remain hard blockers for the specific claims listed above and cannot be discharged by Sen, Triều,
mock content or visual polish.

## Privacy boundary

The contract publishes only the minimum visitor-useful fact. Internal source documents, consent
records, private health information and operational review notes do not become public metadata by
default. This artifact selects no CMS, data model, storage, transport or authentication design.
