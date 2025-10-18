/**
 * @fileoverview Data Integrity Test - Fetch Mode Consistency
 *
 * Tests data integrity between Zod schema validation and native fetch results.
 * This test specifically validates that both fetch modes return identical data,
 * ensuring consistency between validated and unvalidated API responses.
 *
 * Distinguished from schema-and-consistency-validation.ts which tests
 * temporal consistency across multiple API calls.
 *
 * This file is self-contained with all necessary utilities inlined.
 * Can run independently with parallel execution across all endpoints.
 */

import equal from "fast-deep-equal";
import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import { testLogger } from "../testLogger";
import { createTestSuite } from "../testSetup";

/**
 * Fields that should be ignored during data integrity comparison
 * These are known to be present in native fetch but not in Zod schemas,
 * or fields that are expected to change between API calls (like timestamps)
 */
const IGNORED_FIELDS = new Set([
  "VesselWatchShutID",
  "VesselWatchShutMsg",
  "VesselWatchShutFlag",
  "VesselWatchStatus",
  "VesselWatchMsg",
  "TimeUpdated", // Timestamps change between API calls
]);

/**
 * Recursively normalizes data for order-invariant comparison
 * Sorts arrays to enable set-like comparison while preserving other structures
 */
function normalizeForComparison(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    // Sort array elements for order-invariant comparison
    return obj.map(normalizeForComparison).sort();
  } else if (
    obj !== null &&
    typeof obj === "object" &&
    !(obj instanceof Date)
  ) {
    // Recursively normalize object properties, excluding ignored fields
    const result: Record<string, unknown> = {};
    const entries = Object.entries(obj)
      .filter(([key]) => !IGNORED_FIELDS.has(key))
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)); // Sort keys for consistent comparison

    for (const [key, value] of entries) {
      result[key] = normalizeForComparison(value);
    }
    return result;
  }
  return obj;
}

/**
 * Deep equality comparison with order-invariant array comparison
 * Arrays are compared as sets (order-independent)
 * Objects are compared by content, ignoring specified fields
 */
const deepEqual = (a: unknown, b: unknown): boolean => {
  return equal(normalizeForComparison(a), normalizeForComparison(b));
};

/**
 * Compares data integrity between zodFetch and native fetch results
 */
const compareDataIntegrity = (
  zodResult: unknown,
  nativeResult: unknown,
  context: string
): void => {
  if (deepEqual(zodResult, nativeResult)) return;

  throw new Error(
    `Data integrity mismatch in ${context}: zod and native results are not equal`
  );
};

/**
 * Creates a comprehensive data integrity test for an endpoint
 * Optimized for performance by limiting comparison scope for large datasets
 */
const createDataIntegrityTest = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
) => ({
  name: `Data Integrity: ${endpoint.functionName} (${endpoint.api})`,
  test: async (params: TParams, startTime?: number) => {
    const context = `${endpoint.api}.${endpoint.functionName}`;

    try {
      // Execute both fetches simultaneously to ensure consistent data
      const [zodResult, nativeResult] = await Promise.all([
        fetchDottie({
          endpoint,
          params,
          fetchMode: "native",
          logMode: "none",
          validate: true,
        }),
        fetchDottie({
          endpoint,
          params,
          fetchMode: "native",
          logMode: "none",
          validate: false,
        }),
      ]);

      compareDataIntegrity(zodResult, nativeResult, context);

      return {
        success: true,
        message: `Data integrity validation passed for ${context}`,
        zodResult,
        nativeResult,
      };
    } catch (error) {
      const errorDuration = Date.now() - (startTime || Date.now());
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      const errorObj = error instanceof Error ? error : new Error(errorMessage);

      testLogger.error(
        `Data integrity validation failed for ${context}: ${errorMessage}`
      );

      return {
        success: false,
        message: `Data integrity validation failed for ${context}: ${errorMessage}`,
      };
    }
  },
});

async function runDataIntegrity(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const startTime = Date.now();
  const params = endpoint.sampleParams || {};

  testLogger.testStep(
    `Running data integrity test for ${endpoint.api}.${endpoint.functionName}`
  );
  testLogger.apiRequest(endpoint, params);

  const integrity = createDataIntegrityTest(endpoint);
  const result = await integrity.test(params, startTime);

  const duration = Date.now() - startTime;

  if (!result.success) {
    const context = `${endpoint.api}.${endpoint.functionName}`;
    testLogger.error(
      `Data integrity validation failed for ${context}: ${result.message}`
    );
  } else {
    testLogger.performance(
      `Data integrity test for ${endpoint.api}.${endpoint.functionName}`,
      duration
    );
  }

  return { success: result.success, message: result.message };
}

// Run the test suite using the centralized setup
createTestSuite({
  description: "data integrity",
  testFunction: runDataIntegrity,
});
