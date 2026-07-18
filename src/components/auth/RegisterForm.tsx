"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = (await res.json()) as {
        error?: string;
        needsVerification?: boolean;
        email?: string;
      };
      if (!res.ok && !(res.status === 503 && data.needsVerification)) {
        setError(data.error || "Registration failed.");
        return;
      }
      const targetEmail = data.email || email;
      router.push(`/verify-email?email=${encodeURIComponent(targetEmail)}`);
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
        <label htmlFor="register-name" className="block text-sm font-medium text-slate-300">
          Full name
        </label>
        <input
          id="register-name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
      </div>
      <div>
        <label htmlFor="register-email" className="block text-sm font-medium text-slate-300">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
      </div>
      <div>
        <label htmlFor="register-password" className="block text-sm font-medium text-slate-300">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
        <p className="mt-1 text-xs text-slate-500">At least 8 characters, with a letter and a number.</p>
      </div>
      <div>
        <label htmlFor="register-confirm" className="block text-sm font-medium text-slate-300">
          Confirm password
        </label>
        <input
          id="register-confirm"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
      </div>
      <button type="submit" disabled={loading} className="zb-btn-gold zb-shine w-full">
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
