# WSDOT Highway Alerts API

## Overview

The WSDOT Highway Alerts API provides real-time traffic alert information for Washington State highways. This API delivers current traffic alerts, construction updates, maintenance activities, and other roadway events that may affect travel.

## Base URL

```
https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `GetAlertsAsJson` | GET | Retrieve all current traffic alerts | `AccessCode` |
| `GetAlertAsJson` | GET | Retrieve a specific alert by ID | `AccessCode`, `AlertID` |
| `GetAlertsByMapAreaAsJson` | GET | Retrieve alerts filtered by geographic area | `AccessCode`, `MapArea` |

## Quick Start

```bash
# Get all current alerts
curl "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode=$WSDOT_ACCESS_CODE"

# Get a specific alert by ID
curl "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertAsJson?AccessCode=$WSDOT_ACCESS_CODE&AlertID=655238"

# Get alerts by map area
curl "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByMapAreaAsJson?AccessCode=$WSDOT_ACCESS_CODE&MapArea=Northwest"
```

## Official Documentation

- [WSDOT Highway Alerts API Help](https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help)

## Endpoints

### Get All Alerts

**Endpoint:** `GetAlertsAsJson`  
**Method:** GET  
**Description:** Retrieve all current traffic alerts in JSON format

**URL:** `https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `Alert` objects

### Get Alert by ID

**Endpoint:** `GetAlertAsJson`  
**Method:** GET  
**Description:** Retrieve a specific traffic alert by its ID

**URL:** `https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |
| `AlertID` | number | Yes | Unique identifier for the alert |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertAsJson?AccessCode=$WSDOT_ACCESS_CODE&AlertID=655238"
```

**Response:** Single `Alert` object

### Get Alerts by Map Area

**Endpoint:** `GetAlertsByMapAreaAsJson`  
**Method:** GET  
**Description:** Retrieve alerts filtered by geographic map area

**URL:** `https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByMapAreaAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |
| `MapArea` | string | Yes | Geographic area filter (e.g., "Northwest", "Olympic", "Southwest") |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByMapAreaAsJson?AccessCode=$WSDOT_ACCESS_CODE&MapArea=Northwest"
```

**Response:** Array of `Alert` objects

## TypeScript Types

```typescript
type RoadwayLocation = {
  Description: string | null;
  Direction: string | null;
  Latitude: number | null;
  Longitude: number | null;
  MilePost: number | null;
  RoadName: string | null;
};

type Alert = {
  AlertID: number;
  County: string | null;
  EndRoadwayLocation: RoadwayLocation | null;
  EndTime: string | null; // "/Date(timestamp-0700)/" format
  EventCategory: string | null;
  EventStatus: string | null;
  ExtendedDescription: string | null;
  HeadlineDescription: string | null;
  LastUpdatedTime: string | null; // "/Date(timestamp-0700)/" format
  Priority: string | null;
  Region: string | null;
  StartRoadwayLocation: RoadwayLocation | null;
  StartTime: string | null; // "/Date(timestamp-0700)/" format
};
```

## Example Response

```json
{
  "AlertID": 655238,
  "County": null,
  "EndRoadwayLocation": {
    "Description": null,
    "Direction": "E",
    "Latitude": 46.127115989,
    "Longitude": -122.97003685,
    "MilePost": 4.9,
    "RoadName": "432"
  },
  "EndTime": "/Date(1752274800000-0700)/",
  "EventCategory": "Maintenance",
  "EventStatus": "Open",
  "ExtendedDescription": "",
  "HeadlineDescription": "Wednesday, July 9 to Friday, July 11: Eastbound travelers along SR 432, between Weyerhaeuser Paper Company (milepost 4.4) and Douglas Street (milepost 4.9) will take turns moving through a single lane daily, from 9 a.m. to 4 p.m., for utility work.",
  "LastUpdatedTime": "/Date(1752096131250-0700)/",
  "Priority": "Medium",
  "Region": "Southwest",
  "StartRoadwayLocation": {
    "Description": null,
    "Direction": "E",
    "Latitude": 46.13194947,
    "Longitude": -122.977970939,
    "MilePost": 4.4,
    "RoadName": "432"
  },
  "StartTime": "/Date(1752062400000-0700)/"
}
```

## Update Frequency

- **Real-time**: Alerts are updated continuously as new events occur
- **Refresh Rate**: Recommended to poll every 5-15 minutes for real-time applications
- **Event Status**: Alerts remain active until manually closed or expired

## Common Use Cases

- **Traffic Management Systems**: Real-time traffic monitoring and alerting
- **Navigation Apps**: Route planning with current road conditions
- **Emergency Response**: Quick access to road closures and incidents
- **Travel Planning**: Pre-trip planning to avoid construction and delays
- **Public Information**: Displaying current road conditions to the public

## Data Notes

- **Date Format**: Times are returned in Microsoft .NET JSON date format (`/Date(timestamp-timezone)/`)
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84)
- **Mile Posts**: Highway milepost markers for precise location
- **Priority Levels**: Highest, High, Medium, Low, Lowest
- **Event Categories**: Construction, Maintenance, Closure, Collision, Weather, etc.
- **Regions**: Northwest, Olympic, Southwest, South Central, North Central, Eastern
- **Directions**: N (North), S (South), E (East), W (West), B (Both)

## JSONP Support

All endpoints support JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

- **No Data**: Check if there are active alerts in the requested area
- **Invalid Access Code**: Verify your WSDOT access code is valid and active
- **Map Area Values**: Common values include "Northwest", "Olympic", "Southwest", "South Central", "North Central", "Eastern"
- **Date Parsing**: Convert .NET date format to JavaScript Date objects for client-side processing 