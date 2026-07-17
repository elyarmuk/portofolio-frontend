/**
 * Core professional profile content.
 *
 * Editing guidance:
 * - Keep language factual. Do NOT add metrics, revenue, customer counts,
 *   titles, or dates that are not verified.
 */

export const profile = {
  name: "Ahmed Moussa",
  roles: ["Software Engineer", "Java Full-Stack Developer", "Cloud & AI Product Builder"],

  /**
   * Optional professional headshot for the hero.
   * Drop the image at `public/images/ahmed-moussa.jpg` (portrait, ~1000×1250,
   * 4:5). When the file exists it replaces the abstract hero visual at build
   * time; otherwise the abstract visual is shown. No broken image either way.
   */
  headshot: {
    src: "/images/ahmed-moussa.jpg",
    alt: "Ahmed Moussa, software engineer and Java full-stack developer",
  },

  heroHeadline:
    "Building scalable enterprise systems and turning ambitious ideas into production-ready digital products.",
  heroSupporting:
    "I design and develop secure, scalable applications using Java, Spring Boot, React, cloud infrastructure, microservices, DevOps automation, and modern AI-assisted engineering workflows.",

  positioningStatement:
    "Ahmed Moussa is a software engineer specializing in Java, Spring Boot, React, cloud infrastructure, microservices, DevOps, and production-grade application development. He combines enterprise engineering experience with product ownership and entrepreneurial thinking to transform business ideas into scalable digital platforms.",

  summary: {
    heading: "Engineering Enterprise Systems. Building Future Products.",
    body: [
      "Ahmed combines enterprise software engineering experience with cloud architecture, DevOps practices, and product development. His work spans Java and Spring Boot services, React applications, REST APIs, cloud infrastructure, CI/CD automation, observability, testing, and production readiness.",
      "He also develops independent software products designed to solve real business problems and grow into scalable platforms.",
    ],
  },

  capabilities: [
    {
      title: "Enterprise Engineering",
      description:
        "Java and Spring Boot services, REST APIs, and microservice enhancements built for maintainability and production support.",
      icon: "server",
    },
    {
      title: "Cloud & DevOps",
      description:
        "AWS services, containerized deployments, infrastructure as code, and CI/CD pipelines with automated quality gates.",
      icon: "cloud",
    },
    {
      title: "Full-Stack Development",
      description:
        "React and TypeScript front ends connected to secure backend services, with an eye for accessible, performant UX.",
      icon: "layers",
    },
    {
      title: "Product Innovation",
      description:
        "Translating business ideas into structured products — from discovery and architecture to deployment and iteration.",
      icon: "lightbulb",
    },
  ],

  /** "How I Build Software" — six-step engineering approach. */
  approach: [
    {
      step: 1,
      title: "Discover",
      description:
        "Understand the business problem, user needs, requirements, constraints, and success criteria.",
    },
    {
      step: 2,
      title: "Design",
      description:
        "Create user flows, system architecture, service boundaries, API contracts, database models, and UI/UX specifications.",
    },
    {
      step: 3,
      title: "Develop",
      description:
        "Build secure, maintainable frontend and backend applications using clean architecture and version-controlled workflows.",
    },
    {
      step: 4,
      title: "Validate",
      description:
        "Use unit, integration, API, contract, security, performance, and end-to-end testing.",
    },
    {
      step: 5,
      title: "Deploy",
      description:
        "Automate builds and deployments using CI/CD, Docker, infrastructure as code, cloud services, and production approval gates.",
    },
    {
      step: 6,
      title: "Observe & Improve",
      description:
        "Use logging, monitoring, metrics, alerts, user feedback, and iterative delivery.",
    },
  ],

  careerDirection: {
    heading: "Growing Toward Cloud and Application Architecture",
    body: "Ahmed continues expanding his expertise in AWS architecture, cloud-native engineering, distributed systems, AI-enabled software development, application architecture, and technical product strategy.",
  },

  /** About page narrative. */
  about: {
    whoIAm:
      "I am a software engineer with experience building enterprise applications and modern digital products using Java, Spring Boot, React, cloud services, infrastructure automation, and DevOps practices.",
    philosophy:
      "I believe strong software begins with a clear understanding of the business problem. Architecture, security, maintainability, testing, deployment, and observability should be considered throughout the development lifecycle — not added only before production.",
    beyondEnterprise:
      "In addition to enterprise development, I enjoy transforming practical business ideas into structured products. My projects include transportation technology, social platforms, retail intelligence, e-commerce, and AI-enabled applications.",
    learning: [
      "AWS architecture",
      "Distributed systems",
      "AI and agentic systems",
      "Cloud-native development",
      "Application architecture",
      "Technical product strategy",
    ],
  },

  contactCta: {
    heading: "Let's Build Something Valuable",
    body: "I'm open to software engineering opportunities, architecture-focused roles, technical collaboration, consulting discussions, and conversations about building scalable digital products.",
  },
} as const;

export type Capability = (typeof profile.capabilities)[number];
export type ApproachStep = (typeof profile.approach)[number];
