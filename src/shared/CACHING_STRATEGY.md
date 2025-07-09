# WSF API Caching Strategy

This document explains the caching strategy implemented for the WSF API integration, including React Query configurations, cache invalidation, persistence, and best practices.

## Overview

The WSF API caching strategy is designed to optimize performance and user experience by:

1. **Reducing API calls** through intelligent caching
2. **Providing real-time updates** for frequently changing data
3. **Minimizing stale data** through cache invalidation
4. **Optimizing network usage** with appropriate refetch intervals
5. **Enabling offline-first experience** with localStorage persistence

## Type System Integration

The caching strategy works seamlessly with the WSF type system:

### Data Transformation
- **Input**: `JsonValue` - Raw JSON data from WSF APIs
- **Output**: `JsonX` - Transformed data with Date objects and camelCase keys
- **Transformation**: Automatic conversion via `transformWsfData()` function

### Type Safety
```typescript
// API responses are automatically transformed
const vessels = await fetchWsf<VesselLocation[]>('/vessels/vessellocations');
// vessels is typed as VesselLocation[] with proper Date objects

// React Query hooks maintain type safety
const { data: vessels } = useVesselLocations();
// vessels is typed as VesselLocation[] | undefined
```

## Persistence Strategy

### Global Persistence with React Query

The app uses React Query's official persistence system for comprehensive caching:

- **Storage**: localStorage (web) / AsyncStorage (mobile)
- **Scope**: All queries automatically persisted
- **Max Age**: 7 days with automatic cleanup
- **Cache Buster**: `v1` (for app updates)
- **Graceful Degradation**: Falls back to memory-only if storage unavailable

### Startup Refetch Strategy

On app startup, the system implements a hybrid approach for optimal performance:

1. **Loads persisted data instantly** - No loading spinners, immediate UI rendering
2. **Selectively refetches real-time data** - Only data that changes frequently
3. **Preserves infrequent data cache** - Until cache flush invalidation

```typescript
// Real-time data gets refetched on startup
queryClient.invalidateQueries({ 
  queryKey: ["vessels", "locations"],
  exact: true 
});
queryClient.invalidateQueries({ 
  queryKey: ["terminals", "sailingSpace"],
  exact: true 
});

// Infrequent data stays cached until cache flush invalidation
// useVesselVerbose() - stays cached (vessel specifications)
// useTerminalVerbose() - stays cached (terminal info)
// useRoutes() - stays cached (published routes)
// useSchedules() - stays cached (published schedules)
```

### Benefits of Hybrid Approach
- **Better Performance**: Fewer network requests on startup
- **Improved UX**: Faster app loading with cached data
- **Efficient Resource Usage**: Only refetch what's likely stale
- **Automatic Invalidation**: Cache flush dates handle data updates

## Caching Configurations

### 1. Frequent Update Configuration (`FREQUENT_UPDATE_CONFIG`)

Used for data that changes every few seconds to minutes:

- **staleTime**: 30 seconds
- **gcTime**: 2 minutes
- **refetchInterval**: 5 seconds
- **refetchOnWindowFocus**: true
- **retry**: 3 attempts with exponential backoff

**Examples:**
- Vessel locations (real-time positions)
- Terminal sailing space (capacity updates)

### 2. Infrequent Update Configuration (`INFREQUENT_UPDATE_CONFIG`)

Used for data that changes daily to weekly:

- **staleTime**: 1 week
- **gcTime**: 1 month
- **refetchInterval**: false (no automatic refetch)
- **refetchOnWindowFocus**: true (only if stale)
- **retry**: 5 attempts with exponential backoff

**Examples:**
- Terminal information (facilities, addresses)
- Vessel specifications (dimensions, capacity)
- Routes and schedules (published timetables)
- Time adjustments (published changes)
- Alerts and notifications (service updates)
- Wait times (updated every few years)

**Note:** Since this data is automatically invalidated by cache flush dates when it changes, we can cache it aggressively for longer periods to reduce API calls and improve performance.

### 3. Cache Flush Configuration (`CACHE_FLUSH_CONFIG`)

Used for cache flush date queries that monitor data changes:

- **staleTime**: 5 minutes
- **gcTime**: 10 minutes
- **refetchInterval**: 2 minutes
- **refetchOnWindowFocus**: true
- **retry**: 5 attempts with exponential backoff

## Implementation Status

### ✅ Completed Hook Updates

All WSF API hooks have been updated with appropriate caching configurations:

#### Vessels Module
- `useVesselLocations()` - Frequent updates (real-time positions)
- `useVesselLocationsByVesselId()` - Frequent updates (real-time positions)
- `useVesselVerbose()` - Infrequent updates (vessel specifications)
- `useVesselVerboseById()` - Infrequent updates (vessel specifications)
- `useCacheFlushDateVessels()` - Cache flush monitoring

