/**
 * @fileoverview Data Integrity Test Utilities
 *
 * Utility functions for testing data integrity between zodFetch and native fetch.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchNative, fetchZod } from "@/shared/fetching";

/**
 * Deep equality comparison with proper type handling
 * Arrays are compared as sets (order-independent)
 */
const deepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return a === b;

  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    // Compare arrays as sets (order-independent)
    if (a.length !== b.length) return false;

    // For arrays of primitives, use Set comparison
    if (
      a.every((item) => typeof item !== "object" || item === null) &&
      b.every((item) => typeof item !== "object" || item === null)
    ) {
      const setA = new Set(a);
      const setB = new Set(b);
      return (
        setA.size === setB.size && [...setA].every((item) => setB.has(item))
      );
    }

    // For arrays of objects, we need to do a more complex set comparison
    // We need to recursively compare each object, treating nested arrays as sets
    if (a.length === 0) return true;

    // Try to find a matching element in b for each element in a
    const usedIndices = new Set<number>();
    for (const itemA of a) {
      let found = false;
      for (let i = 0; i < b.length; i++) {
        if (usedIndices.has(i)) continue;
        if (deepEqual(itemA, b[i])) {
          usedIndices.add(i);
          found = true;
          break;
        }
      }
      if (!found) return false;
    }
    return true;
  }

  if (Array.isArray(a) || Array.isArray(b)) return false;

  if (typeof a === "object") {
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

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
const findFirstDifference = (
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

  // Handle arrays (compare as sets)
  if (Array.isArray(zodResult) && Array.isArray(nativeResult)) {
    if (zodResult.length !== nativeResult.length) {
      return `${path}: array length mismatch - zod=${zodResult.length}, native=${nativeResult.length}`;
    }

    // For arrays of primitives, use Set comparison
    if (
      zodResult.every((item) => typeof item !== "object" || item === null) &&
      nativeResult.every((item) => typeof item !== "object" || item === null)
    ) {
      const setZod = new Set(zodResult);
      const setNative = new Set(nativeResult);
      if (setZod.size !== setNative.size) {
        return `${path}: array set size mismatch - zod=${setZod.size}, native=${setNative.size}`;
      }
      const missingInNative = [...setZod].filter(
        (item) => !setNative.has(item)
      );
      const missingInZod = [...setNative].filter((item) => !setZod.has(item));
      if (missingInNative.length > 0) {
        return `${path}: missing in native - ${missingInNative.join(", ")}`;
      }
      if (missingInZod.length > 0) {
        return `${path}: missing in zod - ${missingInZod.join(", ")}`;
      }
      return null;
    }

    // For arrays of objects, compare as sets using recursive deep equality
    if (zodResult.length === 0) return null;

    // Find elements that don't have matches
    const usedNativeIndices = new Set<number>();
    const unmatchedZod: unknown[] = [];

    for (const zodItem of zodResult) {
      let found = false;
      for (let i = 0; i < nativeResult.length; i++) {
        if (usedNativeIndices.has(i)) continue;
        if (deepEqual(zodItem, nativeResult[i])) {
          usedNativeIndices.add(i);
          found = true;
          break;
        }
      }
      if (!found) {
        unmatchedZod.push(zodItem);
      }
    }

    const unmatchedNative: unknown[] = [];
    for (let i = 0; i < nativeResult.length; i++) {
      if (!usedNativeIndices.has(i)) {
        unmatchedNative.push(nativeResult[i]);
      }
    }

    if (unmatchedZod.length > 0) {
      const sample = unmatchedZod
        .slice(0, 2)
        .map((item) =>
          typeof item === "object" && item !== null
            ? `{${Object.keys(item as Record<string, unknown>)
                .slice(0, 3)
                .join(",")}...}`
            : String(item)
        )
        .join(", ");
      return `${path}: missing in native - ${sample}${unmatchedZod.length > 2 ? "..." : ""}`;
    }
    if (unmatchedNative.length > 0) {
      const sample = unmatchedNative
        .slice(0, 2)
        .map((item) =>
          typeof item === "object" && item !== null
            ? `{${Object.keys(item as Record<string, unknown>)
                .slice(0, 3)
                .join(",")}...}`
            : String(item)
        )
        .join(", ");
      return `${path}: missing in zod - ${sample}${unmatchedNative.length > 2 ? "..." : ""}`;
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
    const zodKeys = Object.keys(zodObj);
    const nativeKeys = Object.keys(nativeObj);

    // Check for missing keys
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
const compareDataIntegrity = (
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
        fetchZod(endpoint, params, "none"),
        fetchNative(endpoint, params, "none"),
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
