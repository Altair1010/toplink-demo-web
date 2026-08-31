import "server-only";

export function webOrigin(): URL {
  const configured = process.env.TOPLINK_WEB_BASE_URL?.trim();
  if (!configured) throw new Error("TOPLINK_WEB_BASE_URL is not configured");
  const url = new URL(configured);
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("TOPLINK_WEB_BASE_URL must be an origin only");
  }
  if (
    url.protocol !== "https:" &&
    !(url.protocol === "http:" && ["127.0.0.1", "localhost"].includes(url.hostname))
  ) {
    throw new Error("TOPLINK_WEB_BASE_URL must use HTTPS or local loopback HTTP");
  }
  return url;
}
