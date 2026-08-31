# P5 Publication Gates

## Record gate

Service, Product and Article may transition to WordPress `publish` only when:

1. lifecycle is persisted as `approved`;
2. every required value exists;
3. every required manually governed fact is `APPROVED`;
4. every required source is nonempty;
5. required evidence/documentation/caution fields pass the same rules;
6. customer-story gates pass when applicable;
7. the current user has the post-type publish capability.

Failure changes the requested status to `pending` and stores a short-lived per-user admin notice listing blocked fields. The safe REST projection independently revalidates published records, so a malformed database state still fails closed.
When a normal admin save makes a previously published required fact nonpublishable, the plugin immediately returns the WordPress record to `pending`; native core REST therefore does not retain a published core-field copy.

## Omission gate

- Optional `APPROVED` + sourced + nonempty: emit.
- Optional `PENDING`, `REJECTED` or `REFERENCE_ONLY`: omit.
- Required missing/unapproved: omit the entire record.
- Related/featured media: emit only when the attachment independently passes Media gates.

## Customer story

`customer_story` additionally requires all local controls: real-story context, recorded consent, preserved context/limits, identity/media authorization when relevant, and accepted evidence/reference state. These controls are private and never appear in public REST.

## Media

Media requires asset, source provenance, authorization, alt text, role, identity class and publishability state, all approved and sourced where manual. Generic stock may project only as atmosphere; it cannot project as Toplink evidence/explanation/orientation.

## SiteSettings

Each setting has its own source/status. Pending address, hours, hotline, Zalo, Facebook, social or legal data is absent. The endpoint itself returns 404 without an approved `public_display_name`.
