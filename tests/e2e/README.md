# E2E Testing System (Per-Endpoint Architecture)

This directory contains the end-to-end testing system for the WS-Dottie API library, following standard Vitest best practices.

## Architecture Overview

The E2E testing system follows a clean, DRY approach with one test file per endpoint:

- **Per-endpoint test files**: One file per endpoint (e.g., `wsf-vessels--fetch-vessel-basics.test.ts`)
- **DRY templates**: Reusable test templates to avoid duplication across endpoints
- **Standard Vitest patterns**: Uses normal `describe`, `it`, and `expect` without complex orchestration
- **97 active endpoints**: Each endpoint has its own test file for granular testing and easy filtering (98 total minus 1 skipped due to server-side issues)

## File Structure

```
tests/e2e/
├── api/
│   ├── wsdot-border-crossings--fetch-border-crossings.test.ts
│   ├── wsdot-bridge-clearances--fetch-bridge-clearances.test.ts
│   ├── wsdot-bridge-clearances--fetch-bridge-clearances-by-route.test.ts
│   ├── ... (one file per endpoint, 97 total)
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

### Run Specific Endpoint Tests
```bash
# Run tests for a specific endpoint
npx vitest --config tests/e2e/vitest.config.ts tests/e2e/api/wsf-vessels--fetch-vessel-basics.test.ts

# Run tests for multiple endpoints
npx vitest --config tests/e2e/vitest.config.ts tests/e2e/api/wsf-vessels--fetch-vessel-basics.test.ts tests/e2e/api/wsf-vessels--fetch-vessel-stats.test.ts

# Run tests for all endpoints in an API (using glob pattern)
npx vitest --config tests/e2e/vitest.config.ts tests/e2e/api/wsf-vessels-*.test.ts
```

### Filter Tests by Name
```bash
# Filter by test name patterns
npx vitest --config tests/e2e/vitest.config.ts --grep="fetchVesselBasics"
```

## Test Organization

Each endpoint test file follows this minimal pattern:

```typescript
import { createEndpointSuite } from "../shared/api-test-factory";

// Create the complete test suite for the endpoint
createEndpointSuite("api-name.functionName");
```

The suite name is automatically generated as `${apiName} • ${functionName}` (e.g., "wsf-vessels • fetchVesselBasics").

This provides one test file per endpoint (97 files total) for granular testing and easy filtering while keeping the code extremely DRY.

## File Naming Convention

Test files follow the pattern: `<api-name>--<function-name>.test.ts`

The double hyphen (`--`) separates the API name from the function name for clarity.

Examples:
- `wsf-vessels--fetch-vessel-basics.test.ts` - Tests for `wsf-vessels.fetchVesselBasics`
- `wsdot-toll-rates--fetch-toll-rates.test.ts` - Tests for `wsdot-toll-rates.fetchTollRates`

The function name is converted from camelCase to kebab-case (e.g., `fetchVesselBasics` → `fetch-vessel-basics`).

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