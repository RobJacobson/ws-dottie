# WSDOT Highway Cameras API

The WSDOT Highway Cameras API provides access to real-time traffic camera data from Washington State Department of Transportation cameras across the state.

## Overview

This module provides access to the WSDOT Highway Cameras API, which offers real-time traffic camera data, location information, and search capabilities for Washington State highway cameras.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Real-time Images** | Live camera feeds and images | ✅ Available |
| **Location Data** | Geographic coordinates and milepost information | ✅ Available |
| **Search Capabilities** | Filter by route, region, and milepost range | ✅ Available |
| **Camera Metadata** | Camera details, ownership, and status | ✅ Available |
| **Image URLs** | Direct links to camera images | ✅ Available |
| **Regional Organization** | Cameras organized by geographic regions | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Camera Images** | Every 1-5 minutes | `MINUTE_UPDATES` | Live camera feeds |
| **Camera Metadata** | Static | `WEEKLY_UPDATES` | Updated when cameras are added/modified |

## WSDOT Documentation

- **[WSDOT Highway Cameras API Help](https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `GetCamerasAsJson` | GET | Get all available traffic cameras | `AccessCode` | `Camera[]` |
| `GetCameraAsJson` | GET | Get specific camera by ID | `AccessCode`, `CameraID` | `Camera` |
| `SearchCamerasAsJson` | GET | Search cameras by filters | `AccessCode`, `StateRoute`*, `Region`*, `StartingMilepost`*, `EndingMilepost`* | `Camera[]` |

*Optional parameters

### Base URL
```
https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc
```

## Usage Examples

### Basic Usage

```typescript
import { wsdotHighwayCameras } from 'ws-dottie/wsdot-highway-cameras';

// Get all available traffic cameras
const cameras = await wsdotHighwayCameras.getCameras();

// Get specific camera by ID
const camera = await wsdotHighwayCameras.getCamera({ cameraId: 9818 });

// Search cameras by route
const routeCameras = await wsdotHighwayCameras.searchCameras({ stateRoute: "005" });
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getCameras` | None | `getCameras()` | Get all available traffic cameras |
| `getCamera` | `{ cameraId: number }` | `getCamera({ cameraId: 9818 })` | Get specific camera by ID |
| `searchCameras` | `{ stateRoute?: string, region?: string, startingMilepost?: number, endingMilepost?: number }` | `searchCameras({ stateRoute: "005" })` | Search cameras by filters |

### Common Use Cases

```typescript
// Example 1: Display all cameras
const cameras = await wsdotHighwayCameras.getCameras();
cameras.forEach(camera => {
  console.log(`${camera.Title}: ${camera.ImageURL}`);
});

// Example 2: Search cameras for specific route
const routeCameras = await wsdotHighwayCameras.searchCameras({ stateRoute: "005" });
// Display I-5 cameras
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useCameras` | None | Get all available traffic cameras | `MINUTE_UPDATES` |
| `useCamera` | `{ cameraId: number }` | Get specific camera by ID | `MINUTE_UPDATES` |
| `useSearchCameras` | `{ stateRoute?: string, region?: string, startingMilepost?: number, endingMilepost?: number }` | Search cameras by filters | `MINUTE_UPDATES` |

### Basic Hook Usage

```typescript
import { useCameras } from 'ws-dottie/react/wsdot-highway-cameras';

function HighwayCamerasList() {
  const { data, isLoading, error } = useCameras();

  if (isLoading) return <div>Loading cameras...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(camera => (
        <div key={camera.CameraID}>
          <h3>{camera.Title}</h3>
          <img src={camera.ImageURL} alt={camera.Title} />
          <p>Location: {camera.RoadName}</p>
          <p>Milepost: {camera.MilePost}</p>
        </div>
      ))}
    </div>
  );
}
```

## Data Types

### Type Summary

| Type Name | Description | Key Properties |
|-----------|-------------|----------------|
| `Camera` | Traffic camera information | `CameraID`, `Title`, `ImageURL`, `RoadName`, `MilePost`, `Latitude`, `Longitude` |

### Detailed Type Definitions

```typescript
type Camera = {
  CameraID: number;                               // Unique identifier for the camera
  Title: string;                                  // Camera title/name
  ImageURL: string;                               // URL to the camera image
  RoadName: string;                               // Name of the road where camera is located
  MilePost: number;                               // Milepost location of the camera
  Latitude: number;                               // Latitude coordinate of the camera
  Longitude: number;                              // Longitude coordinate of the camera
  Region: string;                                 // Geographic region of the camera
  StateRoute: string;                             // State route number
  Direction: string;                              // Direction the camera is facing
  CameraOwner: string;                            // Owner of the camera
  CameraStatus: string;                           // Status of the camera (Active, Inactive, etc.)
};
```

## Common Use Cases

### Use Case 1: Traffic Camera Dashboard
**Scenario**: Create a dashboard displaying live traffic camera feeds for monitoring road conditions
**Solution**: Use the `getCameras` function to fetch all cameras and display their images

```typescript
// Implementation example
const cameras = await wsdotHighwayCameras.getCameras();
// Display camera feeds in a dashboard with auto-refresh
```

### Use Case 2: Route-Specific Camera Monitoring
**Scenario**: Monitor traffic cameras along a specific highway route (e.g., I-5)
**Solution**: Use the `searchCameras` function to filter cameras by route

```typescript
// Implementation example
const routeCameras = await wsdotHighwayCameras.searchCameras({ stateRoute: "005" });
// Monitor I-5 cameras for traffic conditions
```

## Performance & Caching

This API uses the **MINUTE_UPDATES** caching strategy. For detailed information about caching configuration, performance optimization, and advanced caching options, see the [Performance & Caching](../API-REFERENCE.md#performance--caching) section in the API Reference.

| Caching Aspect | Configuration | Description |
|----------------|---------------|-------------|
| **Stale Time** | 5 minutes | Data considered fresh for 5 minutes |
| **Refetch Interval** | 5 minutes | Automatically refetch data every 5 minutes |
| **GC Time** | 10 minutes | Keep unused data in cache for 10 minutes |
| **Retry** | 3 attempts | Retry failed requests up to 3 times |

## Common Patterns

For information about data transformation, error handling, caching strategies, and other common patterns, see the [API Reference](../API-REFERENCE.md) documentation.

## References

- **[Error Handling](../API-REFERENCE.md#error-handling)** - Comprehensive error handling patterns
- **[Data Transformation](../API-REFERENCE.md#data-transformation)** - Automatic data conversion and filtering
- **[React Hooks](../API-REFERENCE.md#react-hooks)** - Complete React integration guide
- **[Performance & Caching](../API-REFERENCE.md#performance--caching)** - Advanced caching configuration
- **[Testing Status](../API-REFERENCE.md#testing-status)** - E2E test completion and validation status
- **[API Compliance](../API-REFERENCE.md#api-compliance)** - WSDOT API alignment verification 