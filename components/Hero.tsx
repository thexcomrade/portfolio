"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Image from "next/image";

type Tilt = {
  x: number;
  y: number;
};

const INITIAL_TILT: Tilt = { x: 0, y: 0 };

export default function Home() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<Tilt>(INITIAL_TILT);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !stageRef.current) return;

      const rect = stageRef.current.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const normalizedX =
        (event.clientX - rect.left) / rect.width - 0.5;

      const normalizedY =
        (event.clientY - rect.top) / rect.height - 0.5;

      setTilt({
        x: normalizedX * 5,
        y: normalizedY * -5,
      });
    },
    [reducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt(INITIAL_TILT);
  }, []);

  return (
    <main className="ref-home">
      <section
        id="home"
        className="ref-hero-section"
        aria-labelledby="ref-hero-title"
      >
        {/* Background grid and technical details */}
        <div className="ref-hero-grid-bg" aria-hidden="true">
          <div className="ref-grid-lines" />
          <div className="ref-grid-vignette" />
        </div>

        {/* Ambient lighting */}
        <div className="ref-background-glow" aria-hidden="true" />

        <div className="ref-hero-container">
          {/* Left: Introduction and actions */}
          <div className="ref-hero-left">
            <div className="ref-hero-badge">
              <span className="ref-badge-dot" aria-hidden="true" />
              <span className="ref-badge-text">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>

            <div className="ref-hero-heading-group">
              <Image
                src="/back.png"
                alt="DEVA NARAYANAN"
                width={3110}
                height={1524}
                priority
                className="ref-hero-name-artwork"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 480px"
              />
              <h1 className="sr-only">DEVANARAYANAN V S - AI &amp; ML Engineer</h1>
            </div>

            <p className="ref-hero-descriptor">
  <span>AI &amp; ML ENGINEER</span>
  <span className="ref-descriptor-separator">|</span>
  <span>DEVELOPER</span>
  <span className="ref-descriptor-separator">|</span>
  <span>RESEARCHER</span>
</p>

            <p className="ref-hero-intro">
              Passionate about Artificial Intelligence, Machine
              Learning, and modern software engineering.
              Focused on building intelligent applications and scalable
              software solutions with real-world impact.
            </p>

            <div className="ref-hero-actions">
              <a href="#contact" className="ref-btn-primary">
                <span>Hire Me</span>
              </a>

              <a
                href="/resume.pdf"
                download="Devanarayanan_VS_Resume.pdf"
                className="ref-btn-secondary"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3h14v-3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Download CV</span>
              </a>
            </div>

            {/* Portfolio highlights matching reference image */}
            <div
              className="ref-hero-stats"
              aria-label="Portfolio highlights"
            >
              <div className="ref-stat-item">
                <span className="ref-stat-value">5+</span>
                <span className="ref-stat-label">
                  Experiences
                </span>
              </div>

              <span
                className="ref-stat-divider"
                aria-hidden="true"
              />

              <div className="ref-stat-item">
                <span className="ref-stat-value">10+</span>
                <span className="ref-stat-label">
                  Projects
                </span>
              </div>

              <span
                className="ref-stat-divider"
                aria-hidden="true"
              />

              <div className="ref-stat-item">
                <span className="ref-stat-value">25+</span>
                <span className="ref-stat-label">
                  Happy Clients
                </span>
              </div>
            </div>
          </div>

          {/* Right: Portrait, ambient light and orbital geometry */}
          <div
            ref={stageRef}
            className={`ref-hero-right${isHovered ? " is-hovered" : ""}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="ref-hero-ambient-glow"
              aria-hidden="true"
            />

            <div
              className="ref-hero-sun-disc"
              aria-hidden="true"
            />

            
<div className="ref-hero-orbitals" aria-hidden="true">
  <svg
    className="ref-orbitals-svg"
    viewBox="0 0 800 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Technical Crosshairs through center (400, 400) */}
    <line
      x1="0"
      y1="400"
      x2="800"
      y2="400"
      stroke="currentColor"
      strokeOpacity=".22"
      strokeWidth="1"
    />
    <line
      x1="400"
      y1="0"
      x2="400"
      y2="800"
      stroke="currentColor"
      strokeOpacity=".22"
      strokeWidth="1"
    />

    {/* Inner, Middle & Outer Concentric Circles */}
    <circle
      cx="400"
      cy="400"
      r="170"
      stroke="currentColor"
      strokeOpacity=".4"
      strokeWidth="1.2"
    />
    <circle
      cx="400"
      cy="400"
      r="260"
      stroke="currentColor"
      strokeOpacity=".3"
      strokeWidth="1"
    />
    <circle
      cx="400"
      cy="400"
      r="370"
      stroke="currentColor"
      strokeOpacity=".2"
      strokeWidth="1"
    />

    {/* Sweeping Intersecting Orbital Arc */}
    <circle
      cx="560"
      cy="460"
      r="290"
      stroke="currentColor"
      strokeOpacity=".28"
      strokeWidth="1"
    />

    {/* Technical Measurement Dashes */}
    <path
      d="M160 260A290 290 0 0 1 640 260"
      stroke="currentColor"
      strokeOpacity=".24"
      strokeDasharray="4 8"
      strokeWidth="1"
    />

    {/* =====================================
        ANIMATED ORBITAL PARTICLES
    ====================================== */}

    {/* Outer orbit - Orange particle */}
    <g className="ref-orbit-particle-one">
      <circle
        cx="400"
        cy="30"
        r="5"
        fill="#ff7a18"
        className="ref-orbit-glow"
      />
    </g>

    {/* Inner orbit - Champagne particle */}
    <g className="ref-orbit-particle-two">
      <circle
        cx="400"
        cy="140"
        r="3.5"
        fill="#ffd09b"
        className="ref-orbit-glow"
      />
    </g>
  </svg>
</div>


            <div
              className="ref-portrait-stage"
              style={{
                transform: reducedMotion
                  ? "none"
                  : `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${isHovered ? 1.015 : 1})`,
              }}
            >
              <Image
                src="/nanappan.png"
                alt="Devanarayanan V S"
                width={1200}
                height={1000}
                priority
                className="ref-portrait-img"
              />

              <div
                className="ref-portrait-fade"
                aria-hidden="true"
              />
            </div>

            <div
              className="ref-label-statement"
              aria-hidden="true"
            >
              <span className="ref-statement-line">TURNING</span>
              <span className="ref-statement-line">
                IDEAS INTO
              </span>
              <span className="ref-statement-line">
                REAL IMPACT
              </span>
              <span className="ref-statement-underline" />
            </div>

            <div
              className="ref-label-vertical"
              aria-hidden="true"
            >
              <span className="ref-label-dash" />
              <span className="ref-label-text">ML</span>
              <span className="ref-label-text">DATA</span>
              <span className="ref-label-text">SOLUTIONS</span>
            </div>
          </div>
        </div>

        {/* Full-width seamless shadow transition connecting hero to about page */}
        <div className="ref-hero-bottom-blend" aria-hidden="true" />

        {/* Scroll indicator */}
        <a
          href="#about"
          className="ref-hero-scroll"
          aria-label="Scroll to the About section"
        >
          <span className="ref-mouse-icon" aria-hidden="true">
            <span className="ref-mouse-wheel" />
          </span>
          <span className="ref-scroll-text">SCROLL DOWN</span>
        </a>
      </section>
    </main>
  );
}