# 37 — H6-F Cross-page Reorganization

## Graph rewrite

```text
BOOKING (retired)
  ├── header CTA             → information navigation
  ├── fixed mobile bar       → native reading viewport
  ├── service booking aside  → full editorial measure
  ├── /dat-lich              → route absent
  ├── state/config/helpers   → source absent
  └── main bottom padding    → removed
```

Deletion was followed by reflow. The header balances five information jobs without a replacement
conversion CTA. Mobile has no persistent bottom obstruction. The service overview has one content
column with no blank sticky aside, price, duration, suitability, query parameter or automatic
recommendation.

## Public-core corrections

- Homepage: replaced the prestige/stock hero with a calm purpose-led opening; appended the single
  human contact handoff after the narrative.
- About: retained approved Caregiver/Sage/Guide intent and collapsed unverified person/facility
  proof.
- Services: exposes reviewed structural category meaning only; dynamic detail pages are gated.
- Process: separates general questions from an unavailable verified operational sequence.
- Knowledge: keeps a bounded continuation route while dynamic article claims remain gated.
- Contact: states approved channel types and publishes no guessed destination.

All six public pages have exactly one `h1`, logical supporting headings, no booking control and no
stock image presented as Toplink evidence. Footer and header link graphs contain only public jobs.

## Release exclusions and retained future work

Motion specimens moved from `app/` to `dev-evidence/`. Unsupported route source moved to
`deferred-content/` rather than being destroyed. Booking is the exception: its route, state,
components and configuration were removed because the product decision explicitly retires it.

## Visual consequence review

The corrected public surface uses sans-first type, warm neutral canvas, ink-led contrast,
editorial unequal rhythm and bounded crimson accents. Removed CTAs, asides and bars leave no empty
column, compensating padding, orphan divider or desktop/mobile mismatch. All three skins remain
active compatibility variants without becoming brand-proof claims.

