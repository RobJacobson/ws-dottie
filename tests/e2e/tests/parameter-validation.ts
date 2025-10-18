/**
 * @fileoverview Parameter Validation Test
 *
 * Tests valid parameter handling to ensure:
 * - Valid parameters work correctly with each endpoint
 * - Endpoints return meaningful responses when given valid parameters
 */

import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import { createHierarchicalTestSuiteWrapper } from "../shared/hierarchicalSetup";
import { testLogger } from "../shared/logger";

/**
 * Master test function that runs all parameter validation scenarios
 */
async function runParameterValidationTest(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const startTime = Date.now();
  // Test with valid parameters
  const params = endpoint.sampleParams || {};

  // Removed detailed logging to keep output concise - only showing final result

  try {
    const result = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    const duration = Date.now() - startTime;

    // Verify we got a meaningful response
    if (result === undefined || result === null) {
      const message = `Parameter validation failed: Valid parameters returned ${result}`;
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

    return {
      success: false,
      message: `Parameter validation failed for ${endpoint.api}.${endpoint.functionName}: ${errorMessage}`,
    };
  }
}

// Run the consolidated test suite using the hierarchical setup
createHierarchicalTestSuiteWrapper({
  description: "parameter validation",
  testFunction: runParameterValidationTest,
});

// Export the main test function for potential use in other contexts
export { runParameterValidationTest };
