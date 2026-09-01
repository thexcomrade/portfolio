"use client";

import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FaGithub as GithubIcon, FaLinkedin } from "react-icons/fa";
import GlobeScene from "./GlobeScene";

import { projects } from "../data/projects";

export default function Hero() {
  return (
    <section id="home" className="page-section hero-section">
      <div className="hero-container">
        {/* Left Column: Text & CTAs */}
        <div className="hero-text-content">
          {/* Status Badge */}
          <div className="hero-status-pill">
            <span className="status-live-dot" />
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          {/* Name Title — DEVA (solid bold), NARAYANAN (outlined bold) matching reference layout */}
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
            software engineering. Focused on building intelligent applications and creating
            scalable software solutions for real-world impact.
          </p>

          {/* Action Buttons matching reference image */}
          <div className="hero-buttons">
            <Link href="#projects" className="btn-primary-orange">
              VIEW PROJECTS <ArrowRight size={15} />
            </Link>
            <a href="/resume.pdf" download className="btn-secondary-outline">
              RESUME <Download size={14} />
            </a>
          </div>

          {/* Social Links & Quick Stats */}
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

        {/* Right Side: Holographic Earth */}
        <div className="hero-globe-wrapper">
          <div className="globe-aura-glow" />
          <GlobeScene />
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