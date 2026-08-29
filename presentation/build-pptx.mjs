// ============================================================
// Y Viện Toplink — Bộ slide giới thiệu bản demo website
// Sinh file .pptx thật bằng PptxGenJS.  Chạy: node build-pptx.mjs
// ============================================================
import pptxgen from "pptxgenjs";

// ---- Bảng màu thương hiệu ----
const CLAY = "8C3A2B"; // đỏ trầm
const CLAY_DARK = "6E2B1E";
const GOLD = "C9A24B"; // vàng kim
const WOOD = "6B4F3A"; // nâu gỗ
const JADE = "3E6B5A"; // ngọc trầm
const IVORY = "FBF7EF"; // nền ngà
const CREAM = "F1E8D6";
const INK = "2C2420"; // chữ chính
const MUTE = "6F635A"; // chữ phụ

const FONT_H = "Georgia"; // heading (thay cho Playfair)
const FONT_B = "Calibri"; // body

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 inch
pres.author = "Y Viện Toplink";
pres.company = "Y Viện Toplink";
pres.title = "Y Viện Toplink — Giới thiệu bản demo website";

const W = 13.33;
const H = 7.5;

// ---- Helpers ----
function footer(slide, idx) {
  slide.addText("Y Viện Toplink — Bản demo website", {
    x: 0.5, y: H - 0.45, w: 8, h: 0.3,
    fontFace: FONT_B, fontSize: 9, color: MUTE, align: "left",
  });
  slide.addText(`${idx}`, {
    x: W - 1.2, y: H - 0.45, w: 0.7, h: 0.3,
    fontFace: FONT_B, fontSize: 9, color: MUTE, align: "right",
  });
}

// Slide nội dung có thanh tiêu đề
function contentSlide(kicker, title) {
  const slide = pres.addSlide();
  slide.background = { color: IVORY };
  // dải gold mảnh bên trái
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: H, fill: { color: GOLD } });
  // kicker
  slide.addText(kicker.toUpperCase(), {
    x: 0.6, y: 0.45, w: 12, h: 0.35,
    fontFace: FONT_B, fontSize: 12, color: GOLD, bold: true, charSpacing: 2,
  });
  // title
  slide.addText(title, {
    x: 0.58, y: 0.78, w: 12.2, h: 0.85,
    fontFace: FONT_H, fontSize: 30, color: CLAY, bold: true,
  });
  // gạch chân
  slide.addShape(pres.ShapeType.line, {
    x: 0.62, y: 1.7, w: 3.2, h: 0, line: { color: GOLD, width: 2.5 },
  });
  return slide;
}

// Thẻ bo góc với tiêu đề + mô tả
function card(slide, x, y, w, h, fill, titleText, descText, opts = {}) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: fill }, line: { color: "FFFFFF", width: 0 },
    shadow: { type: "outer", color: "BBBBBB", blur: 4, offset: 2, angle: 90, opacity: 0.35 },
  });
  const textColor = opts.dark ? "FFFFFF" : INK;
  const descColor = opts.dark ? "F3EAD8" : MUTE;
  let ty = y + 0.16;
  if (titleText) {
    slide.addText(titleText, {
      x: x + 0.18, y: ty, w: w - 0.36, h: opts.titleH || 0.45,
      fontFace: FONT_H, fontSize: opts.titleSize || 15, bold: true, color: opts.titleColor || textColor,
      align: opts.align || "left", valign: "top",
    });
    ty += (opts.titleH || 0.45);
  }
  if (descText) {
    slide.addText(descText, {
      x: x + 0.18, y: ty, w: w - 0.36, h: h - (ty - y) - 0.12,
      fontFace: FONT_B, fontSize: opts.descSize || 11, color: descColor,
      align: opts.align || "left", valign: "top", lineSpacingMultiple: 1.02,
    });
  }
}

function bullets(slide, items, x, y, w, h, opts = {}) {
  const arr = items.map((t) => ({
    text: t,
    options: { bullet: { code: "2022", indent: 18 }, color: opts.color || INK,
      fontFace: FONT_B, fontSize: opts.fontSize || 14, paraSpaceAfter: opts.gap ?? 8 },
  }));
  slide.addText(arr, { x, y, w, h, valign: "top" });
}

let n = 0;
const next = () => ++n;

