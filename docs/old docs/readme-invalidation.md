## WSF Auto-Invalidation (Cache Flush Date)

This library supports automatic invalidation for WSF APIs (fares, vessels, terminals, schedule) using the cache flush date endpoint. This preserves the previous factory behavior while keeping the new queryOptions pattern.

### What it does

- Polls the WSF cache-flush endpoint every five minutes
- Compares the latest flush timestamp to the previous one
- When the timestamp changes, invalidates all queries whose keys start with ["wsf", apiType]
- Active queries refetch in the background; your options usage doesn’t change

### API

- useWsfAutoInvalidateOnUpdate(apiType: "fares" | "vessels" | "terminals" | "schedule")
- wsfCacheFlushDateOptions(apiType) – exposed in case you need direct control, but not required for typical usage

Cadence and reliability:
- staleTime = FIVE_MINUTES, refetchInterval = FIVE_MINUTES
- retry = 3, retryDelay = FIVE_SECONDS
- gcTime = ONE_DAY

### How to use

Mount the auto-invalidation hook once (e.g., in your app root or layout). Then keep using your feature queries with `...Options` + `useQuery` as usual.

```tsx
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// In this repo (internal)
import { useWsfAutoInvalidateOnUpdate } from '@/shared/caching/cacheFlushDate';
// When consuming the package, this will be exported at the package entry (planned)
// import { useWsfAutoInvalidateOnUpdate } from 'ws-dottie';
import { WsfSchedule } from 'ws-dottie';

const queryClient = new QueryClient();

function AppRoot() {
  // Automatically invalidates all queries whose keys start with ['wsf', 'schedule']
  useWsfAutoInvalidateOnUpdate('schedule');

  return (
    <QueryClientProvider client={queryClient}>
      <RoutesPage />
    </QueryClientProvider>
  );
}

function RoutesPage() {
  const { data, isLoading, error } = useQuery(
    WsfSchedule.routesOptions({ tripDate: new Date() })
  );
  if (isLoading) return <div>Loading…</div>;
  if (error) return <div>Failed to load</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

### Notes

- The hook invalidates prefix ["wsf", apiType]; no additional configuration is needed.
- Works across all WSF namespaces; just change the `apiType`.
- Your query options remain the source of truth for cadence and behavior; the helper only signals refetches when data updates.


