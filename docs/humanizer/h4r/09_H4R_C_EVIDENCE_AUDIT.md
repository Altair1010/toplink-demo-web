# 09 — H4R-C Evidence Audit

## Result

**No `APPROVED REAL EVIDENCE` specimen was found.**

The audit searched tracked imagery, Toplink-named runtime content, provenance/consent/publication terms and repository changes after H0/H1. No new media package or permission record was added after the H0/H1 inventory. A filename, repository presence or an earlier commit message is not provenance or publication permission.

## Candidate register

`Safe to publish` below means safe to publish **as Toplink proof in H4R-C**, not merely that a file already exists in the repository.

| Path(s)                                                                                   | Type               | What it could prove                | Toplink-specific?                 | Provenance known?           | Consent/publication permission?            | Safe to publish?         | Status               |
| ----------------------------------------------------------------------------------------- | ------------------ | ---------------------------------- | --------------------------------- | --------------------------- | ------------------------------------------ | ------------------------ | -------------------- |
| `app-demo/public/images/team/member-1.jpg`                                                | person             | public staff/role                  | no verified link                  | no                          | no                                         | no                       | UNVERIFIED           |
| `app-demo/public/images/team/member-2.jpg`                                                | person             | public staff/role                  | no verified link                  | no                          | no                                         | no                       | UNVERIFIED           |
| `app-demo/public/images/team/member-3.jpg`                                                | person             | public staff/role                  | no verified link                  | no                          | no                                         | no                       | UNVERIFIED           |
| `app-demo/public/images/team/member-4.jpg`                                                | person             | public staff/role                  | no verified link                  | no                          | no                                         | no                       | UNVERIFIED           |
| `app-demo/public/images/services/goi-dau.jpg`                                             | process/service    | real treatment step                | no verified link                  | no                          | no                                         | no                       | REFERENCE ONLY       |
| `app-demo/public/images/services/tri-lieu.jpg`                                            | process/service    | real treatment step                | no verified link                  | no                          | no                                         | no                       | REFERENCE ONLY       |
| `app-demo/public/images/spaces/tang-1-reception.jpg`                                      | place              | arrival/place                      | no; other-brand marks visible     | no                          | no                                         | no                       | NOT TOPLINK EVIDENCE |
| `app-demo/public/images/spaces/tang-1-tinh.jpg`                                           | place              | room/place                         | no; other-brand marks visible     | no                          | no                                         | no                       | NOT TOPLINK EVIDENCE |
| `app-demo/public/images/spaces/tang-2-treatment.jpg`                                      | place/process      | room and treatment setting         | no; other-brand marks visible     | no                          | no                                         | no                       | NOT TOPLINK EVIDENCE |
| `app-demo/public/images/spaces/tang-3-duong.jpg`                                          | place              | room/place                         | no; other-brand marks visible     | no                          | no                                         | no                       | NOT TOPLINK EVIDENCE |
| `app-demo/public/images/spaces/tang-1-corridor.jpg`                                       | place              | route/arrival                      | unknown                           | no                          | no                                         | no                       | UNVERIFIED           |
| `app-demo/public/images/spaces/tang-2-thong.jpg`                                          | place              | room/place                         | unknown                           | no                          | no                                         | no                       | UNVERIFIED           |
| `app-demo/public/images/spaces/tang-2-vip.jpg`                                            | place              | room/place                         | unknown                           | no                          | no                                         | no                       | UNVERIFIED           |
| `app-demo/public/images/spaces/tang-4-tinh.jpg`                                           | place              | room/place                         | unknown                           | no                          | no                                         | no                       | UNVERIFIED           |
| `app-demo/public/images/home/spa-ambience.jpg`                                            | place/mood         | ambience only                      | no identifiable link              | no                          | no                                         | no                       | REFERENCE ONLY       |
| `app-demo/public/images/products/*.jpg` (4 files)                                         | material/product   | actual product/material            | no verified SKU or supplier link  | no                          | no                                         | no                       | REFERENCE ONLY       |
| `app-demo/public/images/blog/*.jpg` (6 files)                                             | editorial          | article subject                    | no verified link                  | no                          | no                                         | no                       | REFERENCE ONLY       |
| `app-demo/public/images/partner/*.jpg` (2 files)                                          | organization       | real partnership                   | no verified relationship          | no                          | no                                         | no                       | UNVERIFIED           |
| `app-demo/public/images/training/*.jpg` (2 files)                                         | people/process     | real training                      | no verified link                  | no                          | no                                         | no                       | UNVERIFIED           |
| `app-demo/data/content.ts` service, technology, body-state, symptom, FAQ and product data | service/scope fact | verified public service scope      | file identifies mock/demo content | no operational owner/source | no publication approval                    | no                       | UNVERIFIED           |
| `app-demo/lib/booking.ts` placeholder transport configuration                             | runtime fact       | proves transport is not configured | yes, as runtime observation only  | local code                  | not a public people/place/service specimen | no for evidence exchange | NOT TOPLINK EVIDENCE |

No candidate met all of: identifiable Toplink relationship, known provenance, appropriate consent/publication permission and safe public claim.

## Prototype consequence

The evidence exchange is not populated. Both ordinary and `no-evidence` modes use `collapsed-unavailable`; the DOM contains no evidence image and no placeholder. This passes truthful collapse but cannot pass the populated real-evidence retest or establish blind organization dependence.

```text
NO APPROVED SPECIMEN
        ↓
TRUE COLLAPSE — PASS
        ↓
BLIND REVIEW — CATEGORY-SPECIFIC
        ↓
H4R-C PARTIAL — REAL EVIDENCE REQUIRED
```
