# WSDOT Toll Rates API

The WSDOT Toll Rates API provides real-time information about toll rates, trip information, and pricing for high occupancy lanes across Washington State.

## Overview

This module provides access to the WSDOT Toll Rates API, which offers real-time information about toll rates, trip information, pricing for high occupancy lanes, and historical toll rate data.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Real-time Rates** | Current toll rates updated every 5 minutes | ✅ Available |
| **Trip Information** | Detailed trip data with geometry | ✅ Available |
| **Historical Data** | Past 30 days of toll rate history | ✅ Available |
| **Geographic Data** | Coordinates and milepost information | ✅ Available |
| **Travel Directions** | Direction-specific toll information | ✅ Available |
| **API Versioning** | Version tracking for data changes | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Current Rates** | Every 5 minutes | `MINUTE_UPDATES` | Real-time pricing updates |
| **Trip Information** | Static | `WEEKLY_UPDATES` | Infrastructure data |
| **Historical Data** | Daily | `DAILY_UPDATES` | Past 30 days available |

## WSDOT Documentation

- **[WSDOT Toll Rates API Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html)**
- **[WSDOT Toll Rates API Help](https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `GetTollRatesAsJson` | GET | Get current toll rates for all facilities | `AccessCode` | `TollRate[]` |
| `GetTollTripInfoAsJson` | GET | Get detailed trip information with geometry | `AccessCode` | `TollTripInfo[]` |
| `GetTollTripRatesAsJson` | GET | Get current toll rates with messages | `AccessCode` | `TollTripRatesResponse` |
| `GetTollTripVersionAsJson` | GET | Get API version and timestamp | `AccessCode` | `TollTripVersion` |
| `GetTripRatesByDateAsJson` | GET | Get historical toll rates by date range | `AccessCode`, `fromDate`, `toDate` | `TollRate[]` |

### Base URL
```
https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc
```

## Usage Examples

### Basic Usage

```typescript
import { wsdotTollRates } from 'ws-dottie/wsdot-toll-rates';

// Get current toll rates for all facilities
const rates = await wsdotTollRates.getTollRates();

// Get detailed trip information
const tripInfo = await wsdotTollRates.getTollTripInfo();

// Get historical toll rates by date range
const historicalRates = await wsdotTollRates.getTripRatesByDate({ 
  fromDate: "2024-01-01", 
  toDate: "2024-01-31" 
});
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getTollRates` | None | `getTollRates()` | Get current toll rates for all facilities |
| `getTollTripInfo` | None | `getTollTripInfo()` | Get detailed trip information with geometry |
| `getTripRatesByDate` | `{ fromDate: string, toDate: string }` | `getTripRatesByDate({ fromDate: "2024-01-01", toDate: "2024-01-31" })` | Get historical toll rates by date range |

### Common Use Cases

```typescript
// Example 1: Display current toll rates
const rates = await wsdotTollRates.getTollRates();
rates.forEach(rate => {
  console.log(`${rate.TripName}: $${rate.TollAmount}`);
});

// Example 2: Get historical rates for analysis
const historicalRates = await wsdotTollRates.getTripRatesByDate({ 
  fromDate: "2024-01-01", 
  toDate: "2024-01-31" 
});
// Analyze toll rate trends over time
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useTollRates` | None | Get current toll rates for all facilities | `MINUTE_UPDATES` |
| `useTollTripInfo` | None | Get detailed trip information with geometry | `WEEKLY_UPDATES` |
| `useTripRatesByDate` | `{ fromDate: string, toDate: string }` | Get historical toll rates by date range | `DAILY_UPDATES` |

### Basic Hook Usage

```typescript
import { useTollRates } from 'ws-dottie/react/wsdot-toll-rates';

function TollRatesList() {
  const { data, isLoading, error } = useTollRates();

  if (isLoading) return <div>Loading toll rates...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(rate => (
        <div key={rate.TripID}>
          <h3>{rate.TripName}</h3>
          <p>Toll Amount: ${rate.TollAmount}</p>
          <p>Direction: {rate.Direction}</p>
          <p>Start Location: {rate.StartLocationName}</p>
          <p>End Location: {rate.EndLocationName}</p>
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
| `TollRate` | Current toll rate information | `TripID`, `TripName`, `TollAmount`, `Direction`, `StartLocationName`, `EndLocationName` |
| `TollTripInfo` | Detailed trip information with geometry | `TripID`, `TripName`, `Geometry`, `StartLocation`, `EndLocation` |
| `TollTripRatesResponse` | Toll rates with messages | `TollRates`, `Messages`, `Version` |

### Detailed Type Definitions

```typescript
type TollRate = {
  TripID: number;                                // Unique identifier for the toll trip
  TripName: string;                              // Name of the toll trip
  TollAmount: number;                            // Current toll amount in dollars
  Direction: string;                             // Direction of travel
  StartLocationName: string;                     // Starting location name
  EndLocationName: string;                       // Ending location name
  StartMilePost: number;                         // Starting milepost
  EndMilePost: number;                           // Ending milepost
  LastUpdated: string;                           // Last update timestamp
  State: string;                                 // State where the toll facility is located
};

type TollTripInfo = {
  TripID: number;                                // Unique identifier for the toll trip
  TripName: string;                              // Name of the toll trip
  Geometry: string;                              // Geographic geometry data
  StartLocation: string;                         // Starting location
  EndLocation: string;                           // Ending location
  StartMilePost: number;                         // Starting milepost
  EndMilePost: number;                           // Ending milepost
  Direction: string;                             // Direction of travel
};

type TollTripRatesResponse = {
  TollRates: TollRate[];                         // Array of current toll rates
  Messages: string[];                            // Additional messages or alerts
  Version: string;                               // API version information
};
```

## Common Use Cases

### Use Case 1: Real-time Toll Rate Monitoring
**Scenario**: Monitor current toll rates for high occupancy lanes to help drivers make informed travel decisions
**Solution**: Use the `getTollRates` function to display current pricing information

```typescript
// Implementation example
const rates = await wsdotTollRates.getTollRates();
// Display current toll rates in a real-time dashboard
```

### Use Case 2: Historical Toll Rate Analysis
**Scenario**: Analyze toll rate trends over time for transportation planning and cost analysis
**Solution**: Use the `getTripRatesByDate` function to retrieve historical data

```typescript
// Implementation example
const historicalRates = await wsdotTollRates.getTripRatesByDate({ 
  fromDate: "2024-01-01", 
  toDate: "2024-01-31" 
});
// Analyze toll rate patterns and trends
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