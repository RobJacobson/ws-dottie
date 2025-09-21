/**
 * @fileoverview E2E Test Configuration
 *
 * Centralized configuration for all test settings, timeouts, and behavior.
 * Enhanced from the original config.ts with additional test-specific settings.
 */

/** Default timeout for API requests (ms) - increased for external API variability */
export const DEFAULT_TIMEOUT = 60000;

/** Test timeout for parallel execution (60 seconds) - increased for external API variability */
export const PARALLEL_TEST_TIMEOUT = 60000;

/** Get the target module from environment variable */
export const getTargetModule = (): string | null => {
  return process.env.TEST_MODULE || null;
};

/** Check if we should test a specific module */
export const shouldTestSpecificModule = (): boolean => {
  const module = getTargetModule();
  return module !== null && module !== "all";
};

/** Get the number of test endpoints to run (for demonstration) */
export const getTestEndpointCount = (): number => 3;
