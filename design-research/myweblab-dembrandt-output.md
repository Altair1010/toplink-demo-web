# MyWebLab — Dembrandt extraction (raw)

> Nguồn: `https://myweblab.it/` · Công cụ: `dembrandt v0.20.0` · Cờ: `--slow --wcag`
> Ngày chạy: 2026-06-25. Đây là **dữ liệu thô để tham khảo nguyên lý thiết kế**.
> KHÔNG dùng để sao chép màu/asset/text 1:1 — Y Viện có bộ token riêng (xem `myweblab-token-analysis.md`).

## Extraction log
```
✓ Page loaded · Hydration settled (24.0s) · Main content detected
✓ Content validated: 21583 chars
Colors: 4 · Typography: 40 styles · Spacing: 20 values · Border radius: 5
Borders: 10 · Shadows: 1 · Buttons: 2 · Links: 2 · Breakpoints: 9
Gradients: 2 · Motion: 1 duration, 4 easings · Hover/focus: 21 state colors
WCAG: 6/10 pairs pass AA · 2 state pairs fail
```

## Logo & assets
- Logo: `myweblab.webp` (2560×241)
- og/twitter image: `img/home-hero.webp`

## Colors
| Hex | Role | RGB |
|-----|------|-----|
| `#2a26f7` | primary | rgb(42, 38, 247) — xanh điện (electric blue) |
| `#141414` | neutral | rgb(20, 20, 20) — gần đen |
| `#606060` | neutral | rgb(96, 96, 96) — xám body |
| `#ffffff` | surface | rgb(255, 255, 255) |
| `#101010` | — | rgb(16, 16, 16) |
| `#ff4e00` | accent (state) | cam — chỉ xuất hiện ở hover/state |
| `#efefef` | surface phụ | rgb(239, 239, 239) |
| `#dcdcdc` | border | rgb(220, 220, 220) |

## Typography
- **Instrument Serif** (display/heading) — weight 600. Cỡ rất lớn: 280px, 150px, 132px, 82px, 72px, 60px, 44px, 38px, 36px, 34px, 32px, 24px, 18px.
- **Plus Jakarta Sans** (body/ui/link) — weight 500, 600. Cỡ: 88px, 36px, 26px, 24px, 19px, 18px (link), 15px, 13px, 12px (ui).
- → Cặp **serif hiển thị khổng lồ + sans body** tạo tương phản editorial.

## Spacing
- Hệ thống: **8px base**.
- Thang: 6.4 · 8 · 9 · 11.88 · 12 · 14 · 14.4 · 16 · 25.6 · 32 · 38 · 40 · 43.2 · 44 · 48 (px).

## Border radius
- `4px` (card) · `50%` (span/avatar/dot).
- → Bo góc **tối giản/sắc** — gần như vuông, chỉ radius nhỏ.

## Borders
- 1px solid `#141414` (a, section, li, div)
- 1px solid `#606060` (div, p)
- 1px solid `#dcdcdc` (div, card)
- → Phong cách **đường kẻ mảnh 1px** chia khối (grid/divider rõ ràng).

## Shadows
- Chỉ 1 shadow phát hiện → thiết kế **flat, ít đổ bóng**, dựa vào đường kẻ + khoảng trắng.

## Gradients
- radial ×9, linear ×4 (chủ yếu nền/hiệu ứng nhẹ).

## Buttons / Links
- 2 button variant, 2 link style. Link mặc định `#141414`, hover đổi sang `var(--bg-color)` (đảo nền/chữ).

## Breakpoints
`1100 → 1024 → 991 → 900 → 768 → 767 → 720 → 600 → 560` (px) — nhiều breakpoint, responsive kỹ.

## Motion (quan trọng nhất)
- **Easing chủ đạo: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out mạnh, "expo-out")**.
- Duration scale rất ngắn ở thời điểm đo (0.001s — do đo lúc tĩnh/đã settle; chuyển động thực do JS scroll điều khiển, xem `myweblab-motion-patterns.md`).
- Transition theo ngữ cảnh:
  - nav: `transform, width, margin-right`
  - hero: `transform, color`
  - link: `color, transform, background`
  - button: `transform, background-color, box-shadow`
  - card: `transform, opacity, color` (ease)
  - media: `opacity` (ease-out)
- → Mọi chuyển động chỉ chạm **transform/opacity/color** (GPU-friendly). Không animate layout.

## WCAG (tham khảo)
- `#141414`/`#efefef` 16.02:1 (AAA), `#ffffff`/`#141414` 18.42:1 (AAA).
- `#2a26f7`/`#efefef` 6.72:1 (AA).
- Fail: `#141414`/`#2a26f7` 2.39:1 (chữ đen trên nền xanh — chỉ dùng cho khối lớn, không body text).

## Kết luận nhanh (làm input cho token-analysis)
1. Hệ màu **tối giản, tương phản cao** (đen/xám/trắng) + 1 màu thương hiệu mạnh (xanh điện) + 1 accent cam dùng tiết chế.
2. Typography **editorial**: serif hiển thị khổng lồ vs sans body.
3. **Flat + đường kẻ 1px**, bo góc 4px, gần như không shadow.
4. Spacing **8px grid**.
5. Motion: **expo-out `cubic-bezier(0.16,1,0.3,1)`**, chỉ transform/opacity → đây là nguyên lý ta học cho "Breath & Flow".
