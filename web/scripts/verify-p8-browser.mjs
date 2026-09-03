import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { chromium, firefox, webkit, devices } from "playwright";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const port = Number(process.env.P8_PORT ?? 4208);
const baseUrl = `http://127.0.0.1:${port}`;
const evidenceDirectory = resolve(process.cwd(), "../docs/toplink-v1/p8/evidence");
const resultPath = join(evidenceDirectory, "browser-summary.json");
const failures = [];
const observations = [];

const representativeRoutes = [
  ["home", "/"],
  ["service-detail", "/dich-vu/p5-contract-test-valid-service"],
  ["knowledge-detail", "/kien-thuc/p6-integration-test-valid-article"],
  ["contact", "/lien-he"],
];

const crawlRoutes = [
  "/",
  "/gioi-thieu",
  "/dich-vu",
  "/dich-vu/p6-integration-test-valid-service",
  "/san-pham",
  "/san-pham/p6-integration-test-valid-product",
  "/kien-thuc",
  "/kien-thuc/p6-integration-test-valid-article",
  "/tin-tuc",
  "/tin-tuc/p5-contract-test-customer-story",
  "/khong-gian",
  "/lien-he",
];

const requiredHeaders = [
  ["x-content-type-options", "nosniff"],
  ["referrer-policy", "strict-origin-when-cross-origin"],
  ["x-frame-options", "DENY"],
  ["permissions-policy", "camera=(), microphone=(), geolocation=()"],
];

function waitForServer(timeoutMs = 45_000) {
  const started = Date.now();
  return new Promise((resolvePromise, reject) => {
    const probe = async () => {
      try {
        const response = await fetch(baseUrl);
        if (response.ok) return resolvePromise();
      } catch {}
      if (Date.now() - started > timeoutMs) {
        return reject(new Error(`P8 server readiness timed out at ${baseUrl}`));
      }
      setTimeout(probe, 250);
    };
    probe();
  });
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

async function inspectPage(page, route, engine, viewport) {
  const thirdPartyRequests = [];
  const runtimeErrors = [];
  page.on("request", (request) => {
    if (
      /googletagmanager|google-analytics|connect\.facebook\.net|analytics\.tiktok/i.test(
        request.url(),
      )
    ) {
      thirdPartyRequests.push(request.url());
    }
  });
  page.on("pageerror", (error) => runtimeErrors.push(`pageerror: ${error.message}`));
  page.on("requestfailed", (request) => {
    runtimeErrors.push(
      `requestfailed: ${request.url()} (${request.failure()?.errorText ?? "unknown"})`,
    );
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      runtimeErrors.push(`response: ${response.status()} ${response.url()}`);
    }
  });
  page.on("console", (message) => {
    const locationUrl = message.location().url;
    const isUnauthorizedOptionalFavicon =
      message.type() === "error" && /\/favicon\.ico$/.test(locationUrl);
    if (message.type() === "error" && !isUnauthorizedOptionalFavicon) {
      runtimeErrors.push(`console: ${message.text()} (${locationUrl || "unknown URL"})`);
    }
  });

  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  if (!response?.ok())
    failures.push(`${engine} ${route}@${viewport.width}: HTTP ${response?.status()}`);
  for (const [name, expected] of requiredHeaders) {
    const actual = response?.headers()[name];
    if (actual !== expected)
      failures.push(`${engine} ${route}: header ${name}=${actual ?? "missing"}`);
  }

  await page.addScriptTag({ content: axeSource });
  const accessibility = await page.evaluate(async () => {
    const result = await window.axe.run(document, { resultTypes: ["violations"] });
    return result.violations
      .filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))
      .map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.length,
        targets: violation.nodes.slice(0, 3).map((node) => node.target),
      }));
  });
  if (accessibility.length) {
    failures.push(`${engine} ${route}: axe ${JSON.stringify(accessibility)}`);
  }

  const semantics = await page.evaluate(() => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0
      );
    };
    const targets = [...document.querySelectorAll("a, button, summary")]
      .filter(visible)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          label: element.textContent?.trim().slice(0, 60),
          width: rect.width,
          height: rect.height,
        };
      });
    return {
      h1: document.querySelectorAll("h1").length,
      main: document.querySelectorAll("main#main").length,
      header: document.querySelectorAll("header").length,
      nav: document.querySelectorAll("nav").length,
      footer: document.querySelectorAll("footer").length,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      missingAlt: [...document.querySelectorAll("img")].filter(
        (image) => !image.hasAttribute("alt"),
      ).length,
      unnamedLinks: [...document.querySelectorAll("a")].filter(
        (link) =>
          !link.textContent?.trim() &&
          !link.getAttribute("aria-label") &&
          !link.querySelector("img[alt]"),
      ).length,
      smallTargets: targets.filter((target) => target.width < 44 || target.height < 44),
      forms: document.querySelectorAll("form").length,
    };
  });
  if (
    semantics.h1 !== 1 ||
    semantics.main !== 1 ||
    semantics.header < 1 ||
    semantics.nav < 1 ||
    semantics.footer < 1
  ) {
    failures.push(`${engine} ${route}: landmarks/H1 ${JSON.stringify(semantics)}`);
  }
  if (semantics.overflow > 1) failures.push(`${engine} ${route}: overflow=${semantics.overflow}`);
  if (semantics.missingAlt)
    failures.push(`${engine} ${route}: images missing alt=${semantics.missingAlt}`);
  if (semantics.unnamedLinks)
    failures.push(`${engine} ${route}: unnamed links=${semantics.unnamedLinks}`);
  if (semantics.smallTargets.length)
    failures.push(
      `${engine} ${route}: small targets=${JSON.stringify(semantics.smallTargets.slice(0, 4))}`,
    );
  if (semantics.forms) failures.push(`${engine} ${route}: form detected`);
  if (runtimeErrors.length) failures.push(`${engine} ${route}: ${runtimeErrors.join(" | ")}`);
  if (thirdPartyRequests.length) failures.push(`${engine} ${route}: third-party analytics request`);
  return { accessibility, semantics, runtimeErrors, thirdPartyRequests };
}

