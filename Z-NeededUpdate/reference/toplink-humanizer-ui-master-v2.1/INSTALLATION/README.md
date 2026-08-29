# Installation Notes

## Bundled Humanizer skills
The Agent Skills ecosystem uses self-contained folders with a `SKILL.md`; Vercel's skills CLI supports Codex, OpenCode and Claude Code and can install from local paths.  
**Nguồn:** [Vercel skills CLI](https://github.com/vercel-labs/skills/blob/main/README.md)

Recommended project-scoped command after extracting package into repo root:
```bash
npx skills add ./toplink-humanizer-ui-master-v2.0/SKILLS --skill '*' -a codex -a opencode -a claude-code -y
```
If the CLI cannot discover a multi-skill local folder in the installed version, run `npx skills add` once per individual skill directory. This fallback is an implementation precaution, not a sourced upstream requirement.

## External skills
Use pinned GitHub tree URLs or clone pinned commits locally before `npx skills add` when reproducibility matters.

## Browser stack
Default: Playwright CLI + Skills. Chrome DevTools is the default MCP. Playwright MCP remains conditional.  
**Nguồn:** [Playwright CLI](https://github.com/microsoft/playwright-cli/blob/2f85a94b7b885dbf4a5d34462f253a8746a690c9/README.md)  
**Nguồn:** [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/ebf58f2f4aa8f1dfbbae38e440fde4e5fef7deef/README.md)