#### Terminals Module
- `useTerminalSailingSpace()` - Frequent updates (capacity/waits)
- `useTerminalSailingSpaceById()` - Frequent updates (capacity/waits)
- `useTerminalVerbose()` - Infrequent updates (terminal info)
- `useTerminalVerboseById()` - Infrequent updates (terminal info)
- `useCacheFlushDateTerminals()` - Cache flush monitoring

#### Schedule Module
- `useRoutes()` - Infrequent updates (published routes)
- `useRoutesByTerminals()` - Infrequent updates (published routes)
- `useRoutesWithDisruptions()` - Infrequent updates (service alerts)
- `useRouteDetails()` - Infrequent updates (detailed routes)
- `useRouteDetailsByTerminals()` - Infrequent updates (detailed routes)
- `useRouteDetailsByRoute()` - Infrequent updates (detailed routes)
- `useScheduledRoutes()` - Infrequent updates (seasonal routes)
- `useScheduledRoutesBySeason()` - Infrequent updates (seasonal routes)
- `useActiveSeasons()` - Infrequent updates (season info)
- `useAlerts()` - Infrequent updates (service alerts)
- `useVessels()` - Infrequent updates (schedule vessels)
- `useVesselsByRoute()` - Infrequent updates (schedule vessels)
- `useTerminals()` - Infrequent updates (schedule terminals)
- `useTerminalsByRoute()` - Infrequent updates (schedule terminals)
- `useTerminalsAndMates()` - Infrequent updates (terminal pairs)
- `useTerminalMates()` - Infrequent updates (terminal pairs)
- `useTimeAdjustments()` - Infrequent updates (schedule changes)
- `useTimeAdjustmentsByRoute()` - Infrequent updates (schedule changes)
- `useTimeAdjustmentsBySchedRoute()` - Infrequent updates (schedule changes)
- `useScheduleByRoute()` - Infrequent updates (published schedules)
- `useScheduleByTerminals()` - Infrequent updates (published schedules)
- `useScheduleTodayByRoute()` - Infrequent updates (published schedules)
- `useScheduleTodayByTerminals()` - Infrequent updates (published schedules)
- `useSailings()` - Infrequent updates (published sailings)
- `useAllSailings()` - Infrequent updates (published sailings)
- `useValidDateRange()` - Infrequent updates (API date range)
- `useCacheFlushDateSchedule()` - Cache flush monitoring

### ✅ Persistence Implementation

- **Global persistence** for all queries using `@tanstack/query-persist-client`
- **Hybrid startup refetch** - selective invalidation for real-time data only
- **Cache flush integration** for automatic invalidation of infrequent data
- **Graceful degradation** - falls back to memory-only if storage unavailable
- **Cross-platform support** - localStorage (web) and AsyncStorage (mobile)

## Cache Invalidation Strategy

### Cache Flush Dates

The WSF APIs provide cache flush dates that indicate when the underlying data has been updated:

- **Vessels**: `/vessels/cacheflushdate`
- **Terminals**: `/terminals/cacheflushdate`
- **Schedule**: `/schedule/cacheflushdate`

### Automatic Invalidation

The `WsfCacheProvider` component automatically monitors cache flush dates and invalidates related queries when data changes:

```tsx
import { WsfCacheProvider } from '@/data/wsf/shared/WsfCacheProvider';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WsfCacheProvider />
      {/* Your app components */}
    </QueryClientProvider>
  );
}
```

### Manual Invalidation

You can also manually invalidate queries using the `useWsfCacheInvalidation` hook:

```tsx
import { useWsfCacheInvalidation } from '@/data/wsf/shared/cacheInvalidation';

function MyComponent() {
  const { invalidateVesselQueries, invalidateTerminalQueries } = useWsfCacheInvalidation();

  const handleRefresh = () => {
    invalidateVesselQueries();
    invalidateTerminalQueries();
  };

  return <button onClick={handleRefresh}>Refresh Data</button>;
}
```

## Persistence Setup

### Query Client Configuration

The persistence is configured at the QueryClient level:

```typescript
import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Configure persistence
const persister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  key: 'wsf-query-cache',
});

// Enable persistence
persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  buster: 'v1', // Cache buster for app updates
});
```

### Startup Invalidation

Configure selective startup invalidation:

```typescript
// In your app startup code
useEffect(() => {
  // Only invalidate real-time data on startup
  queryClient.invalidateQueries({ 
    queryKey: ["vessels", "locations"],
    exact: true 
  });
  queryClient.invalidateQueries({ 
    queryKey: ["terminals", "sailingSpace"],
    exact: true 
  });
}, []);
```

## Implementation Examples

### Frequently Updated Data (Vessel Locations)

