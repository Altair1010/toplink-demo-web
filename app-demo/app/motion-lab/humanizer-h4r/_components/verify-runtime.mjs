// prettier-ignore
async (page) => {
  const baseUrl = "http://localhost:3000/toplink-demo-web/motion-lab/humanizer-h4r/";
  const results = {};
  const mutatingRequests = [];
  const consoleErrors = [];
  const failedResponses = [];
  const failedRequests = [];

  page.on("request", (request) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method())) {
      mutatingRequests.push(`${request.method()} ${request.url()}`);
    }
  });
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
  });
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? "failed"}`);
  });

  async function goto(mode = "grayscale") {
    await page.goto(`${baseUrl}?mode=${mode}`);
    await page.waitForSelector(`[data-capture-mode="${mode}"]`);
    await page.evaluate(() => document.querySelector("nextjs-portal")?.remove());
  }

  async function assertNoOverflow(width) {
    await page.setViewportSize({ width, height: 900 });
    await goto("grayscale");
    const overflow = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    if (overflow.scroll > overflow.client + 1) {
      throw new Error(`overflow ${width}: ${overflow.scroll} > ${overflow.client}`);
    }
    results[`viewport-${width}`] = "PASS";
  }

  for (const width of [375, 768, 1280, 1440]) await assertNoOverflow(width);

  await page.setViewportSize({ width: 384, height: 450 });
  await goto("grayscale");
  const zoomOverflow = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll("[data-h4r-prototype] *")]
      .map((node) => {
        const rect = node.getBoundingClientRect();
        return { node: node.tagName, left: rect.left, right: rect.right };
      })
      .filter(({ left, right }) => left < -1 || right > viewportWidth + 1);
    return {
      viewportWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      prototypeScrollWidth: document.querySelector("[data-h4r-prototype]").scrollWidth,
      offenders: offenders.slice(0, 10),
    };
  });
  if (
    zoomOverflow.documentScrollWidth > zoomOverflow.viewportWidth + 1 ||
    zoomOverflow.prototypeScrollWidth > zoomOverflow.viewportWidth + 1 ||
    zoomOverflow.offenders.length
  ) {
    throw new Error(`overflow at 200% equivalent reflow: ${JSON.stringify(zoomOverflow)}`);
  }
  results["zoom-200-equivalent-reflow"] = zoomOverflow;

  await page.setViewportSize({ width: 1280, height: 900 });
  await goto("calibrated");
  await page.getByRole("button", { name: "Tôi đang có một vùng khó chịu" }).click();
  await page.getByRole("button", { name: "Xem Toplink có thể làm gì lúc này" }).click();
  if (
    (await page
      .locator("#h4r-boundary-question")
      .evaluate((node) => node === document.activeElement)) !== true
  ) {
    throw new Error("focus did not move to boundary heading");
  }
  await page.getByRole("button", { name: "Xem điều thực sự xảy ra nếu tiếp tục" }).click();
  if (
    (await page
      .locator("#h4r-consequence-question")
      .evaluate((node) => node === document.activeElement)) !== true
  ) {
    throw new Error("focus did not move to consequence heading");
  }
  if ((await page.locator("[data-exchange=consequence]").getAttribute("data-stage")) !== "review") {
    throw new Error("review state did not open");
  }
  results["guided-orientation"] = "PASS";

  const consequenceHierarchy = await page.evaluate(() => {
    const response = document.querySelector("[data-consequence-response=true]");
    const actions = document.querySelector("[data-consequence-actions=true]");
    const responseBox = response.getBoundingClientRect();
    const actionsBox = actions.getBoundingClientRect();
    const headingSize = Number.parseFloat(getComputedStyle(response.querySelector("h3")).fontSize);
    const actionSize = Number.parseFloat(
      getComputedStyle(actions.querySelector("button")).fontSize,
    );
    return {
      responseArea: responseBox.width * responseBox.height,
      actionsArea: actionsBox.width * actionsBox.height,
      headingSize,
      actionSize,
      responseBeforeActions: Boolean(
        response.compareDocumentPosition(actions) & Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    };
  });
  if (
    consequenceHierarchy.responseArea <= consequenceHierarchy.actionsArea ||
    consequenceHierarchy.headingSize <= consequenceHierarchy.actionSize ||
    !consequenceHierarchy.responseBeforeActions
  ) {
    throw new Error(`consequence hierarchy failed: ${JSON.stringify(consequenceHierarchy)}`);
  }
  results["consequence-over-cta"] = consequenceHierarchy;

  await page.getByRole("button", { name: "Tiếp tục xem" }).click();
  if (
    (await page.locator("[data-exchange=consequence]").getAttribute("data-stage")) !== "local-only"
  ) {
    throw new Error("local-only state missing");
  }
  if (
    (await page
      .locator("[data-consequence-response=true]")
      .evaluate((node) => node === document.activeElement)) !== true
  ) {
    throw new Error("focus did not settle on the updated consequence status");
  }
  await page.getByRole("button", { name: "Chỉnh lại" }).click();
  await page.getByRole("button", { name: "Xem Toplink có thể làm gì lúc này" }).click();
  await page.getByRole("button", { name: "Xem điều thực sự xảy ra nếu tiếp tục" }).click();
  await page.getByRole("button", { name: "Nội bộ: xem mẫu lỗi / thử lại" }).click();
  if (
    (await page.locator("[data-exchange=consequence]").getAttribute("data-stage")) !== "failure"
  ) {
    throw new Error("failure specimen missing");
  }
  await page.getByRole("button", { name: "Thử lại mẫu trạng thái" }).click();
  if ((await page.locator("[data-exchange=consequence]").getAttribute("data-stage")) !== "retry") {
    throw new Error("retry specimen missing");
  }
  await page.getByRole("button", { name: "Chỉnh lại" }).click();
  await page.getByRole("button", { name: "Xem Toplink có thể làm gì lúc này" }).click();
  await page.getByRole("button", { name: "Xem điều thực sự xảy ra nếu tiếp tục" }).click();
  await page.getByRole("button", { name: "Tôi vẫn chưa chắc" }).click();
  if (
    (await page.locator("[data-exchange=consequence]").getAttribute("data-stage")) !== "uncertain"
  ) {
    throw new Error("uncertainty state missing");
  }
  results.states = "PASS";

  await page.getByRole("button", { name: "Chỉnh lại" }).click();
  if (
    (await page
      .locator("#h4r-arrival-question")
      .evaluate((node) => node === document.activeElement)) !== true
  ) {
    throw new Error("edit did not return focus to arrival");
  }
  await page.getByRole("button", { name: /^Bỏ câu:/ }).click();
  if ((await page.getByText("Chưa chọn câu nào. Anh/chị vẫn có thể dừng ở đây.").count()) !== 1) {
    throw new Error("remove phrase did not restore empty state");
  }
  results["edit-remove"] = "PASS";

  await page.locator("summary").click();
  if ((await page.locator("details").getAttribute("open")) === null) {
    throw new Error("learning bridge did not open");
  }
  results["knowledge-bridge"] = "PASS";

  await page.locator("summary").focus();
  const boundaryFocus = await page.evaluate(() => {
    const summary = document.querySelector("summary");
    const section = document.querySelector("[data-exchange=boundary]");
    return {
      outline: getComputedStyle(summary).outlineColor,
      background: getComputedStyle(section).backgroundColor,
    };
  });
  const parseRgb = (value) => value.match(/[\d.]+/g).slice(0, 3).map(Number);
  const luminance = (rgb) => {
    const linear = rgb.map((channel) => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const foreground = luminance(parseRgb(boundaryFocus.outline));
  const background = luminance(parseRgb(boundaryFocus.background));
  const focusContrast =
    (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
  if (focusContrast < 3) {
    throw new Error(`boundary focus contrast below 3:1: ${focusContrast}`);
  }
  results["boundary-focus-contrast"] = Number(focusContrast.toFixed(2));

  await page.keyboard.press("Home");
  const focusAudit = [];
  for (let index = 0; index < 10; index += 1) {
    await page.keyboard.press("Tab");
    focusAudit.push(
      await page.evaluate(() => {
        const active = document.activeElement;
        const style = getComputedStyle(active);
        return {
          tag: active.tagName,
          text: active.textContent?.trim().slice(0, 60),
          outline: style.outlineStyle,
        };
      }),
    );
  }
  if (!focusAudit.some((entry) => entry.tag === "BUTTON" && entry.outline !== "none")) {
    throw new Error(`keyboard focus not visible: ${JSON.stringify(focusAudit)}`);
  }
  results.keyboard = focusAudit;

  await page.emulateMedia({ reducedMotion: "reduce" });
  await goto("grayscale");
  const reduced = await page.evaluate(() => {
    const choice = document.querySelector("button[aria-pressed]");
    const sections = [...document.querySelectorAll("[data-exchange]")];
    return {
      transitionDuration: getComputedStyle(choice).transitionDuration,
      visibleSections: sections.filter((section) => section.getBoundingClientRect().height > 0)
        .length,
    };
  });
  if (reduced.visibleSections !== 3 || Number.parseFloat(reduced.transitionDuration) > 0.001) {
    throw new Error(`reduced motion parity failed: ${JSON.stringify(reduced)}`);
  }
  results["reduced-motion"] = reduced;
  await page.emulateMedia({ reducedMotion: "no-preference" });

  await goto("blind");
  const blindText = await page.locator("[data-h4r-prototype=true]").innerText();
  if (blindText.includes("Toplink") || blindText.includes("Nhịp Hỏi")) {
    throw new Error(`blind mode leaked identity: ${blindText.slice(0, 200)}`);
  }
  results.blind = "PASS";

  await goto("no-evidence");
  const evidence = await page.evaluate(() => ({
    state: document.querySelector("[data-h4r-prototype]").getAttribute("data-evidence-state"),
    images: document.querySelectorAll("[data-h4r-prototype] img").length,
    placeholders: document.querySelectorAll("[data-evidence-slot], [data-photo-placeholder]")
      .length,
  }));
  if (
    evidence.state !== "collapsed-unavailable" ||
    evidence.images !== 0 ||
    evidence.placeholders !== 0
  ) {
    throw new Error(`evidence collapse failed: ${JSON.stringify(evidence)}`);
  }
  results["evidence-collapse"] = evidence;

  const language = await page.locator("[data-h4r-prototype=true]").innerText();
  if (
    !language.includes("Anh/chị") ||
    !language.includes("chẩn đoán") ||
    !language.includes("chưa chắc")
  ) {
    throw new Error("Vietnamese diacritic/plain-language specimen missing");
  }
  results["vietnamese-copy"] = "PASS";

  if (mutatingRequests.length)
    throw new Error(`unexpected mutating requests: ${mutatingRequests.join(", ")}`);
  if (consoleErrors.length) throw new Error(`console errors: ${consoleErrors.join(" | ")}`);
  if (failedResponses.length)
    throw new Error(`failed responses: ${failedResponses.join(" | ")}`);
  if (failedRequests.length) throw new Error(`failed requests: ${failedRequests.join(" | ")}`);
  results["mutating-network-requests"] = 0;
  results["console-errors"] = 0;
  results["failed-responses"] = 0;
  results["failed-requests"] = 0;

  return results;
}
