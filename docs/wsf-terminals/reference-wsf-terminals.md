# WSF Terminals API

## Overview

The WSF Terminals API provides comprehensive information about Washington State Ferries terminals, including terminal details, locations, sailing space availability, bulletins, wait times, transportation options, and detailed terminal facilities. This API delivers data for terminal management, passenger information, and ferry system operations across the WSF network.

## Base URL

```
https://wsdot.wa.gov/Ferries/API/Terminals/rest
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/cacheflushdate` | GET | Retrieve cache flush date for terminals data | None |
| `/terminalbasics` | GET | Retrieve basic details for all terminals | `apiaccesscode` |
| `/terminalbasics/{TerminalID}` | GET | Retrieve basic details for specific terminal | `apiaccesscode`, `TerminalID` |
| `/terminallocations` | GET | Retrieve location details for all terminals | `apiaccesscode` |
| `/terminallocations/{TerminalID}` | GET | Retrieve location details for specific terminal | `apiaccesscode`, `TerminalID` |
| `/terminalsailingspace` | GET | Retrieve sailing space availability for all terminals | `apiaccesscode` |
| `/terminalsailingspace/{TerminalID}` | GET | Retrieve sailing space availability for specific terminal | `apiaccesscode`, `TerminalID` |
| `/terminalbulletins` | GET | Retrieve bulletins for all terminals | `apiaccesscode` |
| `/terminalbulletins/{TerminalID}` | GET | Retrieve bulletins for specific terminal | `apiaccesscode`, `TerminalID` |
| `/terminaltransports` | GET | Retrieve transportation options for all terminals | `apiaccesscode` |
| `/terminaltransports/{TerminalID}` | GET | Retrieve transportation options for specific terminal | `apiaccesscode`, `TerminalID` |
| `/terminalverbose` | GET | Retrieve detailed terminal facilities and amenities for all terminals | `apiaccesscode` |
| `/terminalverbose/{TerminalID}` | GET | Retrieve detailed terminal facilities and amenities for specific terminal | `apiaccesscode`, `TerminalID` |
| `/terminalwaittimes` | GET | Retrieve wait times and congestion data for all terminals | `apiaccesscode` |
| `/terminalwaittimes/{TerminalID}` | GET | Retrieve wait times and congestion data for specific terminal | `apiaccesscode`, `TerminalID` |

## Quick Start

```bash
# Get cache flush date for coordinating data caching
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/cacheflushdate"

# Get basic details for all terminals
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbasics?apiaccesscode=$WSDOT_ACCESS_CODE"

# Get location details for all terminals
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminallocations?apiaccesscode=$WSDOT_ACCESS_CODE"

# Get sailing space availability for all terminals
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalsailingspace?apiaccesscode=$WSDOT_ACCESS_CODE"

# Get wait times for all terminals
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalwaittimes?apiaccesscode=$WSDOT_ACCESS_CODE"

# Get detailed terminal information for all terminals
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalverbose?apiaccesscode=$WSDOT_ACCESS_CODE"

# Get transportation options for all terminals
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminaltransports?apiaccesscode=$WSDOT_ACCESS_CODE"

# Get specific terminal by ID
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbasics/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

## Official Documentation

- [WSF Terminals API Help](https://wsdot.wa.gov/ferries/api/terminals/rest/help)
- [WSF Terminals REST Documentation](https://www.wsdot.wa.gov/ferries/api/terminals/documentation/rest.html)

## Caching Strategy

The WSF Terminals API provides a `/cacheflushdate` endpoint to help coordinate data caching. Some operations return data that changes infrequently and can be cached in your application. When the date returned from `/cacheflushdate` is modified, you should drop your application cache and retrieve fresh data.

**Cacheable Operations:**
- `/terminalbasics` and `/terminalbasics/{TerminalID}`
- `/terminalbulletins` and `/terminalbulletins/{TerminalID}`
- `/terminallocations` and `/terminallocations/{TerminalID}`
- `/terminaltransports` and `/terminaltransports/{TerminalID}`
- `/terminalverbose` and `/terminalverbose/{TerminalID}`
- `/terminalwaittimes` and `/terminalwaittimes/{TerminalID}`

**Non-Cacheable Operations:**
- `/terminalsailingspace` and `/terminalsailingspace/{TerminalID}` - Data changes very frequently (potentially every 5 seconds)

## Endpoints

### Get Cache Flush Date

**Endpoint:** `/cacheflushdate`  
**Method:** GET  
**Description:** Retrieve cache flush date for coordinating data caching

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/cacheflushdate`

