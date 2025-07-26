# WSF Fares API

The WSF Fares API provides comprehensive access to Washington State Ferries fare information, including fare line items, terminal combinations, fare calculations, and cache management.

## Overview

This module provides access to the WSF Fares API, which offers comprehensive fare information for Washington State Ferries, including fare line items, terminal combinations, fare calculations, and cache management for data freshness.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Fare Calculation** | Calculate costs for specific routes and passenger types | ✅ Available |
| **Trip Planning** | Get fare information for route planning | ✅ Available |
| **Ticket Pricing** | Display current fares for ticket sales | ✅ Available |
| **Route Analysis** | Compare fares between different routes | ✅ Available |
| **Terminal Discovery** | Find available terminals and connections | ✅ Available |
| **Cache Management** | Track data freshness with cache flush dates | ✅ Available |
| **Date Validation** | Ensure fare queries use valid dates | ✅ Available |
| **Multiple Formats** | Basic, verbose, and detailed fare information | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Fare Data** | As needed | `WEEKLY_UPDATES` | Updated when fare changes occur |
| **Terminal Data** | Static | `WEEKLY_UPDATES` | Infrastructure data |
| **Cache Information** | Real-time | `MINUTE_UPDATES` | Cache flush date tracking |

## WSF Documentation

- **[WSF Fares API Documentation](https://www.wsdot.wa.gov/ferries/api/)**
- **[WSF Fares API Help](https://www.wsdot.wa.gov/ferries/api/fares/)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `cacheflushdate` | GET | API cache flush date | None | `Date` |
| `validdaterange` | GET | Valid date range for fare queries | None | `ValidDateRange` |
| `terminals/{TripDate}` | GET | All terminals available for a date | `TripDate` | `Terminal[]` |
| `terminalmates/{TripDate}/{TerminalID}` | GET | Terminals that connect to a specific terminal | `TripDate`, `TerminalID` | `TerminalMate[]` |
| `terminalcombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}` | GET | Terminal combination details | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID` | `TerminalCombo[]` |
| `farelineitems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}` | GET | All fares for a route | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID`, `RoundTrip` | `FareLineItem[]` |
| `faretotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}` | GET | Fare total calculations | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID`, `RoundTrip`, `FareLineItemID`, `Quantity` | `FareTotal[]` |

### Base URL
```
https://www.wsdot.wa.gov/ferries/api/fares
```

## Usage Examples

### Basic Usage

```typescript
import { wsfFares } from 'ws-dottie/wsf-fares';

// Get cache flush date
const cacheFlushDate = await wsfFares.getCacheFlushDate();

// Get valid date range
const validDateRange = await wsfFares.getValidDateRange();

// Get terminals for a trip date
const terminals = await wsfFares.getTerminals({ tripDate: "2024-04-01" });

// Get fare line items for a route
const fareLineItems = await wsfFares.getFareLineItems({ 
  tripDate: "2024-04-01", 
  departingTerminalId: 7, 
  arrivingTerminalId: 8, 
  roundTrip: false 
});
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getCacheFlushDate` | None | `getCacheFlushDate()` | Get API cache flush date |
| `getValidDateRange` | None | `getValidDateRange()` | Get valid date range for fare queries |
| `getTerminals` | `{ tripDate: string }` | `getTerminals({ tripDate: "2024-04-01" })` | Get all terminals for a trip date |
| `getFareLineItems` | `{ tripDate: string, departingTerminalId: number, arrivingTerminalId: number, roundTrip: boolean }` | `getFareLineItems({ tripDate: "2024-04-01", departingTerminalId: 7, arrivingTerminalId: 8, roundTrip: false })` | Get all fares for a route |

### Common Use Cases

```typescript
// Example 1: Get fare information for a route
const fareLineItems = await wsfFares.getFareLineItems({ 
  tripDate: "2024-04-01", 
  departingTerminalId: 7, 
  arrivingTerminalId: 8, 
  roundTrip: false 
});
fareLineItems.forEach(fare => {
  console.log(`${fare.Description}: $${fare.Price}`);
});

// Example 2: Calculate fare total
const fareTotal = await wsfFares.getFareTotal({ 
  tripDate: "2024-04-01", 
  departingTerminalId: 7, 
  arrivingTerminalId: 8, 
  roundTrip: false, 
  fareLineItemId: 1, 
  quantity: 2 
});
// Display calculated fare total
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useCacheFlushDate` | None | Get API cache flush date | `MINUTE_UPDATES` |
| `useValidDateRange` | None | Get valid date range for fare queries | `WEEKLY_UPDATES` |
| `useTerminals` | `{ tripDate: string }` | Get all terminals for a trip date | `WEEKLY_UPDATES` |
| `useFareLineItems` | `{ tripDate: string, departingTerminalId: number, arrivingTerminalId: number, roundTrip: boolean }` | Get all fares for a route | `WEEKLY_UPDATES` |

### Basic Hook Usage

```typescript
import { useFareLineItems } from 'ws-dottie/react/wsf-fares';

function FareLineItemsList() {
  const { data, isLoading, error } = useFareLineItems({ 
    tripDate: "2024-04-01", 
    departingTerminalId: 7, 
    arrivingTerminalId: 8, 
    roundTrip: false 
  });

  if (isLoading) return <div>Loading fare information...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(fare => (
        <div key={fare.FareLineItemID}>
          <h3>{fare.Description}</h3>
          <p>Price: ${fare.Price}</p>
          <p>Category: {fare.Category}</p>
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
| `ValidDateRange` | Valid date range for fare queries | `StartDate`, `EndDate` |
| `Terminal` | Terminal information | `TerminalID`, `TerminalName`, `TerminalAbbrev` |
| `FareLineItem` | Fare line item information | `FareLineItemID`, `Description`, `Price`, `Category` |
| `FareTotal` | Fare total calculation | `TotalPrice`, `Breakdown` |

### Detailed Type Definitions

```typescript
type ValidDateRange = {
  StartDate: string;                             // Start date for valid fare queries
  EndDate: string;                               // End date for valid fare queries
};

type Terminal = {
  TerminalID: number;                            // Unique identifier for the terminal
  TerminalName: string;                          // Full name of the terminal
  TerminalAbbrev: string;                        // Abbreviated terminal name
  TerminalDescription: string;                   // Description of the terminal
};

type FareLineItem = {
  FareLineItemID: number;                        // Unique identifier for the fare line item
  Description: string;                           // Description of the fare
  Price: number;                                 // Price in dollars
  Category: string;                              // Category of the fare (e.g., "Passenger", "Vehicle")
  RoundTrip: boolean;                            // Whether this is a round trip fare
};

type FareTotal = {
  TotalPrice: number;                            // Total calculated price
  Breakdown: FareLineItem[];                     // Breakdown of fare components
};
```

## Common Use Cases

### Use Case 1: Fare Planning and Calculation
**Scenario**: Help users plan ferry trips by calculating fares for different routes and passenger types
**Solution**: Use the `getFareLineItems` and `getFareTotal` functions to provide comprehensive fare information

```typescript
// Implementation example
const fareLineItems = await wsfFares.getFareLineItems({ 
  tripDate: "2024-04-01", 
  departingTerminalId: 7, 
  arrivingTerminalId: 8, 
  roundTrip: false 
});
// Display fare options for trip planning
```

### Use Case 2: Terminal and Route Discovery
**Scenario**: Help users discover available terminals and routes for ferry travel
**Solution**: Use the `getTerminals` and `getTerminalMates` functions to show available connections

```typescript
// Implementation example
const terminals = await wsfFares.getTerminals({ tripDate: "2024-04-01" });
// Display available terminals for trip planning
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
- **[API Compliance](../API-REFERENCE.md#api-compliance)** - WSF API alignment verification 