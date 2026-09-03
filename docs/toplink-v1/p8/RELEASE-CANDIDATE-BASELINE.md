# P8 Release Candidate Baseline

**Frozen:** 2026-09-03 (Asia/Saigon)  
**Repository worktree:** `F:\Codex\yvien-v1-foundation`  
**Branch:** `release/v1-hardening`  
**P8 base SHA:** `bd71da180edef50f1313fb4b5e77bc5d09105d01`  
**Candidate HEAD before P8 commits:** `bd71da180edef50f1313fb4b5e77bc5d09105d01`  
**Expected origin/main:** `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`

## Application toolchain

| Component             | Frozen/observed version | Evidence                           |
| --------------------- | ----------------------- | ---------------------------------- |
| Next.js               | 16.3.3                  | `web/package.json`                 |
| React / React DOM     | 19.2.7                  | `web/package.json`                 |
| TypeScript            | 5.9.3                   | `web/package.json`                 |
| Prettier              | 3.9.4                   | `web/package.json`                 |
| Playwright package    | 1.63.0-alpha-2026-08-05 | local CLI under `web/node_modules` |
| Host Node             | 24.16.0                 | `node --version`                   |
| Host npm              | 11.13.0                 | `npm --version`                    |
| Qualified Node        | 20.20.2                 | digest-pinned clean container      |
| Playwright CLI helper | 0.1.18                  | `playwright-cli --version`         |

## CMS/runtime toolchain

| Component       | Observed version/reference                                                |
| --------------- | ------------------------------------------------------------------------- |
| Docker Engine   | 29.5.3 (build d1c06ef)                                                    |
| Docker Compose  | 5.1.4                                                                     |
| WordPress       | 7.1                                                                       |
| PHP             | 8.3.33                                                                    |
| MariaDB         | 11.8.9                                                                    |
| WP-CLI          | 2.12.0                                                                    |
| WordPress image | `sha256:5a93c470ae8220fddf71f6ebe3bc94e615ddc2ae4d9810f795b830fb11c41a17` |
| WP-CLI image    | `sha256:2b5e9d4d3e51909dca1aaa4732e9f5e5bf0377c2114dbd8ff39f060bff202586` |
| MariaDB image   | `sha256:2439dcd7d14010ecd1ff7a4e1c5abe8e208c34fe35290744deeeaac3569043c3` |

The CMS was healthy at freeze time. WordPress was bound only to `127.0.0.1:8085`; MariaDB exposed
`3306/tcp` only inside Compose.

## Browser and design-tool baseline

| Tool/channel        | Observed state                                                              |
| ------------------- | --------------------------------------------------------------------------- |
| Playwright Chromium | 152.0.7977.8 (revision 1237)                                                |
| Playwright Firefox  | 153.0 (revision 1539)                                                       |
| Playwright WebKit   | 26.5 (revision 2342)                                                        |
| Google Chrome       | 152.0.7977.75                                                               |
| Microsoft Edge      | 152.0.4191.53                                                               |
| Hallmark            | exact pinned SHA `13ac0ec7e148655948100b6396439e481361d690`                 |
| Impeccable          | exact pinned SHA `b0594c72d18006b5865c70eb3a97e8b04064e600` (package 3.6.1) |

The versions above are the runtimes that actually executed. No opportunistic dependency upgrade was
performed.
