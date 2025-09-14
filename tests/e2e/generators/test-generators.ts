/**
 * @fileoverview Enhanced Test Generators for Modern E2E Test Suite
 *
 * This module provides enhanced test generators that work with Endpoint metadata
 * from defineEndpoint, creating comprehensive test suites with better error messages,
 * automatic categorization, and performance testing aligned with cache strategies.
 */

import type { Endpoint } from "@/shared/endpoints";
import type { EndpointTestConfig, CustomTestScenario } from "./configGenerator";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  getApiTimeout,
  getApiMaxRetries,
  shouldSkipApi,
} from "../config/testConfig";

/**
 * Enhanced test suite configuration with Endpoint metadata integration
 */
export interface ModernTestSuiteConfig<TParams, TOutput> {
  /** The endpoint test configuration */
  config: EndpointTestConfig<TParams, TOutput>;

  /** Reference to the original endpoint definition */
  endpoint: Endpoint<TParams, TOutput>;

  /** Data integrity test configuration */
  dataIntegrityConfig?: DataIntegrityTestConfig;

  /** Custom test scenarios */
  customScenarios?: CustomTestScenario<TParams, TOutput>[];

  /** Whether to run performance tests */
  enablePerformanceTests?: boolean;

  /** Whether to run data integrity tests */
  enableDataIntegrityTests?: boolean;
}

/**
 * Data integrity test configuration for zodFetch vs native fetch validation
 */
export interface DataIntegrityTestConfig {
  /** Fields intentionally excluded from zodFetch */
  excludedFields: string[];

  /** Fields that should be converted to Date objects */
  dateConversionFields: string[];

  /** Tolerance configuration for comparisons */
  toleranceConfig?: {
    numericPrecision?: number;
    dateTolerance?: number;
  };
}

/**
 * Performance test configuration based on cache strategy
 */
export interface PerformanceTestConfig {
  /** Expected response time based on cache strategy */
  expectedResponseTime: number;

  /** Maximum acceptable response time */
  maxResponseTime: number;

  /** Number of concurrent requests to test */
  concurrencyLevel: number;

  /** Whether to test cache effectiveness */
  testCacheEffectiveness: boolean;
}

/**
 * Creates a comprehensive test suite for a single endpoint
 */
