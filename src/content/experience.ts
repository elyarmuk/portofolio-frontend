/**
 * Professional experience.
 *
 * IMPORTANT — verified content only:
 * - Do NOT include proprietary system names, internal URLs, customer data,
 *   confidential architecture, credentials, or restricted business information.
 * - Do NOT include numerical performance results unless verified.
 */

export type ExperienceContribution = {
  category: string;
  points: string[];
};

export type Experience = {
  company: string;
  role: string;
  /** Display strings, e.g. "November 2023" or "Present". */
  startDate: string;
  endDate: string;
  location: string;
  featured: boolean;
  summary: string;
  technologies: string[];
  contributions: ExperienceContribution[];
};

export const experiences: Experience[] = [
  {
    company: "JPMorgan Chase",
    role: "Java Full Stack Software Engineer",
    startDate: "November 2023",
    endDate: "Present",
    location: "Dallas–Fort Worth, Texas",
    featured: true,
    summary:
      "Contributed to enterprise software systems using Java, Spring Boot, REST APIs, cloud services, CI/CD automation, infrastructure as code, monitoring, testing, and production support practices.",
    technologies: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "AWS",
      "Terraform",
      "Jenkins",
      "Spinnaker",
      "Docker",
      "Kafka",
      "JUnit",
      "SonarQube",
      "Splunk",
      "Dynatrace",
    ],
    // "Selected Engineering Contributions" — grouped by category.
    // Keep only résumé-verified items; remove or refine any that are not.
    contributions: [
      {
        category: "Backend Engineering",
        points: [
          "Java and Spring Boot service development",
          "REST API development",
          "Microservice enhancements",
        ],
      },
      {
        category: "Cloud & Infrastructure",
        points: [
          "AWS deployments",
          "Terraform infrastructure as code",
          "Containerized deployments",
        ],
      },
      {
        category: "CI/CD & Release Engineering",
        points: [
          "Jenkins and Spinnaker pipelines",
          "Production approval gates and release automation",
        ],
      },
      {
        category: "Testing & Code Quality",
        points: [
          "Automated testing with JUnit and Mockito",
          "SonarQube quality improvements",
        ],
      },
      {
        category: "Observability & Production Support",
        points: [
          "Splunk and Dynatrace observability",
          "Kafka producer reliability",
          "Performance testing",
        ],
      },
      {
        category: "Cross-Functional Collaboration",
        points: [
          "Worked across engineering, product, and platform teams to deliver production-ready features.",
        ],
      },
    ],
  },
];
