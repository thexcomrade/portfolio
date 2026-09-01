"use client";

import Image from "next/image";

import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="page-section"
    >
      <div className="section-inner">

        {/* Section Heading */}

        <div className="section-header">

          <p className="section-eyebrow">
            MY PORTFOLIO
          </p>

          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>

          <p className="section-subtitle">
            A collection of Artificial Intelligence,
            Machine Learning, Robotics, Computer
            Vision, and Full Stack applications
            developed to solve real-world challenges
            through innovation and intelligent
            engineering.
          </p>

        </div>

        {/* Projects Grid */}

        <div className="projects-grid">
                    {projects.map((project) => (

            <article
              key={project.title}
              className="project-card"
            >

              {/* ===========================
                  Project Preview
              =========================== */}

              <div className="project-image-wrapper">

                <Image
                  src={project.image}
                  alt={project.title}
                  width={900}
                  height={600}
                  className="project-image"
                  priority={project.title === "NutriPlan AI"}
                />

                <div className="project-image-overlay"></div>

              </div>

              {/* ===========================
                  Card Content
              =========================== */}

              <div className="project-content">

                {/* Category */}

                <span className="project-badge">

                  {project.badge}

                </span>

                {/* Title */}

                <h3 className="project-title">

                  {project.title}

                </h3>

                {/* Description */}

                <p className="project-description">

                  {project.description}

                </p>

                {/* Technologies */}

                <div className="project-technologies">

                  {project.technologies.map((tech) => (

                    <span
                      key={tech}
                      className="project-chip"
                    >

                      {tech}

                    </span>

                  ))}

                </div>

                {/* Push buttons to bottom */}

                <div className="project-spacer"></div>

                {/* Buttons */}

                <div className="project-buttons">

                  {project.github ? (

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button project-github"
                    >

                      GitHub

                    </a>

                  ) : (

                    <button
                      className="project-button project-disabled"
                      disabled
                    >

                      Private Project

                    </button>

                  )}

                  {project.demo && (

                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button project-demo"
                    >

                      Live Demo

                    </a>

                  )}

                </div>

              </div>

            </article>

          ))}
                  </div>

        {/* ============================================
            GitHub CTA
        ============================================ */}

        <div className="projects-footer">

          <div className="projects-divider"></div>

          <p className="projects-footer-text">
            These projects represent my continuous journey of learning,
            experimenting, and building intelligent solutions using
            Artificial Intelligence, Machine Learning, Robotics,
            Computer Vision, Embedded Systems, and Full Stack
            Development. I&apos;m constantly exploring emerging
            technologies and transforming innovative ideas into
            practical real-world applications.
          </p>

          <a
            href="https://github.com/thexcomrade"
            target="_blank"
            rel="noopener noreferrer"
            className="projects-github-button"
          >
            Explore More Projects on GitHub
          </a>

        </div>

      </div>
    </section>
  );
}