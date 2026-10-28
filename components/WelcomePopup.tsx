"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(6000);
  const DURATION = 6000; // 6 seconds

  useEffect(() => {
    startRef.current = performance.now();

    function tick(now: number) {
      if (!isPaused) {
        const elapsed = now - startRef.current;
        const remaining = Math.max(0, 1 - elapsed / remainingTimeRef.current);
        setProgress(remaining * 100);

        if (elapsed >= remainingTimeRef.current) {
          setIsVisible(false);
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    startRef.current = performance.now();
    remainingTimeRef.current = (progress / 100) * DURATION;
    setIsPaused(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.94 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 28,
            mass: 0.8,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 9999,
            width: "min(92vw, 360px)",
            background: "rgba(11, 13, 18, 0.92)",
            border: "1px solid rgba(229, 71, 4, 0.35)",
            borderRadius: "16px",
            padding: "20px 22px 18px",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 24px 60px rgba(0, 0, 0, 0.75), 0 0 24px rgba(229, 71, 4, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            overflow: "hidden",
            pointerEvents: "auto",
          }}
        >
          {/* Top glowing orange accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, #e54704, #ff7a18, transparent)",
              boxShadow: "0 0 10px rgba(229, 71, 4, 0.8)",
            }}
          />

          {/* Header row: Status + Close button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "3px 10px",
                borderRadius: "999px",
                background: "rgba(34, 197, 94, 0.08)",
                border: "1px solid rgba(34, 197, 94, 0.25)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  color: "#22c55e",
                  textTransform: "uppercase",
                }}
              >
                AVAILABLE FOR ROLES
              </span>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              aria-label="Close greeting"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                color: "#94a3b8",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "#e54704";
                e.currentTarget.style.background = "rgba(229, 71, 4, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
              }}
            >
              <X size={13} aria-hidden="true" />
            </button>
          </div>

          {/* Greeting message */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background: "rgba(54, 247, 249, 0.1)",
                border: "1px solid rgba(54, 247, 249, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#36f7f9",
                flexShrink: 0,
              }}
            >
              <Sparkles size={18} aria-hidden="true" />
            </div>
            <div>
              <h4
                style={{
                  margin: "0 0 4px",
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                }}
              >
                Welcome to my Portfolio
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.78rem",
                  color: "#94a3b8",
                  lineHeight: 1.5,
                }}
              >
                I&apos;m <span style={{ color: "#ff8c38", fontWeight: 700 }}>Devanarayanan</span>.
                Explore my production AI models, machine learning pipelines, and robotics below.
              </p>
            </div>
          </div>

          {/* Quick CTA row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "14px",
              paddingTop: "10px",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <a
              href="#projects"
              onClick={() => setIsVisible(false)}
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "#e54704",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ff7a18";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#e54704";
              }}
            >
              <span>VIEW WORK</span>
              <ArrowRight size={13} aria-hidden="true" />
            </a>

            <span
              style={{
                fontSize: "0.65rem",
                color: "#64748b",
              }}
            >
              {isPaused ? "Paused" : "Auto-dismisses in 6s"}
            </span>
          </div>

          {/* Countdown bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2.5px",
              background: "rgba(255, 255, 255, 0.04)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #e54704, #ff7a18)",
                boxShadow: "0 0 8px rgba(229, 71, 4, 0.6)",
                transition: "width 0.1s linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
