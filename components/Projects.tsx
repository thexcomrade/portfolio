"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, Lock, ArrowRight } from "lucide-react";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="page-section">
      <div className="section-inner">
        {/* Section Heading */}
        <div className="section-header">
          <h2 className="section-title">
            Flagship <span>Projects &amp; Works</span>
          </h2>
          <p className="section-subtitle">
            Tangible, production-tested proofs of concept engineered for real-world impact.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              {/* Project Visual Preview */}
              <div className="project-image-wrapper">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={900}
                  height={600}
                  className="project-image"
                  priority={project.slug === "trip-geni"}
                />
                <div className="project-image-overlay" aria-hidden="true" />
              </div>

              {/* Card Content */}
              <div className="project-content">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
                  <span className="project-badge" style={{ margin: 0 }}>{project.badge}</span>
                  {project.status === "prototype" && (
                    <span style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "3px 9px",
                      borderRadius: "999px",
                      background: "rgba(234, 179, 8, 0.12)",
                      border: "1px solid rgba(234, 179, 8, 0.3)",
                      color: "#facc15"
                    }}>
                      Prototype
                    </span>
                  )}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* Technologies List */}
                <div className="project-technologies">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="project-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Actions */}
                <div className="project-buttons">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button project-github"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <FaGithub aria-hidden="true" size={16} />
                      <span>Code</span>
                    </a>
                  ) : (
                    <button
                      className="project-button project-disabled"
                      disabled
                      aria-label={`${project.title} is a proprietary private repository`}
                    >
                      <Lock size={13} aria-hidden="true" />
                      <span>Private</span>
                    </button>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button project-demo"
                      aria-label={`Open live demo for ${project.title}`}
                    >
                      <span className="inline-flex items-center gap-2">
                        Live Demo
                        <ExternalLink size={13} aria-hidden="true" />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* GitHub Footer Callout */}
        <div className="projects-footer">
          <div className="projects-divider" />
          <a
            href="https://github.com/thexcomrade"
            target="_blank"
            rel="noopener noreferrer"
            className="projects-github-button"
            aria-label="Visit Devanarayanan's GitHub Profile"
          >
            <FaGithub size={17} aria-hidden="true" />
            <span>Explore More on GitHub</span>
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