```tsx
import { useVesselLocations } from '@/data/wsf/vessels/vesselLocations';

function VesselMap() {
  const { data: vessels, isLoading } = useVesselLocations();
  
  // Data automatically refetches every 5 seconds
  // Cache is considered stale after 30 seconds
  // Queries are invalidated when vessel cache flush date changes
  // Data is persisted to localStorage for offline access
  
  return (
    <Map>
      {vessels?.map(vessel => (
        <VesselMarker key={vessel.vesselID} vessel={vessel} />
      ))}
    </Map>
  );
}
```

### Infrequently Updated Data (Terminal Information)

```tsx
import { useTerminalVerbose } from '@/data/wsf/terminals/terminalverbose';

function TerminalInfo({ terminalId }: { terminalId: number }) {
  const { data: terminal, isLoading } = useTerminalVerboseById(terminalId);
  
  // Data is cached for 1 week, no automatic refetch
  // Queries are invalidated when terminal cache flush date changes
  // Data is persisted to localStorage for offline access
  
  return (
    <div>
      <h2>{terminal?.terminalName}</h2>
      <p>{terminal?.address}</p>
    </div>
  );
}
```

### Schedule Data (Date-Dependent)

```tsx
import { useRoutes } from '@/data/wsf/schedule/routes';

function RouteSchedule({ tripDate }: { tripDate: Date }) {
  const { data: routes, isLoading } = useRoutes(tripDate);
  
  // Data is cached for 1 week, no automatic refetch
  // Queries are invalidated when schedule cache flush date changes
  // Data is persisted to localStorage for offline access
  
  return (
    <div>
      {routes?.map(route => (
        <RouteCard key={route.routeId} route={route} />
      ))}
    </div>
  );
}
```

## Best Practices

### 1. Use Appropriate Configuration

- Use `FREQUENT_UPDATE_CONFIG` for real-time data
- Use `INFREQUENT_UPDATE_CONFIG` for static data
- Use `CACHE_FLUSH_CONFIG` for cache flush date queries

### 2. Implement the Cache Provider

Always include the `WsfCacheProvider` in your app to enable automatic cache invalidation:

```tsx
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WsfCacheProvider />
      <Router>
        <Routes>
          {/* Your routes */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
```

### 3. Handle Loading States

Always handle loading states appropriately:

```tsx
function MyComponent() {
  const { data, isLoading, error } = useVesselLocations();
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <DataDisplay data={data} />;
}
```

### 4. Optimize Query Keys

Use consistent and specific query keys for better cache management:

```tsx
// Good - specific and consistent
queryKey: ["vessels", "locations", "byVesselId", vesselId]

// Avoid - too generic
queryKey: ["vessels"]
```

### 5. Monitor Cache Performance

Use React Query DevTools to monitor cache performance:

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <YourApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
```

## Configuration Reference

### Time Constants

```typescript
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
```

### Helper Functions

```typescript
import { 
  createFrequentUpdateOptions,
  createInfrequentUpdateOptions,
  createCacheFlushOptions 
} from '@/data/wsf/shared/caching';

// Use in your hooks
const queryOptions = createFrequentUpdateOptions({
  // Additional options
});
```

### Cache Invalidation Functions

```typescript
import { useWsfCacheInvalidation } from '@/data/wsf/shared/cacheInvalidation';

const {
  invalidateVesselQueries,
  invalidateTerminalQueries,
  invalidateScheduleQueries,
  invalidateVesselQueriesByType,
  invalidateTerminalQueriesByType,
  invalidateScheduleQueriesByType,
  invalidateAllWsfQueries,
} = useWsfCacheInvalidation();
```

## Troubleshooting

### Data Not Updating

1. Check if the cache flush date has changed
2. Verify the `WsfCacheProvider` is mounted
3. Check React Query DevTools for cache status
4. Manually invalidate queries if needed
5. Check localStorage for persisted data

### Too Many API Calls

1. Increase `staleTime` for infrequently changing data
2. Reduce `refetchInterval` for frequently changing data
3. Check if multiple components are using the same query

### Stale Data

1. Ensure cache flush dates are being monitored
2. Check if cache invalidation is working
3. Verify query keys are consistent
4. Consider manual invalidation for critical updates
5. Check if persistence is working correctly

### Persistence Issues

1. Check localStorage quota (typically 5-10MB)
2. Verify the persistence is set up correctly
3. Check for localStorage errors in console
4. Ensure the app is running on web platform

## Testing

The caching system has been thoroughly tested with:

- ✅ Unit tests for all caching configurations
- ✅ Integration tests for cache invalidation
- ✅ Performance tests for query optimization
- ✅ Error handling tests for network failures
- ✅ Persistence tests for localStorage functionality

All tests pass and the caching system is production-ready. 