# WSDOT Traffic Flow API

## Overview

The WSDOT Traffic Flow API provides real-time traffic flow data from sensors and monitoring stations across Washington State highways. This API delivers traffic flow readings, station locations, and flow conditions to help monitor traffic patterns and congestion levels.

## Base URL

```
https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `GetTrafficFlowsAsJson` | GET | Retrieve all traffic flow data | `AccessCode` |
| `GetTrafficFlowAsJson` | GET | Retrieve specific traffic flow by ID | `AccessCode`, `FlowDataID` |

## Quick Start

```bash
# Get all traffic flow data
curl "https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson?AccessCode=$WSDOT_ACCESS_CODE"

# Get a specific traffic flow by ID
curl "https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson?AccessCode=$WSDOT_ACCESS_CODE&FlowDataID=2482"
```

## Official Documentation

- [WSDOT Traffic Flow API Help](https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help)

## Endpoints

### Get All Traffic Flows

**Endpoint:** `GetTrafficFlowsAsJson`  
**Method:** GET  
**Description:** Retrieve all current traffic flow data from monitoring stations

**URL:** `https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `FlowData` objects

### Get Traffic Flow by ID

**Endpoint:** `GetTrafficFlowAsJson`  
**Method:** GET  
**Description:** Retrieve a specific traffic flow reading by its ID

**URL:** `https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |
| `FlowDataID` | number | Yes | Unique identifier for the flow data |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson?AccessCode=$WSDOT_ACCESS_CODE&FlowDataID=2482"
```

**Response:** Single `FlowData` object

## TypeScript Types

```typescript
type FlowStationLocation = {
  Description: string | null;
  Direction: string | null;
  Latitude: number | null;
  Longitude: number | null;
  MilePost: number | null;
  RoadName: string | null;
};

type FlowStationReading = 
  | "Unknown"
  | "WideOpen"
  | "Moderate"
  | "Heavy"
  | "StopAndGo"
  | "NoData";

type FlowData = {
  FlowDataID: number;
  FlowReadingValue: FlowStationReading;
  FlowStationLocation: FlowStationLocation | null;
  Region: string | null;
  StationName: string | null;
  Time: string; // "/Date(timestamp-timezone)/" format
};
```

## Example Response

```json
{
  "FlowDataID": 2482,
  "FlowReadingValue": 1,
  "FlowStationLocation": {
    "Description": "Homeacres Rd",
    "Direction": "EB",
    "Latitude": 47.978415632,
    "Longitude": -122.174701738,
    "MilePost": 0.68,
    "RoadName": "002"
  },
  "Region": "Northwest",
  "StationName": "002es00068",
  "Time": "/Date(1752176362000-0700)/"
}
```

## Update Frequency

- **Real-time**: Traffic flow data is updated continuously from monitoring stations
- **Refresh Rate**: Recommended to poll every 1-5 minutes for real-time applications
- **Data Availability**: Flow readings depend on sensor availability and maintenance

## Common Use Cases

- **Traffic Monitoring**: Real-time traffic flow monitoring and analysis
- **Congestion Detection**: Identifying traffic bottlenecks and congestion areas
- **Traffic Management**: Integration into traffic management and control systems
- **Route Planning**: Providing flow data for navigation and route optimization
- **Transportation Analytics**: Historical traffic pattern analysis and reporting

## Data Notes

- **Flow Reading Values**: 
  - `0` = Unknown
  - `1` = WideOpen (free flowing traffic)
  - `2` = Moderate (some congestion)
  - `3` = Heavy (heavy congestion)
  - `4` = StopAndGo (stop and go traffic)
  - `5` = NoData (no data available)
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84)
- **Mile Posts**: Highway milepost markers for precise location
- **Directions**: EB (Eastbound), WB (Westbound), NB (Northbound), SB (Southbound)
- **Regions**: Geographic regions for data organization
- **Station Names**: Unique identifiers for monitoring stations
- **Date Format**: Times are returned in Microsoft .NET JSON date format (`/Date(timestamp-timezone)/`)

## JSONP Support

All endpoints support JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson?AccessCode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

- **No Data**: Check if monitoring stations are active and reporting data
- **Invalid Flow Data ID**: Verify the FlowDataID exists in the system
- **Flow Reading Values**: Understand the numeric mapping to traffic conditions
- **Station Coverage**: Not all highway segments have flow monitoring stations
- **Data Quality**: Some stations may report "NoData" during maintenance or outages 