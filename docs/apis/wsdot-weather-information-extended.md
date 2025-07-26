# WSDOT Weather Information Extended API

This module provides access to the WSDOT Weather Information Extended API, which offers comprehensive weather data including surface and subsurface measurements from WSDOT-maintained weather stations across Washington State.

## Overview

The Weather Information Extended API provides enhanced weather data including:
- Extended weather readings with surface and subsurface measurements
- Road surface temperature and condition data
- Subsurface temperature measurements
- Comprehensive precipitation data (1, 3, 6, 12, 24 hour periods)
- Snow depth and accumulation information
- Elevation data for weather stations
- Real-time weather updates with detailed sensor readings

## Features

| Feature | Description |
|---------|-------------|
| **Extended Weather Data** | Surface and subsurface temperature measurements |
| **Road Condition Monitoring** | Surface temperature, freezing temperature, and road condition codes |
| **Comprehensive Precipitation** | Multiple time period precipitation measurements (1h, 3h, 6h, 12h, 24h) |
| **Snow Monitoring** | Snow depth measurements in centimeters |
| **Elevation Data** | Station elevation information for altitude-based analysis |
| **Real-time Updates** | Live weather station readings with frequent updates |
| **Geographic Coverage** | Weather stations across Washington State |
| **Detailed Sensor Data** | Multiple sensors per station for comprehensive readings |

## API Endpoints

| Endpoint | Method | Description | Returns |
|----------|--------|-------------|---------|
| `/api/Scanweb` | GET | Extended weather information from all WSDOT weather stations | `WeatherReading[]` |

### Get Extended Weather Information

Retrieves comprehensive weather information including surface and subsurface measurements from all WSDOT weather stations.

```typescript
import { getWeatherInformationExtended } from '@wsdot/api-client';

const weatherReadings = await getWeatherInformationExtended();
```

**Returns:** `Promise<WeatherReading[]>`

## React Integration

For React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### React Hook Usage

```typescript
import { useWeatherInformationExtended } from 'ws-dottie/react/wsdot-weather-information-extended';

function WeatherComponent() {
  const { data: weatherReadings, isLoading, error } = useWeatherInformationExtended();
  
  // Component implementation
}
```

## Data Types

### WeatherReading

Represents extended weather information from a WSDOT weather station.

```typescript
type WeatherReading = {
  StationId: string;                           // Unique station identifier
  StationName: string;                         // Human-readable station name
  Latitude: number;                            // Station latitude coordinate
  Longitude: number;                           // Station longitude coordinate
  Elevation: number;                           // Station elevation in feet
  ReadingTime: Date | null;                    // When the reading was taken (can be null)
  AirTemperature: number | null;               // Air temperature in Celsius
  RelativeHumidty: number | null;              // Relative humidity percentage (note: API typo)
  AverageWindSpeed: number | null;             // Average wind speed
  AverageWindDirection: number | null;         // Average wind direction in degrees
  WindGust: number | null;                     // Wind gust speed
  Visibility: number | null;                   // Visibility in meters
  PrecipitationIntensity: number | null;       // Current precipitation intensity
  PrecipitationType: number | null;            // Type of precipitation
  PrecipitationPast1Hour: number | null;       // Precipitation in last 1 hour
  PrecipitationPast3Hours: number | null;      // Precipitation in last 3 hours
  PrecipitationPast6Hours: number | null;      // Precipitation in last 6 hours
  PrecipitationPast12Hours: number | null;     // Precipitation in last 12 hours
  PrecipitationPast24Hours: number | null;     // Precipitation in last 24 hours
  PrecipitationAccumulation: number | null;    // Total precipitation accumulation
  BarometricPressure: number | null;           // Barometric pressure
  SnowDepth: number | null;                    // Snow depth in centimeters
  SurfaceMeasurements: SurfaceMeasurement[] | null;   // Road surface measurements
  SubSurfaceMeasurements: SubSurfaceMeasurement[] | null; // Below-surface measurements
};
```

### SurfaceMeasurement

Represents road surface measurement data.

