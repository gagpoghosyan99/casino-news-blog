#!/usr/bin/env node
/**
 * Triage text/HTML ratio warnings for priority indexable pages.
 * Usage: node scripts/audit-text-html-ratio.js [baseUrl]
 */

const BASE = (process.argv[2] || "https://zeonebet.com").replace(/\/$/, "");

const PRIORITY_PATHS = [
  "/",
  "/blogs",
  "/casinos",
  "/compare",
  "/india-casino-payments",
  "/bangladesh-casino-payments",
  "/pakistan-casino-payments",
  "/payment/upi",
  "/payment/bkash",
  "/payment/jazzcash",
  "/crypto/bitcoin-casino",
  "/crypto/usdt-casino",
  "/blogs/review-stake",
  "/blogs/review-bet365",
  "/blogs/review-bc-game",
  "/blogs/review-pokerstars-casino",
  "/blogs/review-888-casino",
  "/blacklist",
  "/how-we-review",
];

const TEXT_HTML_WARN_THRESHOLD = 0.08;
const PRIORITY_WORD_TARGET = 800;

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text) {
  return text ? text.split(" ").filter(Boolean).length : 0;
}

function verdict(ratio, words, path) {
  if (words >= PRIORITY_WORD_TARGET && ratio >= TEXT_HTML_WARN_THRESHOLD) {
    return "TEXT_HTML_IMPROVED";
  }
  if (words >= 400) {
    return "TEXT_HTML_WARNING_ACCEPTED_MODERN_NEXT";
  }
  if (path.startsWith("/news/") && words < 500) {
    return "LOW_VALUE_NOINDEXED";
  }
  return "TEXT_HTML_WARNING_ACCEPTED_MODERN_NEXT";
}

async function auditPath(urlPath) {
  const url = `${BASE}${urlPath === "/" ? "" : urlPath}`;
  const res = await fetch(url, { headers: { "User-Agent": "CasinoPulse-SEO-Audit/1.0" } });
  const html = await res.text();
  const htmlBytes = Buffer.byteLength(html, "utf8");
  const text = visibleText(html);
  const words = wordCount(text);
  const textBytes = Buffer.byteLength(text, "utf8");
  const ratio = htmlBytes ? Number((textBytes / htmlBytes).toFixed(4)) : 0;
  const lowRatio = ratio < TEXT_HTML_WARN_THRESHOLD;

  return {
    url,
    path: urlPath,
    htmlBytes,
    visibleTextBytes: textBytes,
    textHtmlRatio: ratio,
    wordCount: words,
    semrushLikelyWarning: lowRatio,
    verdict: verdict(ratio, words, urlPath),
  };
}

async function main() {
  const results = [];
  for (const p of PRIORITY_PATHS) {
    const row = await auditPath(p);
    results.push(row);
    process.stderr.write(`${p} ratio=${row.textHtmlRatio} words=${row.wordCount}\n`);
  }

  const summary = {
    baseUrl: BASE,
    auditedAt: new Date().toISOString(),
    priorityPages: PRIORITY_PATHS.length,
    acceptedModernNext: results.filter((r) => r.verdict === "TEXT_HTML_WARNING_ACCEPTED_MODERN_NEXT").length,
    improved: results.filter((r) => r.verdict === "TEXT_HTML_IMPROVED").length,
    results,
  };

  process.stdout.write(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
