/**
 * Certifications & learning.
 *
 * IMPORTANT:
 * - `completed` must contain ONLY verified, completed certifications.
 *   It is intentionally empty until verified items are provided.
 * - Do not present planned certifications as completed.
 */

export type Certification = {
  name: string;
  issuer: string;
  date: string; // display date; use TODO if unknown
  credentialUrl?: string;
};

/** Verified, completed certifications only. Leave empty until confirmed. */
export const completedCertifications: Certification[] = [
  // TODO: Add verified completed certifications here, e.g.:
  // { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", date: "2026" },
];

export const currentlyLearning: string[] = [
  "AWS Solutions Architecture",
  "Cloud-native architecture",
  "Distributed systems",
  "AI and agentic applications",
];

export const futureGoals: string[] = [
  "AWS architecture certifications",
  "Advanced cloud architecture",
  "AI application architecture",
];
