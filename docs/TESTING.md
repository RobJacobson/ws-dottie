# Testing Guide

WS-Dottie includes comprehensive testing infrastructure to ensure reliability across different environments and use cases.

## 🧪 Test Categories

### Unit Tests
- **Purpose**: Test individual functions and utilities in isolation
- **Environment**: Node.js with mocked dependencies
- **Command**: `npm run test:unit`

### End-to-End Tests
- **Purpose**: Test live API integration with real WSDOT/WSF endpoints
- **Environment**: Node.js with real network requests
- **Command**: `npm run test:e2e:validation`

### JSONP Tests
- **Purpose**: Test browser environment compatibility and CORS bypass
- **Environment**: Happy-DOM (browser simulation)
- **Command**: `npm run test:e2e:validation:jsonp`

### React Hook Tests
- **Purpose**: Test TanStack Query integration and React hooks
- **Environment**: JSDOM with React Testing Library
- **Command**: `npm run test:e2e:hook`

## 🚀 Quick Start

```bash
# Run all tests
npm test

# Run specific test categories
npm run test:unit                    # Unit tests only
npm run test:e2e:validation         # E2E tests (Node.js)
npm run test:e2e:validation:jsonp   # E2E tests (Browser/JSONP)
npm run test:e2e:hook               # React hook tests

# Watch mode for development
npm run test:e2e:validation:watch
npm run test:e2e:validation:jsonp:watch
```

## 🔧 JSONP Testing Feature Flag

WS-Dottie supports testing in browser-like environments using the `--jsonp` flag. This is essential for validating that the library works correctly in web browsers where CORS restrictions apply.

### What JSONP Testing Does

1. **Browser Environment Simulation**: Uses Happy-DOM to simulate browser APIs
2. **JSONP Strategy Validation**: Tests that JSONP requests work correctly
3. **CORS Bypass Testing**: Ensures the library can work around CORS restrictions
4. **Extended Timeouts**: Automatically increases timeouts for slower JSONP requests

### Usage

#### Command Line Flag (Recommended)
```bash
# Run all e2e tests with JSONP (environment variable)
npm run test:e2e:validation:jsonp

# Run all e2e tests with JSONP (command line flag)
npm run test:e2e:validation:jsonp:flag

# Run specific test file with JSONP flag
node scripts/test-jsonp.js --config config/vitest.e2e.api.config.ts tests/e2e/validation/wsf-vessels/ --jsonp

# Watch mode with JSONP
npm run test:e2e:validation:jsonp:watch
```

#### Environment Variable (Legacy)
```bash
# Alternative method using environment variable
JSONP=true npm run test:e2e:validation
FORCE_JSONP=true npm run test:e2e:validation
```

### JSONP vs Native Fetch Comparison

| Aspect | Native Fetch | JSONP (Browser) |
|--------|--------------|-----------------|
| **Environment** | Node.js | Happy-DOM (Browser simulation) |
| **Request Method** | Native fetch() | JSONP with script tags |
| **CORS** | No restrictions | Bypasses CORS restrictions |
| **Performance** | Fast (~130s) | Slower (~500s) |
| **Success Rate** | 100% | ~94% (expected timeouts) |
| **Timeout** | 15s | 30s |

### Expected JSONP Test Results

When running JSONP tests, you may see some failures that are expected:

1. **WSDOT Weather Extended API**: Known timeout issues with `/traffic/api/api/Scanweb` endpoint
2. **Vessel History Validation**: Some vessels may have incomplete historical data
3. **Performance**: Tests take longer due to JSONP overhead

These failures are normal and don't indicate problems with the library.

## 📊 Test Coverage

### API Coverage
- ✅ **WSDOT APIs**: All 11 APIs tested
- ✅ **WSF APIs**: All 4 APIs tested
- ✅ **React Hooks**: All hooks tested with TanStack Query
- ✅ **Error Handling**: Comprehensive error scenarios
- ✅ **Type Validation**: Zod schema validation for all responses

