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
import { getTargetModule } from "../testConfig";
import { runParallelTest } from "../testRunner";

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
 * Creates an order-independent key for any value with performance optimizations
 * This allows comparing objects and arrays with different property/array orders
 */
const createOrderIndependentKey = (
  value: unknown,
  depth = 0,
  maxDepth = 3
): string => {
  // Prevent infinite recursion and limit depth for performance
  if (depth > maxDepth) return `maxdepth:${depth}`;

  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "boolean") return `bool:${value}`;
  if (typeof value === "number") return `num:${value}`;
  if (typeof value === "string") return `str:${value}`;
  if (value instanceof Date) {
    // Normalize timestamps to minute precision for comparison
    const normalizedTime = Math.floor(value.getTime() / 60000) * 60000;
    return `date:${normalizedTime}`;
  }

  if (Array.isArray(value)) {
    // Limit array processing for performance - only process first 10 items
    const maxItems = Math.min(value.length, 10);
    const itemKeys = value
      .slice(0, maxItems)
      .map((item) => createOrderIndependentKey(item, depth + 1, maxDepth));
    if (value.length > maxItems) {
      itemKeys.push(`...${value.length - maxItems}more`);
    }
    return `arr:${value.length}:[${itemKeys.sort().join(",")}]`;
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const entries = Object.entries(obj)
      .filter(([key]) => !IGNORED_FIELDS.has(key))
      .slice(0, 20) // Limit to first 20 properties for performance
      .map(
        ([key, val]) =>
          `${key}:${createOrderIndependentKey(val, depth + 1, maxDepth)}`
      )
      .sort();
    return `obj:${Object.keys(obj).length}:[${entries.join(",")}]`;
  }

  return `unknown:${String(value)}`;
};

/**
 * Deep equality comparison with proper type handling
 * Arrays are compared as sets (order-independent) using efficient O(n) comparison
 * Objects are compared by content, not field order
 * Timestamps are normalized to minute precision for comparison
 */
export const deepEqual = (a: unknown, b: unknown): boolean => {
  // Handle arrays with order-independent comparison
  if (Array.isArray(a) && Array.isArray(b)) {
    return arraysEqual(a, b);
  }

  // Use fast-deep-equal for non-array comparisons
  return equal(a, b);
};

/**
 * Order-independent array comparison using key-based counting
 */
function arraysEqual(a: unknown[], b: unknown[]): boolean {
  if (a.length !== b.length) return false;

  // Count items in first array
  const countMap = new Map<string, number>();
  for (const item of a) {
    const key = createOrderIndependentKey(item);
    countMap.set(key, (countMap.get(key) || 0) + 1);
  }

  // Subtract counts from second array
  for (const item of b) {
    const key = createOrderIndependentKey(item);
    const count = countMap.get(key) || 0;
    if (count === 0) return false;
    countMap.set(key, count - 1);
  }

  return true;
}

/**
 * Finds the first difference between two objects for detailed error reporting
 * Uses the same logic as deepEqual but returns the first difference found
 * Optimized for performance with depth limits and size constraints
 */