```typescript
type SurfaceMeasurement = {
  SensorId: number;                    // Unique sensor identifier
  SurfaceTemperature: number | null;   // Road surface temperature in Celsius
  RoadFreezingTemperature: number | null; // Road freezing temperature in Celsius
  RoadSurfaceCondition: number | null; // Road surface condition code
};
```

### SubSurfaceMeasurement

Represents subsurface measurement data.

```typescript
type SubSurfaceMeasurement = {
  SensorId: number;                    // Unique sensor identifier
  SubSurfaceTemperature: number | null; // Subsurface temperature in Celsius
};
```

### WeatherInformationExtendedResponse

Array of extended weather reading records.

```typescript
type WeatherInformationExtendedResponse = WeatherReading[];
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `options` | `object` | No | `{}` | Optional configuration object |
| `options.logMode` | `'none' \| 'basic' \| 'detailed'` | No | `'none'` | Logging level for API calls |

## React Hooks

| Hook | Description | Returns |
|------|-------------|---------|
| `useWeatherInformationExtended(options?)` | Fetches extended weather information | `UseQueryResult<WeatherReading[], WsdotApiError>` |

## Caching Strategy

| Strategy | Duration | Description |
|----------|----------|-------------|
| **Default Caching** | 5 minutes | Standard caching for weather data |
| **Stale Time** | 2 minutes | Data considered fresh for 2 minutes |
| **Background Refetch** | Enabled | Automatically refetches in background |
| **Error Retry** | 3 attempts | Retries failed requests up to 3 times |

## Common Patterns

For information about error handling, caching strategies, and other common patterns, see the [API Reference](../API-REFERENCE.md) documentation.

## Examples

### Weather Station Dashboard

```typescript
import { useWeatherInformationExtended } from 'ws-dottie/react/wsdot-weather-information-extended';

