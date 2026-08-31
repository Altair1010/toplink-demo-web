# P3B Direction C Evidence Index

**Capture date:** 2026-08-31 (Asia/Saigon)  
**Source:** `prototypes/toplink-v1/p3-direction-sprint/lock.html` served locally at
`http://127.0.0.1:4174/`  
**Boundary:** RESEARCH/DESIGN AUTHORITY ONLY — NOT PRODUCTION ASSETS.

| Surface/state | Viewport | Evidence | SHA-256 | Note |
|---|---:|---|---|---|
| Home, full | 1440 | [PNG](evidence/C-lock__home__1440__full.png) | `dd399943aa93300a6203d980b516ed09d38a8b4f070d899bcb902dc55262f9f8` | Full C procession and desktop asymmetry |
| Home, full | 375 | [PNG](evidence/C-lock__home__375__full.png) | `f483af8320f56ebb79ba5a8599fda97840e5f0b0f51148726cdc2fe50551b187` | Linear mobile procession |
| Home, reduced motion | 375 | [PNG](evidence/C-lock__home__375__reduced.png) | `04b965bbde668eda3cec7e1b5634dc32ac233f94b6d869a0c30395616050a899` | Final gateway state; animation removed |
| Mobile navigation open | 375 | [PNG](evidence/C-lock__nav__375__open.png) | `a5ad6fa5156d7715e5e06f521e8372c8a494b786fbfbda592b1e72eef1822314` | Native `details` state |
| Service detail, full | 1280 | [PNG](evidence/C-lock__service__1280__full.png) | `45b936cbd04dc8f3bd2ccf9634d04cc80401d0ffdaa15f0bdf346d68b263cf92` | Purpose/process/limits/contact chamber sequence |
| Service detail, full | 375 | [PNG](evidence/C-lock__service__375__full.png) | `2a4e3cb3246c15a0be08494a6254eb98d135db949fec054707dae9e1f1f7778d` | Indentation removed; limits remain prior to contact |
| Knowledge detail, full | 1280 | [PNG](evidence/C-lock__knowledge__1280__full.png) | `0bd54e48e61241b23a00dcaaceb65283c8a457abbdc908ae30ae89bba5494715` | Reading hall, evidence spine and no-contact completion |
| Knowledge detail, full | 375 | [PNG](evidence/C-lock__knowledge__375__full.png) | `7f9430df008bd017dcc1ffdf4d9ee2b4fe67f2d0325a06bd5b8939c84b10ed76` | Inline mobile reading order |

## Browser observations

- Home: no horizontal overflow at 375, 768, 1280 or 1440; exactly one H1.
- Service and knowledge: no horizontal overflow at required captures; exactly one H1 each.
- Mobile menu opens as a native state; no essential hover-only information.
- Reduced-motion capture reports `animation-name: none`; normal home reports `release`.
- Final confirmation logged zero console warnings, console errors and page errors.
- Small chapter-label contrast after correction measured from 5.58:1 to 8.64:1.

The 768 and 1280 home checks were geometry sanity checks and intentionally produced no extra PNG.
