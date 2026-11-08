export type ProjectStatus = "completed" | "in-progress" | "prototype";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  image: string;
  badge: string;
  title: string;
  summary: string;
  description: string;
  status: ProjectStatus;
  technologies: string[];
  metrics?: ProjectMetric[];
  github?: string;
  demo?: string;
  report?: string;
}

export const projects: Project[] = [
  {
    slug: "trip-geni",
    image: "/projects/tripgenius.jpg",
    badge: "Generative AI & RAG",
    title: "Trip Geni",
    summary: "AI-Powered Full-Stack Travel Planning Platform",
    description:
      "Full-stack travel planning platform generating personalized itineraries, destination insights, and budget breakdowns. Combines Gemini 2.5 Flash with a curated 100+ destination Tourism RAG knowledge base for deterministic fallback routing.",
    status: "completed",
    technologies: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Gemini 2.5 Flash",
      "RAG Pipeline",
    ],
    metrics: [
      { label: "Knowledge Base", value: "100+ Destinations" },
      { label: "Architecture", value: "Full-Stack RAG" },
    ],
    github: "https://github.com/thexcomrade/TripGenius",
    demo: "https://tripgenius-kohl.vercel.app/",
  },
  {
    slug: "deepfake-detection",
    image: "/projects/deepfake.jpg",
    badge: "Computer Vision & ML",
    title: "Deepfake Face Detection System",
    summary: "High-Precision Still Image Facial Manipulation Classifier",
    description:
      "Web-based still-image deepfake detection system utilizing OpenCV facial feature extraction and a Linear Support Vector Classifier (SVC). Benchmarked on 1,000 held-out face images with an ultra-lightweight 7.63ms CPU inference footprint.",
    status: "completed",
    technologies: [
      "Python",
      "OpenCV",
      "Scikit-Learn",
      "Linear SVC",
      "Flask",
    ],
    metrics: [
      { label: "Evaluation Acc", value: "93.40%" },
      { label: "CPU Latency", value: "7.63ms" },
    ],
    github: "https://github.com/thexcomrade/DEEP-FAKE-FACE-DETECTION",
    demo: "https://deepfakefacedetection.vercel.app/",
  },
  {
    slug: "medibridge-ai",
    image: "/projects/nutriplan.jpg",
    badge: "Healthcare Architecture",
    title: "MediBridge AI",
    summary: "Unified Patient Medical Records Management Prototype",
    description:
      "AI-powered platform designed to organize and unify fragmented patient medical records. Built with structured RESTful API architecture in Python and FastAPI, validating early-stage diagnostic data schemas and record consolidation.",
    status: "prototype",
    technologies: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "REST APIs",
      "Data Schemas",
    ],
    metrics: [
      { label: "Status", value: "Backend Prototype" },
      { label: "Design", value: "Modular APIs" },
    ],
    github: "https://github.com/thexcomrade/NutriPlan-AI",
  },
  {
    slug: "smart-obstacle-robot",
    image: "/projects/robot.jpg",
    badge: "Robotics & Embedded",
    title: "Bluetooth Obstacle Avoidance Robot",
    summary: "Autonomous 4-Wheel Microcontroller Mobile Robot",
    description:
      "Autonomous 4-wheel robotic vehicle featuring ultrasonic distance sensing, micro-servo scanning routines, and L293D motor driver logic. Integrated with HC-05 Bluetooth module for real-time manual override and dual-mode autonomous navigation.",
    status: "completed",
    technologies: [
      "Arduino C++",
      "Ultrasonic Sensor",
      "HC-05 Bluetooth",
      "L293D Driver",
      "Embedded Systems",
    ],
    metrics: [
      { label: "Platform", value: "Arduino 4-Wheel" },
      { label: "Navigation", value: "Dual Autonomous" },
    ],
    github: "https://github.com/thexcomrade/smart-obstacle-avoiding-robot",
  },
  {
    slug: "frobo-companion",
    image: "/projects/frobo.jpg",
    badge: "Hardware & Robotics",
    title: "FROBO Companion Robot",
    summary: "Interactive Desktop Companion Prototype",
    description:
      "Exploratory desktop companion robot prototype combining ESP32/Arduino microcontroller control, OLED animated emotional facial expressions, capacitive touch sensing, and custom 3D-printed chassis.",
    status: "prototype",
    technologies: [
      "ESP32",
      "Arduino",
      "OLED Display",
      "Embedded C++",
      "3D Modeling",
    ],
    metrics: [
      { label: "Display", value: "OLED Animation" },
      { label: "Control", value: "Capacitive Touch" },
    ],
    github: "https://github.com/thexcomrade/FROBO",
  },
  {
    slug: "love-chronicles",
    image: "/projects/lovechronicles.jpg",
    badge: "Interactive Web",
    title: "Love Chronicles",
    summary: "Dynamic Storytelling & Animated Web Experience",
    description:
      "Responsive digital storytelling web application engineered with lightweight vanilla JavaScript, fluid CSS animations, dynamic memory timelines, and Flask backend integration.",
    status: "completed",
    technologies: [
      "JavaScript",
      "HTML5 / CSS3",
      "Flask",
      "Responsive UI",
    ],
    metrics: [
      { label: "Core", value: "Vanilla JS" },
      { label: "Interaction", value: "Fluid Motion" },
    ],
    github: "https://github.com/thexcomrade/Love-Chronicles",
  },
];
