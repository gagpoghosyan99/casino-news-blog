import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import PageHero from "@/components/ui/PageHero";
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
      <PageHero
        kicker="Join ZEONEBET"
        title="Create your account"
        description="Register with your email. We send a 6-digit verification code — verify it, then you can use the site."
        badges={["Email verification", "18+ only"]}
        tone="gold"
        actions={
          <Link href="/login" className="zb-btn-cyan">
            Already registered?
          </Link>
        }
      />
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gold-400/25 bg-gradient-to-br from-gold-500/10 via-black/50 to-cyan-500/5 p-6 shadow-[0_0_40px_rgba(212,175,55,0.1)] backdrop-blur-xl sm:p-8">
          <RegisterForm />
        </div>
      </div>
    </PageShell>
  );
}
