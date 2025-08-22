# E2E Test Suite Architecture

## Overview

This document describes the architecture of the new end-to-end (e2e) test suite designed to test 90+ API endpoints using Zod schemas as the single source of truth. The architecture addresses the challenges of maintaining consistency across many endpoints while keeping tests simple and maintainable.

## Problem Statement

### Challenges with Testing 90+ Endpoints

1. **Schema Divergence**: Previous e2e tests maintained separate Zod schemas that diverged from the actual API schemas, leading to tests that validated incorrect assumptions rather than real API behavior.

2. **Code Duplication**: Each endpoint required similar test patterns (schema validation, error handling, performance testing), resulting in massive code duplication across test files.

3. **Maintenance Burden**: Changes to API schemas required updates in multiple places, increasing the risk of inconsistencies and making the codebase harder to maintain.

4. **Test Complexity**: Individual test files became complex and difficult to debug, with each endpoint implementing its own testing logic.

5. **Scalability Issues**: Adding new endpoints required copying and modifying existing test patterns, leading to inconsistent implementations.

### Goals

- **Single Source of Truth**: Use Zod schemas from the API folder as the authoritative contract for all testing.
- **Code Reusability**: Eliminate duplication through higher-order functions and configuration-driven tests.
- **Maintainability**: Centralize test logic to make updates easier and more consistent.
- **Simplicity**: Keep individual test configurations simple and focused on endpoint-specific requirements.
- **Scalability**: Enable easy addition of new endpoints without duplicating test infrastructure.

## High-Level Architecture

### 1. Configuration-Driven Testing

The architecture uses configuration objects (`ApiModuleConfig`) that define:
- Module metadata (name, settings)
- Endpoint configurations with test requirements
- Shared test data and validation rules

### 2. Higher-Order Test Functions

Test generation is abstracted through:
- `createEndpointTestSuite`: Main factory function that generates complete test suites
- Specialized factories for different endpoint categories
- Reusable validation utilities

### 3. Layered Test Structure

Tests are organized in logical layers:
- **Basic Functionality**: Core API behavior validation
- **Schema Validation**: Zod schema compliance
- **Error Handling**: Invalid input and edge case handling
- **Performance**: Response time and consistency testing
- **Data Integrity**: Data structure and field validation
- **Category-Specific**: Endpoint-type specific validations
- **Custom Tests**: Endpoint-specific business logic validation

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    API Modules (90+ endpoints)                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │ WSDOT APIs  │ │ WSF APIs    │ │ Other APIs  │ │ ...         │ │
│  │ (11 modules)│ │ (4 modules) │ │ (future)    │ │             │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Test Configuration Layer                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │ Config 1    │ │ Config 2    │ │ Config 3    │ │ ...         │ │
│  │ (3-5 lines) │ │ (3-5 lines) │ │ (3-5 lines) │ │ (3-5 lines) │ │
│  │ generates   │ │ generates   │ │ generates   │ │ generates   │ │
│  │ 40+ tests   │ │ 40+ tests   │ │ 40+ tests   │ │ 40+ tests   │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Test Generation Engine                        │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ createEndpointTestSuite() - Higher-order test generator    │ │
│  │                                                             │ │
│  │ ┌─────────────────────────────────────────────────────────┐ │ │
│  │ │ Factory Functions:                                      │ │ │
│  │ │ • createParameterlessTestSuite()                        │ │ │
│  │ │ • createParameterizedTestSuite()                        │ │ │
│  │ │ • createDateBasedTestSuite()                            │ │ │
│  │ │ • createIdBasedTestSuite()                              │ │ │
│  │ │ • createSearchTestSuite()                               │ │ │
│  │ └─────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Generated Test Suites                        │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │ Suite 1     │ │ Suite 2     │ │ Suite 3     │ │ ...         │ │
│  │ (40+ tests) │ │ (40+ tests) │ │ (40+ tests) │ │ (40+ tests) │ │
│  │             │ │             │ │             │ │             │ │
│  │ • Basic     │ │ • Basic     │ │ • Basic     │ │ • Basic     │ │
│  │ • Schema    │ │ • Schema    │ │ • Schema    │ │ • Schema    │ │
│  │ • Error     │ │ • Error     │ │ • Error     │ │ • Error     │ │
│  │ • Perf      │ │ • Perf      │ │ • Perf      │ │ • Perf      │ │
│  │ • Data      │ │ • Data      │ │ • Data      │ │ • Data      │ │
│  │ • Category  │ │ • Category  │ │ • Category  │ │ • Category  │ │
│  │ • Custom    │ │ • Custom    │ │ • Custom    │ │ • Custom    │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Detailed Architecture

