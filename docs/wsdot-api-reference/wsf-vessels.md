# WSF Vessels API

## Overview

The WSF Vessels API provides comprehensive information about Washington State Ferries vessels, including vessel details, real-time locations, accommodations, and operational status. This API delivers data for ferry fleet management, passenger information, and vessel tracking across the WSF system.

## Base URL

```
https://wsdot.wa.gov/Ferries/API/Vessels/rest
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/vesselbasics` | GET | Retrieve basic details for all vessels | `apiaccesscode` |
| `/vesselbasics/{VesselID}` | GET | Retrieve basic details for specific vessel | `apiaccesscode`, `VesselID` |
| `/vessellocations` | GET | Retrieve real-time locations for all vessels | `apiaccesscode` |
| `/vessellocations/{VesselID}` | GET | Retrieve real-time location for specific vessel | `apiaccesscode`, `VesselID` |
| `/vesselaccommodations` | GET | Retrieve accommodation details for all vessels | `apiaccesscode` |
| `/vesselaccommodations/{VesselID}` | GET | Retrieve accommodation details for specific vessel | `apiaccesscode`, `VesselID` |
| `/vesselhistory` | GET | Retrieve vessel history for all vessels | `apiaccesscode` |
| `/vesselhistory/{VesselName}/{DateStart}/{DateEnd}` | GET | Retrieve vessel history for specific vessel and date range | `apiaccesscode`, `VesselName`, `DateStart`, `DateEnd` |
| `/vesselstats` | GET | Retrieve vessel statistics | `apiaccesscode` |
| `/cacheflushdate` | GET | Retrieve cache flush date for vessels data | `apiaccesscode` |

## Quick Start

```bash
# Get basic details for all vessels
curl "https://wsdot.wa.gov/Ferries/API/Vessels/rest/vesselbasics?apiaccesscode=$WSDOT_ACCESS_CODE"

# Get real-time locations for all vessels
curl "https://wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations?apiaccesscode=$WSDOT_ACCESS_CODE"

# Get accommodation details for all vessels
curl "https://wsdot.wa.gov/Ferries/API/Vessels/rest/vesselaccommodations?apiaccesscode=$WSDOT_ACCESS_CODE"

# Get specific vessel by ID
curl "https://wsdot.wa.gov/Ferries/API/Vessels/rest/vesselbasics/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

## Official Documentation

- [WSF Vessels API Help](https://wsdot.wa.gov/ferries/api/vessels/rest/help)

## Endpoints

### Get All Vessel Basics

**Endpoint:** `/vesselbasics`  
**Method:** GET  
**Description:** Retrieve basic details for all WSF vessels

**URL:** `https://wsdot.wa.gov/Ferries/API/Vessels/rest/vesselbasics`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Vessels/rest/vesselbasics?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `VesselBasic` objects

### Get Vessel Basics by ID

**Endpoint:** `/vesselbasics/{VesselID}`  
**Method:** GET  
**Description:** Retrieve basic details for a specific vessel

**URL:** `https://wsdot.wa.gov/Ferries/API/Vessels/rest/vesselbasics/{VesselID}`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |
| `VesselID` | number | Yes | Unique identifier for the vessel |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Vessels/rest/vesselbasics/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Single `VesselBasic` object

### Get All Vessel Locations

**Endpoint:** `/vessellocations`  
**Method:** GET  
**Description:** Retrieve real-time location data for all vessels

**URL:** `https://wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `VesselLocation` objects

### Get Vessel Location by ID

**Endpoint:** `/vessellocations/{VesselID}`  
**Method:** GET  
**Description:** Retrieve real-time location data for a specific vessel

**URL:** `https://wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations/{VesselID}`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |
| `VesselID` | number | Yes | Unique identifier for the vessel |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Single `VesselLocation` object

### Get All Vessel Accommodations

