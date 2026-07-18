import { NextResponse } from "next/server";
import { findUserByEmail, normalizeEmail } from "@/lib/auth/store";
import { validateEmail } from "@/lib/auth/password";
import { issueAndSendVerificationCode } from "@/lib/auth/verification";
import { rateLimit } from "@/lib/auth/rate-limit";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = normalizeEmail(body.email || "");
    const emailError = validateEmail(email);
    if (emailError) return NextResponse.json({ error: emailError }, { status: 400 });

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(`resend:${ip}:${email}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json({ error: "Please wait before requesting another code." }, { status: 429 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "No account found for this email." }, { status: 404 });
    }
    if (user.emailVerified) {
      return NextResponse.json({ error: "Email is already verified. Please log in." }, { status: 400 });
    }

    try {
      await issueAndSendVerificationCode({ email: user.email, name: user.name });
    } catch (err) {
      const message = err instanceof Error ? err.message : "EMAIL_FAILED";
      if (message === "SMTP_NOT_CONFIGURED") {
        return NextResponse.json(
          { error: "Email delivery is not configured. Add SMTP settings to .env first." },
          { status: 503 }
        );
      }
      throw err;
    }

    return NextResponse.json({
      ok: true,
      message: "A new verification code was sent to your email.",
    });
  } catch (error) {
    console.error("[auth/resend]", error);
    return NextResponse.json({ error: "Could not resend code. Try again." }, { status: 500 });
  }
}