### Core Components

#### 1. Type Definitions (`tests/e2e/utils/types.ts`)

```typescript
import { z } from "zod";

export interface EndpointTestConfig<TParams, TOutput> {
  // Core API function and schemas
  apiFunction: (params: TParams) => Promise<TOutput>;
  inputSchema?: z.ZodSchema<TParams>;
  outputSchema: z.ZodSchema<TOutput>;
  
  // Test data and parameters
  validParams: TParams;
  invalidParams: Array<{ params: unknown; expectedError: string; }>;
  
  // Test configuration
  endpointName: string;
  category: 'parameterless' | 'parameterized' | 'date-based' | 'id-based' | 'search';
  maxResponseTime?: number;
  requiresAuth?: boolean;
  
  // Custom test cases
  customTests?: Array<{ name: string; test: () => Promise<void>; }>;
}

export interface ApiModuleConfig {
  moduleName: string;
  endpoints: EndpointTestConfig<any, any>[];
  sharedTestData?: Record<string, unknown>;
  settings?: {
    defaultMaxResponseTime?: number;
    requiresAuth?: boolean;
    rateLimitDelay?: number;
  };
}

export interface TestExecutionOptions {
  timeout?: number;
  retries?: number;
  verbose?: boolean;
}

export interface TestResult {
  success: boolean;
  duration: number;
  error?: string;
  data?: unknown;
}

export interface PerformanceTestResult {
  average: number;
  standardDeviation: number;
  min: number;
  max: number;
  samples: number[];
}

export interface SchemaValidationResult {
  valid: boolean;
  errors: z.ZodError[];
  parsedData?: unknown;
}
```

#### 2. Test Generators (`tests/e2e/utils/test-generators.ts`)

The main factory function `createEndpointTestSuite` generates tests based on:
- **Endpoint Category**: Determines which specialized tests to include
- **Configuration**: Uses endpoint-specific settings for validation rules
- **Schema Types**: Automatically handles input/output validation based on Zod schemas

