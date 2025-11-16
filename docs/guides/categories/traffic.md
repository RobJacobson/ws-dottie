# Traffic APIs

This guide covers all traffic-related APIs in WS-Dottie, providing comprehensive access to Washington State highway conditions, incidents, and traffic flow data.

> **📚 Documentation Navigation**: [../../README.md](../../README.md) • [Getting Started](../../getting-started/getting-started.md) • [API Guide](../api-guide.md)

## 🚗 Overview

WS-Dottie provides access to seven traffic APIs that cover all aspects of Washington State highway information:

| API | Description | Key Features | Update Frequency |
|------|-------------|---------------|------------------|
| **WSDOT Border Crossings** | Wait times and conditions at border crossings | Border planning, wait time monitoring, crossing status | Frequent (5-15m) |
| **WSDOT Highway Alerts** | Real-time traffic incidents and construction | Incident tracking, construction updates, road closures | Real-time (5s) |
| **WSDOT Highway Cameras** | Live traffic camera feeds | Visual monitoring, road conditions, traffic visualization | Static (daily) |
| **WSDOT Mountain Pass Conditions** | Mountain pass status, restrictions, and road conditions | Pass conditions, travel restrictions, closure information | Frequent (15-30m) |
| **WSDOT Toll Rates** | Real-time toll pricing for managed lanes | Cost calculation, route optimization, toll planning | Frequent (1-5m) |
| **WSDOT Traffic Flow** | Current traffic speeds and congestion data | Flow monitoring, congestion analysis, speed data | Real-time (5s) |
| **WSDOT Travel Times** | Estimated travel times between locations | Route planning, ETA calculation, delay tracking | Frequent (1-5m) |

## 🛃 WSDOT Border Crossings API

### API Overview
The WSDOT Border Crossings API provides real-time information about border crossing wait times and conditions at Washington State crossings into Canada.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **border-crossing-data** | Real-time wait times for US-Canada border crossings | FREQUENT |

### Key Endpoints

#### Border Crossings
- **getBorderCrossings**: Returns current wait times for all border crossings
  - **Input**: No parameters required
  - **Output**: Array of border crossing information
  - **Key Fields**:
    - `BorderCrossingID`: Unique crossing identifier
    - `CrossingName`: Human-readable crossing name
    - `CrossingType`: Type of crossing (Passenger, Commercial, NEXUS)
    - `Direction`: Direction of crossing (Northbound, Southbound)
    - `WaitTime`: Current wait time in minutes
    - `LanesOpen`: Number of lanes currently open
    - `LanesTotal`: Total number of lanes
    - `LastUpdated`: Timestamp of last update

### Common Use Cases

