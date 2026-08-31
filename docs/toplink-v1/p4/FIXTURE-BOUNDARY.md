# P4 Fixture Boundary

## Data lane

```text
P4 REFERENCE_ONLY fixtures
  -> lib/content access functions
  -> Toplink domain objects
  -> server route components

P6 WordPress REST
  -> validate / normalize / omit
  -> same lib/content function contract
  -> same Toplink domain objects
  -> unchanged route components
```

Pages and components do not import `lib/fixtures/`. `scripts/check-content-boundary.mjs` enforces
that boundary and verifies all 12 route patterns.

## Fail-closed rules implemented

- Required unknown slug returns the unpublished/not-found state.
- Optional unapproved media does not render.
- Media requires approved asset, provenance-dependent authorization, alt, role and publishability.
- Pending Zalo, Facebook/Messenger, phone, address and hours do not become links or placeholders.
- `/khong-gian` exposes the evidence contract without claiming an abstract plane is a real facility.
- There is no price, cart, checkout, booking form, lead transport or fake response state.

## Replacement contract for P6

P6 replaces only the implementation behind `getSiteSettings`, `getServices`, `getServiceBySlug`,
`getProducts`, `getProductBySlug`, `getArticles` and `getArticleBySlug`. CMS response types must be
normalized before reaching these functions; React components never consume WordPress shapes.
