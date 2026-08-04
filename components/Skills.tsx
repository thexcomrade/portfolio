"use client";

import { useState } from "react";
import {
  FaPython,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaEye,
} from "react-icons/fa";
import {
  SiTensorflow,
  SiPytorch,
  SiNextdotjs,
  SiFastapi,
  SiTypescript,
  SiScikitlearn,
  SiMongodb,
} from "react-icons/si";

interface SkillItem {
  name: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  proficiency: number;
  description: string;
  details: string[];
}

const skillsData: SkillItem[] = [
  {
    name: "Python",
    category: "AI & Machine Learning",
    icon: <FaPython />,
    color: "#3776AB",
    proficiency: 95,
    description: "Primary language for deep learning, NLP, computer vision, and backend APIs.",
    details: ["NumPy & Pandas workflows", "PyTorch / TensorFlow pipelines", "Async I/O & FastAPI integration"],
  },
  {
    name: "PyTorch",
    category: "AI & Machine Learning",
    icon: <SiPytorch />,
    color: "#EE4C2C",
    proficiency: 90,
    description: "Research & production framework for neural network training and fine-tuning.",
    details: ["Custom Loss Functions & Optimizers", "CNNs, RNNs & Transformers", "CUDA acceleration & PyTorch Lightning"],
  },
  {
    name: "TensorFlow",
    category: "AI & Machine Learning",
    icon: <SiTensorflow />,
    color: "#FF6F00",
    proficiency: 88,
    description: "End-to-end open source platform for machine learning model development.",
    details: ["Keras High-Level API", "TensorFlow Lite & Edge Deployment", "Model Optimization & Quantization"],
  },
  {
    name: "Scikit-Learn",
    category: "AI & Machine Learning",
    icon: <SiScikitlearn />,
    color: "#F7931E",
    proficiency: 92,
    description: "Classical machine learning library for regression, classification & clustering.",
    details: ["Pipeline Automation", "Cross-Validation & Grid Search", "Feature Engineering & PCA"],
  },
  {
    name: "Computer Vision",
    category: "AI & Machine Learning",
    icon: <FaEye />,
    color: "#00F0FF",
    proficiency: 86,
    description: "Image processing, object detection, segmentation, and real-time video analytics.",
    details: ["OpenCV & YOLO Models", "Face Recognition & Detection", "Medical Image Processing"],
  },
  {
    name: "FastAPI",
    category: "Backend & Systems",
    icon: <SiFastapi />,
    color: "#009688",
    proficiency: 88,
    description: "High-performance Python web framework for serving AI model inference endpoints.",
    details: ["Pydantic Data Validation", "Async Request Handling", "Swagger / OpenAPI Documentation"],
  },
  {
    name: "React & Next.js",
    category: "Web & Frontend",
    icon: <SiNextdotjs />,
    color: "#00E5FF",
    proficiency: 86,
    description: "Full-stack web application development with React 19, Turbopack, and SSR.",
    details: ["App Router Architecture", "Server Actions & API Routes", "Framer Motion & Three.js Canvas"],
  },
  {
    name: "TypeScript",
    category: "Web & Frontend",
    icon: <SiTypescript />,
    color: "#3178C6",
    proficiency: 84,
    description: "Typed JavaScript development for scalable frontend applications and APIs.",
    details: ["Strict Type Safety", "Interface & Generic Design", "React Component Typing"],
  },
  {
    name: "Docker & Containerization",
    category: "Cloud & DevOps",
    icon: <FaDocker />,
    color: "#2496ED",
    proficiency: 80,
    description: "Containerizing AI applications and backend microservices for reproducible deployments.",
    details: ["Multi-stage Dockerfiles", "Docker Compose Orchestration", "Environment Isolation"],
  },
  {
    name: "AWS & Cloud",
    category: "Cloud & DevOps",
    icon: <FaAws />,
    color: "#FF9900",
    proficiency: 76,
    description: "Cloud computing services for hosting, model storage, and scalable infrastructure.",
    details: ["S3 Bucket Management", "EC2 Instance Configuration", "Lambda Serverless Computing"],
  },
  {
    name: "MongoDB & Databases",
    category: "Backend & Systems",
    icon: <SiMongodb />,
    color: "#47A248",
    proficiency: 82,
    description: "NoSQL document database for flexible data structures and rapid application prototyping.",
    details: ["Aggregation Pipelines", "Mongoose ODM Integration", "Indexing & Query Optimization"],
  },
  {
    name: "Git & Version Control",
    category: "Developer Tools",
    icon: <FaGitAlt />,
    color: "#F05032",
    proficiency: 92,
    description: "Distributed version control, collaborative Git workflows, and CI/CD pipelines.",
    details: ["Branching & Pull Requests", "Git Actions Automation", "Conflict Resolution & History Maintenance"],
  },
];

const categories = [
  "All",
  "AI & Machine Learning",
  "Backend & Systems",
  "Web & Frontend",
  "Cloud & DevOps",
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
          <p className="section-eyebrow">TECHNICAL EXPERTISE</p>
          <h2 className="section-title">
            Skills &amp; <span>Technologies</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical stack spanning Artificial Intelligence,
            Machine Learning, Full-Stack Web Development, and Cloud Technologies.
          </p>
        </div>

        {/* Category Filters */}
        <div className="skills-filter-bar">
          {categories.map((category) => (
            <button
              key={category}
              className={`skills-filter-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Spacious Responsive Cards Grid */}
        <div className="skills-cards-grid">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="skill-card-glass"
              style={{ "--skill-accent": skill.color } as React.CSSProperties}
              onClick={() => setSelectedSkill(skill)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedSkill(skill)}
            >
              <div className="skill-card-top">
                <div className="skill-card-icon">{skill.icon}</div>
                <div className="skill-card-badge">{skill.category}</div>
              </div>

              <h3 className="skill-card-title">{skill.name}</h3>
              <p className="skill-card-desc">{skill.description}</p>

              {/* Progress bar */}
              <div className="skill-progress-container">
                <div className="skill-progress-header">
                  <span>Proficiency</span>
                  <span>{skill.proficiency}%</span>
                </div>
                <div className="skill-progress-track">
                  <div
                    className="skill-progress-fill"
                    style={{ width: `${skill.proficiency}%` }}
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
              ✕
            </button>

            <div className="skills-modal-header">
              <div className="skills-modal-icon">{selectedSkill.icon}</div>
              <div>
                <h3 className="skills-modal-title">{selectedSkill.name}</h3>
                <span className="skills-modal-tag">{selectedSkill.category}</span>
              </div>
            </div>

            <p className="skills-modal-desc">{selectedSkill.description}</p>

            <div className="skills-modal-details">
              <h4>Key Capabilities &amp; Workflows</h4>
              <ul>
                {selectedSkill.details.map((detail, idx) => (
                  <li key={idx}>
                    <span className="detail-dot" /> {detail}
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
