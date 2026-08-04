"use client";

import Image from "next/image";

export default function About() {
  const today = new Date();
  const birthDate = new Date(2004, 6, 30);
  let age = today.getFullYear() - birthDate.getFullYear();
  if (today < new Date(today.getFullYear(), 6, 30)) {
    age--;
  }

  return (
    <section id="about" className="page-section">
      <div className="section-inner">
        {/* ===========================
            Section Header
        =========================== */}
        <div className="section-header">
          <p className="section-eyebrow">GET TO KNOW ME</p>
          <h2 className="section-title">
            About <span>Me</span>
          </h2>
          <p className="section-subtitle">
            Building intelligent AI solutions that bridge technology,
            innovation, and real-world impact.
          </p>
        </div>

        {/* ===========================
            Main Grid
        =========================== */}
        <div className="about-grid">
          {/* =========================================
              LEFT SIDE
          ========================================= */}
          <div className="about-left">
            <div className="about-image-card">
              <Image
                src="/deva.jpg"
                alt="Devanarayanan V S"
                width={420}
                height={420}
                priority
                className="about-image"
              />
            </div>

            <div className="about-profile">
              <span className="about-badge">AI • ML • SOFTWARE ENGINEER</span>
              <h3 className="about-name">
                Devanarayanan<span> V S</span>
              </h3>
              <p className="about-role">AI & Machine Learning Graduate</p>
              <p className="about-tagline">
                Passionate about developing intelligent software that
                transforms ideas into meaningful real-world impact.
              </p>

              <div className="about-meta">
                <span>📍 Kerala, India</span>
                <span className="meta-divider">•</span>
                {/* Only render age once it's calculated */}
                <span>
                  {age !== null ? `${age} Years Old` : "..."}
                </span>
              </div>

              <div className="availability">
                <span className="availability-dot"></span>
                Available for AI & ML Opportunities
              </div>
            </div>
          </div>

          {/* =========================================
              RIGHT SIDE
          ========================================= */}
          <div className="about-content">
            <h3 className="about-heading">
              Crafting Intelligent Solutions with Artificial Intelligence
            </h3>

            <p className="about-paragraph">
              I am an Artificial Intelligence and Machine Learning graduate
              from Kerala, India, passionate about building intelligent
              software that solves meaningful real-world problems. My primary
              interest lies in applying Artificial Intelligence to healthcare,
              where technology can enhance decision-making, improve patient
              outcomes, and create solutions that positively impact people&apos;s
              lives.
            </p>

            <p className="about-paragraph">
              My expertise spans Machine Learning, Deep Learning, Computer
              Vision, Generative AI, Large Language Models, and Full Stack AI
              application development. I enjoy transforming innovative ideas
              into complete software solutions by combining modern AI
              technologies with scalable web applications and intuitive user
              experiences.
            </p>

            <p className="about-paragraph">
              I believe that continuous learning drives innovation. Every
              project I build is an opportunity to explore emerging
              technologies, strengthen my engineering skills, and develop AI
              systems that are reliable, practical, and capable of solving
              complex challenges across different industries.
            </p>

            {/* Focus Areas */}
            <div className="about-focus">
              <div className="highlight">🤖 Artificial Intelligence</div>
              <div className="highlight">🧠 Machine Learning</div>
              <div className="highlight">🏥 Healthcare AI</div>
              <div className="highlight">👁️ Computer Vision</div>
              <div className="highlight">💬 Large Language Models</div>
              <div className="highlight">✨ Generative AI</div>
              <div className="highlight">🌐 Full Stack Development</div>
              <div className="highlight">📊 Data Science</div>
              <div className="highlight">🚀 Intelligent Automation</div>
            </div>

            {/* Statistics */}
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-value">10+</div>
                <div className="stat-label">Projects Completed</div>
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

            {/* Vision */}
            <div className="about-vision">
              <h4>My Vision</h4>
              <p className="about-paragraph">
                My goal is to contribute to the future of Artificial
                Intelligence by developing ethical, reliable, and
                human-centered AI systems that make a lasting impact,
                particularly in healthcare, intelligent automation, and
                next-generation software solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}