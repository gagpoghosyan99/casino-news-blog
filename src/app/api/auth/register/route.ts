import { NextResponse } from "next/server";
import { createUser, findUserByEmail, normalizeEmail } from "@/lib/auth/store";
import { hashPassword, validateEmail, validateName, validatePassword } from "@/lib/auth/password";
import { issueAndSendVerificationCode } from "@/lib/auth/verification";
import { rateLimit } from "@/lib/auth/rate-limit";
import { toPublicUser } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    const name = body.name?.trim() || "";
    const email = normalizeEmail(body.email || "");
    const password = body.password || "";

    const nameError = validateName(name);
    if (nameError) return NextResponse.json({ error: nameError }, { status: 400 });
    const emailError = validateEmail(email);
    if (emailError) return NextResponse.json({ error: emailError }, { status: 400 });
    const passwordError = validatePassword(password);
    if (passwordError) return NextResponse.json({ error: passwordError }, { status: 400 });

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(`register:${ip}`, 8, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many registration attempts. Try again later." }, { status: 429 });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please log in." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({ name, email, passwordHash });

    try {
      await issueAndSendVerificationCode({ email, name });
    } catch (err) {
      const message = err instanceof Error ? err.message : "EMAIL_FAILED";
      if (message === "SMTP_NOT_CONFIGURED") {
        return NextResponse.json(
          {
            error:
              "Account created, but email delivery is not configured yet. Add SMTP settings to .env and resend the code.",
            needsVerification: true,
            email,
          },
          { status: 503 }
        );
      }
      throw err;
    }

    return NextResponse.json({
      ok: true,
      needsVerification: true,
      email: user.email,
      user: toPublicUser(user),
      message: "We sent a 6-digit verification code to your email.",
    });
  } catch (error) {
    console.error("[auth/register]", error);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
