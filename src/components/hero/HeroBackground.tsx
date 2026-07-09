"use client";

import HolographicGlobe from "@/components/landing/HolographicGlobe";

interface HeroBackgroundProps {
  variant: "base" | "reveal";
}

function StaticGlobeOutline() {
  return (
    <div className="absolute left-1/2 top-[52%] w-[min(85vw,620px)] -translate-x-1/2 -translate-y-1/2 opacity-40">
      <div className="relative aspect-square w-full">
        <div className="absolute inset-[10%] rounded-full border border-cyan-400/20 bg-cyan-500/5" />
        <div className="absolute inset-[20%] rounded-full border border-dashed border-cyan-400/15" />
        <div className="absolute inset-[32%] rounded-full border border-white/5" />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-gold-500/40"
            style={{ top: `${35 + i * 8}%`, left: `${48 + i * 5}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function CasinoSceneLayer({ bright }: { bright: boolean }) {
  const opacity = bright ? 1 : 0.35;
  const goldGlow = bright ? "rgba(212,175,55,0.45)" : "rgba(212,175,55,0.08)";
  const cyanGlow = bright ? "rgba(34,211,238,0.5)" : "rgba(34,211,238,0.12)";

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ opacity }}>
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${bright ? "rgba(34,211,238,0.06)" : "rgba(255,255,255,0.02)"} 1px, transparent 1px), linear-gradient(90deg, ${bright ? "rgba(34,211,238,0.06)" : "rgba(255,255,255,0.02)"} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Radial glows */}
      <div
        className="absolute left-1/2 top-1/3 h-[70%] w-[90%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${cyanGlow}, transparent 70%)` }}
      />
      <div
        className="absolute bottom-0 right-0 h-[50%] w-[60%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${goldGlow}, transparent 65%)` }}
      />

      {/* Globe */}
      <div className="absolute left-1/2 top-[52%] w-[min(90vw,680px)] -translate-x-1/2 -translate-y-1/2">
        {bright ? (
          <div className="opacity-100">
            <HolographicGlobe />
          </div>
        ) : (
          <StaticGlobeOutline />
        )}
      </div>

      {/* Casino table glow — reveal only prominent */}
      {bright && (
        <>
          <div className="absolute bottom-[18%] left-[12%] h-28 w-44 rounded-2xl border border-gold-500/30 bg-gold-500/10 blur-sm animate-glowPulse" />
          <div className="absolute bottom-[22%] right-[14%] h-24 w-36 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 blur-sm animate-glowPulse" style={{ animationDelay: "1s" }} />
        </>
      )}

      {/* Floating coins */}
      {[...Array(bright ? 8 : 4)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full border ${bright ? "border-gold-400/60 bg-gold-500/30" : "border-gold-500/20 bg-gold-500/10"} animate-floatSlow`}
          style={{
            width: `${12 + (i % 3) * 8}px`,
            height: `${12 + (i % 3) * 8}px`,
            top: `${10 + (i * 11) % 75}%`,
            left: `${5 + (i * 17) % 88}%`,
            animationDelay: `${i * 0.4}s`,
            boxShadow: bright ? "0 0 20px rgba(212,175,55,0.4)" : "none",
          }}
        />
      ))}

      {/* Jackpot light beams — reveal */}
      {bright && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[30%] top-[20%] h-40 w-px rotate-12 bg-gradient-to-b from-gold-400/60 to-transparent" />
          <div className="absolute right-[28%] top-[18%] h-48 w-px -rotate-6 bg-gradient-to-b from-cyan-400/50 to-transparent" />
          <div className="absolute left-[50%] top-[12%] h-32 w-px bg-gradient-to-b from-gold-300/40 to-transparent" />
        </div>
      )}
    </div>
  );
}

export default function HeroBackground({ variant }: HeroBackgroundProps) {
  const isReveal = variant === "reveal";

  return (
    <div
      className={`absolute inset-0 bg-cover bg-center ${isReveal ? "brightness-110 saturate-125" : ""}`}
      style={{
        background: isReveal
          ? "linear-gradient(160deg, #0a1628 0%, #061018 35%, #0d1a2e 70%, #040810 100%)"
          : "linear-gradient(160deg, #04060d 0%, #060912 40%, #0a0e17 100%)",
      }}
    >
      <CasinoSceneLayer bright={isReveal} />
    </div>
  );
}
