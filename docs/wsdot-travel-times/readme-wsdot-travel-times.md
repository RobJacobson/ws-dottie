# WSDOT Travel Times API

This module provides access to the WSDOT Travel Times API, which offers real-time information about travel times for major routes across Washington State.

## Overview

The Travel Times API provides data about:
- Current travel times for major highway routes
- Average travel times for comparison
- Route start and end point information
- Distance measurements for each route
- Real-time travel time updates
- Geographic coordinates for route endpoints

## API Endpoints

### Get All Travel Times

Retrieves current travel times for all monitored routes.

```typescript
import { getTravelTimes } from '@wsdot/api-client';

const travelTimes = await getTravelTimes();
```

**Returns:** `Promise<TravelTimeRoute[]>`

### Get Specific Travel Time

Retrieves travel time data for a specific route by ID.

```typescript
import { getTravelTimeById } from '@wsdot/api-client';

const travelTime = await getTravelTimeById(2);
```

**Parameters:**
- `travelTimeId` (number): The unique identifier for the travel time route

**Returns:** `Promise<TravelTimeRoute>`

## React Query Hooks

### useTravelTimes

React Query hook for retrieving all travel times.

```typescript
import { useTravelTimes } from '@wsdot/api-client';

function TravelTimesComponent() {
  const { data: travelTimes, isLoading, error } = useTravelTimes();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {travelTimes?.map(route => (
        <div key={route.TravelTimeID}>
          <h3>{route.Name}</h3>
          <p>Current Time: {route.CurrentTime} minutes</p>
          <p>Average Time: {route.AverageTime} minutes</p>
          <p>Distance: {route.Distance} miles</p>
        </div>
      ))}
    </div>
  );
}
```

### useTravelTimeById

React Query hook for retrieving a specific travel time by ID.

```typescript
import { useTravelTimeById } from '@wsdot/api-client';

function TravelTimeDetailComponent({ travelTimeId }: { travelTimeId: number }) {
  const { data: travelTime, isLoading, error } = useTravelTimeById(travelTimeId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{travelTime?.Name}</h2>
      <p>Current Time: {travelTime?.CurrentTime} minutes</p>
      <p>Average Time: {travelTime?.AverageTime} minutes</p>
      <p>Distance: {travelTime?.Distance} miles</p>
      <p>From: {travelTime?.StartPoint.Description}</p>
      <p>To: {travelTime?.EndPoint.Description}</p>
      <p>Last Updated: {travelTime?.TimeUpdated.toLocaleString()}</p>
    </div>
  );
}
```

## Data Types

### TravelTimeRoute

Represents a travel time route record.

```typescript
type TravelTimeRoute = {
  AverageTime: number;                    // Average travel time in minutes
  CurrentTime: number;                    // Current travel time in minutes
  Description: string;                    // Human-readable route description
  Distance: number;                       // Route distance in miles
  EndPoint: TravelTimeEndpoint;           // End point location information
  Name: string;                           // Route name (e.g., "Everett-Seattle HOV")
  StartPoint: TravelTimeEndpoint;         // Start point location information
  TimeUpdated: Date;                      // When the travel time was last updated
  TravelTimeID: number;                   // Unique identifier for the route
};
```

### TravelTimeEndpoint

Represents location information for a route endpoint.

```typescript
type TravelTimeEndpoint = {
  Description: string;                    // Human-readable location description
  Direction: string;                      // Travel direction ("N", "S", "E", "W")
  Latitude: number;                       // Endpoint latitude coordinate
  Longitude: number;                      // Endpoint longitude coordinate
  MilePost: number;                       // Milepost location
  RoadName: string;                       // Road identifier (e.g., "005" for I-5)
};
```

### TravelTimesResponse

Array of travel time route records.

```typescript
type TravelTimesResponse = TravelTimeRoute[];
```

## Error Handling

All functions throw `WsdotApiError` instances when the API request fails. Common error scenarios include:

- **API_ERROR**: The WSDOT API returned an error response
- **NETWORK_ERROR**: Network connectivity issues
- **TIMEOUT_ERROR**: Request timed out

```typescript
import { getTravelTimes } from '@wsdot/api-client';
import { WsdotApiError } from '@wsdot/api-client';

try {
  const travelTimes = await getTravelTimes();
  console.log('Travel times retrieved:', travelTimes.length);
} catch (error) {
  if (error instanceof WsdotApiError) {
    console.error('WSDOT API Error:', error.message);
    console.error('Error Code:', error.code);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Caching Strategy

The hooks use `REACT_QUERY.MINUTE_UPDATES` for travel time data since this data changes frequently but not every few seconds:

- **Stale Time**: 5 minutes (data considered stale after 5 minutes)
- **Refetch Interval**: 1 minute (refetch every 1 minute)
- **Retries**: None (simple polling)
- **Garbage Collection**: 10 minutes (keep in cache for 10 minutes)

## Examples

### Display All Travel Times

```typescript
import { useTravelTimes } from '@wsdot/api-client';

