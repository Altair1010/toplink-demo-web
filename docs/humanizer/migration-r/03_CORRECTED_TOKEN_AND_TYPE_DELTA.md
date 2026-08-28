# 03 — Corrected Token and Type Delta

## M0R decision

The 41 active conceptual public roles are not 41 CSS variables. Fresh classification identifies
**13 global-alias candidates**, all capable of resolving as visual no-ops to existing primitives.
The exact immediate M0R implementation set is **0 aliases** until a named calibrated consumer exists;
these mappings are compatibility candidates, not approved target values. The remaining
roles use existing typography primitives, component-local variables, CSS class/state contracts or
documentation-only behavior.

### Implementation classes

- **A — GLOBAL CSS ALIAS REQUIRED:** 13
- **B — EXISTING TOKEN ALIAS / SCALE REUSED:** 8
- **C — COMPONENT-LOCAL SEMANTIC VARIABLE:** 3
- **D — CSS CLASS / STATE, NO VARIABLE:** 8
- **E — DOCUMENTATION-ONLY CONTRACT:** 9
- **F — DEFERRED / PRIVATE among active roles:** 0

The three historical roles excluded from the 41 active public set remain: `action.danger`
component-private, `state.pending` deferred and `state.confirmed-future` deferred.

## Role → alias/local/docs implementation graph

```text
41 ACTIVE CONCEPTUAL ROLES
  |
  +--> 13 A candidates: introduce `--h-*` just-in-time with a named consumer
  |         `--> existing primitives only -> calibrated no-op -> never dormant by default
  |
  +--> 8 B: reuse existing sans/type scale/leading tokens
  |         `--> no new global alias
  |
  +--> 3 C: local evidence/context variables only when the component exists
  |
  +--> 8 D: action/state classes and attributes
  |         `--> no scalar variable API
  |
  `--> 9 E: spacing and motion behavior contracts
            `--> existing layout/motion primitives selected per component
