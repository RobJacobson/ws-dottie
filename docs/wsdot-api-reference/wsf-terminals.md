# WSF Terminals API

## Overview

The WSF Terminals API provides comprehensive information about Washington State Ferries terminals, including terminal details, locations, sailing space availability, bulletins, and transportation options. This API delivers data for terminal management, passenger information, and ferry system operations across the WSF network.

## Base URL

```
https://wsdot.wa.gov/Ferries/API/Terminals/rest
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/terminalbasics` | GET | Retrieve basic details for all terminals | `apiaccesscode` |
| `/terminalbasics/{TerminalID}` | GET | Retrieve basic details for specific terminal | `apiaccesscode`, `TerminalID` |
| `/terminallocations` | GET | Retrieve location details for all terminals | `apiaccesscode` |
| `/terminallocations/{TerminalID}` | GET | Retrieve location details for specific terminal | `apiaccesscode`, `TerminalID` |
| `/terminalsailingspace` | GET | Retrieve sailing space availability for all terminals | `apiaccesscode` |
| `/terminalsailingspace/{TerminalID}` | GET | Retrieve sailing space availability for specific terminal | `apiaccesscode`, `TerminalID` |
| `/terminalbulletins` | GET | Retrieve bulletins for all terminals | `apiaccesscode` |
| `/terminalbulletins/{TerminalID}` | GET | Retrieve bulletins for specific terminal | `apiaccesscode`, `TerminalID` |
| `/terminaltransports` | GET | Retrieve transportation options for all terminals | `apiaccesscode` |
| `/cacheflushdate` | GET | Retrieve cache flush date for terminals data | `apiaccesscode` |

## Quick Start

```bash
# Get basic details for all terminals
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbasics?apiaccesscode=$WSDOT_ACCESS_CODE"

# Get location details for all terminals
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminallocations?apiaccesscode=$WSDOT_ACCESS_CODE"

# Get sailing space availability for all terminals
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalsailingspace?apiaccesscode=$WSDOT_ACCESS_CODE"

# Get specific terminal by ID
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbasics/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

## Official Documentation

- [WSF Terminals API Help](https://wsdot.wa.gov/ferries/api/terminals/rest/help)

## Endpoints

### Get All Terminal Basics

**Endpoint:** `/terminalbasics`  
**Method:** GET  
**Description:** Retrieve basic details for all WSF terminals

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbasics`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbasics?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `TerminalBasic` objects

### Get Terminal Basics by ID

**Endpoint:** `/terminalbasics/{TerminalID}`  
**Method:** GET  
**Description:** Retrieve basic details for a specific terminal

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbasics/{TerminalID}`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |
| `TerminalID` | number | Yes | Unique identifier for the terminal |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbasics/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Single `TerminalBasic` object

### Get All Terminal Locations

**Endpoint:** `/terminallocations`  
**Method:** GET  
**Description:** Retrieve location details for all terminals

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminallocations`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminallocations?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `TerminalLocation` objects

### Get Terminal Location by ID

**Endpoint:** `/terminallocations/{TerminalID}`  
**Method:** GET  
**Description:** Retrieve location details for a specific terminal

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminallocations/{TerminalID}`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |
| `TerminalID` | number | Yes | Unique identifier for the terminal |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminallocations/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Single `TerminalLocation` object

### Get All Terminal Sailing Space

**Endpoint:** `/terminalsailingspace`  
**Method:** GET  
**Description:** Retrieve sailing space availability for all terminals

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalsailingspace`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalsailingspace?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `TerminalSailingSpace` objects

### Get Terminal Sailing Space by ID

**Endpoint:** `/terminalsailingspace/{TerminalID}`  
**Method:** GET  
**Description:** Retrieve sailing space availability for a specific terminal

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalsailingspace/{TerminalID}`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |
| `TerminalID` | number | Yes | Unique identifier for the terminal |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalsailingspace/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Single `TerminalSailingSpace` object

## TypeScript Types

```typescript
type TerminalBasic = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  OverheadPassengerLoading: boolean;
  Elevator: boolean;
  WaitingRoom: boolean;
  FoodService: boolean;
  Restroom: boolean;
};

type ZoomLocation = {
  ZoomLevel: number;
  Latitude: number;
  Longitude: number;
};

type TerminalLocation = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  Latitude: number;
  Longitude: number;
  AddressLineOne: string;
  AddressLineTwo: string | null;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  MapLink: string;
  Directions: string;
  DispGISZoomLoc: ZoomLocation[];
};

type SpaceForArrivalTerminal = {
  TerminalID: number;
  TerminalName: string;
  VesselID: number;
  VesselName: string;
  DisplayReservableSpace: boolean;
  ReservableSpaceCount: number | null;
  ReservableSpaceHexColor: string | null;
  DisplayDriveUpSpace: boolean;
  DriveUpSpaceCount: number;
  DriveUpSpaceHexColor: string;
  MaxSpaceCount: number;
  ArrivalTerminalIDs: number[];
};

type DepartingSpace = {
  Departure: string; // "/Date(timestamp-timezone)/" format
  IsCancelled: boolean;
  VesselID: number;
  VesselName: string;
  MaxSpaceCount: number;
  SpaceForArrivalTerminals: SpaceForArrivalTerminal[];
};

