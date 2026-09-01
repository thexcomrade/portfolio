"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  cr: number;
  cg: number;
  cb: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function generateStars(w: number, h: number) {
      const stars: Star[] = [];
      const count = Math.min(Math.floor((w * h) / 750), 2200);

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let cr: number, cg: number, cb: number;

        if (rand < 0.6) {
          cr = 255; cg = 255; cb = 255; // Pure Crisp White
        } else if (rand < 0.82) {
          cr = 56; cg = 189; cb = 248;  // Cyan Accent
        } else if (rand < 0.93) {
          cr = 168; cg = 85; cb = 247;  // Neon Purple Accent
        } else {
          cr = 254; cg = 78; cb = 3;    // Electric Flame Orange Accent (#fe4e03)
        }

        // Tiny sharp particles: mostly 0.3px to 1.2px
        const size = Math.random() < 0.88 ? Math.random() * 0.9 + 0.35 : Math.random() * 1.5 + 1.1;

        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size,
          baseOpacity: Math.random() * 0.75 + 0.25,
          twinkleSpeed: Math.random() * 2.5 + 0.6,
          cr, cg, cb,
        });
      }

      starsRef.current = stars;
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars(canvas.width, canvas.height);
    }

    resize();
    window.addEventListener("resize", resize);

    let isVisible = true;

    function handleVisibilityChange() {
      isVisible = !document.hidden;
      if (isVisible) {
        animate();
      } else {
        cancelAnimationFrame(animRef.current);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    function animate() {
      if (!ctx || !canvas || !isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = performance.now() * 0.001;

      // Pure deep space background with subtle cosmic glow gradients
      const nebula1 = ctx.createRadialGradient(
        canvas.width * 0.82,
        canvas.height * 0.25,
        0,
        canvas.width * 0.82,
        canvas.height * 0.25,
        canvas.width * 0.55
      );
      nebula1.addColorStop(0, "rgba(139, 92, 246, 0.14)");
      nebula1.addColorStop(0.5, "rgba(56, 189, 248, 0.06)");
      nebula1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.15,
        canvas.height * 0.8,
        0,
        canvas.width * 0.15,
        canvas.height * 0.8,
        canvas.width * 0.45
      );
      nebula2.addColorStop(0, "rgba(254, 78, 3, 0.08)");
      nebula2.addColorStop(0.5, "rgba(34, 211, 238, 0.05)");
      nebula2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw high-density tiny twinkling star particles
      for (const star of starsRef.current) {
        const twinkle = (Math.sin(time * star.twinkleSpeed + star.x * 0.02 + star.y * 0.02) + 1) / 2;
        const opacity = star.baseOpacity * (0.3 + twinkle * 0.7);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.cr},${star.cg},${star.cb},${opacity})`;
        ctx.fill();

        if (star.size > 1.8) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.cr},${star.cg},${star.cb},${opacity * 0.2})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

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

