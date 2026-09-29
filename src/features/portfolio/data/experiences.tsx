import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  ServerIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "a1fence",
    companyName: "A-1 Fence Products Pvt. Ltd.",
    companyWebsite: "https://www.a1fenceproducts.com/",
    location: "Mumbai, Maharashtra, India",
    locationType: "On-site",
    positions: [
      {
        id: "1",
        title: "Software Developer",
        employmentPeriod: {
          start: "2023",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description: `- Architect and develop robust enterprise web applications and operational tools.
- Implement responsive frontends using React, TypeScript, and modern component systems.
- Build resilient backend microservices and RESTful API endpoints with Node.js and Express.
- Collaborate with cross-functional engineering teams to optimize database schemas and streamline data access patterns.
- Implement automated testing, code reviews, and containerized Docker deployment workflows.`,
        skills: [
          "React.js",
          "TypeScript",
          "JavaScript",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Docker",
          "REST APIs",
          "Git",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
]
