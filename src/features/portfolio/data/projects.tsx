import {
  BookOpenIcon,
  BriefcaseIcon,
  CpuIcon,
  FilmIcon,
  ShoppingBagIcon,
  UtensilsIcon,
  UsersIcon,
  VoteIcon,
} from "lucide-react"

import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "food-ordering-platform",
    title: "Food Ordering & Delivery Website",
    period: {
      start: "2023",
      end: "2024",
    },
    link: "https://github.com/Krutan178/food-ordering",
    skills: [
      "Next.js",
      "React",
      "Redux Toolkit",
      "MongoDB",
      "PayPal API",
      "REST APIs",
    ],
    description: `Full-stack food ordering and restaurant management platform with live order tracking and admin controls.
- Integrated PayPal SDK for secure online transactions and automated payment status resolution
- Implemented real-time order lifecycle tracking (preparing, on the way, delivered) with Google Maps integration
- Built comprehensive admin dashboard for managing food catalogs, categories, pricing, and fulfillment pipelines`,
    icon: <UtensilsIcon />,
    isExpanded: true,
  },
  {
    id: "vote-for-us",
    title: "Vote For Us – Online Voting System",
    period: {
      start: "2023",
    },
    link: "https://github.com/Krutan178",
    skills: ["PHP", "MySQL", "JavaScript", "Authentication", "Security", "HTML/CSS"],
    description: `Secure online voting platform for digital candidate election and ballot management.
- Designed encrypted voter registration, authentication, and single-vote enforcement to prevent electoral fraud
- Real-time vote tallying and statistical result visualization with automated audit logging
- Intuitive admin control panel for configuring election cycles, candidate bios, and publishing certified outcomes`,
    icon: <VoteIcon />,
    isExpanded: true,
  },
  {
    id: "gigfly-marketplace",
    title: "Gigfly – Freelance Marketplace Platform",
    period: {
      start: "2024",
    },
    link: "https://github.com/Krutan178/gigfly",
    skills: [
      "Laravel",
      "PHP",
      "MySQL",
      "Tailwind CSS",
      "Payment Gateway",
      "REST APIs",
    ],
    description: `End-to-end freelance services marketplace connecting clients with skilled professionals.
- Facilitates gig creation, custom proposal bidding, client-freelancer messaging, and milestone deliverables
- Integrated multi-currency payment gateway and escrow transaction workflows for buyer/seller security
- Implemented user rating/feedback systems, dispute escalation, and optimized database queries for rapid search`,
    icon: <BriefcaseIcon />,
    isExpanded: true,
  },
  {
    id: "movie-store-mvc",
    title: "Movie Store – ASP.NET MVC",
    period: {
      start: "2023",
    },
    link: "https://github.com/Krutan178/MovieStoreMvc",
    skills: [
      "ASP.NET MVC",
      "C#",
      ".NET Core",
      "Entity Framework Core",
      "SQL Server",
    ],
    description: `Enterprise-grade movie catalog management, search, and filtering application.
- Engineered using Repository Pattern and Entity Framework Core with code-first migrations
- Multi-parameter movie filtering by genre, release year, cast, and keyword search
- Role-based authorization for administrative catalog updates, media poster uploads, and database maintenance`,
    icon: <FilmIcon />,
  },
  {
    id: "iot-sensor-telemetry",
    title: "Real-Time IoT Sensor Monitoring & VMS System",
    period: {
      start: "2024",
    },
    link: "https://github.com/Krutan178",
    skills: [
      "React.js",
      "TypeScript",
      "Python Flask",
      "MQTT",
      "Modbus",
      "Raspberry Pi",
      "Linux",
    ],
    description: `Industrial IoT device communication and live telemetry monitoring ecosystem.
- Integrated hardware sensors with backend services using MQTT and Modbus protocols on Raspberry Pi & Linux
- Built responsive telemetry dashboard with React and TypeScript for real-time status alerts and metric visualization
- Interfaced sensor events directly with Video Management Systems (VMS) through protocol-level networking`,
    icon: <CpuIcon />,
  },
  {
    id: "mern-social-media",
    title: "MERN Social Network",
    period: {
      start: "2023",
    },
    link: "https://github.com/Krutan178/mern-social-media-master",
    skills: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Material-UI",
      "JWT",
      "Multer",
    ],
    description: `Full-stack social networking application with authentication and media sharing.
- Secured user authentication using JSON Web Tokens (JWT) and encrypted password hashing with Bcrypt
- GridFS and Multer media storage pipeline allowing multimedia image attachments in social feeds
- Interactive social feed featuring real-time likes, threaded comments, friend additions, and dark/light themes`,
    icon: <UsersIcon />,
  },
  {
    id: "online-blogging-system",
    title: "Online Blogging & CMS Platform",
    period: {
      start: "2023",
    },
    link: "https://github.com/Krutan178",
    skills: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Content Management"],
    description: `Dynamic content publishing and article management system.
- Rich-text authoring suite supporting category classification, article tagging, and media embedding
- Responsive reader interface with comment sections, reader metrics, and optimized search indexing
- Comprehensive administrative editorial dashboard for user permissions, post scheduling, and moderation`,
    icon: <BookOpenIcon />,
  },
  {
    id: "bakin-lane-ecommerce",
    title: "Bakin Lane – Cake & Bakery E-Commerce",
    period: {
      start: "2024",
    },
    link: "https://bakin-lane.netlify.app/",
    skills: ["React", "JavaScript", "CSS3", "E-Commerce", "Netlify"],
    description: `Interactive e-commerce storefront for specialty bakery delicacies and confectioneries.
- Browse custom cakes and desserts with real-time category filtering and visual showcase cards
- Client-side shopping cart management with instant total calculations and streamlined checkout flow`,
    icon: <ShoppingBagIcon />,
  },
]
