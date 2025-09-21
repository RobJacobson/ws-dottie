# WSF Vessels API

The WSF Vessels API provides comprehensive access to Washington State Ferries vessel information, including vessel details, real-time locations, accommodations, statistics, and historical data.

> **📚 Documentation Navigation**: [Index](../INDEX.md) • [Getting Started](../GETTING-STARTED.md) • [API Reference](../API-REFERENCE.md) • [Examples](../EXAMPLES.md)

## Overview

This module provides access to the WSF Vessels API, which offers comprehensive information about Washington State Ferries vessels, including real-time vessel locations, specifications, accommodations, and operational statistics.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Real-time Locations** | Live vessel positions, speeds, and headings | ✅ Available |
| **Vessel Basics** | Names, abbreviations, and operational status | ✅ Available |
| **Vessel Specifications** | Detailed technical specifications and capabilities | ✅ Available |
| **Accommodation Data** | Passenger and vehicle capacity information | ✅ Available |
| **Operational Statistics** | Performance metrics and operational data | ✅ Available |
| **Historical Data** | Past routes, schedules, and operational history | ✅ Available |
| **Cache Management** | Cache flush dates for data freshness | ✅ Available |
| **Fleet Management** | Monitor vessel status and operational information | ✅ Available |
| **Travel Planning** | Check vessel availability and routes | ✅ Available |
| **Accessibility Information** | Provide ADA and accommodation details | ✅ Available |

> **📝 Note**: The general vessel history endpoint (`/vesselhistory`) is deprecated and returns minimal data. Use the date-range specific endpoints (`/vesselhistory/{VesselName}/{DateStart}/{DateEnd}`) for complete historical data.
>
> **⚡ Performance Note**: The `getMultipleVesselHistories` and `getAllVesselHistories` functions use batched processing (default: 6 concurrent requests) to avoid overwhelming the server and browser connection limits. This provides optimal performance while maintaining reliability.

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Vessel Locations** | Real-time | `MINUTE_UPDATES` | Updated continuously as vessels move |
| **Vessel Data** | Static | `WEEKLY_UPDATES` | Updated when vessel information changes |
| **Statistics** | Daily | `DAILY_UPDATES` | Updated daily with operational data |
| **Historical Data** | Minute-level | `MINUTE_UPDATES` | Updated every minute for fresh historical data |

## WSF Documentation

