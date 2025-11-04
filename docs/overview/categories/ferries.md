# Ferry APIs

This guide covers all ferry-related APIs in WS-Dottie, providing comprehensive access to Washington State Ferries operations, schedules, and real-time data.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🚢 Overview

WS-Dottie provides access to four ferry APIs that cover all aspects of Washington State Ferries operations:

| API | Description | Key Features | Update Frequency |
|------|-------------|---------------|------------------|
| **WSF Vessels** | Real-time vessel locations, specifications, and history | Real-time (5s) |
| **WSF Terminals** | Terminal wait times, sailing space, and locations | Frequent (1-5m) |
| **WSF Schedule** | Ferry schedules, routes, and sailing times | Daily |
| **WSF Fares** | Fare information, pricing, and terminal combinations | Weekly |

## 🚢 WSF Vessels API

### Key Features
- **Real-time vessel tracking** with GPS coordinates and speed
- **Vessel specifications** including capacity and accommodations
- **Historical data** for performance analysis
- **Vessel statistics** for operational insights

### Common Use Cases

#### Real-time Vessel Tracking
```javascript
import { useVesselLocations } from 'ws-dottie';

function VesselMap() {
  const { data: vessels, isLoading } = useVesselLocations();
  
  return (
    <div>
      <h1>Washington State Ferries</h1>
      {isLoading && <div>Loading vessels...</div>}
      {vessels?.map(vessel => (
        <div key={vessel.VesselID}>
          <h3>{vessel.VesselName}</h3>
          <p>Location: {vessel.Latitude}, {vessel.Longitude}</p>
          <p>Speed: {vessel.Speed} knots</p>
          <p>Heading: {vessel.Heading}°</p>
        </div>
      ))}
    </div>
  );
}
```

#### Vessel Information Display
```javascript
import { useVesselBasics, useVesselAccommodations } from 'ws-dottie';

function VesselInfo() {
  const { data: vessels } = useVesselBasics();
  const { data: accommodations } = useVesselAccommodations();
  
  return (
    <div>
      <h1>Fleet Information</h1>
      {vessels?.map(vessel => {
        const vesselAccommodations = accommodations?.find(a => a.VesselID === vessel.VesselID);
        return (
          <div key={vessel.VesselID}>
            <h3>{vessel.VesselName}</h3>
            <p>Class: {vessel.VesselClass}</p>
            <p>Capacity: {vesselAccommodations?.PassengerCapacity} passengers</p>
            <p>Vehicle Space: {vesselAccommodations?.VehicleCapacity} vehicles</p>
          </div>
        );
      })}
    </div>
  );
}
```

## 🏗️ WSF Terminals API

### Key Features
- **Real-time wait times** for all ferry terminals
- **Sailing space availability** for current sailings
- **Terminal locations** and contact information
- **Terminal amenities** and services

### Common Use Cases

#### Terminal Wait Times Display
```javascript
import { useTerminalWaitTimes } from 'ws-dottie';

function TerminalWaitTimes() {
  const { data: terminals, isLoading } = useTerminalWaitTimes();
  
  return (
    <div>
      <h1>Terminal Wait Times</h1>
      {isLoading && <div>Loading wait times...</div>}
      {terminals?.map(terminal => (
        <div key={terminal.TerminalID}>
          <h3>{terminal.TerminalName}</h3>
          <p>Current Wait: {terminal.WaitTime} minutes</p>
          <p>Next Sailing: {terminal.NextDeparture}</p>
          <p>Space Available: {terminal.SailingSpace ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Terminal Information Display
```javascript
import { useTerminalBasics, useTerminalLocations } from 'ws-dottie';

