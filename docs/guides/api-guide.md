# WS-Dottie API Guide

This guide provides a high-level overview of all WS-Dottie APIs, their use cases, and how they work together to build comprehensive transportation applications.

> **📚 Documentation Navigation**: [Documentation Index](../INDEX.md) • [Getting Started](../getting-started.md) • [Architecture](./architecture.md)

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
Build applications that track ferry locations in real-time, showing current positions, speeds, and headings.

**Relevant APIs**: WSF Vessels

```javascript
import { useVesselLocations } from 'ws-dottie/wsf-vessels';

function FerryTracker() {
  const { data: vessels, isLoading } = useVesselLocations({
    fetchMode: 'native',
    validate: false, // Faster for production
  });
  
  return (
    <div>
      <h2>Active Ferries: {vessels?.length || 0}</h2>
      {isLoading && <div>Loading...</div>}
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
Create tools for planning ferry trips with schedule information, terminal wait times, and fare calculations.

**Relevant APIs**: WSF Schedule, WSF Terminals, WSF Fares

```javascript
import { useScheduleByTripDateAndRouteId } from 'ws-dottie/wsf-schedule';
import { useTerminalWaitTimes } from 'ws-dottie/wsf-terminals';
import { useFareLineItemsByTripDateAndTerminals } from 'ws-dottie/wsf-fares';

