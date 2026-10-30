"use client";

import { useState, useRef } from "react";
import Image from "next/image";

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
    <section id="home" className="ref-hero-section">
      {/* =====================================================
          TECHNICAL GRID BACKGROUND & INTERSECTION NODES
      ====================================================== */}
      <div className="ref-hero-grid-bg" aria-hidden="true">
        <div className="ref-grid-lines" />
        {/* Glowing Orange Micro-Square Nodes at Grid Intersections */}
        <span className="ref-grid-node" style={{ top: "18%", left: "38%" }} />
        <span className="ref-grid-node" style={{ top: "24%", left: "49%" }} />
        <span className="ref-grid-node" style={{ top: "28%", left: "86%" }} />
        <span className="ref-grid-node" style={{ top: "42%", left: "88%" }} />
        <span className="ref-grid-node" style={{ top: "86%", left: "93%" }} />
        <span className="ref-grid-node" style={{ top: "91%", left: "39%" }} />
        <span className="ref-grid-node" style={{ top: "94%", left: "83%" }} />
      </div>

      <div className="ref-hero-container">
        {/* =====================================================
            LEFT COLUMN: TYPOGRAPHY, ACTIONS & STATS
        ====================================================== */}
        <div className="ref-hero-left">
          {/* Availability Badge */}
          <div className="ref-hero-badge">
            <span className="ref-badge-dot" aria-hidden="true" />
            <span className="ref-badge-text">AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          {/* Main Headline: DEVA (Solid White) / NARAYANAN (Outlined) */}
          <div className="ref-hero-heading-group">
            <h1 className="ref-hero-title-solid">DEVA</h1>
            <span className="ref-hero-title-outline">NARAYANAN</span>
          </div>

          {/* Professional Role Descriptor */}
          <p className="ref-hero-descriptor">
            AI &amp; ML ENGINEER <span className="ref-descriptor-bullet">•</span> DEVELOPER{" "}
            <span className="ref-descriptor-bullet">•</span> RESEARCHER
          </p>

          {/* Concise Introduction Paragraph */}
          <p className="ref-hero-intro">
            Passionate about Artificial Intelligence, Machine Learning, Data Science, and modern
            software engineering. Focused on building intelligent applications, production-ready
            neural pipelines, and scalable software solutions with real-world impact.
          </p>

          {/* CTA Buttons */}
          <div className="ref-hero-actions">
            <a href="#contact" className="ref-btn-primary">
              Hire Me
            </a>
            <a
              href="/resume.pdf"
              download="Devanarayanan_Resume.pdf"
              className="ref-btn-secondary"
            >
              Download CV
            </a>
          </div>

          {/* Stats Panel (Experiences, Projects, Happy Clients) */}
          <div className="ref-hero-stats">
            <div className="ref-stat-item">
              <span className="ref-stat-value">5+</span>
              <span className="ref-stat-label">Experiences</span>
            </div>
            <div className="ref-stat-divider" aria-hidden="true" />
            <div className="ref-stat-item">
              <span className="ref-stat-value">20+</span>
              <span className="ref-stat-label">Projects</span>
            </div>
            <div className="ref-stat-divider" aria-hidden="true" />
            <div className="ref-stat-item">
              <span className="ref-stat-value">80+</span>
              <span className="ref-stat-label">Happy Clients</span>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT COLUMN: PORTRAIT, ORBITALS, RIM LIGHT & LABELS
        ====================================================== */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="ref-hero-right"
        >
          {/* Warm Ambient Orange Illumination Core */}
          <div className="ref-hero-ambient-glow" aria-hidden="true" />

          {/* Geometric Orbital Tech Rings */}
          <div className="ref-hero-orbitals" aria-hidden="true">
            <svg
              className="ref-orbitals-svg"
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Large Circle */}
              <circle
                cx="300"
                cy="300"
                r="285"
                stroke="rgba(255, 122, 24, 0.22)"
                strokeWidth="1.2"
                strokeDasharray="6 4"
              />
              {/* Middle Circle */}
              <circle
                cx="300"
                cy="300"
                r="195"
                stroke="rgba(255, 122, 24, 0.38)"
                strokeWidth="1.4"
              />
              {/* Inner Halo Circle */}
              <circle
                cx="300"
                cy="300"
                r="135"
                stroke="rgba(255, 122, 24, 0.5)"
                strokeWidth="1"
              />
              {/* Intersecting Arc Geometry */}
              <path
                d="M 120 480 A 285 285 0 0 0 540 380"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Foreground Portrait Stage with Subtle 3D Tilt */}
          <div
            className="ref-portrait-stage"
            style={{
              transform: isHovered
                ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02)`
                : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)",
            }}
          >
            <Image
              src="/nanu.png"
              alt="Devanarayanan - AI & ML Engineer"
              width={3464}
              height={2309}
              priority
              unoptimized
              className="ref-portrait-img"
              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 55vw, 680px"
            />
          </div>

          {/* Technical Micro-Label: Lower-Left Statement */}
          <div className="ref-label-statement" aria-hidden="true">
            <span className="ref-statement-line">TURNING</span>
            <span className="ref-statement-line">IDEAS INTO</span>
            <span className="ref-statement-line">REAL IMPACT</span>
            <span className="ref-statement-underline" />
          </div>

          {/* Technical Micro-Label: Right Vertical Label */}
          <div className="ref-label-vertical" aria-hidden="true">
            <span className="ref-label-dash" />
            <span className="ref-label-text">ML</span>
            <span className="ref-label-text">DATA</span>
            <span className="ref-label-text">SOLUTIONS</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM CENTER: SCROLL DOWN INDICATOR
      ====================================================== */}
      <a
        href="#about"
        className="ref-hero-scroll"
        aria-label="Scroll down to About section"
      >
        <div className="ref-mouse-icon" aria-hidden="true">
          <span className="ref-mouse-wheel" />
        </div>
        <span className="ref-scroll-text">SCROLL DOWN</span>
      </a>
    </section>
  );
}
