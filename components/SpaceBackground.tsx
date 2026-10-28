"use client";

import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let isVisible = !document.hidden;
    let prefersReducedMotion = false;

    // Mouse position for subtle spotlight / interactive grid illumination
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    /* =========================================================
       REDUCED MOTION QUERY
    ========================================================= */
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion = motionQuery.matches;

    const handleMotionPreference = () => {
      prefersReducedMotion = motionQuery.matches;
      if (prefersReducedMotion && animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
        render(performance.now());
      } else if (isVisible && animationRef.current === null) {
        animationRef.current = requestAnimationFrame(render);
      }
    };
    motionQuery.addEventListener("change", handleMotionPreference);

    /* =========================================================
       CANVAS RESIZE
    ========================================================= */
    const GRID_SIZE = 56;
    const STRIPE_SPACING = 84;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (prefersReducedMotion) {
        render(performance.now());
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    /* =========================================================
       MOUSE MOVEMENT
    ========================================================= */
    function handleMouseMove(e: MouseEvent) {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (mouse.x < 0) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    /* =========================================================
       VISIBILITY CHANGE
    ========================================================= */
    function handleVisibilityChange() {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        if (animationRef.current === null) {
          animationRef.current = requestAnimationFrame(render);
        }
      } else if (!isVisible && animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    /* =========================================================
       SUBTLE DATA PACKETS
    ========================================================= */
    interface DataPulse {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      life: number;
      maxLife: number;
    }

    const pulses: DataPulse[] = [];
    let lastPulseTime = 0;

    function spawnPulse() {
      if (pulses.length >= 4) return;
      const isHorizontal = Math.random() > 0.3;
      const speed = 1.8 + Math.random() * 2.0;

      if (isHorizontal) {
        const lineY = Math.floor(Math.random() * (height / STRIPE_SPACING)) * STRIPE_SPACING;
        pulses.push({
          x: -80,
          y: lineY,
          vx: speed,
          vy: 0,
          length: 60 + Math.random() * 90,
          life: 0,
          maxLife: width + 160,
        });
      } else {
        const lineX = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
        pulses.push({
          x: lineX,
          y: -80,
          vx: 0,
          vy: speed,
          length: 60 + Math.random() * 90,
          life: 0,
          maxLife: height + 160,
        });
      }
    }

    /* =========================================================
       DRAW PROCEDURAL BACKGROUND (CLEAN OBSIDIAN + SUBTLE GRID)
    ========================================================= */
    function drawBackground(timeSec: number) {
      if (!ctx) return;

      // 1. Deep solid obsidian base
      ctx.fillStyle = "#090a0f";
      ctx.fillRect(0, 0, width, height);

      // 2. Soft, ambient glow behind right visual stage
      const rightGlow = ctx.createRadialGradient(
        width * 0.74, height * 0.45, 0,
        width * 0.74, height * 0.45, Math.min(width, height) * 0.55
      );
      rightGlow.addColorStop(0, "rgba(54, 247, 249, 0.07)");
      rightGlow.addColorStop(0.5, "rgba(54, 247, 249, 0.018)");
      rightGlow.addColorStop(1, "rgba(9, 10, 15, 0)");
      ctx.fillStyle = rightGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle interactive mouse spotlight
      if (mouse.x > 0 && mouse.y > 0) {
        const spot = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 280
        );
        spot.addColorStop(0, "rgba(54, 247, 249, 0.05)");
        spot.addColorStop(0.6, "rgba(54, 247, 249, 0.01)");
        spot.addColorStop(1, "rgba(9, 10, 15, 0)");
        ctx.fillStyle = spot;
        ctx.fillRect(0, 0, width, height);
      }

      // 4. Clean, subtle technical blueprint grid (No harsh crosses or clutter)
      ctx.save();
      ctx.lineWidth = 0.75;

      // Vertical grid lines
      for (let x = 0; x <= width; x += GRID_SIZE) {
        const distFromMouse = Math.abs(x - mouse.x);
        let alpha = 0.03;
        if (distFromMouse < 180) {
          alpha += (1 - distFromMouse / 180) * 0.035;
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = 0; y <= height; y += GRID_SIZE) {
        const distFromMouse = Math.abs(y - mouse.y);
        let alpha = 0.03;
        if (distFromMouse < 180) {
          alpha += (1 - distFromMouse / 180) * 0.035;
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
        ctx.stroke();
      }
      ctx.restore();

      // 5. Very subtle drifting cyber scanlines (Seen lightly, elegant & quiet)
      if (!prefersReducedMotion) {
        ctx.save();
        const drift = (timeSec * 14) % STRIPE_SPACING;

        for (let y = -STRIPE_SPACING + drift; y <= height + STRIPE_SPACING; y += STRIPE_SPACING) {
          const wave = Math.sin(y * 0.015 + timeSec * 0.5);
          const alpha = 0.03 + wave * 0.015;

          ctx.strokeStyle = `rgba(54, 247, 249, ${Math.max(0.015, alpha).toFixed(3)})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(0, y + 0.5);
          ctx.lineTo(width, y + 0.5);
          ctx.stroke();
        }
        ctx.restore();

        // 6. Occasional gentle data pulses along grid lines
        ctx.save();
        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life += Math.hypot(p.vx, p.vy);

          const tailX = p.vx !== 0 ? p.x - p.length : p.x;
          const tailY = p.vy !== 0 ? p.y - p.length : p.y;

          const pGrad = ctx.createLinearGradient(tailX, tailY, p.x, p.y);
          pGrad.addColorStop(0, "rgba(54, 247, 249, 0)");
          pGrad.addColorStop(0.8, "rgba(54, 247, 249, 0.35)");
          pGrad.addColorStop(1, "rgba(255, 255, 255, 0.75)");

          ctx.strokeStyle = pGrad;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(tailX + 0.5, tailY + 0.5);
          ctx.lineTo(p.x + 0.5, p.y + 0.5);
          ctx.stroke();

          // Subtle head dot
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x + 0.5, p.y + 0.5, 1, 0, Math.PI * 2);
          ctx.fill();

          if (p.life >= p.maxLife) {
            pulses.splice(i, 1);
          }
        }
        ctx.restore();
      }
    }

    /* =========================================================
       MAIN RENDER LOOP
    ========================================================= */
    function render(currentTime: number) {
      if (!isVisible) return;

      const timeSec = currentTime * 0.001;

      // Mouse smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Spawn pulses along stripes periodically
      if (timeSec - lastPulseTime > 2.8 && Math.random() < 0.04) {
        spawnPulse();
        lastPulseTime = timeSec;
      }

      drawBackground(timeSec);

      if (!prefersReducedMotion && isVisible) {
        animationRef.current = requestAnimationFrame(render);
      } else {
        animationRef.current = null;
      }
    }

    /* =========================================================
       START
    ========================================================= */
    if (prefersReducedMotion) {
      render(performance.now());
    } else {
      animationRef.current = requestAnimationFrame(render);
    }

    /* =========================================================
       CLEANUP
    ========================================================= */
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        maxWidth: "100vw",
        maxHeight: "100vh",
        pointerEvents: "none",
        zIndex: -1,
        display: "block",
        contain: "strict",
      }}
    />
  );
}