// ============================================================
// SLIDE 1 — BÌA
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: CLAY };
  // khối trang trí
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.25, fill: { color: GOLD } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: H - 0.25, w: W, h: 0.25, fill: { color: GOLD } });
  s.addText("Y VIỆN TOPLINK", {
    x: 0, y: 1.7, w: W, h: 0.5, align: "center",
    fontFace: FONT_B, fontSize: 18, color: GOLD, bold: true, charSpacing: 6,
  });
  s.addText("Y Viện Dưỡng Thân – Tỉnh Thức", {
    x: 0, y: 2.4, w: W, h: 1.2, align: "center",
    fontFace: FONT_H, fontSize: 46, color: "FFFFFF", bold: true,
  });
  s.addText("Giới thiệu bản demo website", {
    x: 0, y: 3.7, w: W, h: 0.6, align: "center",
    fontFace: FONT_H, fontSize: 24, color: "F3EAD8", italic: true,
  });
  s.addText("Đông y dưỡng sinh · Lý liệu trị liệu · Công nghệ cao · Chăm sóc cá nhân hóa", {
    x: 0, y: 4.6, w: W, h: 0.5, align: "center",
    fontFace: FONT_B, fontSize: 14, color: "E7D9C3",
  });
  s.addText("Bản demo giao diện · Dữ liệu minh hoạ", {
    x: 0, y: 6.4, w: W, h: 0.4, align: "center",
    fontFace: FONT_B, fontSize: 11, color: GOLD, charSpacing: 2,
  });
}

// ============================================================
// SLIDE 2 — ĐỊNH VỊ
// ============================================================
{
  const s = contentSlide("Định vị", "Không chỉ là website giới thiệu");
  s.addText(
    "Website Y Viện Toplink được xây dựng như một nền tảng vận hành số cho toàn bộ mô hình Y Viện — nơi khách hàng tìm hiểu, đặt lịch, và đội ngũ vận hành mọi hoạt động trên cùng một hệ thống.",
    { x: 0.62, y: 2.0, w: 12.0, h: 1.0, fontFace: FONT_B, fontSize: 16, color: INK, lineSpacingMultiple: 1.1 }
  );
  const cy = 3.35, cw = 2.92, ch = 2.4, gap = 0.18; let cx = 0.62;
  const items = [
    [JADE, "Đông y dưỡng sinh", "Gội đầu, ngâm chân, xông hơi, dưỡng sinh khí huyết theo Đông y."],
    [WOOD, "Lý liệu trị liệu", "Trị liệu cổ vai gáy, lưng eo bằng tay nghề và nhiệt thảo dược."],
    [CLAY, "Công nghệ cao", "Kết hợp thiết bị hỗ trợ và liệu pháp nóng – lạnh hiện đại."],
    [GOLD, "Cá nhân hóa", "Liệu trình Thân – Tâm – Trí thiết kế riêng theo thể trạng."],
  ];
  items.forEach(([c, t, d]) => {
    card(s, cx, cy, cw, ch, c, t, d, { dark: true, titleColor: "FFFFFF", titleSize: 16 });
    cx += cw + gap;
  });
  footer(s, next());
}

// ============================================================
// SLIDE 3 — MỤC TIÊU & TINH THẦN
// ============================================================
{
  const s = contentSlide("Mục tiêu", "Website hướng tới điều gì");
  bullets(s, [
    "Xây dựng thương hiệu Y Viện Toplink cao cấp, uy tín, có chiều sâu.",
    "Tăng chuyển đổi: đặt lịch, tư vấn, bán gói liệu trình và sản phẩm.",
    "Hỗ trợ vận hành nội bộ: lễ tân, kỹ thuật viên, quản lý, marketing.",
    "Sẵn sàng mở rộng: học viện, hợp tác, nhượng quyền, nhiều chi nhánh.",
    "Tạo hệ thống nội dung SEO về chăm sóc sức khỏe & dưỡng sinh.",
  ], 0.62, 2.0, 7.4, 3.6, { fontSize: 15, gap: 12 });

  // panel tinh thần
  s.addShape(pres.ShapeType.roundRect, { x: 8.4, y: 2.0, w: 4.3, h: 4.2, rectRadius: 0.1, fill: { color: CREAM } });
  s.addText("TINH THẦN WEBSITE", { x: 8.7, y: 2.25, w: 3.8, h: 0.4, fontFace: FONT_B, fontSize: 12, bold: true, color: CLAY, charSpacing: 2 });
  bullets(s, [
    "Sang trọng", "Thân thiện", "Dễ hiểu", "Dễ đặt lịch",
    "Có chiều sâu chuyên môn", "Phù hợp khách trung niên & quan tâm sức khỏe chủ động",
  ], 8.7, 2.75, 3.8, 3.3, { fontSize: 14, gap: 10, color: WOOD });
  footer(s, next());
}

