# P0 Evidence Index

**Capture source:** local untouched baseline at
`b98dfd063f6bc8f63e43a65bb8cfe617c750c111`  
**URL:** `http://127.0.0.1:3000/toplink-demo-web/`  
**Browser tool:** installed `@playwright/cli 0.1.18`  
**Purpose:** historical comparison only; H7 is not a design baseline.

## Browser evidence

| Evidence                                                               | Viewport/state                              | SHA-256                                                            |
| ---------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------ |
| `evidence/p0-baseline/screenshots/desktop-home-1440.png`               | homepage, 1440×1000, full page              | `aa115e2e007bedede1143723749026a44bab69b5389e63e88b93368099861ba4` |
| `evidence/p0-baseline/screenshots/desktop-gioi-thieu-1440.png`         | about, 1440×1000, full page                 | `e525d49d3e9adb1ffd744b4044cea2535ce49c5b674214900bba1e125724968e` |
| `evidence/p0-baseline/screenshots/desktop-dich-vu-1440.png`            | services, 1440×1000, full page              | `a6cd8ebbd2a40508ec1ba78f7c5784758e1b44fb9093a81b608977eda487f3cc` |
| `evidence/p0-baseline/screenshots/desktop-quy-trinh-tri-lieu-1440.png` | process, 1440×1000, full page               | `e3f32773786ae954a0b828ecbcc0c5ef8bcd53424efda53d33decda86b588856` |
| `evidence/p0-baseline/screenshots/desktop-tin-tuc-1440.png`            | news empty state, 1440×1000, full page      | `865a99fdd370715849d0881673cb663c9b74014e78bb08cb51b05f3aafafdc12` |
| `evidence/p0-baseline/screenshots/desktop-lien-he-1440.png`            | contact pending state, 1440×1000, full page | `1f49e797a10d7d67467b497baf69abb228ace9461da3473bffdcf5d30cf10a82` |
| `evidence/p0-baseline/screenshots/mobile-home-375.png`                 | homepage, 375×812, full page                | `44df6ee46989919452ecd6d61842790d730f755b1179d4085a9e93cea9814c8f` |
| `evidence/p0-baseline/screenshots/mobile-navigation-open-375.png`      | open mobile navigation, 375×812 viewport    | `ba36a7a92efc7dd576193ba85be1a343540f526b47f0cc658b6fbbc0b34e103c` |

Accessibility-tree snapshots:

| Evidence                                                    | SHA-256                                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------------ |
| `evidence/p0-baseline/snapshots/desktop-home-structure.yml` | `e6c68410dffedacc5a228f5782f1eb8875dc6067a7ba1c1e15a7db72565ce582` |
| `evidence/p0-baseline/snapshots/mobile-home-structure.yml`  | `9fcf73c1eff34f72e6c961e23ab3e819fc3ee76d69af8ab0761676c3c2e386a8` |
| `evidence/p0-baseline/snapshots/mobile-navigation-open.yml` | `32649c851f4e808062400d570849f40fb7e16939115ec78e570c2bbe02cac49a` |

All six routes returned HTTP 200 during capture. Playwright console queries returned `0` error and
`0` warning messages. Development-only React DevTools/HMR info messages were present and are not
runtime failures.

## Technical baseline evidence

| Command                                        | Result                                                                            |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| package `CHECKSUMS.sha256` verification        | PASS; all listed package files matched                                            |
| `npm ci`                                       | PASS; 49 packages added, 50 audited, 0 vulnerabilities                            |
| `node --test .../orientation-state.test.mjs`   | PASS; 10/10                                                                       |
| `node --test .../evidence-visibility.test.mjs` | PASS; 4/4                                                                         |
| `npm run verify`                               | PASS; static build, TypeScript, Prettier, 35-token check, six-route release check |

## Scratch handling

Playwright's generated `.playwright-cli/` scratch state is not project evidence and was not committed.
To honor the no-delete rule, it was moved intact to
`F:\tmp\toplink-p0-playwright-cli-20260830-1612` after capture.
