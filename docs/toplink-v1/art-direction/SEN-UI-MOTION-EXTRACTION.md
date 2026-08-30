# Sen Tài Thu — UI/UX/Motion Extraction Plan

## Objective

Create a reference corpus that captures **how the site behaves and composes information**, not its content or brand assets.

## Minimum route sample

At the time of planning, current public search evidence confirms Sen Tài Thu has surfaces for home, giới thiệu, dịch vụ, tin tức, hệ thống/chi nhánh and đặt lịch. During Phase 1, use the live site as authority and record the exact route set actually available.

## Capture matrix

For each chosen route:

- 375px mobile
- 768px tablet
- 1280px desktop
- 1440px wide desktop

Capture:

1. first viewport;
2. full-page screenshot;
3. section boundaries;
4. navigation open/closed states;
5. tabs/carousels/accordions;
6. hover/focus states where meaningful;
7. sticky/pinned sections;
8. scroll-triggered transitions;
9. mobile reflow behavior;
10. footer/contact behavior.

## Motion sheet

For each motion behavior record:

```text
id
surface
trigger
from-state
to-state
duration estimate
easing character
delay/stagger
scroll relationship
mobile adaptation
reduced-motion replacement
semantic purpose
ADOPT / ADAPT / REJECT
```

Do not copy source JS as the implementation strategy. Reimplement the approved behavior in Toplink's own motion system.

## UI decomposition sheet

For each section:

```text
job-to-be-done
content hierarchy
layout skeleton
container logic
typographic ratio
media role
interaction
conversion role
responsive change
unique vs repeated
Toplink applicability
```

## Output

```text
docs/toplink-v1/research/sen/
├── ROUTE-MAP.md
├── UI-GENOME.md
├── MOTION-GENOME.md
├── RESPONSIVE-MAP.md
├── ADOPT-ADAPT-REJECT.md
└── screenshots/   # research only; never production assets
```
