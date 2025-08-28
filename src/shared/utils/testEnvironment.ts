/**
 * Test environment detection utilities
 *
 * This module provides utilities for detecting when code is running in a test environment.
 * This is useful for automatically disabling logging, caching, or other behaviors that
 * might interfere with test execution or produce unwanted output.
 */

/**
 * Checks if the current environment is a test environment
 *
 * Detects test environments by checking for:
 * - NODE_ENV=test
 * - VITEST environment variable (set by Vitest)
 * - Other common test environment indicators
 *
 * @returns true if running in a test environment, false otherwise
 */
export const isTestEnvironment = (): boolean => {
  return (
    process.env.NODE_ENV === "test" ||
    process.env.VITEST !== undefined ||
    (typeof process !== "undefined" && process.env?.NODE_ENV === "test")
  );
};

/**
 * Checks if the current environment is a development environment
 *
 * @returns true if running in development, false otherwise
 */
export const isDevelopmentEnvironment = (): boolean => {
  return process.env.NODE_ENV === "development";
};

/**
 * Checks if the current environment is a production environment
 *
 * @returns true if running in production, false otherwise
 */
export const isProductionEnvironment = (): boolean => {
  return process.env.NODE_ENV === "production";
};
