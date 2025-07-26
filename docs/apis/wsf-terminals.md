# WSF Terminals API

The WSF Terminals API provides comprehensive access to Washington State Ferries terminal information, including basic terminal data, sailing space availability, terminal locations, wait times, and detailed terminal facilities.

## Overview

This module provides access to the WSF Terminals API, which offers comprehensive information about Washington State Ferries terminals, including basic terminal data, sailing space availability, terminal locations, wait times, and detailed terminal facilities.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Terminal Information** | Access basic terminal details and contact information | ✅ Available |
| **Space Availability** | Monitor real-time parking and space availability | ✅ Available |
| **Wait Time Monitoring** | Track current wait times and congestion | ✅ Available |
| **Location Services** | Get terminal coordinates for mapping applications | ✅ Available |
| **Facility Information** | Access detailed terminal amenities and services | ✅ Available |
| **Real-time Updates** | Monitor space and wait time changes | ✅ Available |
| **Transportation Planning** | Find transit connections to terminals | ✅ Available |
| **Caching Strategy** | Coordinate data caching using cache flush dates | ✅ Available |
| **Geographic Data** | Multiple zoom levels for GIS display applications | ✅ Available |
| **Comprehensive Details** | Verbose terminal information for major terminals | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Terminal Data** | Static | `WEEKLY_UPDATES` | Updated when terminal information changes |
| **Space Availability** | Real-time | `MINUTE_UPDATES` | Updated continuously as space changes |
| **Wait Times** | Real-time | `MINUTE_UPDATES` | Updated continuously as wait times change |

## WSF Documentation

