# Source Register — Live V1

| ID      | Source                                                       | Type                         | Authority                         | Allowed use                                              | Status       | Notes                                                            |
| ------- | ------------------------------------------------------------ | ---------------------------- | --------------------------------- | -------------------------------------------------------- | ------------ | ---------------------------------------------------------------- |
| SRC-001 | Current user P1 execution prompt                             | execution authority          | highest for P1                    | P1 scope, evidence, safety, completion and reporting     | ACTIVE       | authorizes P0 → P1 only; stops before P2                         |
| SRC-002 | `docs/toplink-v1/DECISIONS.md`                               | locked decisions             | high                              | all V1 product/architecture/governance decisions         | ACTIVE       | package checksum verified                                        |
| SRC-003 | other files under `docs/toplink-v1/`                         | governing package            | high                              | phase workflow, target contracts, QA and handoff         | ACTIVE       | installed from read-only master v1.0.0                           |
| SRC-004 | Toplink brand dossier under `docs/toplink-v1/sources/brand/` | brand/product                | provisional factual/design source | brand philosophy, voice, safety, later visual extraction | ACTIVE       | current user decisions override conflicts                        |
| SRC-005 | `https://sentaithu.com.vn/` live site                        | authorized website reference | reference-only                    | UI/UX/motion/structure in P1                             | ACTIVE IN P1 | inspected 2026-08-31; live behavior wins planning notes          |
| SRC-006 | `origin/main` at `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`  | legacy code/runtime          | engineering-only                  | salvage, technical history, browser baseline             | ACTIVE       | H7 visual/copy/IA authority deprecated                           |
| SRC-007 | `https://github.com/Altair1010/toplink-demo-web`             | shared Git state             | canonical continuity              | branch/ref verification and future handoff               | ACTIVE       | public at P0 capture                                             |
| SRC-008 | P0 Playwright screenshots/snapshots                          | generated evidence           | baseline-only                     | historical comparison and structure evidence             | ACTIVE       | not a design reference                                           |
| SRC-009 | `docs/toplink-v1/research/sen/EVIDENCE-INDEX.md`             | generated live evidence      | observational reference-only      | seven Sen morphologies at four widths                    | ACTIVE IN P1 | 60 PNGs; research only, not production assets                    |
| SRC-010 | P1 browser computed-style/state probes                       | ephemeral measured evidence  | observational reference-only      | motion duration/state/reduced-motion findings            | ACTIVE IN P1 | distilled into `MOTION-GENOME.md`; raw probes remain in `F:\tmp` |

Facts not present in an approved source remain `PENDING`; they are not placeholders and must not be
invented.

## Exact Sen URL set used in P1

- `https://sentaithu.com.vn/`
- `https://sentaithu.com.vn/gioi-thieu/`
- `https://sentaithu.com.vn/he-thong/`
- `https://sentaithu.com.vn/tin-tuc/`
- `https://sentaithu.com.vn/uu-dai-chuong-trinh-cham-soc-suc-khoe-chu-dong/`
- `https://sentaithu.com.vn/lien-he/` (inspected; same form morphology, not duplicated)
- `https://sentaithu.com.vn/dat-lich/`
- `https://sentaithu.com.vn/bang-gia-sen-tai-thu-1992/`
- `https://sentaithu.com.vn/nhuong-quyen/` (inspected; excluded from V1 corpus)
