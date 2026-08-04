"use client";

interface Achievement {
  icon: string;
  title: string;
  organization: string;
  duration: string;
  description: string;
  category: string;
}

const achievements: Achievement[] = [

  {
    icon: "🤖",

    title: "Robotics & Drone Development Internship",

    organization: "Cyborg AI Gen Automation",

    duration: "June 2025 • 7 Days",

    category: "Industry Internship",

    description:
      "Hands-on training in robotics, drone technologies, embedded systems, Arduino programming, sensors, automation, and practical engineering applications.",
  },

  {
    icon: "⚙️",

    title: "Robotics Internship",

    organization: "TechMaghi",

    duration: "December 2022 • 5 Days",

    category: "Technical Internship",

    description:
      "Focused on robotics fundamentals, Arduino programming, embedded systems, hardware integration, and automation concepts.",
  },

  {
    icon: "🚁",

    title: "National Technical Quiz",

    organization: "Genzee Technologies",

    duration: "July 2025",

    category: "Technical Event",

    description:
      "National-level technical quiz covering robotics, drone development, automation, and emerging engineering technologies.",
  },

  {
    icon: "🎓",

    title: "Industry Orientation Webinar",

    organization: "Genzee Technologies",

    duration: "July 2025",

    category: "Professional Development",

    description:
      "Technical webinar focused on engineering career opportunities, industry expectations, and emerging technology trends.",
  },

  {
    icon: "🚗",

    title: "Self-Driving Electric Vehicle Workshop",

    organization: "Technical Workshop",

    duration: "Workshop",

    category: "Automotive AI",

    description:
      "Workshop covering autonomous vehicles, intelligent transportation systems, sensors, automation, and self-driving technologies.",
  },

  {
    icon: "🪖",

    title: "NCC 'C' Certificate",

    organization: "National Cadet Corps",

    duration: "B Grade",

    category: "Leadership",

    description:
      "Leadership, discipline, teamwork, resilience, decision-making, and structured military training through the National Cadet Corps.",
  },

];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="page-section"
    >
      <div className="section-inner">

        {/* ===========================
            Section Heading
        =========================== */}

        <div className="section-header">

          <p className="section-eyebrow">
            PROFESSIONAL DEVELOPMENT
          </p>

          <h2 className="section-title">
            Certifications &
            <span> Training</span>
          </h2>

          <p className="section-subtitle">
            Professional internships, technical workshops,
            industry programs, and leadership experiences
            that strengthened my practical knowledge in
            Artificial Intelligence, Robotics, Automation,
            and modern engineering technologies.
          </p>

        </div>

        {/* ===========================
            Achievement Grid
        =========================== */}

        <div className="achievements-grid">

          {achievements.map((item) => (

            <div
              key={item.title}
              className="achievement-card"
            >

              <div className="achievement-top">

                <div className="achievement-icon">

                  {item.icon}

                </div>

                <span className="achievement-category">

                  {item.category}

                </span>

              </div>

              <h3 className="achievement-title">

                {item.title}

              </h3>

              <div className="achievement-organization">

                {item.organization}

              </div>

              <div className="achievement-duration">

                {item.duration}

              </div>

              <p className="achievement-description">

                {item.description}

              </p>
                            <div className="achievement-divider"></div>

              {/* Bottom */}

              <div className="achievement-footer">

                <span className="achievement-label">

                  {item.category}

                </span>

                <span className="achievement-arrow">

                  ↗

                </span>

              </div>

            </div>

          ))}

        </div>

        {/* ==========================================
            Bottom Section
        ========================================== */}

        <div className="achievements-bottom">

          <div className="achievements-bottom-card">

            <div className="achievement-bottom-icon">

              🚀

            </div>

            <div className="achievement-bottom-content">

              <h3>

                Continuous Learning

              </h3>

              <p>

                I believe learning never stops. Every internship,
                workshop, certification, and technical event has
                strengthened my practical understanding of Artificial
                Intelligence, Robotics, Embedded Systems, Automation,
                and modern software development. I continuously seek
                opportunities to expand my knowledge and apply emerging
                technologies to solve meaningful real-world problems.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}