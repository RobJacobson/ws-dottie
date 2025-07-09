# WSF API Integration Testing Plan

## Overview

This plan outlines comprehensive integration testing for the Washington State Ferries (WSF) API client library. Integration tests will verify that our code works correctly with the actual WSF API endpoints, ensuring data accuracy, caching behavior, and graceful error handling.

## Testing Strategy

### Core Principles
- **Real API Testing**: Use actual WSF API endpoints with real-time data
- **Rate Limiting**: 1-second pause between API calls to be respectful
- **Performance Monitoring**: 2-second LTE benchmark for request/response cycles
- **Caching Validation**: Verify React Query caching works with live data
- **Data Transformation**: Ensure our converters work with real API responses

## Test Infrastructure

### Configuration

**`vitest.integration.config.ts`**
```typescript
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    include: ['tests/integration/**/*.test.ts'],
    exclude: ['tests/unit/**/*'],
    testTimeout: 30000, // 30 seconds for API calls
    hookTimeout: 10000,
    setupFiles: ['tests/setup.ts'],
    environment: 'jsdom',
    globals: true,
    reporters: ['verbose', 'json'],
    outputFile: 'test-results/integration.json',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

### Test Setup

**`tests/setup.ts`**
```typescript
import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';

// Global test setup
beforeAll(() => {
  // Set up test environment
  process.env.NODE_ENV = 'test';
  
  // Configure API key for testing
  if (!process.env.WSF_API_KEY) {
    console.warn('WSF_API_KEY not set - some tests may fail');
  }
});

afterAll(() => {
  // Cleanup
});

beforeEach(() => {
  // Reset any test state
});

afterEach(() => {
  // Clean up after each test
});
```

### Test Utilities

**`tests/integration/utils.ts`**
```typescript
import { QueryClient } from 'react-query';

// Rate limiting utility
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Create fresh QueryClient for each test
export const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

// Performance monitoring
export const measureApiCall = async <T>(
  apiCall: () => Promise<T>
): Promise<{ data: T; duration: number }> => {
  const start = Date.now();
  const data = await apiCall();
  const duration = Date.now() - start;
  
  return { data, duration };
};

// Data validation utilities
export const validateVesselLocation = (data: any) => {
  expect(data).toHaveProperty('vesselId');
  expect(data).toHaveProperty('vesselName');
  expect(data).toHaveProperty('longitude');
  expect(data).toHaveProperty('latitude');
  expect(data).toHaveProperty('lastUpdated');
  expect(data.lastUpdated).toBeInstanceOf(Date);
};

export const validateTerminalSailingSpace = (data: any) => {
  expect(data).toHaveProperty('terminalId');
  expect(data).toHaveProperty('terminalName');
  expect(data).toHaveProperty('spaceAvailable');
  expect(data).toHaveProperty('lastUpdated');
  expect(data.lastUpdated).toBeInstanceOf(Date);
};
```

## Test Categories

### 1. Priority Endpoints (Real-time Data)

#### Vessel Locations Integration Tests
**File**: `tests/integration/vessels/vesselLocations.integration.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useVesselLocations } from '@/api/vessels/vesselLocations';
import { delay, createTestQueryClient, measureApiCall, validateVesselLocation } from '../../utils';