// ============================================================
// SLIDE 4 — TỔNG QUAN BẢN DEMO
// ============================================================
{
  const s = contentSlide("Tổng quan", "Bản demo gồm những gì");
  const pages = [
    "Trang chủ", "Giới thiệu", "Dịch vụ", "Chi tiết dịch vụ",
    "Quy trình trị liệu", "Không gian Y Viện", "Đặt lịch", "Sản phẩm",
    "Tin tức", "Liên hệ & chi nhánh",
  ];
  // lưới 5 cột x 2 hàng các thẻ trang
  const cols = 5, cw = 2.34, ch = 0.95, gx = 0.13, gy = 0.18; let x0 = 0.62, y0 = 2.0;
  pages.forEach((p, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    card(s, x0 + c * (cw + gx), y0 + r * (ch + gy), cw, ch, "FFFFFF", p, null, { titleSize: 13, titleColor: CLAY, titleH: 0.6, align: "center" });
  });
  s.addText("Thành phần tương tác: header + menu mobile, thanh dưới (Gọi · Zalo · Đặt lịch · Chỉ đường), bộ chọn nhu cầu, đặt lịch 3 bước, FAQ accordion.", {
    x: 0.62, y: 4.7, w: 12.0, h: 0.7, fontFace: FONT_B, fontSize: 13, color: INK, italic: true,
  });
  s.addText("Công nghệ: Next.js (App Router) + Tailwind CSS · Dữ liệu demo, sẵn sàng kết nối Supabase.", {
    x: 0.62, y: 5.5, w: 12.0, h: 0.5, fontFace: FONT_B, fontSize: 12, color: MUTE,
  });
  footer(s, next());
}

// ============================================================
// SLIDE 5 — TRANG CHỦ
// ============================================================
{
  const s = contentSlide("Trang chủ", "Một hành trình chuyển đổi");
  s.addText("Trang chủ dẫn khách đi từ vấn đề của cơ thể đến giải pháp của Toplink — và kết bằng lời mời đặt lịch.", {
    x: 0.62, y: 1.95, w: 12, h: 0.6, fontFace: FONT_B, fontSize: 15, color: INK,
  });
  const blocks = [
    "Hero ấn tượng", "Cơ thể bạn cần gì?", "Vấn đề thường gặp", "Giải pháp của Toplink",
    "Dịch vụ nổi bật", "Quy trình trị liệu", "Không gian Y Viện", "Đội ngũ chuyên môn",
    "Cảm nhận khách hàng", "Sản phẩm hỗ trợ", "Câu hỏi thường gặp", "CTA đặt lịch",
  ];
  const cols = 4, cw = 2.93, ch = 0.85, gx = 0.16, gy = 0.2; let x0 = 0.62, y0 = 2.7;
  blocks.forEach((b, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const tone = [GOLD, JADE, WOOD][i % 3];
    s.addShape(pres.ShapeType.roundRect, { x: x0 + c * (cw + gx), y: y0 + r * (ch + gy), w: cw, h: ch, rectRadius: 0.07, fill: { color: "FFFFFF" }, line: { color: tone, width: 1.25 } });
    s.addText(`${i + 1}. ${b}`, { x: x0 + c * (cw + gx) + 0.12, y: y0 + r * (ch + gy), w: cw - 0.24, h: ch, fontFace: FONT_B, fontSize: 12.5, color: INK, valign: "middle", bold: true });
  });
  footer(s, next());
}

// ============================================================
// SLIDE 6 — MODULE CHỌN NHU CẦU
// ============================================================
{
  const s = contentSlide("Tính năng nổi bật", "“Hôm nay cơ thể bạn đang cần gì?”");
  s.addText("Khách chọn nhu cầu → website gợi ý đúng dịch vụ và dẫn thẳng tới đặt lịch. Giảm bối rối, tăng chuyển đổi.", {
    x: 0.62, y: 1.95, w: 12, h: 0.6, fontFace: FONT_B, fontSize: 15, color: INK,
  });
  const needs = [
    ["🍃", "Thư giãn"], ["🌙", "Ngủ ngon hơn"], ["💆", "Cổ vai gáy"], ["🧘", "Lưng eo"],
    ["🌿", "Giảm căng thẳng"], ["✨", "Phục hồi năng lượng"], ["☯", "Dưỡng sinh định kỳ"], ["💬", "Tư vấn liệu trình"],
  ];
  const cols = 4, cw = 2.93, ch = 1.35, gx = 0.16, gy = 0.22; let x0 = 0.62, y0 = 2.75;
  needs.forEach(([e, t], i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const x = x0 + c * (cw + gx), y = y0 + r * (ch + gy);
    s.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, rectRadius: 0.1, fill: { color: CREAM } });
    s.addText(e, { x, y: y + 0.14, w: cw, h: 0.6, align: "center", fontSize: 26 });
    s.addText(t, { x, y: y + 0.78, w: cw, h: 0.45, align: "center", fontFace: FONT_H, fontSize: 14, bold: true, color: CLAY });
  });
  footer(s, next());
}

