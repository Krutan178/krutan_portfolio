import type { Education } from "@/features/portfolio/types/education"

export const EDUCATION: Education[] = [
  {
    id: "hiray-mca",
    school: "Hiray Institute of Computer Application (University of Mumbai)",
    degree: "Master of Computer Applications (MCA)",
    fieldOfStudy: "Computer Science & Engineering",
    period: {
      start: "2022",
      end: "2024",
    },
    description: `- Completed Master of Computer Applications (MCA) specializing in full-stack engineering, distributed systems, and real-time computing.
- Engineered projects across web platforms, REST APIs, database design, and IoT system integrations.`,
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Web Technologies",
      "Software Engineering",
      "RESTful APIs",
      "Python",
      "JavaScript",
      "PHP",
    ],
    isExpanded: true,
  },
  {
    id: "patkar-bsc",
    school: "Patkar College of Science and Commerce (University of Mumbai)",
    degree: "Bachelor of Science (BSc)",
    fieldOfStudy: "Computer Science & Engineering",
    period: {
      start: "2019",
      end: "2022",
    },
    description: `- Earned Bachelor of Science in Computer Science with a strong core foundation in computer science fundamentals.
- Studied algorithms, database architecture, software methodologies, and network fundamentals.`,
    skills: [
      "Computer Science Fundamentals",
      "C / C++",
      "Database Design",
      "Web Development",
      "SQL",
    ],
    isExpanded: false,
  },
]