function TravelTimesList() {
  const { data: travelTimes, isLoading, error } = useTravelTimes();

  if (isLoading) return <div>Loading travel times...</div>;
  if (error) return <div>Error loading times: {error.message}</div>;

  return (
    <div>
      <h2>Current Travel Times</h2>
      {travelTimes?.map(route => (
        <div key={route.TravelTimeID} className="route-card">
          <h3>{route.Name}</h3>
          <p><strong>Current Time:</strong> {route.CurrentTime} minutes</p>
          <p><strong>Average Time:</strong> {route.AverageTime} minutes</p>
          <p><strong>Distance:</strong> {route.Distance} miles</p>
          <p><strong>From:</strong> {route.StartPoint.Description}</p>
          <p><strong>To:</strong> {route.EndPoint.Description}</p>
          <p><strong>Last Updated:</strong> {route.TimeUpdated.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
```

### Travel Time Comparison

```typescript
import { useTravelTimes } from '@wsdot/api-client';

function TravelTimeComparison() {
  const { data: travelTimes, isLoading, error } = useTravelTimes();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Travel Time Analysis</h2>
      {travelTimes?.map(route => {
        const timeDifference = route.CurrentTime - route.AverageTime;
        const isSlower = timeDifference > 0;
        const isFaster = timeDifference < 0;
        
        return (
          <div key={route.TravelTimeID} className={`route-status ${isSlower ? 'slower' : isFaster ? 'faster' : 'normal'}`}>
            <h3>{route.Name}</h3>
            <p>Current: {route.CurrentTime} min | Average: {route.AverageTime} min</p>
            <p>
              {isSlower && `🚗 ${timeDifference} minutes slower than average`}
              {isFaster && `⚡ ${Math.abs(timeDifference)} minutes faster than average`}
              {!isSlower && !isFaster && '🟢 Travel time is normal'}
            </p>
          </div>
        );
      })}
    </div>
  );
}
```

### Route Map Display

```typescript
import { useTravelTimes } from '@wsdot/api-client';

function TravelTimeMap() {
  const { data: travelTimes, isLoading, error } = useTravelTimes();

  if (isLoading) return <div>Loading travel time data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Travel Time Map</h2>
      {travelTimes?.map(route => (
        <div key={route.TravelTimeID} className="route-marker">
          <h3>{route.Name}</h3>
          <p><strong>Travel Time:</strong> {route.CurrentTime} minutes</p>
          <p><strong>Distance:</strong> {route.Distance} miles</p>
          
          <div className="start-point">
            <h4>Start Point</h4>
            <p>{route.StartPoint.Description}</p>
            <p>Coordinates: ({route.StartPoint.Latitude}, {route.StartPoint.Longitude})</p>
            <p>Road: {route.StartPoint.RoadName} at milepost {route.StartPoint.MilePost}</p>
          </div>
          
          <div className="end-point">
            <h4>End Point</h4>
            <p>{route.EndPoint.Description}</p>
            <p>Coordinates: ({route.EndPoint.Latitude}, {route.EndPoint.Longitude})</p>
            <p>Road: {route.EndPoint.RoadName} at milepost {route.EndPoint.MilePost}</p>
          </div>
          
          {/* These coordinates can be used with mapping libraries */}
          <div className="map-coordinates">
            <p>Start: {route.StartPoint.Latitude}, {route.StartPoint.Longitude}</p>
            <p>End: {route.EndPoint.Latitude}, {route.EndPoint.Longitude}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Travel Time Alerts

```typescript
import { useTravelTimes } from '@wsdot/api-client';

function TravelTimeAlerts() {
  const { data: travelTimes, isLoading, error } = useTravelTimes();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const slowRoutes = travelTimes?.filter(route => {
    const timeDifference = route.CurrentTime - route.AverageTime;
    return timeDifference > 10; // 10+ minutes slower than average
  }) || [];

  const fastRoutes = travelTimes?.filter(route => {
    const timeDifference = route.CurrentTime - route.AverageTime;
    return timeDifference < -5; // 5+ minutes faster than average
  }) || [];

  return (
    <div>
      <h2>Travel Time Alerts</h2>
      
      {slowRoutes.length > 0 && (
        <div className="slow-routes">
          <h3>🚨 Slow Routes</h3>
          {slowRoutes.map(route => {
            const timeDifference = route.CurrentTime - route.AverageTime;
            return (
              <div key={route.TravelTimeID} className="alert slow">
                <h4>{route.Name}</h4>
                <p>Current: {route.CurrentTime} min | Average: {route.AverageTime} min</p>
                <p><strong>{timeDifference} minutes slower than average</strong></p>
              </div>
            );
          })}
        </div>
      )}
      
      {fastRoutes.length > 0 && (
        <div className="fast-routes">
          <h3>⚡ Fast Routes</h3>
          {fastRoutes.map(route => {
            const timeDifference = route.CurrentTime - route.AverageTime;
            return (
              <div key={route.TravelTimeID} className="alert fast">
                <h4>{route.Name}</h4>
                <p>Current: {route.CurrentTime} min | Average: {route.AverageTime} min</p>
                <p><strong>{Math.abs(timeDifference)} minutes faster than average</strong></p>
              </div>
            );
          })}
        </div>
      )}
      
      {slowRoutes.length === 0 && fastRoutes.length === 0 && (
        <p>✅ All routes are operating at normal travel times</p>
      )}
    </div>
  );
}
```

### Route Performance Dashboard

```typescript
import { useTravelTimes } from '@wsdot/api-client';

function RoutePerformanceDashboard() {
  const { data: travelTimes, isLoading, error } = useTravelTimes();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalRoutes = travelTimes?.length || 0;
  const averageCurrentTime = travelTimes?.reduce((sum, route) => sum + route.CurrentTime, 0) / totalRoutes || 0;
  const averageDistance = travelTimes?.reduce((sum, route) => sum + route.Distance, 0) / totalRoutes || 0;
  
  const slowestRoute = travelTimes?.reduce((slowest, route) => 
    route.CurrentTime > slowest.CurrentTime ? route : slowest
  );
  
  const fastestRoute = travelTimes?.reduce((fastest, route) => 
    route.CurrentTime < fastest.CurrentTime ? route : fastest
  );

  return (
    <div>
      <h2>Route Performance Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Routes</h3>
          <p className="stat-value">{totalRoutes}</p>
        </div>
        
        <div className="stat-card">
          <h3>Average Travel Time</h3>
          <p className="stat-value">{averageCurrentTime.toFixed(1)} min</p>
        </div>
        
        <div className="stat-card">
          <h3>Average Distance</h3>
          <p className="stat-value">{averageDistance.toFixed(1)} miles</p>
        </div>
      </div>
      
      {slowestRoute && (
        <div className="performance-card slowest">
          <h3>Slowest Route</h3>
          <h4>{slowestRoute.Name}</h4>
          <p>Travel Time: {slowestRoute.CurrentTime} minutes</p>
          <p>Distance: {slowestRoute.Distance} miles</p>
          <p>Route: {slowestRoute.StartPoint.Description} → {slowestRoute.EndPoint.Description}</p>
        </div>
      )}
      
      {fastestRoute && (
        <div className="performance-card fastest">
          <h3>Fastest Route</h3>
          <h4>{fastestRoute.Name}</h4>
          <p>Travel Time: {fastestRoute.CurrentTime} minutes</p>
          <p>Distance: {fastestRoute.Distance} miles</p>
          <p>Route: {fastestRoute.StartPoint.Description} → {fastestRoute.EndPoint.Description}</p>
        </div>
      )}
      
      <div className="routes-list">
        <h3>All Routes</h3>
        {travelTimes?.map(route => (
          <div key={route.TravelTimeID} className="route-item">
            <h4>{route.Name}</h4>
            <div className="route-details">
              <span>⏱️ {route.CurrentTime} min</span>
              <span>📏 {route.Distance} mi</span>
              <span>🛣️ {route.StartPoint.RoadName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## API Documentation

- **WSDOT Documentation**: [Travel Times](https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html)
- **API Help**: [Travel Times REST Service](https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help)

## Notes

- Travel times are measured in minutes
- Distances are measured in miles
- Route directions are abbreviated: "N" (North), "S" (South), "E" (East), "W" (West)
- Road names are typically numeric identifiers (e.g., "005" for I-5)
- Data is updated frequently, so caching strategies are optimized for real-time updates
- Geographic coordinates can be used with mapping libraries for visualization
- Current time represents real-time travel conditions
- Average time represents typical travel conditions for comparison 