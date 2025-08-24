# Testing Architecture

## Overview

This document describes the testing architecture for the WSDOT/WSF API library, which provides access to 90+ endpoints across 16 API modules from Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF). Each API module represents a distinct service area (e.g., Highway Cameras, Weather Information, Ferry Schedules) and contains anywhere from one to several dozen individual endpoints. The testing strategy addresses the unique challenges of working with government APIs that have inconsistent data quality, loose documentation, and evolving schemas.

## Problem Statement

### Challenges with Government API Testing

The WSDOT/WSF APIs present several testing challenges that traditional approaches struggle to address:

1. **Data Quality Inconsistency**: Government APIs often return malformed data, missing fields, or inconsistent structures that don't match their documentation.

2. **Loose Documentation**: API documentation is frequently outdated, incomplete, or contains errors, making it unreliable for test development.

3. **Schema Evolution**: APIs change without notice, breaking existing integrations and requiring constant test maintenance.

4. **Scale Complexity**: With 90+ endpoints across 16 modules, maintaining individual test suites for each endpoint becomes unmanageable. Each module can contain 1-30+ endpoints, creating a complex testing matrix.

5. **Type Safety**: JavaScript-based testing lacks compile-time validation, leading to runtime errors and false positives.

### Previous Approach Failures

Our initial testing approach attempted to create individual test suites for each endpoint, resulting in:

- **Maintenance Chaos**: 90+ separate test files with duplicated logic
- **Schema Drift**: Test schemas diverged from actual API schemas over time
- **Inconsistent Coverage**: Some endpoints had comprehensive tests while others had minimal validation
- **False Positives**: Tests passed when APIs were actually broken due to schema mismatches

### File Structure Evolution

Our development approach also evolved significantly, which directly improved our testing capabilities:

**Previous Structure (Chaotic)**:
- One file for every fetch call
- One file for every input schema  
- One file for every output schema
- One file for every TanStack Query hook

**Current Structure (Organized)**:
- One file per endpoint containing:
  - Fetch call with `zodFetch`
  - Input schema
  - Output schema  
  - TanStack Query hook

This consolidation provided better visibility into the complete contract for each endpoint, making it easier to understand what tests were required and ensuring schema consistency between the API implementation and testing layer.

### File Structure Comparison

```
Previous Structure (Chaotic)                    Current Structure (Organized)
┌─────────────────────────────────────┐        ┌─────────────────────────────────────┐
│ src/api/wsdot-highway-cameras/     │        │ src/api/wsdot-highway-cameras/       │
│ ├── fetch/                          │        │ ├── getHighwayCameras.ts            │
│ │   ├── getHighwayCameras.ts        │        │ │   ├── API function                │
│ │   └── searchHighwayCameras.ts     │        │ │   ├── Input schema                │
│ ├── schemas/                        │        │ │   ├── Output schema               │
│ │   ├── input/                      │        │ │   └── TanStack Query hook        │
│ │   │   ├── getHighwayCameras.ts    │        │ ├── searchHighwayCameras.ts        │
│ │   │   └── searchHighwayCameras.ts │        │ │   ├── API function                │
│ │   └── output/                     │        │ │   ├── Input schema                │
│ │       ├── getHighwayCameras.ts    │        │ │   ├── Output schema               │
│ │       └── searchHighwayCameras.ts │        │ │   └── TanStack Query hook        │
│ └── hooks/                          │        │ └── index.ts                        │
│     ├── useHighwayCameras.ts        │        │                                     │
│     └── useSearchHighwayCameras.ts  │        │                                     │
└─────────────────────────────────────┘        └─────────────────────────────────────┘

Tests Structure (Organized)
┌─────────────────────────────────────┐
│ tests/e2e/                          │
│ ├── config/                         │
│ │   └── wsdot-highway-cameras.config.ts
│ └── validation/                     │
│     └── wsdot-highway-cameras/      │
│         └── wsdot-highway-cameras.validation.e2e.test.ts
└─────────────────────────────────────┘
```

**Benefits of Current Structure**:
- **Single Source of Truth**: Each endpoint's complete contract is in one file
- **Easier Testing**: Test developers can see the full API contract at a glance
- **Better Maintenance**: Changes to an endpoint are contained in one file
- **Schema Consistency**: Input/output schemas are co-located with their implementation
- **Reduced Import Complexity**: Simpler import paths and fewer circular dependency issues

## Solution Architecture

### Core Principles

1. **Single Source of Truth**: Use Zod schemas from the API layer as the authoritative contract for all testing
2. **Configuration-Driven**: Define test requirements through configuration objects rather than imperative code
3. **Higher-Order Functions**: Generate comprehensive test suites through reusable factory functions
4. **Type Safety**: Leverage TypeScript and Zod for compile-time validation and runtime type checking
5. **Maintainability**: Centralize test logic to enable consistent updates across all endpoints

