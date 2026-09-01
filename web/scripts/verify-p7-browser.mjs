import { spawn, spawnSync } from "node:child_process";
import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { chromium } from "playwright";

const mode = process.env.P7_BROWSER_MODE ?? "pending";
const port = Number(process.env.P7_PORT ?? 4197);
const baseUrl = `http://127.0.0.1:${port}`;
const failures = [];

function readLocalEnvironment() {
  const values = {};
  for (const line of readFileSync(join(process.cwd(), ".env.local"), "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const [name, ...parts] = line.split("=");
    values[name] = parts.join("=");
  }
  return values;
}

function waitForServer(timeoutMs = 30_000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const probe = async () => {
      try {
        const response = await fetch(baseUrl);
        if (response.ok) return resolve();
      } catch {}
      if (Date.now() - started > timeoutMs)
        return reject(new Error("P7 server readiness timed out"));
      setTimeout(probe, 250);
    };
    probe();
  });
}

function previewIntent(secret, id) {
  const payload = {
    post_type: "service",
    id,
    slug: "p6-integration-test-preview-service",
    exp: Math.floor(Date.now() / 1000) + 240,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${createHmac("sha256", secret).update(encoded).digest("hex")}`;
}

function applyCmsContactMode() {
  const wordpressRoot = resolve(process.cwd(), "../wordpress");
  const result = spawnSync(
    "docker",
    [
      "compose",
      "run",
      "--rm",
      "-T",
      "-e",
      `P7_CONTACT_MODE=${mode}`,
      "-e",
      `TOPLINK_WEBHOOK_URL=http://host.docker.internal:${port}/api/cms/revalidate`,
      "wpcli",
      "eval-file",
      "/opt/toplink-tests/runtime/p7-contact-state.php",
    ],
    { cwd: wordpressRoot, encoding: "utf8", windowsHide: true },
  );
  if (result.status !== 0 || !result.stdout.includes(`P7_CONTACT_STATE=${mode.toUpperCase()}`)) {
    throw new Error(`Unable to apply P7 CMS contact mode ${mode}: ${result.stderr}`);
  }
}

async function waitForCmsProjection(timeoutMs = 15_000) {
  const expectedCount = mode === "pending" ? 0 : 3;
  const started = Date.now();
  while (Date.now() - started <= timeoutMs) {
    const response = await fetch("http://127.0.0.1:8085/wp-json/toplink/v1/site-settings");
    if (response.ok) {
      const settings = await response.json();
      const count = ["hotline", "zalo_destination", "facebook_destination"].filter(
        (field) => settings[field],
      ).length;
      if (count === expectedCount) return;
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
  }
  throw new Error(`CMS did not project P7 contact mode ${mode}`);
}

async function gotoPublicPage(page, path) {
  const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded" });
  await page.locator("main#main").waitFor({ state: "attached" });
  await page.locator('meta[name="robots"]').waitFor({ state: "attached" });
  return response;
}

const server = spawn(
  process.execPath,
  [join(process.cwd(), "node_modules/next/dist/bin/next"), "start", "-p", String(port)],
  {
    cwd: process.cwd(),
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      TOPLINK_WEB_BASE_URL: `${baseUrl}/`,
      TOPLINK_PUBLIC_SITE_URL: `${baseUrl}/`,
      TOPLINK_INDEXING_ENABLED: "0",
    },
  },
);

let serverLog = "";
server.stdout.on("data", (chunk) => (serverLog += chunk.toString()));
server.stderr.on("data", (chunk) => (serverLog += chunk.toString()));

