import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { chromium } from "playwright";

const port = Number(process.env.P4_PORT ?? 4180);
const baseUrl = `http://127.0.0.1:${port}`;
const evidenceDirectory = resolve(process.cwd(), "../docs/toplink-v1/p4/evidence");
const resultPath = resolve(process.cwd(), "browser-results/audit.json");

const routes = [
  ["home", "/"],
  ["about", "/gioi-thieu"],
  ["service-index", "/dich-vu"],
  ["service-detail", "/dich-vu/ban-mau-cau-truc"],
  ["product-index", "/san-pham"],
  ["product-detail", "/san-pham/ho-so-san-pham-mau"],
  ["knowledge-index", "/kien-thuc"],
  ["knowledge-detail", "/kien-thuc/cach-doc-thong-tin-an-toan"],
  ["news-index", "/tin-tuc"],
  ["news-detail", "/tin-tuc/ban-tin-van-hanh-mau"],
  ["space", "/khong-gian"],
  ["contact", "/lien-he"],
];

const widths = [375, 768, 1280, 1440];
const captures = new Map([
  ["home:375", "home__375__full.png"],
  ["home:1440", "home__1440__full.png"],
  ["service-index:1280", "service-index__1280__full.png"],
  ["service-detail:375", "service-detail__375__full.png"],
  ["service-detail:1280", "service-detail__1280__full.png"],
  ["knowledge-index:1280", "knowledge-index__1280__full.png"],
  ["knowledge-detail:375", "knowledge-detail__375__full.png"],
  ["knowledge-detail:1280", "knowledge-detail__1280__full.png"],
  ["product-index:1280", "product-index__1280__full.png"],
  ["product-detail:375", "product-detail__375__full.png"],
  ["space:1280", "space__1280__full.png"],
  ["contact:375", "contact__375__full.png"],
  ["contact:1280", "contact__1280__full.png"],
]);

function waitForServer(url, timeoutMs = 30_000) {
  const started = Date.now();
  return new Promise((resolvePromise, reject) => {
    const probe = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) return resolvePromise();
      } catch {}
      if (Date.now() - started > timeoutMs) return reject(new Error(`Server not ready at ${url}`));
      setTimeout(probe, 250);
    };
    probe();
  });
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

const server = spawn(
  process.execPath,
  [join(process.cwd(), "node_modules/next/dist/bin/next"), "start", "-p", String(port)],
  {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  },
);

let serverLog = "";
server.stdout.on("data", (chunk) => (serverLog += chunk.toString()));
server.stderr.on("data", (chunk) => (serverLog += chunk.toString()));

const failures = [];
const results = [];
const evidence = [];