function TerminalInfo() {
  const { data: terminals } = useTerminalBasics();
  const { data: locations } = useTerminalLocations();
  
  return (
    <div>
      <h1>Terminal Information</h1>
      {terminals?.map(terminal => {
        const location = locations?.find(l => l.TerminalID === terminal.TerminalID);
        return (
          <div key={terminal.TerminalID}>
            <h3>{terminal.TerminalName}</h3>
            <p>Address: {terminal.Address}</p>
            <p>Phone: {terminal.Phone}</p>
            {location && (
              <div>
                <p>Location: {location.Latitude}, {location.Longitude}</p>
                <p>Driving Directions: {terminal.DrivingDirections}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
```

## 📅 WSF Schedule API

### Key Features
- **Ferry schedules** with departure and arrival times
- **Route information** between terminal pairs
- **Seasonal schedules** and service adjustments
- **Real-time updates** for schedule changes

### Common Use Cases

#### Schedule Display
```javascript
import { useSchedules } from 'ws-dottie';

function FerrySchedule() {
  const { data: schedules, isLoading } = useSchedules({ 
    departingTerminalId: 3, 
    arrivingTerminalId: 7, 
    tripDate: new Date() 
  });
  
  return (
    <div>
      <h1>Seattle to Bainbridge Schedule</h1>
      {isLoading && <div>Loading schedule...</div>}
      {schedules?.Sailings?.map(sailing => (
        <div key={sailing.SailingID}>
          <h3>{sailing.DepartTime}</h3>
          <p>Arrives: {sailing.ArriveTime}</p>
          <p>Vessel: {sailing.VesselName}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Route Planning
```javascript
import { useRoutes, useTerminals } from 'ws-dottie';

function RoutePlanner() {
  const { data: routes } = useRoutes({ tripDate: new Date() });
  const { data: terminals } = useTerminals({ tripDate: new Date() });
  
  return (
    <div>
      <h1>Available Routes</h1>
      {routes?.map(route => (
        <div key={route.RouteID}>
          <h3>{route.RouteDescription}</h3>
          <p>From: {route.DepartingTerminalName}</p>
          <p>To: {route.ArrivingTerminalName}</p>
          <p>Duration: {route.CrossingTime} minutes</p>
        </div>
      ))}
    </div>
  );
}
```

## 💰 WSF Fares API

### Key Features
- **Fare calculation** for different passenger and vehicle types
- **Terminal combinations** with pricing information
- **Seasonal pricing** and special fare adjustments
- **Discount information** for eligible passengers

### Common Use Cases

#### Fare Calculator
```javascript
import { useFareLineItems } from 'ws-dottie';

function FareCalculator() {
  const [departingTerminal, setDepartingTerminal] = useState(3);
  const [arrivingTerminal, setArrivingTerminal] = useState(7);
  const [passengers, setPassengers] = useState(1);
  const [vehicles, setVehicles] = useState(0);
  
  const { data: fares } = useFareLineItems({
    tripDate: new Date(),
    departingTerminalId: departingTerminal,
    arrivingTerminalId: arrivingTerminal
  });
  
  // Calculate total fare based on passenger and vehicle count
  const totalFare = calculateTotalFare(fares, passengers, vehicles);
  
  return (
    <div>
      <h1>Fare Calculator</h1>
      <div>
        <label>From: 
          <select value={departingTerminal} onChange={e => setDepartingTerminal(Number(e.target.value))}>
            {/* Terminal options */}
          </select>
        </label>
        <label>To: 
          <select value={arrivingTerminal} onChange={e => setArrivingTerminal(Number(e.target.value))}>
            {/* Terminal options */}
          </select>
        </label>
        <label>Passengers: 
          <input type="number" value={passengers} onChange={e => setPassengers(Number(e.target.value))} />
        </label>
        <label>Vehicles: 
          <input type="number" value={vehicles} onChange={e => setVehicles(Number(e.target.value))} />
        </label>
      </div>
      <h2>Total Fare: ${totalFare}</h2>
    </div>
  );
}
```

## 🔗 API Relationships

Ferry APIs work together to provide comprehensive ferry information:

### Vessel + Terminal Integration
```javascript
import { useVesselLocations, useTerminalWaitTimes } from 'ws-dottie';

function FerryDashboard() {
  const { data: vessels } = useVesselLocations();
  const { data: waitTimes } = useTerminalWaitTimes();
  
  // Combine vessel locations with terminal wait times
  const vesselsWithWaitTimes = vessels?.map(vessel => {
    const terminalWaitTime = waitTimes?.find(t => t.TerminalID === vessel.DestinationTerminalID);
    return {
      ...vessel,
      destinationWaitTime: terminalWaitTime?.WaitTime || 0
    };
  });
  
  return (
    <div>
      <h1>Ferry Dashboard</h1>
      {vesselsWithWaitTimes?.map(vessel => (
        <div key={vessel.VesselID}>
          <h3>{vessel.VesselName}</h3>
          <p>ETA: {vessel.ETA}</p>
          <p>Terminal Wait: {vessel.destinationWaitTime} minutes</p>
        </div>
      ))}
    </div>
  );
}
```

### Schedule + Fare Integration
```javascript
import { useSchedules, useFares } from 'ws-dottie';

function TripPlanner() {
  const [route, setRoute] = useState({ departing: 3, arriving: 7 });
  const { data: schedules } = useSchedules({ 
    departingTerminalId: route.departing, 
    arrivingTerminalId: route.arriving, 
    tripDate: new Date() 
  });
  const { data: fares } = useFares({ 
    tripDate: new Date(), 
    departingTerminalId: route.departing, 
    arrivingTerminalId: route.arriving 
  });
  
  return (
    <div>
      <h1>Trip Planner</h1>
      {schedules?.Sailings?.map(sailing => {
        const fare = fares?.find(f => f.SailingID === sailing.SailingID);
        return (
          <div key={sailing.SailingID}>
            <h3>{sailing.DepartTime}</h3>
            <p>Arrives: {sailing.ArriveTime}</p>
            <p>Fare: ${fare?.Amount || 'N/A'}</p>
          </div>
        );
      })}
    </div>
  );
}
```

## 📊 Performance Considerations

### Caching Strategies
- **Vessel Locations**: `REALTIME_UPDATES` (5-second refresh)
- **Terminal Wait Times**: `MINUTE_UPDATES` (1-minute refresh)
- **Schedules**: `DAILY_UPDATES` (daily refresh)
- **Fares**: `WEEKLY_UPDATES` (weekly refresh)

### Optimization Tips
- **Vessel Tracking**: Use selective updates for vessels in view
- **Schedule Data**: Cache schedule data for specific routes
- **Fare Calculations**: Pre-calculate common fare combinations

## 🔗 Detailed Documentation

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[WSF Vessels HTML](../../../redoc/wsf-vessels.html)** - Interactive vessel documentation
- **[WSF Terminals HTML](../../../redoc/wsf-terminals.html)** - Interactive terminal documentation
- **[WSF Schedule HTML](../../../redoc/wsf-schedule.html)** - Interactive schedule documentation
- **[WSF Fares HTML](../../../redoc/wsf-fares.html)** - Interactive fare documentation

## 📚 Next Steps

- **[React Integration Guide](../guides/react-integration.md)** - React patterns with TanStack Query
- **[Node.js Integration Guide](../guides/nodejs-integration.md)** - Server-side usage patterns
- **[Caching Reference](../reference/caching.md)** - Performance optimization strategies
- **[Error Handling Reference](../reference/error-handling.md)** - Error recovery patterns
