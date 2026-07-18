import { NextResponse } from "next/server";
import { findUserByEmail, normalizeEmail } from "@/lib/auth/store";
import { validateEmail } from "@/lib/auth/password";
import { verifyPassword } from "@/lib/auth/password";
import { applySessionCookie, createSessionToken, toPublicUser } from "@/lib/auth/session";
import { issueAndSendVerificationCode } from "@/lib/auth/verification";
import { rateLimit } from "@/lib/auth/rate-limit";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = normalizeEmail(body.email || "");
    const password = body.password || "";

    const emailError = validateEmail(email);
    if (emailError) return NextResponse.json({ error: emailError }, { status: 400 });
    if (!password) return NextResponse.json({ error: "Password is required." }, { status: 400 });

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(`login:${ip}`, 20, 15 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many login attempts. Try again later." }, { status: 429 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    if (!user.emailVerified) {
      try {
        await issueAndSendVerificationCode({ email: user.email, name: user.name });
      } catch {
        // Still send them to verify UI even if SMTP fails — they can resend.
      }
      return NextResponse.json(
        {
          error: "Please verify your email before logging in.",
          needsVerification: true,
          email: user.email,
        },
        { status: 403 }
      );
    }

    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({
      ok: true,
      user: toPublicUser(user),
      message: "Logged in successfully.",
    });
    applySessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("[auth/login]", error);
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
