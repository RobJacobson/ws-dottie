# WSDOT Bridge Clearances API

The WSDOT Bridge Clearances API provides bridge clearance information for Washington State highways, including vertical clearance measurements and bridge location data.

## Overview

This module provides access to the WSDOT Bridge Clearances API, which offers bridge clearance data for specific routes, vertical clearance measurements, and bridge location information.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Bridge Clearances** | Vertical clearance measurements for all bridges | ✅ Available |
| **Location Data** | Geographic coordinates and milepost information | ✅ Available |
| **Route Filtering** | Filter bridges by specific highway routes | ✅ Available |
| **Clearance Details** | Maximum and minimum clearance measurements | ✅ Available |
| **Bridge Information** | Bridge numbers, descriptions, and structural data | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Bridge Clearances** | Static | `WEEKLY_UPDATES` | Updated when bridge modifications occur |
| **Location Data** | Static | `WEEKLY_UPDATES` | Infrastructure data |
| **Bridge Information** | Static | `WEEKLY_UPDATES` | Structural data |

## WSDOT Documentation

- **[WSDOT Bridge Clearances API Documentation](https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html)**
- **[WSDOT Bridge Clearances API Help](https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `GetClearancesAsJson` | GET | Get bridge clearance data | `AccessCode`, `Route` (optional) | `BridgeDataGIS[]` |

### Base URL
```
https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc
```

## Usage Examples

### Basic Usage

```typescript
import { wsdotBridgeClearances } from 'ws-dottie/wsdot-bridge-clearances';

// Get all bridge clearances
const clearances = await wsdotBridgeClearances.getBridgeClearances();

// Get bridge clearances for specific route
const routeClearances = await wsdotBridgeClearances.getBridgeClearances({ route: "005" });
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getBridgeClearances` | None | `getBridgeClearances()` | Get all bridge clearances |
| `getBridgeClearances` | `{ route: string }` | `getBridgeClearances({ route: "005" })` | Get clearances for specific route |

### Common Use Cases

```typescript
// Example 1: Display all bridge clearances
const clearances = await wsdotBridgeClearances.getBridgeClearances();
clearances.forEach(bridge => {
  console.log(`${bridge.BridgeNumber}: ${bridge.VerticalClearanceMaximumFeetInch} clearance`);
});

// Example 2: Filter bridges by route
const routeClearances = await wsdotBridgeClearances.getBridgeClearances({ route: "005" });
// Display I-5 bridge clearances
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useBridgeClearances` | None | Get all bridge clearances | `WEEKLY_UPDATES` |
| `useBridgeClearances` | `{ route: string }` | Get clearances for specific route | `WEEKLY_UPDATES` |

### Basic Hook Usage

```typescript
import { useBridgeClearances } from 'ws-dottie/react/wsdot-bridge-clearances';

function BridgeClearancesList() {
  const { data, isLoading, error } = useBridgeClearances();

  if (isLoading) return <div>Loading bridge clearances...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(bridge => (
        <div key={bridge.BridgeNumber}>
          <h3>Bridge {bridge.BridgeNumber}</h3>
          <p>Description: {bridge.CrossingDescription}</p>
          <p>Maximum Clearance: {bridge.VerticalClearanceMaximumFeetInch}</p>
          <p>Route: {bridge.StateRouteID}</p>
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
| `BridgeDataGIS` | Bridge clearance and location data | `BridgeNumber`, `CrossingDescription`, `VerticalClearanceMaximumFeetInch`, `Latitude`, `Longitude`, `SRMP` |

### Detailed Type Definitions

```typescript
type BridgeDataGIS = {
  BridgeNumber: string;                           // Unique bridge identifier
  CrossingDescription: string;                    // Description of what the bridge crosses
  VerticalClearanceMaximumFeetInch: string;      // Maximum vertical clearance in feet and inches
  VerticalClearanceMinimumFeetInch: string;      // Minimum vertical clearance in feet and inches
  VerticalClearanceMaximumInches: number;        // Maximum clearance in inches
  VerticalClearanceMinimumInches: number;        // Minimum clearance in inches
  Latitude: number;                               // Latitude coordinate of the bridge
  Longitude: number;                              // Longitude coordinate of the bridge
  SRMP: number;                                   // State Route Milepost
  StateRouteID: string;                           // State route identifier
};
```

## Common Use Cases

### Use Case 1: Bridge Clearance Database
**Scenario**: Create a comprehensive database of all bridge clearances for transportation planning
**Solution**: Use the `getBridgeClearances` function to fetch all bridge data and store it in a database

```typescript
// Implementation example
const clearances = await wsdotBridgeClearances.getBridgeClearances();
// Store in database for transportation planning applications
```

### Use Case 2: Route-Specific Bridge Analysis
**Scenario**: Analyze bridge clearances for a specific highway route (e.g., I-5)
**Solution**: Use the `getBridgeClearances` function with route filtering

```typescript
// Implementation example
const routeClearances = await wsdotBridgeClearances.getBridgeClearances({ route: "005" });
// Analyze I-5 bridge clearances for transportation planning
```

## Performance & Caching

This API uses the **WEEKLY_UPDATES** caching strategy. For detailed information about caching configuration, performance optimization, and advanced caching options, see the [Performance & Caching](../API-REFERENCE.md#performance--caching) section in the API Reference.

| Caching Aspect | Configuration | Description |
|----------------|---------------|-------------|
| **Stale Time** | 7 days | Data considered fresh for 7 days |
| **Refetch Interval** | 7 days | Automatically refetch data every 7 days |
| **GC Time** | 14 days | Keep unused data in cache for 14 days |
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