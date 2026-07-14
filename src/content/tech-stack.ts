/**
 * Core technology stack, grouped by category for the home page.
 * Proficiency percentages are intentionally NOT included.
 */

export type TechGroup = {
  category: string;
  items: string[];
};

export const techStack: TechGroup[] = [
  {
    category: "Backend",
    items: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "REST APIs",
      "JPA",
      "Hibernate",
      "Maven",
      "Microservices",
    ],
  },
  {
    category: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Vite"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    category: "Cloud",
    items: ["AWS", "ECS", "Lambda", "ECR", "CloudWatch"],
  },
  {
    category: "Infrastructure & DevOps",
    items: ["Docker", "Terraform", "Jenkins", "Spinnaker", "Jib", "CI/CD"],
  },
  {
    category: "Data & Messaging",
    items: ["PostgreSQL", "SQL", "Kafka"],
  },
  {
    category: "Quality & Observability",
    items: ["JUnit", "Mockito", "SonarQube", "JMeter", "BlazeMeter", "Splunk", "Dynatrace"],
  },
  {
    category: "AI-Assisted Engineering",
    items: [
      "Claude Code",
      "Cursor",
      "AI-assisted software development",
      "Agentic workflow exploration",
    ],
  },
];
