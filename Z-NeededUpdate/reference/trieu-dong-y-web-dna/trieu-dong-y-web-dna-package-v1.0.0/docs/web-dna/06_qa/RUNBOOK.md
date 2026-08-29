# Runbook

## Regenerate Web DNA

Run `node scripts/build-web-dna.mjs` after raw evidence or route inventory changes. The generator rebuilds normalized content, graph artifacts, tokens and capture accounting deterministically.

## Verify

Run `npm test`. It builds the production Worker, validates hosting artifacts, checks route/content accounting, verifies graph integrity, detects task-graph cycles and renders primary product routes.

## Codex continuation

Read `AGENTS.md` and `MASTER_PROMPT.md`. Load only the required content record and graph neighborhood. Do not edit raw evidence.

## Launch controls

Before a real medical-service launch, configure brand/legal/service variables, complete professional content review, verify claims and contact flows, then run accessibility and performance checks against the deployed origin.