// ============================================================
// SLIDE 7 — DỊCH VỤ 3 TẦNG
// ============================================================
{
  const s = contentSlide("Dịch vụ", "Ba tầng dịch vụ rõ ràng");
  const tiers = [
    [JADE, "Cơ bản", "Thư giãn, chăm sóc nhẹ nhàng mỗi ngày", ["Gội đầu dưỡng sinh", "Ngâm chân thảo dược", "Xông hơi thư giãn"], "Từ 180.000đ"],
    [WOOD, "Nâng cao", "Trị liệu vùng căng mỏi, dưỡng sinh khí huyết", ["Trị liệu cổ vai gáy", "Trị liệu lưng eo", "Dưỡng sinh khí huyết"], "Từ 390.000đ"],
    [CLAY, "Chuyên sâu", "Liệu trình cá nhân hóa Thân – Tâm – Trí", ["Liệu trình Thân – Tâm – Trí", "Liệu trình nóng – lạnh"], "Từ 650.000đ"],
  ];
  const cw = 3.95, gap = 0.27, ch = 4.0; let x = 0.62, y = 2.1;
  tiers.forEach(([c, label, sub, list, price]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, rectRadius: 0.1, fill: { color: "FFFFFF" }, line: { color: c, width: 1.5 } });
    s.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: 0.95, rectRadius: 0.1, fill: { color: c } });
    s.addText(label, { x, y: y + 0.12, w: cw, h: 0.45, align: "center", fontFace: FONT_H, fontSize: 20, bold: true, color: "FFFFFF" });
    s.addText(sub, { x: x + 0.15, y: y + 0.58, w: cw - 0.3, h: 0.35, align: "center", fontFace: FONT_B, fontSize: 10.5, color: "F3EAD8" });
    bullets(s, list, x + 0.25, y + 1.15, cw - 0.5, 2.2, { fontSize: 13, gap: 9, color: INK });
    s.addText(price, { x, y: y + ch - 0.55, w: cw, h: 0.4, align: "center", fontFace: FONT_H, fontSize: 16, bold: true, color: c });
  });
  footer(s, next());
}

// ============================================================
// SLIDE 8 — CHI TIẾT DỊCH VỤ
// ============================================================
{
  const s = contentSlide("Trang chi tiết dịch vụ", "Đủ thông tin để khách tin tưởng & đặt lịch");
  bullets(s, [
    "Mô tả dịch vụ & vấn đề phù hợp",
    "Ai nên dùng · Ai cần thận trọng",
    "Thời lượng và giá / gói",
    "Quy trình từng bước của buổi trị liệu",
    "Cảm giác sau buổi trị liệu",
    "Câu hỏi thường gặp riêng từng dịch vụ",
  ], 0.62, 2.0, 7.2, 3.8, { fontSize: 15, gap: 12 });

  // mock "sticky booking card"
  const bx = 8.5, by = 2.0, bw = 4.2, bh = 4.0;
  s.addShape(pres.ShapeType.roundRect, { x: bx, y: by, w: bw, h: bh, rectRadius: 0.1, fill: { color: CREAM }, line: { color: GOLD, width: 1.5 } });
  s.addText("Trị liệu cổ vai gáy", { x: bx + 0.25, y: by + 0.25, w: bw - 0.5, h: 0.5, fontFace: FONT_H, fontSize: 18, bold: true, color: CLAY });
  s.addText([
    { text: "⏱  75 phút", options: { fontSize: 13, color: WOOD, paraSpaceAfter: 8 } },
    { text: "💰  Từ 390.000đ", options: { fontSize: 13, color: WOOD, paraSpaceAfter: 8 } },
    { text: "👤  Dân văn phòng, hay mỏi cổ vai gáy", options: { fontSize: 12, color: MUTE } },
  ], { x: bx + 0.25, y: by + 0.85, w: bw - 0.5, h: 1.4, fontFace: FONT_B, valign: "top" });
  s.addShape(pres.ShapeType.roundRect, { x: bx + 0.25, y: by + 2.55, w: bw - 0.5, h: 0.6, rectRadius: 0.3, fill: { color: CLAY } });
  s.addText("Đặt lịch ngay", { x: bx + 0.25, y: by + 2.55, w: bw - 0.5, h: 0.6, align: "center", valign: "middle", fontFace: FONT_B, fontSize: 14, bold: true, color: "FFFFFF" });
  s.addShape(pres.ShapeType.roundRect, { x: bx + 0.25, y: by + 3.25, w: bw - 0.5, h: 0.55, rectRadius: 0.3, fill: { color: "FFFFFF" }, line: { color: JADE, width: 1.5 } });
  s.addText("Tư vấn qua Zalo", { x: bx + 0.25, y: by + 3.25, w: bw - 0.5, h: 0.55, align: "center", valign: "middle", fontFace: FONT_B, fontSize: 13, bold: true, color: JADE });
  s.addText("Thẻ đặt lịch luôn theo khách khi cuộn trang", { x: bx, y: by + bh + 0.05, w: bw, h: 0.3, align: "center", fontFace: FONT_B, fontSize: 10, italic: true, color: MUTE });
  footer(s, next());
}