async function inspectNavigation(page, engine) {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const firstFocus = await page.evaluate(() => {
    const element = document.activeElement;
    if (!(element instanceof HTMLElement)) return null;
    const style = getComputedStyle(element);
    return {
      text: element.textContent?.trim(),
      href: element.getAttribute("href"),
      outline: style.outlineStyle,
      width: style.outlineWidth,
    };
  });
  const nativeLinkTabExpected = engine !== "playwright-webkit";
  if (
    nativeLinkTabExpected &&
    (!firstFocus ||
      firstFocus.href !== "#main" ||
      firstFocus.outline === "none" ||
      firstFocus.width === "0px")
  ) {
    failures.push(`${engine}: skip-link/focus ${JSON.stringify(firstFocus)}`);
  }
  if (!nativeLinkTabExpected) {
    await page.locator(".skip-link").focus();
    const programmaticFocus = await page.locator(".skip-link").evaluate((element) => {
      const style = getComputedStyle(element);
      return { outline: style.outlineStyle, width: style.outlineWidth };
    });
    if (programmaticFocus.outline === "none" || programmaticFocus.width === "0px") {
      failures.push(`${engine}: skip-link programmatic focus ${JSON.stringify(programmaticFocus)}`);
    }
  }
  const summary = page.locator(".mobile-navigation summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  if (
    !(await page.locator(".mobile-navigation").evaluate((element) => element.hasAttribute("open")))
  ) {
    failures.push(`${engine}: mobile navigation did not open by keyboard`);
  }
  await page.keyboard.press("Enter");
  if (
    await page.locator(".mobile-navigation").evaluate((element) => element.hasAttribute("open"))
  ) {
    failures.push(`${engine}: mobile navigation did not close by keyboard`);
  }
  observations.push({
    engine,
    keyboardLinkTabFocus: firstFocus?.href === "#main",
    note: nativeLinkTabExpected
      ? "Native Tab order includes links."
      : "Playwright WebKit follows Safari link-tab preference; visible focus verified directly.",
  });
  return firstFocus;
}

async function crawlInternalLinks(page) {
  const discovered = new Set(crawlRoutes);
  for (const route of crawlRoutes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    if (!response?.ok()) failures.push(`crawler ${route}: HTTP ${response?.status()}`);
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")))) {
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        /^https?:\/\//.test(href)
      )
        continue;
      const target = new URL(href, baseUrl);
      if (target.origin === baseUrl) discovered.add(target.pathname);
    }
  }
  for (const route of discovered) {
    if (/nhuong-quyen|quy-trinh-tri-lieu/.test(route))
      failures.push(`crawler forbidden route linked: ${route}`);
    const response = await page.request.get(`${baseUrl}${route}`, { maxRedirects: 0 });
    if (![200, 307, 308].includes(response.status()))
      failures.push(`crawler ${route}: HTTP ${response.status()}`);
  }
  return [...discovered].sort();
}

