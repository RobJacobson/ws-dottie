# Weather APIs

This guide covers all weather-related APIs in WS-Dottie, providing comprehensive access to Washington State weather information, road conditions, and mountain pass status.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🌤️ Overview

WS-Dottie provides access to three weather APIs that cover all aspects of Washington State weather and road condition information:

| API | Description | Key Features | Update Frequency |
|------|-------------|---------------|------------------|
| **WSDOT Weather Information** | Current weather conditions at monitoring stations | Temperature, precipitation, road conditions | Frequent (15m) |
| **WSDOT Weather Extended** | Detailed weather with surface/subsurface measurements | Advanced weather data, scientific measurements | Frequent (15m) |
| **WSDOT Weather Stations** | Weather station locations and metadata | Station locations, equipment information, coverage map | Static (weekly) |

## 🌡️ WSDOT Weather Information API

### API Overview
The WSDOT Weather Information API provides current weather conditions from monitoring stations throughout Washington State, including temperature, precipitation, visibility, and road conditions.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **weather-info** | Current atmospheric conditions from road weather stations | FREQUENT |

### Key Endpoints

#### Weather Information
- **getWeatherInformation**: Returns current weather conditions for all stations
  - **Input**: No parameters required
  - **Output**: Array of weather station information
  - **Key Fields**:
    - `StationID`: Unique station identifier
    - `StationName`: Human-readable station name
    - `Latitude`, `Longitude`: GPS coordinates
    - `Temperature`: Current temperature in Fahrenheit
    - `RelativeHumidity`: Humidity percentage
    - `WindSpeed`: Wind speed in mph
    - `WindDirection`: Wind direction in degrees
    - `BarometricPressure`: Atmospheric pressure
    - `Precipitation`: Precipitation measurement
    - `Visibility`: Visibility distance in miles
    - `RoadCondition`: Current road condition status
    - `LastUpdated`: Timestamp of last update

- **getWeatherInformationByStationId**: Returns weather information for a specific station
  - **Input**: `StationID` (integer) - Unique station identifier
  - **Output**: Single weather station object with all fields above

- **getCurrentWeatherForStations**: Returns weather information for multiple specified stations
  - **Input**: `StationList` (string) - Comma-separated list of station IDs
  - **Output**: Array of weather station information for specified stations

- **searchWeatherInformation**: Returns historical weather information for a time range
  - **Input**: 
    - `StationID` (integer) - Station identifier
    - `SearchStartTime` (datetime) - Start of search range
    - `SearchEndTime` (datetime) - End of search range
  - **Output**: Array of historical weather information

### Common Use Cases

#### Weather Dashboard
```javascript
import { useWeatherInformation } from 'ws-dottie';

function WeatherDashboard() {
  const { data: weather, isLoading, error } = useWeatherInformation();
  
  // Group weather stations by region
  const westernStations = weather?.filter(s => s.Latitude < 47.5);
  const easternStations = weather?.filter(s => s.Latitude >= 47.5);
  
  // Find stations with adverse conditions
  const adverseConditions = weather?.filter(s => 
    s.RoadCondition !== 'Clear' || s.Temperature < 32 || s.Visibility < 1
  ) || [];
  
  return (
    <div>
      <h1>Washington Weather Conditions</h1>
      {isLoading && <div>Loading weather data...</div>}
      {error && <div>Error loading weather data: {error.message}</div>}
      
      <div className="weather-summary">
        <div className="region-summary">
          <h2>Western Washington</h2>
          <p>Stations: {westernStations?.length || 0}</p>
          <p>Avg Temperature: {calculateAverage(westernStations, 'Temperature')?.toFixed(1)}°F</p>
        </div>
        <div className="region-summary">
          <h2>Eastern Washington</h2>
          <p>Stations: {easternStations?.length || 0}</p>
          <p>Avg Temperature: {calculateAverage(easternStations, 'Temperature')?.toFixed(1)}°F</p>
        </div>
      </div>
      
      <div className="adverse-conditions">
        <h2>Adverse Conditions ({adverseConditions.length || 0})</h2>
        {adverseConditions.map(station => (
          <div key={station.StationID} className="adverse-station">
            <h3>{station.StationName}</h3>
            <p>Temperature: {station.Temperature}°F</p>
            <p>Condition: {station.RoadCondition}</p>
            <p>Visibility: {station.Visibility} miles</p>
          </div>
        ))}
      </div>
      
      <div className="weather-regions">
        <div className="weather-region">
          <h2>Western Washington</h2>
          {westernStations?.map(station => (
            <div key={station.StationID} className="weather-station">
              <h3>{station.StationName}</h3>
              <p>Temperature: {station.Temperature}°F</p>
              <p>Conditions: {station.RoadCondition}</p>
              <p>Visibility: {station.Visibility} miles</p>
            </div>
          ))}
        </div>
        
        <div className="weather-region">
          <h2>Eastern Washington</h2>
          {easternStations?.map(station => (
            <div key={station.StationID} className="weather-station">
              <h3>{station.StationName}</h3>
              <p>Temperature: {station.Temperature}°F</p>
              <p>Conditions: {station.RoadCondition}</p>
              <p>Visibility: {station.Visibility} miles</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate average values
function calculateAverage(stations, field) {
  if (!stations || stations.length === 0) return 0;
  const sum = stations.reduce((acc, station) => acc + (station[field] || 0), 0);
  return sum / stations.length;
}
```

