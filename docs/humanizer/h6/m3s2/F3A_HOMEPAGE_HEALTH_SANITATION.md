# M3S-2 F3A — Homepage Health And Facility Implication Sanitation

## Decision

- **Authority:** `DEC-H6-CONSOLIDATED-01 / C5.F3A`
- **Baseline:** `16ffb7005cbb2f6cb42d960526ed6dc467da2bd4`
- **Scope:** the single reachable `HomeHero` claim cluster
- **Mutation:** approved brand/Humanizer rewrite; no clinical or operational meaning added

## Exact diff

`HomeHero` no longer claims root-cause recovery, a high-end Đông y facility, personalized health
care, manual treatment, natural remedies, technology or bodily balancing. Its heading and body now
introduce the already implemented guided-orientation job: no self-diagnosis, clear information
limits and user-held decision authority.

The stock ambience image receives empty alternative text and is decorative rather than identified
as a Toplink treatment facility. Removing or replacing the visual material itself would be a
material art-direction delta and remains coverage debt.

## Verification

- homepage DOM contains none of the removed health/facility claims;
- the target graph remains `HomeHero → OrientationCore → NarrativeCompletion`;
- heading order stays `h1` then section `h2` headings;
- 375, 768, 1280 and 1440 widths have no horizontal overflow;
- browser console errors and mutating requests remain zero;
- build, TypeScript, formatting and token checks pass.

## Boundary

This sub-batch does not clear F3 on service, about, product, space, process, training, franchise or
booking routes. Those claims remain explicitly deferred to the route migration delta.

## Rollback

Revert only the F3A commit. The removed legacy claims are not a truthful release fallback.
