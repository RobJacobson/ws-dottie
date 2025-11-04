# WS-Dottie API Guide

This guide provides a high-level overview of all WS-Dottie APIs, their use cases, and how they work together to build comprehensive transportation applications.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](./getting-started.md) • [Architecture](./architecture.md)

## 🗺️ API Overview

WS-Dottie provides access to 16 APIs from Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF), organized into four main categories:

| Category | APIs | Endpoints | Primary Use Cases |
|-----------|-------|------------|-------------------|
| **Ferries** | 4 APIs | 57+ endpoints | Vessel tracking, terminal monitoring, schedule planning |
| **Traffic** | 6 APIs | 15+ endpoints | Traffic monitoring, route planning, incident tracking |
| **Weather** | 4 APIs | 7+ endpoints | Weather monitoring, road conditions, pass status |
| **Infrastructure** | 2 APIs | 11+ endpoints | Commercial vehicle routing, toll planning, border crossing |

## 🚢 Ferry APIs

### Overview

Ferry APIs provide comprehensive access to Washington State Ferries operations, including real-time vessel tracking, terminal information, schedules, and fare data.

### Available APIs

| API | Description | Key Features |
|------|-------------|---------------|
| **WSF Vessels** | Real-time vessel locations, specifications, and history | Live tracking, vessel details, historical data |
| **WSF Terminals** | Terminal wait times, sailing space, and locations | Wait monitoring, terminal capacity, location data |
| **WSF Schedule** | Ferry schedules, routes, and sailing times | Trip planning, route information, time tables |
| **WSF Fares** | Fare information, pricing, and terminal combinations | Cost calculation, fare planning, price comparison |

### Common Ferry Use Cases

#### Real-time Ferry Tracking
```javascript
import { useVesselLocations, useTerminalWaitTimes } from 'ws-dottie';

function FerryTracker() {
  const { data: vessels } = useVesselLocations();
  const { data: waitTimes } = useTerminalWaitTimes();
  
  return (
    <div>
      <h1>Washington State Ferries</h1>
      {vessels?.map(vessel => (
        <div key={vessel.VesselID}>
          <h3>{vessel.VesselName}</h3>
          <p>Location: {vessel.Latitude}, {vessel.Longitude}</p>
          <p>Speed: {vessel.Speed} knots</p>
        </div>
      ))}
    </div>
  );
}
```

#### Ferry Trip Planning
```javascript
import { useSchedules, useFares, useTerminals } from 'ws-dottie';

function TripPlanner() {
  const { data: schedules } = useSchedules({ 
    departingTerminalId: 3, 
    arrivingTerminalId: 7, 
    tripDate: new Date() 
  });
  
  const { data: fares } = useFares({ 
    tripDate: new Date(), 
    departingTerminalId: 3, 
    arrivingTerminalId: 7 
  });
  
  return (
    <div>
      <h1>Ferry Trip Planner</h1>
      {/* Display schedules and fares */}
    </div>
  );
}
```

## 🚗 Traffic APIs

### Overview

Traffic APIs provide real-time information about highway conditions, incidents, traffic flow, and travel times throughout Washington State.

### Available APIs

| API | Description | Key Features |
|------|-------------|---------------|
| **WSDOT Highway Alerts** | Real-time traffic incidents and construction | Incident tracking, construction updates, road closures |
| **WSDOT Traffic Flow** | Current traffic speeds and congestion data | Flow monitoring, congestion analysis, speed data |
| **WSDOT Travel Times** | Estimated travel times between locations | Route planning, ETA calculation, delay tracking |
| **WSDOT Highway Cameras** | Live traffic camera feeds | Visual monitoring, road conditions, traffic visualization |
| **WSDOT Toll Rates** | Real-time toll pricing for managed lanes | Cost calculation, route optimization, toll planning |
| **WSDOT Border Crossings** | Wait times and conditions at border crossings | Border planning, wait time monitoring, crossing status |

### Common Traffic Use Cases

