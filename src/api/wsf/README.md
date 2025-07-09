# WSF Data Layer

The WSF (Washington State Ferries) data layer provides a comprehensive interface to all WSF APIs with automatic date parsing, type safety, and efficient caching.

## Overview

This module integrates with Washington State Ferries APIs to provide:
- Real-time vessel tracking and positions
- Terminal information and space availability
- Schedule data and route information
- Service alerts and disruptions

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │    │   WSF Hooks     │    │   WSF APIs      │
│   (UI Layer)    │◄──►│   (React Query) │◄──►│   (WSF Endpoints)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Shared Utils  │    │   Transform     │    │   Fetch Layer   │
│   (Types/Utils) │    │   (Date/Data)   │    │   (Platform)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## API Endpoints

### Vessels API (`/vessels`)
**Base URL**: `https://www.wsdot.wa.gov/ferries/api/vessels/rest`

#### Available Endpoints
- `/vessellocations` - Real-time vessel positions, speeds, and headings
- `/vesselverbose` - Vessel specifications, capacity, and amenities

#### Data Types
- `VesselLocation` - Current position and status
- `VesselVerbose` - Vessel details and specifications

#### Update Frequency
- **Locations**: Every 30 seconds
- **Vessel Details**: Daily (static data)

### Terminals API (`/terminals`)
**Base URL**: `https://www.wsdot.wa.gov/ferries/api/terminals/rest`

#### Available Endpoints
- `/terminalsailingspace` - Space availability and wait times
- `/terminalverbose` - Terminal information and facilities

#### Data Types
- `TerminalSailingSpace` - Space availability and parking
- `TerminalVerbose` - Terminal facilities and services

#### Update Frequency
- **Space Data**: Every 5 minutes
- **Terminal Details**: Weekly (static data)

### Schedule API (`/schedule`)
**Base URL**: `https://www.wsdot.wa.gov/ferries/api/schedule/rest`

#### Available Endpoints
- `/routes` - Route information and schedules
- `/routedetails` - Detailed route information
- `/activeseasons` - Active service seasons
- `/alerts` - Service alerts and disruptions

#### Data Types
- `Route` - Route information and schedules
- `Schedule` - Departure times and frequency
- `Alert` - Service disruptions and delays
- `ActiveSeason` - Seasonal service information

#### Update Frequency
- **Schedules**: Daily
- **Alerts**: Real-time

## Type System

### Core Types
The WSF data layer uses a comprehensive type system for data transformation and type safety:

#### `JsonValue`
Input type representing JSON-like data that can be transformed:
```typescript
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };
```

#### `JsonX`
Output type with Date objects and camelCase keys:
```typescript
type JsonX =
  | string
  | number
  | boolean
  | null
  | Date
  | JsonX[]
  | { [key: string]: JsonX };
```

#### Generic Types
- **`TransformedJson`**: Generic type for transformed JSON objects
- **`TransformedJsonArray`**: Generic type for transformed JSON arrays

### Type Safety Features
- **Automatic transformation** - No manual type casting required
- **Null safety** - Proper handling of null values
- **Recursive processing** - Handles nested objects and arrays
- **Test-friendly** - Simple `Record<string, any>` for testing

## Data Transformation
The system automatically converts WSF API date formats to JavaScript Date objects:

#### Supported Formats
1. **`/Date(timestamp)/`** - WSF timestamp format
   ```typescript
   "/Date(1703123456789)/" → Date(2023-12-21T14:30:56.789Z)
   ```

2. **`YYYY-MM-DD`** - ISO date format
   ```typescript
   "2023-12-21" → Date(2023-12-21T00:00:00.000Z)
   ```

3. **`MM/DD/YYYY`** - US date format
   ```typescript
   "12/21/2023" → Date(2023-12-21T00:00:00.000Z)
   ```

#### Key Features
- **Pattern-based detection** - No need to maintain field name lists
- **Robust validation** - Ensures dates are valid before conversion
- **Recursive processing** - Handles nested objects and arrays
- **CamelCase conversion** - Converts PascalCase keys to camelCase
- **Error handling** - Graceful fallback for invalid dates

### Example Transformation
```typescript
// Input from WSF API
{
  "LastUpdate": "/Date(1703123456789)/",
  "DepartureTime": "2023-12-21T14:30:00",
  "VesselName": "Walla Walla",
  "RouteId": 1
}

// Output after transformation
{
  "lastUpdate": Date(2023-12-21T14:30:56.789Z),
  "departureTime": Date(2023-12-21T14:30:00.000Z),
  "vesselName": "Walla Walla",
  "routeId": 1
}
```

## Fetch Architecture

### Core Functions

#### `fetchWsf<T>(path: string, options?: FetchOptions)`
Fetches data from WSF APIs with automatic transformation.

```typescript
const vessels = await fetchWsf<VesselLocation[]>('/vessels/vessellocations');
```