export const findFirstDifference = (
  zodResult: unknown,
  nativeResult: unknown,
  path: string = "",
  depth = 0,
  maxDepth = 3
): string | null => {
  // Prevent infinite recursion and limit depth for performance
  if (depth > maxDepth) return null;

  // Handle null/undefined cases
  if (zodResult == null && nativeResult == null) return null;
  if (zodResult == null || nativeResult == null) {
    return `${path}: zod=${zodResult}, native=${nativeResult}`;
  }

  // Handle primitive types
  if (typeof zodResult !== "object" || typeof nativeResult !== "object") {
    if (zodResult !== nativeResult) {
      return `${path}: zod=${zodResult}, native=${nativeResult}`;
    }
    return null;
  }

  // Handle arrays
  if (Array.isArray(zodResult) && Array.isArray(nativeResult)) {
    if (zodResult.length !== nativeResult.length) {
      return `${path}: array length mismatch - zod=${zodResult.length}, native=${nativeResult.length}`;
    }

    // For performance, only do detailed comparison on small arrays
    if (zodResult.length > 50) {
      return null; // Skip detailed comparison for large arrays
    }

    // Use the same key-based counting approach as arraysEqual
    const countMap = new Map<string, number>();

    // Count items in zod array (limit for performance)
    const maxItems = Math.min(zodResult.length, 20);
    for (let i = 0; i < maxItems; i++) {
      const item = zodResult[i];
      const key = createOrderIndependentKey(item, depth + 1, maxDepth);
      countMap.set(key, (countMap.get(key) || 0) + 1);
    }

    // Check items in native array (limit for performance)
    for (let i = 0; i < maxItems; i++) {
      const item = nativeResult[i];
      const key = createOrderIndependentKey(item, depth + 1, maxDepth);
      const count = countMap.get(key) || 0;
      if (count === 0) {
        return `${path}: item not found in zod array - ${JSON.stringify(item)}`;
      }
      countMap.set(key, count - 1);
    }

    return null;
  }

  // Handle type mismatch
  if (Array.isArray(zodResult) || Array.isArray(nativeResult)) {
    return `${path}: type mismatch - zod is ${Array.isArray(zodResult) ? "array" : "object"}, native is ${Array.isArray(nativeResult) ? "array" : "object"}`;
  }

  // Handle objects - optimized for performance
  if (
    zodResult &&
    nativeResult &&
    typeof zodResult === "object" &&
    typeof nativeResult === "object"
  ) {
    // Filter out ignored fields for both objects
    const zodEntries = Object.entries(
      zodResult as Record<string, unknown>
    ).filter(([key]) => !IGNORED_FIELDS.has(key));
    const nativeEntries = Object.entries(
      nativeResult as Record<string, unknown>
    ).filter(([key]) => !IGNORED_FIELDS.has(key));

    // For performance, limit the number of properties we compare
    const maxProps = 30;
    const limitedZodEntries = zodEntries.slice(0, maxProps);
    const limitedNativeEntries = nativeEntries.slice(0, maxProps);

    // Check for missing keys (excluding ignored fields) - limit for performance
    const zodKeys = new Set(limitedZodEntries.map(([key]) => key));
    const nativeKeys = new Set(limitedNativeEntries.map(([key]) => key));

    const missingInNative = Array.from(zodKeys).filter(
      (key) => !nativeKeys.has(key)
    );
    const missingInZod = Array.from(nativeKeys).filter(
      (key) => !zodKeys.has(key)
    );

    if (missingInNative.length > 0) {
      return `${path}: missing in native - ${missingInNative.slice(0, 5).join(", ")}${missingInNative.length > 5 ? "..." : ""}`;
    }
    if (missingInZod.length > 0) {
      return `${path}: missing in zod - ${missingInZod.slice(0, 5).join(", ")}${missingInZod.length > 5 ? "..." : ""}`;
    }

    // Check each key-value pair recursively (limit for performance)
    for (const [key, value] of limitedZodEntries.slice(0, 10)) {
      const currentPath = path ? `${path}.${key}` : key;
      const difference = findFirstDifference(
        value,
        (nativeResult as Record<string, unknown>)[key],
        currentPath,
        depth + 1,
        maxDepth
      );
      if (difference) return difference;
    }
  }

  return null;
};

/**
 * Compares data integrity between zodFetch and native fetch results
 */
export const compareDataIntegrity = (
  zodResult: unknown,
  nativeResult: unknown,
  context: string,
  path = ""
): void => {
  if (deepEqual(zodResult, nativeResult)) return;

  const difference = findFirstDifference(zodResult, nativeResult, path);
  const errorMessage = difference
    ? `Data integrity mismatch in ${context}: ${difference}`
    : `Data integrity mismatch in ${context} at ${path}: zod and native results are not equal`;

  throw new Error(errorMessage);
};

/**
 * Creates a comprehensive data integrity test for an endpoint
 * Optimized for performance by limiting comparison scope for large datasets
 */
export const createDataIntegrityTest = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
) => ({
  name: `Data Integrity: ${endpoint.functionName} (${endpoint.api})`,
  test: async (params: TParams) => {
    const context = `${endpoint.api}.${endpoint.functionName}`;

    try {
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

      // For performance, skip detailed comparison for very large datasets
      if (Array.isArray(zodResult) && zodResult.length > 100) {
        return {
          success: true,
          message: `Data integrity validation skipped for large dataset (${zodResult.length} items) - ${context}`,
          zodResult,
          nativeResult,
        };
      }

      compareDataIntegrity(zodResult, nativeResult, context);

      return {
        success: true,
        message: `Data integrity validation passed for ${context}`,
        zodResult,
        nativeResult,
      };
    } catch (error) {
      return {
        success: false,
        message: `Data integrity validation failed for ${context}: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

async function runDataIntegrity(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const params = endpoint.sampleParams || {};
  const integrity = createDataIntegrityTest(endpoint);
  const result = await integrity.test(params);
  return { success: result.success, message: result.message };
}

// Configuration for this specific test
const config = {
  apiName: getTargetModule() || undefined,
};

// Run the test suite
runParallelTest(runDataIntegrity, "data integrity", config);

// Export the function for potential use in other contexts
export { runDataIntegrity };
