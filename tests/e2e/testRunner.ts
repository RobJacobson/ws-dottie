/**
 * @fileoverview Independent Test Runner for E2E Tests
 *
 * Allows each test file to run independently with parallel execution across endpoints.
 * Supports CLI specification of API and test cases.
 */

// Import expect from vitest for type compatibility
import { describe, it } from "vitest";
import type { Endpoint } from "@/shared/types";
import { setupTestEndpoints } from "./setupUtils";
import { PARALLEL_TEST_TIMEOUT } from "./testConfig";
import { testLogger } from "./testLogger";

/**
 * Configuration for running individual tests
 */
export interface TestConfig {
  apiName?: string | null;
  testName?: string;
}

/**
 * Creates a test suite that runs each API as a separate test case
 */
export function runParallelTest(
  testFn: (
    endpoint: Endpoint<unknown, unknown>
  ) => Promise<{ success: boolean; message: string }>,
  testDescription: string,
  config: TestConfig = {}
): void {
  // Get configuration for filtering
  const targetApi = config.apiName || null;

  // Create a top-level describe block for the test suite
  describe(`${testDescription} Tests`, () => {
    // Create individual tests for each API
    describe("API Tests", () => {
      // Generate tests at module load time for proper vitest discovery
      const setupResultPromise = setupTestEndpoints();

      // Create a test that will be discovered by vitest
      it(`should run ${testDescription} for all APIs`, async () => {
        const setupResult = await setupResultPromise;

        // Filter APIs based on configuration
        let apiNames: string[];
        if (targetApi) {
          apiNames = [targetApi];
        } else {
          apiNames = [...Object.keys(setupResult.discoveredEndpoints)].sort();
        }

        // Run tests for each API sequentially, but each API's endpoints in parallel
        for (const apiName of apiNames) {
          const endpoints = (setupResult.discoveredEndpoints[apiName] || [])
            .slice()
            .sort((a, b) => a.functionName.localeCompare(b.functionName));

          if (endpoints.length === 0) {
            testLogger.warn(`No endpoints available for ${apiName}`);
            continue;
          }

          // Run all endpoint tests in parallel for this API
          const startTime = Date.now();
          const endpointTests = endpoints.map(async (endpoint) => {
            try {
              const result = await testFn(endpoint);

              if (result.success) {
                testLogger.testResult(
                  `${apiName}.${endpoint.functionName}`,
                  true,
                  Date.now() - startTime
                );
              } else {
                testLogger.testResultWithError(
                  `${apiName}.${endpoint.functionName}`,
                  false,
                  result.message,
                  Date.now() - startTime
                );
              }

              return {
                endpoint: endpoint.functionName,
                success: result.success,
                message: result.message,
              };
            } catch (error) {
              const duration = Date.now() - startTime;
              const errorMessage = extractDetailedErrorMessage(error, endpoint);

              testLogger.testResultWithError(
                `${apiName}.${endpoint.functionName}`,
                false,
                errorMessage,
                duration
              );

              return {
                endpoint: endpoint.functionName,
                success: false,
                message: errorMessage,
              };
            }
          });

          // Wait for all endpoint tests to complete in parallel
          const results = await Promise.all(endpointTests);

          // Check results for this API
          const failedTests = results.filter((r) => !r.success);
          if (failedTests.length > 0) {
            const failureMessages = failedTests
              .map((f) => `❌ ${apiName}.${f.endpoint}: ${f.message}`)
              .join("\n");

            throw new Error(failureMessages);
          }
        }
      });
    });
  });
}

/**
 * Extracts simplified error messages from various error types
 */
export function extractSimpleErrorMessage(
  error: unknown,
  endpoint: Endpoint<unknown, unknown>
): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Specific handling for 400 errors
    if (message.includes("400")) {
      return `Bad Request (400) - Invalid parameters provided to endpoint: ${endpoint.endpoint}`;
    }
    // Other HTTP errors
    if (message.includes("401") || message.includes("unauthorized")) {
      return `Authentication failed (401) - check API credentials`;
    }
    if (message.includes("403") || message.includes("forbidden")) {
      return `Access forbidden (403) - check API permissions`;
    }
    if (message.includes("404")) {
      return `Endpoint not found (404) - verify endpoint URL: ${endpoint.endpoint}`;
    }
    if (message.includes("429")) {
      return `Rate limit exceeded (429) - too many requests to API`;
    }
    if (message.includes("timeout") || message.includes("etimedout")) {
      return `Request timeout - API took too long to respond`;
    }
    if (message.includes("econnrefused")) {
      return `Connection refused - API server may be down`;
    }

    // Return the original error message for all other cases
    return error.message;
  }

  // Handle non-error objects
  if (typeof error === "string") {
    return error;
  }

  // Try to serialize non-error objects
  try {
    return JSON.stringify(error);
  } catch {
    return `Unknown error: ${String(error)}`;
  }
}

/**
 * Extracts detailed error messages from various error types
 * Kept for backward compatibility
 */
export function extractDetailedErrorMessage(
  error: unknown,
  endpoint: Endpoint<unknown, unknown>
): string {
  return extractSimpleErrorMessage(error, endpoint);
}
