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

/** Get the target module from command line arguments */
export const getTargetModule = (): string | null => {
  // Check command line arguments
  // Start from index 2 to skip 'node' executable and script name
  const args = process.argv;
  for (let i = 2; i < args.length; i++) {
    if (args[i] === "--api" || args[i] === "-a") {
      return args[i + 1] || null;
    }
  }
  // Default to null if not specified (meaning run all APIs)
  return null;
};

/** Check if we should test a specific module */
export const shouldTestSpecificModule = (): boolean => {
  const module = getTargetModule();
  return module !== null;
};

/** Get the number of test endpoints to run (for demonstration) */
export const getTestEndpointCount = (): number => 3;
