# WSDOT Highway Cameras API

Complete API client for WSDOT Highway Cameras with TypeScript types, API functions, and React Query hooks.

## Overview

The WSDOT Highway Cameras API provides access to real-time traffic camera feeds and metadata across Washington State highways. This API allows you to retrieve camera information, search for cameras by location or route, and access camera images.

## Features

- **Complete TypeScript Support**: Full type definitions for all API responses
- **React Query Integration**: Ready-to-use hooks with caching and error handling
- **Real-time Data**: Access to live traffic camera feeds
- **Flexible Search**: Filter cameras by region, route, or milepost range
- **Performance Optimized**: Built-in caching and performance monitoring

## Installation

```bash
npm install @ferryjoy/wsdot-api-client
```

## Quick Start

### Basic Usage

```typescript
import { getHighwayCameras, getHighwayCamera } from '@ferryjoy/wsdot-api-client';

// Get all cameras
const cameras = await getHighwayCameras();
console.log(`Found ${cameras.length} cameras`);

// Get a specific camera
const camera = await getHighwayCamera(9987);
console.log(`Camera: ${camera.Title}`);
```

### React Usage

```typescript
import { useHighwayCameras, useHighwayCamera } from '@ferryjoy/wsdot-api-client';

function CameraList() {
  const { data: cameras, isLoading, error } = useHighwayCameras();

  if (isLoading) return <div>Loading cameras...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {cameras?.map(camera => (
        <div key={camera.CameraID}>
          <h3>{camera.Title}</h3>
          <img src={camera.ImageURL} alt={camera.Title} />
          <p>Region: {camera.Region}</p>
        </div>
      ))}
    </div>
  );
}
```

## API Reference

### Types

#### `Camera`

Represents a highway camera with complete metadata.

```typescript
type Camera = {
  CameraID: number;                    // Unique camera identifier
  CameraLocation: CameraLocation;      // Location information
  CameraOwner: string | null;          // Camera owner information
  Description: string | null;          // Camera description
  DisplayLatitude: number;             // Display latitude coordinate
  DisplayLongitude: number;            // Display longitude coordinate
  ImageHeight: number;                 // Image height in pixels
  ImageURL: string;                    // URL to the camera image
  ImageWidth: number;                  // Image width in pixels
  IsActive: boolean;                   // Whether the camera is currently active
  OwnerURL: string | null;             // Owner URL
  Region: string;                      // Region code (NW, NC, SC, SW, ER, OL, OS, WA)
  SortOrder: number;                   // Sort order for display
  Title: string;                       // Camera title/name
};
```

#### `CameraLocation`

Represents the location information for a camera.

```typescript
type CameraLocation = {
  Description: string | null;          // Description of the camera location
  Direction: string | null;            // Direction the camera is facing (N, S, E, W, B for both)
  Latitude: number;                    // Latitude coordinate
  Longitude: number;                   // Longitude coordinate
  MilePost: number;                    // Milepost location
  RoadName: string;                    // Road name (e.g., "SR 9", "I-5")
};
```

#### `CameraSearchParams`

Parameters for searching cameras.

```typescript
type CameraSearchParams = {
  StateRoute?: string;                 // State route to filter by (e.g., "9", "I-5")
  Region?: string;                     // Region to filter by (NW, NC, SC, SW, ER, OL, OS, WA)
  StartingMilepost?: number;           // Starting milepost for range search
  EndingMilepost?: number;             // Ending milepost for range search
};
```

### API Functions

#### `getHighwayCameras(logMode?)`

Retrieves all highway cameras.

```typescript
const cameras = await getHighwayCameras();
// Returns: Camera[]
```

#### `getHighwayCamera(cameraID, logMode?)`

Retrieves a specific camera by ID.

```typescript
const camera = await getHighwayCamera(9987);
// Returns: Camera
```

#### `searchHighwayCameras(params?, logMode?)`

Searches for cameras with optional filters.

```typescript
// Search by region
const cameras = await searchHighwayCameras({ Region: 'NW' });

// Search by route
const cameras = await searchHighwayCameras({ StateRoute: '9' });

// Search with multiple parameters
const cameras = await searchHighwayCameras({
  Region: 'NW',
  StateRoute: '9',
  StartingMilepost: 10,
  EndingMilepost: 20,
});
// Returns: Camera[]
```

#### `getActiveHighwayCameras(logMode?)`

Retrieves only active cameras.

```typescript
const activeCameras = await getActiveHighwayCameras();
// Returns: Camera[]
```

#### `getHighwayCamerasByRegion(region, logMode?)`

Retrieves cameras for a specific region.

```typescript
const nwCameras = await getHighwayCamerasByRegion('NW');
// Returns: Camera[]
```

#### `getHighwayCamerasByRoute(stateRoute, logMode?)`

Retrieves cameras for a specific state route.

```typescript
const i5Cameras = await getHighwayCamerasByRoute('I-5');
// Returns: Camera[]
```

### React Query Hooks

#### `useHighwayCameras(logMode?)`

React Query hook for getting all highway cameras.

```typescript
const { data: cameras, isLoading, error } = useHighwayCameras();
```

#### `useHighwayCamera(cameraID, logMode?)`

React Query hook for getting a specific camera by ID.

```typescript
const { data: camera, isLoading, error } = useHighwayCamera(9987);
```

#### `useSearchHighwayCameras(params?, logMode?)`

React Query hook for searching cameras with optional filters.

