"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Client redirect so hash fragments are preserved for Partners sub-routes. */
export default function PartnersAnchorRedirect({ hash }: { hash: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/partners#${hash}`);
  }, [hash, router]);

  return (
    <p className="px-4 py-24 text-center text-sm text-slate-400">
      Redirecting to Partners…
    </p>
  );
}
