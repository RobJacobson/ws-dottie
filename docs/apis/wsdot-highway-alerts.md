# WSDOT Highway Alerts API

The WSDOT Highway Alerts API provides real-time traffic alert information for Washington State highways, including construction, maintenance, closures, and other traffic-related events.

> **📚 Documentation Navigation**: [Index](../INDEX.md) • [Getting Started](../GETTING-STARTED.md) • [API Reference](../API-REFERENCE.md) • [Examples](../EXAMPLES.md)

## Overview

This module provides access to the WSDOT Highway Alerts API, which offers real-time highway alert data across Washington State, including traffic events, construction, maintenance, closures, and geographic location data.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Real-time Alerts** | Current traffic alerts and incidents | ✅ Available |
| **Event Categories** | Construction, maintenance, closures, weather | ✅ Available |
| **Location Data** | Geographic coordinates and milepost information | ✅ Available |
| **Priority Levels** | Alert priority from Lowest to Highest | ✅ Available |
| **Regional Filtering** | Filter alerts by geographic areas | ✅ Available |
| **Status Tracking** | Open, closed, and scheduled event status | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Alert Data** | Real-time | `MINUTE_UPDATES` | Updated continuously as events occur |
| **Location Data** | Static | `WEEKLY_UPDATES` | Infrastructure data |

## WSDOT Documentation

- **[WSDOT Highway Alerts API Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html)**
- **[WSDOT Highway Alerts API Help](https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `GetAlertsAsJson` | GET | Get all current traffic alerts | `AccessCode` | `HighwayAlert[]` |
| `GetAlertAsJson` | GET | Get specific alert by ID | `AccessCode`, `AlertID` | `HighwayAlert` |
| `GetAlertsByMapAreaAsJson` | GET | Get alerts filtered by geographic area | `AccessCode`, `MapArea` | `HighwayAlert[]` |

### Base URL
```
https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc
```

## Usage Examples

### Basic Usage

```typescript
import { wsdotHighwayAlerts } from 'ws-dottie/wsdot-highway-alerts';

// Get all current traffic alerts
const alerts = await wsdotHighwayAlerts.getAlerts();

// Get specific alert by ID
const alert = await wsdotHighwayAlerts.getAlert({ alertId: 655238 });

// Get alerts for specific geographic area
const areaAlerts = await wsdotHighwayAlerts.getAlertsByMapArea({ mapArea: "Seattle" });
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getAlerts` | None | `getAlerts()` | Get all current traffic alerts |
| `getAlert` | `{ alertId: number }` | `getAlert({ alertId: 655238 })` | Get specific alert by ID |
| `getAlertsByMapArea` | `{ mapArea: string }` | `getAlertsByMapArea({ mapArea: "Seattle" })` | Get alerts for specific area |

### Common Use Cases

```typescript
// Example 1: Display all current traffic alerts
const alerts = await wsdotHighwayAlerts.getAlerts();
alerts.forEach(alert => {
  console.log(`${alert.HeadlineDescription}: ${alert.EventCategory}`);
});

// Example 2: Get alerts for specific area
const areaAlerts = await wsdotHighwayAlerts.getAlertsByMapArea({ mapArea: "Seattle" });
// Display Seattle area traffic alerts
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useAlerts` | None | Get all current traffic alerts | `MINUTE_UPDATES` |
| `useAlert` | `{ alertId: number }` | Get specific alert by ID | `MINUTE_UPDATES` |
| `useAlertsByMapArea` | `{ mapArea: string }` | Get alerts for specific area | `MINUTE_UPDATES` |

### Basic Hook Usage

```typescript
import { useAlerts } from 'ws-dottie/react/wsdot-highway-alerts';

function HighwayAlertsList() {
  const { data, isLoading, error } = useAlerts();

  if (isLoading) return <div>Loading alerts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(alert => (
        <div key={alert.AlertID}>
          <h3>{alert.HeadlineDescription}</h3>
          <p>Category: {alert.EventCategory}</p>
          <p>Priority: {alert.Priority}</p>
          <p>Location: {alert.RoadName}</p>
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
| `HighwayAlert` | Traffic alert information | `AlertID`, `HeadlineDescription`, `EventCategory`, `Priority`, `RoadName`, `StartRoadName`, `EndRoadName` |

### Detailed Type Definitions

```typescript
type HighwayAlert = {
  AlertID: number;                                // Unique identifier for the alert
  HeadlineDescription: string;                    // Brief description of the alert
  EventCategory: string;                          // Category of the event (e.g., "Construction", "Maintenance")
  Priority: string;                               // Priority level (Lowest, Low, Normal, High, Highest)
  RoadName: string;                               // Name of the affected road
  StartRoadName: string;                          // Starting location of the affected area
  EndRoadName: string;                            // Ending location of the affected area
  StartLatitude: number;                          // Starting latitude coordinate
  StartLongitude: number;                         // Starting longitude coordinate
  EndLatitude: number;                            // Ending latitude coordinate
  EndLongitude: number;                           // Ending longitude coordinate
  StartMilePost: number;                          // Starting milepost
  EndMilePost: number;                            // Ending milepost
  LastUpdatedTime: string;                        // Last update timestamp
  ExpectedEndTime: string;                        // Expected end time of the event
  Direction: string;                              // Direction of travel affected
  State: string;                                  // State where the alert is located
};
```

## Common Use Cases

### Use Case 1: Real-time Traffic Alert Dashboard
**Scenario**: Display real-time traffic alerts for travelers and commuters
**Solution**: Use the `getAlerts` function to create a live dashboard of current traffic events

```typescript
// Implementation example
const alerts = await wsdotHighwayAlerts.getAlerts();
// Display in real-time dashboard with auto-refresh
```

### Use Case 2: Regional Traffic Monitoring
**Scenario**: Monitor traffic alerts for specific geographic areas (e.g., Seattle metro)
**Solution**: Use the `getAlertsByMapArea` function to filter alerts by region

```typescript
// Implementation example
const areaAlerts = await wsdotHighwayAlerts.getAlertsByMapArea({ mapArea: "Seattle" });
// Monitor Seattle area traffic alerts for local commuters
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