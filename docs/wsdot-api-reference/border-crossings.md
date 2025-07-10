# Border Crossings API

## Overview

The Border Crossings API provides real-time information about wait times at Washington State border crossings with Canada. This API returns estimated wait times and location information for major border crossing points.

## Quick Start

1. **Get Access Code**: Register at https://wsdot.wa.gov/traffic/api/
2. **Set Environment Variable**: `export WSDOT_ACCESS_CODE="your_code"`
3. **Test API**: `curl "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson?AccessCode=$WSDOT_ACCESS_CODE"`

## Base URL

```
https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `GetBorderCrossingsAsJson` | GET | Retrieve all border crossing wait times | `AccessCode` |
| `GetBorderCrossingAsJson` | GET | Retrieve a specific border crossing by ID | `AccessCode`, `BorderCrossingID` |

## Official Documentation

- **WSDOT Traveler Information API**: https://wsdot.wa.gov/traffic/api/
- **Border Crossings Documentation**: https://wsdot.wa.gov/traffic/api/Documentation/group%5F%5F%5Fborder%5Fcrossings.html
- **Border Crossings REST Help**: https://wsdot.wa.gov/traffic/api/BorderCrossings/BorderCrossingsREST.svc/Help

## Update Frequency

- **Real-time**: Data updates every 5-15 minutes depending on border crossing activity

## Available Endpoints

### GetBorderCrossingsAsJson

Returns estimated Border Crossing wait times as JSON data.

**URL**: `https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson?AccessCode={ACCESSCODE}`

**Method**: `GET`

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | `string` | ✅ Required | WSDOT Traveler Information API access code |

**cURL Example**:
```bash
curl "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

**Response Data Structure**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `BorderCrossingLocation` | `object` | - | Location information for the border crossing |
| `BorderCrossingLocation.Description` | `string` | - | Human-readable description of the crossing location |
| `BorderCrossingLocation.Direction` | `string` | Can be null | Direction of travel (e.g., "Northbound", "Southbound") |
| `BorderCrossingLocation.Latitude` | `number` | -90 to 90 | Latitude coordinate of the crossing |
| `BorderCrossingLocation.Longitude` | `number` | -180 to 180 | Longitude coordinate of the crossing |
| `BorderCrossingLocation.MilePost` | `number` | 0+ | Milepost marker on the highway |
| `BorderCrossingLocation.RoadName` | `string` | - | Name of the road/highway at the crossing |
| `CrossingName` | `string` | - | Name of the border crossing |
| `Time` | `string` | WSDOT format | Timestamp of the wait time data (WSDOT date format: `/Date(timestamp)/`) |
| `WaitTime` | `number` | 0-999 | Estimated wait time in minutes |

**Example Response** (real API data):
```json
[
  {
    "BorderCrossingLocation": {
      "Description": "I-5 General Purpose",
      "Direction": null,
      "Latitude": 49.004776,
      "Longitude": -122.756964,
      "MilePost": 0,
      "RoadName": "005"
    },
    "CrossingName": "I5",
    "Time": "/Date(1752174600000-0700)/",
    "WaitTime": 20
  },
  ...
]
```

## JSONP Support

The endpoint supports JSONP responses. Add a `callback` parameter to specify the callback function name:

**JSONP Example**:
```bash
curl "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson?AccessCode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Common Use Cases

- **Real-time Border Wait Times**: Get current wait times for planning trips
- **Multiple Crossing Comparison**: Compare wait times across different border crossings
- **Historical Analysis**: Track wait time patterns over time

## Data Notes

- **Update Frequency**: Data refreshes every 5-15 minutes
- **Data Source**: WSDOT border crossing monitoring systems
- **Accuracy**: Wait times are estimates and may vary
- **Coverage**: Major Washington-Canada border crossings only

## TypeScript Types

```typescript
type BorderCrossingLocation = {
  Description: string;
  Direction: string | null;
  Latitude: number;
  Longitude: number;
  MilePost: number;
  RoadName: string;
};

type BorderCrossingData = {
  BorderCrossingLocation: BorderCrossingLocation | null;
  CrossingName: string;
  Time: string; // WSDOT date format: "/Date(timestamp)/"
  WaitTime: number;
};

type BorderCrossingsResponse = BorderCrossingData[];
```

## Notes

- **Date Format**: The API returns dates in WSDOT's custom format: `/Date(timestamp)/` where timestamp is milliseconds since epoch
- **Wait Time Units**: Wait times are provided in minutes
- **Real-time Data**: Data is updated frequently but may have delays of 5-15 minutes
- **Border Crossings Covered**: Includes major crossings like Peace Arch, Pacific Highway, and others
- **Directional Data**: Each crossing provides separate data for northbound and southbound traffic
- **Example Data**: The example response above shows real API data from the WSDOT Border Crossings API 