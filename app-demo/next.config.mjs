/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export so the demo can be hosted on GitHub Pages.
  output: "export",
  // GitHub Pages serves a project repo under /<repo-name>/.
  basePath: "/toplink-demo-web",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
