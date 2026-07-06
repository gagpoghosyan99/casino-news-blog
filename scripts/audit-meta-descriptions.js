#!/usr/bin/env node
/**
 * Meta description audit for indexable pages.
 * Usage: node scripts/audit-meta-descriptions.js [baseUrl]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASE = (process.argv[2] || "https://casinopuls.site").replace(/\/$/, "");
const IDEAL_MIN = 120;
const IDEAL_MAX = 160;
const HARD_MAX = 160;
const OUT_DIR = path.join(ROOT, "docs/audits/p6");

function readFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function getIndexablePaths() {
  const paths = new Set(["/"]);
  const staticPaths = [
    "/casinos",
    "/news",
    "/blogs",
    "/how-we-review",
    "/editorial-policy",
    "/editorial-team",
    "/author/casinopulse-editorial-team",
    "/about",
    "/blacklist",
    "/responsible-gambling",
    "/contact",
    "/terms",
    "/privacy",
    "/cookies",
    "/compare",
    "/india-casino-payments",
    "/bangladesh-casino-payments",
    "/pakistan-casino-payments",
    "/sri-lanka-casino-payments",
    "/nepal-casino-payments",
    "/philippines-casino-payments",
    "/nigeria-casino-payments",
  ];
  staticPaths.forEach((p) => paths.add(p));

  for (const file of [
    "src/data/programmatic/hub-pages.ts",
    "src/data/programmatic/hub-pages-p4.ts",
    "src/data/programmatic/payment-pages.ts",
    "src/data/programmatic/crypto-pages.ts",
    "src/data/programmatic/crypto-pages-p4.ts",
  ]) {
    if (!fs.existsSync(path.join(ROOT, file))) continue;
    const src = readFile(file);
    const blocks = src.split(/\{\s*slug:/).slice(1);
    for (const block of blocks) {
      const slug = block.match(/["']([^"']+)["']/)?.[1];
      if (!slug || block.includes("indexable: false")) continue;
      if (file.includes("payment-pages")) paths.add(`/payment/${slug}`);
      else if (file.includes("crypto-pages")) paths.add(`/crypto/${slug}`);
      else if (file.includes("hub-pages")) paths.add(`/${slug}`);
    }
  }

  const blogs = readFile("src/data/blogs.ts");
  const slugRe = /slug:\s*["']([^"']+)["']/g;
  let s;
  while ((s = slugRe.exec(blogs))) {
    const block = blogs.slice(s.index, s.index + 500);
    if (!block.includes("indexable: false")) paths.add(`/blogs/${s[1]}`);
  }

  return [...paths].sort();
}

function extractMetaDescription(html) {
  const m = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  if (m) return m[1].trim();
  const m2 = html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  return m2 ? m2[1].trim() : "";
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function auditPath(pagePath) {
  const url = `${BASE}${pagePath}`;
  const res = await fetch(url, { headers: { "User-Agent": "CasinoPulse-Meta-Audit/1.0" } });
  const html = res.ok ? await res.text() : "";
  const raw = extractMetaDescription(html);
  const description = decodeEntities(raw);
  const len = description.length;
  let verdict = "META_OK";
  const issues = [];

  if (!description) {
    verdict = "META_MISSING";
    issues.push("missing meta description");
  } else if (len > HARD_MAX) {
    verdict = "META_TOO_LONG";
    issues.push(`length ${len} > ${HARD_MAX}`);
  } else if (len < IDEAL_MIN) {
    verdict = "META_SHORT";
    issues.push(`length ${len} < ideal ${IDEAL_MIN}`);
  } else if (len > IDEAL_MAX) {
    verdict = "META_LONG";
    issues.push(`length ${len} > ideal ${IDEAL_MAX}`);
  }

  return { path: pagePath, url, status: res.status, description, length: len, verdict, issues };
}

async function main() {
  const paths = getIndexablePaths();
  const results = [];
  for (const p of paths) {
    results.push(await auditPath(p));
  }

  const descriptions = results.filter((r) => r.description).map((r) => r.description);
  const dupes = [];
  const seen = new Map();
  for (const r of results) {
    if (!r.description) continue;
    const key = r.description.toLowerCase();
    if (seen.has(key)) dupes.push({ path: r.path, duplicateOf: seen.get(key) });
    else seen.set(key, r.path);
  }

  const summary = {
    baseUrl: BASE,
    auditedAt: new Date().toISOString(),
    idealRange: `${IDEAL_MIN}-${IDEAL_MAX}`,
    hardMax: HARD_MAX,
    total: results.length,
    missing: results.filter((r) => r.verdict === "META_MISSING").length,
    tooLong: results.filter((r) => r.verdict === "META_TOO_LONG").length,
    short: results.filter((r) => r.verdict === "META_SHORT").length,
    long: results.filter((r) => r.verdict === "META_LONG").length,
    ok: results.filter((r) => r.verdict === "META_OK").length,
    duplicateDescriptions: dupes,
    homepage: results.find((r) => r.path === "/"),
    results,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "meta-description-audit.json"), JSON.stringify(summary, null, 2));
  process.stdout.write(JSON.stringify(summary, null, 2));

  if (summary.missing > 0 || summary.tooLong > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
