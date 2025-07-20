# WSDOT Mountain Pass Conditions API

This module provides access to the WSDOT Mountain Pass Conditions API, which offers real-time information about mountain pass conditions, restrictions, and weather across Washington State.

## Overview

The Mountain Pass Conditions API provides data about:
- Current road conditions on mountain passes
- Travel restrictions and advisories
- Weather conditions and temperatures
- Elevation and location information
- Travel direction-specific restrictions

## API Endpoints

### Get All Mountain Pass Conditions

Retrieves current conditions for all mountain passes.

```typescript
import { getMountainPassConditions } from '@wsdot/api-client';

const conditions = await getMountainPassConditions();
```

**Returns:** `Promise<MountainPassCondition[]>`

### Get Specific Mountain Pass Condition

Retrieves conditions for a specific mountain pass by ID.

```typescript
import { getMountainPassConditionById } from '@wsdot/api-client';

const condition = await getMountainPassConditionById(1);
```

**Parameters:**
- `passConditionId` (number): The unique identifier for the mountain pass

**Returns:** `Promise<MountainPassCondition>`

**Note:** This endpoint may not work as expected based on testing.

## React Query Hooks

### useMountainPassConditions

React Query hook for retrieving all mountain pass conditions.

```typescript
import { useMountainPassConditions } from '@wsdot/api-client';

function MountainPassesComponent() {
  const { data: conditions, isLoading, error } = useMountainPassConditions();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {conditions?.map(condition => (
        <div key={condition.MountainPassId}>
          <h3>{condition.MountainPassName}</h3>
          <p>Temperature: {condition.TemperatureInFahrenheit}°F</p>
          <p>Road Condition: {condition.RoadCondition}</p>
          <p>Travel Advisory: {condition.TravelAdvisoryActive ? 'Active' : 'Inactive'}</p>
        </div>
      ))}
    </div>
  );
}
```

### useMountainPassConditionById

React Query hook for retrieving a specific mountain pass condition.

```typescript
import { useMountainPassConditionById } from '@wsdot/api-client';

function MountainPassDetailComponent({ passId }: { passId: number }) {
  const { data: condition, isLoading, error } = useMountainPassConditionById(passId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{condition?.MountainPassName}</h2>
      <p>Elevation: {condition?.ElevationInFeet} feet</p>
      <p>Temperature: {condition?.TemperatureInFahrenheit}°F</p>
      <p>Road Condition: {condition?.RoadCondition}</p>
      <p>Weather: {condition?.WeatherCondition}</p>
      
      <h3>Travel Restrictions</h3>
      <p>{condition?.RestrictionOne.TravelDirection}: {condition?.RestrictionOne.RestrictionText}</p>
      <p>{condition?.RestrictionTwo.TravelDirection}: {condition?.RestrictionTwo.RestrictionText}</p>
    </div>
  );
}
```

## Data Types

### MountainPassCondition

Represents a mountain pass condition record.

```typescript
type MountainPassCondition = {
  DateUpdated: Date;                    // When the condition was last updated
  ElevationInFeet: number;              // Pass elevation in feet
  Latitude: number;                     // Pass latitude coordinate
  Longitude: number;                    // Pass longitude coordinate
  MountainPassId: number;               // Unique identifier for the pass
  MountainPassName: string;             // Name of the mountain pass
  RestrictionOne: TravelRestriction;    // First travel restriction
  RestrictionTwo: TravelRestriction;    // Second travel restriction
  RoadCondition: string;                // Current road condition description
  TemperatureInFahrenheit: number | null; // Current temperature (can be null)
  TravelAdvisoryActive: boolean;        // Whether travel advisory is active
  WeatherCondition: string;             // Current weather condition
};
```

### TravelRestriction

Represents a travel restriction for a specific direction.

```typescript
type TravelRestriction = {
  TravelDirection: string;              // Direction (e.g., "Northbound", "Southbound")
  RestrictionText: string;              // Description of the restriction
};
```

### MountainPassConditionsResponse

Array of mountain pass conditions.

```typescript
type MountainPassConditionsResponse = MountainPassCondition[];
```

## Error Handling

All functions throw `WsdotApiError` instances when the API request fails. Common error scenarios include:

- **API_ERROR**: The WSDOT API returned an error response
- **NETWORK_ERROR**: Network connectivity issues
- **TIMEOUT_ERROR**: Request timed out

```typescript
import { getMountainPassConditions } from '@wsdot/api-client';
import { WsdotApiError } from '@wsdot/api-client';

try {
  const conditions = await getMountainPassConditions();
  console.log('Conditions retrieved:', conditions.length);
} catch (error) {
  if (error instanceof WsdotApiError) {
    console.error('WSDOT API Error:', error.message);
    console.error('Error Code:', error.code);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Caching

The React Query hooks use infrequent update caching strategies:

- **Stale Time**: 5 minutes (data considered fresh for 5 minutes)
- **Cache Time**: 10 minutes (data kept in cache for 10 minutes)
- **Refetch Interval**: 5 minutes (automatically refetch every 5 minutes)

## Examples

### Display All Mountain Passes

```typescript
import { useMountainPassConditions } from '@wsdot/api-client';

function MountainPassesList() {
  const { data: conditions, isLoading, error } = useMountainPassConditions();

  if (isLoading) return <div>Loading mountain pass conditions...</div>;
  if (error) return <div>Error loading conditions: {error.message}</div>;

  return (
    <div>
      <h2>Mountain Pass Conditions</h2>
      {conditions?.map(condition => (
        <div key={condition.MountainPassId} className="pass-card">
          <h3>{condition.MountainPassName}</h3>
          <p><strong>Elevation:</strong> {condition.ElevationInFeet} feet</p>
          <p><strong>Temperature:</strong> {condition.TemperatureInFahrenheit}°F</p>
          <p><strong>Road Condition:</strong> {condition.RoadCondition}</p>
          <p><strong>Travel Advisory:</strong> {condition.TravelAdvisoryActive ? 'Active' : 'Inactive'}</p>
          
          <div className="restrictions">
            <h4>Travel Restrictions</h4>
            <p>{condition.RestrictionOne.TravelDirection}: {condition.RestrictionOne.RestrictionText}</p>
            <p>{condition.RestrictionTwo.TravelDirection}: {condition.RestrictionTwo.RestrictionText}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Filter by Travel Advisory Status

```typescript
import { useMountainPassConditions } from '@wsdot/api-client';

function ActiveAdvisories() {
  const { data: conditions, isLoading, error } = useMountainPassConditions();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const activeAdvisories = conditions?.filter(condition => condition.TravelAdvisoryActive) || [];

  return (
    <div>
      <h2>Active Travel Advisories ({activeAdvisories.length})</h2>
      {activeAdvisories.map(condition => (
        <div key={condition.MountainPassId} className="advisory-card">
          <h3>{condition.MountainPassName}</h3>
          <p>{condition.RoadCondition}</p>
          <p>Last Updated: {condition.DateUpdated.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
```

## API Documentation

- **WSDOT Documentation**: [Mountain Pass Conditions](https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html)
- **API Help**: [Mountain Pass Conditions REST Service](https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help)

## Notes

- The individual pass condition endpoint (`getMountainPassConditionById`) may not work as expected based on testing
- Temperature data can be `null` when not available
- Travel restrictions are provided for both directions on each pass
- Data is updated infrequently, so caching is appropriate for this API 