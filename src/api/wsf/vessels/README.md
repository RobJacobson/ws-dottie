# Vessels API

The Vessels API module provides real-time vessel tracking and vessel information for Washington State Ferries.

## Overview

This module integrates with WSF Vessels API endpoints to provide:
- Real-time vessel positions, speeds, and headings
- Vessel specifications, capacity, and amenities
- Historical vessel data and performance metrics

## API Endpoints

### Base URL
`https://www.wsdot.wa.gov/ferries/api/vessels/rest`

### Available Endpoints

#### 1. Vessel Locations (`/vessellocations`)
**Purpose**: Real-time vessel positions and status information

**Data Type**: `VesselLocation[]`

**Update Frequency**: Every 30 seconds

**Response Fields**:
- `vesselId` - Unique vessel identifier
- `vesselName` - Vessel name
- `latitude` - Current latitude position
- `longitude` - Current longitude position
- `speed` - Current speed in knots
- `heading` - Current heading in degrees
- `lastUpdate` - Timestamp of last position update
- `routeId` - Current route identifier
- `departingTerminalId` - Departure terminal
- `arrivingTerminalId` - Arrival terminal
- `estimatedArrivalTime` - Estimated arrival time
- `estimatedDepartureTime` - Estimated departure time

#### 2. Vessel Verbose (`/vesselverbose`)
**Purpose**: Detailed vessel specifications and information

**Data Type**: `VesselVerbose[]`

**Update Frequency**: Daily (static data)

**Response Fields**:
- `vesselId` - Unique vessel identifier
- `vesselName` - Vessel name
- `vesselType` - Type of vessel
- `capacity` - Passenger capacity
- `vehicleCapacity` - Vehicle capacity
- `length` - Vessel length in feet
- `beam` - Vessel beam in feet
- `draft` - Vessel draft in feet
- `yearBuilt` - Year vessel was built
- `homePort` - Vessel's home port
- `amenities` - Available amenities
- `accessibility` - Accessibility features

## Data Types

### VesselLocation
```typescript
type VesselLocation = {
  vesselId: number;
  vesselName: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  lastUpdate: Date;
  routeId: number;
  departingTerminalId: number;
  arrivingTerminalId: number;
  estimatedArrivalTime: Date;
  estimatedDepartureTime: Date;
};
```

### VesselVerbose
```typescript
type VesselVerbose = {
  vesselId: number;
  vesselName: string;
  vesselType: string;
  capacity: number;
  vehicleCapacity: number;
  length: number;
  beam: number;
  draft: number;
  yearBuilt: number;
  homePort: string;
  amenities: string[];
  accessibility: string[];
};
```

## React Query Hooks

### useVesselLocations
Fetches real-time vessel positions with automatic refresh.

```typescript
const { data: vessels, isLoading, error } = useVesselLocations({
  refetchInterval: 30000,  // Refresh every 30 seconds
  staleTime: 15000,        // Consider data stale after 15 seconds
});
```

### useVesselVerbose
Fetches vessel specifications and details.

```typescript
const { data: vessels, isLoading, error } = useVesselVerbose({
  refetchInterval: 86400000,  // Refresh daily
  staleTime: 43200000,        // Consider data stale after 12 hours
});
```

## Usage Examples

### Real-time Vessel Tracking
```typescript
import { useVesselLocations } from '@/data/wsf/vessels';

function VesselTracker() {
  const { data: vessels, isLoading } = useVesselLocations();

  if (isLoading) return <LoadingSpinner />;

  return (
    <Map>
      {vessels?.map(vessel => (
        <VesselMarker
          key={vessel.vesselId}
          position={[vessel.latitude, vessel.longitude]}
          heading={vessel.heading}
          speed={vessel.speed}
          name={vessel.vesselName}
        />
      ))}
    </Map>
  );
}
```

### Vessel Information Display
```typescript
import { useVesselVerbose } from '@/data/wsf/vessels';

function VesselInfo({ vesselId }: { vesselId: number }) {
  const { data: vessels } = useVesselVerbose();
  const vessel = vessels?.find(v => v.vesselId === vesselId);

  if (!vessel) return <div>Vessel not found</div>;

  return (
    <VesselCard>
      <h3>{vessel.vesselName}</h3>
      <p>Type: {vessel.vesselType}</p>
      <p>Capacity: {vessel.capacity} passengers</p>
      <p>Vehicle Capacity: {vessel.vehicleCapacity}</p>
      <p>Built: {vessel.yearBuilt}</p>
      <p>Home Port: {vessel.homePort}</p>
    </VesselCard>
  );
}
```

### Combined Vessel Data
```typescript
import { useVesselLocations, useVesselVerbose } from '@/data/wsf/vessels';

function VesselDashboard() {
  const { data: locations } = useVesselLocations();
  const { data: vessels } = useVesselVerbose();

  return (
    <div>
      <h2>Active Vessels</h2>
      {locations?.map(location => {
        const vessel = vessels?.find(v => v.vesselId === location.vesselId);
        return (
          <VesselStatusCard
            key={location.vesselId}
            location={location}
            vessel={vessel}
          />
        );
      })}
    </div>
  );
}
```

## Performance Considerations

### Caching Strategy
- **Vessel Locations**: Frequent updates (30-second intervals) with short cache time
- **Vessel Details**: Static data with long cache time (daily refresh)
- **Background Updates**: Non-blocking data refresh

### Network Optimization
- **Request Deduplication**: Prevents duplicate API calls
- **Efficient Polling**: Smart refresh intervals based on data freshness
- **Error Recovery**: Graceful handling of network failures

### Memory Management
- **Efficient Data Structures**: Optimized for large vessel datasets
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
- **Mock APIs**: Test with simulated vessel data
- **Integration Tests**: End-to-end API testing
- **Performance Tests**: Load testing and optimization

## Future Enhancements

### Planned Features
- **Historical Tracking**: Vessel position history and analytics
- **Predictive Analytics**: Arrival time predictions
- **Performance Metrics**: Vessel efficiency and reliability data
- **Real-time Alerts**: Vessel status change notifications

### API Improvements
- **WebSocket Support**: Real-time position updates
- **Batch Operations**: Reduce API call frequency
- **Advanced Filtering**: Filter vessels by route, status, or location
- **Geographic Queries**: Find vessels within specific areas 