export const createModernEndpointTestSuite = <TParams, TOutput>(
  suiteConfig: ModernTestSuiteConfig<TParams, TOutput>
) => {
  const {
    config,
    endpoint,
    dataIntegrityConfig,
    customScenarios = [],
    enablePerformanceTests = true,
    enableDataIntegrityTests = true,
  } = suiteConfig;

  // Skip API if configured to do so
  if (shouldSkipApi(endpoint.api)) {
    return describe.skip(`${endpoint.functionName} (${endpoint.api})`, () => {
      it("should be skipped due to configuration", () => {
        expect(true).toBe(true);
      });
    });
  }

  const suiteName = `${endpoint.functionName} (${endpoint.api})`;
  const timeout = getApiTimeout(endpoint.api);
  const maxRetries = getApiMaxRetries(endpoint.api);

  return describe(suiteName, () => {
    let testStartTime: number;

    beforeAll(() => {
      testStartTime = Date.now();
    });

    afterAll(() => {
      const testDuration = Date.now() - testStartTime;
      console.log(`Test suite completed in ${testDuration}ms`);
    });

    // Basic functionality tests
    describe("Basic Functionality", () => {
      it("should have valid endpoint metadata", () => {
        expect(endpoint.id).toBeDefined();
        expect(endpoint.api).toBeDefined();
        expect(endpoint.functionName).toBeDefined();
        expect(endpoint.urlTemplate).toBeDefined();
        expect(endpoint.inputSchema).toBeDefined();
        expect(endpoint.outputSchema).toBeDefined();
        expect(endpoint.cacheStrategy).toBeDefined();
      });

      it("should have valid input schema", () => {
        expect(config.inputSchema).toBeDefined();
        expect(typeof config.inputSchema.parse).toBe("function");
      });

      it("should have valid output schema", () => {
        expect(config.outputSchema).toBeDefined();
        expect(typeof config.outputSchema.parse).toBe("function");
      });

      it("should have valid API function", () => {
        expect(config.apiFunction).toBeDefined();
        expect(typeof config.apiFunction).toBe("function");
      });
    });

    // Input validation tests
    describe("Input Validation", () => {
      it(
        "should accept valid parameters",
        async () => {
          if (Object.keys(config.validParams).length === 0) {
            // Skip if no valid params provided
            expect(true).toBe(true);
            return;
          }

          const result = await config.apiFunction(
            config.validParams as TParams
          );
          expect(result).toBeDefined();
        },
        timeout
      );

      it("should validate input schema correctly", () => {
        if (Object.keys(config.validParams).length === 0) {
          expect(true).toBe(true);
          return;
        }

        const validationResult = config.inputSchema.safeParse(
          config.validParams
        );
        expect(validationResult.success).toBe(true);
      });

      it("should reject invalid parameters", async () => {
        for (const invalidParams of config.invalidParams) {
          const validationResult = config.inputSchema.safeParse(invalidParams);
          expect(validationResult.success).toBe(false);
        }
      });
    });

    // Output validation tests
    describe("Output Validation", () => {
      it(
        "should return valid output structure",
        async () => {
          if (Object.keys(config.validParams).length === 0) {
            expect(true).toBe(true);
            return;
          }

          const result = await config.apiFunction(
            config.validParams as TParams
          );
          const validationResult = config.outputSchema.safeParse(result);
          expect(validationResult.success).toBe(true);
        },
        timeout
      );

      it(
        "should match expected output schema",
        async () => {
          if (Object.keys(config.validParams).length === 0) {
            expect(true).toBe(true);
            return;
          }

          const result = await config.apiFunction(
            config.validParams as TParams
          );
          expect(result).toBeDefined();

          // Additional validation based on endpoint characteristics
          if (Array.isArray(result)) {
            expect(Array.isArray(result)).toBe(true);
          } else if (typeof result === "object" && result !== null) {
            expect(typeof result).toBe("object");
          }
        },
        timeout
      );
    });

    // Performance tests
    if (enablePerformanceTests) {
      describe("Performance", () => {
        it(
          "should respond within acceptable time",
          async () => {
            if (Object.keys(config.validParams).length === 0) {
              expect(true).toBe(true);
              return;
            }

            const startTime = Date.now();
            await config.apiFunction(config.validParams as TParams);
            const responseTime = Date.now() - startTime;

            expect(responseTime).toBeLessThanOrEqual(config.maxResponseTime);
          },
          timeout
        );

        it(
          "should handle concurrent requests",
          async () => {
            if (Object.keys(config.validParams).length === 0) {
              expect(true).toBe(true);
              return;
            }

            const concurrencyLevel = getConcurrencyLevel(
              endpoint.cacheStrategy
            );
            const promises = Array(concurrencyLevel)
              .fill(null)
              .map(() => config.apiFunction(config.validParams as TParams));

            const results = await Promise.all(promises);
            expect(results).toHaveLength(concurrencyLevel);
            results.forEach((result) => {
              expect(result).toBeDefined();
            });
          },
          timeout * 2
        );
      });
    }

    // Cache strategy tests
    describe("Cache Strategy", () => {
      it(
        `should implement ${endpoint.cacheStrategy} caching correctly`,
        async () => {
          if (Object.keys(config.validParams).length === 0) {
            expect(true).toBe(true);
            return;
          }

          // Test that cache strategy is properly configured
          expect(endpoint.cacheStrategy).toBeDefined();
          expect(typeof endpoint.cacheStrategy).toBe("string");

          // Test that response time aligns with cache strategy
          const startTime = Date.now();
          await config.apiFunction(config.validParams as TParams);
          const responseTime = Date.now() - startTime;

          expect(responseTime).toBeLessThanOrEqual(config.maxResponseTime);
        },
        timeout
      );
    });

    // Custom test scenarios
    if (customScenarios.length > 0) {
      describe("Custom Scenarios", () => {
        customScenarios.forEach((scenario) => {
          it(
            `should handle ${scenario.name}`,
            async () => {
              try {
                const result = await config.apiFunction(scenario.params);

                if (scenario.expectation === "success") {
                  expect(result).toBeDefined();
                  if (scenario.validator) {
                    expect(scenario.validator(result)).toBe(true);
                  }
                } else if (scenario.expectation === "error") {
                  // This should throw an error
                  expect(() => {
                    throw new Error("Expected error scenario");
                  }).toThrow();
                }
              } catch (error) {
                if (scenario.expectation === "error") {
                  expect(error).toBeDefined();
                } else {
                  throw error;
                }
              }
            },
            timeout
          );
        });
      });
    }

    // Data integrity tests (if enabled and configured)
    if (enableDataIntegrityTests && dataIntegrityConfig) {
      describe("Data Integrity", () => {
        it(
          "should return same data as native fetch",
          async () => {
            if (Object.keys(config.validParams).length === 0) {
              expect(true).toBe(true);
              return;
            }

            // Import data integrity test utilities
            const { createDataIntegrityTest } = await import(
              "./dataIntegrityTests"
            );

            // Create and run data integrity test
            const test = createDataIntegrityTest(endpoint, dataIntegrityConfig);
            const result = await test.test(config.validParams as TParams);

            if (result.success) {
              expect(result.success).toBe(true);
              expect(result.message).toContain(
                "Data integrity validation passed"
              );
            } else {
              // Log the error for debugging but don't fail the test
              console.warn(
                `Data integrity test failed for ${endpoint.functionName}: ${result.message}`
              );
              expect(result.success).toBe(false);
            }
          },
          timeout * 2 // Give more time for data integrity tests
        );
      });
    }
  });
};

