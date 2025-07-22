# WSDOT Toll Rates API

This module provides access to the WSDOT Toll Rates API, which offers real-time information about toll rates, trip information, and pricing for high occupancy lanes across Washington State.

## Overview

The Toll Rates API provides data about:
- Current toll rates for high occupancy lanes
- Trip information with geographic coordinates and geometry
- Real-time pricing updates and messages
- Travel direction and route information
- Milepost and location data

## API Endpoints

### Get All Toll Rates

Retrieves current toll rates for all high occupancy lanes.

```typescript
import { getTollRates } from '@wsdot/api-client';

const tollRates = await getTollRates();
```

**Returns:** `Promise<TollRate[]>`

### Get Toll Trip Information

Retrieves toll trip information with geometry data.

```typescript
import { getTollTripInfo } from '@wsdot/api-client';

const tripInfo = await getTollTripInfo();
```

**Returns:** `Promise<TollTripInfo[]>`

### Get Toll Trip Rates

Retrieves toll trip rates with messages and update times.

```typescript
import { getTollTripRates } from '@wsdot/api-client';

const tripRates = await getTollTripRates();
```

**Returns:** `Promise<TollTripRatesResponse>`

## React Query Hooks

### useTollRates

React Query hook for retrieving all toll rates.

```typescript
import { useTollRates } from '@wsdot/api-client';

function TollRatesComponent() {
  const { data: tollRates, isLoading, error } = useTollRates();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {tollRates?.map(rate => (
        <div key={rate.TripName}>
          <h3>{rate.StartLocationName} to {rate.EndLocationName}</h3>
          <p>Current Toll: ${rate.CurrentToll / 100}</p>
          <p>Route: {rate.StateRoute}</p>
          <p>Direction: {rate.TravelDirection}</p>
        </div>
      ))}
    </div>
  );
}
```

### useTollTripInfo

React Query hook for retrieving toll trip information with geometry.

```typescript
import { useTollTripInfo } from '@wsdot/api-client';

function TollTripInfoComponent() {
  const { data: tripInfo, isLoading, error } = useTollTripInfo();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {tripInfo?.map(trip => (
        <div key={trip.TripName}>
          <h3>{trip.StartLocationName} to {trip.EndLocationName}</h3>
          <p>Direction: {trip.TravelDirection}</p>
          <p>Start Milepost: {trip.StartMilepost}</p>
          <p>End Milepost: {trip.EndMilepost}</p>
          <p>Last Modified: {trip.ModifiedDate.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
```

### useTollTripRates

React Query hook for retrieving toll trip rates with messages.

```typescript
import { useTollTripRates } from '@wsdot/api-client';

function TollTripRatesComponent() {
  const { data: tripRates, isLoading, error } = useTollTripRates();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <p>Last Updated: {tripRates?.LastUpdated.toLocaleString()}</p>
      {tripRates?.Trips.map(trip => (
        <div key={trip.TripName}>
          <h3>{trip.TripName}</h3>
          <p>Toll: ${trip.Toll / 100}</p>
          <p>Message: {trip.Message}</p>
          <p>Updated: {trip.MessageUpdateTime.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
```

## Data Types

### TollRate

Represents a toll rate record.

```typescript
type TollRate = {
  CurrentMessage: string | null;        // Current message (can be null)
  CurrentToll: number;                  // Current toll amount in cents
  EndLatitude: number;                  // End point latitude
  EndLocationName: string;              // End location name
  EndLongitude: number;                 // End point longitude
  EndMilepost: number;                  // End milepost
  StartLatitude: number;                // Start point latitude
  StartLocationName: string;            // Start location name
  StartLongitude: number;               // Start point longitude
  StartMilepost: number;                // Start milepost
  StateRoute: string;                   // State route number (e.g., "099", "405")
  TimeUpdated: Date;                    // When the rate was last updated
  TravelDirection: string;              // Travel direction ("N", "S", "E", "W")
  TripName: string;                     // Unique trip identifier (e.g., "405tp01351")
};
```

### TollTripInfo

Represents toll trip information with geometry data.

```typescript
type TollTripInfo = {
  EndLatitude: number;                  // End point latitude
  EndLocationName: string;              // End location name
  EndLongitude: number;                 // End point longitude
  EndMilepost: number;                  // End milepost
  Geometry: string;                     // GeoJSON LineString geometry
  ModifiedDate: Date;                   // When the trip info was last modified
  StartLatitude: number;                // Start point latitude
  StartLocationName: string;            // Start location name
  StartLongitude: number;               // Start point longitude
  StartMilepost: number;                // Start milepost
  TravelDirection: string;              // Travel direction ("N", "S", "E", "W")
  TripName: string;                     // Unique trip identifier
};
```

### TollTripRate

Represents individual toll trip rate information.

```typescript
type TollTripRate = {
  Message: string;                      // Current message (e.g., "FREE")
  MessageUpdateTime: Date;              // When the message was last updated
  Toll: number;                         // Current toll amount in cents
  TripName: string;                     // Unique trip identifier
};
```

### TollTripRatesResponse

Response structure for toll trip rates.

```typescript
type TollTripRatesResponse = {
  LastUpdated: Date;                    // When all rates were last updated
  Trips: TollTripRate[];                // Array of trip rates
};
```

### Response Types

```typescript
type TollRatesResponse = TollRate[];
type TollTripInfoResponse = TollTripInfo[];
```

## Error Handling

All functions throw `WsdotApiError` instances when the API request fails. Common error scenarios include:

