"use client";

import Image from "next/image";
import {
  MapPin,
  Bot,
  BrainCircuit,
  Activity,
  Eye,
  MessageSquareCode,
  Sparkles,
  Globe,
  BarChart3,
  Zap,
} from "lucide-react";
import { projects } from "../data/projects";

export default function About() {
  const today = new Date();
  const birthDate = new Date(2004, 6, 30);
  let age = today.getFullYear() - birthDate.getFullYear();
  if (today < new Date(today.getFullYear(), 6, 30)) {
    age--;
  }

  const focusAreas = [
    { label: "Artificial Intelligence", icon: <Bot size={14} aria-hidden="true" /> },
    { label: "Machine Learning", icon: <BrainCircuit size={14} aria-hidden="true" /> },
    { label: "Healthcare AI", icon: <Activity size={14} aria-hidden="true" /> },
    { label: "Computer Vision", icon: <Eye size={14} aria-hidden="true" /> },
    { label: "Large Language Models", icon: <MessageSquareCode size={14} aria-hidden="true" /> },
    { label: "Generative AI", icon: <Sparkles size={14} aria-hidden="true" /> },
    { label: "Full Stack Development", icon: <Globe size={14} aria-hidden="true" /> },
    { label: "Data Science", icon: <BarChart3 size={14} aria-hidden="true" /> },
    { label: "Intelligent Automation", icon: <Zap size={14} aria-hidden="true" /> },
  ];

  return (
    <section id="about" className="page-section">
      <div className="section-inner">
        {/* Section Header */}
        <div className="section-header">
          <p className="section-eyebrow">GET TO KNOW ME</p>
          <h2 className="section-title">
            About <span>Me</span>
          </h2>
          <p className="section-subtitle">
            Building intelligent AI solutions that bridge research, engineering, and real-world impact.
          </p>
        </div>

        {/* Main Grid */}
        <div className="about-grid">
          {/* Left Column: Profile Card */}
          <div className="about-left">
            <div className="about-image-card">
              <Image
                src="/deva.jpg"
                alt="Devanarayanan V S portrait"
                width={420}
                height={420}
                priority
                className="about-image"
              />
            </div>

            <div className="about-profile">
              <span className="about-badge">AI • ML • SOFTWARE ENGINEER</span>
              <h3 className="about-name">Devanarayanan</h3>
              <p className="about-role">AI &amp; Machine Learning Graduate</p>
              <p className="about-tagline">
                Passionate about developing intelligent software that transforms innovative ideas into scalable systems.
              </p>

              <div className="about-meta">
                <span className="about-location">
                  <MapPin size={13} aria-hidden="true" />
                  <span>Kerala, India</span>
                </span>
                <span className="meta-divider" aria-hidden="true">•</span>
                <span suppressHydrationWarning>
                  {age !== null ? `${age} Years Old` : "..."}
                </span>
              </div>

              <div className="availability">
                <span className="availability-dot" aria-hidden="true" />
                <span>Available for AI &amp; ML Opportunities</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Focus Areas, Stats, Vision */}
          <div className="about-content">
            <h3 className="about-heading">
              Engineering Intelligent Systems with Purpose &amp; Precision
            </h3>

            <p className="about-paragraph">
              I am an Artificial Intelligence and Machine Learning graduate from Kerala, India,
              dedicated to developing reliable and production-grade software that solves meaningful challenges.
              My primary interest lies in the application of AI to healthcare, where computer vision and predictive
              modeling can accelerate diagnosis, optimize care delivery, and improve patient outcomes.
            </p>

            <p className="about-paragraph">
              My engineering stack spans Machine Learning algorithms, Deep Learning architectures (CNNs, RNNs, Transformers),
              Computer Vision pipelines, Generative AI models, and scalable full-stack web applications.
              I focus on bridging experimental neural models with high-throughput API services and intuitive user interfaces.
            </p>

            <p className="about-paragraph">
              Continuous learning is core to my engineering approach. Every system I build provides an opportunity
              to explore architectural optimizations, write clean maintainable code, and deliver reliable solutions
              tailored to real-world industrial environments.
            </p>

            {/* Focus Areas */}
            <div className="about-keywords-section">
              <p className="about-keywords-label">CORE FOCUS AREAS</p>
              <div className="about-focus">
                {focusAreas.map((area) => (
                  <div key={area.label} className="highlight">
                    {area.icon}
                    <span>{area.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-value">{projects.length}+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">10+</div>
                <div className="stat-label">Certifications</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">AI</div>
                <div className="stat-label">Healthcare Focus</div>
              </div>
            </div>

            {/* Engineering Vision */}
            <div className="about-vision">
              <h4>Engineering Vision</h4>
              <p className="about-paragraph">
                My objective is to advance ethical, dependable, and human-centered AI systems—developing robust
                software architectures that enhance healthcare accessibility, automate complex processes, and power
                the next generation of intelligent software products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
