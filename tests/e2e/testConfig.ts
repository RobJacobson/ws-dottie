/**
 * @fileoverview E2E Test Configuration
 *
 * Centralized configuration for all test settings, timeouts, and behavior.
 * Enhanced from the original config.ts with additional test-specific settings.
 */

/** Default timeout for API requests (ms) */
export const DEFAULT_TIMEOUT = 30000;

/** Maximum retry attempts */
export const MAX_RETRIES = 3;

/** Parallel execution batch size (number of tests to run simultaneously) */
export const PARALLEL_BATCH_SIZE = 5;

/** Enable parallel execution by default */
export const ENABLE_PARALLEL_EXECUTION = true;

/** Test timeout for parallel execution (30 seconds) */
export const PARALLEL_TEST_TIMEOUT = 30000;

/** Check if API should be skipped */
export const shouldSkipApi = (_apiName: string): boolean => false;

/** Get effective timeout for an API */
export const getApiTimeout = (_apiName: string): number => DEFAULT_TIMEOUT;

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
