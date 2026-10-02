import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  CpuIcon,
  ServerIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "a1fence",
    companyName: "A-1 Fence Products Company Pvt Ltd.",
    companyWebsite: "https://www.a1fenceproducts.com/",
    location: "Virar, Palghar, India",
    locationType: "On-site",
    positions: [
      {
        id: "1",
        title: "Software Developer",
        employmentPeriod: {
          start: "10.2024",
        },
        employmentType: "Full-time",
        icon: <CpuIcon />,
        description: `- Developed full-stack web applications using React.js, TypeScript, and Python Flask.
- Designed and integrated RESTful APIs to support web applications and connected systems.
- Deployed and managed applications on Raspberry Pi and Linux-based environments.
- Worked with proprietary Sensors for data acquisition and monitoring.
- Implemented real-time device communication using MQTT and Modbus protocols.
- Integrated sensor data with backend services and monitoring dashboards.
- Integrated sensors with VMS (Video Management Systems) through protocol-based communication.
- Collaborated with hardware and software teams to deliver end-to-end IoT solutions.
- Used Git, Postman, and SQLite for development, testing, and version control.`,
        skills: [
          "React.js",
          "TypeScript",
          "Python Flask",
          "MQTT",
          "Modbus",
          "Raspberry Pi",
          "Linux",
          "REST APIs",
          "SQLite",
          "Postman",
          "Git",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "ambetronics",
    companyName: "Ambetronics Engineers Pvt. Ltd.",
    companyWebsite: "https://ambetronics.com/",
    location: "Mumbai, Maharashtra, India",
    locationType: "On-site",
    positions: [
      {
        id: "2",
        title: "Software Developer",
        employmentPeriod: {
          start: "08.2024",
          end: "10.2024",
        },
        employmentType: "Full-time",
        icon: <ServerIcon />,
        description: `- Developed and maintained web applications using PHP Laravel and MySQL.
- Built REST APIs for mobile application integration and backend services.
- Managed data processing workflows for device-generated data using MQTT.
- Optimized backend performance, database queries, and data processing pipelines.
- Implemented automated archival and backup jobs for historical data management.
- Added new features, fixed bugs, and enhanced existing portal functionality.`,
        skills: [
          "PHP",
          "Laravel",
          "MySQL",
          "MQTT",
          "REST APIs",
          "Database Optimization",
          "Backend Performance",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "ashasweb",
    companyName: "AshasWeb Private Limited",
    companyWebsite: "https://ashasweb.com/",
    location: "Mumbai, Maharashtra, India",
    locationType: "On-site",
    positions: [
      {
        id: "3",
        title: "Laravel Developer Intern",
        employmentPeriod: {
          start: "04.2024",
          end: "07.2024",
        },
        employmentType: "Internship",
        icon: <BriefcaseBusinessIcon />,
        description: `- Developed and maintained a freelance marketplace platform using Laravel, PHP, and MySQL, enabling job posting, proposal management, and client-freelancer collaboration.
- Implemented secure payment integration, user feedback systems, and backend optimizations to improve platform performance, reliability, and user experience.`,
        skills: [
          "Laravel",
          "PHP",
          "MySQL",
          "Payment Integration",
          "REST APIs",
          "Web Development",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
]