#### Travel Weather Map
```javascript
import { useWeatherInformation } from 'ws-dottie';

function TravelWeatherMap() {
  const { data: weather, isLoading, error } = useWeatherInformation();
  
  // Process data for map visualization
  const weatherMapData = weather?.map(station => ({
    id: station.StationID,
    name: station.StationName,
    location: [station.Latitude, station.Longitude],
    temperature: station.Temperature,
    conditions: station.RoadCondition,
    icon: getWeatherIcon(station.RoadCondition)
  })) || [];
  
  // Group stations by road condition for map layers
  const conditionGroups = weatherMapData.reduce((acc, station) => {
    const condition = station.conditions;
    if (!acc[condition]) acc[condition] = [];
    acc[condition].push(station);
    return acc;
  }, {});
  
  return (
    <div>
      <h1>Washington Weather Map</h1>
      {isLoading && <div>Loading weather data...</div>}
      {error && <div>Error loading weather data: {error.message}</div>}
      
      <div className="weather-legend">
        <h2>Road Conditions</h2>
        {Object.keys(conditionGroups).map(condition => (
          <div key={condition} className="legend-item">
            <span className={`icon ${condition}`}></span>
            <span>{condition}</span>
          </div>
        ))}
      </div>
      
      <div className="weather-map">
        {/* Render map with weather station markers */}
        {weatherMapData.map(station => (
          <div key={station.id} className="weather-marker">
            <h3>{station.name}</h3>
            <p>{station.temperature}°F</p>
            <p>{station.conditions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to get weather icon based on condition
function getWeatherIcon(condition) {
  const iconMap = {
    'Clear': '☀️',
    'Wet': '🌧',
    'Snow': '❄️',
    'Ice': '🧊',
    'Fog': '🌫'
  };
  return iconMap[condition] || '🌡️';
}
```

## 🌡️ WSDOT Weather Extended API

### API Overview
The WSDOT Weather Extended API provides detailed weather measurements including surface and subsurface data from monitoring stations throughout Washington State.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **surface-measurements** | Pavement and surface weather measurements | FREQUENT |
| **subsurface-measurements** | Subsurface temperature and moisture measurements | FREQUENT |
| **weather-readings** | Combined surface and subsurface measurements | FREQUENT |

### Key Endpoints

#### Surface Measurements
- **getSurfaceMeasurements**: Returns surface weather measurements for all stations
  - **Input**: No parameters required
  - **Output**: Array of surface measurement data
  - **Key Fields**:
    - `StationID`: Unique station identifier
    - `StationName`: Human-readable station name
    - `PavementTemperature`: Road surface temperature in Fahrenheit
    - `SurfaceCondition`: Road surface condition status
    - `Friction`: Surface friction measurement
    - `LastUpdated`: Timestamp of last update

#### Subsurface Measurements
- **getSubsurfaceMeasurements**: Returns subsurface measurements for all stations
  - **Input**: No parameters required
  - **Output**: Array of subsurface measurement data
  - **Key Fields**:
    - `StationID`: Unique station identifier
    - `StationName`: Human-readable station name
    - `SubsurfaceTemperature`: Temperature below road surface in Fahrenheit
    - `SubsurfaceCondition`: Subsurface condition status
    - `MoistureContent`: Moisture content percentage
    - `LastUpdated`: Timestamp of last update

### Common Use Cases

