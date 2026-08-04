"use client";

import Image from "next/image";

interface Project {
  image: string;
  badge: string;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo?: string;
}

const projects: Project[] = [
  {
    image: "/projects/nutriplan.jpg",

    badge: "Healthcare AI",

    title: "NutriPlan AI",

    description:
      "AI-powered nutrition assistant that generates personalized meal plans using Machine Learning, Generative AI, and real-time health integrations. Built to deliver intelligent dietary recommendations, multilingual support, AI chatbot assistance, and smart health tracking.",

    technologies: [
      "Flutter",
      "FastAPI",
      "Firebase",
      "Python",
      "Scikit-Learn",
      "OpenAI",
    ],

    github:
      "https://github.com/thexcomrade/NutriPlan-AI",

    demo: "",
  },

  {
    image: "/projects/tripgenius.jpg",

    badge: "Generative AI",

    title: "TripGenius AI",

    description:
      "AI-powered travel planner that creates personalized itineraries using destination intelligence, weather forecasts, budget analysis, and Generative AI for a seamless travel experience.",

    technologies: [
      "Next.js",
      "FastAPI",
      "OpenAI",
      "Python",
      "Firebase",
      "Weather API",
    ],

    github:
      "https://github.com/thexcomrade/TripGenius",

    demo: "",
  },

  {
    image: "/projects/frobo.jpg",

    badge: "Robotics",

    title: "FROBO",

    description:
      "Affordable emotional desktop companion robot inspired by premium AI companions. Designed with expressive OLED animations, touch interaction, sensors, and embedded AI to create human-like emotional responses.",

    technologies: [
      "Arduino",
      "ESP32",
      "Embedded AI",
      "OLED",
      "Sensors",
      "3D Printing",
    ],

    github:
      "https://github.com/thexcomrade/FROBO",

    demo: "",
  },

  {
    image: "/projects/deepfake.jpg",

    badge: "Computer Vision",

    title: "Deep Fake Face Detection",

    description:
      "Computer Vision application capable of detecting manipulated facial images using OpenCV, handcrafted feature extraction, and an SVM classifier with real-time confidence prediction.",

    technologies: [
      "Python",
      "OpenCV",
      "Flask",
      "Scikit-Learn",
      "SVM",
      "Computer Vision",
    ],

    github:
      "https://github.com/thexcomrade/DEEP-FAKE-FACE-DETECTION",

    demo: "",
  },

  {
    image: "/projects/robot.jpg",

    badge: "Embedded Systems",

    title: "Smart Obstacle Avoiding Robot",

    description:
      "Autonomous robot capable of obstacle avoidance, Bluetooth control, and voice-command navigation. Developed using Arduino, an ultrasonic sensor, Bluetooth communication, and an L293D motor driver.",

    technologies: [
      "Arduino",
      "Bluetooth",
      "Ultrasonic Sensor",
      "L293D",
      "Embedded Systems",
      "Robotics",
    ],

    github: "",

    demo: "",
  },

  {
    image: "/projects/lovechronicles.jpg",

    badge: "Frontend",

    title: "Love Chronicles",

    description:
      "Interactive anniversary website featuring dynamic storytelling, animated user interface, personalized memories, image galleries, and responsive web design for creating memorable digital experiences.",

    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Flask",
      "Responsive UI",
    ],

    github:
      "https://github.com/thexcomrade/Love-Chronicles",

    demo: "",
  },
];

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