# Toplink Current-State Evidence

## Strong substrate

Repo governance already has:
- CSS token source-of-truth;
- brand skin override mechanism;
- single advanced motion engine (GSAP);
- native scroll;
- mandatory reduced motion;
- static export;
- manual responsive/keyboard/zoom checks;
- `npm run verify` build/type/token gate.  
**Nguồn:** [Toplink AGENTS.md](https://github.com/Altair1010/toplink-demo-web/blob/main/AGENTS.md)

## Legacy design system

Current DESIGN.md defines crimson/gold/wood/ivory roles, Noto Serif + Be Vietnam Pro, large typography, restrained motion and a warm Eastern-traditional positioning.  
**Nguồn:** [Toplink DESIGN.md](https://github.com/Altair1010/toplink-demo-web/blob/main/DESIGN.md)

## Key inference

The codebase has strong implementation governance before brand/human evidence has been systematically harvested. This is a project inference from the repo + supplied evidence, not an external fact.

## UX worth preserving

Current booking provides a consultation path for users who do not know which service to choose and explains that the clinic will call back.  
**Nguồn:** [Toplink BookingStepper.tsx](https://github.com/Altair1010/toplink-demo-web/blob/main/app-demo/components/BookingStepper.tsx)

## Trust risk to eliminate before production

The demo booking code can mark submission successful through timeout/fallback even when a real form integration is not configured; this must remain demo behavior only.  
**Nguồn:** [Toplink BookingStepper.tsx](https://github.com/Altair1010/toplink-demo-web/blob/main/app-demo/components/BookingStepper.tsx)
