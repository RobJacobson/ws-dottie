# WSDOT Border Crossings API

The WSDOT Border Crossings API provides real-time information about wait times at Washington State border crossings with Canada, including estimated wait times, location information, and crossing details.

## Overview

This module provides access to the WSDOT Border Crossings API, which offers real-time border crossing wait time data and location information for major border crossing points between Washington State and Canada.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Real-time Wait Times** | Current estimated wait times for all border crossings | ✅ Available |
| **Location Data** | Geographic coordinates and milepost information | ✅ Available |
| **Crossing Details** | Names and descriptions of border crossing points | ✅ Available |
| **Directional Data** | Separate data for northbound and southbound traffic | ✅ Available |
| **Timestamp Information** | When the wait time data was last updated | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Wait Times** | Every 5-15 minutes | `MINUTE_UPDATES` | Depends on border activity |
| **Location Data** | Static | `WEEKLY_UPDATES` | Infrastructure data |
| **Crossing Names** | Static | `WEEKLY_UPDATES` | Infrastructure data |

## WSDOT Documentation

- **[WSDOT Traveler Information API](https://wsdot.wa.gov/traffic/api/)**
- **[WSDOT Border Crossings API Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html)**
- **[WSDOT Border Crossings API Help](https://wsdot.wa.gov/traffic/api/BorderCrossings/BorderCrossingsREST.svc/Help)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `GetBorderCrossingsAsJson` | GET | Get all border crossing wait times | `AccessCode` | `BorderCrossingData[]` |
| `GetBorderCrossingAsJson` | GET | Get specific border crossing by ID | `AccessCode`, `BorderCrossingID` | `BorderCrossingData` |

### Base URL
```
https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc
```

## Usage Examples

### Basic Usage

```typescript
import { wsdotBorderCrossings } from 'ws-dottie/wsdot-border-crossings';

// Get all border crossing wait times
const crossings = await wsdotBorderCrossings.getBorderCrossings();

// Get specific border crossing by ID
const crossing = await wsdotBorderCrossings.getBorderCrossing({ borderCrossingId: 123 });
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getBorderCrossings` | None | `getBorderCrossings()` | Get all border crossing wait times |
| `getBorderCrossing` | `{ borderCrossingId: number }` | `getBorderCrossing({ borderCrossingId: 123 })` | Get specific border crossing by ID |

### Common Use Cases

```typescript
// Example 1: Display all border crossing wait times
const crossings = await wsdotBorderCrossings.getBorderCrossings();
crossings.forEach(crossing => {
  console.log(`${crossing.CrossingName}: ${crossing.WaitTime} minutes`);
});

// Example 2: Get specific border crossing information
const crossing = await wsdotBorderCrossings.getBorderCrossing({ borderCrossingId: 1 });
console.log(`Location: ${crossing.BorderCrossingLocation.Description}`);
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useBorderCrossings` | None | Get all border crossing wait times | `MINUTE_UPDATES` |
| `useBorderCrossing` | `{ borderCrossingId: number }` | Get specific border crossing by ID | `MINUTE_UPDATES` |

### Basic Hook Usage

```typescript
import { useBorderCrossings } from 'ws-dottie/react/wsdot-border-crossings';

function BorderCrossingsList() {
  const { data, isLoading, error } = useBorderCrossings();

  if (isLoading) return <div>Loading border crossings...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(crossing => (
        <div key={crossing.CrossingName}>
          <h3>{crossing.CrossingName}</h3>
          <p>Wait Time: {crossing.WaitTime} minutes</p>
          <p>Location: {crossing.BorderCrossingLocation.Description}</p>
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
| `BorderCrossingData` | Border crossing wait time data | `CrossingName`, `WaitTime`, `BorderCrossingLocation`, `Time` |
| `BorderCrossingLocation` | Geographic location information | `Description`, `Latitude`, `Longitude`, `MilePost`, `RoadName`, `Direction` |

### Detailed Type Definitions

```typescript
type BorderCrossingData = {
  BorderCrossingLocation: BorderCrossingLocation;  // Location information for the border crossing
  CrossingName: string;                            // Name of the border crossing
  Time: string;                                    // Timestamp of the wait time data (WSDOT date format)
  WaitTime: number;                                // Estimated wait time in minutes
};

type BorderCrossingLocation = {
  Description: string;                             // Human-readable description of the crossing location
  Direction: string | null;                        // Direction of travel (e.g., "Northbound", "Southbound")
  Latitude: number;                                // Latitude coordinate of the crossing
  Longitude: number;                               // Longitude coordinate of the crossing
  MilePost: number;                                // Milepost marker on the highway
  RoadName: string;                                // Name of the road/highway at the crossing
};
```

## Common Use Cases

### Use Case 1: Border Crossing Wait Time Dashboard
**Scenario**: Display real-time wait times for all border crossings in a dashboard
**Solution**: Use the `getBorderCrossings` function to fetch all data and display it in a user-friendly interface

```typescript
// Implementation example
const crossings = await wsdotBorderCrossings.getBorderCrossings();
// Display in dashboard with auto-refresh every 5 minutes
```

### Use Case 2: Specific Border Crossing Monitoring
**Scenario**: Monitor wait times for a specific border crossing (e.g., I-5)
**Solution**: Use the `getBorderCrossing` function with the specific border crossing ID

```typescript
// Implementation example
const crossing = await wsdotBorderCrossings.getBorderCrossing({ borderCrossingId: 1 });
// Display specific crossing information with real-time updates
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