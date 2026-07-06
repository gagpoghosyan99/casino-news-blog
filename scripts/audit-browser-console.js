#!/usr/bin/env node
/**
 * Browser console audit via Playwright.
 * Usage: node scripts/audit-browser-console.js [--base=https://casinopuls.site]
 */
const fs = require("fs");
const path = require("path");

const base =
  process.argv.find((a) => a.startsWith("--base="))?.split("=")[1] ||
  process.env.AUDIT_BASE_URL ||
  "https://casinopuls.site";

const paths = [
  "/",
  "/casinos",
  "/compare",
  "/blogs/review-stake",
  "/blacklist",
];

async function main() {
  let playwright;
  try {
    playwright = require("playwright");
  } catch {
    console.error("Playwright not installed. Run: npm install -D playwright && npx playwright install chromium");
    process.exit(2);
  }

  const browser = await playwright.chromium.launch({ headless: true });
  const results = [];

  for (const p of paths) {
    const url = `${base.replace(/\/$/, "")}${p}`;
    const page = await browser.newPage();
    const consoleLogs = [];
    const pageErrors = [];
    const failedResources = [];

    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.type() === "warning") {
        consoleLogs.push({ type: msg.type(), text: msg.text() });
      }
    });
    page.on("pageerror", (err) => pageErrors.push(String(err)));
    page.on("requestfailed", (req) => {
      failedResources.push({
        url: req.url(),
        failure: req.failure()?.errorText || "unknown",
      });
    });

    let status = null;
    try {
      const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      status = resp?.status() ?? null;
      await page.waitForTimeout(1500);
    } catch (err) {
      pageErrors.push(`Navigation: ${err.message}`);
    }

    const hydrationWarnings = consoleLogs.filter((l) =>
      /hydration|did not match|Text content does not match/i.test(l.text)
    );

    results.push({
      url,
      httpStatus: status,
      consoleErrors: consoleLogs.filter((l) => l.type === "error"),
      consoleWarnings: consoleLogs.filter((l) => l.type === "warning"),
      pageErrors,
      failedResources,
      hydrationWarnings,
    });

    await page.close();
  }

  await browser.close();

  const outDir = path.join(process.cwd(), "docs/audits/p7");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "browser-console-audit.json"),
    JSON.stringify({ base, auditedAt: new Date().toISOString(), results }, null, 2)
  );

  let projectErrors = 0;
  for (const r of results) {
    const relevant = [
      ...r.pageErrors,
      ...r.consoleErrors.map((e) => e.text),
      ...r.failedResources.filter((f) => !f.url.includes("google-analytics")).map((f) => `${f.url} — ${f.failure}`),
    ].filter(
      (t) =>
        !/chrome-extension|moz-extension|safari-extension|devtools/i.test(t) &&
        !/favicon\.ico/i.test(t)
    );
    projectErrors += relevant.length;
    console.log(`\n${r.url} [${r.httpStatus}]`);
    if (relevant.length === 0) console.log("  OK — no project-level errors");
    else relevant.forEach((e) => console.log(`  ERROR: ${e}`));
    if (r.hydrationWarnings.length)
      r.hydrationWarnings.forEach((h) => console.log(`  HYDRATION: ${h.text}`));
  }

  console.log(`\nTotal project-level issues: ${projectErrors}`);
  process.exit(projectErrors > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