try {
  await waitForServer(baseUrl);
  mkdirSync(evidenceDirectory, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const [routeName, routePath] of routes) {
    for (const width of widths) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        locale: "vi-VN",
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const runtimeErrors = [];
      page.on("pageerror", (error) => runtimeErrors.push(`pageerror: ${error.message}`));
      page.on("console", (message) => {
        if (message.type() === "error") runtimeErrors.push(`console: ${message.text()}`);
      });

      const response = await page.goto(`${baseUrl}${routePath}`, { waitUntil: "networkidle" });
      const metrics = await page.evaluate(() => {
        function luminance(color) {
          const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (!match) return null;
          const channels = match.slice(1, 4).map((value) => {
            const normalized = Number(value) / 255;
            return normalized <= 0.04045
              ? normalized / 12.92
              : ((normalized + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
        }

        function effectiveBackground(element) {
          let current = element;
          while (current) {
            const background = getComputedStyle(current).backgroundColor;
            if (background && background !== "rgba(0, 0, 0, 0)" && background !== "transparent") {
              return background;
            }
            current = current.parentElement;
          }
          return "rgb(255, 255, 255)";
        }

        function contrastRatio(foreground, background) {
          const foregroundLuminance = luminance(foreground);
          const backgroundLuminance = luminance(background);
          if (foregroundLuminance === null || backgroundLuminance === null) return null;
          return (
            (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
            (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
          );
        }

        const h1Count = document.querySelectorAll("h1").length;
        const overflow =
          document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const gateway = document.querySelector(".gateway-frame");
        const animationName = gateway ? getComputedStyle(gateway).animationName : "none";
        const forms = document.querySelectorAll("form").length;
        const suspiciousLinks = [...document.querySelectorAll("a")]
          .map((link) => link.getAttribute("href") ?? "")
          .filter((href) => href === "#" || /example\.com|0123456789/i.test(href));
        const headingLevels = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].map(
          (heading) => Number(heading.tagName.slice(1)),
        );
        const headingSkips = headingLevels.filter(
          (level, index) => index > 0 && level - headingLevels[index - 1] > 1,
        );
        const contrastFailures = [
          ...document.querySelectorAll("p, li, a, span, strong, dt, dd, h1, h2, h3"),
        ]
          .filter((element) => element.children.length === 0 && element.textContent?.trim())
          .flatMap((element) => {
            const style = getComputedStyle(element);
            if (
              style.display === "none" ||
              style.visibility === "hidden" ||
              Number(style.opacity) === 0
            ) {
              return [];
            }
            const ratio = contrastRatio(style.color, effectiveBackground(element));
            if (ratio === null) return [];
            const size = Number.parseFloat(style.fontSize);
            const weight = Number.parseInt(style.fontWeight, 10) || 400;
            const large = size >= 24 || (size >= 18.66 && weight >= 700);
            const minimum = large ? 3 : 4.5;
            return ratio + 0.01 < minimum
              ? [
                  {
                    text: element.textContent.trim().slice(0, 48),
                    ratio: Number(ratio.toFixed(2)),
                    minimum,
                  },
                ]
              : [];
          });
        return {
          h1Count,
          overflow,
          animationName,
          forms,
          suspiciousLinks,
          headingSkips,
          contrastFailures,
        };
      });

      const key = `${routeName}:${width}`;
      const captureName = captures.get(key);
      if (captureName) {
        const path = join(evidenceDirectory, captureName);
        await page.screenshot({ path, fullPage: true });
        evidence.push({
          route: routePath,
          width,
          state: "full-reduced-motion",
          path,
          sha256: sha256(path),
        });
      }

      const result = {
        route: routePath,
        width,
        status: response?.status() ?? 0,
        ...metrics,
        runtimeErrors,
      };
      results.push(result);

      if (!response?.ok()) failures.push(`${routePath}@${width}: HTTP ${response?.status()}`);
      if (metrics.h1Count !== 1) failures.push(`${routePath}@${width}: H1=${metrics.h1Count}`);
      if (metrics.overflow > 1)
        failures.push(`${routePath}@${width}: overflow=${metrics.overflow}px`);
      if (metrics.forms !== 0) failures.push(`${routePath}@${width}: form detected`);
      if (metrics.suspiciousLinks.length)
        failures.push(`${routePath}@${width}: fake link detected`);
      if (metrics.headingSkips.length)
        failures.push(`${routePath}@${width}: heading order skipped`);
      if (metrics.contrastFailures.length)
        failures.push(
          `${routePath}@${width}: contrast ${JSON.stringify(metrics.contrastFailures.slice(0, 3))}`,
        );
      if (runtimeErrors.length)
        failures.push(`${routePath}@${width}: ${runtimeErrors.join(" | ")}`);
      if (metrics.animationName !== "none")
        failures.push(`${routePath}@${width}: reduced motion=${metrics.animationName}`);

      await context.close();
    }
  }

  const interactionContext = await browser.newContext({
    viewport: { width: 375, height: 800 },
    locale: "vi-VN",
  });
  const interactionPage = await interactionContext.newPage();
  await interactionPage.goto(baseUrl, { waitUntil: "networkidle" });
  await interactionPage.keyboard.press("Tab");
  const focused = await interactionPage.evaluate(() => {
    const element = document.activeElement;
    if (!(element instanceof HTMLElement)) return null;
    const style = getComputedStyle(element);
    return {
      text: element.textContent?.trim(),
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  });
  if (!focused || focused.outlineStyle === "none" || focused.outlineWidth === "0px") {
    failures.push("keyboard: first focus is not visibly outlined");
  }
  await interactionPage.locator(".mobile-navigation summary").click();
  const mobileOpen = await interactionPage
    .locator(".mobile-navigation")
    .evaluate((element) => element.hasAttribute("open"));
  const touchTargets = await interactionPage
    .locator(".site-header a, .mobile-navigation summary, .mobile-navigation nav a")
    .evaluateAll((elements) =>
      elements
        .map((element) => ({
          text: element.textContent?.trim(),
          width: element.getBoundingClientRect().width,
          height: element.getBoundingClientRect().height,
        }))
        .filter((target) => target.width > 0 && target.height > 0),
    );
  if (!mobileOpen) failures.push("mobile navigation did not open");
  for (const target of touchTargets) {
    if (target.height < 44 || target.width < 44)
      failures.push(`touch target ${target.text}: ${target.width}x${target.height}`);
  }
  const navPath = join(evidenceDirectory, "navigation__375__open.png");
  await interactionPage.screenshot({ path: navPath, fullPage: false });
  evidence.push({
    route: "/",
    width: 375,
    state: "navigation-open",
    path: navPath,
    sha256: sha256(navPath),
  });
  await interactionContext.close();

  for (const routePath of [
    "/",
    "/dich-vu/ban-mau-cau-truc",
    "/kien-thuc/cach-doc-thong-tin-an-toan",
    "/lien-he",
  ]) {
    const context = await browser.newContext({
      viewport: { width: 640, height: 800 },
      locale: "vi-VN",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(`${baseUrl}${routePath}`, { waitUntil: "networkidle" });
    const reflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (reflow > 1) failures.push(`${routePath}@200%-equivalent: overflow=${reflow}px`);
    await context.close();
  }

  await browser.close();
  mkdirSync(dirname(resultPath), { recursive: true });
  writeFileSync(
    resultPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        routes: routes.length,
        widths,
        results,
        focused,
        mobileOpen,
        touchTargets,
        evidence,
        failures,
      },
      null,
      2,
    ),
  );
} finally {
  server.kill();
}

if (failures.length > 0) {
  console.error(`P4 browser audit failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `P4 browser audit passed: ${routes.length} routes × ${widths.length} widths, ${evidence.length} retained captures.`,
);
