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

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Vessel Locations** | Real-time | `MINUTE_UPDATES` | Updated continuously as vessels move |
| **Vessel Data** | Static | `WEEKLY_UPDATES` | Updated when vessel information changes |
| **Statistics** | Daily | `DAILY_UPDATES` | Updated daily with operational data |

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
| `cacheflushdate` | GET | Get cache flush date | None | `VesselsCacheFlushDate` |

### Base URL
```
https://www.wsdot.wa.gov/ferries/api/vessels
```

## Usage Examples

### Basic Usage

```typescript
import { wsfVessels } from 'ws-dottie/wsf-vessels';

// Get all vessel basics
const vessels = await wsfVessels.getVesselBasics();

// Get specific vessel basics
const vessel = await wsfVessels.getVesselBasicsByVesselId({ vesselId: 1 });

// Get all vessel locations
const locations = await wsfVessels.getVesselLocations();

// Get vessel accommodations
const accommodations = await wsfVessels.getVesselAccommodations();

// Get vessel statistics
const stats = await wsfVessels.getVesselStats();
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getVesselBasics` | None | `getVesselBasics()` | Get all vessel basics |
| `getVesselBasicsByVesselId` | `{ vesselId: number }` | `getVesselBasicsByVesselId({ vesselId: 1 })` | Get specific vessel basics |
| `getVesselLocations` | None | `getVesselLocations()` | Get all vessel locations |
| `getVesselAccommodations` | None | `getVesselAccommodations()` | Get all vessel accommodations |

### Common Use Cases

```typescript
// Example 1: Display all vessels
const vessels = await wsfVessels.getVesselBasics();
vessels.forEach(vessel => {
  console.log(`${vessel.VesselName}: ${vessel.VesselAbbrev}`);
});

// Example 2: Get vessel locations
const locations = await wsfVessels.getVesselLocations();
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
import { useVesselBasics } from 'ws-dottie/react/wsf-vessels';

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
          <p>Status: {vessel.VesselStatus}</p>
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
const vessel = await wsfVessels.getVesselBasicsByVesselId({ vesselId: 1 });
const accommodations = await wsfVessels.getVesselAccommodations();
// Display detailed vessel information for travelers
```

## Performance & Caching

This API uses the **WEEKLY_UPDATES** caching strategy for static data and **MINUTE_UPDATES** for real-time data. For detailed information about caching configuration, performance optimization, and advanced caching options, see the [Performance & Caching](../API-REFERENCE.md#performance--caching) section in the API Reference.

| Caching Aspect | Configuration | Description |
|----------------|---------------|-------------|
| **Stale Time** | 7 days (static), 5 minutes (real-time) | Data considered fresh for 7 days (static) or 5 minutes (real-time) |
| **Refetch Interval** | 7 days (static), 5 minutes (real-time) | Automatically refetch data every 7 days (static) or 5 minutes (real-time) |
| **GC Time** | 14 days (static), 10 minutes (real-time) | Keep unused data in cache for 14 days (static) or 10 minutes (real-time) |
| **Retry** | 3 attempts | Retry failed requests up to 3 times |

## Common Patterns

For information about data transformation, error handling, caching strategies, and other common patterns, see the [API Reference](../API-REFERENCE.md) documentation.

## References

- **[Error Handling](../API-REFERENCE.md#error-handling)** - Comprehensive error handling patterns
- **[Data Transformation](../API-REFERENCE.md#data-transformation)** - Automatic data conversion and filtering
- **[React Hooks](../API-REFERENCE.md#react-hooks)** - Complete React integration guide
- **[Performance & Caching](../API-REFERENCE.md#performance--caching)** - Advanced caching configuration
- **[Testing Status](../API-REFERENCE.md#testing-status)** - E2E test completion and validation status
- **[API Compliance](../API-REFERENCE.md#api-compliance)** - WSF API alignment verification 