#### Scientific Weather Dashboard
```javascript
import { useSurfaceMeasurements, useSubsurfaceMeasurements } from 'ws-dottie';

function ScientificWeatherDashboard() {
  const { data: surfaceData, isLoading: surfaceLoading } = useSurfaceMeasurements();
  const { data: subsurfaceData, isLoading: subsurfaceLoading } = useSubsurfaceMeasurements();
  
  // Combine surface and subsurface data by station
  const combinedData = surfaceData?.map(surface => {
    const subsurface = subsurfaceData?.find(s => s.StationID === surface.StationID);
    return {
      ...surface,
      subsurface
    };
  }) || [];
  
  return (
    <div>
      <h1>Advanced Weather Information</h1>
      {surfaceLoading && subsurfaceLoading && <div>Loading weather data...</div>}
      
      <div className="weather-grid">
        {combinedData.map(station => (
          <div key={station.StationID} className="weather-station">
            <h3>{station.StationName}</h3>
            
            <div className="weather-basic">
              <p>Temperature: {station.Temperature}°F</p>
              <p>Humidity: {station.RelativeHumidity}%</p>
              <p>Wind Speed: {station.WindSpeed} mph</p>
            </div>
            
            <div className="weather-advanced">
              <h4>Surface Conditions</h4>
              <p>Pavement Temperature: {station.PavementTemperature}°F</p>
              <p>Surface Condition: {station.SurfaceCondition}</p>
              <p>Friction: {station.Friction}</p>
            </div>
            
            {station.subsurface && (
              <div className="weather-advanced">
                <h4>Subsurface Conditions</h4>
                <p>Subsurface Temperature: {station.subsurface.SubsurfaceTemperature}°F</p>
                <p>Subsurface Condition: {station.subsurface.SubsurfaceCondition}</p>
                <p>Moisture Content: {station.subsurface.MoistureContent}%</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🏔️ WSDOT Weather Stations API

### API Overview
The WSDOT Weather Stations API provides information about weather station locations throughout Washington State, including coordinates, equipment, and coverage information.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **weather-stations** | Weather station locations and metadata | FREQUENT |

### Key Endpoints

#### Weather Stations
- **getWeatherStations**: Returns location information for all weather stations
  - **Input**: No parameters required
  - **Output**: Array of weather station location information
  - **Key Fields**:
    - `StationID`: Unique station identifier
    - `StationName`: Human-readable station name
    - `Latitude`, `Longitude`: GPS coordinates
    - `Elevation`: Station elevation in feet
    - `County`: County where station is located
    - `Equipment`: Equipment information
    - `Coverage`: Coverage area description

### Common Use Cases

#### Weather Station Locator
```javascript
import { useWeatherStations, useWeatherInformation } from 'ws-dottie';

