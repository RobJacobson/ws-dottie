# WSDOT Traffic Flow API

This module provides access to the WSDOT Traffic Flow API, which offers real-time information about traffic flow conditions and readings across Washington State.

## Overview

The Traffic Flow API provides data about:
- Current traffic flow readings from monitoring stations
- Geographic location and direction information
- Flow station details and milepost data
- Regional traffic flow conditions
- Real-time flow measurement data

## API Endpoints

### Get All Traffic Flows

Retrieves current traffic flow data from all monitoring stations.

```typescript
import { getTrafficFlows } from '@wsdot/api-client';

const trafficFlows = await getTrafficFlows();
```

**Returns:** `Promise<TrafficFlow[]>`

### Get Specific Traffic Flow

Retrieves traffic flow data for a specific station by ID.

```typescript
import { getTrafficFlowById } from '@wsdot/api-client';

const trafficFlow = await getTrafficFlowById(2482);
```

**Parameters:**
- `flowDataId` (number): The unique identifier for the traffic flow station

**Returns:** `Promise<TrafficFlow>`

## React Query Hooks

### useTrafficFlows

React Query hook for retrieving all traffic flow data.

```typescript
import { useTrafficFlows } from '@wsdot/api-client';

function TrafficFlowsComponent() {
  const { data: trafficFlows, isLoading, error } = useTrafficFlows();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {trafficFlows?.map(flow => (
        <div key={flow.FlowDataID}>
          <h3>{flow.FlowStationLocation.Description}</h3>
          <p>Flow Value: {flow.FlowReadingValue}</p>
          <p>Direction: {flow.FlowStationLocation.Direction}</p>
          <p>Region: {flow.Region}</p>
        </div>
      ))}
    </div>
  );
}
```

### useTrafficFlowById

React Query hook for retrieving a specific traffic flow by ID.

```typescript
import { useTrafficFlowById } from '@wsdot/api-client';

function TrafficFlowDetailComponent({ flowId }: { flowId: number }) {
  const { data: trafficFlow, isLoading, error } = useTrafficFlowById(flowId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{trafficFlow?.FlowStationLocation.Description}</h2>
      <p>Flow Value: {trafficFlow?.FlowReadingValue}</p>
      <p>Direction: {trafficFlow?.FlowStationLocation.Direction}</p>
      <p>Region: {trafficFlow?.Region}</p>
      <p>Road: {trafficFlow?.FlowStationLocation.RoadName}</p>
      <p>Milepost: {trafficFlow?.FlowStationLocation.MilePost}</p>
      <p>Last Updated: {trafficFlow?.Time.toLocaleString()}</p>
    </div>
  );
}
```

## Data Types

### TrafficFlow

Represents a traffic flow record.

```typescript
type TrafficFlow = {
  FlowDataID: number;                    // Unique identifier for the flow station
  FlowReadingValue: number;              // Current flow reading value
  FlowStationLocation: FlowStationLocation; // Location information
  Region: string;                        // Geographic region (e.g., "Northwest")
  StationName: string;                   // Station identifier (e.g., "002es00068")
  Time: Date;                            // When the reading was taken
};
```

### FlowStationLocation

Represents location information for a flow station.

```typescript
type FlowStationLocation = {
  Description: string;                   // Human-readable location description
  Direction: string;                     // Travel direction ("EB", "WB", "NB", "SB")
  Latitude: number;                      // Station latitude coordinate
  Longitude: number;                     // Station longitude coordinate
  MilePost: number;                      // Milepost location
  RoadName: string;                      // Road identifier (e.g., "002")
};
```

### TrafficFlowsResponse

Array of traffic flow records.

```typescript
type TrafficFlowsResponse = TrafficFlow[];
```

## Error Handling

All functions throw `WsdotApiError` instances when the API request fails. Common error scenarios include:

- **API_ERROR**: The WSDOT API returned an error response
- **NETWORK_ERROR**: Network connectivity issues
- **TIMEOUT_ERROR**: Request timed out

```typescript
import { getTrafficFlows } from '@wsdot/api-client';
import { WsdotApiError } from '@wsdot/api-client';

try {
  const trafficFlows = await getTrafficFlows();
  console.log('Traffic flows retrieved:', trafficFlows.length);
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

The hooks use `REACT_QUERY.MINUTE_UPDATES` for traffic flow data since this data changes frequently but not every few seconds:

- **Stale Time**: 5 minutes (data considered stale after 5 minutes)
- **Refetch Interval**: 1 minute (refetch every 1 minute)
- **Retries**: None (simple polling)
- **Garbage Collection**: 10 minutes (keep in cache for 10 minutes)

## Examples

### Display All Traffic Flows

```typescript
import { useTrafficFlows } from '@wsdot/api-client';

