"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Redirect legacy Partners sub-routes to the new company/customer pages. */
export default function PartnersAnchorRedirect({
  to,
  hash,
}: {
  to: string;
  hash?: string;
}) {
  const router = useRouter();
  useEffect(() => {
    router.replace(hash ? `${to}#${hash}` : to);
  }, [to, hash, router]);

  return (
    <p className="px-4 py-24 text-center text-sm text-slate-400">Redirecting…</p>
  );
}
