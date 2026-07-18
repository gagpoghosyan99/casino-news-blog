import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/auth/rate-limit";

/**
 * Partner inquiry intake.
 * Env (optional future email delivery):
 *   PARTNERS_INQUIRY_WEBHOOK_URL — POST JSON to your CRM/webhook
 *   SMTP_* — reuse site mailer when wired
 */
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(`partners-inquiry:${ip}`, 8, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });
    }

    const body = (await request.json()) as Record<string, unknown>;

    // Honeypot
    if (typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({ success: true });
    }

    const fullName = String(body.fullName || "").trim();
    const workEmail = String(body.workEmail || "").trim();
    const companyName = String(body.companyName || "").trim();
    const companyWebsite = String(body.companyWebsite || "").trim();
    const companyType = String(body.companyType || "").trim();
    const country = String(body.country || "").trim();
    const targetMarkets = String(body.targetMarkets || "").trim();
    const partnershipType = String(body.partnershipType || "").trim();
    const mainObjective = String(body.mainObjective || "").trim();
    const message = String(body.message || "").trim();

    if (
      !fullName ||
      !workEmail ||
      !companyName ||
      !companyWebsite ||
      !companyType ||
      !country ||
      !targetMarkets ||
      !partnershipType ||
      !mainObjective ||
      !message
    ) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      return NextResponse.json({ error: "Enter a valid work email." }, { status: 400 });
    }

    if (!body.accurate || !body.authority || !body.privacy || !body.noGuarantee) {
      return NextResponse.json({ error: "Consent checkboxes are required." }, { status: 400 });
    }

    const payload = {
      ...body,
      fullName,
      workEmail,
      companyName,
      companyWebsite,
      receivedAt: new Date().toISOString(),
      source: "partners-inquiry",
    };

    const webhook = process.env.PARTNERS_INQUIRY_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("[partners/inquiry] webhook failed", err);
      }
    }

    console.info("[partners/inquiry]", {
      companyName,
      workEmail,
      partnershipType,
      country,
      at: payload.receivedAt,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
