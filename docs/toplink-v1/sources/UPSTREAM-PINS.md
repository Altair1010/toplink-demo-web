# Upstream Design Tool Pins

These repos are **tools/method sources**, not production dependencies to merge into the frontend.

## Hallmark

- Repo: `https://github.com/Nutlope/hallmark`
- Pinned main observed: `13ac0ec7e148655948100b6396439e481361d690`
- Role: macrostructure, design/taste grammar, anti-template patterns, structural diversity/memory.
- License: inspect upstream license before redistribution or vendoring.

## Impeccable

- Repo: `https://github.com/pbakaus/impeccable`
- Pinned main observed: `b0594c72d18006b5865c70eb3a97e8b04064e600`
- Role: PRODUCT/DESIGN context, direction workflow, detector, browser/live iteration, audit/critique, hooks and design-system conformance.
- License: Apache-2.0 at inspection time; always re-check upstream if bundling code.

## Integration hardening rules

1. **Pin revisions.** Never auto-pull latest into an active design sprint.
2. **Do not vendor the entire repos into production source.** Keep local tooling under ignored tooling/cache directories if installed.
3. **Do not let tool state become product truth.** Canonical decisions live in Toplink docs.
4. **Detector output is evidence, not an oracle.** False positives are possible; verify against DOM/computed style/browser geometry.
5. **No internal direction contract in shipped HTML/comments.** Design reasoning belongs in docs/tool state, not production markup.
6. **Explicit hook lifecycle.** Hooks must have an observable enabled/disabled state; do not rely on “missing config means enabled”.
7. **Resolved reports do not remain implicit future backlog.** Archive/close review artifacts after a verified fix.

## Local fetch policy

Use `bootstrap/fetch-upstreams.*` to clone the exact pins into a local ignored cache when a coding harness needs the original material. Do not commit those clones to the Toplink repo.