#### `fetchWsfArray<T>(path: string, options?: FetchOptions)`
Convenience function for fetching arrays with proper typing.

```typescript
const routes = await fetchWsfArray<Route>('/schedule/routes');
```

#### `fetchInternal(url: string, options?: FetchOptions)`
Platform-specific fetch implementation with comprehensive error handling.

### Platform Support
- **Web**: JSONP implementation for CORS bypass
- **Mobile**: Native fetch with error handling
- **Automatic fallback** between platforms

### Error Handling
- **Graceful degradation** when APIs are unavailable
- **Automatic retry** with exponential backoff
- **Null safety** - Returns null/empty arrays on failure
- **Structured logging** - Configurable debug and error logging

## React Query Integration

### Caching Strategy
- **Memory-based caching** with configurable TTL
- **Background updates** for fresh data
- **Optimistic updates** with rollback on error
- **Structured query keys** for efficient cache management

### Query Patterns
```typescript
// Vessel locations with 30-second refresh
const { data: vessels } = useVesselLocations({
  refetchInterval: 30000,
  staleTime: 15000
});

// Terminal data with 5-minute refresh
const { data: terminals } = useTerminalSailingSpace({
  refetchInterval: 300000,
  staleTime: 150000
});

// Schedule data with daily refresh
const { data: routes } = useRoutes({
  refetchInterval: 86400000,
  staleTime: 43200000
});
```

## Usage Examples

### Vessel Tracking
```typescript
import { useVesselLocations, useVesselVerbose } from '@/data/wsf/vessels';

function VesselTracker() {
  const { data: locations, isLoading } = useVesselLocations();
  const { data: vessels } = useVesselVerbose();

  if (isLoading) return <LoadingSpinner />;

  return (
    <Map>
      {locations?.map(location => {
        const vessel = vessels?.find(v => v.vesselId === location.vesselId);
        return (
          <VesselMarker 
            key={location.vesselId} 
            location={location}
            vessel={vessel}
          />
        );
      })}
    </Map>
  );
}
```

### Terminal Information
```typescript
import { useTerminalSailingSpace, useTerminalVerbose } from '@/data/wsf/terminals';

function TerminalStatus() {
  const { data: spaceData } = useTerminalSailingSpace();
  const { data: terminalDetails } = useTerminalVerbose();

  return (
    <TerminalList>
      {spaceData?.map(space => {
        const terminal = terminalDetails?.find(t => t.terminalId === space.terminalId);
        return (
          <TerminalCard 
            key={space.terminalId} 
            space={space}
            terminal={terminal}
          />
        );
      })}
    </TerminalList>
  );
}
```

### Schedule Information
```typescript
import { useRoutes, useSchedules, useAlerts } from '@/data/wsf/schedule';

function ScheduleView() {
  const { data: routes } = useRoutes();
  const { data: schedules } = useSchedules();
  const { data: alerts } = useAlerts();

  return (
    <ScheduleContainer>
      <AlertBanner alerts={alerts} />
      <RouteList>
        {routes?.map(route => (
          <RouteSchedule 
            key={route.routeId} 
            route={route}
            schedules={schedules?.filter(s => s.routeId === route.routeId)}
          />
        ))}
      </RouteList>
    </ScheduleContainer>
  );
}
```

## Performance Optimizations

### Caching Strategy
- **Aggressive caching** for static data (vessel details, terminal info)
- **Frequent updates** for dynamic data (positions, space availability)
- **Smart invalidation** based on data freshness requirements

### Network Optimization
- **Request batching** for multiple API calls
- **Compression** for large data payloads
- **Connection pooling** for efficient resource usage

### Memory Management
- **Efficient data structures** for large datasets
- **Garbage collection** for unused cache entries
- **Memory monitoring** for performance tracking

## Error Handling

### API Failures
- **Graceful degradation** - Show cached data when APIs are down
- **User feedback** - Clear error messages and retry options
- **Automatic recovery** - Background retry with exponential backoff

### Data Validation
- **Type checking** - Runtime validation of API responses
- **Schema validation** - Ensure data structure integrity
- **Fallback values** - Provide defaults for missing data

## Development Tools

### Debugging
- **Network monitoring** - Track API requests and responses
- **Cache inspection** - View cached data and query states
- **Performance profiling** - Monitor data layer performance

### Testing
- **Mock APIs** - Test with simulated data
- **Integration tests** - End-to-end API testing
- **Performance tests** - Load testing and optimization

## Future Enhancements

### Planned Features
- **Offline-first architecture** - Full offline functionality
- **Advanced caching** - More sophisticated caching strategies
- **Data compression** - Reduce bandwidth usage
- **Predictive loading** - Preload data based on user patterns

### API Improvements
- **GraphQL integration** - More efficient data fetching
- **WebSocket support** - Real-time updates for all data
- **Batch operations** - Reduce API call frequency
- **Rate limiting** - Respectful API usage patterns 