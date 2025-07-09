# Terminals API

The Terminals API module provides terminal information and space availability data for Washington State Ferries.

## Overview

This module integrates with WSF Terminals API endpoints to provide:
- Real-time space availability and wait times
- Terminal information and facilities
- Parking availability and accessibility features

## API Endpoints

### Base URL
`https://www.wsdot.wa.gov/ferries/api/terminals/rest`

### Available Endpoints

#### 1. Terminal Sailing Space (`/terminalsailingspace`)
**Purpose**: Real-time space availability and wait times

**Data Type**: `TerminalSailingSpace[]`

**Update Frequency**: Every 5 minutes

**Response Fields**:
- `terminalId` - Unique terminal identifier
- `terminalName` - Terminal name
- `routeId` - Associated route identifier
- `spaceAvailable` - Available vehicle space
- `waitTime` - Current wait time in minutes
- `lastUpdate` - Timestamp of last update
- `parkingAvailable` - Parking space availability
- `motorcycleSpace` - Motorcycle space availability
- `oversizedSpace` - Oversized vehicle space
- `accessibilitySpace` - Accessibility parking space

#### 2. Terminal Verbose (`/terminalverbose`)
**Purpose**: Detailed terminal information and facilities

**Data Type**: `TerminalVerbose[]`

**Update Frequency**: Weekly (static data)

**Response Fields**:
- `terminalId` - Unique terminal identifier
- `terminalName` - Terminal name
- `terminalType` - Type of terminal
- `address` - Terminal address
- `phone` - Terminal phone number
- `amenities` - Available amenities
- `accessibility` - Accessibility features
- `parkingInfo` - Parking information
- `transitConnections` - Public transit connections
- `operatingHours` - Terminal operating hours

## Data Types

### TerminalSailingSpace
```typescript
type TerminalSailingSpace = {
  terminalId: number;
  terminalName: string;
  routeId: number;
  spaceAvailable: number;
  waitTime: number;
  lastUpdate: Date;
  parkingAvailable: boolean;
  motorcycleSpace: number;
  oversizedSpace: number;
  accessibilitySpace: number;
};
```

### TerminalVerbose
```typescript
type TerminalVerbose = {
  terminalId: number;
  terminalName: string;
  terminalType: string;
  address: string;
  phone: string;
  amenities: string[];
  accessibility: string[];
  parkingInfo: {
    totalSpaces: number;
    hourlyRate: number;
    dailyRate: number;
  };
  transitConnections: string[];
  operatingHours: {
    open: string;
    close: string;
    days: string[];
  };
};
```

## React Query Hooks

### useTerminalSailingSpace
Fetches real-time space availability with automatic refresh.

```typescript
const { data: terminals, isLoading, error } = useTerminalSailingSpace({
  refetchInterval: 300000,  // Refresh every 5 minutes
  staleTime: 150000,        // Consider data stale after 2.5 minutes
});
```

### useTerminalVerbose
Fetches terminal information and facilities.

```typescript
const { data: terminals, isLoading, error } = useTerminalVerbose({
  refetchInterval: 604800000,  // Refresh weekly
  staleTime: 302400000,        // Consider data stale after 3.5 days
});
```

## Usage Examples

### Terminal Space Availability
```typescript
import { useTerminalSailingSpace } from '@/data/wsf/terminals';

function TerminalSpace() {
  const { data: terminals, isLoading } = useTerminalSailingSpace();

  if (isLoading) return <LoadingSpinner />;

  return (
    <TerminalList>
      {terminals?.map(terminal => (
        <TerminalSpaceCard
          key={terminal.terminalId}
          terminal={terminal}
        />
      ))}
    </TerminalList>
  );
}
```

### Terminal Information Display
```typescript
import { useTerminalVerbose } from '@/data/wsf/terminals';

function TerminalInfo({ terminalId }: { terminalId: number }) {
  const { data: terminals } = useTerminalVerbose();
  const terminal = terminals?.find(t => t.terminalId === terminalId);

  if (!terminal) return <div>Terminal not found</div>;

  return (
    <TerminalCard>
      <h3>{terminal.terminalName}</h3>
      <p>Address: {terminal.address}</p>
      <p>Phone: {terminal.phone}</p>
      <p>Type: {terminal.terminalType}</p>
      <AmenitiesList amenities={terminal.amenities} />
      <AccessibilityInfo features={terminal.accessibility} />
    </TerminalCard>
  );
}
```

### Combined Terminal Data
```typescript
import { useTerminalSailingSpace, useTerminalVerbose } from '@/data/wsf/terminals';

function TerminalDashboard() {
  const { data: spaceData } = useTerminalSailingSpace();
  const { data: terminalDetails } = useTerminalVerbose();

  return (
    <div>
      <h2>Terminal Status</h2>
      {spaceData?.map(space => {
        const terminal = terminalDetails?.find(t => t.terminalId === space.terminalId);
        return (
          <TerminalStatusCard
            key={space.terminalId}
            space={space}
            terminal={terminal}
          />
        );
      })}
    </div>
  );
}
```

### Wait Time Alerts
```typescript
import { useTerminalSailingSpace } from '@/data/wsf/terminals';

function WaitTimeAlerts() {
  const { data: terminals } = useTerminalSailingSpace();
  
  const highWaitTimes = terminals?.filter(t => t.waitTime > 60) || [];

  return (
    <AlertSection>
      <h3>High Wait Times</h3>
      {highWaitTimes.map(terminal => (
        <WaitTimeAlert
          key={terminal.terminalId}
          terminal={terminal}
        />
      ))}
    </AlertSection>
  );
}
```

## Performance Considerations

### Caching Strategy
- **Space Data**: Frequent updates (5-minute intervals) with short cache time
- **Terminal Details**: Static data with long cache time (weekly refresh)
- **Background Updates**: Non-blocking data refresh

### Network Optimization
- **Request Deduplication**: Prevents duplicate API calls
- **Efficient Polling**: Smart refresh intervals based on data freshness
- **Error Recovery**: Graceful handling of network failures

### Memory Management
- **Efficient Data Structures**: Optimized for terminal datasets
- **Garbage Collection**: Automatic cleanup of unused data
- **Memory Monitoring**: Performance tracking and optimization

## Error Handling

### API Failures
- **Graceful Degradation**: Show cached data when API is unavailable
- **User Feedback**: Clear error messages and retry options
- **Automatic Recovery**: Background retry with exponential backoff

### Data Validation
- **Type Checking**: Runtime validation of API responses
- **Schema Validation**: Ensure data structure integrity
- **Fallback Values**: Provide defaults for missing data

## Development Tools

### Debugging
- **Network Monitoring**: Track API requests and responses
- **Cache Inspection**: View cached data and query states
- **Performance Profiling**: Monitor data layer performance

### Testing
- **Mock APIs**: Test with simulated terminal data
- **Integration Tests**: End-to-end API testing
- **Performance Tests**: Load testing and optimization

## Future Enhancements

### Planned Features
- **Historical Data**: Terminal usage patterns and trends
- **Predictive Analytics**: Wait time predictions
- **Real-time Alerts**: Space availability notifications
- **Geographic Features**: Terminal location and directions

### API Improvements
- **WebSocket Support**: Real-time space updates
- **Batch Operations**: Reduce API call frequency
- **Advanced Filtering**: Filter terminals by route or region
- **Geographic Queries**: Find terminals within specific areas 