# P9 Rollback

**P8 known-good candidate:** `298b9c3834df926b243c800cba66cf6466d950e5`  
**P9 deployed SHA:** none  
**Rollback execution:** not applicable until a target deployment exists.

The production checkout is expected at `/srv/toplink`. Every deployment requires a clean checkout whose full `HEAD` equals `TOPLINK_DEPLOY_SHA`; the web image tag uses that SHA. Do not delete the P8 branch or overwrite database/uploads during a frontend rollback.

Prepared frontend rollback procedure:

1. identify the last observed healthy full SHA and corresponding `toplink-web:<sha>` image;
2. set `TOPLINK_DEPLOY_SHA` to that exact SHA in the protected server env;
3. check out that SHA in the production repository or rebuild it from the same source lock;
4. run `docker compose --env-file .env -f compose.yaml up -d --no-deps web`;
5. verify health, public HTTPS routes, headers, noindex and logs;
6. keep WordPress/MariaDB volumes unchanged unless a separately backed-up CMS mutation requires restoration.

Before dangerous CMS mutation, run the production backup and verify hashes. A database restore must never be the default response to a frontend defect. The isolated restore drill is proof tooling, not a command to overwrite live production.
