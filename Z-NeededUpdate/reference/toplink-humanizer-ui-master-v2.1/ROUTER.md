# Humanizer Router

| Phase | Mục tiêu | Primary skill | External assist | Human gate |
|---|---|---|---|---|
| H0 Evidence | thu bằng chứng thật | `human-evidence-harvest` | none | — |
| H1 User/Narrative | task, needs, state, narrative | `humanizer-ux-state-review` | none | — |
| H2 Direction | 3 art directions | `humanizer-art-direction` | `frontend-design` challenger only | Gate A |
| H3 System | grammar/tokens/motion target | orchestrator | web guidelines as constraint check | Gate B |
| H4 Migration | translate target → code delta | orchestrator | coding agent | mutation approval if consequential |
| H5 Implementation | implement approved delta | coding agent | Playwright CLI skills | — |
| H6 Verification | prove release quality | `humanizer-release-verifier` | Playwright CLI + Chrome DevTools MCP + pinned web guidelines | Gate C |

## Tool routing principle

Microsoft's current Playwright guidance says CLI + Skills is the better fit for coding agents because it is more token-efficient; Playwright MCP remains useful when persistent browser state and rich introspection justify the schema/context cost.  
**Nguồn:** [Microsoft Playwright CLI](https://github.com/microsoft/playwright-cli/blob/2f85a94b7b885dbf4a5d34462f253a8746a690c9/README.md)  
**Nguồn:** [Microsoft Playwright MCP](https://github.com/microsoft/playwright-mcp/blob/main/README.md)

Therefore:

- **Default browser execution:** Playwright CLI + Skills.
- **Performance/runtime diagnosis:** Chrome DevTools MCP.
- **Persistent exploratory browser loop:** Playwright MCP only by escalation.
- **Canvas handoff:** Figma MCP only if Figma becomes an explicit Human Gate surface.


## Foundation loading policy (v2.1)

Operational skills MUST NOT reason from their short SKILL.md alone.
Before producing substantive output, load the phase-specific `FOUNDATION/` chapters listed in `00_START_HERE.md`.

This rule exists because v2.0 compressed too much design doctrine into skill summaries.
The skill defines **procedure**; the foundation defines **knowledge and design semantics**.