#### Traffic Monitoring Dashboard
```javascript
import { useHighwayAlerts, useTrafficFlow, useTravelTimes } from 'ws-dottie';

function TrafficDashboard() {
  const { data: alerts } = useHighwayAlerts();
  const { data: flow } = useTrafficFlow();
  const { data: travelTimes } = useTravelTimes();
  
  return (
    <div>
      <h1>Washington Traffic</h1>
      <h2>Active Alerts ({alerts?.length || 0})</h2>
      {alerts?.map(alert => (
        <div key={alert.AlertID}>
          <h3>{alert.HeadlineDescription}</h3>
          <p>Category: {alert.EventCategory}</p>
          <p>Priority: {alert.Priority}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Route Planning with Traffic Data
```javascript
import { useTravelTimes, useTollRates, useHighwayAlerts } from 'ws-dottie';

function RoutePlanner() {
  const { data: travelTimes } = useTravelTimes();
  const { data: tollRates } = useTollRates();
  const { data: alerts } = useHighwayAlerts();
  
  // Calculate optimal route based on current conditions
  const optimalRoute = calculateOptimalRoute(travelTimes, tollRates, alerts);
  
  return (
    <div>
      <h1>Route Planner</h1>
      <p>Recommended route: {optimalRoute.name}</p>
      <p>Estimated time: {optimalRoute.time} minutes</p>
      <p>Toll cost: ${optimalRoute.toll}</p>
    </div>
  );
}
```

## 🌤️ Weather APIs

### Overview

Weather APIs provide access to weather information, road conditions, and mountain pass status throughout Washington State.

### Available APIs

| API | Description | Key Features |
|------|-------------|---------------|
| **WSDOT Weather Information** | Current weather conditions at monitoring stations | Temperature, precipitation, road conditions |
| **WSDOT Weather Extended** | Detailed weather with surface/subsurface measurements | Advanced weather data, scientific measurements |
| **WSDOT Weather Stations** | Weather station locations and metadata | Station locations, equipment information, coverage map |
| **WSDOT Mountain Pass Conditions** | Pass status, restrictions, and road conditions | Pass conditions, travel restrictions, closure information |

### Common Weather Use Cases

#### Weather Conditions Dashboard
```javascript
import { useWeatherInformation, useMountainPassConditions } from 'ws-dottie';

