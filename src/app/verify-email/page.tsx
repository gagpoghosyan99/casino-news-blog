import type { Metadata } from "next";
import { Suspense } from "react";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Verify Email",
  description: "Enter the verification code sent to your email to activate your ZEONEBET account.",
  path: "/verify-email",
  noIndex: true,
});

export default function VerifyEmailPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Email verification"
        title="Check your inbox"
        description="Paste the 6-digit code from your email. After verification, your account unlocks immediately."
        badges={["Code expires in 15 min", "Resend available"]}
        tone="cyan"
      />
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-cyan-500/10 via-black/50 to-gold-500/5 p-6 shadow-[0_0_40px_rgba(34,211,238,0.1)] backdrop-blur-xl sm:p-8">
          <Suspense fallback={<p className="text-sm text-slate-500">Loading...</p>}>
            <VerifyEmailForm />
          </Suspense>
        </div>
      </div>
    </PageShell>
  );
}
