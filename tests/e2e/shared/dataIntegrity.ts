/**
 * @fileoverview Data Integrity Utilities
 *
 * Shared utilities for comparing data integrity between zodFetch and native fetch
 * results. These functions were previously duplicated across test files.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchNativeNew, fetchNativeZod } from "@/shared/fetching";

/**
 * Fields that should be ignored during data integrity comparison
 * These are known to be present in native fetch but not in Zod schemas
 */
const IGNORED_FIELDS = new Set([
  "VesselWatchShutID",
  "VesselWatchShutMsg",
  "VesselWatchShutFlag",
  "VesselWatchStatus",
  "VesselWatchMsg",
]);

/**
 * Deep equality comparison with proper type handling
 * Arrays are compared as sets (order-independent)
 */
export const deepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return a === b;

  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    // Compare arrays as sets - each item in a must have a match in b
    return a.every((itemA) => b.some((itemB) => deepEqual(itemA, itemB)));
  }

  if (Array.isArray(a) || Array.isArray(b)) return false;

  if (typeof a === "object") {
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;

    // Filter out ignored fields for comparison
    const keysA = Object.keys(objA).filter((key) => !IGNORED_FIELDS.has(key));
    const keysB = Object.keys(objB).filter((key) => !IGNORED_FIELDS.has(key));

    return (
      keysA.length === keysB.length &&
      keysA.every(
        (key) => Object.hasOwn(objB, key) && deepEqual(objA[key], objB[key])
      )
    );
  }

  return false;
};

/**
 * Finds the first difference between two objects for detailed error reporting
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

    // Compare arrays as sets - find items that don't have matches
    for (let i = 0; i < zodResult.length; i++) {
      const zodItem = zodResult[i];
      const hasMatch = nativeResult.some((nativeItem) =>
        deepEqual(zodItem, nativeItem)
      );

      if (!hasMatch) {
        return `${path}[${i}]: item not found in native result`;
      }
    }

    // Also check the reverse - native items that don't have matches in zod
    for (let i = 0; i < nativeResult.length; i++) {
      const nativeItem = nativeResult[i];
      const hasMatch = zodResult.some((zodItem) =>
        deepEqual(zodItem, nativeItem)
      );

      if (!hasMatch) {
        return `${path}[${i}]: item not found in zod result`;
      }
    }

    return null;
  }

  // Handle type mismatch
  if (Array.isArray(zodResult) || Array.isArray(nativeResult)) {
    return `${path}: type mismatch - zod is ${Array.isArray(zodResult) ? "array" : "object"}, native is ${Array.isArray(nativeResult) ? "array" : "object"}`;
  }

  // Handle objects
  if (
    zodResult &&
    nativeResult &&
    typeof zodResult === "object" &&
    typeof nativeResult === "object"
  ) {
    const zodObj = zodResult as Record<string, unknown>;
    const nativeObj = nativeResult as Record<string, unknown>;

    // Filter out ignored fields for comparison
    const zodKeys = Object.keys(zodObj).filter(
      (key) => !IGNORED_FIELDS.has(key)
    );
    const nativeKeys = Object.keys(nativeObj).filter(
      (key) => !IGNORED_FIELDS.has(key)
    );

    // Check for missing keys (excluding ignored fields)
    const missingInNative = zodKeys.filter((key) => !(key in nativeObj));
    const missingInZod = nativeKeys.filter((key) => !(key in zodObj));

    if (missingInNative.length > 0) {
      return `${path}: missing in native - ${missingInNative.join(", ")}`;
    }
    if (missingInZod.length > 0) {
      return `${path}: missing in zod - ${missingInZod.join(", ")}`;
    }

    // Check common keys
    for (const key of zodKeys) {
      const currentPath = path ? `${path}.${key}` : key;
      const difference = findFirstDifference(
        zodObj[key],
        nativeObj[key],
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
        fetchNativeZod(endpoint, params, { logMode: "none" }),
        fetchNativeNew(endpoint, params, { logMode: "none" }),
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
