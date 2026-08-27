# Motion vocabulary

`lib/motion/` is the stable kernel: plugin registration and lifecycle live in
`scrollTrigger.ts`; CSS-derived timing in `theme.ts`; engine constraints in
`config.ts`; and GSAP-only curves in `easings.ts`.

`components/motion/` provides capabilities rather than branded scenes: reveal,
progress track, counter and converge. Route-level components compose those
capabilities into the treatment and space journeys. Every capability documents its
trigger, start state, transition, final state, reduced-motion state and cleanup in
its source.

Do not add another motion runtime. Preserve native scrolling, static/no-JS visibility
and the reduced-motion final state when changing a recipe.
