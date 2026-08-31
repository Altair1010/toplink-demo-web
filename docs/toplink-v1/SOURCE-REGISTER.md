# Source Register — Live V1

| ID      | Source                                                       | Type                         | Authority                         | Allowed use                                              | Status       | Notes                                                            |
| ------- | ------------------------------------------------------------ | ---------------------------- | --------------------------------- | -------------------------------------------------------- | ------------ | ---------------------------------------------------------------- |
| SRC-001 | Current user P2 execution prompt                             | execution authority          | highest for P2                    | P2 scope, contracts, safety, completion and reporting    | ACTIVE       | authorizes P1 → P2 only; stops before P3                         |
| SRC-002 | `docs/toplink-v1/DECISIONS.md`                               | locked decisions             | high                              | all V1 product/architecture/governance decisions         | ACTIVE       | package checksum verified                                        |
| SRC-003 | other files under `docs/toplink-v1/`                         | governing package            | high                              | phase workflow, target contracts, QA and handoff         | ACTIVE       | installed from read-only master v1.0.0                           |
| SRC-004 | Toplink brand dossier under `docs/toplink-v1/sources/brand/` | brand/product                | provisional factual/design source | brand philosophy, voice, safety, later visual extraction | ACTIVE       | current user decisions override conflicts                        |
| SRC-005 | `https://sentaithu.com.vn/` live site                        | authorized website reference | reference-only                    | approved UI/UX/morphology lessons only                   | REFERENCE    | inspected 2026-08-31; never Toplink content/product truth        |
| SRC-006 | `origin/main` at `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`  | legacy code/runtime          | engineering-only                  | salvage, technical history, browser baseline             | ACTIVE       | H7 visual/copy/IA authority deprecated                           |
| SRC-007 | `https://github.com/Altair1010/toplink-demo-web`             | shared Git state             | canonical continuity              | branch/ref verification and future handoff               | ACTIVE       | public at P0 capture                                             |
| SRC-008 | P0 Playwright screenshots/snapshots                          | generated evidence           | baseline-only                     | historical comparison and structure evidence             | ACTIVE       | not a design reference                                           |
| SRC-009 | `docs/toplink-v1/research/sen/EVIDENCE-INDEX.md`             | approved P1 evidence         | observational reference-only      | page-job/discovery/responsive UX input                   | REFERENCE    | 60 PNGs; research only, not production assets                    |
| SRC-010 | P1 browser computed-style/state probes                       | approved P1 evidence         | observational reference-only      | P1 motion findings; no P2 visual decision                | REFERENCE    | distilled into `MOTION-GENOME.md`; raw probes remain in `F:\tmp` |
| SRC-011 | `docs/toplink-v1/research/P1-DESIGN-INPUT-SYNTHESIS.md`      | approved P1 synthesis        | bounded design-input authority    | page jobs, discovery, audience/trust constraints         | ACTIVE IN P2 | `REFERENCE GRAMMAR != TOPLINK DESIGN`                            |
| SRC-012 | `docs/toplink-v1/PRODUCT.md` and `product/*.md`              | P2 canonical candidate       | proposed until human approval     | product, IA, content, conversion, SEO and CMS contracts  | ACTIVE IN P2 | becomes product authority only after P2 human gate               |

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
