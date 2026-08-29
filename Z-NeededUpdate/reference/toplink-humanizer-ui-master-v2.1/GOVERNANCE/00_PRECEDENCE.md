# Precedence — Two-Truth Governance

## Why this exists

The repo currently says runtime code/tokens beat documentation when they disagree. That is correct for answering **“what is running now?”** but insufficient for a redesign program that needs a separately approved target state.  
**Nguồn:** [Toplink AGENTS.md](https://github.com/Altair1010/toplink-demo-web/blob/main/AGENTS.md)

## Truth A — Runtime Truth

Used when asking what exists now:

`actual source/runtime → tokens.css → DESIGN.md explanation`

No Humanizer artifact may falsely claim the current runtime already matches a target decision.

## Truth B — Target Design Truth

Used when asking what an approved redesign should become:

`Locked Humanizer Decision → Approved Design Grammar → Proposed candidate`

Target truth does **not** mutate runtime by itself.

## Mutation authorization

Only an **Approved Migration Record** may translate Target Truth into changes to runtime code/tokens.

## Overall precedence

1. Platform/safety/legal requirements.
2. Repo engineering/safety invariants.
3. Explicit current user instruction / approved Human Gate.
4. Locked Humanizer decisions within their declared scope.
5. Approved Humanizer grammar/contracts.
6. Legacy `DESIGN.md` design defaults.
7. Proposed directions/agent suggestions.

## Important nuance

`tokens.css` remains the source of runtime truth even while a Humanizer migration is planned. After an approved migration is implemented and verified, the new `tokens.css` becomes runtime truth again.