**Parameters:** None required

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/cacheflushdate"
```

**Response:** Single `TerminalsCacheFlushDate` object

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

**Response:** Array of `TerminalBasics` objects

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

**Response:** Single `TerminalBasics` object

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

**Note:** This data changes very frequently (potentially every 5 seconds). Do not cache results for an extended period of time.

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

**Note:** This data changes very frequently (potentially every 5 seconds). Do not cache results for an extended period of time.

### Get All Terminal Bulletins

**Endpoint:** `/terminalbulletins`  
**Method:** GET  
**Description:** Retrieve bulletins for all terminals

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbulletins`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbulletins?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `TerminalBulletin` objects

### Get Terminal Bulletins by ID

**Endpoint:** `/terminalbulletins/{TerminalID}`  
**Method:** GET  
**Description:** Retrieve bulletins for a specific terminal

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbulletins/{TerminalID}`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |
| `TerminalID` | number | Yes | Unique identifier for the terminal |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbulletins/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `TerminalBulletin` objects

### Get All Terminal Transports

**Endpoint:** `/terminaltransports`  
**Method:** GET  
**Description:** Retrieve transportation options for all terminals

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminaltransports`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminaltransports?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `TerminalTransport` objects

### Get Terminal Transports by ID

**Endpoint:** `/terminaltransports/{TerminalID}`  
**Method:** GET  
**Description:** Retrieve transportation options for a specific terminal

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminaltransports/{TerminalID}`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |
| `TerminalID` | number | Yes | Unique identifier for the terminal |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminaltransports/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `TerminalTransport` objects

### Get All Terminal Verbose

**Endpoint:** `/terminalverbose`  
**Method:** GET  
**Description:** Retrieve detailed terminal facilities and amenities for all terminals

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalverbose`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalverbose?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `TerminalVerbose` objects

**Note:** This operation retrieves highly detailed information and should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. The results include and expand on what's available through other terminal operations.

### Get Terminal Verbose by ID

**Endpoint:** `/terminalverbose/{TerminalID}`  
**Method:** GET  
**Description:** Retrieve detailed terminal facilities and amenities for a specific terminal

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalverbose/{TerminalID}`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |
| `TerminalID` | number | Yes | Unique identifier for the terminal |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalverbose/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Single `TerminalVerbose` object

**Note:** This operation retrieves highly detailed information and should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. The results include and expand on what's available through other terminal operations.

### Get All Terminal Wait Times

**Endpoint:** `/terminalwaittimes`  
**Method:** GET  
**Description:** Retrieve wait times and congestion data for all terminals

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalwaittimes`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalwaittimes?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `TerminalWaitTimes` objects

### Get Terminal Wait Times by ID

**Endpoint:** `/terminalwaittimes/{TerminalID}`  
**Method:** GET  
**Description:** Retrieve wait times and congestion data for a specific terminal

**URL:** `https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalwaittimes/{TerminalID}`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiaccesscode` | string | Yes | WSF API access code |
| `TerminalID` | number | Yes | Unique identifier for the terminal |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalwaittimes/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

**Response:** Single `TerminalWaitTimes` object

## TypeScript Types

```typescript
type TerminalBasics = {
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

type TerminalBulletinItem = {
  BulletinTitle: string;
  BulletinText: string;
  BulletinSortSeq: number;
  BulletinLastUpdated?: Date;
  BulletinLastUpdatedSortable?: string;
};

type TerminalBulletin = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  Bulletins: TerminalBulletinItem[];
};

type TerminalLocation = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  AddressLineOne: string;
  AddressLineTwo: string | null;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  Latitude: number;
  Longitude: number;
  Directions: string | null;
  DispGISZoomLoc: Array<{
    Latitude: number;
    Longitude: number;
    ZoomLevel: number;
  }>;
  MapLink: string | null;
};