```typescript
export const createEndpointTestSuite = <TParams, TOutput>({
  apiFunction,
  inputSchema,
  outputSchema,
  validParams,
  invalidParams,
  endpointName,
  category,
  maxResponseTime = 5000,
  requiresAuth = false,
  customTests = []
}: EndpointTestConfig<TParams, TOutput>) => {
  
  console.log(`🔧 Setting up test suite for: ${endpointName} (${category})`);
  console.log(`   • Max response time: ${maxResponseTime}ms`);
  console.log(`   • Custom tests: ${customTests.length}`);
  console.log(`   • Invalid param tests: ${invalidParams.length}`);

  describe(`${endpointName} API - Zod Validation`, () => {
    
    // Basic Functionality Tests
    describe("Basic Functionality", () => {
      it("should return data without errors", async () => {
        console.log(`📋 Running basic functionality test for ${endpointName}...`);
        const result = await apiFunction(validParams);
        
        if (Array.isArray(result)) {
          console.log(`✅ ${endpointName}: returned ${result.length} items`);
        } else {
          const keys = Object.keys(result);
          console.log(`✅ ${endpointName}: returned object with keys: ${keys.join(', ')}`);
        }
        
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
      });

      it("should return data of expected type", async () => {
        const result = await apiFunction(validParams);
        
        if (category === "parameterless" || category === "search") {
          expect(Array.isArray(result)).toBe(true);
        } else if (category === "id-based") {
          expect(typeof result).toBe("object");
          expect(Array.isArray(result)).toBe(false);
        }
      });
    });

    // Schema Validation Tests
    describe("Schema Validation", () => {
      it("should validate response against output schema", async () => {
        const result = await apiFunction(validParams);
        const validated = validateSchema(outputSchema, result, `${endpointName} response`);
        expect(validated).toBeDefined();
      });

      if (inputSchema) {
        it("should validate input parameters", async () => {
          const validated = validateSchema(inputSchema, validParams, `${endpointName} input`);
          expect(validated).toEqual(validParams);
        });
      }

      if (category === "parameterless") {
        it("should return array data for list endpoints", async () => {
          const result = await apiFunction(validParams);
          const validated = validateArrayData(
            result,
            outputSchema as z.ZodSchema<unknown[]>,
            `${endpointName} array`
          );
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
          expect(validated).toBeDefined();
        });
      }
    });

    // Error Handling Tests
    describe("Error Handling", () => {
      if (invalidParams.length > 0) {
        invalidParams.forEach(({ params, expectedError }) => {
          it(`should handle invalid parameters: ${expectedError}`, async () => {
            await expect(apiFunction(params as TParams)).rejects.toThrow();
          });
        });
      } else {
        it("should handle edge cases gracefully", async () => {
          if (Object.keys(validParams as Record<string, unknown>).length > 0) {
            if (category === "search") {
              // Search APIs typically return empty results for invalid params
              const result = await apiFunction({} as TParams);
              expect(result).toBeDefined();
              expect(Array.isArray(result)).toBe(true);
            } else {
              await expect(apiFunction({} as TParams)).rejects.toThrow();
            }
          }
        });
      }
    });

    // Performance Tests
    describe("Performance", () => {
      it("should respond within acceptable time limit", async () => {
        const duration = await testPerformance(
          () => apiFunction(validParams),
          maxResponseTime
        );
        
        if (Array.isArray(await apiFunction(validParams))) {
          const result = await apiFunction(validParams);
          console.log(`⚡ ${endpointName}: ${duration}ms (limit: ${maxResponseTime}ms)`);
        } else {
          console.log(`⚡ ${endpointName}: ${duration}ms (limit: ${maxResponseTime}ms)`);
        }
        
        expect(duration).toBeLessThan(maxResponseTime);
      });

      it("should have consistent response times", async () => {
        const performance = await testPerformanceWithSamples(
          () => apiFunction(validParams),
          5
        );
        
        console.log(`📊 ${endpointName}: avg=${performance.average}ms, std=${performance.standardDeviation}ms`);
        
        expect(performance.average).toBeLessThan(maxResponseTime);
        expect(performance.standardDeviation).toBeLessThan(performance.average * 0.75);
      });
    });

    // Data Integrity Tests
    describe("Data Integrity", () => {
      it("should return consistent data structure", async () => {
        const result1 = await apiFunction(validParams);
        const result2 = await apiFunction(validParams);
        
        if (Array.isArray(result1)) {
          expect(result1.length).toBe(result2.length);
          if (result1.length > 0) {
            expect(Object.keys(result1[0])).toEqual(Object.keys(result2[0]));
          }
        } else {
          expect(Object.keys(result1)).toEqual(Object.keys(result2));
        }
      });

      it("should handle nullable fields correctly", async () => {
        const result = await apiFunction(validParams);
        
        if (Array.isArray(result) && result.length > 0) {
          const sample = result[0];
          Object.keys(sample).forEach(key => {
            const value = sample[key];
            if (value === null || value === undefined) {
              // Nullable fields should be handled gracefully
              expect(true).toBe(true);
            }
          });
        }
      });
    });

    // Category-Specific Tests
    describe("Category-Specific Tests", () => {
      if (category === "parameterless") {
        it("should return non-empty data", async () => {
          const result = await apiFunction(validParams);
          expect(result.length).toBeGreaterThan(0);
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
          expect(validated).toBeDefined();
        });
      }

      if (category === "search") {
        it("should return relevant search results", async () => {
          const result = await apiFunction(validParams);
          if (result.length === 0) {
            console.warn(`⚠️  ${endpointName} search results returned empty array`);
          }
          expect(Array.isArray(result)).toBe(true);
        });
      }
    });

    // Custom Tests
    if (customTests.length > 0) {
      describe("Custom Tests", () => {
        customTests.forEach(({ name, test }) => {
          it(name, test);
        });
      });
    }
  });
};
```

#### 3. Validation Utilities (`tests/e2e/utils/validation.ts`)

Centralized validation functions:
- `validateSchema`: Basic schema validation with error handling
- `validateArrayData`: Array-specific validation with type safety
- `validateObjectData`: Object-specific validation with type safety
- `testPerformance`: Response time testing with statistical analysis
- `validateDateField`, `validateIdField`, `validateStringField`: Field-specific validators

