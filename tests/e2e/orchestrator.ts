/**
 * @fileoverview Hierarchical Test Orchestrator
 *
 * Implements the new hierarchical, orchestrated approach with improved display formatting
 * that follows the sequence: API → Endpoint → Test, with roll-up summaries.
 */

import { describe, it } from "vitest";
import type { Endpoint } from "@/shared/types";
import { setupTestEndpoints } from "./setupUtils";

export interface TestConfig {
  apiName?: string | null;
  testName?: string;
}

export interface TestResult {
  endpoint: string;
  success: boolean;
  message: string;
  duration: number;
}

export type HierarchicalTestFn = (
  endpoint: Endpoint<unknown, unknown>
) => Promise<{ success: boolean; message: string }>;

/**
 * Runs tests in a hierarchical API → Endpoint → Test structure with roll-up summaries
 */
export async function runHierarchicalTest(
  testFn: HierarchicalTestFn,
  testDescription: string,
  config: TestConfig = {}
): Promise<void> {
  const targetApi = config.apiName || null;

  // Set up test endpoints
  const setupResult = await setupTestEndpoints();

  // Filter APIs based on configuration
  let apiNames: string[];
  if (targetApi) {
    apiNames = [targetApi];
  } else {
    apiNames = [...Object.keys(setupResult.discoveredEndpoints)].sort();
  }

  // Log test suite start
  console.log(`🚀 ${testDescription} - Testing ${apiNames.length} APIs`);

  // Track overall results
  const allResults: TestResult[] = [];
  let totalTests = 0;
  let passedTests = 0;

  // Run tests for each API in alphabetical order
  for (const apiName of apiNames) {
    const endpoints = (setupResult.discoveredEndpoints[apiName] || [])
      .slice()
      .sort((a, b) => a.functionName.localeCompare(b.functionName));

    if (endpoints.length === 0) {
      console.log(`⚠️  No endpoints available for ${apiName}`);
      continue;
    }

    // Log API start
    console.log(`\n🔍 Testing API: ${apiName} (${endpoints.length} endpoints)`);

    // Run tests for each endpoint within the API
    for (const endpoint of endpoints) {
      totalTests++;

      const startTime = Date.now();

      try {
        const result = await testFn(endpoint);
        const duration = Date.now() - startTime;

        // Log the completed test as a single line rollup
        if (result.success) {
          console.log(`✅ ${apiName}.${endpoint.functionName} (${duration}ms)`);
          passedTests++;
        } else {
          console.log(
            `❌ ${apiName}.${endpoint.functionName} (${duration}ms) - ${result.message}`
          );
        }

        allResults.push({
          endpoint: `${apiName}.${endpoint.functionName}`,
          success: result.success,
          message: result.message,
          duration,
        });
      } catch (error) {
        const duration = Date.now() - startTime;
        const errorMessage = extractSimpleErrorMessage(error, endpoint);

        // Log failed test as single line rollup
        console.log(
          `❌ ${apiName}.${endpoint.functionName} (${duration}ms) - ${errorMessage}`
        );

        allResults.push({
          endpoint: `${apiName}.${endpoint.functionName}`,
          success: false,
          message: errorMessage,
          duration,
        });
      }
    }
  }

  // Provide roll-up summary
  const failedTests = allResults.filter((r) => !r.success);
  const passedCount = allResults.length - failedTests.length;

  console.log(
    `\n📊 Roll-up Summary: ${passedCount}/${allResults.length} tests passed`
  );

  if (failedTests.length > 0) {
    console.log(`\n❌ ${failedTests.length} tests failed:`);
    failedTests.forEach((failure) => {
      console.log(`   • ${failure.endpoint}: ${failure.message}`);
    });

    // Throw error to fail the test suite if any tests failed
    throw new Error(`${failedTests.length} test(s) failed`);
  } else {
    console.log(`✅ All ${allResults.length} tests passed!`);
  }
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
 * Creates a hierarchical test suite that follows API → Endpoint → Test structure
 */
export function createHierarchicalTestSuite(
  testFn: HierarchicalTestFn,
  testDescription: string,
  config: TestConfig = {}
): void {
  describe(`${testDescription} Tests`, () => {
    it(`should run ${testDescription} in hierarchical order`, async () => {
      await runHierarchicalTest(testFn, testDescription, config);
    });
  });
}
