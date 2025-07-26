# WSF Schedule API

The WSF Schedule API provides comprehensive access to Washington State Ferries schedule information, including routes, schedules, alerts, and seasonal data.

## Overview

This module provides access to the WSF Schedule API, which offers comprehensive ferry schedule information for Washington State Ferries, including route information, sailing schedules, service alerts, and seasonal data.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Trip Planning** | Get sailing schedules for route planning | ✅ Available |
| **Schedule Lookups** | Find departure and arrival times | ✅ Available |
| **Service Alerts** | Monitor disruptions and cancellations | ✅ Available |
| **Seasonal Schedules** | Access different schedules by season | ✅ Available |
| **Terminal Discovery** | Find valid terminal combinations | ✅ Available |
| **Real-time Updates** | Get today's schedule with remaining times | ✅ Available |
| **Time Adjustments** | Account for operational timing changes | ✅ Available |
| **Vessel Information** | Track vessel assignments and details | ✅ Available |
| **Route Details** | Comprehensive route information | ✅ Available |
| **Alternative Formats** | Access schedules in different formats | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Schedule Data** | Real-time | `MINUTE_UPDATES` | Updated continuously as schedules change |
| **Route Information** | Static | `WEEKLY_UPDATES` | Infrastructure data |
| **Service Alerts** | Real-time | `MINUTE_UPDATES` | Updated immediately when disruptions occur |

## WSF Documentation

- **[WSF Schedule API Documentation](https://www.wsdot.wa.gov/ferries/api/)**
- **[WSF Schedule API Help](https://www.wsdot.wa.gov/ferries/api/schedule/)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `cacheflushdate` | GET | API cache flush date | None | `Date` |
| `validdaterange` | GET | Valid date range for schedule data | None | `ValidDateRange` |
| `activeseasons` | GET | Active schedule seasons | None | `ActiveSeason[]` |
| `routes/{TripDate}` | GET | Routes available for a date | `TripDate` | `Route[]` |
| `routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}` | GET | Routes between terminals | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID` | `Route[]` |
| `routedetails/{TripDate}` | GET | All route details for a date | `TripDate` | `RouteDetails[]` |
| `schedule/{TripDate}/{RouteID}` | GET | Schedule for specific route and date | `TripDate`, `RouteID` | `Schedule` |
| `alerts` | GET | Service alerts and disruptions | None | `Alert[]` |

### Base URL
```
https://www.wsdot.wa.gov/ferries/api/schedule
```

## Usage Examples

### Basic Usage

```typescript
import { wsfSchedule } from 'ws-dottie/wsf-schedule';

// Get all routes for a date
const routes = await wsfSchedule.getRoutes({ tripDate: "2024-04-01" });

// Get routes between terminals
const terminalRoutes = await wsfSchedule.getRoutesByTerminals({ 
  tripDate: "2024-04-01", 
  departingTerminalId: 7, 
  arrivingTerminalId: 8 
});

// Get schedule for specific route
const schedule = await wsfSchedule.getSchedule({ 
  tripDate: "2024-04-01", 
  routeId: 1 
});

// Get service alerts
const alerts = await wsfSchedule.getAlerts();
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getRoutes` | `{ tripDate: string }` | `getRoutes({ tripDate: "2024-04-01" })` | Get all routes for a date |
| `getRoutesByTerminals` | `{ tripDate: string, departingTerminalId: number, arrivingTerminalId: number }` | `getRoutesByTerminals({ tripDate: "2024-04-01", departingTerminalId: 7, arrivingTerminalId: 8 })` | Get routes between terminals |
| `getSchedule` | `{ tripDate: string, routeId: number }` | `getSchedule({ tripDate: "2024-04-01", routeId: 1 })` | Get schedule for specific route |
| `getAlerts` | None | `getAlerts()` | Get service alerts and disruptions |

### Common Use Cases

```typescript
// Example 1: Get all routes for a date
const routes = await wsfSchedule.getRoutes({ tripDate: "2024-04-01" });
routes.forEach(route => {
  console.log(`${route.Description}: ${route.ScheduleID}`);
});

// Example 2: Get schedule for specific route
const schedule = await wsfSchedule.getSchedule({ 
  tripDate: "2024-04-01", 
  routeId: 1 
});
// Display sailing times and vessel information
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useRoutes` | `{ tripDate: string }` | Get all routes for a date | `MINUTE_UPDATES` |
| `useRoutesByTerminals` | `{ tripDate: string, departingTerminalId: number, arrivingTerminalId: number }` | Get routes between terminals | `MINUTE_UPDATES` |
| `useSchedule` | `{ tripDate: string, routeId: number }` | Get schedule for specific route | `MINUTE_UPDATES` |
| `useAlerts` | None | Get service alerts and disruptions | `MINUTE_UPDATES` |

### Basic Hook Usage

```typescript
import { useRoutes } from 'ws-dottie/react/wsf-schedule';

function RoutesList() {
  const { data, isLoading, error } = useRoutes({ tripDate: "2024-04-01" });

  if (isLoading) return <div>Loading routes...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(route => (
        <div key={route.RouteID}>
          <h3>{route.Description}</h3>
          <p>Schedule ID: {route.ScheduleID}</p>
          <p>Departing Terminal: {route.DepartingTerminalName}</p>
          <p>Arriving Terminal: {route.ArrivingTerminalName}</p>
        </div>
      ))}
    </div>
  );
}
```

## Data Types

### Type Summary

| Type Name | Description | Key Properties |
|-----------|-------------|----------------|
| `Route` | Route information | `RouteID`, `Description`, `ScheduleID`, `DepartingTerminalName`, `ArrivingTerminalName` |
| `RouteDetails` | Detailed route information | `RouteID`, `Description`, `VesselName`, `SailingTimes` |
| `Schedule` | Sailing schedule | `RouteID`, `SailingTimes`, `VesselAssignments` |
| `Alert` | Service alert information | `AlertID`, `Message`, `StartDate`, `EndDate` |

### Detailed Type Definitions

```typescript
type Route = {
  RouteID: number;                               // Unique identifier for the route
  Description: string;                           // Description of the route
  ScheduleID: number;                            // Schedule identifier
  DepartingTerminalName: string;                 // Name of departing terminal
  ArrivingTerminalName: string;                  // Name of arriving terminal
  DepartingTerminalID: number;                   // ID of departing terminal
  ArrivingTerminalID: number;                    // ID of arriving terminal
};