```typescript
const { data: cameras, isLoading, error } = useSearchHighwayCameras({
  Region: 'NW',
  StateRoute: '9'
});
```

#### `useActiveHighwayCameras(logMode?)`

React Query hook for getting only active cameras.

```typescript
const { data: activeCameras, isLoading, error } = useActiveHighwayCameras();
```

#### `useHighwayCamerasByRegion(region, logMode?)`

React Query hook for getting cameras by region.

```typescript
const { data: nwCameras, isLoading, error } = useHighwayCamerasByRegion('NW');
```

#### `useHighwayCamerasByRoute(stateRoute, logMode?)`

React Query hook for getting cameras by route.

```typescript
const { data: i5Cameras, isLoading, error } = useHighwayCamerasByRoute('I-5');
```

## Examples

### Display Camera Feed

```typescript
import { useHighwayCamera } from '@ferryjoy/wsdot-api-client';

function CameraFeed({ cameraId }: { cameraId: number }) {
  const { data: camera, isLoading, error } = useHighwayCamera(cameraId);

  if (isLoading) return <div>Loading camera...</div>;
  if (error) return <div>Error loading camera</div>;
  if (!camera) return <div>Camera not found</div>;

  return (
    <div>
      <h2>{camera.Title}</h2>
      <img 
        src={camera.ImageURL} 
        alt={camera.Title}
        width={camera.ImageWidth}
        height={camera.ImageHeight}
      />
      <p>Location: {camera.CameraLocation.RoadName} at MP {camera.CameraLocation.MilePost}</p>
      <p>Region: {camera.Region}</p>
      <p>Status: {camera.IsActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}
```

### Search Cameras by Location

```typescript
import { useSearchHighwayCameras } from '@ferryjoy/wsdot-api-client';

function CameraSearch() {
  const [region, setRegion] = useState('NW');
  const [route, setRoute] = useState('');

  const { data: cameras, isLoading } = useSearchHighwayCameras({
    Region: region,
    StateRoute: route || undefined,
  });

  return (
    <div>
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="NW">Northwest</option>
        <option value="NC">North Central</option>
        <option value="SC">South Central</option>
        <option value="SW">Southwest</option>
        <option value="ER">Eastern</option>
        <option value="OL">Olympic</option>
        <option value="OS">Oregon</option>
        <option value="WA">Washington</option>
      </select>

      <input 
        type="text" 
        placeholder="Route (e.g., I-5, SR 520)"
        value={route}
        onChange={(e) => setRoute(e.target.value)}
      />

      {isLoading ? (
        <div>Searching cameras...</div>
      ) : (
        <div>
          <h3>Found {cameras?.length || 0} cameras</h3>
          {cameras?.map(camera => (
            <div key={camera.CameraID}>
              <h4>{camera.Title}</h4>
              <p>{camera.CameraLocation.RoadName} at MP {camera.CameraLocation.MilePost}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Camera Map

```typescript
import { useHighwayCameras } from '@ferryjoy/wsdot-api-client';

function CameraMap() {
  const { data: cameras, isLoading } = useHighwayCameras();

  if (isLoading) return <div>Loading camera map...</div>;

  return (
    <div>
      <h2>Washington State Traffic Cameras</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {cameras?.map(camera => (
          <div key={camera.CameraID} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h3>{camera.Title}</h3>
            <img 
              src={camera.ImageURL} 
              alt={camera.Title}
              style={{ width: '100%', height: 'auto' }}
            />
            <p><strong>Location:</strong> {camera.CameraLocation.RoadName} at MP {camera.CameraLocation.MilePost}</p>
            <p><strong>Region:</strong> {camera.Region}</p>
            <p><strong>Status:</strong> {camera.IsActive ? '🟢 Active' : '🔴 Inactive'}</p>
            <p><strong>Coordinates:</strong> {camera.CameraLocation.Latitude.toFixed(4)}, {camera.CameraLocation.Longitude.toFixed(4)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Error Handling

All API functions throw `WsdotApiError` instances when requests fail. React Query hooks provide error states automatically.

```typescript
import { WsdotApiError } from '@ferryjoy/wsdot-api-client';

try {
  const camera = await getHighwayCamera(999999);
} catch (error) {
  if (error instanceof WsdotApiError) {
    console.error('API Error:', error.message);
    console.error('Error Code:', error.code);
  }
}
```

## Performance

The API is optimized for performance with:

- **Caching**: React Query hooks include intelligent caching
- **Rate Limiting**: Built-in rate limiting to respect API limits
- **Performance Monitoring**: Automatic performance tracking
- **2-Second Target**: All endpoints target sub-2-second response times

## Data Sources

This API integrates with the official WSDOT Traveler Information APIs:

- **Base URL**: `https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc`
- **Documentation**: [WSDOT Highway Cameras API](https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html)
- **Help Page**: [API Help](https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help)

## Regions

The API supports the following WSDOT regions:

- **NW**: Northwest
- **NC**: North Central  
- **SC**: South Central
- **SW**: Southwest
- **ER**: Eastern
- **OL**: Olympic
- **OS**: Oregon
- **WA**: Washington

## Road Types

Cameras are available for various road types:

- **Interstates**: I-5, I-90, I-405, etc.
- **State Routes**: SR 520, SR 99, SR 9, etc.
- **US Highways**: US 2, US 97, US 101, etc.

## License

This API client is part of the @ferryjoy/wsdot-api-client package. See the main package documentation for licensing information. 