- **[WSF Vessels API Documentation](https://www.wsdot.wa.gov/ferries/api/)**
- **[WSF Vessels API Help](https://www.wsdot.wa.gov/ferries/api/vessels/)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `vesselbasics` | GET | Get all vessel basics | None | `VesselBasic[]` |
| `vesselbasics/{VesselID}` | GET | Get specific vessel basics | `VesselID` | `VesselBasic` |
| `vessellocations` | GET | Get all vessel locations | None | `VesselLocation[]` |
| `vessellocations/{VesselID}` | GET | Get specific vessel location | `VesselID` | `VesselLocation` |
| `vesselverbose` | GET | Get all vessel verbose data | None | `VesselVerbose[]` |
| `vesselaccommodations` | GET | Get all vessel accommodations | None | `VesselAccommodation[]` |
| `vesselstats` | GET | Get all vessel statistics | None | `VesselStats[]` |
| `vesselhistory/{VesselName}/{DateStart}/{DateEnd}` | GET | Get vessel history for specific vessel and date range | `VesselName`, `DateStart`, `DateEnd` | `VesselHistory[]` |
| `cacheflushdate` | GET | Get cache flush date | None | `VesselsCacheFlushDate` |

### Base URL
```
https://www.wsdot.wa.gov/ferries/api/vessels
```

## Usage Examples

### Basic Usage

```typescript
import { WsfVessels } from 'ws-dottie';

// Get all vessel basics
const vessels = await WsfVessels.getVesselBasics();

// Get specific vessel basics
const vessel = await WsfVessels.getVesselBasicsById({ vesselId: 1 });

// Get all vessel locations
const locations = await WsfVessels.getVesselLocations();

// Get vessel accommodations
const accommodations = await WsfVessels.getVesselAccommodations();

// Get vessel statistics
const stats = await WsfVessels.getVesselStats();

// Get vessel history for a specific vessel and date range
const history = await WsfVessels.getVesselHistoryByVesselAndDateRange({
  vesselName: "Spokane",
  dateStart: new Date("2024-01-01"),
  dateEnd: new Date("2024-01-02")
});

// Get vessel history for multiple vessels
const multiVesselHistory = await WsfVessels.getMultipleVesselHistories({
  vesselNames: ["Spokane", "Walla Walla"],
  dateStart: new Date("2024-01-01"),
  dateEnd: new Date("2024-01-02")
});

// Get vessel history for all vessels in the fleet
const allVesselHistory = await WsfVessels.getAllVesselHistories({
  dateStart: new Date("2024-01-01"),
  dateEnd: new Date("2024-01-02")
});

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getVesselBasics` | None | `getVesselBasics()` | Get all vessel basics |
| `getVesselBasicsById` | `{ vesselId: number }` | `getVesselBasicsById({ vesselId: 1 })` | Get specific vessel basics |
| `getVesselLocations` | None | `getVesselLocations()` | Get all vessel locations |
| `getVesselAccommodations` | None | `getVesselAccommodations()` | Get all vessel accommodations |
| `getVesselHistoryByVesselAndDateRange` | `{ vesselName: string, dateStart: Date, dateEnd: Date }` | `getVesselHistoryByVesselAndDateRange({ vesselName: "Spokane", dateStart: new Date("2024-01-01"), dateEnd: new Date("2024-01-02") })` | Get vessel history for specific vessel and date range |
| `getMultipleVesselHistories` | `{ vesselNames: string[], dateStart: Date, dateEnd: Date, batchSize?: number }` | `getMultipleVesselHistories({ vesselNames: ["Spokane", "Walla Walla"], dateStart: new Date("2024-01-01"), dateEnd: new Date("2024-01-02") })` | Get vessel history for multiple vessels |
| `getAllVesselHistories` | `{ dateStart: Date, dateEnd: Date, batchSize?: number }` | `getAllVesselHistories({ dateStart: new Date("2024-01-01"), dateEnd: new Date("2024-01-02") })` | Get vessel history for all 21 vessels in the fleet |

### Returns

See Data Types below. Each function returns strongly typed data validated at runtime. Historical endpoints return arrays of `VesselHistory`; basics, stats, accommodations, and verbose endpoints return their respective typed arrays or single items.

### Common Use Cases

```typescript
// Example 1: Display all vessels
const vessels = await WsfVessels.getVesselBasics();
vessels.forEach(vessel => {
  console.log(`${vessel.VesselName}: ${vessel.VesselAbbrev}`);
});

// Example 2: Get vessel locations
const locations = await WsfVessels.getVesselLocations();
// Display real-time vessel positions
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useVesselBasics` | None | Get all vessel basics | `WEEKLY_UPDATES` |
| `useVesselBasicsByVesselId` | `{ vesselId: number }` | Get specific vessel basics | `WEEKLY_UPDATES` |
| `useVesselLocations` | None | Get all vessel locations | `MINUTE_UPDATES` |
| `useVesselAccommodations` | None | Get all vessel accommodations | `WEEKLY_UPDATES` |

### Basic Hook Usage

```typescript
import { useVesselBasics } from 'ws-dottie';

function VesselsList() {
  const { data, isLoading, error } = useVesselBasics();

  if (isLoading) return <div>Loading vessels...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(vessel => (
        <div key={vessel.VesselID}>
          <h3>{vessel.VesselName}</h3>
          <p>Abbreviation: {vessel.VesselAbbrev}</p>
          {/* Status not provided in current schema; available fields include Class, Status (numeric), etc. */}
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
| `VesselBasic` | Basic vessel information | `VesselID`, `VesselName`, `VesselAbbrev`, `VesselStatus` |
| `VesselLocation` | Vessel location data | `VesselID`, `Latitude`, `Longitude`, `Speed`, `Heading` |
| `VesselAccommodation` | Vessel accommodation data | `VesselID`, `PassengerCapacity`, `VehicleCapacity` |
| `VesselStats` | Vessel statistics | `VesselID`, `OperationalHours`, `PassengersCarried` |
| `VesselHistory` | Vessel historical data | `VesselId`, `Vessel`, `Departing`, `Arriving`, `ScheduledDepart`, `ActualDepart`, `EstArrival`, `Date` |

### Detailed Type Definitions

```typescript
type VesselBasic = {
  VesselID: number;                              // Unique identifier for the vessel
  VesselName: string;                            // Full name of the vessel
  VesselAbbrev: string;                          // Abbreviated vessel name
  VesselStatus: string;                          // Current operational status
  VesselDescription: string;                     // Description of the vessel
};

type VesselLocation = {
  VesselID: number;                              // Unique identifier for the vessel
  Latitude: number;                              // Current latitude coordinate
  Longitude: number;                             // Current longitude coordinate
  Speed: number;                                 // Current speed in knots
  Heading: number;                               // Current heading in degrees
  LastUpdated: string;                           // Last update timestamp
  VesselName: string;                            // Name of the vessel
};

type VesselAccommodation = {
  VesselID: number;                              // Unique identifier for the vessel
  PassengerCapacity: number;                     // Maximum passenger capacity
  VehicleCapacity: number;                       // Maximum vehicle capacity
  VesselName: string;                            // Name of the vessel
  AccommodationDetails: string;                  // Detailed accommodation information
};

type VesselStats = {
  VesselID: number;                              // Unique identifier for the vessel
  OperationalHours: number;                      // Total operational hours
  PassengersCarried: number;                     // Total passengers carried
  VesselName: string;                            // Name of the vessel
  LastUpdated: string;                           // Last update timestamp
};

type VesselHistory = {
  VesselId: number;                              // Unique identifier for the vessel
  Vessel: string;                                // Name of the vessel
  Departing: string | null;                      // Departure terminal name
  Arriving: string | null;                       // Arrival terminal name
  ScheduledDepart: Date | null;                  // Scheduled departure time
  ActualDepart: Date | null;                     // Actual departure time
  EstArrival: Date | null;                       // Estimated arrival time
  Date: Date | null;                             // Date of the trip
};
```

## Common Use Cases

### Use Case 1: Fleet Monitoring and Management
**Scenario**: Monitor the entire WSF fleet for operational status and real-time locations
**Solution**: Use the `getVesselBasics` and `getVesselLocations` functions to display fleet information

```typescript
// Implementation example
const vessels = await wsfVessels.getVesselBasics();
const locations = await wsfVessels.getVesselLocations();
// Display fleet monitoring dashboard
```

### Use Case 2: Vessel-Specific Information
**Scenario**: Provide detailed information about specific vessels for travelers
**Solution**: Use the `getVesselBasicsByVesselId` and `getVesselAccommodations` functions to show vessel details

```typescript
// Implementation example
const vessel = await WsfVessels.getVesselBasicsById({ vesselId: 1 });
const accommodations = await WsfVessels.getVesselAccommodations();
// Display detailed vessel information for travelers
```

### Use Case 3: Vessel Historical Analysis
**Scenario**: Analyze vessel performance and operational patterns over time
**Solution**: Use the `getVesselHistoryByVesselAndDateRange` and `getVesselHistoryForMultipleVessels` functions to retrieve historical data

```typescript
// Implementation example - Single vessel analysis
const history = await WsfVessels.getVesselHistoryByVesselAndDateRange({
  vesselName: "Spokane",
  dateStart: new Date("2024-01-01"),
  dateEnd: new Date("2024-01-31")
});

// Analyze on-time performance for single vessel
const onTimeTrips = history.filter(trip => 
  trip.ActualDepart && trip.ScheduledDepart && 
  Math.abs(trip.ActualDepart.getTime() - trip.ScheduledDepart.getTime()) < 5 * 60 * 1000 // Within 5 minutes
);

console.log(`Spokane on-time performance: ${(onTimeTrips.length / history.length * 100).toFixed(1)}%`);

// Implementation example - Fleet-wide analysis
const allVesselHistory = await WsfVessels.getAllVesselHistories({
  dateStart: new Date("2024-01-01"),
  dateEnd: new Date("2024-01-31")
});

// Analyze fleet-wide on-time performance
const fleetOnTimeTrips = allVesselHistory.filter(trip => 
  trip.ActualDepart && trip.ScheduledDepart && 
  Math.abs(trip.ActualDepart.getTime() - trip.ScheduledDepart.getTime()) < 5 * 60 * 1000
);

console.log(`Fleet-wide on-time performance: ${(fleetOnTimeTrips.length / allVesselHistory.length * 100).toFixed(1)}%`);
```

## Performance & Caching

This API uses the **WEEKLY_UPDATES** caching strategy for static data, **MINUTE_UPDATES** for real-time and historical data, and **DAILY_UPDATES** for statistics. For detailed information about caching configuration, performance optimization, and advanced caching options, see the [Performance & Caching](../API-REFERENCE.md#performance--caching) section in the API Reference.

| Caching Aspect | Configuration | Description |
|----------------|---------------|-------------|
| **Stale Time** | 7 days (static), 1 minute (real-time/historical), 1 day (statistics) | Data considered fresh for 7 days (static), 1 minute (real-time/historical), or 1 day (statistics) |
| **Refetch Interval** | 7 days (static), 1 minute (real-time/historical), 1 day (statistics) | Automatically refetch data every 7 days (static), 1 minute (real-time/historical), or 1 day (statistics) |
| **GC Time** | 14 days (static), 1 hour (real-time/historical), 2 days (statistics) | Keep unused data in cache for 14 days (static), 1 hour (real-time/historical), or 2 days (statistics) |
| **Retry** | 5 attempts (static), 0 attempts (real-time/historical), 5 attempts (statistics) | Retry failed requests up to 5 times (static/statistics) or no retries (real-time/historical) |

## Update Frequency

Refer to Data Update Frequency near the top of this page for freshness guidance (real‑time locations, daily stats, weekly static data).

## Common Patterns

For information about data transformation, error handling, caching strategies, and other common patterns, see the [API Reference](../API-REFERENCE.md) documentation.

## References

- **[Error Handling](../API-REFERENCE.md#error-handling)** - Comprehensive error handling patterns
- **[Data Transformation](../API-REFERENCE.md#data-transformation)** - Automatic data conversion and filtering
- **[React Hooks](../API-REFERENCE.md#react-hooks)** - Complete React integration guide
- **[Performance & Caching](../API-REFERENCE.md#performance--caching)** - Advanced caching configuration
- **[Testing Status](../API-REFERENCE.md#testing-status)** - E2E test completion and validation status
- **[API Compliance](../API-REFERENCE.md#api-compliance)** - WSF API alignment verification 