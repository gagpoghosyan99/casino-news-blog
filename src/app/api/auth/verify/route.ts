import { NextResponse } from "next/server";
import { findUserByEmail, markUserVerified, normalizeEmail } from "@/lib/auth/store";
import { consumeVerificationCode } from "@/lib/auth/verification";
import { validateEmail } from "@/lib/auth/password";
import { applySessionCookie, createSessionToken, toPublicUser } from "@/lib/auth/session";
import { rateLimit } from "@/lib/auth/rate-limit";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; code?: string };
    const email = normalizeEmail(body.email || "");
    const code = (body.code || "").trim();

    const emailError = validateEmail(email);
    if (emailError) return NextResponse.json({ error: emailError }, { status: 400 });
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: "Enter the 6-digit code from your email." }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(`verify:${ip}:${email}`, 20, 15 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many attempts. Request a new code." }, { status: 429 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "No account found for this email." }, { status: 404 });
    }
    if (user.emailVerified) {
      return NextResponse.json({ error: "Email is already verified. Please log in." }, { status: 400 });
    }

    const result = await consumeVerificationCode(email, code);
    if (result === "expired") {
      return NextResponse.json({ error: "Code expired. Request a new one." }, { status: 400 });
    }
    if (result === "locked") {
      return NextResponse.json({ error: "Too many wrong codes. Request a new one." }, { status: 429 });
    }
    if (result === "invalid") {
      return NextResponse.json({ error: "Incorrect verification code." }, { status: 400 });
    }

    const verified = await markUserVerified(email);
    if (!verified) {
      return NextResponse.json({ error: "Verification failed." }, { status: 500 });
    }

    const token = await createSessionToken({
      sub: verified.id,
      email: verified.email,
      name: verified.name,
    });

    const response = NextResponse.json({
      ok: true,
      verified: true,
      user: toPublicUser(verified),
      message: "Email verified. Welcome to ZEONEBET.",
    });
    applySessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("[auth/verify]", error);
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 500 });
  }
}
