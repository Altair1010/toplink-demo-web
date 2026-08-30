# Security & Privacy Baseline

## V1 data minimization

Because the site does not collect booking forms or health histories, do not add a database or PII pipeline “for later”. Outbound booking happens on third-party human channels.

## Secrets

- WordPress admin credentials: never in Git.
- WordPress Application Password/API secret: server environment only.
- Revalidation webhook secret: separate high-entropy secret.
- Analytics IDs may be public identifiers, but configuration still belongs in environment/config rather than scattered components.

## WordPress

Before production:

- least-privilege roles;
- strong admin auth and 2FA where hosting supports it;
- HTTPS;
- update policy;
- disable/remove unused plugins/themes;
- backups and tested restore;
- restrict administrative exposure as appropriate;
- keep plugin dependency count low.

## Preview

Do not solve preview by exposing all drafts through public REST.

## Testimonials/media

Treat identifiable customer media as permission-bound content. Store proof of permission outside the public website and only publish the approved derivative/assets.

## Analytics/privacy

Tracking implementation must be reviewed against the actual deployment jurisdiction and enabled vendors. This package is an engineering plan, not legal advice; do not claim regulatory compliance merely because a banner or setting exists.
