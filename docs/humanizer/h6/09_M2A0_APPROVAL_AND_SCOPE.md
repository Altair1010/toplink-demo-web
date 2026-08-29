# 09 — M2A0 Approval and Scope

- **Decision:** `DEC-MIGR-H6-M2A0-01`
- **Approved batch:** `M2A0 ONLY — STATIC SAFE HOMEPAGE SHELL`
- **Baseline:** `083c9899fd28d82cc2bcdbebb0ac5eeaaea24527`
- **Branch:** `main`
- **Authority:** explicit human migration approval in the H6.3 master task

## Mutation boundary

Production changes are limited to:

- `app-demo/app/page.tsx`;
- `app-demo/app/globals.css`;
- `app-demo/styles/home-humanizer.css`;
- `app-demo/components/home-experience/corrected/StaticOrientationShell.tsx`.

The batch replaces only the reachable `HomeExperience` position. `HomeHero`, `RitualTimeline`,
`SpaceAsTherapy`, `HomeFinalCTA`, the old Body Signal source, global tokens, skins, typography,
booking transport and content data remain outside scope.

## Approved static floor

```text
OPENING QUESTION
       |
       v
PLAIN ORIENTATION CONTEXT
       |
       v
CLEAR BOUNDARY
       |
       v
LOCAL NO-SEND CONSEQUENCE
       |
       v
UNCERTAINTY / STOPPING IS ALLOWED
```

`StaticOrientationShell` is a server component with no client directive, form, control, state,
timer, fetch, service data or evidence branch. Its copy stays within the four approved statements.
M2A1, M2B, M0R, M1, M3S-2, M3P, M4 and M5 are not authorized by this decision.

## Local design ownership

`home-humanizer.css` owns only `.hh-home-shell*`. It uses existing runtime primitives through
component-local variables, keeps a neutral/grayscale field and enforces `var(--font-sans)` inside
the shell. It creates no `:root` alias and does not override `[data-brand]`.
