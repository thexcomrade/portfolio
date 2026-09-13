"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="page-section hero-section">
      <div className="hero-container">

        {/* =====================================================
            HERO TEXT CONTENT
        ====================================================== */}
        <div className="hero-text-content">

          {/* Availability Status */}
          <div className="hero-status-pill">
            <span className="status-live-dot" />
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          {/* Main Name */}
          <h1 className="hero-title">
            <span className="hero-name-solid">DEVA</span>

            <span className="hero-name-outline">
              NARAYANAN
            </span>
          </h1>

          {/* Professional Roles */}
          <div className="hero-subtitle-bar">
            <span className="sub-tag-dash">—</span>

            <span>AI &amp; ML ENGINEER</span>

            <span className="sub-tag-dot">•</span>

            <span>DEVELOPER</span>

            <span className="sub-tag-dot">•</span>

            <span>RESEARCHER</span>
          </div>

          {/* Description */}
          <p className="hero-description">
            Passionate about Artificial Intelligence, Machine Learning,
            Data Science, and modern software engineering. Focused on
            building intelligent applications, production-ready neural
            pipelines, and scalable software solutions with real-world
            impact.
          </p>
        </div>

        {/* =====================================================
            VISUAL / PORTRAIT AREA
        ====================================================== */}
        <div className="hero-visual">

          {/* Background Artwork */}
          <div className="hero-background-art" aria-hidden="true">
            <Image
              src="/back.png"
              alt=""
              fill
              priority
              className="hero-background-image"
              sizes="(max-width: 768px) 100vw, 65vw"
            />
          </div>

          {/* Atmospheric Glow */}
          <div
            className="hero-ambient-glow"
            aria-hidden="true"
          />

          {/* Decorative Orbit */}
          <div
            className="hero-orbit hero-orbit-one"
            aria-hidden="true"
          />

          <div
            className="hero-orbit hero-orbit-two"
            aria-hidden="true"
          />

          {/* Main Portrait */}
          <div className="hero-person">
            <Image
              src="/nanu.png"
              alt="Devanarayanan V S"
              fill
              priority
              className="hero-person-image"
              sizes="(max-width: 768px) 90vw, 60vw"
            />
          </div>

          {/* Bottom Fade / Ground Glow */}
          <div
            className="hero-person-ground-glow"
            aria-hidden="true"
          />
        </div>

        {/* =====================================================
            SCROLL INDICATOR
        ====================================================== */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-dot" />
          </div>

          <span className="scroll-text">
            SCROLL DOWN
          </span>
        </div>

      </div>
    </section>
  );
}