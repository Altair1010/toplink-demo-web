# P6 Cache and Revalidation Map

Public CMS fetches use a one-hour safety revalidation period plus content-family tags. Preview uses `no-store` and never receives public tags.

| Domain event | Core tags | Core paths |
| --- | --- | --- |
| Service | `cms:services`, `cms:service:<slug>` | `/`, `/dich-vu`, detail |
| Product | `cms:products`, `cms:product:<slug>` | `/san-pham`, detail |
| Article | `cms:articles`, `cms:article:<slug>`, `cms:article-type:<type>` | knowledge/news index and detail; home for knowledge |
| Media | `cms:media`, `cms:media:<id>` plus declared dependents | only dependent families/details |
| SiteSettings | `cms:site-settings` | `/`, `/lien-he` |

Slug-change events include `previous_slug`; both cache identities and paths are invalidated. WordPress `_wp_old_slug` data is exposed only through the read-only resolver, and Next issues a permanent 308 redirect from the old detail URL to the new canonical URL.

Publish, update, unpublish and delete events invalidate the relevant family/detail. The emitter has a two-second timeout and never blocks the authoritative WordPress save when delivery fails. There is no queue in P6; TTL is the bounded recovery path after a delivery failure.
