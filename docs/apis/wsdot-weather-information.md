# WSDOT Weather Information API

The WSDOT Weather Information API provides real-time weather data from WSDOT-maintained weather stations across Washington State.

## Overview

This module provides access to the WSDOT Weather Information API, which offers real-time weather data from WSDOT-maintained weather stations, including temperature, humidity, wind, precipitation, and visibility measurements.

### Key Features

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Real-time Weather Data** | Current weather conditions from stations | ✅ Available |
| **Temperature Readings** | Temperature in Fahrenheit | ✅ Available |
| **Wind Information** | Speed, direction, and gust data | ✅ Available |
| **Humidity & Pressure** | Relative humidity and barometric pressure | ✅ Available |
| **Visibility & Precipitation** | Visibility in miles and precipitation in inches | ✅ Available |
| **Geographic Data** | Station coordinates and locations | ✅ Available |

### Data Update Frequency

| Data Type | Update Frequency | Cache Strategy | Notes |
|-----------|------------------|----------------|-------|
| **Weather Readings** | Real-time | `MINUTE_UPDATES` | Updated continuously as readings are taken |
| **Station Data** | Static | `WEEKLY_UPDATES` | Infrastructure data |

## WSDOT Documentation

- **[WSDOT Weather Information API Documentation](https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html)**
- **[WSDOT Weather Information API Help](https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help)**

## API Endpoints

### Endpoints Summary

| Endpoint | Method | Description | Parameters | Returns |
|----------|--------|-------------|------------|---------|
| `GetCurrentWeatherInformationAsJson` | GET | Get weather data for all stations | `AccessCode` | `WeatherInfo[]` |
| `GetCurrentWeatherInformationByStationIDAsJson` | GET | Get weather data for specific station | `AccessCode`, `StationID` | `WeatherInfo` |
| `GetCurrentWeatherForStationsAsJson` | GET | Get weather data for multiple stations | `AccessCode`, `StationList` | `WeatherInfo[]` |

### Base URL
```
https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc
```

## Usage Examples

### Basic Usage

```typescript
import { wsdotWeatherInformation } from 'ws-dottie/wsdot-weather-information';

// Get weather data for all stations
const weatherData = await wsdotWeatherInformation.getCurrentWeatherInformation();

// Get weather data for specific station
const stationWeather = await wsdotWeatherInformation.getCurrentWeatherInformationByStationId({ stationId: 1909 });

// Get weather data for multiple stations
const multipleStations = await wsdotWeatherInformation.getCurrentWeatherForStations({ stationList: "1909,1910,1911" });
```

### Parameter Examples

| Function | Parameters | Example | Description |
|----------|------------|---------|-------------|
| `getCurrentWeatherInformation` | None | `getCurrentWeatherInformation()` | Get weather data for all stations |
| `getCurrentWeatherInformationByStationId` | `{ stationId: number }` | `getCurrentWeatherInformationByStationId({ stationId: 1909 })` | Get weather data for specific station |
| `getCurrentWeatherForStations` | `{ stationList: string }` | `getCurrentWeatherForStations({ stationList: "1909,1910,1911" })` | Get weather data for multiple stations |

### Common Use Cases

```typescript
// Example 1: Display all weather station data
const weatherData = await wsdotWeatherInformation.getCurrentWeatherInformation();
weatherData.forEach(station => {
  console.log(`${station.StationName}: ${station.TemperatureInFahrenheit}°F`);
});

// Example 2: Get specific station weather
const stationWeather = await wsdotWeatherInformation.getCurrentWeatherInformationByStationId({ stationId: 1909 });
// Display detailed weather information for specific station
```

## React Integration

For comprehensive React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### Available Hooks

| Hook | Parameters | Description | Caching Strategy |
|------|------------|-------------|------------------|
| `useCurrentWeatherInformation` | None | Get weather data for all stations | `MINUTE_UPDATES` |
| `useCurrentWeatherInformationByStationId` | `{ stationId: number }` | Get weather data for specific station | `MINUTE_UPDATES` |
| `useCurrentWeatherForStations` | `{ stationList: string }` | Get weather data for multiple stations | `MINUTE_UPDATES` |

### Basic Hook Usage

