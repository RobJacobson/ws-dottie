# WSDOT Weather Information API

This module provides access to the WSDOT Weather Information API, which offers real-time weather data from WSDOT-maintained weather stations across Washington State.

## Overview

The Weather Information API provides data about:
- Current weather conditions from WSDOT weather stations
- Temperature, humidity, and barometric pressure readings
- Wind speed, direction, and gust information
- Precipitation and visibility measurements
- Geographic location of weather stations
- Real-time weather updates

## API Endpoints

### Get All Weather Information

Retrieves current weather information from all WSDOT weather stations.

```typescript
import { getWeatherInformation } from '@wsdot/api-client';

const weatherInfo = await getWeatherInformation();
```

**Returns:** `Promise<WeatherInfo[]>`

### Get Weather Information by Station ID

Retrieves weather information for a specific weather station.

```typescript
import { getWeatherInformationByStationId } from '@wsdot/api-client';

const weatherInfo = await getWeatherInformationByStationId(1909);
```

**Parameters:**
- `stationId` (number): The unique identifier for the weather station

**Returns:** `Promise<WeatherInfo>`

### Get Weather Information for Multiple Stations

Retrieves weather information for multiple specified stations.

```typescript
import { getWeatherInformationForStations } from '@wsdot/api-client';

const weatherInfo = await getWeatherInformationForStations("1909,1910,1928");
```

**Parameters:**
- `stationIds` (string): Comma-separated list of station IDs

**Returns:** `Promise<WeatherInfo[]>`

## React Query Hooks

### useWeatherInformation

React Query hook for retrieving all weather information.

```typescript
import { useWeatherInformation } from '@wsdot/api-client';

function WeatherInformationComponent() {
  const { data: weatherInfo, isLoading, error } = useWeatherInformation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {weatherInfo?.map(station => (
        <div key={station.StationID}>
          <h3>{station.StationName}</h3>
          <p>Temperature: {station.TemperatureInFahrenheit}°F</p>
          <p>Humidity: {station.RelativeHumidity}%</p>
          <p>Wind: {station.WindSpeedInMPH} mph {station.WindDirectionCardinal}</p>
        </div>
      ))}
    </div>
  );
}
```

### useWeatherInformationByStationId

React Query hook for retrieving weather information for a specific station.

```typescript
import { useWeatherInformationByStationId } from '@wsdot/api-client';

function WeatherStationComponent({ stationId }: { stationId: number }) {
  const { data: weatherInfo, isLoading, error } = useWeatherInformationByStationId(stationId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{weatherInfo?.StationName}</h2>
      <p>Temperature: {weatherInfo?.TemperatureInFahrenheit}°F</p>
      <p>Humidity: {weatherInfo?.RelativeHumidity}%</p>
      <p>Wind: {weatherInfo?.WindSpeedInMPH} mph {weatherInfo?.WindDirectionCardinal}</p>
      <p>Pressure: {weatherInfo?.BarometricPressure} hPa</p>
      <p>Visibility: {weatherInfo?.Visibility} miles</p>
      <p>Last Updated: {weatherInfo?.ReadingTime.toLocaleString()}</p>
    </div>
  );
}
```

### useWeatherInformationForStations

React Query hook for retrieving weather information for multiple stations.

```typescript
import { useWeatherInformationForStations } from '@wsdot/api-client';

function MultiStationWeatherComponent({ stationIds }: { stationIds: string }) {
  const { data: weatherInfo, isLoading, error } = useWeatherInformationForStations(stationIds);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {weatherInfo?.map(station => (
        <div key={station.StationID}>
          <h3>{station.StationName}</h3>
          <p>Temperature: {station.TemperatureInFahrenheit}°F</p>
          <p>Humidity: {station.RelativeHumidity}%</p>
          <p>Wind: {station.WindSpeedInMPH} mph {station.WindDirectionCardinal}</p>
        </div>
      ))}
    </div>
  );
}
```

## Data Types

### WeatherInfo

Represents weather information from a WSDOT weather station.

