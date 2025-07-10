# WSDOT Weather Stations API

## Overview

The WSDOT Weather Stations API provides metadata about WSDOT-maintained weather stations across Washington State. This API delivers station location information, station codes, and station names to help identify and locate weather monitoring stations for use with the Weather Information API.

## Base URL

```
https://wsdot.wa.gov/Traffic/api/WeatherStations/WeatherStationsREST.svc
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `GetCurrentStationsAsJson` | GET | Retrieve list of all weather stations | `AccessCode` |

## Quick Start

```bash
# Get all weather stations
curl "https://wsdot.wa.gov/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

## Official Documentation

- [WSDOT Weather Stations API Help](https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc/Help)

## Endpoints

### Get All Weather Stations

**Endpoint:** `GetCurrentStationsAsJson`  
**Method:** GET  
**Description:** Retrieve a list of all WSDOT-maintained weather stations with their locations and metadata

**URL:** `https://wsdot.wa.gov/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `WeatherStationData` objects

## TypeScript Types

```typescript
type WeatherStationData = {
  Latitude: number;
  Longitude: number;
  StationCode: number;
  StationName: string | null;
};
```

## Example Response

```json
{
  "Latitude": 47.4748,
  "Longitude": -122.2704,
  "StationCode": 1909,
  "StationName": "S 144th St on SB I-5 at mp 155.32"
}
```

## Update Frequency

- **Static Data**: Weather station metadata is relatively static and updated infrequently
- **Station Additions**: New stations may be added as WSDOT expands monitoring network
- **Station Updates**: Station names or locations may be updated occasionally
- **Station Codes**: Station codes remain consistent once assigned

## Common Use Cases

- **Station Discovery**: Find available weather stations in specific areas
- **Weather Data Integration**: Use station codes with Weather Information API
- **Geographic Filtering**: Filter stations by location or region
- **Station Mapping**: Display weather station locations on maps
- **Data Source Identification**: Identify which stations provide weather data
- **Route Planning**: Find weather stations along travel routes

## Data Notes

- **Station Codes**: Unique numeric identifiers for each weather station
- **Station Names**: Descriptive names indicating location and highway milepost
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84)
- **Highway References**: Station names often reference nearby highways and mileposts
- **Location Precision**: Coordinates provide precise station locations
- **Station Coverage**: Stations are distributed across Washington State highways
- **Data Availability**: All listed stations may not have current weather data available

## JSONP Support

The endpoint supports JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson?AccessCode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

- **No Stations**: Ensure the access code is valid and API is accessible
- **Station Codes**: Use `StationCode` values with Weather Information API
- **Location Data**: Coordinates are in decimal degrees (WGS84 format)
- **Station Names**: Names may be long and include highway/milepost information
- **Data Integration**: Combine with Weather Information API for complete weather data
- **Geographic Queries**: Use coordinates to find stations in specific areas
- **Station Availability**: Not all stations may have current weather readings available 