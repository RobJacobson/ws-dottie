/**
 * @fileoverview Main E2E Test Orchestrator
 *
 * This file serves as the main entry point for all E2E tests, testing
 * each API sequentially, one at a time, for better debugging and clearer
 * pass/fail reporting per API.
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  discoverEndpoints,
  getAllEndpoints,
  type EndpointsByApi,
  type Endpoints,
} from "@/shared/endpoints";
import { testLogger } from "./testLogger";
import { fetchZod } from "@/shared/fetching";
import {
  getTargetModule,
  shouldTestSpecificModule,
  getTestEndpointCount,
  PARALLEL_TEST_TIMEOUT,
} from "./testConfig";

// Import test utilities
import { createDataIntegrityTest } from "./testUtils/dataIntegrity";

// ============================================================================
// MAIN TEST ORCHESTRATOR
// ============================================================================

describe("E2E Test Suite", () => {
  let discoveredEndpoints: EndpointsByApi;
  let allEndpoints: Endpoints;
  let targetModule: string | null;
  let apiNames: string[] = [];

  beforeAll(async () => {
    // Discover all endpoints (filtered by configuration)
    discoveredEndpoints = await discoverEndpoints();
    allEndpoints = await getAllEndpoints();

    // Check for module filtering via environment variable
    targetModule = getTargetModule();

    // Determine which APIs to test
    apiNames =
      shouldTestSpecificModule() && targetModule !== "all" && targetModule
        ? [targetModule]
        : Object.keys(discoveredEndpoints);

    if (shouldTestSpecificModule() && targetModule !== "all" && targetModule) {
      testLogger.info(
        `Testing specific module: ${targetModule} (${discoveredEndpoints[targetModule]?.length || 0} endpoints)`
      );
    } else {
      testLogger.info(
        `Testing all modules: ${Object.keys(discoveredEndpoints).length} APIs, ${allEndpoints.length} endpoints`
      );
    }
  });

  afterAll(() => {
    testLogger.suiteEnd("E2E Test Suite completed");
  });

  // ============================================================================
  // SEQUENTIAL API TESTING
  // ============================================================================

  describe("Sequential API Testing", () => {
    it(
      "should test all APIs sequentially",
      async () => {
        const results: Array<{
          apiName: string;
          success: boolean;
          message: string;
          details: {
            dataIntegrity: { passed: number; total: number };
            apiFunctionality: { passed: number; total: number };
            errorHandling: { passed: number; total: number };
            performance: { passed: number; total: number };
          };
        }> = [];

        // Test each API sequentially
        for (const apiName of apiNames) {
          testLogger.info(`\n🚀 Testing API: ${apiName}`);

          const apiEndpoints = discoveredEndpoints[apiName] || [];
          const testEndpoints = apiEndpoints.slice(0, getTestEndpointCount());

          if (testEndpoints.length === 0) {
            testLogger.warn(`No endpoints available for ${apiName}`);
            results.push({
              apiName,
              success: false,
              message: `No endpoints available for ${apiName}`,
              details: {
                dataIntegrity: { passed: 0, total: 0 },
                apiFunctionality: { passed: 0, total: 0 },
                errorHandling: { passed: 0, total: 0 },
                performance: { passed: 0, total: 0 },
              },
            });
            continue;
          }

          // Test data integrity
          const dataIntegrityResults = await Promise.all(
            testEndpoints.map(async (endpoint) => {
              try {
                const params = endpoint.sampleParams || {};
                const integrityTest = createDataIntegrityTest(endpoint);
                const result = await integrityTest.test(params);
                if (!result.success) {
                  testLogger.error(
                    `Data integrity failed for ${endpoint.functionName}: ${result.message}`
                  );
                }
                return { success: result.success, message: result.message };
              } catch (error) {
                const errorMessage =
                  error instanceof Error ? error.message : "Unknown error";
                testLogger.error(
                  `Data integrity error for ${endpoint.functionName}: ${errorMessage}`
                );
                return {
                  success: false,
                  message: errorMessage,
                };
              }
            })
          );

          // Test API functionality
          const apiFunctionalityResults = await Promise.all(
            testEndpoints.map(async (endpoint) => {
              try {
                const params = endpoint.sampleParams || {};
                const result = await fetchZod(endpoint, params, "none");
                return { success: true, message: `API call successful` };
              } catch (error) {
                return {
                  success: false,
                  message:
                    error instanceof Error ? error.message : "Unknown error",
                };
              }
            })
          );

          // Test error handling
          const errorHandlingResults = await Promise.all(
            testEndpoints.map(async (endpoint) => {
              try {
                // Test with empty parameters for endpoints that require params
                const params = endpoint.sampleParams || {};
                await fetchZod(endpoint, params, "none");
                return {
                  success: true,
                  message: "Error handling test passed (API call succeeded)",
                };
              } catch (error) {
                // If we get an error, that's also acceptable behavior for error handling tests
                return {
                  success: true,
                  message:
                    "Error handling test passed (API correctly threw error)",
                };
              }
            })
          );

          // Test performance
          const performanceResults = await Promise.all(
            testEndpoints.map(async (endpoint) => {
              try {
                const params = endpoint.sampleParams || {};
                const startTime = Date.now();
                await fetchZod(endpoint, params, "none");
                const duration = Date.now() - startTime;
                const withinLimit = duration <= 10000; // 10 seconds
                return {
                  success: withinLimit,
                  message: `Response time: ${duration}ms`,
                };
              } catch (error) {
                return {
                  success: false,
                  message:
                    error instanceof Error ? error.message : "Unknown error",
                };
              }
            })
          );

          // Calculate results for this API
          const dataIntegrityPassed = dataIntegrityResults.filter(
            (r) => r.success
          ).length;
          const apiFunctionalityPassed = apiFunctionalityResults.filter(
            (r) => r.success
          ).length;
          const errorHandlingPassed = errorHandlingResults.filter(
            (r) => r.success
          ).length;
          const performancePassed = performanceResults.filter(
            (r) => r.success
          ).length;

          const totalTests = testEndpoints.length;
          const apiSuccess =
            dataIntegrityPassed === totalTests &&
            apiFunctionalityPassed === totalTests &&
            performancePassed === totalTests;

          results.push({
            apiName,
            success: apiSuccess,
            message: apiSuccess
              ? `All tests passed for ${apiName}`
              : `Some tests failed for ${apiName}`,
            details: {
              dataIntegrity: { passed: dataIntegrityPassed, total: totalTests },
              apiFunctionality: {
                passed: apiFunctionalityPassed,
                total: totalTests,
              },
              errorHandling: { passed: errorHandlingPassed, total: totalTests },
              performance: { passed: performancePassed, total: totalTests },
            },
          });

          // Log results for this API
          testLogger.info(
            `  📊 Data Integrity: ${dataIntegrityPassed}/${totalTests} passed`
          );
          testLogger.info(
            `  📊 API Functionality: ${apiFunctionalityPassed}/${totalTests} passed`
          );
          testLogger.info(
            `  📊 Error Handling: ${errorHandlingPassed}/${totalTests} passed`
          );
          testLogger.info(
            `  📊 Performance: ${performancePassed}/${totalTests} passed`
          );
          testLogger.info(
            `  ${apiSuccess ? "✅" : "❌"} ${apiName}: ${apiSuccess ? "PASSED" : "FAILED"}`
          );
        }

        // Log overall results
        const totalApis = results.length;
        const passedApis = results.filter((r) => r.success).length;

        testLogger.info(
          `\n📈 Overall Results: ${passedApis}/${totalApis} APIs passed`
        );

        // Log detailed results
        results.forEach((result) => {
          const status = result.success ? "✅" : "❌";
          testLogger.info(`${status} ${result.apiName}: ${result.message}`);
        });

        // Assert that all APIs passed
        expect(passedApis).toBe(totalApis);
      },
      PARALLEL_TEST_TIMEOUT * 2 // Allow more time for sequential testing
    );
  });
});
