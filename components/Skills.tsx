"use client";

import { useState } from "react";
import {
  FaPython,
  FaGitAlt,
  FaRobot,
} from "react-icons/fa";
import {
  SiPytorch,
  SiNextdotjs,
  SiFastapi,
  SiTypescript,
  SiScikitlearn,
  SiOpencv,
} from "react-icons/si";
import { X, Sparkles } from "lucide-react";

interface SkillItem {
  name: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  level: string;
  description: string;
  details: string[];
}

const skillsData: SkillItem[] = [
  {
    name: "Python",
    category: "AI & Machine Learning",
    icon: <FaPython />,
    color: "#38bdf8",
    level: "Core Language",
    description: "Primary language for deep learning, computer vision, data manipulation, and high-performance backend services.",
    details: ["NumPy & Pandas vectorized data pipelines", "Scikit-Learn, PyTorch & TensorFlow workflows", "Asynchronous I/O with FastAPI and Pydantic schemas"],
  },
  {
    name: "Generative AI & RAG",
    category: "Generative AI & RAG",
    icon: <Sparkles />,
    color: "#ff7a18",
    level: "Production Deployed",
    description: "Retrieval-Augmented Generation architectures combining curated vector knowledge with frontier LLMs.",
    details: ["Gemini 2.5 Flash & OpenAI LLM integration", "Tourism RAG knowledge base across 100+ destinations", "Deterministic fallback routing & structured JSON generation"],
  },
  {
    name: "Computer Vision & OpenCV",
    category: "Computer Vision",
    icon: <SiOpencv />,
    color: "#36f7f9",
    level: "Evaluation Benchmark",
    description: "Facial landmarking, image feature extraction, and real-time deepfake classification pipelines.",
    details: ["OpenCV color-space & edge feature extraction", "Linear SVC classifier benchmarked on 1,000 face images", "7.63ms per-face CPU inference latency footprint"],
  },
  {
    name: "Machine Learning & Scikit-Learn",
    category: "AI & Machine Learning",
    icon: <SiScikitlearn />,
    color: "#F7931E",
    level: "Core Specialization",
    description: "Classical statistical machine learning algorithms, classification models, and rigorous metric evaluation.",
    details: ["Linear Support Vector Classification (SVC)", "Cross-validation, hyperparameter tuning & grid search", "Evaluation metrics: ROC-AUC (0.9275), F1-Score (93.31%), Accuracy (93.40%)"],
  },
  {
    name: "Deep Learning & PyTorch",
    category: "AI & Machine Learning",
    icon: <SiPytorch />,
    color: "#EE4C2C",
    level: "Applied Engineering",
    description: "Neural network architectures for image classification, transfer learning, and pattern recognition.",
    details: ["Convolutional Neural Networks (CNNs)", "Transfer learning with standard vision backbones", "Model training, validation splits & loss convergence"],
  },
  {
    name: "FastAPI & Python Backends",
    category: "Backend & Systems",
    icon: <SiFastapi />,
    color: "#009688",
    level: "Production Deployed",
    description: "Asynchronous RESTful APIs engineered for scalable microservices and low-latency model inference.",
    details: ["Asynchronous route handlers with strict Pydantic validation", "SQLAlchemy ORM integration & medical data schema design", "OpenAPI / Swagger automatic specification and documentation"],
  },
  {
    name: "Next.js & React 19",
    category: "Web & Frontend",
    icon: <SiNextdotjs />,
    color: "#ffffff",
    level: "Production Deployed",
    description: "Modern full-stack web applications with Next.js App Router, server-rendered components, and responsive UI.",
    details: ["Next.js 16 App Router architecture & TypeScript contracts", "Accessible, keyboard-navigable component design (WCAG AA)", "Framer Motion restrained physics and responsive layout composition"],
  },
  {
    name: "TypeScript",
    category: "Web & Frontend",
    icon: <SiTypescript />,
    color: "#3178C6",
    level: "Core Specialization",
    description: "Strictly typed JavaScript ensuring bug-free data flow between client interfaces and backend endpoints.",
    details: ["Strict type checking without unwarranted any types", "Generic data models and structured project interfaces", "Type-safe React hooks, props, and API response contracts"],
  },
  {
    name: "Robotics & Embedded Systems",
    category: "Robotics & Hardware",
    icon: <FaRobot />,
    color: "#10b981",
    level: "Hardware Verified",
    description: "Physical autonomous mobile robots, microcontrollers, sensor integration, and motor actuation.",
    details: ["Arduino C++ embedded firmware & L293D motor drivers", "Ultrasonic distance sensing with micro-servo scanning routines", "HC-05 Bluetooth transceiver communication & mobile override"],
  },
  {
    name: "Git, GitHub & Engineering Tools",
    category: "Developer Tools",
    icon: <FaGitAlt />,
    color: "#F05032",
    level: "Production Workflow",
    description: "Professional version control, collaborative development, and deployment pipelines.",
    details: ["Branching strategies, semantic commits & code reviews", "GitHub Actions CI/CD workflows and linting checks", "Google Colab GPU environments & reproducible requirements"],
  },
];