- **[WSF Terminals API Documentation](https://www.wsdot.wa.gov/ferries/api/)**
- **[WSF Terminals API Help](https://www.wsdot.wa.gov/ferries/api/terminals/)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `cacheflushdate` | GET | Cache flush date for coordinating data caching | None | `TerminalsCacheFlushDate` |
| `terminalbasics` | GET | Basic details for all terminals | None | `TerminalBasics[]` |
| `terminalbasics/{TerminalID}` | GET | Basic details for specific terminal | `TerminalID` | `TerminalBasics` |
| `terminallocations` | GET | Location details for all terminals | None | `TerminalLocation[]` |
| `terminalsailingspace` | GET | Sailing space availability for all terminals | None | `TerminalSailingSpace[]` |
| `terminalwaittimes` | GET | Wait times for all terminals | None | `TerminalWaitTimes[]` |
| `terminalverbose` | GET | Detailed terminal facilities for all terminals | None | `TerminalVerbose[]` |

### Base URL
```
https://www.wsdot.wa.gov/ferries/api/terminals
```

## Usage Examples

### Basic Usage

```typescript
import { wsfTerminals } from 'ws-dottie/wsf-terminals';

// Get all terminal basics
const terminals = await wsfTerminals.getTerminalBasics();

// Get specific terminal basics
const terminal = await wsfTerminals.getTerminalBasicsByTerminalId({ terminalId: 7 });

// Get terminal sailing space
const spaceData = await wsfTerminals.getTerminalSailingSpace();

// Get terminal wait times
const waitTimes = await wsfTerminals.getTerminalWaitTimes();

// Get detailed terminal information
const verboseTerminals = await wsfTerminals.getTerminalVerbose();
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getTerminalBasics` | None | `getTerminalBasics()` | Get basic details for all terminals |
| `getTerminalBasicsByTerminalId` | `{ terminalId: number }` | `getTerminalBasicsByTerminalId({ terminalId: 7 })` | Get basic details for specific terminal |
| `getTerminalSailingSpace` | None | `getTerminalSailingSpace()` | Get sailing space availability for all terminals |
| `getTerminalWaitTimes` | None | `getTerminalWaitTimes()` | Get wait times for all terminals |

### Common Use Cases

```typescript
// Example 1: Display all terminal information
const terminals = await wsfTerminals.getTerminalBasics();
terminals.forEach(terminal => {
  console.log(`${terminal.TerminalName}: ${terminal.TerminalAbbrev}`);
});

// Example 2: Get specific terminal details
const terminal = await wsfTerminals.getTerminalBasicsByTerminalId({ terminalId: 7 });
// Display detailed terminal information
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useTerminalBasics` | None | Get basic details for all terminals | `WEEKLY_UPDATES` |
| `useTerminalBasicsByTerminalId` | `{ terminalId: number }` | Get basic details for specific terminal | `WEEKLY_UPDATES` |
| `useTerminalSailingSpace` | None | Get sailing space availability for all terminals | `MINUTE_UPDATES` |
| `useTerminalWaitTimes` | None | Get wait times for all terminals | `MINUTE_UPDATES` |

### Basic Hook Usage

```typescript
import { useTerminalBasics } from 'ws-dottie/react/wsf-terminals';

function TerminalsList() {
  const { data, isLoading, error } = useTerminalBasics();

  if (isLoading) return <div>Loading terminals...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(terminal => (
        <div key={terminal.TerminalID}>
          <h3>{terminal.TerminalName}</h3>
          <p>Abbreviation: {terminal.TerminalAbbrev}</p>
          <p>Description: {terminal.TerminalDescription}</p>
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
| `TerminalBasics` | Basic terminal information | `TerminalID`, `TerminalName`, `TerminalAbbrev`, `TerminalDescription` |
| `TerminalLocation` | Terminal location data | `TerminalID`, `Latitude`, `Longitude`, `ZoomLevel` |
| `TerminalSailingSpace` | Sailing space availability | `TerminalID`, `SpaceAvailable`, `LastUpdated` |
| `TerminalWaitTimes` | Terminal wait times | `TerminalID`, `WaitTime`, `LastUpdated` |

### Detailed Type Definitions

```typescript
type TerminalBasics = {
  TerminalID: number;                            // Unique identifier for the terminal
  TerminalName: string;                          // Full name of the terminal
  TerminalAbbrev: string;                        // Abbreviated terminal name
  TerminalDescription: string;                   // Description of the terminal
  TerminalStatus: string;                        // Current status of the terminal
};

type TerminalLocation = {
  TerminalID: number;                            // Unique identifier for the terminal
  Latitude: number;                              // Latitude coordinate of the terminal
  Longitude: number;                             // Longitude coordinate of the terminal
  ZoomLevel: number;                             // Recommended zoom level for mapping
  TerminalName: string;                          // Name of the terminal
};

type TerminalSailingSpace = {
  TerminalID: number;                            // Unique identifier for the terminal
  SpaceAvailable: number;                        // Available sailing space
  LastUpdated: string;                           // Last update timestamp
  TerminalName: string;                          // Name of the terminal
};

type TerminalWaitTimes = {
  TerminalID: number;                            // Unique identifier for the terminal
  WaitTime: number;                              // Current wait time in minutes
  LastUpdated: string;                           // Last update timestamp
  TerminalName: string;                          // Name of the terminal
};
```

## Common Use Cases

### Use Case 1: Terminal Information Display
**Scenario**: Display comprehensive terminal information for ferry travelers
**Solution**: Use the `getTerminalBasics` function to show all terminal details and contact information

```typescript
// Implementation example
const terminals = await wsfTerminals.getTerminalBasics();
// Display terminal information for travelers
```

### Use Case 2: Real-time Space and Wait Time Monitoring
**Scenario**: Monitor real-time space availability and wait times for trip planning
**Solution**: Use the `getTerminalSailingSpace` and `getTerminalWaitTimes` functions to display current conditions

```typescript
// Implementation example
const spaceData = await wsfTerminals.getTerminalSailingSpace();
const waitTimes = await wsfTerminals.getTerminalWaitTimes();
// Display real-time space availability and wait times
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