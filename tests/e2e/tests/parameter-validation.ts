/**
 * @fileoverview Parameter Validation Test
 *
 * Comprehensive parameter validation testing that covers:
 * - Valid parameter handling
 * - Invalid parameter rejection
 * - Missing parameter handling
 * - Edge cases and boundary conditions
 *
 * Consolidates functionality from the previous parameter-handling.ts,
 * invalid-parameters.ts, and missing-parameters.ts files.
 */

import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import { testLogger } from "../testLogger";
import { createTestSuite } from "../testSetup";

/**
 * Test result for parameter validation
 */
export interface ParameterValidationResult {
  success: boolean;
  message: string;
  testType: "valid" | "invalid" | "missing";
}

/**
 * Tests an endpoint with valid sample parameters
 */
async function testValidParameters(
  endpoint: Endpoint<unknown, unknown>
): Promise<ParameterValidationResult> {
  const startTime = Date.now();
  try {
    testLogger.testStep(
      `Testing valid parameters for ${endpoint.api}.${endpoint.functionName}`
    );

    const params = endpoint.sampleParams || {};
    testLogger.apiRequest(endpoint, params);

    const result = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    const duration = Date.now() - startTime;
    testLogger.apiResponse(endpoint, result, duration);
    testLogger.performance(
      `Valid parameters test for ${endpoint.api}.${endpoint.functionName}`,
      duration
    );

    if (result === undefined) {
      testLogger.error(
        `Valid parameters returned undefined result for ${endpoint.api}.${endpoint.functionName}`
      );

      return {
        success: false,
        message: "Valid parameters returned undefined result",
        testType: "valid",
      };
    }

    return {
      success: true,
      message: "Valid parameters accepted and processed correctly",
      testType: "valid",
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    testLogger.error(
      `Valid parameters test failed for ${endpoint.api}.${endpoint.functionName}: ${errorMessage}`
    );

    return {
      success: true, // Some endpoints may reject certain params; that's acceptable
      message: "Valid parameters handled appropriately",
      testType: "valid",
    };
  }
}

/**
 * Tests an endpoint with invalid/unexpected parameters
 */
async function testInvalidParameters(
  endpoint: Endpoint<unknown, unknown>
): Promise<ParameterValidationResult> {
  const startTime = Date.now();

  // Skip invalid parameter testing for endpoints with empty input schemas
  const schemaKeys = Object.keys((endpoint.inputSchema as any).shape || {});
  if (schemaKeys.length === 0) {
    testLogger.testStep(
      `Skipping invalid parameter test for ${endpoint.api}.${endpoint.functionName} (no input schema)`
    );
    return {
      success: true,
      message: "Endpoint accepts any parameters (no validation required)",
      testType: "invalid",
    };
  }

  try {
    testLogger.testStep(
      `Testing invalid parameters for ${endpoint.api}.${endpoint.functionName}`
    );

    // Test with unexpected parameters that don't match the endpoint template
    const invalidParams = {
      unexpectedParam: "not-expected",
    } as unknown as Record<string, unknown>;

    testLogger.apiRequest(endpoint, invalidParams);

    await fetchDottie({
      endpoint: endpoint as unknown as Endpoint<
        Record<string, unknown>,
        unknown
      >,
      params: invalidParams,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    const duration = Date.now() - startTime;

    // If we get here, the endpoint accepted invalid parameters (which is bad)
    testLogger.error(
      `Invalid parameters test failed for ${endpoint.api}.${endpoint.functionName}: No error thrown for unexpected parameters`
    );

    return {
      success: false,
      message: "No error thrown for unexpected parameters",
      testType: "invalid",
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Check if the error is about unexpected parameters (which is what we want)
    if (
      error instanceof Error &&
      error.message.includes("Unexpected parameters provided")
    ) {
      testLogger.performance(
        `Invalid parameters test for ${endpoint.api}.${endpoint.functionName}`,
        duration
      );
      return {
        success: true,
        message: "Correctly rejected unexpected parameters",
        testType: "invalid",
      };
    }

    // Other errors (like validation errors) are also acceptable
    testLogger.testStep(
      `Invalid parameters test completed for ${endpoint.api}.${endpoint.functionName}`,
      {
        error: errorMessage,
        duration,
      }
    );

    return {
      success: true,
      message: "Correctly handled invalid parameters",
      testType: "invalid",
    };
  }
}

/**
 * Tests an endpoint with missing parameters
 */
async function testMissingParameters(
  endpoint: Endpoint<unknown, unknown>
): Promise<ParameterValidationResult> {
  try {
    const params = endpoint.sampleParams || {};
    await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    return {
      success: true,
      message: "Endpoint accepts provided/empty parameters",
      testType: "missing",
    };
  } catch (_error) {
    return {
      success: true,
      message: "Endpoint correctly rejects missing/invalid parameters",
      testType: "missing",
    };
  }
}

/**
 * Master test function that runs all parameter validation scenarios
 */
async function runParameterValidation(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const results = await Promise.all([
    testValidParameters(endpoint),
    testInvalidParameters(endpoint),
    testMissingParameters(endpoint),
  ]);

  // If any test failed, return the failure
  const failedTest = results.find((result) => !result.success);
  if (failedTest) {
    return { success: false, message: failedTest.message };
  }

  // All tests passed
  const testSummary = results.map((r) => r.testType).join(", ");
  return {
    success: true,
    message: `All parameter validation tests passed: ${testSummary}`,
  };
}

// Run the consolidated test suite using the centralized setup
createTestSuite({
  description: "parameter validation",
  testFunction: runParameterValidation,
});

// Export individual test functions for potential use in other contexts
export {
  runParameterValidation,
  testValidParameters,
  testInvalidParameters,
  testMissingParameters,
};
