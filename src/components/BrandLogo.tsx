"use client";

import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
  /** show wordmark text beside the Z mark */
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { mark: 28, text: "text-base" },
  md: { mark: 36, text: "text-lg" },
  lg: { mark: 44, text: "text-xl" },
} as const;

export default function BrandLogo({
  href = "/",
  className = "",
  showWordmark = true,
  size = "md",
}: BrandLogoProps) {
  const s = sizes[size];

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/brand/zeonebet-z.png"
        alt=""
        width={s.mark}
        height={s.mark}
        className="h-auto w-auto drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]"
        style={{ width: s.mark, height: s.mark }}
        priority
      />
      {showWordmark && (
        <span className={`font-display font-bold tracking-[0.02em] ${s.text}`}>
          <span className="text-white">ZEONE</span>
          <span className="text-gold-400">BET</span>
        </span>
      )}
      <span className="sr-only">ZEONEBET</span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="group inline-flex items-center" aria-label="ZEONEBET home">
      {content}
    </Link>
  );
}