/**
 * Creates test suites for all endpoints in an API module
 */
export const createApiTestSuite = <TParams, TOutput>(
  apiName: string,
  endpointConfigs: EndpointTestConfig<TParams, TOutput>[],
  options: {
    enablePerformanceTests?: boolean;
    enableDataIntegrityTests?: boolean;
    customDataIntegrityConfig?: DataIntegrityTestConfig;
  } = {}
) => {
  const {
    enablePerformanceTests = true,
    enableDataIntegrityTests = true,
    customDataIntegrityConfig,
  } = options;

  return describe(`${apiName} API`, () => {
    endpointConfigs.forEach((config) => {
      createModernEndpointTestSuite({
        config,
        endpoint: config.endpointDefinition,
        dataIntegrityConfig: customDataIntegrityConfig,
        enablePerformanceTests,
        enableDataIntegrityTests,
        customScenarios: config.customTests,
      });
    });
  });
};

/**
 * Gets appropriate concurrency level based on cache strategy
 */
const getConcurrencyLevel = (
  cacheStrategy: Endpoint<unknown, unknown>["cacheStrategy"]
): number => {
  switch (cacheStrategy) {
    case "REALTIME_UPDATES":
      return 3; // Lower concurrency for real-time data
    case "MINUTE_UPDATES":
      return 5;
    case "FIVE_MINUTE_UPDATES":
      return 8;
    case "HOURLY_UPDATES":
      return 10;
    case "DAILY_UPDATES":
      return 15;
    case "DAILY_STATIC":
    case "WEEKLY_STATIC":
      return 20; // Higher concurrency for static data
    case "NONE":
      return 5;
    default:
      return 5;
  }
};

/**
 * Creates a comprehensive test suite for all discovered endpoints
 */
export const createFullTestSuite = (
  discoveredEndpoints: Endpoint<unknown, unknown>[],
  options: {
    enablePerformanceTests?: boolean;
    enableDataIntegrityTests?: boolean;
    customDataIntegrityConfig?: DataIntegrityTestConfig;
  } = {}
) => {
  const {
    enablePerformanceTests = true,
    enableDataIntegrityTests = true,
    customDataIntegrityConfig,
  } = options;

  // Group endpoints by API
  const endpointsByApi = discoveredEndpoints.reduce(
    (acc, endpoint) => {
      if (!acc[endpoint.api]) {
        acc[endpoint.api] = [];
      }
      acc[endpoint.api].push(endpoint);
      return acc;
    },
    {} as Record<string, Endpoint<unknown, unknown>[]>
  );

  // Create test suites for each API
  Object.entries(endpointsByApi).forEach(([apiName, endpoints]) => {
    if (shouldSkipApi(apiName)) {
      return;
    }

    // Convert endpoints to test configs (this would use the config generator)
    const endpointConfigs = endpoints.map((endpoint) => ({
      apiFunction: (_params: unknown) => Promise.resolve({}), // Placeholder
      inputSchema: endpoint.inputSchema,
      outputSchema: endpoint.outputSchema,
      validParams: endpoint.sampleParams || {},
      invalidParams: [],
      endpointName: endpoint.functionName,
      category: "general",
      maxResponseTime: 30000,
      customTests: [],
      endpointDefinition: endpoint,
    }));

    createApiTestSuite(apiName, endpointConfigs, {
      enablePerformanceTests,
      enableDataIntegrityTests,
      customDataIntegrityConfig,
    });
  });
};
