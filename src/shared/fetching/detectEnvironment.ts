/**
 * @fileoverview Environment Detection Utilities for WS-Dottie
 *
 * This module provides environment detection capabilities to determine
 * the runtime environment (web browser, server, or test) and configure
 * appropriate fetch strategies. It includes detection for test environments,
 * web browsers, and JSONP forcing for testing purposes.
 */

/**
 * Supported environment types for WS-Dottie
 *
 * Defines the three main runtime environments that WS-Dottie can operate in,
 * each with different capabilities and constraints.
 */
export type EnvironmentType = "web" | "server" | "test";

/**
 * Detects if the code is running in a test environment
 *
 * This function checks for various indicators that suggest the code is
 * running in a test environment, including NODE_ENV, VITEST, and Jest
 * worker indicators.
 *
 * @returns True if running in a test environment, false otherwise
 */
export const isTestEnvironment = (): boolean =>
  typeof process !== "undefined" &&
  (process.env.NODE_ENV === "test" ||
    process.env.VITEST === "true" ||
    process.env.JEST_WORKER_ID !== undefined);

/**
 * Detects if the code is running in a web browser environment
 *
 * This function checks for the presence of browser-specific globals
 * (window and document) to determine if the code is running in a browser.
 *
 * @returns True if running in a web browser, false otherwise
 */
export const isWebEnvironment = (): boolean =>
  typeof window !== "undefined" && typeof document !== "undefined";

/**
 * Checks if JSONP should be forced for testing purposes
 *
 * This function checks the FORCE_JSONP environment variable to determine
 * if JSONP should be used even in non-browser environments for testing.
 *
 * @returns True if JSONP should be forced, false otherwise
 */
export const shouldForceJsonp = (): boolean =>
  typeof process !== "undefined" && process.env.FORCE_JSONP === "true";

/**
 * Gets the current environment type
 *
 * This function determines the current runtime environment by checking
 * test environment first, then web environment, defaulting to server.
 *
 * @returns The current environment type
 */
export const getEnvironmentType = (): EnvironmentType => {
  if (isTestEnvironment()) return "test";
  if (isWebEnvironment()) return "web";
  return "server";
};
