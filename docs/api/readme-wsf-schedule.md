# WSF Schedule API

The WSF Schedule API provides comprehensive access to Washington State Ferries schedule information, including routes, schedules, alerts, and seasonal data.

## Overview

This module integrates with Washington State Ferries Schedule APIs to provide:
- Route information and schedules
- Detailed route information with vessel assignments
- Active service seasons
- Service alerts and disruptions
- Time adjustments and valid date ranges

## WSDOT Documentation
- [WSF Schedule API Documentation](https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html)
- [WSF Schedule API Help](https://www.wsdot.wa.gov/ferries/api/schedule/rest/help)

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
import { 
  useRoutes, 
  useRoutesByTerminals,
  useRouteDetails,
  useRoutesWithDisruptions,
  useScheduledRoutes,
  useActiveSeasons,
  useAlerts
} from '@/api/wsf/schedule/routes';

function RouteComponent() {
  const tripDate = new Date('2024-04-01');
  const departingTerminalId = 7;
  const arrivingTerminalId = 8;

  // Default: enabled is true
  const { data: routes, isLoading: routesLoading } = useRoutes(tripDate);
  const { data: terminalRoutes, isLoading: terminalRoutesLoading } = useRoutesByTerminals({
    tripDate,
    departingTerminalId,
    arrivingTerminalId
  });
  const { data: routeDetails, isLoading: detailsLoading } = useRouteDetails(tripDate);
  const { data: disruptedRoutes, isLoading: disruptionsLoading } = useRoutesWithDisruptions(tripDate);
  const { data: scheduledRoutes, isLoading: scheduledLoading } = useScheduledRoutes();
  const { data: activeSeasons, isLoading: seasonsLoading } = useActiveSeasons();
  const { data: alerts, isLoading: alertsLoading } = useAlerts();

  if (routesLoading || terminalRoutesLoading || detailsLoading || disruptionsLoading || 
      scheduledLoading || seasonsLoading || alertsLoading) {
    return <div>Loading route data...</div>;
  }

  return (
    <div>
      <h2>All Routes</h2>
      {routes?.map(route => (
        <div key={route.routeId}>
          {route.routeName} - {route.description}
        </div>
      ))}
      
      <h2>Terminal Routes</h2>
      {terminalRoutes?.map(route => (
        <div key={route.routeId}>
          {route.routeName} - {route.description}
        </div>
      ))}

      <h2>Route Details</h2>
      {routeDetails?.map(detail => (
        <div key={detail.routeId}>
          {detail.routeName} - Vessel: {detail.vesselName}
        </div>
      ))}

      <h2>Service Disruptions</h2>
      {disruptedRoutes?.map(route => (
        <div key={route.routeId}>
          {route.routeName} - {route.disruptionDescription}
        </div>
      ))}

      <h2>Active Seasons</h2>
      {activeSeasons?.map(season => (
        <div key={season.scheduleId}>
          {season.description} - {season.startDate} to {season.endDate}
        </div>
      ))}

      <h2>Alerts</h2>
      {alerts?.map(alert => (
        <div key={alert.alertId}>
          {alert.alertHeader} - {alert.alertText}
        </div>
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

### Using Specific Route Hooks
```typescript
import { 
  useRoutesByTerminals,
  useRouteDetails,
  useRoutesWithDisruptions
} from '@/api/wsf/schedule/routes';

function SpecificRouteComponent({ 
  tripDate, 
  departingTerminalId, 
  arrivingTerminalId 
}: { 
  tripDate: Date;
  departingTerminalId: number;
  arrivingTerminalId: number;
}) {
  const { data: routes } = useRoutesByTerminals({
    tripDate,
    departingTerminalId,
    arrivingTerminalId
  });
  const { data: routeDetails } = useRouteDetails(tripDate);
  const { data: disruptions } = useRoutesWithDisruptions(tripDate);

  return (
    <div>
      <h3>Available Routes</h3>
      {routes?.map(route => (
        <div key={route.routeId}>
          {route.routeName} - {route.description}
        </div>
      ))}
      
      <h3>Route Details</h3>
      {routeDetails?.map(detail => (
        <div key={detail.routeId}>
          {detail.routeName} - Vessel: {detail.vesselName}
        </div>
      ))}
      
      <h3>Service Disruptions</h3>
      {disruptions?.map(route => (
        <div key={route.routeId}>
          {route.routeName} - {route.disruptionDescription}
        </div>
      ))}
    </div>
  );
}
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

The hooks use default caching options from `createInfrequentUpdateOptions()` and `createFrequentUpdateOptions()`. You do not need to set `enabled`, `refetchInterval`, or `staleTime` manually—these are handled automatically. You can override any option by passing an options object to the hook.

**Caching by Data Type:**
- **Routes**: Infrequent updates (daily)
- **Route Details**: Infrequent updates (daily)
- **Alerts**: Frequent updates (real-time)
- **Active Seasons**: Infrequent updates (weekly)
- **Scheduled Routes**: Infrequent updates (weekly)

## Common Use Cases

- **Route Planning**: Find available routes between terminals
- **Schedule Lookup**: Get departure times and frequencies
- **Service Monitoring**: Track service disruptions and alerts
- **Seasonal Planning**: Access seasonal service information
- **Terminal Navigation**: Find routes serving specific terminals
- **Real-time Updates**: Monitor alerts and service changes
- **Historical Analysis**: Review route and schedule data
- **Travel Planning**: Plan trips with current schedule information 