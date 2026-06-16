// GitHub Pages phục vụ repo dưới /<repo-name>/. next/image & next/link tự thêm
// basePath; với background-image/<img> thuần cần prefix thủ công bằng asset().
export const ASSET_PREFIX = "/toplink-demo-web";

export function asset(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${ASSET_PREFIX}${p}`;
}