#### Border Crossing Monitor
```javascript
import { useBorderCrossings } from 'ws-dottie/wsdot-border-crossings';

function BorderCrossingMonitor() {
  const { data: crossings, isLoading, error } = useBorderCrossings();
  
  // Group crossings by type
  const passengerCrossings = crossings?.filter(c => c.CrossingType === 'Passenger');
  const commercialCrossings = crossings?.filter(c => c.CrossingType === 'Commercial');
  const nexusCrossings = crossings?.filter(c => c.CrossingType === 'NEXUS');
  
  return (
    <div>
      <h1>Washington Border Crossings</h1>
      {isLoading && <div>Loading border crossing data...</div>}
      {error && <div>Error loading border crossing data: {error.message}</div>}
      
      <div className="crossing-sections">
        <div className="crossing-section">
          <h2>Passenger Crossings</h2>
          {passengerCrossings?.map(crossing => (
            <div key={crossing.BorderCrossingID} className="crossing-item">
              <h3>{crossing.CrossingName}</h3>
              <p>Direction: {crossing.Direction}</p>
              <p>Current Wait: {crossing.WaitTime} minutes</p>
              <p>Lanes Open: {crossing.LanesOpen}/{crossing.LanesTotal}</p>
              <p>Last Updated: {new Date(crossing.LastUpdated).toLocaleString()}</p>
            </div>
          ))}
        </div>
        
        <div className="crossing-section">
          <h2>Commercial Crossings</h2>
          {commercialCrossings?.map(crossing => (
            <div key={crossing.BorderCrossingID} className="crossing-item">
              <h3>{crossing.CrossingName}</h3>
              <p>Direction: {crossing.Direction}</p>
              <p>Current Wait: {crossing.WaitTime} minutes</p>
              <p>Lanes Open: {crossing.LanesOpen}/{crossing.LanesTotal}</p>
              <p>Last Updated: {new Date(crossing.LastUpdated).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## 🚨 WSDOT Highway Alerts API

### API Overview
The WSDOT Highway Alerts API provides real-time information about traffic incidents, construction, and road conditions throughout Washington State.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **highwayAlerts** | Real-time traffic incidents and road conditions | FREQUENT |
| **alertAreas** | Geographic areas for alert filtering | FREQUENT |
| **event-categories** | Alert event categories and types | STATIC |

### Key Endpoints

#### Highway Alerts
- **getAlerts**: Returns all current highway alerts
  - **Input**: No parameters required
  - **Output**: Array of highway alert information
  - **Key Fields**:
    - `AlertID`: Unique alert identifier
    - `HeadlineDescription`: Brief description of the alert
    - `EventCategory`: Type of event (Accident, Construction, Weather, etc.)
    - `Priority`: Alert priority level (Low, Normal, High, Highest)
    - `StartTime`: When the alert began
    - `EndTime`: When the alert is expected to end
    - `StartRoadName`, `EndRoadName`: Affected road names
    - `StartMilepost`, `EndMilepost`: Affected milepost range
    - `County`: County where the alert is located
    - `Latitude`, `Longitude`: GPS coordinates

- **getAlertById**: Returns a specific alert by ID
  - **Input**: `AlertID` (integer) - Unique alert identifier
  - **Output**: Single highway alert object with all fields above

- **getAlertsByRegionId**: Returns alerts for a specific region
  - **Input**: `RegionID` (integer) - Region identifier
  - **Output**: Array of highway alerts for specified region

- **getAlertsByMapArea**: Returns alerts for a specific geographic area
  - **Input**: `MapArea` (string) - Geographic area name
  - **Output**: Array of highway alerts for specified area

- **searchAlerts**: Returns alerts matching search criteria
  - **Input**: 
    - `StateRoute` (string) - State route number
    - `Region` (string) - Region name
    - `SearchTimeStart`, `SearchTimeEnd` (datetime) - Time range to search
    - `StartingMilepost`, `EndingMilepost` (number) - Milepost range
  - **Output**: Array of highway alerts matching search criteria

### Common Use Cases

#### Traffic Alert Dashboard
```javascript
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';

