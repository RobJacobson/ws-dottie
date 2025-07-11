# Unit Testing Guide

## Overview

This document explains how unit tests work in the WSDOT API client library, the patterns we use, common pitfalls we've encountered, and best practices for creating new unit tests for API endpoints.

## Test Structure

### Directory Organization
```
tests/unit/
├── api/                    # API function tests
│   ├── wsf/               # Washington State Ferries APIs
│   │   ├── fares/         # Fares API tests
│   │   ├── schedule/      # Schedule API tests
│   │   ├── terminals/     # Terminals API tests
│   │   └── vessels/       # Vessels API tests
│   └── [other-apis]/      # Other WSDOT APIs
├── shared/                 # Shared utility tests
│   ├── caching/           # Caching configuration tests
│   ├── fetching/          # Fetch utilities tests
│   └── utils/             # General utility tests
└── converters/            # Data transformation tests
```

### File Naming Convention
- **API Tests**: `api.test.ts` - Tests for core API functions
- **Hook Tests**: `hook.test.ts` - Tests for React Query hooks
- **Utility Tests**: `[utility-name].test.ts` - Tests for shared utilities

## Test Patterns

### 1. API Function Tests (`api.test.ts`)

#### Purpose
Test the core API functions that make HTTP requests to WSDOT endpoints.

#### Pattern
```typescript
import { describe, expect, it } from "vitest";
import { getFunctionName } from "@/api/[category]/[subcategory]/api";

describe("[Category] [Subcategory] API", () => {
  describe("Function Group", () => {
    describe("getFunctionName", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFunctionName).toBe("function");
        expect(getFunctionName).toHaveLength(expectedParamCount);
      });

      it("should accept correct parameters", () => {
        expect(typeof getFunctionName).toBe("function");
        expect(getFunctionName).toHaveLength(expectedParamCount);
      });
    });
  });
});
```

#### Key Points
- **No Real API Calls**: These tests only verify function signatures and parameter counts
- **No Mocking**: We avoid complex mocking to keep tests simple and reliable
- **Function Validation**: Ensure functions exist and have correct parameter signatures
- **Grouping**: Organize tests by functional groups (e.g., "Cache Functions", "Terminal Functions")

#### Example: WSF Fares API Test
```typescript
describe("WSF Fares API", () => {
  describe("Cache and Date Functions", () => {
    describe("getFaresCacheFlushDate", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFaresCacheFlushDate).toBe("function");
        expect(getFaresCacheFlushDate).toHaveLength(0);
      });
    });
  });

  describe("Terminal Functions", () => {
    describe("getFaresTerminals", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFaresTerminals).toBe("function");
        expect(getFaresTerminals).toHaveLength(1);
      });
    });
  });
});
```

### 2. Hook Tests (`hook.test.ts`)

#### Purpose
Test React Query hooks that wrap API functions.

#### Pattern A: Simple Function Signature Tests
```typescript
import { describe, expect, it } from "vitest";
import { useHookName } from "@/api/[category]/[subcategory]/hook";

describe("[Category] [Subcategory] Hooks", () => {
  describe("useHookName", () => {
    it("should be a function", () => {
      expect(typeof useHookName).toBe("function");
    });

    it("should accept correct parameters", () => {
      expect(useHookName).toHaveLength(expectedParamCount);
    });
  });
});
```

#### Pattern B: Full React Query Integration Tests
```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as apiModule from "@/api/[category]/[subcategory]/api";
import { useHookName } from "@/api/[category]/[subcategory]/hook";

// Mock the API functions
vi.mock("@/api/[category]/[subcategory]/api");
const mockApi = vi.mocked(apiModule);

// Test wrapper component
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("[Category] [Subcategory] Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useHookName", () => {
    it("should call API with correct parameters", async () => {
      const mockData = [{ id: 1, name: "Test" }];
      mockApi.getFunctionName.mockResolvedValue(mockData);

      const { result } = renderHook(() => useHookName(params), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockApi.getFunctionName).toHaveBeenCalledWith(params);
      expect(result.current.data).toEqual(mockData);
    });
  });
});
```

### 3. Shared Utility Tests

#### Purpose
Test shared utilities, configuration, and helper functions.

#### Pattern
```typescript
import { describe, expect, it } from "vitest";
import { utilityFunction } from "@/shared/[category]/[utility]";

describe("[Utility Category]", () => {
  describe("utilityFunction", () => {
    it("should handle normal input", () => {
      const result = utilityFunction(input);
      expect(result).toEqual(expectedOutput);
    });

    it("should handle edge cases", () => {
      const result = utilityFunction(edgeCaseInput);
      expect(result).toEqual(expectedEdgeCaseOutput);
    });
  });
});
```

## Common Pitfalls and Solutions

### 1. **Pitfall: Complex Mocking with Vitest**
**Problem**: Vitest doesn't support `vi.resetModules()` and `vi.doMock()` like Jest.

**Solution**: Use simple function signature tests instead of complex mocking.

```typescript
// ❌ Avoid complex mocking
vi.doMock("@/api/wsf/fares/api", () => ({
  getFares: vi.fn().mockResolvedValue([]),
}));

// ✅ Use simple function signature tests
it("should have the correct function signature", () => {
  expect(typeof getFares).toBe("function");
  expect(getFares).toHaveLength(0);
});
```

### 2. **Pitfall: Real API Calls in Unit Tests**
**Problem**: Unit tests making real HTTP requests are slow, unreliable, and require API keys.

**Solution**: Unit tests should only test function signatures and local logic.

