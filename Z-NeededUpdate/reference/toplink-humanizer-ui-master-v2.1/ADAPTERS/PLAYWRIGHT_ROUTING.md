# Playwright Routing

## Default: CLI + Skills
Microsoft's current README explicitly positions CLI as the best fit for coding agents because it avoids loading large MCP schemas/accessibility trees into model context.  
**Nguồn:** [Playwright CLI](https://github.com/microsoft/playwright-cli/blob/2f85a94b7b885dbf4a5d34462f253a8746a690c9/README.md)

Use for:
- critical task walkthroughs;
- screenshots;
- viewport checks;
- network mocks;
- console/requests;
- persistent named sessions when needed;
- design review dashboard.

## Escalate to MCP only when
- exploratory loop needs persistent browser context;
- self-healing/iterative page-structure reasoning is central;
- the task is browser-heavy enough that the MCP overhead is justified.  
**Nguồn:** [Playwright MCP](https://github.com/microsoft/playwright-mcp/blob/main/README.md)
