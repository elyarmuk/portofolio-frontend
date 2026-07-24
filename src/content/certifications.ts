/**
 * Certifications & learning.
 *
 * IMPORTANT:
 * - `completed` must contain ONLY verified, completed certifications.
 * - Do not present planned certifications as completed.
 */

export type Certification = {
  name: string;
  issuer: string;
  /** Display date when known; omit rather than inventing. */
  date?: string;
  credentialUrl?: string;
  /** Optional badge image under /public (e.g. "/images/certifications/..."). */
  logoSrc?: string;
  logoAlt?: string;
};

/**
 * Verified, completed certifications.
 */
export const completedCertifications: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    logoSrc: "/images/certifications/aws-cloud-practitioner.svg",
    logoAlt: "AWS Certified Cloud Practitioner badge",
  },
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    logoSrc: "/images/certifications/aws-solutions-architect-associate.svg",
    logoAlt: "AWS Certified Solutions Architect Associate badge",
  },
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    logoSrc: "/images/certifications/aws-developer-associate.svg",
    logoAlt: "AWS Certified Developer Associate badge",
  },
];

export const currentlyLearning: string[] = [
  "Cloud-native architecture",
  "Distributed systems",
  "AI-assisted software engineering",
  "Application architecture",
];

export const futureGoals: string[] = [
  "Advanced cloud architecture",
  "AI application architecture",
];
