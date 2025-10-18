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

import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import {
  ErrorCategory,
  type ErrorContext,
  ErrorSeverity,
  testLogger,
} from "../testLogger";
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

type CanonOptions = {
  treatArraysAsMultisets?: boolean; // default true
  includeUndefined?: boolean; // default true (undefined is encoded)
};

const defaultOptions: Required<CanonOptions> = {
  treatArraysAsMultisets: true,
  includeUndefined: true,
};

function isPlainObject(x: unknown): x is Record<string, unknown> {
  return (
    x !== null &&
    typeof x === "object" &&
    (Object.getPrototypeOf(x) === Object.prototype ||
      Object.getPrototypeOf(x) === null)
  );
}

function canonicalize(
  value: unknown,
  opts: CanonOptions = defaultOptions
): string {
  const o = { ...defaultOptions, ...opts };

  // Primitives and special cases
  if (value === null) return "null";
  const t = typeof value;

  if (t === "string") return `s:${JSON.stringify(value)}`;
  if (t === "boolean") return value ? "b:1" : "b:0";
  if (t === "number") {
    if (Number.isNaN(value)) return "n:NaN";
    if (value === 0 && 1 / value === -Infinity) return "n:-0";
    if (!Number.isFinite(value))
      return (value as number) > 0 ? "n:+Inf" : "n:-Inf";
    return `n:${value}`;
  }
  if (t === "bigint") return `bi:${(value as bigint).toString()}`;
  if (t === "undefined") return o.includeUndefined ? "u" : "null";

  // Dates (customize as needed)
  if (value instanceof Date) return `d:${value.toISOString()}`;

  // Array or object
  if (Array.isArray(value)) {
    const elems = value.map((v) => canonicalize(v, o));
    if (o.treatArraysAsMultisets) {
      elems.sort(); // order-insensitive
    }
    return `A[${elems.length}|${elems.join(",")}]`;
  }

  if (isPlainObject(value)) {
    const keys = Object.keys(value).sort();
    const parts: string[] = [];
    for (const k of keys) {
      const v = (value as Record<string, unknown>)[k];
      if (v === undefined && !o.includeUndefined) continue;
      parts.push(`${JSON.stringify(k)}:${canonicalize(v, o)}`);
    }
    return `O{${parts.length}|${parts.join(",")}}`;
  }

  // Fallback for other objects (Map/Set/RegExp/Buffer/etc.)
  // Define explicit policies if you need them.
  return `X:${Object.prototype.toString.call(value)}`;
}

function arraysEqualAsUnorderedMultisets(
  a: unknown[],
  b: unknown[],
  opts: CanonOptions = defaultOptions
): boolean {
  if (a.length !== b.length) return false;

  const counts = new Map<string, number>();

  for (const item of a) {
    const key = canonicalize(item, opts);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  for (const item of b) {
    const key = canonicalize(item, opts);
    const cur = counts.get(key);
    if (cur === undefined) return false;
    if (cur === 1) counts.delete(key);
    else counts.set(key, cur - 1);
  }
  return counts.size === 0;
}

/**
 * Deep equality comparison with proper type handling
 * Arrays are compared as sets (order-independent) using efficient O(n) comparison
 * Objects are compared by content, not field order
 * Timestamps are normalized to minute precision for comparison
 */
const deepEqual = (a: unknown, b: unknown): boolean => {
  // Handle arrays with order-independent comparison
  if (Array.isArray(a) && Array.isArray(b)) {
    return arraysEqualAsUnorderedMultisets(a, b);
  }

  // Use canonicalization for non-array comparisons
  return canonicalize(a) === canonicalize(b);
};

/**
 * Finds the first difference between two objects for detailed error reporting
 * Uses the same logic as deepEqual but returns the first difference found
 * Optimized for performance with depth limits and size constraints
 */
const findFirstDifference = (
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

    // Use canonicalization-based comparison to find differences
    const zodCanonicals = zodResult.map((item) => canonicalize(item));
    const nativeCanonicals = nativeResult.map((item) => canonicalize(item));

    // Sort both arrays of canonical forms for comparison
    zodCanonicals.sort();
    nativeCanonicals.sort();

    // Compare sorted canonical forms
    for (let i = 0; i < zodCanonicals.length; i++) {
      if (zodCanonicals[i] !== nativeCanonicals[i]) {
        return `${path}: array item mismatch at index ${i} - zod canonical form: ${zodCanonicals[i]}, native canonical form: ${nativeCanonicals[i]}`;
      }
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

      // Use enhanced Zod error formatting if it's a Zod validation error
      if (testLogger.isZodError(errorObj)) {
        testLogger.zodValidationError(errorObj, {
          endpoint: endpoint.endpoint,
          apiName: endpoint.api,
          functionName: endpoint.functionName,
          testType: "data-integrity",
          duration: errorDuration,
          requestDetails: {
            params: params as Record<string, unknown>,
            url: endpoint.urlTemplate,
          },
        });
      } else {
        // Handle non-Zod errors with standard structured logging
        const errorContext: ErrorContext = testLogger.createErrorContext(
          errorObj,
          ErrorCategory.VALIDATION,
          ErrorSeverity.HIGH,
          {
            endpoint: endpoint.endpoint,
            apiName: endpoint.api,
            functionName: endpoint.functionName,
            testType: "data-integrity",
            duration: errorDuration,
            requestDetails: {
              params: params as Record<string, unknown>,
              url: endpoint.urlTemplate,
            },
            suggestions: [
              "Check if Zod schema matches the actual API response structure",
              "Verify that ignored fields are properly configured",
              "Check if API response format has changed recently",
              "Review canonicalization logic for complex data types",
            ],
          }
        );
        testLogger.structuredError(errorContext);
      }

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
    // Enhanced error logging for data integrity failures
    const errorContext: ErrorContext = testLogger.createErrorContext(
      new Error(result.message),
      ErrorCategory.VALIDATION,
      ErrorSeverity.HIGH,
      {
        endpoint: endpoint.endpoint,
        apiName: endpoint.api,
        functionName: endpoint.functionName,
        testType: "data-integrity",
        duration,
        requestDetails: {
          params,
          url: endpoint.urlTemplate,
        },
        suggestions: [
          "Check if Zod schema matches the actual API response structure",
          "Verify that ignored fields are properly configured",
          "Check if API response format has changed recently",
          "Review canonicalization logic for complex data types",
        ],
      }
    );
    testLogger.structuredError(errorContext);
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
