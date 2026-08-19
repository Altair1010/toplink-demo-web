// GitHub Pages serves a project repo under /<repo-name>/.
// NGUỒN SỰ THẬT DUY NHẤT cho đường dẫn deploy. `lib/asset.ts` đọc lại qua
// NEXT_PUBLIC_BASE_PATH bên dưới — đừng viết lại chuỗi này ở nơi khác.
const basePath = "/toplink-demo-web";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export so the demo can be hosted on GitHub Pages.
  output: "export",
  basePath,
  // next/image và next/link tự thêm basePath; background-image và <img> thuần thì
  // không, nên lib/asset.ts cần giá trị này lúc chạy phía client.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
