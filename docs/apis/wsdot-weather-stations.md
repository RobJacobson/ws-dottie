# WSDOT Weather Stations API

This module provides access to the WSDOT Weather Stations API, which offers information about all weather stations maintained by WSDOT across Washington State.

## Overview

The Weather Stations API provides basic information about WSDOT weather stations including:
- Station location data (latitude and longitude coordinates)
- Station identification codes
- Station names with descriptive location information
- Complete list of all WSDOT-maintained weather stations
- Geographic distribution of weather monitoring infrastructure

## Features

| Feature | Description |
|---------|-------------|
| **Station Metadata** | Location, identification codes, and descriptive names |
| **Geographic Coverage** | Weather stations across Washington State highways |
| **Station Discovery** | Find available weather stations in specific areas |
| **Weather Data Integration** | Use station codes with Weather Information API |
| **Geographic Filtering** | Filter stations by location or region |
| **Station Mapping** | Display weather station locations on maps |
| **Route Planning** | Find weather stations along travel routes |
| **Static Data** | Relatively stable station information |

## API Endpoints

| Endpoint | Method | Description | Returns |
|----------|--------|-------------|---------|
| `GetCurrentStationsAsJson` | GET | Retrieve list of all weather stations | `WeatherStationData[]` |

### Get Weather Stations

Retrieves a list of all WSDOT weather stations with their location and identification information.

```typescript
import { getWeatherStations } from '@wsdot/api-client';

const weatherStations = await getWeatherStations();
```

**Returns:** `Promise<WeatherStationData[]>`

## React Integration

For React Query hooks, TanStack Query setup, error handling, and caching strategies, see the [API Reference](../API-REFERENCE.md) documentation.

### React Hook Usage

```typescript
import { useWeatherStations } from 'ws-dottie/react/wsdot-weather-stations';

function WeatherComponent() {
  const { data: weatherStations, isLoading, error } = useWeatherStations();
  
  // Component implementation
}
```

## Data Types

### WeatherStationData

Represents weather station information from WSDOT.

```typescript
type WeatherStationData = {
  Latitude: number;        // Station latitude coordinate
  Longitude: number;       // Station longitude coordinate
  StationCode: number;     // Unique station identifier
  StationName: string | null; // Human-readable station name with location
};
```

### WeatherStationsResponse

Array of weather station data records.

```typescript
type WeatherStationsResponse = WeatherStationData[];
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `options` | `object` | No | `{}` | Optional configuration object |
| `options.logMode` | `'none' \| 'basic' \| 'detailed'` | No | `'none'` | Logging level for API calls |

## React Hooks

| Hook | Description | Returns |
|------|-------------|---------|
| `useWeatherStations(options?)` | Fetches weather station metadata | `UseQueryResult<WeatherStationData[], WsdotApiError>` |

## Caching Strategy

| Strategy | Duration | Description |
|----------|----------|-------------|
| **Default Caching** | 24 hours | Long-term caching for static station data |
| **Stale Time** | 12 hours | Data considered fresh for 12 hours |
| **Background Refetch** | Disabled | No background refetch for static data |
| **Error Retry** | 3 attempts | Retries failed requests up to 3 times |

## Common Patterns

For information about error handling, caching strategies, and other common patterns, see the [API Reference](../API-REFERENCE.md) documentation.

## Examples

### Weather Station Map

```typescript
import { useWeatherStations } from 'ws-dottie/react/wsdot-weather-stations';

