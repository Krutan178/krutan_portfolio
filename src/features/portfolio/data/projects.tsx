import {
  BookOpenIcon,
  CodeXmlIcon,
  HeartHandshakeIcon,
  LeafIcon,
  MessageSquareIcon,
  SmileIcon,
} from "lucide-react"

import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "chatify-hub",
    title: "Chatify Hub",
    period: {
      start: "2024",
    },
    link: "https://chatify-49.web.app/",
    skills: ["React", "Firebase", "Material-UI", "WebSockets", "Real-Time"],
    description: `A real-time communication platform engineered with React, Firebase, and Material-UI.
- Instant WebSocket messaging, multimedia file sharing, and live status presence
- Dynamic room channels with granular user authentication and session management
- Interactive emoji reactions and responsive glassmorphic user interface`,
    icon: <MessageSquareIcon />,
    isExpanded: true,
  },
  {
    id: "bits-of-code",
    title: "Bits-0f-C0de",
    period: {
      start: "2024",
    },
    link: "https://github.com/Krutan178",
    skills: ["Next.js", "Tailwind CSS", "Markdown", "Vercel", "SEO"],
    description: `Modern Markdown-powered technical blogging system built with Next.js and Tailwind CSS.
- Dynamic dark/light mode with fluid typography scaling
- Syntax highlighted code blocks and custom MDX plugins
- Optimized metadata generation, sitemaps, and RSS feed capabilities`,
    icon: <BookOpenIcon />,
    isExpanded: true,
  },
  {
    id: "editor-io",
    title: "Editor.io",
    period: {
      start: "2023",
    },
    link: "https://github.com/Krutan178",
    skills: ["React.js", "JavaScript", "CodeMirror", "Local Storage"],
    description: `In-browser responsive code compiler and Markdown workspace.
- Live HTML, CSS, and JavaScript interactive preview sandbox
- GitHub-flavored markdown parsing with synchronized split-pane editor
- Local storage auto-save engine preventing data loss`,
    icon: <CodeXmlIcon />,
  },
  {
    id: "plant-ai-vision",
    title: "Plant AI Vision",
    period: {
      start: "2023",
    },
    link: "https://github.com/Krutan178",
    skills: ["PyTorch", "Python", "Computer Vision", "ResNet", "Deep Learning"],
    description: `Deep learning leaf disease classification model trained on PyTorch CNN architecture.
- Achieved 98% validation accuracy classifying across 38 distinct plant leaf pathologies
- Implemented data augmentation and transfer learning pipelines for high-precision botanical diagnostics`,
    icon: <LeafIcon />,
  },
  {
    id: "ai-social-good",
    title: "AI For Social Good",
    period: {
      start: "2023",
    },
    link: "https://github.com/Krutan178",
    skills: ["Python", "NLP", "Scikit-Learn", "FastAPI", "Machine Learning"],
    description: `Natural Language Processing framework dedicated to sentiment detection and mental health distress classification.
- Trained classification models on social text corpora to aid proactive community care
- Engineered RESTful FastAPI microservice providing real-time inference latency under 50ms`,
    icon: <HeartHandshakeIcon />,
  },
  {
    id: "emotion-face-analytics",
    title: "Emotion & Face Analytics",
    period: {
      start: "2023",
    },
    link: "https://github.com/Krutan178",
    skills: ["OpenCV", "TensorFlow", "Keras", "Python", "Neural Networks"],
    description: `Real-time facial expression and emotional state classification pipeline leveraging OpenCV and deep Convolutional Neural Networks.
- High-frame-rate real-time webcam video stream processing and face boundary localization
- Multi-class emotion classification across facial expressions on the benchmark FER dataset`,
    icon: <SmileIcon />,
  },
]
