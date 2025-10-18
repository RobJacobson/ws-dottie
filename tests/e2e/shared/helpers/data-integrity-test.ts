import equal from "fast-deep-equal";
import { expect, it } from "vitest";
import { fetchDottie } from "../../../../src/shared/fetching";
import type { Endpoint } from "../../../../src/shared/types";

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
const deepEqual = (a: unknown, b: unknown): boolean =>
  equal(normalizeForComparison(a), normalizeForComparison(b));

/**
 * Creates a test that fetches the same data both with and without validation from an endpoint
 */
export const createDataIntegrityTest = (
  endpoint: Endpoint<unknown, unknown>
) => {
  it(`It should fetch the same data both with and without validation from ${endpoint.api}.${endpoint.functionName}`, async () => {
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
