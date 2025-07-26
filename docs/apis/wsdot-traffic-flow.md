# WSDOT Traffic Flow API

The WSDOT Traffic Flow API provides real-time information about traffic flow conditions and readings across Washington State.

## Overview

This module provides access to the WSDOT Traffic Flow API, which offers real-time information about traffic flow conditions, readings from monitoring stations, and geographic location data.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Real-time Flow Data** | Current traffic flow readings from sensors | ✅ Available |
| **Location Data** | Geographic coordinates and milepost information | ✅ Available |
| **Direction Information** | Travel direction for each flow station | ✅ Available |
| **Regional Organization** | Flow data organized by geographic regions | ✅ Available |
| **Station Details** | Station names and descriptions | ✅ Available |
| **Flow Conditions** | Traffic condition levels (WideOpen to StopAndGo) | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Flow Readings** | Real-time | `MINUTE_UPDATES` | Updated continuously from monitoring stations |
| **Station Data** | Static | `WEEKLY_UPDATES` | Infrastructure data |

## WSDOT Documentation

- **[WSDOT Traffic Flow API Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html)**
- **[WSDOT Traffic Flow API Help](https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `GetTrafficFlowsAsJson` | GET | Get all traffic flow data | `AccessCode` | `TrafficFlow[]` |
| `GetTrafficFlowAsJson` | GET | Get specific traffic flow by ID | `AccessCode`, `FlowDataID` | `TrafficFlow` |

### Base URL
```
https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc
```

## Usage Examples

### Basic Usage

```typescript
import { wsdotTrafficFlow } from 'ws-dottie/wsdot-traffic-flow';

// Get all traffic flow data
const flows = await wsdotTrafficFlow.getTrafficFlows();

// Get specific traffic flow by ID
const flow = await wsdotTrafficFlow.getTrafficFlow({ flowDataId: 2482 });
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getTrafficFlows` | None | `getTrafficFlows()` | Get all traffic flow data |
| `getTrafficFlow` | `{ flowDataId: number }` | `getTrafficFlow({ flowDataId: 2482 })` | Get specific traffic flow by ID |

### Common Use Cases

```typescript
// Example 1: Display all traffic flow data
const flows = await wsdotTrafficFlow.getTrafficFlows();
flows.forEach(flow => {
  console.log(`${flow.StationName}: ${flow.FlowReading} vehicles/hour`);
});

// Example 2: Get specific flow information
const flow = await wsdotTrafficFlow.getTrafficFlow({ flowDataId: 2482 });
// Display detailed flow information
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useTrafficFlows` | None | Get all traffic flow data | `MINUTE_UPDATES` |
| `useTrafficFlow` | `{ flowDataId: number }` | Get specific traffic flow by ID | `MINUTE_UPDATES` |

### Basic Hook Usage

```typescript
import { useTrafficFlows } from 'ws-dottie/react/wsdot-traffic-flow';

function TrafficFlowList() {
  const { data, isLoading, error } = useTrafficFlows();

  if (isLoading) return <div>Loading traffic flows...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(flow => (
        <div key={flow.FlowDataID}>
          <h3>{flow.StationName}</h3>
          <p>Flow Reading: {flow.FlowReading} vehicles/hour</p>
          <p>Direction: {flow.Direction}</p>
          <p>Road Name: {flow.RoadName}</p>
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
| `TrafficFlow` | Traffic flow information | `FlowDataID`, `StationName`, `FlowReading`, `Direction`, `RoadName`, `MilePost` |

### Detailed Type Definitions

```typescript
type TrafficFlow = {
  FlowDataID: number;                            // Unique identifier for the flow data
  StationName: string;                           // Name of the traffic flow station
  FlowReading: number;                           // Current flow reading in vehicles per hour
  Direction: string;                             // Direction of travel
  RoadName: string;                              // Name of the road/highway
  MilePost: number;                              // Milepost location of the station
  Latitude: number;                              // Latitude coordinate of the station
  Longitude: number;                             // Longitude coordinate of the station
  Region: string;                                // Geographic region of the station
  LastUpdated: string;                           // Last update timestamp
  State: string;                                 // State where the station is located
};
```

## Common Use Cases

### Use Case 1: Real-time Traffic Flow Monitoring
**Scenario**: Monitor real-time traffic flow conditions across Washington State highways
**Solution**: Use the `getTrafficFlows` function to display current flow readings from all monitoring stations

```typescript
// Implementation example
const flows = await wsdotTrafficFlow.getTrafficFlows();
// Display traffic flow data in a real-time monitoring dashboard
```

### Use Case 2: Specific Station Analysis
**Scenario**: Analyze traffic flow data for a specific monitoring station
**Solution**: Use the `getTrafficFlow` function to get detailed information about a specific station

```typescript
// Implementation example
const flow = await wsdotTrafficFlow.getTrafficFlow({ flowDataId: 2482 });
// Analyze specific station data for traffic planning
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