async function runBrowser(browserType, engine, launchOptions = {}) {
  const browser = await browserType.launch({ headless: true, ...launchOptions });
  try {
    observations.push({ engine, browserVersion: browser.version() });
    for (const [, route] of representativeRoutes) {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
        locale: "vi-VN",
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await inspectPage(page, route, engine, { width: 1280, height: 900 });
      await context.close();
    }
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      locale: "vi-VN",
      reducedMotion: "reduce",
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await inspectNavigation(mobilePage, engine);
    await mobileContext.close();
  } finally {
    await browser.close();
  }
}

async function captureReleaseEvidence() {
  const browser = await chromium.launch({ headless: true });
  const captures = [
    ["home", "/", 375],
    ["home", "/", 1440],
    ["service-detail", "/dich-vu/p6-integration-test-valid-service", 375],
    ["service-detail", "/dich-vu/p6-integration-test-valid-service", 1440],
    ["knowledge-detail", "/kien-thuc/p6-integration-test-valid-article", 375],
    ["knowledge-detail", "/kien-thuc/p6-integration-test-valid-article", 1440],
    ["contact-held", "/lien-he", 375],
    ["space-held", "/khong-gian", 1280],
  ];
  const evidence = [];
  try {
    for (const [name, route, width] of captures) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        locale: "vi-VN",
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      const path = join(evidenceDirectory, `${name}__${width}.png`);
      await page.screenshot({ path, fullPage: true });
      evidence.push({
        name,
        route,
        width,
        path: `docs/toplink-v1/p8/evidence/${name}__${width}.png`,
        sha256: sha256(path),
      });
      await context.close();
    }
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
      locale: "vi-VN",
    });
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.locator(".mobile-navigation summary").click();
    const path = join(evidenceDirectory, "mobile-nav__375.png");
    await page.screenshot({ path, fullPage: false });
    evidence.push({
      name: "mobile-nav",
      route: "/",
      width: 375,
      path: "docs/toplink-v1/p8/evidence/mobile-nav__375.png",
      sha256: sha256(path),
    });
    await context.close();
  } finally {
    await browser.close();
  }
  return evidence;
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
      TOPLINK_PUBLIC_SITE_URL: `${baseUrl}/`,
      TOPLINK_INDEXING_ENABLED: "0",
      TOPLINK_WEB_BASE_URL: `${baseUrl}/`,
    },
  },
);
let serverLog = "";
server.stdout.on("data", (chunk) => (serverLog += chunk.toString()));
server.stderr.on("data", (chunk) => (serverLog += chunk.toString()));

try {
  mkdirSync(evidenceDirectory, { recursive: true });
  await waitForServer();
  await runBrowser(chromium, "playwright-chromium");
  await runBrowser(firefox, "playwright-firefox");
  await runBrowser(webkit, "playwright-webkit");
  await runBrowser(chromium, "google-chrome", { channel: "chrome" });
  await runBrowser(chromium, "microsoft-edge", { channel: "msedge" });

  const mobileProfiles = [
    [chromium, "mobile-chromium", devices["Pixel 7"]],
    [webkit, "mobile-webkit", devices["iPhone 15"]],
  ];
  for (const [browserType, engine, descriptor] of mobileProfiles) {
    const browser = await browserType.launch({ headless: true });
    try {
      observations.push({
        engine,
        browserVersion: browser.version(),
        device: descriptor.userAgent,
      });
      for (const [, route] of representativeRoutes) {
        const context = await browser.newContext({
          ...descriptor,
          locale: "vi-VN",
          reducedMotion: "reduce",
        });
        const page = await context.newPage();
        await inspectPage(page, route, engine, descriptor.viewport);
        await context.close();
      }
    } finally {
      await browser.close();
    }
  }

  const crawlBrowser = await chromium.launch({ headless: true });
  let links;
  try {
    const page = await crawlBrowser.newPage();
    links = await crawlInternalLinks(page);
  } finally {
    await crawlBrowser.close();
  }
  const evidence = await captureReleaseEvidence();
  writeFileSync(
    resultPath,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), observations, links, evidence, failures },
      null,
      2,
    ),
  );
} finally {
  server.kill();
}

if (failures.length) {
  console.error(`P8 browser qualification failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  if (serverLog) console.error(serverLog);
  process.exit(1);
}

console.log(
  `P8 browser qualification passed: ${observations.length} engine/profile runs, axe, keyboard, headers, links and evidence.`,
);
