# 36 — H6-F Contact Handoff Contract

## Product role

Contact is an optional human exit after the visitor has read the homepage narrative. It is not a
booking step, form, recommendation, confirmation or persistent conversion surface.

```text
NarrativeCompletion
  ↓
HumanContactHandoff
  ├── Zalo
  └── Facebook Page
```

The homepage renders this component once at `#lien-he`. There is no sticky bar, popup, floating
bubble or duplicate contact module.

## Verified and deferred fields

| Field | Status |
|---|---|
| Channel type: Zalo | human-approved |
| Channel type: Facebook Page | human-approved |
| Zalo URL/account | `CONTACT_URL_DEFERRED` |
| Facebook URL/account | `CONTACT_URL_DEFERRED` |
| Response time, owner, hours | unverified and unpublished |
| Phone, address, map | unverified and unpublished |

Repository-wide source review found no approved exact `zalo.me`, `facebook.com`, `fb.com` or
`m.me` destination. The component therefore renders truthful non-link rows. It contains no `#`
href, guessed username, search URL or fake domain.

`/lien-he` mirrors the same boundary for direct navigation and link sharing. Approved URLs can be
populated later without changing the page hierarchy; final release still requires real
destinations for intended contact actions.