### Technology Stack

- **TypeScript**: Provides compile-time type safety and IntelliSense
- **Zod**: Runtime schema validation with TypeScript integration
- **Vitest**: Fast, modern testing framework with TypeScript support
- **Higher-Order Functions**: Reusable test generators that eliminate code duplication

## Architecture Components

### 1. API Module Structure

The library is organized into 16 distinct API modules, each representing a different service area:

- **WSDOT Highway Cameras**: 3 endpoints (get all cameras, get specific camera, search cameras)
- **WSDOT Weather Information**: 3 endpoints (get all weather, get by station ID, get for multiple stations)
- **WSDOT Toll Rates**: 5 endpoints (get rates, get trip info, get trip rates, get version, get by date)
- **WSF Schedule**: 30+ endpoints (routes, terminals, sailings, alerts, etc.)
- **WSF Terminals**: 15 endpoints (basics, locations, bulletins, sailing space, transports, etc.)
- **WSF Vessels**: 15 endpoints (basics, locations, stats, accommodations, history, etc.)

Each module contains related endpoints that share common schemas, authentication methods, and base URLs. This organization allows us to apply consistent testing patterns while accommodating the specific requirements of each service area.

### 2. Configuration Layer

Each API module defines its testing requirements through a configuration object:

```typescript
export const apiModuleTestConfig: ApiModuleConfig = {
  moduleName: "API Module Name",
  endpoints: [
    {
      apiFunction: importedFunction,
      outputSchema: importedSchema,
      validParams: { /* valid parameters */ },
      invalidParams: [ /* invalid parameter tests */ ],
      endpointName: "functionName",
      category: "endpoint-category",
      maxResponseTime: 5000,
      customTests: [ /* endpoint-specific tests */ ]
    }
  ],
  settings: {
    defaultMaxResponseTime: 5000,
    requiresAuth: false,
    rateLimitDelay: 100
  }
};
```

### 2. Test Generation Engine

The `createEndpointTestSuite` higher-order function generates comprehensive test suites based on endpoint configuration:

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
  // Generates 15+ tests automatically based on endpoint category
  // Includes: basic functionality, schema validation, error handling,
  // performance testing, data integrity, and custom tests
};
```

### 3. Test Categories

Tests are automatically generated based on endpoint category:

- **Parameterless**: Endpoints with no input parameters (e.g., `getAllHighwayCameras`)
- **ID-based**: Endpoints requiring specific identifiers (e.g., `getHighwayCamera({ cameraID: "9818" })`)
- **Date-based**: Endpoints accepting date ranges (e.g., `getScheduleByRoute({ date: "2024-01-15" })`)
- **Search**: Endpoints with filter parameters (e.g., `searchHighwayCameras({ Region: "NW" })`)
- **Parameterized**: Complex endpoints with multiple parameter combinations

### 4. Validation Utilities

Centralized validation functions provide consistent testing across all endpoints:

```typescript
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
```

## Implementation Example

### Configuration File

```typescript
// tests/e2e/config/wsdot-highway-cameras.config.ts
export const highwayCamerasTestConfig: ApiModuleConfig = {
  moduleName: "WSDOT Highway Cameras",
  endpoints: [
    {
      apiFunction: getHighwayCameras,
      outputSchema: cameraArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
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
        }
      ]
    }
  ]
};
```

### Test File

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

## Generated Test Structure

Each endpoint automatically receives a comprehensive test suite:

```
✓ getHighwayCameras API - Zod Validation (15 tests)
  ✓ Basic Functionality (2 tests)
    ✓ should return data without errors
    ✓ should return data of expected type
  ✓ Schema Validation (2 tests)
    ✓ should validate response against output schema
    ✓ should return array data for list endpoints
  ✓ Error Handling (1 test)
    ✓ should handle edge cases gracefully
  ✓ Performance (1 test)
    ✓ should respond within acceptable time limit
  ✓ Data Integrity (2 tests)
    ✓ should return consistent data structure
    ✓ should handle nullable fields correctly
  ✓ Category-Specific Tests (1 test)
    ✓ should return non-empty data
  ✓ Custom Tests (6 tests)
    ✓ [Endpoint-specific business logic tests]
