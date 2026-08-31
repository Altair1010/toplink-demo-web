# P5 Implementation Summary

## Outcome

P5 adds a repository-owned local CMS at `wordpress/` without connecting it to `web/`. Docker Compose runs an immutable-digest WordPress/MariaDB/WP-CLI stack; `toplink-content-model` owns the editorial model, native admin surfaces, roles, publication gates and read-only public projection.

## Runtime boundary

```text
WordPress admin forms
  -> nonce + capability + sanitization
  -> core fields / private governance meta
  -> publication validator
  -> published WordPress record
  -> allowlisted toplink/v1 projection
  -> APPROVED ContentField values only
```

The database stays inside the Compose network. WordPress is published only at `127.0.0.1:8085` by default. Named volumes `toplink-p5_toplink_db_data` and `toplink-p5_toplink_wordpress_data` persist across `docker compose down` without `-v`.

## Plugin modules

| Module | Responsibility |
| --- | --- |
| `SchemaRegistry.php` | Central five-domain, 57-field authority with storage, owner, requiredness, type, source/status rules, REST eligibility, sanitization and enums. |
| `ContentTypes.php` | Service/Product CPTs, `service_group`, private registered meta and canonical Article categories. |
| `Roles.php` | Idempotent Author/Editor/Administrator capability contract. |
| `AdminUi.php` | Server-rendered meta box and SiteSettings page with nonce/capability/sanitization/escaping. |
| `PublicationGates.php` | Required values, source/status, lifecycle, customer-story and media eligibility gates. |
| `RestApi.php` | Read-only `toplink/v1` allowlisted projection and explicit schema endpoint. |

Core Posts normalize to Article; attachments normalize to Media; a plugin option surface normalizes to SiteSettings. Pages remain available for stable organization content but never control Next.js layout.

## Actual local versions

- WordPress: `7.1`
- PHP: `8.3.33`
- MariaDB server: `11.8.9-MariaDB`
- WP-CLI: `2.12.0`
- Plugin: `0.1.0`, active

The reviewed tag and immutable image references are recorded in `wordpress/IMAGE-LOCK.md`.

## P5/P6 boundary

`web/lib/content/index.ts` still imports `@/lib/fixtures/data`. P5 adds no CMS URL, credentials, REST client, normalizer, preview, webhook or cache invalidation to `web/`. P6 may consume only the documented REST data contract and must still validate/normalize it before returning the existing Toplink domain types.