### Environment Coverage
- ✅ **Node.js**: Native fetch environment
- ✅ **Browser**: JSONP environment (Happy‑DOM)
- ✅ **React**: JSDOM with React Testing Library

### Validation Coverage
- ✅ **Data Structure**: All API response structures validated
- ✅ **Type Safety**: TypeScript types verified
- ✅ **Date Conversion**: .NET date string parsing
- ✅ **Nullable Fields**: Optional field handling
- ✅ **Error Scenarios**: Malformed data handling

## 🛠️ Test Configuration

### Vitest Configuration Files

- `config/vitest.config.ts` - Main test configuration
- `config/vitest.unit.config.ts` - Unit test configuration
- `config/vitest.e2e.config.ts` - E2E test configuration
- `config/vitest.e2e.api.config.ts` - API E2E test configuration (supports JSONP)
- `config/vitest.e2e.hook.config.ts` - React hook test configuration

### Environment Variables

```bash
# Enable JSONP testing
FORCE_JSONP=true

# API key for testing (required)
WSDOT_ACCESS_TOKEN=your_api_key_here

# Test timeouts
VITEST_TIMEOUT=30000  # JSONP tests
VITEST_TIMEOUT=15000  # Native tests
```

## 🔍 Debugging Tests

### Verbose Output
```bash
# Enable verbose output
npm run test:e2e:validation -- --reporter=verbose
```

### Debug Specific Tests
```bash
# Run only specific test file
npm run test:e2e:validation -- tests/e2e/validation/wsf-vessels/

# Run only specific test
npm run test:e2e:validation -- -t "should validate vessel locations"
```

### Test UI
```bash
# Open test UI for interactive debugging
npm run test:ui
```

## 📝 Writing Tests

### E2E Test Structure
```typescript
import { describe, expect, it } from "vitest";
import { WsfVessels } from "@/api/wsf-vessels";
import { validateAndReturn } from "@/test/utils-zod";
import { validators } from "./validator";

describe("WSF Vessels API - Zod Validation", () => {
  it("should validate vessel locations data structure", async () => {
    const vesselLocations = await WsfVessels.getVesselLocations();
    
    const validatedLocations = validateAndReturn(
      validators.vesselLocationArray,
      vesselLocations,
      "vessel locations array"
    );

    expect(validatedLocations).toBeDefined();
    expect(Array.isArray(validatedLocations)).toBe(true);
  });
});
```

### JSONP Test Considerations
```typescript
// Tests automatically run in JSONP mode when --jsonp flag is used
// No additional configuration needed
it("should work in browser environment", async () => {
  // This test will automatically use JSONP in browser mode
  const data = await WsfVessels.getVesselLocations();
  expect(data).toBeDefined();
});
```

## 🚨 Common Issues

### Timeout Errors
- **JSONP tests**: Normal for some endpoints, increase timeout if needed
- **Network issues**: Check internet connection and API key
- **Rate limiting**: WSDOT may throttle requests during high load

### Validation Errors
- **Schema mismatches**: API response format may have changed
- **Missing fields**: Some vessels/terminals may have incomplete data
- **Date parsing**: .NET date format variations

### Environment Issues
- **Happy-DOM**: Ensure Happy-DOM is properly configured
- **JSDOM**: React tests require JSDOM environment
- **Node.js**: Ensure Node.js version 18+ is used

## 📈 Performance

### Test Execution Times
- **Unit Tests**: ~5-10 seconds
- **E2E Tests (Native)**: ~2-3 minutes
- **E2E Tests (JSONP)**: ~8-10 minutes
- **Full Test Suite**: ~15-20 minutes

### Optimization Tips
- Use watch mode for development
- Run specific test files during development
- Use test UI for interactive debugging
- Consider parallel test execution for CI/CD

## 🔄 Continuous Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:e2e:validation
      - run: npm run test:e2e:validation:jsonp
      - run: npm run test:e2e:hook
```

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:unit && npm run lint"
    }
  }
}
```

---

For more information, see the [main README](../README.md) and [API documentation](./API-REFERENCE.md). 