function TrafficFlowsList() {
  const { data: trafficFlows, isLoading, error } = useTrafficFlows();

  if (isLoading) return <div>Loading traffic flows...</div>;
  if (error) return <div>Error loading flows: {error.message}</div>;

  return (
    <div>
      <h2>Current Traffic Flows</h2>
      {trafficFlows?.map(flow => (
        <div key={flow.FlowDataID} className="flow-card">
          <h3>{flow.FlowStationLocation.Description}</h3>
          <p><strong>Flow Value:</strong> {flow.FlowReadingValue}</p>
          <p><strong>Direction:</strong> {flow.FlowStationLocation.Direction}</p>
          <p><strong>Region:</strong> {flow.Region}</p>
          <p><strong>Road:</strong> {flow.FlowStationLocation.RoadName}</p>
          <p><strong>Milepost:</strong> {flow.FlowStationLocation.MilePost}</p>
          <p><strong>Last Updated:</strong> {flow.Time.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
```

### Filter by Region

```typescript
import { useTrafficFlows } from '@wsdot/api-client';

function RegionalTrafficFlows({ region }: { region: string }) {
  const { data: trafficFlows, isLoading, error } = useTrafficFlows();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const regionalFlows = trafficFlows?.filter(flow => flow.Region === region) || [];

  return (
    <div>
      <h2>Traffic Flows in {region}</h2>
      {regionalFlows.map(flow => (
        <div key={flow.FlowDataID} className="regional-flow">
          <h3>{flow.FlowStationLocation.Description}</h3>
          <p>Flow Value: {flow.FlowReadingValue}</p>
          <p>Direction: {flow.FlowStationLocation.Direction}</p>
        </div>
      ))}
    </div>
  );
}
```

### Filter by Direction

```typescript
import { useTrafficFlows } from '@wsdot/api-client';

function DirectionalTrafficFlows({ direction }: { direction: string }) {
  const { data: trafficFlows, isLoading, error } = useTrafficFlows();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const directionalFlows = trafficFlows?.filter(
    flow => flow.FlowStationLocation.Direction === direction
  ) || [];

  return (
    <div>
      <h2>{direction} Traffic Flows</h2>
      {directionalFlows.map(flow => (
        <div key={flow.FlowDataID} className="directional-flow">
          <h3>{flow.FlowStationLocation.Description}</h3>
          <p>Flow Value: {flow.FlowReadingValue}</p>
          <p>Region: {flow.Region}</p>
        </div>
      ))}
    </div>
  );
}
```

### Traffic Flow Map

```typescript
import { useTrafficFlows } from '@wsdot/api-client';

function TrafficFlowMap() {
  const { data: trafficFlows, isLoading, error } = useTrafficFlows();

  if (isLoading) return <div>Loading traffic flow data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Traffic Flow Map</h2>
      {trafficFlows?.map(flow => (
        <div key={flow.FlowDataID} className="flow-marker">
          <h3>{flow.FlowStationLocation.Description}</h3>
          <p><strong>Coordinates:</strong> ({flow.FlowStationLocation.Latitude}, {flow.FlowStationLocation.Longitude})</p>
          <p><strong>Flow Value:</strong> {flow.FlowReadingValue}</p>
          <p><strong>Direction:</strong> {flow.FlowStationLocation.Direction}</p>
          <p><strong>Road:</strong> {flow.FlowStationLocation.RoadName} at milepost {flow.FlowStationLocation.MilePost}</p>
          
          {/* These coordinates can be used with mapping libraries */}
          <div className="map-coordinates">
            <p>Latitude: {flow.FlowStationLocation.Latitude}</p>
            <p>Longitude: {flow.FlowStationLocation.Longitude}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Flow Value Analysis

```typescript
import { useTrafficFlows } from '@wsdot/api-client';

function FlowValueAnalysis() {
  const { data: trafficFlows, isLoading, error } = useTrafficFlows();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const averageFlow = trafficFlows?.reduce((sum, flow) => sum + flow.FlowReadingValue, 0) / (trafficFlows?.length || 1);
  const maxFlow = Math.max(...(trafficFlows?.map(flow => flow.FlowReadingValue) || [0]));
  const minFlow = Math.min(...(trafficFlows?.map(flow => flow.FlowReadingValue) || [0]));

  return (
    <div>
      <h2>Traffic Flow Analysis</h2>
      <div className="flow-stats">
        <p><strong>Total Stations:</strong> {trafficFlows?.length || 0}</p>
        <p><strong>Average Flow Value:</strong> {averageFlow.toFixed(2)}</p>
        <p><strong>Maximum Flow Value:</strong> {maxFlow}</p>
        <p><strong>Minimum Flow Value:</strong> {minFlow}</p>
      </div>
      
      <h3>Flow Value Distribution</h3>
      {trafficFlows?.map(flow => (
        <div key={flow.FlowDataID} className="flow-bar">
          <span>{flow.FlowStationLocation.Description}</span>
          <div 
            className="flow-indicator" 
            style={{ width: `${(flow.FlowReadingValue / maxFlow) * 100}%` }}
          >
            {flow.FlowReadingValue}
          </div>
        </div>
      ))}
    </div>
  );
}
```

## API Documentation

- **WSDOT Documentation**: [Traffic Flow](https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html)
- **API Help**: [Traffic Flow REST Service](https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help)

## Notes

- Flow reading values represent traffic flow intensity (typically 0-100 scale)
- Travel directions are abbreviated: "EB" (Eastbound), "WB" (Westbound), "NB" (Northbound), "SB" (Southbound)
- Station names follow the pattern: `{road}{direction}{milepost}` (e.g., "002es00068")
- Road names are typically numeric identifiers (e.g., "002" for SR 2)
- Data is updated frequently, so caching strategies are optimized for real-time updates
- Geographic coordinates can be used with mapping libraries for visualization 