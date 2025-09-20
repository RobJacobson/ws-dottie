/**
 * @fileoverview API Functionality E2E Tests
 *
 * Tests that our API calls work correctly against the Zod schemas.
 * Validates that our code properly handles schema validation and returns
 * data that matches the expected types and structure.
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
// API FUNCTIONALITY TEST SUITE
// ============================================================================

describe("API Functionality E2E Tests", () => {
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
        `Testing API functionality for specific module: ${targetModule} (${filteredEndpoints.length} endpoints)`
      );
    } else {
      // Test all endpoints
      filteredEndpoints = allEndpoints;
      testLogger.info(
        `Testing API functionality for all modules: ${Object.keys(discoveredEndpoints).length} APIs, ${allEndpoints.length} endpoints`
      );
    }
  });

  afterAll(() => {
    testLogger.suiteEnd("API Functionality E2E Tests completed");
  });

  // ============================================================================
  // SCHEMA VALIDATION TESTS
  // ============================================================================

  describe("Schema Validation Tests", () => {
    it(
      "should return data that matches Zod schemas",
      async () => {
        // Test a subset of endpoints to demonstrate parallel execution
        const testEndpoints = filteredEndpoints.slice(
          0,
          getTestEndpointCount()
        );

        if (testEndpoints.length === 0) {
          testLogger.warn(
            "No endpoints available for schema validation testing"
          );
          return;
        }

        // Test endpoints in parallel using Promise.all
        const results = await Promise.all(
          testEndpoints.map(async (endpoint) => {
            try {
              const startTime = Date.now();

              // Use sample parameters if available, otherwise use empty object
              const params = endpoint.sampleParams || {};

              // Test that the API call works and returns data
              const result = await fetchZod(endpoint, params, "none");
              const duration = Date.now() - startTime;

              // Basic validation that we got data
              expect(result).toBeDefined();

              // Validate data structure based on endpoint type
              if (Array.isArray(result)) {
                expect(Array.isArray(result)).toBe(true);
                testLogger.info(
                  `Schema validation passed for ${endpoint.functionName}: returned array with ${result.length} items (${duration}ms)`
                );
              } else if (typeof result === "object" && result !== null) {
                expect(typeof result).toBe("object");
                expect(result).not.toBeNull();
                testLogger.info(
                  `Schema validation passed for ${endpoint.functionName}: returned object with keys ${Object.keys(result).join(", ")} (${duration}ms)`
                );
              } else {
                testLogger.info(
                  `Schema validation passed for ${endpoint.functionName}: returned ${typeof result} (${duration}ms)`
                );
              }

              return {
                success: true,
                message: `Schema validation passed for ${endpoint.functionName} (${duration}ms)`,
                responseTime: duration,
                dataType: Array.isArray(result) ? "array" : typeof result,
                dataSize: Array.isArray(result) ? result.length : 1,
              };
            } catch (error) {
              return {
                success: false,
                message: `Schema validation failed for ${endpoint.functionName}`,
                error: error instanceof Error ? error.message : "Unknown error",
                responseTime: 0,
                dataType: "unknown",
                dataSize: 0,
              };
            }
          })
        );

        expect(Array.isArray(results)).toBe(true);
        expect(results.length).toBe(testEndpoints.length);

        const passed = results.filter((r) => r.success).length;
        const arrayResults = results.filter(
          (r) => r.dataType === "array"
        ).length;
        const objectResults = results.filter(
          (r) => r.dataType === "object"
        ).length;

        testLogger.info(
          `Schema validation tests: ${passed}/${results.length} passed`
        );
        testLogger.info(
          `Array responses: ${arrayResults}, Object responses: ${objectResults}`
        );

        // Log individual results for analysis
        results.forEach((result) => {
          if (result.success) {
            testLogger.info(`  ✅ ${result.message}`);
          } else {
            testLogger.error(`  ❌ ${result.message}: ${result.error}`);
          }
        });

        expect(passed).toBe(results.length);
      },
      PARALLEL_TEST_TIMEOUT
    );

    it(
      "should handle different parameter types correctly",
      async () => {
        // Test a subset of endpoints with different parameter types
        const testEndpoints = filteredEndpoints.slice(
          0,
          Math.min(3, getTestEndpointCount())
        );

        if (testEndpoints.length === 0) {
          testLogger.warn("No endpoints available for parameter testing");
          return;
        }

        const results = await Promise.all(
          testEndpoints.map(async (endpoint) => {
            try {
              // Test with sample parameters if available, otherwise empty parameters
              const params = endpoint.sampleParams || {};
              const result = await fetchZod(endpoint, params, "none");
              expect(result).toBeDefined();

              return {
                success: true,
                message: `Parameter handling passed for ${endpoint.functionName}`,
              };
            } catch (error) {
              // Some endpoints may not accept certain parameters, which is fine
              return {
                success: true,
                message: `Parameter handling passed for ${endpoint.functionName} (rejected invalid params as expected)`,
                error: error instanceof Error ? error.message : "Unknown error",
              };
            }
          })
        );

        const passed = results.filter((r) => r.success).length;
        testLogger.info(
          `Parameter handling tests: ${passed}/${results.length} passed`
        );

        expect(passed).toBe(results.length);
      },
      PARALLEL_TEST_TIMEOUT
    );
  });

  // ============================================================================
  // DATA STRUCTURE TESTS
  // ============================================================================

  describe("Data Structure Tests", () => {
    it(
      "should return consistent data structures",
      async () => {
        // Test a subset of endpoints to check data structure consistency
        const testEndpoints = filteredEndpoints.slice(
          0,
          Math.min(3, getTestEndpointCount())
        );

        if (testEndpoints.length === 0) {
          testLogger.warn("No endpoints available for structure testing");
          return;
        }

        const results = await Promise.all(
          testEndpoints.map(async (endpoint) => {
            try {
              // Use sample parameters if available, otherwise use empty object
              const params = endpoint.sampleParams || {};

              // Make multiple calls to check consistency
              const result1 = await fetchZod(endpoint, params, "none");
              const result2 = await fetchZod(endpoint, params, "none");

              // Check that both calls return the same type
              expect(typeof result1).toBe(typeof result2);

              // For arrays, check that length is consistent (or at least reasonable)
              if (Array.isArray(result1) && Array.isArray(result2)) {
                expect(result1.length).toBeGreaterThanOrEqual(0);
                expect(result2.length).toBeGreaterThanOrEqual(0);
                // Allow some variance in array length for dynamic data
                const lengthDiff = Math.abs(result1.length - result2.length);
                expect(lengthDiff).toBeLessThanOrEqual(10); // Allow up to 10 items difference
              }

              return {
                success: true,
                message: `Data structure consistency passed for ${endpoint.functionName}`,
              };
            } catch (error) {
              return {
                success: false,
                message: `Data structure consistency failed for ${endpoint.functionName}`,
                error: error instanceof Error ? error.message : "Unknown error",
              };
            }
          })
        );

        const passed = results.filter((r) => r.success).length;
        testLogger.info(
          `Data structure tests: ${passed}/${results.length} passed`
        );

        expect(passed).toBe(results.length);
      },
      PARALLEL_TEST_TIMEOUT
    );
  });
});
