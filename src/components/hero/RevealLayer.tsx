"use client";

import { useEffect, useRef, type ReactNode } from "react";

const SPOTLIGHT_R = 260;

interface RevealLayerProps {
  base: ReactNode;
  reveal: ReactNode;
  disabled?: boolean;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function RevealLayer({ base, reveal, disabled = false }: RevealLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRaw = useRef({ x: 0, y: 0 });
  const mouseSmooth = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const revealEl = revealRef.current;
    if (!container || !canvas || !revealEl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width, height };
    };

    let size = setCanvasSize();

    const initCenter = () => {
      size = setCanvasSize();
      mouseRaw.current = { x: size.width / 2, y: size.height / 2 };
      mouseSmooth.current = { x: size.width / 2, y: size.height / 2 };
    };

    initCenter();

    const drawMask = () => {
      if (!size) return;
      const { x, y } = mouseSmooth.current;

      ctx.clearRect(0, 0, size.width, size.height);

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, SPOTLIGHT_R);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.45, "rgba(255,255,255,0.55)");
      gradient.addColorStop(0.75, "rgba(255,255,255,0.15)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size.width, size.height);

      const maskUrl = canvas.toDataURL();
      revealEl.style.maskImage = `url(${maskUrl})`;
      revealEl.style.webkitMaskImage = `url(${maskUrl})`;
      revealEl.style.maskSize = "100% 100%";
      revealEl.style.webkitMaskSize = "100% 100%";
      revealEl.style.maskRepeat = "no-repeat";
      revealEl.style.webkitMaskRepeat = "no-repeat";
    };

    const loop = () => {
      mouseSmooth.current.x = lerp(mouseSmooth.current.x, mouseRaw.current.x, 0.1);
      mouseSmooth.current.y = lerp(mouseSmooth.current.y, mouseRaw.current.y, 0.1);
      drawMask();
      rafRef.current = requestAnimationFrame(loop);
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouseRaw.current.x = clientX - rect.left;
      mouseRaw.current.y = clientY - rect.top;
    };

    const onMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const ro = new ResizeObserver(() => initCenter());

    if (!disabled) {
      rafRef.current = requestAnimationFrame(loop);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove, { passive: true });
    } else {
      revealEl.style.maskImage = "none";
      revealEl.style.webkitMaskImage = "none";
      revealEl.style.opacity = "0.85";
    }

    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      ro.disconnect();
    };
  }, [disabled]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <div className="absolute inset-0 animate-heroZoom">{base}</div>
      <div ref={revealRef} className="absolute inset-0 will-change-[mask-image]">
        {reveal}
      </div>
      <canvas ref={canvasRef} className="pointer-events-none absolute left-0 top-0 opacity-0" aria-hidden="true" />
    </div>
  );
}
