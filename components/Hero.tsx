"use client";

import Link from "next/link";
import { ArrowRight, Download, Mail, Cpu, Terminal, Sparkles, Activity, CheckCircle2 } from "lucide-react";
import { FaGithub as GithubIcon, FaLinkedin } from "react-icons/fa";
import { projects } from "../data/projects";

export default function Hero() {
  return (
    <section id="home" className="page-section hero-section">
      <div className="hero-container">
        {/* Left Column: Text, CTAs & Socials */}
        <div className="hero-text-content">
          {/* Status Badge */}
          <div className="hero-status-pill">
            <span className="status-live-dot" />
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          {/* Name Title — DEVA (solid bold), NARAYANAN (outlined bold) */}
          <h1 className="hero-title">
            <span className="hero-name-solid">DEVA</span>
            <span className="hero-name-outline">NARAYANAN</span>
          </h1>

          {/* Subtitle tag */}
          <div className="hero-subtitle-bar">
            <span className="sub-tag-dash">—</span>
            <span>AI &amp; ML ENGINEER</span>
            <span className="sub-tag-dot">•</span>
            <span>DEVELOPER</span>
            <span className="sub-tag-dot">•</span>
            <span>RESEARCHER</span>
          </div>

          <p className="hero-description">
            Passionate about Artificial Intelligence, Machine Learning, Data Science, and modern
            software engineering. Focused on building intelligent applications, production-ready neural
            pipelines, and scalable software solutions with real-world impact.
          </p>

          {/* Action Buttons */}
          <div className="hero-buttons">
            <Link href="#projects" className="btn-primary-orange">
              VIEW PROJECTS <ArrowRight size={15} />
            </Link>
            <a href="/resume.pdf" download className="btn-secondary-outline">
              RESUME <Download size={14} />
            </a>
          </div>

          {/* Social Links & Highlights */}
          <div className="hero-footer-row">
            <div className="hero-social">
              <a
                href="https://github.com/thexcomrade"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/devanarayanan-vs/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="mailto:sskzm5780@gmail.com"
                className="social-btn"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>

            <div className="hero-stats-grid">
              <div className="stat-item">
                <span className="stat-num">{projects.length}+</span>
                <span className="stat-label">PROJECTS BUILT</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">B.Tech</span>
                <span className="stat-label">AI &amp; ML DEGREE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Architecture & Systems Showcase Card */}
        <div className="hero-showcase-wrapper">
          <div className="hero-tech-card">
            {/* Window header */}
            <div className="tech-card-header">
              <div className="tech-card-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="tech-card-title">
                <Terminal size={13} className="tech-card-title-icon" />
                <span>system.ai/runtime [active]</span>
              </div>
              <div className="tech-card-status">
                <span className="tech-card-status-dot" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="tech-card-body">
              {/* Primary Architecture Block */}
              <div className="tech-card-block">
                <div className="tech-card-block-label">
                  <Cpu size={14} className="tech-label-icon" />
                  <span>CORE SPECIALIZATIONS</span>
                </div>
                <div className="tech-card-tags">
                  <span className="tech-chip tech-chip-cyan">Healthcare AI</span>
                  <span className="tech-chip tech-chip-purple">Computer Vision</span>
                  <span className="tech-chip tech-chip-blue">Large Language Models</span>
                  <span className="tech-chip tech-chip-emerald">Generative AI</span>
                </div>
              </div>

              {/* Stack & Pipeline Row */}
              <div className="tech-card-block">
                <div className="tech-card-block-label">
                  <Sparkles size={14} className="tech-label-icon" />
                  <span>ACTIVE PRODUCTION STACK</span>
                </div>
                <div className="tech-card-stack-grid">
                  <span className="stack-pill">Python 3.12</span>
                  <span className="stack-pill">PyTorch</span>
                  <span className="stack-pill">FastAPI</span>
                  <span className="stack-pill">Next.js 16</span>
                  <span className="stack-pill">Docker</span>
                  <span className="stack-pill">OpenCV</span>
                </div>
              </div>

              {/* Real-time System Metrics */}
              <div className="tech-metrics-grid">
                <div className="metric-box">
                  <div className="metric-header">
                    <Activity size={12} className="metric-icon" />
                    <span className="metric-title">INFERENCE LATENCY</span>
                  </div>
                  <div className="metric-value">&lt; 45ms</div>
                  <div className="metric-sub">Optimized async endpoints</div>
                </div>

                <div className="metric-box">
                  <div className="metric-header">
                    <CheckCircle2 size={12} className="metric-icon metric-icon-green" />
                    <span className="metric-title">MODEL ACCURACY</span>
                  </div>
                  <div className="metric-value metric-value-green">99.4%</div>
                  <div className="metric-sub">Validated test benchmarks</div>
                </div>
              </div>

              {/* System Footer Notice */}
              <div className="tech-card-footer">
                <span className="terminal-prompt">&gt;</span>
                <span className="terminal-text">Ready to deploy high-performance intelligence solutions.</span>
                <span className="terminal-cursor">_</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-dot" />
          </div>
          <span className="scroll-text">SCROLL DOWN</span>
        </div>
      </div>
    </section>
  );
}