# Traffic APIs

This guide covers all traffic-related APIs in WS-Dottie, providing comprehensive access to Washington State highway conditions, incidents, and traffic flow data.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🚗 Overview

WS-Dottie provides access to six traffic APIs that cover all aspects of Washington State highway information:

| API | Description | Key Features | Update Frequency |
|------|-------------|---------------|------------------|
| **WSDOT Highway Alerts** | Real-time traffic incidents and construction | Real-time (5s) |
| **WSDOT Traffic Flow** | Current traffic speeds and congestion data | Real-time (5s) |
| **WSDOT Travel Times** | Estimated travel times between locations | Frequent (1-5m) |
| **WSDOT Highway Cameras** | Live traffic camera feeds | Static (daily) |
| **WSDOT Toll Rates** | Real-time toll pricing for managed lanes | Frequent (1-5m) |
| **WSDOT Border Crossings** | Wait times and conditions at border crossings | Frequent (5-15m) |

## 🚨 WSDOT Highway Alerts API

### Key Features
- **Real-time incident reporting** with priority levels
- **Construction updates** and road closure information
- **Weather-related incidents** and road conditions
- **Geographic filtering** by map area or region

### Common Use Cases

#### Traffic Alert Dashboard
```javascript
import { useHighwayAlerts } from 'ws-dottie';

function TrafficAlertDashboard() {
  const { data: alerts, isLoading } = useHighwayAlerts();
  
  // Group alerts by priority
  const highPriorityAlerts = alerts?.filter(alert => alert.Priority === 'High' || alert.Priority === 'Highest');
  const normalAlerts = alerts?.filter(alert => alert.Priority === 'Normal' || alert.Priority === 'Low');
  
  return (
    <div>
      <h1>Washington Traffic Alerts</h1>
      {isLoading && <div>Loading alerts...</div>}
      
      <h2>High Priority Alerts ({highPriorityAlerts?.length || 0})</h2>
      {highPriorityAlerts?.map(alert => (
        <div key={alert.AlertID} className="high-priority">
          <h3>{alert.HeadlineDescription}</h3>
          <p>Category: {alert.EventCategory}</p>
          <p>Location: {alert.StartRoadName} to {alert.EndRoadName}</p>
        </div>
      ))}
      
      <h2>Other Alerts ({normalAlerts?.length || 0})</h2>
      {normalAlerts?.map(alert => (
        <div key={alert.AlertID}>
          <h3>{alert.HeadlineDescription}</h3>
          <p>Category: {alert.EventCategory}</p>
          <p>Location: {alert.StartRoadName} to {alert.EndRoadName}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Regional Traffic Monitoring
```javascript
import { useHighwayAlertsByMapArea } from 'ws-dottie';