```typescript
type WeatherInfo = {
  BarometricPressure: number | null;        // Barometric pressure in hPa
  Latitude: number;                         // Station latitude coordinate
  Longitude: number;                        // Station longitude coordinate
  PrecipitationInInches: number | null;     // Precipitation amount in inches
  ReadingTime: Date;                        // When the reading was taken
  RelativeHumidity: number | null;          // Relative humidity percentage
  SkyCoverage: string | null;               // Sky coverage description
  StationID: number;                        // Unique station identifier
  StationName: string;                      // Human-readable station name
  TemperatureInFahrenheit: number | null;   // Temperature in Fahrenheit
  Visibility: number | null;                // Visibility in miles
  WindDirection: number | null;             // Wind direction in degrees (0-359)
  WindDirectionCardinal: string | null;     // Wind direction cardinal (N, S, E, W, etc.)
  WindGustSpeedInMPH: number | null;        // Wind gust speed in mph
  WindSpeedInMPH: number | null;            // Wind speed in mph
};
```

### WeatherInformationResponse

Array of weather information records.

```typescript
type WeatherInformationResponse = WeatherInfo[];
```

## Error Handling

All functions throw `WsdotApiError` instances when the API request fails. Common error scenarios include:

- **API_ERROR**: The WSDOT API returned an error response
- **NETWORK_ERROR**: Network connectivity issues
- **TIMEOUT_ERROR**: Request timed out

```typescript
import { getWeatherInformation } from '@wsdot/api-client';
import { WsdotApiError } from '@wsdot/api-client';

try {
  const weatherInfo = await getWeatherInformation();
  console.log('Weather stations retrieved:', weatherInfo.length);
} catch (error) {
  if (error instanceof WsdotApiError) {
    console.error('WSDOT API Error:', error.message);
    console.error('Error Code:', error.code);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Caching

The React Query hooks use frequent update caching strategies:

- **Stale Time**: 30 seconds (data considered fresh for 30 seconds)
- **Cache Time**: 2 minutes (data kept in cache for 2 minutes)
- **Refetch Interval**: 30 seconds (automatically refetch every 30 seconds)

## Examples

### Display All Weather Stations

```typescript
import { useWeatherInformation } from '@wsdot/api-client';

