"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bitcoin, ShieldCheck, Trophy, Zap } from "lucide-react";
import { BG_IMAGE_1, BG_IMAGE_2 } from "./constants";
import FloatingCasinoCard from "./FloatingCasinoCard";
import RevealLayer from "./RevealLayer";
import ZeoneBetNavbar from "./ZeoneBetNavbar";

export default function ZeoneBetHero() {
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef(0);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const center = () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouse.current = { x: cx, y: cy };
      smooth.current = { x: cx, y: cy };
      setCursorPos({ x: cx, y: cy });
    };

    center();

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse.current.x = e.touches[0].clientX;
        mouse.current.y = e.touches[0].clientY;
      }
    };

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", center);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", center);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-black tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <section
        className="relative h-screen w-full overflow-hidden bg-black"
        style={{ height: "100dvh" }}
        aria-label="ZEONEBET casino intelligence hero"
      >
        <ZeoneBetNavbar />

        {/* Layer 1: Base image z-10 */}
        <div
          className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
          aria-hidden="true"
        />

        {/* Layer 2: Dark readability overlays z-20 */}
        <div
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/75 via-black/35 to-black/80"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_50%_40%,rgba(34,211,238,0.08),transparent_55%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_50%_85%,rgba(212,175,55,0.06),transparent_50%)]"
          aria-hidden="true"
        />

        {/* Layer 3: Reveal layer z-30 */}
        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        {/* Layer 4: Floating casino cards z-40 */}
        <div className="pointer-events-none absolute inset-0 z-40 hidden md:block">
          <FloatingCasinoCard
            title="Live Global Jackpot"
            value="$15,493,821+"
            icon={Zap}
            className="absolute left-[8%] top-[38%]"
          />
          <FloatingCasinoCard
            title="Verified Operators"
            icon={ShieldCheck}
            glow="cyan"
            className="absolute right-[8%] top-[36%]"
          />
          <FloatingCasinoCard
            title="Latest Winner"
            value="India · $74,000 Won"
            icon={Trophy}
            className="absolute bottom-[30%] left-[14%]"
          />
          <FloatingCasinoCard
            title="Crypto Accepted"
            value="BTC · ETH · USDT · SOL"
            icon={Bitcoin}
            glow="cyan"
            className="absolute bottom-[32%] right-[12%]"
          />
        </div>

        {/* Layer 5: Main heading + CTA z-50 */}
        <div className="pointer-events-none absolute left-0 right-0 top-[17%] z-50 flex flex-col items-center px-5 text-center">
          <p
            className="hero-anim hero-fade mb-4 max-w-lg text-xs font-medium uppercase tracking-[0.2em] text-cyan-400/90 sm:text-sm"
            style={{ animationDelay: "0.15s" }}
          >
            Trusted Casino Intelligence for South Asia &amp; Global Players
          </p>

          <h1 className="leading-[0.95] text-white">
            <span
              className="hero-anim hero-reveal font-display block text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl"
              style={{ letterSpacing: "-0.04em", animationDelay: "0.25s" }}
            >
              <span className="bg-gradient-to-r from-[#f4c542] via-[#d4af37] to-cyan-400 bg-clip-text text-transparent">
                Casino Intelligence
              </span>
            </span>
            <span
              className="hero-anim hero-reveal font-display -mt-1 block text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl"
              style={{ letterSpacing: "-0.06em", animationDelay: "0.42s" }}
            >
              Built For Winners
            </span>
          </h1>

          <p
            className="hero-anim hero-fade mt-6 max-w-[720px] text-sm leading-relaxed text-white/75 sm:text-base"
            style={{ animationDelay: "0.58s" }}
          >
            Discover verified casinos, real jackpot winners, exclusive bonuses, crypto payment guides,
            and trusted rankings before you play.
          </p>

          <div
            className="hero-anim hero-fade pointer-events-auto relative z-50 mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.72s" }}
          >
            <Link
              href="/casinos"
              className="hero-cta-gold w-full rounded-full px-8 py-3.5 text-center text-sm font-bold text-black sm:w-auto sm:min-w-[200px]"
            >
              Explore Trusted Casinos
            </Link>
            <Link
              href="/#bonuses"
              className="hero-cta-cyan w-full rounded-full px-8 py-3.5 text-center text-sm font-bold sm:w-auto sm:min-w-[180px]"
            >
              Claim Bonuses
            </Link>
            <Link
              href="/#jackpots"
              className="hero-cta-outline w-full rounded-full px-8 py-3.5 text-center text-sm font-bold sm:w-auto sm:min-w-[200px]"
            >
              View Jackpot Winners
            </Link>
          </div>
        </div>

        {/* Bottom-left paragraph */}
        <p
          className="hero-anim hero-fade pointer-events-none absolute bottom-14 left-10 z-50 hidden max-w-[280px] text-sm leading-relaxed text-white/55 sm:block md:left-14"
          style={{ animationDelay: "0.7s" }}
        >
          ZEONEBET compares casino operators using trust signals, bonus quality, payout speed,
          payment options, and responsible gambling standards.
        </p>

        {/* Bottom-right block */}
        <div
          className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-20 sm:left-auto sm:right-10 sm:max-w-[300px] sm:gap-5 md:right-14"
          style={{ animationDelay: "0.85s" }}
        >
          <p className="pointer-events-none text-sm leading-relaxed text-white/55">
            Move your cursor to reveal the premium casino layer behind ZEONEBET intelligence.
          </p>
          <Link
            href="/casinos"
            className="pointer-events-auto rounded-full bg-[#d4af37] px-7 py-3 text-sm font-semibold text-black transition-all hover:scale-[1.03] hover:bg-[#f4c542] hover:shadow-lg hover:shadow-[#d4af37]/30 active:scale-95"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
}
