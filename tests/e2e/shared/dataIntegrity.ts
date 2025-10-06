/**
 * @fileoverview Data Integrity Utilities
 *
 * Shared utilities for comparing data integrity between zodFetch and native fetch
 * results. These functions were previously duplicated across test files.
 */

import equal from "fast-deep-equal";
import type { Endpoint } from "@/shared/endpoints";
import { fetchDottie } from "@/shared/fetching";

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
 * Creates an order-independent key for any value
 * This allows comparing objects and arrays with different property/array orders
 */
const createOrderIndependentKey = (value: unknown): string => {
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
    const itemKeys = value.map(createOrderIndependentKey).sort();
    return `arr:[${itemKeys.join(",")}]`;
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const entries = Object.entries(obj)
      .filter(([key]) => !IGNORED_FIELDS.has(key))
      .map(([key, val]) => `${key}:${createOrderIndependentKey(val)}`)
      .sort();
    return `obj:{${entries.join(",")}}`;
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
 */
export const findFirstDifference = (
  zodResult: unknown,
  nativeResult: unknown,
  path: string = ""
): string | null => {
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

    // Use the same key-based counting approach as arraysEqual
    const countMap = new Map<string, number>();

    // Count items in zod array
    for (const item of zodResult) {
      const key = createOrderIndependentKey(item);
      countMap.set(key, (countMap.get(key) || 0) + 1);
    }

    // Check items in native array
    for (const item of nativeResult) {
      const key = createOrderIndependentKey(item);
      const count = countMap.get(key) || 0;
      if (count === 0) {
        return `${path}: item not found in zod array - ${JSON.stringify(item)}`;
      }
      countMap.set(key, count - 1);
    }

    // Check for remaining items in zod array
    for (const [key, count] of countMap) {
      if (count > 0) {
        return `${path}: item not found in native array - key: ${key}`;
      }
    }

    return null;
  }

  // Handle type mismatch
  if (Array.isArray(zodResult) || Array.isArray(nativeResult)) {
    return `${path}: type mismatch - zod is ${Array.isArray(zodResult) ? "array" : "object"}, native is ${Array.isArray(nativeResult) ? "array" : "object"}`;
  }

  // Handle objects - use fast-deep-equal for detailed comparison
  if (
    zodResult &&
    nativeResult &&
    typeof zodResult === "object" &&
    typeof nativeResult === "object"
  ) {
    // Filter out ignored fields for both objects
    const filteredZod = Object.fromEntries(
      Object.entries(zodResult as Record<string, unknown>).filter(
        ([key]) => !IGNORED_FIELDS.has(key)
      )
    );
    const filteredNative = Object.fromEntries(
      Object.entries(nativeResult as Record<string, unknown>).filter(
        ([key]) => !IGNORED_FIELDS.has(key)
      )
    );

    // Check for missing keys (excluding ignored fields)
    const missingInNative = Object.keys(filteredZod).filter(
      (key) => !(key in filteredNative)
    );
    const missingInZod = Object.keys(filteredNative).filter(
      (key) => !(key in filteredZod)
    );

    if (missingInNative.length > 0) {
      return `${path}: missing in native - ${missingInNative.join(", ")}`;
    }
    if (missingInZod.length > 0) {
      return `${path}: missing in zod - ${missingInZod.join(", ")}`;
    }

    // Check each key-value pair recursively
    for (const [key, value] of Object.entries(filteredZod)) {
      const currentPath = path ? `${path}.${key}` : key;
      const difference = findFirstDifference(
        value,
        filteredNative[key],
        currentPath
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
