# WSDOT Mountain Pass Conditions API

## Overview

The WSDOT Mountain Pass Conditions API provides real-time information about weather conditions, road conditions, and travel restrictions for mountain passes across Washington State. This API delivers critical information for winter travel planning, including temperature, elevation, weather conditions, and travel advisories.

## Base URL

```
https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `GetMountainPassConditionsAsJson` | GET | Retrieve all mountain pass conditions | `AccessCode` |
| `GetMountainPassConditionAsJson` | GET | Retrieve specific mountain pass by ID | `AccessCode`, `PassConditionID` |

## Quick Start

```bash
# Get all mountain pass conditions
curl "https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson?AccessCode=$WSDOT_ACCESS_CODE"

# Get a specific mountain pass by ID
curl "https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJson?AccessCode=$WSDOT_ACCESS_CODE&PassConditionID=1"
```

## Official Documentation

- [WSDOT Mountain Pass Conditions API Help](https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help)

## Endpoints

### Get All Mountain Pass Conditions

**Endpoint:** `GetMountainPassConditionsAsJson`  
**Method:** GET  
**Description:** Retrieve all current mountain pass conditions and travel information

**URL:** `https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `PassCondition` objects

### Get Mountain Pass Condition by ID

**Endpoint:** `GetMountainPassConditionAsJson`  
**Method:** GET  
**Description:** Retrieve a specific mountain pass condition by its ID

**URL:** `https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |
| `PassConditionID` | number | Yes | Unique identifier for the mountain pass |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJson?AccessCode=$WSDOT_ACCESS_CODE&PassConditionID=1"
```

**Response:** Single `PassCondition` object

## TypeScript Types

```typescript
type TravelRestriction = {
  RestrictionText: string | null;
  TravelDirection: string | null;
};

type PassCondition = {
  DateUpdated: string; // "/Date(timestamp-timezone)/" format
  ElevationInFeet: number;
  Latitude: number;
  Longitude: number;
  MountainPassId: number;
  MountainPassName: string | null;
  RestrictionOne: TravelRestriction | null;
  RestrictionTwo: TravelRestriction | null;
  RoadCondition: string | null;
  TemperatureInFahrenheit: number | null;
  TravelAdvisoryActive: boolean;
  WeatherCondition: string | null;
};
```

## Example Response

```json
{
  "DateUpdated": "/Date(1744613599877-0700)/",
  "ElevationInFeet": 4102,
  "Latitude": 47.335298205,
  "Longitude": -120.581068216,
  "MountainPassId": 1,
  "MountainPassName": "Blewett Pass US 97",
  "RestrictionOne": {
    "RestrictionText": "No current information available",
    "TravelDirection": "Northbound"
  },
  "RestrictionTwo": {
    "RestrictionText": "No current information available",
    "TravelDirection": "Southbound"
  },
  "RoadCondition": "Seasonal weather reports have ended for this season. Traditionally weather is reported on this page from November 1 to April 1. Should adverse weather occur that will impact travel, updates will be provided as information is available.",
  "TemperatureInFahrenheit": null,
  "TravelAdvisoryActive": true,
  "WeatherCondition": ""
}
```

## Update Frequency

- **Seasonal**: Mountain pass conditions are most actively updated during winter months (November 1 - April 1)
- **Real-time**: Conditions are updated as weather events occur that impact travel
- **Advisory Updates**: Travel advisories are updated immediately when conditions change
- **Temperature Updates**: Temperature readings are updated regularly during active monitoring periods

## Common Use Cases

- **Winter Travel Planning**: Essential for planning trips through mountain passes during winter
- **Weather Monitoring**: Real-time weather and road condition monitoring
- **Travel Advisories**: Alerting travelers to hazardous conditions and restrictions
- **Emergency Response**: Quick access to critical pass information for emergency services
- **Transportation Planning**: Route planning that considers mountain pass conditions

## Data Notes

- **Seasonal Reporting**: Most passes report conditions from November 1 to April 1
- **Elevation**: Pass elevations are provided in feet
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84)
- **Temperature**: Provided in Fahrenheit (may be null during off-season)
- **Travel Restrictions**: Two restriction slots per pass (typically for different directions)
- **Travel Advisories**: Boolean flag indicating if active travel advisories are in effect
- **Date Format**: Times are returned in Microsoft .NET JSON date format (`/Date(timestamp-timezone)/`)
- **Weather Conditions**: Text descriptions of current weather conditions
- **Road Conditions**: Detailed road condition information and seasonal reporting status

## JSONP Support

All endpoints support JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson?AccessCode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

- **No Data**: Check if the pass is in seasonal reporting period (Nov 1 - Apr 1)
- **Null Temperature**: Temperature may be null during off-season or when sensors are unavailable
- **Travel Advisories**: `TravelAdvisoryActive` indicates if there are current travel warnings
- **Restriction Information**: Restrictions may show "No current information available" when no active restrictions
- **Weather Conditions**: May be empty during off-season or when no weather data is available 