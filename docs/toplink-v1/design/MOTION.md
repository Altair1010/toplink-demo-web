# Direction C Motion Authority

**Status:** LOCKED FOR P4. CSS/native first; no GSAP requirement in P3B.

## Philosophy

Motion expresses **release and procession**: a compressed threshold becomes a stable reading field,
then state changes remain quiet and local. Motion may orient or confirm state; it may not manufacture
prestige, delay reading or force the user's scroll.

## Canonical families

| Family | Purpose | Duration | Easing |
|---|---|---:|---|
| `feedback` | hover/focus/pressed acknowledgement | 120ms | linear or ease-out |
| `state` | disclosure and local state change | 180ms | `ease-out` |
| `threshold` | small chapter boundary change | 320ms | `cubic-bezier(.22,1,.36,1)` |
| `release` | one route-entry gateway release | 680ms | `cubic-bezier(.16,1,.3,1)` |

## Entry and transition rules

- One `release` is allowed on route entry after the H1 and body are already present in the DOM.
- The release may animate only opacity, transform or clip/inset geometry; no layout-dependent scroll.
- Later chapters do not auto fade up. Anchor navigation uses native scroll behavior.
- Disclosure/state motion follows explicit user input and preserves focus.
- Contact never pulses, bounces, floats persistently or auto-opens.

## Threshold/release behavior

Canonical gateway: nested frame starts slightly compressed and 0.55 opacity, then settles to the final
frame over 680ms. Text is static and readable throughout. Amplitude is capped at 24px translation or
12% frame-inset delta. No parallax, scroll hijack or continuous ambient loop.

## Mobile adaptation

At widths below 48rem, portals flatten to top/bottom rules, translation amplitude is at most 12px and
duration is capped at 320ms. No motion may increase page height or delay the first reading action.

## Reduced-motion contract

Under `prefers-reduced-motion: reduce`:

- all authored animation duration becomes `0.01ms` or `animation: none`;
- the final stable visual state is rendered immediately;
- smooth scrolling is disabled;
- no content, state, focus or reading order depends on motion.

## Forbidden

No scroll hijacking, every-section reveal, bounce, looping ornament, pulsing CTA, autoplay carousel,
cinematic page wipe, cursor follower, ambient particle field or motion-only explanation. P4 requires
no second motion stack and must not install GSAP unless a later approved behavior exceeds CSS/native
capability with a real consumer.
