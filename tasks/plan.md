# Execution Plan — setup-claude-agent-system.ps1

Single PowerShell entry point thay thế `bootstrap-project.ps1`. Cài + wire hệ thống agent (token pipeline 4 lớp, foundation files, hooks, skills) vào repo. Idempotent, pause-on-fail.

## Phases (vertical slices + checkpoints)

| Phase | Mục tiêu | Verify | Checkpoint |
|---|---|---|---|
| P0 | Skeleton script + helpers (`Invoke-StepWithCheckpoint`, `Test-WslAvailable`, JSON/template helpers) | script parse, `-WhatIf` Phase 1 in compatibility report | — |
| P1 | Foundation files (7 .md) + cây `.claude/{skills,commands,agents,hooks}` | 7 file + dirs tồn tại, không overwrite | ✔ |
| P2 | Hooks wrappers + merge `.claude/settings.json` (PostSession→SessionEnd) | settings.json hợp lệ, hook smoke test | ✔ |
| P3 | Global install từng tool (rtk, headroom, codebase-memory-mcp, token-optimizer-mcp, caveman, loop tools, plugins) | `--version`/`/mcp` mỗi tool; fail→pause | ✔ |
| P4 | index + trellis init + caveman-compress CLAUDE.md | index sinh ra, CLAUDE.md nhỏ lại | ✔ |
| P5 | Validation + summary | report OK/Skip/Fail | — |
| P6 | Retire `bootstrap-project.ps1` → `.bak` | file đổi tên | ✔ |

## Sửa kỹ thuật so với prompt
- `PostSession` → `SessionEnd` (event hợp lệ).
- Hook command Unix → wrapper `.ps1` / `wsl -e`.
- 4 lớp nén: mỗi lớp một loại payload, thứ tự khóa trong RULES.md.
- Tool WSL2-only (codebase-memory-mcp, rtk full hook) cài qua `wsl`.

## Verify end-to-end
`.\setup-claude-agent-system.ps1` → `/mcp` thấy servers mới → hook smoke test → session mới load 7 file → `rtk gain` có savings → chạy lại = toàn [SKIP].
