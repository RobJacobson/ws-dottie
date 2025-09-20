/**
 * @fileoverview Performance E2E Tests
 *
 * Tests response times and performance characteristics of our API calls.
 * Focuses on ensuring our code doesn't add excessive overhead to API calls.
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
// PERFORMANCE TEST SUITE
// ============================================================================

describe("Performance E2E Tests", () => {
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
        `Testing performance for specific module: ${targetModule} (${filteredEndpoints.length} endpoints)`
      );
    } else {
      // Test all endpoints
      filteredEndpoints = allEndpoints;
      testLogger.info(
        `Testing performance for all modules: ${Object.keys(discoveredEndpoints).length} APIs, ${allEndpoints.length} endpoints`
      );
    }
  });

  afterAll(() => {
    testLogger.suiteEnd("Performance E2E Tests completed");
  });

  // ============================================================================
  // RESPONSE TIME TESTS
  // ============================================================================

  describe("Response Time Tests", () => {
    it(
      "should respond within acceptable time limits",
      async () => {
        const testEndpoints = filteredEndpoints.slice(
          0,
          getTestEndpointCount()
        );
        const MAX_RESPONSE_TIME = 10000; // 10 seconds

        if (testEndpoints.length === 0) {
          testLogger.warn("No endpoints available for performance testing");
          return;
        }

        const results = await Promise.all(
          testEndpoints.map(async (endpoint) => {
            try {
              // Use sample parameters if available, otherwise use empty object
              const params = endpoint.sampleParams || {};

              const startTime = Date.now();
              await fetchZod(endpoint, params, "none");
              const duration = Date.now() - startTime;

              const withinLimit = duration <= MAX_RESPONSE_TIME;

              return {
                success: withinLimit,
                message: `Response time: ${duration}ms (limit: ${MAX_RESPONSE_TIME}ms) for ${endpoint.functionName}`,
                responseTime: duration,
                withinLimit,
              };
            } catch (error) {
              return {
                success: false,
                message: `Performance test failed for ${endpoint.functionName}`,
                responseTime: 0,
                withinLimit: false,
                error: error instanceof Error ? error.message : "Unknown error",
              };
            }
          })
        );

        const passed = results.filter((r) => r.success).length;
        const withinLimit = results.filter((r) => r.withinLimit).length;

        testLogger.info(
          `Performance tests: ${passed}/${results.length} passed`
        );
        testLogger.info(
          `Response time limits: ${withinLimit}/${results.length} within ${MAX_RESPONSE_TIME}ms`
        );

        // Log individual response times for analysis
        results.forEach((result) => {
          if (result.responseTime > 0) {
            testLogger.info(`  ${result.message}`);
          }
        });

        expect(passed).toBe(results.length);
      },
      PARALLEL_TEST_TIMEOUT
    );

    it(
      "should have consistent response times across multiple calls",
      async () => {
        const testEndpoints = filteredEndpoints.slice(
          0,
          Math.min(3, getTestEndpointCount())
        );
        const SAMPLES = 3;
        const MAX_VARIANCE = 5000; // 5 seconds variance allowed

        if (testEndpoints.length === 0) {
          testLogger.warn("No endpoints available for consistency testing");
          return;
        }

        const results = await Promise.all(
          testEndpoints.map(async (endpoint) => {
            try {
              // Use sample parameters if available, otherwise use empty object
              const params = endpoint.sampleParams || {};
              const responseTimes: number[] = [];

              // Make multiple calls to test consistency
              for (let i = 0; i < SAMPLES; i++) {
                const startTime = Date.now();
                await fetchZod(endpoint, params, "none");
                const duration = Date.now() - startTime;
                responseTimes.push(duration);
              }

              const average =
                responseTimes.reduce((sum, time) => sum + time, 0) /
                responseTimes.length;
              const min = Math.min(...responseTimes);
              const max = Math.max(...responseTimes);
              const variance = max - min;

              const isConsistent = variance <= MAX_VARIANCE;

              return {
                success: isConsistent,
                message: `Response time consistency: avg=${average.toFixed(0)}ms, min=${min}ms, max=${max}ms, variance=${variance}ms for ${endpoint.functionName}`,
                average,
                min,
                max,
                variance,
                isConsistent,
              };
            } catch (error) {
              return {
                success: false,
                message: `Consistency test failed for ${endpoint.functionName}`,
                average: 0,
                min: 0,
                max: 0,
                variance: 0,
                isConsistent: false,
                error: error instanceof Error ? error.message : "Unknown error",
              };
            }
          })
        );

        const passed = results.filter((r) => r.success).length;
        const consistent = results.filter((r) => r.isConsistent).length;

        testLogger.info(
          `Consistency tests: ${passed}/${results.length} passed`
        );
        testLogger.info(
          `Response time consistency: ${consistent}/${results.length} within variance limit`
        );

        // Log detailed timing information
        results.forEach((result) => {
          if (result.average > 0) {
            testLogger.info(`  ${result.message}`);
          }
        });

        expect(passed).toBe(results.length);
      },
      PARALLEL_TEST_TIMEOUT * 2 // Allow more time for multiple samples
    );
  });

  // ============================================================================
  // MEMORY AND RESOURCE TESTS
  // ============================================================================

  describe("Resource Usage Tests", () => {
    it(
      "should not leak memory during API calls",
      async () => {
        const testEndpoints = filteredEndpoints.slice(
          0,
          getTestEndpointCount()
        );

        if (testEndpoints.length === 0) {
          testLogger.warn("No endpoints available for memory testing");
          return;
        }

        // Get initial memory usage
        const initialMemory = process.memoryUsage();

        const results = await Promise.all(
          testEndpoints.map(async (endpoint) => {
            try {
              // Use sample parameters if available, otherwise use empty object
              const params = endpoint.sampleParams || {};

              // Make multiple calls to test for memory leaks
              for (let i = 0; i < 5; i++) {
                await fetchZod(endpoint, params, "none");
              }

              return {
                success: true,
                message: `Memory test passed for ${endpoint.functionName}`,
              };
            } catch (error) {
              return {
                success: false,
                message: `Memory test failed for ${endpoint.functionName}`,
                error: error instanceof Error ? error.message : "Unknown error",
              };
            }
          })
        );

        // Get final memory usage
        const finalMemory = process.memoryUsage();
        const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;

        const passed = results.filter((r) => r.success).length;

        testLogger.info(`Memory tests: ${passed}/${results.length} passed`);
        testLogger.info(
          `Memory increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB`
        );

        // Memory increase should be reasonable (less than 50MB)
        expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);

        expect(passed).toBe(results.length);
      },
      PARALLEL_TEST_TIMEOUT
    );
  });
});
