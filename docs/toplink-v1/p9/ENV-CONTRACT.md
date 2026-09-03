# P9 Production Environment Contract

The tracked template is `deploy/production/env.example`. The real file is `deploy/production/.env` on the server, mode `0600`, and is ignored by Git. Bootstrap generates random 64-hex database, admin, webhook and preview secrets on the target and never prints them.

| Variable | Required purpose | Exposure rule |
|---|---|---|
| `TOPLINK_DEPLOY_SHA` | Exact full commit deployed | operational metadata |
| `TOPLINK_PUBLIC_HOST`, `TOPLINK_CMS_HOST` | Public DNS hostnames | public |
| `TOPLINK_PUBLIC_SITE_URL` | Canonical HTTPS origin | public |
| `TOPLINK_CMS_BASE_URL` | HTTPS `/wp-json/toplink/v1` origin | server only |
| `TOPLINK_ACME_EMAIL` | Certificate operations contact | server only |
| `TOPLINK_DB_NAME`, `TOPLINK_DB_USER` | Internal DB identity | server only |
| `TOPLINK_DB_PASSWORD`, `TOPLINK_DB_ROOT_PASSWORD` | Database credentials | secret; never log/commit |
| `TOPLINK_WEBHOOK_URL`, `TOPLINK_WEBHOOK_SECRET` | Signed CMS revalidation | URL public; secret server only |
| `TOPLINK_PREVIEW_WEB_URL`, `TOPLINK_PREVIEW_SECRET` | Signed private preview | URL public; secret server only |
| `TOPLINK_WP_ADMIN_USER`, `TOPLINK_WP_ADMIN_PASSWORD`, `TOPLINK_WP_ADMIN_EMAIL` | Initial production admin | operator-only |
| `TOPLINK_BACKUP_DIR`, `TOPLINK_BACKUP_RETENTION_DAYS` | Backup staging and retention | operational metadata |

`TOPLINK_INDEXING_ENABLED` is hard-set to `0` in the production Compose service for this soft launch. `TOPLINK_ANALYTICS_VENDOR_ALLOWED` is also hard-set to `0`. No contact, address, hours, legal, analytics-vendor or content value exists in this contract.

The template deliberately contains unusable `REPLACE_ON_SERVER` and `.invalid` values. `common.sh` refuses deployment while any placeholder remains, URLs are not exact HTTPS origins, secrets are short/equal, the checkout SHA differs, or the env file mode is not `0600`.

Docker documents `.env` interpolation but recommends secrets for sensitive values. The current app/plugin APIs read runtime environment variables, so access to Docker and the env file must remain root/operator restricted; no value is copied into Git or browser-prefixed variables. Source: https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/
