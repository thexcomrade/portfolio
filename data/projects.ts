export interface Project {
  image: string;
  badge: string;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo?: string;
}

export const projects: Project[] = [
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
    github: "https://github.com/thexcomrade/NutriPlan-AI",
    demo: "",
  },
  {
    image: "/projects/tripgenius.jpg",
    badge: "Generative AI",
    title: "TripGeni AI",
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
    github: "https://github.com/thexcomrade/TripGenius",
    demo: "https://tripgenius-kohl.vercel.app/",
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
    github: "https://github.com/thexcomrade/FROBO",
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
    github: "https://github.com/thexcomrade/DEEP-FAKE-FACE-DETECTION",
    demo: "https://deepfakefacedetection.vercel.app/",
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
    github: "https://github.com/thexcomrade/smart-obstacle-avoiding-robot",
    demo: "",
  },
  {
    image: "/projects/lovechronicles.jpg",
    badge: "Frontend",
    title: "Love Chronicles",
    description:
      "Interactive digital anniversary website featuring dynamic storytelling, animated user interface, personalized memories, image galleries, and responsive web design for creating memorable digital experiences.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Flask",
      "Responsive UI",
    ],
    github: "https://github.com/thexcomrade/Love-Chronicles",
    demo: "",
  },
];
