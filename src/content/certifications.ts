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
  date: string; // display date
  credentialUrl?: string;
};

/**
 * Verified, completed certifications only. Intentionally empty — no unverified
 * certification is presented as completed. Add entries here once earned.
 */
export const completedCertifications: Certification[] = [];

export const currentlyLearning: string[] = [
  "AWS Solutions Architecture",
  "Cloud-native architecture",
  "Distributed systems",
  "AI-assisted software engineering",
  "Application architecture",
];

export const futureGoals: string[] = [
  "AWS architecture certifications",
  "Advanced cloud architecture",
  "AI application architecture",
];
