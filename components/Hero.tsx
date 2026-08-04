"use client";

import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FaGithub as GithubIcon, FaLinkedin } from "react-icons/fa";
import GlobeScene from "./GlobeScene";

export default function Hero() {
  return (
    <section id="home" className="page-section hero-section">
      <div className="hero-container">
        {/* Left Column: Text & CTAs */}
        <div className="hero-text-content">
          <span className="hero-tag">AI • ML • Software Engineer</span>

          <p className="hero-greeting">Hello, I&apos;m</p>

          <h1 className="hero-title">
            DEVANARAYANAN
            <span>V S</span>
          </h1>

          <h2 className="hero-role">
            Artificial Intelligence &amp; Machine Learning Engineer
          </h2>

          <p className="hero-description">
            Passionate about AI, Machine Learning, Data Science, and modern
            software engineering. I build intelligent applications that solve
            real-world problems and create meaningful user experiences.
          </p>

          {/* Action Buttons */}
          <div className="hero-buttons">
            <Link href="#projects" className="btn-primary">
              View Projects <ArrowRight size={15} />
            </Link>
            <a href="/resume.pdf" download className="btn-secondary">
              <Download size={15} /> Resume
            </a>
          </div>

          {/* Social Links */}
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
              href="mailto:sskzm5780@email.com"
              className="social-btn"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
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
          <span className="scroll-text">Scroll Down</span>
        </div>
      </div>
    </section>
  );
}