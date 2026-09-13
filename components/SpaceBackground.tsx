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
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const rawCanvas = canvasRef.current;

    if (!rawCanvas) return;

    const rawContext = rawCanvas.getContext("2d", {
      alpha: true,
    });

    if (!rawContext) return;

    // Keep non-null aliases for callbacks declared below.
    const canvasElement: HTMLCanvasElement = rawCanvas;
    const context: CanvasRenderingContext2D = rawContext;

    let width = 0;
    let height = 0;

    let isVisible = !document.hidden;
    let prefersReducedMotion = false;

    /* =========================================================
       REDUCED MOTION
    ========================================================= */

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    prefersReducedMotion = motionQuery.matches;

    const handleMotionPreference = () => {
      prefersReducedMotion = motionQuery.matches;

      if (prefersReducedMotion) {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }

        render(performance.now());
      } else if (isVisible) {
        lastTime = performance.now();

        if (animationRef.current === null) {
          animationRef.current =
            requestAnimationFrame(render);
        }
      }
    };

    motionQuery.addEventListener(
      "change",
      handleMotionPreference
    );

    /* =========================================================
       COLOR SYSTEM
       Matches the portfolio:
       - electric cyan
       - soft violet
       - sky blue
       - pure white
    ========================================================= */

    const colorPalette = [
      "rgba(255, 255, 255,",
      "rgba(34, 211, 238,",
      "rgba(56, 189, 248,",
      "rgba(129, 140, 248,",
      "rgba(168, 85, 247,",
      "rgba(192, 132, 252,",
    ];

    const sparks: Spark[] = [];

    /* =========================================================
       PARTICLE CONFIGURATION
    ========================================================= */

    const MAX_SPARKS = 155;

    const CONNECTION_DISTANCE = 72;

    const CONNECTION_DISTANCE_SQ =
      CONNECTION_DISTANCE *
      CONNECTION_DISTANCE;

    /* =========================================================
       INITIALIZE PARTICLES
    ========================================================= */

    function initSparks() {
      sparks.length = 0;

      const area = width * height;

      /*
       * Calm density:
       * large screens receive more particles,
       * small screens remain lightweight.
       */
      const calculatedCount = Math.floor(
        area / 11500
      );

      const sparkCount = Math.min(
        Math.max(calculatedCount, 55),
        MAX_SPARKS
      );

      for (let i = 0; i < sparkCount; i++) {
        const color =
          colorPalette[
            Math.floor(
              Math.random() *
                colorPalette.length
            )
          ];

        const size =
          Math.random() * 0.75 + 0.45;

        const baseAlpha =
          Math.random() * 0.42 + 0.12;

        sparks.push({
          x: Math.random() * width,

          y: Math.random() * height,

          /*
           * Very slow movement.
           * The background should feel atmospheric,
           * not like a particle simulation.
           */
          vx:
            (Math.random() - 0.5) *
            0.16,

          vy:
            (Math.random() - 0.5) *
            0.16,

          size,

          baseAlpha,

          alpha: baseAlpha,

          color,

          flickerSpeed:
            Math.random() * 1.8 + 0.8,

          phase:
            Math.random() *
            Math.PI *
            2,

          sparkLife: Math.random() * 160,

          sparkMaxLife:
            Math.random() * 180 + 120,

          /*
           * Only a small percentage become
           * tiny directional electric streaks.
           */
          isStreaking:
            Math.random() < 0.075,

          streakAngle:
            Math.random() *
            Math.PI *
            2,

          streakLength:
            Math.random() * 3 + 1.5,
        });
      }
    }

    /* =========================================================
       RESIZE
    ========================================================= */

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      /*
       * IMPORTANT:
       * setTransform() resets the previous scale.
       *
       * This prevents the old ctx.scale() bug where
       * every window resize multiplied the canvas scale.
       */
      canvasElement.width =
        Math.floor(width * dpr);

      canvasElement.height =
        Math.floor(height * dpr);

      canvasElement.style.width =
        `${width}px`;

      canvasElement.style.height =
        `${height}px`;

      context.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      initSparks();
    }

    resize();

    window.addEventListener(
      "resize",
      resize,
      { passive: true }
    );

    /* =========================================================
       VISIBILITY
    ========================================================= */

    function handleVisibilityChange() {
      isVisible =
        !document.hidden;

      if (!isVisible) {
        if (
          animationRef.current !==
          null
        ) {
          cancelAnimationFrame(
            animationRef.current
          );

          animationRef.current =
            null;
        }

        return;
      }

      lastTime =
        performance.now();

      if (
        !prefersReducedMotion &&
        animationRef.current === null
      ) {
        animationRef.current =
          requestAnimationFrame(
            render
          );
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    /* =========================================================
       BACKGROUND ATMOSPHERE
    ========================================================= */

    function drawAtmosphere() {
      /*
       * Deep navy base.
       *
       * This complements the hero artwork without
       * fighting with the bright blue / cyan image.
       */
      context.fillStyle =
        "#050813";

      context.fillRect(
        0,
        0,
        width,
        height
      );

      /* -------------------------------------------------------
         Upper-right violet atmosphere
      ------------------------------------------------------- */

      const violetGlow =
        context.createRadialGradient(
          width * 0.78,
          height * 0.18,
          0,
          width * 0.78,
          height * 0.18,
          width * 0.58
        );

      violetGlow.addColorStop(
        0,
        "rgba(139, 92, 246, 0.075)"
      );

      violetGlow.addColorStop(
        0.35,
        "rgba(99, 102, 241, 0.035)"
      );

      violetGlow.addColorStop(
        0.7,
        "rgba(34, 211, 238, 0.012)"
      );

      violetGlow.addColorStop(
        1,
        "rgba(5, 8, 19, 0)"
      );

      context.fillStyle =
        violetGlow;

      context.fillRect(
        0,
        0,
        width,
        height
      );

      /* -------------------------------------------------------
         Central cyan atmosphere
      ------------------------------------------------------- */

      const cyanGlow =
        context.createRadialGradient(
          width * 0.63,
          height * 0.55,
          0,
          width * 0.63,
          height * 0.55,
          width * 0.52
        );

      cyanGlow.addColorStop(
        0,
        "rgba(34, 211, 238, 0.045)"
      );

      cyanGlow.addColorStop(
        0.35,
        "rgba(56, 189, 248, 0.022)"
      );

      cyanGlow.addColorStop(
        0.7,
        "rgba(34, 211, 238, 0.008)"
      );

      cyanGlow.addColorStop(
        1,
        "rgba(5, 8, 19, 0)"
      );

      context.fillStyle =
        cyanGlow;

      context.fillRect(
        0,
        0,
        width,
        height
      );

      /* -------------------------------------------------------
         Bottom blue atmosphere
      ------------------------------------------------------- */

      const bottomGlow =
        context.createRadialGradient(
          width * 0.58,
          height * 1.02,
          0,
          width * 0.58,
          height * 1.02,
          width * 0.62
        );

      bottomGlow.addColorStop(
        0,
        "rgba(37, 99, 235, 0.055)"
      );

      bottomGlow.addColorStop(
        0.4,
        "rgba(30, 64, 175, 0.018)"
      );

      bottomGlow.addColorStop(
        1,
        "rgba(5, 8, 19, 0)"
      );

      context.fillStyle =
        bottomGlow;

      context.fillRect(
        0,
        0,
        width,
        height
      );
    }

    /* =========================================================
       MICRO GRID / TECHNICAL ATMOSPHERE
    ========================================================= */

    function drawTechnicalAtmosphere(
      timeSec: number
    ) {
      /*
       * Extremely subtle horizontal technical lines.
       * These should almost disappear into the background.
       */

      const spacing = 120;

      const drift =
        prefersReducedMotion
          ? 0
          : (timeSec * 2) % spacing;

      context.save();

      context.lineWidth = 0.5;

      for (
        let y = -spacing + drift;
        y < height + spacing;
        y += spacing
      ) {
        const alpha =
          0.018 +
          Math.sin(
            y * 0.02 +
              timeSec * 0.25
          ) *
            0.006;

        context.strokeStyle =
          `rgba(56, 189, 248, ${alpha})`;

        context.beginPath();

        context.moveTo(
          0,
          y
        );

        context.lineTo(
          width,
          y
        );

        context.stroke();
      }

      context.restore();
    }

    /* =========================================================
       DRAW PARTICLES
    ========================================================= */

    function drawSparks(
      timeSec: number,
      dt: number
    ) {
      for (
        let i = 0;
        i < sparks.length;
        i++
      ) {
        const p = sparks[i];

        if (!prefersReducedMotion) {
          /*
           * Organic micro movement.
           */
          p.x +=
            p.vx +
            Math.sin(
              timeSec * 0.65 +
                p.phase
            ) *
              0.035;

          p.y +=
            p.vy +
            Math.cos(
              timeSec * 0.55 +
                p.phase
            ) *
              0.035;

          /* Wrap */
          if (p.x < -6) {
            p.x = width + 6;
          } else if (
            p.x >
            width + 6
          ) {
            p.x = -6;
          }

          if (p.y < -6) {
            p.y = height + 6;
          } else if (
            p.y >
            height + 6
          ) {
            p.y = -6;
          }

          /* Flicker */
          p.phase +=
            dt *
            p.flickerSpeed;

          const flicker =
            (Math.sin(
              p.phase
            ) +
              1) /
            2;

          p.alpha =
            p.baseAlpha *
            (0.38 +
              flicker * 0.62);

          /* Spark lifetime */
          p.sparkLife +=
            dt * 60;

          if (
            p.sparkLife >
            p.sparkMaxLife
          ) {
            p.sparkLife = 0;

            p.sparkMaxLife =
              Math.random() *
                180 +
              120;

            p.isStreaking =
              Math.random() <
              0.075;

            p.streakAngle =
              Math.random() *
              Math.PI *
              2;

            p.streakLength =
              Math.random() *
                3 +
              1.5;
          }
        }

        /* -----------------------------------------------------
           Tiny glow
        ----------------------------------------------------- */

        if (p.size > 0.9) {
          const glow =
            context.createRadialGradient(
              p.x,
              p.y,
              0,
              p.x,
              p.y,
              p.size * 5
            );

          glow.addColorStop(
            0,
            `${p.color} ${
              p.alpha * 0.32
            })`
          );

          glow.addColorStop(
            1,
            `${p.color} 0)`
          );

          context.fillStyle =
            glow;

          context.fillRect(
            p.x - p.size * 5,
            p.y - p.size * 5,
            p.size * 10,
            p.size * 10
          );
        }

        /* -----------------------------------------------------
           Main spark
        ----------------------------------------------------- */

        context.fillStyle =
          `${p.color} ${p.alpha})`;

        context.fillRect(
          p.x,
          p.y,
          p.size,
          p.size
        );

        /* -----------------------------------------------------
           Occasional micro streak
        ----------------------------------------------------- */

        if (
          p.isStreaking &&
          p.alpha > 0.42
        ) {
          const length =
            p.streakLength;

          context.strokeStyle =
            `${p.color} ${
              p.alpha * 0.75
            })`;

          context.lineWidth = 0.6;

          context.beginPath();

          context.moveTo(
            p.x,
            p.y
          );

          context.lineTo(
            p.x +
              Math.cos(
                p.streakAngle
              ) *
                length,
            p.y +
              Math.sin(
                p.streakAngle
              ) *
                length
          );

          context.stroke();
        }
      }
    }

    /* =========================================================
       SUBTLE NEURAL CONNECTIONS
    ========================================================= */

    function drawConnections() {
      /*
       * Keep this deliberately restrained.
       *
       * Only connect nearby particles and use extremely
       * low opacity so the page doesn't look like a
       * generic particle-network template.
       */

      for (
        let i = 0;
        i < sparks.length;
        i++
      ) {
        const p1 = sparks[i];

        for (
          let j = i + 1;
          j < sparks.length;
          j++
        ) {
          const p2 = sparks[j];

          const dx =
            p1.x - p2.x;

          const dy =
            p1.y - p2.y;

          const distanceSq =
            dx * dx +
            dy * dy;

          if (
            distanceSq >
            CONNECTION_DISTANCE_SQ
          ) {
            continue;
          }

          const distance =
            Math.sqrt(
              distanceSq
            );

          const strength =
            1 -
            distance /
              CONNECTION_DISTANCE;

          const alpha =
            strength *
            0.045 *
            Math.min(
              p1.alpha,
              p2.alpha
            );

          if (alpha <= 0.002) {
            continue;
          }

          context.strokeStyle =
            `rgba(129, 140, 248, ${alpha})`;

          context.lineWidth = 0.45;

          context.beginPath();

          context.moveTo(
            p1.x,
            p1.y
          );

          context.lineTo(
            p2.x,
            p2.y
          );

          context.stroke();
        }
      }
    }

    /* =========================================================
       OCCASIONAL ELECTRIC PULSE
    ========================================================= */

    function drawElectricPulse(
      timeSec: number
    ) {
      /*
       * Very soft moving atmospheric pulse.
       * It gives the background a sense of life without
       * creating distracting visible shapes.
       */

      if (prefersReducedMotion) {
        return;
      }

      const pulse =
        (Math.sin(
          timeSec * 0.35
        ) +
          1) /
        2;

      const radius =
        Math.min(
          width,
          height
        ) *
        (0.24 +
          pulse * 0.035);

      const x =
        width *
        (0.68 +
          Math.sin(
            timeSec * 0.08
          ) *
            0.025);

      const y =
        height *
        (0.46 +
          Math.cos(
            timeSec * 0.1
          ) *
            0.025);

      const gradient =
        context.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          radius
        );

      gradient.addColorStop(
        0,
        `rgba(34, 211, 238, ${
          0.012 +
          pulse * 0.012
        })`
      );

      gradient.addColorStop(
        0.5,
        "rgba(56, 189, 248, 0.004)"
      );

      gradient.addColorStop(
        1,
        "rgba(34, 211, 238, 0)"
      );

      context.fillStyle =
        gradient;

      context.fillRect(
        0,
        0,
        width,
        height
      );
    }

    /* =========================================================
       RENDER LOOP
    ========================================================= */

    let lastTime =
      performance.now();

    function render(
      currentTime: number
    ) {
      if (!isVisible) {
        return;
      }

      const dt = Math.min(
        (currentTime -
          lastTime) *
          0.001,
        0.1
      );

      lastTime =
        currentTime;

      const timeSec =
        currentTime * 0.001;

      /* Background */
      drawAtmosphere();

      /* Technical atmosphere */
      drawTechnicalAtmosphere(
        timeSec
      );

      /* Very soft moving light */
      drawElectricPulse(
        timeSec
      );

      /* Connections first */
      drawConnections();

      /* Sparks over connections */
      drawSparks(
        timeSec,
        dt
      );

      if (
        !prefersReducedMotion &&
        isVisible
      ) {
        animationRef.current =
          requestAnimationFrame(
            render
          );
      } else {
        animationRef.current =
          null;
      }
    }

    /* =========================================================
       START
    ========================================================= */

    if (prefersReducedMotion) {
      render(
        performance.now()
      );
    } else {
      animationRef.current =
        requestAnimationFrame(
          render
        );
    }

    /* =========================================================
       CLEANUP
    ========================================================= */

    return () => {
      if (
        animationRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationRef.current
        );

        animationRef.current =
          null;
      }

      window.removeEventListener(
        "resize",
        resize
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      motionQuery.removeEventListener(
        "change",
        handleMotionPreference
      );
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

        /*
         * Keep the canvas behind the portfolio UI.
         * Your page content remains interactive.
         */
        zIndex: -1,

        display: "block",

        /*
         * Prevent the canvas from becoming part
         * of layout or generating unwanted scrolling.
         */
        contain: "strict",

        /*
         * Slightly blend the particles into the
         * dark portfolio environment.
         */
        mixBlendMode: "screen",
      }}
    />
  );
}