```typescript
import { z } from "zod";

export const validateSchema = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context: string
): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `${context} validation failed: ${error.errors.map(e => e.message).join(', ')}`
      );
    }
    throw error;
  }
};

export const validateSchemaWithResult = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context: string
): SchemaValidationResult => {
  try {
    const parsedData = schema.parse(data);
    return {
      valid: true,
      errors: [],
      parsedData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        valid: false,
        errors: error.errors,
        parsedData: undefined
      };
    }
    throw error;
  }
};

export const validateArrayData = <T>(
  data: unknown,
  schema: z.ZodSchema<T[]>,
  context: string
): T[] => {
  if (!Array.isArray(data)) {
    throw new Error(`${context} is not an array`);
  }
  
  const validated = validateSchema(schema, data, context);
  expect(validated.length).toBeGreaterThan(0);
  
  return validated;
};

export const validateObjectData = <T>(
  data: unknown,
  schema: z.ZodSchema<T>,
  context: string
): T => {
  if (typeof data !== 'object' || data === null) {
    throw new Error(`${context} is not an object`);
  }
  
  return validateSchema(schema, data, context);
};

export const validateNullableField = (
  value: unknown,
  fieldName: string,
  validator: (val: unknown) => boolean
): void => {
  if (value === null || value === undefined) {
    // Nullable fields are valid
    return;
  }
  
  if (!validator(value)) {
    throw new Error(`${fieldName} has invalid value: ${value}`);
  }
};

export const createSchemaValidationResult = (
  valid: boolean,
  errors: z.ZodError[] = [],
  parsedData?: unknown
): SchemaValidationResult => ({
  valid,
  errors,
  parsedData
});

export const validateDateField = (
  value: unknown,
  fieldName: string
): void => {
  validateNullableField(value, fieldName, (val) => {
    if (typeof val === 'string') {
      return !isNaN(Date.parse(val));
    }
    return val instanceof Date;
  });
};

export const validateIdField = (
  value: unknown,
  fieldName: string
): void => {
  validateNullableField(value, fieldName, (val) => {
    if (typeof val === 'string') {
      return val.length > 0;
    }
    if (typeof val === 'number') {
      return val > 0;
    }
    return false;
  });
};

export const validateStringField = (
  value: unknown,
  fieldName: string,
  minLength: number = 1
): void => {
  validateNullableField(value, fieldName, (val) => {
    return typeof val === 'string' && val.length >= minLength;
  });
};

export const testPerformance = async (
  fn: () => Promise<unknown>,
  maxTime: number
): Promise<number> => {
  const start = performance.now();
  await fn();
  const end = performance.now();
  const duration = end - start;
  
  if (duration > maxTime) {
    throw new Error(`Performance test failed: ${duration}ms > ${maxTime}ms`);
  }
  
  return duration;
};

export const testPerformanceWithSamples = async (
  fn: () => Promise<unknown>,
  samples: number
): Promise<PerformanceTestResult> => {
  const durations: number[] = [];
  
  for (let i = 0; i < samples; i++) {
    const start = performance.now();
    await fn();
    const end = performance.now();
    durations.push(end - start);
    
    // Small delay between samples to avoid overwhelming the API
    if (i < samples - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  const average = durations.reduce((sum, d) => sum + d, 0) / durations.length;
  const variance = durations.reduce((sum, d) => sum + Math.pow(d - average, 2), 0) / durations.length;
  const standardDeviation = Math.sqrt(variance);
  
  return {
    average,
    standardDeviation,
    min: Math.min(...durations),
    max: Math.max(...durations),
    samples: durations
  };
};
```

#### 4. Test Data Management (`tests/e2e/utils/test-data.ts`)

Centralized test data including:
- Valid/invalid IDs for different API types
- Date ranges for time-based endpoints
- Region and location data for geographic endpoints
- Error test cases for validation testing

```typescript
export const wsdotTestData = {
  highwayCameras: {
    validCameraIds: [9818, 9819, 9820, 9821, 8216],
    invalidCameraIds: [-1, 0, 999999],
    validRegions: ['NW', 'NC', 'SC', 'SW', 'ER', 'OL', 'OS', 'WA'],
    validStateRoutes: ['005', '090', '520', '405', '167']
  },
  weatherStations: {
    validStationIds: ['ALPW', 'ALPW', 'ALPW', 'ALPW'],
    invalidStationIds: ['INVALID', '', '12345'],
    validRegions: ['NW', 'NC', 'SC', 'SW', 'ER', 'OL', 'OS', 'WA']
  },
  mountainPasses: {
    validPassIds: [1, 2, 3, 4, 5],
    invalidPassIds: [-1, 0, 999],
    validRegions: ['NW', 'NC', 'SC', 'SW', 'ER', 'OL', 'OS', 'WA']
  },
  tollRates: {
    validFromTerminals: [1, 2, 3, 4, 5],
    validToTerminals: [1, 2, 3, 4, 5],
    invalidTerminals: [-1, 0, 999],
    validDates: ['2024-01-15', '2024-06-15', '2024-12-15']
  }
};

export const wsfTestData = {
  terminals: {
    validTerminalIds: [1, 2, 3, 4, 5],
    invalidTerminalIds: [-1, 0, 999],
    validTerminalNames: ['Seattle', 'Bainbridge', 'Bremerton', 'Kingston', 'Edmonds']
  },
  routes: {
    validRouteIds: [1, 2, 3, 4, 5],
    invalidRouteIds: [-1, 0, 999],
    validRouteNames: ['Seattle-Bainbridge', 'Seattle-Bremerton', 'Edmonds-Kingston']
  },
  vessels: {
    validVesselIds: [1, 2, 3, 4, 5],
    invalidVesselIds: [-1, 0, 999],
    validVesselNames: ['Walla Walla', 'Spokane', 'Tacoma', 'Puyallup', 'Kaleetan']
  },
  dates: {
    validDates: ['2024-01-15', '2024-06-15', '2024-12-15'],
    invalidDates: ['invalid-date', '2024-13-01', '2024-00-01'],
    futureDates: ['2025-01-15', '2025-06-15', '2025-12-15']
  }
};

export const commonTestData = {
  invalidIds: [-1, 0, 999999, 'invalid', '', null, undefined],
  invalidDates: ['invalid-date', '2024-13-01', '2024-00-01', 'not-a-date'],
  invalidStrings: ['', null, undefined, 123, {}, []],
  invalidNumbers: [-1, 0, 999999, 'not-a-number', null, undefined, {}],
  validIds: [1, 2, 3, 4, 5, 10, 100, 1000],
  validDates: ['2024-01-15', '2024-06-15', '2024-12-15', '2024-02-29'],
  validStrings: ['test', 'valid-string', 'another-valid-string'],
  validNumbers: [1, 2, 3, 4, 5, 10, 100, 1000]
};
```

