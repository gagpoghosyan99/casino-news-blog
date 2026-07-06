#!/usr/bin/env node
/**
 * Audit /go/* affiliate links in source — classification for Semrush nofollow triage.
 * Usage: node scripts/audit-affiliate-go-links.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full, files);
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function relPath(abs) {
  return path.relative(ROOT, abs).replace(/\\/g, "/");
}

function classify(sourceFile, relValue, context) {
  const rel = relValue || "(missing)";
  const file = relPath(sourceFile);

  if (file.includes("Footer.tsx")) {
    return { verdict: "GO_LINK_IN_FOOTER", contextType: "footer" };
  }
  if (file.includes("Header.tsx") || file.includes("HeaderGuidesDropdown")) {
    return { verdict: "GO_LINK_IN_NAV", contextType: "nav" };
  }
  if (/schema|json-ld|sitemap/i.test(file)) {
    return { verdict: "GO_LINK_IN_SCHEMA", contextType: "schema" };
  }
  if (context.includes("breadcrumb") || context.includes("Breadcrumb")) {
    return { verdict: "GO_LINK_IN_SCHEMA", contextType: "breadcrumb" };
  }
  if (context.includes("ItemList") || context.includes("itemListSchema")) {
    return { verdict: "GO_LINK_IN_SCHEMA", contextType: "itemlist" };
  }
  if (context.includes("relatedLinks") && !context.includes("btn-")) {
    return { verdict: "GO_LINK_IN_EDITORIAL_CONTEXT", contextType: "related" };
  }
  if (
    context.includes("btn-primary") ||
    context.includes("btn-premium") ||
    context.includes("playNow") ||
    context.includes("topPromotions") ||
    context.includes("BonusTracker") ||
    context.includes("JackpotWinners") ||
    context.includes("TopCasinosWidget") ||
    context.includes("CasinoCard") ||
    context.includes("NewsSidebar") ||
    context.includes("Ready to explore") ||
    context.includes("exclusiveOffers")
  ) {
    if (!rel.includes("nofollow") || !rel.includes("sponsored")) {
      return { verdict: "MISSING_SPONSORED_NOFOLLOW", contextType: "CTA" };
    }
    return { verdict: "AFFILIATE_CTA_OK", contextType: "CTA" };
  }
  if (file.includes("BlogContent.tsx")) {
    if (!rel.includes("nofollow") || !rel.includes("sponsored")) {
      return { verdict: "MISSING_SPONSORED_NOFOLLOW", contextType: "review-CTA" };
    }
    return { verdict: "AFFILIATE_CTA_OK", contextType: "review-CTA" };
  }
  if (!rel.includes("nofollow") || !rel.includes("sponsored")) {
    return { verdict: "MISSING_SPONSORED_NOFOLLOW", contextType: "unknown" };
  }
  return { verdict: "AFFILIATE_CTA_OK", contextType: "widget" };
}

function extractGoLinks() {
  const files = walk(SRC);
  const results = [];
  const seen = new Set();

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    if (!content.includes("/go/")) continue;

    const patterns = [
      /href=\{`(\/go\/\$\{[^}]+\})`\}/g,
      /href=\{\s*`(\/go\/\$\{[^}]+\})`\s*\}/g,
      /href=["'](\/go\/[^"'#?]+)["']/g,
      /href=\{["'](\/go\/[^"'#?]+)["']\}/g,
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(content))) {
        const goLink = match[1];
        const idx = match.index;
        const line = content.slice(0, idx).split("\n").length;
        const context = content.slice(Math.max(0, idx - 500), Math.min(content.length, idx + 500));
        const relMatch = context.match(
          /rel=\{?(AFFILIATE_LINK_REL|"nofollow sponsored"|'nofollow sponsored'|\{AFFILIATE_LINK_REL\})\}?/
        );
        const relValue = relMatch
          ? relMatch[1] === "AFFILIATE_LINK_REL" || relMatch[1] === "{AFFILIATE_LINK_REL}"
            ? "nofollow sponsored"
            : relMatch[1].replace(/['"]/g, "")
          : "(missing)";
        const key = `${relPath(file)}:${line}:${goLink}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const { verdict, contextType } = classify(file, relValue, context);
        results.push({
          sourcePage: relPath(file),
          line,
          goLink,
          rel: relValue,
          contextType,
          verdict,
        });
      }
    }
  }

  return results.sort((a, b) => a.sourcePage.localeCompare(b.sourcePage) || a.line - b.line);
}

function main() {
  const results = extractGoLinks();
  const summary = {
    auditedAt: new Date().toISOString(),
    totalLinks: results.length,
    verdictCounts: results.reduce((acc, r) => {
      acc[r.verdict] = (acc[r.verdict] || 0) + 1;
      return acc;
    }, {}),
    results,
  };
  process.stdout.write(JSON.stringify(summary, null, 2));
}

main();
