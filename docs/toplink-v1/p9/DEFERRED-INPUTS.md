# P9 Deferred Inputs

These inputs are deliberately deferred and are not P9 infrastructure blockers. Current behavior is omission/collapse with no actionable placeholder.

| Input | State | Current behavior | Future insertion path | Required delta test |
|---|---|---|---|---|
| HOTLINE | DEFERRED BY USER | no phone control or `tel:` link | SiteSettings → exact value/source → `APPROVED` | destination, browser contact, typed analytics, no-PII |
| ZALO | DEFERRED BY USER | no Zalo control/link | SiteSettings → exact URL/source → `APPROVED` | identity/destination, browser, analytics, no-PII |
| FACEBOOK/MESSENGER | DEFERRED BY USER | no Facebook/Messenger control/link | SiteSettings → exact URL/source → `APPROVED` | identity/destination, browser, analytics, no-PII |
| Address | PENDING | omitted; no LocalBusiness address | SiteSettings with authoritative source | REST/render/structured-data review |
| Opening hours | PENDING | omitted | SiteSettings with authoritative source | REST/render/time-format review |
| Legal identifiers | PENDING | no legal identity claim | SiteSettings with authoritative source | footer/Organization eligibility review |
| Service/product content | PENDING | empty/held archives and no invented cards | approved CMS records | publication, route, webhook, SEO |
| Authorized premises/media | PENDING | facility evidence collapses | approved Media plus consent/provenance | media gate, alt text, browser |
| Customer stories | PENDING | no testimonial/story claims | real consented Article workflow | consent/evidence/publication gates |

## Contact delta

When the user supplies hotline, Zalo and Facebook/Messenger: set exact SiteSettings values, record sources, mark only verified fields `APPROVED`, validate destinations, run browser contact and typed analytics tests, verify no PII, then publish. Do not rerun the full P9 architecture/recovery qualification.

## Indexing delta

After real content/contact/domain are accepted: update SiteSettings/content, verify production truth, enable `TOPLINK_INDEXING_ENABLED` through a separately reviewed deployment change, verify robots/sitemap/canonical, then submit Search Console. Indexing remains outside current P9.
