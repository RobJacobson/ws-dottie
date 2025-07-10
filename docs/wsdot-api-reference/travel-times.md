# WSDOT Travel Times API

## Overview

The WSDOT Travel Times API provides real-time travel time data for major highway corridors and routes across Washington State. This API delivers current travel times, average travel times, and route information to help travelers plan their journeys and understand traffic conditions.

## Base URL

```
https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `GetTravelTimesAsJson` | GET | Retrieve all travel time routes | `AccessCode` |
| `GetTravelTimeAsJson` | GET | Retrieve specific travel time route by ID | `AccessCode`, `TravelTimeID` |

## Quick Start

```bash
# Get all travel time routes
curl "https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=$WSDOT_ACCESS_CODE"

# Get a specific travel time route by ID
curl "https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?AccessCode=$WSDOT_ACCESS_CODE&TravelTimeID=2"
```

## Official Documentation

- [WSDOT Travel Times API Help](https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help)

## Endpoints

### Get All Travel Times

**Endpoint:** `GetTravelTimesAsJson`  
**Method:** GET  
**Description:** Retrieve all available travel time routes and their current conditions

**URL:** `https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `TravelTimeRoute` objects

### Get Travel Time by ID

**Endpoint:** `GetTravelTimeAsJson`  
**Method:** GET  
**Description:** Retrieve a specific travel time route by its ID

**URL:** `https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |
| `TravelTimeID` | number | Yes | Unique identifier for the travel time route |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?AccessCode=$WSDOT_ACCESS_CODE&TravelTimeID=2"
```

**Response:** Single `TravelTimeRoute` object

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

type TravelTimeRoute = {
  AverageTime: number;
  CurrentTime: number;
  Description: string | null;
  Distance: number;
  EndPoint: RoadwayLocation | null;
  Name: string | null;
  StartPoint: RoadwayLocation | null;
  TimeUpdated: string; // "/Date(timestamp-timezone)/" format
  TravelTimeID: number;
};
```

## Example Response

```json
{
  "AverageTime": 35,
  "CurrentTime": 36,
  "Description": "Everett to Downtown Seattle using HOV lanes",
  "Distance": 26.72,
  "EndPoint": {
    "Description": "I-5 @ University St in Seattle",
    "Direction": "S",
    "Latitude": 47.609294,
    "Longitude": -122.331759,
    "MilePost": 165.83,
    "RoadName": "005"
  },
  "Name": "Everett-Seattle HOV",
  "StartPoint": {
    "Description": "I-5 @ 41st St in Everett",
    "Direction": "S",
    "Latitude": 47.964146,
    "Longitude": -122.199237,
    "MilePost": 192.55,
    "RoadName": "005"
  },
  "TimeUpdated": "/Date(1752176400000-0700)/",
  "TravelTimeID": 2
}
```

## Update Frequency

- **Real-time**: Travel time data is updated continuously from traffic monitoring systems
- **Refresh Rate**: Recommended to poll every 1-5 minutes for real-time applications
- **Data Availability**: Travel times depend on traffic sensor coverage and system availability

## Common Use Cases

- **Route Planning**: Real-time travel time information for journey planning
- **Traffic Monitoring**: Monitoring traffic conditions on major corridors
- **Navigation Apps**: Integration into navigation and routing applications
- **Transportation Analytics**: Analysis of travel time patterns and trends
- **Public Information**: Displaying current travel conditions to the public

## Data Notes

- **Time Units**: Travel times are provided in minutes
- **Distance Units**: Distances are provided in miles
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84)
- **Mile Posts**: Highway milepost markers for precise location
- **Directions**: N (North), S (South), E (East), W (West)
- **Route Types**: Includes general purpose lanes, HOV lanes, and managed lanes
- **Date Format**: Times are returned in Microsoft .NET JSON date format (`/Date(timestamp-timezone)/`)
- **Average vs Current**: `AverageTime` represents typical travel time, `CurrentTime` represents real-time conditions

## JSONP Support

All endpoints support JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

- **No Data**: Check if travel time routes are active and reporting data
- **Invalid Travel Time ID**: Verify the TravelTimeID exists in the system
- **Time Differences**: Compare `CurrentTime` vs `AverageTime` to understand traffic conditions
- **Route Coverage**: Not all highway segments have travel time monitoring
- **Data Quality**: Some routes may report estimated times during system maintenance 