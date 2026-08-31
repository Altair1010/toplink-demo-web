# P6 Failure Modes

| Condition | Result |
| --- | --- |
| Valid CMS detail 404 | Next canonical `notFound()` behavior |
| CMS timeout/network/5xx | `CmsUnavailableError` and controlled route error; never fixture fallback |
| Non-JSON or malformed JSON/domain | `CmsSchemaError`; record is not rendered |
| Warm public cache while CMS is down | cached valid response may continue |
| Cache miss while CMS is down | non-empty controlled HTTP 500; no fabricated content |
| Missing/invalid/stale/tampered webhook auth | 401 |
| Replayed valid webhook in the local process window | 409 |
| Signed unsupported event | 400 without invalidation |
| Missing/expired/tampered preview intent | 401 |
| Draft requested publicly | WordPress public REST 404 and Next public route 404 |
| Webhook delivery failure | WordPress save succeeds; minimal metadata-only local error; TTL recovers eventually |

Webhook logs contain event, domain, ID, slug, result/status and timestamp only. They do not contain secrets, signatures or private content bodies.
