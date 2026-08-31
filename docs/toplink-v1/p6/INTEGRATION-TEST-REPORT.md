# P6 Integration Test Report

## Deterministic contracts

- Node adapter/security suite: five-domain normalization, envelopes, governance, malformed required values, owners/sources/status, media constraints, fixture boundary, client-import boundary, HMAC/replay/event maps and preview token security.
- WordPress P6 runtime: bounded pagination, Service/Product/Article route-safe relations, approved Media projection, old-slug resolution, private preview denial/acceptance/expiry/tamper, public draft absence and signed compact webhook payload.
- P5 regression: static contract, PHP lint and 32 editorial/publication/security runtime assertions; P6 uses `verify-p5.ps1 -AllowP6Integration` so only the historical fixture-only/web-unchanged P5 assertion is waived.

## Local production-style lifecycle

Only `__P6_INTEGRATION_TEST__` records were mutated.

| Scenario | Observed result |
| --- | --- |
| Draft | public REST and public Next detail 404 |
| Preview | valid intent rendered draft through the existing Service template; exit removed access |
| Publish | signed event accepted; detail returned 200 without restarting Next |
| Update | title B appeared after scoped revalidation without restart |
| Slug change | new detail 200; old detail 308 to the new canonical path |
| Unpublish | detail became 404 after signed invalidation |
| Delete | test-owned published record was permanently deleted; detail remained 404 |
| Outage | warmed detail remained 200; never-cached detail returned non-empty 500; neither used fixtures |

Service, Product and Article CMS values rendered on their existing detail templates; approved Media alt/asset metadata rendered through `MediaFigure`; approved `SiteSettings.public_display_name` rendered while pending contact destinations stayed absent.

The CMS browser regression passed 12 routes at 375, 768, 1280 and 1440 pixels with HTTP, H1, overflow, keyboard, touch, reduced-motion, heading, contrast and console checks. Evidence is local test evidence, not production content truth.
