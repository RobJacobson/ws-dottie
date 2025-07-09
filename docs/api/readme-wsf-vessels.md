# WSF Vessels API

The WSF Vessels API provides comprehensive access to Washington State Ferries vessel information, including real-time positions and vessel details.

## Overview

This module integrates with Washington State Ferries Vessels APIs to provide:
- Real-time vessel tracking and positions
- Vessel specifications, capacity, and amenities
- Cache flush date information for data freshness

## API Endpoints

### Vessels API (`/vessels`)
**Base URL**: `https://www.wsdot.wa.gov/ferries/api/vessels/rest`

#### Available Endpoints
- `/vessellocations` - Real-time vessel positions, speeds, and headings
- `/vesselverbose` - Vessel specifications, capacity, and amenities
- `/cacheflushdate` - Cache flush date information

#### Data Types
- `VesselLocation` - Current position and status
- `VesselVerbose` - Vessel details and specifications

#### Update Frequency
- **Locations**: Every 30 seconds
- **Vessel Details**: Daily (static data)

## Usage Examples

### Get All Vessel Locations
```typescript
import { getVesselLocations } from '@/api/wsf/vessels/vesselLocations';

const vessels = await getVesselLocations();
```

### Get Specific Vessel Location
```typescript
import { getVesselLocationsByVesselId } from '@/api/wsf/vessels/vesselLocations';

const vessel = await getVesselLocationsByVesselId(1); // Vessel ID
```

### Get All Vessel Verbose
```typescript
import { getVesselVerbose } from '@/api/wsf/vessels/vesselVerbose';

const vessels = await getVesselVerbose();
```

### Get Specific Vessel Verbose
```typescript
import { getVesselVerboseByVesselId } from '@/api/wsf/vessels/vesselVerbose';

const vessel = await getVesselVerboseByVesselId(1); // Vessel ID
```

## React Query Integration

### Using Hooks
```typescript
import { 
  useVesselLocations, 
  useVesselVerbose
} from '@/api/wsf/vessels';

function VesselComponent() {
  // Default: enabled is true
  const { data: locations, isLoading: locationsLoading } = useVesselLocations();
  // Override enabled: false
  const { data: verbose, isLoading: verboseLoading } = useVesselVerbose();

  if (locationsLoading || verboseLoading) {
    return <div>Loading vessel data...</div>;
  }

  return (
    <div>
      <h2>Vessel Locations</h2>
      {locations?.map(vessel => (
        <div key={vessel.vesselId}>
          {vessel.vesselName}: {vessel.latitude}, {vessel.longitude}
        </div>
      ))}
      
      <h2>Vessel Details</h2>
      {verbose?.map(vessel => (
        <div key={vessel.vesselId}>
          {vessel.vesselName} - Capacity: {vessel.capacity}
        </div>
      ))}
    </div>
  );
}
```

### Overriding Default Options
All hooks use default caching options with `enabled: true`. You can override `enabled` or any other React Query option by passing an options object as the second argument to the hook:

```typescript
const { data } = useVesselLocations(undefined, { enabled: false }); // disables the query
```

### Using Specific Vessel Hooks
```typescript
import { 
  useVesselLocationsByVesselId,
  useVesselVerboseByVesselId
} from '@/api/wsf/vessels';

function SingleVesselComponent({ vesselId }: { vesselId: number }) {
  const { data: location } = useVesselLocationsByVesselId(vesselId);
  const { data: verbose } = useVesselVerboseByVesselId(vesselId);

  return (
    <div>
      <h2>{verbose?.[0]?.vesselName}</h2>
      <p>Position: {location?.[0]?.latitude}, {location?.[0]?.longitude}</p>
      <p>Capacity: {verbose?.[0]?.capacity}</p>
    </div>
  );
}

## Data Transformation

The API automatically transforms WSF date formats to JavaScript Date objects:

- **`/Date(timestamp)/`** → `Date` object
- **`YYYY-MM-DD`** → `Date` object
- **`MM/DD/YYYY`** → `Date` object

All PascalCase keys are converted to camelCase for consistency.

## Error Handling

All API functions return empty arrays (`[]`) on errors rather than throwing exceptions, making them perfect for use with React Query and other state management solutions.

## Caching Strategy

The hooks use default caching options from `createInfrequentUpdateOptions()` and `createFrequentUpdateOptions()`. You do not need to set `enabled`, `refetchInterval`, or `staleTime` manually—these are handled automatically. You can override any option by passing an options object to the hook. 