```

## Exact M0R global aliases

All proposed aliases are added after `@theme` in an ordinary `:root` block in
`app-demo/styles/tokens.css`. They do not generate Tailwind utilities and receive no consumer in
M0R itself.

| Corrected role / alias                        | Existing primitive    | Fresh primitive search footprint | M0R consumers | Rollback          |
| --------------------------------------------- | --------------------- | -------------------------------: | ------------: | ----------------- |
| `surface.canvas` / `--h-surface-canvas`       | `--color-cream`       |              51 sites / 24 files |             0 | remove alias line |
| `surface.reading` / `--h-surface-reading`     | `--color-ivory`       |                          51 / 26 |             0 | remove alias line |
| `surface.response` / `--h-surface-response`   | `--color-ivory`       |                          51 / 26 |             0 | remove alias line |
| `surface.attention` / `--h-surface-attention` | `--color-crimson-600` |                         106 / 33 |             0 | remove alias line |
| `text.primary` / `--h-text-primary`           | `--color-ink`         |                          86 / 28 |             0 | remove alias line |
| `text.secondary` / `--h-text-secondary`       | `--color-ink-soft`    |                          45 / 23 |             0 | remove alias line |
| `text.muted` / `--h-text-muted`               | `--color-ink-mute`    |                           10 / 7 |             0 | remove alias line |
| `text.inverse` / `--h-text-inverse`           | `--color-ivory`       |                          51 / 26 |             0 | remove alias line |
| `text.action` / `--h-text-action`             | `--color-crimson-600` |                         106 / 33 |             0 | remove alias line |
| `rule.subtle` / `--h-rule-subtle`             | `--color-sand`        |                          41 / 19 |             0 | remove alias line |
| `rule.structural` / `--h-rule-structural`     | `--color-ink-mute`    |                           10 / 7 |             0 | remove alias line |
| `rule.focus` / `--h-rule-focus`               | `--color-crimson-600` |                         106 / 33 |             0 | remove alias line |
| `rule.boundary` / `--h-rule-boundary`         | `--color-crimson-700` |                          17 / 15 |             0 | remove alias line |

The footprints are current primitive occurrence sites, not proposed alias consumers; repeated
primitives legitimately appear on multiple rows. `--h-rule-focus` does not replace the gold
`.on-dark` focus rule in M0R. A later consumer batch must test each surface context before adopting
the alias.

Because `skins.css` remaps legacy crimson/surface primitives, none of these aliases may become a
consumer API until default, `tet` and `an-tinh` contexts pass named H4R-C calibration. A no-op is not
the same as target-value approval.

## Full 41-role implementation map

| Active corrected role | Type | Runtime implementation / current basis                              | First affected paths                           | Current target-role consumers | Rollback boundary       |
| --------------------- | ---- | ------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------: | ----------------------- |
| `surface.canvas`      | A    | `--h-surface-canvas` → cream                                        | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `surface.reading`     | A    | `--h-surface-reading` → ivory                                       | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `surface.response`    | A    | `--h-surface-response` → ivory                                      | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `surface.attention`   | A    | `--h-surface-attention` → current crimson; no calibration           | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `surface.evidence`    | C    | local only when approved evidence renders                           | future `EvidenceAnswer.tsx` + local stylesheet |                             0 | evidence component      |
| `text.primary`        | A    | `--h-text-primary` → ink                                            | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `text.secondary`      | A    | `--h-text-secondary` → ink-soft                                     | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `text.muted`          | A    | `--h-text-muted` → ink-mute                                         | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `text.inverse`        | A    | `--h-text-inverse` → ivory                                          | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `text.action`         | A    | `--h-text-action` → crimson-600                                     | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `text.context`        | C    | component-local readable context; no provenance badge               | future evidence/learning consumer              |                             0 | local declaration       |
| `rule.subtle`         | A    | `--h-rule-subtle` → sand                                            | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `rule.structural`     | A    | `--h-rule-structural` → ink-mute                                    | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `rule.context`        | C    | local evidence/caption binding only                                 | future `EvidenceAnswer.tsx`                    |                             0 | local declaration       |
| `rule.focus`          | A    | `--h-rule-focus` → current light-surface focus                      | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `rule.boundary`       | A    | `--h-rule-boundary` → crimson-700                                   | `styles/tokens.css`                            |                             0 | M0R alias line          |
| `action.primary`      | D    | component class consumes surface/text roles                         | corrected action component                     |                             0 | component/class         |
| `action.secondary`    | D    | component class; peer/no-choice route                               | corrected action component                     |                             0 | component/class         |
| `action.quiet`        | D    | component class for edit/remove/back                                | corrected action component                     |                             0 | component/class         |
| `action.disabled`     | D    | native `disabled` + reason                                          | corrected action component                     |                             0 | component/state         |
| `state.selected`      | D    | `aria-pressed`/data state + class                                   | Guided Orientation                             |                             0 | component/state         |
| `state.focus`         | D    | `:focus-visible`; no duplicate color role                           | corrected components                           |                             0 | component/state         |
| `state.error`         | D    | semantic error message + class                                      | state-bearing consumer                         |                             0 | component/state         |
| `state.uncertain`     | D    | explicit user-controlled state                                      | Guided Orientation / consequence               |                             0 | component/state         |
| `space.reading`       | E    | measure/rhythm contract using existing spacing                      | corrected stylesheet                           |                             0 | consumer stylesheet     |
| `space.chapter`       | E    | unequal major transition                                            | corrected stylesheet                           |                             0 | consumer stylesheet     |
| `space.evidence`      | E    | contextual interruption; no empty slot                              | evidence contract                              |                             0 | component composition   |
| `space.compact`       | E    | compact related facts/scope                                         | local component                                |                             0 | component composition   |
| `space.consequence`   | E    | state → edit/recover → action order                                 | consequence contract                           |                             0 | component composition   |
| `type.hero`           | B    | `--font-sans` + existing `--text-hero` as ceiling, not fixed recipe | typography/M2A                                 |                             0 | scoped type class       |
| `type.chapter`        | B    | `--font-sans` + existing scale                                      | typography/M2                                  |                             0 | scoped type class       |
| `type.heading`        | B    | `--font-sans`, 600                                                  | typography/M2                                  |                             0 | scoped type class       |
| `type.body`           | B    | existing Be Vietnam Pro/body leading                                | typography/M2                                  |                             0 | scoped type class       |
| `type.body-strong`    | B    | existing sans weight 600                                            | typography/M2                                  |                             0 | scoped type class       |
| `type.utility`        | B    | restrained existing sans utilities                                  | typography/M2                                  |                             0 | scoped type class       |
| `type.context`        | B    | existing readable sans utility; no micro metadata                   | evidence/learning                              |                             0 | scoped type class       |
| `type.action`         | B    | existing sans action behavior                                       | corrected actions                              |                             0 | scoped type class       |
| `motion.KHAI`         | E    | existing CSS/GSAP substrate selected per job                        | corrected component                            |                             0 | consumer implementation |
| `motion.DAN`          | E    | focus/attention relation, not a timing token                        | corrected component                            |                             0 | consumer implementation |
| `motion.TU`           | E    | selection gathers into editable summary                             | Guided Orientation                             |                             0 | consumer implementation |
| `motion.AN`           | E    | consequence/error settles                                           | corrected component                            |                             0 | consumer implementation |

## M0R exact decision boundary

```text
BATCH: M0R
PATH: app-demo/styles/tokens.css [candidate owner]
ACTION: CONDITIONAL / NO CHANGE UNTIL NAMED CONSUMER
PURPOSE: add only the calibrated semantic subset consumed by the approved batch
TARGET CONTRACT: corrected functional semantics without archive names
CURRENT RUNTIME: raw palette/type/motion primitives; no --h-* roles
DELTA NOW: 0 aliases; future exact subset chosen from the documented 13 candidates
RISK: accidental utility generation, value drift or promotion of legacy/skin values into target truth
VERIFY: approve named H4R-C/default/skin calibration first; then computed equality and stable utility count
ROLLBACK: remove only the named consumer's bounded alias subset after detaching that consumer
```

**M0R readiness: CONDITIONAL.** The candidate pool is exact, but a 13-line dormant patch would not
be implementation-minimal. Consumer adoption and alias creation are forbidden until a named
calibration review approves the exact required subset across default and retained skins.

## M1 typography rebuild

Be Vietnam Pro is already loaded. M1 has no concrete dependency on M0R and must remain independently
revertible.

| Noto consumer disposition | Scope                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| KEEP TEMPORARILY          | all 55 current sites / 26 files until a named route/component migrates                      |
| MIGRATE IN M1             | add scoped VX-02 sans behavior in `app-demo/styles/typography.css`; no global h1/h2 rewrite |
| MIGRATE IN LATER BATCH    | exact homepage consumers when M2A/M2B adopts the scoped classes                             |
| RETIRE AFTER ZERO         | Noto import/variable and global serif aliases only after verified zero consumers            |

```text
BATCH: M1
PATH: app-demo/styles/typography.css
ACTION: MODIFY
PURPOSE: define scoped sans-first VX-02 type behavior
TARGET CONTRACT: Vietnamese readability and Q/A hierarchy
CURRENT RUNTIME: Noto global h1/h2 + explicit display classes; Be Vietnam Pro already loaded
DELTA: scoped classes only; no existing consumer and no font removal
RISK: zero standalone user value; future consumer line-wrap risk
VERIFY: static gate plus consumer-batch computed-font/browser matrix; reject `font-display`,
`font-serif-display`, `heading-font`, `--font-serif` and prestige-serif fallbacks in corrected subtree
ROLLBACK: remove the scoped block independently
```

**M1 readiness: CONDITIONAL.** It is technically bounded, but a no-consumer stylesheet change is not
a useful first H6 result. Approve it with a named consumer batch or require an explicit reason to
land the dormant class contract alone.

Rollback coupling changes after adoption: while M1 has zero consumers, removing its scoped block is
independent. Once M2A/M2B uses those classes, M1 may roll back only after consumers move to their
equivalent local sans declarations or in the same atomic rollback as the consumer batch.

## Color calibration boundary

The 13 proposed M0R mappings use current primitives only to describe a possible no-op bridge; they
are not approved target values. Before M0R can become READY or any consumer can adopt it, a named
calibration must test canvas, reading, text, focus, selected, error, uncertain and action across the
default and both retained skin contexts against H4R-C. Exact hex remains a migration calibration
proposal. It cannot imply heritage, prestige, tradition or health certainty.

Alias introduction is just-in-time: even after calibration, add only roles required by the named
cross-context consumer. Thirteen is the exact upper-bound proposal, not a mandate to land 13 dormant
globals at once.
