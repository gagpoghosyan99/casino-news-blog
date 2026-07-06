#!/usr/bin/env node
/**
 * Authority expansion internal linking audit — pillar reviews, crypto guides, country hubs.
 * Usage: node scripts/audit-authority-internal-links.js [baseUrl]
 * Writes JSON summary to stdout.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASE = (process.argv[2] || "https://casinopuls.site").replace(/\/$/, "");
const OUT_DIR = path.join(ROOT, "docs/audits/p4-authority-expansion");

const PILLAR_PRIORITY = [
  "review-draftkings-casino",
  "review-pokerstars-casino",
  "review-sportsbet-io",
  "review-fortunejack",
  "review-bitcasino",
  "review-duelbits",
  "review-gamdom",
  "review-tg-casino",
  "review-ignition-casino",
  "review-thunderpick",
];

const CRYPTO_PRIORITY = [
  "tron-casino",
  "solana-casino",
  "litecoin-casino",
  "dogecoin-casino",
  "polygon-casino",
  "usdt-trc20-casino",
  "usdt-erc20-casino",
];

const HUB_PRIORITY = [
  "sri-lanka-casino-payments",
  "nepal-casino-payments",
  "philippines-casino-payments",
  "nigeria-casino-payments",
];

const PILLAR_MIN_WORDS = 1500;
const CRYPTO_MIN_WORDS = 900;
const HUB_MIN_WORDS = 1000;
const TITLE_MAX = 65;

function readFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function uniqueMatches(text, pattern) {
  const matches = text.match(pattern);
  return matches ? new Set(matches).size : 0;
}

function extractLinks(html) {
  const links = new Set();
  const re = /href=["'](\/[^"'#?]+)["']/g;
  let m;
  while ((m = re.exec(html))) links.add(m[1]);
  return [...links];
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim() : "";
}

function countH1(html) {
  return (html.match(/<h1[\s>]/gi) || []).length;
}

function hasBreadcrumbSchema(html) {
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let block;
  while ((block = re.exec(html))) {
    try {
      const data = JSON.parse(block[1]);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item["@type"] === "BreadcrumbList") return true;
      }
    } catch {
      /* skip */
    }
  }
  return false;
}

function hasReviewSchema(html) {
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let block;
  while ((block = re.exec(html))) {
    try {
      const data = JSON.parse(block[1]);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item["@type"] === "Review") return true;
      }
    } catch {
      /* skip */
    }
  }
  return false;
}

function hasFaqSchema(html) {
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let block;
  while ((block = re.exec(html))) {
    try {
      const data = JSON.parse(block[1]);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item["@type"] === "FAQPage") return true;
      }
    } catch {
      /* skip */
    }
  }
  return false;
}

function hasVisibleFaq(html) {
  return /faq|frequently asked/i.test(html) && /<h[23][^>]*>.*\?/i.test(html);
}

function extractPillarSlugsFromSource() {
  const files = ["src/data/pillar-reviews.ts", "src/data/pillar-reviews-p4-profiles.ts"];
  const slugs = new Set();
  for (const file of files) {
    const src = readFile(file);
    const re = /slug:\s*["']([^"']+)["']/g;
    let m;
    while ((m = re.exec(src))) slugs.add(m[1]);
  }
  return [...slugs];
}

function getSitemapPaths() {
  const xmlPath = path.join(ROOT, ".next/server/app/sitemap.xml.body");
  if (fs.existsSync(xmlPath)) {
    const xml = fs.readFileSync(xmlPath, "utf8");
    const paths = [];
    const re = /<loc>https:\/\/casinopuls\.site([^<]*)<\/loc>/g;
    let m;
    while ((m = re.exec(xml))) paths.push(m[1] || "/");
    return paths;
  }
  return null;
}

async function fetchPage(pagePath) {
  const url = `${BASE}${pagePath}`;
  const res = await fetch(url, { headers: { "User-Agent": "CasinoPulse-Authority-Audit/1.0" } });
  const html = res.ok ? await res.text() : "";
  return { url, status: res.status, html };
}

