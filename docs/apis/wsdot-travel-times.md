# WSDOT Travel Times API

The WSDOT Travel Times API provides real-time information about travel times for major routes across Washington State.

## Overview

This module provides access to the WSDOT Travel Times API, which offers real-time information about travel times for major routes, average travel times for comparison, and route information with geographic coordinates.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Real-time Travel Times** | Current travel times for major routes | ✅ Available |
| **Average Time Comparison** | Historical average times for comparison | ✅ Available |
| **Route Information** | Start and end point details | ✅ Available |
| **Distance Data** | Route distances in miles | ✅ Available |
| **Geographic Coordinates** | Latitude/longitude for route endpoints | ✅ Available |
| **Route Types** | General purpose, HOV, and managed lanes | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Travel Times** | Real-time | `MINUTE_UPDATES` | Updated continuously from traffic monitoring |
| **Route Information** | Static | `WEEKLY_UPDATES` | Infrastructure data |

## WSDOT Documentation

- **[WSDOT Travel Times API Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html)**
- **[WSDOT Travel Times API Help](https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `GetTravelTimesAsJson` | GET | Get all travel time routes | `AccessCode` | `TravelTimeRoute[]` |
| `GetTravelTimeAsJson` | GET | Get specific travel time route by ID | `AccessCode`, `TravelTimeID` | `TravelTimeRoute` |

### Base URL
```
https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc
```

## Usage Examples

### Basic Usage

```typescript
import { wsdotTravelTimes } from 'ws-dottie/wsdot-travel-times';

// Get all travel time routes
const routes = await wsdotTravelTimes.getTravelTimes();

// Get specific travel time route by ID
const route = await wsdotTravelTimes.getTravelTime({ travelTimeId: 2 });
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getTravelTimes` | None | `getTravelTimes()` | Get all travel time routes |
| `getTravelTime` | `{ travelTimeId: number }` | `getTravelTime({ travelTimeId: 2 })` | Get specific travel time route by ID |

### Common Use Cases

```typescript
// Example 1: Display all travel time routes
const routes = await wsdotTravelTimes.getTravelTimes();
routes.forEach(route => {
  console.log(`${route.RouteName}: ${route.CurrentTime} minutes`);
});

// Example 2: Get specific route information
const route = await wsdotTravelTimes.getTravelTime({ travelTimeId: 2 });
// Display detailed route information
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useTravelTimes` | None | Get all travel time routes | `MINUTE_UPDATES` |
| `useTravelTime` | `{ travelTimeId: number }` | Get specific travel time route by ID | `MINUTE_UPDATES` |

### Basic Hook Usage

```typescript
import { useTravelTimes } from 'ws-dottie/react/wsdot-travel-times';

function TravelTimesList() {
  const { data, isLoading, error } = useTravelTimes();

  if (isLoading) return <div>Loading travel times...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(route => (
        <div key={route.TravelTimeID}>
          <h3>{route.RouteName}</h3>
          <p>Current Time: {route.CurrentTime} minutes</p>
          <p>Average Time: {route.AverageTime} minutes</p>
          <p>Distance: {route.Distance} miles</p>
          <p>Start: {route.StartRoadName}</p>
          <p>End: {route.EndRoadName}</p>
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
| `TravelTimeRoute` | Travel time route information | `TravelTimeID`, `RouteName`, `CurrentTime`, `AverageTime`, `Distance`, `StartRoadName`, `EndRoadName` |

### Detailed Type Definitions

```typescript
type TravelTimeRoute = {
  TravelTimeID: number;                          // Unique identifier for the travel time route
  RouteName: string;                             // Name of the route
  CurrentTime: number;                           // Current travel time in minutes
  AverageTime: number;                           // Average travel time in minutes
  Distance: number;                              // Route distance in miles
  StartRoadName: string;                         // Starting road name
  EndRoadName: string;                           // Ending road name
  StartLatitude: number;                         // Starting latitude coordinate
  StartLongitude: number;                        // Starting longitude coordinate
  EndLatitude: number;                           // Ending latitude coordinate
  EndLongitude: number;                          // Ending longitude coordinate
  LastUpdated: string;                           // Last update timestamp
  State: string;                                 // State where the route is located
};
```

## Common Use Cases

### Use Case 1: Real-time Travel Time Monitoring
**Scenario**: Monitor real-time travel times for major routes to help drivers plan their journeys
**Solution**: Use the `getTravelTimes` function to display current travel times for all monitored routes

```typescript
// Implementation example
const routes = await wsdotTravelTimes.getTravelTimes();
// Display travel times in a real-time monitoring dashboard
```

### Use Case 2: Route-Specific Travel Analysis
**Scenario**: Analyze travel times for a specific route to understand traffic patterns
**Solution**: Use the `getTravelTime` function to get detailed information about a specific route

```typescript
// Implementation example
const route = await wsdotTravelTimes.getTravelTime({ travelTimeId: 2 });
// Analyze specific route data for traffic planning
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
- **[API Compliance](../API-REFERENCE.md#api-compliance)** - WSDOT API alignment verification 