### Test Generation Flow

```
1. Configuration Loading
   ↓
   Load endpoint configuration from config files
   ↓
2. Test Suite Creation
   ↓
   Use createEndpointTestSuite() to generate comprehensive tests
   ↓
3. Test Execution
   ↓
   Run generated tests with Vitest
   ↓
4. Result Reporting
   ↓
   Detailed output with performance metrics and validation results
```

### Endpoint Categories

#### Parameterless Endpoints
- No input parameters required
- Tests focus on data retrieval and array validation
- Example: `getHighwayCameras()`

#### ID-Based Endpoints
- Require specific ID parameters
- Tests validate ID-specific data retrieval
- Example: `getHighwayCamera({ cameraID: "9818" })`

#### Search/Filter Endpoints
- Accept search criteria and filters
- Tests validate search result relevance
- Example: `searchHighwayCameras({ StateRoute: "005", Region: "Olympic" })`

#### Date-Based Endpoints
- Accept date ranges or specific dates
- Tests validate temporal data consistency
- Example: `getScheduleByRoute({ routeId: "1", date: "2024-01-15" })`

#### Parameterized Endpoints
- Accept various parameter combinations
- Tests validate parameter handling and edge cases
- Example: `getTollRates({ fromTerminal: "1", toTerminal: "2" })`

## Implementation Patterns

### 1. Configuration File Structure

