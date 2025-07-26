# WSDOT Mountain Pass Conditions API

The WSDOT Mountain Pass Conditions API provides real-time information about mountain pass conditions, restrictions, and weather across Washington State.

## Overview

This module provides access to the WSDOT Mountain Pass Conditions API, which offers real-time information about mountain pass conditions, travel restrictions, weather conditions, and elevation data.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Real-time Conditions** | Current road and weather conditions | ✅ Available |
| **Travel Restrictions** | Direction-specific travel restrictions | ✅ Available |
| **Weather Data** | Temperature and weather conditions | ✅ Available |
| **Elevation Information** | Pass elevation in feet | ✅ Available |
| **Travel Advisories** | Active travel advisory status | ✅ Available |
| **Seasonal Reporting** | Winter season monitoring (Nov 1 - Apr 1) | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Pass Conditions** | Seasonal/Real-time | `HOURLY_UPDATES` | Most active Nov 1 - Apr 1 |
| **Travel Advisories** | Real-time | `MINUTE_UPDATES` | Updated immediately when conditions change |
| **Temperature Data** | Regular intervals | `HOURLY_UPDATES` | During active monitoring periods |

## WSDOT Documentation

- **[WSDOT Mountain Pass Conditions API Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html)**
- **[WSDOT Mountain Pass Conditions API Help](https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `GetMountainPassConditionsAsJson` | GET | Get all mountain pass conditions | `AccessCode` | `MountainPassCondition[]` |
| `GetMountainPassConditionAsJson` | GET | Get specific mountain pass by ID | `AccessCode`, `PassConditionID` | `MountainPassCondition` |

### Base URL
```
https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc
```

## Usage Examples

### Basic Usage

```typescript
import { wsdotMountainPassConditions } from 'ws-dottie/wsdot-mountain-pass-conditions';

// Get all mountain pass conditions
const conditions = await wsdotMountainPassConditions.getMountainPassConditions();

// Get specific mountain pass by ID
const pass = await wsdotMountainPassConditions.getMountainPassCondition({ passConditionId: 1 });
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getMountainPassConditions` | None | `getMountainPassConditions()` | Get all mountain pass conditions |
| `getMountainPassCondition` | `{ passConditionId: number }` | `getMountainPassCondition({ passConditionId: 1 })` | Get specific mountain pass by ID |

### Common Use Cases

```typescript
// Example 1: Display all mountain pass conditions
const conditions = await wsdotMountainPassConditions.getMountainPassConditions();
conditions.forEach(pass => {
  console.log(`${pass.RoadName}: ${pass.RestrictionOne}`);
});

// Example 2: Get specific pass information
const pass = await wsdotMountainPassConditions.getMountainPassCondition({ passConditionId: 1 });
// Display detailed pass information
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useMountainPassConditions` | None | Get all mountain pass conditions | `HOURLY_UPDATES` |
| `useMountainPassCondition` | `{ passConditionId: number }` | Get specific mountain pass by ID | `HOURLY_UPDATES` |

### Basic Hook Usage

```typescript
import { useMountainPassConditions } from 'ws-dottie/react/wsdot-mountain-pass-conditions';

function MountainPassConditionsList() {
  const { data, isLoading, error } = useMountainPassConditions();

  if (isLoading) return <div>Loading pass conditions...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(pass => (
        <div key={pass.PassConditionID}>
          <h3>{pass.RoadName}</h3>
          <p>Restriction: {pass.RestrictionOne}</p>
          <p>Temperature: {pass.TemperatureInFahrenheit}°F</p>
          <p>Elevation: {pass.ElevationInFeet} ft</p>
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
| `MountainPassCondition` | Mountain pass condition information | `PassConditionID`, `RoadName`, `RestrictionOne`, `TemperatureInFahrenheit`, `ElevationInFeet` |

### Detailed Type Definitions

```typescript
type MountainPassCondition = {
  PassConditionID: number;                        // Unique identifier for the mountain pass
  RoadName: string;                               // Name of the road/highway
  RestrictionOne: string;                         // Primary travel restriction
  RestrictionTwo: string;                         // Secondary travel restriction (if any)
  TemperatureInFahrenheit: number;                // Current temperature in Fahrenheit
  ElevationInFeet: number;                        // Pass elevation in feet
  TravelAdvisoryActive: boolean;                  // Whether travel advisory is active
  WeatherCondition: string;                       // Current weather condition
  LastUpdated: string;                            // Last update timestamp
  Direction: string;                              // Direction of travel affected
  State: string;                                  // State where the pass is located
};
```

## Common Use Cases

### Use Case 1: Winter Travel Planning
**Scenario**: Plan winter travel routes by checking mountain pass conditions and restrictions
**Solution**: Use the `getMountainPassConditions` function to check all pass conditions before travel

```typescript
// Implementation example
const conditions = await wsdotMountainPassConditions.getMountainPassConditions();
// Check conditions before planning winter travel routes
```

### Use Case 2: Specific Pass Monitoring
**Scenario**: Monitor conditions for a specific mountain pass (e.g., Snoqualmie Pass)
**Solution**: Use the `getMountainPassCondition` function to get detailed information about a specific pass

```typescript
// Implementation example
const pass = await wsdotMountainPassConditions.getMountainPassCondition({ passConditionId: 1 });
// Monitor specific pass conditions for travel planning
```

## Performance & Caching

This API uses the **HOURLY_UPDATES** caching strategy. For detailed information about caching configuration, performance optimization, and advanced caching options, see the [Performance & Caching](../API-REFERENCE.md#performance--caching) section in the API Reference.

| Caching Aspect | Configuration | Description |
|----------------|---------------|-------------|
| **Stale Time** | 1 hour | Data considered fresh for 1 hour |
| **Refetch Interval** | 1 hour | Automatically refetch data every hour |
| **GC Time** | 2 hours | Keep unused data in cache for 2 hours |
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