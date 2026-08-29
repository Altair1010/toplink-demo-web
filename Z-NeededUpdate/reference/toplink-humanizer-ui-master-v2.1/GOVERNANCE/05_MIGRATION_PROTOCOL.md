# Migration Protocol — Target → Runtime

## 1. Freeze evidence and decision IDs
Do not migrate from a loose moodboard.

## 2. Build Delta Map
For each approved target:

| Decision | Current runtime | Target | Files/tokens | Risk | Verification |
|---|---|---|---|---|---|
| DEC-... | | | | | |

## 3. Classify change
- visual-only;
- interaction/state;
- content;
- engineering;
- architecture.

## 4. Check invariants
If the delta collides with a non-supersedable invariant, stop and escalate rather than quietly weakening the invariant.

## 5. Implement minimally
Migrate semantic layers first; do not mass-rewrite unrelated components.

## 6. Verify current→target
Use screenshot/state/task evidence and repo verification.

## 7. Re-baseline Runtime Truth
After merge/release, update docs so `DESIGN.md` and runtime tokens describe the new system rather than preserving a dead target document.
