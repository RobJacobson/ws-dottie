# WSDOT API Client Development Guide

This guide explains the architecture, patterns, and best practices for the WSDOT API client library. It's designed for developers familiar with React and fetch, but new to React Query or the WSDOT API system.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [API Design Principles](#api-design-principles)
- [Caching Strategy](#caching-strategy)
- [Error Handling](#error-handling)
- [Type Safety](#type-safety)
- [React Integration](#react-integration)
- [Testing Strategy](#testing-strategy)
- [Performance Considerations](#performance-considerations)
- [Getting Started](#getting-started)

## Overview

The WSDOT API client provides TypeScript-first access to Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF) APIs. It includes:

- **16 API endpoints** (12 WSDOT + 4 WSF)
- **React Query integration** with optimized caching
- **TypeScript types** for all API responses
- **Error handling** with custom error types
- **Automatic cache invalidation** based on server cache flush dates

### Key Features

- **Zero-configuration caching** with intelligent invalidation
- **Real-time data** for frequently updated endpoints (vessel locations, wait times)
- **Static data caching** for infrequently updated endpoints (terminals, routes)
- **Automatic retry logic** with exponential backoff
- **Rate limiting** to respect API limits

## Architecture

### Project Structure

```
src/
├── api/                    # API endpoint modules
│   ├── wsdot-*/           # WSDOT API endpoints (12 modules)
│   └── wsf-*/             # WSF API endpoints (4 modules)
├── shared/                 # Shared utilities
│   ├── caching/           # Caching strategy and providers
│   └── fetching/          # HTTP client and utilities
├── react.ts               # React-specific exports
└── index.ts               # Main library exports
```

### Module Organization

Each API endpoint follows a consistent structure:

```
api/endpoint-name/
├── api.ts          # Raw API functions (fetch calls)
├── hook.ts         # React Query hooks
├── types.ts        # TypeScript type definitions
└── index.ts        # Module exports
```

### Entry Points

- **`index.ts`** - Main library exports for all API modules
- **`react.ts`** - React-specific exports (hooks, types, utilities)

## API Design Principles

### 1. TypeScript-First Design

All APIs are designed with TypeScript in mind:

```typescript
// Strongly typed API responses
export type VesselLocation = {
  VesselID: number;
  VesselName: string;
  Latitude: number;
  Longitude: number;
  // ... other properties
};

// Type-safe API functions
export const getVesselLocations = async (): Promise<VesselLocation[]> => {
  // Implementation
};
```

### 2. Consistent Naming Conventions

- **API functions**: `get*`, `fetch*` (e.g., `getVesselLocations`)
- **React hooks**: `use*` (e.g., `useVesselLocations`)
- **Types**: PascalCase (e.g., `VesselLocation`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `FREQUENT_UPDATE_CONFIG`)

### 3. Error Handling

All APIs use consistent error handling:

```typescript
// Custom error types
export class WsdotApiError extends Error {
  constructor(
    public code: string,
    public message: string,
    public status?: number
  ) {
    super(message);
  }
}

// Error handling in API functions
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new WsdotApiError('API_ERROR', 'Request failed', response.status);
  }
  return await response.json();
} catch (error) {
  // Handle and re-throw with context
}
```

### 4. Date Handling

All date fields are automatically converted from WSDOT's .NET date format to JavaScript Date objects:

```typescript
// Input: "/Date(1640995200000-0800)/"
// Output: JavaScript Date object
export type Schedule = {
  SailingDate: Date;  // Automatically converted
  LastUpdated: Date;  // Automatically converted
};
```

## Caching Strategy

The library implements a sophisticated caching strategy using React Query with three distinct configurations:

### 1. Frequent Update Configuration

For real-time data that changes frequently (every few seconds to minutes):

```typescript
export const FREQUENT_UPDATE_CONFIG = {
  staleTime: 30 * SECOND,        // Data considered stale after 30s
  gcTime: 2 * MINUTE,            // Keep in cache for 2 minutes
  refetchInterval: 5 * SECOND,   // Refetch every 5 seconds
  refetchOnWindowFocus: true,    // Refetch when window regains focus
  retry: 3,                      // Retry up to 3 times
};
```

**Use cases**: Vessel locations, terminal wait times, highway alerts

### 2. Infrequent Update Configuration

For static data that changes rarely (daily to weekly):

```typescript
export const INFREQUENT_UPDATE_CONFIG = {
  staleTime: 1 * WEEK,           // Data considered stale after 1 week
  gcTime: 2 * WEEK,              // Keep in cache for 2 weeks
  refetchInterval: false,        // No automatic refetch
  refetchOnWindowFocus: true,    // Refetch when window regains focus
  retry: 5,                      // Retry up to 5 times
};
```

**Use cases**: Terminal information, vessel specifications, routes, schedules

### 3. Cache Flush Configuration

For cache flush date monitoring:

```typescript
export const CACHE_FLUSH_CONFIG = {
  staleTime: 5 * MINUTE,         // Data considered stale after 5 minutes
  gcTime: 10 * MINUTE,           // Keep in cache for 10 minutes
  refetchInterval: 2 * MINUTE,   // Refetch every 2 minutes
  refetchOnWindowFocus: true,    // Refetch when window regains focus
  retry: 5,                      // Retry up to 5 times
};
```

### Automatic Cache Invalidation

The library automatically invalidates cached data when the server indicates data has changed:

```typescript
// CacheProvider monitors cache flush dates
export const WsfCacheProvider = () => {
  const { data: vesselsCacheFlushDate } = useCacheFlushDateVessels();
  const { data: terminalsCacheFlushDate } = useCacheFlushDateTerminals();
  const { data: scheduleCacheFlushDate } = useCacheFlushDateSchedule();
  
  // Automatically invalidates related queries when flush dates change
  // This component should be placed high in your component tree
};
```

### Manual Cache Invalidation

You can also manually invalidate cache when needed:

```typescript
import { useWsfCacheInvalidation } from '@/shared/caching';

const { invalidateVesselQueries, invalidateTerminalQueries } = useWsfCacheInvalidation();

// Invalidate all vessel queries
invalidateVesselQueries();

// Invalidate specific terminal queries
invalidateTerminalQueriesByType('waitTimes');
```

## Error Handling

### Error Types

The library provides custom error types for different scenarios:

```typescript
// API errors (network, server errors)
export class WsdotApiError extends Error {
  constructor(
    public code: string,
    public message: string,
    public status?: number
  ) {
    super(message);
  }
}

// Authentication errors
export class WsdotAuthError extends WsdotApiError {
  constructor(message: string) {
    super('AUTH_ERROR', message, 401);
  }
}

// Rate limiting errors
export class WsdotRateLimitError extends WsdotApiError {
  constructor(message: string) {
    super('RATE_LIMIT_ERROR', message, 429);
  }
}
```

### Error Handling in React Components

```typescript
import { useVesselLocations } from '@/react';

const VesselLocations = () => {
  const { data: vessels, isLoading, error } = useVesselLocations();

  if (isLoading) return <div>Loading vessels...</div>;
  
  if (error) {
    if (error instanceof WsdotApiError) {
      return <div>API Error: {error.message}</div>;
    }
    return <div>Unexpected error: {error.message}</div>;
  }

  return (
    <div>
      {vessels?.map(vessel => (
        <div key={vessel.VesselID}>{vessel.VesselName}</div>
      ))}
    </div>
  );
};
```

### Error Recovery

React Query automatically handles retries with exponential backoff:

```typescript
// Automatic retry configuration
retry: 3,
retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
```

## Type Safety

### Type Definitions

All API responses have comprehensive TypeScript definitions:

```typescript
// Example: Vessel location type
export type VesselLocation = {
  VesselID: number;
  VesselName: string;
  Mmsi: number;
  DepartingTerminalID: number;
  DepartingTerminalName: string;
  DepartingTerminalAbbrev: string;
  ArrivingTerminalID: number;
  ArrivingTerminalName: string;
  ArrivingTerminalAbbrev: string;
  Latitude: number;
  Longitude: number;
  Speed: number;
  Heading: number;
  InService: boolean;
  AtDock: boolean;
  LeftDock: Date | null;
  Eta: Date | null;
  EtaBasis: string | null;
  ScheduledDeparture: Date;
  OpRouteAbbrev: string[];
  VesselPositionNum: number;
  SortSeq: number;
  ManagedBy: number;
  TimeStamp: Date;
  VesselWatchShutID: number;
  VesselWatchShutMsg: string;
  VesselWatchShutFlag: string;
};
```

### Type Guards

The library includes type guards for runtime type checking:

```typescript
// Check if data is a valid vessel location
export const isVesselLocation = (data: unknown): data is VesselLocation => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'VesselID' in data &&
    'VesselName' in data &&
    'Latitude' in data &&
    'Longitude' in data
  );
};
```

### Generic Types

Some APIs use generic types for flexibility:

```typescript
// Generic API response wrapper
export type ApiResponse<T> = {
  data: T;
  timestamp: Date;
  cacheFlushDate?: Date;
};

// Usage
export const getVesselLocations = async (): Promise<ApiResponse<VesselLocation[]>> => {
  // Implementation
};
```

## React Integration

### Hook Design

All React hooks follow consistent patterns:

```typescript
// Basic hook with no parameters
export const useVesselBasics = (
  options?: Parameters<typeof useQuery<VesselBasic[]>>[0]
) => {
  return useQuery({
    queryKey: ["vessels", "basics"],
    queryFn: getVesselBasics,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

// Hook with parameters
export const useVesselLocationsByVesselId = (
  vesselId: number,
  options?: Parameters<typeof useQuery<VesselLocation[]>>[0]
) => {
  return useQuery({
    queryKey: ["vessels", "locations", vesselId],
    queryFn: () => getVesselLocationsByVesselId(vesselId),
    enabled: !!vesselId,
    ...createFrequentUpdateOptions(),
    ...options,
  });
};
```

### Provider Setup

Set up the cache provider in your app:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WsfCacheProvider } from '@/react';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WsfCacheProvider />
      {/* Your app components */}
    </QueryClientProvider>
  );
};
```

### Hook Usage Patterns

```typescript
import { useVesselLocations, useTerminalWaitTimes } from '@/react';

const Dashboard = () => {
  // Real-time vessel locations (frequent updates)
  const { data: vessels, isLoading: vesselsLoading } = useVesselLocations();
  
  // Terminal wait times (frequent updates)
  const { data: waitTimes, isLoading: waitTimesLoading } = useTerminalWaitTimes();
  
  // Terminal basics (infrequent updates, cached longer)
  const { data: terminals } = useTerminalBasics();

  if (vesselsLoading || waitTimesLoading) {
    return <div>Loading real-time data...</div>;
  }

  return (
    <div>
      <h2>Active Vessels: {vessels?.length || 0}</h2>
      <h2>Terminals with Wait Times: {waitTimes?.length || 0}</h2>
    </div>
  );
};
```

### Conditional Queries

```typescript
const VesselDetails = ({ vesselId }: { vesselId?: number }) => {
  // Query only runs when vesselId is provided
  const { data: vessel } = useVesselVerboseById(vesselId, {
    enabled: !!vesselId,
  });

  if (!vesselId) return <div>No vessel selected</div>;
  if (!vessel) return <div>Loading vessel details...</div>;

  return <div>{vessel.VesselName}</div>;
};
```

## Testing Strategy

### E2E Testing

The library includes comprehensive end-to-end tests for all API endpoints:

```typescript
// Example E2E test
describe('WSF Vessels API', () => {
  it('should fetch vessel basics', async () => {
    const { data, duration } = await measureApiCall(getVesselBasics);
    
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(duration).toBeLessThan(2000); // Performance benchmark
    
    // Validate first vessel
    if (data.length > 0) {
      validateVesselBasic(data[0]);
    }
  });
});
```

### Unit Testing

Unit tests focus on individual functions and utilities:

```typescript
// Example unit test
describe('Date utilities', () => {
  it('should convert WSDOT date format to JavaScript Date', () => {
    const wsdotDate = '/Date(1640995200000-0800)/';
    const result = parseWsdotDate(wsdotDate);
    
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toBe(1640995200000);
  });
});
```

### Test Utilities

The library provides test utilities for validation:

```typescript
import { validateVesselLocation, validateTerminalBasics } from '@/tests/e2e/utils';

// Use validation functions in tests
const { data: vessels } = await getVesselLocations();
vessels.forEach(validateVesselLocation);
```

## Performance Considerations

### Rate Limiting

The library respects API rate limits:

```typescript
// Rate limiting between API calls
export const RATE_LIMIT_DELAY = 100; // 100ms between calls

// Performance benchmarks
export const WSDOT_PERFORMANCE_BENCHMARK = 2000; // 2 seconds
export const WSF_PERFORMANCE_BENCHMARK = 2000; // 2 seconds
```

### Bundle Size Optimization

The library is designed for tree-shaking:

```typescript
// Import only what you need
import { useVesselLocations } from '@/react';
import { getVesselLocations } from '@/api/wsf-vessels';

// Not recommended - imports everything
import * as WsfVessels from '@/api/wsf-vessels';
```

### Memory Management

React Query automatically manages cache memory:

```typescript
// Cache garbage collection
gcTime: 2 * WEEK, // Keep in cache for 2 weeks
```

## Getting Started

### Installation

```bash
npm install @wsdot/api-client
```

### Basic Setup

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WsfCacheProvider } from '@wsdot/api-client/react';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WsfCacheProvider />
      <YourApp />
    </QueryClientProvider>
  );
};
```

### First API Call

```typescript
import { useVesselBasics } from '@wsdot/api-client/react';

const VesselList = () => {
  const { data: vessels, isLoading, error } = useVesselBasics();

  if (isLoading) return <div>Loading vessels...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {vessels?.map(vessel => (
        <div key={vessel.VesselID}>{vessel.VesselName}</div>
      ))}
    </div>
  );
};
```

### Environment Configuration

Set up your API key:

```bash
# .env file
WSDOT_ACCESS_TOKEN=your_api_key_here
```

The library automatically reads the API key from environment variables.

### Next Steps

1. **Explore the API Reference** for detailed endpoint documentation
2. **Check the examples** in the `examples/` directory
3. **Review the caching strategy** for optimal performance
4. **Set up error boundaries** for production applications

## Best Practices

### 1. Use Appropriate Caching Strategies

- Use frequent update hooks for real-time data
- Use infrequent update hooks for static data
- Let the cache provider handle automatic invalidation

### 2. Handle Loading and Error States

```typescript
const { data, isLoading, error } = useSomeApi();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
if (!data) return <NoDataMessage />;
```

### 3. Optimize Bundle Size

```typescript
// Good - tree-shakable
import { useVesselLocations } from '@wsdot/api-client/react';

// Avoid - imports everything
import * as WsfVessels from '@wsdot/api-client';
```

### 4. Monitor Performance

```typescript
// Use performance monitoring in development
const { data, duration } = await measureApiCall(getVesselLocations);
console.log(`API call took ${duration}ms`);
```

### 5. Handle Rate Limiting

The library handles rate limiting automatically, but be mindful of:

- Making too many requests simultaneously
- Not caching data appropriately
- Ignoring error responses

This development guide should help you get started with the WSDOT API client library. For detailed API documentation, see the API Reference guide. 