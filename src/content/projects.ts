/**
 * Projects content.
 *
 * IMPORTANT:
 * - Only mark a project "Production" / "App Store Deployment" if that is
 *   currently accurate.
 * - Do not present concept/discovery projects as launched products.
 * - Do not add fake GitHub links. Use `repo: "private"` for private repos.
 *
 * Visibility:
 * - Barkora and Retail Product Intelligence Platform are intentionally hidden
 *   from the public site until they are ready for public release.
 * - Set `visible: true` on those entries below to restore them everywhere
 *   (home, projects list, detail routes, sitemap, filters, JSON-LD).
 * - Do not delete project data or page components — only flip the flag.
 */

export type ProjectCategory =
  | "Enterprise"
  | "Full Stack"
  | "Mobile"
  | "Cloud"
  | "DevOps"
  | "AI"
  | "SaaS"
  | "Product Strategy";

export type ProjectMedia = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type ProjectGalleryGroup = {
  title: string;
  description?: string;
  items: ProjectMedia[];
};

export type CaseStudySection = {
  heading: string;
  body?: string[];
  /** Bullet list rendered under the body. */
  bullets?: string[];
  /** When true, renders an "architecture diagram" placeholder box. */
  diagramPlaceholder?: boolean;
  /** Architecture or system diagram shown under the section body. */
  diagram?: ProjectMedia;
};

export type Project = {
  slug: string;
  name: string;
  category: string; // display category (headline)
  tags: ProjectCategory[]; // used by the filter UI
  summary: string;
  description: string;
  status: string;
  technologies: string[];
  featured: boolean;
  /**
   * When false, the project is excluded from all public surfaces
   * (listings, featured work, detail pages, sitemap, SEO). Data is kept
   * for a future release — restore by setting this to true.
   */
  visible: boolean;
  /** "private" hides the link and shows a "Private Repository" note. */
  repo?: "private" | string;
  /** Present only for projects with a full case study page. */
  caseStudy?: {
    tagline: string;
    sections: CaseStudySection[];
    /**
     * Product screens hosted on `/projects/<slug>/gallery`.
     * Keep the case study page focused on narrative + architecture.
     */
    gallery?: {
      description: string;
      groups: ProjectGalleryGroup[];
    };
  };
};