try {
  await waitForServer();
  applyCmsContactMode();
  await waitForCmsProjection();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    locale: "vi-VN",
  });
  const page = await context.newPage();
  const thirdPartyRequests = [];
  page.on("request", (request) => {
    if (
      /googletagmanager|google-analytics|connect\.facebook\.net|analytics\.tiktok/i.test(
        request.url(),
      )
    ) {
      thirdPartyRequests.push(request.url());
    }
  });

  const staticRoutes = [
    "/",
    "/dich-vu",
    "/san-pham",
    "/kien-thuc",
    "/tin-tuc",
    "/khong-gian",
    "/lien-he",
  ];
  for (const route of staticRoutes) {
    const response = await gotoPublicPage(page, route);
    const metadata = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content"),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content"),
      ogDescription: document
        .querySelector('meta[property="og:description"]')
        ?.getAttribute("content"),
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content"),
      ogImages: document.querySelectorAll('meta[property="og:image"]').length,
    }));
    if (!response?.ok()) failures.push(`${route}: HTTP ${response?.status()}`);
    if (!metadata.title || !metadata.description || !metadata.ogTitle || !metadata.ogDescription) {
      failures.push(`${route}: baseline metadata incomplete`);
    }
    const expectedCanonical = route === "/" ? baseUrl : `${baseUrl}${route}`;
    if (metadata.canonical !== expectedCanonical) {
      failures.push(`${route}: canonical ${metadata.canonical}`);
    }
    if (metadata.ogUrl !== metadata.canonical) failures.push(`${route}: OpenGraph URL mismatch`);
    if (!metadata.robots?.includes("noindex") || !metadata.robots.includes("nofollow")) {
      failures.push(`${route}: local robots ${metadata.robots}`);
    }
    if (metadata.ogImages !== 0) failures.push(`${route}: unauthorized OG image emitted`);
  }

  const detailRoutes = [
    "/dich-vu/p6-integration-test-valid-service",
    "/san-pham/p6-integration-test-valid-product",
    "/kien-thuc/p6-integration-test-valid-article",
    "/tin-tuc/p5-contract-test-customer-story",
  ];
  for (const route of detailRoutes) {
    const response = await gotoPublicPage(page, route);
    const held = await page.evaluate(() => ({
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) =>
        JSON.parse(script.textContent ?? "null"),
      ),
      breadcrumbs: document.querySelectorAll(".breadcrumbs li").length,
    }));
    if (!response?.ok()) failures.push(`${route}: HTTP ${response?.status()}`);
    if (held.canonical) failures.push(`${route}: test-owned canonical leaked`);
    if (!held.robots?.includes("noindex")) failures.push(`${route}: test-owned route indexable`);
    if (held.jsonLd.length) failures.push(`${route}: test-owned JSON-LD leaked`);
    if (held.breadcrumbs !== 3) failures.push(`${route}: semantic breadcrumbs missing`);
  }

  for (const route of ["/", "/dich-vu/p6-integration-test-valid-service", "/lien-he"]) {
    await gotoPublicPage(page, route);
    const count = await page.locator("[data-contact-action]").count();
    if (mode === "approved" && count !== 3) failures.push(`${route}: approved actions=${count}`);
    if (mode !== "approved" && count !== 0) failures.push(`${route}: fail-closed actions=${count}`);
  }

  if (mode === "approved") {
    await gotoPublicPage(page, "/dich-vu/p6-integration-test-valid-service");
    const payload = await page.locator('[data-contact-action="contact_zalo"]').evaluate((link) => {
      link.addEventListener("click", (event) => event.preventDefault(), { once: true });
      link.click();
      return window.dataLayer?.at(-1);
    });
    const expected = {
      event: "contact_zalo_click",
      channel: "zalo",
      placement: "service_detail",
      destination_class: "https_url",
    };
    if (JSON.stringify(payload) !== JSON.stringify(expected)) {
      failures.push(`contact payload mismatch: ${JSON.stringify(payload)}`);
    }
  }

  const robots = await (await fetch(`${baseUrl}/robots.txt`)).text();
  if (!/Disallow:\s*\//.test(robots) || !robots.includes(`${baseUrl}/sitemap.xml`)) {
    failures.push("local robots.txt policy mismatch");
  }
  const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
  if (/<url>/.test(sitemap) || /P[567]_(?:INTEGRATION|CONTRACT)_TEST|nhuong-quyen/i.test(sitemap)) {
    failures.push("local sitemap exposed a held or test-owned route");
  }

  if (mode === "pending" && process.env.P7_PREVIEW_ID) {
    const localEnvironment = readLocalEnvironment();
    const secret = localEnvironment.TOPLINK_PREVIEW_SECRET;
    if (!secret) failures.push("preview secret unavailable to local verifier");
    else {
      const intent = previewIntent(secret, Number(process.env.P7_PREVIEW_ID));
      const previewResponse = await page.goto(
        `${baseUrl}/api/cms/preview?intent=${encodeURIComponent(intent)}`,
        { waitUntil: "domcontentloaded" },
      );
      await page.locator("main#main").waitFor({ state: "attached" });
      await page.locator('meta[name="robots"]').waitFor({ state: "attached" });
      const preview = await page.evaluate(() => ({
        robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
        actions: document.querySelectorAll("[data-contact-action]").length,
        jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
      }));
      if (
        !previewResponse?.ok() ||
        !preview.robots?.includes("noindex") ||
        !preview.robots.includes("nofollow")
      ) {
        failures.push("private preview metadata regression");
      }
      if (preview.actions || preview.jsonLd)
        failures.push("private preview emitted commercial SEO data");
    }
  }

  if (thirdPartyRequests.length)
    failures.push(`third-party analytics requests: ${thirdPartyRequests.join(", ")}`);
  await context.close();
  await browser.close();
} finally {
  server.kill();
}

if (failures.length) {
  console.error(`P7 browser ${mode} failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  if (serverLog) console.error(serverLog);
  process.exit(1);
}

console.log(
  `P7 browser ${mode} passed: metadata, contact, privacy, scripts, sitemap and preview gates.`,
);
