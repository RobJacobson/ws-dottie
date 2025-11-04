# Weather APIs

This guide covers all weather-related APIs in WS-Dottie, providing comprehensive access to Washington State weather information, road conditions, and mountain pass status.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🌤️ Overview

WS-Dottie provides access to four weather APIs that cover all aspects of Washington State weather and road condition information:

| API | Description | Key Features | Update Frequency |
|------|-------------|---------------|------------------|
| **WSDOT Weather Information** | Current weather conditions at monitoring stations | Frequent (15m) |
| **WSDOT Weather Extended** | Detailed weather with surface/subsurface measurements | Frequent (15m) |
| **WSDOT Weather Stations** | Weather station locations and metadata | Static (weekly) |
| **WSDOT Mountain Pass Conditions** | Pass status, restrictions, and road conditions | Frequent (15-30m) |

## 🌡️ WSDOT Weather Information API

### Key Features
- **Current weather conditions** at monitoring stations throughout Washington
- **Road surface conditions** and travel impact information
- **Temperature and precipitation** data
- **Visibility and wind** information for travel planning

### Common Use Cases

#### Weather Dashboard
```javascript
import { useWeatherInformation } from 'ws-dottie';

function WeatherDashboard() {
  const { data: weather, isLoading } = useWeatherInformation();
  
  // Group weather stations by region
  const westernStations = weather?.filter(s => s.Region === 'Western');
  const easternStations = weather?.filter(s => s.Region === 'Eastern');
  
  return (
    <div>
      <h1>Washington Weather Conditions</h1>
      {isLoading && <div>Loading weather data...</div>}
      
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
```

#### Travel Weather Map
```javascript
import { useWeatherInformation } from 'ws-dottie';

function TravelWeatherMap() {
  const { data: weather } = useWeatherInformation();
  
  // Process data for map visualization
  const weatherMapData = weather?.map(station => ({
    id: station.StationID,
    name: station.StationName,
    location: [station.Latitude, station.Longitude],
    temperature: station.Temperature,
    conditions: station.RoadCondition,
    icon: getWeatherIcon(station.RoadCondition)
  }));
  
  return (
    <div>
      <h1>Washington Weather Map</h1>
      <div className="weather-map">
        {/* Render map with weather station markers */}
        {weatherMapData?.map(station => (
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
```

## 🌡️ WSDOT Weather Extended API

### Key Features
- **Detailed weather measurements** including surface and subsurface data
- **Scientific weather data** for professional applications
- **Atmospheric conditions** including pressure and humidity
- **Advanced weather metrics** for specialized use cases

### Common Use Cases

#### Scientific Weather Dashboard
```javascript
import { useWeatherInformationExtended } from 'ws-dottie';

function ScientificWeatherDashboard() {
  const { data: weather, isLoading } = useWeatherInformationExtended();
  
  return (
    <div>
      <h1>Advanced Weather Information</h1>
      {isLoading && <div>Loading weather data...</div>}
      
      <div className="weather-grid">
        {weather?.map(station => (
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
            
            <div className="weather-advanced">
              <h4>Subsurface Conditions</h4>
              <p>Subsurface Temperature: {station.SubsurfaceTemperature}°F</p>
              <p>Subsurface Condition: {station.SubsurfaceCondition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🏔️ WSDOT Weather Stations API

### Key Features
- **Weather station locations** throughout Washington State
- **Station metadata** including elevation, equipment, and services
- **Coverage information** for weather data availability
- **Station status** and operational information

### Common Use Cases

#### Weather Station Locator
```javascript
import { useWeatherStations } from 'ws-dottie';

