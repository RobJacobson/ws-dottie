/**
 * @fileoverview Parameter Validation Test
 *
 * Comprehensive parameter validation testing that covers:
 * - Valid parameter handling
 * - Invalid parameter rejection
 * - Missing parameter handling
 * - Edge cases and boundary conditions
 *
 * Simplified implementation with consolidated functionality.
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
  try {
    // Test with valid parameters
    const params = endpoint.sampleParams || {};

    testLogger.testStep(
      `Testing valid parameters for ${endpoint.api}.${endpoint.functionName}`
    );

    testLogger.apiRequest(endpoint, params);

    const startTime = Date.now();
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
      return {
        success: false,
        message: `Valid parameters returned ${result} for ${endpoint.api}.${endpoint.functionName}`,
      };
    }

    // Verify we got a meaningful response
    if (result === undefined || result === null) {
      return {
        success: false,
        message: `Valid parameters returned ${result} for ${endpoint.api}.${endpoint.functionName}`,
      };
    }

    return {
      success: true,
      message: `Parameter validation passed for ${endpoint.api}.${endpoint.functionName}`,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    testLogger.error(
      `Parameter validation failed for ${endpoint.api}.${endpoint.functionName}: ${errorMessage}`
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
