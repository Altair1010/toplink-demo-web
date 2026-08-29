# Motion Semantics

## Accessibility constraint

W3C notes non-essential animation triggered by interaction should be disable-able under WCAG 2.3.3 (AAA), and specifically identifies `prefers-reduced-motion` as a technique.  
**Nguồn:** [W3C — Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

Toplink repo already mandates reduced-motion and keeps GSAP as the single motion engine for advanced scenes.  
**Nguồn:** [Toplink — AGENTS.md](https://github.com/Altair1010/toplink-demo-web/blob/main/AGENTS.md)

## Motion verbs

### KHAI — reveal/open
Meaning: entering a chapter.
Use: hero image reveal, chapter opening.
Avoid: every card.

### DẪN — guide
Meaning: attention moves through a process.
Use: treatment journey, progress line, relationship between text/image.

### TỤ — converge
Meaning: scattered context becomes a decision.
Use: selected service, CTA convergence, recommendation state.

### AN — settle
Meaning: transition ends without demanding attention.
Use: modal settled state, final CTA, confirmation.

## Engine split

### CSS
- hover/focus/press;
- short opacity/transform;
- simple disclosure.

### GSAP
- multi-element choreography;
- spatial continuity;
- narrative scenes;
- synchronized chapter transitions.

## Forbidden
- perpetual decorative motion;
- parallax without narrative utility;
- scroll hijacking;
- bounce/spring merely to look “alive”;
- animation that delays content availability.
