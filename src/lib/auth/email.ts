import nodemailer from "nodemailer";

function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function getMailFrom(): string {
  return process.env.SMTP_FROM || `ZEONEBET <${process.env.SMTP_USER || "noreply@zeonebet.com"}>`;
}

export async function sendVerificationEmail(input: {
  to: string;
  name: string;
  code: string;
}): Promise<void> {
  if (!smtpConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[auth] DEV verification code for ${input.to}: ${input.code}`);
      return;
    }
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1" || port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://zeonebet.com";

  await transporter.sendMail({
    from: getMailFrom(),
    to: input.to,
    subject: `${input.code} is your ZEONEBET verification code`,
    text: [
      `Hi ${input.name},`,
      "",
      `Your ZEONEBET verification code is: ${input.code}`,
      "",
      "This code expires in 15 minutes.",
      "If you did not create an account, you can ignore this email.",
      "",
      `— ZEONEBET`,
      site,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;background:#05070f;color:#e2e8f0;padding:32px">
        <div style="max-width:520px;margin:0 auto;background:#0b1220;border:1px solid rgba(212,175,55,.35);border-radius:16px;padding:28px">
          <p style="margin:0 0 8px;color:#d4af37;font-size:12px;letter-spacing:.2em;text-transform:uppercase;font-weight:700">ZEONEBET</p>
          <h1 style="margin:0 0 16px;font-size:22px;color:#fff">Verify your email</h1>
          <p style="margin:0 0 20px;line-height:1.6;color:#94a3b8">Hi ${escapeHtml(input.name)}, use this code to finish creating your account:</p>
          <p style="margin:0 0 24px;font-size:32px;letter-spacing:.3em;font-weight:700;color:#f4c542">${input.code}</p>
          <p style="margin:0;line-height:1.6;color:#94a3b8;font-size:14px">This code expires in <strong style="color:#e2e8f0">15 minutes</strong>. If you did not request it, ignore this email.</p>
        </div>
      </div>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function smtpStatus() {
  return {
    configured: smtpConfigured(),
    host: process.env.SMTP_HOST || null,
    from: getMailFrom(),
  };
}
