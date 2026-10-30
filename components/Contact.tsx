"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import {
  Mail,
  MapPin,
  Download,
  Share2,
  X,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

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
    icon: <Download size={18} aria-hidden="true" />,
    color: "#ffffff",
    bgColor: "#e54704",
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "fallback">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Auto-suggest subjects based on message content
  const suggestions = useMemo(() => {
    if (!message.trim()) return [];
    const lower = message.toLowerCase();
    const found = new Set<string>();
    for (const [keyword, subs] of Object.entries(SUBJECT_SUGGESTIONS)) {
      if (lower.includes(keyword)) {
        subs.forEach((s) => found.add(s));
      }
    }
    return Array.from(found).slice(0, 3);
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

  function handleCopyEmail() {
    navigator.clipboard.writeText("devanarayananstackuplearning@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusMessage("Please provide your name, email, and message.");
      return;
    }

    setLoading(true);
    setStatusMessage("");

    const targetEmail = "devanarayananstackuplearning@gmail.com";
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (accessKey && accessKey.trim() !== "") {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey.trim(),
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim() || `Portfolio Inquiry from ${name}`,
            message: message.trim(),
            from_name: `${name} (via Portfolio)`,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setSubmitted(true);
          setFormStatus("success");
          setName("");
          setEmail("");
          setMessage("");
          setSubject("");
          setLoading(false);
          return;
        } else {
          throw new Error(data.message || "Failed to send via Web3Forms");
        }
      } catch (err) {
        console.warn("Web3Forms submission failed, launching direct mail client:", err);
      }
    }

    // Direct Mailto Fallback: Opens email client prefilled to devanarayananstackuplearning@gmail.com
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
      subject.trim() || `Portfolio Inquiry from ${name}`
    )}&body=${encodeURIComponent(
      `Hi Devanarayanan,\n\n${message.trim()}\n\n---\nFrom: ${name.trim()} (${email.trim()})`
    )}`;
    window.location.href = mailtoUrl;

    setSubmitted(true);
    setFormStatus("fallback");
    setName("");
    setEmail("");
    setMessage("");
    setSubject("");
    setLoading(false);
  }

  return (
    <section id="contact" className="page-section contact-section">
      <div className="section-inner contact-inner">
        {/* Section Header */}
        <div className="section-header">
          <p className="section-eyebrow">CHAPTER 06 // INITIATE TRANSMISSION</p>
          <h2 className="section-title">
            Start a <span>Conversation</span>
          </h2>
          <p className="section-subtitle">
            Ready to build something intelligent? My inbox and channels are always open.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="contact-grid">
          {/* LEFT — Radial Contact Menu + Info */}
          <div className="contact-left">
            {/* Toggle Radial Menu */}
            <div className={`contact-radial-menu ${menuOpen ? "active" : ""}`}>
              {/* Center toggle */}
              <button
                className="contact-radial-toggle"
                onClick={() => setMenuOpen((p) => !p)}
                aria-label={menuOpen ? "Close contact orbit menu" : "Open contact orbit menu"}
                aria-expanded={menuOpen}
              >
                <span className="contact-radial-toggle-icon" aria-hidden="true">
                  {menuOpen ? <X size={18} /> : <Share2 size={18} />}
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
                    <span className="contact-orbit-icon-inner" aria-hidden="true">{link.icon}</span>
                    <span className="contact-orbit-label">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Info block */}
            <div className="contact-info-block">
              <div className="contact-status-badge">
                <span className="contact-status-dot" aria-hidden="true" />
                <span>Available for AI &amp; ML Opportunities</span>
              </div>

              <h3 className="contact-cta-heading">
                Have an Idea?<br />
                <span>Let&apos;s Build It Together.</span>
              </h3>

              <ul className="contact-details-list">
                <li>
                  <span className="contact-detail-icon" aria-hidden="true">
                    <MapPin size={16} />
                  </span>
                  <div>
                    <span className="contact-detail-label">Location</span>
                    <span className="contact-detail-value">Kalluvathukkal, Kollam, Kerala</span>
                  </div>
                </li>
                <li>
                  <span className="contact-detail-icon" aria-hidden="true">
                    <Mail size={16} />
                  </span>
                  <div>
                    <span className="contact-detail-label">Direct Email</span>
                    <a
                      href="mailto:devanarayananstackuplearning@gmail.com"
                      className="contact-detail-value"
                      style={{ color: "#36f7f9", textDecoration: "none" }}
                    >
                      devanarayananstackuplearning@gmail.com
                    </a>
                  </div>
                </li>
              </ul>

              <div className="contact-panel-tabs" role="tablist" aria-label="Contact View Options">
                <button
                  role="tab"
                  aria-selected={activePanel === "email"}
                  className={`contact-panel-tab ${activePanel === "email" ? "active" : ""}`}
                  onClick={() => setActivePanel("email")}
                >
                  <Mail size={14} aria-hidden="true" />
                  <span>Send Message</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activePanel === "location"}
                  className={`contact-panel-tab ${activePanel === "location" ? "active" : ""}`}
                  onClick={() => setActivePanel("location")}
                >
                  <MapPin size={14} aria-hidden="true" />
                  <span>View Location</span>
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
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                    <p className="contact-form-eyebrow" style={{ margin: 0 }}>SEND A MESSAGE</p>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="contact-copy-badge"
                      title="Click to copy email address"
                      aria-label="Copy direct email address to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check size={13} aria-hidden="true" />
                          <span>Copied Email!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} aria-hidden="true" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>
                  <h3 className="contact-form-title">Start a Conversation</h3>
                  <p className="contact-form-sub">
                    Directly delivered to <strong style={{ color: "#36f7f9" }}>devanarayananstackuplearning@gmail.com</strong>
                  </p>
                </div>

                {submitted ? (
                  <div className="contact-success">
                    <div className="contact-success-icon" aria-hidden="true">
                      <Check size={28} />
                    </div>
                    <h4>Message Sent!</h4>
                    <p>
                      {formStatus === "fallback"
                        ? "Opening your default email app to send directly to devanarayananstackuplearning@gmail.com. I will review and reply within 24 hours!"
                        : "Thank you for reaching out! Your message was delivered directly to devanarayananstackuplearning@gmail.com. I will reply within 24 hours."}
                    </p>
                    <button
                      type="button"
                      className="btn-primary"
                      style={{ marginTop: 16 }}
                      onClick={() => {
                        setSubmitted(false);
                        setFormStatus("idle");
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    {statusMessage && (
                      <div className="contact-form-error" style={{ color: "#ff8c38", fontSize: "0.85rem", fontWeight: 600 }}>
                        {statusMessage}
                      </div>
                    )}
                    <div className="contact-row">
                      <div className="contact-field">
                        <label htmlFor="c-name">Your Name</label>
                        <input
                          id="c-name"
                          type="text"
                          name="name"
                          required
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                            <span className="contact-spinner" aria-hidden="true" />
                            <span>Sending…</span>
                          </>
                        ) : (
                          <>
                            <span>Let&apos;s Build Together</span>
                            <ArrowRight size={15} className="submit-arrow" aria-hidden="true" />
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
                  <div className="contact-map-pin" aria-hidden="true">
                    <MapPin size={20} />
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
                  <span className="contact-map-footer-text">
                    <MapPin size={13} aria-hidden="true" />
                    <span>Building the future with AI &amp; ML from Kerala, India</span>
                  </span>
                  <a
                    href="https://maps.app.goo.gl/psnkTCYgaqk1KnRt6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-map-open-btn"
                    aria-label="Open Kalluvathukkal location in Google Maps"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink size={13} aria-hidden="true" />
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
