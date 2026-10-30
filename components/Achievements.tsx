"use client";

import {
  Bot,
  Cog,
  Award,
  GraduationCap,
  Car,
  Shield,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

interface Achievement {
  id: string;
  icon: React.ReactNode;
  title: string;
  organization: string;
  duration: string;
  description: string;
  category: string;
  certificateUrl: string;
}

const achievements: Achievement[] = [
  {
    id: "cyborg-robotics",
    icon: <Bot size={22} aria-hidden="true" />,
    title: "Robotics & Drone Development Internship",
    organization: "Cyborg AI Gen Automation",
    duration: "June 2025 • 7 Days",
    category: "Industry Internship",
    description:
      "Hands-on training in robotics, drone aerodynamics, embedded controllers, Arduino programming, sensors, automation, and real-time hardware telemetry.",
    certificateUrl: "/certificates/cyborg-robotics.jpg",
  },
  {
    id: "techmaghi-robotics",
    icon: <Cog size={22} aria-hidden="true" />,
    title: "Robotics Internship",
    organization: "TechMaghi",
    duration: "December 2022 • 5 Days",
    category: "Technical Internship",
    description:
      "Intensive training in robotics fundamentals, microcontroller programming, embedded circuits, hardware-software integration, and automated control systems.",
    certificateUrl: "/certificates/techmaghi-robotics.jpg",
  },
  {
    id: "genzee-quiz",
    icon: <Award size={22} aria-hidden="true" />,
    title: "National Technical Quiz",
    organization: "Genzee Technologies",
    duration: "July 2025",
    category: "Technical Event",
    description:
      "National-level competitive technical evaluation covering robotics engineering, drone development, autonomous automation, and cutting-edge computing paradigms.",
    certificateUrl: "/certificates/genzee-quiz.jpg",
  },
  {
    id: "genzee-webinar",
    icon: <GraduationCap size={22} aria-hidden="true" />,
    title: "Industry Orientation Webinar",
    organization: "Genzee Technologies",
    duration: "July 2025",
    category: "Professional Development",
    description:
      "Advanced technical session covering artificial intelligence market landscapes, engineering career trajectories, and scalable software delivery standards.",
    certificateUrl: "/certificates/genzee-webinar.jpg",
  },
  {
    id: "ev-workshop",
    icon: <Car size={22} aria-hidden="true" />,
    title: "Self-Driving Electric Vehicle Workshop",
    organization: "Technical Workshop",
    duration: "Technical Session",
    category: "Automotive AI",
    description:
      "Comprehensive workshop exploring autonomous vehicle architectures, intelligent transportation systems, LiDAR/RADAR sensing, and self-driving computer vision models.",
    certificateUrl: "/certificates/ev-workshop.jpg",
  },
  {
    id: "ncc-cert",
    icon: <Shield size={22} aria-hidden="true" />,
    title: "NCC 'C' Certificate",
    organization: "National Cadet Corps",
    duration: "B Grade",
    category: "Leadership & Discipline",
    description:
      "Rigorous leadership, tactical discipline, operational teamwork, resilience under pressure, and structured military-grade field training.",
    certificateUrl: "/certificates/ncc-certificate.jpg",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="page-section">
      <div className="section-inner">
        {/* Section Heading */}
        <div className="section-header">
          <h2 className="section-title">
            Certifications &amp; <span>Honors</span>
          </h2>
          <p className="section-subtitle">
            Verified industry training, robotics workshops, and national technical credentials.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid">
          {achievements.map((item) => (
            <a
              key={item.id}
              href={item.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="achievement-card"
              title={`View ${item.title} Certificate`}
              aria-label={`View certificate for ${item.title} (opens JPG in new tab)`}
            >
              <div className="achievement-top">
                <div className="achievement-icon">{item.icon}</div>
                <span className="achievement-category">{item.category}</span>
              </div>

              <h3 className="achievement-title">{item.title}</h3>
              <div className="achievement-organization">{item.organization}</div>
              <div className="achievement-duration">{item.duration}</div>

              <p className="achievement-description">{item.description}</p>
              <div className="achievement-divider" aria-hidden="true" />

              <div className="achievement-footer">
                <span className="achievement-label">View Certificate</span>
                <span className="achievement-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Continuous Learning Bottom Banner */}
        <div className="achievements-bottom">
          <div className="achievements-bottom-card">
            <div className="achievement-bottom-icon" aria-hidden="true">
              <Sparkles size={24} />
            </div>
            <div className="achievement-bottom-content">
              <h3>Continuous Technical Evolution</h3>
              <p>
                Engineering excellence demands relentless curiosity. Every internship,
                hands-on lab, certification, and technical competition deepens my
                mastery across machine learning architectures, real-time embedded systems,
                and production-grade software delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
