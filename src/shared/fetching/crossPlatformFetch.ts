// Cross-platform fetch factory

import type { FetchStrategy } from "./fetchStrategies";
import { fetchJsonp, fetchNative } from "./fetchStrategies";

/**
 * Environment detection utilities
 */
const isWebEnvironment = () => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};

const isTestEnvironment = () => {
  return (
    (typeof process !== "undefined" && process.env.NODE_ENV === "test") ||
    (typeof process !== "undefined" &&
      process.env.VITEST_WORKER_ID !== undefined) ||
    (typeof window !== "undefined" &&
      window.navigator?.userAgent?.includes("jsdom")) ||
    (typeof window !== "undefined" &&
      window.navigator?.userAgent?.includes("happy-dom"))
  );
};

/**
 * Cross-platform fetch factory
 *
 * Returns the appropriate fetch strategy based on the current environment:
 * - Test environments: Native fetch (to avoid JSONP complexity in tests)
 * - Web browsers: JSONP (to bypass CORS restrictions)
 * - Other environments: Native fetch (Node.js, Bun, React Native, etc.)
 *
 * @returns A fetch strategy function that can be used to make requests
 */
export const createCrossPlatformFetch = (): FetchStrategy => {
  // Use native fetch for test environments to avoid JSONP issues
  if (isTestEnvironment()) {
    return fetchNative;
  }

  // Use JSONP for real web browsers to bypass CORS
  if (isWebEnvironment()) {
    return fetchJsonp;
  }

  // Fallback: use native fetch for Node.js, Bun, React Native, etc.
  return fetchNative;
};

/**
 * Get the current environment type for debugging/logging purposes
 */
export const getEnvironmentType = (): "test" | "web" | "server" => {
  if (isTestEnvironment()) {
    return "test";
  }
  if (isWebEnvironment()) {
    return "web";
  }
  return "server";
};
