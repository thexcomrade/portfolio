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

    // Mouse coordinates for subtle interactive ambient lighting
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
    };

    /* =========================================================
       REDUCED MOTION CHECK
    ========================================================= */
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion = motionQuery.matches;

    const handleMotionPreference = () => {
      prefersReducedMotion = motionQuery.matches;
      if (prefersReducedMotion && animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
        renderStatic();
      } else if (isVisible && animationRef.current === null) {
        animationRef.current = requestAnimationFrame(render);
      }
    };
    motionQuery.addEventListener("change", handleMotionPreference);

    /* =========================================================
       SUBTLE AMBIENT GRAPHITE & ORANGE PHOTONS
    ========================================================= */
    interface AmbientNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      maxAlpha: number;
      pulseSpeed: number;
      color: string;
    }

    const nodes: AmbientNode[] = [];
    const NODE_COUNT = 38;

    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        const isOrange = i % 4 === 0;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          size: isOrange ? Math.random() * 1.5 + 1 : Math.random() * 1.2 + 0.6,
          alpha: Math.random() * 0.3 + 0.1,
          maxAlpha: isOrange ? 0.45 : 0.25,
          pulseSpeed: Math.random() * 0.012 + 0.005,
          color: isOrange ? "255, 122, 24" : "148, 163, 184",
        });
      }
    };

    /* =========================================================
       CANVAS RESIZE & PIXEL RATIO
    ========================================================= */
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initNodes();
      if (prefersReducedMotion) {
        renderStatic();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    /* =========================================================
       MOUSE TRACKING (SMOOTH INTERPOLATION)
    ========================================================= */
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (mouse.x < 0) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    /* =========================================================
       VISIBILITY OBSERVER
    ========================================================= */
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion && animationRef.current === null) {
        animationRef.current = requestAnimationFrame(render);
      } else if (!isVisible && animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    /* =========================================================
       STATIC RENDER FOR REDUCED MOTION
    ========================================================= */
    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep obsidian charcoal background
      ctx.fillStyle = "#07080b";
      ctx.fillRect(0, 0, width, height);

      // Draw stationary ambient nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color}, ${n.alpha * 0.7})`;
        ctx.fill();
      }
    };

    /* =========================================================
       ANIMATION LOOP (60FPS HARDWARE ACCELERATED)
    ========================================================= */
    const render = (currentTime: number) => {
      // Mouse position smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Base Obsidian Surface
      ctx.fillStyle = "#07080b";
      ctx.fillRect(0, 0, width, height);

      // Subtle Warm Mouse Spotlight
      if (mouse.x > 0 && mouse.y > 0) {
        const spotlight = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          320
        );
        spotlight.addColorStop(0, "rgba(255, 122, 24, 0.04)");
        spotlight.addColorStop(0.5, "rgba(255, 122, 24, 0.015)");
        spotlight.addColorStop(1, "transparent");
        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw and animate ambient nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around boundaries
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Pulse alpha
        n.alpha = (Math.sin(currentTime * n.pulseSpeed * 0.1) * 0.5 + 0.5) * n.maxAlpha;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color}, ${n.alpha})`;
        ctx.fill();
      }

      if (isVisible && !prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(render);
      }
    };

    if (!prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(render);
    } else {
      renderStatic();
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      motionQuery.removeEventListener("change", handleMotionPreference);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
      aria-hidden="true"
    />
  );
}