function TrafficAlertDashboard() {
  const { data: alerts, isLoading, error } = useAlerts();
  
  // Group alerts by priority
  const highPriorityAlerts = alerts?.filter(alert => 
    alert.Priority === 'High' || alert.Priority === 'Highest'
  ) || [];
  const normalAlerts = alerts?.filter(alert => 
    alert.Priority === 'Normal' || alert.Priority === 'Low'
  ) || [];
  
  // Sort alerts by start time (most recent first)
  const sortedAlerts = [...(alerts || [])].sort((a, b) => 
    new Date(b.StartTime) - new Date(a.StartTime)
  );
  
  return (
    <div>
      <h1>Washington Traffic Alerts</h1>
      {isLoading && <div>Loading alerts...</div>}
      {error && <div>Error loading alert data: {error.message}</div>}
      
      <div className="alert-summary">
        <div className="alert-group">
          <h2>High Priority Alerts ({highPriorityAlerts.length || 0})</h2>
          {highPriorityAlerts.map(alert => (
            <div key={alert.AlertID} className="high-priority">
              <h3>{alert.HeadlineDescription}</h3>
              <p>Category: {alert.EventCategory}</p>
              <p>Location: {alert.StartRoadName} to {alert.EndRoadName}</p>
              <p>Started: {new Date(alert.StartTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
        
        <div className="alert-group">
          <h2>Other Alerts ({normalAlerts.length || 0})</h2>
          {normalAlerts.map(alert => (
            <div key={alert.AlertID} className="normal-priority">
              <h3>{alert.HeadlineDescription}</h3>
              <p>Category: {alert.EventCategory}</p>
              <p>Location: {alert.StartRoadName} to {alert.EndRoadName}</p>
              <p>Started: {new Date(alert.StartTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="alert-list">
        <h2>All Alerts</h2>
        {sortedAlerts.map(alert => (
          <div key={alert.AlertID} className={`alert-item ${alert.Priority.toLowerCase()}`}>
            <h3>{alert.HeadlineDescription}</h3>
            <p>Priority: {alert.Priority}</p>
            <p>Category: {alert.EventCategory}</p>
            <p>Location: {alert.StartRoadName} to {alert.EndRoadName}</p>
            <p>Started: {new Date(alert.StartTime).toLocaleString()}</p>
            {alert.EndTime && (
              <p>Expected End: {new Date(alert.EndTime).toLocaleString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### Regional Traffic Monitoring
```javascript
import { useAlertsByMapArea } from 'ws-dottie/wsdot-highway-alerts';

function RegionalTrafficMonitor() {
  const [selectedRegion, setSelectedRegion] = useState('Seattle');
  const { data: alerts, isLoading, error } = useAlertsByMapArea(
    selectedRegion ? { MapArea: selectedRegion } : null
  );
  
  // Group alerts by category
  const accidents = alerts?.filter(alert => alert.EventCategory === 'Accident') || [];
  const construction = alerts?.filter(alert => alert.EventCategory === 'Construction') || [];
  const weather = alerts?.filter(alert => alert.EventCategory === 'Weather') || [];
  
  return (
    <div>
      <h1>Regional Traffic Monitor</h1>
      {isLoading && <div>Loading alerts...</div>}
      {error && <div>Error loading alert data: {error.message}</div>}
      
      <div className="region-selector">
        <label>Region: 
          <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
            <option value="Seattle">Seattle</option>
            <option value="Spokane">Spokane</option>
            <option value="Vancouver">Vancouver</option>
            <option value="Tacoma">Tacoma</option>
          </select>
        </label>
      </div>
      
      <div className="regional-alerts">
        <h2>{selectedRegion} Alerts ({alerts?.length || 0})</h2>
        
        <div className="alert-category">
          <h3>Accidents ({accidents.length})</h3>
          {accidents.map(alert => (
            <div key={alert.AlertID} className="alert-item accident">
              <h4>{alert.HeadlineDescription}</h4>
              <p>Priority: {alert.Priority}</p>
              <p>Location: {alert.StartRoadName}</p>
              <p>Started: {new Date(alert.StartTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
        
        <div className="alert-category">
          <h3>Construction ({construction.length})</h3>
          {construction.map(alert => (
            <div key={alert.AlertID} className="alert-item construction">
              <h4>{alert.HeadlineDescription}</h4>
              <p>Priority: {alert.Priority}</p>
              <p>Location: {alert.StartRoadName}</p>
              <p>Started: {new Date(alert.StartTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
        
        <div className="alert-category">
          <h3>Weather ({weather.length})</h3>
          {weather.map(alert => (
            <div key={alert.AlertID} className="alert-item weather">
              <h4>{alert.HeadlineDescription}</h4>
              <p>Priority: {alert.Priority}</p>
              <p>Location: {alert.StartRoadName}</p>
              <p>Started: {new Date(alert.StartTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## 📷 WSDOT Highway Cameras API

### API Overview
The WSDOT Highway Cameras API provides access to live traffic camera feeds throughout Washington State, allowing visual monitoring of current road conditions.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **cameras** | Live traffic camera feeds and metadata | STATIC |

### Key Endpoints

#### Highway Cameras
- **getHighwayCameras**: Returns all highway cameras
  - **Input**: No parameters required
  - **Output**: Array of camera information
  - **Key Fields**:
    - `CameraID`: Unique camera identifier
    - `Title`: Human-readable camera title
    - `RoadName`: Highway name where camera is located
    - `MilePost`: Milepost location
    - `Latitude`, `Longitude`: GPS coordinates
    - `ImageURL`: URL to current camera image
    - `Direction`: Camera direction (North, South, East, West)
    - `IsActive`: Whether camera is currently active

- **searchHighwayCamerasByRouteAndMilepost**: Returns cameras for a specific route and milepost range
  - **Input**: 
    - `StateRoute` (string) - State route number
    - `StartingMilepost`, `EndingMilepost` (number) - Milepost range
  - **Output**: Array of cameras matching search criteria

- **getHighwayCameraByCameraId**: Returns a specific camera by ID
  - **Input**: `CameraID` (integer) - Unique camera identifier
  - **Output**: Single camera object with all fields above

### Common Use Cases

#### Traffic Camera Viewer
```javascript
import { useHighwayCameras, useSearchHighwayCamerasByRouteAndMilepost } from 'ws-dottie/wsdot-highway-cameras';

function TrafficCameraViewer() {
  const [selectedRoute, setSelectedRoute] = useState('I-5');
  const { data: allCameras, isLoading: allLoading } = useHighwayCameras();
  const { data: routeCameras, isLoading: routeLoading } = useSearchHighwayCamerasByRouteAndMilepost(
    selectedRoute ? { 
      StateRoute: selectedRoute,
      StartingMilepost: 10,
      EndingMilepost: 20
    } : null
  );
  
  // Use route cameras if available, otherwise use all cameras
  const cameras = routeCameras || allCameras;
  const loading = routeLoading || allLoading;
  
  return (
    <div>
      <h1>Washington Traffic Cameras</h1>
      {loading && <div>Loading cameras...</div>}
      
      <div className="camera-controls">
        <label>Route: 
          <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)}>
            <option value="I-5">I-5</option>
            <option value="I-90">I-90</option>
            <option value="I-405">I-405</option>
            <option value="SR-520">SR-520</option>
          </select>
        </label>
      </div>
      
      <div className="camera-grid">
        {cameras?.map(camera => (
          <div key={camera.CameraID} className="camera-item">
            <h3>{camera.Title}</h3>
            <p>Location: {camera.RoadName} - Milepost {camera.MilePost}</p>
            <p>Direction: {camera.Direction}</p>
            <div className="camera-image">
              <img 
                src={camera.ImageURL} 
                alt={camera.Title}
                onError={() => console.error(`Failed to load camera ${camera.CameraID}`)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🏔️ WSDOT Mountain Pass Conditions API

### API Overview
The WSDOT Mountain Pass Conditions API provides real-time information about mountain pass conditions throughout Washington State, including weather, road conditions, and travel restrictions.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **pass-conditions** | Mountain pass weather and road conditions | FREQUENT |

### Key Endpoints

#### Mountain Pass Conditions
- **getMountainPassConditions**: Returns conditions for all mountain passes
  - **Input**: No parameters required
  - **Output**: Array of mountain pass condition information
  - **Key Fields**:
    - `PassConditionID`: Unique pass identifier
    - `PassName`: Human-readable pass name
    - `Latitude`, `Longitude`: GPS coordinates
    - `ElevationInFeet`: Pass elevation in feet
    - `WeatherCondition`: Current weather condition
    - `TemperatureInFahrenheit`: Current temperature in Fahrenheit
    - `RestrictionOne`: Primary restriction status
    - `RestrictionTwo`: Secondary restriction status
    - `LastUpdated`: Timestamp of last update

- **getMountainPassConditionById**: Returns conditions for a specific mountain pass
  - **Input**: `PassConditionID` (integer) - Unique pass identifier
  - **Output**: Single mountain pass condition object with all fields above

### Common Use Cases

#### Mountain Pass Dashboard
```javascript
import { useMountainPassConditions } from 'ws-dottie/wsdot-mountain-pass-conditions';

function MountainPassDashboard() {
  const { data: passes, isLoading, error } = useMountainPassConditions();
  
  // Group passes by status
  const openPasses = passes?.filter(p => 
    p.RestrictionOne === 'Open' || p.RestrictionOne === 'No Restrictions'
  );
  const restrictedPasses = passes?.filter(p => 
    p.RestrictionOne !== 'Open' && p.RestrictionOne !== 'No Restrictions'
  );
  
  // Sort passes by elevation (highest first)
  const passesByElevation = [...(passes || [])].sort((a, b) => 
    b.ElevationInFeet - a.ElevationInFeet
  );
  
  return (
    <div>
      <h1>Washington Mountain Passes</h1>
      {isLoading && <div>Loading mountain pass data...</div>}
      {error && <div>Error loading mountain pass data: {error.message}</div>}
      
      <div className="pass-status-summary">
        <div className="pass-group">
          <h2>Open Passes ({openPasses?.length || 0})</h2>
          {openPasses?.map(pass => (
            <div key={pass.PassConditionID} className="pass-item open">
              <h3>{pass.PassName}</h3>
              <p>Conditions: {pass.WeatherCondition}</p>
              <p>Temperature: {pass.TemperatureInFahrenheit}°F</p>
              <p>Elevation: {pass.ElevationInFeet} feet</p>
            </div>
          ))}
        </div>
        
        <div className="pass-group">
          <h2>Restricted Passes ({restrictedPasses?.length || 0})</h2>
          {restrictedPasses?.map(pass => (
            <div key={pass.PassConditionID} className="pass-item restricted">
              <h3>{pass.PassName}</h3>
              <p>Restriction: {pass.RestrictionOne}</p>
              <p>Additional: {pass.RestrictionTwo}</p>
              <p>Conditions: {pass.WeatherCondition}</p>
              <p>Temperature: {pass.TemperatureInFahrenheit}°F</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pass-details">
        <h2>All Pass Conditions</h2>
        {passesByElevation?.map(pass => (
          <div key={pass.PassConditionID} className="pass-details-item">
            <h3>{pass.PassName}</h3>
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

## 💰 WSDOT Toll Rates API

### API Overview
The WSDOT Toll Rates API provides real-time information about toll pricing for managed lanes throughout Washington State, helping travelers calculate costs and make informed routing decisions.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **toll-rates** | Real-time toll pricing for managed lanes | FREQUENT |

### Key Endpoints

#### Toll Rates
- **getTollRates**: Returns toll rates for all managed lanes
  - **Input**: No parameters required
  - **Output**: Array of toll rate information
  - **Key Fields**:
    - `TollRateID`: Unique toll rate identifier
    - `TripName`: Human-readable trip name
    - `StartLocationName`, `EndLocationName`: Start and end location names
    - `TollRate`: Current toll amount
    - `TimeOfDay`: Time period (Peak, Off-Peak)
    - `VehicleClass`: Vehicle type classification
    - `LastUpdated`: Timestamp of last update

### Common Use Cases

#### Toll Calculator
```javascript
import { useTollRates } from 'ws-dottie/wsdot-toll-rates';

function TollCalculator() {
  const [vehicleType, setVehicleType] = useState('2Axle');
  const [trip, setTrip] = useState({ start: 'SR-167', end: 'SR-509' });
  const { data: tollRates, isLoading, error } = useTollRates();
  
  // Filter toll rates for selected trip
  const tripTollRates = tollRates?.filter(rate => 
    rate.TripName.includes(trip.start) && rate.TripName.includes(trip.end)
  ) || [];
  
  // Find toll rate for selected vehicle type
  const findTollForVehicle = (rates, vehicleType) => {
    return rates?.find(rate => rate.VehicleClass === vehicleType);
  };
  
  const currentToll = findTollForVehicle(tripTollRates, vehicleType);
  
  return (
    <div>
      <h1>Toll Calculator</h1>
      {isLoading && <div>Loading toll rates...</div>}
      {error && <div>Error loading toll data: {error.message}</div>}
      
      <div className="toll-controls">
        <div>
          <label>Vehicle Type: 
            <select value={vehicleType} onChange={e => setVehicleType(e.target.value)}>
              <option value="2Axle">2-Axle Vehicle</option>
              <option value="3Axle">3-Axle Vehicle</option>
              <option value="Motorcycle">Motorcycle</option>
            </select>
          </label>
        </div>
        
        <div>
          <label>From: 
            <select value={trip.start} onChange={e => setTrip({...trip, start: e.target.value})}>
              <option value="SR-167">SR-167</option>
              <option value="SR-509">SR-509</option>
              <option value="I-405">I-405 Express Lanes</option>
            </select>
          </label>
          
          <label>To: 
            <select value={trip.end} onChange={e => setTrip({...trip, end: e.target.value})}>
              <option value="SR-509">SR-509</option>
              <option value="SR-167">SR-167</option>
              <option value="I-405">I-405 Express Lanes</option>
            </select>
          </label>
        </div>
      </div>
      
      <div className="toll-result">
        <h2>Current Toll: ${currentToll?.TollRate || 'Not Available'}</h2>
        <p>Vehicle Type: {vehicleType}</p>
        <p>Route: {trip.start} to {trip.end}</p>
        {currentToll && (
          <div>
            <p>Time of Day: {currentToll.TimeOfDay}</p>
            <p>Last Updated: {new Date(currentToll.LastUpdated).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

## 🚦 WSDOT Traffic Flow API

### API Overview
The WSDOT Traffic Flow API provides real-time information about traffic speeds and congestion throughout Washington State highways.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **flow-data** | Real-time traffic speed and congestion data | FREQUENT |

### Key Endpoints

#### Traffic Flow
- **getTrafficFlows**: Returns traffic flow data for all stations
  - **Input**: No parameters required
  - **Output**: Array of traffic flow information
  - **Key Fields**:
    - `FlowDataID`: Unique flow station identifier
    - `FlowStationLocation`: Description of station location
    - `Latitude`, `Longitude`: GPS coordinates
    - `CurrentSpeed`: Current traffic speed in mph
    - `FreeFlowSpeed`: Free flow speed in mph
    - `TimeStamp`: Timestamp of last update
    - `StationMilepost`: Milepost location

- **getTrafficFlowById**: Returns traffic flow data for a specific station
  - **Input**: `FlowDataID` (integer) - Unique flow station identifier
  - **Output**: Single traffic flow object with all fields above

### Common Use Cases

#### Traffic Flow Visualization
```javascript
import { useTrafficFlows } from 'ws-dottie/wsdot-traffic-flow';

function TrafficFlowMap() {
  const { data: trafficFlows, isLoading, error } = useTrafficFlows();
  
  // Process data for visualization
  const flowData = trafficFlows?.map(flow => ({
    id: flow.FlowDataID,
    location: flow.FlowStationLocation,
    coordinates: [flow.Latitude, flow.Longitude],
    currentSpeed: flow.CurrentSpeed,
    freeFlowSpeed: flow.FreeFlowSpeed,
    congestion: flow.CurrentSpeed < flow.FreeFlowSpeed ? 'Congested' : 'Clear',
    speedRatio: flow.CurrentSpeed / flow.FreeFlowSpeed,
    timestamp: flow.TimeStamp
  })) || [];
  
  // Group flows by congestion level
  const congestionGroups = flowData.reduce((acc, flow) => {
    if (flow.congestion === 'Congested') acc.congested = [...(acc.congested || []), flow];
    else acc.clear = [...(acc.clear || []), flow];
    return acc;
  }, {});
  
  return (
    <div>
      <h1>Washington Traffic Flow</h1>
      {isLoading && <div>Loading traffic flow data...</div>}
      {error && <div>Error loading traffic flow data: {error.message}</div>}
      
      <div className="flow-summary">
        <div className="flow-group">
          <h3>Clear Flow ({congestionGroups.clear?.length || 0})</h3>
          <p>Average Speed: {calculateAverage(congestionGroups.clear, 'currentSpeed')?.toFixed(1)} mph</p>
        </div>
        <div className="flow-group">
          <h3>Congested ({congestionGroups.congested?.length || 0})</h3>
          <p>Average Speed: {calculateAverage(congestionGroups.congested, 'currentSpeed')?.toFixed(1)} mph</p>
        </div>
      </div>
      
      <div className="traffic-map">
        {/* Render map with traffic flow indicators */}
        {flowData.map(flow => (
          <div key={flow.id} className={`traffic-indicator ${flow.congestion.toLowerCase()}`}>
            <h3>{flow.location}</h3>
            <p>Current Speed: {flow.currentSpeed} mph</p>
            <p>Free Flow Speed: {flow.freeFlowSpeed} mph</p>
            <p>Status: {flow.congestion}</p>
            <p>Speed Ratio: {(flow.speedRatio * 100).toFixed(1)}%</p>
            <p>Last Updated: {new Date(flow.timestamp).toLocaleTimeString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to calculate average values
function calculateAverage(items, field) {
  if (!items || items.length === 0) return 0;
  const sum = items.reduce((acc, item) => acc + (item[field] || 0), 0);
  return sum / items.length;
}
```

## ⏱️ WSDOT Travel Times API

### API Overview
The WSDOT Travel Times API provides estimated travel times between key locations throughout Washington State, helping travelers plan routes and estimate arrival times.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **travel-time-routes** | Travel time data for major corridors | STATIC |

### Key Endpoints

#### Travel Times
- **getTravelTimes**: Returns travel time data for all available routes
  - **Input**: No parameters required
  - **Output**: Array of travel time route information
  - **Key Fields**:
    - `TravelTimeID`: Unique route identifier
    - `Name`: Human-readable route name
    - `StartPointName`, `EndPointName`: Start and end location names
    - `CurrentTime`: Current travel time in minutes
    - `AverageTime`: Average travel time in minutes
    - `Distance`: Route distance in miles
    - `LastUpdated`: Timestamp of last update

- **getTravelTimeById**: Returns travel time data for a specific route
  - **Input**: `TravelTimeID` (integer) - Unique route identifier
  - **Output**: Single travel time route object with all fields above

### Common Use Cases

#### Route Comparison Tool
```javascript
import { useTravelTimes } from 'ws-dottie/wsdot-travel-times';

function RouteComparison() {
  const { data: travelTimes, isLoading, error } = useTravelTimes();
  
  // Group routes by common destinations
  const seattleRoutes = travelTimes?.filter(route => 
    route.Name.includes('Seattle') || route.EndPointName.includes('Seattle')
  ) || [];
  
  const eastsideRoutes = travelTimes?.filter(route => 
    route.Name.includes('Bellevue') || route.Name.includes('Redmond') || 
    route.EndPointName.includes('Bellevue') || route.EndPointName.includes('Redmond')
  ) || [];
  
  // Sort routes by delay (longest first)
  const sortedRoutes = [...(travelTimes || [])].sort((a, b) => 
    (b.CurrentTime - b.AverageTime) - (a.CurrentTime - a.AverageTime)
  );
  
  return (
    <div>
      <h1>Route Comparison</h1>
      {isLoading && <div>Loading travel times...</div>}
      {error && <div>Error loading travel time data: {error.message}</div>}
      
      <div className="route-comparison">
        <div className="route-group">
          <h2>Seattle Routes</h2>
          {seattleRoutes.map(route => (
            <div key={route.TravelTimeID}>
              <h3>{route.Name}</h3>
              <p>From: {route.StartPointName}</p>
              <p>To: {route.EndPointName}</p>
              <p>Current Time: {route.CurrentTime} minutes</p>
              <p>Average Time: {route.AverageTime} minutes</p>
              <p>Delay: {route.CurrentTime - route.AverageTime > 0 ? '+' : ''}{Math.abs(route.CurrentTime - route.AverageTime)} minutes</p>
              <p>Distance: {route.Distance} miles</p>
            </div>
          ))}
        </div>
        
        <div className="route-group">
          <h2>Eastside Routes</h2>
          {eastsideRoutes.map(route => (
            <div key={route.TravelTimeID}>
              <h3>{route.Name}</h3>
              <p>From: {route.StartPointName}</p>
              <p>To: {route.EndPointName}</p>
              <p>Current Time: {route.CurrentTime} minutes</p>
              <p>Average Time: {route.AverageTime} minutes</p>
              <p>Delay: {route.CurrentTime - route.AverageTime > 0 ? '+' : ''}{Math.abs(route.CurrentTime - route.AverageTime)} minutes</p>
              <p>Distance: {route.Distance} miles</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## 🔗 API Relationships

Traffic APIs work together to provide comprehensive transportation information:

### Alerts + Mountain Pass Conditions Integration
```javascript
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';
import { useMountainPassConditions } from 'ws-dottie/wsdot-mountain-pass-conditions';

function PassAwareTrafficDashboard() {
  const { data: alerts } = useAlerts();
  const { data: passes } = useMountainPassConditions();
  
  // Correlate alerts with mountain pass conditions
  const alertsWithPasses = alerts?.map(alert => {
    // Find nearby mountain passes (within 20 miles)
    const nearbyPasses = passes?.filter(p => {
      const distance = calculateDistance(
        alert.Latitude, alert.Longitude,
        p.Latitude, p.Longitude
      );
      return distance <= 20;
    });
    
    return {
      ...alert,
      nearbyPasses: nearbyPasses?.map(p => ({
        name: p.PassName,
        restriction: p.RestrictionOne,
        conditions: p.WeatherCondition
      }))
    };
  }) || [];
  
  return (
    <div>
      <h1>Pass-Aware Traffic Dashboard</h1>
      <div className="traffic-alerts">
        <h2>Current Incidents</h2>
        {alertsWithPasses.map(alert => (
          <div key={alert.AlertID} className={`traffic-alert ${alert.Priority.toLowerCase()}`}>
            <h3>{alert.HeadlineDescription}</h3>
            <p>Priority: {alert.Priority}</p>
            <p>Location: {alert.StartRoadName} to {alert.EndRoadName}</p>
            {alert.nearbyPasses && alert.nearbyPasses.length > 0 && (
              <div className="nearby-passes">
                <h4>Nearby Mountain Passes:</h4>
                {alert.nearbyPasses.map((pass, index) => (
                  <div key={index} className="pass-info">
                    <p>{pass.name}: {pass.restriction} - {pass.conditions}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
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

### Alerts + Traffic Flow Integration
```javascript
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';
import { useTrafficFlows } from 'ws-dottie/wsdot-traffic-flow';

function TrafficDashboard() {
  const { data: alerts } = useAlerts();
  const { data: flow } = useTrafficFlows();
  
  // Correlate alerts with traffic flow data
  const alertsWithFlow = alerts?.map(alert => {
    // Find nearby flow stations (within 5 miles)
    const nearbyFlow = flow?.find(f => {
      const distance = calculateDistance(
        alert.Latitude, alert.Longitude,
        f.Latitude, f.Longitude
      );
      return distance <= 5;
    });
    
    return {
      ...alert,
      trafficSpeed: nearbyFlow?.CurrentSpeed,
      congestionLevel: nearbyFlow?.CurrentSpeed < nearbyFlow?.FreeFlowSpeed ? 'High' : 'Low'
    };
  }) || [];
  
  return (
    <div>
      <h1>Traffic Dashboard</h1>
      <div className="traffic-alerts">
        <h2>Current Incidents</h2>
        {alertsWithFlow.map(alert => (
          <div key={alert.AlertID} className={`traffic-alert ${alert.Priority.toLowerCase()}`}>
            <h3>{alert.HeadlineDescription}</h3>
            <p>Priority: {alert.Priority}</p>
            <p>Location: {alert.StartRoadName} to {alert.EndRoadName}</p>
            <p>Traffic Speed: {alert.trafficSpeed} mph</p>
            <p>Congestion: {alert.congestionLevel}</p>
          </div>
        ))}
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

### Travel Times + Toll Rates Integration
```javascript
import { useTravelTimes } from 'ws-dottie/wsdot-travel-times';
import { useTollRates } from 'ws-dottie/wsdot-toll-rates';

function RouteOptimizer() {
  const { data: travelTimes } = useTravelTimes();
  const { data: tollRates } = useTollRates();
  
  // Calculate optimal route considering both time and cost
  const optimizedRoutes = travelTimes?.map(route => {
    // Find toll rate for this route
    const tollRate = tollRates?.find(t => 
      t.TripName.includes(route.Name) || 
      t.TripName.includes(route.StartPointName) || 
      t.TripName.includes(route.EndPointName)
    );
    
    // Calculate total cost (time + toll)
    const timeCost = route.CurrentTime * 0.5; // $0.50 per minute
    const tollCost = tollRate?.TollRate || 0;
    const totalCost = timeCost + tollCost;
    
    return {
      ...route,
      tollAmount: tollRate?.TollRate || 0,
      timeCost,
      totalCost
    };
  }).sort((a, b) => a.totalCost - b.totalCost) || [];
  
  return (
    <div>
      <h1>Route Optimizer</h1>
      <h2>Optimal Routes (by time + cost)</h2>
      {optimizedRoutes.map(route => (
        <div key={route.TravelTimeID}>
          <h3>{route.Name}</h3>
          <p>From: {route.StartPointName}</p>
          <p>To: {route.EndPointName}</p>
          <p>Time: {route.CurrentTime} minutes</p>
          <p>Average: {route.AverageTime} minutes</p>
          <p>Delay: {route.CurrentTime - route.AverageTime > 0 ? '+' : ''}{Math.abs(route.CurrentTime - route.AverageTime)} minutes</p>
          <p>Toll: ${route.tollAmount}</p>
          <p>Time Cost: ${route.timeCost.toFixed(2)}</p>
          <p>Total Cost: ${route.totalCost.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
```

## 📊 Performance Considerations

### Caching Strategies
- **Highway Alerts**: `REALTIME_UPDATES` (5-second refresh)
- **Traffic Flow**: `REALTIME_UPDATES` (5-second refresh)
- **Travel Times**: `MINUTE_UPDATES` (1-minute refresh)
- **Highway Cameras**: `DAILY_UPDATES` (daily refresh)
- **Mountain Pass Conditions**: `FREQUENT_UPDATES` (15-30 minute refresh)
- **Toll Rates**: `MINUTE_UPDATES` (1-minute refresh)
- **Border Crossings**: `MINUTE_UPDATES` (5-15 minute refresh)

### Optimization Tips
- **Real-time Data**: Use appropriate caching for alerts and flow data
- **Camera Images**: Implement lazy loading for camera feeds
- **Route Calculations**: Cache common route calculations
- **Regional Filtering**: Use geographic filtering to reduce data volume
- **Pass Monitoring**: Focus on passes relevant to travel routes

## 🔗 Detailed Documentation

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[WSDOT Border Crossings HTML](../../../redoc/wsdot-border-crossings.html)** - Interactive border crossing documentation
- **[WSDOT Highway Alerts HTML](../../../redoc/wsdot-highway-alerts.html)** - Interactive alerts documentation
- **[WSDOT Highway Cameras HTML](../../../redoc/wsdot-highway-cameras.html)** - Interactive camera documentation
- **[WSDOT Mountain Pass Conditions HTML](../../../redoc/wsdot-mountain-pass-conditions.html)** - Interactive pass conditions documentation
- **[WSDOT Toll Rates HTML](../../../redoc/wsdot-toll-rates.html)** - Interactive toll documentation
- **[WSDOT Traffic Flow HTML](../../../redoc/wsdot-traffic-flow.html)** - Interactive flow documentation
- **[WSDOT Travel Times HTML](../../../redoc/wsdot-travel-times.html)** - Interactive travel times documentation

## 📚 Next Steps

- **[React Integration Guide](../guides/react-integration.md)** - React patterns with TanStack Query
- **[Node.js Integration Guide](../guides/nodejs-integration.md)** - Server-side usage patterns
- **[Caching Reference](../reference/caching.md)** - Performance optimization strategies
- **[Error Handling Reference](../reference/error-handling.md)** - Error recovery patterns
