# E2E Testing System

This directory contains the comprehensive end-to-end testing system for the WS-Dottie API library. The testing architecture uses a **dynamic discovery system** that automatically discovers all API endpoints from the endpoint system, ensuring complete coverage without manual maintenance.

## Architecture Overview

The E2E testing system is built on top of the unified endpoint system defined in `src/shared/endpoints.ts`. This creates a powerful synergy where:

- **Endpoints are discovered automatically** from client modules
- **Tests run against real API endpoints** with actual HTTP requests
- **Schema validation ensures data integrity** between Zod and native fetch
- **Single source of truth** eliminates mismatches between tests and actual API definitions

### Key Components

```
tests/e2e/
├── shared/
│   ├── config.ts                    # Test configuration and timeouts
│   ├── logger.ts                    # Logging utilities
│   ├── setup.ts                     # Test setup utilities
│   └── utils.ts                     # Shared utilities
├── testRunner.ts                    # Parallel test execution utilities
├── setupUtils.ts                    # Common test setup and endpoint discovery
└── tests/                          # Consolidated test concern modules
    ├── parameter-validation.ts         # Comprehensive parameter validation (valid/invalid/missing)
    ├── schema-and-consistency-validation.ts  # Schema compliance and temporal consistency
    ├── default-parameters.ts           # CLI functionality testing
    ├── fetch-data.ts                 # Basic data fetching tests
    └── data-integrity.ts               # Fetch mode consistency (Zod vs native)
```

## Endpoint System Integration

### How Endpoints Are Discovered

The testing system leverages the endpoint discovery mechanism from `src/shared/endpoints.ts`:

1. **Static Imports**: All client modules are statically imported
2. **Endpoint Extraction**: Each client module exports endpoint objects created with `defineEndpoint()`
3. **Automatic Grouping**: Endpoints are automatically grouped by API name
4. **Runtime Discovery**: Tests discover available endpoints at runtime

### Endpoint Structure

Each endpoint is defined using the `defineEndpoint()` factory function with:

```typescript
{
  id: "api-name/function-name",           // Unique identifier
  endpoint: "/api/path",                  // HTTP endpoint path
  inputSchema: zodInputSchema,           // Zod schema for input validation
  outputSchema: zodOutputSchema,         // Zod schema for output validation
  sampleParams: { /* sample data */ },   // Sample parameters for testing
 cacheStrategy: CacheStrategy           // Caching configuration
}
```

The factory automatically enriches this with computed properties:
- `api`: API group name (extracted from id)
- `functionName`: Function name (extracted from id)
- `urlTemplate`: Complete URL with domain

## Test Architecture

### Sequential Test Execution

Each test file in the `tests/` directory runs **all endpoints sequentially** within a single test case. This provides:

1. **Sequential Execution**: Tests run endpoints one after another for consistent API testing
2. **Independent Operation**: Each test file can be run without dependencies
3. **Flexible Targeting**: Users can specify which API and which test to run
4. **Configurable Filtering**: Command line options control which endpoints are tested

### Test Execution Flow

```
1. Discovery Phase
   ├── Import all client modules
   ├── Extract endpoint objects
   └── Group by API name

2. Filtering Phase
   ├── Check --api CLI option
   └── Filter to target API

3. Sequential Execution Phase
   ├── For each matching API
   │   ├── Discover all endpoints for the API
   │   ├── Execute test function across all endpoints sequentially
   │   └── Report results per endpoint
   └── Log summary results
```

### Test Concerns

Each test file focuses on a specific concern with clear separation:

#### **Parameter Validation**
- **`parameter-validation.ts`**: Comprehensive parameter testing including valid parameters, invalid parameter rejection, and missing parameter handling

#### **Schema & Consistency Validation**
- **`schema-and-consistency-validation.ts`**: Validates API responses match Zod schemas and ensures consistent data structures across multiple calls

#### **Data Integrity**
- **`data-integrity.ts`**: Ensures Zod schema validation and native fetch return identical results (fetch mode consistency)

#### **Integration Testing**
- **`default-parameters.ts`**: Tests CLI functionality with default parameters

## Client-Schema Integration

### Schema Organization

Schemas are organized in `src/schemas/` with a consistent structure:

```
src/schemas/api-name/
├── index.ts              # Re-exports all schemas
├── entity.zod.ts         # Individual entity schemas
├── input.zod.ts          # Input parameter schemas
└── output.zod.ts         # Output response schemas
```

### Type Safety

The system ensures type safety through:

1. **Zod Schema Validation**: All inputs and outputs are validated against Zod schemas
2. **TypeScript Integration**: Client files import types directly from schema files
3. **Endpoint Type Inference**: Endpoint types are inferred from schema definitions
4. **Runtime Validation**: Actual API responses are validated against schemas

