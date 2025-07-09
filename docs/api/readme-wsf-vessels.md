# WSF Vessels API

The WSF Vessels API provides comprehensive access to Washington State Ferries vessel information, including real-time positions, vessel details, and operational status.

## Overview

This module integrates with Washington State Ferries Vessels APIs to provide:
- Real-time vessel tracking and positions
- Vessel specifications, capacity, and amenities
- Vessel watch data with operational status
- Cache flush date information for data freshness

## API Endpoints

### Vessels API (`/vessels`)
**Base URL**: `https://www.wsdot.wa.gov/ferries/api/vessels/rest`

#### Available Endpoints
- `/vessellocations` - Real-time vessel positions, speeds, and headings
- `/vesselverbose` - Vessel specifications, capacity, and amenities
- `/vesselwatch` - Real-time vessel operational status
- `/vesselwatchverbose` - Detailed real-time vessel status
- `/cacheflushdate` - Cache flush date information

#### Data Types
- `VesselLocation` - Current position and status
- `VesselVerbose` - Vessel details and specifications
- `VesselWatch` - Real-time operational status
- `VesselWatchVerbose` - Detailed real-time status

#### Update Frequency
- **Locations**: Every 30 seconds
- **Vessel Details**: Daily (static data)
- **Watch Data**: Every 30 seconds

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

### Get All Vessel Watch
```typescript
import { getVesselWatch } from '@/api/wsf/vessels/vesselWatch';

const vessels = await getVesselWatch();
```

### Get Vessel Watch by Various Parameters
```typescript
import { 
  getVesselWatchByVesselId,
  getVesselWatchByRoute,
  getVesselWatchByTerminal,
  getVesselWatchByRouteAndTerminal,
  getVesselWatchByRouteTerminalDirection,
  getVesselWatchByDate,
  getVesselWatchByRouteAndDate,
  getVesselWatchByDateTime,
  getVesselWatchByRouteTerminalDirectionDateTimeVessel
} from '@/api/wsf/vessels/vesselWatch';

// By vessel ID
const vessel = await getVesselWatchByVesselId(1);

// By route
const vessels = await getVesselWatchByRoute(1);

// By terminal
const vessels = await getVesselWatchByTerminal(7);

// By route and terminal
const vessels = await getVesselWatchByRouteAndTerminal({
  routeId: 1,
  terminalId: 7
});

// By route, terminal, and direction
const vessels = await getVesselWatchByRouteTerminalDirection({
  routeId: 1,
  terminalId: 7,
  direction: 1
});

// By date
const vessels = await getVesselWatchByDate(new Date('2024-04-01'));

// By route and date
const vessels = await getVesselWatchByRouteAndDate({
  routeId: 1,
  date: new Date('2024-04-01')
});

// By date and time
const vessels = await getVesselWatchByDateTime({
  date: new Date('2024-04-01'),
  time: '14:30'
});

// By route, terminal, direction, date, time, and vessel
const vessels = await getVesselWatchByRouteTerminalDirectionDateTimeVessel({
  routeId: 1,
  terminalId: 7,
  direction: 1,
  date: new Date('2024-04-01'),
  time: '14:30',
  vesselId: 1
});
```

### Get All Vessel Watch Verbose
```typescript
import { getVesselWatchVerbose } from '@/api/wsf/vessels/vesselWatchVerbose';

const vessels = await getVesselWatchVerbose();
```

### Get Vessel Watch Verbose by Various Parameters
```typescript
import { 
  getVesselWatchVerboseByVesselId,
  getVesselWatchVerboseByRoute,
  getVesselWatchVerboseByTerminal,
  getVesselWatchVerboseByRouteAndTerminal,
  getVesselWatchVerboseByRouteTerminalDirection,
  getVesselWatchVerboseByDate,
  getVesselWatchVerboseByRouteAndDate,
  getVesselWatchVerboseByDateTime,
  getVesselWatchVerboseByRouteTerminalDirectionDateTimeVessel
} from '@/api/wsf/vessels/vesselWatchVerbose';

// Similar parameter combinations as Vessel Watch
const vessels = await getVesselWatchVerboseByVesselId(1);
const vessels = await getVesselWatchVerboseByRoute(1);
// ... and many more combinations
```

## React Query Integration

### Using Hooks
```typescript
import { 
  useVesselLocations, 
  useVesselVerbose, 
  useVesselWatch,
  useVesselWatchVerbose 
} from '@/api/wsf/vessels';

function VesselComponent() {
  // Default: enabled is true
  const { data: locations, isLoading: locationsLoading } = useVesselLocations();
  // Override enabled: false
  const { data: verbose } = useVesselVerbose(undefined, { enabled: false });
  const { data: watch, isLoading: watchLoading } = useVesselWatch();
  const { data: watchVerbose, isLoading: watchVerboseLoading } = useVesselWatchVerbose();

  if (locationsLoading || verboseLoading || watchLoading || watchVerboseLoading) {
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
      
      <h2>Vessel Watch</h2>
      {watch?.map(vessel => (
        <div key={vessel.vesselId}>
          {vessel.vesselName} - Status: {vessel.status}
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
  useVesselVerboseByVesselId,
  useVesselWatchByVesselId,
  useVesselWatchVerboseByVesselId
} from '@/api/wsf/vessels';

function SingleVesselComponent({ vesselId }: { vesselId: number }) {
  const { data: location } = useVesselLocationsByVesselId(vesselId);
  const { data: verbose } = useVesselVerboseByVesselId(vesselId);
  const { data: watch } = useVesselWatchByVesselId(vesselId);
  const { data: watchVerbose } = useVesselWatchVerboseByVesselId(vesselId);

  return (
    <div>
      <h2>{verbose?.[0]?.vesselName}</h2>
      <p>Position: {location?.[0]?.latitude}, {location?.[0]?.longitude}</p>
      <p>Status: {watch?.[0]?.status}</p>
      <p>Capacity: {verbose?.[0]?.capacity}</p>
    </div>
  );
}
```

## Data Transformation

The API automatically transforms WSF date formats to JavaScript Date objects:

- **`/Date(timestamp)/`** → `Date` object
- **`YYYY-MM-DD`** → `Date` object
- **`MM/DD/YYYY`** → `Date` object

All PascalCase keys are converted to camelCase for consistency.

## Error Handling

All API functions return empty arrays (`[]`) on errors rather than throwing exceptions, making them perfect for use with React Query and other state management solutions.

## Caching Strategy

The hooks use default caching options from `createInfrequentUpdateOptions()` and `createFrequentUpdateOptions()`, with `enabled: true` by default. You do not need to set `enabled`, `refetchInterval`, or `staleTime` manually—these are handled automatically. You can override any option by passing an options object to the hook. 