// ============================================================
// SLIDE 9 — QUY TRÌNH 8 BƯỚC
// ============================================================
{
  const s = contentSlide("Quy trình trị liệu", "8 bước minh bạch, tạo niềm tin");
  const steps = [
    "Tiếp nhận tình trạng", "Lắng nghe nhu cầu", "Tư vấn liệu trình", "Làm ấm cơ thể",
    "Trị liệu chính", "Thư giãn phục hồi", "Dặn dò sau trị liệu", "Hẹn lịch chăm sóc",
  ];
  const cols = 4, cw = 2.93, ch = 1.6, gx = 0.16, gy = 0.3; let x0 = 0.62, y0 = 2.2;
  steps.forEach((t, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const x = x0 + c * (cw + gx), y = y0 + r * (ch + gy);
    s.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, rectRadius: 0.1, fill: { color: "FFFFFF" }, line: { color: GOLD, width: 1 } });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.2, y: y + 0.22, w: 0.7, h: 0.7, fill: { color: CLAY } });
    s.addText(`${i + 1}`, { x: x + 0.2, y: y + 0.22, w: 0.7, h: 0.7, align: "center", valign: "middle", fontFace: FONT_H, fontSize: 20, bold: true, color: "FFFFFF" });
    s.addText(t, { x: x + 0.2, y: y + 0.98, w: cw - 0.4, h: 0.5, fontFace: FONT_B, fontSize: 13, bold: true, color: INK });
  });
  footer(s, next());
}

// ============================================================
// SLIDE 10 — KHÔNG GIAN 4 TẦNG
// ============================================================
{
  const s = contentSlide("Không gian Y Viện", "Bốn tầng — một hành trình tĩnh tại");
  const floors = [
    [CLAY, "Tầng 1 – Tĩnh", "Tiếp khách, lễ tân, check-in, tủ dược liệu."],
    [WOOD, "Tầng 2 – Thông", "Gội dưỡng sinh, trị liệu, ngâm chân — khơi thông khí huyết."],
    [JADE, "Tầng 3 – Dưỡng", "Xông, ngâm bồn, thư giãn phục hồi trong sự ấm áp."],
    [GOLD, "Tầng 4 – Tỉnh", "Trà, thiền, cộng đồng — tỉnh thức và kết nối."],
  ];
  const cw = 2.95, gap = 0.18, ch = 4.0; let x = 0.62, y = 2.1;
  floors.forEach(([c, t, d]) => {
    card(s, x, y, cw, ch, c, t, d, { dark: true, titleColor: "FFFFFF", titleSize: 17, titleH: 0.95, descSize: 12.5 });
    x += cw + gap;
  });
  footer(s, next());
}

// ============================================================
// SLIDE 11 — ĐẶT LỊCH 3 BƯỚC
// ============================================================
{
  const s = contentSlide("Đặt lịch", "Đặt lịch chỉ trong 3 bước");
  const steps = [
    ["1", "Chọn nhu cầu", "Khách chọn điều cơ thể đang cần."],
    ["2", "Chọn dịch vụ", "Tự chọn dịch vụ — hoặc để Toplink tư vấn."],
    ["3", "Nhập thông tin", "Họ tên, số điện thoại, thời gian & cơ sở mong muốn."],
  ];
  const cw = 3.95, gap = 0.27, ch = 2.6; let x = 0.62, y = 2.2;
  steps.forEach(([num, t, d]) => {
    card(s, x, y, cw, ch, "FFFFFF", null, null);
    s.addShape(pres.ShapeType.ellipse, { x: x + cw / 2 - 0.45, y: y + 0.3, w: 0.9, h: 0.9, fill: { color: JADE } });
    s.addText(num, { x: x + cw / 2 - 0.45, y: y + 0.3, w: 0.9, h: 0.9, align: "center", valign: "middle", fontFace: FONT_H, fontSize: 26, bold: true, color: "FFFFFF" });
    s.addText(t, { x: x + 0.2, y: y + 1.35, w: cw - 0.4, h: 0.5, align: "center", fontFace: FONT_H, fontSize: 17, bold: true, color: CLAY });
    s.addText(d, { x: x + 0.25, y: y + 1.85, w: cw - 0.5, h: 0.7, align: "center", fontFace: FONT_B, fontSize: 12.5, color: MUTE });
    x += cw + gap;
  });
  // nút đặc biệt
  s.addShape(pres.ShapeType.roundRect, { x: 0.62, y: 5.2, w: 12.1, h: 1.0, rectRadius: 0.1, fill: { color: CREAM }, line: { color: GOLD, width: 1.5 } });
  s.addText([
    { text: "Nút đặc biệt:  ", options: { color: WOOD, bold: false } },
    { text: "“Tôi chưa biết chọn dịch vụ nào”", options: { color: CLAY, bold: true } },
    { text: "  → khách mô tả tình trạng, Toplink gọi lại tư vấn liệu trình phù hợp.", options: { color: MUTE } },
  ], { x: 0.9, y: 5.2, w: 11.5, h: 1.0, valign: "middle", fontFace: FONT_B, fontSize: 14.5 });
  footer(s, next());
}