function WeatherStationLocator() {
  const { data: stations, isLoading: stationsLoading } = useWeatherStations();
  const { data: weather, isLoading: weatherLoading } = useWeatherInformation();
  const [selectedStation, setSelectedStation] = useState(null);
  
  // Group stations by region
  const stationsByRegion = stations?.reduce((acc, station) => {
    const region = station.County || 'Unknown';
    if (!acc[region]) acc[region] = [];
    acc[region].push(station);
    return acc;
  }, {});
  
  // Find closest station to user location (simulated)
  const findClosestStation = (userLat, userLon) => {
    return stations?.reduce((closest, station) => {
      const distance = calculateDistance(userLat, userLon, station.Latitude, station.Longitude);
      const closestDistance = calculateDistance(userLat, userLon, closest.Latitude, closest.Longitude);
      return distance < closestDistance ? station : closest;
    });
  };
  
  return (
    <div>
      <h1>Washington Weather Stations</h1>
      {stationsLoading && <div>Loading weather stations...</div>}
      {weatherLoading && <div>Loading weather data...</div>}
      
      <div className="station-locator">
        <div className="station-list">
          {Object.entries(stationsByRegion).map(([region, regionStations]) => (
            <div key={region} className="station-region">
              <h3>{region} Region</h3>
              {regionStations.map(station => (
                <div 
                  key={station.StationID} 
                  className={`station-item ${selectedStation?.StationID === station.StationID ? 'selected' : ''}`}
                  onClick={() => setSelectedStation(station)}
                >
                  <h4>{station.StationName}</h4>
                  <p>Elevation: {station.Elevation} feet</p>
                  <p>Location: {station.Latitude.toFixed(4)}, {station.Longitude.toFixed(4)}</p>
                  <p>Equipment: {station.Equipment}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {selectedStation && (
          <div className="station-details">
            <h2>{selectedStation.StationName}</h2>
            <p>Station ID: {selectedStation.StationID}</p>
            <p>Elevation: {selectedStation.Elevation} feet</p>
            <p>Location: {selectedStation.Latitude.toFixed(4)}, {selectedStation.Longitude.toFixed(4)}</p>
            <p>County: {selectedStation.County}</p>
            <p>Equipment: {selectedStation.Equipment}</p>
            <p>Coverage: {selectedStation.Coverage}</p>
            
            {/* Display current weather for selected station */}
            {weather && (
              <div className="current-weather">
                <h3>Current Conditions</h3>
                {(() => {
                  const stationWeather = weather.find(w => w.StationID === selectedStation.StationID);
                  return stationWeather ? (
                    <div>
                      <p>Temperature: {stationWeather.Temperature}°F</p>
                      <p>Humidity: {stationWeather.RelativeHumidity}%</p>
                      <p>Wind Speed: {stationWeather.WindSpeed} mph</p>
                      <p>Road Condition: {stationWeather.RoadCondition}</p>
                    </div>
                  ) : <p>No weather data available</p>;
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
```

## 🔗 API Relationships

Weather APIs work together to provide comprehensive weather and road condition information:

### Weather Stations + Weather Information Integration
```javascript
import { useWeatherInformation, useWeatherStations } from 'ws-dottie';

function ComprehensiveWeatherDashboard() {
  const { data: weather, isLoading: weatherLoading } = useWeatherInformation();
  const { data: stations, isLoading: stationsLoading } = useWeatherStations();
  
  // Combine station metadata with current weather
  const stationsWithWeather = stations?.map(station => {
    const currentWeather = weather?.find(w => w.StationID === station.StationID);
    
    return {
      ...station,
      currentWeather,
      lastUpdated: currentWeather?.LastUpdated || null
    };
  }) || [];
  
  // Group stations by temperature range for visualization
  const tempGroups = stationsWithWeather.reduce((acc, station) => {
    if (!station.currentWeather) return acc;
    
    const temp = station.currentWeather.Temperature;
    if (temp < 32) acc.freezing = [...(acc.freezing || []), station];
    else if (temp < 50) acc.cold = [...(acc.cold || []), station];
    else if (temp < 70) acc.mild = [...(acc.mild || []), station];
    else acc.warm = [...(acc.warm || []), station];
    return acc;
  }, {});
  
  return (
    <div>
      <h1>Comprehensive Weather Dashboard</h1>
      {weatherLoading && stationsLoading && <div>Loading weather data...</div>}
      
      <div className="weather-summary">
        <div className="temp-group">
          <h3>Freezing (&lt; 32°F)</h3>
          <p>{tempGroups.freezing?.length || 0} stations</p>
        </div>
        <div className="temp-group">
          <h3>Cold (32-50°F)</h3>
          <p>{tempGroups.cold?.length || 0} stations</p>
        </div>
        <div className="temp-group">
          <h3>Mild (50-70°F)</h3>
          <p>{tempGroups.mild?.length || 0} stations</p>
        </div>
        <div className="temp-group">
          <h3>Warm (&gt; 70°F)</h3>
          <p>{tempGroups.warm?.length || 0} stations</p>
        </div>
      </div>
      
      <div className="weather-grid">
        {stationsWithWeather.map(station => (
          <div key={station.StationID} className="weather-station">
            <h3>{station.StationName}</h3>
            <p>Elevation: {station.Elevation} feet</p>
            <p>Location: {station.Latitude.toFixed(4)}, {station.Longitude.toFixed(4)}</p>
            
            {station.currentWeather ? (
              <div className="current-weather">
                <p>Temperature: {station.currentWeather.Temperature}°F</p>
                <p>Conditions: {station.currentWeather.RoadCondition}</p>
                <p>Last Updated: {new Date(station.lastUpdated).toLocaleString()}</p>
              </div>
            ) : (
              <div className="no-weather-data">
                <p>No current weather data available</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 📊 Performance Considerations

### Caching Strategies
- **Weather Information**: `HOURLY_UPDATES` (15-minute refresh)
- **Weather Extended**: `HOURLY_UPDATES` (15-minute refresh)
- **Weather Stations**: `WEEKLY_UPDATES` (weekly refresh)

### Optimization Tips
- **Regional Filtering**: Use geographic filtering to reduce data volume
- **Station Selection**: Prioritize stations closest to user location

## 🔗 Detailed Documentation

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[WSDOT Weather Information HTML](../../../redoc/wsdot-weather-information.html)** - Interactive weather documentation
- **[WSDOT Weather Extended HTML](../../../redoc/wsdot-weather-information-extended.html)** - Interactive extended weather documentation
- **[WSDOT Weather Stations HTML](../../../redoc/wsdot-weather-stations.html)** - Interactive station documentation

## 📚 Next Steps

- **[React Integration Guide](../guides/react-integration.md)** - React patterns with TanStack Query
- **[Node.js Integration Guide](../guides/nodejs-integration.md)** - Server-side usage patterns
- **[Caching Reference](../reference/caching.md)** - Performance optimization strategies
- **[Error Handling Reference](../reference/error-handling.md)** - Error recovery patterns
