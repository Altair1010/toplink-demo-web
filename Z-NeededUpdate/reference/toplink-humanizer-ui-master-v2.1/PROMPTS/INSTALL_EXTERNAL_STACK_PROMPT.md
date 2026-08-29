# Prompt — Install External Humanizer Stack

> In repo root, read `toplink-humanizer-ui-master-v2.0/ADAPTERS/EXTERNAL_STACK.md` and `package.lock.json`, then install/verify only the **CORE** external stack: Anthropic `frontend-design` at pinned commit `3b3fad96…`, Vercel `web-design-guidelines` at pinned agent-skills commit `dd089a8…` (Gate C must use pinned rules `e3d624ba…`), `@playwright/cli@latest` + `playwright-cli install --skills`, and Chrome DevTools MCP for Codex with `--no-usage-statistics --no-performance-crux`. Install the bundled Humanizer skills project-scoped for Codex/OpenCode/Claude Code. Do not install conditional Figma/Storybook/Playwright MCP unless their trigger is met. Do not modify app code. Report exact commands, installed versions/paths and any failure.

Sources for the installation/routing choices are recorded in `KNOWLEDGE/SOURCE_REGISTER.md`.  
**Nguồn:** [Vercel skills CLI](https://github.com/vercel-labs/skills/blob/main/README.md)  
**Nguồn:** [Playwright CLI](https://github.com/microsoft/playwright-cli/blob/2f85a94b7b885dbf4a5d34462f253a8746a690c9/README.md)  
**Nguồn:** [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/ebf58f2f4aa8f1dfbbae38e440fde4e5fef7deef/README.md)
