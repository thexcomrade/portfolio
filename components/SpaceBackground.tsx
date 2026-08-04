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
      const count = Math.min(Math.floor((w * h) / 2200), 850);

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let cr: number, cg: number, cb: number;

        if (rand < 0.5) {
          cr = 255; cg = 255; cb = 255; // Crisp White
        } else if (rand < 0.75) {
          cr = 34; cg = 211; cb = 238;  // Electric Cyan
        } else if (rand < 0.9) {
          cr = 168; cg = 85; cb = 247;  // Neon Purple
        } else {
          cr = 244; cg = 114; cb = 182; // Pink Aurora
        }

        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 2.2 + 0.4,
          baseOpacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 2.0 + 0.6,
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

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = performance.now() * 0.001;

      // Draw subtle space nebula gradients
      const bgGradient = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.2,
        0,
        canvas.width * 0.8,
        canvas.height * 0.2,
        canvas.width * 0.6
      );
      bgGradient.addColorStop(0, "rgba(139, 92, 246, 0.08)");
      bgGradient.addColorStop(0.5, "rgba(34, 211, 238, 0.04)");
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw twinkling stars
      for (const star of starsRef.current) {
        const twinkle = (Math.sin(time * star.twinkleSpeed + star.x * 0.01 + star.y * 0.01) + 1) / 2;
        const opacity = star.baseOpacity * (0.4 + twinkle * 0.6);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.cr},${star.cg},${star.cb},${opacity})`;
        ctx.fill();

        if (star.size > 1.4) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.cr},${star.cg},${star.cb},${opacity * 0.15})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
