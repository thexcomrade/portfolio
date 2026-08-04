"use client";

import { FormEvent, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileDownload,
} from "react-icons/fa";

interface SocialLink {
  id: number;
  label: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    id: 1,
    label: "GitHub",
    icon: <FaGithub />,
    href: "https://github.com/thexcomrade",
    color: "#ffffff",
  },
  {
    id: 2,
    label: "LinkedIn",
    icon: <FaLinkedin />,
    href: "https://linkedin.com/in/devanarayanan-vs/",
    color: "#0A66C2",
  },
  {
    id: 3,
    label: "Instagram",
    icon: <FaInstagram />,
    href: "https://instagram.com",
    color: "#E1306C",
  },
  {
    id: 4,
    label: "Email",
    icon: <FaEnvelope />,
    href: "mailto:sskzm5780@email.com",
    color: "#22d3ee",
  },
  {
    id: 5,
    label: "Location",
    icon: <FaMapMarkerAlt />,
    href: "https://maps.app.goo.gl/o5KGAVaS8BHB1Hsu5",
    color: "#34A853",
  },
  {
    id: 6,
    label: "Resume",
    icon: <FaFileDownload />,
    href: "/resume.pdf",
    color: "#8b5cf6",
  },
];

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }, 1800);
  }

  const RADIUS = 105; // distance from center in px

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
          {/* LEFT — Center Toggle Radial Menu + Info */}
          <div className="contact-left">
            {/* Center-Toggle Radial Menu Container */}
            <div className={`contact-radial-container ${menuOpen ? "active" : ""}`}>
              {/* Center ✦ Toggle Button */}
              <button
                type="button"
                className="radial-center-btn"
                onClick={() => setMenuOpen((p) => !p)}
                aria-label={menuOpen ? "Close contact menu" : "Open contact menu"}
                aria-expanded={menuOpen}
              >
                <span className="radial-center-icon">
                  {menuOpen ? "×" : "✦"}
                </span>
              </button>

              {/* Radial Social Action Buttons */}
              {socialLinks.map((s, i) => {
                const angle = (i * 2 * Math.PI) / socialLinks.length - Math.PI / 2;
                const x = Math.round(Math.cos(angle) * RADIUS);
                const y = Math.round(Math.sin(angle) * RADIUS);

                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="radial-orbit-item"
                    style={{
                      "--x": `${x}px`,
                      "--y": `${y}px`,
                      "--clr": s.color,
                      "--delay": `${i * 0.05}s`,
                    } as React.CSSProperties}
                    title={s.label}
                  >
                    <span className="radial-orbit-icon">{s.icon}</span>
                    <span className="radial-orbit-tooltip">{s.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Availability & Quick Info */}
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
                    <span className="contact-detail-value">Kollam, Kerala, India</span>
                  </div>
                </li>
                <li>
                  <span className="contact-detail-icon"><FaEnvelope /></span>
                  <div>
                    <span className="contact-detail-label">Email</span>
                    <span className="contact-detail-value">sskzm5780@email.com</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT — Message Form */}
          <div className="contact-right">
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
                        placeholder="Devanarayanan V S"
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
                      placeholder="AI Project Collaboration / Job Opportunity"
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="c-message">Message</label>
                    <textarea
                      id="c-message"
                      name="message"
                      rows={4}
                      required
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
          </div>
        </div>
      </div>
    </section>
  );
}