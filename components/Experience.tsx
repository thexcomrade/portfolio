"use client";

import Image from "next/image";
import { FaCheckCircle, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const skills = [
  "Python",
  "Artificial Intelligence",
  "Machine Learning",
  "FastAPI",
  "Deep Learning",
  "Computer Vision",
  "Data Science",
  "Problem Solving",
];

export default function Experience() {
  return (
    <section id="experience" className="page-section experience-section">
      <div className="section-inner">
        {/* Section Heading */}
        <div className="section-header">
          <p className="section-eyebrow">CURRENT JOURNEY</p>
          <h2 className="section-title">
            Professional <span>Experience</span>
          </h2>
          <p className="section-subtitle">
            Transforming AI &amp; ML theoretical expertise into scalable, production-grade solutions
            in an active industry environment.
          </p>
        </div>

        {/* Dual-Column Experience Showcase */}
        <div className="experience-showcase-grid">
          {/* Left Column: Details */}
          <div className="experience-details-card">
            <div className="experience-live-badge">
              <span className="live-dot" /> CURRENTLY WORKING
            </div>

            <h3 className="experience-company-title">
              Stackmod Innovation
            </h3>

            <div className="experience-meta">
              <span><FaMapMarkerAlt /> Technopark, Kerala</span>
              <span><FaCalendarAlt /> 2026 — Present</span>
            </div>

            <h4 className="experience-role-subtitle">
              AI &amp; Machine Learning Intern
            </h4>

            <p className="experience-description">
              Developing real-world Artificial Intelligence and Machine Learning software, scalable AI backend services,
              and data-driven applications. Collaborating with cross-functional engineering teams to implement
              production-ready AI models and tackle complex technical challenges.
            </p>

            <div className="experience-skills-list">
              {skills.map((skill) => (
                <span key={skill} className="experience-chip">
                  {skill}
                </span>
              ))}
            </div>

            {/* Current Focus Grid */}
            <div className="experience-focus-section">
              <h4>What I&apos;m Building</h4>
              <div className="focus-mini-grid">
                <div className="focus-item">
                  <span className="focus-icon">🤖</span>
                  <div>
                    <h5>AI System Engineering</h5>
                    <p>Building intelligent APIs and neural network inference pipelines.</p>
                  </div>
                </div>

                <div className="focus-item">
                  <span className="focus-icon">⚡</span>
                  <div>
                    <h5>Backend Integration</h5>
                    <p>Designing high-throughput FastAPI endpoints with async optimization.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Official Stackmod Intern ID Badge */}
          <div className="experience-id-card-wrapper">
            <div className="stackmod-id-card">
              {/* Top Bar */}
              <div className="id-card-header">
                <div className="id-company-brand">
                  <span className="id-logo-dot" /> STACKMOD INNOVATION
                </div>
                <span className="id-verified-badge">
                  <FaCheckCircle /> VERIFIED INTERN
                </span>
              </div>

              {/* Photo Frame */}
              <div className="id-photo-container">
                <div className="id-photo-frame">
                  <Image
                    src="/stackmodid.jpeg"
                    alt="Devanarayanan V S - Stackmod ID"
                    width={280}
                    height={320}
                    className="id-photo-img"
                    priority
                  />
                  <div className="id-hologram-overlay" />
                </div>
              </div>

              {/* Intern Information */}
              <div className="id-user-info">
                <h4 className="id-user-name">DEVANARAYANAN V S</h4>
                <p className="id-user-role">AI &amp; MACHINE LEARNING INTERN</p>

                <div className="id-info-table">
                  <div>
                    <span className="id-label">LOCATION</span>
                    <span className="id-val">Technopark, Trivandrum</span>
                  </div>
                  <div>
                    <span className="id-label">DOMAIN</span>
                    <span className="id-val">Artificial Intelligence</span>
                  </div>
                </div>

                {/* Barcode & Security Strip */}
                <div className="id-security-strip">
                  <div className="id-barcode" />
                  <span className="id-code-num">SM-2026-AI-8890</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}