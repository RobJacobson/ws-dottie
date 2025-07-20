# WSDOT Bridge Clearances API

## Overview

The WSDOT Bridge Clearances API provides information about bridge vertical clearances across Washington State highways. This API delivers bridge clearance data including maximum and minimum heights, bridge locations, and structural information for transportation planning and oversized vehicle routing.

## Base URL

```
https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `GetClearancesAsJson` | GET | Retrieve bridge clearance data | `AccessCode`, `Route`* |

*Optional parameter

## Quick Start

```bash
# Get all bridge clearances
curl "https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?AccessCode=$WSDOT_ACCESS_CODE"

# Get bridge clearances for a specific route
curl "https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?AccessCode=$WSDOT_ACCESS_CODE&Route=5"
```

## Official Documentation

- [WSDOT Bridge Clearances API Help](https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help)

## Endpoints

### Get Bridge Clearances

**Endpoint:** `GetClearancesAsJson`  
**Method:** GET  
**Description:** Retrieve bridge clearance data for Washington State bridges

**URL:** `https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |
| `Route` | string | No | State route number to filter results |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `BridgeDataGIS` objects

## TypeScript Types

```typescript
type BridgeDataGIS = {
  APILastUpdate: string; // "/Date(timestamp-timezone)/" format
  BridgeNumber: string | null;
  ControlEntityGuid: string;
  CrossingDescription: string | null;
  CrossingLocationId: number;
  CrossingRecordGuid: string;
  InventoryDirection: string | null;
  Latitude: number;
  LocationGuid: string;
  Longitude: number;
  RouteDate: string; // "/Date(timestamp-timezone)/" format
  SRMP: number;
  SRMPAheadBackIndicator: string | null;
  StateRouteID: string | null;
  StateStructureId: string | null;
  VerticalClearanceMaximumFeetInch: string | null;
  VerticalClearanceMaximumInches: number;
  VerticalClearanceMinimumFeetInch: string | null;
  VerticalClearanceMinimumInches: number;
};
```

## Example Response

```json
{
  "APILastUpdate": "/Date(1752143402493-0700)/",
  "BridgeNumber": "519/101FTP",
  "ControlEntityGuid": "e589eb93-c01b-4498-8243-89f48bf5c43d",
  "CrossingDescription": "SEATTLE SLIP 1 PASS. OHL",
  "CrossingLocationId": 9603,
  "CrossingRecordGuid": "3d78286b-a191-4978-9382-9f914341d6b0",
  "InventoryDirection": null,
  "Latitude": 47.602165,
  "LocationGuid": "dcf13720-32a4-40e3-b824-663775ab2bbc",
  "Longitude": -122.339587,
  "RouteDate": "/Date(1483171200000-0800)/",
  "SRMP": 0,
  "SRMPAheadBackIndicator": null,
  "StateRouteID": null,
  "StateStructureId": "0014407A",
  "VerticalClearanceMaximumFeetInch": "14 ft 3 in",
  "VerticalClearanceMaximumInches": 171,
  "VerticalClearanceMinimumFeetInch": "14 ft 3 in",
  "VerticalClearanceMinimumInches": 171
}
```

## Update Frequency

- **Static Data**: Bridge clearance data is relatively static and updated infrequently
- **Infrastructure Changes**: Updated when bridge modifications affect clearance
- **Construction Projects**: Updated during bridge construction or rehabilitation
- **Annual Reviews**: Data may be reviewed and updated annually
- **API Updates**: API data is updated when underlying database changes

## Common Use Cases

- **Oversized Vehicle Routing**: Plan routes for vehicles exceeding standard height limits
- **Transportation Planning**: Consider bridge clearances in route planning
- **Infrastructure Management**: Monitor bridge clearance data for maintenance
- **Emergency Response**: Quick access to clearance data for emergency vehicles
- **Commercial Transportation**: Route planning for commercial vehicles with height restrictions
- **Construction Planning**: Plan construction vehicle routes considering clearances

## Data Notes

- **Clearance Measurements**: Provided in both feet/inches format and total inches
- **Maximum/Minimum Clearances**: Both maximum and minimum clearance values provided
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84)
- **Bridge Numbers**: Unique identifiers for each bridge structure
- **State Route IDs**: Highway route identifiers (may be null for some structures)
- **Crossing Descriptions**: Text descriptions of what the bridge crosses
- **Date Format**: Times are returned in Microsoft .NET JSON date format (`/Date(timestamp-timezone)/`)
- **GUID Fields**: Unique identifiers for various database relationships
- **SRMP**: State Route Mile Post information
- **Inventory Direction**: Direction information for bridge inventory (may be null)

## JSONP Support

The endpoint supports JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?AccessCode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

- **No Data**: Ensure the access code is valid and API is accessible
- **Route Filtering**: Use route parameter to filter results by specific highways
- **Clearance Values**: Check both feet/inches and total inches for complete information
- **Null Values**: Some fields may be null for certain bridge structures
- **Date Formats**: All dates use Microsoft .NET JSON format
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84 format)
- **Bridge Numbers**: May contain special characters and formatting
- **Clearance Accuracy**: Verify clearance data for critical transportation planning
- **Route Information**: State route IDs may be null for non-highway structures 