type RouteDetails = {
  RouteID: number;                               // Unique identifier for the route
  Description: string;                           // Description of the route
  VesselName: string;                            // Name of assigned vessel
  SailingTimes: SailingTime[];                   // Array of sailing times
  DepartingTerminalName: string;                 // Name of departing terminal
  ArrivingTerminalName: string;                  // Name of arriving terminal
};

type Schedule = {
  RouteID: number;                               // Route identifier
  SailingTimes: SailingTime[];                   // Array of sailing times
  VesselAssignments: VesselAssignment[];         // Vessel assignments for sailings
  DepartingTerminalName: string;                 // Name of departing terminal
  ArrivingTerminalName: string;                  // Name of arriving terminal
};

type Alert = {
  AlertID: number;                               // Unique identifier for the alert
  Message: string;                               // Alert message
  StartDate: string;                             // Start date of the alert
  EndDate: string;                               // End date of the alert
  RouteID?: number;                              // Affected route ID (if applicable)
};
```

## Common Use Cases

### Use Case 1: Ferry Trip Planning
**Scenario**: Help users plan ferry trips by providing comprehensive schedule information
**Solution**: Use the `getRoutes` and `getSchedule` functions to display available routes and sailing times

```typescript
// Implementation example
const routes = await wsfSchedule.getRoutes({ tripDate: "2024-04-01" });
// Display available routes for trip planning
```

### Use Case 2: Real-time Schedule Monitoring
**Scenario**: Monitor real-time schedule changes and service disruptions
**Solution**: Use the `getAlerts` function to display current service alerts and disruptions

```typescript
// Implementation example
const alerts = await wsfSchedule.getAlerts();
// Display current service alerts and disruptions
```

## Performance & Caching

This API uses the **MINUTE_UPDATES** caching strategy. For detailed information about caching configuration, performance optimization, and advanced caching options, see the [Performance & Caching](../API-REFERENCE.md#performance--caching) section in the API Reference.

| Caching Aspect | Configuration | Description |
|----------------|---------------|-------------|
| **Stale Time** | 5 minutes | Data considered fresh for 5 minutes |
| **Refetch Interval** | 5 minutes | Automatically refetch data every 5 minutes |
| **GC Time** | 10 minutes | Keep unused data in cache for 10 minutes |
| **Retry** | 3 attempts | Retry failed requests up to 3 times |

## Common Patterns

For information about data transformation, error handling, caching strategies, and other common patterns, see the [API Reference](../API-REFERENCE.md) documentation.

## References

- **[Error Handling](../API-REFERENCE.md#error-handling)** - Comprehensive error handling patterns
- **[Data Transformation](../API-REFERENCE.md#data-transformation)** - Automatic data conversion and filtering
- **[React Hooks](../API-REFERENCE.md#react-hooks)** - Complete React integration guide
- **[Performance & Caching](../API-REFERENCE.md#performance--caching)** - Advanced caching configuration
- **[Testing Status](../API-REFERENCE.md#testing-status)** - E2E test completion and validation status
- **[API Compliance](../API-REFERENCE.md#api-compliance)** - WSF API alignment verification 