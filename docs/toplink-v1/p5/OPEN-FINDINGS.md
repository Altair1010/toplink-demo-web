# P5 Open Findings

- Real service/product facts, taxonomy, contacts, hours, address, legal identifiers, authorized Toplink media and consented customer stories remain unavailable. They remain absent/unpublished by design.
- Docker Desktop must be running before the local stack starts. P5 does not install or configure a production container host.
- Initial WP-CLI core install logged an uploads-directory warning under the CLI user; the running Apache `www-data` user later passed an explicit create/write/remove probe in the persistent uploads path.
- WordPress admin smoke emitted a core 403 request to `/wp/v2/settings` for non-administrator editorial roles plus two block-editor warnings. Capability/runtime gates passed; the Toplink meta box existed in Editor DOM and the settings surface was usable. This local core-editor noise is recorded, not treated as a P5 contract failure.
- The resolved WordPress image tag is `7.1.0-php8.3-apache`; `wp core version` reports `7.1`. Both are recorded rather than treating the human-readable tag as runtime proof.
- Published `__P5_CONTRACT_TEST__` records are intentionally localhost-only evidence. They are not production truth and should never be exported as real Toplink content.
- Production HTTPS, backup/restore qualification, public hosting, production admin hardening, monitoring and release security remain P8/P9 work.
- P6 still must validate and normalize relation IDs and REST values before they reach the existing React domain boundary.
