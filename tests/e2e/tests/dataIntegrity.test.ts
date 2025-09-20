/**
 * @fileoverview Data Integrity E2E Tests
 *
 * Tests data integrity between zodFetch and native fetch to ensure our code correctly
 * passes through API data without corruption. This is the core value of our E2E tests
 * for external APIs we don't control.
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  discoverEndpoints,
  getAllEndpoints,
  type Endpoints,
  type EndpointsByApi,
} from "@/shared/endpoints";
import { testLogger } from "../testLogger";
import { fetchZod } from "@/shared/fetching";
import {
  getTargetModule,
  shouldTestSpecificModule,
  getTestEndpointCount,
  PARALLEL_TEST_TIMEOUT,
} from "../testConfig";

// ============================================================================
// DATA INTEGRITY HELPER FUNCTIONS
// ============================================================================

import type { Endpoint } from "@/shared/endpoints";
import { fetchNative } from "@/shared/fetching";

/**
 * Deep equality comparison with proper type handling
 */
const deepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return a === b;

  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((item, i) => deepEqual(item, b[i]));
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

  // Handle arrays
  if (Array.isArray(zodResult) && Array.isArray(nativeResult)) {
    if (zodResult.length !== nativeResult.length) {
      return `${path}: array length mismatch - zod=${zodResult.length}, native=${nativeResult.length}`;
    }

    for (let i = 0; i < zodResult.length; i++) {
      const difference = findFirstDifference(
        zodResult[i],
        nativeResult[i],
        `${path}[${i}]`
      );
      if (difference) return difference;
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
const createDataIntegrityTest = <TParams, TOutput>(
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

// ============================================================================
// DATA INTEGRITY TEST SUITE
// ============================================================================

describe("Data Integrity E2E Tests", () => {
  let discoveredEndpoints: EndpointsByApi;
  let allEndpoints: Endpoints;
  let filteredEndpoints: Endpoints;
  let targetModule: string | null;

  beforeAll(async () => {
    // Discover all endpoints (filtered by configuration)
    discoveredEndpoints = await discoverEndpoints();
    allEndpoints = await getAllEndpoints();

    // Check for module filtering via environment variable
    targetModule = getTargetModule();

    if (shouldTestSpecificModule() && targetModule !== "all" && targetModule) {
      // Filter to specific module
      filteredEndpoints = discoveredEndpoints[targetModule] || [];
      testLogger.info(
        `Testing data integrity for specific module: ${targetModule} (${filteredEndpoints.length} endpoints)`
      );
    } else {
      // Test all endpoints
      filteredEndpoints = allEndpoints;
      testLogger.info(
        `Testing data integrity for all modules: ${Object.keys(discoveredEndpoints).length} APIs, ${allEndpoints.length} endpoints`
      );
    }
  });

  afterAll(() => {
    testLogger.suiteEnd("Data Integrity E2E Tests completed");
  });

  // ============================================================================
  // DATA INTEGRITY TESTS
  // ============================================================================

  describe("Data Integrity Tests", () => {
    it(
      "should maintain data integrity between zodFetch and native fetch",
      async () => {
        // Test a subset of endpoints to demonstrate parallel execution
        const testEndpoints = filteredEndpoints.slice(
          0,
          getTestEndpointCount()
        );

        if (testEndpoints.length === 0) {
          testLogger.warn("No endpoints available for data integrity testing");
          return;
        }

        // Test endpoints in parallel using Promise.all
        const results = await Promise.all(
          testEndpoints.map(async (endpoint) => {
            try {
              const startTime = Date.now();

              // Use sample parameters if available, otherwise use empty object
              const params = endpoint.sampleParams || {};

              // Test basic API functionality
              const result = await fetchZod(endpoint, params, "none");
              const duration = Date.now() - startTime;

              // Test data integrity (compare zod vs native fetch with deep equality)
              const integrityTest = createDataIntegrityTest(endpoint);
              const integrityResult = await integrityTest.test(params);

              return {
                success: true,
                message: `Data integrity test passed for ${endpoint.functionName} (${duration}ms)`,
                responseTime: duration,
                dataIntegrity: integrityResult.success,
                integrityMessage: integrityResult.message,
              };
            } catch (error) {
              return {
                success: false,
                message: `Data integrity test failed for ${endpoint.functionName}`,
                error: error instanceof Error ? error.message : "Unknown error",
                responseTime: 0,
                dataIntegrity: false,
              };
            }
          })
        );

        expect(Array.isArray(results)).toBe(true);
        expect(results.length).toBe(testEndpoints.length);

        const passed = results.filter((r) => r.success).length;
        const dataIntegrityPassed = results.filter(
          (r) => r.dataIntegrity
        ).length;

        testLogger.info(
          `Data integrity tests: ${passed}/${results.length} passed`
        );
        testLogger.info(
          `Data integrity validation: ${dataIntegrityPassed}/${results.length} passed`
        );
      },
      PARALLEL_TEST_TIMEOUT
    );
  });
});
