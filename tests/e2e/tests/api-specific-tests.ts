/**
 * @fileoverview API-Specific Test Runner
 *
 * This file demonstrates how to run tests for individual APIs as separate test cases,
 * providing individual feedback for each API instead of a single monolithic test.
 *
 * Usage:
 * - Run all APIs: npx vitest --config config/vitest.config.ts --run tests/e2e/tests/api-specific-tests.ts
 * - Run specific API: npx vitest --config config/vitest.config.ts --run tests/e2e/tests/api-specific-tests.ts -- --api wsdot-highway-alerts
 */

import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import { testLogger } from "../shared/logger";
import { createTestSuite } from "../shared/setup";
import { extractSimpleErrorMessage } from "../testRunner";

/**
 * Tests an endpoint with comprehensive validation and detailed error reporting
 */
async function testEndpoint(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const startTime = Date.now();
  try {
    const params = endpoint.sampleParams || {};

    const result = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    if (result === undefined) {
      return {
        success: false,
        message:
          "Endpoint returned undefined result - check if endpoint should return data",
      };
    }

    return {
      success: true,
      message: `Endpoint ${endpoint.functionName} completed successfully`,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = extractSimpleErrorMessage(error, endpoint);

    return {
      success: false,
      message: `Endpoint ${endpoint.functionName} failed: ${errorMessage}`,
    };
  }
}

/**
 * Master test function that runs comprehensive endpoint validation for each API
 */
async function runApiSpecificTests(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  return await testEndpoint(endpoint);
}

// Run the API-specific test suite using the centralized setup
createTestSuite({
  description: "API-specific endpoint validation",
  testFunction: runApiSpecificTests,
});

// Export individual test functions for potential use in other contexts
export { runApiSpecificTests as runApiSpecificTestsTest, testEndpoint };