function FerryTripPlanner() {
  const [trip, setTrip] = useState({
    departing: 3,
    arriving: 7,
    date: new Date()
  });
  
  const { data: schedules } = useScheduleByTripDateAndRouteId({
    params: {
      TripDate: trip.date.toISOString().split('T')[0],
      RouteID: trip.departing
    },
    fetchMode: 'native',
    validate: true
  });
  
  const { data: waitTimes } = useTerminalWaitTimes({
    fetchMode: 'native',
    validate: false
  });
  
  const { data: fares } = useFareLineItemsByTripDateAndTerminals({
    params: {
      TripDate: trip.date.toISOString().split('T')[0],
      DepartingTerminalID: trip.departing,
      ArrivingTerminalID: trip.arriving,
      RoundTrip: false
    },
    fetchMode: 'native',
    validate: true
  });
  
  return (
    <div>
      <h2>Ferry Trip Planning</h2>
      
      <section>
        <h3>Schedules</h3>
        {schedules?.map(schedule => (
          <div key={schedule.ScheduleID}>
            <p>Departing: {schedule.DepartingTime}</p>
            <p>Arriving: {schedule.ArrivingTime}</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Terminal Wait Times</h3>
        {waitTimes?.map(waitTime => (
          <div key={waitTime.TerminalID}>
            <p>Terminal {waitTime.TerminalID}: {waitTime.WaitTime} minutes</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Fares</h3>
        {fares?.map(fare => (
          <div key={fare.FareLineItemID}>
            <p>{fare.FareItemName}: ${fare.FareAmount}</p>
          </div>
        ))}
      </section>
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
Create dashboards for highway conditions, traffic flow, and travel time estimates.

**Relevant APIs**: WSDOT Highway Alerts, WSDOT Traffic Flow, WSDOT Travel Times

```javascript
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';
import { useTrafficFlows } from 'ws-dottie/wsdot-traffic-flow';
import { useTravelTimes } from 'ws-dottie/wsdot-travel-times';

function TrafficDashboard() {
  const { data: alerts } = useAlerts();
  const { data: trafficFlow } = useTrafficFlows();
  const { data: travelTimes } = useTravelTimes();
  
  return (
    <div>
      <h2>Traffic Dashboard</h2>
      
      <section>
        <h3>Highway Alerts ({alerts?.length || 0})</h3>
        {alerts?.map(alert => (
          <div key={alert.AlertID}>
            <h4>{alert.Headline}</h4>
            <p>Priority: {alert.Priority}</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Traffic Flow</h3>
        {trafficFlow?.map(flow => (
          <div key={flow.FlowDataID}>
            <p>Location: {flow.Location}</p>
            <p>Speed: {flow.AverageSpeed} mph</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Travel Times</h3>
        {travelTimes?.map(time => (
          <div key={time.TravelTimeID}>
            <p>Route: {time.RouteName}</p>
            <p>Time: {time.AverageTime} minutes</p>
          </div>
        ))}
      </section>
    </div>
  );
}
```

#### Route Planning with Traffic Data
Build tools for optimal route planning based on current traffic conditions and toll rates.

**Relevant APIs**: WSDOT Travel Times, WSDOT Toll Rates, WSDOT Highway Alerts

```javascript
import { useTravelTimes } from 'ws-dottie/wsdot-travel-times';
import { useTollRates } from 'ws-dottie/wsdot-toll-rates';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';

function RoutePlanner() {
  const { data: travelTimes } = useTravelTimes();
  const { data: tollRates } = useTollRates();
  const { data: alerts } = useAlerts();
  
  return (
    <div>
      <h2>Route Planner</h2>
      
      <section>
        <h3>Current Travel Times</h3>
        {travelTimes?.map(time => (
          <div key={time.TravelTimeID}>
            <p>Route: {time.RouteName}</p>
            <p>Time: {time.AverageTime} minutes</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Toll Rates</h3>
        {tollRates?.map(rate => (
          <div key={rate.TollRateID}>
            <p>Location: {rate.TollLocationName}</p>
            <p>Rate: ${rate.TollRate}</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Active Alerts</h3>
        {alerts?.map(alert => (
          <div key={alert.AlertID}>
            <p>{alert.Headline}</p>
          </div>
        ))}
      </section>
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
| **WSDOT Weather Readings** | Detailed weather with surface/subsurface measurements | Advanced weather data, scientific measurements |
| **WSDOT Weather Stations** | Weather station locations and metadata | Station locations, equipment information, coverage map |
| **WSDOT Mountain Pass Conditions** | Pass status, restrictions, and road conditions | Pass conditions, travel restrictions, closure information |

### Common Weather Use Cases

#### Weather Conditions Dashboard
Display weather conditions, road conditions, and mountain pass status for travel planning.

**Relevant APIs**: WSDOT Weather Information, WSDOT Mountain Pass Conditions

```javascript
import { useWeatherInformation } from 'ws-dottie/wsdot-weather-information';
import { useMountainPassConditions } from 'ws-dottie/wsdot-mountain-pass-conditions';

function WeatherDashboard() {
  const { data: weather } = useWeatherInformation();
  const { data: passConditions } = useMountainPassConditions();
  
  return (
    <div>
      <h2>Weather Dashboard</h2>
      
      <section>
        <h3>Weather Conditions</h3>
        {weather?.map(station => (
          <div key={station.StationID}>
            <p>Station: {station.StationName}</p>
            <p>Temperature: {station.Temperature}°F</p>
            <p>Conditions: {station.RoadCondition}</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Mountain Pass Conditions</h3>
        {passConditions?.map(pass => (
          <div key={pass.PassConditionID}>
            <p>Pass: {pass.MountainPassName}</p>
            <p>Status: {pass.WeatherCondition}</p>
            <p>Restrictions: {pass.RestrictionText}</p>
          </div>
        ))}
      </section>
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
Build tools for route planning with bridge clearances, toll rates, and vehicle restrictions.

**Relevant APIs**: WSDOT Bridge Clearances, WSDOT Commercial Vehicle Restrictions, WSDOT Border Crossings

```javascript
import { useBridgeClearances } from 'ws-dottie/wsdot-bridge-clearances';
import { useCommercialVehicleRestrictions } from 'ws-dottie/wsdot-commercial-vehicle-restrictions';
import { useBorderCrossings } from 'ws-dottie/wsdot-border-crossings';

function CommercialVehicleRoutePlanner() {
  const { data: clearances } = useBridgeClearances();
  const { data: restrictions } = useCommercialVehicleRestrictions();
  const { data: crossings } = useBorderCrossings();
  
  return (
    <div>
      <h2>Commercial Vehicle Route Planner</h2>
      
      <section>
        <h3>Bridge Clearances</h3>
        {clearances?.map(clearance => (
          <div key={clearance.ClearanceID}>
            <p>Route: {clearance.Route}</p>
            <p>Clearance: {clearance.VerticalClearance} feet</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Vehicle Restrictions</h3>
        {restrictions?.map(restriction => (
          <div key={restriction.RestrictionID}>
            <p>Route: {restriction.Route}</p>
            <p>Restriction: {restriction.RestrictionText}</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Border Crossings</h3>
        {crossings?.map(crossing => (
          <div key={crossing.CrossingID}>
            <p>Crossing: {crossing.CrossingName}</p>
            <p>Wait Time: {crossing.WaitTime} minutes</p>
          </div>
        ))}
      </section>
    </div>
  );
}
```

## 🔄 Data Update Frequencies

WS-Dottie optimizes caching strategies based on how frequently different data types are updated:

| Category | Update Frequency | Caching Strategy | Examples |
|-----------|------------------|-------------------|----------|
| **Real-time** | 5 seconds | `REALTIME` | Vessel locations, traffic alerts |
| **Frequent** | 5 minutes | `FREQUENT` | Terminal wait times, traffic flow |
| **Moderate** | 1 hour | `MODERATE` | Weather conditions, road status |
| **Static** | 1 day | `STATIC` | Schedules, fares, terminal info, vessel specs |

## 🔗 API Relationships

Many WS-Dottie APIs work together to provide comprehensive transportation solutions:

### Ferry + Traffic Integration
Combine ferry data with highway information for complete commute planning.

**Relevant APIs**: WSF Vessels, WSF Terminals, WSDOT Highway Alerts, WSDOT Travel Times

```javascript
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useTerminalWaitTimes } from 'ws-dottie/wsf-terminals';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';
import { useTravelTimes } from 'ws-dottie/wsdot-travel-times';

function CommutePlanner() {
  const { data: vessels } = useVesselLocations();
  const { data: waitTimes } = useTerminalWaitTimes();
  const { data: alerts } = useAlerts();
  const { data: travelTimes } = useTravelTimes();
  
  return (
    <div>
      <h2>Commute Planner</h2>
      
      <section>
        <h3>Ferry Information</h3>
        <p>Active Vessels: {vessels?.length || 0}</p>
        <p>Terminal Wait Times: {waitTimes?.length || 0} terminals</p>
      </section>
      
      <section>
        <h3>Traffic Conditions</h3>
        <p>Active Alerts: {alerts?.length || 0}</p>
        <p>Travel Times Available: {travelTimes?.length || 0} routes</p>
      </section>
    </div>
  );
}
```

### Weather + Traffic Integration
Correlate weather conditions with traffic incidents for weather-aware travel planning.

**Relevant APIs**: WSDOT Weather Information, WSDOT Mountain Pass Conditions, WSDOT Highway Alerts

```javascript
import { useWeatherInformation } from 'ws-dottie/wsdot-weather-information';
import { useMountainPassConditions } from 'ws-dottie/wsdot-mountain-pass-conditions';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';

function WeatherAwareTravelPlanner() {
  const { data: weather } = useWeatherInformation();
  const { data: passConditions } = useMountainPassConditions();
  const { data: alerts } = useAlerts();
  
  return (
    <div>
      <h2>Weather-Aware Travel Planner</h2>
      
      <section>
        <h3>Weather Conditions</h3>
        {weather?.map(station => (
          <div key={station.StationID}>
            <p>Station: {station.StationName}</p>
            <p>Temperature: {station.Temperature}°F</p>
            <p>Conditions: {station.RoadCondition}</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Mountain Pass Conditions</h3>
        {passConditions?.map(pass => (
          <div key={pass.PassConditionID}>
            <p>Pass: {pass.MountainPassName}</p>
            <p>Status: {pass.WeatherCondition}</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Weather-Related Alerts</h3>
        {alerts?.map(alert => (
          <div key={alert.AlertID}>
            <p>{alert.Headline}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
```

## 🎯 Choosing Right APIs

### For Different Application Types

#### Real-time Tracking Applications
- **Primary APIs**: Vessel Locations, Highway Alerts, Traffic Flow
- **Caching Strategy**: `REALTIME`
- **Update Frequency**: 5 seconds

```javascript
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';

function RealTimeTracker() {
  const { data: vessels } = useVesselLocations();
  const { data: alerts } = useAlerts();
  
  return (
    <div>
      <h2>Real-time Transportation</h2>
      <p>Active Vessels: {vessels?.length || 0}</p>
      <p>Active Alerts: {alerts?.length || 0}</p>
    </div>
  );
}
```

#### Trip Planning Applications
- **Primary APIs**: Schedules, Fares, Travel Times, Toll Rates
- **Caching Strategy**: `STATIC`
- **Update Frequency**: Daily

```javascript
import { useScheduleByTripDateAndRouteId } from 'ws-dottie/wsf-schedule';
import { useFareLineItemsByTripDateAndTerminals } from 'ws-dottie/wsf-fares';
import { useTravelTimes } from 'ws-dottie/wsdot-travel-times';
import { useTollRates } from 'ws-dottie/wsdot-toll-rates';

function TripPlanner() {
  const [trip, setTrip] = useState({
    departing: 3,
    arriving: 7,
    date: new Date()
  });
  
  const { data: schedules } = useScheduleByTripDateAndRouteId({
    params: {
      TripDate: trip.date.toISOString().split('T')[0],
      RouteID: trip.departing
    }
  });
  
  const { data: fares } = useFareLineItemsByTripDateAndTerminals({
    params: {
      TripDate: trip.date.toISOString().split('T')[0],
      DepartingTerminalID: trip.departing,
      ArrivingTerminalID: trip.arriving,
      RoundTrip: false
    }
  });
  
  const { data: travelTimes } = useTravelTimes();
  const { data: tollRates } = useTollRates();
  
  return (
    <div>
      <h2>Trip Planner</h2>
      {/* Render trip planning interface */}
    </div>
  );
}
```

#### Monitoring Applications
- **Primary APIs**: Weather Information, Mountain Pass Conditions, Highway Cameras
- **Caching Strategy**: `MODERATE`
- **Update Frequency**: 1 hour

```javascript
import { useWeatherInformation } from 'ws-dottie/wsdot-weather-information';
import { useMountainPassConditions } from 'ws-dottie/wsdot-mountain-pass-conditions';
import { useHighwayCameras } from 'ws-dottie/wsdot-highway-cameras';

function MonitoringDashboard() {
  const { data: weather } = useWeatherInformation();
  const { data: passConditions } = useMountainPassConditions();
  const { data: cameras } = useHighwayCameras();
  
  return (
    <div>
      <h2>Transportation Monitoring</h2>
      
      <section>
        <h3>Weather Conditions</h3>
        {weather?.map(station => (
          <div key={station.StationID}>
            <p>{station.StationName}: {station.Temperature}°F</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Mountain Pass Conditions</h3>
        {passConditions?.map(pass => (
          <div key={pass.PassConditionID}>
            <p>{pass.MountainPassName}: {pass.WeatherCondition}</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3>Highway Cameras</h3>
        {cameras?.map(camera => (
          <div key={camera.CameraID}>
            <p>{camera.CameraTitle}</p>
            <img src={camera.ImageURL} alt={camera.CameraTitle} />
          </div>
        ))}
      </section>
    </div>
  );
}
```

## 🔗 Detailed Documentation

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[OpenAPI Specifications (JSON)](../generated/openapi-json/)** - API specifications in JSON format
- **[OpenAPI Specifications (YAML)](../generated/openapi-yaml/)** - API specifications in YAML format
- **[HTML Documentation](../api-reference/)** - Interactive HTML documentation

## 📚 Next Steps

- **[Category Documentation](./categories/)** - Detailed information by use case
- **[Implementation Guides](./guides/)** - Platform-specific integration patterns
- **[Endpoints Reference](./endpoints.md)** - Complete endpoint reference table