- **API_ERROR**: The WSDOT API returned an error response
- **NETWORK_ERROR**: Network connectivity issues
- **TIMEOUT_ERROR**: Request timed out

```typescript
import { getTollRates } from '@wsdot/api-client';
import { WsdotApiError } from '@wsdot/api-client';

try {
  const tollRates = await getTollRates();
  console.log('Toll rates retrieved:', tollRates.length);
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

The hooks use `REACT_QUERY.MINUTE_UPDATES` for toll rate data since this data changes frequently due to dynamic congestion pricing but not every few seconds:

- **Stale Time**: 5 minutes (data considered stale after 5 minutes)
- **Refetch Interval**: 1 minute (refetch every 1 minute)
- **Retries**: None (simple polling)
- **Garbage Collection**: 10 minutes (keep in cache for 10 minutes)

## Examples

### Display All Toll Rates

```typescript
import { useTollRates } from '@wsdot/api-client';

function TollRatesList() {
  const { data: tollRates, isLoading, error } = useTollRates();

  if (isLoading) return <div>Loading toll rates...</div>;
  if (error) return <div>Error loading rates: {error.message}</div>;

  return (
    <div>
      <h2>Current Toll Rates</h2>
      {tollRates?.map(rate => (
        <div key={rate.TripName} className="toll-card">
          <h3>{rate.StartLocationName} → {rate.EndLocationName}</h3>
          <p><strong>Current Toll:</strong> ${(rate.CurrentToll / 100).toFixed(2)}</p>
          <p><strong>Route:</strong> {rate.StateRoute}</p>
          <p><strong>Direction:</strong> {rate.TravelDirection}</p>
          <p><strong>Last Updated:</strong> {rate.TimeUpdated.toLocaleString()}</p>
          {rate.CurrentMessage && (
            <p><strong>Message:</strong> {rate.CurrentMessage}</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Filter by Route

```typescript
import { useTollRates } from '@wsdot/api-client';

function RouteTollRates({ route }: { route: string }) {
  const { data: tollRates, isLoading, error } = useTollRates();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const routeRates = tollRates?.filter(rate => rate.StateRoute === route) || [];

  return (
    <div>
      <h2>Toll Rates for Route {route}</h2>
      {routeRates.map(rate => (
        <div key={rate.TripName} className="route-toll">
          <h3>{rate.StartLocationName} to {rate.EndLocationName}</h3>
          <p>Toll: ${(rate.CurrentToll / 100).toFixed(2)}</p>
          <p>Direction: {rate.TravelDirection}</p>
        </div>
      ))}
    </div>
  );
}
```

### Display Trip Information with Map

```typescript
import { useTollTripInfo } from '@wsdot/api-client';

function TollTripMap() {
  const { data: tripInfo, isLoading, error } = useTollTripInfo();

  if (isLoading) return <div>Loading trip information...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Toll Trip Information</h2>
      {tripInfo?.map(trip => (
        <div key={trip.TripName} className="trip-info">
          <h3>{trip.TripName}</h3>
          <p><strong>Route:</strong> {trip.StartLocationName} → {trip.EndLocationName}</p>
          <p><strong>Direction:</strong> {trip.TravelDirection}</p>
          <p><strong>Mileposts:</strong> {trip.StartMilepost} - {trip.EndMilepost}</p>
          <p><strong>Coordinates:</strong> ({trip.StartLatitude}, {trip.StartLongitude}) to ({trip.EndLatitude}, {trip.EndLongitude})</p>
          <p><strong>Last Modified:</strong> {trip.ModifiedDate.toLocaleString()}</p>
          
          {/* Geometry can be used for mapping libraries */}
          <details>
            <summary>View Geometry</summary>
            <pre>{trip.Geometry}</pre>
          </details>
        </div>
      ))}
    </div>
  );
}
```

### Real-time Toll Updates

```typescript
import { useTollTripRates } from '@wsdot/api-client';

function RealTimeTollUpdates() {
  const { data: tripRates, isLoading, error } = useTollTripRates();

  if (isLoading) return <div>Loading real-time updates...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const freeTrips = tripRates?.Trips.filter(trip => trip.Toll === 0) || [];
  const paidTrips = tripRates?.Trips.filter(trip => trip.Toll > 0) || [];

  return (
    <div>
      <h2>Real-time Toll Updates</h2>
      <p>Last Updated: {tripRates?.LastUpdated.toLocaleString()}</p>
      
      <div className="toll-summary">
        <h3>Free Trips ({freeTrips.length})</h3>
        {freeTrips.map(trip => (
          <div key={trip.TripName} className="free-trip">
            <span>{trip.TripName}</span>
            <span>{trip.Message}</span>
          </div>
        ))}
      </div>
      
      <div className="toll-summary">
        <h3>Paid Trips ({paidTrips.length})</h3>
        {paidTrips.map(trip => (
          <div key={trip.TripName} className="paid-trip">
            <span>{trip.TripName}</span>
            <span>${(trip.Toll / 100).toFixed(2)}</span>
            <span>{trip.Message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## API Documentation

- **WSDOT Documentation**: [Toll Rates](https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html)
- **API Help**: [Toll Rates REST Service](https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help)

## Notes

- Toll amounts are returned in cents (e.g., 125 = $1.25)
- Trip names follow the pattern: `{route}tp{milepost}` (e.g., "405tp01351")
- Travel directions are single characters: "N", "S", "E", "W"
- Geometry data is provided as GeoJSON LineString for mapping applications
- Data is updated frequently, so caching strategies are optimized for real-time updates
- Current messages can be null when no special message is active 