type TerminalArrivalSpace = {
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

type TerminalDepartingSpace = {
  Departure: Date;
  IsCancelled: boolean;
  VesselID: number;
  VesselName: string;
  MaxSpaceCount: number;
  SpaceForArrivalTerminals: TerminalArrivalSpace[];
};

type TerminalSailingSpace = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  DepartingSpaces: TerminalDepartingSpace[];
  IsNoFareCollected: boolean | null;
  NoFareCollectedMsg: string | null;
};

type TerminalTransitLink = {
  LinkName: string;
  LinkURL: string;
  SortSeq: number | null;
};

type TerminalTransport = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  ParkingInfo: string;
  ParkingShuttleInfo: string | null;
  AirportInfo: string;
  AirportShuttleInfo: string;
  MotorcycleInfo: string;
  TruckInfo: string;
  BikeInfo: string;
  TrainInfo: string | null;
  TaxiInfo: string | null;
  HovInfo: string | null;
  TransitLinks: TerminalTransitLink[];
};

type TerminalWaitTime = {
  RouteID: number;
  RouteName: string;
  WaitTimeIvrNotes: string | null;
  WaitTimeLastUpdated: Date;
  WaitTimeNotes: string | null;
};

type TerminalWaitTimes = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  WaitTimes: TerminalWaitTime[];
};



type TerminalVerbose = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  AddressLineOne: string;
  AddressLineTwo: string | null;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  Latitude: number;
  Longitude: number;
  Directions: string | null;
  DispGISZoomLoc: Array<{
    Latitude: number;
    Longitude: number;
    ZoomLevel: number;
  }>;
  MapLink: string | null;
  Elevator: boolean;
  WaitingRoom: boolean;
  FoodService: boolean;
  Restroom: boolean;
  OverheadPassengerLoading: boolean;
  IsNoFareCollected: boolean | null;
  NoFareCollectedMsg: string | null;
  AdaInfo: string | null;
  AdditionalInfo: string | null;
  AirportInfo: string | null;
  AirportShuttleInfo: string | null;
  BikeInfo: string | null;
  ChamberOfCommerce: string | null;
  ConstructionInfo: string | null;
  FacInfo: string | null;
  FareDiscountInfo: string | null;
  FoodServiceInfo: string | null;
  HovInfo: string | null;
  LostAndFoundInfo: string | null;
  MotorcycleInfo: string | null;
  ParkingInfo: string | null;
  ParkingShuttleInfo: string | null;
  RealtimeShutoffFlag: boolean;
  RealtimeShutoffMessage: string | null;
  RealtimeIntroMsg: string | null;
  ResourceStatus: string | null;
  SecurityInfo: string | null;
  TallySystemInfo: string | null;
  TaxiInfo: string | null;
  TrainInfo: string | null;
  TruckInfo: string | null;
  TypeDesc: string | null;
  VisitorLinks: string | null;
  Bulletins: TerminalBulletin[];
  TransitLinks: TerminalTransitLink[];
  WaitTimes: TerminalWaitTime[];
};

