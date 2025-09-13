/**
 * @fileoverview Fetch Strategy Selection for Cross-Platform Compatibility
 *
 * This module provides intelligent fetch strategy selection based on the current
 * environment. It automatically chooses the appropriate fetching method for
 * different platforms while maintaining a consistent API interface.
 *
 * Key Features:
 * - Automatic environment detection (browser, Node.js, test)
 * - Platform-specific strategy selection (JSONP for browsers, fetch for Node.js)
 * - Environment variable overrides for testing
 * - Consistent API across all platforms
 *
 * Strategy Selection:
 * - Browser environments: JSONP (to bypass CORS restrictions)
 * - Node.js environments: Native fetch (for server-side requests)
 * - Test environments: Native fetch (to avoid JSONP complexity)
 * - Override: FORCE_JSONP=true for JSONP testing
 *
 * Usage:
 * ```typescript
 * // Get the appropriate fetch strategy for current environment
 * const fetchStrategy = selectFetchStrategy();
 * const data = await fetchStrategy("https://api.example.com/data");
 *
 * // Check current environment type
 * const envType = getEnvironmentType(); // "web", "server", or "test"
 *
 * // Force JSONP for testing (set FORCE_JSONP=true)
 * const jsonpStrategy = selectFetchStrategy(); // Returns JSONP even in tests
 * ```
 */

import { isTestEnvironment } from "@/shared/fetching/testEnvironment";
import type { FetchStrategy } from "../types";
import { fetchJsonp } from "./fetchJsonp";
import { fetchNative } from "./fetchNative";

/**
 * Cross-platform fetch strategy selector
 *
 * Selects the appropriate fetch strategy based on the current environment:
 * - Test environments: Native fetch (to avoid JSONP complexity in tests)
 * - Web browsers: JSONP (to bypass CORS restrictions)
 * - Server environments: Native fetch (Node.js, Bun, React Native, etc.)
 *
 * Environment variable override:
 * - FORCE_JSONP=true: Forces JSONP strategy even in tests (for JSONP testing)
 *
 * @returns A fetch strategy function that can be used to make requests
 */
export const selectFetchStrategy = (): FetchStrategy => {
  // Allow forcing JSONP for testing purposes
  if (typeof process !== "undefined" && process.env.FORCE_JSONP === "true") {
    return fetchJsonp;
  }

  // Use native fetch for test environments
  if (isTestEnvironment()) {
    return fetchNative;
  }

  // Use JSONP for browser environments, native fetch for server environments
  return typeof window !== "undefined" ? fetchJsonp : fetchNative;
};

/**
 * Get the current environment type for debugging/logging purposes
 *
 * @returns The current environment type: "web", "server", or "test"
 */
export const getEnvironmentType = (): "web" | "server" | "test" => {
  if (isTestEnvironment()) {
    return "test";
  }

  if (typeof window !== "undefined") {
    return "web";
  }

  return "server";
};
