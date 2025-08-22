# WSF Caching System

This document describes the hybrid caching system for WSF APIs that combines automatic cache flush monitoring with intelligent refetch intervals.

## Overview

The new caching system provides:
- **Zero configuration required** - automatically monitors all WSF cache flush endpoints
- **Hybrid approach** - combines cache flush monitoring with backup refetch intervals
- **Efficient polling** - single 5-minute interval for all cache flush endpoints
- **Automatic invalidation** - queries are automatically invalidated when data changes
- **Backward compatibility** - existing individual providers still work

## Quick Start

### Option 1: Automatic (Recommended)

Simply include the `WSFCacheProvider` anywhere in your React tree:

```tsx
import { WSFCacheProvider } from "@/shared/caching";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WSFCacheProvider />
      {/* Your app components */}
    </QueryClientProvider>
  );
}
```

That's it! All WSF APIs will automatically be monitored for cache changes.

### Option 2: Manual (Legacy)

If you prefer manual control, you can still use individual providers:

```tsx
import { 
  FaresCacheProvider, 
  ScheduleCacheProvider,
  TerminalCacheProvider,
  VesselCacheProvider 
} from "@/api/wsf-*/cache";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FaresCacheProvider />
      <ScheduleCacheProvider />
      <TerminalCacheProvider />
      <VesselCacheProvider />
      {/* Your app components */}
    </QueryClientProvider>
  );
}
```

## How It Works

### 1. Cache Flush Monitoring
- **Frequency**: Every 5 minutes
- **Endpoints**: All WSF cache flush endpoints (fares, schedule, terminals, vessels)
- **Efficiency**: Single polling interval for all endpoints
- **Action**: Automatically invalidates relevant queries when changes detected

### 2. Backup Refetch Intervals
- **Static data** (terminals, vessel specs): 24-hour refetch + cache flush monitoring
- **Moderate data** (schedules, fares): 6-hour refetch + cache flush monitoring
- **Real-time data** (vessel locations): 5-minute refetch (unchanged)

### 3. Query Invalidation
When a cache flush date changes:
1. All queries for that endpoint are invalidated
2. Related queries are also invalidated
3. Fresh data is fetched automatically
4. No user intervention required

## Configuration Options

### New Caching Strategies

```typescript
import { tanstackQueryOptions } from "@/shared/caching";

// For static data (terminals, vessel specs, routes)
const staticDataOptions = tanstackQueryOptions.STATIC_DATA;

// For moderate frequency data (schedules, fares, weather)
const moderateOptions = tanstackQueryOptions.MODERATE_FREQUENCY;

// For real-time data (vessel locations, wait times)
const realtimeOptions = tanstackQueryOptions.REALTIME_UPDATES;
```

### Migration from Old Strategies

```typescript
// OLD (deprecated)
const oldOptions = tanstackQueryOptions.WEEKLY_UPDATES;
const oldHourlyOptions = tanstackQueryOptions.HOURLY_UPDATES;

// NEW (recommended)
const newOptions = tanstackQueryOptions.STATIC_DATA;        // was WEEKLY_UPDATES
const newModerateOptions = tanstackQueryOptions.MODERATE_FREQUENCY; // was HOURLY_UPDATES
```

## Performance Characteristics

### Network Usage
- **Cache flush polling**: ~4 requests every 5 minutes (very lightweight)
- **Data refetching**: Only when cache flush dates change or backup intervals trigger
- **Efficiency**: Minimal overhead, maximum responsiveness

### Memory Usage
- **Cache storage**: Configurable via `gcTime` option
- **Monitoring state**: Minimal memory footprint
- **Query invalidation**: Automatic cleanup

## Advanced Usage

### Custom Cache Flush Monitoring

If you need custom monitoring logic:

```typescript
import { useGlobalCacheFlushMonitor } from "@/shared/caching";

function CustomMonitor() {
  const { cacheFlushDates, isMonitoring, hasErrors } = useGlobalCacheFlushMonitor();
  
  // Custom logic based on monitoring state
  if (hasErrors) {
    console.warn("Cache flush monitoring has errors");
  }
  
  return (
    <div>
      <p>Monitoring: {isMonitoring ? "Active" : "Inactive"}</p>
      <p>Last fares update: {cacheFlushDates.fares?.toISOString()}</p>
    </div>
  );
}
```

### Integration with React Query DevTools

The system works seamlessly with React Query DevTools:

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WSFCacheProvider />
      {/* Your app components */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

## Troubleshooting

### Common Issues

1. **Queries not invalidating**
   - Ensure `WSFCacheProvider` is mounted in your component tree
   - Check that your query keys match the expected patterns
   - Verify cache flush endpoints are accessible

2. **Too many network requests**
   - The system is designed to minimize requests
   - Cache flush polling is very lightweight
   - Data is only refetched when actually changed

3. **Memory leaks**
   - React Query handles cleanup automatically
   - Monitor state is cleaned up when components unmount
   - Use `gcTime` to control cache retention

### Debug Mode

Enable debug logging to see what's happening:

```typescript
// In your app initialization
if (process.env.NODE_ENV === 'development') {
  console.log('WSF Cache monitoring enabled');
}
```

## Migration Guide

### From Individual Providers

1. **Replace multiple providers** with single `WSFCacheProvider`
2. **Update query options** to use new strategies
3. **Test functionality** to ensure queries still work
4. **Remove old providers** once confirmed working

### From Manual Cache Management

1. **Remove manual cache invalidation** code
2. **Add WSFCacheProvider** to your component tree
3. **Update stale time** configurations if needed
4. **Test automatic invalidation** works as expected

## Best Practices

1. **Place WSFCacheProvider high** in your component tree
2. **Use appropriate caching strategies** for different data types
3. **Monitor performance** in production environments
4. **Keep cache flush endpoints** accessible and responsive
5. **Test cache invalidation** during development

## Future Enhancements

- **Configurable polling intervals** per endpoint
- **Custom cache invalidation rules**
- **Performance metrics** and monitoring
- **Offline support** with cache persistence
- **Advanced retry strategies** for failed cache flush requests
