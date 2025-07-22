# Shared Utilities

This directory contains shared utilities and configurations used across the WSF and WSDOT APIs.

## Fetch API

The library provides a unified fetch API that automatically handles platform differences, data transformation, and authentication. You don't need to worry about CORS, date formats, or API keys - it's all handled automatically.

### Platform Auto-Detection

The fetch API automatically detects your environment and uses the appropriate method:

```typescript
// Web browsers: Uses JSONP to bypass CORS restrictions
// Mobile/Node.js: Uses native fetch (no CORS restrictions)
// Test environments: Uses native fetch for simplicity

// You don't need to do anything - it just works!
const { data: vessels } = useVesselBasics();
```

**Why this matters:**
- **Web browsers**: Both WSF and WSDOT APIs have CORS restrictions. The library automatically uses JSONP to bypass these restrictions.
- **Mobile/Server**: No CORS restrictions, so native fetch is used for better performance.
- **Tests**: Native fetch is used to avoid JSONP complexity in test environments.

### Automatic Date Conversion

The library automatically converts date strings to JavaScript Date objects:

```typescript
// WSDOT APIs: "/Date(timestamp)/" format
const wsdotResponse = {
  "Time": "/Date(1753121700000-0700)/",
  "Name": "Highway Alert"
};
// Result: Time becomes a Date object, Name remains a string

// WSF Schedule APIs: "MM/DD/YYYY" and "MM/DD/YYYY HH:MM:SS AM/PM" formats
const wsfResponse = {
  "FromDate": "12/25/2024",
  "ModifiedDate": "12/25/2024 02:30:45 PM",
  "RouteName": "Seattle-Bainbridge"
};
// Result: Both dates become Date objects, RouteName remains a string
```

**Supported date formats:**
- **WSDOT**: `/Date(timestamp)/` format (e.g., `/Date(1753121700000-0700)/`)
- **WSF Schedule**: `MM/DD/YYYY` format (e.g., `12/25/2024`)
- **WSF Schedule**: `MM/DD/YYYY HH:MM:SS AM/PM` format (e.g., `12/25/2024 02:30:45 PM`)

### Automatic API Key Handling

The library automatically handles different API key parameter names for different APIs:

```typescript
// WSDOT APIs: Uses "AccessCode" parameter
// WSF APIs: Uses "apiaccesscode" parameter

// You don't need to worry about this - it's automatic!
const { data: alerts } = useHighwayAlerts(); // WSDOT API
const { data: vessels } = useVesselBasics(); // WSF API
```

**How it works:**
- The library detects the API type from the URL
- WSDOT APIs use `AccessCode=your_token`
- WSF APIs use `apiaccesscode=your_token`
- Your `.env` file should contain `WSDOT_ACCESS_TOKEN=your_token`

### Data Filtering

The library automatically filters out unreliable data fields:

```typescript
// VesselWatch fields are automatically removed from vessel location data
// These fields are undocumented and unreliable:
// - VesselWatchShutID
// - VesselWatchShutMsg  
// - VesselWatchShutFlag
// - VesselWatchStatus
// - VesselWatchMsg

// You get clean, reliable data without these problematic fields
const { data: locations } = useVesselLocations();
```

### Error Handling

All API errors are wrapped in a consistent format:

```typescript
const { data: vessels, error, isError } = useVesselBasics();

if (isError) {
  // All errors (network, API, JSONP) are handled consistently
  console.error('API Error:', error.message);
  return <div>Failed to load vessels</div>;
}
```

**Error types handled:**
- Network timeouts and connection failures
- API error responses (invalid API key, server errors)
- JSONP script loading failures
- Data parsing errors

## Caching Strategies

The library provides several caching strategies through the `REACT_QUERY` configuration object. Choose the strategy that matches your data's update frequency:

```typescript
import { REACT_QUERY } from "@/shared/caching/config";

// Real-time data (updates every few seconds)
const { data: vessels } = useVesselLocations({
  ...REACT_QUERY.REALTIME_UPDATES,
  enabled: false, // Disable automatic refetching
});

// Frequently changing data (updates every minute)
const { data: alerts } = useHighwayAlerts({
  ...REACT_QUERY.MINUTE_UPDATES,
  enabled: false, // Disable automatic refetching
});

// Hourly updates
const { data: weather } = useWeatherInformation({
  ...REACT_QUERY.HOURLY_UPDATES,
  enabled: false, // Disable automatic refetching
});

// Daily updates (static data)
const { data: fares } = useWsfFares({
  ...REACT_QUERY.DAILY_UPDATES,
  enabled: false, // Disable automatic refetching
});

// Weekly updates (rarely changing data)
const { data: terminals } = useTerminalBasics({
  ...REACT_QUERY.WEEKLY_UPDATES,
  enabled: false, // Disable automatic refetching
});
```

## Available Caching Strategies

| Strategy | Use Case | Refetch Interval | Retry |
|----------|----------|------------------|-------|
| `REALTIME_UPDATES` | Vessel locations, real-time data | 5 seconds | 1 retry after 2s |
| `MINUTE_UPDATES` | Highway alerts, traffic flow, toll rates | 1 minute | No retries |
| `HOURLY_UPDATES` | Weather information | 1 hour | 5 retries with exponential backoff |
| `DAILY_UPDATES` | Static data, fares | 1 day | 5 retries with exponential backoff |
| `WEEKLY_UPDATES` | Rarely changing data | No auto-refetch | 5 retries with exponential backoff |

## WSF Cache Providers

WSF APIs use cache flush dates to automatically invalidate queries when data changes. Include only the cache providers you need:

```typescript
import { VesselCacheProvider } from "@/api/wsf-vessels/cache";
import { TerminalCacheProvider } from "@/api/wsf-terminals/cache";
import { ScheduleCacheProvider } from "@/api/wsf-schedule/cache";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Only include the cache providers you need */}
      <VesselCacheProvider />
      <TerminalCacheProvider />
      <ScheduleCacheProvider />
      
      {/* Your app components */}
    </QueryClientProvider>
  );
}
```

**Note**: WSDOT APIs don't use cache flush dates, so no cache providers are needed for them.

## Manual Cache Invalidation

For manual cache invalidation, use React Query's `useQueryClient` directly:

```typescript
import { useQueryClient } from "@tanstack/react-query";

function MyComponent() {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    // Invalidate all vessel queries
    queryClient.invalidateQueries({ queryKey: ["vessels"] });
    
    // Invalidate specific terminal queries
    queryClient.invalidateQueries({ queryKey: ["terminals", "waitTimes"] });
    
    // Invalidate all schedule queries
    queryClient.invalidateQueries({ queryKey: ["schedule"] });
  };

  return <button onClick={handleRefresh}>Refresh Data</button>;
}
```

## Usage Patterns

### Basic Usage
```typescript
// Simple data fetching with automatic caching
const { data: vessels, isLoading, error } = useVesselBasics();
```

### Custom Caching
```typescript
// Override default caching behavior
const { data: vessels } = useVesselBasics({
  ...REACT_QUERY.REALTIME_UPDATES,
  refetchInterval: 10000, // Override to 10 seconds
  enabled: false, // Disable automatic refetching
});
```

### Error Handling
```typescript
const { data: vessels, error, isError } = useVesselBasics();

if (isError) {
  console.error('Failed to fetch vessels:', error);
  return <div>Error loading vessels</div>;
}
```

### Loading States
```typescript
const { data: vessels, isLoading, isFetching } = useVesselBasics();

if (isLoading) {
  return <div>Loading vessels...</div>;
}

// Show loading indicator for background updates
if (isFetching) {
  return <div>Updating vessels...</div>;
}
```