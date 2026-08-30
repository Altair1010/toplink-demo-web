# Source Register — Live V1

| ID      | Source                                                       | Type                         | Authority                         | Allowed use                                              | Status         | Notes                                        |
| ------- | ------------------------------------------------------------ | ---------------------------- | --------------------------------- | -------------------------------------------------------- | -------------- | -------------------------------------------- |
| SRC-001 | Current user P0 execution prompt                             | execution authority          | highest for P0                    | P0 scope, safety, completion and reporting               | ACTIVE         | stops before P1/merge/deploy                 |
| SRC-002 | `docs/toplink-v1/DECISIONS.md`                               | locked decisions             | high                              | all V1 product/architecture/governance decisions         | ACTIVE         | package checksum verified                    |
| SRC-003 | other files under `docs/toplink-v1/`                         | governing package            | high                              | phase workflow, target contracts, QA and handoff         | ACTIVE         | installed from read-only master v1.0.0       |
| SRC-004 | Toplink brand dossier under `docs/toplink-v1/sources/brand/` | brand/product                | provisional factual/design source | brand philosophy, voice, safety, later visual extraction | ACTIVE         | current user decisions override conflicts    |
| SRC-005 | Sen Tài Thu                                                  | authorized website reference | reference-only                    | UI/UX/motion/structure in P1                             | INACTIVE IN P0 | no extraction or content/media reuse started |
| SRC-006 | `origin/main` at `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`  | legacy code/runtime          | engineering-only                  | salvage, technical history, browser baseline             | ACTIVE         | H7 visual/copy/IA authority deprecated       |
| SRC-007 | `https://github.com/Altair1010/toplink-demo-web`             | shared Git state             | canonical continuity              | branch/ref verification and future handoff               | ACTIVE         | public at P0 capture                         |
| SRC-008 | P0 Playwright screenshots/snapshots                          | generated evidence           | baseline-only                     | historical comparison and structure evidence             | ACTIVE         | not a design reference                       |

Facts not present in an approved source remain `PENDING`; they are not placeholders and must not be
invented.
