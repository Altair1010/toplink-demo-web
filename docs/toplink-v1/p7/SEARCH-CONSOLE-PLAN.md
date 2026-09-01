# Search Console and Local SEO Readiness Plan

## Future Search Console action

Preferred ownership path: a DNS Domain property for the final approved public domain. This is a future release operation, not a P7 action.

Prerequisites:

1. Final commercial-allowed frontend host and approved public HTTPS domain.
2. Persistent production WordPress and complete release qualification.
3. `TOPLINK_PUBLIC_SITE_URL` set to the final origin and `TOPLINK_INDEXING_ENABLED=1` only at the approved release gate.
4. Public `robots.txt` and `<origin>/sitemap.xml` inspected after deployment.

Post-launch steps: verify the Domain property, submit the sitemap, inspect representative canonical routes, confirm preview/internal routes are excluded, review coverage/canonical reports and monitor crawl errors after content or slug changes.

If the provisional domain changes, update the single origin configuration, preserve stable paths, redirect old public canonicals at the hosting layer and submit the new sitemap/property. Do not retain two canonical origins.

P7 does not change DNS and does not claim Search Console ownership or production indexing verification.

## Local SEO readiness

Required future approved facts are canonical business name, address, phone, opening hours, location, map/directions destination and relevant legal identifiers. Current status is `PENDING`.

Until those facts exist, the website must not emit a NAP block, map embed, directions action or LocalBusiness schema. External business profile setup is a separate human-gated operational task.
