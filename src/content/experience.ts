/**
 * Professional experience.
 *
 * IMPORTANT — verified content only:
 * - Do NOT include proprietary system names, internal URLs, customer data,
 *   confidential architecture, credentials, or restricted business information.
 * - Do NOT include numerical performance results unless verified.
 * - Do NOT invent employers, titles, or dates. Add prior roles only when
 *   confirmed from the approved résumé.
 */

export type ExperienceContribution = {
  category: string;
  points: string[];
  /** Optional Lucide-style icon key for featured contribution cards. */
  icon?: "server" | "cloud" | "pipeline" | "test" | "observe" | "users";
};

export type Experience = {
  company: string;
  role: string;
  /** Display strings, e.g. "November 2023" or "Present". */
  startDate: string;
  endDate: string;
  location: string;
  featured: boolean;
  /** Short, public-safe company framing (no confidential details). */
  companyDescription?: string;
  summary: string;
  technologies: string[];
  contributions: ExperienceContribution[];
  /** Optional achievements for shorter timeline entries. */
  achievements?: string[];
};

export const experiences: Experience[] = [
  {
    company: "JPMorgan Chase",
    role: "Java Full Stack Software Engineer",
    startDate: "November 2023",
    endDate: "Present",
    location: "Dallas–Fort Worth, Texas",
    featured: true,
    companyDescription:
      "Global financial services firm — enterprise platforms spanning backend services, cloud infrastructure, release automation, and production operations.",
    summary:
      "Contributing to enterprise software systems with Java, Spring Boot, REST APIs, cloud services, CI/CD automation, infrastructure as code, monitoring, testing, and production support practices.",
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
    contributions: [
      {
        category: "Backend Engineering",
        icon: "server",
        points: [
          "Java and Spring Boot service development",
          "REST API design and implementation",
          "Microservice enhancements and system integration",
        ],
      },
      {
        category: "Cloud & Infrastructure",
        icon: "cloud",
        points: [
          "AWS cloud deployments",
          "Terraform infrastructure as code",
          "Containerized Docker deployments",
        ],
      },
      {
        category: "CI/CD & Release Engineering",
        icon: "pipeline",
        points: [
          "Jenkins and Spinnaker pipeline automation",
          "Production approval gates and release workflows",
        ],
      },
      {
        category: "Testing & Code Quality",
        icon: "test",
        points: [
          "Automated testing with JUnit and Mockito",
          "SonarQube quality improvements",
          "Performance testing practices",
        ],
      },
      {
        category: "Monitoring & Production Support",
        icon: "observe",
        points: [
          "Splunk and Dynatrace monitoring",
          "Kafka producer reliability",
          "Production support and incident collaboration",
        ],
      },
      {
        category: "Agile Collaboration",
        icon: "users",
        points: [
          "Partnered with engineering, product, and platform teams to deliver production-ready features",
        ],
      },
    ],
  },
  {
    company: "Infosys Ltd. (Client: Travelers Insurance)",
    role: "Full-Stack Software Developer",
    startDate: "February 2022",
    endDate: "October 2023",
    location: "United States",
    featured: false,
    companyDescription:
      "Client engagement with Travelers Insurance — enterprise application delivery across backend services, web interfaces, and release-ready feature work.",
    summary:
      "Delivered full-stack features for insurance-domain applications, strengthening API contracts, UI workflows, and quality practices while collaborating closely with client and delivery teams.",
    technologies: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "JavaScript",
      "React",
      "SQL",
      "JUnit",
      "Agile",
    ],
    contributions: [],
    achievements: [
      "Built and enhanced Java/Spring Boot services supporting core business workflows",
      "Designed and maintained REST APIs consumed by internal web applications",
      "Implemented responsive UI features with modern JavaScript and React patterns",
      "Improved data access and persistence flows using SQL-backed services",
      "Added automated unit and integration checks to reduce regression risk",
      "Partnered with client stakeholders to clarify requirements and ship incremental releases",
      "Supported deployment readiness through code reviews, defect resolution, and sprint delivery",
    ],
  },
  {
    company: "Cigna",
    role: "Java Full-Stack Developer",
    startDate: "August 2020",
    endDate: "January 2022",
    location: "United States",
    featured: false,
    companyDescription:
      "Healthcare enterprise — full-stack development on Java-based applications with emphasis on reliable APIs, maintainable UI layers, and collaborative delivery.",
    summary:
      "Developed and maintained Java full-stack application features, focusing on service reliability, clean API boundaries, and practical frontend updates in an Agile environment.",
    technologies: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "JavaScript",
      "HTML & CSS",
      "SQL",
      "JUnit",
      "Agile",
    ],
    contributions: [],
    achievements: [
      "Implemented Java and Spring Boot backend features for production applications",
      "Extended REST API endpoints to support evolving product requirements",
      "Updated frontend screens and user flows with accessible, maintainable markup and JavaScript",
      "Worked with relational data models and SQL queries for application persistence",
      "Wrote unit tests to validate business logic and protect critical paths",
      "Collaborated with cross-functional teammates to triage issues and deliver sprint commitments",
      "Grew foundation in enterprise engineering practices that scaled into later cloud and DevOps work",
    ],
  },
];

/** Featured employer shown in the expanded experience hero block. */
export const featuredExperience =
  experiences.find((e) => e.featured) ?? experiences[0];

/**
 * Non-featured roles for the career timeline, newest first
 * (Infosys → Cigna), telling the growth story into JPMorgan.
 */
export const previousExperiences = experiences
  .filter((e) => !e.featured)
  .sort((a, b) => {
    // Chronological newest-first by known start dates in this list.
    const order = ["February 2022", "August 2020"];
    return order.indexOf(a.startDate) - order.indexOf(b.startDate);
  });


/**
 * Cross-employer engineering strengths for the Experience page.
 * Summarizes verified skills — not employer-specific claims.
 */
export type EngineeringHighlight = {
  title: string;
  icon: "server" | "cloud" | "layers" | "architecture" | "test";
  items: string[];
};

export const engineeringHighlights: EngineeringHighlight[] = [
  {
    title: "Backend Engineering",
    icon: "server",
    items: ["Java", "Spring Boot", "REST APIs", "Microservices", "Kafka", "PostgreSQL"],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    items: ["AWS", "Docker", "Terraform", "Jenkins", "CI/CD", "Infrastructure as Code"],
  },
  {
    title: "Frontend",
    icon: "layers",
    items: ["React", "React Native", "Next.js", "TypeScript"],
  },
  {
    title: "Architecture",
    icon: "architecture",
    items: ["System Design", "API Design", "Authentication", "OIDC", "Security", "Scalability"],
  },
  {
    title: "Testing",
    icon: "test",
    items: [
      "Unit Testing",
      "Integration Testing",
      "API Testing",
      "Performance Testing",
      "SonarQube",
    ],
  },
];
