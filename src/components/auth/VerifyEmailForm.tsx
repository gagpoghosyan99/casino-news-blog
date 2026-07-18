"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import type { PublicUser } from "@/lib/auth/types";

export default function VerifyEmailForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { setUser } = useAuth();
  const initialEmail = useMemo(() => params.get("email") || "", [params]);
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState(
    initialEmail ? `Enter the 6-digit code we sent to ${initialEmail}.` : "Enter your email and verification code."
  );
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, code }),
      });
      const data = (await res.json()) as { error?: string; user?: PublicUser; message?: string };
      if (!res.ok) {
        setError(data.error || "Verification failed.");
        return;
      }
      if (data.user) setUser(data.user);
      router.push("/account");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onResend() {
    setError("");
    setResending(true);
    try {
      const res = await fetch("/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setError(data.error || "Could not resend code.");
        return;
      }
      setInfo(data.message || "A new code was sent.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setResending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {info && !error && (
        <div className="rounded-xl border border-gold-400/30 bg-gold-500/10 px-4 py-3 text-sm text-gold-200">
          {info}
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-danger-500/40 bg-danger-500/10 px-4 py-3 text-sm text-danger-300">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="verify-email" className="block text-sm font-medium text-slate-300">
          Email
        </label>
        <input
          id="verify-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
      </div>
      <div>
        <label htmlFor="verify-code" className="block text-sm font-medium text-slate-300">
          Verification code
        </label>
        <input
          id="verify-code"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          required
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="6-digit code"
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-center font-mono text-2xl tracking-[0.35em] text-gold-300 focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
      </div>
      <button type="submit" disabled={loading || code.length !== 6} className="zb-btn-gold zb-shine w-full">
        {loading ? "Verifying..." : "Verify & continue"}
      </button>
      <button
        type="button"
        onClick={onResend}
        disabled={resending || !email}
        className="zb-btn-ghost w-full text-sm"
      >
        {resending ? "Sending..." : "Resend code"}
      </button>
    </form>
  );
}