function RegionalTrafficMonitor() {
  const [selectedRegion, setSelectedRegion] = useState('Seattle');
  const { data: alerts } = useHighwayAlertsByMapArea({ mapArea: selectedRegion });
  
  return (
    <div>
      <h1>Regional Traffic Monitor</h1>
      <div>
        <label>Region: 
          <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
            <option value="Seattle">Seattle</option>
            <option value="Spokane">Spokane</option>
            <option value="Vancouver">Vancouver</option>
            <option value="Tacoma">Tacoma</option>
          </select>
        </label>
      </div>
      
      <h2>{selectedRegion} Alerts ({alerts?.length || 0})</h2>
      {alerts?.map(alert => (
        <div key={alert.AlertID}>
          <h3>{alert.HeadlineDescription}</h3>
          <p>Priority: {alert.Priority}</p>
          <p>Start Time: {new Date(alert.StartTime).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🚦 WSDOT Traffic Flow API

### Key Features
- **Real-time traffic speed** data for highway segments
- **Congestion analysis** with flow measurements
- **Travel time estimates** based on current conditions
- **Historical traffic patterns** for trend analysis

### Common Use Cases

#### Traffic Flow Visualization
```javascript
import { useTrafficFlows } from 'ws-dottie';

function TrafficFlowMap() {
  const { data: trafficFlows, isLoading } = useTrafficFlows();
  
  // Process data for visualization
  const flowData = trafficFlows?.map(flow => ({
    id: flow.FlowDataID,
    location: flow.FlowStationLocation,
    speed: flow.CurrentSpeed,
    freeFlowSpeed: flow.FreeFlowSpeed,
    congestion: flow.CurrentSpeed < flow.FreeFlowSpeed ? 'Congested' : 'Clear',
    coordinates: [flow.StartLatitude, flow.StartLongitude]
  }));
  
  return (
    <div>
      <h1>Washington Traffic Flow</h1>
      {isLoading && <div>Loading traffic flow data...</div>}
      
      <div className="traffic-map">
        {/* Render map with traffic flow indicators */}
        {flowData?.map(flow => (
          <div key={flow.id} className={`traffic-indicator ${flow.congestion.toLowerCase()}`}>
            <h3>{flow.location}</h3>
            <p>Current Speed: {flow.speed} mph</p>
            <p>Free Flow Speed: {flow.freeFlowSpeed} mph</p>
            <p>Status: {flow.congestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## ⏱️ WSDOT Travel Times API

### Key Features
- **Real-time travel time estimates** between key locations
- **Route comparison** for optimal path selection
- **Historical travel time data** for trend analysis
- **Delay calculations** based on current conditions

### Common Use Cases

#### Route Comparison Tool
```javascript
import { useTravelTimes } from 'ws-dottie';

function RouteComparison() {
  const { data: travelTimes, isLoading } = useTravelTimes();
  
  // Group routes by common destinations
  const seattleRoutes = travelTimes?.filter(route => 
    route.Name.includes('Seattle') || route.Name.includes('I-5')
  );
  
  const eastsideRoutes = travelTimes?.filter(route => 
    route.Name.includes('Bellevue') || route.Name.includes('I-90')
  );
  
  return (
    <div>
      <h1>Route Comparison</h1>
      {isLoading && <div>Loading travel times...</div>}
      
      <div className="route-comparison">
        <div className="route-group">
          <h2>Seattle Routes</h2>
          {seattleRoutes?.map(route => (
            <div key={route.TravelTimeID}>
              <h3>{route.Name}</h3>
              <p>Current Time: {route.CurrentTime} minutes</p>
              <p>Average Time: {route.AverageTime} minutes</p>
              <p>Delay: {route.CurrentTime - route.AverageTime > 0 ? '+' : ''}{Math.abs(route.CurrentTime - route.AverageTime)} minutes</p>
            </div>
          ))}
        </div>
        
        <div className="route-group">
          <h2>Eastside Routes</h2>
          {eastsideRoutes?.map(route => (
            <div key={route.TravelTimeID}>
              <h3>{route.Name}</h3>
              <p>Current Time: {route.CurrentTime} minutes</p>
              <p>Average Time: {route.AverageTime} minutes</p>
              <p>Delay: {route.CurrentTime - route.AverageTime > 0 ? '+' : ''}{Math.abs(route.CurrentTime - route.AverageTime)} minutes</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## 📷 WSDOT Highway Cameras API

### Key Features
- **Live traffic camera feeds** from highways throughout Washington
- **Camera metadata** including location, direction, and route information
- **Image URLs** for direct camera access
- **Camera search** by route, region, or location

### Common Use Cases

#### Traffic Camera Viewer
```javascript
import { useHighwayCameras, useSearchCameras } from 'ws-dottie';

function TrafficCameraViewer() {
  const [selectedRoute, setSelectedRoute] = useState('I-5');
  const { data: allCameras } = useHighwayCameras();
  const { data: routeCameras } = useSearchCameras({ StateRoute: '5' });
  
  return (
    <div>
      <h1>Washington Traffic Cameras</h1>
      
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
        {routeCameras?.map(camera => (
          <div key={camera.CameraID} className="camera-item">
            <h3>{camera.Title}</h3>
            <p>Location: {camera.RoadName}</p>
            <p>Milepost: {camera.MilePost}</p>
            <img 
              src={camera.ImageURL} 
              alt={camera.Title}
              onError={() => console.error(`Failed to load camera ${camera.CameraID}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 💰 WSDOT Toll Rates API

### Key Features
- **Real-time toll pricing** for managed lanes and express toll roads
- **Vehicle type differentiation** for cars, trucks, motorcycles, etc.
- **Time-based pricing** with peak and off-peak rates
- **Trip calculation** for route planning

### Common Use Cases

#### Toll Calculator
```javascript
import { useTollRates, useTollTripInfo } from 'ws-dottie';

function TollCalculator() {
  const [vehicleType, setVehicleType] = useState('2Axle');
  const [trip, setTrip] = useState({ start: 'SR-167', end: 'SR-509' });
  
  const { data: tollRates } = useTollRates();
  const { data: tripInfo } = useTollTripInfo();
  
  // Calculate toll for specific trip
  const calculateToll = () => {
    const rate = tollRates?.find(r => 
      r.TripName.includes(trip.start) && r.TripName.includes(trip.end)
    );
    
    if (!rate) return 'No toll information available';
    
    const vehicleRate = rate.TollRate?.find(r => r.VehicleClass === vehicleType);
    return vehicleRate?.TollAmount || 'Rate not available';
  };
  
  const currentToll = calculateToll();
  
  return (
    <div>
      <h1>Toll Calculator</h1>
      
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
        <h2>Current Toll: ${currentToll}</h2>
        <p>Vehicle Type: {vehicleType}</p>
        <p>Route: {trip.start} to {trip.end}</p>
      </div>
    </div>
  );
}
```

## 🛃 WSDOT Border Crossings API

### Key Features
- **Real-time border crossing wait times** for US-Canada crossings
- **Lane status information** including open/closed lanes
- **Crossing type differentiation** for passenger, commercial, NEXUS, etc.
- **Historical wait time data** for trend analysis

### Common Use Cases

#### Border Crossing Monitor
```javascript
import { useBorderCrossings } from 'ws-dottie';

function BorderCrossingMonitor() {
  const { data: crossings, isLoading } = useBorderCrossings();
  
  // Group crossings by type
  const passengerCrossings = crossings?.filter(c => c.CrossingType === 'Passenger');
  const commercialCrossings = crossings?.filter(c => c.CrossingType === 'Commercial');
  
  return (
    <div>
      <h1>Washington Border Crossings</h1>
      {isLoading && <div>Loading border crossing data...</div>}
      
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

## 🔗 API Relationships

Traffic APIs work together to provide comprehensive transportation information:

### Alerts + Traffic Flow Integration
```javascript
import { useHighwayAlerts, useTrafficFlow } from 'ws-dottie';

function TrafficDashboard() {
  const { data: alerts } = useHighwayAlerts();
  const { data: flow } = useTrafficFlow();
  
  // Correlate alerts with traffic flow data
  const alertsWithFlow = alerts?.map(alert => {
    const nearbyFlow = flow?.find(f => 
      isNearby(alert, f) // Function to check proximity
    );
    
    return {
      ...alert,
      trafficSpeed: nearbyFlow?.CurrentSpeed,
      congestionLevel: nearbyFlow?.CurrentSpeed < nearbyFlow?.FreeFlowSpeed ? 'High' : 'Low'
    };
  });
  
  return (
    <div>
      <h1>Traffic Dashboard</h1>
      {alertsWithFlow?.map(alert => (
        <div key={alert.AlertID}>
          <h3>{alert.HeadlineDescription}</h3>
          <p>Traffic Speed: {alert.trafficSpeed} mph</p>
          <p>Congestion: {alert.congestionLevel}</p>
        </div>
      ))}
    </div>
  );
}
```

### Travel Times + Toll Rates Integration
```javascript
import { useTravelTimes, useTollRates } from 'ws-dottie';

function RouteOptimizer() {
  const { data: travelTimes } = useTravelTimes();
  const { data: tollRates } = useTollRates();
  
  // Calculate optimal route considering both time and cost
  const optimizedRoutes = travelTimes?.map(route => {
    const tollRate = tollRates?.find(t => 
      t.TripName.includes(route.Name)
    );
    
    const totalCost = (route.CurrentTime * 0.5) + (tollRate?.TollAmount || 0); // Time + toll
    
    return {
      ...route,
      tollAmount: tollRate?.TollAmount || 0,
      totalCost
    };
  }).sort((a, b) => a.totalCost - b.totalCost);
  
  return (
    <div>
      <h1>Route Optimizer</h1>
      <h2>Optimal Routes (by time + cost)</h2>
      {optimizedRoutes?.map(route => (
        <div key={route.TravelTimeID}>
          <h3>{route.Name}</h3>
          <p>Time: {route.CurrentTime} minutes</p>
          <p>Toll: ${route.tollAmount}</p>
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
- **Toll Rates**: `MINUTE_UPDATES` (1-minute refresh)
- **Border Crossings**: `MINUTE_UPDATES` (5-15 minute refresh)

### Optimization Tips
- **Real-time Data**: Use appropriate caching for alerts and flow data
- **Camera Images**: Implement lazy loading for camera feeds
- **Route Calculations**: Cache common route calculations
- **Regional Filtering**: Use geographic filtering to reduce data volume

## 🔗 Detailed Documentation

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[WSDOT Highway Alerts HTML](../../../redoc/wsdot-highway-alerts.html)** - Interactive alerts documentation
- **[WSDOT Traffic Flow HTML](../../../redoc/wsdot-traffic-flow.html)** - Interactive flow documentation
- **[WSDOT Travel Times HTML](../../../redoc/wsdot-travel-times.html)** - Interactive travel times documentation
- **[WSDOT Highway Cameras HTML](../../../redoc/wsdot-highway-cameras.html)** - Interactive camera documentation
- **[WSDOT Toll Rates HTML](../../../redoc/wsdot-toll-rates.html)** - Interactive toll documentation
- **[WSDOT Border Crossings HTML](../../../redoc/wsdot-border-crossings.html)** - Interactive border crossing documentation

## 📚 Next Steps

- **[React Integration Guide](../guides/react-integration.md)** - React patterns with TanStack Query
- **[Node.js Integration Guide](../guides/nodejs-integration.md)** - Server-side usage patterns
- **[Caching Reference](../reference/caching.md)** - Performance optimization strategies
- **[Error Handling Reference](../reference/error-handling.md)** - Error recovery patterns
