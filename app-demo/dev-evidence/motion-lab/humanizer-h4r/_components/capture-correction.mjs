// prettier-ignore
async (page) => {
  const baseUrl = "http://localhost:3000/toplink-demo-web/motion-lab/humanizer-h4r/";
  const screenshotRoot = "../docs/humanizer/h4r/screenshots/correction";

  async function prepare(mode, width, height) {
    await page.goto(`${baseUrl}?mode=${mode}`);
    await page.setViewportSize({ width, height });
    await page.locator("[data-h4r-prototype=true]").waitFor();
    await page.addStyleTag({
      content: "nextjs-portal, a.skip-link { visibility: hidden !important; }",
    });
    await page.evaluate(() => document.activeElement?.blur());
  }

  async function captureSection(mode, width, height, selector, filename) {
    await prepare(mode, width, height);
    await page.locator(selector).screenshot({ path: `${screenshotRoot}/${filename}` });
  }

  async function captureConsequence(width, height, filename) {
    await prepare("grayscale", width, height);
    await page.locator('[data-exchange="arrival"] button[aria-pressed]').first().click();
    await page.getByRole("button", { name: "Xem Toplink có thể hỗ trợ đến đâu" }).click();
    await page.getByRole("button", { name: "Xem trước điều xảy ra nếu tiếp tục" }).click();
    await page.evaluate(() => document.activeElement?.blur());
    await page.locator('[data-exchange="consequence"]').screenshot({ path: `${screenshotRoot}/${filename}` });
  }

  await captureSection("grayscale", 375, 812, "[data-exchange=arrival]", "01-corrected-grayscale-arrival-375.png");
  await captureSection("grayscale", 1280, 900, "[data-exchange=arrival]", "02-corrected-grayscale-arrival-1280.png");
  await captureSection("grayscale", 375, 812, "[data-exchange=boundary]", "03-corrected-grayscale-boundary-375.png");
  await captureSection("grayscale", 1280, 900, "[data-exchange=boundary]", "04-corrected-grayscale-boundary-1280.png");
  await captureConsequence(375, 812, "05-corrected-grayscale-consequence-375.png");
  await captureConsequence(1280, 900, "06-corrected-grayscale-consequence-1280.png");

  await prepare("calibrated", 375, 812);
  await page.locator('[data-exchange="arrival"] button[aria-pressed]').first().click();
  await page.evaluate(() => document.activeElement?.blur());
  await page.locator("[data-h4r-prototype=true]").screenshot({ path: `${screenshotRoot}/07-corrected-color-375.png` });

  await prepare("calibrated", 1280, 900);
  await page.locator('[data-exchange="arrival"] button[aria-pressed]').first().click();
  await page.evaluate(() => document.activeElement?.blur());
  await page.locator("[data-h4r-prototype=true]").screenshot({ path: `${screenshotRoot}/08-corrected-color-1280.png` });

  await prepare("blind", 1280, 900);
  await page.locator("[data-h4r-prototype=true]").screenshot({ path: `${screenshotRoot}/09-corrected-blind-1280.png` });

  await prepare("no-evidence", 1280, 900);
  await page.locator("[data-h4r-prototype=true]").screenshot({ path: `${screenshotRoot}/10-corrected-no-evidence-collapse-1280.png` });
}
