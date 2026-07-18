"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  async function onLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <PageShell>
      <PageHero
        kicker="Your account"
        title={user ? `Hi, ${user.name}` : "Account"}
        description="Your email is verified. You can browse casinos, bonuses, news, and guides while signed in."
        badges={user ? ["Verified", user.email] : ["Loading"]}
        tone="gold"
        actions={
          <>
            <Link href="/casinos" className="zb-btn-gold zb-shine">
              Explore casinos
            </Link>
            <button type="button" onClick={onLogout} className="zb-btn-ghost">
              Logout
            </button>
          </>
        }
      />
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {loading || !user ? (
          <p className="text-slate-500">Loading your account...</p>
        ) : (
          <div className="rounded-3xl border border-gold-400/25 bg-gradient-to-br from-gold-500/10 via-black/50 to-cyan-500/5 p-6 sm:p-8">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-slate-500">Name</dt>
                <dd className="mt-1 text-lg font-semibold text-white">{user.name}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Email</dt>
                <dd className="mt-1 text-lg font-semibold text-gold-300">{user.email}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Status</dt>
                <dd className="mt-1 font-semibold text-emerald-300">Email verified</dd>
              </div>
              <div>
                <dt className="text-slate-500">Member since</dt>
                <dd className="mt-1 text-slate-300">
                  {new Date(user.createdAt).toLocaleDateString("en-GB")}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </PageShell>
  );
}
