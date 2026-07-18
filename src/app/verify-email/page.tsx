import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import AuthStage from "@/components/auth/AuthStage";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
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
      <AuthStage
        kicker="Email verification"
        title="Check your inbox"
        description="Paste the 6-digit code from your email. Once verified, your account unlocks immediately."
        badges={["Code expires in 15 min", "Resend available"]}
        footerHint={
          <>
            Wrong account?{" "}
            <Link href="/login" className="font-semibold text-gold-400 hover:text-gold-300">
              Back to login
            </Link>
          </>
        }
      >
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-white">Enter your code</h2>
          <p className="mt-1 text-sm text-slate-400">Verification unlocks full access.</p>
        </div>
        <Suspense fallback={<p className="text-sm text-slate-500">Loading...</p>}>
          <VerifyEmailForm />
        </Suspense>
      </AuthStage>
    </PageShell>
  );
}
