# P6 Open Findings

- Real Toplink service/product/editorial facts, contacts, legal identifiers and authorized production media remain unavailable and fail closed. P6 records are unmistakably localhost-only test evidence.
- Webhook replay memory is process-local. Timestamp/HMAC remains bounded to five minutes, but a future multi-instance production topology should decide whether a shared replay store is warranted in P8/P9.
- Webhook delivery intentionally has no retry queue. A failed delivery can leave cache stale until the one-hour TTL or manual revalidation; operational retry/monitoring belongs to P8/P9.
- The local media integration record proves governed attachment metadata and React rendering but is not a production asset or real Toplink evidence.
- Node 24.16.0 is the verified runtime. Node 20 parity was not run and remains a P8 portability check.
- WordPress admin/browser noise recorded in P5 is unchanged; P6 did not redesign WordPress admin.
- Production HTTPS, hosting, backups, monitoring, DNS, deployment and secret distribution remain out of P6 scope.
