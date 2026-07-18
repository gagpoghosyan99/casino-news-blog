import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import AuthStage from "@/components/auth/AuthStage";
import LoginForm from "@/components/auth/LoginForm";
import PageShell from "@/components/ui/PageShell";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Login",
  description: "Log in to your ZEONEBET account.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <PageShell>
      <AuthStage
        kicker="Welcome back"
        title="Sign in to ZEONEBET"
        description="Log in with your verified email. Unverified accounts are asked for a code first."
        badges={["Secure session", "Email verified only"]}
        footerHint={
          <>
            New here?{" "}
            <Link href="/register" className="font-semibold text-gold-400 hover:text-gold-300">
              Create an account
            </Link>
          </>
        }
      >
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-white">Login</h2>
          <p className="mt-1 text-sm text-slate-400">Access your ZEONEBET account.</p>
        </div>
        <Suspense fallback={<p className="text-sm text-slate-500">Loading...</p>}>
          <LoginForm />
        </Suspense>
      </AuthStage>
    </PageShell>
  );
}
