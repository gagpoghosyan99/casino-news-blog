#!/usr/bin/env node
/**
 * Internal linking matrix for pillar reviews (live HTML + source fallback).
 * Usage: node scripts/audit-internal-linking-matrix.js [baseUrl]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASE = (process.argv[2] || "https://zeonebet.com").replace(/\/$/, "");

const REQUIREMENTS = {
  reviewLinks: {
    min: 5,
    count: (text) => uniqueMatches(text, /\/blogs\/(?:review-|avoid-)[a-z0-9-]+/g),
    label: "related review links",
  },
  paymentCryptoLinks: {
    min: 3,
    count: (text) => uniqueMatches(text, /\/(?:payment|crypto)\/[a-z0-9-]+/g),
    label: "payment/crypto guide links",
  },
  countryHubLinks: {
    min: 2,
    count: (text) => uniqueMatches(text, /\/(?:india|bangladesh|pakistan)-casino-payments/g),
    label: "country hub links",
  },
  compareLink: {
    min: 1,
    count: (text) => uniqueMatches(text, /\/compare/g),
    label: "compare link",
  },
  methodologyLink: {
    min: 1,
    count: (text) => uniqueMatches(text, /\/how-we-review/g),
    label: "methodology link",
  },
  responsibleGamblingLink: {
    min: 1,
    count: (text) => uniqueMatches(text, /\/responsible-gambling/g),
    label: "responsible gambling link",
  },
};

function uniqueMatches(text, pattern) {
  const matches = text.match(pattern);
  return matches ? new Set(matches).size : 0;
}

function readFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function extractPillarSlugs() {
  const files = ["src/data/pillar-reviews.ts", "src/data/pillar-reviews-p4-profiles.ts"];
  const slugs = [];
  for (const file of files) {
    const src = readFile(file);
    const re = /slug:\s*["']([^"']+)["']/g;
    let m;
    while ((m = re.exec(src))) slugs.push(m[1]);
  }
  return [...new Set(slugs)];
}

function extractLinks(html) {
  const links = new Set();
  const re = /href=["'](\/[^"'#?]+)["']/g;
  let m;
  while ((m = re.exec(html))) links.add(m[1]);
  return [...links].join(" ");
}

function countInText(text, req) {
  return req.count(text);
}

async function auditSlug(slug) {
  const url = `${BASE}/blogs/${slug}`;
  let html = "";
  try {
    const res = await fetch(url, { headers: { "User-Agent": "CasinoPulse-Link-Matrix/1.0" } });
    html = res.ok ? await res.text() : "";
  } catch {
    html = "";
  }
  const linkText = extractLinks(html);
  const checks = {};
  const failures = [];

  for (const [key, req] of Object.entries(REQUIREMENTS)) {
    const count = countInText(linkText, req);
    const pass = count >= req.min;
    checks[key] = { required: req.min, found: count, pass };
    if (!pass) failures.push(`needs ${req.min - count} more ${req.label}`);
  }

  return {
    slug,
    path: `/blogs/${slug}`,
    url,
    pass: failures.length === 0,
    checks,
    failures,
  };
}

async function main() {
  const slugs = extractPillarSlugs();
  const results = [];
  for (const slug of slugs) {
    const row = await auditSlug(slug);
    results.push(row);
    process.stderr.write(`${slug} -> ${row.pass ? "PASS" : "FAIL"}\n`);
  }

  const summary = {
    baseUrl: BASE,
    auditedAt: new Date().toISOString(),
    pillarCount: slugs.length,
    passCount: results.filter((r) => r.pass).length,
    failCount: results.filter((r) => !r.pass).length,
    requirements: Object.fromEntries(
      Object.entries(REQUIREMENTS).map(([k, v]) => [k, { min: v.min, label: v.label }])
    ),
    results,
  };
  process.stdout.write(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
