# START HERE — Triều Đông Y Web DNA v1.0.0

Đây là package hoàn chỉnh để đưa cho Codex. Bạn không cần đọc từng file trước.

## Cách dùng nhanh nhất

1. Giải nén toàn bộ ZIP thành một thư mục.
2. Mở thư mục đó bằng Codex.
3. Gửi prompt sau:

```text
Hãy đọc START_HERE.md, AGENTS.md và MASTER_PROMPT.md trước.
Sau đó kiểm tra docs/web-dna/00_MANIFEST.md và task-graph.json.
Không sửa raw evidence. Hãy tóm tắt trạng thái hiện tại, các giới hạn đã ghi nhận,
rồi đề xuất execution plan để chuyển evolved prototype thành website cá nhân của tôi.
Mọi thay đổi UI phải viện dẫn evidence, decision hoặc hypothesis ID tương ứng.
```

## Những file bạn thực sự cần biết

| File | Vai trò |
|---|---|
| `START_HERE.md` | Điểm bắt đầu cho người dùng và Codex |
| `AGENTS.md` | Luật vận hành bắt buộc cho Codex |
| `MASTER_PROMPT.md` | Prompt nền của dự án |
| `docs/web-dna/00_MANIFEST.md` | Bản đồ package |
| `docs/web-dna/01_governance/MASTER_PLAN.md` | Master plan đầy đủ |
| `docs/web-dna/04_ui_ir/UI_MINDSET.md` | Hiến pháp UI |
| `docs/web-dna/06_qa/RELEASE_CHECKLIST.md` | Những gì đã xong và còn thiếu |
| `task-graph.json` | Dependency graph cho các task Codex |

Các thư mục `data/`, `docs/web-dna/02_evidence/raw/` và `docs/web-dna/05_graphs/`
là dữ liệu nguồn cho Codex. Bạn không cần mở thủ công, và không nên nhồi toàn bộ
chúng vào một prompt.

## Chạy project trên máy

Yêu cầu Node.js 22.13 trở lên.

```bash
npm ci
npm test
npm run dev
```

## Trạng thái bàn giao

- 634/634 route đã capture.
- Baseline reconstruction và evolved prototype đã có.
- Production build và 5 acceptance test đã PASS.
- Đây là private evidence-backed prototype, chưa phải website dịch vụ y tế đã hoàn tất legal/clinical review.

## Quyết định tiếp theo dành cho bạn

Bạn chỉ cần chuẩn bị các biến thương hiệu thật: tên cá nhân/thương hiệu, vai trò
chuyên môn được phép công bố, màu ưu tiên, địa chỉ/kênh liên hệ và mục tiêu CTA.
Sau đó Codex có thể dùng package này để tạo bản UI cá nhân hóa tiếp theo.

