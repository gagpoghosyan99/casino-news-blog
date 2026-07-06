#!/usr/bin/env node
/**
 * Audit visible word count on indexable URLs.
 * Usage: node scripts/audit-word-count.js [baseUrl]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASE = (process.argv[2] || "https://casinopuls.site").replace(/\/$/, "");
const NEWS_MIN = 500;
const INDEXABLE_MIN = 200;

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
  ];
  staticPaths.forEach((p) => paths.add(p));

  for (const file of ["src/data/programmatic/hub-pages.ts", "src/data/programmatic/payment-pages.ts", "src/data/programmatic/crypto-pages.ts"]) {
    const src = readFile(file);
    const blocks = src.split(/\{\s*slug:/).slice(1);
    for (const block of blocks) {
      const slug = block.match(/["']([^"']+)["']/)?.[1];
      if (!slug || block.includes("indexable: false")) continue;
      if (file.includes("payment-pages")) paths.add(`/payment/${slug}`);
      else if (file.includes("crypto-pages")) paths.add(`/crypto/${slug}`);
      else paths.add(`/${slug}`);
    }
  }
  const blogs = readFile("src/data/blogs.ts");
  const slugRe = /slug:\s*["']([^"']+)["']/g;
  let s;
  while ((s = slugRe.exec(blogs))) {
    const block = blogs.slice(s.index, s.index + 500);
    if (!block.includes("indexable: false")) paths.add(`/blogs/${s[1]}`);
  }
  const news = readFile("src/data/news.ts");
  const idRe = /id:\s*["']([^"']+)["']/g;
  while ((s = idRe.exec(news))) {
    const block = news.slice(s.index, s.index + 800);
    if (block.includes("indexable: true")) paths.add(`/news/${s[1]}`);
  }
  return [...paths].sort();
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text) {
  if (!text) return 0;
  return text.split(" ").filter(Boolean).length;
}

function verdict(path, count, robots) {
  if (path.startsWith("/go/")) return "NOINDEX_REDIRECT_OK";
  if (robots.includes("noindex")) return "NOINDEX_EXPECTED";
  if (path.startsWith("/news/") && count < NEWS_MIN) return "LOW_WORD_COUNT_NEWS";
  if (count < INDEXABLE_MIN) return "LOW_WORD_COUNT";
  return "WORD_COUNT_OK";
}

async function auditPath(urlPath) {
  const url = `${BASE}${urlPath === "/" ? "" : urlPath}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "CasinoPulse-SEO-Audit/1.0" } });
    const html = await res.text();
    const robotsMeta = html.match(/name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1]?.toLowerCase() || "";
    const xRobots = res.headers.get("x-robots-tag")?.toLowerCase() || "";
    const robots = `${robotsMeta} ${xRobots}`;
    const count = wordCount(visibleText(html));
    return {
      url,
      path: urlPath,
      wordCount: count,
      robots,
      verdict: verdict(urlPath, count, robots),
    };
  } catch (err) {
    return { url, path: urlPath, error: String(err), wordCount: 0, verdict: "FETCH_ERROR" };
  }
}

async function main() {
  const paths = getIndexablePaths();
  const results = [];
  for (const p of paths) {
    const row = await auditPath(p);
    results.push(row);
    process.stderr.write(`${p} -> ${row.wordCount} words (${row.verdict})\n`);
  }

  const summary = {
    baseUrl: BASE,
    auditedAt: new Date().toISOString(),
    newsMinWords: NEWS_MIN,
    indexableMinWords: INDEXABLE_MIN,
    lowCount: results.filter((r) => r.verdict.startsWith("LOW_WORD")).length,
    results,
  };

  process.stdout.write(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