const categories = [
  "All",
  "AI & Machine Learning",
  "Generative AI & RAG",
  "Computer Vision",
  "Backend & Systems",
  "Web & Frontend",
  "Robotics & Hardware",
  "Developer Tools",
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="page-section skills-section">
      <div className="section-inner">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Technical <span>Competencies &amp; Stack</span>
          </h2>
          <p className="section-subtitle">
            Evidence-based tools and technologies deployed across practical AI/ML, backend APIs, and hardware systems.
          </p>
        </div>

        {/* Category Filters */}
        <div className="skills-filter-bar" role="tablist" aria-label="Technology Categories">
          {categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              className={`skills-filter-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Responsive Cards Grid */}
        <div className="skills-cards-grid">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="skill-card-glass"
              style={{ "--skill-accent": skill.color } as React.CSSProperties}
              onClick={() => setSelectedSkill(skill)}
              role="button"
              tabIndex={0}
              aria-label={`View detailed competencies for ${skill.name}`}
              onKeyDown={(e) => e.key === "Enter" && setSelectedSkill(skill)}
            >
              <div className="skill-card-top">
                <div className="skill-card-icon" aria-hidden="true">{skill.icon}</div>
                <div className="skill-card-badge">{skill.category}</div>
              </div>

              <h3 className="skill-card-title">{skill.name}</h3>
              <p className="skill-card-desc">{skill.description}</p>

              {/* Competency Level indicator */}
              <div className="skill-progress-container">
                <div className="skill-progress-header">
                  <span>Competency</span>
                  <span style={{ color: "var(--skill-accent, #ff7a18)", fontWeight: 700 }}>{skill.level}</span>
                </div>
                <div className="skill-progress-track">
                  <div
                    className="skill-progress-fill"
                    style={{
                      width: "100%",
                      background: "linear-gradient(90deg, rgba(229, 71, 4, 0.4), var(--skill-accent, #ff7a18))",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VisionOS Glass Modal */}
      {selectedSkill && (
        <div
          className="skills-modal-backdrop"
          onClick={() => setSelectedSkill(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-skill-title"
        >
          <div
            className="skills-modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ "--skill-accent": selectedSkill.color } as React.CSSProperties}
          >
            <button
              className="skills-modal-close"
              onClick={() => setSelectedSkill(null)}
              aria-label="Close modal"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="skills-modal-header">
              <div className="skills-modal-icon" aria-hidden="true">{selectedSkill.icon}</div>
              <div>
                <h3 id="modal-skill-title" className="skills-modal-title">{selectedSkill.name}</h3>
                <span className="skills-modal-tag">{selectedSkill.category}</span>
              </div>
            </div>

            <p className="skills-modal-desc">{selectedSkill.description}</p>

            <div className="skills-modal-details">
              <h4>
                <Sparkles size={14} aria-hidden="true" style={{ display: "inline-block", marginRight: "6px" }} />
                Key Capabilities &amp; Workflows
              </h4>
              <ul>
                {selectedSkill.details.map((detail, idx) => (
                  <li key={idx}>
                    <span className="detail-dot" aria-hidden="true" /> {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