function linkChecks(links, type) {
  const text = links.join(" ");
  const reviewLinks = uniqueMatches(text, /\/blogs\/(?:review-|avoid-)[a-z0-9-]+/g);
  const paymentCryptoLinks = uniqueMatches(text, /\/(?:payment|crypto)\/[a-z0-9-]+/g);
  const countryHubLinks = uniqueMatches(
    text,
    /\/(?:india|bangladesh|pakistan|sri-lanka|nepal|philippines|nigeria)-casino-payments/g
  );
  const compareLinks = uniqueMatches(text, /\/compare/g);
  const methodologyLinks = uniqueMatches(text, /\/how-we-review/g);
  const rgLinks = uniqueMatches(text, /\/responsible-gambling/g);

  if (type === "pillar") {
    return {
      reviewLinks: { found: reviewLinks, min: 5, pass: reviewLinks >= 5 },
      paymentCryptoLinks: { found: paymentCryptoLinks, min: 3, pass: paymentCryptoLinks >= 3 },
      countryHubLinks: { found: countryHubLinks, min: 2, pass: countryHubLinks >= 2 },
      compareLink: { found: compareLinks, min: 1, pass: compareLinks >= 1 },
      methodologyLink: { found: methodologyLinks, min: 1, pass: methodologyLinks >= 1 },
      responsibleGamblingLink: { found: rgLinks, min: 1, pass: rgLinks >= 1 },
    };
  }
  if (type === "crypto") {
    return {
      reviewLinks: { found: reviewLinks, min: 5, pass: reviewLinks >= 5 },
      hubLinks: {
        found: countryHubLinks + uniqueMatches(text, /\/india-casino-payments/g),
        min: 1,
        pass: countryHubLinks >= 1 || text.includes("/india-casino-payments"),
      },
      responsibleGamblingLink: { found: rgLinks, min: 1, pass: rgLinks >= 1 },
    };
  }
  return {
    paymentCryptoLinks: { found: paymentCryptoLinks, min: 2, pass: paymentCryptoLinks >= 2 },
    reviewLinks: { found: reviewLinks, min: 3, pass: reviewLinks >= 3 },
    responsibleGamblingLink: { found: rgLinks, min: 1, pass: rgLinks >= 1 },
  };
}

async function auditEntry(pagePath, type, minWords, slug) {
  const { url, status, html } = await fetchPage(pagePath);
  const text = visibleText(html);
  const words = wordCount(text);
  const title = extractTitle(html);
  const h1Count = countH1(html);
  const links = extractLinks(html);
  const checks = linkChecks(links, type);
  const sitemapPaths = getSitemapPaths();
  const inSitemap = sitemapPaths ? sitemapPaths.includes(pagePath) : null;
  const breadcrumb = hasBreadcrumbSchema(html);
  const reviewSchema = hasReviewSchema(html);
  const faqVisible = hasVisibleFaq(html);
  const faqSchema = hasFaqSchema(html);
  const canonicalMatch = html.includes(`href="${pagePath}"`) || html.includes(`>${pagePath}<`);

  const failures = [];
  if (status !== 200) failures.push(`HTTP ${status}`);
  if (words < minWords) failures.push(`word count ${words} < ${minWords}`);
  if (title.length > TITLE_MAX) failures.push(`title length ${title.length} > ${TITLE_MAX}`);
  if (h1Count !== 1) failures.push(`H1 count ${h1Count} !== 1`);
  if (inSitemap === false) failures.push("missing from sitemap");
  if (!breadcrumb) failures.push("missing BreadcrumbList schema");
  if (type === "pillar" && !reviewSchema) failures.push("missing Review schema");
  if (type === "pillar" && reviewSchema && !extractPillarSlugsFromSource().includes(slug))
    failures.push("unexpected Review schema slug");
  if (faqVisible && !faqSchema) failures.push("visible FAQ without FAQPage schema");
  if (!faqVisible && faqSchema) failures.push("FAQPage schema without visible FAQ");

  for (const [key, val] of Object.entries(checks)) {
    if (!val.pass) failures.push(`${key}: found ${val.found}, need ${val.min}`);
  }

  let verdict = "FAIL";
  if (failures.length === 0) {
    if (type === "pillar") verdict = "PILLAR_REVIEW_PASS";
    else if (type === "crypto") verdict = "CRYPTO_GUIDE_PASS";
    else verdict = "COUNTRY_HUB_PASS";
  }

  return {
    slug,
    path: pagePath,
    url,
    status,
    words,
    titleLength: title.length,
    h1Count,
    inSitemap,
    breadcrumbSchema: breadcrumb,
    reviewSchema: type === "pillar" ? reviewSchema : undefined,
    faqSchemaAllowed: faqVisible ? faqSchema : !faqSchema,
    checks,
    failures,
    verdict,
  };
}

async function main() {
  const results = [];

  for (const slug of PILLAR_PRIORITY) {
    results.push(await auditEntry(`/blogs/${slug}`, "pillar", PILLAR_MIN_WORDS, slug));
  }
  for (const slug of CRYPTO_PRIORITY) {
    results.push(await auditEntry(`/crypto/${slug}`, "crypto", CRYPTO_MIN_WORDS, slug));
  }
  for (const slug of HUB_PRIORITY) {
    results.push(await auditEntry(`/${slug}`, "hub", HUB_MIN_WORDS, slug));
  }

  const summary = {
    baseUrl: BASE,
    auditedAt: new Date().toISOString(),
    pillarPass: results.filter((r) => r.verdict === "PILLAR_REVIEW_PASS").length,
    cryptoPass: results.filter((r) => r.verdict === "CRYPTO_GUIDE_PASS").length,
    hubPass: results.filter((r) => r.verdict === "COUNTRY_HUB_PASS").length,
    failCount: results.filter((r) => r.verdict === "FAIL").length,
    results,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(OUT_DIR, "authority-internal-links-audit.json"),
    JSON.stringify(summary, null, 2)
  );
  process.stdout.write(JSON.stringify(summary, null, 2));

  if (summary.failCount > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
