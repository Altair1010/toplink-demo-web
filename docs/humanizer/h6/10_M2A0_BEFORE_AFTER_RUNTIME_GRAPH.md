# 10 — M2A0 Before / After Runtime Graph

## Before

```text
PRODUCTION /
   |
   v
HomeHero
   |
   v
HomeExperience (client)
   |
   +--> symptom selection
   |       |
   |       v
   |    BODY_STATES
   |    Tắc / Hàn / Hư / Loạn
   |       |
   |       v
   `--> recommendation logic --> ranked service suggestions
   |
   v
RitualTimeline --> SpaceAsTherapy --> HomeFinalCTA
```

This graph was verified from current source before mutation, not inferred from the historical
migration report.

## After

```text
PRODUCTION /
   |
   v
HomeHero                         (unchanged legacy)
   |
   v
StaticOrientationShell          (server-safe, static)
   |
   +--> Opening Question
   +--> plain orientation context
   +--> Clear Boundary
   `--> local no-send / stop permission
   |
   v
RitualTimeline                  (unchanged legacy)
   |
   v
SpaceAsTherapy                  (unchanged legacy)
   |
   v
HomeFinalCTA                    (unchanged legacy)
```

`HomeExperience` has zero production import from `app/page.tsx`. Browser DOM contains zero old
question, zero exact Tắc/Hàn/Hư/Loạn verdict output and zero automatic recommendation surface.

## Legacy retained source

```text
BodySignalInterface
FourBodyStates
RecommendationDrawer
HomeExperience
recommendation.ts
content.ts body-state data
        |
        +--> retained for history / bounded rollback analysis
        `--> NOT reachable from production homepage after M2A0
```

M5 alone may retire these files after a future zero-consumer proof. Technical revert can restore
them, but it is not the preferred safe release fallback because it would reactivate the known
symptom → verdict → recommendation graph. A minimal truthful static orientation is the safe
fallback floor for M2A1.
