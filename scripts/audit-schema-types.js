#!/usr/bin/env node
/**
 * Schema type audit for indexable CasinoPulse URLs.
 * Usage: node scripts/audit-schema-types.js [baseUrl]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASE = (process.argv[2] || "https://casinopuls.site").replace(/\/$/, "");

function readFile(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

async function fetchSitemapPaths() {
  const res = await fetch(`${BASE}/sitemap.xml`, {
    headers: { "User-Agent": "CasinoPulse-Schema-Audit/1.0" },
  });
  const text = await res.text();
  const paths = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(text))) {
    const loc = m[1].trim();
    paths.push(loc.startsWith(BASE) ? loc.slice(BASE.length) || "/" : loc);
  }
  return paths;
}

function parseSchemas(html) {
  const types = new Set();
  const errors = [];
  const jsonLdRe = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let block;
  while ((block = jsonLdRe.exec(html))) {
    try {
      const data = JSON.parse(block[1]);
      const items = Array.isArray(data) ? data : data["@graph"] ? data["@graph"] : [data];
      for (const item of items) {
        if (!item || !item["@type"]) continue;
        const t = item["@type"];
        if (Array.isArray(t)) t.forEach((x) => types.add(x));
        else types.add(t);
        if (item["@type"] === "BreadcrumbList" && !item.itemListElement?.length) {
          errors.push("BreadcrumbList missing itemListElement");
        }
      }
    } catch (e) {
      errors.push(`JSON-LD parse error: ${e.message}`);
    }
  }
  return { types: [...types], errors };
}

async function auditPath(pathname) {
  const url = `${BASE}${pathname === "/" ? "" : pathname}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "CasinoPulse-Schema-Audit/1.0" },
    });
    if (!res.ok) {
      return {
        url: pathname,
        schemaTypes: [],
        hasBreadcrumbList: "no",
        hasReview: "no",
        hasFAQPage: "no",
        errors: [`HTTP ${res.status}`],
      };
    }
    const html = await res.text();
    const { types, errors } = parseSchemas(html);
    return {
      url: pathname,
      schemaTypes: types,
      hasBreadcrumbList: types.includes("BreadcrumbList") ? "yes" : "no",
      hasReview: types.includes("Review") ? "yes" : "no",
      hasFAQPage: types.includes("FAQPage") ? "yes" : "no",
      errors,
    };
  } catch (err) {
    return {
      url: pathname,
      schemaTypes: [],
      hasBreadcrumbList: "no",
      hasReview: "no",
      hasFAQPage: "no",
      errors: [String(err)],
    };
  }
}

async function main() {
  const sitemapPaths = await fetchSitemapPaths();
  const extra = ["/go/22bet"];
  const paths = [...new Set([...sitemapPaths, ...extra])].sort();

  const results = [];
  for (const p of paths) {
    const row = await auditPath(p);
    results.push(row);
    process.stderr.write(`${p}: Breadcrumb=${row.hasBreadcrumbList} Review=${row.hasReview}\n`);
  }

  const withBreadcrumb = results.filter((r) => r.hasBreadcrumbList === "yes").length;
  const output = {
    baseUrl: BASE,
    auditedAt: new Date().toISOString(),
    totalUrls: results.length,
    breadcrumbCoverage: `${withBreadcrumb}/${results.length}`,
    results,
  };

  process.stdout.write(JSON.stringify(output, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
