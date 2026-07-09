#!/usr/bin/env node
/**
 * Live URL indexability audit for CasinoPulse production.
 * Usage: node scripts/audit-live-url-indexability.js [baseUrl]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASE = (process.argv[2] || "https://zeonebet.com").replace(/\/$/, "");

const VERDICTS = [
  "INDEXABLE_OK",
  "NOINDEX_EXPECTED",
  "REDIRECT_EXPECTED",
  "BROKEN_404",
  "CANONICAL_MISMATCH",
  "ORPHAN_INDEXABLE",
  "SITEMAP_MISSING",
  "ROBOTS_CONFLICT",
  "LOW_VALUE_INDEXABLE",
];

function readFile(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function extractBlogSlugs() {
  const blogsTs = readFile("src/data/blogs.ts");
  const slugs = new Set();
  const slugRe = /slug:\s*["']([^"']+)["']/g;
  let m;
  while ((m = slugRe.exec(blogsTs))) slugs.add(m[1]);
  const pillarTs = readFile("src/data/pillar-reviews.ts");
  while ((m = slugRe.exec(pillarTs))) slugs.add(m[1]);
  return [...slugs].map((s) => `/blogs/${s}`);
}

function extractNewsIds() {
  const newsTs = readFile("src/data/news.ts");
  const ids = [];
  const idRe = /id:\s*["']([^"']+)["']/g;
  let m;
  while ((m = idRe.exec(newsTs))) ids.push(m[1]);
  return ids.map((id) => `/news/${id}`);
}

function extractRegistryPaths() {
  const paths = new Set(["/", "/blogs", "/casinos", "/news", "/compare", "/contact", "/cookies", "/privacy", "/terms", "/about", "/blacklist"]);
  const hubTs = readFile("src/data/programmatic/hub-pages.ts");
  const paymentTs = readFile("src/data/programmatic/payment-pages.ts");
  const cryptoTs = readFile("src/data/programmatic/crypto-pages.ts");
  const slugRe = /slug:\s*["']([^"']+)["']/g;
  for (const src of [hubTs, paymentTs, cryptoTs]) {
    let m;
    while ((m = slugRe.exec(src))) {
      const slug = m[1];
      if (src.includes("payment-pages")) paths.add(`/payment/${slug}`);
      else if (src.includes("crypto-pages")) paths.add(`/crypto/${slug}`);
      else paths.add(`/${slug}`);
    }
  }
  return [...paths];
}

async function fetchText(url, redirect = "follow") {
  const res = await fetch(url, { redirect, headers: { "User-Agent": "CasinoPulse-SEO-Audit/1.0" } });
  const text = await res.text().catch(() => "");
  return { res, text };
}

async function fetchSitemapUrls() {
  const { res, text } = await fetchText(`${BASE}/sitemap.xml`);
  if (!res.ok) return [];
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(text))) {
    const loc = m[1].trim();
    urls.push(loc.startsWith(BASE) ? loc.slice(BASE.length) || "/" : loc);
  }
  return urls;
}

function extractInternalLinks(html) {
  const links = new Set();
  const re = /href=["'](\/[^"'#?]*)/g;
  let m;
  while ((m = re.exec(html))) links.add(m[1].replace(/\/$/, "") || "/");
  return links;
}

function parseMeta(html) {
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i);
  const schemaTypes = [];
  const jsonLdRe = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let block;
  while ((block = jsonLdRe.exec(html))) {
    try {
      const data = JSON.parse(block[1]);
      const graphs = Array.isArray(data) ? data : data["@graph"] ? data["@graph"] : [data];
      for (const item of graphs) {
        if (item && item["@type"]) {
          const t = item["@type"];
          if (Array.isArray(t)) schemaTypes.push(...t);
          else schemaTypes.push(t);
        }
      }
    } catch {
      /* ignore malformed JSON-LD */
    }
  }
  const bodyText = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = bodyText ? bodyText.split(" ").filter(Boolean).length : 0;
  return {
    canonical: canonicalMatch ? canonicalMatch[1] : null,
    robotsMeta: robotsMatch ? robotsMatch[1].toLowerCase() : null,
    schemaTypes: [...new Set(schemaTypes)],
    wordCount,
  };
}

function normalizePath(p) {
  if (!p) return "/";
  try {
    if (p.startsWith("http")) {
      const u = new URL(p);
      return u.pathname.replace(/\/$/, "") || "/";
    }
  } catch {
    /* keep as-is */
  }
  return p.split("?")[0].replace(/\/$/, "") || "/";
}

function classifyVerdict(ctx) {
  const {
    path,
    status,
    canonical,
    robotsMeta,
    xRobots,
    inSitemap,
    linkedFromAny,
    isGo,
    isQuery,
  } = ctx;

  if (isGo || path.startsWith("/go/")) {
    if (status >= 300 && status < 400) return "REDIRECT_EXPECTED";
    return "NOINDEX_EXPECTED";
  }
  if (status === 404) return "BROKEN_404";
  if (status >= 300 && status < 400) return "REDIRECT_EXPECTED";
  if (isQuery) return "CANONICAL_MISMATCH";
  const robotsCombined = [robotsMeta, xRobots].filter(Boolean).join(",");
  if (robotsCombined.includes("noindex")) {
    if (inSitemap) return "ROBOTS_CONFLICT";
    return "NOINDEX_EXPECTED";
  }
  const expectedCanonical = `${BASE}${path === "/" ? "" : path}`;
  const canonNorm = canonical ? canonical.replace(/\/$/, "") : null;
  const expectedNorm = expectedCanonical.replace(/\/$/, "");
  if (canonNorm && canonNorm !== expectedNorm && !path.includes("?")) {
    return "CANONICAL_MISMATCH";
  }
  if (status === 200 && !inSitemap && linkedFromAny && path.startsWith("/blogs/")) {
    return "SITEMAP_MISSING";
  }
  if (status === 200 && !linkedFromAny && inSitemap && !path.startsWith("/api")) {
    return "ORPHAN_INDEXABLE";
  }
  if (status === 200 && ctx.wordCount < 200 && path.startsWith("/news/")) {
    return "LOW_VALUE_INDEXABLE";
  }
  if (status === 200) return "INDEXABLE_OK";
  return "BROKEN_404";
}