```typescript
import { useCurrentWeatherInformation } from 'ws-dottie/react/wsdot-weather-information';

function WeatherInformationList() {
  const { data, isLoading, error } = useCurrentWeatherInformation();

  if (isLoading) return <div>Loading weather data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(station => (
        <div key={station.StationID}>
          <h3>{station.StationName}</h3>
          <p>Temperature: {station.TemperatureInFahrenheit}°F</p>
          <p>Humidity: {station.RelativeHumidity}%</p>
          <p>Wind Speed: {station.AverageWindSpeed} mph</p>
          <p>Visibility: {station.VisibilityInMiles} miles</p>
        </div>
      ))}
    </div>
  );
}
```

## Data Types

### Type Summary

| Type Name | Description | Key Properties |
|-----------|-------------|----------------|
| `WeatherInfo` | Weather station information | `StationID`, `StationName`, `TemperatureInFahrenheit`, `RelativeHumidity`, `AverageWindSpeed`, `VisibilityInMiles` |

### Detailed Type Definitions

```typescript
type WeatherInfo = {
  StationID: number;                             // Unique identifier for the weather station
  StationName: string;                           // Name of the weather station
  TemperatureInFahrenheit: number;               // Current temperature in Fahrenheit
  RelativeHumidity: number;                      // Relative humidity percentage
  AverageWindSpeed: number;                      // Average wind speed in mph
  AverageWindDirection: number;                  // Average wind direction in degrees
  WindGust: number;                              // Wind gust speed in mph
  VisibilityInMiles: number;                     // Visibility in miles
  PrecipitationIntensity: number;                // Precipitation intensity
  PrecipitationType: number;                     // Type of precipitation
  BarometricPressure: number;                    // Barometric pressure
  Latitude: number;                              // Latitude coordinate of the station
  Longitude: number;                             // Longitude coordinate of the station
  Elevation: number;                             // Elevation in feet
  LastUpdated: string;                           // Last update timestamp
  State: string;                                 // State where the station is located
};
```

## Common Use Cases

### Use Case 1: Real-time Weather Monitoring
**Scenario**: Monitor real-time weather conditions across Washington State for transportation planning
**Solution**: Use the `getCurrentWeatherInformation` function to display current weather data from all stations

```typescript
// Implementation example
const weatherData = await wsdotWeatherInformation.getCurrentWeatherInformation();
// Display weather data in a real-time monitoring dashboard
```

### Use Case 2: Station-Specific Weather Analysis
**Scenario**: Analyze weather conditions for a specific location or weather station
**Solution**: Use the `getCurrentWeatherInformationByStationId` function to get detailed weather information for a specific station

```typescript
// Implementation example
const stationWeather = await wsdotWeatherInformation.getCurrentWeatherInformationByStationId({ stationId: 1909 });
// Analyze specific station weather data for local conditions
```

## Performance & Caching

This API uses the **MINUTE_UPDATES** caching strategy. For detailed information about caching configuration, performance optimization, and advanced caching options, see the [Performance & Caching](../API-REFERENCE.md#performance--caching) section in the API Reference.

| Caching Aspect | Configuration | Description |
|----------------|---------------|-------------|
| **Stale Time** | 5 minutes | Data considered fresh for 5 minutes |
| **Refetch Interval** | 5 minutes | Automatically refetch data every 5 minutes |
| **GC Time** | 10 minutes | Keep unused data in cache for 10 minutes |
| **Retry** | 3 attempts | Retry failed requests up to 3 times |

## Common Patterns

For information about data transformation, error handling, caching strategies, and other common patterns, see the [API Reference](../API-REFERENCE.md) documentation.

## References

- **[Error Handling](../API-REFERENCE.md#error-handling)** - Comprehensive error handling patterns
- **[Data Transformation](../API-REFERENCE.md#data-transformation)** - Automatic data conversion and filtering
- **[React Hooks](../API-REFERENCE.md#react-hooks)** - Complete React integration guide
- **[Performance & Caching](../API-REFERENCE.md#performance--caching)** - Advanced caching configuration
- **[Testing Status](../API-REFERENCE.md#testing-status)** - E2E test completion and validation status
- **[API Compliance](../API-REFERENCE.md#api-compliance)** - WSDOT API alignment verification 