describe('Vessel Locations Integration', () => {
  let queryClient: QueryClient;

  beforeAll(() => {
    queryClient = createTestQueryClient();
  });

  describe('useVesselLocations', () => {
    it('should fetch vessel locations from real WSF API', async () => {
      const { result } = renderHook(() => useVesselLocations(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      // Wait for data to load
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      }, { timeout: 10000 });

      // Validate response
      expect(result.current.data).toBeDefined();
      expect(Array.isArray(result.current.data)).toBe(true);
      expect(result.current.data.length).toBeGreaterThan(0);

      // Validate first vessel
      const firstVessel = result.current.data[0];
      validateVesselLocation(firstVessel);

      // Performance check
      expect(result.current.dataUpdatedAt).toBeDefined();
      const loadTime = Date.now() - result.current.dataUpdatedAt;
      expect(loadTime).toBeLessThan(2000); // 2 seconds LTE

      // Rate limiting
      await delay(1000);
    });

    it('should handle API errors gracefully', async () => {
      // Test with invalid API key or network issues
      // Verify error states are handled properly
    });

    it('should cache responses correctly', async () => {
      // Make first call
      const { result: result1 } = renderHook(() => useVesselLocations(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      await waitFor(() => {
        expect(result1.current.isSuccess).toBe(true);
      });

      const firstCallTime = result1.current.dataUpdatedAt;

      // Make second call (should use cache)
      const { result: result2 } = renderHook(() => useVesselLocations(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      await waitFor(() => {
        expect(result2.current.isSuccess).toBe(true);
      });

      // Should use cached data
      expect(result2.current.dataUpdatedAt).toBe(firstCallTime);
      expect(result2.current.data).toEqual(result1.current.data);

      await delay(1000);
    });
  });

  describe('useVesselLocationsByVesselId', () => {
    it('should fetch specific vessel location', async () => {
      // First get all vessels to get a valid ID
      const { result: allVessels } = renderHook(() => useVesselLocations(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      await waitFor(() => {
        expect(allVessels.current.isSuccess).toBe(true);
      });

      const vesselId = allVessels.current.data[0].vesselId;

      // Now fetch specific vessel
      const { result } = renderHook(() => useVesselLocationsByVesselId(vesselId), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBeDefined();
      expect(result.current.data.vesselId).toBe(vesselId);
      validateVesselLocation(result.current.data);

      await delay(1000);
    });
  });
});
```

#### Terminal Sailing Space Integration Tests
**File**: `tests/integration/terminals/terminalSailingSpace.integration.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useTerminalSailingSpace } from '@/api/terminals/terminalSailingSpace';
import { delay, createTestQueryClient, measureApiCall, validateTerminalSailingSpace } from '../../utils';

describe('Terminal Sailing Space Integration', () => {
  let queryClient: QueryClient;

  beforeAll(() => {
    queryClient = createTestQueryClient();
  });

  describe('useTerminalSailingSpace', () => {
    it('should fetch terminal sailing space from real WSF API', async () => {
      const { result } = renderHook(() => useTerminalSailingSpace(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      }, { timeout: 10000 });

      expect(result.current.data).toBeDefined();
      expect(Array.isArray(result.current.data)).toBe(true);
      expect(result.current.data.length).toBeGreaterThan(0);

      const firstTerminal = result.current.data[0];
      validateTerminalSailingSpace(firstTerminal);

      // Performance check
      const loadTime = Date.now() - result.current.dataUpdatedAt;
      expect(loadTime).toBeLessThan(2000);

      await delay(1000);
    });

    it('should handle real-time updates', async () => {
      // Test that data updates when cache expires
      // Verify timestamps are recent
    });
  });
});
```

### 2. Secondary Endpoints (Static Data)

#### Vessel Verbose Integration Tests
**File**: `tests/integration/vessels/vesselVerbose.integration.test.ts`

```typescript
describe('Vessel Verbose Integration', () => {
  it('should fetch vessel details from real WSF API', async () => {
    // Test vessel specifications, amenities, etc.
    // This is static data, so caching should be very effective
  });
});
```

#### Terminal Verbose Integration Tests
**File**: `tests/integration/terminals/terminalverbose.integration.test.ts`

```typescript
describe('Terminal Verbose Integration', () => {
  it('should fetch terminal details from real WSF API', async () => {
    // Test terminal facilities, amenities, accessibility features
    // This is static data, so caching should be very effective
  });
});
```

#### Schedule Integration Tests
**File**: `tests/integration/schedule/schedule.integration.test.ts`

```typescript
describe('Schedule Integration', () => {
  it('should fetch routes from real WSF API', async () => {
    // Test route information
  });

  it('should fetch schedules from real WSF API', async () => {
    // Test departure and arrival times
  });

  it('should fetch alerts from real WSF API', async () => {
    // Test service alerts and disruptions
  });
});
```

### 3. Data Transformation Validation

#### Real API Response Validation
**File**: `tests/integration/validation/dataTransformation.integration.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { getVesselLocations } from '@/api/vessels/vesselLocations';
import { getTerminalSailingSpace } from '@/api/terminals/terminalSailingSpace';

describe('Data Transformation Validation', () => {
  it('should transform WSF API responses correctly', async () => {
    const { data, duration } = await measureApiCall(() => getVesselLocations());

    // Validate transformation
    data.forEach(vessel => {
      // Check PascalCase to camelCase conversion
      expect(vessel).not.toHaveProperty('VesselID');
      expect(vessel).toHaveProperty('vesselId');

      // Check date transformation
      expect(vessel.lastUpdated).toBeInstanceOf(Date);
      expect(vessel.scheduledDeparture).toBeInstanceOf(Date);
      expect(vessel.estimatedArrival).toBeInstanceOf(Date);

      // Check data types
      expect(typeof vessel.vesselId).toBe('number');
      expect(typeof vessel.vesselName).toBe('string');
      expect(typeof vessel.longitude).toBe('number');
      expect(typeof vessel.latitude).toBe('number');
    });

    expect(duration).toBeLessThan(2000);
  });

  it('should handle all WSF date formats', async () => {
    // Test various date formats from WSF API
    // /Date(timestamp)/, YYYY-MM-DD, MM/DD/YYYY
  });
});
```

### 4. Caching Behavior Validation

#### React Query Caching Tests
**File**: `tests/integration/caching/reactQueryCaching.integration.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { QueryClient } from 'react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
import { useVesselLocations } from '@/api/vessels/vesselLocations';

describe('React Query Caching Integration', () => {
  it('should cache responses and avoid duplicate API calls', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 5 * 60 * 1000, // 5 minutes
          staleTime: 30 * 1000, // 30 seconds
        },
      },
    });

    // First call
    const { result: result1 } = renderHook(() => useVesselLocations(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => {
      expect(result1.current.isSuccess).toBe(true);
    });

    const firstCallTime = result1.current.dataUpdatedAt;

    // Second call (should use cache)
    const { result: result2 } = renderHook(() => useVesselLocations(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => {
      expect(result2.current.isSuccess).toBe(true);
    });

    // Should use cached data
    expect(result2.current.dataUpdatedAt).toBe(firstCallTime);
    expect(result2.current.data).toEqual(result1.current.data);

    // Verify no additional API calls were made
    const queryCache = queryClient.getQueryCache();
    const queries = queryCache.getAll();
    const vesselLocationQueries = queries.filter(q => 
      q.queryKey[0] === 'vesselLocations'
    );
    expect(vesselLocationQueries.length).toBe(1);
  });

  it('should respect cache invalidation', async () => {
    // Test cache invalidation patterns
    // Verify cache flush dates work correctly
  });
});
```

## Performance Monitoring

### Performance Metrics Collection
**File**: `tests/integration/performance/performance.integration.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { measureApiCall } from '../../utils';

describe('Performance Monitoring', () => {
  it('should meet 2-second LTE benchmark for all endpoints', async () => {
    const endpoints = [
      { name: 'Vessel Locations', call: () => getVesselLocations() },
      { name: 'Terminal Sailing Space', call: () => getTerminalSailingSpace() },
      { name: 'Vessel Verbose', call: () => getVesselVerbose() },
      { name: 'Terminal Verbose', call: () => getTerminalVerbose() },
      { name: 'Routes', call: () => getRoutes() },
      { name: 'Schedules', call: () => getSchedules() },
    ];

    for (const endpoint of endpoints) {
      const { duration } = await measureApiCall(endpoint.call);
      
      console.log(`${endpoint.name}: ${duration}ms`);
      expect(duration).toBeLessThan(2000);
      
      // Rate limiting
      await delay(1000);
    }
  });

  it('should monitor response sizes', async () => {
    const { data } = await measureApiCall(() => getVesselLocations());
    
    // Check response size
    const responseSize = JSON.stringify(data).length;
    console.log(`Vessel Locations response size: ${responseSize} bytes`);
    
    // Should be reasonable size (not too large)
    expect(responseSize).toBeLessThan(100000); // 100KB limit
    
    await delay(1000);
  });
});
```

## Error Handling Validation

### Graceful Error Handling
**File**: `tests/integration/errors/errorHandling.integration.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useVesselLocations } from '@/api/vessels/vesselLocations';

describe('Error Handling Integration', () => {
  it('should handle network errors gracefully', async () => {
    // Test with network disconnected
    // Verify error states are handled properly
  });

  it('should handle API errors without throwing', async () => {
    // Test with invalid API key
    // Verify graceful degradation
  });

  it('should handle malformed responses', async () => {
    // Test with unexpected response formats
    // Verify data validation works
  });
});
```

## Test Execution

### Scripts in `package.json`
```json
{
  "scripts": {
    "test:integration": "vitest --config vitest.integration.config.ts",
    "test:integration:watch": "vitest --config vitest.integration.config.ts --watch",
    "test:integration:coverage": "vitest --config vitest.integration.config.ts --coverage",
    "test:integration:ui": "vitest --config vitest.integration.config.ts --ui"
  }
}
```

### CI/CD Integration
```yaml
# .github/workflows/integration-tests.yml
name: Integration Tests
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test:integration
      - run: bun test:integration:coverage
```

## Test Data Management

### Environment Variables
```bash
# .env.test
WSF_API_KEY=your_test_api_key
NODE_ENV=test
```

### Test Configuration
```typescript
// tests/integration/config.ts
export const testConfig = {
  apiKey: process.env.WSF_API_KEY,
  baseUrl: 'https://www.wsdot.wa.gov/ferries/api',
  timeout: 10000,
  retries: 3,
  rateLimitDelay: 1000, // 1 second between calls
};
```

## Reporting and Monitoring

### Console Output
```typescript
// Custom reporter for integration tests
export const integrationReporter = {
  onTestComplete: (test: any) => {
    if (test.duration) {
      console.log(`✅ ${test.name}: ${test.duration}ms`);
    }
  },
  onError: (error: any) => {
    console.error(`❌ Integration test failed:`, error);
  },
};
```

### Performance Tracking
```typescript
// Track performance over time
export const trackPerformance = (endpoint: string, duration: number) => {
  console.log(`📊 ${endpoint}: ${duration}ms`);
  
  if (duration > 2000) {
    console.warn(`⚠️  ${endpoint} exceeded 2-second benchmark: ${duration}ms`);
  }
};
```

## Success Criteria

### Integration Test Success Metrics
- ✅ **All endpoints return expected data** without errors
- ✅ **Performance meets 2-second LTE benchmark** for all requests
- ✅ **React Query caching works correctly** with real API responses
- ✅ **Data transformation is accurate** with real WSF data
- ✅ **Error handling is graceful** without throwing exceptions
- ✅ **Rate limiting is respected** (1-second delays)
- ✅ **Response validation passes** for all data types

### Quality Gates
- **Test Coverage**: 100% of API endpoints tested
- **Performance**: All requests under 2 seconds
- **Reliability**: 95%+ test pass rate
- **Data Accuracy**: All transformations validated
- **Caching**: Cache hit/miss ratios tracked

This integration testing plan ensures that the WSF API client works reliably with real API endpoints while maintaining performance and data accuracy standards. 