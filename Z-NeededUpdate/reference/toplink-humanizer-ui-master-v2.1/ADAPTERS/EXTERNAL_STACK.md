# External Stack — Minimal, Routed, Reproducible

## CORE

### 1. Anthropic `frontend-design` — challenger, not authority
Official skill focuses on distinctive/opinionated visual direction and asks for a justified aesthetic risk; Humanizer therefore gives it a subordinate challenger role after evidence/brief lock.  
**Nguồn:** [Anthropic frontend-design at pinned commit](https://github.com/anthropics/skills/blob/3b3fad96af16a10759d930941b4520ba0c40edae/skills/frontend-design/SKILL.md)

### 2. Vercel `web-design-guidelines` — validator
The skill is designed to review UI code against web-interface rules. Its own instructions fetch the latest guideline file dynamically, so Humanizer release verification uses the pinned guideline revision recorded in `package.lock.json` for reproducibility.  
**Nguồn:** [Vercel web-design-guidelines skill](https://github.com/vercel-labs/agent-skills/blob/dd089a8c752c966dee8bf0f27cb625ba193ffd9e/skills/web-design-guidelines/SKILL.md)  
**Nguồn:** [Pinned Web Interface Guidelines rules](https://github.com/vercel-labs/web-interface-guidelines/blob/e3d624baaf29dc1fc645aff3e38f03e564d2d6b1/command.md)

### 3. Playwright CLI + Skills — default browser execution
Microsoft currently says CLI+Skills is the best fit for coding agents and more token-efficient than MCP for high-throughput coding workflows.  
**Nguồn:** [Playwright CLI](https://github.com/microsoft/playwright-cli/blob/2f85a94b7b885dbf4a5d34462f253a8746a690c9/README.md)

Install pattern documented upstream:
```bash
npm install -g @playwright/cli@latest
playwright-cli install --skills
```
**Nguồn:** [Playwright CLI install docs](https://github.com/microsoft/playwright-cli/blob/2f85a94b7b885dbf4a5d34462f253a8746a690c9/README.md)

### 4. Chrome DevTools MCP — performance/runtime specialist
Chrome DevTools MCP exposes live Chrome automation, network/console inspection and performance traces. Usage statistics are enabled by default and CrUX may be queried by performance tools; Humanizer's suggested config opts out with `--no-usage-statistics --no-performance-crux`.  
**Nguồn:** [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/ebf58f2f4aa8f1dfbbae38e440fde4e5fef7deef/README.md)

Codex install form documented upstream:
```bash
codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest
```
Humanizer adds privacy flags after the package argument.  
**Nguồn:** [Chrome DevTools MCP — Codex setup](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/ebf58f2f4aa8f1dfbbae38e440fde4e5fef7deef/README.md)

## CONDITIONAL — do not install by default

### Playwright MCP
Escalate only for long/persistent browser loops where rich introspection is worth the extra MCP context. Microsoft explicitly differentiates this use case from routine coding-agent CLI work.  
**Nguồn:** [Playwright MCP](https://github.com/microsoft/playwright-mcp/blob/main/README.md)

### Figma MCP
Use only if Figma becomes an explicit Human Gate canvas. Figma MCP can supply structured design context/components/variables, but it is not required for a code-first Humanizer workflow.  
**Nguồn:** [Figma MCP docs](https://developers.figma.com/docs/figma-mcp-server/)

### Storybook
Add only when reusable stateful components become numerous enough to justify an isolated component workshop.
