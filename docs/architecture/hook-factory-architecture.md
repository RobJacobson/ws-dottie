# Hook Factory Architecture (Deprecated)

> This document describes the former hook factory approach. It has been replaced by the Query Options pattern using `queryOptions` from TanStack Query v5. For current guidance, see:
>
> - docs/misc/query-options-refactoring.md
> - docs/readme-invalidation.md

This document explains the hook factory pattern used in ws-dottie to eliminate boilerplate and improve type safety for TanStack Query hooks.

## Overview

The hook factory provided two specialized factory functions that created typed React Query hooks. This section is kept for historical context only. New development should export `queryOptions` functions and consume them with `useQuery(options)`.

- `createUseQueryWsdot` - For WSDOT APIs with standard caching
- `createUseQueryWsf` - For WSF APIs with auto-update functionality

### Key Benefits

1. **Reduced Boilerplate** - From 15+ lines per hook to just 3-5 lines
2. **Full TanStack Query Compatibility** - All standard options work exactly as expected
3. **Automatic Type Inference** - Types are inferred from your API functions
4. **Flexible Caching Strategies** - Support for both periodic and change-based updates
5. **Familiar Developer Experience** - Use the same patterns you know from TanStack Query

## Current vs. New Approach

### Current Approach (High Boilerplate)

```typescript
// Current WSDOT API hook
export const useHighwayAlerts = (
  params: GetHighwayAlertsParams = {},
  options?: TanStackOptions<HighwayAlerts>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts", 
      "getHighwayAlerts",
      JSON.stringify(params),
    ],
    queryFn: () => getHighwayAlerts(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

// Current WSF API hook
export const useVesselBasics = (
  params: GetVesselBasicsParams = {},
  options?: UseQueryOptions<VesselBasics>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "basics"],
    queryFn: () => getVesselBasics(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
```

### New Approach (Minimal Boilerplate)

```typescript
// WSDOT API hook using factory
export const useHighwayAlerts = createUseQueryWsdot({
  queryFn: getHighwayAlerts,
  queryKeyPrefix: ["wsdot", "highway-alerts", "getHighwayAlerts"],
  defaultOptions: tanstackQueryOptions.MINUTE_UPDATES,
});

// WSF API hook using factory
export const useVesselBasics = createUseQueryWsf({
  queryFn: getVesselBasics,
  queryKeyPrefix: ["wsf", "vessels", "basics"],
  defaultOptions: tanstackQueryOptions.DAILY_UPDATES,
  getCacheFlushDate: getCacheFlushDateVessels,
});
```

## Factory Functions

### createUseQueryWsdot

Creates hooks for WSDOT APIs with standard caching behavior.

```typescript
export const useHighwayAlerts = createUseQueryWsdot({
  queryFn: getHighwayAlerts,
  queryKeyPrefix: ["wsdot", "highway-alerts", "getHighwayAlerts"],
  defaultOptions: tanstackQueryOptions.MINUTE_UPDATES,
});
```

**Configuration:**
- `queryFn` - The API function to call
- `queryKeyPrefix` - Array of strings for the query key prefix
- `defaultOptions` - Standard TanStack Query options (optional)

### createUseQueryWsf

Creates hooks for WSF APIs with automatic cache invalidation.

```typescript
export const useVesselLocations = createUseQueryWsf({
  queryFn: getVesselLocations,
  queryKeyPrefix: ["wsf", "vessels", "locations", "getVesselLocations"],
  defaultOptions: tanstackQueryOptions.REALTIME_UPDATES,
  getCacheFlushDate: getCacheFlushDateVessels,
});
```

**Configuration:**
- `queryFn` - The API function to call
- `queryKeyPrefix` - Array of strings for the query key prefix
- `defaultOptions` - Standard TanStack Query options (optional)
- `getCacheFlushDate` - Function that returns the cache flush date for auto-update

## Query Key Generation

The factory automatically generates query keys using a consistent pattern:

```typescript
// Query key structure: [...queryKeyPrefix, JSON.stringify(params)]

export const useHighwayAlerts = createUseQueryWsdot({
  queryFn: getHighwayAlerts,
  queryKeyPrefix: ["wsdot", "highway-alerts", "getHighwayAlerts"],
  // Creates: ["wsdot", "highway-alerts", "getHighwayAlerts", JSON.stringify(params)]
});

export const useHighwayAlertById = createUseQueryWsdot({
  queryFn: getHighwayAlertById,
  queryKeyPrefix: ["wsdot", "highway-alerts", "getHighwayAlertById"],
  // Creates: ["wsdot", "highway-alerts", "getHighwayAlertById", JSON.stringify(params)]
});
```

