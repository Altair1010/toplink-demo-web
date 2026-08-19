// GitHub Pages phục vụ repo dưới /<repo-name>/. next/image & next/link tự thêm
// basePath; với background-image/<img> thuần cần prefix thủ công bằng asset().
//
// Giá trị đến từ `basePath` trong next.config.mjs (inline lúc build qua `env`).
// KHÔNG hardcode lại chuỗi ở đây — hai nguồn sự thật đồng nghĩa với ảnh 404 im lặng
// vào ngày repo đổi tên.
export const ASSET_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${ASSET_PREFIX}${p}`;
}