function WeatherStationDashboard() {
  const { data: weatherReadings, isLoading, error } = useWeatherInformationExtended();

  if (isLoading) return <div>Loading extended weather data...</div>;
  if (error) return <div>Error loading weather: {error.message}</div>;

  return (
    <div>
      <h2>Extended Weather Station Dashboard</h2>
      {weatherReadings?.map(reading => (
        <div key={reading.StationId} className="weather-card extended">
          <h3>{reading.StationName}</h3>
          <div className="weather-details">
            <div className="basic-info">
              <p><strong>Station ID:</strong> {reading.StationId}</p>
              <p><strong>Elevation:</strong> {reading.Elevation} ft</p>
              <p><strong>Coordinates:</strong> ({reading.Latitude}, {reading.Longitude})</p>
              <p><strong>Last Updated:</strong> {reading.ReadingTime?.toLocaleString()}</p>
            </div>
            
            <div className="air-conditions">
              <h4>Air Conditions</h4>
              <p><strong>Temperature:</strong> {reading.AirTemperature}°C</p>
              <p><strong>Humidity:</strong> {reading.RelativeHumidty}%</p>
              <p><strong>Wind:</strong> {reading.AverageWindSpeed} at {reading.AverageWindDirection}°</p>
              <p><strong>Wind Gust:</strong> {reading.WindGust}</p>
              <p><strong>Visibility:</strong> {reading.Visibility} m</p>
              <p><strong>Pressure:</strong> {reading.BarometricPressure} hPa</p>
            </div>
            
            <div className="precipitation">
              <h4>Precipitation</h4>
              <p><strong>Current Intensity:</strong> {reading.PrecipitationIntensity}</p>
              <p><strong>Type:</strong> {reading.PrecipitationType}</p>
              <p><strong>Past 1 Hour:</strong> {reading.PrecipitationPast1Hour}</p>
              <p><strong>Past 3 Hours:</strong> {reading.PrecipitationPast3Hours}</p>
              <p><strong>Past 6 Hours:</strong> {reading.PrecipitationPast6Hours}</p>
              <p><strong>Past 12 Hours:</strong> {reading.PrecipitationPast12Hours}</p>
              <p><strong>Past 24 Hours:</strong> {reading.PrecipitationPast24Hours}</p>
              <p><strong>Accumulation:</strong> {reading.PrecipitationAccumulation}</p>
            </div>
            
            <div className="snow-info">
              <h4>Snow Information</h4>
              <p><strong>Snow Depth:</strong> {reading.SnowDepth} cm</p>
            </div>
            
            {reading.SurfaceMeasurements && reading.SurfaceMeasurements.length > 0 && (
              <div className="surface-measurements">
                <h4>Surface Measurements</h4>
                {reading.SurfaceMeasurements.map((measurement, index) => (
                  <div key={measurement.SensorId} className="sensor-reading">
                    <h5>Sensor {measurement.SensorId}</h5>
                    <p><strong>Surface Temp:</strong> {measurement.SurfaceTemperature}°C</p>
                    <p><strong>Freezing Temp:</strong> {measurement.RoadFreezingTemperature}°C</p>
                    <p><strong>Surface Condition:</strong> {measurement.RoadSurfaceCondition}</p>
                  </div>
                ))}
              </div>
            )}
            
            {reading.SubSurfaceMeasurements && reading.SubSurfaceMeasurements.length > 0 && (
              <div className="subsurface-measurements">
                <h4>Subsurface Measurements</h4>
                {reading.SubSurfaceMeasurements.map((measurement, index) => (
                  <div key={measurement.SensorId} className="sensor-reading">
                    <h5>Sensor {measurement.SensorId}</h5>
                    <p><strong>Subsurface Temp:</strong> {measurement.SubSurfaceTemperature}°C</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Road Condition Monitoring

```typescript
import { useWeatherInformationExtended } from 'ws-dottie/react/wsdot-weather-information-extended';

function RoadConditionMonitor() {
  const { data: weatherReadings, isLoading, error } = useWeatherInformationExtended();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const stationsWithSurfaceData = weatherReadings?.filter(reading => 
    reading.SurfaceMeasurements && reading.SurfaceMeasurements.length > 0
  ) || [];

  const freezingConditions = stationsWithSurfaceData.filter(reading => 
    reading.SurfaceMeasurements?.some(measurement => 
      measurement.SurfaceTemperature !== null && measurement.SurfaceTemperature <= 0
    )
  );

  const wetConditions = stationsWithSurfaceData.filter(reading => 
    reading.PrecipitationIntensity !== null && reading.PrecipitationIntensity > 0
  );

  return (
    <div>
      <h2>Road Condition Monitor</h2>
      
      <div className="condition-summary">
        <div className="summary-card">
          <h3>Total Stations</h3>
          <p>{weatherReadings?.length || 0}</p>
        </div>
        <div className="summary-card">
          <h3>Stations with Surface Data</h3>
          <p>{stationsWithSurfaceData.length}</p>
        </div>
        <div className="summary-card warning">
          <h3>Freezing Conditions</h3>
          <p>{freezingConditions.length}</p>
        </div>
        <div className="summary-card alert">
          <h3>Wet Conditions</h3>
          <p>{wetConditions.length}</p>
        </div>
      </div>
      
      {freezingConditions.length > 0 && (
        <div className="alert-section">
          <h3>❄️ Freezing Road Conditions</h3>
          {freezingConditions.map(reading => (
            <div key={reading.StationId} className="alert freezing">
              <h4>{reading.StationName}</h4>
              <p><strong>Elevation:</strong> {reading.Elevation} ft</p>
              {reading.SurfaceMeasurements?.map(measurement => (
                <div key={measurement.SensorId}>
                  <p><strong>Surface Temperature:</strong> {measurement.SurfaceTemperature}°C</p>
                  <p><strong>Freezing Temperature:</strong> {measurement.RoadFreezingTemperature}°C</p>
                  <p><strong>Surface Condition:</strong> {measurement.RoadSurfaceCondition}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      
      {wetConditions.length > 0 && (
        <div className="alert-section">
          <h3>🌧️ Wet Road Conditions</h3>
          {wetConditions.map(reading => (
            <div key={reading.StationId} className="alert wet">
              <h4>{reading.StationName}</h4>
              <p><strong>Precipitation Intensity:</strong> {reading.PrecipitationIntensity}</p>
              <p><strong>Precipitation Type:</strong> {reading.PrecipitationType}</p>
              <p><strong>Past Hour:</strong> {reading.PrecipitationPast1Hour}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Snow Monitoring

```typescript
import { useWeatherInformationExtended } from 'ws-dottie/react/wsdot-weather-information-extended';

function SnowMonitor() {
  const { data: weatherReadings, isLoading, error } = useWeatherInformationExtended();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const stationsWithSnow = weatherReadings?.filter(reading => 
    reading.SnowDepth !== null && reading.SnowDepth > 0
  ) || [];

  const deepSnowStations = stationsWithSnow.filter(reading => 
    reading.SnowDepth !== null && reading.SnowDepth > 30
  );

  const moderateSnowStations = stationsWithSnow.filter(reading => 
    reading.SnowDepth !== null && reading.SnowDepth > 10 && reading.SnowDepth <= 30
  );

  return (
    <div>
      <h2>Snow Monitoring Dashboard</h2>
      
      <div className="snow-summary">
        <div className="summary-card">
          <h3>Total Stations</h3>
          <p>{weatherReadings?.length || 0}</p>
        </div>
        <div className="summary-card">
          <h3>Stations with Snow</h3>
          <p>{stationsWithSnow.length}</p>
        </div>
        <div className="summary-card warning">
          <h3>Moderate Snow (10-30cm)</h3>
          <p>{moderateSnowStations.length}</p>
        </div>
        <div className="summary-card alert">
          <h3>Deep Snow (>30cm)</h3>
          <p>{deepSnowStations.length}</p>
        </div>
      </div>
      
      {deepSnowStations.length > 0 && (
        <div className="snow-section">
          <h3>❄️ Deep Snow Conditions</h3>
          {deepSnowStations.map(reading => (
            <div key={reading.StationId} className="snow-card deep">
              <h4>{reading.StationName}</h4>
              <p><strong>Snow Depth:</strong> {reading.SnowDepth} cm</p>
              <p><strong>Elevation:</strong> {reading.Elevation} ft</p>
              <p><strong>Air Temperature:</strong> {reading.AirTemperature}°C</p>
              <p><strong>Coordinates:</strong> ({reading.Latitude}, {reading.Longitude})</p>
            </div>
          ))}
        </div>
      )}
      
      {moderateSnowStations.length > 0 && (
        <div className="snow-section">
          <h3>🌨️ Moderate Snow Conditions</h3>
          {moderateSnowStations.map(reading => (
            <div key={reading.StationId} className="snow-card moderate">
              <h4>{reading.StationName}</h4>
              <p><strong>Snow Depth:</strong> {reading.SnowDepth} cm</p>
              <p><strong>Elevation:</strong> {reading.Elevation} ft</p>
              <p><strong>Air Temperature:</strong> {reading.AirTemperature}°C</p>
            </div>
          ))}
        </div>
      )}
      
      <div className="all-snow-stations">
        <h3>All Snow Measurements</h3>
        {stationsWithSnow.map(reading => (
          <div key={reading.StationId} className="snow-item">
            <span className="station-name">{reading.StationName}</span>
            <span className="snow-depth">{reading.SnowDepth} cm</span>
            <span className="elevation">{reading.Elevation} ft</span>
            <span className="temperature">{reading.AirTemperature}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Precipitation Analysis

```typescript
import { useWeatherInformationExtended } from 'ws-dottie/react/wsdot-weather-information-extended';

function PrecipitationAnalysis() {
  const { data: weatherReadings, isLoading, error } = useWeatherInformationExtended();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const stationsWithPrecipitation = weatherReadings?.filter(reading => 
    reading.PrecipitationPast24Hours !== null && reading.PrecipitationPast24Hours > 0
  ) || [];

  const heavyPrecipitation = stationsWithPrecipitation.filter(reading => 
    reading.PrecipitationPast24Hours !== null && reading.PrecipitationPast24Hours > 25
  );

  const moderatePrecipitation = stationsWithPrecipitation.filter(reading => 
    reading.PrecipitationPast24Hours !== null && 
    reading.PrecipitationPast24Hours > 5 && 
    reading.PrecipitationPast24Hours <= 25
  );

  return (
    <div>
      <h2>Precipitation Analysis</h2>
      
      <div className="precipitation-summary">
        <div className="summary-card">
          <h3>Total Stations</h3>
          <p>{weatherReadings?.length || 0}</p>
        </div>
        <div className="summary-card">
          <h3>Stations with Precipitation</h3>
          <p>{stationsWithPrecipitation.length}</p>
        </div>
        <div className="summary-card warning">
          <h3>Moderate Precipitation (5-25mm)</h3>
          <p>{moderatePrecipitation.length}</p>
        </div>
        <div className="summary-card alert">
          <h3>Heavy Precipitation (>25mm)</h3>
          <p>{heavyPrecipitation.length}</p>
        </div>
      </div>
      
      {heavyPrecipitation.length > 0 && (
        <div className="precipitation-section">
          <h3>🌧️ Heavy Precipitation (24h)</h3>
          {heavyPrecipitation.map(reading => (
            <div key={reading.StationId} className="precipitation-card heavy">
              <h4>{reading.StationName}</h4>
              <p><strong>24h Total:</strong> {reading.PrecipitationPast24Hours} mm</p>
              <p><strong>12h Total:</strong> {reading.PrecipitationPast12Hours} mm</p>
              <p><strong>6h Total:</strong> {reading.PrecipitationPast6Hours} mm</p>
              <p><strong>3h Total:</strong> {reading.PrecipitationPast3Hours} mm</p>
              <p><strong>1h Total:</strong> {reading.PrecipitationPast1Hour} mm</p>
              <p><strong>Current Intensity:</strong> {reading.PrecipitationIntensity}</p>
              <p><strong>Type:</strong> {reading.PrecipitationType}</p>
              <p><strong>Accumulation:</strong> {reading.PrecipitationAccumulation} mm</p>
            </div>
          ))}
        </div>
      )}
      
      <div className="precipitation-timeline">
        <h3>Precipitation Timeline Analysis</h3>
        {stationsWithPrecipitation.map(reading => (
          <div key={reading.StationId} className="timeline-card">
            <h4>{reading.StationName}</h4>
            <div className="timeline">
              <div className="timeline-item">
                <span className="period">1h</span>
                <span className="amount">{reading.PrecipitationPast1Hour} mm</span>
              </div>
              <div className="timeline-item">
                <span className="period">3h</span>
                <span className="amount">{reading.PrecipitationPast3Hours} mm</span>
              </div>
              <div className="timeline-item">
                <span className="period">6h</span>
                <span className="amount">{reading.PrecipitationPast6Hours} mm</span>
              </div>
              <div className="timeline-item">
                <span className="period">12h</span>
                <span className="amount">{reading.PrecipitationPast12Hours} mm</span>
              </div>
              <div className="timeline-item">
                <span className="period">24h</span>
                <span className="amount">{reading.PrecipitationPast24Hours} mm</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Elevation-Based Weather Analysis

```typescript
import { useWeatherInformationExtended } from 'ws-dottie/react/wsdot-weather-information-extended';

function ElevationWeatherAnalysis() {
  const { data: weatherReadings, isLoading, error } = useWeatherInformationExtended();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const lowElevation = weatherReadings?.filter(reading => reading.Elevation < 1000) || [];
  const midElevation = weatherReadings?.filter(reading => 
    reading.Elevation >= 1000 && reading.Elevation < 3000
  ) || [];
  const highElevation = weatherReadings?.filter(reading => reading.Elevation >= 3000) || [];

  const calculateAverageTemp = (readings: typeof weatherReadings) => 
    readings.reduce((sum, reading) => sum + (reading.AirTemperature || 0), 0) / 
    (readings.filter(reading => reading.AirTemperature !== null).length || 1);

  const calculateAverageSnow = (readings: typeof weatherReadings) => 
    readings.reduce((sum, reading) => sum + (reading.SnowDepth || 0), 0) / 
    (readings.filter(reading => reading.SnowDepth !== null).length || 1);

  return (
    <div>
      <h2>Elevation-Based Weather Analysis</h2>
      
      <div className="elevation-summary">
        <div className="elevation-card low">
          <h3>Low Elevation (< 1000 ft)</h3>
          <p><strong>Stations:</strong> {lowElevation.length}</p>
          <p><strong>Avg Temperature:</strong> {calculateAverageTemp(lowElevation).toFixed(1)}°C</p>
          <p><strong>Avg Snow Depth:</strong> {calculateAverageSnow(lowElevation).toFixed(1)} cm</p>
        </div>
        
        <div className="elevation-card mid">
          <h3>Mid Elevation (1000-3000 ft)</h3>
          <p><strong>Stations:</strong> {midElevation.length}</p>
          <p><strong>Avg Temperature:</strong> {calculateAverageTemp(midElevation).toFixed(1)}°C</p>
          <p><strong>Avg Snow Depth:</strong> {calculateAverageSnow(midElevation).toFixed(1)} cm</p>
        </div>
        
        <div className="elevation-card high">
          <h3>High Elevation (≥ 3000 ft)</h3>
          <p><strong>Stations:</strong> {highElevation.length}</p>
          <p><strong>Avg Temperature:</strong> {calculateAverageTemp(highElevation).toFixed(1)}°C</p>
          <p><strong>Avg Snow Depth:</strong> {calculateAverageSnow(highElevation).toFixed(1)} cm</p>
        </div>
      </div>
      
      <div className="elevation-details">
        {lowElevation.length > 0 && (
          <div className="elevation-section">
            <h3>Low Elevation Stations</h3>
            {lowElevation.map(reading => (
              <div key={reading.StationId} className="station-item low">
                <h4>{reading.StationName}</h4>
                <p><strong>Elevation:</strong> {reading.Elevation} ft</p>
                <p><strong>Temperature:</strong> {reading.AirTemperature}°C</p>
                <p><strong>Snow Depth:</strong> {reading.SnowDepth} cm</p>
              </div>
            ))}
          </div>
        )}
        
        {midElevation.length > 0 && (
          <div className="elevation-section">
            <h3>Mid Elevation Stations</h3>
            {midElevation.map(reading => (
              <div key={reading.StationId} className="station-item mid">
                <h4>{reading.StationName}</h4>
                <p><strong>Elevation:</strong> {reading.Elevation} ft</p>
                <p><strong>Temperature:</strong> {reading.AirTemperature}°C</p>
                <p><strong>Snow Depth:</strong> {reading.SnowDepth} cm</p>
              </div>
            ))}
          </div>
        )}
        
        {highElevation.length > 0 && (
          <div className="elevation-section">
            <h3>High Elevation Stations</h3>
            {highElevation.map(reading => (
              <div key={reading.StationId} className="station-item high">
                <h4>{reading.StationName}</h4>
                <p><strong>Elevation:</strong> {reading.Elevation} ft</p>
                <p><strong>Temperature:</strong> {reading.AirTemperature}°C</p>
                <p><strong>Snow Depth:</strong> {reading.SnowDepth} cm</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

## Common Use Cases

### Road Condition Monitoring
Monitor road surface temperatures and conditions for winter maintenance operations.

### Snow Depth Tracking
Track snow accumulation across different elevations and regions.

### Precipitation Analysis
Analyze precipitation patterns across multiple time periods for flood monitoring.

### Weather Station Network
Build comprehensive weather monitoring dashboards with extended sensor data.

### Elevation-Based Analysis
Compare weather conditions across different elevation zones.

## API Documentation

- **WSDOT Documentation**: [Scanweb Controller](https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_controller_1_1_scanweb_controller.html)
- **API Endpoint**: [Scanweb API](https://wsdot.wa.gov/traffic/api/api/Scanweb)

## Notes

- Temperature values are in Celsius
- Elevation values are in feet
- Visibility values are in meters
- Snow depth values are in centimeters
- Precipitation values are in millimeters
- Wind speed values are in the same units as the basic weather API
- Surface and subsurface measurements provide detailed road condition data
- Some weather stations may not report all data fields (null values are common)
- The API includes a typo in "RelativeHumidty" (should be "RelativeHumidity")
- Data is updated frequently, so caching strategies are optimized for real-time updates
- Geographic coordinates can be used with mapping libraries for visualization
- Station names typically include location and station identifier information
- Surface measurements are particularly useful for road condition monitoring
- Subsurface measurements help with understanding ground temperature conditions 