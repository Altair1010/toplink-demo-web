# P9 Public Internet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. The current user explicitly requires single-agent execution, so do not dispatch subagents.

**Goal:** Publish the qualified P8 headless candidate through persistent HTTPS hosting with no local-machine dependency, while all missing commercial facts remain fail-closed and indexing remains disabled.

**Architecture:** Prefer one commercial-capable Linux VPS running one Docker Compose project: Caddy is the only public ingress, one standalone Next.js process serves the frontend, WordPress serves the five-domain REST contract, and MariaDB is reachable only on an internal network. Named volumes persist database, uploads/WordPress state, Next cache and Caddy certificate state; production secrets live only in the server-side `.env` file.

**Tech Stack:** Node 20.20.2, Next.js 16.3.3 standalone output, Caddy 2.10.2, WordPress 7.1/PHP 8.3, MariaDB 11.8 LTS, Docker Engine with Compose v2+.

**Spec:** Current user prompt `Y VIỆN TOPLINK COMMERCIAL HEADLESS REDESIGN V1 — PHASE P9` dated 2026-09-03.

## Global Constraints

- Start branch `release/v1-public-internet` exactly at `298b9c3834df926b243c800cba66cf6466d950e5`; do not merge `main`.
- Public success requires real Internet HTTPS and no dependency on the local Windows machine.
- `TOPLINK_INDEXING_ENABLED=0` until a later approved indexing delta.
- Contact and unsupported production facts remain absent; no placeholder, fake destination or test content may ship.
- Create a fresh production WordPress database; never migrate the P5-P8 local test database.
- Do not purchase hosting/domain, change repository visibility, delete infrastructure, or expose secrets.
- Preserve `app-demo/` and all existing tracked files; WordPress Native remains paused.

---

### Task 1: Freeze base and resolve hosting

**Files:**
- Create: `docs/toplink-v1/p9/HOST-INVENTORY.md`

- [x] Fetch and verify the approved P8 and main SHAs.
- [x] Confirm the linked worktree is clean and contains `web/`, `wordpress/`, and `app-demo/`.
- [x] Create `release/v1-public-internet` exactly from the P8 SHA.
- [x] Inspect SSH aliases, provider CLIs/auth metadata, GitHub environments/secrets, Tailscale peers, project notes and DNS without printing secrets.
- [x] Record the result: no usable VPS/provider credential or DNS-control credential was found.

### Task 2: Add the reproducible single-VPS deployment contract

**Files:**
- Create: `deploy/production/Dockerfile.web`
- Create: `deploy/production/compose.yaml`
- Create: `deploy/production/Caddyfile`
- Create: `deploy/production/env.example`
- Create: `deploy/production/tests/test_production_contract.py`
- Modify: `web/next.config.mjs`

- [x] Write and run a failing static contract test for topology, source locks, persistence, safe defaults and secret boundaries.
- [x] Enable the documented Next.js standalone deployment output.
- [x] Add the minimum image-locked production services and private networks.
- [x] Re-run the contract test, Compose model validation and frontend standalone build to green.
- [x] Commit this independently reviewable deployment-foundation slice.

### Task 3: Add bounded operations and recovery scripts

**Files:**
- Create: `deploy/production/scripts/bootstrap.sh`
- Create: `deploy/production/scripts/deploy.sh`
- Create: `deploy/production/scripts/backup.sh`
- Create: `deploy/production/scripts/restore-drill.sh`
- Create: `deploy/production/scripts/verify-public.sh`
- Modify: `deploy/production/tests/test_production_contract.py`

- [x] Add failing checks for fail-closed input validation, secret-safe output, backup retention, scheduled monitoring and isolated restore behavior.
- [x] Add scripts that require explicit host values and never synthesize business facts.
- [x] Validate script syntax and static contract behavior without needing a production target; full runtime execution remains target-dependent.
- [x] Commit the operations slice.

### Task 4: Record actual P9 state

**Files:**
- Create: `docs/toplink-v1/p9/DEPLOYMENT-TOPOLOGY-ACTUAL.md`
- Create: `docs/toplink-v1/p9/ENV-CONTRACT.md`
- Create: `docs/toplink-v1/p9/PUBLIC-URL.md`
- Create: `docs/toplink-v1/p9/WORDPRESS-PRODUCTION-STATE.md`
- Create: `docs/toplink-v1/p9/BACKUP-RESTORE-REPORT.md`
- Create: `docs/toplink-v1/p9/OUTAGE-RECOVERY-REPORT.md`
- Create: `docs/toplink-v1/p9/POST-DEPLOY-TEST-REPORT.md`
- Create: `docs/toplink-v1/p9/ROLLBACK.md`
- Create: `docs/toplink-v1/p9/DEFERRED-INPUTS.md`
- Create: `docs/toplink-v1/p9/OPEN-FINDINGS.md`
- Modify: `docs/toplink-v1/WORKSTATE.md`

- [x] Record prepared versus executed state explicitly; do not pre-fill deployment evidence.
- [x] Document contact/content/indexing deltas and one exact infrastructure blocker.
- [x] Verify all requested documents are non-empty and mutually consistent.
- [ ] Commit the documentation/workstate slice.

### Task 5: Deploy and qualify when the target exists

**Files:**
- Update evidence under `docs/toplink-v1/p9/` only from observed results.

- [ ] Obtain SSH access to the chosen persistent VPS (the only missing input at this gate).
- [ ] Provision fresh production volumes and generate secrets/admin credentials on the target.
- [ ] Bootstrap WordPress with only the approved plugin and authoritative display name.
- [ ] Configure public DNS/provider hostnames and let Caddy obtain valid certificates.
- [ ] Run webhook, preview, outage, DB restart, service restart, backup and isolated restore checks.
- [ ] Turn off local development services and run anonymous public route/browser/security/leak checks.
- [ ] Set `PUBLIC_ONLINE` only if every hard Internet gate has observed evidence; otherwise keep the precise blocked status.

### Task 6: Close the prepared branch

- [ ] Run full diff, deletion, secret, test-data, Native, `app-demo/`, formatting, test and build checks.
- [ ] Commit atomically, push only `release/v1-public-internet`, and verify remote HEAD/ahead-behind.
- [ ] Do not merge `main`, deploy an unrelated target, enable indexing, or claim `PUBLIC_ONLINE` without hosted evidence.
