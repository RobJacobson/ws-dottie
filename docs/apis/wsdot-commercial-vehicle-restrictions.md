# WSDOT Commercial Vehicle Restrictions API

The WSDOT Commercial Vehicle Restrictions API provides information about commercial vehicle restrictions, weight limits, bridge restrictions, and other limitations for commercial vehicles on Washington State highways.

## Overview

This module provides access to the WSDOT Commercial Vehicle Restrictions API, which offers commercial vehicle restriction data including weight limits, bridge restrictions, geographic location information, and date ranges for restriction effectiveness.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Weight Restrictions** | Maximum weight limits for different vehicle types | ✅ Available |
| **Bridge Restrictions** | Bridge-specific weight and size limitations | ✅ Available |
| **Location Data** | Geographic coordinates and milepost information | ✅ Available |
| **Date Ranges** | Effective and expiration dates for restrictions | ✅ Available |
| **Vehicle Types** | Specific vehicle type classifications | ✅ Available |
| **Unique Identifiers** | Tracking IDs for restriction management | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Restrictions** | Real-time | `MINUTE_UPDATES` | Updated as new limitations are implemented |
| **Construction** | As needed | `HOURLY_UPDATES` | During road construction and maintenance |
| **Bridge Work** | As needed | `HOURLY_UPDATES` | When bridge restrictions change |

## WSDOT Documentation

- **[WSDOT Commercial Vehicle Restrictions API Documentation](https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html)**
- **[WSDOT Commercial Vehicle Restrictions API Help](https://wsdot.wa.gov/traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `GetCommercialVehicleRestrictionsAsJson` | GET | Get all commercial vehicle restrictions | `AccessCode` | `CommercialVehicleRestriction[]` |
| `GetCommercialVehicleRestrictionsWithIdAsJson` | GET | Get restrictions with unique IDs | `AccessCode` | `CommercialVehicleRestrictionWithId[]` |

### Base URL
```
https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc
```

## Usage Examples

### Basic Usage

```typescript
import { wsdotCommercialVehicleRestrictions } from 'ws-dottie/wsdot-commercial-vehicle-restrictions';

// Get all commercial vehicle restrictions
const restrictions = await wsdotCommercialVehicleRestrictions.getCommercialVehicleRestrictions();

// Get restrictions with unique IDs
const restrictionsWithIds = await wsdotCommercialVehicleRestrictions.getCommercialVehicleRestrictionsWithId();
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getCommercialVehicleRestrictions` | None | `getCommercialVehicleRestrictions()` | Get all commercial vehicle restrictions |
| `getCommercialVehicleRestrictionsWithId` | None | `getCommercialVehicleRestrictionsWithId()` | Get restrictions with unique IDs |

### Common Use Cases

```typescript
// Example 1: Display all commercial vehicle restrictions
const restrictions = await wsdotCommercialVehicleRestrictions.getCommercialVehicleRestrictions();
restrictions.forEach(restriction => {
  console.log(`${restriction.RestrictionType}: ${restriction.Description}`);
});

// Example 2: Get restrictions with tracking IDs
const restrictionsWithIds = await wsdotCommercialVehicleRestrictions.getCommercialVehicleRestrictionsWithId();
// Process restrictions with unique identifiers for tracking
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useCommercialVehicleRestrictions` | None | Get all commercial vehicle restrictions | `MINUTE_UPDATES` |
| `useCommercialVehicleRestrictionsWithId` | None | Get restrictions with unique IDs | `MINUTE_UPDATES` |

### Basic Hook Usage

```typescript
import { useCommercialVehicleRestrictions } from 'ws-dottie/react/wsdot-commercial-vehicle-restrictions';

function CommercialVehicleRestrictionsList() {
  const { data, isLoading, error } = useCommercialVehicleRestrictions();

  if (isLoading) return <div>Loading restrictions...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(restriction => (
        <div key={restriction.RestrictionType}>
          <h3>{restriction.RestrictionType}</h3>
          <p>Description: {restriction.Description}</p>
          <p>Location: {restriction.Location}</p>
          <p>Effective Date: {restriction.EffectiveDate}</p>
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
| `CommercialVehicleRestriction` | Commercial vehicle restriction data | `RestrictionType`, `Description`, `Location`, `EffectiveDate`, `ExpirationDate` |
| `CommercialVehicleRestrictionWithId` | Restriction data with unique identifiers | `Id`, `RestrictionType`, `Description`, `Location`, `EffectiveDate`, `ExpirationDate` |

### Detailed Type Definitions

```typescript
type CommercialVehicleRestriction = {
  RestrictionType: string;                         // Type of restriction (e.g., "Weight Limit", "Bridge Restriction")
  Description: string;                             // Detailed description of the restriction
  Location: string;                                // Location where the restriction applies
  EffectiveDate: string;                           // Date when the restriction becomes effective
  ExpirationDate: string;                          // Date when the restriction expires
  VehicleType: string;                             // Type of vehicle affected by the restriction
  WeightLimit?: number;                            // Weight limit in pounds (if applicable)
  BridgeName?: string;                             // Name of the bridge (if bridge restriction)
  MilePost?: number;                               // Milepost location of the restriction
};

type CommercialVehicleRestrictionWithId = {
  Id: string;                                      // Unique identifier for the restriction
  RestrictionType: string;                         // Type of restriction
  Description: string;                             // Detailed description of the restriction
  Location: string;                                // Location where the restriction applies
  EffectiveDate: string;                           // Date when the restriction becomes effective
  ExpirationDate: string;                          // Date when the restriction expires
  VehicleType: string;                             // Type of vehicle affected by the restriction
  WeightLimit?: number;                            // Weight limit in pounds (if applicable)
  BridgeName?: string;                             // Name of the bridge (if bridge restriction)
  MilePost?: number;                               // Milepost location of the restriction
};
```

## Common Use Cases

### Use Case 1: Commercial Vehicle Route Planning
**Scenario**: Plan routes for commercial vehicles while avoiding weight and bridge restrictions
**Solution**: Use the `getCommercialVehicleRestrictions` function to identify restrictions along planned routes

```typescript
// Implementation example
const restrictions = await wsdotCommercialVehicleRestrictions.getCommercialVehicleRestrictions();
// Filter restrictions by route and vehicle type for route planning
```

### Use Case 2: Restriction Monitoring and Tracking
**Scenario**: Monitor and track commercial vehicle restrictions with unique identifiers
**Solution**: Use the `getCommercialVehicleRestrictionsWithId` function for restriction management

```typescript
// Implementation example
const restrictionsWithIds = await wsdotCommercialVehicleRestrictions.getCommercialVehicleRestrictionsWithId();
// Track restrictions by unique ID for monitoring and management
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