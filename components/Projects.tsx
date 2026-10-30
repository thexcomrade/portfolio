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
          <p className="section-eyebrow">CHAPTER 02 // SIGNATURE CREATIONS</p>
          <h2 className="section-title">
            Flagship <span>Projects &amp; Systems</span>
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
                  priority={project.title === "NutriPlan AI"}
                />
                <div className="project-image-overlay" aria-hidden="true" />
              </div>

              {/* Card Content */}
              <div className="project-content">
                <span className="project-badge">{project.badge}</span>
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
                      <FaGithub aria-hidden="true" />
                      <span> Code </span>
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
                      <span>Live Demo</span>
                      <ExternalLink size={13} aria-hidden="true" />
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
          <p className="projects-footer-text">
            These systems represent continuous exploration across autonomous
            robotics, generative models, and scalable machine learning pipelines.
            Additional open-source repositories, experiments, and technical notebooks
            are available on GitHub.
          </p>
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
