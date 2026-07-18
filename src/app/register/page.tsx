import type { Metadata } from "next";
import Link from "next/link";
import AuthStage from "@/components/auth/AuthStage";
import RegisterForm from "@/components/auth/RegisterForm";
import PageShell from "@/components/ui/PageShell";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Register",
  description: "Create a ZEONEBET account and verify your email to continue.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <PageShell>
      <AuthStage
        kicker="Join ZEONEBET"
        title="Create your account"
        description="Register with your email. We send a 6-digit verification code — verify it, then unlock the full site."
        badges={["Email verification", "18+ only", "Secure session"]}
        footerHint={
          <>
            Already registered?{" "}
            <Link href="/login" className="font-semibold text-gold-400 hover:text-gold-300">
              Sign in
            </Link>
          </>
        }
      >
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-white">Registration</h2>
          <p className="mt-1 text-sm text-slate-400">A few details and you&apos;re in.</p>
        </div>
        <RegisterForm />
      </AuthStage>
    </PageShell>
  );
}
