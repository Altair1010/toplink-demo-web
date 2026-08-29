// prettier-ignore
async (page) => {
  const baseUrl = "http://localhost:3000/toplink-demo-web/motion-lab/humanizer-h4r/";
  const screenshotRoot = "../docs/humanizer/h4r/screenshots";

  async function prepare(mode, width, height) {
    await page.goto(`${baseUrl}?mode=${mode}`);
    await page.setViewportSize({ width, height });
    await page.evaluate(() => {
      document.querySelector("nextjs-portal")?.remove();
      document.activeElement?.blur();
    });
  }

  async function captureSection(mode, width, height, selector, filename) {
    await prepare(mode, width, height);
    await page.locator(selector).screenshot({ path: `${screenshotRoot}/${filename}` });
  }

  await captureSection(
    "grayscale",
    375,
    812,
    "[data-exchange=arrival]",
    "01-grayscale-arrival-375.png",
  );
  await captureSection(
    "grayscale",
    1280,
    900,
    "[data-exchange=arrival]",
    "02-grayscale-arrival-1280.png",
  );
  await captureSection(
    "grayscale",
    375,
    812,
    "[data-exchange=boundary]",
    "03-grayscale-boundary-375.png",
  );
  await captureSection(
    "grayscale",
    1280,
    900,
    "[data-exchange=boundary]",
    "04-grayscale-boundary-1280.png",
  );
  await captureSection(
    "grayscale",
    375,
    812,
    "[data-exchange=consequence]",
    "05-grayscale-consequence-375.png",
  );
  await captureSection(
    "grayscale",
    1280,
    900,
    "[data-exchange=consequence]",
    "06-grayscale-consequence-1280.png",
  );

  await prepare("calibrated", 375, 812);
  await page.locator('[data-exchange="arrival"] button[aria-pressed]').first().click();
  await page.evaluate(() => document.activeElement?.blur());
  await page
    .locator("[data-h4r-prototype=true]")
    .screenshot({ path: `${screenshotRoot}/07-calibrated-color-375.png` });

  await prepare("calibrated", 1280, 900);
  await page.locator('[data-exchange="arrival"] button[aria-pressed]').first().click();
  await page.evaluate(() => document.activeElement?.blur());
  await page
    .locator("[data-h4r-prototype=true]")
    .screenshot({ path: `${screenshotRoot}/08-calibrated-color-1280.png` });

  await prepare("blind", 1280, 900);
  await page
    .locator("[data-h4r-prototype=true]")
    .screenshot({ path: `${screenshotRoot}/09-no-brand-blind-1280.png` });

  await prepare("no-evidence", 1280, 900);
  await page
    .locator("[data-h4r-prototype=true]")
    .screenshot({ path: `${screenshotRoot}/10-no-evidence-collapse-1280.png` });
}
