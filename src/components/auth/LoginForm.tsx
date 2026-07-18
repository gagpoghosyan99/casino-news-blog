"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import type { PublicUser } from "@/lib/auth/types";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { setUser } = useAuth();
  const [email, setEmail] = useState(params.get("email") || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as {
        error?: string;
        needsVerification?: boolean;
        email?: string;
        user?: PublicUser;
      };
      if (!res.ok) {
        if (data.needsVerification && data.email) {
          router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
          return;
        }
        setError(data.error || "Login failed.");
        return;
      }
      if (data.user) setUser(data.user);
      const next = params.get("next");
      router.push(next && next.startsWith("/") ? next : "/account");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl border border-danger-500/40 bg-danger-500/10 px-4 py-3 text-sm text-danger-300">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-slate-300">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-slate-300">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
      </div>
      <button type="submit" disabled={loading} className="zb-btn-gold zb-shine w-full">
        {loading ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}