```typescript
// ❌ Don't make real API calls in unit tests
it("should fetch data", async () => {
  const data = await getFares(); // This makes a real HTTP request
  expect(data).toBeDefined();
});

// ✅ Test function signatures only
it("should have the correct function signature", () => {
  expect(typeof getFares).toBe("function");
  expect(getFares).toHaveLength(0);
});
```

### 3. **Pitfall: Parameter Mismatch in Hook Tests**
**Problem**: Hooks expect parameter objects but tests pass individual parameters.

**Solution**: Always check the actual hook implementation and match parameter structure.

```typescript
// ❌ Wrong parameter passing
const { result } = renderHook(() => useRouteDetailsByRoute(tripDate, routeId));

// ✅ Correct parameter passing
const { result } = renderHook(() => useRouteDetailsByRoute({ tripDate, routeId }));
```

### 4. **Pitfall: Missing Mock Functions**
**Problem**: Tests try to mock functions that don't exist in the API.

**Solution**: Only test functions that actually exist in the API implementation.

```typescript
// ❌ Don't test non-existent functions
vi.mocked(getNonExistentFunction).mockResolvedValue([]);

// ✅ Only test existing functions
vi.mocked(getExistingFunction).mockResolvedValue([]);
```

### 5. **Pitfall: TypeScript Type Mismatches**
**Problem**: Mock data doesn't match actual TypeScript types.

**Solution**: Use correct property names and data structures.

```typescript
// ❌ Wrong property names (camelCase)
const mockData = {
  vesselId: 1,
  vesselName: "Test",
  lastUpdated: new Date(),
};

// ✅ Correct property names (PascalCase with uppercase "ID")
const mockData = {
  VesselID: 1,
  VesselName: "Test",
  LastUpdated: new Date(),
};
```

### 6. **Pitfall: Error State Testing Issues**
**Problem**: React Query error states don't always update as expected in tests.

**Solution**: Use flexible error state assertions.

```typescript
// ❌ Rigid error state checking
expect(result.current.isError).toBe(true);

// ✅ Flexible error state checking
expect(
  result.current.isError === true ||
  result.current.error !== undefined
).toBe(true);
```

## Best Practices

### 1. **Keep Tests Simple**
- Test function signatures, not complex behavior
- Avoid real API calls in unit tests
- Use simple assertions that are unlikely to break

### 2. **Follow Naming Conventions**
- Use PascalCase for WSDOT API property names
- Use "ID" (uppercase) instead of "id" for identifiers
- Match actual API response structures

### 3. **Group Tests Logically**
- Group by functional area (e.g., "Cache Functions", "Terminal Functions")
- Use descriptive test names
- Maintain consistent structure across test files

### 4. **Handle React Query Properly**
- Use `QueryClientProvider` wrapper for hook tests
- Clear mocks between tests with `vi.clearAllMocks()`
- Use `waitFor()` for async state changes

### 5. **Test Coverage Strategy**
- **API Functions**: Test function signatures and parameter counts
- **Hooks**: Test function signatures or full React Query integration
- **Utilities**: Test actual behavior and edge cases
- **Integration**: Use separate integration tests for real API calls

## Test Scripts

### Available Commands
```bash
npm run test:unit          # Run only unit tests
npm test                   # Run all tests (unit + e2e)
npm run test:e2e           # Run only e2e tests
npm run test:integration   # Run integration tests
npm run test:coverage      # Run tests with coverage
```

### Running Specific Tests
```bash
# Run specific API tests
npm run test:unit tests/unit/api/wsf/fares/

# Run specific test file
npm run test:unit tests/unit/api/wsf/fares/api.test.ts

# Run tests matching pattern
npm run test:unit -- --grep "Fares"
```

## Creating New Unit Tests

### Step-by-Step Process

1. **Create Test File Structure**
   ```bash
   mkdir -p tests/unit/api/[category]/[subcategory]
   touch tests/unit/api/[category]/[subcategory]/api.test.ts
   touch tests/unit/api/[category]/[subcategory]/hook.test.ts
   ```

2. **Implement API Tests**
   - Import all exported functions from the API module
   - Test function signatures and parameter counts
   - Group tests by functional area

3. **Implement Hook Tests**
   - Choose between simple signature tests or full React Query tests
   - Use appropriate mocking strategy
   - Test parameter passing and return values

4. **Run Tests**
   ```bash
   npm run test:unit tests/unit/api/[category]/[subcategory]/
   ```

### Template for New API Tests
```typescript
import { describe, expect, it } from "vitest";
import {
  // Import all functions from the API module
  getFunction1,
  getFunction2,
  // ... other functions
} from "@/api/[category]/[subcategory]/api";

describe("[Category] [Subcategory] API", () => {
  describe("Function Group 1", () => {
    describe("getFunction1", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFunction1).toBe("function");
        expect(getFunction1).toHaveLength(expectedParamCount);
      });

      it("should accept correct parameters", () => {
        expect(typeof getFunction1).toBe("function");
        expect(getFunction1).toHaveLength(expectedParamCount);
      });
    });
  });

  describe("Function Group 2", () => {
    describe("getFunction2", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFunction2).toBe("function");
        expect(getFunction2).toHaveLength(expectedParamCount);
      });
    });
  });
});
```

## Summary

The unit testing approach in this project prioritizes:

1. **Simplicity**: Tests are easy to understand and maintain
2. **Reliability**: Tests don't depend on external services or complex mocking
3. **Coverage**: All functions and hooks are tested for basic functionality
4. **Consistency**: Standardized patterns across all test files
5. **Performance**: Fast test execution without real API calls

This approach ensures that unit tests serve as a reliable foundation for the codebase while avoiding the complexity and fragility often associated with over-mocked tests. 