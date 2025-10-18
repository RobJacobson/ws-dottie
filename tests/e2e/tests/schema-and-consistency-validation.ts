/**
 * @fileoverview Schema and Consistency Validation Test
 *
 * Comprehensive validation testing that covers:
 * - Schema compliance: API responses match Zod schemas
 * - Type consistency: Consistent data types across multiple calls
 * - Response structure validation: Reasonable array sizes and data integrity
 *
 * Consolidates functionality from the previous schema-validation.ts
 * and data-structure-consistency.ts files.
 */

import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import { testLogger } from "../shared/logger";
import { createTestSuite } from "../shared/setup";

/**
 * Tests that API responses match expected Zod schemas
 */
async function testSchemaValidation(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const startTime = Date.now();
  const params = endpoint.sampleParams || {};

  testLogger.testStep(
    `Running schema validation for ${endpoint.api}.${endpoint.functionName}`
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

    if (result === undefined || result === null) {
      const message = `Schema validation failed for ${endpoint.api}.${endpoint.functionName}: Result is undefined or null`;
      testLogger.error(message);
      return {
        success: false,
        message,
      };
    }

    return {
      success: true,
      message: `Schema validation passed for ${endpoint.api}.${endpoint.functionName}: Response matches Zod schema`,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    testLogger.testResultWithError(
      `${endpoint.api}.${endpoint.functionName}`,
      false,
      `Schema validation failed: ${errorMessage}`,
      duration
    );

    return {
      success: false,
      message: `Schema validation failed for ${endpoint.api}.${endpoint.functionName}: ${errorMessage}`,
    };
  }
}

/**
 * Tests data structure consistency across multiple calls
 */
async function testDataStructureConsistency(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const startTime = Date.now();
  const params = endpoint.sampleParams || {};

  testLogger.testStep(
    `Running data structure consistency test for ${endpoint.api}.${endpoint.functionName}`
  );
  testLogger.apiRequest(endpoint, params);

  try {
    // For performance, only do consistency check on small datasets
    const r1 = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    // Skip second API call for large datasets to improve performance
    if (Array.isArray(r1) && r1.length > 50) {
      const message = `Data structure consistency skipped for large dataset (${r1.length} items) for ${endpoint.api}.${endpoint.functionName}`;
      testLogger.info(message);
      return {
        success: true,
        message,
      };
    }

    const r2 = await fetchDottie({
      endpoint,
      params,
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    if (typeof r1 !== typeof r2) {
      const message = `Data structure consistency failed for ${endpoint.api}.${endpoint.functionName}: Type mismatch between calls`;
      testLogger.error(message);
      return {
        success: false,
        message,
      };
    }

    if (Array.isArray(r1) && Array.isArray(r2)) {
      const diff = Math.abs(r1.length - r2.length);
      if (diff > 10) {
        const message = `Data structure consistency failed for ${endpoint.api}.${endpoint.functionName}: Array length variance too high (${diff} items)`;
        testLogger.error(message);
        return {
          success: false,
          message,
        };
      }
    }

    const duration = Date.now() - startTime;
    testLogger.performance(
      `Data structure consistency test for ${endpoint.api}.${endpoint.functionName}`,
      duration
    );

    return {
      success: true,
      message: `Data structure consistency validated for ${endpoint.api}.${endpoint.functionName}: Types and sizes consistent across calls`,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    testLogger.testResultWithError(
      `${endpoint.api}.${endpoint.functionName}`,
      false,
      `Data structure consistency test failed: ${errorMessage}`,
      duration
    );

    return {
      success: false,
      message: `Data structure consistency test failed for ${endpoint.api}.${endpoint.functionName}: ${errorMessage}`,
    };
  }
}

/**
 * Master test function that runs both schema and consistency validation
 */
async function runSchemaAndConsistencyValidation(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const results = await Promise.all([
    testSchemaValidation(endpoint),
    testDataStructureConsistency(endpoint),
  ]);

  // If any test failed, return the failure
  const failedTest = results.find((result) => !result.success);
  if (failedTest) {
    return { success: false, message: failedTest.message };
  }

  // All tests passed
  return {
    success: true,
    message:
      "Schema and consistency validation passed: Response structure and temporal consistency verified",
  };
}

// Run the consolidated test suite using the centralized setup
createTestSuite({
  description: "schema and consistency validation",
  testFunction: runSchemaAndConsistencyValidation,
});

// Export individual test functions for potential use in other contexts
export {
  runSchemaAndConsistencyValidation as runSchemaAndConsistencyValidationTest,
  testSchemaValidation,
  testDataStructureConsistency,
};
