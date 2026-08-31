# P6 Implementation Summary

P6 changes the public V1 runtime source from typed fixtures to local WordPress without changing the five React domain contracts or the locked page morphology.

Canonical runtime flow:

`WordPress toplink/v1 REST -> server-only fetch -> runtime guards -> normalization -> Toplink domain -> React`

Implemented boundaries:

- `web/lib/cms/` owns transport, errors, validation, normalization, pagination, cache tags, relations, redirect lookup, HMAC and preview reads.
- `web/lib/content/index.ts` remains the application-facing boundary and is now asynchronous.
- public pages use WordPress only; `web/lib/fixtures/data.ts` remains committed for regression tests and is not a runtime fallback.
- the WordPress plugin adds backward-compatible pagination, route-safe relation projection, old-slug lookup, signed private preview and an independent webhook emitter.
- public Toplink REST remains anonymous read-only and draft-blind.

No P7 SEO/analytics/commercial capability, deployment, DNS, GraphQL, ACF, page builder, ecommerce or sixth public domain was added.
