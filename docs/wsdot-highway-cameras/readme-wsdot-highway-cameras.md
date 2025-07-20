# WSDOT Highway Cameras API

The WSDOT Highway Cameras API provides access to real-time traffic camera data from Washington State Department of Transportation cameras across the state.

## Overview

This API allows you to:
- Retrieve all highway cameras
- Get specific camera information by ID
- Search cameras by region, state route, or milepost range
- Access camera images and location data

## API Endpoints

### Get All Cameras

Retrieves all highway cameras from the WSDOT system.

```typescript
import { getHighwayCameras } from '@wsdot/api';

const cameras = await getHighwayCameras();
```

**Response Type:** `Camera[]`

### Get Camera by ID

Retrieves a specific camera by its unique identifier.

```typescript
import { getHighwayCamera } from '@wsdot/api';

const camera = await getHighwayCamera(9987);
```

**Parameters:**
- `cameraID` (number): The unique camera identifier

**Response Type:** `Camera`

### Search Cameras

Search for cameras using various filters.

```typescript
import { searchHighwayCameras } from '@wsdot/api';

// Search by region
const nwCameras = await searchHighwayCameras({ Region: 'NW' });

// Search by state route
const i5Cameras = await searchHighwayCameras({ StateRoute: 'I-5' });

// Search by milepost range
const rangeCameras = await searchHighwayCameras({
  StartingMilepost: 10,
  EndingMilepost: 20
});

// Combined search
const filteredCameras = await searchHighwayCameras({
  Region: 'NW',
  StateRoute: '9',
  StartingMilepost: 0,
  EndingMilepost: 50
});
```

**Parameters:**
- `params` (SearchCamerasParams): Search parameters
  - `StateRoute?` (string): State route number (e.g., "9", "405")
  - `Region?` (string): Region code (NW, NC, SC, SW, ER, OL, OS, WA)
  - `StartingMilepost?` (number): Starting milepost for search range
  - `EndingMilepost?` (number): Ending milepost for search range

**Response Type:** `Camera[]`

## React Hooks

### useHighwayCameras

React Query hook for getting all highway cameras.

```typescript
import { useHighwayCameras } from '@wsdot/api/react';

function CameraList() {
  const { data: cameras, isLoading, error } = useHighwayCameras();

  if (isLoading) return <div>Loading cameras...</div>;
  if (error) return <div>Error loading cameras</div>;

  return (
    <div>
      {cameras?.map(camera => (
        <div key={camera.CameraID}>
          <h3>{camera.Title}</h3>
          <img src={camera.ImageURL} alt={camera.Title} />
        </div>
      ))}
    </div>
  );
}
```

### useHighwayCamera

React Query hook for getting a specific camera by ID.

```typescript
import { useHighwayCamera } from '@wsdot/api/react';

function CameraDetail({ cameraId }: { cameraId: number }) {
  const { data: camera, isLoading, error } = useHighwayCamera(cameraId);

  if (isLoading) return <div>Loading camera...</div>;
  if (error) return <div>Error loading camera</div>;

  return (
    <div>
      <h2>{camera?.Title}</h2>
      <img src={camera?.ImageURL} alt={camera?.Title} />
      <p>Location: {camera?.CameraLocation.RoadName} at MP {camera?.CameraLocation.MilePost}</p>
    </div>
  );
}
```

### useSearchHighwayCameras

React Query hook for searching cameras with filters.

```typescript
import { useSearchHighwayCameras } from '@wsdot/api/react';

function RegionalCameras({ region }: { region: string }) {
  const { data: cameras, isLoading, error } = useSearchHighwayCameras({
    Region: region
  });

  if (isLoading) return <div>Loading cameras...</div>;
  if (error) return <div>Error loading cameras</div>;

  return (
    <div>
      <h2>Cameras in {region} Region</h2>
      {cameras?.map(camera => (
        <div key={camera.CameraID}>
          <h3>{camera.Title}</h3>
          <img src={camera.ImageURL} alt={camera.Title} />
        </div>
      ))}
    </div>
  );
}
```

