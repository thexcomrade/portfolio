"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100); // countdown bar 100→0
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const DURATION = 5000; // 5 seconds

  useEffect(() => {
    const dismiss = () => setIsVisible(false);

    // Dismiss instantly on any scroll or mouse move
    window.addEventListener("wheel", dismiss, { once: true, passive: true });
    window.addEventListener("touchmove", dismiss, { once: true, passive: true });
    window.addEventListener("mousemove", dismiss, { once: true });

    // Countdown animation via rAF
    startRef.current = performance.now();

    function tick(now: number) {
      const elapsed = now - startRef.current;
      const remaining = Math.max(0, 1 - elapsed / DURATION);
      setProgress(remaining * 100);

      if (elapsed < DURATION) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        dismiss();
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchmove", dismiss);
      window.removeEventListener("mousemove", dismiss);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        /* Full-screen overlay with centered card */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(3, 5, 17, 0.55)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            pointerEvents: "auto",
          }}
          onClick={() => setIsVisible(false)}
        >
          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -16 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(92vw, 420px)",
              background: "rgba(8, 12, 28, 0.92)",
              border: "1px solid rgba(139, 92, 246, 0.35)",
              borderRadius: "24px",
              padding: "36px 32px 28px",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              boxShadow:
                "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            {/* Top-edge gradient line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "15%",
                right: "15%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(34,211,238,0.8), rgba(139,92,246,0.8), transparent)",
              }}
            />

            {/* Greeting emoji */}
            <motion.div
              animate={{ rotate: [0, 14, -8, 14, 0] }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
              style={{ fontSize: "2.8rem", marginBottom: "14px", display: "block" }}
            >
              👋
            </motion.div>

            {/* Heading */}
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#ffffff",
                fontFamily: "var(--font-space), sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              Hi Sir / Mam!
            </h3>

            {/* Sub-text */}
            <p
              style={{
                margin: "0 0 24px",
                fontSize: "0.875rem",
                color: "#94a3b8",
                lineHeight: 1.6,
              }}
            >
              Welcome to my portfolio.
              <br />
              Explore my AI &amp; ML innovations below.
            </p>

            {/* Countdown bar */}
            <div
              style={{
                height: "3px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.07)",
                overflow: "hidden",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  borderRadius: "999px",
                  background: "linear-gradient(90deg, #8b5cf6, #22d3ee)",
                  boxShadow: "0 0 8px rgba(34,211,238,0.5)",
                  transition: "width 0.1s linear",
                }}
              />
            </div>

            {/* Hint */}
            <p
              style={{
                fontSize: "0.7rem",
                color: "#475569",
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              Scroll or move cursor to close · Auto-closes in 5s
            </p>

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              aria-label="Close welcome message"
              style={{
                position: "absolute",
                top: "14px",
                right: "16px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                color: "#64748b",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.95rem",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#64748b";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
