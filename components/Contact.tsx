"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileDownload,
} from "react-icons/fa";

type Panel = "email" | "location";

interface SocialLink {
  id: number;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  action: "email" | "location" | "link";
  href?: string;
}

const socialLinks: SocialLink[] = [
  {
    id: 0,
    label: "GitHub",
    icon: <FaGithub />,
    color: "#ffffff",
    bgColor: "#1a1a2e",
    action: "link",
    href: "https://github.com/thexcomrade",
  },
  {
    id: 1,
    label: "LinkedIn",
    icon: <FaLinkedin />,
    color: "#ffffff",
    bgColor: "#0A66C2",
    action: "link",
    href: "https://www.linkedin.com/in/devanarayanan-vs/",
  },
  {
    id: 2,
    label: "Instagram",
    icon: <FaInstagram />,
    color: "#ffffff",
    bgColor: "#E1306C",
    action: "link",
    href: "https://www.instagram.com/thexcomrade/",
  },
  {
    id: 3,
    label: "Resume",
    icon: <FaFileDownload />,
    color: "#ffffff",
    bgColor: "#fe4e03",
    action: "link",
    href: "/resume.pdf",
  },
];

const SUBJECT_SUGGESTIONS: Record<string, string[]> = {
  job: ["Job Opportunity", "Full-time Role"],
  hire: ["Hiring Inquiry", "Job Opportunity"],
  opportunity: ["Career Opportunity", "Job Opportunity"],
  collab: ["Project Collaboration", "Open Source Collaboration"],
  project: ["Project Collaboration", "AI Project"],
  build: ["Build Together", "Project Collaboration"],
  freelance: ["Freelance Enquiry", "Contract Work"],
  consult: ["Consultation Request", "Technical Consultation"],
  help: ["Consultation Request", "Getting Help"],
  ai: ["AI Project Collaboration", "AI Research Collaboration"],
  ml: ["ML Project Collaboration", "Machine Learning Enquiry"],
  internship: ["Internship Opportunity", "Student Collaboration"],
  research: ["Research Collaboration", "AI Research"],
};

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<Panel>("email");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Auto-suggest subjects based on message content
  useEffect(() => {
    if (!message.trim()) {
      setSuggestions([]);
      return;
    }
    const lower = message.toLowerCase();
    const found = new Set<string>();
    for (const [keyword, subs] of Object.entries(SUBJECT_SUGGESTIONS)) {
      if (lower.includes(keyword)) {
        subs.forEach((s) => found.add(s));
      }
    }
    setSuggestions(Array.from(found).slice(0, 3));
  }, [message]);

  function handleIconClick(link: SocialLink) {
    setMenuOpen(false);
    if (link.action === "email") {
      setActivePanel("email");
    } else if (link.action === "location") {
      setActivePanel("location");
    } else if (link.href) {
      if (link.href.startsWith("/")) {
        window.open(link.href, "_blank");
      } else {
        window.open(link.href, "_blank", "noopener,noreferrer");
      }
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setMessage("");
      setSubject("");
      setSuggestions([]);
      setTimeout(() => setSubmitted(false), 4000);
    }, 1800);
  }

  return (
    <section id="contact" className="page-section contact-section">
      <div className="section-inner contact-inner">
        {/* Section Header */}
        <div className="section-header">
          <p className="section-eyebrow">LET&apos;S CONNECT</p>
          <h2 className="section-title">
            Get In <span>Touch</span>
          </h2>
          <p className="section-subtitle">
            Whether you&apos;re looking for an AI engineer, collaborator, or have an
            innovative idea — I&apos;d love to hear from you.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="contact-grid">
          {/* LEFT — Radial Contact Menu + Info */}
          <div className="contact-left">
            {/* ✦ Toggle Radial Menu */}
            <div className={`contact-radial-menu ${menuOpen ? "active" : ""}`}>
              {/* Center toggle */}
              <button
                className="contact-radial-toggle"
                onClick={() => setMenuOpen((p) => !p)}
                aria-label="Toggle contact menu"
                aria-expanded={menuOpen}
              >
                <span className="contact-radial-toggle-icon">
                  {menuOpen ? "✕" : "✦"}
                </span>
              </button>

              {/* Orbiting icons */}
              {socialLinks.map((link, i) => {
                const total = socialLinks.length;
                const angle = (360 / total) * i - 90; // start from top
                const rad = (angle * Math.PI) / 180;
                const r = 105; // orbit radius in px
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                return (
                  <button
                    key={link.id}
                    className={`contact-orbit-icon ${menuOpen ? "visible" : ""}`}
                    style={
                      {
                        "--x": `${x}px`,
                        "--y": `${y}px`,
                        "--delay": `${i * 40}ms`,
                        "--bg": link.bgColor,
                        "--clr": link.color,
                      } as React.CSSProperties
                    }
                    onClick={() => handleIconClick(link)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleIconClick(link);
                      }
                    }}
                    title={link.label}
                    aria-label={link.label}
                  >
                    <span className="contact-orbit-icon-inner">{link.icon}</span>
                    <span className="contact-orbit-label">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Info block */}
            <div className="contact-info-block">
              <div className="contact-status-badge">
                <span className="contact-status-dot" />
                Available for AI &amp; ML Opportunities
              </div>

              <h3 className="contact-cta-heading">
                Have an Idea?<br />
                <span>Let&apos;s Build It Together.</span>
              </h3>

              <ul className="contact-details-list">
                <li>
                  <span className="contact-detail-icon"><FaMapMarkerAlt /></span>
                  <div>
                    <span className="contact-detail-label">Location</span>
                    <span className="contact-detail-value">Kalluvathukkal, Kollam, Kerala</span>
                  </div>
                </li>
                <li>
                  <span className="contact-detail-icon"><FaEnvelope /></span>
                  <div>
                    <span className="contact-detail-label">Email</span>
                    <span className="contact-detail-value">sskzm5780@gmail.com</span>
                  </div>
                </li>
              </ul>

              <div className="contact-panel-tabs">
                <button
                  className={`contact-panel-tab ${activePanel === "email" ? "active" : ""}`}
                  onClick={() => setActivePanel("email")}
                >
                  <FaEnvelope /> Message
                </button>
                <button
                  className={`contact-panel-tab ${activePanel === "location" ? "active" : ""}`}
                  onClick={() => setActivePanel("location")}
                >
                  <FaMapMarkerAlt /> Location
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Contextual Panel */}
          <div className="contact-right">
            {/* ===== EMAIL FORM PANEL ===== */}
            {activePanel === "email" && (
              <div className="contact-form-card">
                <div className="contact-form-card-header">
                  <p className="contact-form-eyebrow">SEND A MESSAGE</p>
                  <h3 className="contact-form-title">Start a Conversation</h3>
                  <p className="contact-form-sub">
                    Fill out the form and I&apos;ll get back to you as soon as possible.
                  </p>
                </div>

                {submitted ? (
                  <div className="contact-success">
                    <div className="contact-success-icon">✓</div>
                    <h4>Message Sent!</h4>
                    <p>
                      Thank you for reaching out. I&apos;ll review your message and get
                      back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    <div className="contact-row">
                      <div className="contact-field">
                        <label htmlFor="c-name">Your Name</label>
                        <input
                          id="c-name"
                          type="text"
                          name="name"
                          required
                          autoComplete="name"
                          placeholder="Devanarayanan"
                        />
                      </div>
                      <div className="contact-field">
                        <label htmlFor="c-email">Email Address</label>
                        <input
                          id="c-email"
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="contact-field">
                      <label htmlFor="c-subject">Subject</label>
                      <input
                        id="c-subject"
                        type="text"
                        name="subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="AI Project Collaboration / Job Opportunity"
                      />
                      {suggestions.length > 0 && (
                        <div className="contact-subject-suggestions">
                          <span className="suggestions-label">Suggestions:</span>
                          {suggestions.map((s) => (
                            <button
                              key={s}
                              type="button"
                              className="suggestion-chip"
                              onClick={() => setSubject(s)}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="contact-field">
                      <label htmlFor="c-message">Message</label>
                      <textarea
                        id="c-message"
                        name="message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me about your project, idea, or opportunity..."
                      />
                    </div>

                    <div className="contact-form-footer">
                      <span className="contact-form-hint">
                        AI • ML • Full Stack Engineer
                      </span>
                      <button
                        type="submit"
                        className={`contact-submit ${loading ? "loading" : ""}`}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="contact-spinner" /> Sending…
                          </>
                        ) : (
                          <>
                            Let&apos;s Build Together <span className="submit-arrow">→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ===== LOCATION MAP PANEL ===== */}
            {activePanel === "location" && (
              <div className="contact-map-card">
                <div className="contact-map-header">
                  <div className="contact-map-pin">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="contact-map-title">KALLUVATHUKKAL, KOLLAM</h3>
                    <p className="contact-map-subtitle">8.8322° N, 76.7488° E · Kerala 691578</p>
                  </div>
                </div>
                <div className="contact-map-frame">
                  <iframe
                    title="Kalluvathukkal Kollam Kerala Map"
                    src="https://maps.google.com/maps?q=8.832251072036884,76.74886269114106&z=15&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="contact-map-footer">
                  <span>📍 Building the future with AI &amp; ML from Kerala, India</span>
                  <a
                    href="https://maps.app.goo.gl/psnkTCYgaqk1KnRt6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-map-open-btn"
                  >
                    Open in Maps →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}