type TerminalSailingSpace = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  DepartingSpaces: DepartingSpace[];
};
```

## Example Responses

### Terminal Basic Example
```json
{
  "TerminalID": 1,
  "TerminalSubjectID": 111,
  "RegionID": 1,
  "TerminalName": "Anacortes",
  "TerminalAbbrev": "ANA",
  "SortSeq": 10,
  "OverheadPassengerLoading": true,
  "Elevator": false,
  "WaitingRoom": true,
  "FoodService": true,
  "Restroom": true
}
```

### Terminal Location Example
```json
{
  "TerminalID": 1,
  "TerminalSubjectID": 111,
  "RegionID": 1,
  "TerminalName": "Anacortes",
  "TerminalAbbrev": "ANA",
  "SortSeq": 10,
  "Latitude": 48.507351,
  "Longitude": -122.677,
  "AddressLineOne": "2100 Ferry Terminal Road",
  "AddressLineTwo": null,
  "City": "Anacortes",
  "State": "WA",
  "ZipCode": "98221",
  "Country": "USA",
  "MapLink": "https://www.google.com/maps/place/Anacortes+Ferry+Terminal,+Anacortes,+WA+98221/@48.5060112,-122.6776819,15z/data=!4m2!3m1!1s0x5485790ea2748ed5:0x5c9a071494b5411f</p>",
  "Directions": "From Interstate 5 take exit 230 and follow SR 20 westbound to Anacortes. After arriving in Anacortes continue north on Commercial Ave. Turn left on 12th St, which becomes Oakes Ave, and then continue to the ferry terminal.<p>\r\n<b>Dropping off or picking up?</b><p>\r\nWhen approaching the ferry terminal to pick up or drop off and not disabled, follow Ferry Terminal Road to the left of the auto toll booths to the parking lot near the terminal. There should be parking near the sidewalk where the buses turn around for a quick pick up/drop off.</p>",
  "DispGISZoomLoc": [
    {
      "ZoomLevel": 0,
      "Latitude": 48.507351,
      "Longitude": -122.677
    },
    {
      "ZoomLevel": 1,
      "Latitude": 48.507351,
      "Longitude": -122.677
    }
  ]
}
```

### Terminal Sailing Space Example
```json
{
  "TerminalID": 1,
  "TerminalSubjectID": 111,
  "RegionID": 1,
  "TerminalName": "Anacortes",
  "TerminalAbbrev": "ANA",
  "SortSeq": 10,
  "DepartingSpaces": [
    {
      "Departure": "/Date(1752181200000-0700)/",
      "IsCancelled": false,
      "VesselID": 69,
      "VesselName": "Samish",
      "MaxSpaceCount": 141,
      "SpaceForArrivalTerminals": [
        {
          "TerminalID": 1,
          "TerminalName": "Anacortes -> Friday Harbor",
          "VesselID": 69,
          "VesselName": "Samish",
          "DisplayReservableSpace": false,
          "ReservableSpaceCount": null,
          "ReservableSpaceHexColor": null,
          "DisplayDriveUpSpace": true,
          "DriveUpSpaceCount": 0,
          "DriveUpSpaceHexColor": "#FF0000",
          "MaxSpaceCount": 141,
          "ArrivalTerminalIDs": [10]
        }
      ]
    }
  ]
}
```

## Update Frequency

- **Real-time**: Sailing space availability is updated continuously
- **Location Data**: Updated when terminal information changes (infrequent)
- **Basic Information**: Updated when terminal features change (infrequent)
- **Space Availability**: Updated every few minutes during active operations
- **Bulletins**: Updated as new terminal announcements are posted

## Common Use Cases

- **Terminal Information**: Display terminal details and amenities
- **Space Availability**: Check current sailing space for vehicles
- **Location Services**: Provide directions and maps to terminals
- **Passenger Planning**: Help passengers plan their terminal arrival
- **Fleet Management**: Monitor terminal operations and capacity
- **Emergency Response**: Real-time terminal status for emergency coordination
- **Route Planning**: Use terminal locations for travel planning

## Data Notes

- **Terminal IDs**: Unique numeric identifiers for each terminal
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84)
- **Space Counts**: Vehicle capacity information for each sailing
- **Color Coding**: Hex colors indicate space availability levels
- **Date Format**: Times are returned in Microsoft .NET JSON date format (`/Date(timestamp-timezone)/`)
- **Address Information**: Complete address details for each terminal
- **Directions**: Detailed driving directions to each terminal
- **Amenities**: Boolean flags for terminal features (elevator, food service, etc.)
- **Region IDs**: Geographic region grouping for terminals
- **Zoom Levels**: Multiple zoom levels for GIS display applications

## JSONP Support

All endpoints support JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbasics?apiaccesscode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

- **No Data**: Ensure the access code is valid and API is accessible
- **Terminal IDs**: Use valid terminal IDs from the terminal basics endpoint
- **Space Data**: Some terminals may not have current space data if not active
- **Date Formats**: All dates use Microsoft .NET JSON format
- **Color Codes**: Red typically indicates no space, green indicates available space
- **Location Data**: Coordinates are in decimal degrees (WGS84 format)
- **Address Information**: Complete address details available for each terminal
- **Directions**: HTML-formatted directions with driving instructions
- **Amenities**: Check boolean flags for terminal features and accessibility 