// ============================================================
// SLIDE 12 — SẢN PHẨM
// ============================================================
{
  const s = contentSlide("Sản phẩm", "Catalog sản phẩm hỗ trợ chăm sóc tại nhà");
  const prods = [
    ["Trà dưỡng sinh thảo mộc", "Thảo dược", "Từ 120.000đ", "Hỗ trợ thư giãn, dễ ngủ."],
    ["Túi chườm thảo dược", "Hỗ trợ tại nhà", "Từ 180.000đ", "Chườm ấm vùng cổ vai gáy."],
    ["Gói ngâm chân thảo dược", "Thảo dược", "Từ 150.000đ", "Ngâm chân ấm tại nhà."],
    ["Máy massage cổ vai gáy", "Máy sức khỏe", "Từ 890.000đ", "Thư giãn vùng cổ vai."],
  ];
  const cw = 2.95, gap = 0.18, ch = 3.4; let x = 0.62, y = 2.2;
  prods.forEach(([t, g, p, d]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, rectRadius: 0.1, fill: { color: "FFFFFF" }, line: { color: CREAM, width: 1 }, shadow: { type: "outer", color: "CCCCCC", blur: 4, offset: 2, angle: 90, opacity: 0.3 } });
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.25, y: y + 0.25, w: cw - 0.5, h: 1.2, rectRadius: 0.08, fill: { color: CREAM } });
    s.addText(g, { x: x + 0.25, y: y + 0.75, w: cw - 0.5, h: 0.4, align: "center", fontFace: FONT_B, fontSize: 11, color: WOOD, italic: true });
    s.addText(t, { x: x + 0.2, y: y + 1.55, w: cw - 0.4, h: 0.7, fontFace: FONT_H, fontSize: 14.5, bold: true, color: CLAY });
    s.addText(d, { x: x + 0.2, y: y + 2.25, w: cw - 0.4, h: 0.6, fontFace: FONT_B, fontSize: 11.5, color: MUTE });
    s.addText(p, { x: x + 0.2, y: y + ch - 0.55, w: cw - 0.4, h: 0.4, fontFace: FONT_H, fontSize: 14, bold: true, color: JADE });
    x += cw + gap;
  });
  footer(s, next());
}

// ============================================================
// SLIDE 13 — TIN TỨC / SEO
// ============================================================
{
  const s = contentSlide("Tin tức & kiến thức", "Nội dung sức khỏe nuôi dưỡng SEO");
  const posts = [
    ["Kiến thức sức khỏe", "5 thói quen giúp cổ vai gáy bớt căng mỏi"],
    ["Đông y dưỡng sinh", "Dưỡng sinh Đông y cho giấc ngủ sâu"],
    ["Quy trình trị liệu", "Một buổi trị liệu tại Y Viện diễn ra thế nào?"],
  ];
  let y = 2.1;
  posts.forEach(([cat, title]) => {
    s.addShape(pres.ShapeType.roundRect, { x: 0.62, y, w: 7.9, h: 1.15, rectRadius: 0.08, fill: { color: "FFFFFF" }, line: { color: CREAM, width: 1 } });
    s.addText(cat.toUpperCase(), { x: 0.85, y: y + 0.16, w: 7.4, h: 0.3, fontFace: FONT_B, fontSize: 10, bold: true, color: GOLD, charSpacing: 1 });
    s.addText(title, { x: 0.85, y: y + 0.45, w: 7.4, h: 0.55, fontFace: FONT_H, fontSize: 16, bold: true, color: INK });
    y += 1.35;
  });
  // panel chủ đề SEO
  s.addShape(pres.ShapeType.roundRect, { x: 8.75, y: 2.1, w: 3.95, h: 4.0, rectRadius: 0.1, fill: { color: CREAM } });
  s.addText("CHỦ ĐỀ SEO", { x: 9.0, y: 2.3, w: 3.5, h: 0.35, fontFace: FONT_B, fontSize: 12, bold: true, color: CLAY, charSpacing: 1 });
  bullets(s, ["Cổ vai gáy", "Mất ngủ", "Stress", "Xông hơi · Ngâm chân", "Gội đầu dưỡng sinh", "Dưỡng sinh Đông y", "Liệu pháp nóng – lạnh"],
    9.0, 2.75, 3.5, 3.2, { fontSize: 13, gap: 8, color: WOOD });
  footer(s, next());
}

