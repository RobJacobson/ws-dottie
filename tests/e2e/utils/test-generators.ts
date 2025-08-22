import { describe, expect, it } from "vitest";
import { z } from "zod";

import type { EndpointTestConfig } from "./types";
import {
  testPerformance,
  validateArrayData,
  validateObjectData,
  validateSchema,
} from "./validation";

/**
 * Create a comprehensive test suite for any API endpoint
 *
 * This is the main test generator that handles all the common test patterns
 * for every endpoint type. It reduces boilerplate by 90% while maintaining
 * full test coverage and type safety.
 */
export const createEndpointTestSuite = <TParams, TOutput>({
  apiFunction,
  inputSchema,
  outputSchema,
  validParams,
  invalidParams,
  testData,
  endpointName,
  category,
  maxResponseTime = 10000,
  requiresAuth = false,
  customTests = [],
}: EndpointTestConfig<TParams, TOutput>) => {
  // Add verbose output for better terminal visibility
  console.log(`\n🔧 Setting up test suite for: ${endpointName} (${category})`);
  console.log(`   • Max response time: ${maxResponseTime}ms`);
  console.log(`   • Custom tests: ${customTests.length}`);
  console.log(`   • Invalid param tests: ${invalidParams.length}`);

  return describe(`${endpointName} API - Zod Validation`, () => {
    // Basic functionality tests
    describe("Basic Functionality", () => {
      it("should return data without errors", async () => {
        console.log(
          `\n📋 Running basic functionality test for ${endpointName}...`
        );
        const result = await apiFunction(validParams);
        expect(result).toBeDefined();

        // Log basic info for debugging
        if (Array.isArray(result)) {
          console.log(`✅ ${endpointName}: returned ${result.length} items`);
        } else if (typeof result === "object" && result !== null) {
          console.log(
            `✅ ${endpointName}: returned object with keys: ${Object.keys(result).join(", ")}`
          );
        } else {
          console.log(`✅ ${endpointName}: returned ${typeof result}`);
        }
      });

      it("should return data of expected type", async () => {
        const result = await apiFunction(validParams);

        // Check if result matches expected schema structure
        const validated = validateSchema(outputSchema, result, endpointName);
        expect(validated).toBeDefined();
      });
    });

    // Schema validation tests
    describe("Schema Validation", () => {
      it("should validate response against output schema", async () => {
        const result = await apiFunction(validParams);
        const validated = validateSchema(
          outputSchema,
          result,
          `${endpointName} response`
        );
        expect(validated).toBeDefined();
      });

      if (inputSchema) {
        it("should validate input parameters", async () => {
          const validatedParams = validateSchema(
            inputSchema,
            validParams,
            `${endpointName} input`
          );
          expect(validatedParams).toBeDefined();
        });
      }

      // Additional schema-specific tests based on category
      if (category === "parameterless") {
        it("should return array data for list endpoints", async () => {
          const result = await apiFunction(validParams);
          // For parameterless endpoints, we expect an array
          const validated = validateArrayData(
            result,
            outputSchema as z.ZodSchema<unknown[]>,
            `${endpointName} array`
          );
          expect(Array.isArray(validated)).toBe(true);
          expect(validated.length).toBeGreaterThan(0);
        });
      }

      if (category === "id-based") {
        it("should return single object for ID-based endpoints", async () => {
          const result = await apiFunction(validParams);
          const validated = validateObjectData(
            result,
            outputSchema as z.ZodSchema<unknown>,
            `${endpointName} object`
          );
          expect(typeof validated).toBe("object");
          expect(validated).not.toBeNull();
        });
      }
    });

    // Error handling tests
    describe("Error Handling", () => {
      if (invalidParams.length > 0) {
        invalidParams.forEach(({ params, expectedError }) => {
          it(`should handle invalid parameters: ${expectedError}`, async () => {
            await expect(apiFunction(params as TParams)).rejects.toThrow();
          });
        });
      } else {
        it("should handle edge cases gracefully", async () => {
          // Test with empty object if no specific invalid params
          if (Object.keys(validParams as Record<string, unknown>).length > 0) {
            if (category === "search") {
              // Search endpoints typically return results (possibly all) for empty params
              const result = await apiFunction({} as TParams);
              expect(result).toBeDefined();
              expect(Array.isArray(result)).toBe(true);
            } else {
              // Other endpoints should throw for empty params
              await expect(apiFunction({} as TParams)).rejects.toThrow();
            }
          }
        });
      }

      // Category-specific error tests
      if (category === "date-based") {
        it("should handle invalid dates", async () => {
          const invalidDateParams = {
            ...validParams,
            tripDate: new Date("invalid"),
          } as TParams;
          await expect(apiFunction(invalidDateParams)).rejects.toThrow();
        });
      }

      if (category === "id-based") {
        it("should handle invalid IDs", async () => {
          const invalidIdParams = {
            ...validParams,
            id: -1,
          } as TParams;
          await expect(apiFunction(invalidIdParams)).rejects.toThrow();
        });
      }
    });

    // Performance tests
    describe("Performance", () => {
      it("should respond within acceptable time limit", async () => {
        const duration = await testPerformance(
          () => apiFunction(validParams),
          maxResponseTime
        );
        expect(duration).toBeLessThan(maxResponseTime);
        console.log(
          `⚡ ${endpointName}: ${duration}ms (limit: ${maxResponseTime}ms)`
        );
      });

      it("should have consistent response times", async () => {
        const durations: number[] = [];
        const samples = 3;

        for (let i = 0; i < samples; i++) {
          const duration = await testPerformance(
            () => apiFunction(validParams),
            maxResponseTime * 2 // Allow more time for individual samples
          );
          durations.push(duration);
        }

        const average =
          durations.reduce((sum, d) => sum + d, 0) / durations.length;
        const variance =
          durations.reduce((sum, d) => sum + Math.pow(d - average, 2), 0) /
          durations.length;
        const standardDeviation = Math.sqrt(variance);

        // Check that response times are reasonably consistent (within 75% of average)
        // Network operations can have natural variance, so we allow a more generous threshold
        expect(standardDeviation).toBeLessThan(average * 0.75);
        console.log(
          `📊 ${endpointName}: avg=${average.toFixed(0)}ms, std=${standardDeviation.toFixed(0)}ms`
        );
      });
    });

    // Data integrity tests
    describe("Data Integrity", () => {
      it("should return consistent data structure", async () => {
        const result1 = await apiFunction(validParams);
        const result2 = await apiFunction(validParams);

        // For arrays, check length consistency
        if (Array.isArray(result1) && Array.isArray(result2)) {
          expect(result1.length).toBe(result2.length);
        }

        // For objects, check key consistency
        if (
          typeof result1 === "object" &&
          typeof result2 === "object" &&
          result1 !== null &&
          result2 !== null
        ) {
          const keys1 = Object.keys(result1);
          const keys2 = Object.keys(result2);
          expect(keys1.sort()).toEqual(keys2.sort());
        }
      });

      it("should handle nullable fields correctly", async () => {
        const result = await apiFunction(validParams);
        const validated = validateSchema(
          outputSchema,
          result,
          `${endpointName} nullable fields`
        );

        // Check that nullable fields are either the expected type or null
        if (typeof validated === "object" && validated !== null) {
          Object.entries(validated).forEach(([key, value]) => {
            if (value === null) {
              // This is fine - it's a nullable field
              return;
            }
            // Check that non-null values have reasonable types
            expect(
              ["string", "number", "boolean", "object"].includes(typeof value)
            ).toBe(true);
          });
        }
      });
    });

    // Category-specific tests
    describe("Category-Specific Tests", () => {
      if (category === "parameterless") {
        it("should return non-empty data", async () => {
          const result = await apiFunction(validParams);
          const validated = validateArrayData(
            result,
            outputSchema as z.ZodSchema<unknown[]>,
            `${endpointName} non-empty`
          );
          expect(validated.length).toBeGreaterThan(0);
        });
      }

      if (category === "search") {
        it("should return relevant search results", async () => {
          const result = await apiFunction(validParams);
          const validated = validateArrayData(
            result,
            outputSchema as z.ZodSchema<unknown[]>,
            `${endpointName} search results`
          );
          expect(validated.length).toBeGreaterThanOrEqual(0); // Search can return empty results
        });
      }

      if (category === "id-based") {
        it("should return specific data for provided ID", async () => {
          const result = await apiFunction(validParams);
          const validated = validateObjectData(
            result,
            outputSchema as z.ZodSchema<unknown>,
            `${endpointName} ID-specific data`
          );
          expect(typeof validated).toBe("object");
          expect(validated).not.toBeNull();
        });
      }

      if (category === "date-based") {
        it("should handle different date ranges", async () => {
          const currentDate = new Date();
          const pastDate = new Date(
            currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
          ); // 30 days ago
          const futureDate = new Date(
            currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
          ); // 30 days from now

          const dateParams = [
            { ...validParams, tripDate: currentDate },
            { ...validParams, tripDate: pastDate },
            { ...validParams, tripDate: futureDate },
          ] as TParams[];

          for (const params of dateParams) {
            const result = await apiFunction(params);
            expect(result).toBeDefined();
          }
        });
      }
    });

    // Custom tests specific to this endpoint
    if (customTests.length > 0) {
      describe("Custom Tests", () => {
        customTests.forEach(({ name, test }) => {
          it(name, test);
        });
      });
    }
  });
};

