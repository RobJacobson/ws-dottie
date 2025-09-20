# E2E Testing

This directory contains end-to-end tests for the WS-Dottie API library.

## Test Architecture

The e2e tests use a **dynamic discovery system** that automatically finds all API endpoints from the `src/shared/endpoints.ts` file. This ensures that:

- ✅ **No hardcoding** - endpoints are discovered at runtime
- ✅ **Single source of truth** - file system structure determines what gets tested
- ✅ **No mismatches** - tests always match the actual endpoint definitions
- ✅ **Automatic updates** - new endpoints are automatically included in tests

## File Structure

```
tests/e2e/
├── apiE2e.test.ts (160 lines) - Main test suite
├── dataIntegrityHelpers.ts (130 lines) - Data comparison utilities
├── testLogger.ts (152 lines) - Logging utilities
├── testConfig.ts (40 lines) - Configuration
└── README.md - This documentation
```

## Running Tests

### Test All Modules
```bash
npm test all
# or
npm run test:e2e
```

### Test Specific Module
```bash
npm test wsdot-highway-alerts
npm test wsf-fares
npm test wsdot-bridge-clearances
```

### Direct Vitest Commands
```bash
# Test all modules
npm run test:module

# Test specific module (via environment variable)
TEST_MODULE=wsdot-highway-alerts npm run test:module
```

## Available Modules

- **WSDOT APIs**: wsdot-border-crossings, wsdot-bridge-clearances, wsdot-commercial-vehicle-restrictions, wsdot-highway-alerts, wsdot-highway-cameras, wsdot-mountain-pass-conditions, wsdot-toll-rates, wsdot-traffic-flow, wsdot-travel-times, wsdot-weather-information, wsdot-weather-information-extended, wsdot-weather-stations
- **WSF APIs**: wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels

## Test Structure

The main test suite (`apiE2e.test.ts`) includes:

1. **Functional Tests** - Test actual API calls with real endpoints
2. **Data Integrity Tests** - Compare zod vs native fetch results for consistency
3. **Parallel Execution** - Test multiple endpoints concurrently for performance
4. **Comprehensive Reporting** - API success rate + data integrity success rate

## How It Works

1. **Discovery**: `discoverEndpoints()` scans all client modules and builds a registry
2. **Filtering**: Environment variable `TEST_MODULE` filters to specific modules
3. **Testing**: Tests iterate over discovered endpoints dynamically
4. **Data Integrity**: Each endpoint is tested for consistency between zod and native fetch

## Key Features

- **Quality over Quantity**: Single comprehensive test that validates real functionality
- **Real API Testing**: Makes actual HTTP requests to test endpoints
- **Data Integrity**: Ensures zod and native fetch return identical results
- **Parallel Execution**: Tests multiple endpoints simultaneously for performance
- **Dynamic Discovery**: Automatically includes new endpoints without manual updates

This approach eliminates the need for:
- ❌ Hardcoded endpoint lists
- ❌ Generated test files
- ❌ Manual test maintenance
- ❌ File system manipulation during tests