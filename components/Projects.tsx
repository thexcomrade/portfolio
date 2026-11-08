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
            Engineered proofs of concept spanning generative AI, computer vision, robotics, and full-stack software.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.slug} className="project-card">
              {/* Project Visual Thumbnail */}
              <div className="project-image-wrapper">
                <Image
                  src={project.image}
                  alt={`${project.title} preview screenshot`}
                  width={900}
                  height={506}
                  className="project-image"
                  priority={project.slug === "trip-geni"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="project-image-overlay" aria-hidden="true" />
              </div>

              {/* Card Content */}
              <div className="project-content">
                <div className="project-meta-row">
                  <span className="project-badge">{project.badge}</span>
                  {project.status === "prototype" && (
                    <span className="project-status-pill">
                      Prototype
                    </span>
                  )}
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* Technologies List */}
                <div className="project-technologies" aria-label="Technologies used">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="project-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Actions */}
                <div className="project-buttons">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button project-github"
                      aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                    >
                      <FaGithub aria-hidden="true" size={15} />
                      <span>{project.demo ? "Code" : "Source Code"}</span>
                    </a>
                  )}

                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button project-demo"
                      aria-label={`Open live demo for ${project.title} (opens in new tab)`}
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  ) : (
                    project.status === "prototype" && (
                      <div
                        className="project-button project-disabled"
                        aria-label={`${project.title} is currently in active prototyping`}
                      >
                        <Lock size={12} aria-hidden="true" />
                        <span>In Development</span>
                      </div>
                    )
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
            aria-label="Visit Devanarayanan's GitHub Profile (opens in new tab)"
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
