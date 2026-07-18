"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* South Asia + global casino intelligence nodes (lat, lon) */
const DATA_NODES = [
  { lat: 28, lon: 77, label: "IN" },
  { lat: 23, lon: 90, label: "BD" },
  { lat: 6, lon: 80, label: "LK" },
  { lat: 27, lon: 85, label: "NP" },
  { lat: 1.3, lon: 103.8, label: "SG" },
  { lat: 25, lon: 55, label: "AE" },
  { lat: 51.5, lon: -0.1, label: "UK" },
  { lat: 40.7, lon: -74, label: "US" },
];

function project(
  lat: number,
  lon: number,
  rotY: number,
  cx: number,
  cy: number,
  r: number
) {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = ((lon + rotY) * Math.PI) / 180;
  const x3 = Math.cos(latRad) * Math.sin(lonRad);
  const y3 = Math.sin(latRad);
  const z3 = Math.cos(latRad) * Math.cos(lonRad);
  const scale = 1 / (2.2 - z3 * 0.75);
  return {
    x: cx + x3 * r * scale,
    y: cy - y3 * r * scale,
    z: z3,
  };
}

function WireframeCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.36;

      rotRef.current += 0.18;
      const rotY = rotRef.current;

      ctx.clearRect(0, 0, w, h);

      /* Core glow */
      const glow = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r * 1.15);
      glow.addColorStop(0, "rgba(34, 211, 238, 0.22)");
      glow.addColorStop(0.45, "rgba(6, 182, 212, 0.08)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      /* Sphere fill */
      const sphere = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, 0, cx, cy, r);
      sphere.addColorStop(0, "rgba(34, 211, 238, 0.12)");
      sphere.addColorStop(0.5, "rgba(6, 50, 80, 0.35)");
      sphere.addColorStop(1, "rgba(4, 10, 20, 0.6)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = sphere;
      ctx.fill();

      ctx.lineCap = "round";

      /* Latitude lines */
      for (let lat = -75; lat <= 75; lat += 15) {
        const pts: { x: number; y: number; z: number }[] = [];
        for (let lon = 0; lon <= 360; lon += 4) {
          pts.push(project(lat, lon, rotY, cx, cy, r));
        }
        ctx.beginPath();
        let started = false;
        for (const p of pts) {
          if (p.z < -0.08) {
            started = false;
            continue;
          }
          const alpha = 0.15 + p.z * 0.55;
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.lineWidth = 0.6 + p.z * 0.8;
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }

      /* Longitude meridians */
      for (let lon = 0; lon < 360; lon += 15) {
        const pts: { x: number; y: number; z: number }[] = [];
        for (let lat = -90; lat <= 90; lat += 4) {
          pts.push(project(lat, lon, rotY, cx, cy, r));
        }
        ctx.beginPath();
        let started = false;
        for (const p of pts) {
          if (p.z < -0.08) {
            started = false;
            continue;
          }
          const alpha = 0.18 + p.z * 0.5;
          ctx.strokeStyle = `rgba(103, 232, 249, ${alpha})`;
          ctx.lineWidth = 0.5 + p.z * 0.7;
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }

      /* Outer rim */
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34, 211, 238, 0.45)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(34, 211, 238, 0.8)";
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;

      /* Data nodes */
      for (const node of DATA_NODES) {
        const p = project(node.lat, node.lon, rotY, cx, cy, r);
        if (p.z < 0.05) continue;

        const pulse = 0.7 + Math.sin(Date.now() / 600 + node.lon) * 0.3;
        const size = (2.5 + p.z * 3) * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${0.08 * p.z})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${0.5 + p.z * 0.5})`;
        ctx.shadowColor = "rgba(212, 175, 55, 0.9)";
        ctx.shadowBlur = 10 * p.z;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

function OrbitRing({ tilt, spin, size, opacity }: { tilt: string; spin: number; size: string; opacity: number }) {
  return (
    <motion.div
      className="globe-orbit-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40"
      style={{
        width: size,
        height: size,
        transform: `${tilt}`,
        opacity,
        boxShadow: "0 0 20px rgba(34, 211, 238, 0.25), inset 0 0 20px rgba(34, 211, 238, 0.08)",
      }}
      animate={{ rotateZ: 360 }}
      transition={{ duration: spin, repeat: Infinity, ease: "linear" }}
    />
  );
}

function GoldCoin({ className, delay = 0, size = "md" }: { className?: string; delay?: number; size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "h-14 w-14" : size === "sm" ? "h-8 w-8" : "h-11 w-11";
  const text = size === "lg" ? "text-lg" : size === "sm" ? "text-[10px]" : "text-sm";
  return (
    <motion.div
      className={`absolute flex items-center justify-center rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-500 font-bold text-navy-950 shadow-[0_0_24px_rgba(212,175,55,0.5)] ${dim} ${className ?? ""}`}
      animate={{ y: [0, -14, 0], rotateY: [0, 180, 360] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <span className={`${text} font-numeric`}>$</span>
      <div className="absolute inset-1 rounded-full border border-gold-300/50" />
    </motion.div>
  );
}

function PokerChip({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute h-12 w-12 rounded-full border-[3px] border-cyan-400 bg-gradient-to-br from-navy-900 to-cyan-900/80 shadow-[0_0_20px_rgba(34,211,238,0.35)] ${className ?? ""}`}
      animate={{ y: [0, 10, 0], rotate: [0, 15, -15, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className="absolute inset-1.5 rounded-full border border-dashed border-cyan-300/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[9px] font-bold text-cyan-300">ZB</span>
      </div>
    </motion.div>
  );
}

function BokehDot({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full bg-cyan-400/20 blur-md ${className ?? ""}`}
      animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.15, 1] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function TrustShield({ side }: { side: "left" | "right" }) {
  return (
    <motion.div
      className={`absolute top-1/3 z-20 hidden w-28 -translate-y-1/2 md:block ${side === "left" ? "left-0 lg:-left-4" : "right-0 lg:-right-4"}`}
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="zb-glass-cyan flex flex-col items-center rounded-2xl px-3 py-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-500/10 shadow-glow-cyan">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-cyan-400" fill="currentColor">
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14.59l-3.3-3.29 1.41-1.41L11 13.76l4.89-4.88 1.41 1.41L11 16.59z" />
          </svg>
        </div>
        <p className="mt-2 text-[10px] font-bold uppercase leading-tight tracking-wider text-cyan-300">
          Casino
          <br />
          Intelligence
        </p>
      </div>
    </motion.div>
  );
}

export default function HolographicGlobe() {
  return (
    <div className="globe-stage relative mx-auto w-full max-w-2xl">
      {/* Bokeh atmosphere */}
      <BokehDot className="left-[8%] top-[12%] h-16 w-16" delay={0} />
      <BokehDot className="right-[10%] top-[20%] h-24 w-24 bg-gold-400/15" delay={1.2} />
      <BokehDot className="bottom-[18%] left-[20%] h-20 w-20" delay={0.6} />
      <BokehDot className="bottom-[10%] right-[18%] h-14 w-14 bg-gold-400/10" delay={1.8} />

      <TrustShield side="left" />
      <TrustShield side="right" />

      {/* 3D orbital rings */}
      <div className="globe-orbit-container pointer-events-none absolute inset-0" style={{ perspective: "900px" }}>
        <OrbitRing tilt="rotateX(72deg) rotateY(12deg)" spin={28} size="108%" opacity={0.55} />
        <OrbitRing tilt="rotateX(68deg) rotateY(-28deg)" spin={36} size="118%" opacity={0.35} />
        <OrbitRing tilt="rotateX(78deg) rotateY(45deg)" spin={22} size="95%" opacity={0.45} />
        <OrbitRing tilt="rotateX(60deg) rotateY(-55deg)" spin={42} size="125%" opacity={0.25} />
      </div>

      {/* Floating assets */}
      <GoldCoin className="left-[2%] top-[8%] z-30 blur-[0.5px] lg:left-[0%]" delay={0} size="lg" />
      <GoldCoin className="right-[4%] top-[15%] z-30" delay={1.5} size="md" />
      <GoldCoin className="bottom-[22%] left-[6%] z-30 opacity-70 blur-[1px]" delay={0.8} size="sm" />
      <GoldCoin className="bottom-[8%] right-[2%] z-30" delay={2} size="lg" />

      <PokerChip className="left-[12%] top-[55%] z-30 opacity-90" delay={0.3} />
      <PokerChip className="right-[8%] top-[48%] z-30" delay={1.1} />
      <PokerChip className="right-[18%] bottom-[28%] z-30 opacity-75 blur-[0.5px]" delay={1.7} />

      {/* Wireframe globe canvas */}
      <div className="relative aspect-square w-full">
        <WireframeCanvas className="absolute inset-0 h-full w-full" />

        {/* Inner holographic scan line */}
        <motion.div
          className="pointer-events-none absolute inset-[12%] rounded-full border border-cyan-400/10"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Equator highlight */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(34,211,238,0.15), transparent, rgba(212,175,55,0.1), transparent)",
          }}
        />
      </div>

      {/* Ground reflection */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-16 w-[70%] -translate-x-1/2 translate-y-1/2 rounded-[100%] bg-cyan-500/10 blur-2xl" />
    </div>
  );
}
