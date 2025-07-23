# WSF Terminals API

The WSF Terminals API provides comprehensive access to Washington State Ferries terminal information, including basic terminal data, sailing space availability, terminal locations, wait times, and detailed terminal facilities.

## Overview

This module integrates with Washington State Ferries Terminals APIs to provide:
- Basic terminal information and contact details
- Real-time space availability and wait times
- Terminal location data and geographic information
- Wait times and congestion data
- Detailed terminal facilities and amenities
- Cache flush date information for data freshness

## WSDOT Documentation
- [WSF Terminals API Documentation](https://www.wsdot.wa.gov/ferries/api/terminals/documentation/rest.html)
- [WSF Terminals API Help](https://www.wsdot.wa.gov/ferries/api/terminals/rest/help)

## API Endpoints

### Terminals API (`/terminals`)
**Base URL**: `https://www.wsdot.wa.gov/ferries/api/terminals/rest`

#### Available Endpoints
- `/terminalbasics` - Basic terminal information and contact details
- `/terminalbasics/{TerminalID}` - Specific terminal basics by ID
- `/terminallocations` - Terminal location data and geographic information
- `/terminallocations/{TerminalID}` - Specific terminal location by ID
- `/terminalsailingspace` - Real-time space availability and wait times
- `/terminalsailingspace/{TerminalID}` - Specific terminal sailing space by ID
- `/terminalwaittimes` - Wait times and congestion data
- `/terminalwaittimes/{TerminalID}` - Specific terminal wait times by ID
- `/terminalverbose` - Detailed terminal facilities and amenities
- `/terminalverbose/{TerminalID}` - Specific terminal verbose by ID
- `/cacheflushdate` - Cache flush date information

#### Data Types
- `TerminalBasics` - Basic terminal information
- `TerminalLocation` - Terminal location and geographic data
- `TerminalSailingSpace` - Space availability and parking
- `TerminalWaitTime` - Wait times and congestion data
- `TerminalVerbose` - Detailed terminal facilities and amenities

#### Update Frequency
- **Terminal Basics**: Static (infrequent updates)
- **Terminal Locations**: Static (infrequent updates)
- **Sailing Space**: Real-time (5-minute updates)
- **Wait Times**: Real-time (5-minute updates)
- **Terminal Verbose**: Static (infrequent updates)
- **Cache Flush Date**: Daily

## Usage Examples

### Get All Terminal Basics
```typescript
import { getTerminalBasics } from 'ws-dottie/wsf-terminals';

const terminals = await getTerminalBasics();
```

### Get Specific Terminal Basics
```typescript
import { getTerminalBasicsByTerminalId } from 'ws-dottie/wsf-terminals';

const terminal = await getTerminalBasicsByTerminalId(7); // Anacortes
```

### Get All Terminal Sailing Space
```typescript
import { getTerminalSailingSpace } from 'ws-dottie/wsf-terminals';

const spaceData = await getTerminalSailingSpace();
```

### Get Terminal Sailing Space by Terminal ID
```typescript
import { getTerminalSailingSpaceByTerminalId } from 'ws-dottie/wsf-terminals';

const spaceData = await getTerminalSailingSpaceByTerminalId(7); // Anacortes
```

### Get All Terminal Verbose
```typescript
import { getTerminalVerbose } from 'ws-dottie/wsf-terminals';

const terminals = await getTerminalVerbose();
```

### Get Specific Terminal Verbose
```typescript
import { getTerminalVerboseByTerminalId } from 'ws-dottie/wsf-terminals';

const terminal = await getTerminalVerboseByTerminalId(7); // Anacortes
```

### Get All Terminal Locations
```typescript
import { getTerminalLocations } from 'ws-dottie/wsf-terminals';

const locations = await getTerminalLocations();
```

### Get Specific Terminal Location
```typescript
import { getTerminalLocationsByTerminalId } from 'ws-dottie/wsf-terminals';

const location = await getTerminalLocationsByTerminalId(7); // Anacortes
```

### Get All Terminal Wait Times
```typescript
import { getTerminalWaitTimes } from 'ws-dottie/wsf-terminals';

const waitTimes = await getTerminalWaitTimes();
```

### Get Terminal Wait Times by Terminal
```typescript
import { getTerminalWaitTimesByTerminal } from 'ws-dottie/wsf-terminals';

const waitTimes = await getTerminalWaitTimesByTerminal(7); // Anacortes
```

## React Query Integration

### Using Hooks
```typescript
import { 
  useTerminalBasics, 
  useTerminalLocations,
  useTerminalSailingSpace, 
  useTerminalWaitTimes,
  useTerminalVerbose,
  useTerminalBasicsByTerminalId,
  useTerminalLocationsByTerminalId,
  useTerminalSailingSpaceByTerminalId,
  useTerminalWaitTimesByTerminal,
  useTerminalVerboseByTerminalId
} from 'ws-dottie/react/wsf-terminals';

function TerminalComponent() {
  // Default: enabled is true
  const { data: basics, isLoading: basicsLoading } = useTerminalBasics();
  const { data: spaceData, isLoading: spaceLoading } = useTerminalSailingSpace();
  const { data: verbose, isLoading: verboseLoading } = useTerminalVerbose();
  const { data: locations, isLoading: locationsLoading } = useTerminalLocations();
  const { data: waitTimes, isLoading: waitTimesLoading } = useTerminalWaitTimes();

  if (basicsLoading || spaceLoading || verboseLoading || locationsLoading || waitTimesLoading) {
    return <div>Loading terminal data...</div>;
  }

  return (
    <div>
      <h2>Terminal Basics</h2>
      {basics?.map(terminal => (
        <div key={terminal.TerminalID}>{terminal.TerminalName}</div>
      ))}
      
      <h2>Terminal Locations</h2>
      {locations?.map(location => (
        <div key={location.TerminalID}>
          {location.TerminalName}: {location.Latitude}, {location.Longitude}
        </div>
      ))}
      
      <h2>Space Availability</h2>
      {spaceData?.map(space => (
        <div key={space.TerminalID}>
          {space.TerminalName}: {space.SpaceAvailable} spaces
        </div>
      ))}
      
      <h2>Wait Times</h2>
      {waitTimes?.map(waitTime => (
        <div key={waitTime.TerminalID}>
          {waitTime.TerminalName}: {waitTime.WaitTimeMinutes} minutes
        </div>
      ))}
      
      <h2>Terminal Details</h2>
      {verbose?.map(terminal => (
        <div key={terminal.TerminalID}>
          {terminal.TerminalName} - {terminal.Facilities}
        </div>
      ))}
    </div>
  );
}
```

### Overriding Default Options
All hooks use default caching options with `enabled: true`. You can override `enabled` or any other React Query option by passing an options object as the second argument to the hook:

```typescript
const { data } = useTerminalBasics(undefined, { enabled: false }); // disables the query
```

### Using Specific Terminal Hooks
```typescript
import { 
  useTerminalBasicsByTerminalId, 
  useTerminalLocationsByTerminalId,
  useTerminalSailingSpaceByTerminalId,
  useTerminalWaitTimesByTerminal,
  useTerminalVerboseByTerminalId
} from 'ws-dottie/react/wsf-terminals';

function SingleTerminalComponent({ terminalId }: { terminalId: number }) {
  const { data: basics } = useTerminalBasicsByTerminalId(terminalId);
  const { data: location } = useTerminalLocationsByTerminalId(terminalId);
  const { data: spaceData } = useTerminalSailingSpaceByTerminalId(terminalId);
  const { data: waitTimes } = useTerminalWaitTimesByTerminal(terminalId);
  const { data: verbose } = useTerminalVerboseByTerminalId(terminalId);

  return (
    <div>
      <h2>{basics?.TerminalName}</h2>
      <p>Location: {location?.Latitude}, {location?.Longitude}</p>
      <p>Space Available: {spaceData?.SpaceAvailable}</p>
      <p>Wait Time: {waitTimes?.WaitTimeMinutes} minutes</p>
      <p>Facilities: {verbose?.Facilities}</p>
    </div>
  );
}

function RouteTerminalComponent({ terminalId }: { terminalId: number }) {
  const { data: space } = useTerminalSailingSpaceByTerminalId(terminalId);
  const { data: waitTimes } = useTerminalWaitTimesByTerminal(terminalId);
  return (
    <div>
      <h3>Space Availability</h3>
      {space && (
        <div>{space.TerminalName}: {space.SpaceAvailable} spaces</div>
      )}
      <h3>Wait Times</h3>
      {waitTimes && (
        <div>{waitTimes.TerminalName}: {waitTimes.WaitTimeMinutes} minutes</div>
      )}
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

The hooks use default caching options from `REACT_QUERY.WEEKLY_UPDATES` and `REACT_QUERY.REALTIME_UPDATES`. You do not need to set `enabled`, `refetchInterval`, or `staleTime` manually—these are handled automatically. You can override any option by passing an options object to the hook.

**Caching by Data Type:**
- **Terminal Basics**: Infrequent updates (static data)
- **Terminal Locations**: Infrequent updates (static data)
- **Sailing Space**: Frequent updates (real-time)
- **Wait Times**: Frequent updates (real-time)
- **Terminal Verbose**: Infrequent updates (static data)

## Common Use Cases

- **Terminal Information**: Access basic terminal details and contact information
- **Space Availability**: Monitor real-time parking and space availability
- **Wait Time Monitoring**: Track current wait times and congestion
- **Location Services**: Get terminal coordinates for mapping applications
- **Facility Information**: Access detailed terminal amenities and services
- **Real-time Updates**: Monitor space and wait time changes
- **Travel Planning**: Plan trips with current terminal conditions
- **Navigation**: Use terminal locations for routing and directions 