# Phase Card P4 — Frontend Reconstruction

## Strategy

Build against typed fixtures shaped exactly like the planned CMS domain types.

### Order

1. production shell/navigation/footer;
2. homepage;
3. service index/detail;
4. knowledge/article;
5. product index/detail;
6. space;
7. contact;
8. remaining news/editorial views.

## Motion

Use CSS for local transitions. Add GSAP only after a specific approved motion story requires it. Keep `prefers-reduced-motion` final-state behavior.

## Browser gate per surface

- 375 / 768 / 1280 / 1440
- keyboard-only
- 200% equivalent zoom/reflow
- reduced motion
- no console errors
- no horizontal overflow

## Exit

The site feels complete with fixtures. WordPress must be able to replace data, not repair the design.