function WeatherStationLocator() {
  const { data: stations, isLoading } = useWeatherStations();
  const [selectedStation, setSelectedStation] = useState(null);
  
  // Group stations by region
  const stationsByRegion = stations?.reduce((acc, station) => {
    const region = station.Region || 'Unknown';
    if (!acc[region]) acc[region] = [];
    acc[region].push(station);
    return acc;
  }, {});
  
  return (
    <div>
      <h1>Washington Weather Stations</h1>
      {isLoading && <div>Loading weather stations...</div>}
      
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
                  <p>Location: {station.Latitude}, {station.Longitude}</p>
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
            <p>Location: {selectedStation.Latitude}, {selectedStation.Longitude}</p>
            <p>Equipment: {selectedStation.Equipment}</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

## 🏔️ WSDOT Mountain Pass Conditions API

### Key Features
- **Mountain pass status** for all major Washington passes
- **Road condition information** including restrictions and closures
- **Weather conditions** specific to mountain elevations
- **Travel restrictions** and chain requirements

### Common Use Cases

#### Mountain Pass Dashboard
```javascript
import { useMountainPassConditions } from 'ws-dottie';

function MountainPassDashboard() {
  const { data: passes, isLoading } = useMountainPassConditions();
  
  // Group passes by status
  const openPasses = passes?.filter(p => p.RestrictionOne === 'Open' || p.RestrictionOne === 'No Restrictions');
  const restrictedPasses = passes?.filter(p => p.RestrictionOne !== 'Open' && p.RestrictionOne !== 'No Restrictions');
  
  return (
    <div>
      <h1>Washington Mountain Passes</h1>
      {isLoading && <div>Loading mountain pass data...</div>}
      
      <div className="pass-status-summary">
        <div className="pass-group">
          <h2>Open Passes ({openPasses?.length || 0})</h2>
          {openPasses?.map(pass => (
            <div key={pass.MountainPassId} className="pass-item open">
              <h3>{pass.MountainPassName}</h3>
              <p>Conditions: {pass.WeatherCondition}</p>
              <p>Temperature: {pass.TemperatureInFahrenheit}°F</p>
            </div>
          ))}
        </div>
        
        <div className="pass-group">
          <h2>Restricted Passes ({restrictedPasses?.length || 0})</h2>
          {restrictedPasses?.map(pass => (
            <div key={pass.MountainPassId} className="pass-item restricted">
              <h3>{pass.MountainPassName}</h3>
              <p>Restriction: {pass.RestrictionOne}</p>
              <p>Additional: {pass.RestrictionTwo}</p>
              <p>Conditions: {pass.WeatherCondition}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pass-details">
        <h2>All Pass Conditions</h2>
        {passes?.map(pass => (
          <div key={pass.MountainPassId} className="pass-details-item">
            <h3>{pass.MountainPassName}</h3>
            <p>Weather: {pass.WeatherCondition}</p>
            <p>Temperature: {pass.TemperatureInFahrenheit}°F</p>
            <p>Elevation: {pass.ElevationInFeet} feet</p>
            <p>Restriction 1: {pass.RestrictionOne}</p>
            <p>Restriction 2: {pass.RestrictionTwo}</p>
            <p>Last Updated: {new Date(pass.LastUpdated).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🔗 API Relationships

Weather APIs work together to provide comprehensive weather and road condition information:

### Weather Information + Mountain Pass Integration
```javascript
import { useWeatherInformation, useMountainPassConditions } from 'ws-dottie';

function WeatherAwareTravelPlanner() {
  const { data: weather } = useWeatherInformation();
  const { data: passes } = useMountainPassConditions();
  
  // Correlate weather with mountain pass conditions
  const passesWithWeather = passes?.map(pass => {
    const nearbyWeather = weather?.find(w => 
      isNearby(w, pass) // Function to check proximity
    );
    
    return {
      ...pass,
      nearbyWeather,
      travelAdvisory: getTravelAdvisory(pass, nearbyWeather)
    };
  });
  
  return (
    <div>
      <h1>Weather-Aware Travel Planner</h1>
      <h2>Mountain Pass Conditions</h2>
      {passesWithWeather?.map(pass => (
        <div key={pass.MountainPassId}>
          <h3>{pass.MountainPassName}</h3>
          <p>Pass Status: {pass.RestrictionOne}</p>
          <p>Travel Advisory: {pass.travelAdvisory}</p>
          {pass.nearbyWeather && (
            <div>
              <h4>Nearby Weather</h4>
              <p>Station: {pass.nearbyWeather.StationName}</p>
              <p>Temperature: {pass.nearbyWeather.Temperature}°F</p>
              <p>Conditions: {pass.nearbyWeather.RoadCondition}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Weather Stations + Weather Information Integration
```javascript
import { useWeatherInformation, useWeatherStations } from 'ws-dottie';

function ComprehensiveWeatherDashboard() {
  const { data: weather } = useWeatherInformation();
  const { data: stations } = useWeatherStations();
  
  // Combine station metadata with current weather
  const stationsWithWeather = stations?.map(station => {
    const currentWeather = weather?.find(w => w.StationID === station.StationID);
    
    return {
      ...station,
      currentWeather,
      lastUpdated: currentWeather?.LastUpdated || null
    };
  });
  
  return (
    <div>
      <h1>Comprehensive Weather Dashboard</h1>
      <div className="weather-grid">
        {stationsWithWeather?.map(station => (
          <div key={station.StationID} className="weather-station">
            <h3>{station.StationName}</h3>
            <p>Elevation: {station.Elevation} feet</p>
            <p>Location: {station.Latitude}, {station.Longitude}</p>
            
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
- **Mountain Pass Conditions**: `HOURLY_UPDATES` (15-30 minute refresh)

### Optimization Tips
- **Regional Filtering**: Use geographic filtering to reduce data volume
- **Station Selection**: Prioritize stations closest to user location
- **Pass Monitoring**: Focus on passes relevant to travel routes
- **Weather Correlation**: Combine weather data with pass conditions

## 🔗 Detailed Documentation

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[WSDOT Weather Information HTML](../../../redoc/wsdot-weather-information.html)** - Interactive weather documentation
- **[WSDOT Weather Extended HTML](../../../redoc/wsdot-weather-information-extended.html)** - Interactive extended weather documentation
- **[WSDOT Weather Stations HTML](../../../redoc/wsdot-weather-stations.html)** - Interactive station documentation
- **[WSDOT Mountain Pass Conditions HTML](../../../redoc/wsdot-mountain-pass-conditions.html)** - Interactive pass documentation

## 📚 Next Steps

- **[React Integration Guide](../guides/react-integration.md)** - React patterns with TanStack Query
- **[Node.js Integration Guide](../guides/nodejs-integration.md)** - Server-side usage patterns
- **[Caching Reference](../reference/caching.md)** - Performance optimization strategies
- **[Error Handling Reference](../reference/error-handling.md)** - Error recovery patterns
