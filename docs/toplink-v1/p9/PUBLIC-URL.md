# P9 Public URL

**P9 public frontend: NOT AVAILABLE**  
**P9 public CMS: NOT AVAILABLE**  
**P9 HTTPS verification: NOT EXECUTED**  
**Indexing policy:** configured OFF, not hosted  
**Status:** `BLOCKED_INFRA_INPUT`

Two unrelated/current URLs were observed and must not be mislabeled:

- `https://toplink.vn/` is an existing WordPress/LiteSpeed site behind Cloudflare. No P9 commit or headless proof is associated with it.
- `https://altair1010.github.io/toplink-demo-web/` is the legacy `origin/main` static GitHub Pages site at `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`.

`cms.toplink.vn` does not resolve. No provider-supplied P9 hostname was found. Consequently the anonymous Internet, external-device and local-machine-off gates have not run and `PUBLIC_ONLINE` is forbidden.

After SSH access exists, the first accepted URL may be a stable provider HTTPS hostname or the preferred `toplink.vn`/`cms.toplink.vn` pair. Existing `toplink.vn` traffic must not be cut over until the headless target is healthy and its ownership/rollback are understood.
