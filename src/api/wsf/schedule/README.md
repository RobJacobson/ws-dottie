# Schedule API

The Schedule API module provides comprehensive ferry schedule data, route information, and service alerts for Washington State Ferries.

## Overview

This module integrates with WSF Schedule API endpoints to provide:
- Route information and schedules
- Departure and arrival times
- Service alerts and disruptions
- Seasonal service information

## API Endpoints

### Base URL
`https://www.wsdot.wa.gov/ferries/api/schedule/rest`

### Available Endpoints

#### 1. Routes (`/routes`)
**Purpose**: Route information and basic schedule data

**Data Type**: `Route[]`

**Update Frequency**: Daily

**Response Fields**:
- `routeId` - Unique route identifier
- `routeName` - Route name
- `departingTerminalId` - Departure terminal ID
- `arrivingTerminalId` - Arrival terminal ID
- `routeAbbreviation` - Route abbreviation
- `isActive` - Whether route is currently active
- `lastUpdate` - Timestamp of last update

#### 2. Route Details (`/routedetails`)
**Purpose**: Detailed route information and schedules

**Data Type**: `RouteDetail[]`

**Update Frequency**: Daily

**Response Fields**:
- `routeId` - Unique route identifier
- `routeName` - Route name
- `departingTerminal` - Departure terminal information
- `arrivingTerminal` - Arrival terminal information
- `schedules` - Schedule information
- `vessels` - Vessels assigned to route
- `crossings` - Crossing information
- `lastUpdate` - Timestamp of last update

#### 3. Schedules (`/schedules`)
**Purpose**: Detailed schedule information with departure times

**Data Type**: `Schedule[]`

**Update Frequency**: Daily

**Response Fields**:
- `scheduleId` - Unique schedule identifier
- `routeId` - Associated route identifier
- `departureTime` - Scheduled departure time
- `arrivalTime` - Scheduled arrival time
- `vesselId` - Assigned vessel identifier
- `isActive` - Whether schedule is active
- `season` - Service season
- `lastUpdate` - Timestamp of last update

#### 4. Active Seasons (`/activeseasons`)
**Purpose**: Current and upcoming service seasons

**Data Type**: `ActiveSeason[]`

**Update Frequency**: Weekly

**Response Fields**:
- `seasonId` - Unique season identifier
- `seasonName` - Season name
- `startDate` - Season start date
- `endDate` - Season end date
- `isActive` - Whether season is currently active
- `lastUpdate` - Timestamp of last update

#### 5. Alerts (`/alerts`)
**Purpose**: Service alerts and disruptions

**Data Type**: `Alert[]`

**Update Frequency**: Real-time

**Response Fields**:
- `alertId` - Unique alert identifier
- `alertType` - Type of alert
- `routeId` - Affected route identifier
- `message` - Alert message
- `startTime` - Alert start time
- `endTime` - Alert end time
- `isActive` - Whether alert is currently active
- `lastUpdate` - Timestamp of last update

## Data Types

### Route
```typescript
type Route = {
  routeId: number;
  routeName: string;
  departingTerminalId: number;
  arrivingTerminalId: number;
  routeAbbreviation: string;
  isActive: boolean;
  lastUpdate: Date;
};
```

### RouteDetail
```typescript
type RouteDetail = {
  routeId: number;
  routeName: string;
  departingTerminal: TerminalInfo;
  arrivingTerminal: TerminalInfo;
  schedules: ScheduleInfo[];
  vessels: VesselInfo[];
  crossings: CrossingInfo[];
  lastUpdate: Date;
};
```

### Schedule
```typescript
type Schedule = {
  scheduleId: number;
  routeId: number;
  departureTime: Date;
  arrivalTime: Date;
  vesselId: number;
  isActive: boolean;
  season: string;
  lastUpdate: Date;
};
```

### ActiveSeason
```typescript
type ActiveSeason = {
  seasonId: number;
  seasonName: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  lastUpdate: Date;
};
```

### Alert
```typescript
type Alert = {
  alertId: number;
  alertType: string;
  routeId: number;
  message: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  lastUpdate: Date;
};
```

## React Query Hooks

### useRoutes
Fetches route information with daily refresh.

```typescript
const { data: routes, isLoading, error } = useRoutes({
  refetchInterval: 86400000,  // Refresh daily
  staleTime: 43200000,        // Consider data stale after 12 hours
});
```

### useRouteDetails
Fetches detailed route information.

```typescript
const { data: routeDetails, isLoading, error } = useRouteDetails({
  refetchInterval: 86400000,  // Refresh daily
  staleTime: 43200000,        // Consider data stale after 12 hours
});
```

### useSchedules
Fetches schedule information with daily refresh.

