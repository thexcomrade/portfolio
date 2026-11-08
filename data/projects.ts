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
      "An AI-powered travel planning platform that generates personalized itineraries, destination insights, and budget breakdowns using Gemini and Tourism RAG.",
    status: "completed",
    technologies: [
      "Next.js",
      "FastAPI",
      "Gemini 2.5 Flash",
      "Tourism RAG",
      "TypeScript",
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
    summary: "High-Precision Facial Manipulation Classifier",
    description:
      "A computer vision application that analyzes facial images to identify potential deepfakes using machine learning and image-processing techniques.",
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
    slug: "nutriplan-ai",
    image: "/projects/nutriplan.jpg",
    badge: "Healthcare & Nutrition AI",
    title: "Nutri Plan AI",
    summary: "AI-Powered Dietary Intelligence Prototype",
    description:
      "An AI-powered nutrition assistant prototype that provides personalized dietary plans and health recommendations using machine learning.",
    status: "prototype",
    technologies: [
      "Python",
      "FastAPI",
      "Scikit-Learn",
      "REST APIs",
    ],
    metrics: [
      { label: "Status", value: "AI Prototype" },
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
      "An autonomous four-wheel robotic vehicle featuring ultrasonic distance sensing, micro-servo scanning, and Bluetooth remote navigation.",
    status: "completed",
    technologies: [
      "Arduino",
      "C++",
      "Ultrasonic Sensor",
      "HC-05 Bluetooth",
      "L293D",
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
      "An interactive desktop companion robot prototype combining microcontroller hardware, animated OLED emotional expressions, and touch sensing.",
    status: "prototype",
    technologies: [
      "ESP32",
      "Arduino C++",
      "OLED Display",
      "Capacitive Touch",
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
      "A responsive digital storytelling web experience featuring fluid interactive animations, dynamic timelines, and multimedia memory galleries.",
    status: "completed",
    technologies: [
      "JavaScript",
      "HTML5",
      "CSS3",
      "Flask",
    ],
    metrics: [
      { label: "Core", value: "Vanilla JS" },
      { label: "Interaction", value: "Fluid Motion" },
    ],
    github: "https://github.com/thexcomrade/Love-Chronicles",
  },
];