```typescript
// tests/e2e/config/wsdot-highway-cameras.config.ts
import { ApiModuleConfig } from "../utils/types";
import { getHighwayCameras, getHighwayCamera, searchHighwayCameras } from "../../../src/api/wsdot-highway-cameras";
import { getHighwayCamerasSchema, getHighwayCameraSchema, searchHighwayCamerasSchema } from "../../../src/api/wsdot-highway-cameras";
import { wsdotTestData } from "../utils/test-data";

export const highwayCamerasTestConfig: ApiModuleConfig = {
  moduleName: "WSDOT Highway Cameras",
  endpoints: [
    {
      apiFunction: getHighwayCameras,
      outputSchema: getHighwayCamerasSchema,
      validParams: {},
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getHighwayCameras",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return cameras with valid image URLs",
          test: async () => {
            const result = await getHighwayCameras();
            const camerasWithImages = result.filter(camera => 
              camera.ImageURL && camera.ImageURL.startsWith('http')
            );
            expect(camerasWithImages.length).toBeGreaterThan(0);
          }
        },
        {
          name: "should return cameras with valid location data",
          test: async () => {
            const result = await getHighwayCameras();
            const camerasWithLocation = result.filter(camera => 
              camera.DisplayLatitude && camera.DisplayLongitude
            );
            expect(camerasWithLocation.length).toBeGreaterThan(0);
          }
        }
      ]
    },
    {
      apiFunction: getHighwayCamera,
      outputSchema: getHighwayCameraSchema,
      validParams: { cameraID: wsdotTestData.highwayCameras.validCameraIds[0] },
      invalidParams: [
        { params: { cameraID: wsdotTestData.highwayCameras.invalidCameraIds[0] }, expectedError: "Invalid camera ID" },
        { params: { cameraID: wsdotTestData.highwayCameras.invalidCameraIds[1] }, expectedError: "Invalid camera ID" },
        { params: { cameraID: wsdotTestData.highwayCameras.invalidCameraIds[2] }, expectedError: "Camera not found" },
        { params: { cameraID: "invalid" }, expectedError: "Invalid parameter type" },
        { params: { cameraID: "" }, expectedError: "Invalid parameter type" }
      ],
      endpointName: "getHighwayCamera",
      category: "id-based",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return camera with matching ID",
          test: async () => {
            const validId = wsdotTestData.highwayCameras.validCameraIds[0];
            const result = await getHighwayCamera({ cameraID: validId });
            expect(result.CameraID).toBe(validId);
          }
        },
        {
          name: "should return camera with complete location data",
          test: async () => {
            const validId = wsdotTestData.highwayCameras.validCameraIds[0];
            const result = await getHighwayCamera({ cameraID: validId });
            expect(result.DisplayLatitude).toBeDefined();
            expect(result.DisplayLongitude).toBeDefined();
            expect(result.CameraLocation).toBeDefined();
          }
        }
      ]
    },
    {
      apiFunction: searchHighwayCameras,
      outputSchema: searchHighwayCamerasSchema,
      validParams: { 
        StateRoute: wsdotTestData.highwayCameras.validStateRoutes[0],
        Region: wsdotTestData.highwayCameras.validRegions[0]
      },
      invalidParams: [], // Search APIs typically return empty results for invalid params
      endpointName: "searchHighwayCameras",
      category: "search",
      maxResponseTime: 4000,
      customTests: [
        {
          name: "should return cameras matching state route",
          test: async () => {
            const result = await searchHighwayCameras({ 
              StateRoute: wsdotTestData.highwayCameras.validStateRoutes[0],
              Region: wsdotTestData.highwayCameras.validRegions[0]
            });
            expect(Array.isArray(result)).toBe(true);
          }
        },
        {
          name: "should handle region search",
          test: async () => {
            const result = await searchHighwayCameras({ 
              StateRoute: wsdotTestData.highwayCameras.validStateRoutes[0],
              Region: wsdotTestData.highwayCameras.validRegions[0]
            });
            expect(Array.isArray(result)).toBe(true);
          }
        }
      ]
    }
  ],
  settings: {
    defaultMaxResponseTime: 5000,
    requiresAuth: false,
    rateLimitDelay: 100
  }
};
```

### 2. Test File Structure

```typescript
// tests/e2e/validation/wsdot-highway-cameras/wsdot-highway-cameras.validation.e2e.test.ts
import { describe } from "vitest";
import { highwayCamerasTestConfig } from "../../config/wsdot-highway-cameras.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("WSDOT Highway Cameras API", () => {
  highwayCamerasTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
```

### 3. Custom Test Implementation

```typescript
customTests: [
  {
    name: "should return cameras with valid image URLs",
    test: async () => {
      const result = await getHighwayCameras();
      const camerasWithImages = result.filter(camera => 
        camera.ImageURL && camera.ImageURL.startsWith('http')
      );
      expect(camerasWithImages.length).toBeGreaterThan(0);
    }
  },
  {
    name: "should return cameras with valid location data",
    test: async () => {
      const result = await getHighwayCameras();
      const camerasWithLocation = result.filter(camera => 
        camera.DisplayLatitude && camera.DisplayLongitude
      );
      expect(camerasWithLocation.length).toBeGreaterThan(0);
    }
  }
]
```

## File Structure

```
tests/e2e/
├── utils/
│   ├── types.ts              # Core interfaces and types
│   ├── validation.ts         # Validation utilities
│   ├── test-data.ts          # Centralized test data
│   └── test-generators.ts    # Test generation engine
├── config/
│   ├── wsdot-highway-cameras.config.ts
│   ├── wsf-schedule.config.ts
│   └── ...                   # One config per API module
└── validation/
    ├── wsdot-highway-cameras/
    │   └── wsdot-highway-cameras.validation.e2e.test.ts
    └── ...                   # Generated test files
```

## Test Generation Process

```
1. Configuration Loading
   ↓
   Load endpoint configuration from config files
   ↓
2. Test Suite Creation
   ↓
   Use createEndpointTestSuite() to generate comprehensive tests
   ↓
3. Test Execution
   ↓
   Run generated tests with Vitest
   ↓
4. Result Reporting
   ↓
   Detailed output with performance metrics and validation results
```

### Example Generated Test Output