### Client Module Structure

Each client module follows this pattern:

```typescript
// Individual endpoint files (e.g., getAlert.ts)
export const getAlertMeta = {
  id: "wsdot-highway-alerts/getAlert",
  endpoint: "/api/highway-alerts/{AlertID}",
  inputSchema: AlertInputSchema,
  outputSchema: HighwayAlertSchema,
  sampleParams: { AlertID: "12345" },
  cacheStrategy: "stale-while-revalidate"
};

// Index file exports endpoints
export const getAlert = defineEndpoint(getAlertMeta);
```

## Running Tests

### Run All Tests
```bash
npm run test:e2e
# or
npm run test:module
```

### Run Individual Test Files

**⚠️ IMPORTANT: Always use the vitest config when running individual test files**

#### Run Specific Test Files
```bash
# Run default parameters tests across all endpoints
npx vitest --config config/vitest.config.ts --run tests/e2e/tests/default-parameters.ts

# Run comprehensive parameter validation tests across all endpoints
npx vitest --config config/vitest.config.ts --run tests/e2e/tests/parameter-validation.ts

# Run schema and consistency validation tests across all endpoints
npx vitest --config config/vitest.config.ts --run tests/e2e/tests/schema-and-consistency-validation.ts

# Run data integrity tests across all endpoints (Zod vs native fetch consistency)
npx vitest --config config/vitest.config.ts --run tests/e2e/tests/data-integrity.ts
```

#### Target Specific API with Individual Test
```bash
# Run default parameters for a specific API using CLI option
npx vitest --config config/vitest.config.ts --run tests/e2e/tests/default-parameters.ts -- --api wsdot-highway-alerts

# Run parameter validation for a specific API using CLI option
npx vitest --config config/vitest.config.ts --run tests/e2e/tests/parameter-validation.ts -- --api wsf-terminals

# Run schema and consistency validation for a specific API using CLI option
npx vitest --config config/vitest.config.ts --run tests/e2e/tests/schema-and-consistency-validation.ts -- --api wsdot-highway-cameras
```

### Run Individual Test Files (Legacy Examples)
```bash
# Run comprehensive parameter validation tests across all endpoints
npx vitest tests/e2e/tests/parameter-validation.ts

# Run schema and consistency validation tests across all endpoints
npx vitest tests/e2e/tests/schema-and-consistency-validation.ts

# Run data integrity tests across all endpoints
npx vitest tests/e2e/tests/data-integrity.ts
```

### Target Specific API
```bash
# Run schema validation for a specific API using CLI option
npx vitest tests/e2e/tests/schema-and-consistency-validation.ts -- --api wsdot-highway-alerts

# Run parameter handling for a specific API using CLI option
npx vitest tests/e2e/tests/parameter-validation.ts -- --api wsf-fares

```

### Test All Modules with Specific Test Type
```bash
# Run all schema validation tests across all APIs
npx vitest tests/e2e/tests/schema-and-consistency-validation.ts -- --api all

# Run all parameter handling tests across all APIs
npx vitest tests/e2e/tests/parameter-validation.ts -- --api all

```

## Available APIs

The system automatically tests all available APIs:

### **WSDOT APIs**
- `wsdot-border-crossings` - Border crossing wait times
- `wsdot-bridge-clearances` - Bridge clearance heights
- `wsdot-commercial-vehicle-restrictions` - Commercial vehicle restrictions
- `wsdot-highway-alerts` - Highway alerts and incidents
- `wsdot-highway-cameras` - Highway camera feeds
- `wsdot-mountain-pass-conditions` - Mountain pass conditions
- `wsdot-toll-rates` - Toll rate information
- `wsdot-traffic-flow` - Traffic flow data
- `wsdot-travel-times` - Travel time estimates
- `wsdot-weather-information` - Weather information
- `wsdot-weather-information-extended` - Extended weather data
- `wsdot-weather-stations` - Weather station data

### **WSF APIs**
- `wsf-fares` - Ferry fare information
- `wsf-schedule` - Ferry schedules
- `wsf-terminals` - Ferry terminal information
- `wsf-vessels` - Ferry vessel information

## Configuration

### CLI Options

- **`--api` or `-a`**: Target specific API module (e.g., "wsdot-highway-alerts") or "all" for all modules

### Test Configuration

Key settings in `shared/config.ts`:
- **`DEFAULT_TIMEOUT`**: 60 seconds for API requests (increased for external API variability)
- **`PARALLEL_TEST_TIMEOUT`**: 60 seconds for test execution (increased for external API variability)
- **Module filtering**: Automatic filtering based on CLI options

