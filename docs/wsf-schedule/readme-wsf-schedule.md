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
import { getRoutes } from 'ws-dottie/wsf-schedule';

const routes = await getRoutes(new Date('2024-04-01'));
```

### Get Routes Between Specific Terminals
```typescript
import { getRoutesByTerminals } from 'ws-dottie/wsf-schedule';

const routes = await getRoutesByTerminals(
  new Date('2024-04-01'),
  7, // Anacortes
  8  // Friday Harbor
);
```

### Get Routes with Service Disruptions
```typescript
import { getRoutesWithDisruptions } from 'ws-dottie/wsf-schedule';

const disruptedRoutes = await getRoutesWithDisruptions(new Date('2024-04-01'));
```

### Get Detailed Route Information
```typescript
import { getRouteDetails } from 'ws-dottie/wsf-schedule';

const detailedRoutes = await getRouteDetails(new Date('2024-04-01'));
```

### Get Scheduled Routes
```typescript
import { getScheduledRoutes } from 'ws-dottie/wsf-schedule';

const scheduledRoutes = await getScheduledRoutes();
```

### Get Active Seasons
```typescript
import { getActiveSeasons } from 'ws-dottie/wsf-schedule';

const seasons = await getActiveSeasons();
```

### Get Alerts
```typescript
import { getAlerts } from 'ws-dottie/wsf-schedule';

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
} from 'ws-dottie/react/wsf-schedule';

function RouteComponent() {
  const tripDate = new Date('2024-04-01');
  const departingTerminalId = 7;
  const arrivingTerminalId = 8;

  // Default: enabled is true
  const { data: routes, isLoading: routesLoading } = useRoutes(tripDate);
  const { data: terminalRoutes, isLoading: terminalRoutesLoading } = useRoutesByTerminals(
    tripDate,
    departingTerminalId,
    arrivingTerminalId
  );
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
        <div key={route.RouteID}>
          {route.RouteName} - {route.Description}
        </div>
      ))}
      
      <h2>Terminal Routes</h2>
      {terminalRoutes?.map(route => (
        <div key={route.RouteID}>
          {route.RouteName} - {route.Description}
        </div>
      ))}

      <h2>Route Details</h2>
      {routeDetails?.map(detail => (
        <div key={detail.RouteID}>
          {detail.RouteName} - Vessel: {detail.VesselName}
        </div>
      ))}

      <h2>Service Disruptions</h2>
      {disruptedRoutes?.map(route => (
        <div key={route.RouteID}>
          {route.RouteName} - {route.DisruptionDescription}
        </div>
      ))}

      <h2>Active Seasons</h2>
      {activeSeasons?.map(season => (
        <div key={season.ScheduleID}>
          {season.Description} - {season.StartDate} to {season.EndDate}
        </div>
      ))}

      <h2>Alerts</h2>
      {alerts?.map(alert => (
        <div key={alert.AlertID}>
          {alert.AlertHeader} - {alert.AlertText}
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
} from 'ws-dottie/react/wsf-schedule';

function SpecificRouteComponent({ 
  tripDate, 
  departingTerminalId, 
  arrivingTerminalId 
}) {
  const { data: routes } = useRoutesByTerminals(
    tripDate, 
    departingTerminalId, 
    arrivingTerminalId
  );
  
  return (
    <div>
      {routes?.map(route => (
        <div key={route.RouteID}>
          {route.RouteName}: {route.Description}
        </div>
      ))}
    </div>
  );
}
```

## Available Functions

### Route Functions
- `getRoutes(tripDate: Date)` - Get all routes for a date
- `getRoutesByTerminals(tripDate: Date, departingTerminalId: number, arrivingTerminalId: number)` - Get routes between specific terminals
- `getRoutesWithDisruptions(tripDate: Date)` - Get routes with service disruptions
- `getRouteDetails(tripDate: Date)` - Get detailed route information
- `getRouteDetailsByTerminals(tripDate: Date, departingTerminalId: number, arrivingTerminalId: number)` - Get detailed routes between terminals
- `getRouteDetailsByRoute(tripDate: Date, routeId: number)` - Get detailed information for a specific route

### Schedule Functions
- `getScheduleByRoute(tripDate: Date, routeId: number)` - Get schedule for a specific route
- `getScheduleByTerminals(tripDate: Date, departingTerminalId: number, arrivingTerminalId: number)` - Get schedule between terminals
- `getScheduleTodayByRoute(routeId: number, onlyRemainingTimes?: boolean)` - Get today's schedule for a route
- `getScheduleTodayByTerminals(departingTerminalId: number, arrivingTerminalId: number, onlyRemainingTimes?: boolean)` - Get today's schedule between terminals

### Terminal Functions
- `getTerminals(tripDate: Date)` - Get all terminals for a date
- `getTerminalsAndMates(tripDate: Date)` - Get all terminal combinations
- `getTerminalsAndMatesByRoute(tripDate: Date, routeId: number)` - Get terminal combinations for a route
- `getTerminalMates(tripDate: Date, terminalId: number)` - Get arriving terminals for a departing terminal

### Seasonal Functions
- `getActiveSeasons()` - Get active service seasons
- `getScheduledRoutes()` - Get all scheduled routes
- `getScheduledRoutesBySeason(scheduleId: number)` - Get scheduled routes for a season
- `getSailings(schedRouteId: number)` - Get sailings for a scheduled route
- `getAllSailings(schedRouteId: number)` - Get all sailings for a scheduled route

### Time Adjustment Functions
- `getTimeAdjustments()` - Get all time adjustments
- `getTimeAdjustmentsByRoute(routeId: number)` - Get time adjustments for a route
- `getTimeAdjustmentsBySchedRoute(schedRouteId: number)` - Get time adjustments for a scheduled route

### Utility Functions
- `getCacheFlushDateSchedule()` - Get cache flush date
- `getValidDateRange()` - Get valid date range for schedules
- `getAlerts()` - Get service alerts
- `getAlternativeFormats(subjectName: string)` - Get alternative formats

## Error Handling

All functions throw `WsdApiError` instances on failure:

```typescript
import { getRoutes, WsdApiError } from 'ws-dottie/wsf-schedule';

try {
  const routes = await getRoutes(new Date());
  // Process routes
} catch (error) {
  if (error instanceof WsdApiError) {
    console.error('Schedule API Error:', error.getUserMessage());
  }
}
```

## TypeScript Types

```typescript
type Route = {
  RouteID: number;
  RouteName: string;
  Description: string;
  // ... other properties
};

type ScheduleResponse = {
  RouteID: number;
  RouteName: string;
  Departures: Departure[];
  // ... other properties
};

type Alert = {
  AlertID: number;
  AlertHeader: string;
  AlertText: string;
  // ... other properties
};
```

See the full type definitions in the source code for complete type information. 