## Advanced Usage Examples

### Custom Options Override

The factory preserves the ability for consumers to override default options:

```typescript
// Hook definition with default 5-minute updates
export const useHighwayAlerts = createUseQueryWsdot({
  queryFn: getHighwayAlerts,
  queryKeyPrefix: ["wsdot", "highway-alerts", "getHighwayAlerts"],
  defaultOptions: tanstackQueryOptions.MINUTE_UPDATES, // 5-minute updates by default
});

// Usage with custom options that override defaults
const { data: alerts } = useHighwayAlerts(
  { region: "Northwest" },
  {
    staleTime: 30 * 1000, // Override to 30 seconds
    refetchInterval: 10 * 1000, // Add 10-second polling
    enabled: false, // Disable the query
  }
);

// Usage with partial overrides
const { data: alerts } = useHighwayAlerts(
  { region: "Northwest" },
  {
    staleTime: 60 * 1000, // Just change stale time, keep other defaults
  }
);
```

### Conditional Enabling

Conditional enabling is handled through the options parameter:

```typescript
export const useFareTotals = createUseQueryWsf({
  queryFn: getFareTotals,
  queryKeyPrefix: ["wsf", "fares", "fareTotals"],
  defaultOptions: tanstackQueryOptions.DAILY_UPDATES,
  getCacheFlushDate: getFaresCacheFlushDate,
});

// Usage with conditional enabling
const { data: fareTotals } = useFareTotals(
  { fareLineItemIDs: [1, 2], quantities: [1, 1] },
  {
    enabled: fareLineItemIDs.length > 0 && quantities.length > 0,
  }
);
```

### WSF Auto-Update Behavior

WSF hooks automatically poll for cache updates every 5 minutes and can be disabled if needed:

```typescript
export const useVesselLocations = createUseQueryWsf({
  queryFn: getVesselLocations,
  queryKeyPrefix: ["wsf", "vessels", "locations"],
  defaultOptions: tanstackQueryOptions.REALTIME_UPDATES,
  getCacheFlushDate: getCacheFlushDateVessels, // Polls this endpoint every 5 minutes
});

// The hook automatically:
// 1. Calls getCacheFlushDateVessels() every 5 minutes
// 2. Compares the returned date with the previous date
// 3. Invalidates the cache if the date has changed
// 4. Triggers a refetch of the data

// You can disable auto-update behavior:
const { data } = useVesselLocations(
  { vesselId: 123 },
  { enabled: false } // Disables both the query and auto-update
);
```

## Type Safety

The factory provides full TypeScript support with automatic type inference:

```typescript
// Types are automatically inferred from the API function
export const useVesselLocations = createUseQueryWsf({
  queryFn: getVesselLocations, // Returns Promise<VesselLocations>
  // ... other config
});

// Usage is fully typed:
const { data } = useVesselLocations(); // data is typed as VesselLocations | undefined
const { data: locations } = useVesselLocations({ vesselId: 123 }); // locations is typed as VesselLocations | undefined

// Options are fully typed with TanStack Query's UseQueryOptions
const { data } = useVesselLocations(
  { vesselId: 123 },
  {
    staleTime: 30000, // ✅ Fully typed
    refetchInterval: 10000, // ✅ Fully typed
    enabled: true, // ✅ Fully typed
  }
);
```

## Benefits

### 1. Reduced Boilerplate
- **Before**: 15+ lines per hook
- **After**: 3-5 lines per hook

### 2. Simple Query Key Generation
- **JSON.stringify by default** - handles complex parameter objects automatically
- **Consistent pattern** - all hooks use the same query key structure
- **Performance optimized** - JSON.stringify performance is trivial for query keys

### 3. Automatic Type Inference
- No need to manually specify `TanStackOptions<T>`
- Return types are automatically inferred from the API function
- Full IntelliSense support for all options

### 4. Full Options Override Support
- **Default options** - sensible defaults for each API type
- **Consumer overrides** - any TanStack Query option can be overridden
- **Partial overrides** - only specify what you want to change
- **Type safety** - all options are fully typed and validated

### 5. Consistent Patterns
- All hooks follow the same structure
- Query key generation is standardized
- Options merging is handled automatically

### 6. Better Maintainability
- Changes to caching strategies only need to be made in one place
- Query key patterns are centralized
- Less code to review and test

### 7. WSF Auto-Update Integration
- Automatic cache invalidation for WSF APIs
- Configurable polling intervals
- Graceful error handling
- Clean separation of concerns

