# WSF Vessels API

The WSF Vessels API provides comprehensive access to Washington State Ferries vessel information, including vessel details, real-time locations, accommodations, statistics, and historical data.

## Overview

This module integrates with Washington State Ferries Vessels APIs to provide:
- Basic vessel information and status
- Real-time vessel locations and tracking
- Detailed vessel specifications and capabilities
- Vessel accommodations and amenities
- Vessel statistics and performance data
- Historical vessel data and records
- Cache flush date information for data freshness

## WSDOT Documentation
- [WSF Vessels API Documentation](https://www.wsdot.wa.gov/ferries/api/vessels/documentation/rest.html)
- [WSF Vessels API Help](https://www.wsdot.wa.gov/ferries/api/vessels/rest/help)

## API Endpoints

### Vessels API (`/vessels`)
**Base URL**: `https://www.wsdot.wa.gov/ferries/api/vessels/rest`

#### Available Endpoints
- `/vesselbasics` - Basic vessel information and status
- `/vesselbasics/{VesselID}` - Specific vessel basics by ID
- `/vessellocations` - Real-time vessel locations and tracking
- `/vessellocations/{VesselID}` - Specific vessel location by ID
- `/vesselverbose` - Detailed vessel specifications and capabilities
- `/vesselverbose/{VesselID}` - Specific vessel verbose by ID
- `/vesselaccommodations` - Vessel accommodations and amenities
- `/vesselaccommodations/{VesselID}` - Specific vessel accommodations by ID
- `/vesselstats` - Vessel statistics and performance data
- `/vesselstats/{VesselID}` - Specific vessel statistics by ID
- `/vesselhistory` - Historical vessel data and records
- `/vesselhistory/{VesselName}/{StartDate}/{EndDate}` - Vessel history by name and date range
- `/cacheflushdate` - Cache flush date information

#### Data Types
- `VesselBasics` - Basic vessel information and status
- `VesselLocation` - Real-time vessel location and tracking data
- `VesselVerbose` - Detailed vessel specifications and capabilities
- `VesselAccommodation` - Vessel accommodations and amenities
- `VesselStats` - Vessel statistics and performance data
- `VesselHistory` - Historical vessel data and records

#### Update Frequency
- **Vessel Basics**: Daily
- **Vessel Locations**: Real-time (5-second updates)
- **Vessel Verbose**: Weekly (static data)
- **Accommodations**: Weekly (static data)
- **Statistics**: Daily
- **History**: Updated as new records are added

## Usage Examples

### Get All Vessel Basics
```typescript
import { getVesselBasics } from 'ws-dottie/wsf-vessels';

const vessels = await getVesselBasics();
```

### Get Specific Vessel Basics
```typescript
import { getVesselBasicsById } from 'ws-dottie/wsf-vessels';

const vessel = await getVesselBasicsById(1); // Vessel ID
```

### Get All Vessel Locations
```typescript
import { getVesselLocations } from 'ws-dottie/wsf-vessels';

const vessels = await getVesselLocations();
```

### Get Specific Vessel Location
```typescript
import { getVesselLocationsByVesselId } from 'ws-dottie/wsf-vessels';

const vessel = await getVesselLocationsByVesselId(1); // Vessel ID
```

### Get All Vessel Verbose
```typescript
import { getVesselVerbose } from 'ws-dottie/wsf-vessels';

const vessels = await getVesselVerbose();
```

### Get Specific Vessel Verbose
```typescript
import { getVesselVerboseById } from 'ws-dottie/wsf-vessels';

const vessel = await getVesselVerboseById(1); // Vessel ID
```

### Get All Vessel Accommodations
```typescript
import { getVesselAccommodations } from 'ws-dottie/wsf-vessels';

const accommodations = await getVesselAccommodations();
```

### Get Specific Vessel Accommodations
```typescript
import { getVesselAccommodationsById } from 'ws-dottie/wsf-vessels';

const accommodation = await getVesselAccommodationsById(1); // Vessel ID
```

### Get All Vessel Statistics
```typescript
import { getVesselStats } from 'ws-dottie/wsf-vessels';

const stats = await getVesselStats();
```

### Get Specific Vessel Statistics
```typescript
import { getVesselStatsById } from 'ws-dottie/wsf-vessels';

const stats = await getVesselStatsById(1); // Vessel ID
```

### Get All Vessel History
```typescript
import { getVesselHistory } from 'ws-dottie/wsf-vessels';

const history = await getVesselHistory();
```

### Get Vessel History by Name and Date Range
```typescript
import { getVesselHistoryByVesselAndDateRange } from 'ws-dottie/wsf-vessels';

const history = await getVesselHistoryByVesselAndDateRange(
  "Cathlamet",
  "2024-01-01",
  "2024-01-31"
);
```

## React Query Integration

### Using Hooks
```typescript
import { 
  useVesselBasics,
  useVesselLocations, 
  useVesselVerbose,
  useVesselAccommodations,
  useVesselStats,
  useVesselHistory
} from 'ws-dottie/react/wsf-vessels';

function VesselComponent() {
  // Default: enabled is true
  const { data: basics, isLoading: basicsLoading } = useVesselBasics();
  const { data: locations, isLoading: locationsLoading } = useVesselLocations();
  const { data: verbose, isLoading: verboseLoading } = useVesselVerbose();
  const { data: accommodations, isLoading: accommodationsLoading } = useVesselAccommodations();
  const { data: stats, isLoading: statsLoading } = useVesselStats();
  const { data: history, isLoading: historyLoading } = useVesselHistory();

  if (basicsLoading || locationsLoading || verboseLoading || accommodationsLoading || statsLoading || historyLoading) {
    return <div>Loading vessel data...</div>;
  }

  return (
    <div>
      <h2>Vessel Basics</h2>
      {basics?.map(vessel => (
        <div key={vessel.VesselID}>
          {vessel.VesselName}: {vessel.VesselAbbrev}
        </div>
      ))}
      
      <h2>Vessel Locations</h2>
      {locations?.map(vessel => (
        <div key={vessel.VesselID}>
          {vessel.VesselName}: {vessel.Latitude}, {vessel.Longitude}
        </div>
      ))}
      
      <h2>Vessel Details</h2>
      {verbose?.map(vessel => (
        <div key={vessel.VesselID}>
          {vessel.VesselName} - Capacity: {vessel.MaxPassengerCount}
        </div>
      ))}

      <h2>Vessel Accommodations</h2>
      {accommodations?.map(vessel => (
        <div key={vessel.VesselID}>
          {vessel.VesselName} - WiFi: {vessel.PublicWifi ? 'Yes' : 'No'}
        </div>
      ))}

      <h2>Vessel Statistics</h2>
      {stats?.map(stat => (
        <div key={stat.StatID}>
          {stat.StatName}: {stat.StatValue} {stat.StatUnit}
        </div>
      ))}

      <h2>Vessel History</h2>
      {history?.map(record => (
        <div key={record.Date}>
          {record.Vessel}: {record.Departing} → {record.Arriving}
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
  useVesselBasicsById,
  useVesselLocationsByVesselId,
  useVesselVerboseById,
  useVesselAccommodationsById,
  useVesselStatsById
} from 'ws-dottie/react/wsf-vessels';

function SingleVesselComponent({ vesselId }: { vesselId: number }) {
  const { data: basic } = useVesselBasicsById(vesselId);
  const { data: location } = useVesselLocationsByVesselId(vesselId);
  const { data: verbose } = useVesselVerboseById(vesselId);
  const { data: accommodation } = useVesselAccommodationsById(vesselId);
  const { data: stats } = useVesselStatsById(vesselId);

  return (
    <div>
      <h2>{basic?.VesselName}</h2>
      <p>Position: {location?.Latitude}, {location?.Longitude}</p>
      <p>Capacity: {verbose?.MaxPassengerCount}</p>
      <p>WiFi Available: {accommodation?.PublicWifi ? 'Yes' : 'No'}</p>
      <p>Status: {basic?.Status}</p>
    </div>
  );
}
```

## Data Transformation

The API automatically transforms WSF date formats to JavaScript Date objects:

- **`/Date(timestamp)/`** → `Date` object
- **`YYYY-MM-DD`** → `Date` object
- **`MM/DD/YYYY`** → `Date` object

All PascalCase keys are preserved from the original API responses.

### Field Filtering

The API automatically filters out unreliable and undocumented fields to improve data quality and reduce memory usage:

- **VesselWatch Fields**: The following fields are automatically removed from VesselLocation responses as they are unreliable and undocumented:
  - `VesselWatchShutID`
  - `VesselWatchShutMsg`
  - `VesselWatchShutFlag`
  - `VesselWatchStatus`
  - `VesselWatchMsg`

## Error Handling

All API functions return empty arrays (`[]`) on errors rather than throwing exceptions, making them perfect for use with React Query and other state management solutions.

## Caching Strategy

The hooks use default caching options from `REACT_QUERY.WEEKLY_UPDATES` and `REACT_QUERY.REALTIME_UPDATES`. You do not need to set `enabled`, `refetchInterval`, or `staleTime` manually—these are handled automatically. You can override any option by passing an options object to the hook.

**Caching by Data Type:**
- **Vessel Basics**: Infrequent updates (daily)
- **Vessel Locations**: Frequent updates (real-time)
- **Vessel Verbose**: Infrequent updates (static data)
- **Accommodations**: Infrequent updates (static data)
- **Statistics**: Infrequent updates (daily)
- **History**: Infrequent updates (as needed)

## Common Use Cases

- **Vessel Tracking**: Monitor real-time vessel locations and movements
- **Fleet Management**: Access comprehensive vessel information and status
- **Passenger Information**: Display vessel details and amenities
- **Performance Monitoring**: Track vessel statistics and performance data
- **Historical Analysis**: Review vessel history and operational records
- **Real-time Updates**: Monitor vessel movements and status changes
- **Travel Planning**: Plan trips with current vessel information
- **Fleet Overview**: Get comprehensive fleet status and capabilities 