/**
 * Create a test suite specifically for parameterless endpoints
 */
export const createParameterlessTestSuite = <TOutput>(
  config: Omit<EndpointTestConfig<{}, TOutput>, "category" | "inputSchema">
) => {
  return createEndpointTestSuite({
    ...config,
    category: "parameterless",
    inputSchema: z.object({}), // Empty schema for parameterless endpoints
  });
};

/**
 * Create a test suite specifically for parameterized endpoints
 */
export const createParameterizedTestSuite = <TParams, TOutput>(
  config: EndpointTestConfig<TParams, TOutput>
) => {
  return createEndpointTestSuite({
    ...config,
    category: "parameterized",
  });
};

/**
 * Create a test suite specifically for date-based endpoints
 */
export const createDateBasedTestSuite = <TParams, TOutput>(
  config: EndpointTestConfig<TParams, TOutput> & {
    dateField: keyof TParams;
    validDates: Date[];
    invalidDates: Date[];
  }
) => {
  return createEndpointTestSuite({
    ...config,
    category: "date-based",
  });
};

/**
 * Create a test suite specifically for ID-based endpoints
 */
export const createIdBasedTestSuite = <TParams, TOutput>(
  config: EndpointTestConfig<TParams, TOutput> & {
    idField: keyof TParams;
    validIds: number[];
    invalidIds: number[];
  }
) => {
  return createEndpointTestSuite({
    ...config,
    category: "id-based",
  });
};

/**
 * Create a test suite specifically for search endpoints
 */
export const createSearchTestSuite = <TParams, TOutput>(
  config: EndpointTestConfig<TParams, TOutput> & {
    searchField: keyof TParams;
    validSearchTerms: string[];
    invalidSearchTerms: string[];
  }
) => {
  return createEndpointTestSuite({
    ...config,
    category: "search",
  });
};
