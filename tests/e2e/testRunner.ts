/**
 * @fileoverview Independent Test Runner for E2E Tests
 *
 * Allows each test file to run independently with parallel execution across endpoints.
 * Supports CLI specification of API and test cases.
 */

// Import expect from vitest for type compatibility
import { beforeAll, describe, expect, it } from "vitest";
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
 * Runs a single test function across all matching endpoints in parallel
 */
export function runParallelTest(
  testFn: (
    endpoint: Endpoint<unknown, unknown>
  ) => Promise<{ success: boolean; message: string }>,
  testDescription: string,
  config: TestConfig = {}
): void {
  // Define tests synchronously for vitest discovery
  // The async setup will happen in beforeAll hooks within each test

  // Get configuration for filtering
  const targetApi =
    config.apiName && config.apiName !== "all" ? config.apiName : null;

  // For each potential API, we'll create a describe block that will handle its own setup
  // This ensures tests are discoverable at load time
  describe("API Endpoints", () => {
    it("should setup and run tests", async () => {
      // This is a workaround - we'll run the actual test logic here
      // since the dynamic test creation in beforeAll isn't working with vitest discovery
      const setupResult = await setupTestEndpoints();

      // Filter APIs based on configuration
      let apiNames: string[];
      if (targetApi) {
        apiNames = [targetApi];
      } else {
        apiNames = [...Object.keys(setupResult.discoveredEndpoints)].sort();
      }

      // Collect all results across all APIs
      const allResults: Array<{
        apiName: string;
        endpoint: string;
        success: boolean;
        message: string;
      }> = [];
      const failedAPIs: Array<{ apiName: string; failures: string[] }> = [];

      // Run tests for each API
      for (const apiName of apiNames) {
        const endpoints = (setupResult.discoveredEndpoints[apiName] || [])
          .slice()
          .sort((a, b) => a.functionName.localeCompare(b.functionName));

        if (endpoints.length === 0) {
          testLogger.warn(`No endpoints available for ${apiName}`);
          continue;
        }

        // Run all endpoint tests in parallel for this API
        const endpointTests = endpoints.map(async (endpoint) => {
          try {
            const result = await testFn(endpoint);
            testLogger.info(
              `${apiName}.${endpoint.functionName} ${testDescription}: ${result.message}`
            );
            return {
              endpoint: endpoint.functionName,
              success: result.success,
              message: result.message,
              error: null,
            };
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : "Unknown error";
            testLogger.error(
              `${apiName}.${endpoint.functionName} ${testDescription}: ${errorMessage}`
            );
            return {
              endpoint: endpoint.functionName,
              success: false,
              message: errorMessage,
              error: errorMessage,
            };
          }
        });

        // Wait for all endpoint tests to complete in parallel
        const results = await Promise.all(endpointTests);

        // Add results to allResults array
        results.forEach((result) => {
          allResults.push({
            apiName,
            endpoint: result.endpoint,
            success: result.success,
            message: result.message,
          });
        });

        // Check results after all endpoints for this API have been tested
        const failedTests = results.filter((r) => !r.success);
        if (failedTests.length > 0) {
          const failureMessages = failedTests
            .map((f) => `${apiName}.${f.endpoint}: ${f.message}`)
            .join("\n");
          failedAPIs.push({ apiName, failures: [failureMessages] });
        }
      }

      // Report results after all APIs have been tested
      if (failedAPIs.length > 0) {
        const allFailureMessages = failedAPIs
          .map(
            (failedAPI) =>
              `API ${failedAPI.apiName}:\n${failedAPI.failures.join("\n")}`
          )
          .join("\n\n");
        throw new Error(
          `Failed tests across ${failedAPIs.length} API(s):\n\n${allFailureMessages}`
        );
      }
    });
  });
}

/**
 * Creates a test suite for a specific test type that can run independently
 */
export function createTestSuite(
  testFn: (
    endpoint: Endpoint<unknown, unknown>
  ) => Promise<{ success: boolean; message: string }>,
  testDescription: string,
  config: TestConfig = {}
): void {
  beforeAll(async () => {
    testLogger.info(`Starting ${testDescription} tests`);
  });

  runParallelTest(testFn, testDescription, config);
}