/** Full catalog including projects hidden until public release. */
const allProjects: Project[] = [
  {
    slug: "joe-limo",
    name: "Joe Limo",
    category: "Transportation Technology Platform",
    tags: ["Full Stack", "Mobile", "Cloud", "DevOps"],
    summary:
      "A full transportation-management platform: customer and driver mobile apps, an admin dashboard, backend APIs, and production deployment infrastructure.",
    description:
      "A full transportation-management platform consisting of customer and driver mobile applications, an administrative dashboard, backend APIs, ride management, status tracking, notifications, driver and vehicle information, and production deployment infrastructure.",
    status: "Production Launch in Progress",
    technologies: [
      "React Native",
      "Expo",
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Terraform",
      "Ansible",
      "Jenkins",
    ],
    featured: true,
    visible: true,
    repo: "private",
    caseStudy: {
      tagline:
        "Designing and shipping an end-to-end transportation platform — mobile, web, backend, and cloud infrastructure.",
      sections: [
        {
          heading: "Overview",
          body: [
            "Joe Limo is a transportation-management platform built to coordinate rides between customers and drivers. It spans customer and driver mobile applications, an administrative web portal, backend services, and the cloud infrastructure required to run them in production.",
            "The platform was designed as a cohesive product: shared domain concepts, a single backend API surface, and deployment automation that keeps each part in sync.",
          ],
        },
        {
          heading: "Business Problem",
          body: [
            "Private transportation operators need a reliable way to manage ride requests, dispatch drivers, track status, and keep customers informed — without stitching together disconnected tools.",
          ],
        },
        {
          heading: "Product Vision",
          body: [
            "Deliver a dependable, easy-to-use system that handles the full ride lifecycle for both riders and drivers, with an administrative view for operations — and a foundation that can grow into a reusable platform.",
          ],
        },
        {
          heading: "Target Users",
          bullets: [
            "Customers requesting and tracking rides",
            "Drivers receiving, accepting, and fulfilling rides",
            "Operations/administrators managing drivers, vehicles, and activity",
          ],
        },
        {
          heading: "Customer Application",
          body: [
            "A React Native (Expo) mobile app for requesting rides, tracking status, and receiving notifications throughout the ride lifecycle.",
          ],
        },
        {
          heading: "Driver Application",
          body: [
            "A dedicated React Native (Expo) app for drivers to manage assigned rides, update status, and view relevant trip and vehicle information.",
          ],
        },
        {
          heading: "Admin Portal",
          body: [
            "A React + TypeScript web dashboard for operations: managing driver and vehicle information, reviewing ride activity, and overseeing platform state.",
          ],
        },
        {
          heading: "Backend Architecture",
          body: [
            "Java and Spring Boot services expose REST APIs consumed by the mobile apps and admin portal. PostgreSQL provides persistent storage for users, rides, drivers, vehicles, and status history.",
            "Clients reach the platform through an HTTPS edge (nginx + TLS). Keycloak provides OIDC authentication for customer, driver, and admin roles. Traffic is routed to customer, driver, and admin APIs, which persist data in PostgreSQL and object storage and integrate with partners such as Stripe and email (SMTP).",
          ],
          diagram: {
            src: "/images/joe-limo/architecture.png",
            alt: "Joe Limo system architecture diagram showing clients, Keycloak identity, HTTPS edge, platform APIs, data stores, and partner integrations",
            caption: "Platform architecture — clients, identity, edge, services, data, and partners",
            width: 2365,
            height: 3138,
          },
        },
        {
          heading: "Security",
          bullets: [
            "Authentication and authorization on backend APIs",
            "Input validation and server-side checks",
            "Secrets managed through environment configuration, never committed",
          ],
        },
        {
          heading: "Testing Strategy",
          bullets: [
            "Unit and integration tests for backend services",
            "API-level validation of core ride flows",
            "Manual and automated checks across the mobile and web clients",
          ],
        },
        {
          heading: "CI/CD",
          body: [
            "Jenkins pipelines automate builds and deployments. Containerized services (Docker) are provisioned to cloud infrastructure defined and managed with Terraform and Ansible.",
          ],
        },
        {
          heading: "Production Deployment",
          body: [
            "The platform is deployed to a production environment. The Android application is live, and the remaining customer and iOS applications are in store rollout and review.",
          ],
        },
        {
          heading: "Challenges",
          bullets: [
            "Coordinating shared domain logic across two mobile apps, a web portal, and backend services",
            "Keeping deployment repeatable across environments with infrastructure as code",
          ],
        },
        {
          heading: "Architecture Decisions",
          bullets: [
            "A single backend API surface shared by all clients to avoid divergence",
            "Infrastructure as code (Terraform + Ansible) for reproducible environments",
            "Containerized deployment to simplify promotion from build to production",
          ],
        },
        {
          heading: "Future SaaS Vision",
          body: [
            "Joe Limo is designed with the potential to evolve into a multi-tenant, white-label transportation-management platform for limousine and private transportation companies.",
            "This direction is a design goal — the platform is not represented as already serving multiple companies.",
          ],
        },
        {
          heading: "Technology Stack",
          bullets: [
            "Mobile: React Native, Expo",
            "Frontend: React, TypeScript",
            "Backend: Java, Spring Boot, REST APIs",
            "Data: PostgreSQL",
            "Infrastructure & DevOps: Docker, Terraform, Ansible, Jenkins",
          ],
        },
      ],
      gallery: {
        description:
          "Selected screens from the customer app, chauffeur app, and admin operations console.",
        groups: [
          {
            title: "Customer App",
            description:
              "Booking flows, AI-assisted itinerary upload, ride history, and profile management.",
            items: [
              {
                src: "/images/joe-limo/customer-home.png",
                alt: "Joe Limo customer app home screen with quick actions for new reservation, upload itinerary, and ride history",
                caption: "Home",
                width: 1080,
                height: 1920,
              },
              {
                src: "/images/joe-limo/customer-request-ride.png",
                alt: "Joe Limo request a ride screen with smart assist, request type, and ride type options",
                caption: "Request a Ride",
                width: 1080,
                height: 1920,
              },
              {
                src: "/images/joe-limo/customer-upload-itinerary.png",
                alt: "Joe Limo upload itinerary screen with AI extraction from flight, hotel, email, PDF, photo, or note",
                caption: "Upload Itinerary",
                width: 1080,
                height: 1920,
              },
              {
                src: "/images/joe-limo/customer-ride-history.png",
                alt: "Joe Limo ride history screen with upcoming, completed, and cancelled tabs",
                caption: "Ride History",
                width: 1080,
                height: 1920,
              },
              {
                src: "/images/joe-limo/customer-profile.png",
                alt: "Joe Limo customer profile screen for managing account details",
                caption: "Profile",
                width: 1080,
                height: 1920,
              },
            ],
          },
          {
            title: "Chauffeur App",
            description:
              "Driver availability, assignments, upcoming rides, and account tools.",
            items: [
              {
                src: "/images/joe-limo/driver-dashboard.png",
                alt: "Joe Limo chauffeur app dashboard with availability status and today's assignments",
                caption: "Dashboard",
                width: 2064,
                height: 2752,
              },
              {
                src: "/images/joe-limo/driver-upcoming-rides.png",
                alt: "Joe Limo chauffeur upcoming rides screen",
                caption: "Upcoming Rides",
                width: 2064,
                height: 2752,
              },
              {
                src: "/images/joe-limo/driver-account.png",
                alt: "Joe Limo chauffeur account screen with profile, contact details, and driver menu",
                caption: "Account",
                width: 2752,
                height: 2064,
              },
            ],
          },
          {
            title: "Admin Console",
            description:
              "Operations overview, roster management, dispatch communications, reporting, and settings.",
            items: [
              {
                src: "/images/joe-limo/admin-overview.png",
                alt: "Joe Limo admin dispatch dashboard showing operations overview metrics and recent rides",
                caption: "Dispatch Dashboard — Overview",
                width: 2504,
                height: 1237,
              },
              {
                src: "/images/joe-limo/admin-drivers.png",
                alt: "Joe Limo admin driver management screen with roster cards and add-driver actions",
                caption: "Driver Management",
                width: 2503,
                height: 1190,
              },
              {
                src: "/images/joe-limo/admin-dispatch.png",
                alt: "Joe Limo admin communications center for driver dispatch reports and ride messages",
                caption: "Dispatch — Communications",
                width: 2498,
                height: 1202,
              },
              {
                src: "/images/joe-limo/admin-reports.png",
                alt: "Joe Limo admin financial reports screen with monthly ride volume, revenue, and profit metrics",
                caption: "Reports",
                width: 2494,
                height: 1225,
              },
              {
                src: "/images/joe-limo/admin-settings.png",
                alt: "Joe Limo admin settings screen with account, system, authentication, and appearance options",
                caption: "Settings",
                width: 2494,
                height: 1148,
              },
            ],
          },
        ],
      },
    },
  },
  {
    // Hidden until public release — set visible: true to restore.
    slug: "barkora",
    name: "Barkora",
    category: "Pet Social Platform",
    tags: ["Product Strategy", "Full Stack", "Mobile"],
    summary:
      "A social platform concept helping dogs build social connections and owners discover nearby dogs, share content, and organize playdates.",
    description:
      "A social platform concept designed to help dogs build social connections while enabling owners to discover nearby dogs, create profiles, share content, communicate, and organize playdates.",
    status: "Product Discovery and Architecture",
    technologies: [
      "React Native",
      "Expo",
      "Java",
      "Spring Boot",
      "PostgreSQL",
    ],
    featured: true,
    visible: false,
    caseStudy: {
      tagline: "Product discovery and architecture for a social platform concept.",
      sections: [
        {
          heading: "Overview",
          body: [
            "Barkora is a social platform concept designed to help dogs build social connections while enabling owners to discover nearby dogs, create profiles, share content, communicate, and organize playdates.",
            "It is currently in product discovery and architecture — not a launched product.",
          ],
        },
        {
          heading: "Planned Capabilities",
          bullets: [
            "Owner profiles",
            "Dog profiles",
            "Social feed",
            "Posts",
            "Likes",
            "Comments",
            "Following",
            "Discovery",
            "Messaging",
            "Playdates",
            "Notifications",
            "Moderation",
          ],
        },
        {
          heading: "Status",
          body: [
            "Product Discovery and Architecture. Barkora is not presented as a launched product.",
          ],
        },
      ],
    },
  },
  {
    // Hidden until public release — set visible: true to restore.
    slug: "retail-product-intelligence",
    name: "Retail Product Intelligence Platform",
    category: "Retail Data and AI SaaS",
    tags: ["Product Strategy", "AI", "SaaS", "Cloud"],
    summary:
      "A planned retail intelligence platform to normalize authorized product data and provide unified discovery, price tracking, and multilingual summaries.",
    description:
      "A planned retail intelligence platform designed to normalize authorized product data from multiple retailers and provide unified product discovery, price tracking, availability monitoring, product matching, trend analysis, and multilingual summaries.",
    status: "Concept and Product Strategy",
    technologies: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "AWS",
    ],
    featured: true,
    visible: false,
    caseStudy: {
      tagline: "Concept and product strategy for a retail data & AI SaaS.",
      sections: [
        {
          heading: "Overview",
          body: [
            "A planned retail intelligence platform designed to normalize authorized product data from multiple retailers and provide unified product discovery, price tracking, availability monitoring, product matching, trend analysis, and multilingual summaries.",
          ],
        },
        {
          heading: "Planned Capabilities",
          bullets: [
            "Unified product discovery across authorized sources",
            "Price tracking and availability monitoring",
            "Product matching across retailers",
            "Trend analysis",
            "Multilingual product summaries",
          ],
        },
        {
          heading: "Data & Authorization",
          body: [
            "The platform is designed to work with authorized product data only. It does not scrape retailer data without authorization.",
          ],
        },
        {
          heading: "Status",
          body: ["Concept and Product Strategy."],
        },
      ],
    },
  },
];

/**
 * Public projects only. Consumers (home, projects page, sitemap, detail
 * routes, filters) should use this — not `allProjects`.
 */
export const projects = allProjects.filter((p) => p.visible);

export const featuredProjects = projects.filter((p) => p.featured);

/** Resolve a public project by slug. Hidden projects return undefined (404). */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Visible projects that have a dedicated product gallery page. */
export function getProjectsWithGallery(): Project[] {
  return projects.filter((p) => Boolean(p.caseStudy?.gallery?.groups.length));
}

const FILTER_ORDER: ProjectCategory[] = [
  "Enterprise",
  "Full Stack",
  "Mobile",
  "Cloud",
  "DevOps",
  "AI",
  "SaaS",
  "Product Strategy",
];

/** Distinct filter tags present across visible projects, in a stable order. */
export const projectFilters: (ProjectCategory | "All")[] = [
  "All",
  ...FILTER_ORDER.filter((cat) => projects.some((p) => p.tags.includes(cat))),
];
