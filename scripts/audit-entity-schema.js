#!/usr/bin/env node
/**
 * Organization / NewsMediaOrganization entity schema audit.
 * Usage: node scripts/audit-entity-schema.js [baseUrl]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASE = (process.argv[2] || "https://casinopuls.site").replace(/\/$/, "");
const CANONICAL = "https://casinopuls.site";
const OUT_DIR = path.join(ROOT, "docs/audits/p5-authority-entity-geo-performance");

function readJsonLdBlocks(html) {
  const blocks = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      /* skip */
    }
  }
  return blocks;
}

function flatten(items) {
  const out = [];
  for (const item of items) {
    if (Array.isArray(item)) out.push(...flatten(item));
    else if (item && typeof item === "object") {
      out.push(item);
      if (item["@graph"]) out.push(...flatten(item["@graph"]));
    }
  }
  return out;
}

async function headStatus(urlPath) {
  try {
    const res = await fetch(`${BASE}${urlPath}`, {
      method: "HEAD",
      headers: { "User-Agent": "CasinoPulse-Entity-Audit/1.0" },
    });
    return res.status;
  } catch {
    return 0;
  }
}

async function auditHomepage() {
  const res = await fetch(`${BASE}/`, {
    headers: { "User-Agent": "CasinoPulse-Entity-Audit/1.0" },
  });
  const html = await res.text();
  const entities = flatten(readJsonLdBlocks(html));
  const org = entities.find(
    (e) => e["@type"] === "NewsMediaOrganization" || e["@type"] === "Organization"
  );
  const localBusiness = entities.find((e) => e["@type"] === "LocalBusiness");
  const issues = [];
  const checks = {};

  if (!org) {
    issues.push("missing NewsMediaOrganization or Organization on homepage");
    checks.hasOrgSchema = false;
  } else {
    checks.hasOrgSchema = true;
    checks.orgType = org["@type"];
    checks.orgName = org.name;
    checks.orgUrl = org.url;

    if (org.url !== CANONICAL && org.url !== `${CANONICAL}/`) {
      issues.push(`org url mismatch: ${org.url}`);
    }

    if (org.sameAs) {
      const sameAs = Array.isArray(org.sameAs) ? org.sameAs : [org.sameAs];
      for (const url of sameAs) {
        if (!/^https?:\/\//.test(url)) issues.push(`invalid sameAs URL: ${url}`);
      }
      checks.sameAs = sameAs;
    } else {
      checks.sameAs = [];
    }

    if (org.logo) {
      const logoUrl =
        typeof org.logo === "string" ? org.logo : org.logo.url || org.logo["@id"] || "";
      checks.logoUrl = logoUrl;
      if (logoUrl) {
        const logoPath = logoUrl.replace(CANONICAL, "");
        const status = await headStatus(logoPath);
        checks.logoStatus = status;
        if (status !== 200) issues.push(`logo URL not 200: ${logoUrl} (${status})`);
      } else {
        issues.push("logo object missing url");
      }
    } else {
      issues.push("missing logo on organization schema");
    }

    if (org.contactPoint) {
      checks.contactPoint = org.contactPoint;
      const cpUrl = org.contactPoint.url || org.contactPoint.email;
      if (!cpUrl) issues.push("contactPoint missing url/email");
    }
  }

  if (localBusiness) {
    issues.push("LocalBusiness schema present — not appropriate for editorial site");
    checks.hasLocalBusiness = true;
  } else {
    checks.hasLocalBusiness = false;
  }

  return {
    path: "/",
    status: res.status,
    checks,
    issues,
    pass: issues.length === 0,
    verdict: issues.length === 0 ? "ENTITY_SCHEMA_PASS" : "ENTITY_SCHEMA_FAIL",
  };
}

async function main() {
  const result = await auditHomepage();
  const summary = {
    baseUrl: BASE,
    auditedAt: new Date().toISOString(),
    canonicalUrl: CANONICAL,
    pass: result.pass,
    verdict: result.verdict,
    issueCount: result.issues.length,
    result,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "entity-schema-audit.json"), JSON.stringify(summary, null, 2));
  process.stdout.write(JSON.stringify(summary, null, 2));

  if (!result.pass) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
