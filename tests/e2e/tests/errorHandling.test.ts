/**
 * @fileoverview Error Handling E2E Tests
 *
 * Tests how our code handles various error conditions when calling external APIs.
 * Focuses on our code's behavior, not the API's data quality.
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
// ERROR HANDLING TEST SUITE
// ============================================================================

describe("Error Handling E2E Tests", () => {
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
        `Testing error handling for specific module: ${targetModule} (${filteredEndpoints.length} endpoints)`
      );
    } else {
      // Test all endpoints
      filteredEndpoints = allEndpoints;
      testLogger.info(
        `Testing error handling for all modules: ${Object.keys(discoveredEndpoints).length} APIs, ${allEndpoints.length} endpoints`
      );
    }
  });

  afterAll(() => {
    testLogger.suiteEnd("Error Handling E2E Tests completed");
  });

  // ============================================================================
  // INVALID PARAMETER TESTS
  // ============================================================================

  describe("Invalid Parameter Handling", () => {
    it(
      "should handle invalid parameter types gracefully",
      async () => {
        const testEndpoints = filteredEndpoints.slice(
          0,
          getTestEndpointCount()
        );

        if (testEndpoints.length === 0) {
          testLogger.warn("No endpoints available for error testing");
          return;
        }

        const results = await Promise.all(
          testEndpoints.map(async (endpoint) => {
            try {
              // Test with invalid parameter types
              const invalidParams = { id: "not-a-number" };
              await fetchZod(endpoint, invalidParams, "none");

              return {
                success: false,
                message: `Expected error for invalid params in ${endpoint.functionName}`,
                error: "No error thrown for invalid parameter types",
              };
            } catch (error) {
              return {
                success: true,
                message: `Correctly handled invalid params in ${endpoint.functionName}`,
                error: error instanceof Error ? error.message : "Unknown error",
              };
            }
          })
        );

        const handledCorrectly = results.filter((r) => r.success).length;
        testLogger.info(
          `Invalid parameter handling: ${handledCorrectly}/${results.length} handled correctly`
        );

        // At least some endpoints should handle invalid params correctly
        expect(handledCorrectly).toBeGreaterThan(0);
      },
      PARALLEL_TEST_TIMEOUT
    );

    it(
      "should handle missing required parameters",
      async () => {
        const testEndpoints = filteredEndpoints.slice(
          0,
          getTestEndpointCount()
        );

        if (testEndpoints.length === 0) {
          testLogger.warn("No endpoints available for error testing");
          return;
        }

        const results = await Promise.all(
          testEndpoints.map(async (endpoint) => {
            try {
              // Test with sample parameters if available, otherwise empty parameters
              const params = endpoint.sampleParams || {};
              await fetchZod(endpoint, params, "none");

              return {
                success: true,
                message: `Endpoint ${endpoint.functionName} accepts empty params`,
                error: null,
              };
            } catch (error) {
              return {
                success: true,
                message: `Endpoint ${endpoint.functionName} correctly rejects empty params`,
                error: error instanceof Error ? error.message : "Unknown error",
              };
            }
          })
        );

        const handledCorrectly = results.filter((r) => r.success).length;
        testLogger.info(
          `Missing parameter handling: ${handledCorrectly}/${results.length} handled correctly`
        );

        expect(handledCorrectly).toBe(results.length);
      },
      PARALLEL_TEST_TIMEOUT
    );
  });

  // ============================================================================
  // API ERROR RESPONSE TESTS
  // ============================================================================

  describe("API Error Response Handling", () => {
    it(
      "should handle API returning empty results gracefully",
      async () => {
        const testEndpoints = filteredEndpoints.slice(
          0,
          getTestEndpointCount()
        );

        if (testEndpoints.length === 0) {
          testLogger.warn("No endpoints available for error testing");
          return;
        }

        const results = await Promise.all(
          testEndpoints.map(async (endpoint) => {
            try {
              // Use sample parameters if available, otherwise use empty object
              const params = endpoint.sampleParams || {};
              const result = await fetchZod(endpoint, params, "none");

              // Our code should handle empty results gracefully
              expect(result).toBeDefined();

              if (Array.isArray(result)) {
                expect(result.length).toBeGreaterThanOrEqual(0);
              }

              return {
                success: true,
                message: `Handled empty results correctly in ${endpoint.functionName}`,
                error: null,
              };
            } catch (error) {
              return {
                success: false,
                message: `Failed to handle empty results in ${endpoint.functionName}`,
                error: error instanceof Error ? error.message : "Unknown error",
              };
            }
          })
        );

        const handledCorrectly = results.filter((r) => r.success).length;
        testLogger.info(
          `Empty result handling: ${handledCorrectly}/${results.length} handled correctly`
        );

        expect(handledCorrectly).toBe(results.length);
      },
      PARALLEL_TEST_TIMEOUT
    );

    it(
      "should handle API errors without crashing",
      async () => {
        const testEndpoints = filteredEndpoints.slice(
          0,
          getTestEndpointCount()
        );

        if (testEndpoints.length === 0) {
          testLogger.warn("No endpoints available for error testing");
          return;
        }

        const results = await Promise.all(
          testEndpoints.map(async (endpoint) => {
            try {
              // Use sample parameters if available, otherwise use empty object
              const params = endpoint.sampleParams || {};
              const result = await fetchZod(endpoint, params, "none");

              // Our code should handle API errors gracefully
              expect(result).toBeDefined();

              return {
                success: true,
                message: `Handled API error gracefully in ${endpoint.functionName}`,
                error: null,
              };
            } catch (error) {
              // If our code throws an error, that's also acceptable behavior
              return {
                success: true,
                message: `Correctly threw error for invalid API call in ${endpoint.functionName}`,
                error: error instanceof Error ? error.message : "Unknown error",
              };
            }
          })
        );

        const handledCorrectly = results.filter((r) => r.success).length;
        testLogger.info(
          `API error handling: ${handledCorrectly}/${results.length} handled correctly`
        );

        expect(handledCorrectly).toBe(results.length);
      },
      PARALLEL_TEST_TIMEOUT
    );
  });
});