## Migration Guide

### Step 1: Import the Factory

```typescript
import { createUseQueryWsdot, createUseQueryWsf } from '@/shared/tanstack';
```

### Step 2: Replace Existing Hooks

**WSDOT APIs:**
```typescript
// Old
export const useHighwayAlerts = (
  params: GetHighwayAlertsParams = {},
  options?: TanStackOptions<HighwayAlerts>
) => {
  return useQuery({
    queryKey: ["wsdot", "highway-alerts", "getHighwayAlerts", JSON.stringify(params)],
    queryFn: () => getHighwayAlerts(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

// New
export const useHighwayAlerts = createUseQueryWsdot({
  queryFn: getHighwayAlerts,
  queryKeyPrefix: ["wsdot", "highway-alerts", "getHighwayAlerts"],
  defaultOptions: tanstackQueryOptions.MINUTE_UPDATES,
});
```

**WSF APIs:**
```typescript
// Old
export const useVesselBasics = (
  params: GetVesselBasicsParams = {},
  options?: UseQueryOptions<VesselBasics>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "basics"],
    queryFn: () => getVesselBasics(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

// New
export const useVesselBasics = createUseQueryWsf({
  queryFn: getVesselBasics,
  queryKeyPrefix: ["wsf", "vessels", "basics"],
  defaultOptions: tanstackQueryOptions.DAILY_UPDATES,
  getCacheFlushDate: getCacheFlushDateVessels,
});
```

### Step 3: Update Usage (No Changes Needed)

```typescript
// This usage remains exactly the same
const { data: alerts } = useHighwayAlerts();
const { data: alerts } = useHighwayAlerts({ region: "Northwest" });
const { data: alerts } = useHighwayAlerts({}, { staleTime: 30000 });
```

## Options Merging Behavior

The factory uses a simple spread operator for options merging:

```typescript
// Default options are applied first
// Consumer options override defaults
return useQuery({
  queryKey,
  queryFn: () => queryFn(params),
  ...defaultOptions,  // Applied first
  ...options,         // Overrides defaults
});
```

**Example:**
```typescript
// Hook definition
export const useHighwayAlerts = createUseQueryWsdot({
  queryFn: getHighwayAlerts,
  queryKeyPrefix: ["wsdot", "highway-alerts"],
  defaultOptions: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  },
});

// Usage
const { data } = useHighwayAlerts(
  { region: "Northwest" },
  {
    staleTime: 30 * 1000, // Overrides default (30 seconds)
    // refetchInterval keeps default (5 minutes)
  }
);
```

## Architecture Decisions

### Why Two Factory Functions?

1. **Clear Separation** - WSDOT and WSF APIs have different caching needs
2. **Type Safety** - Each factory has specific configuration requirements
3. **Maintainability** - Changes to one API type don't affect the other
4. **KISS Principle** - Simple, focused functions instead of complex abstractions

### Why JSON.stringify for Query Keys?

1. **Simplicity** - Handles complex parameter objects automatically
2. **Performance** - JSON.stringify performance is trivial for query keys
3. **Consistency** - All hooks use the same query key generation pattern
4. **Reliability** - No custom logic needed for different parameter types

### Why Type Assertions?

1. **TanStack Query Compatibility** - The library's type system requires specific constraints that are difficult to satisfy with pure TypeScript generics
2. **Type Safety** - Type assertions ensure correct types while maintaining compatibility with TanStack Query's complex type system
3. **Documentation** - Comprehensive TSDoc comments explain why these design decisions were made and how to use the factories effectively
4. **Practicality** - Balances type safety with real-world library constraints, providing the best developer experience possible

### Common Confusion Points

**Q: Why not use a single factory function?**
A: WSDOT and WSF APIs have fundamentally different caching requirements. WSDOT APIs use standard time-based caching, while WSF APIs offer change-based invalidation. Having separate factories makes the requirements explicit and prevents configuration errors.

**Q: Can I disable the auto-update behavior in WSF hooks?**
A: Yes! You can disable both the query and auto-update by passing `{ enabled: false }` as an option. The auto-update logic respects the same `enabled` flag as the main query.

**Q: What happens if the cacheFlushDate endpoint fails?**
A: The auto-update logic is designed to fail gracefully. If the endpoint fails, it will continue polling without throwing errors, ensuring that the main query functionality remains unaffected.

**Q: Are these factories compatible with all TanStack Query features?**
A: Yes! The factories are slim wrappers around `useQuery` and support all standard TanStack Query options including `staleTime`, `refetchInterval`, `enabled`, `select`, `onSuccess`, etc.