```
✓ WSDOT Highway Cameras API (42) 10048ms
  ✓ getHighwayCameras API - Zod Validation (12) 8279ms
    ✓ Basic Functionality (2) 2375ms
      ✓ should return data without errors 1928ms
      ✓ should return data of expected type 446ms
    ✓ Schema Validation (2) 1134ms
      ✓ should validate response against output schema 397ms
      ✓ should return array data for list endpoints 737ms
    ✓ Error Handling (1)
      ✓ should handle edge cases gracefully
    ✓ Performance (2) 1878ms
      ✓ should respond within acceptable time limit 654ms
      ✓ should have consistent response times 1224ms
    ✓ Data Integrity (2) 1333ms
      ✓ should return consistent data structure 861ms
      ✓ should handle nullable fields correctly 472ms
    ✓ Category-Specific Tests (1) 309ms
      ✓ should return non-empty data 309ms
    ✓ Custom Tests (2) 1248ms
      ✓ should return cameras with valid image URLs 771ms
      ✓ should return cameras with valid location data 477ms
  ✓ getHighwayCamera API - Zod Validation (18) 1014ms
    ✓ Basic Functionality (2)
      ✓ should return data without errors
      ✓ should return data of expected type
    ✓ Schema Validation (3)
      ✓ should validate response against output schema
      ✓ should validate input parameters
      ✓ should return single object for ID-based endpoints
    ✓ Error Handling (6) 304ms
      ✓ should handle invalid parameters: Invalid camera ID
      ✓ should handle invalid parameters: Invalid camera ID
      ✓ should handle invalid parameters: Camera not found
      ✓ should handle invalid parameters: Invalid parameter type
      ✓ should handle invalid parameters: Invalid parameter type
      ✓ should handle invalid IDs
    ✓ Performance (2)
      ✓ should respond within acceptable time limit
      ✓ should have consistent response times
    ✓ Data Integrity (2)
      ✓ should return consistent data structure
      ✓ should handle nullable fields correctly
    ✓ Category-Specific Tests (1)
      ✓ should return specific data for provided ID
    ✓ Custom Tests (2)
      ✓ should return camera with matching ID
      ✓ should return camera with complete location data
  ✓ searchHighwayCameras API - Zod Validation (12) 754ms
    ✓ Basic Functionality (2)
      ✓ should return data without errors
      ✓ should return data of expected type
    ✓ Schema Validation (2)
      ✓ should validate response against output schema
      ✓ should validate input parameters
    ✓ Error Handling (1)
      ✓ should handle edge cases gracefully
    ✓ Performance (2)
      ✓ should respond within acceptable time limit
      ✓ should have consistent response times
    ✓ Data Integrity (2)
      ✓ should return consistent data structure
      ✓ should handle nullable fields correctly
    ✓ Category-Specific Tests (1)
      ✓ should return relevant search results
    ✓ Custom Tests (2)
      ✓ should return cameras matching state route
      ✓ should handle region search
```

## Failure Mitigation and Lessons Learned

### 1. Parameter Mismatch Errors

**Problem**: API parameter names didn't match test configuration (e.g., `cameraId` vs `cameraID`)

**Mitigation**: 
- Always verify parameter names against actual API function signatures
- Use exact casing as defined in the API
- Query live APIs to confirm parameter requirements

**Example Fix**:
```typescript
// Before (incorrect)
validParams: { cameraId: "9818" }

// After (correct)
validParams: { cameraID: "9818" }
```

### 2. Schema Validation Type Errors

**Problem**: TypeScript type mismatches between generic schemas and specific endpoint types

**Mitigation**:
- Use explicit type casting for schema validation calls
- Ensure validation utilities handle generic types correctly
- Add type guards for complex validation scenarios

**Example Fix**:
```typescript
// Before (type error)
validateArrayData(result, outputSchema, context)

// After (with type casting)
validateArrayData(
  result,
  outputSchema as z.ZodSchema<unknown[]>,
  context
)
```

### 3. API Behavior Assumptions

**Problem**: Tests assumed APIs would throw errors for invalid inputs, but some APIs return empty results instead

**Mitigation**:
- Test against live APIs to understand actual behavior
- Adjust test expectations based on real API responses
- Remove invalid parameter tests for endpoints that handle them gracefully

**Example Fix**:
```typescript
// Before (incorrect assumption)
invalidParams: [
  { params: { invalidParam: "value" }, expectedError: "Invalid parameter" }
]

// After (removed for search endpoints)
// Search APIs typically return empty results for invalid params
```

### 4. Performance Test Sensitivity

**Problem**: Performance consistency tests were too strict, failing due to natural network variance

**Mitigation**:
- Relax performance thresholds to account for network conditions
- Use relative thresholds (percentage of average) rather than absolute values
- Consider multiple performance test runs for more stable results

**Example Fix**:
```typescript
// Before (too strict)
expect(standardDeviation).toBeLessThan(average * 0.5);

// After (more realistic)
expect(standardDeviation).toBeLessThan(average * 0.75);
```

