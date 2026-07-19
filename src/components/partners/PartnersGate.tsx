"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import { PARTNERS_ROUTES } from "@/data/partners/content";

const PATHS = [
  {
    id: "company",
    href: PARTNERS_ROUTES.company,
    badge: "For businesses",
    title: "Company Partners",
    subtitle: "Casinos, operators, agencies, media & brands",
    description:
      "Affiliate deals, advertising, casino listings, sponsored content and custom business partnerships.",
    cta: "Open company offers",
    icon: Building2,
    accent: "company" as const,
  },
  {
    id: "customer",
    href: PARTNERS_ROUTES.customer,
    badge: "For players",
    title: "Customer Partners",
    subtitle: "Players looking for offers, referrals & benefits",
    description:
      "Reviewed casinos, tracked promotions, referral benefits and clearer offer conditions.",
    cta: "Open player options",
    icon: Sparkles,
    accent: "customer" as const,
  },
] as const;

function GatePathCard({
  path,
  index,
}: {
  path: (typeof PATHS)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const Icon = path.icon;
  const isCompany = path.accent === "company";

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -14, y: (px - 0.5) * 18 });
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div className="h-full" style={{ perspective: "1400px" }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        initial={reduce ? false : { opacity: 0, y: 36, rotateX: 12 }}
        animate={{
          opacity: 1,
          y: hovered && !reduce ? -18 : 0,
          rotateX: reduce ? 0 : tilt.x,
          rotateY: reduce ? 0 : tilt.y,
          z: hovered && !reduce ? 56 : 0,
          scale: hovered && !reduce ? 1.045 : 1,
        }}
        transition={{
          opacity: { duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
          y: { type: "spring", stiffness: 260, damping: 22 },
          z: { type: "spring", stiffness: 240, damping: 20 },
          scale: { type: "spring", stiffness: 240, damping: 20 },
          rotateX: { type: "spring", stiffness: 220, damping: 18 },
          rotateY: { type: "spring", stiffness: 220, damping: 18 },
        }}
        className="h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Link
          href={path.href}
          className={`group relative flex h-full min-h-[42vh] flex-col justify-between overflow-hidden rounded-[2rem] border p-7 sm:min-h-[48vh] sm:p-10 lg:min-h-0 ${
            isCompany
              ? "border-gold-400/50 bg-gradient-to-br from-gold-500/25 via-[#0b0f18] to-black/70"
              : "border-white/20 bg-gradient-to-br from-white/[0.09] via-[#0b0f18] to-gold-500/10"
          }`}
          style={{
            transformStyle: "preserve-3d",
            boxShadow: hovered
              ? isCompany
                ? "0 40px 90px rgba(212,175,55,0.28), 0 18px 40px rgba(0,0,0,0.55)"
                : "0 40px 90px rgba(255,255,255,0.08), 0 18px 40px rgba(0,0,0,0.55)"
              : isCompany
                ? "0 24px 60px rgba(212,175,55,0.12)"
                : "0 24px 60px rgba(0,0,0,0.45)",
          }}
        >
          <motion.div
            className={`pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl ${
              isCompany ? "bg-gold-400/35" : "bg-white/20"
            }`}
            animate={{ opacity: hovered ? 1 : isCompany ? 0.7 : 0.5, scale: hovered ? 1.15 : 1 }}
            transition={{ duration: 0.35 }}
            style={{ transform: "translateZ(12px)" }}
          />

          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.12)_50%,transparent_65%)]"
              animate={{ x: hovered ? ["-70%", "130%"] : "-70%" }}
              transition={
                hovered
                  ? { duration: 1.1, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              style={{ transform: "translateZ(8px)" }}
            />
          )}

          <div className="relative" style={{ transform: "translateZ(42px)" }}>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] ${
                isCompany
                  ? "bg-gold-500 text-navy-950"
                  : "bg-white/10 text-gold-200 ring-1 ring-gold-400/40"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {path.badge}
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold leading-none tracking-[0.02em] text-white sm:text-5xl lg:text-[3.25rem]">
              {path.title}
            </h2>
            <p className="mt-4 text-sm font-medium text-gold-300/90 sm:text-base">{path.subtitle}</p>
            <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-slate-300 sm:text-base">
              {path.description}
            </p>
          </div>

          <motion.span
            className={`relative mt-10 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold sm:text-base ${
              isCompany
                ? "bg-gold-500 text-navy-950 shadow-[0_0_32px_rgba(212,175,55,0.4)]"
                : "border border-gold-400/45 bg-white/5 text-gold-200"
            }`}
            animate={{ x: hovered && !reduce ? 8 : 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            style={{ transform: "translateZ(56px)" }}
          >
            {path.cta}
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}

export default function PartnersGate() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col pt-[88px] md:pt-[132px] lg:pt-[88px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(212,175,55,0.18),transparent_55%),linear-gradient(180deg,#02040a_0%,#060912_55%,#0a0e17_100%)]" />
      <div className="bg-grid-premium pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-4 pt-6 text-center sm:px-6 sm:pt-8 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-400">ZeoneBet Partners</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-[0.02em] text-white sm:text-4xl lg:text-5xl">
          Choose your partnership path
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
          Two full paths. Pick Company if you represent a business. Pick Customer if you play and want player
          offers.
        </p>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-5 px-4 pb-8 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-10">
        {PATHS.map((path, index) => (
          <GatePathCard key={path.id} path={path} index={index} />
        ))}
      </div>
    </section>
  );
}
