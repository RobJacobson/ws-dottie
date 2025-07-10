# WSDOT Highway Cameras API

## Overview

The WSDOT Highway Cameras API provides access to real-time traffic camera images and metadata from Washington State Department of Transportation cameras. This API delivers live camera feeds, location information, and camera details for traffic monitoring and public information.

## Base URL

```
https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `GetCamerasAsJson` | GET | Retrieve all available traffic cameras | `AccessCode` |
| `GetCameraAsJson` | GET | Retrieve a specific camera by ID | `AccessCode`, `CameraID` |
| `SearchCamerasAsJson` | GET | Search cameras by route, region, and milepost | `AccessCode`, `StateRoute`*, `Region`*, `StartingMilepost`*, `EndingMilepost`* |

*Optional parameters

## Quick Start

```bash
# Get all cameras
curl "https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson?AccessCode=$WSDOT_ACCESS_CODE"

# Get a specific camera by ID
curl "https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson?AccessCode=$WSDOT_ACCESS_CODE&CameraID=9818"

# Search cameras by route and region
curl "https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson?AccessCode=$WSDOT_ACCESS_CODE&StateRoute=005&Region=Northwest"
```

## Official Documentation

- [WSDOT Highway Cameras API Help](https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help)

## Endpoints

### Get All Cameras

**Endpoint:** `GetCamerasAsJson`  
**Method:** GET  
**Description:** Retrieve all available traffic cameras in JSON format

**URL:** `https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `Camera` objects

### Get Camera by ID

**Endpoint:** `GetCameraAsJson`  
**Method:** GET  
**Description:** Retrieve a specific traffic camera by its ID

**URL:** `https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |
| `CameraID` | number | Yes | Unique identifier for the camera |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson?AccessCode=$WSDOT_ACCESS_CODE&CameraID=9818"
```

**Response:** Single `Camera` object

### Search Cameras

**Endpoint:** `SearchCamerasAsJson`  
**Method:** GET  
**Description:** Search for cameras by route, region, and milepost range

**URL:** `https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |
| `StateRoute` | string | No | State route number (e.g., "005" for I-5) |
| `Region` | string | No | Geographic region filter |
| `StartingMilepost` | number | No | Starting milepost for range search |
| `EndingMilepost` | number | No | Ending milepost for range search |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson?AccessCode=$WSDOT_ACCESS_CODE&StateRoute=005&Region=Northwest"
```

**Response:** Array of `Camera` objects

## TypeScript Types

```typescript
type CameraLocation = {
  Description: string | null;
  Direction: string | null;
  Latitude: number | null;
  Longitude: number | null;
  MilePost: number | null;
  RoadName: string | null;
};

type Camera = {
  CameraID: number;
  CameraLocation: CameraLocation | null;
  CameraOwner: string | null;
  Description: string | null;
  DisplayLatitude: number;
  DisplayLongitude: number;
  ImageHeight: number;
  ImageURL: string | null;
  ImageWidth: number;
  IsActive: boolean;
  OwnerURL: string | null;
  Region: string | null;
  SortOrder: number;
  Title: string | null;
};
```

## Example Response

```json
{
  "CameraID": 9818,
  "CameraLocation": {
    "Description": null,
    "Direction": "W",
    "Latitude": 48.498333,
    "Longitude": -122.6625,
    "MilePost": 1,
    "RoadName": "Airports"
  },
  "CameraOwner": "WSDOT Aviation",
  "Description": null,
  "DisplayLatitude": 48.498333,
  "DisplayLongitude": -122.6625,
  "ImageHeight": 208,
  "ImageURL": "https://images.wsdot.wa.gov/airports/anafuel.jpg",
  "ImageWidth": 352,
  "IsActive": true,
  "OwnerURL": "https://wsdot.wa.gov/travel/aviation/airports-list/anacortes",
  "Region": "WA",
  "SortOrder": 5300,
  "Title": "Anacortes Airport Fuel Pump"
}
```

## Update Frequency

- **Image Updates**: Camera images are typically updated every 1-5 minutes
- **Metadata Updates**: Camera information is updated as needed when cameras are added, removed, or modified
- **Real-time**: Image URLs provide live camera feeds when accessed directly

## Common Use Cases

- **Traffic Monitoring**: Real-time traffic condition monitoring
- **Navigation Apps**: Visual traffic information for route planning
- **Public Information**: Displaying current road conditions to the public
- **Emergency Response**: Quick visual assessment of road conditions
- **Traffic Management**: Integration into traffic management systems

## Data Notes

- **Image URLs**: Direct links to live camera images (JPG format)
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84)
- **Mile Posts**: Highway milepost markers for precise location
- **Camera Owners**: Various entities including WSDOT, cities, and other agencies
- **Regions**: Geographic regions for camera organization
- **Active Status**: `IsActive` indicates if camera is currently operational
- **Image Dimensions**: `ImageWidth` and `ImageHeight` in pixels
- **Sort Order**: Numeric value for display ordering

## JSONP Support

All endpoints support JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson?AccessCode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

- **No Images**: Check if camera is active (`IsActive: true`)
- **Invalid Camera ID**: Verify camera ID exists in the system
- **Image Loading**: Some cameras may be temporarily offline
- **Search Parameters**: Use valid route numbers and region names
- **CORS Issues**: Image URLs may have CORS restrictions for web applications 