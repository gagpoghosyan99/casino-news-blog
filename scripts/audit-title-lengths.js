#!/usr/bin/env node
/**
 * Audit title tag lengths for indexable routes.
 * Usage: node scripts/audit-title-lengths.js [baseUrl]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASE = (process.argv[2] || "https://zeonebet.com").replace(/\/$/, "");
const BRAND = "CasinoPulse";
const HARD_MAX = 65;
const TARGET_MIN = 45;
const TARGET_MAX = 60;

function readFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function formatTitle(title) {
  if (title.includes(BRAND)) return title;
  return `${title} | ${BRAND}`;
}

function extractBlogTitles() {
  const src = readFile("src/data/blogs.ts");
  const posts = [];
  const slugRe = /slug:\s*["']([^"']+)["']/g;
  const titleRe = /title:\s*\{\s*en:\s*["']([^"']+)["']/g;
  let slug;
  const slugs = [];
  while ((slug = slugRe.exec(src))) slugs.push(slug[1]);
  let t;
  const titles = [];
  while ((t = titleRe.exec(src))) titles.push(t[1]);
  for (let i = 0; i < slugs.length; i++) {
    const indexable = !src.includes(`slug: "${slugs[i]}"`) || true;
    posts.push({
      path: `/blogs/${slugs[i]}`,
      titleInput: titles[i] || slugs[i],
      indexable: !src.match(new RegExp(`slug:\\s*["']${slugs[i]}["'][\\s\\S]*?indexable:\\s*false`)),
    });
  }
  return posts;
}

function extractStaticTitles() {
  return [
    { path: "/", titleInput: "Casino Reviews & Payment Guides" },
    { path: "/casinos", titleInput: "Top 40 Casino Reviews for India" },
    { path: "/blogs", titleInput: "Casino Reviews & Expert Guides" },
    { path: "/news", titleInput: "Online Casino News India" },
    { path: "/compare", titleInput: "Compare Online Casinos 2026" },
    { path: "/how-we-review", titleInput: "How We Review Online Casinos" },
    { path: "/about", titleInput: "About CasinoPulse" },
    { path: "/blacklist", titleInput: "Casino Blacklist: Risk Assessments" },
    { path: "/contact", titleInput: "Contact Us" },
    { path: "/author/casinopulse-editorial-team", titleInput: "CasinoPulse Editorial Team" },
  ];
}

function extractProgrammaticTitles() {
  const paths = [];
  for (const file of ["src/data/programmatic/hub-pages.ts", "src/data/programmatic/payment-pages.ts", "src/data/programmatic/crypto-pages.ts"]) {
    const src = readFile(file);
    const blocks = src.split(/\{\s*slug:/).slice(1);
    for (const block of blocks) {
      const slug = block.match(/["']([^"']+)["']/)?.[1];
      const title = block.match(/title:\s*["']([^"']+)["']/)?.[1];
      const indexable = !block.includes("indexable: false");
      if (!slug || !title) continue;
      const routePath = file.includes("payment-pages")
        ? `/payment/${slug}`
        : file.includes("crypto-pages")
          ? `/crypto/${slug}`
          : `/${slug}`;
      paths.push({ path: routePath, titleInput: title, indexable });
    }
  }
  return paths;
}

function verdictFor(length) {
  if (length > HARD_MAX) return "TITLE_TOO_LONG";
  if (length >= TARGET_MIN && length <= TARGET_MAX) return "TITLE_OK";
  if (length < TARGET_MIN) return "TITLE_SHORT_OK";
  return "TITLE_SLIGHTLY_LONG";
}

async function fetchLiveTitle(urlPath) {
  try {
    const res = await fetch(`${BASE}${urlPath === "/" ? "" : urlPath}`, {
      headers: { "User-Agent": "CasinoPulse-SEO-Audit/1.0" },
    });
    const html = await res.text();
    const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    return m ? m[1].trim() : null;
  } catch {
    return null;
  }
}

async function main() {
  const entries = [
    ...extractStaticTitles(),
    ...extractProgrammaticTitles(),
    ...extractBlogTitles().filter((p) => p.indexable !== false),
  ];

  const results = [];
  for (const entry of entries) {
    const expectedTitle = formatTitle(entry.titleInput);
    const liveTitle = await fetchLiveTitle(entry.path);
    const title = liveTitle || expectedTitle;
    const length = title.length;
    results.push({
      url: `${BASE}${entry.path === "/" ? "" : entry.path}`,
      path: entry.path,
      title,
      titleLength: length,
      verdict: verdictFor(length),
    });
    process.stderr.write(`title ${entry.path} -> ${length}\n`);
  }

  const summary = {
    baseUrl: BASE,
    auditedAt: new Date().toISOString(),
    hardMax: HARD_MAX,
    targetRange: `${TARGET_MIN}-${TARGET_MAX}`,
    tooLong: results.filter((r) => r.verdict === "TITLE_TOO_LONG").length,
    results,
  };

  process.stdout.write(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
