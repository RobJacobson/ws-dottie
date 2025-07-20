# WSDOT Commercial Vehicle Restrictions API

## Overview

The WSDOT Commercial Vehicle Restrictions API provides information about weight, height, and other restrictions for commercial vehicles on Washington State highways. This API delivers restriction data including bridge weight limits, vehicle size restrictions, and temporary limitations for commercial transportation planning and compliance.

## Base URL

```
https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `GetCommercialVehicleRestrictionsAsJson` | GET | Retrieve commercial vehicle restrictions | `AccessCode` |
| `GetCommercialVehicleRestrictionsWithIdAsJson` | GET | Retrieve restrictions with unique IDs | `AccessCode` |

## Quick Start

```bash
# Get all commercial vehicle restrictions
curl "https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson?AccessCode=$WSDOT_ACCESS_CODE"

# Get restrictions with unique IDs
curl "https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

## Official Documentation

- [WSDOT Commercial Vehicle Restrictions API Help](https://wsdot.wa.gov/traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help)

## Endpoints

### Get Commercial Vehicle Restrictions

**Endpoint:** `GetCommercialVehicleRestrictionsAsJson`  
**Method:** GET  
**Description:** Retrieve current commercial vehicle restrictions

**URL:** `https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `CVRestrictionData` objects

### Get Commercial Vehicle Restrictions with IDs

**Endpoint:** `GetCommercialVehicleRestrictionsWithIdAsJson`  
**Method:** GET  
**Description:** Retrieve current commercial vehicle restrictions including unique identifiers

**URL:** `https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `CVRestrictionData` objects with additional ID fields

## TypeScript Types

```typescript
type RoadwayLocation = {
  Description: string | null;
  Direction: string | null;
  Latitude: number;
  Longitude: number;
  MilePost: number;
  RoadName: string | null;
};

type CVRestrictionData = {
  BLMaxAxle: number;
  BridgeName: string | null;
  BridgeNumber: string | null;
  CL8MaxAxle: number;
  DateEffective: string; // "/Date(timestamp-timezone)/" format
  DateExpires: string; // "/Date(timestamp-timezone)/" format
  DatePosted: string; // "/Date(timestamp-timezone)/" format
  EndRoadwayLocation: RoadwayLocation;
  IsDetourAvailable: boolean;
  IsExceptionsAllowed: boolean;
  IsPermanentRestriction: boolean;
  IsWarning: boolean;
  Latitude: number;
  LocationDescription: string | null;
  LocationName: string | null;
  Longitude: number;
  MaximumGrossVehicleWeightInPounds: number | null;
  RestrictionComment: string | null;
  RestrictionHeightInInches: number;
  RestrictionLengthInInches: number;
  RestrictionType: number;
  RestrictionWeightInPounds: number;
  RestrictionWidthInInches: number;
  SAMaxAxle: number;
  StartRoadwayLocation: RoadwayLocation;
  State: string | null;
  StateRouteID: string | null;
  TDMaxAxle: number;
  VehicleType: string | null;
};
```

## Example Response

```json
{
  "BLMaxAxle": 20000,
  "BridgeName": "Teanaway River",
  "BridgeNumber": "10/142",
  "CL8MaxAxle": 20000,
  "DateEffective": "/Date(1318921200000-0700)/",
  "DateExpires": "/Date(3345004800000-0800)/",
  "DatePosted": "/Date(1318975920000-0700)/",
  "EndRoadwayLocation": {
    "Description": null,
    "Direction": "Both",
    "Latitude": 0,
    "Longitude": 0,
    "MilePost": 0,
    "RoadName": "SR 10"
  },
  "IsDetourAvailable": false,
  "IsExceptionsAllowed": false,
  "IsPermanentRestriction": false,
  "IsWarning": false,
  "Latitude": 47.15136148800159,
  "LocationDescription": "SR 10, MP 89.33 both directions-20,000 lbs limitation",
  "LocationName": "1.3 E Jct SR 970",
  "Longitude": -120.80431521930812,
  "MaximumGrossVehicleWeightInPounds": null,
  "RestrictionComment": "BL =20,000 lbs, CL-8 =20,000 lbs, SA = 40,000 lbs.",
  "RestrictionHeightInInches": 0,
  "RestrictionLengthInInches": 0,
  "RestrictionType": 0,
  "RestrictionWeightInPounds": 0,
  "RestrictionWidthInInches": 0,
  "SAMaxAxle": 40000,
  "StartRoadwayLocation": {
    "Description": null,
    "Direction": "Both",
    "Latitude": 0,
    "Longitude": 0,
    "MilePost": 0,
    "RoadName": "SR 10"
  },
  "State": "WA",
  "StateRouteID": "10",
  "TDMaxAxle": 40000,
  "VehicleType": null
}
```

## Update Frequency

- **Real-time**: Restrictions are updated as new limitations are implemented
- **Construction Projects**: Updated during road construction and maintenance
- **Bridge Work**: Updated when bridge restrictions change
- **Temporary Restrictions**: Updated for temporary weight or size limitations
- **Permanent Changes**: Updated when permanent restrictions are established
- **API Updates**: Data is updated when underlying database changes

## Common Use Cases

- **Commercial Route Planning**: Plan routes for commercial vehicles considering restrictions
- **Weight Limit Compliance**: Check weight restrictions for different vehicle types
- **Bridge Safety**: Monitor bridge weight limitations and restrictions
- **Transportation Planning**: Consider restrictions in logistics planning
- **Emergency Response**: Quick access to restriction data for emergency vehicles
- **Construction Planning**: Plan construction vehicle routes considering limitations
- **Regulatory Compliance**: Ensure commercial vehicles meet restriction requirements

## Data Notes

- **Axle Weight Limits**: Different limits for various axle configurations (BL, CL8, SA, TD)
- **Bridge Information**: Bridge names and numbers for specific restrictions
- **Date Ranges**: Effective and expiration dates for temporary restrictions
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84)
- **Mile Post Information**: Specific highway mile post locations
- **Date Format**: Times are returned in Microsoft .NET JSON date format (`/Date(timestamp-timezone)/`)
- **Restriction Types**: Numeric codes indicating restriction categories
- **Vehicle Types**: Specific vehicle types affected by restrictions
- **Detour Information**: Whether detours are available for restricted areas
- **Exception Information**: Whether exceptions are allowed for restrictions

## JSONP Support

All endpoints support JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson?AccessCode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

- **No Data**: Ensure the access code is valid and API is accessible
- **Date Ranges**: Check effective and expiration dates for current restrictions
- **Axle Limits**: Different axle configurations have different weight limits
- **Null Values**: Some fields may be null for certain restrictions
- **Date Formats**: All dates use Microsoft .NET JSON format
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84 format)
- **Restriction Types**: Numeric codes indicate different restriction categories
- **Bridge Numbers**: May contain special characters and formatting
- **Mile Post Data**: May be 0 for some location types
- **Vehicle Types**: May be null for general restrictions 