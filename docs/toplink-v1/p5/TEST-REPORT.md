# P5 Test Report

## Deterministic contract results

`wordpress/scripts/verify-p5.ps1` runs static contract tests, container health/core/plugin checks, PHP lint, runtime workflow tests, tracked-secret checks and P4 preservation checks.

- Static Python contract: 5 tests passed.
- PHP syntax: plugin entrypoint plus all six modules passed.
- Runtime workflow: 32 assertions passed, 0 failed after the bounded V1 correction batch.
- Bootstrap idempotence: content count `4 -> 4`; user count `3 -> 3` on the second run.
- HTTP: schema, valid detail and SiteSettings returned 200; unknown detail returned 404.

## A–L mapping

| Scenario | Result |
| --- | --- |
| A — Author draft | Article, Service and Product remain nonpublic. |
| B — Author publish denial | All three publish capabilities absent; attempts retained nonpublic. |
| C — Required field gate | Incomplete Article, Service and Product blocked. |
| D — Valid Editor publish | Valid Service, Product and Article published and appeared in Toplink REST. |
| E — Optional PENDING | Optional FAQ omitted. |
| F — REFERENCE_ONLY / REJECTED | Optional relation omitted in both states. |
| G — Customer story | Missing gates blocked; all local test gates enabled publication. |
| H — Media | Pending governance blocked; approved metadata projected; generic-stock evidence blocked. |
| I — SiteSettings | Approved public name emitted; pending contacts absent; Editor settings cap present. |
| J — Five-domain schema | Exact domain order and all 57 P4 field names matched. |
| K — Forbidden commerce | Forbidden field scan returned zero schema matches. |
| L — Secrets | Public response excludes credentials/private governance; tracked secret scan is part of V0. |

Additional workflow regressions prove that Author cannot self-approve, Editor admin-form sanitization preserves canonical uppercase approval values, and a published record returns to pending when a required fact becomes nonpublishable.

## Browser smoke

- Author could open the Service creation screen and had no Publish control.
- Editor DOM contained `#toplink-editorial-governance` and Editor could open Toplink SiteSettings, see `public_display_name` and Save Changes.
- Runtime tests remain the primary deterministic proof of the Editor publish path.

## Runtime state

Compose reported DB and WordPress healthy. WordPress was reachable at localhost only, DB exposed only `3306/tcp` internally, both named volumes existed, and the Apache `www-data` user passed an uploads write probe.