function WeatherStationsList() {
  const { data: weatherInfo, isLoading, error } = useWeatherInformation();

  if (isLoading) return <div>Loading weather data...</div>;
  if (error) return <div>Error loading weather: {error.message}</div>;

  return (
    <div>
      <h2>Current Weather Conditions</h2>
      {weatherInfo?.map(station => (
        <div key={station.StationID} className="weather-card">
          <h3>{station.StationName}</h3>
          <div className="weather-details">
            <p><strong>Temperature:</strong> {station.TemperatureInFahrenheit}°F</p>
            <p><strong>Humidity:</strong> {station.RelativeHumidity}%</p>
            <p><strong>Wind:</strong> {station.WindSpeedInMPH} mph {station.WindDirectionCardinal}</p>
            <p><strong>Pressure:</strong> {station.BarometricPressure} hPa</p>
            <p><strong>Visibility:</strong> {station.Visibility} miles</p>
            <p><strong>Precipitation:</strong> {station.PrecipitationInInches} inches</p>
            <p><strong>Last Updated:</strong> {station.ReadingTime.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Weather Map Display

```typescript
import { useWeatherInformation } from '@wsdot/api-client';

function WeatherMap() {
  const { data: weatherInfo, isLoading, error } = useWeatherInformation();

  if (isLoading) return <div>Loading weather data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Weather Station Map</h2>
      {weatherInfo?.map(station => (
        <div key={station.StationID} className="weather-marker">
          <h3>{station.StationName}</h3>
          <p><strong>Coordinates:</strong> ({station.Latitude}, {station.Longitude})</p>
          <p><strong>Temperature:</strong> {station.TemperatureInFahrenheit}°F</p>
          <p><strong>Wind:</strong> {station.WindSpeedInMPH} mph {station.WindDirectionCardinal}</p>
          
          {/* These coordinates can be used with mapping libraries */}
          <div className="map-coordinates">
            <p>Latitude: {station.Latitude}</p>
            <p>Longitude: {station.Longitude}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Weather Alerts

```typescript
import { useWeatherInformation } from '@wsdot/api-client';

function WeatherAlerts() {
  const { data: weatherInfo, isLoading, error } = useWeatherInformation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const lowVisibilityStations = weatherInfo?.filter(station => 
    station.Visibility !== null && station.Visibility < 5
  ) || [];

  const highWindStations = weatherInfo?.filter(station => 
    station.WindSpeedInMPH !== null && station.WindSpeedInMPH > 25
  ) || [];

  const freezingStations = weatherInfo?.filter(station => 
    station.TemperatureInFahrenheit !== null && station.TemperatureInFahrenheit < 32
  ) || [];

  return (
    <div>
      <h2>Weather Alerts</h2>
      
      {lowVisibilityStations.length > 0 && (
        <div className="alert-section">
          <h3>🌫️ Low Visibility Alerts</h3>
          {lowVisibilityStations.map(station => (
            <div key={station.StationID} className="alert low-visibility">
              <h4>{station.StationName}</h4>
              <p><strong>Visibility:</strong> {station.Visibility} miles</p>
            </div>
          ))}
        </div>
      )}
      
      {highWindStations.length > 0 && (
        <div className="alert-section">
          <h3>💨 High Wind Alerts</h3>
          {highWindStations.map(station => (
            <div key={station.StationID} className="alert high-wind">
              <h4>{station.StationName}</h4>
              <p><strong>Wind Speed:</strong> {station.WindSpeedInMPH} mph {station.WindDirectionCardinal}</p>
            </div>
          ))}
        </div>
      )}
      
      {freezingStations.length > 0 && (
        <div className="alert-section">
          <h3>❄️ Freezing Temperature Alerts</h3>
          {freezingStations.map(station => (
            <div key={station.StationID} className="alert freezing">
              <h4>{station.StationName}</h4>
              <p><strong>Temperature:</strong> {station.TemperatureInFahrenheit}°F</p>
            </div>
          ))}
        </div>
      )}
      
      {lowVisibilityStations.length === 0 && highWindStations.length === 0 && freezingStations.length === 0 && (
        <p>✅ No weather alerts at this time</p>
      )}
    </div>
  );
}
```

### Weather Dashboard

```typescript
import { useWeatherInformation } from '@wsdot/api-client';

function WeatherDashboard() {
  const { data: weatherInfo, isLoading, error } = useWeatherInformation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalStations = weatherInfo?.length || 0;
  const activeStations = weatherInfo?.filter(station => 
    station.TemperatureInFahrenheit !== null || station.WindSpeedInMPH !== null
  ).length || 0;
  
  const averageTemperature = weatherInfo?.reduce((sum, station) => 
    sum + (station.TemperatureInFahrenheit || 0), 0
  ) / (weatherInfo?.filter(station => station.TemperatureInFahrenheit !== null).length || 1) || 0;
  
  const coldestStation = weatherInfo?.reduce((coldest, station) => 
    station.TemperatureInFahrenheit !== null && 
    (coldest.TemperatureInFahrenheit === null || station.TemperatureInFahrenheit < coldest.TemperatureInFahrenheit) 
      ? station : coldest
  );
  
  const warmestStation = weatherInfo?.reduce((warmest, station) => 
    station.TemperatureInFahrenheit !== null && 
    (warmest.TemperatureInFahrenheit === null || station.TemperatureInFahrenheit > warmest.TemperatureInFahrenheit) 
      ? station : warmest
  );

  return (
    <div>
      <h2>Weather Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Stations</h3>
          <p className="stat-value">{totalStations}</p>
        </div>
        
        <div className="stat-card">
          <h3>Active Stations</h3>
          <p className="stat-value">{activeStations}</p>
        </div>
        
        <div className="stat-card">
          <h3>Average Temperature</h3>
          <p className="stat-value">{averageTemperature.toFixed(1)}°F</p>
        </div>
      </div>
      
      {coldestStation && (
        <div className="weather-card coldest">
          <h3>Coldest Station</h3>
          <h4>{coldestStation.StationName}</h4>
          <p>Temperature: {coldestStation.TemperatureInFahrenheit}°F</p>
          <p>Wind: {coldestStation.WindSpeedInMPH} mph {coldestStation.WindDirectionCardinal}</p>
        </div>
      )}
      
      {warmestStation && (
        <div className="weather-card warmest">
          <h3>Warmest Station</h3>
          <h4>{warmestStation.StationName}</h4>
          <p>Temperature: {warmestStation.TemperatureInFahrenheit}°F</p>
          <p>Wind: {warmestStation.WindSpeedInMPH} mph {warmestStation.WindDirectionCardinal}</p>
        </div>
      )}
      
      <div className="stations-list">
        <h3>All Weather Stations</h3>
        {weatherInfo?.map(station => (
          <div key={station.StationID} className="station-item">
            <h4>{station.StationName}</h4>
            <div className="station-details">
              <span>🌡️ {station.TemperatureInFahrenheit}°F</span>
              <span>💧 {station.RelativeHumidity}%</span>
              <span>💨 {station.WindSpeedInMPH} mph {station.WindDirectionCardinal}</span>
              <span>👁️ {station.Visibility} mi</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Regional Weather Comparison

```typescript
import { useWeatherInformation } from '@wsdot/api-client';

function RegionalWeatherComparison() {
  const { data: weatherInfo, isLoading, error } = useWeatherInformation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Group stations by approximate regions based on coordinates
  const seattleStations = weatherInfo?.filter(station => 
    station.Latitude > 47.5 && station.Latitude < 47.8 && 
    station.Longitude > -122.5 && station.Longitude < -122.2
  ) || [];

  const everettStations = weatherInfo?.filter(station => 
    station.Latitude > 47.8 && station.Latitude < 48.2 && 
    station.Longitude > -122.5 && station.Longitude < -122.0
  ) || [];

  const calculateAverageTemp = (stations: typeof weatherInfo) => 
    stations.reduce((sum, station) => sum + (station.TemperatureInFahrenheit || 0), 0) / 
    (stations.filter(station => station.TemperatureInFahrenheit !== null).length || 1);

  return (
    <div>
      <h2>Regional Weather Comparison</h2>
      
      <div className="region-comparison">
        <div className="region-card">
          <h3>Seattle Area</h3>
          <p>Average Temperature: {calculateAverageTemp(seattleStations).toFixed(1)}°F</p>
          <p>Stations: {seattleStations.length}</p>
          {seattleStations.map(station => (
            <div key={station.StationID} className="station-mini">
              <span>{station.StationName}</span>
              <span>{station.TemperatureInFahrenheit}°F</span>
            </div>
          ))}
        </div>
        
        <div className="region-card">
          <h3>Everett Area</h3>
          <p>Average Temperature: {calculateAverageTemp(everettStations).toFixed(1)}°F</p>
          <p>Stations: {everettStations.length}</p>
          {everettStations.map(station => (
            <div key={station.StationID} className="station-mini">
              <span>{station.StationName}</span>
              <span>{station.TemperatureInFahrenheit}°F</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## API Documentation

- **WSDOT Documentation**: [Weather Information](https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html)
- **API Help**: [Weather Information REST Service](https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help)

## Notes

- Temperature values are in Fahrenheit
- Wind speeds are in miles per hour (MPH)
- Barometric pressure is in hectopascals (hPa)
- Visibility is in miles
- Precipitation is in inches
- Wind direction is in degrees (0-359) with cardinal directions (N, S, E, W, NE, NW, SE, SW, etc.)
- Some weather stations may not report all data fields (null values are common)
- Data is updated frequently, so caching strategies are optimized for real-time updates
- Geographic coordinates can be used with mapping libraries for visualization
- Station names typically include location and milepost information 