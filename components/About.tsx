"use client";

import Image from "next/image";
import {
  BrainCircuit,
  Zap,
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
        "My curiosity about technology began in hardware. Working with Arduino, motor drivers, ultrasonic distance sensors, and Bluetooth modules at Sainik School Kazhakkootam and beyond taught me how code interacts with the physical world, creating tangible autonomous machines.",
      highlight: "Bridging Embedded Logic to Real Movement",
    },
    {
      act: "ACT 02",
      title: "Foundations in Intelligence",
      subtitle: "Machine Learning, Deep Learning & CV",
      icon: <BrainCircuit size={20} className="story-act-icon" aria-hidden="true" />,
      description:
        "Pursuing my B.Tech in AI & ML at Mangalam College of Engineering (APJAKTU) gave me rigorous mathematical and algorithmic grounding. I developed computer vision pipelines with OpenCV, evaluated classification architectures, and engineered our 93.4% accurate Deepfake Face Detection System.",
      highlight: "From Algorithms to Verified Evaluation",
    },
    {
      act: "ACT 03",
      title: "Purposeful Engineering",
      subtitle: "Healthcare Data & Resilient Architecture",
      icon: <HeartPulse size={20} className="story-act-icon" aria-hidden="true" />,
      description:
        "Developing Nutri Plan AI and exploring healthcare applications focused my efforts on data integrity—structuring domain schemas, evaluating medical vision models, and building resilient FastAPI services for real-world impact.",
      highlight: "Pragmatic Architecture for Critical Domains",
    },
    {
      act: "ACT 04",
      title: "Full-Stack Applied AI",
      subtitle: "Production RAG Pipelines & Modern Web",
      icon: <Code2 size={20} className="story-act-icon" aria-hidden="true" />,
      description:
        "As a Software Engineer Intern at Stackup Learning, I build production-grade systems linking Next.js and TypeScript frontends with Python and FastAPI backends, integrating Gemini 2.5 Flash with custom 100+ destination RAG knowledge bases for Trip Geni.",
      highlight: "Enterprise RAG & Full-Stack Reliability",
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
            <span>ENGINEERING PRINCIPLE</span>
          </div>
          <blockquote className="story-manifesto-quote">
            &ldquo;I don&apos;t write code just to fill repositories. I build pragmatic AI systems and full-stack software that connect machine learning models with reliable real-world engineering.&rdquo;
          </blockquote>
          <div className="story-manifesto-footer">
            <span className="story-manifesto-author"> — DEVANARAYANAN V S</span>
          </div>
        </div>

        {/* Interactive Story Grid: Bio Dossier & 4 Narrative Acts */}
        <div className="story-master-grid">
          {/* Left Column: Personal Identity Dossier */}
          <div className="story-dossier-col">
            <div className="story-portrait-card">
              <div className="story-portrait-wrapper">
                <Image
                  src="/deva.png"
                  alt="Devanarayanan V S portrait"
                  width={420}
                  height={420}
                  priority
                  className="story-portrait-img"
                />
              </div>
              <div className="story-portrait-info">
                <span className="story-dossier-badge">B.TECH AI &amp; ML</span>
                <h3 className="story-dossier-name">DEVANARAYANAN V S</h3>
                <p className="story-dossier-title">AI/ML &amp; Software Engineer</p>

                <div className="story-dossier-meta">
                  <span className="story-dossier-location">
                    <MapPin size={13} aria-hidden="true" />
                    <span>Kollam, Kerala, India</span>
                  </span>
                  <span className="story-meta-dot" aria-hidden="true">•</span>
                  <span suppressHydrationWarning>
                    {age !== null ? `${age} Years Old` : "..."}
                  </span>
                </div>

                <div className="story-status-pill">
                  <span className="story-status-pulse" aria-hidden="true" />
                  <span>Available for Engineering Roles</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="story-metrics-stack">
              <div className="story-metric-box">
                <span className="story-metric-number">93.4%</span>
                <span className="story-metric-desc">Deepfake Model Accuracy</span>
              </div>
              <div className="story-metric-box">
                <span className="story-metric-number">7.63ms</span>
                <span className="story-metric-desc">Per-Face CPU Inference</span>
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
