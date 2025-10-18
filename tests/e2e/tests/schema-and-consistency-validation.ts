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
  try {
    const params = endpoint.sampleParams || {};
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
        message: "Schema validation failed: Result is undefined or null",
      };
    }

    return {
      success: true,
      message: "Schema validation passed: Response matches Zod schema",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    testLogger.error(
      `Schema validation failed for ${endpoint.api}.${endpoint.functionName}: ${errorMessage}`
    );

    return {
      success: false,
      message: `Schema validation failed: ${errorMessage}`,
    };
  }
}

/**
 * Tests data structure consistency across multiple calls
 */
async function testDataStructureConsistency(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  try {
    const params = endpoint.sampleParams || {};

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
      return {
        success: true,
        message: `Data structure consistency skipped for large dataset (${r1.length} items) - ${endpoint.functionName}`,
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
      return {
        success: false,
        message: "Type consistency failed: Type mismatch between calls",
      };
    }

    if (Array.isArray(r1) && Array.isArray(r2)) {
      const diff = Math.abs(r1.length - r2.length);
      if (diff > 10) {
        return {
          success: false,
          message: `Array length consistency failed: Variance too high (${diff} items)`,
        };
      }
    }

    return {
      success: true,
      message:
        "Data structure consistency validated: Types and sizes consistent across calls",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    testLogger.error(
      `Data structure consistency test failed for ${endpoint.api}.${endpoint.functionName}: ${errorMessage}`
    );

    return {
      success: false,
      message: `Data structure consistency test failed: ${errorMessage}`,
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
