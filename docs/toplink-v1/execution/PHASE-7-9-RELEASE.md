# Phase Card P7–P9 — Commercialization & Release

## P7 Commercial layer

- verified outbound booking/contact destinations;
- GA4/dataLayer contact events;
- Search Console plan;
- metadata/sitemap/robots/canonical;
- structured data from verified facts only;
- social previews;
- local SEO data once supplied.

## P8 Hardening

Run `qa/RELEASE-GATES.md`. Fix in one batch, confirm once.

## P9 Staging/production

### Vercel Hobby

May host preview/staging during development. It is not the commercial production target under current Hobby terms.

### Commercial launch

Choose commercial-allowed frontend hosting and persistent WordPress hosting. Then:

1. provision staging and production env vars;
2. configure HTTPS/DNS;
3. verify CMS backups/restore;
4. verify contact URLs/numbers;
5. run release suite;
6. smoke-test real devices;
7. obtain human release approval;
8. deploy;
9. perform post-deploy smoke and analytics verification;
10. preserve rollback candidate.