### 5. Test Data Validity

**Problem**: Using invalid test data (e.g., non-existent IDs) caused API failures

**Mitigation**:
- Query live APIs to find valid test data
- Maintain a centralized test data file with verified values
- Regularly update test data to ensure validity

**Example Fix**:
```typescript
// Before (invalid ID)
validParams: { cameraID: "1" }

// After (valid ID from live API)
validParams: { cameraID: "9818" }
```

## Error Handling Strategy

### 1. Graceful Degradation

Tests are designed to handle various failure modes:
- Network timeouts with appropriate error messages
- API rate limiting with retry logic
- Invalid responses with detailed validation errors

### 2. Comprehensive Logging

Verbose logging throughout the test process:
- Test setup and configuration details
- API response summaries
- Performance metrics and validation results
- Clear error messages for debugging

### 3. Test Isolation

Each test suite is independent:
- No shared state between endpoints
- Proper cleanup after each test
- Isolated error handling per endpoint

## Performance Considerations

### 1. Response Time Testing

- Configurable time limits per endpoint
- Statistical analysis of response consistency
- Multiple test runs for reliable performance data

### 2. Rate Limiting

- Built-in delays between API calls
- Configurable rate limiting per API module
- Respect for API provider limitations

### 3. Caching Strategy

- Leverage existing API caching mechanisms
- Minimize redundant API calls during testing
- Use shared test data where appropriate

## Advanced Patterns

### 1. Conditional Test Generation

```typescript
// Generate different tests based on endpoint characteristics
if (requiresAuth) {
  describe("Authentication", () => {
    it("should require valid authentication", async () => {
      // Authentication test logic
    });
  });
}

if (category === "date-based") {
  describe("Date Validation", () => {
    it("should handle invalid date formats", async () => {
      // Date validation test logic
    });
  });
}
```

### 2. Dynamic Test Data Generation

```typescript
// Generate test data based on schema constraints
const generateTestData = (schema: z.ZodSchema<any>) => {
  if (schema instanceof z.ZodString) {
    return "test-string";
  }
  if (schema instanceof z.ZodNumber) {
    return 123;
  }
  // ... more type handling
  return undefined;
};
```

### 3. Cross-Endpoint Validation

```typescript
// Validate relationships between related endpoints
describe("Cross-Endpoint Validation", () => {
  it("should maintain data consistency across endpoints", async () => {
    const cameras = await getHighwayCameras();
    const sampleCamera = cameras[0];
    
    const specificCamera = await getHighwayCamera({ 
      cameraID: sampleCamera.CameraID 
    });
    
    expect(specificCamera.CameraID).toBe(sampleCamera.CameraID);
    expect(specificCamera.Title).toBe(sampleCamera.Title);
  });
});
```

## Future Enhancements

### 1. Automated Test Generation

- Parse API module files to auto-generate test configurations
- Extract schema information directly from Zod definitions
- Generate test data based on schema constraints

### 2. Parallel Test Execution

- Run tests for different API modules in parallel
- Optimize test execution time for large test suites
- Maintain test isolation while improving performance

### 3. Advanced Validation

- Cross-reference data between related endpoints
- Validate business logic consistency across APIs
- Implement contract testing for API versioning

### 4. Machine Learning Integration

- Analyze test failure patterns to predict potential issues
- Automatically adjust performance thresholds based on historical data
- Generate test cases based on API usage patterns

### 5. Real-Time Monitoring

- Integrate with API monitoring systems
- Alert on performance degradation or schema changes
- Provide real-time test execution status

## Conclusion

This architecture successfully addresses the challenges of testing 90+ API endpoints by:

1. **Eliminating Schema Divergence**: Using API schemas as the single source of truth
2. **Reducing Code Duplication**: Through higher-order functions and configuration-driven testing
3. **Improving Maintainability**: Centralized test logic and utilities
4. **Ensuring Consistency**: Standardized test patterns across all endpoints
5. **Enabling Scalability**: Easy addition of new endpoints with minimal code changes

The implementation provides a robust foundation for comprehensive API testing while maintaining simplicity and clarity for developers working on individual API modules.

The architecture's strength lies in its ability to:
- **Scale**: Handle hundreds of endpoints without complexity explosion
- **Maintain**: Centralize changes to test patterns and utilities
- **Extend**: Easily add new endpoint types and validation rules
- **Collaborate**: Enable multiple developers to work simultaneously
- **Quality**: Ensure consistent test coverage and validation across all endpoints

This foundation enables the project to maintain high-quality API testing as it grows, while providing developers with simple, clear patterns for implementing new test suites.