type TerminalsCacheFlushDate = {
  LastUpdated: Date;
  Source: string;
};
```

## Example Responses

### Cache Flush Date Example
```json
{
  "LastUpdated": "/Date(1752181200000-0700)/",
  "Source": "WSF Terminals API"
}
```

### Terminal Basics Example
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

### Terminal Bulletin Example
```json
{
  "TerminalID": 1,
  "TerminalSubjectID": 111,
  "RegionID": 1,
  "TerminalName": "Anacortes",
  "TerminalAbbrev": "ANA",
  "SortSeq": 10,
  "Bulletins": [
    {
      "BulletinTitle": "Ana/SJs-City of Anacortes Construction Project This Summer",
      "BulletinText": "<p>Give yourself some extra time travelling to our Anacortes terminal this summer...</p>",
      "BulletinSortSeq": 3,
      "BulletinLastUpdated": "/Date(1752254158923-0700)/",
      "BulletinLastUpdatedSortable": "20250711101558"
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

### Terminal Transport Example
```json
{
  "TerminalID": 1,
  "TerminalSubjectID": 111,
  "RegionID": 1,
  "TerminalName": "Anacortes",
  "TerminalAbbrev": "ANA",
  "SortSeq": 10,
  "ParkingInfo": "Peak rates effective May 1 - September 30: 1 day rate (car) - $13.00...",
  "ParkingShuttleInfo": null,
  "AirportInfo": "From the Seattle-Tacoma International Airport, allow a minimum of 2 1/2 hours driving time to Anacortes...",
  "AirportShuttleInfo": "When traveling from Sea-Tac Airport to Anacortes there is a shuttle from Sea-Tac Airport to our Anacortes Dock...",
  "MotorcycleInfo": "While motorcycles are not, by Washington Administrative Code (WAC 468-300-700), a preferential loading category...",
  "TruckInfo": "Expect heavy truck traffic on the first 3 sailings in the morning. Trucks going standby are advised to travel between the 7:40 am to 11:00 am time frame...",
  "BikeInfo": "Approaching the Anacortes Terminal, you will arrive at the vehicle tollbooths first on the right. Bicyclists may bypass these...",
  "TrainInfo": null,
  "TaxiInfo": null,
  "HovInfo": null,
  "TransitLinks": [
    {
      "LinkURL": "http://www.skagittransit.org/",
      "LinkName": "Skagit Transit",
      "SortSeq": null
    }
  ]
}
```

### Terminal Wait Times Example
```json
{
  "TerminalID": 1,
  "TerminalSubjectID": 111,
  "RegionID": 1,
  "TerminalName": "Anacortes",
  "TerminalAbbrev": "ANA",
  "SortSeq": 10,
  "WaitTimes": [
    {
      "RouteID": 1,
      "RouteName": "Anacortes - Friday Harbor",
      "WaitTimeIvrNotes": "Current wait time is approximately 2 hours",
      "WaitTimeLastUpdated": "/Date(1752181200000-0700)/",
      "WaitTimeNotes": "Heavy traffic expected due to holiday weekend"
    }
  ]
}
```

### Terminal Verbose Example
```json
{
  "TerminalID": 1,
  "TerminalSubjectID": 111,
  "RegionID": 1,
  "TerminalName": "Anacortes",
  "TerminalAbbrev": "ANA",
  "SortSeq": 10,
  "AddressLineOne": "2100 Ferry Terminal Road",
  "AddressLineTwo": null,
  "City": "Anacortes",
  "State": "WA",
  "ZipCode": "98221",
  "Country": "USA",
  "Latitude": 48.507351,
  "Longitude": -122.677,
  "Directions": "From Interstate 5 take exit 230 and follow SR 20 westbound to Anacortes...",
  "DispGISZoomLoc": [
    {
      "Latitude": 48.507351,
      "Longitude": -122.677,
      "ZoomLevel": 0
    }
  ],
  "MapLink": "https://www.google.com/maps/place/Anacortes+Ferry+Terminal...",
  "Elevator": false,
  "WaitingRoom": true,
  "FoodService": true,
  "Restroom": true,
  "OverheadPassengerLoading": true,
  "IsNoFareCollected": false,
  "NoFareCollectedMsg": null,
  "AdaInfo": "ADA accessible facilities available",
  "AdditionalInfo": "Pet-friendly terminal with designated areas",
  "AirportInfo": "Seattle-Tacoma International Airport is approximately 80 miles away",
  "AirportShuttleInfo": "Shuttle service available to Sea-Tac Airport",
  "BikeInfo": "Bike racks available at terminal entrance",
  "ChamberOfCommerce": "Anacortes Chamber of Commerce: (360) 293-7911",
  "ConstructionInfo": null,
  "FacInfo": "Terminal facilities include waiting room, restrooms, and food service",
  "FareDiscountInfo": "Senior and disabled discounts available",
  "FoodServiceInfo": "Coffee shop and snack bar available",
  "HovInfo": "HOV lanes available on approach roads",
  "LostAndFoundInfo": "Contact terminal office for lost and found items",
  "MotorcycleInfo": "Designated motorcycle parking available",
  "ParkingInfo": "Free parking available for up to 24 hours",
  "ParkingShuttleInfo": "Shuttle service between parking lots and terminal",
  "RealtimeShutoffFlag": false,
  "RealtimeShutoffMessage": null,
  "RealtimeIntroMsg": "Real-time information is available for this terminal",
  "ResourceStatus": "Active",
  "SecurityInfo": "Security screening may be required",
  "TallySystemInfo": "Electronic tally system in use",
  "TaxiInfo": "Taxi service available at terminal entrance",
  "TrainInfo": "Amtrak service available in nearby Mount Vernon",
  "TruckInfo": "Commercial vehicle loading available",
  "TypeDesc": "Major terminal with full service facilities",
  "VisitorLinks": "Visit Anacortes: https://www.anacortes.org",
  "Bulletins": [],
  "TransitLinks": [
    {
      "LinkName": "Skagit Transit",
      "LinkURL": "https://www.skagittransit.org",
      "SortSeq": 1
    }
  ],
  "WaitTimes": []
}
```

## Update Frequency

- **Real-time**: Sailing space availability is updated continuously (potentially every 5 seconds)
- **Wait Times**: Updated every few minutes during active operations
- **Location Data**: Updated when terminal information changes (infrequent)
- **Basic Information**: Updated when terminal features change (infrequent)
- **Verbose Data**: Updated when terminal facilities change (infrequent)
- **Transportation Options**: Updated when transit services change (infrequent)
- **Bulletins**: Updated as new terminal announcements are posted
- **Cache Flush Date**: Updated when any cacheable data changes

## Common Use Cases

- **Terminal Information**: Display terminal details and amenities
- **Space Availability**: Check current sailing space for vehicles
- **Location Services**: Provide directions and maps to terminals
- **Wait Time Monitoring**: Track terminal congestion and wait times
- **Transportation Planning**: Find transit connections to terminals
- **Facility Information**: Access detailed terminal facilities and services
- **Passenger Planning**: Help passengers plan their terminal arrival
- **Fleet Management**: Monitor terminal operations and capacity
- **Emergency Response**: Real-time terminal status for emergency coordination
- **Route Planning**: Use terminal locations for travel planning
- **Caching Strategy**: Coordinate data caching using cache flush dates

## Data Notes

- **Terminal IDs**: Unique numeric identifiers for each terminal
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84)
- **Space Counts**: Vehicle capacity information for each sailing
- **Color Coding**: Hex colors indicate space availability levels
- **Date Format**: Times are returned in Microsoft .NET JSON date format (`/Date(timestamp-timezone)/`) and automatically converted to JavaScript Date objects
- **Address Information**: Complete address details for each terminal
- **Directions**: Detailed driving directions to each terminal
- **Amenities**: Boolean flags for terminal features (elevator, food service, etc.)
- **Region IDs**: Geographic region grouping for terminals
- **Zoom Levels**: Multiple zoom levels for GIS display applications
- **Wait Times**: Historical data (last updated August 2020)
- **Transportation**: Transit connections and shuttle services
- **Verbose Data**: Comprehensive terminal information including parking, accessibility, and services
- **Caching**: Use cache flush dates to coordinate data caching and avoid unnecessary API calls

## JSONP Support

All endpoints support JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbasics?apiaccesscode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

- **No Data**: Ensure the access code is valid and API is accessible
- **Terminal IDs**: Use valid terminal IDs from the terminal basics endpoint
- **Space Data**: Some terminals may not have current space data if not active
- **Wait Times**: Data may be static (last updated August 2020)
- **Date Formats**: All dates use Microsoft .NET JSON format and are automatically converted to JavaScript Date objects
- **Color Codes**: Red typically indicates no space, green indicates available space
- **Location Data**: Coordinates are in decimal degrees (WGS84 format)
- **Address Information**: Complete address details available for each terminal
- **Directions**: HTML-formatted directions with driving instructions
- **Amenities**: Check boolean flags for terminal features and accessibility
- **Transportation**: Verify transit service availability and schedules
- **Verbose Data**: Comprehensive information available for major terminals
- **Caching**: Use cache flush dates to coordinate data caching and avoid unnecessary API calls 