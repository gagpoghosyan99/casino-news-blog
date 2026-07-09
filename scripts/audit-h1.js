#!/usr/bin/env node
/**
 * Audit H1 presence on indexable URLs.
 * Usage: node scripts/audit-h1.js [baseUrl]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASE = (process.argv[2] || "https://zeonebet.com").replace(/\/$/, "");

function readFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function getSitemapPathsFromSource() {
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
      else if (slug !== "compare" || block.includes("indexable: true")) paths.add(`/${slug}`);
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

function parseH1s(html) {
  const h1Re = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  const h1s = [];
  let m;
  while ((m = h1Re.exec(html))) {
    const text = m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text) h1s.push(text);
  }
  return h1s;
}

function verdict(count) {
  if (count === 1) return "H1_OK";
  if (count === 0) return "H1_MISSING";
  return "H1_MULTIPLE";
}

async function auditPath(urlPath) {
  const url = `${BASE}${urlPath === "/" ? "" : urlPath}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "CasinoPulse-SEO-Audit/1.0" } });
    const html = await res.text();
    const h1s = parseH1s(html);
    return {
      url,
      path: urlPath,
      httpStatus: res.status,
      h1Count: h1s.length,
      h1Text: h1s[0] || "",
      allH1: h1s,
      verdict: verdict(h1s.length),
    };
  } catch (err) {
    return { url, path: urlPath, error: String(err), h1Count: 0, h1Text: "", verdict: "H1_MISSING" };
  }
}

async function main() {
  const paths = getSitemapPathsFromSource();
  const results = [];
  for (const p of paths) {
    const row = await auditPath(p);
    results.push(row);
    process.stderr.write(`${p} -> ${row.verdict}\n`);
  }

  const summary = {
    baseUrl: BASE,
    auditedAt: new Date().toISOString(),
    totalUrls: results.length,
    missing: results.filter((r) => r.verdict === "H1_MISSING").length,
    multiple: results.filter((r) => r.verdict === "H1_MULTIPLE").length,
    results,
  };

  process.stdout.write(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