// ============================================================
// SLIDE 14 — LIÊN HỆ & CHI NHÁNH
// ============================================================
{
  const s = contentSlide("Liên hệ & chi nhánh", "Sẵn sàng cho mô hình nhiều cơ sở");
  const branches = [
    ["Cơ sở Trung tâm", "123 Đường Sức Khỏe, Quận 1, TP.HCM", "0968 824 386", "08:00 – 21:00 hằng ngày"],
    ["Cơ sở 2", "45 Đường Dưỡng Sinh, Quận 3, TP.HCM", "0968 824 387", "08:00 – 21:00 hằng ngày"],
  ];
  const cw = 5.9, gap = 0.3, ch = 2.7; let x = 0.62, y = 2.2;
  branches.forEach(([name, addr, phone, hours]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, rectRadius: 0.1, fill: { color: "FFFFFF" }, line: { color: JADE, width: 1.25 } });
    s.addText(name, { x: x + 0.3, y: y + 0.25, w: cw - 0.6, h: 0.5, fontFace: FONT_H, fontSize: 18, bold: true, color: CLAY });
    s.addText([
      { text: "📍 " + addr, options: { fontSize: 13, color: INK, paraSpaceAfter: 8 } },
      { text: "📞 " + phone, options: { fontSize: 13, color: INK, paraSpaceAfter: 8 } },
      { text: "🕗 " + hours, options: { fontSize: 13, color: INK } },
    ], { x: x + 0.3, y: y + 0.9, w: cw - 0.6, h: 1.6, fontFace: FONT_B, valign: "top" });
    x += cw + gap;
  });
  s.addText("Mỗi cơ sở có trang riêng: ảnh không gian, dịch vụ tại cơ sở, Google Map, nút chỉ đường và đặt lịch.", {
    x: 0.62, y: 5.3, w: 12, h: 0.6, fontFace: FONT_B, fontSize: 13, italic: true, color: MUTE,
  });
  footer(s, next());
}

// ============================================================
// SLIDE 15 — TRẢI NGHIỆM MOBILE
// ============================================================
{
  const s = contentSlide("Mobile-first", "Tối ưu cho khách đặt lịch bằng điện thoại");
  bullets(s, [
    "Phần lớn khách Việt đặt lịch bằng điện thoại → ưu tiên mobile.",
    "Header gọn + menu mobile dễ thao tác một tay.",
    "Thanh thao tác cố định luôn hiển thị ở cạnh dưới màn hình.",
    "Form ngắn, ít bước, hạn chế gõ phím.",
  ], 0.62, 2.0, 7.4, 3.6, { fontSize: 15, gap: 14 });

  // mock điện thoại với bottom bar
  const px = 9.0, py = 2.0, pw = 3.0, ph = 4.4;
  s.addShape(pres.ShapeType.roundRect, { x: px, y: py, w: pw, h: ph, rectRadius: 0.25, fill: { color: INK } });
  s.addShape(pres.ShapeType.roundRect, { x: px + 0.12, y: py + 0.12, w: pw - 0.24, h: ph - 0.24, rectRadius: 0.18, fill: { color: IVORY } });
  s.addText("Y Viện Toplink", { x: px, y: py + 0.35, w: pw, h: 0.5, align: "center", fontFace: FONT_H, fontSize: 14, bold: true, color: CLAY });
  // bottom bar 4 nút
  const labels = ["Gọi", "Zalo", "Đặt lịch", "Chỉ đường"];
  const colors = [JADE, JADE, CLAY, WOOD];
  const bw = (pw - 0.4) / 4; let bx = px + 0.2;
  const byy = py + ph - 0.75;
  labels.forEach((l, i) => {
    s.addShape(pres.ShapeType.roundRect, { x: bx, y: byy, w: bw - 0.06, h: 0.55, rectRadius: 0.06, fill: { color: colors[i] } });
    s.addText(l, { x: bx, y: byy, w: bw - 0.06, h: 0.55, align: "center", valign: "middle", fontFace: FONT_B, fontSize: 9, bold: true, color: "FFFFFF" });
    bx += bw;
  });
  s.addText("Thanh dưới cố định", { x: px, y: py + ph + 0.05, w: pw, h: 0.3, align: "center", fontFace: FONT_B, fontSize: 10, italic: true, color: MUTE });
  footer(s, next());
}

// ============================================================
// SLIDE 16 — NGÔN NGỮ AN TOÀN SỨC KHỎE
// ============================================================
{
  const s = contentSlide("Nội dung an toàn", "Ngôn ngữ chuẩn mực, đáng tin");
  // nên dùng
  s.addShape(pres.ShapeType.roundRect, { x: 0.62, y: 2.1, w: 5.9, h: 4.1, rectRadius: 0.1, fill: { color: "FFFFFF" }, line: { color: JADE, width: 1.5 } });
  s.addText("✓  NÊN DÙNG", { x: 0.9, y: 2.3, w: 5.3, h: 0.45, fontFace: FONT_H, fontSize: 16, bold: true, color: JADE });
  bullets(s, [
    "Hỗ trợ thư giãn",
    "Hỗ trợ lưu thông khí huyết",
    "Hỗ trợ cải thiện cảm giác căng mỏi",
    "Góp phần cân bằng thân – tâm – trí",
    "Không thay thế tư vấn y khoa chuyên môn",
  ], 0.9, 2.85, 5.3, 3.2, { fontSize: 14, gap: 12, color: INK });

  // tránh dùng
  s.addShape(pres.ShapeType.roundRect, { x: 6.82, y: 2.1, w: 5.9, h: 4.1, rectRadius: 0.1, fill: { color: "FFFFFF" }, line: { color: CLAY, width: 1.5 } });
  s.addText("✕  TRÁNH DÙNG", { x: 7.1, y: 2.3, w: 5.3, h: 0.45, fontFace: FONT_H, fontSize: 16, bold: true, color: CLAY });
  bullets(s, [
    "Chữa khỏi", "Cam kết khỏi", "Điều trị dứt điểm", "Thay thế bác sĩ", "Khỏi bệnh hoàn toàn",
  ], 7.1, 2.85, 5.3, 3.2, { fontSize: 14, gap: 12, color: MUTE });
  footer(s, next());
}

