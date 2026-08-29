# 38 — H6-F Final Verification

## Result

**PASS — H6 CLOSED / READY FOR H7.**

- baseline: `2153f1721ff7c27101151489b4e56e3d84211580`;
- branch: `main`;
- remote: `origin` → `https://github.com/Altair1010/toplink-demo-web.git`;
- product role: information / understanding / exploration;
- contact release input: approved Zalo and Facebook Page URLs remain deferred.

H7 eligibility is not final release approval. H7 must verify populated contact destinations before
an intended clickable handoff can ship.

## Static gates

| Gate                             | Result                             |
| -------------------------------- | ---------------------------------- |
| Next production build/export     | PASS — 12 generated outputs        |
| Public content routes            | PASS — 6                           |
| TypeScript `tsc --noEmit`        | PASS                               |
| Prettier                         | PASS                               |
| token checker                    | PASS — 35 colors, 0 orphan classes |
| release-surface checker          | PASS                               |
| `git diff --check`               | PASS                               |
| orientation/evidence state tests | PASS — 14/14                       |

The static route list contains `/`, `/gioi-thieu`, `/dich-vu`, `/quy-trinh-tri-lieu`, `/tin-tuc`
and `/lien-he`. It contains no `/dat-lich`, dynamic detail, deferred commercial/place route or
`/motion-lab*` route.

## Booking zero-trace assertion

| Trace                               | Result |
| ----------------------------------- | ------ |
| `/dat-lich` route/source/output     | absent |
| `BookingStepper`                    | absent |
| booking config/state/helper         | absent |
| header booking CTA                  | absent |
| mobile fixed conversion bar         | absent |
| service booking aside/query         | absent |
| form/submit/success/confirmed state | absent |
| production mutating requests        | 0      |

Repository history and prior H6 evidence retain booking provenance; production app/runtime source
does not.

## Browser matrix

All six public routes were checked at 375, 768, 1280 and 1440 CSS pixels plus a 720-pixel
200%-equivalent viewport.

| Check                                  | Result                                              |
| -------------------------------------- | --------------------------------------------------- |
| status and route load                  | PASS                                                |
| exactly one `h1`                       | PASS — 0 missing or duplicate                       |
| logical supporting headings            | PASS                                                |
| horizontal overflow / Vietnamese wrap  | PASS                                                |
| keyboard and visible focus             | PASS                                                |
| skip link → `main`                     | PASS                                                |
| mobile menu semantics and 44px control | PASS                                                |
| public touch targets                   | PASS                                                |
| reduced motion                         | PASS — 0 active animations in reduced mode          |
| console                                | PASS — 0 unexpected errors in fresh browser session |
| network                                | PASS — GET-only, 0 mutations, 0 request failures    |
| contact placement                      | PASS — one handoff after narrative                  |
| fake external links                    | PASS — 0                                            |

The simple static screenshot server emits Next prefetch-file 404s because it does not implement the
hosting rewrite for exported RSC text paths. These are capture-server artifacts; the fresh Next
browser verification used for the console/network gate reports zero errors and zero failed
requests.

## Skins and type

- `yvien`: distinct default primary/surface values verified;
- `tet`: distinct seasonal primary values verified;
- `an-tinh`: distinct jade/canvas values verified;
- public Noto consumers: 0;
- Be Vietnam Pro: runtime workhorse, not an official brand font.

## Reference and trust gates

- Sen lane: PASS — structure/ordering only, no visual identity transfer;
- Triều lane: PASS — bounded language/knowledge only, no Toplink facts inferred;
- Caregiver/Sage/Guide behavior: PASS;
- fabricated evidence, person, facility, review, URL or health outcome: 0;
- M3P: DEFERRED TO ADMIN;
- M4: DEPRECATED — REMOVED FROM TARGET PRODUCT.

## Humanizer marking

These are expert rubric estimates, not measured user-test uplift.

| Surface              |    Score |
| -------------------- | -------: |
| Homepage             | 86 / 100 |
| Services             | 82 / 100 |
| Information routes   | 83 / 100 |
| Contact handoff      | 80 / 100 |
| Whole public surface | 82 / 100 |
| Humanizer scorecard  |  45 / 60 |

The truthful zero-evidence state and deferred channel URLs constrain the evidence/materiality and
contact scores. No hard fail is averaged away.