function WeatherDashboard() {
  const { data: weather } = useWeatherInformation();
  const { data: passes } = useMountainPassConditions();
  
  return (
    <div>
      <h1>Washington Weather</h1>
      <h2>Weather Stations</h2>
      {weather?.map(station => (
        <div key={station.StationID}>
          <h3>{station.StationName}</h3>
          <p>Temperature: {station.Temperature}°F</p>
          <p>Conditions: {station.RoadCondition}</p>
        </div>
      ))}
      
      <h2>Mountain Passes</h2>
      {passes?.map(pass => (
        <div key={pass.MountainPassId}>
          <h3>{pass.MountainPassName}</h3>
          <p>Status: {pass.WeatherCondition}</p>
          <p>Restrictions: {pass.RestrictionOne}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🏗️ Infrastructure APIs

### Overview

Infrastructure APIs provide information about physical transportation infrastructure, including bridge clearances, toll rates, and border crossing conditions.

### Available APIs

| API | Description | Key Features |
|------|-------------|---------------|
| **WSDOT Bridge Clearances** | Height restrictions for bridges and overpasses | Clearance data, route planning for tall vehicles |
| **WSDOT Commercial Vehicle Restrictions** | Weight limits and vehicle restrictions | Truck routing, restriction information, compliance data |
| **WSDOT Border Crossings** | Wait times and conditions at border crossings | Border planning, wait time monitoring, crossing status |

### Common Infrastructure Use Cases

#### Commercial Vehicle Route Planning
```javascript
import { useBridgeClearances, useCommercialVehicleRestrictions } from 'ws-dottie';

function TruckRoutePlanner() {
  const { data: clearances } = useBridgeClearances();
  const { data: restrictions } = useCommercialVehicleRestrictions();
  
  // Calculate route based on vehicle dimensions and restrictions
  const safeRoute = calculateSafeRoute(clearances, restrictions, vehicleSpecs);
  
  return (
    <div>
      <h1>Truck Route Planner</h1>
      <p>Recommended route: {safeRoute.name}</p>
      <p>Lowest clearance: {safeRoute.minClearance} feet</p>
      <p>Weight restrictions: {safeRoute.restrictions}</p>
    </div>
  );
}
```

## 🔄 Data Update Frequencies

WS-Dottie optimizes caching strategies based on how frequently different data types are updated:

| Category | Update Frequency | Caching Strategy | Examples |
|-----------|------------------|-------------------|----------|
| **Real-time** | 5 seconds | `REALTIME_UPDATES` | Vessel locations, traffic alerts |
| **Frequent** | 1-5 minutes | `MINUTE_UPDATES` | Terminal wait times, traffic flow |
| **Regular** | 15-60 minutes | `HOURLY_UPDATES` | Weather conditions, road status |
| **Static** | Daily | `DAILY_UPDATES` | Schedules, fares |
| **Historical** | Weekly | `WEEKLY_UPDATES` | Terminal info, vessel specs |

## 🔗 API Relationships

Many WS-Dottie APIs work together to provide comprehensive transportation solutions:

### Ferry + Traffic Integration
```javascript
import { useVesselLocations, useHighwayAlerts, useTravelTimes } from 'ws-dottie';

function CommuterDashboard() {
  const { data: vessels } = useVesselLocations();
  const { data: alerts } = useHighwayAlerts();
  const { data: travelTimes } = useTravelTimes();
  
  // Combine ferry and highway data for complete commute picture
  return (
    <div>
      <h1>Seattle Commute Dashboard</h1>
      <FerryStatus vessels={vessels} />
      <HighwayStatus alerts={alerts} travelTimes={travelTimes} />
    </div>
  );
}
```

### Weather + Traffic Integration
```javascript
import { useWeatherInformation, useHighwayAlerts, useMountainPassConditions } from 'ws-dottie';

function WeatherAwareTrafficApp() {
  const { data: weather } = useWeatherInformation();
  const { data: alerts } = useHighwayAlerts();
  const { data: passes } = useMountainPassConditions();
  
  // Correlate weather conditions with traffic incidents
  const weatherRelatedAlerts = alerts.filter(alert => 
    isWeatherRelated(alert, weather)
  );
  
  return (
    <div>
      <h1>Weather-Aware Traffic</h1>
      <TrafficAlerts alerts={weatherRelatedAlerts} />
      <MountainPassStatus passes={passes} />
    </div>
  );
}
```

## 🎯 Choosing Right APIs

### For Different Application Types

#### Real-time Tracking Applications
- **Primary APIs**: Vessel Locations, Highway Alerts, Traffic Flow
- **Caching Strategy**: `REALTIME_UPDATES`
- **Update Frequency**: 5-10 seconds

#### Trip Planning Applications
- **Primary APIs**: Schedules, Fares, Travel Times, Toll Rates
- **Caching Strategy**: `DAILY_UPDATES` or `WEEKLY_UPDATES`
- **Update Frequency**: Daily to weekly

#### Monitoring Applications
- **Primary APIs**: Weather Information, Mountain Pass Conditions, Highway Cameras
- **Caching Strategy**: `HOURLY_UPDATES`
- **Update Frequency**: 15-60 minutes

#### Analytics Applications
- **Primary APIs**: Vessel History, Commercial Vehicle Restrictions, Border Crossings
- **Caching Strategy**: `WEEKLY_UPDATES`
- **Update Frequency**: Weekly or manual refresh

## 📊 Performance Considerations

### Request Optimization
- **Batch Requests**: Use multiple API calls in parallel when possible
- **Conditional Fetching**: Only fetch data when needed
- **Background Updates**: Use appropriate caching strategies

### Data Volume
- **Large Datasets**: Consider pagination or filtering for large responses
- **Real-time Data**: Use appropriate caching to avoid excessive requests
- **Historical Data**: Use date range filtering to limit response size

## 🔗 Detailed Documentation

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[OpenAPI Specifications](../../openapi/)** - API specifications in YAML format
- **[HTML Documentation](../../redoc/)** - Interactive HTML documentation

## 📚 Next Steps

- **[Category Documentation](./categories/)** - Detailed information by use case
- **[Implementation Guides](./guides/)** - Platform-specific integration patterns
- **[Reference Materials](./reference/)** - Advanced configuration and patterns
