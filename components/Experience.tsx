"use client";

import Image from "next/image";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaLaptopCode,
  FaCogs,
} from "react-icons/fa";

const skills = [
  "Python",
  "Artificial Intelligence",
  "Machine Learning",
  "FastAPI",
  "Deep Learning",
  "Html & CSS",
  "Problem Solving",
];

export default function Experience() {
  return (
    <section id="experience" className="page-section experience-section">
      <div className="section-inner">
        {/* Section Heading */}
        <div className="section-header">
          <h2 className="section-title">
            Professional <span>Experience &amp; Industry</span>
          </h2>

          <p className="section-subtitle">
            Transforming AI &amp; ML theoretical models into scalable, production-grade applications.
          </p>
        </div>

        {/* Master Unified Glass Container */}
        <div className="experience-master-card">
          {/* Top Integrated Status Header */}
          <div className="exp-master-header">
            <div className="exp-status-live">
              <span className="live-pulse-dot" />
              <span>CURRENTLY WORKING • TECHNOPARK, KERALA</span>
            </div>

            <div className="exp-company-brand">
              <span className="brand-dot" />
              STACKMOD INNOVATION
            </div>
          </div>

          {/* Master Content Layout Grid */}
          <div className="exp-master-grid">
            {/* Left Content Side */}
            <div className="exp-info-col">
              <h3 className="exp-company-name">
                Stackmod Innovation
              </h3>

              <div className="exp-role-badge">
                <span>Software Engineer Intern</span>

                <span className="exp-date-tag">
                  <FaCalendarAlt />
                  August 2026 - Present
                </span>
              </div>

              <p className="exp-summary-text">
                Developing real-world Artificial Intelligence and Machine
                Learning software, scalable AI backend services, and
                data-driven applications. Collaborating with cross-functional
                engineering teams to implement production-ready AI models and
                tackle complex technical challenges.
              </p>

              {/* Skills Tags */}
              <div className="exp-skills-flex">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="exp-skill-pill"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Mini Focus Cards */}
              <div className="exp-focus-cards">
                <div className="exp-focus-card">
                  <div className="focus-card-icon">
                    <FaLaptopCode />
                  </div>

                  <div>
                    <h4>AI System Engineering</h4>

                    <p>
                      Building intelligent APIs &amp; neural network
                      inference pipelines.
                    </p>
                  </div>
                </div>

                <div className="exp-focus-card">
                  <div className="focus-card-icon">
                    <FaCogs />
                  </div>

                  <div>
                    <h4>Backend Integration</h4>

                    <p>
                      Designing high-throughput FastAPI endpoints with
                      async optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Integrated ID Card Column */}
            <div className="exp-id-col">
              <div className="exp-id-badge-frame">
                {/* Header */}
                <div className="id-badge-top">
                  <span className="id-brand-text">
                    STACKMOD
                  </span>

                  <span className="id-verified-pill">
                    <FaCheckCircle />
                    VERIFIED INTERN
                  </span>
                </div>

                {/* ID Photo */}
                <div className="id-photo-wrapper">
                  <Image
                    src="/stackmodid.jpeg"
                    alt="Devanarayanan - Stackmod ID"
                    width={260}
                    height={300}
                    className="id-photo-img"
                    priority
                  />

                  <div className="id-photo-shimmer" />
                </div>

                {/* Info */}
                <div className="id-meta-block">
                  <h4 className="id-name">
                    DEVANARAYANAN
                  </h4>

                  <p className="id-title">
                INTERN SOFTWARE ENGINEER
                  </p>

                  <div className="id-fields-grid">
                    <div>
                      <span className="id-field-label">
                        LOCATION
                      </span>

                      <span className="id-field-val">
                        Technopark, Trivandrum
                      </span>
                    </div>

                    <div>
                      <span className="id-field-label">
                        DOMAIN
                      </span>

                      <span className="id-field-val">
                        Artificial Intelligence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}