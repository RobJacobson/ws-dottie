// Cross-platform fetch strategy selector

import type { FetchStrategy } from "./strategies";
import { fetchJsonp, fetchNative } from "./strategies";

/**
 * Environment detection utilities
 */
const isWebEnvironment = () => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};

const isTestEnvironment = () => {
  // Check for test environment indicators
  if (typeof process !== "undefined") {
    if (
      process.env.NODE_ENV === "test" ||
      process.env.VITEST_WORKER_ID !== undefined
    ) {
      return true;
    }
  }

  // Check for test DOM environments
  if (typeof window !== "undefined" && window.navigator?.userAgent) {
    const userAgent = window.navigator.userAgent;
    return userAgent.includes("jsdom") || userAgent.includes("happy-dom");
  }

  return false;
};

/**
 * Determines the current environment type
 */
const getEnvironmentType = (): "test" | "web" | "server" => {
  if (isTestEnvironment()) return "test";
  if (isWebEnvironment()) return "web";
  return "server";
};

/**
 * Cross-platform fetch strategy selector
 *
 * Selects the appropriate fetch strategy based on the current environment:
 * - Test environments: Native fetch (to avoid JSONP complexity in tests)
 * - Web browsers: JSONP (to bypass CORS restrictions)
 * - Server environments: Native fetch (Node.js, Bun, React Native, etc.)
 *
 * @returns A fetch strategy function that can be used to make requests
 */
export const selectFetchStrategy = (): FetchStrategy => {
  const environment = getEnvironmentType();

  switch (environment) {
    case "test":
    case "server":
      return fetchNative;
    case "web":
      return fetchJsonp;
    default:
      return fetchNative; // Fallback
  }
};

/**
 * Get the current environment type for debugging/logging purposes
 */
export { getEnvironmentType };
