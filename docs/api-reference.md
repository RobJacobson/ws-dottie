# WSDOT API Client Reference

This reference provides a high-level overview of the WSDOT API client library. For detailed endpoint documentation, see the specific endpoint guides in the `docs/` directory.

## Table of Contents

- [Overview](#overview)
- [Library Structure](#library-structure)
- [Quick Reference](#quick-reference)
- [Entry Points](#entry-points)
- [Shared Utilities](#shared-utilities)

## Overview

The WSDOT API client provides TypeScript-first access to **16 API endpoints**:

- **12 WSDOT APIs** - Washington State Department of Transportation services
- **4 WSF APIs** - Washington State Ferries services

All APIs include:
- TypeScript type definitions
- React Query hooks with intelligent caching
- Error handling with custom error types
- Automatic cache invalidation

## Library Structure

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

## Quick Reference

### WSDOT APIs

| API | Description | Documentation | Update Frequency |
|-----|-------------|---------------|------------------|
| **Border Crossings** | Wait times for US-Canada border crossings | [`docs/wsdot-border-crossings/`](./wsdot-border-crossings/) | Real-time |
| **Bridge Clearances** | Bridge clearance information for commercial vehicles | [`docs/wsdot-bridge-clearances/`](./wsdot-bridge-clearances/) | Static |
| **Commercial Vehicle Restrictions** | Weight limits and restrictions | [`docs/wsdot-commercial-vehicle-restrictions/`](./wsdot-commercial-vehicle-restrictions/) | Static |
| **Highway Alerts** | Real-time traffic alerts and road conditions | [`docs/wsdot-highway-alerts/`](./wsdot-highway-alerts/) | Real-time |
| **Highway Cameras** | Highway camera feeds and images | [`docs/wsdot-highway-cameras/`](./wsdot-highway-cameras/) | Real-time |
| **Mountain Pass Conditions** | Road and weather conditions for mountain passes | [`docs/wsdot-mountain-pass-conditions/`](./wsdot-mountain-pass-conditions/) | Real-time |
| **Toll Rates** | Current toll rates for Washington toll roads | [`docs/wsdot-toll-rates/`](./wsdot-toll-rates/) | Static |
| **Traffic Flow** | Real-time traffic flow data | [`docs/wsdot-traffic-flow/`](./wsdot-traffic-flow/) | Real-time |
| **Travel Times** | Travel time information for major corridors | [`docs/wsdot-travel-times/`](./wsdot-travel-times/) | Real-time |
| **Weather Information** | Weather data from WSDOT weather stations | [`docs/wsdot-weather-information/`](./wsdot-weather-information/) | Real-time |
| **Weather Information Extended** | Extended weather data with surface measurements | [`docs/wsdot-weather-information-extended/`](./wsdot-weather-information-extended/) | Real-time |
| **Weather Stations** | Information about WSDOT weather stations | [`docs/wsdot-weather-stations/`](./wsdot-weather-stations/) | Static |

### WSF APIs

| API | Description | Documentation | Update Frequency |
|-----|-------------|---------------|------------------|
| **Vessels** | Ferry vessel information and real-time locations | [`docs/wsf-vessels/`](./wsf-vessels/) | Real-time |
| **Terminals** | Ferry terminal information and wait times | [`docs/wsf-terminals/`](./wsf-terminals/) | Real-time |
| **Schedule** | Ferry schedules and route information | [`docs/wsf-schedule/`](./wsf-schedule/) | Static |
| **Fares** | Ferry fare information and pricing | [`docs/wsf-fares/`](./wsf-fares/) | Static |

## Entry Points

### Main Library Exports (`index.ts`)

```typescript
import { 
  WsdotBorderCrossings,
  WsdotHighwayAlerts,
  WsfVessels,
  WsfTerminals,
  // ... all API modules
} from '@wsdot/api-client';

// Access raw API functions
const crossings = await WsdotBorderCrossings.getBorderCrossings();
const vessels = await WsfVessels.getVesselBasics();
```

### React Integration (`react.ts`)

```typescript
import { 
  useBorderCrossings,
  useHighwayAlerts,
  useVesselLocations,
  useTerminalWaitTimes,
  // ... all React hooks
} from '@wsdot/api-client/react';

// Use React Query hooks
const { data: crossings } = useBorderCrossings();
const { data: vessels } = useVesselLocations();
```

## Shared Utilities

### Caching

```typescript
import { 
  WsfCacheProvider,
  
  REACT_QUERY,
} from '@wsdot/api-client/react';

// Cache provider for automatic invalidation
<WsfCacheProvider />

// Manual cache invalidation
const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: ["vessels"] });
```

### Fetching

```typescript
import { 
  fetchInternal,
  parseWsdotDate,
  WsdotApiError
} from '@wsdot/api-client';

// Internal fetch with error handling
const data = await fetchInternal('/api/endpoint');

// Date utilities
const date = parseWsdotDate('/Date(1640995200000-0800)/');
```

## Caching Strategies

The library uses three distinct caching strategies:

### 1. Frequent Updates (Real-time Data)
- **Use cases**: Vessel locations, terminal wait times, highway alerts
- **Config**: 5-second refetch interval, 30-second stale time
- **Examples**: `useVesselLocations()`, `useTerminalWaitTimes()`

### 2. Infrequent Updates (Static Data)
- **Use cases**: Terminal information, vessel specifications, routes
- **Config**: No auto-refetch, 1-week stale time
- **Examples**: `useVesselBasics()`, `useTerminalBasics()`

### 3. Cache Flush Monitoring
- **Use cases**: Cache invalidation based on server flush dates
- **Config**: 2-minute refetch interval, 5-minute stale time
- **Examples**: `useCacheFlushDateVessels()`, `useCacheFlushDateTerminals()`

## Error Handling

```typescript
import { WsdotApiError, WsdotAuthError, WsdotRateLimitError } from '@wsdot/api-client';

try {
  const data = await someApiCall();
} catch (error) {
  if (error instanceof WsdotApiError) {
    console.error('API Error:', error.code, error.message);
  } else if (error instanceof WsdotAuthError) {
    console.error('Authentication Error:', error.message);
  }
}
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WsfCacheProvider />
    <YourApp />
  </QueryClientProvider>
);
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

## Documentation Index

For detailed information about each API endpoint, see:

### WSDOT APIs
- [Border Crossings](./wsdot-border-crossings/) - Wait times for US-Canada border crossings
- [Bridge Clearances](./wsdot-bridge-clearances/) - Bridge clearance information
- [Commercial Vehicle Restrictions](./wsdot-commercial-vehicle-restrictions/) - Weight limits and restrictions
- [Highway Alerts](./wsdot-highway-alerts/) - Real-time traffic alerts
- [Highway Cameras](./wsdot-highway-cameras/) - Highway camera feeds
- [Mountain Pass Conditions](./wsdot-mountain-pass-conditions/) - Mountain pass road conditions
- [Toll Rates](./wsdot-toll-rates/) - Current toll rates
- [Traffic Flow](./wsdot-traffic-flow/) - Real-time traffic flow data
- [Travel Times](./wsdot-travel-times/) - Travel time information
- [Weather Information](./wsdot-weather-information/) - Weather data from WSDOT stations
- [Weather Information Extended](./wsdot-weather-information-extended/) - Extended weather data
- [Weather Stations](./wsdot-weather-stations/) - WSDOT weather station information

### WSF APIs
- [Vessels](./wsf-vessels/) - Ferry vessel information and locations
- [Terminals](./wsf-terminals/) - Ferry terminal information and wait times
- [Schedule](./wsf-schedule/) - Ferry schedules and routes
- [Fares](./wsf-fares/) - Ferry fare information

### Shared Documentation
- [Development Guide](./development-guide.md) - Architecture and development patterns
- [API Access](./readme-api-access.md) - Getting API access and authentication
- [Shared Utilities](./shared/) - Caching and fetching utilities

## Performance Benchmarks

- **WSDOT APIs**: 2-second performance benchmark
- **WSF APIs**: 2-second performance benchmark
- **Rate Limiting**: 100ms delay between API calls
- **Cache Efficiency**: Automatic invalidation based on server flush dates

This reference provides a quick overview of the library. For detailed endpoint documentation, examples, and type definitions, see the specific endpoint guides linked above. 