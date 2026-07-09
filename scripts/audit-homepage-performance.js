#!/usr/bin/env node
/**
 * Homepage performance and JS bundle audit (local build artifacts).
 * Usage: node scripts/audit-homepage-performance.js [baseUrl]
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const BASE = (process.argv[2] || "https://zeonebet.com").replace(/\/$/, "");
const OUT_DIR = path.join(ROOT, "docs/audits/p5-authority-entity-geo-performance");
const OUT_FILE = path.join(OUT_DIR, "performance-audit.md");

function listJsFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listJsFiles(full, acc);
    else if (entry.name.endsWith(".js")) acc.push(full);
  }
  return acc;
}

function formatBytes(n) {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(2)} MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${n} B`;
}

async function fetchHomepageStats() {
  const res = await fetch(`${BASE}/`, {
    headers: { "User-Agent": "CasinoPulse-Perf-Audit/1.0" },
  });
  const html = await res.text();
  const scriptSrcs = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]);
  const inlineScripts = (html.match(/<script(?![^>]*src=)/gi) || []).length;
  const stylesheets = (html.match(/<link[^>]+rel=["']stylesheet["']/gi) || []).length;
  const inlineStyles = (html.match(/<style/gi) || []).length;
  const images = (html.match(/<img/gi) || []).length;
  const hasGtag = html.includes("googletagmanager.com/gtag") || html.includes("G-D9E947T20R");
  const clientMarkers = [
    html.includes('__NEXT_DATA__') ? "Next.js hydration payload present" : null,
    html.includes("use client") ? "use client in HTML unlikely" : null,
  ].filter(Boolean);

  return {
    status: res.status,
    htmlBytes: Buffer.byteLength(html, "utf8"),
    scriptSrcs,
    inlineScripts,
    stylesheets,
    inlineStyles,
    images,
    hasGtag,
    clientMarkers,
  };
}

function analyzeBuild() {
  const nextDir = path.join(ROOT, ".next");
  const staticDir = path.join(nextDir, "static");
  let nextSize = "N/A";
  let largestJs = [];

  if (fs.existsSync(nextDir)) {
    try {
      nextSize = execSync(`du -sh "${nextDir}"`, { encoding: "utf8" }).trim().split("\t")[0];
    } catch {
      /* ignore */
    }
  }

  if (fs.existsSync(staticDir)) {
    largestJs = listJsFiles(staticDir)
      .map((f) => ({ file: path.relative(ROOT, f), size: fs.statSync(f).size }))
      .sort((a, b) => b.size - a.size)
      .slice(0, 20);
  }

  const clientComponents = [];
  try {
    const rg = execSync(
      'grep -rl "use client" src/components src/app 2>/dev/null | head -40',
      { cwd: ROOT, encoding: "utf8" }
    ).trim();
    if (rg) clientComponents.push(...rg.split("\n").filter(Boolean));
  } catch {
    /* ignore */
  }

  return { nextSize, largestJs, clientComponentCount: clientComponents.length, clientComponents };
}

function buildReport(live, build) {
  const lines = [
    "# CasinoPulse Homepage Performance Audit",
    "",
    `Audited: ${new Date().toISOString()}`,
    `Base URL: ${BASE}`,
    "",
    "## Live homepage",
    "",
    `- HTTP status: ${live.status}`,
    `- HTML size: ${formatBytes(live.htmlBytes)}`,
    `- External script tags: ${live.scriptSrcs.length}`,
    `- Inline script blocks: ${live.inlineScripts}`,
    `- Stylesheets: ${live.stylesheets}`,
    `- Inline style blocks: ${live.inlineStyles}`,
    `- Image tags in HTML: ${live.images}`,
    `- Google Analytics (gtag): ${live.hasGtag ? "yes (afterInteractive)" : "not detected"}`,
    "",
    "### Script sources",
    ...live.scriptSrcs.map((s) => `- ${s}`),
    "",
    "## Build artifacts",
    "",
    `- .next total size: ${build.nextSize}`,
    `- Client component files (sample): ${build.clientComponentCount}`,
    "",
    "### Largest JS chunks (top 20)",
    "",
    "| File | Size |",
    "|------|------|",
    ...build.largestJs.map((j) => `| ${j.file} | ${formatBytes(j.size)} |`),
    "",
    "## Client component hotspots",
    "",
    ...build.clientComponents.slice(0, 15).map((f) => `- \`${f}\``),
    build.clientComponents.length > 15 ? `- ... and ${build.clientComponents.length - 15} more` : "",
    "",
    "## JavaScript error findings",
    "",
    "Headless console reproduction was not run in this audit pass. Observations:",
    "",
    "- Homepage uses multiple client components (locale, cookie consent, interactive widgets).",
    "- Google Analytics loads via `next/script` with `afterInteractive` — acceptable for measurement.",
    "- No risky bundle surgery performed in P5; focus was audit and documentation.",
    "",
    "## Recommendations (non-breaking)",
    "",
    "1. Lazy-load below-the-fold homepage widgets (JackpotWinnersFeed, BonusTracker) if LCP regresses.",
    "2. Audit `use client` on LegalPage — required for locale but adds hydration on trust pages.",
    "3. Preconnect to `googletagmanager.com` only if analytics is mandatory.",
    "4. Ensure hero images use explicit width/height and modern formats where added.",
    "5. Re-run Lighthouse after deploy for Core Web Vitals baseline.",
    "",
    "## Third-party scripts",
    "",
    "- Google Tag Manager / gtag (`G-D9E947T20R`) — loaded afterInteractive in root layout.",
    "",
  ];
  return lines.filter(Boolean).join("\n");
}

async function main() {
  const live = await fetchHomepageStats();
  const build = analyzeBuild();
  const report = buildReport(live, build);
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, report);
  process.stdout.write(report);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
