# WSDOT Weather Information API

## Overview

The WSDOT Weather Information API provides real-time weather data from WSDOT-maintained weather stations across Washington State. This API delivers comprehensive weather information including temperature, humidity, wind conditions, visibility, barometric pressure, and precipitation data for transportation planning and safety monitoring.

## Base URL

```
https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc
```

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `GetCurrentWeatherInformationAsJson` | GET | Retrieve weather data for all stations | `AccessCode` |
| `GetCurrentWeatherInformationByStationIDAsJson` | GET | Retrieve weather data for specific station | `AccessCode`, `StationID` |
| `GetCurrentWeatherForStationsAsJson` | GET | Retrieve weather data for multiple stations | `AccessCode`, `StationList` |

## Quick Start

```bash
# Get weather data for all stations
curl "https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson?AccessCode=$WSDOT_ACCESS_CODE"

# Get weather data for a specific station
curl "https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?AccessCode=$WSDOT_ACCESS_CODE&StationID=1909"

# Get weather data for multiple stations
curl "https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherForStationsAsJson?AccessCode=$WSDOT_ACCESS_CODE&StationList=1909,1910,1911"
```

## Official Documentation

- [WSDOT Weather Information API Help](https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help)

## Endpoints

### Get All Weather Information

**Endpoint:** `GetCurrentWeatherInformationAsJson`  
**Method:** GET  
**Description:** Retrieve current weather information for all WSDOT-maintained weather stations

**URL:** `https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

**Response:** Array of `WeatherInfo` objects

### Get Weather Information by Station ID

**Endpoint:** `GetCurrentWeatherInformationByStationIDAsJson`  
**Method:** GET  
**Description:** Retrieve weather information for a specific WSDOT-maintained weather station

**URL:** `https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |
| `StationID` | number | Yes | Unique identifier for the weather station |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?AccessCode=$WSDOT_ACCESS_CODE&StationID=1909"
```

**Response:** Single `WeatherInfo` object

### Get Weather Information for Multiple Stations

**Endpoint:** `GetCurrentWeatherForStationsAsJson`  
**Method:** GET  
**Description:** Retrieve weather information for multiple specified weather stations

**URL:** `https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherForStationsAsJson`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AccessCode` | string | Yes | WSDOT API access code |
| `StationList` | string | Yes | Comma-separated list of station IDs |

**cURL Example:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherForStationsAsJson?AccessCode=$WSDOT_ACCESS_CODE&StationList=1909,1910,1911"
```

**Response:** Array of `WeatherInfo` objects

## TypeScript Types

```typescript
type WeatherInfo = {
  BarometricPressure: number | null;
  Latitude: number;
  Longitude: number;
  PrecipitationInInches: number | null;
  ReadingTime: string; // "/Date(timestamp-timezone)/" format
  RelativeHumidity: number | null;
  SkyCoverage: string | null;
  StationID: number;
  StationName: string | null;
  TemperatureInFahrenheit: number | null;
  Visibility: number | null;
  WindDirection: number | null;
  WindDirectionCardinal: string | null;
  WindGustSpeedInMPH: number | null;
  WindSpeedInMPH: number | null;
};
```

## Example Response

```json
{
  "BarometricPressure": 965.7,
  "Latitude": 47.4748,
  "Longitude": -122.2704,
  "PrecipitationInInches": null,
  "ReadingTime": "/Date(1752175807000-0700)/",
  "RelativeHumidity": 61,
  "SkyCoverage": "N/A",
  "StationID": 1909,
  "StationName": "S 144th St on SB I-5 at mp 155.32",
  "TemperatureInFahrenheit": 66.38,
  "Visibility": 1,
  "WindDirection": 125,
  "WindDirectionCardinal": "SE",
  "WindGustSpeedInMPH": 1,
  "WindSpeedInMPH": 0
}
```

## Update Frequency

- **Real-time**: Weather data is updated continuously as readings are taken
- **Station Readings**: Individual stations report at varying intervals (typically 5-15 minutes)
- **Data Availability**: Some stations may have intermittent data availability
- **Historical Data**: Current readings only, no historical data provided

## Common Use Cases

- **Transportation Safety**: Monitor weather conditions for road safety
- **Travel Planning**: Check weather conditions along travel routes
- **Emergency Response**: Real-time weather data for emergency planning
- **Weather Monitoring**: Track weather patterns across Washington State
- **Infrastructure Management**: Weather data for transportation infrastructure decisions
- **Public Information**: Provide weather updates to travelers

## Data Notes

- **Temperature**: Provided in Fahrenheit
- **Pressure**: Barometric pressure in appropriate units
- **Wind Direction**: Degrees (0-360) and cardinal directions (N, NE, E, SE, S, SW, W, NW)
- **Wind Speed**: Wind speed and gust speed in miles per hour
- **Visibility**: Visibility in miles (may be null if not available)
- **Humidity**: Relative humidity as percentage
- **Precipitation**: Precipitation in inches (may be null if no precipitation)
- **Coordinates**: Latitude/Longitude in decimal degrees (WGS84)
- **Date Format**: Times are returned in Microsoft .NET JSON date format (`/Date(timestamp-timezone)/`)
- **Station Names**: Descriptive names indicating location and highway milepost
- **Sky Coverage**: Cloud cover information (may be "N/A" if not available)

## JSONP Support

All endpoints support JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson?AccessCode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

- **Null Values**: Some weather parameters may be null if sensors are unavailable
- **Station Availability**: Not all stations may have complete data sets
- **Data Freshness**: Check `ReadingTime` to ensure data is current
- **Station IDs**: Use the station list endpoint to find valid station IDs
- **Sky Coverage**: May show "N/A" when cloud cover data is unavailable
- **Wind Data**: Wind direction and speed may be null during calm conditions
- **Precipitation**: May be null when no precipitation is occurring 