**Endpoint:** `/vesselaccommodations`  
**Method:** GET  
**Description:** Retrieve accommodation details for all vessels

**URL:** `https://wsdot.wa.gov/Ferries/API/Vessels/rest/vesselaccommodations`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Vessels/rest/vesselaccommodations?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `VesselAccommodation` objects

### Get Vessel Accommodations by ID

**Endpoint:** `/vesselaccommodations/{VesselID}`  
**Method:** GET  
**Description:** Retrieve accommodation details for a specific vessel

**URL:** `https://wsdot.wa.gov/Ferries/API/Vessels/rest/vesselaccommodations/{VesselID}`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |
| `VesselID` | number | Yes | Unique identifier for the vessel |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Vessels/rest/vesselaccommodations/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Single `VesselAccommodation` object

## TypeScript Types

```typescript
type VesselClass = {
  ClassID: number;
  ClassSubjectID: number;
  ClassName: string;
  SortSeq: number;
  DrawingImg: string;
  SilhouetteImg: string;
  PublicDisplayName: string;
};

type VesselBasic = {
  VesselID: number;
  VesselSubjectID: number;
  VesselName: string;
  VesselAbbrev: string;
  Class: VesselClass;
  Status: number;
  OwnedByWSF: boolean;
};

type VesselLocation = {
  VesselID: number;
  VesselName: string;
  Mmsi: number;
  DepartingTerminalID: number;
  DepartingTerminalName: string;
  DepartingTerminalAbbrev: string;
  ArrivingTerminalID: number;
  ArrivingTerminalName: string;
  ArrivingTerminalAbbrev: string;
  Latitude: number;
  Longitude: number;
  Speed: number;
  Heading: number;
  InService: boolean;
  AtDock: boolean;
  LeftDock: string | null; // "/Date(timestamp-timezone)/" format
  Eta: string | null; // "/Date(timestamp-timezone)/" format
  EtaBasis: string | null;
  ScheduledDeparture: string; // "/Date(timestamp-timezone)/" format
  OpRouteAbbrev: string[];
  VesselPositionNum: number;
  SortSeq: number;
  ManagedBy: number;
  TimeStamp: string; // "/Date(timestamp-timezone)/" format
  VesselWatchShutID: number;
  VesselWatchShutMsg: string;
  VesselWatchShutFlag: string;
};

type VesselAccommodation = {
  VesselID: number;
  VesselSubjectID: number;
  VesselName: string;
  VesselAbbrev: string;
  Class: VesselClass;
  CarDeckRestroom: boolean;
  CarDeckShelter: boolean;
  Elevator: boolean;
  ADAAccessible: boolean;
  MainCabinGalley: boolean;
  MainCabinRestroom: boolean;
  PublicWifi: boolean;
  ADAInfo: string;
  AdditionalInfo: string;
};
```

## Example Responses

### Vessel Basic Example
```json
{
  "VesselID": 1,
  "VesselSubjectID": 1,
  "VesselName": "Cathlamet",
  "VesselAbbrev": "CAT",
  "Class": {
    "ClassID": 10,
    "ClassSubjectID": 310,
    "ClassName": "Issaquah 130",
    "SortSeq": 40,
    "DrawingImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130.gif",
    "SilhouetteImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130-sillouette_sml.gif",
    "PublicDisplayName": "Issaquah"
  },
  "Status": 1,
  "OwnedByWSF": true
}
```

