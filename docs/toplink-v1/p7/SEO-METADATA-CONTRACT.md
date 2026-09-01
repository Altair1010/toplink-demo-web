# P7 SEO Metadata Contract

## Public origin

`TOPLINK_PUBLIC_SITE_URL` is the only canonical origin contract. It accepts HTTPS origins and local loopback HTTP origins; credentials, path, query and fragment are rejected. Missing configuration omits canonical/OG URL and keeps indexing disabled.

`TOPLINK_INDEXING_ENABLED=1` enables indexing only when the configured origin is non-loopback HTTPS. Local, preview and staging remain `noindex,nofollow` by default.

## Metadata

- Static pages use bounded product/identity wording from approved project contracts.
- Service/Product/Article detail uses normalized `seo.title`, `seo.description` and `seo.canonicalPath`.
- A detail canonical must exactly match its current route type and slug. Mismatch means no canonical and no indexing.
- Preview lifecycle means `noindex,nofollow`.
- OpenGraph emits title, description, URL, site name and type. Image metadata exists only for governed authorized Media; absent media means absent image metadata.
- Article author/date fields are emitted only from normalized approved fields.

## Sitemap and robots

The sitemap requires explicit production indexing configuration. It contains home/about, non-empty public archives, current detail canonicals and contact only when at least one safe approved action exists. Test-owned P5/P6/P7 records, canonical mismatches, previews, old slugs, APIs, WordPress, `/nhuong-quyen`, contact-without-action and the held space route are absent.

Article `updated_at` or `published_at` is the only dynamic `lastModified` source. Static routes receive no fabricated current timestamp.

Robots denies all crawling outside explicitly enabled production policy; production allows public routes, disallows `/api/` and `/wordpress/`, and publishes the configured sitemap URL. Robots is not an authentication control.