```typescript
const { data: schedules, isLoading, error } = useSchedules({
  refetchInterval: 86400000,  // Refresh daily
  staleTime: 43200000,        // Consider data stale after 12 hours
});
```

### useActiveSeasons
Fetches active service seasons.

```typescript
const { data: seasons, isLoading, error } = useActiveSeasons({
  refetchInterval: 604800000,  // Refresh weekly
  staleTime: 302400000,        // Consider data stale after 3.5 days
});
```

### useAlerts
Fetches service alerts with real-time updates.

```typescript
const { data: alerts, isLoading, error } = useAlerts({
  refetchInterval: 60000,      // Refresh every minute
  staleTime: 30000,            // Consider data stale after 30 seconds
});
```

## Usage Examples

### Route Information
```typescript
import { useRoutes } from '@/data/wsf/schedule';

function RouteList() {
  const { data: routes, isLoading } = useRoutes();

  if (isLoading) return <LoadingSpinner />;

  return (
    <RouteList>
      {routes?.map(route => (
        <RouteCard
          key={route.routeId}
          route={route}
        />
      ))}
    </RouteList>
  );
}
```

### Schedule Display
```typescript
import { useSchedules } from '@/data/wsf/schedule';

function ScheduleView({ routeId }: { routeId: number }) {
  const { data: schedules } = useSchedules();
  const routeSchedules = schedules?.filter(s => s.routeId === routeId);

  return (
    <ScheduleTable>
      {routeSchedules?.map(schedule => (
        <ScheduleRow
          key={schedule.scheduleId}
          schedule={schedule}
        />
      ))}
    </ScheduleTable>
  );
}
```

### Service Alerts
```typescript
import { useAlerts } from '@/data/wsf/schedule';

function AlertBanner() {
  const { data: alerts } = useAlerts();
  const activeAlerts = alerts?.filter(a => a.isActive) || [];

  return (
    <AlertBanner>
      {activeAlerts.map(alert => (
        <AlertCard
          key={alert.alertId}
          alert={alert}
        />
      ))}
    </AlertBanner>
  );
}
```

### Combined Schedule Data
```typescript
import { useRoutes, useSchedules, useAlerts } from '@/data/wsf/schedule';

function ScheduleDashboard() {
  const { data: routes } = useRoutes();
  const { data: schedules } = useSchedules();
  const { data: alerts } = useAlerts();

  return (
    <div>
      <AlertBanner alerts={alerts?.filter(a => a.isActive)} />
      <RouteList>
        {routes?.map(route => {
          const routeSchedules = schedules?.filter(s => s.routeId === route.routeId);
          const routeAlerts = alerts?.filter(a => a.routeId === route.routeId);
          
          return (
            <RouteScheduleCard
              key={route.routeId}
              route={route}
              schedules={routeSchedules}
              alerts={routeAlerts}
            />
          );
        })}
      </RouteList>
    </div>
  );
}
```

## Performance Considerations

### Caching Strategy
- **Routes & Schedules**: Daily refresh with long cache time
- **Alerts**: Frequent updates (minute intervals) with short cache time
- **Seasons**: Weekly refresh with medium cache time
- **Background Updates**: Non-blocking data refresh

### Network Optimization
- **Request Deduplication**: Prevents duplicate API calls
- **Efficient Polling**: Smart refresh intervals based on data freshness
- **Error Recovery**: Graceful handling of network failures

### Memory Management
- **Efficient Data Structures**: Optimized for schedule datasets
- **Garbage Collection**: Automatic cleanup of unused data
- **Memory Monitoring**: Performance tracking and optimization

## Error Handling

### API Failures
- **Graceful Degradation**: Show cached data when API is unavailable
- **User Feedback**: Clear error messages and retry options
- **Automatic Recovery**: Background retry with exponential backoff

### Data Validation
- **Type Checking**: Runtime validation of API responses
- **Schema Validation**: Ensure data structure integrity
- **Fallback Values**: Provide defaults for missing data

## Development Tools

### Debugging
- **Network Monitoring**: Track API requests and responses
- **Cache Inspection**: View cached data and query states
- **Performance Profiling**: Monitor data layer performance

### Testing
- **Mock APIs**: Test with simulated schedule data
- **Integration Tests**: End-to-end API testing
- **Performance Tests**: Load testing and optimization

## Future Enhancements

### Planned Features
- **Historical Schedules**: Past schedule data and trends
- **Predictive Analytics**: Schedule reliability predictions
- **Real-time Updates**: Live schedule changes
- **Personalization**: User-specific schedule preferences

### API Improvements
- **WebSocket Support**: Real-time schedule updates
- **Batch Operations**: Reduce API call frequency
- **Advanced Filtering**: Filter schedules by date, time, or route
- **Geographic Features**: Route visualization and mapping 