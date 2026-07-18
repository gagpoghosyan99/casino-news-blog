import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import PageHero from "@/components/ui/PageHero";
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
      <PageHero
        kicker="Account"
        title="Welcome back"
        description="Log in to access your ZEONEBET account. Unverified emails will be asked for a code first."
        badges={["Secure session", "Email verified only"]}
        tone="gold"
        actions={
          <Link href="/register" className="zb-btn-cyan">
            Create account
          </Link>
        }
      />
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gold-400/25 bg-gradient-to-br from-gold-500/10 via-black/50 to-cyan-500/5 p-6 shadow-[0_0_40px_rgba(212,175,55,0.1)] backdrop-blur-xl sm:p-8">
          <Suspense fallback={<p className="text-sm text-slate-500">Loading...</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </PageShell>
  );
}