function WeatherStationMap() {
  const { data: weatherStations, isLoading, error } = useWeatherStations();

  if (isLoading) return <div>Loading weather stations...</div>;
  if (error) return <div>Error loading stations: {error.message}</div>;

  return (
    <div>
      <h2>WSDOT Weather Stations Map</h2>
      <div className="station-map">
        {weatherStations?.map(station => (
          <div 
            key={station.StationCode} 
            className="station-marker"
            style={{
              left: `${((station.Longitude + 125) / 9) * 100}%`,
              top: `${((50 - station.Latitude) / 5) * 100}%`
            }}
            title={station.StationName || `Station ${station.StationCode}`}
          >
            <div className="marker-tooltip">
              <strong>{station.StationName || `Station ${station.StationCode}`}</strong>
              <br />
              Code: {station.StationCode}
              <br />
              Location: {station.Latitude.toFixed(4)}, {station.Longitude.toFixed(4)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Station Search and Filter

```typescript
import { useWeatherStations } from 'ws-dottie/react/wsdot-weather-stations';
import { useState, useMemo } from 'react';

function WeatherStationSearch() {
  const { data: weatherStations, isLoading, error } = useWeatherStations();
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('all');

  const filteredStations = useMemo(() => {
    if (!weatherStations) return [];
    
    return weatherStations.filter(station => {
      const stationName = station.StationName || `Station ${station.StationCode}`;
      const matchesSearch = stationName.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesRegion = true;
      if (region === 'seattle') {
        matchesRegion = station.Latitude > 47.5 && station.Longitude > -122.5;
      } else if (region === 'spokane') {
        matchesRegion = station.Longitude < -117;
      } else if (region === 'tacoma') {
        matchesRegion = station.Latitude < 47.3 && station.Longitude > -122.5;
      }
      
      return matchesSearch && matchesRegion;
    });
  }, [weatherStations, searchTerm, region]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Weather Station Search</h2>
      
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search station names..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="all">All Regions</option>
          <option value="seattle">Seattle Area</option>
          <option value="spokane">Spokane Area</option>
          <option value="tacoma">Tacoma Area</option>
        </select>
      </div>
      
      <div className="results">
        <p>Found {filteredStations.length} stations</p>
        
        {filteredStations.map(station => (
          <div key={station.StationCode} className="station-card">
            <h3>{station.StationName || `Station ${station.StationCode}`}</h3>
            <p><strong>Station Code:</strong> {station.StationCode}</p>
            <p><strong>Coordinates:</strong> {station.Latitude.toFixed(4)}, {station.Longitude.toFixed(4)}</p>
            <p><strong>Region:</strong> {
              station.Latitude > 47.5 && station.Longitude > -122.5 ? 'Seattle Area' :
              station.Longitude < -117 ? 'Spokane Area' :
              station.Latitude < 47.3 && station.Longitude > -122.5 ? 'Tacoma Area' :
              'Other'
            }</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Station Statistics Dashboard

```typescript
import { useWeatherStations } from 'ws-dottie/react/wsdot-weather-stations';

function WeatherStationStats() {
  const { data: weatherStations, isLoading, error } = useWeatherStations();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const stats = {
    totalStations: weatherStations?.length || 0,
    seattleArea: weatherStations?.filter(s => s.Latitude > 47.5 && s.Longitude > -122.5).length || 0,
    spokaneArea: weatherStations?.filter(s => s.Longitude < -117).length || 0,
    tacomaArea: weatherStations?.filter(s => s.Latitude < 47.3 && s.Longitude > -122.5).length || 0,
    otherAreas: weatherStations?.filter(s => 
      !(s.Latitude > 47.5 && s.Longitude > -122.5) &&
      !(s.Longitude < -117) &&
      !(s.Latitude < 47.3 && s.Longitude > -122.5)
    ).length || 0
  };

  const avgLat = weatherStations?.reduce((sum, s) => sum + s.Latitude, 0) / stats.totalStations || 0;
  const avgLon = weatherStations?.reduce((sum, s) => sum + s.Longitude, 0) / stats.totalStations || 0;

  return (
    <div>
      <h2>Weather Station Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Stations</h3>
          <p className="stat-number">{stats.totalStations}</p>
        </div>
        
        <div className="stat-card">
          <h3>Seattle Area</h3>
          <p className="stat-number">{stats.seattleArea}</p>
        </div>
        
        <div className="stat-card">
          <h3>Spokane Area</h3>
          <p className="stat-number">{stats.spokaneArea}</p>
        </div>
        
        <div className="stat-card">
          <h3>Tacoma Area</h3>
          <p className="stat-number">{stats.tacomaArea}</p>
        </div>
        
        <div className="stat-card">
          <h3>Other Areas</h3>
          <p className="stat-number">{stats.otherAreas}</p>
        </div>
      </div>
      
      <div className="coordinate-stats">
        <h3>Geographic Center</h3>
        <p><strong>Average Latitude:</strong> {avgLat.toFixed(4)}</p>
        <p><strong>Average Longitude:</strong> {avgLon.toFixed(4)}</p>
      </div>
      
      <div className="station-list">
        <h3>All Stations</h3>
        <div className="station-table">
          <table>
            <thead>
              <tr>
                <th>Station Code</th>
                <th>Station Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {weatherStations?.map(station => (
                <tr key={station.StationCode}>
                  <td>{station.StationCode}</td>
                  <td>{station.StationName || `Station ${station.StationCode}`}</td>
                  <td>{station.Latitude.toFixed(4)}</td>
                  <td>{station.Longitude.toFixed(4)}</td>
                  <td>{
                    station.Latitude > 47.5 && station.Longitude > -122.5 ? 'Seattle' :
                    station.Longitude < -117 ? 'Spokane' :
                    station.Latitude < 47.3 && station.Longitude > -122.5 ? 'Tacoma' :
                    'Other'
                  }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```

### Station Proximity Finder

```typescript
import { useWeatherStations } from 'ws-dottie/react/wsdot-weather-stations';
import { useState, useMemo } from 'react';

function StationProximityFinder() {
  const { data: weatherStations, isLoading, error } = useWeatherStations();
  const [userLat, setUserLat] = useState(47.6062);
  const [userLon, setUserLon] = useState(-122.3321);

  const nearbyStations = useMemo(() => {
    if (!weatherStations) return [];
    
    return weatherStations
      .map(station => {
        const distance = calculateDistance(
          userLat, userLon,
          station.Latitude, station.Longitude
        );
        return { ...station, distance };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);
  }, [weatherStations, userLat, userLon]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Nearby Weather Stations</h2>
      
      <div className="location-input">
        <label>
          Your Latitude:
          <input
            type="number"
            step="0.0001"
            value={userLat}
            onChange={(e) => setUserLat(parseFloat(e.target.value))}
          />
        </label>
        
        <label>
          Your Longitude:
          <input
            type="number"
            step="0.0001"
            value={userLon}
            onChange={(e) => setUserLon(parseFloat(e.target.value))}
          />
        </label>
      </div>
      
      <div className="nearby-stations">
        <h3>Closest Weather Stations</h3>
        
        {nearbyStations.map((station, index) => (
          <div key={station.StationCode} className="nearby-station">
            <div className="station-rank">#{index + 1}</div>
            <div className="station-info">
              <h4>{station.StationName || `Station ${station.StationCode}`}</h4>
              <p><strong>Distance:</strong> {station.distance.toFixed(2)} miles</p>
              <p><strong>Station Code:</strong> {station.StationCode}</p>
              <p><strong>Coordinates:</strong> {station.Latitude.toFixed(4)}, {station.Longitude.toFixed(4)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Station Export Utility

```typescript
import { useWeatherStations } from 'ws-dottie/react/wsdot-weather-stations';

function StationExport() {
  const { data: weatherStations, isLoading, error } = useWeatherStations();

  const exportToCSV = () => {
    if (!weatherStations) return;
    
    const csvContent = [
      'StationCode,StationName,Latitude,Longitude',
      ...weatherStations.map(station => 
        `${station.StationCode},"${station.StationName || `Station ${station.StationCode}`}",${station.Latitude},${station.Longitude}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wsdot-weather-stations.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToGeoJSON = () => {
    if (!weatherStations) return;
    
    const geoJSON = {
      type: 'FeatureCollection',
      features: weatherStations.map(station => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [station.Longitude, station.Latitude]
        },
        properties: {
          stationCode: station.StationCode,
          stationName: station.StationName || `Station ${station.StationCode}`
        }
      }))
    };
    
    const blob = new Blob([JSON.stringify(geoJSON, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wsdot-weather-stations.geojson';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Weather Station Export</h2>
      
      <div className="export-controls">
        <button onClick={exportToCSV}>
          Export to CSV ({weatherStations?.length || 0} stations)
        </button>
        <button onClick={exportToGeoJSON}>
          Export to GeoJSON ({weatherStations?.length || 0} stations)
        </button>
      </div>
      
      <div className="export-preview">
        <h3>Preview (First 5 stations)</h3>
        <pre>
          {JSON.stringify(weatherStations?.slice(0, 5), null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## Common Use Cases

### Station Discovery
Find available weather stations in specific areas for weather data analysis.

### Weather Data Integration
Use station codes with Weather Information API to get current weather readings.

### Geographic Filtering
Filter stations by location or region for targeted weather monitoring.

### Station Mapping
Display weather station locations on interactive maps for visualization.

### Data Source Identification
Identify which stations provide weather data for specific locations.

### Route Planning
Find weather stations along travel routes for trip planning.

## API Documentation

- **WSDOT Documentation**: [Weather Stations Class](https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html)
- **API Endpoint**: [Weather Stations REST Service](https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc)

## Notes

- Station codes are unique integer identifiers
- Station names typically include location information (street names, highway designations, mileposts)
- Coordinates are in decimal degrees format (WGS84)
- All stations are located within Washington State boundaries
- Station data is relatively static and doesn't change frequently
- Geographic coordinates can be used with mapping libraries for visualization
- Station codes can be used to correlate with weather data from other APIs
- Station names provide human-readable location descriptions
- The API provides a complete inventory of WSDOT weather monitoring infrastructure
- Data is cached for extended periods since station information changes rarely
- Station locations are useful for weather data analysis and geographic filtering
- Highway references in station names help identify locations along specific routes 