# P6 Normalization Contract

P6 uses explicit TypeScript guards instead of adding a runtime-validation dependency. The guard set is small, domain-specific and tested against malformed payloads.

Every public fact must be a wrapper with:

```text
value + exact owner + non-empty source + status=APPROVED
```

Required invalid/missing facts reject the complete record with `CmsSchemaError`. Optional `PENDING`, `REJECTED` and `REFERENCE_ONLY` facts are omitted. Public normalized records derive `editorial_lifecycle: published` only after the public payload passes validation.

Additional fail-closed checks cover route-safe slugs, article type enums, FAQ/SEO/value types, HTTP(S) media URLs, positive media dimensions, authorization/publishability, and the rule that `generic_stock` is `atmosphere` only.

The public normalized domain set remains exactly:

1. Service
2. Product
3. Article
4. Media
5. SiteSettings

Raw REST keys, post meta, WordPress IDs and fetch responses are not component contracts.