async function auditUrl(path, linkSources, sitemapSet) {
  const fullUrl = `${BASE}${path === "/" ? "" : path}`;
  const isGo = path.startsWith("/go/");
  const isQuery = path.includes("?");

  let status = 0;
  let xRobots = null;
  let html = "";
  let finalPath = path;

  try {
    const res = await fetch(fullUrl, {
      redirect: isGo ? "manual" : "follow",
      headers: { "User-Agent": "CasinoPulse-SEO-Audit/1.0" },
    });
    status = res.status;
    xRobots = res.headers.get("x-robots-tag");
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (loc) finalPath = normalizePath(loc);
    } else if (res.ok) {
      html = await res.text();
    }
  } catch (err) {
    return {
      url: path,
      httpStatus: 0,
      error: String(err),
      verdict: "BROKEN_404",
    };
  }

  const meta = html ? parseMeta(html) : { canonical: null, robotsMeta: null, schemaTypes: [], wordCount: 0 };
  const inSitemap = sitemapSet.has(path) || sitemapSet.has(path.replace(/\/$/, "") || "/");
  const linkedFromAny =
    linkSources.homepage.has(path) ||
    linkSources.blogs.has(path) ||
    linkSources.casinos.has(path) ||
    linkSources.footer.has(path) ||
    linkSources.nav.has(path);

  const verdict = classifyVerdict({
    path,
    status,
    canonical: meta.canonical,
    robotsMeta: meta.robotsMeta,
    xRobots,
    inSitemap,
    linkedFromAny,
    isGo,
    isQuery,
    wordCount: meta.wordCount,
  });

  return {
    url: path,
    httpStatus: status,
    canonical: meta.canonical,
    robotsMeta: meta.robotsMeta,
    xRobotsTag: xRobots,
    inSitemap: inSitemap ? "yes" : "no",
    linkedFromHomepage: linkSources.homepage.has(path) ? "yes" : "no",
    linkedFromBlogs: linkSources.blogs.has(path) ? "yes" : "no",
    linkedFromCasinos: linkSources.casinos.has(path) ? "yes" : "no",
    schemaTypes: meta.schemaTypes,
    wordCountEstimate: meta.wordCount,
    verdict,
    finalPath: finalPath !== path ? finalPath : undefined,
  };
}

async function main() {
  const [sitemapPaths, homeRes, blogsRes, casinosRes] = await Promise.all([
    fetchSitemapUrls(),
    fetchText(`${BASE}/`),
    fetchText(`${BASE}/blogs`),
    fetchText(`${BASE}/casinos`),
  ]);

  const sitemapSet = new Set(sitemapPaths.map(normalizePath));
  const homepageLinks = extractInternalLinks(homeRes.text);
  const blogsLinks = extractInternalLinks(blogsRes.text);
  const casinosLinks = extractInternalLinks(casinosRes.text);

  const footerSrc = readFile("src/components/Footer.tsx");
  const headerSrc = readFile("src/components/Header.tsx");
  const footerLinks = new Set();
  const navLinks = new Set();
  const footerRe = /href=["'](\/[^"'#?]*)/g;
  let fm;
  while ((fm = footerRe.exec(footerSrc))) footerLinks.add(normalizePath(fm[1]));
  while ((fm = footerRe.exec(headerSrc))) navLinks.add(normalizePath(fm[1]));

  const dataPaths = [
    ...extractBlogSlugs(),
    ...extractNewsIds(),
    ...extractRegistryPaths(),
  ].map(normalizePath);

  const allPaths = new Set([
    ...sitemapPaths.map(normalizePath),
    ...homepageLinks,
    ...blogsLinks,
    ...casinosLinks,
    ...footerLinks,
    ...navLinks,
    ...dataPaths,
    "/go/22bet",
    "/go/7bit-casino",
    "/go/betus",
    "/go/betwinner",
    "/go/bitcasino",
    "/blogs/review-pokerstars",
    "/blogs/review-mostbet",
    "/contact?casino=stake&referral=pending",
  ]);

  const linkSources = {
    homepage: homepageLinks,
    blogs: blogsLinks,
    casinos: casinosLinks,
    footer: footerLinks,
    nav: navLinks,
  };

  const results = [];
  const sorted = [...allPaths].sort();
  for (const p of sorted) {
    const row = await auditUrl(p, linkSources, sitemapSet);
    results.push(row);
    process.stderr.write(`audited ${p} -> ${row.verdict}\n`);
  }

  const summary = {
    baseUrl: BASE,
    auditedAt: new Date().toISOString(),
    totalUrls: results.length,
    sitemapCount: sitemapPaths.length,
    verdictCounts: VERDICTS.reduce((acc, v) => {
      acc[v] = results.filter((r) => r.verdict === v).length;
      return acc;
    }, {}),
    results,
  };

  process.stdout.write(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
