# E2E Testing System (New Architecture)

This directory contains the rearchitected end-to-end testing system for the WS-Dottie API library, following standard Vitest best practices.

## Architecture Overview

The new E2E testing system follows a clean, DRY approach that maintains the desired API → Endpoint → Test organization while avoiding code duplication:

- **API-level test files**: One file per API (e.g., `wsdot-toll-rates.test.ts`)
- **Nested organization**: Uses `describe` blocks to maintain hierarchy (API → Endpoint → Test)
- **DRY templates**: Reusable test templates to avoid duplication across endpoints
- **Standard Vitest patterns**: Uses normal `describe`, `it`, and `expect` without complex orchestration

## File Structure

```
tests/e2e/
├── api/
│   ├── wsdot-border-crossings.test.ts           # All tests for WSDOT Border Crossings API
│   ├── wsdot-bridge-clearances.test.ts          # All tests for WSDOT Bridge Clearances API
│   ├── wsdot-commercial-vehicle-restrictions.test.ts  # All tests for WSDOT Commercial Vehicle Restrictions API
│   ├── wsdot-highway-alerts.test.ts             # All tests for WSDOT Highway Alerts API
│   ├── wsdot-highway-cameras.test.ts           # All tests for WSDOT Highway Cameras API
│   ├── wsdot-mountain-pass-conditions.test.ts   # All tests for WSDOT Mountain Pass Conditions API
│   ├── wsdot-toll-rates.test.ts                 # All tests for WSDOT Toll Rates API
│   ├── wsdot-traffic-flow.test.ts               # All tests for WSDOT Traffic Flow API
│   ├── wsdot-travel-times.test.ts               # All tests for WSDOT Travel Times API
│   ├── wsdot-weather-information.test.ts         # All tests for WSDOT Weather Information API
│   ├── wsdot-weather-readings.test.ts           # All tests for WSDOT Weather Readings API
│   ├── wsdot-weather-stations.test.ts          # All tests for WSDOT Weather Stations API
│   ├── wsf-fares.test.ts                        # All tests for WSF Fares API
│   ├── wsf-schedule.test.ts                     # All tests for WSF Schedule API
│   ├── wsf-terminals.test.ts                    # All tests for WSF Terminals API
│   └── wsf-vessels.test.ts                      # All tests for WSF Vessels API
├── shared/
│   ├── test-templates.ts                         # Reusable test template functions
│   ├── api-test-factory.ts                      # API test factory function
│   ├── setup.ts                                 # Shared test setup
│   ├── helpers/
│   │   ├── data-integrity-test.ts               # Data integrity validation tests
│   │   ├── default-parameters-test.ts           # Default parameters fetching tests
│   │   ├── default-parameters-validation-test.ts # Default parameters Zod schema validation tests
│   │   ├── error-handling-test.ts               # Error handling tests
│   │   ├── fetch-real-data-test.ts              # Real data fetching tests (with/without validation)
│   │   ├── missing-parameters-test.ts           # Missing parameters validation tests
│   │   └── ...                                  # Additional test helpers
│   └── utils.ts                                 # Shared utilities
├── vitest.config.ts                             # Test configuration
└── README.md                                   # This documentation
```

## Running Tests

### Run All Tests
```bash
npm run test:e2e
# or
npx vitest --config tests/e2e/vitest.config.ts
```

### Run Specific API Tests
```bash
# Run tests for a specific API
npx vitest --config tests/e2e/vitest.config.ts tests/e2e/api/wsdot-toll-rates.test.ts

# Run tests for multiple APIs
npx vitest --config tests/e2e/vitest.config.ts tests/e2e/api/wsdot-toll-rates.test.ts tests/e2e/api/wsdot-highway-alerts.test.ts
```

### Filter Tests by Name
```bash
# Filter by test name patterns
npx vitest --config tests/e2e/vitest.config.ts --grep="getTollRates"
```

## Test Organization

Each API test file follows this minimal pattern:

```typescript
import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for the API
createApiTestSuite("api-name", "API Description");
```

This maintains the hierarchical structure in test reports while keeping the code extremely DRY.

## Standard Test Coverage

Each endpoint receives the following standard tests:
- Basic fetch functionality with default parameters
- Real data fetching (with and without validation)
- Data integrity validation
- Error handling with invalid parameters
- Missing URL parameters validation
- Default parameters Zod schema validation

## Benefits

- **DRY Principle**: No code duplication across hundreds of endpoints
- **Clear Organization**: Maintains API → Endpoint → Test hierarchy
- **Standard Vitest**: Uses normal Vitest patterns and reporters
- **Easy Filtering**: Supports API and endpoint level filtering
- **Maintainable**: Simple structure that's easy to extend and maintain