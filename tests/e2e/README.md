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
├── main.test.ts              # Main test orchestrator
├── testConfig.ts             # Test configuration and timeouts
├── testLogger.ts             # Logging utilities
├── shared/                   # Shared testing utilities
│   ├── setup.ts             # Common test setup and endpoint discovery
│   ├── testRunner.ts        # Test execution utilities
│   └── dataIntegrity.ts     # Data comparison utilities
└── tests/                   # Individual test concern modules
    ├── schema-validation.ts
    ├── parameter-handling.ts
    ├── data-structure-consistency.ts
    ├── invalid-parameters.ts
    ├── missing-parameters.ts
    ├── response-time.ts
    ├── response-consistency.ts
    ├── memory-usage.ts
    └── data-integrity.ts
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

### Orchestrated Testing

The `main.test.ts` file serves as the central orchestrator that:

1. **Discovers all endpoints** using the endpoint system
2. **Filters by module/endpoint** using environment variables
3. **Runs comprehensive tests** for each endpoint sequentially
4. **Provides detailed logging** for debugging and monitoring

### Test Execution Flow

```
1. Discovery Phase
   ├── Import all client modules
   ├── Extract endpoint objects
   └── Group by API name

2. Filtering Phase
   ├── Check TEST_MODULE environment variable
   ├── Check TEST_ENDPOINT environment variable
   └── Filter to target endpoints

3. Testing Phase
   ├── For each API (alphabetically sorted)
   │   ├── For each endpoint (alphabetically sorted)
   │   │   ├── Schema validation
   │   │   ├── Parameter handling
   │   │   ├── Data structure consistency
   │   │   ├── Invalid parameter handling
   │   │   ├── Missing parameter handling
   │   │   ├── Response time validation
   │   │   ├── Response consistency
   │   │   ├── Memory usage validation
   │   │   └── Data integrity (Zod vs native fetch)
   │   └── Log results per endpoint
   └── Log results per API
```

### Test Concerns

Each test file focuses on a single concern:

#### **API Functionality Tests**
- **`schema-validation.ts`**: Validates API responses match Zod schemas
- **`parameter-handling.ts`**: Tests different parameter types and combinations
- **`data-structure-consistency.ts`**: Ensures consistent data structures across calls

#### **Error Handling Tests**
- **`invalid-parameters.ts`**: Tests handling of invalid parameter types
- **`missing-parameters.ts`**: Tests handling of missing required parameters

#### **Performance Tests**
- **`response-time.ts`**: Validates response times are within acceptable limits
- **`response-consistency.ts`**: Tests consistency across multiple API calls
- **`memory-usage.ts`**: Tests for memory leaks in API calls

#### **Data Integrity Tests**
- **`data-integrity.ts`**: Ensures Zod and native fetch return identical results

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

### Test All Modules
```bash
npm test all
# or
npm run test:e2e
```

**Note**: The e2e tests use the `--reporter=verbose` flag to provide hierarchical test structure with individual test results visible for each API, endpoint, and test concern.npm

### Test Specific Module
```bash
npm test wsdot-highway-alerts
npm test wsf-fares
npm test wsdot-bridge-clearances
```

### Test Specific Endpoint
```bash
TEST_MODULE=wsdot-highway-alerts TEST_ENDPOINT=getAlert npm run test:e2e
```

### Direct Vitest Commands
```bash
# Test all modules
npm run test:module

# Test specific module (via environment variable)
TEST_MODULE=wsdot-highway-alerts npm run test:module
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

### Environment Variables

- **`TEST_MODULE`**: Target specific API module (e.g., "wsdot-highway-alerts")
- **`TEST_ENDPOINT`**: Target specific endpoint function (e.g., "getAlert")

### Test Configuration

Key settings in `testConfig.ts`:
- **`DEFAULT_TIMEOUT`**: 60 seconds for API requests (increased for external API variability)
- **`PARALLEL_TEST_TIMEOUT`**: 60 seconds for test execution (increased for external API variability)
- **Module filtering**: Automatic filtering based on environment variables

## Data Integrity Testing

### Advanced Comparison Logic

The data integrity testing system uses sophisticated comparison algorithms:

#### **Array Comparison as Sets**
- Arrays are compared as sets rather than ordered lists
- Order-independent comparison ensures stability for dynamic APIs
- Recursive deep equality checking for nested structures

#### **Field Whitelisting**
- Known problematic fields are automatically ignored during comparison
- Currently whitelisted fields:
  - `VesselWatchShutID`
  - `VesselWatchShutMsg`
  - `VesselWatchShutFlag`
  - `VesselWatchStatus`
  - `VesselWatchMsg`

#### **Comprehensive Error Reporting**
- Detailed difference detection with path information
- Specific error messages for type mismatches, missing fields, and array differences
- Context-aware error reporting for easier debugging

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

### **Maintainability**
- **No Hardcoding**: Endpoints are discovered automatically
- **Single Source of Truth**: Tests always match actual endpoint definitions
- **Automatic Updates**: New endpoints are automatically included in tests
- **Focused Testing**: Each test file has a single responsibility
- **Field Whitelisting**: Known issues are handled gracefully

### **Developer Experience**
- **Clear Organization**: Tests are organized by concern
- **Detailed Logging**: Comprehensive logging for debugging
- **Selective Testing**: Can test specific modules or endpoints
- **Consistent Results**: Alphabetical sorting ensures predictable test order
- **Robust Error Handling**: Detailed error messages for troubleshooting

### **Eliminates Common Issues**
- ❌ **Hardcoded endpoint lists** - endpoints are discovered dynamically
- ❌ **Generated test files** - tests are written once, run everywhere
- ❌ **Manual test maintenance** - new endpoints are automatically tested
- ❌ **File system manipulation** - tests use static imports
- ❌ **Mismatched tests** - tests always match actual API definitions
- ❌ **Order-dependent array failures** - arrays compared as sets
- ❌ **Schema evolution issues** - whitelisted fields handle API changes

## Shared Utilities

### **`shared/setup.ts`**
- Common test setup and endpoint discovery
- Module filtering logic
- Test configuration management

### **`shared/testRunner.ts`**
- Test execution utilities
- Parallel test execution patterns
- Error handling and reporting

### **`shared/dataIntegrity.ts`**
- Advanced data comparison utilities
- Set-based array comparison
- Field whitelisting for known issues
- Zod vs native fetch validation
- Response consistency checking

This architecture provides a robust, maintainable, and comprehensive testing system that automatically adapts to changes in the API structure while ensuring complete coverage and data integrity. The system handles real-world API variability through intelligent comparison algorithms and graceful handling of known schema evolution issues.