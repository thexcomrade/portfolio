"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">

        {/* =====================================================
            LEFT CONTENT AREA (1:1 PIXEL MATCH TO REFERENCE)
        ====================================================== */}
        <div className="hero-left-content hero-fade-enter">

          {/* Availability Status Badge */}
          <div className="hero-status-badge">
            <span className="hero-status-dot" aria-hidden="true" />
            <span className="hero-status-text">AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          {/* Main Name — DEVA (solid bold pure white), NARAYANAN (crisp outline) */}
          <h1 className="hero-name-heading">
            <span className="hero-name-solid">DEVA</span>
            <span className="hero-name-outline">NARAYANAN</span>
          </h1>

          {/* Professional Role Bar */}
          <div className="hero-role-bar">
            <span className="hero-role-dash" aria-hidden="true" />
            <span>AI &amp; ML ENGINEER</span>
            <span className="hero-role-separator" aria-hidden="true">•</span>
            <span>DEVELOPER</span>
            <span className="hero-role-separator" aria-hidden="true">•</span>
            <span>RESEARCHER</span>
          </div>

          {/* Description Paragraph */}
          <p className="hero-description-text">
            Computer Science and AI graduate passionate about building intelligent
            web applications and machine learning pipelines. Focused on creating
            intuitive user experiences and developing scalable software for real-world impact.
          </p>

          {/* Action Buttons Row (Exact Match to Reference Theme) */}
          <div className="hero-actions-row">
            <a href="#projects" className="hero-cta-btn-primary">
              <span>VIEW PROJECTS</span>
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a href="#contact" className="hero-cta-btn-secondary">
              <span>RESUME</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          {/* Quick Metrics (Exact Match to Reference Theme) */}
          <div className="hero-metrics-row">
            <div className="hero-metric-target" aria-hidden="true">
              <span className="hero-metric-dot" />
            </div>
            <div className="hero-metric-item">
              <span className="hero-metric-value">3+</span>
              <span className="hero-metric-label">PROJECTS BUILT</span>
            </div>
            <div className="hero-metric-item">
              <span className="hero-metric-value">B.Tech</span>
              <span className="hero-metric-label">AI &amp; ML ENGINEERING</span>
            </div>
          </div>

        </div>

        {/* =====================================================
            RIGHT VISUAL STAGE (STRICTLY CONSTRAINED BOUNDING BOX)
        ====================================================== */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="hero-visual-stage"
          style={{
            transform: isHovered
              ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
              : "perspective(1000px) rotateY(0deg) rotateX(0deg)",
          }}
        >
          {/* Deep Cyan Atmospheric Glow Aura */}
          <div className="hero-stage-ambient-glow" aria-hidden="true" />

          {/* Inner Stage Frame with exact 3464 / 2309 aspect ratio */}
          <div className="hero-stage-frame">

            {/* Layer 1: Background Typography Artwork (back.png with dual Orange & Blue glow) */}
            <div
              className="hero-layer-back hero-back-revealed"
              style={{
                transform: isHovered
                  ? `translate3d(${tilt.x * -0.6}px, ${tilt.y * -0.6}px, 0)`
                  : "translate3d(0, 0, 0)",
              }}
            >
              <Image
                src="/back.png"
                alt="DEVA NARAYANAN Typography"
                width={3464}
                height={2309}
                priority
                unoptimized
                className="hero-back-img"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 55vw"
              />
            </div>

            {/* Layer 2: Glowing Cyan Orbital Ellipse Ring */}
            <div className="hero-orbital-ring" aria-hidden="true">
              <span className="hero-orbital-spark" />
            </div>

            {/* Layer 3: Foreground Person (nanu.png) */}
            <div
              className="hero-layer-person hero-person-revealed"
              style={{
                transform: isHovered
                  ? `translate3d(${tilt.x * 1.2}px, ${tilt.y * 1.2}px, 0)`
                  : "translate3d(0, 0, 0)",
              }}
            >
              <Image
                src="/nanu.png"
                alt="Devanarayanan"
                width={3464}
                height={2309}
                priority
                unoptimized
                className="hero-person-img"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 55vw"
              />
            </div>

            {/* Layer 4: Volumetric Bottom Mist Blend */}
            <div className="hero-bottom-mist" aria-hidden="true" />

            {/* Layer 5: Technical Telemetry (Repositioned in Off-White) */}
            {/* Lower-left impact quote — Cleanly visible in off-white */}
            <div className="hero-telemetry-left" aria-hidden="true">
              <span className="hero-quote-line">TURNING</span>
              <span className="hero-quote-line">IDEAS INTO</span>
              <span className="hero-quote-line">REAL IMPACT</span>
              <div className="hero-quote-accent" />
            </div>

            {/* Right telemetry stack — Cleanly visible in off-white */}
            <div className="hero-telemetry-right" aria-hidden="true">
              <div className="hero-telemetry-dash" />
              <span className="hero-telemetry-item">ML</span>
              <span className="hero-telemetry-item">DATA</span>
              <span className="hero-telemetry-item">SOLUTIONS</span>
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SCROLL DOWN INDICATOR (PERFECTLY IN THE MIDDLE)
      ====================================================== */}
      <a
        href="#about"
        className="hero-scroll-indicator"
        aria-label="Scroll down to About section"
      >
        <div className="hero-mouse-pill">
          <span className="hero-mouse-wheel-dot" />
        </div>
        <span className="hero-scroll-label">SCROLL DOWN</span>
      </a>

    </section>
  );
}