# WSDOT Commercial Vehicle Restrictions API

The WSDOT Commercial Vehicle Restrictions API provides information about commercial vehicle restrictions, weight limits, bridge restrictions, and other limitations for commercial vehicles on Washington State highways.

## Overview

This module integrates with WSDOT Commercial Vehicle Restrictions API to provide:
- Commercial vehicle restriction data including weight limits and bridge restrictions
- Geographic location information for restrictions
- Date ranges for restriction effectiveness
- Vehicle type and restriction type classifications
- Unique identifiers for tracking restrictions
- Detailed roadway location information

## WSDOT Documentation
- [WSDOT Commercial Vehicle Restrictions API Documentation](https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html)
- [WSDOT Commercial Vehicle Restrictions API Help](https://wsdot.wa.gov/traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help)

## API Endpoints

### Commercial Vehicle Restrictions API (`/CVRestrictions/CVRestrictionsREST.svc`)

#### GetCommercialVehicleRestrictionsAsJson
- **Endpoint**: `/GetCommercialVehicleRestrictionsAsJson`
- **Method**: GET
- **Parameters**: None
- **Description**: Returns all commercial vehicle restrictions without unique identifiers
- **Response**: Array of `CommercialVehicleRestriction` objects

#### GetCommercialVehicleRestrictionsWithIdAsJson
- **Endpoint**: `/GetCommercialVehicleRestrictionsWithIdAsJson`
- **Method**: GET
- **Parameters**: None
- **Description**: Returns all commercial vehicle restrictions with unique identifiers
- **Response**: Array of `CommercialVehicleRestrictionWithId` objects

## Data Types

### RoadwayLocation
Represents a roadway location with geographic and descriptive information.

```typescript
type RoadwayLocation = {
  Description: string | null;
  Direction: string | null;
  Latitude: number;
  Longitude: number;
  MilePost: number;
  RoadName: string;
};
```

### CommercialVehicleRestriction
Represents a commercial vehicle restriction with all associated data.

```typescript
type CommercialVehicleRestriction = {
  BLMaxAxle: number | null; // B-Load maximum axle weight
  BridgeName: string;
  BridgeNumber: string;
  CL8MaxAxle: number | null; // CL8 maximum axle weight
  DateEffective: Date; // Converted from WSDOT date format
  DateExpires: Date; // Converted from WSDOT date format
  DatePosted: Date; // Converted from WSDOT date format
  EndRoadwayLocation: RoadwayLocation;
  IsDetourAvailable: boolean;
  IsExceptionsAllowed: boolean;
  IsPermanentRestriction: boolean;
  IsWarning: boolean;
  Latitude: number;
  LocationDescription: string;
  LocationName: string;
  Longitude: number;
  MaximumGrossVehicleWeightInPounds: number | null;
  RestrictionComment: string;
  RestrictionHeightInInches: number | null;
  RestrictionLengthInInches: number | null;
  RestrictionType: number;
  RestrictionWeightInPounds: number | null;
  RestrictionWidthInInches: number | null;
  SAMaxAxle: number | null; // SA maximum axle weight
  StartRoadwayLocation: RoadwayLocation;
  State: string;
  StateRouteID: string;
  TDMaxAxle: number | null; // TD maximum axle weight
  VehicleType: string;
};
```

### CommercialVehicleRestrictionWithId
Extends `CommercialVehicleRestriction` with a unique identifier.

```typescript
type CommercialVehicleRestrictionWithId = CommercialVehicleRestriction & {
  UniqueID: string;
};
```

### Response Types
```typescript
type CommercialVehicleRestrictionsResponse = CommercialVehicleRestriction[];
type CommercialVehicleRestrictionsWithIdResponse = CommercialVehicleRestrictionWithId[];
```

## Usage

### Basic Usage

```typescript
import { getCommercialVehicleRestrictions } from '@/api/wsdot-commercial-vehicle-restrictions';

// Get all commercial vehicle restrictions
const restrictions = await getCommercialVehicleRestrictions();
console.log(`Found ${restrictions.length} restrictions`);
```

### React Query Hook

```typescript
import { useCommercialVehicleRestrictions } from '@/api/wsdot-commercial-vehicle-restrictions';

function CommercialVehicleRestrictionsComponent() {
  const { data: restrictions, isLoading, error } = useCommercialVehicleRestrictions();

  if (isLoading) return <div>Loading restrictions...</div>;
  if (error) return <div>Error loading restrictions</div>;

  return (
    <div>
      <h2>Commercial Vehicle Restrictions</h2>
      {restrictions?.map(restriction => (
        <div key={`${restriction.BridgeNumber}-${restriction.RestrictionType}`}>
          <h3>{restriction.BridgeName}</h3>
          <p>Route: {restriction.StateRouteID}</p>
          <p>Vehicle Type: {restriction.VehicleType}</p>
          <p>Effective: {restriction.DateEffective.toLocaleDateString()}</p>
          <p>Expires: {restriction.DateExpires.toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
```

### With Unique IDs

```typescript
import { useCommercialVehicleRestrictionsWithId } from '@/api/wsdot-commercial-vehicle-restrictions';

function CommercialVehicleRestrictionsWithIdComponent() {
  const { data: restrictions } = useCommercialVehicleRestrictionsWithId();

  return (
    <div>
      {restrictions?.map(restriction => (
        <div key={restriction.UniqueID}>
          <h3>{restriction.BridgeName}</h3>
          <p>ID: {restriction.UniqueID}</p>
          <p>Restriction: {restriction.RestrictionComment}</p>
        </div>
      ))}
    </div>
  );
}
```

## Error Handling

The API functions throw `WsdotApiError` instances when requests fail:

```typescript
import { getCommercialVehicleRestrictions } from '@/api/wsdot-commercial-vehicle-restrictions';
import { WsdotApiError } from '@/shared/fetching/errors';

try {
  const restrictions = await getCommercialVehicleRestrictions();
} catch (error) {
  if (error instanceof WsdotApiError) {
    console.error('WSDOT API Error:', error.message);
    console.error('Status:', error.status);
    console.error('Endpoint:', error.endpoint);
  }
}
```

## Caching

The React Query hooks use infrequent update options since commercial vehicle restriction data is relatively static and doesn't change frequently.

## Performance

- **Target Response Time**: < 2 seconds
- **Caching Strategy**: Infrequent updates (data is relatively static)
- **Rate Limiting**: Respects WSDOT API rate limits

## Examples

### Filtering by Vehicle Type

```typescript
const { data: restrictions } = useCommercialVehicleRestrictions();

const truckRestrictions = restrictions?.filter(
  r => r.VehicleType.toLowerCase().includes('truck')
) || [];
```

### Finding Active Restrictions

```typescript
const { data: restrictions } = useCommercialVehicleRestrictions();

const now = new Date();
const activeRestrictions = restrictions?.filter(
  r => r.DateEffective <= now && r.DateExpires >= now
) || [];
```

### Weight Limit Analysis

```typescript
const { data: restrictions } = useCommercialVehicleRestrictions();

const weightRestrictions = restrictions?.filter(
  r => r.RestrictionWeightInPounds !== null
) || [];

const maxWeightRestriction = weightRestrictions.reduce(
  (max, r) => Math.max(max, r.RestrictionWeightInPounds!),
  0
);
```

## Related APIs

- [WSDOT Bridge Clearances API](./readme-wsdot-bridge-clearances.md) - Bridge clearance information
- [WSDOT Highway Alerts API](./readme-wsdot-highway-alerts.md) - Highway alerts and incidents
- [WSDOT Traffic Flow API](./readme-wsdot-traffic-flow.md) - Traffic flow data

## Notes

- All date fields are converted from WSDOT's `/Date(timestamp)/` format to JavaScript `Date` objects
- Geographic coordinates are in decimal degrees (WGS84)
- Weight measurements are in pounds
- Dimension measurements are in inches
- Milepost values represent the State Route Mile Post (SRMP)
- The API provides both regular and "WithId" endpoints for different use cases 