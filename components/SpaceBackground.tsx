"use client";

import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  flickerSpeed: number;
  phase: number;
  sparkLife: number;
  sparkMaxLife: number;
  isStreaking: boolean;
  streakAngle: number;
  streakLength: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let isVisible = true;
    let prefersReducedMotion = false;

    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia) {
      prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    const sparks: Spark[] = [];

    // Electric color palette: pure electric white, cyan spark, neon violet spark
    const colorPalette = [
      "rgba(255, 255, 255,",   // Pure electric white
      "rgba(34, 211, 238,",    // Electric Cyan (#22d3ee)
      "rgba(56, 189, 248,",    // Sky Blue (#38bdf8)
      "rgba(168, 85, 247,",   // Electric Violet (#a855f7)
      "rgba(192, 132, 252,",   // Light Purple (#c084fc)
    ];

    function initSparks() {
      sparks.length = 0;
      // Controlled density for a calm, premium atmosphere
      const sparkCount = Math.min(Math.floor((width * height) / 10500), 160);

      for (let i = 0; i < sparkCount; i++) {
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        const size = Math.random() * 0.8 + 0.45; // 0.45px to 1.25px microscopic scale
        const baseAlpha = Math.random() * 0.55 + 0.2;

        sparks.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          size,
          baseAlpha,
          alpha: baseAlpha,
          color,
          flickerSpeed: Math.random() * 2.8 + 1.2,
          phase: Math.random() * Math.PI * 2,
          sparkLife: 0,
          sparkMaxLife: Math.random() * 120 + 80,
          isStreaking: Math.random() < 0.12,
          streakAngle: Math.random() * Math.PI * 2,
          streakLength: Math.random() * 2.5 + 1.5,
        });
      }
    }

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx?.scale(dpr, dpr);

      initSparks();
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    function handleVisibilityChange() {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        lastTime = performance.now();
        animRef.current = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animRef.current);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastTime = performance.now();

    function render(currentTime: number) {
      if (!ctx || !isVisible) return;

      const dt = Math.min((currentTime - lastTime) * 0.001, 0.1);
      lastTime = currentTime;

      // Deep, elegant technical canvas background
      ctx.fillStyle = "#060813";
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric radial glow layers (deep purple/cyan depth)
      const grad1 = ctx.createRadialGradient(
        width * 0.75,
        height * 0.2,
        0,
        width * 0.75,
        height * 0.2,
        width * 0.55
      );
      grad1.addColorStop(0, "rgba(139, 92, 246, 0.07)");
      grad1.addColorStop(0.5, "rgba(34, 211, 238, 0.025)");
      grad1.addColorStop(1, "rgba(6, 8, 19, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.8,
        0,
        width * 0.2,
        height * 0.8,
        width * 0.45
      );
      grad2.addColorStop(0, "rgba(34, 211, 238, 0.04)");
      grad2.addColorStop(1, "rgba(6, 8, 19, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      const timeSec = currentTime * 0.001;

      // Render microscopic lightning sparks & micro-streaks
      for (let i = 0; i < sparks.length; i++) {
        const p = sparks[i];

        if (!prefersReducedMotion) {
          // Slow organic drift with subtle electric jitter
          p.x += p.vx + (Math.sin(timeSec * 1.5 + p.phase) * 0.08);
          p.y += p.vy + (Math.cos(timeSec * 1.5 + p.phase) * 0.08);

          // Wrap edges smoothly
          if (p.x < -5) p.x = width + 5;
          else if (p.x > width + 5) p.x = -5;
          if (p.y < -5) p.y = height + 5;
          else if (p.y > height + 5) p.y = -5;

          // Electrical flicker & brief micro-pulse
          p.phase += dt * p.flickerSpeed;
          const flicker = (Math.sin(p.phase) + 1) * 0.5;
          p.alpha = p.baseAlpha * (0.4 + flicker * 0.6);

          p.sparkLife++;
          if (p.sparkLife > p.sparkMaxLife) {
            p.sparkLife = 0;
            p.sparkMaxLife = Math.random() * 120 + 80;
            p.isStreaking = Math.random() < 0.15; // occasional micro-spark
            p.streakAngle = Math.random() * Math.PI * 2;
          }
        }

        // Draw micro-spark point
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        // Rare microscopic lightning micro-streak (1–3px angular spark line)
        if (p.isStreaking && p.alpha > 0.45) {
          const streakLen = p.streakLength;
          ctx.strokeStyle = `${p.color} ${p.alpha * 0.85})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(
            p.x + Math.cos(p.streakAngle) * streakLen,
            p.y + Math.sin(p.streakAngle) * streakLen
          );
          ctx.stroke();
        }

        // Ultra-subtle proximity neural connection threads (only for very close neighbors)
        for (let j = i + 1; j < sparks.length; j++) {
          const p2 = sparks[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 58;

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.055 * Math.min(p.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animRef.current = requestAnimationFrame(render);
      }
    }

    if (prefersReducedMotion) {
      render(performance.now());
    } else {
      animRef.current = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        maxWidth: "100vw",
        maxHeight: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        contain: "strict",
      }}
    />
  );
}
