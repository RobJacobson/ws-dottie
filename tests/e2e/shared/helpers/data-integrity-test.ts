import equal from "fast-deep-equal";
import { expect, it } from "vitest";
import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";

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
 * For arrays, compares as sets (order-independent) without O(N^2) complexity
 */
function normalizeForComparison(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    // For arrays, recursively normalize each element, then create a JSON representation
    // for consistent comparison regardless of order
    const normalizedArray = obj.map(normalizeForComparison);
    // Convert to JSON strings and sort them for consistent ordering
    const jsonElements = normalizedArray.map((item) => JSON.stringify(item));
    jsonElements.sort(); // Sort the JSON strings
    // Return a special marker object that will be handled in the comparison
    return { __array_as_set: jsonElements };
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
  const normalizedA = normalizeForComparison(a);
  const normalizedB = normalizeForComparison(b);

  // Handle special case for array-as-set comparison
  if (
    typeof normalizedA === "object" &&
    normalizedA !== null &&
    "__array_as_set" in normalizedA &&
    typeof normalizedB === "object" &&
    normalizedB !== null &&
    "__array_as_set" in normalizedB
  ) {
    const arrayA = (normalizedA as { __array_as_set: string[] }).__array_as_set;
    const arrayB = (normalizedB as { __array_as_set: string[] }).__array_as_set;

    // Compare arrays as sets by checking if they have the same elements
    if (arrayA.length !== arrayB.length) {
      return false;
    }

    // Since they're already sorted, we can do a direct comparison
    for (let i = 0; i < arrayA.length; i++) {
      if (arrayA[i] !== arrayB[i]) {
        return false;
      }
    }
    return true;
  }

  return equal(normalizedA, normalizedB);
};

/**
 * Creates a test that fetches the same data both with and without validation from an endpoint
 */
export const createDataIntegrityTest = (
  endpoint: Endpoint<unknown, unknown>
) => {
  it(`It should fetch the same data both with and without validation from ${endpoint.api.name}.${endpoint.functionName}`, async () => {
    // Execute both fetches simultaneously to ensure consistent data
    const [validatedResult, unvalidatedResult] = await Promise.all([
      fetchDottie({
        endpoint,
        params: endpoint.sampleParams || {},
        fetchMode: "native",
        logMode: "none",
        validate: true,
      }),
      fetchDottie({
        endpoint,
        params: endpoint.sampleParams || {},
        fetchMode: "native",
        logMode: "none",
        validate: false,
      }),
    ]);

    expect(validatedResult).toBeDefined();
    expect(unvalidatedResult).toBeDefined();

    // Compare that both results are deeply equal using normalized comparison
    expect(deepEqual(validatedResult, unvalidatedResult)).toBe(true);
  });
};
