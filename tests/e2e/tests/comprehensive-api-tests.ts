/**
 * @fileoverview Comprehensive API Tests - Multiple Test Types Per Endpoint
 *
 * This test file implements the hierarchical structure where:
 * - All tests for each API are run together
 * - Within each API, all tests for each endpoint are run together
 * - Multiple test types are executed per endpoint before moving to the next endpoint
 */

import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import {
  createMultiTestHierarchicalSuite,
  type TestDefinition,
} from "../multi-test-orchestrator";

/**
 * Test 1: Parameter Validation
 */
async function runParameterValidationTest(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  // Test with valid parameters
  const params = endpoint.sampleParams || {};

  try {
    const result = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    // Verify we got a meaningful response
    if (result === undefined || result === null) {
      return {
        success: false,
        message: `Parameter validation failed: Valid parameters returned ${result}`,
      };
    }

    return {
      success: true,
      message: `Parameter validation passed for ${endpoint.api}.${endpoint.functionName}`,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      message: `Parameter validation failed for ${endpoint.api}.${endpoint.functionName}: ${errorMessage}`,
    };
  }
}

/**
 * Test 2: Schema Validation
 */
async function runSchemaValidationTest(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const params = endpoint.sampleParams || {};

  try {
    const result = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    if (result === undefined || result === null) {
      return {
        success: false,
        message: `Schema validation failed: Result is undefined or null`,
      };
    }

    return {
      success: true,
      message: `Schema validation passed for ${endpoint.api}.${endpoint.functionName}`,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      message: `Schema validation failed for ${endpoint.api}.${endpoint.functionName}: ${errorMessage}`,
    };
  }
}

/**
 * Test 3: Basic Data Fetch
 */
async function runBasicDataFetchTest(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const params = endpoint.sampleParams || {};

  try {
    const result = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: false,
    });

    if (result === undefined) {
      return {
        success: false,
        message: `Data fetch failed: Result is undefined`,
      };
    }

    return {
      success: true,
      message: `Data fetch passed for ${endpoint.api}.${endpoint.functionName}`,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      message: `Data fetch failed for ${endpoint.api}.${endpoint.functionName}: ${errorMessage}`,
    };
  }
}

// Define all test types to run per endpoint
const testDefinitions: TestDefinition[] = [
  {
    name: "parameter-validation",
    testFunction: runParameterValidationTest,
  },
  {
    name: "schema-validation",
    testFunction: runSchemaValidationTest,
  },
  {
    name: "data-fetch",
    testFunction: runBasicDataFetchTest,
  },
];

// Run the comprehensive test suite with multiple test types per endpoint
createMultiTestHierarchicalSuite(
  testDefinitions,
  "comprehensive API validation"
);

// Export individual test functions for potential use in other contexts
export {
  runParameterValidationTest,
  runSchemaValidationTest,
  runBasicDataFetchTest,
};
