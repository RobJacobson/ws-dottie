/**
 * @fileoverview Parameter Validation Test
 *
 * Tests valid parameter handling to ensure:
 * - Valid parameters work correctly with each endpoint
 * - Endpoints return meaningful responses when given valid parameters
 */

import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import { testLogger } from "../shared/logger";
import { createTestSuite } from "../shared/setup";

/**
 * Master test function that runs all parameter validation scenarios
 */
async function runParameterValidationTest(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const startTime = Date.now();
  // Test with valid parameters
  const params = endpoint.sampleParams || {};

  testLogger.testStep(
    `Testing valid parameters for ${endpoint.api}.${endpoint.functionName}`
  );

  testLogger.apiRequest(endpoint, params);

  try {
    const result = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    const duration = Date.now() - startTime;
    testLogger.apiResponse(endpoint, result, duration);

    // Verify we got a meaningful response
    if (result === undefined || result === null) {
      const message = `Parameter validation failed for ${endpoint.api}.${endpoint.functionName}: Valid parameters returned ${result}`;
      testLogger.error(message);
      return {
        success: false,
        message,
      };
    }

    return {
      success: true,
      message: `Parameter validation passed for ${endpoint.api}.${endpoint.functionName}`,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    testLogger.testResultWithError(
      `${endpoint.api}.${endpoint.functionName}`,
      false,
      `Parameter validation failed: ${errorMessage}`,
      duration
    );

    return {
      success: false,
      message: `Parameter validation failed for ${endpoint.api}.${endpoint.functionName}: ${errorMessage}`,
    };
  }
}

// Run the consolidated test suite using the centralized setup
createTestSuite({
  description: "parameter validation",
  testFunction: runParameterValidationTest,
});

// Export the main test function for potential use in other contexts
export { runParameterValidationTest };
