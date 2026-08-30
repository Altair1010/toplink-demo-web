# GitHub Workflow — ChatGPT Web ↔ Codex

## Principle

GitHub carries continuity. Chats do not.

## Roles

### ChatGPT Web

Best used for:

- research/specification;
- source comparison;
- architecture;
- design/content review;
- PR/diff review;
- decision updates;
- QA synthesis.

### Codex

Best used for:

- local repository inspection;
- browser capture/testing;
- code implementation;
- refactors scoped by the active phase;
- running tests/builds;
- commits/PR preparation.

### Human

Owns:

- major art-direction choice;
- changes to locked business/product scope;
- merging `main`;
- production release/DNS/hosting commitments;
- approval of facts/claims/content that require business authority.

## Branch policy

No direct pushes to `main`.

Suggested milestone branches:

```text
chore/v1-foundation
research/v1-reference-system
design/v1-direction
feat/v1-web-foundation
feat/v1-services-content
feat/v1-wordpress-model
feat/v1-headless-integration
feat/v1-commercial-readiness
```

Break down further when a branch would become difficult to review.

## PR rule

A PR must include:

- why;
- scope;
- screenshots for visual work;
- tests actually run;
- known gaps;
- content/evidence assumptions;
- rollback note when architecture/deployment changes.

## Handoff rule

Before handing from ChatGPT to Codex or vice versa, update `WORKSTATE.md` with one exact next action. Avoid long conversational summaries when the repo can carry the state.

## Concurrency

One actor owns an implementation branch at a time. Parallel research is fine; parallel mutation of the same files is not.