**Timeout Settings:**
- **Vitest test timeout**: 10 minutes (600,000ms) - configured in `config/vitest.config.ts`
- **Individual API call timeout**: 60 seconds - configured in test files
- **Total execution time**: Varies based on number of APIs/endpoints being tested

### Data Integrity Testing

The data integrity testing system uses sophisticated comparison algorithms with the help of the `fast-deep-equal` library:

#### **Order-Independent Comparison**
- Arrays are compared as sets rather than ordered lists
- Order-independent comparison ensures stability for dynamic APIs
- Recursive deep equality checking for nested structures

#### **Field Filtering**
- Known problematic fields are automatically ignored during comparison
- Currently filtered fields:
 - `VesselWatchShutID`
 - `VesselWatchShutMsg`
 - `VesselWatchShutFlag`
 - `VesselWatchStatus`
 - `VesselWatchMsg`
 - `TimeUpdated` (timestamps change between API calls)

#### **Simple Error Reporting**
- Basic difference detection
- Clear error messages for data integrity mismatches

### Data Integrity Test Flow

```
1. Parallel Execution
   ├── Fetch data using Zod schema validation
   └── Fetch data using native fetch

2. Comparison Phase
   ├── Deep equality check with set-based array comparison
   ├── Field filtering (ignore whitelisted fields)
   └── Recursive comparison of nested structures

3. Error Reporting
   ├── Success: Data integrity validation passed
   └── Failure: Detailed difference report with path information
```

## Benefits

### **Quality Assurance**
- **Real API Testing**: Makes actual HTTP requests to live endpoints
- **Data Integrity**: Ensures Zod and native fetch return identical results
- **Schema Validation**: Validates all responses against Zod schemas
- **Performance Monitoring**: Tracks response times and memory usage
- **Advanced Comparison**: Handles dynamic APIs with order-independent array comparison

### **Performance & Flexibility**
- **Sequential Execution**: Tests run across endpoints sequentially for consistent API testing
- **Independent Operation**: Each test file runs independently without dependencies
- **Selective Targeting**: Users can run specific tests on specific APIs/endpoints
- **Efficient Execution**: Tests are organized for effective endpoint coverage
- **Reliable Completion**: Tests complete properly without vitest hanging or CPU issues

### **Maintainability**
- **No Hardcoding**: Endpoints are discovered automatically
- **Single Source of Truth**: Tests always match actual endpoint definitions
- **Automatic Updates**: New endpoints are automatically included in tests
- **Focused Testing**: Each test file has a single responsibility
- **Field Whitelisting**: Known issues are handled gracefully

### **Developer Experience**
- **Clear Organization**: Tests are organized by concern
- **Detailed Logging**: Comprehensive logging for debugging (all output to stdout)
- **Flexible Execution**: Can run all tests or specific tests as needed
- **Consistent Results**: Predictable test execution and reporting
- **Clean Output**: All test logging uses stdout for consistent test framework integration
- **Robust Error Handling**: Detailed error messages for troubleshooting

### **Addresses Common Issues**
- ✅ **Dynamic endpoint discovery** - endpoints are discovered automatically from API definitions
- ✅ **Independent test execution** - each test file runs independently
- ✅ **Automatic test inclusion** - new endpoints are automatically included in tests
- ✅ **Order-independent comparisons** - arrays compared as sets for stable testing
- ✅ **Schema evolution handling** - whitelisted fields handle known API changes
- ✅ **Flexible API targeting** - control over which APIs/endpoints to test
- ✅ **Vitest hanging resolved** - tests complete properly without vitest remaining open

## Shared Utilities

### **`shared/config.ts`**
- Test configuration and timeouts
- Module filtering logic
- Configuration management for API targeting

### **`shared/logger.ts`**
- Centralized logging utilities
- Test result formatting
- Performance metrics logging

### **`shared/setup.ts`**
- Centralized test suite setup
- Test function registration
- Configuration integration

### **`shared/utils.ts`**
- CLI command execution utilities
- Data validation and checking functions
- Common utility functions

### **`setupUtils.ts`**
- Common test setup and endpoint discovery
- Module filtering logic
- Test configuration management

### **`testRunner.ts`**
- Parallel test execution utilities
- Configuration handling for API/endpoint targeting
- Asynchronous test execution within Vitest framework

This architecture provides a robust, maintainable, and comprehensive testing system that automatically adapts to changes in the API structure while ensuring complete coverage and data integrity. The system handles real-world API variability through intelligent comparison algorithms and graceful handling of known schema evolution issues. Each test file can run independently with sequential execution across all endpoints, providing reliable completion and proper vitest cleanup.