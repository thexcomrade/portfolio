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
import { X, Sparkles } from "lucide-react";

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
    color: "#38bdf8",
    proficiency: 95,
    description: "Primary language for deep learning, NLP, computer vision, and high-performance backend APIs.",
    details: ["NumPy & Pandas data pipelines", "PyTorch & TensorFlow model workflows", "Async I/O & FastAPI integration"],
  },
  {
    name: "PyTorch",
    category: "AI & Machine Learning",
    icon: <SiPytorch />,
    color: "#EE4C2C",
    proficiency: 90,
    description: "Research & production framework for neural network training, fine-tuning, and evaluation.",
    details: ["Custom Loss Functions & Optimizers", "CNNs, RNNs & Transformer Architectures", "CUDA acceleration & PyTorch Lightning"],
  },
  {
    name: "TensorFlow",
    category: "AI & Machine Learning",
    icon: <SiTensorflow />,
    color: "#FF6F00",
    proficiency: 88,
    description: "End-to-end open source platform for machine learning model development and inference optimization.",
    details: ["Keras High-Level API", "TensorFlow Lite & Edge Deployment", "Model Optimization & Quantization"],
  },
  {
    name: "Scikit-Learn",
    category: "AI & Machine Learning",
    icon: <SiScikitlearn />,
    color: "#F7931E",
    proficiency: 92,
    description: "Classical machine learning library for regression, classification, clustering, and data preparation.",
    details: ["Pipeline Automation", "Cross-Validation & Hyperparameter Tuning", "Feature Engineering & Dimensionality Reduction"],
  },
  {
    name: "Computer Vision",
    category: "AI & Machine Learning",
    icon: <FaEye />,
    color: "#36f7f9",
    proficiency: 86,
    description: "Image processing, object detection, facial recognition, and real-time video analytics.",
    details: ["OpenCV & YOLO Model Deployments", "Facial Landmark & Deepfake Detection", "Medical Image Preprocessing"],
  },
  {
    name: "FastAPI",
    category: "Backend & Systems",
    icon: <SiFastapi />,
    color: "#009688",
    proficiency: 88,
    description: "High-performance Python web framework for serving production AI model inference endpoints.",
    details: ["Pydantic Schema Validation", "Asynchronous Endpoint Optimization", "Swagger / OpenAPI Documentation"],
  },
  {
    name: "React & Next.js",
    category: "Web & Frontend",
    icon: <SiNextdotjs />,
    color: "#ffffff",
    proficiency: 86,
    description: "Full-stack web application development with React 19, Next.js App Router, and static generation.",
    details: ["App Router Architecture", "Server Actions & API Handlers", "Framer Motion & Canvas 2D Integration"],
  },
  {
    name: "TypeScript",
    category: "Web & Frontend",
    icon: <SiTypescript />,
    color: "#3178C6",
    proficiency: 84,
    description: "Typed JavaScript development for scalable frontend architectures and robust API contracts.",
    details: ["Strict Type Safety", "Interface & Generic Design", "React Component Typing"],
  },
  {
    name: "Docker & Containers",
    category: "Cloud & DevOps",
    icon: <FaDocker />,
    color: "#2496ED",
    proficiency: 80,
    description: "Containerizing AI applications and backend microservices for reproducible cross-platform deployments.",
    details: ["Multi-stage Dockerfiles", "Docker Compose Orchestration", "Isolated GPU-enabled Environments"],
  },
  {
    name: "AWS Cloud",
    category: "Cloud & DevOps",
    icon: <FaAws />,
    color: "#FF9900",
    proficiency: 76,
    description: "Cloud computing infrastructure for model hosting, object storage, and serverless execution.",
    details: ["S3 Bucket Management", "EC2 Instance Configuration", "Lambda Serverless Functions"],
  },
  {
    name: "MongoDB & NoSQL",
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
    description: "Distributed version control, collaborative Git workflows, and continuous integration pipelines.",
    details: ["Branching & Pull Request Workflows", "GitHub Actions Automation", "Conflict Resolution & Clean History"],
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
          <p className="section-eyebrow">CHAPTER 03 // THE CAPABILITIES</p>
          <h2 className="section-title">
            Neural &amp; <span>Engineering Stack</span>
          </h2>
          <p className="section-subtitle">
            Specialized tools, frameworks, and architecture deployed across production environments.
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

              {/* Progress Bar */}
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
