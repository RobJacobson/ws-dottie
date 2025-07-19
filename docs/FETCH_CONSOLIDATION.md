# Fetch Function Consolidation

## Overview

The `fetchWsf` and `fetchWsfArray` functions have been consolidated to reduce code duplication while maintaining backward compatibility.

## Before Consolidation

Previously, there were two separate functions:

```typescript
// For single objects
export const fetchWsf = async <T>(
  source: WsfSource,
  endpoint: string,
  logMode?: LoggingMode
): Promise<T> => { /* implementation */ };

// For arrays (just a wrapper around fetchWsf<T[]>)
export const fetchWsfArray = async <T>(
  source: WsfSource,
  endpoint: string,
  logMode?: LoggingMode
): Promise<T[]> => await fetchWsf<T[]>(source, endpoint, logMode);
```

## After Consolidation

The functions have been simplified:

```typescript
// Single consolidated function
export const fetchWsf = async <T>(
  source: WsfSource,
  endpoint: string,
  logMode?: LoggingMode
): Promise<T> => {
  const baseUrl = API_BASES[source];
  const url = `${baseUrl}${endpoint}?apiaccesscode=${API_KEY}`;
  return await fetchInternal<T>(url, endpoint, logMode);
};

// Deprecated wrapper for backward compatibility
export const fetchWsfArray = async <T>(
  source: WsfSource,
  endpoint: string,
  logMode?: LoggingMode
): Promise<T[]> => await fetchWsf<T[]>(source, endpoint, logMode);
```

## Benefits

1. **Reduced Code Duplication**: `fetchWsfArray` was just a wrapper around `fetchWsf<T[]>`, so we eliminated the redundant implementation.

2. **Backward Compatibility**: `fetchWsfArray` is still available but marked as deprecated, so existing code continues to work.

3. **Single Source of Truth**: All fetching logic is now in one place, making maintenance easier.

4. **Simple and Clear**: No complex type inference or function overloads - just explicit typing.

## Usage Examples

### Array Endpoints
```typescript
// These return arrays
const vessels = await fetchWsf<VesselBasic[]>("vessels", "/vesselbasics");
const terminals = await fetchWsf<TerminalLocation[]>("terminals", "/terminallocations");
const routes = await fetchWsf<Route[]>("schedule", "/routes");
```

### Single Object Endpoints
```typescript
// These return single objects
const vessel = await fetchWsf<VesselBasic>("vessels", "/vesselbasics/123");
const terminal = await fetchWsf<TerminalLocation>("terminals", "/terminallocations/456");
const route = await fetchWsf<Route>("schedule", "/routes/789");
```

### Special Endpoints (single values)
```typescript
// These return single values
const cacheDate = await fetchWsf<Date>("vessels", "/cacheflushdate");
const validRange = await fetchWsf<ValidDateRange>("schedule", "/validdaterange");
```

## Migration Guide

### For New Code
Use `fetchWsf` with explicit typing:

```typescript
// Instead of fetchWsfArray<VesselBasic>
const vessels = await fetchWsf<VesselBasic[]>("vessels", "/vesselbasics");

// Instead of fetchWsf<VesselBasic>
const vessel = await fetchWsf<VesselBasic>("vessels", "/vesselbasics/123");
```

### For Existing Code
Existing code using `fetchWsfArray` will continue to work but will show deprecation warnings. Consider migrating to `fetchWsf` with explicit array typing:

```typescript
// Old (deprecated)
const vessels = await fetchWsfArray<VesselBasic>("vessels", "/vesselbasics");

// New (recommended)
const vessels = await fetchWsf<VesselBasic[]>("vessels", "/vesselbasics");
```

## Why This Approach?

1. **Simplicity**: No complex type inference or function overloads
2. **Explicit**: Developers must specify the expected return type, making code more readable
3. **Flexible**: Works with any endpoint pattern, not just those following specific conventions
4. **Maintainable**: Easy to understand and modify

## Future Considerations

1. **Remove fetchWsfArray**: In a future major version, `fetchWsfArray` could be removed entirely.
2. **API documentation**: Consider generating API documentation that shows the expected return types for each endpoint. 