# TODO — setup-claude-agent-system.ps1

Nguồn plan: `C:\Users\MCBAu\.claude\plans\read-f-codex-yvien-hotlink-humming-hennessy.md`

## P0 — Skeleton & helpers  ✅ (parse OK, BOM UTF-8)
- [x] 1. `setup-claude-agent-system.ps1`: param block + Write-Step/Ok/Skip/Fail/Info
- [x] 2. Helpers: Test-CommandExists, Read-JsonOrEmpty, Write-JsonFile, Add-IfMissing, Write-Template
- [x] 3. Test-WslAvailable, Invoke-InWsl, Invoke-StepWithCheckpoint (fix/skip/abort + ResumeFrom)

## P1 — Foundation files  ✅ (test temp: 7/7 file)
- [x] 4. Write-FoundationFiles: 7 .md here-string, không overwrite (Write-Template trả $false nếu tồn tại)
- [x] 5. New-ClaudeDirTree: .claude/{skills,commands,agents,hooks} + .trellis/* + .claude-loop/

## P2 — Hooks & settings  ✅ (test: settings hợp lệ, hooks=PreToolUse,PostToolUse,SessionEnd)
- [x] 6. Hook wrappers: rtk-rewrite.ps1, cbm-discovery.ps1, context-counter.py, session-learner.ps1 (auto wsl-wrap)
- [x] 7. Write-ProjectSettings: merge hooks + mcpServers + permissions; PostSession→SessionEnd

## P3 — Global install (pause-on-fail mỗi tool)  ⏸ CHỜ USER CHẠY INTERACTIVE
- [x] 8. Đã code: Install-Rtk(WSL2), Install-Headroom(pipx), Install-CodebaseMemoryMcp(WSL2)
- [x] 9. Đã code: token-optimizer-mcp(npm), caveman(PS), loop-tools, plugins
  - ⏸ Chưa thực thi trên repo thật: cần chạy `.\setup-claude-agent-system.ps1` để pause-on-fail tương tác

## P4 — Index + compress  ✅ (đã code; trellis init = MANUAL vì interactive)
- [x] 10. Initialize-Indexes (codebase-memory/codegraph + Push-Location fix) · caveman-compress · trellis nhắc thủ công

## P5 — Validation & summary  ✅ (test temp: 20 OK/3 Skip/0 Fail)
- [x] 11. Test-Setup (JSON valid + đếm 7 file) · Show-Summary + resume hint

## P6 — Retire bootstrap  ⏸ chạy khi user áp dụng trên repo thật
- [x] 12. Đã code: bootstrap-project.ps1 → .bak (checkpoint trước khi đụng)

## Lưu ý
- node.exe pid 22832 (trellis init test cũ) có thể còn treo — đóng thủ công nếu cần (classifier chặn tôi kill).
- Chạy trên repo THẬT: `.\setup-claude-agent-system.ps1` (mặc định cwd). Tool đã cài (rtk/headroom/codegraph) sẽ [SKIP]; tool chưa có sẽ pause hỏi fix/skip/abort.
