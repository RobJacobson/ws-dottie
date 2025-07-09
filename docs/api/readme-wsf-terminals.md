# WSF Terminals API

The WSF Terminals API provides comprehensive access to Washington State Ferries terminal information, including basic terminal data, sailing space availability, and detailed terminal facilities.

## Overview

This module integrates with Washington State Ferries Terminals APIs to provide:
- Basic terminal information and contact details
- Real-time space availability and wait times
- Detailed terminal facilities and amenities
- Cache flush date information for data freshness

## API Endpoints

### Terminals API (`/terminals`)
**Base URL**: `https://www.wsdot.wa.gov/ferries/api/terminals/rest`

#### Available Endpoints
- `/terminalbasics` - Basic terminal information and contact details
- `/terminalsailingspace` - Real-time space availability and wait times
- `/terminalverbose` - Detailed terminal facilities and amenities
- `/cacheflushdate` - Cache flush date information

#### Data Types
- `TerminalBasics` - Basic terminal information
- `TerminalSailingSpace` - Space availability and parking
- `TerminalVerbose` - Terminal facilities and services

#### Update Frequency
- **Space Data**: Every 5 minutes
- **Terminal Details**: Weekly (static data)
- **Basic Info**: Weekly (static data)

## Usage Examples

### Get All Terminal Basics
```typescript
import { getTerminalBasics } from '@/api/wsf/terminals/terminalBasics';

const terminals = await getTerminalBasics();
```

### Get Specific Terminal Basics
```typescript
import { getTerminalBasicsByTerminalId } from '@/api/wsf/terminals/terminalBasics';

const terminal = await getTerminalBasicsByTerminalId(7); // Anacortes
```

### Get All Terminal Sailing Space
```typescript
import { getTerminalSailingSpace } from '@/api/wsf/terminals/terminalSailingSpace';

const spaceData = await getTerminalSailingSpace();
```

### Get Terminal Sailing Space by Terminal ID
```typescript
import { getTerminalSailingSpaceByTerminalId } from '@/api/wsf/terminals/terminalSailingSpace';

const spaceData = await getTerminalSailingSpaceByTerminalId(7); // Anacortes
```

### Get Terminal Sailing Space by Route
```typescript
import { getTerminalSailingSpaceByRoute } from '@/api/wsf/terminals/terminalSailingSpace';

const spaceData = await getTerminalSailingSpaceByRoute(1); // Route ID
```

### Get Terminal Sailing Space by Terminal and Route
```typescript
import { getTerminalSailingSpaceByTerminalAndRoute } from '@/api/wsf/terminals/terminalSailingSpace';

const spaceData = await getTerminalSailingSpaceByTerminalAndRoute({
  terminalId: 7, // Anacortes
  routeId: 1     // Route ID
});
```

### Get All Terminal Verbose
```typescript
import { getTerminalVerbose } from '@/api/wsf/terminals/terminalverbose';

const terminals = await getTerminalVerbose();
```

### Get Specific Terminal Verbose
```typescript
import { getTerminalVerboseByTerminalId } from '@/api/wsf/terminals/terminalverbose';

const terminal = await getTerminalVerboseByTerminalId(7); // Anacortes
```

## React Query Integration

### Using Hooks
```typescript
import { 
  useTerminalBasics, 
  useTerminalSailingSpace, 
  useTerminalVerbose,
  useTerminalSailingSpaceByRoute,
  useTerminalSailingSpaceByTerminalAndRoute
} from '@/api/wsf/terminals';

function TerminalComponent() {
  // Default: enabled is true
  const { data: basics, isLoading: basicsLoading } = useTerminalBasics();
  // Override enabled: false
  const { data: spaceData } = useTerminalSailingSpace(undefined, { enabled: false });
  const { data: verbose, isLoading: verboseLoading } = useTerminalVerbose();

  if (basicsLoading || spaceLoading || verboseLoading) {
    return <div>Loading terminal data...</div>;
  }

  return (
    <div>
      <h2>Terminal Basics</h2>
      {basics?.map(terminal => (
        <div key={terminal.terminalId}>{terminal.terminalName}</div>
      ))}
      
      <h2>Space Availability</h2>
      {spaceData?.map(space => (
        <div key={space.terminalId}>
          {space.terminalName}: {space.spaceAvailable} spaces
        </div>
      ))}
      
      <h2>Terminal Details</h2>
      {verbose?.map(terminal => (
        <div key={terminal.terminalId}>
          {terminal.terminalName} - {terminal.facilities}
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
  useTerminalSailingSpaceByTerminalId,
  useTerminalVerboseByTerminalId,
  useTerminalSailingSpaceByRoute,
  useTerminalSailingSpaceByTerminalAndRoute
} from '@/api/wsf/terminals';

function SingleTerminalComponent({ terminalId }: { terminalId: number }) {
  const { data: basics } = useTerminalBasicsByTerminalId(terminalId);
  const { data: spaceData } = useTerminalSailingSpaceByTerminalId(terminalId);
  const { data: verbose } = useTerminalVerboseByTerminalId(terminalId);

  return (
    <div>
      <h2>{basics?.[0]?.terminalName}</h2>
      <p>Space Available: {spaceData?.[0]?.spaceAvailable}</p>
      <p>Facilities: {verbose?.[0]?.facilities}</p>
    </div>
  );
}

function RouteTerminalComponent({ routeId, terminalId }: { routeId: number; terminalId: number }) {
  const { data: routeSpace } = useTerminalSailingSpaceByRoute(routeId);
  const { data: terminalRouteSpace } = useTerminalSailingSpaceByTerminalAndRoute({
    routeId,
    terminalId
  });

  return (
    <div>
      <h3>Route Space Availability</h3>
      {routeSpace?.map(space => (
        <div key={space.terminalId}>
          {space.terminalName}: {space.spaceAvailable} spaces
        </div>
      ))}
      
      <h3>Terminal on Route Space</h3>
      {terminalRouteSpace?.map(space => (
        <div key={space.terminalId}>
          {space.terminalName}: {space.spaceAvailable} spaces
        </div>
      ))}
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