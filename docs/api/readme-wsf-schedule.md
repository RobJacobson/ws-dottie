# WSF Schedule API

The WSF Schedule API provides comprehensive access to Washington State Ferries schedule information, including routes, schedules, alerts, and seasonal data.

## Overview

This module integrates with Washington State Ferries Schedule APIs to provide:
- Route information and schedules
- Detailed route information with vessel assignments
- Active service seasons
- Service alerts and disruptions
- Time adjustments and valid date ranges

## API Endpoints

### Schedule API (`/schedule`)
**Base URL**: `https://www.wsdot.wa.gov/ferries/api/schedule/rest`

#### Available Endpoints
- `/routes` - Route information and schedules
- `/routedetails` - Detailed route information
- `/activeseasons` - Active service seasons
- `/alerts` - Service alerts and disruptions
- `/schedroutes` - Scheduled routes by season
- `/cacheflushdate` - Cache flush date information

#### Data Types
- `Route` - Route information and schedules
- `Schedule` - Departure times and frequency
- `Alert` - Service disruptions and delays
- `ActiveSeason` - Seasonal service information

#### Update Frequency
- **Schedules**: Daily
- **Alerts**: Real-time
- **Seasonal Data**: Weekly

## Usage Examples

### Get Routes for a Date
```typescript
import { getRoutes } from '@/api/wsf/schedule/routes';

const routes = await getRoutes(new Date('2024-04-01'));
```

### Get Routes Between Specific Terminals
```typescript
import { getRoutesByTerminals } from '@/api/wsf/schedule/routes';

const routes = await getRoutesByTerminals({
  tripDate: new Date('2024-04-01'),
  departingTerminalId: 7, // Anacortes
  arrivingTerminalId: 8  // Friday Harbor
});
```

### Get Routes with Service Disruptions
```typescript
import { getRoutesWithDisruptions } from '@/api/wsf/schedule/routes';

const disruptedRoutes = await getRoutesWithDisruptions(new Date('2024-04-01'));
```

### Get Detailed Route Information
```typescript
import { getRouteDetails } from '@/api/wsf/schedule/routes';

const detailedRoutes = await getRouteDetails(new Date('2024-04-01'));
```

### Get Scheduled Routes
```typescript
import { getScheduledRoutes } from '@/api/wsf/schedule/routes';

const scheduledRoutes = await getScheduledRoutes();
```

### Get Active Seasons
```typescript
import { getActiveSeasons } from '@/api/wsf/schedule/routes';

const seasons = await getActiveSeasons();
```

### Get Alerts
```typescript
import { getAlerts } from '@/api/wsf/schedule/routes';

const alerts = await getAlerts();
```

## React Query Integration

### Using Hooks
```typescript
import { useRoutes, useRoutesByTerminals } from '@/api/wsf/schedule/routes';

function RouteComponent() {
  // Default: enabled is true
  const { data: routes, isLoading } = useRoutes();
  // Override enabled: false
  const { data: terminalRoutes } = useRoutesByTerminals({
    tripDate: new Date(),
    departingTerminalId: 7,
    arrivingTerminalId: 8
  }, { enabled: false });

  if (isLoading) return <div>Loading routes...</div>;

  return (
    <div>
      <h2>All Routes</h2>
      {routes?.map(route => (
        <div key={route.routeId}>{route.routeName}</div>
      ))}
      
      <h2>Terminal Routes</h2>
      {terminalRoutes?.map(route => (
        <div key={route.routeId}>{route.routeName}</div>
      ))}
    </div>
  );
}
```

### Overriding Default Options
All hooks use default caching options with `enabled: true`. You can override `enabled` or any other React Query option by passing an options object as the second argument to the hook:

```typescript
const { data } = useRoutes(tripDate, { enabled: false }); // disables the query
```

## Data Transformation

The API automatically transforms WSF date formats to JavaScript Date objects:

- **`/Date(timestamp)/`** → `Date` object
- **`YYYY-MM-DD`** → `Date` object
- **`MM/DD/YYYY`** → `Date` object

All PascalCase keys are converted to camelCase for consistency.

## Error Handling

All API functions return empty arrays (`[]`) on errors rather than throwing exceptions, making them perfect for use with React Query and other state management solutions.

## Caching Strategy

The hooks use default caching options from `createInfrequentUpdateOptions()` and `createFrequentUpdateOptions()`, with `enabled: true` by default. You do not need to set `enabled`, `refetchInterval`, or `staleTime` manually—these are handled automatically. You can override any option by passing an options object to the hook. 