### Vessel Location Example
```json
{
  "VesselID": 38,
  "VesselName": "Yakima",
  "Mmsi": 366772750,
  "DepartingTerminalID": 1,
  "DepartingTerminalName": "Anacortes",
  "DepartingTerminalAbbrev": "ANA",
  "ArrivingTerminalID": 10,
  "ArrivingTerminalName": "Friday Harbor",
  "ArrivingTerminalAbbrev": "FRH",
  "Latitude": 48.50682,
  "Longitude": -122.676467,
  "Speed": 0,
  "Heading": 247,
  "InService": true,
  "AtDock": true,
  "LeftDock": null,
  "Eta": null,
  "EtaBasis": null,
  "ScheduledDeparture": "/Date(1752203400000-0700)/",
  "OpRouteAbbrev": ["ana-sj"],
  "VesselPositionNum": 1,
  "SortSeq": 20,
  "ManagedBy": 1,
  "TimeStamp": "/Date(1752177066000-0700)/",
  "VesselWatchShutID": 3,
  "VesselWatchShutMsg": "VesselWatch data temporarily unavailable.\n",
  "VesselWatchShutFlag": "1"
}
```

### Vessel Accommodation Example
```json
{
  "VesselID": 1,
  "VesselSubjectID": 1,
  "VesselName": "Cathlamet",
  "VesselAbbrev": "CAT",
  "Class": {
    "ClassID": 10,
    "ClassSubjectID": 310,
    "ClassName": "Issaquah 130",
    "SortSeq": 40,
    "DrawingImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130.gif",
    "SilhouetteImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130-sillouette_sml.gif",
    "PublicDisplayName": "Issaquah"
  },
  "CarDeckRestroom": true,
  "CarDeckShelter": false,
  "Elevator": true,
  "ADAAccessible": true,
  "MainCabinGalley": true,
  "MainCabinRestroom": true,
  "PublicWifi": false,
  "ADAInfo": "The MV Cathlamet has elevator access from the auto deck to the passenger deck. Notify a ticket seller if you are traveling by car and need to park near an elevator. The vessel has accessible restrooms located on both the main passenger deck and the auto deck. The main passenger deck also has vending and newspaper machines, and a galley. This vessel is equipped with our visual paging system. ",
  "AdditionalInfo": " "
}
```

## Update Frequency

- **Real-time**: Vessel locations are updated continuously as vessels move
- **Location Data**: Updated every few minutes during active operations
- **Basic Information**: Updated when vessel details change (infrequent)
- **Accommodation Data**: Updated when vessel features change (infrequent)
- **Status Updates**: Updated in real-time as vessels enter/leave service

## Common Use Cases

- **Vessel Tracking**: Real-time location monitoring for ferry tracking
- **Passenger Information**: Display vessel details and accommodations
- **Fleet Management**: Monitor vessel status and operational information
- **Travel Planning**: Check vessel availability and routes
- **Accessibility Information**: Provide ADA and accommodation details
- **Emergency Response**: Real-time vessel location for emergency coordination
- **Route Optimization**: Use vessel location data for route planning

## Data Notes

- **Vessel IDs**: Unique numeric identifiers for each vessel
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84)
- **Speed**: Vessel speed in appropriate units
- **Heading**: Vessel direction in degrees (0-360)
- **Terminal IDs**: References to WSF terminal system
- **Date Format**: Times are returned in Microsoft .NET JSON date format (`/Date(timestamp-timezone)/`)
- **MMSI**: Maritime Mobile Service Identity for vessel identification
- **Route Abbreviations**: Short codes for operational routes
- **Status Codes**: Numeric status indicators for vessel state
- **ADA Information**: Detailed accessibility information for each vessel
- **Class Information**: Vessel class details with images and descriptions

## JSONP Support

All endpoints support JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/Ferries/API/Vessels/rest/vesselbasics?apiaccesscode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

- **No Data**: Ensure the access code is valid and API is accessible
- **Vessel IDs**: Use valid vessel IDs from the vessel basics endpoint
- **Location Data**: Some vessels may not have current location data if not in service
- **Date Formats**: All dates use Microsoft .NET JSON format
- **Terminal References**: Terminal IDs correspond to WSF terminal system
- **Status Codes**: Check status field for vessel operational state
- **Route Information**: Route abbreviations may be empty for vessels not on active routes
- **ADA Information**: Detailed accessibility information available for each vessel 