/**
 * Skills, grouped by domain.
 *
 * No percentage/proficiency bars. Each skill may include a brief, factual
 * note on practical use.
 */

export type Skill = {
  name: string;
  /** Short practical-use note. Optional. */
  note?: string;
};

export type SkillDomain = {
  domain: string;
  skills: Skill[];
};

export const skillDomains: SkillDomain[] = [
  {
    domain: "Backend Engineering",
    skills: [
      { name: "Java", note: "Primary backend language for enterprise and product services." },
      { name: "Spring Boot", note: "Building REST services and application backends." },
      { name: "Spring Security", note: "Authentication and authorization for APIs." },
      { name: "REST APIs" },
      { name: "JPA / Hibernate", note: "Persistence and ORM mapping." },
      { name: "Maven", note: "Build and dependency management." },
      { name: "Microservices", note: "Service boundaries and enhancements." },
    ],
  },
  {
    domain: "Frontend Engineering",
    skills: [
      { name: "React", note: "Component-driven web UIs." },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "HTML & CSS" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
    ],
  },
  {
    domain: "Mobile Development",
    skills: [
      { name: "React Native", note: "Cross-platform mobile apps." },
      { name: "Expo" },
    ],
  },
  {
    domain: "Cloud",
    skills: [
      { name: "AWS" },
      { name: "ECS", note: "Container orchestration." },
      { name: "Lambda" },
      { name: "ECR", note: "Container image registry." },
      { name: "CloudWatch", note: "Metrics and logs." },
    ],
  },
  {
    domain: "DevOps",
    skills: [
      { name: "Docker", note: "Containerizing services." },
      { name: "Jenkins", note: "CI/CD pipelines." },
      { name: "Spinnaker", note: "Deployment orchestration." },
      { name: "Jib", note: "Container image builds for Java." },
      { name: "CI/CD" },
    ],
  },
  {
    domain: "Infrastructure as Code",
    skills: [
      { name: "Terraform", note: "Provisioning cloud infrastructure." },
      { name: "Ansible", note: "Configuration and deployment automation." },
    ],
  },
  {
    domain: "Databases",
    skills: [
      { name: "PostgreSQL" },
      { name: "SQL" },
    ],
  },
  {
    domain: "Messaging",
    skills: [{ name: "Kafka", note: "Event streaming and producer reliability." }],
  },
  {
    domain: "Testing",
    skills: [
      { name: "JUnit" },
      { name: "Mockito" },
      { name: "JMeter", note: "Performance testing." },
      { name: "BlazeMeter" },
    ],
  },
  {
    domain: "Observability",
    skills: [
      { name: "Splunk", note: "Log analytics." },
      { name: "Dynatrace", note: "Application performance monitoring." },
      { name: "SonarQube", note: "Code quality and static analysis." },
    ],
  },
  {
    domain: "Security",
    skills: [
      { name: "Spring Security" },
      { name: "Input validation & secure coding" },
      { name: "Secrets management" },
    ],
  },
  {
    domain: "Architecture",
    skills: [
      { name: "Microservices" },
      { name: "REST API design" },
      { name: "Cloud-native patterns" },
    ],
  },
  {
    domain: "AI-Assisted Development",
    skills: [
      { name: "Claude Code" },
      { name: "Cursor" },
      { name: "Agentic workflow exploration" },
    ],
  },
];
