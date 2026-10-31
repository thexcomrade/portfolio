"use client";

import Image from "next/image";
import {
  BrainCircuit,
  Zap,
  Sparkles,
  MapPin,
  Terminal,
  Code2,
  CheckCircle2,
  HeartPulse,
} from "lucide-react";

export default function About() {
  const today = new Date();
  const birthDate = new Date(2004, 6, 30);
  let age = today.getFullYear() - birthDate.getFullYear();
  if (today < new Date(today.getFullYear(), 6, 30)) {
    age--;
  }

  const storyActs = [
    {
      act: "ACT 01",
      title: "Where It All Began",
      subtitle: "Robotics, Arduino & Embedded Systems",
      icon: <Zap size={20} className="story-act-icon" aria-hidden="true" />,
      description:
        "My curiosity about technology started beyond the screen. Working with Arduino, motor drivers, sensors, Bluetooth modules, and obstacle-avoiding robots introduced me to the connection between software and the physical world. It was where I first learned to turn an idea into something that actually moves.",
    highlight: "From Writing Code to Building Things",
    },
    {
      act: "ACT 02",
      title: "Discovering Intelligence",
      subtitle: "Artificial Intelligence & Machine Learning",
      icon: <BrainCircuit size={20} className="story-act-icon" aria-hidden="true" />,
      description:
        "Pursuing B.Tech in Artificial Intelligence and Machine Learning changed how I approached problems. I explored Python, machine learning, deep learning, computer vision, and neural networks, moving from basic programming concepts towards systems that can learn from data and recognize patterns.",
    highlight: "Learning to Build Intelligent Systems",
    },
    {
      act: "ACT 03",
      title: "Technology with a Purpose",
      subtitle: "Healthcare AI & Research Applications",
      icon: <HeartPulse size={20} className="story-act-icon" aria-hidden="true" />,
      description:
        "I became increasingly interested in using AI to solve problems that matter. My diabetic foot ulcer detection project introduced me to medical image analysis, CNN architectures, and model evaluation. Ideas like NutriPlan AI further shaped my interest in bringing artificial intelligence closer to healthcare and everyday life.",
    highlight: "Exploring AI Beyond the Classroom",
    },
    {
      act: "ACT 04",
      title: "Building Beyond Idea",
      subtitle: "Full-Stack Development & Applied AI",
      icon: <Code2 size={20} className="story-act-icon" aria-hidden="true" />,
      description:
        "Today, I enjoy bringing different technologies together. From Deepfake Face Detection and HandPlay to TripGenius, I explore how AI, software engineering, and thoughtful interfaces can become useful applications. I continue learning, experimenting, breaking things, fixing them, and building projects that reflect the engineer I am becoming.",
    highlight: "Turning Experiments into Meaningful Projects",
    },
  ];

  return (
    <section id="about" className="page-section story-section">
      <div className="section-inner">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            The Story of <span>Me &amp; My Code</span>
          </h2>
        </div>

        {/* Narrative Manifesto Banner */}
        <div className="story-manifesto-card">
          <div className="story-manifesto-badge">
            <Terminal size={15} aria-hidden="true" />
            <span>MY CORE PHILOSOPHY</span>
          </div>
          <blockquote className="story-manifesto-quote">
            &ldquo;I don&apos;t write software merely to generate lines of code. I build autonomous intelligence that bridges abstract neural mathematics with tangible, real-world human solutions.&rdquo;
          </blockquote>
          <div className="story-manifesto-footer">
            <span className="story-manifesto-author"> — DEVANARAYANAN</span>
          </div>
        </div>

        {/* Interactive Story Grid: Bio Dossier & 4 Narrative Acts */}
        <div className="story-master-grid">
          {/* Left Column: Personal Identity Dossier */}
          <div className="story-dossier-col">
            <div className="story-portrait-card">
              <div className="story-portrait-wrapper">
                <Image
                  src="/deva.jpg"
                  alt="Devanarayanan V S portrait"
                  width={420}
                  height={420}
                  priority
                  className="story-portrait-img"
                />
              </div>
              <div className="story-portrait-info">
                <span className="story-dossier-badge">STUDENT</span>
                <h3 className="story-dossier-name">DEVANARAYANAN VS</h3>
                <p className="story-dossier-title">AI &amp; ML Engineer</p>

                <div className="story-dossier-meta">
                  <span className="story-dossier-location">
                    <MapPin size={13} aria-hidden="true" />
                    <span>Kerala, India</span>
                  </span>
                  <span className="story-meta-dot" aria-hidden="true">•</span>
                  <span suppressHydrationWarning>
                    {age !== null ? `${age} Years Old` : "..."}
                  </span>
                </div>

                <div className="story-status-pill">
                  <span className="story-status-pulse" aria-hidden="true" />
                  <span>Available for Visionary AI Roles</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="story-metrics-stack">
              <div className="story-metric-box">
                <span className="story-metric-number">3+</span>
                <span className="story-metric-desc">Autonomous Systems Deployed</span>
              </div>
              <div className="story-metric-box">
                <span className="story-metric-number">100%</span>
                <span className="story-metric-desc">Production - Tested Code</span>
              </div>
            </div>
          </div>

          {/* Right Column: The 4 Chronological Story Acts */}
          <div className="story-acts-col">
            <div className="story-acts-grid">
              {storyActs.map((act) => (
                <div key={act.act} className="story-act-card">
                  <div className="story-act-header">
                    <span className="story-act-tag">{act.act}</span>
                    <div className="story-act-icon-box">{act.icon}</div>
                  </div>
                  <h4 className="story-act-title">{act.title}</h4>
                  <p className="story-act-subtitle">{act.subtitle}</p>
                  <p className="story-act-description">{act.description}</p>
                  <div className="story-act-footer">
                    <CheckCircle2 size={13} className="story-act-check" aria-hidden="true" />
                    <span className="story-act-highlight">{act.highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
