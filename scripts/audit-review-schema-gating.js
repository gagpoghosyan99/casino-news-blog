#!/usr/bin/env node
/**
 * Review schema gating validation against live HTML + pillar registry.
 * Usage: node scripts/audit-review-schema-gating.js [baseUrl]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASE = (process.argv[2] || "https://casinopuls.site").replace(/\/$/, "");

function readFile(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function extractPillarSlugs() {
  const files = ["src/data/pillar-reviews.ts", "src/data/pillar-reviews-p4-profiles.ts", "src/data/pillar-reviews-p6-profiles.ts"];
  const slugs = [];
  for (const file of files) {
    const src = readFile(file);
    const re = /slug:\s*["']([^"']+)["']/g;
    let m;
    while ((m = re.exec(src))) slugs.push(m[1]);
  }
  return [...new Set(slugs)];
}

function extractAllBlogSlugs() {
  const src = readFile("src/data/blogs.ts");
  const slugs = [];
  const re = /slug:\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(src))) slugs.push(m[1]);
  return [...new Set(slugs)];
}

function hasReviewSchema(html) {
  const jsonLdRe = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let block;
  while ((block = jsonLdRe.exec(html))) {
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

async function fetchBlogReviewStatus(slug) {
  const url = `${BASE}/blogs/${slug}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "CasinoPulse-Review-Gating-Audit/1.0" },
  });
  if (!res.ok) return { slug, status: res.status, hasReview: false };
  const html = await res.text();
  return { slug, status: res.status, hasReview: hasReviewSchema(html) };
}

async function main() {
  const pillarSlugs = extractPillarSlugs();
  const allSlugs = extractAllBlogSlugs();
  const reviewCategories = new Set();
  const blogsTs = readFile("src/data/blogs.ts");
  const casinoRe = /category:\s*["'](good-casino|bad-casino|ranking-casino)["'][\s\S]*?slug:\s*["']([^"']+)["']/g;
  let m;
  while ((m = casinoRe.exec(blogsTs))) reviewCategories.add(m[2]);

  const thinSlugs = allSlugs.filter(
    (s) => reviewCategories.has(s) && !pillarSlugs.includes(s)
  );

  const pillarResults = await Promise.all(pillarSlugs.map(fetchBlogReviewStatus));
  const thinResults = await Promise.all(thinSlugs.map(fetchBlogReviewStatus));

  const pillarWithReview = pillarResults.filter((r) => r.hasReview);
  const thinWithoutReview = thinResults.filter((r) => !r.hasReview);
  const unexpectedReview = thinResults.filter((r) => r.hasReview);
  const missingReviewOnPillar = pillarResults.filter((r) => !r.hasReview && r.status === 200);

  const output = {
    baseUrl: BASE,
    auditedAt: new Date().toISOString(),
    expectedPillarCount: pillarSlugs.length,
    pillarPagesWithReviewSchema: pillarWithReview.map((r) => r.slug),
    thinPagesWithoutReviewSchema: thinWithoutReview.map((r) => r.slug),
    unexpectedReviewSchema: unexpectedReview.map((r) => r.slug),
    missingReviewSchemaOnPillar: missingReviewOnPillar.map((r) => r.slug),
    summary: {
      pillarWithReview: pillarWithReview.length,
      thinWithoutReview: thinWithoutReview.length,
      unexpectedReview: unexpectedReview.length,
      missingOnPillar: missingReviewOnPillar.length,
    },
  };

  process.stdout.write(JSON.stringify(output, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
