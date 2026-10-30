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
      title: "The Physical Spark",
      subtitle: "Robotics & Embedded Telemetry",
      icon: <Zap size={20} className="story-act-icon" aria-hidden="true" />,
      description:
        "My journey began in physical computing—programming microcontrollers, routing motor drivers, and tuning drone aerodynamics. Grounding code in the physical realm forged an obsession with autonomous behavior.",
      highlight: "Hardware-to-Software Bridge",
    },
    {
      act: "ACT 02",
      title: "The Neural Transition",
      subtitle: "Machine Learning & Vision",
      icon: <BrainCircuit size={20} className="story-act-icon" aria-hidden="true" />,
      description:
        "Transitioned from rule-based logic to statistical machine learning. Developed deep computer vision models, predictive health analytics, and high-accuracy classification pipelines with Scikit-Learn and PyTorch.",
      highlight: "Mathematical Foundations",
    },
    {
      act: "ACT 03",
      title: "Generative Intelligence",
      subtitle: "LLMs, RAG & Autonomous Agents",
      icon: <Sparkles size={20} className="story-act-icon" aria-hidden="true" />,
      description:
        "Architecting modern Generative AI systems. Building production-grade retrieval-augmented generation (RAG) pipelines, context-aware autonomous agents, and intelligent travel assistants like TripGenius.",
      highlight: "Production GenAI Pipelines",
    },
    {
      act: "ACT 04",
      title: "The Engineering Ethos",
      subtitle: "Scalable Full-Stack Systems",
      icon: <Code2 size={20} className="story-act-icon" aria-hidden="true" />,
      description:
        "An algorithm is only as impactful as its interface. I engineer resilient Next.js frontends, high-throughput FastAPI backends, and deterministic state systems that turn complex models into seamless products.",
      highlight: "End-to-End System Design",
    },
  ];

  return (
    <section id="about" className="page-section story-section">
      <div className="section-inner">
        {/* Section Header */}
        <div className="section-header">
          <p className="section-eyebrow">CHAPTER 01 // THE MANIFESTO</p>
          <h2 className="section-title">
            The Story of <span>Me &amp; My Code</span>
          </h2>
          <p className="section-subtitle">
            Not a blog of text—a journey of curiosity, autonomy, and deliberate engineering.
          </p>
        </div>

        {/* Narrative Manifesto Banner */}
        <div className="story-manifesto-card">
          <div className="story-manifesto-badge">
            <Terminal size={14} aria-hidden="true" />
            <span>MY CORE PHILOSOPHY</span>
          </div>
          <blockquote className="story-manifesto-quote">
            &ldquo;I don&apos;t write software merely to generate lines of code. I build autonomous intelligence that bridges abstract neural mathematics with tangible, real-world human solutions.&rdquo;
          </blockquote>
          <div className="story-manifesto-footer">
            <span className="story-manifesto-author">— DEVANARAYANAN</span>
            <span className="story-manifesto-role">AI &amp; Machine Learning Engineer</span>
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
                <span className="story-dossier-badge">DEV DOSSIER</span>
                <h3 className="story-dossier-name">Devanarayanan</h3>
                <p className="story-dossier-title">AI &amp; ML Systems Architect</p>

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
                <span className="story-metric-desc">Production-Tested Code</span>
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