```

## Benefits of This Architecture

### 1. Maintainability

- **Centralized Logic**: Test patterns are defined once and reused across all endpoints
- **Consistent Updates**: Changes to test logic automatically apply to all endpoints
- **Reduced Duplication**: Eliminates the need to copy-paste test code between endpoints

### 2. Scalability

- **Easy Addition**: New endpoints require only configuration, not test code
- **Consistent Coverage**: All endpoints automatically receive comprehensive testing
- **Predictable Structure**: Developers know exactly what tests will be generated

### 3. Reliability

- **Schema Consistency**: Tests always validate against current API schemas
- **Type Safety**: TypeScript compilation catches configuration errors
- **Runtime Validation**: Zod ensures data integrity during test execution

### 4. Developer Experience

- **Clear Patterns**: Configuration-driven approach is easy to understand and modify
- **IntelliSense**: Full TypeScript support for configuration objects
- **Fast Feedback**: Vitest provides rapid test execution and clear error messages

## Extending the Testing Framework

### Adding New Endpoints

1. **Update Configuration**: Add endpoint configuration to the module's config file
2. **Define Custom Tests**: Add endpoint-specific validation logic to the `customTests` array
3. **Run Tests**: Execute the test suite to validate the new endpoint

### Adding New Test Categories

1. **Extend Types**: Add new category types to the `EndpointTestConfig` interface
2. **Update Generator**: Modify `createEndpointTestSuite` to handle the new category
3. **Add Validation**: Implement category-specific validation logic

### Custom Validation Logic

```typescript
customTests: [
  {
    name: "should validate business rule X",
    test: async () => {
      const result = await apiFunction(validParams);
      // Custom validation logic specific to this endpoint
      expect(result).toSatisfy(businessRuleX);
    }
  }
]
```

## Testing Execution

### Running Individual Modules

```bash
# Test specific API module
npx vitest run tests/e2e/validation/wsdot-highway-cameras/ --config config/vitest.e2e.api.config.ts

# Test with verbose output
npx vitest run tests/e2e/validation/wsdot-highway-cameras/ --reporter=verbose --config config/vitest.e2e.api.config.ts
```

### Running All Tests

```bash
# Execute complete e2e test suite
npm run test:e2e:validation

# Run with performance monitoring
npm run test:e2e:validation:performance
```

### Test Output Example

```
✓ WSDOT Highway Cameras API (42 tests) 10.0s
  ✓ getHighwayCameras API - Zod Validation (15 tests) 8.3s
    ✓ Basic Functionality (2 tests) 2.4s
    ✓ Schema Validation (2 tests) 1.1s
    ✓ Error Handling (1 test) 0.1s
    ✓ Performance (1 test) 1.9s
    ✓ Data Integrity (2 tests) 1.3s
    ✓ Category-Specific Tests (1 test) 0.3s
    ✓ Custom Tests (6 tests) 1.2s
```

## Performance Considerations

### Response Time Testing

- **Configurable Limits**: Each endpoint defines its own performance expectations
- **Statistical Analysis**: Tests measure response time consistency across multiple runs
- **Realistic Thresholds**: Performance limits account for network conditions and API variability

### Rate Limiting

- **Built-in Delays**: Configuration-driven delays prevent API rate limit violations
- **Respectful Testing**: Tests are designed to be good API citizens
- **Configurable Timing**: Each module can define appropriate delay intervals

## Error Handling Strategy

### Graceful Degradation

- **Network Failures**: Tests handle timeouts and connection issues gracefully
- **API Errors**: Invalid responses are caught and reported with clear error messages
- **Schema Violations**: Zod validation errors provide detailed information about data problems

### Debugging Support

- **Verbose Logging**: Comprehensive test execution logs for troubleshooting
- **Clear Error Messages**: Specific error information for failed validations
- **Performance Metrics**: Response time data for performance analysis

## Future Enhancements

### Automated Test Generation

- **Schema Parsing**: Extract test requirements directly from Zod schema definitions
- **API Discovery**: Automatically detect new endpoints and generate test configurations
- **Smart Test Data**: Generate appropriate test data based on schema constraints

### Advanced Validation

- **Cross-Endpoint Consistency**: Validate data relationships between related endpoints
- **Business Logic Testing**: Automated validation of complex business rules
- **Contract Testing**: Ensure API version compatibility and backward compatibility

### Integration Features

- **CI/CD Integration**: Automated testing in deployment pipelines
- **Performance Monitoring**: Track API performance trends over time
- **Alerting**: Notify developers of API changes or performance degradation

## Conclusion

This testing architecture successfully addresses the challenges of testing government APIs by providing:

1. **Scalable Testing**: 90+ endpoints tested with consistent coverage
2. **Maintainable Code**: Centralized logic eliminates duplication and maintenance overhead
3. **Type Safety**: TypeScript and Zod ensure reliable validation and error detection
4. **Developer Experience**: Configuration-driven approach simplifies test development and maintenance
5. **Reliability**: Tests always validate against current API schemas, preventing false positives

The architecture's strength lies in its ability to scale from individual endpoints to complete API modules while maintaining consistency, reliability, and developer productivity. By leveraging higher-order functions and configuration-driven testing, we've created a framework that grows with the API library while providing the robust validation needed for production use.

This foundation enables developers to confidently use the WSDOT/WSF API library, knowing that all endpoints are thoroughly tested and validated against their current schemas. The testing framework also provides a template for extending testing to new API modules or custom validation requirements.
