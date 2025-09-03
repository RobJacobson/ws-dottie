# Query Options Refactoring Project

## Overview

This project aims to refactor WS-Dottie from using factory methods (`createUseQueryWsdot`/`createUseQueryWsf`) to returning TanStack Query v5 `queryOptions` objects. This aligns with TanStack Query v5 best practices, simplifies our codebase, and gives users maximum flexibility while maintaining type safety.

## Objectives

1. **Simplify Library Architecture** - Remove factory method indirection and complexity
2. **Follow TanStack Query v5 Best Practices** - Use the recommended `queryOptions` pattern
3. **Maximize User Flexibility** - Allow users full control over query configuration
4. **Maintain Type Safety** - Preserve strong TypeScript inference and type safety
5. **Reduce Bundle Size** - Eliminate unnecessary wrapper functions

## Current vs. New Approach

### Current Approach (Factory Methods)
```typescript
// Current implementation
export const useHighwayCamera = createUseQueryWsdot({
  queryFn: getHighwayCamera,
  queryKeyPrefix: ["wsdot", "highway-cameras", "getHighwayCamera"],
  defaultOptions: tanstackQueryOptions.FIVE_MINUTE_POLLING,
});

// Usage
const { data } = useHighwayCamera({ cameraId: 123 });
```

### New Approach (Query Options)
```typescript
// New implementation
export const highwayCameraOptions = (params: GetHighwayCameraParams) => 
  queryOptions({
    queryKey: ["wsdot", "highway-cameras", "getHighwayCamera", params],
    queryFn: () => getHighwayCamera(params),
    staleTime: FIVE_MINUTES,
    gcTime: TEN_MINUTES,
  });

// Usage
const { data } = useQuery(highwayCameraOptions({ cameraId: 123 }));
```

## Implementation Plan

### Phase 1: Create Constants and Infrastructure

1. **Create Query Time Constants**
   - Location: `src/shared/constants/queryOptions.ts`
   - Define time constants: `THIRTY_SECONDS`, `ONE_MINUTE`, `FIVE_MINUTES`, etc.
   - Replace magic numbers throughout codebase

2. **Update TanStack Query Exports**
   - Import `queryOptions` from `@tanstack/react-query`
   - Export from main library index

### Phase 2: Refactor APIs (Alphabetical Order)

Process each API directory in alphabetical order:

#### WSDOT APIs (12 total)
1. `wsdot-border-crossings`
2. `wsdot-bridge-clearances` 
3. `wsdot-commercial-vehicle-restrictions`
4. `wsdot-highway-alerts`
5. `wsdot-highway-cameras`
6. `wsdot-mountain-pass-conditions`
7. `wsdot-toll-rates`
8. `wsdot-traffic-flow`
9. `wsdot-travel-times`
10. `wsdot-weather-information`
11. `wsdot-weather-information-extended`
12. `wsdot-weather-stations`

#### WSF APIs (4 total)
1. `wsf-fares`
2. `wsf-schedule`
3. `wsf-terminals`
4. `wsf-vessels`

### Phase 3: Clean Up Factory Code

1. **Remove Factory Methods**
   - Delete `src/shared/tanstack/hookFactory.ts`
   - Remove exports from `src/shared/tanstack/index.ts`
   - Update main library exports

2. **Update Documentation**
   - Update `docs/architecture/hook-factory-architecture.md`
   - Update examples in README and documentation
   - Update API reference documentation

## Implementation Details

### Query Options Function Pattern

**For WSDOT APIs:**
```typescript
export const apiNameOptions = (params: ApiParams) => 
  queryOptions({
    queryKey: params ? ["wsdot", "api-category", "functionName", params] : ["wsdot", "api-category", "functionName"],
    queryFn: () => apiFunctionName(params),
    // Pattern: keep staleTime and refetchInterval equal for cadence
    staleTime: ONE_MINUTE, // or appropriate constant per API
    gcTime: ONE_HOUR,      // or appropriate constant per API
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
```

**For WSF APIs (with cache flush monitoring):**
```typescript
export const apiNameOptions = (params: ApiParams) => 
  queryOptions({
    queryKey: params ? ["wsf", "api-category", "functionName", params] : ["wsf", "api-category", "functionName"],
    queryFn: () => apiFunctionName(params),
    // Pattern: keep staleTime and refetchInterval equal for cadence
    staleTime: ONE_MINUTE, // or appropriate constant per API
    gcTime: ONE_HOUR,      // or appropriate constant per API
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
    // Note: Cache flush monitoring will be handled separately
  });
```

### File Changes Per API

For each API file (e.g., `src/api/wsdot-highway-cameras/highwayCameras.ts`):

1. **Add imports:**
   ```typescript
   import { queryOptions } from '@tanstack/react-query';
   import { FIVE_MINUTES, TEN_MINUTES } from '../../shared/constants/queryOptions';
   ```

2. **Replace factory-based hooks:**
   ```typescript
   // Remove this:
   export const useHighwayCamera = createUseQueryWsdot({...});
   
   // Add this:
   export const highwayCameraOptions = (params: GetHighwayCameraParams) => 
     queryOptions({...});
   ```

3. **Update exports in index.ts files**

### Time Constants Strategy

Use individual constants for clarity and flexibility:

```typescript
// src/shared/constants/queryOptions.ts
export const FIVE_SECONDS = 5 * 1000;
export const THIRTY_SECONDS = 30 * 1000;
export const ONE_MINUTE = 60 * 1000;
export const FIVE_MINUTES = 5 * 60 * 1000;
export const TEN_MINUTES = 10 * 60 * 1000;
export const THIRTY_MINUTES = 30 * 60 * 1000;
export const ONE_HOUR = 60 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;
```

## Benefits

1. **Simpler Codebase** - Eliminates factory method complexity
2. **Better User Experience** - Users get full TanStack Query control
3. **Type Safety** - Direct TanStack Query type inference
4. **Easier Customization** - Users can override any option
5. **Smaller Bundle** - No wrapper function overhead
6. **Future-Proof** - Follows TanStack Query v5 patterns

## Migration Impact

- **Breaking Change** - This is a major API change
- **Pre-Alpha Status** - No backward compatibility needed since code is pre-alpha
- **Documentation Updates** - All examples and documentation need updates
- **Testing Updates** - Hook tests need to be updated for new pattern

## Success Criteria

1. All 57+ API functions converted to query options pattern
2. Factory methods completely removed
3. All time constants replaced with named constants
4. Documentation updated with new patterns
5. All tests passing with new implementation
6. Bundle size reduced due to removed factory code

## Timeline

- **Phase 1** (Infrastructure): 1 day
- **Phase 2** (API Refactoring): 3-4 days (16 APIs × ~4 functions each)
- **Phase 3** (Cleanup): 1 day
- **Total Estimated Time**: 5-6 days

## Notes

- Work through APIs in strict alphabetical order for consistency
- Each API should be completed fully before moving to the next
- Delete factory code only after all APIs are converted
- Maintain the same caching strategies but expressed through individual constants