## Data Types

### Camera

Represents a highway camera with all its associated data.

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

### CameraLocation

Represents the location information for a camera.

```typescript
type CameraLocation = {
  Description: string | null;          // Description of the camera location
  Direction: string | null;            // Direction the camera is facing (N, S, E, W, B for both)
  Latitude: number;                    // Latitude coordinate
  Longitude: number;                   // Longitude coordinate
  MilePost: number;                    // Milepost location
  RoadName: string;                    // Road name (e.g., "SR 9", "I-405")
};
```

### SearchCamerasParams

Parameters for searching cameras.

```typescript
type SearchCamerasParams = {
  StateRoute?: string;                 // State route number (e.g., "9", "405")
  Region?: string;                     // Region code (NW, NC, SC, SW, ER, OL, OS, WA)
  StartingMilepost?: number;           // Starting milepost for search range
  EndingMilepost?: number;             // Ending milepost for search range
};
```

## Region Codes

The following region codes are available:

- **NW**: Northwest Region
- **NC**: North Central Region
- **SC**: South Central Region
- **SW**: Southwest Region
- **ER**: Eastern Region
- **OL**: Olympic Region
- **OS**: Oregon State (external cameras)
- **WA**: Washington State (general)

## Examples

### Get All Active Cameras

```typescript
import { getHighwayCameras } from '@wsdot/api';

const allCameras = await getHighwayCameras();
const activeCameras = allCameras.filter(camera => camera.IsActive);

console.log(`Found ${activeCameras.length} active cameras`);
```

### Find Cameras on a Specific Route

```typescript
import { searchHighwayCameras } from '@wsdot/api';

const i5Cameras = await searchHighwayCameras({ StateRoute: 'I-5' });
console.log(`Found ${i5Cameras.length} cameras on I-5`);
```

### Get Camera Images for a Region

```typescript
import { searchHighwayCameras } from '@wsdot/api';

const nwCameras = await searchHighwayCameras({ Region: 'NW' });

nwCameras.forEach(camera => {
  console.log(`${camera.Title}: ${camera.ImageURL}`);
});
```

### React Component with Camera Grid

```typescript
import { useHighwayCameras } from '@wsdot/api/react';

function CameraGrid() {
  const { data: cameras, isLoading, error } = useHighwayCameras();

  if (isLoading) return <div>Loading cameras...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="camera-grid">
      {cameras?.map(camera => (
        <div key={camera.CameraID} className="camera-card">
          <h3>{camera.Title}</h3>
          <img 
            src={camera.ImageURL} 
            alt={camera.Title}
            width={camera.ImageWidth}
            height={camera.ImageHeight}
          />
          <p>{camera.CameraLocation.RoadName} at MP {camera.CameraLocation.MilePost}</p>
          <p>Region: {camera.Region}</p>
          {camera.IsActive && <span className="status-active">Active</span>}
        </div>
      ))}
    </div>
  );
}
```

## Error Handling

The API functions throw `WsdotApiError` instances when requests fail. Handle errors appropriately:

```typescript
import { getHighwayCameras, WsdotApiError } from '@wsdot/api';

try {
  const cameras = await getHighwayCameras();
  console.log(`Retrieved ${cameras.length} cameras`);
} catch (error) {
  if (error instanceof WsdotApiError) {
    console.error(`API Error: ${error.message}`);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Performance

All API endpoints are designed to return data within 2 seconds. The React hooks use appropriate caching strategies to minimize API calls and improve performance.

## Rate Limiting

The WSDOT API has rate limiting in place. The client automatically handles rate limiting and retries, but be mindful of making too many requests in a short period.

## Related APIs

- [WSDOT Border Crossings API](./readme-wsdot-border-crossings.md)
- [WSDOT Bridge Clearances API](./readme-wsdot-bridge-clearances.md)
- [WSDOT Commercial Vehicle Restrictions API](./readme-wsdot-commercial-vehicle-restrictions.md)
- [WSDOT Highway Alerts API](./readme-wsdot-highway-alerts.md) 