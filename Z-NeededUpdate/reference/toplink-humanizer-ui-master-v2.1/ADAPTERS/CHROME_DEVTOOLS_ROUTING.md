# Chrome DevTools MCP Routing

Use for:
- performance trace/insights;
- LCP/CLS/runtime diagnosis;
- network waterfall;
- console/source-mapped errors;
- Chrome-specific rendering/runtime inspection.

Chrome DevTools MCP officially exposes performance insights, network/console debugging, screenshots and browser automation.  
**Nguồn:** [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/ebf58f2f4aa8f1dfbbae38e440fde4e5fef7deef/README.md)

Suggested privacy-aware Codex config:
```bash
codex mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest --no-usage-statistics --no-performance-crux
```
The privacy flags correspond to documented opt-outs.  
**Nguồn:** [Chrome DevTools MCP README](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/ebf58f2f4aa8f1dfbbae38e440fde4e5fef7deef/README.md)
