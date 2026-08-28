# 02 — H4R Prototype Specification

## Route and modes

- Source: `app-demo/app/motion-lab/humanizer-h4r/`
- Route: `/motion-lab/humanizer-h4r`
- Local base-path URL: `http://localhost:3000/toplink-demo-web/motion-lab/humanizer-h4r/`
- Capture modes: `grayscale`, `calibrated`, `blind`, `no-evidence`

The route uses fresh, route-local presentation components and a CSS module. The only reused project behavior is the existing font/runtime environment; no historical H4 presentation unit is imported.

## Unequal exchanges

### Exchange A — arrival/orientation

A large question and an editable phrase list let the visitor begin in ordinary Vietnamese. Selecting a phrase produces only an `oriented` state. It does not infer a condition or choose a service. Phrase-specific remove controls preserve editability and accessible names.

### Exchange B — boundary/scope

A dark, wide interruption changes geometry and density. Its question is independent of the chosen phrase: “Trước khi đi tiếp, Toplink có thể hỗ trợ gì và không làm gì?” The response explicitly says the phrase is not analyzed and does not change a service result. The bounded learning continuation is a single `<details>` disclosure, not a second product or knowledge portal.

### Exchange C — consequence/action

The composition reverses hierarchy: the current state occupies the dominant field; the question and controls sit in the smaller rail. Source order and measured area place consequence before action. No event creates `confirmed`, and no network transport exists.

## State graph

```text
IDLE
  │ choose phrase
  ▼
ORIENTED
  │ review boundary
  ▼
REVIEW ──────────────► LOCAL-ONLY
  ├──────────────────► UNCERTAIN
  └─ internal specimen► FAILURE ─► RETRY

Any invalid transition returns the existing state.
EDIT returns to ORIENTED or IDLE.
REMOVE may return to IDLE.
```

The implementation holds fixed phrases only in React memory. They are not persisted and are removed by reload or tab closure.

## Evidence behavior

No approved Toplink people/place/process evidence was available for this prototype. The evidence unit therefore truly collapses:

- `data-evidence-state="collapsed-unavailable"`;
- zero images;
- zero photo/evidence placeholders;
- no stock, synthetic person, other-brand material or decorative empty frame.

This proves coherent absence. It does **not** prove the later populated-evidence treatment; that remains untested until approved provenance and consent exist.

## Visual and motion constraints

The first six captures are grayscale. Structure depends on unequal ratios, density, light/dark field progression and consequence gravity—not hue. The calibrated mode adds one route-local warm action relationship after grayscale review. All values are H4R calibration values only, not target tokens.

Be Vietnam Pro is already available and is used without a new dependency. Motion uses sparse native transitions and focus movement; reduced motion exposes the same information immediately.