// ============================================================
// SLIDE 17 — LỘ TRÌNH MỞ RỘNG
// ============================================================
{
  const s = contentSlide("Lộ trình", "Từ bản demo đến hệ sinh thái vận hành");
  const phases = [
    [JADE, "P0 — Hiện tại", "Website public: trang chủ, dịch vụ, quy trình, không gian, đặt lịch, liên hệ. (Bản demo này)"],
    [WOOD, "P1 — Vận hành KH", "Tài khoản khách hàng, lịch sử trị liệu, gói liệu trình, dashboard lễ tân & KTV, blog, review."],
    [GOLD, "P2 — Mở rộng", "Học viện đào tạo, trang hợp tác / nhượng quyền, quản lý lead, báo cáo marketing."],
    [CLAY, "P3 — Mở chuỗi", "Dashboard nhiều chi nhánh, quản lý hiệu suất từng cơ sở, tự động hóa chăm sóc khách hàng."],
  ];
  let y = 2.1; const rh = 1.05, rgap = 0.18;
  phases.forEach(([c, t, d]) => {
    s.addShape(pres.ShapeType.roundRect, { x: 0.62, y, w: 2.7, h: rh, rectRadius: 0.08, fill: { color: c } });
    s.addText(t, { x: 0.62, y, w: 2.7, h: rh, align: "center", valign: "middle", fontFace: FONT_H, fontSize: 15, bold: true, color: "FFFFFF" });
    s.addShape(pres.ShapeType.roundRect, { x: 3.45, y, w: 9.25, h: rh, rectRadius: 0.08, fill: { color: "FFFFFF" }, line: { color: c, width: 1.25 } });
    s.addText(d, { x: 3.7, y, w: 8.8, h: rh, valign: "middle", fontFace: FONT_B, fontSize: 13, color: INK });
    y += rh + rgap;
  });
  footer(s, next());
}

// ============================================================
// SLIDE 18 — KẾT / BƯỚC TIẾP THEO
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: CLAY };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.25, fill: { color: GOLD } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: H - 0.25, w: W, h: 0.25, fill: { color: GOLD } });
  s.addText("Bước tiếp theo", { x: 0, y: 0.9, w: W, h: 0.8, align: "center", fontFace: FONT_H, fontSize: 38, bold: true, color: "FFFFFF" });

  const cards = [
    ["▶  Chạy thử demo", "cd app-demo\nnpm install\nnpm run dev\n→ http://localhost:3000"],
    ["🖼  Thay nội dung thật", "Thay ảnh placeholder bằng ảnh thật của Y Viện; cập nhật dịch vụ, giá, chi nhánh."],
    ["🔌  Kết nối hệ thống", "Gắn Supabase (Auth, Database, Storage) và mở dần dashboard nội bộ theo lộ trình P1–P3."],
  ];
  const cw = 3.95, gap = 0.27, ch = 3.0; let x = 0.62, y = 2.3;
  cards.forEach(([t, d]) => {
    s.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, rectRadius: 0.1, fill: { color: IVORY } });
    s.addText(t, { x: x + 0.25, y: y + 0.3, w: cw - 0.5, h: 0.6, fontFace: FONT_H, fontSize: 17, bold: true, color: CLAY });
    s.addText(d, { x: x + 0.25, y: y + 1.0, w: cw - 0.5, h: ch - 1.2, fontFace: FONT_B, fontSize: 13, color: INK, valign: "top", lineSpacingMultiple: 1.1 });
    x += cw + gap;
  });
  s.addText("Y Viện Toplink — Y Viện Dưỡng Thân, Tỉnh Thức", {
    x: 0, y: 6.0, w: W, h: 0.5, align: "center", fontFace: FONT_H, fontSize: 18, italic: true, color: GOLD,
  });
}

// ---- Xuất file ----
await pres.writeFile({ fileName: "Y-Vien-Toplink-Demo.pptx" });
console.log("Đã tạo: Y-Vien-Toplink-Demo.pptx — tổng", n + 3, "slide");
