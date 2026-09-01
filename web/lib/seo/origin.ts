export interface PublicSiteEnvironment {
  readonly TOPLINK_PUBLIC_SITE_URL?: string;
  readonly TOPLINK_INDEXING_ENABLED?: string;
}

export function currentPublicSiteEnvironment(): PublicSiteEnvironment {
  return {
    TOPLINK_PUBLIC_SITE_URL: process.env.TOPLINK_PUBLIC_SITE_URL,
    TOPLINK_INDEXING_ENABLED: process.env.TOPLINK_INDEXING_ENABLED,
  };
}

function isLoopback(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

export function parsePublicSiteOrigin(value: string): URL {
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch (error) {
    throw new Error("TOPLINK_PUBLIC_SITE_URL is malformed", { cause: error });
  }
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("TOPLINK_PUBLIC_SITE_URL must contain an origin only");
  }
  if (url.protocol !== "https:" && !(url.protocol === "http:" && isLoopback(url.hostname))) {
    throw new Error("TOPLINK_PUBLIC_SITE_URL must use HTTPS or loopback HTTP");
  }
  return url;
}

export function configuredPublicSiteOrigin(environment: PublicSiteEnvironment): URL | undefined {
  const configured = environment.TOPLINK_PUBLIC_SITE_URL?.trim();
  return configured ? parsePublicSiteOrigin(configured) : undefined;
}

export function isProductionIndexingEnabled(environment: PublicSiteEnvironment): boolean {
  if (environment.TOPLINK_INDEXING_ENABLED !== "1") return false;
  const origin = configuredPublicSiteOrigin(environment);
  return Boolean(origin && origin.protocol === "https:" && !isLoopback(origin.hostname));
}

export function canonicalUrl(origin: URL, canonicalPath: string): string {
  if (!canonicalPath.startsWith("/") || canonicalPath.startsWith("//")) {
    throw new Error("Canonical path must be root-relative");
  }
  const resolved = new URL(canonicalPath, origin);
  if (resolved.origin !== origin.origin)
    throw new Error("Canonical path escaped the public origin");
  resolved.search = "";
  resolved.hash = "";
  return resolved.href;
}
