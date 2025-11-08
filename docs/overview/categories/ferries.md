# Ferry APIs

This guide covers all ferry-related APIs in WS-Dottie, providing comprehensive access to Washington State Ferries operations, schedules, and real-time data.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🚢 Overview

WS-Dottie provides access to four ferry APIs that cover all aspects of Washington State Ferries operations:

| API | Description | Key Features | Update Frequency |
|------|-------------|---------------|------------------|
| **WSF Fares** | Fare information, pricing, and terminal combinations | Cost calculation, fare planning, price comparison | Weekly |
| **WSF Schedule** | Ferry schedules, routes, and sailing times | Trip planning, route information, time tables | Daily |
| **WSF Terminals** | Terminal wait times, sailing space, and locations | Wait monitoring, terminal capacity, location data | Frequent (1-5m) |
| **WSF Vessels** | Real-time vessel locations, specifications, and history | Real-time tracking, vessel details, historical data | Real-time (5s) |

## 💰 WSF Fares API

### API Overview
The WSF Fares API provides comprehensive fare information for ferry routes, including detailed pricing for different passenger types, vehicle categories, and route combinations.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **fare-line-items** | Detailed fare breakdowns by passenger and vehicle type | STATIC |
| **fare-totals** | Total fare calculations for common scenarios | STATIC |
| **terminals** | Terminal information specific to fare system | STATIC |
| **terminal-combo** | Valid terminal combinations for fare calculations | STATIC |
| **valid-date-range** | Valid date range for fare queries | WEEKLY |
| **cache-flush-date** | Timestamp of last fare data refresh | STATIC |

### Key Endpoints

#### Fare Line Items
- **getFareLineItemsByTripDateAndTerminals**: Returns detailed fare breakdown for a specific trip
  - **Input**: 
    - `TripDate` (date) - Date of travel
    - `DepartingTerminalID` (integer) - Origin terminal identifier
    - `ArrivingTerminalID` (integer) - Destination terminal identifier
    - `RoundTrip` (boolean) - Whether this is a round trip
  - **Output**: Array of fare line items
  - **Key Fields**:
    - `FareDescription`: Description of fare type
    - `PassengerType`: Passenger category (Adult, Senior, Youth, etc.)
    - `VehicleType`: Vehicle category (Standard, Oversize, etc.)
    - `FareAmount`: Cost for this fare component
    - `Currency`: Currency code (USD)

#### Fare Totals
- **getFareTotalsByTripDateAndTerminals**: Returns total fare for common scenarios
  - **Input**: Same parameters as fare line items
  - **Output**: Total fare information
  - **Key Fields**:
    - `PassengerFare`: Total passenger fare
    - `VehicleFare`: Total vehicle fare
    - `TotalFare`: Combined total fare
    - `Currency`: Currency code (USD)

### Common Use Cases

#### Fare Calculator
```javascript
import { useFareLineItemsByTripDateAndTerminals } from 'ws-dottie/wsf-fares';
import { useTerminals } from 'ws-dottie/wsf-schedule';

function FareCalculator() {
  const [tripDate, setTripDate] = useState(new Date());
  const [departingTerminal, setDepartingTerminal] = useState(3);
  const [arrivingTerminal, setArrivingTerminal] = useState(7);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [passengers, setPassengers] = useState({ adult: 1, senior: 0, youth: 0 });
  const [vehicleType, setVehicleType] = useState('standard');
  
  const { data: terminals } = useTerminals();
  const { data: fares, isLoading } = useFareLineItemsByTripDateAndTerminals({
    TripDate: tripDate,
    DepartingTerminalID: departingTerminal,
    ArrivingTerminalID: arrivingTerminal,
    RoundTrip: isRoundTrip
  });
  
  // Calculate total fare based on passenger and vehicle selection
  const calculateTotalFare = () => {
    if (!fares) return 0;
    
    let total = 0;
    
    // Add passenger fares
    total += (fares.find(f => f.PassengerType === 'Adult')?.FareAmount || 0) * passengers.adult;
    total += (fares.find(f => f.PassengerType === 'Senior')?.FareAmount || 0) * passengers.senior;
    total += (fares.find(f => f.PassengerType === 'Youth')?.FareAmount || 0) * passengers.youth;
    
    // Add vehicle fare
    const vehicleFare = fares.find(f => 
      f.VehicleType === vehicleType && f.FareDescription.includes('Vehicle')
    )?.FareAmount || 0;
    total += vehicleFare;
    
    // Double for round trip
    return isRoundTrip ? total * 2 : total;
  };
  
  const totalFare = calculateTotalFare();
  
  return (
    <div>
      <h1>Fare Calculator</h1>
      
      <div className="trip-form">
        <div className="form-row">
          <label>
            Date of Travel:
            <input 
              type="date" 
              value={tripDate.toISOString().split('T')[0]} 
              onChange={(e) => setTripDate(new Date(e.target.value))}
            />
          </label>
        </div>
        
        <div className="form-row">
          <label>
            From:
            <select 
              value={departingTerminal} 
              onChange={(e) => setDepartingTerminal(Number(e.target.value))}
            >
              {terminals?.map(terminal => (
                <option key={terminal.TerminalID} value={terminal.TerminalID}>
                  {terminal.TerminalName}
                </option>
              ))}
            </select>
          </label>
          
          <label>
            To:
            <select 
              value={arrivingTerminal} 
              onChange={(e) => setArrivingTerminal(Number(e.target.value))}
            >
              {terminals?.map(terminal => (
                <option key={terminal.TerminalID} value={terminal.TerminalID}>
                  {terminal.TerminalName}
                </option>
              ))}
            </select>
          </label>
        </div>
        
        <div className="form-row">
          <label>
            <input 
              type="checkbox" 
              checked={isRoundTrip} 
              onChange={(e) => setIsRoundTrip(e.target.checked)}
            />
            Round Trip
          </label>
        </div>
        
        <div className="form-row">
          <h3>Passengers</h3>
          <label>
            Adults:
            <input 
              type="number" 
              min="0" 
              value={passengers.adult} 
              onChange={(e) => setPassengers({...passengers, adult: Number(e.target.value)})}
            />
          </label>
          <label>
            Seniors:
            <input 
              type="number" 
              min="0" 
              value={passengers.senior} 
              onChange={(e) => setPassengers({...passengers, senior: Number(e.target.value)})}
            />
          </label>
          <label>
            Youth:
            <input 
              type="number" 
              min="0" 
              value={passengers.youth} 
              onChange={(e) => setPassengers({...passengers, youth: Number(e.target.value)})}
            />
          </label>
        </div>
        
        <div className="form-row">
          <label>
            Vehicle Type:
            <select 
              value={vehicleType} 
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="standard">Standard Vehicle</option>
              <option value="oversize">Oversize Vehicle</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </label>
        </div>
      </div>
      
      <div className="fare-result">
        <h2>Total Fare: ${totalFare.toFixed(2)}</h2>
        {isLoading && <div>Calculating fare...</div>}
      </div>
    </div>
  );
}
```

## 📅 WSF Schedule API

### API Overview
The WSF Schedule API provides comprehensive schedule information for ferry routes, including sailing times, route details, and service alerts.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **schedules** | Complete schedule information for all routes | DAILY |
| **routes** | Basic route information between terminal pairs | DAILY |
| **route-details** | Detailed route information with terminal details | DAILY |
| **sailings** | Individual sailing times and vessel assignments | FREQUENT |
| **terminals** | Terminal information specific to schedule system | DAILY |
| **terminal-mates** | Terminal pairings and route connections | DAILY |
| **schedule-alerts** | Service disruptions and schedule changes | FREQUENT |
| **service-disruptions** | Current service disruptions and alternative arrangements | FREQUENT |
| **active-seasons** | Schedule season dates and validity periods | WEEKLY |
| **time-adjustments** | Schedule adjustments and time changes | DAILY |
| **cache-flush-date** | Timestamp of last schedule data refresh | STATIC |
| **valid-date-range** | Valid date range for schedule queries | WEEKLY |

### Key Endpoints

#### Sailings
- **getSailingsBySchedRouteID**: Returns sailing times for a specific route
  - **Input**: `SchedRouteID` (integer) - Unique route identifier
  - **Output**: Array of sailing information
  - **Key Fields**:
    - `SailingID`: Unique sailing identifier
    - `DepartingTerminalID`: Origin terminal identifier
    - `ArrivingTerminalID`: Destination terminal identifier
    - `DepartTime`: Scheduled departure time
    - `ArriveTime`: Scheduled arrival time
    - `VesselID`: Assigned vessel identifier
    - `VesselName`: Human-readable vessel name

#### Routes
- **getRoutes**: Returns basic information for all ferry routes
  - **Input**: No parameters required
  - **Output**: Array of route information
  - **Key Fields**:
    - `RouteID`: Unique route identifier
    - `RouteDescription`: Human-readable route description
    - `DepartingTerminalID`: Origin terminal identifier
    - `DepartingTerminalName`: Origin terminal name
    - `ArrivingTerminalID`: Destination terminal identifier
    - `ArrivingTerminalName`: Destination terminal name
    - `CrossingTime`: Typical crossing time in minutes

### Common Use Cases

#### Schedule Display
```javascript
import { useSailingsBySchedRouteID, useRoutes } from 'ws-dottie/wsf-schedule';

function FerrySchedule() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const { data: routes } = useRoutes();
  const { data: sailings, isLoading } = useSailingsBySchedRouteID(
    selectedRoute ? { SchedRouteID: selectedRoute } : null
  );
  
  return (
    <div>
      <h1>Ferry Schedule</h1>
      
      <div className="route-selector">
        <h2>Select Route</h2>
        <select 
          value={selectedRoute || ''} 
          onChange={(e) => setSelectedRoute(Number(e.target.value))}
        >
          <option value="">Choose a route...</option>
          {routes?.map(route => (
            <option key={route.RouteID} value={route.RouteID}>
              {route.RouteDescription}
            </option>
          ))}
        </select>
      </div>
      
      {selectedRoute && (
        <div className="schedule-display">
          <h2>Schedule</h2>
          {isLoading ? (
            <div>Loading schedule...</div>
          ) : (
            <div className="sailings-list">
              {sailings?.map(sailing => (
                <div key={sailing.SailingID} className="sailing-item">
                  <div className="sailing-times">
                    <span className="depart-time">
                      Departs: {new Date(sailing.DepartTime).toLocaleTimeString()}
                    </span>
                    <span className="arrive-time">
                      Arrives: {new Date(sailing.ArriveTime).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="sailing-vessel">
                    Vessel: {sailing.VesselName}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

## 🏗️ WSF Terminals API

### API Overview
The WSF Terminals API provides comprehensive information about ferry terminals, including locations, amenities, wait times, and sailing space availability.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **terminal-basics** | Basic terminal information including names and identifiers | STATIC |
| **terminal-locations** | Geographic coordinates and address information for terminals | STATIC |
| **terminal-wait-times** | Current wait times for vehicles and passengers | FREQUENT |
| **terminal-sailing-space** | Real-time sailing space availability for current departures | FREQUENT |
| **terminal-bulletins** | Terminal alerts and service notifications | FREQUENT |
| **terminal-transports** | Public transportation connections to terminals | STATIC |
| **terminal-verbose** | Comprehensive terminal details combining all other data | STATIC |
| **cache-flush-date** | Timestamp of last data refresh for terminal information | STATIC |

### Key Endpoints

#### Terminal Wait Times
- **getTerminalWaitTimes**: Returns current wait times for all terminals
  - **Input**: No parameters required
  - **Output**: Array of terminal wait time information
  - **Key Fields**:
    - `TerminalID`: Unique terminal identifier
    - `TerminalName`: Human-readable terminal name
    - `VehicleWaitTime`: Current wait time for vehicles in minutes
    - `PassengerWaitTime`: Current wait time for passengers in minutes
    - `MaxVehicleWaitTime`: Maximum vehicle wait time today
    - `SailingSpaceAvailable`: Boolean indicating if space is available
    - `LastUpdated`: Timestamp of last wait time update

- **getTerminalWaitTimesByTerminalId**: Returns wait time information for a specific terminal
  - **Input**: `TerminalID` (integer) - Unique terminal identifier
  - **Output**: Single terminal wait time object with all fields above

#### Terminal Locations
- **getTerminalLocations**: Returns geographic information for all terminals
  - **Input**: No parameters required
  - **Output**: Array of terminal location information
  - **Key Fields**:
    - `TerminalID`: Unique terminal identifier
    - `TerminalName`: Human-readable terminal name
    - `Latitude`, `Longitude`: GPS coordinates
    - `Address`: Street address
    - `City`: City name
    - `State`: State abbreviation
    - `ZipCode`: Postal code
    - `DrivingDirections`: Text directions to terminal

### Common Use Cases

#### Terminal Wait Times Display
```javascript
import { useTerminalWaitTimes } from 'ws-dottie/wsf-terminals';

function TerminalWaitTimes() {
  const { data: terminals, isLoading, error } = useTerminalWaitTimes();
  
  if (isLoading) return <div>Loading wait times...</div>;
  if (error) return <div>Error loading terminal data: {error.message}</div>;
  
  // Sort terminals by wait time (longest first)
  const sortedTerminals = [...(terminals || [])].sort((a, b) => 
    (b.VehicleWaitTime || 0) - (a.VehicleWaitTime || 0)
  );
  
  return (
    <div>
      <h1>Terminal Wait Times</h1>
      <div className="terminal-grid">
        {sortedTerminals.map(terminal => (
          <div key={terminal.TerminalID} className="terminal-card">
            <h3>{terminal.TerminalName}</h3>
            <div className="wait-times">
              <div className="wait-time">
                <span className="label">Vehicles:</span>
                <span className={`time ${terminal.VehicleWaitTime > 30 ? 'long' : 'normal'}`}>
                  {terminal.VehicleWaitTime || 0} min
                </span>
              </div>
              <div className="wait-time">
                <span className="label">Passengers:</span>
                <span className={`time ${terminal.PassengerWaitTime > 15 ? 'long' : 'normal'}`}>
                  {terminal.PassengerWaitTime || 0} min
                </span>
              </div>
            </div>
            <div className="space-status">
              <span className={`status ${terminal.SailingSpaceAvailable ? 'available' : 'full'}`}>
                {terminal.SailingSpaceAvailable ? 'Space Available' : 'Full'}
              </span>
            </div>
            <div className="last-updated">
              Last updated: {new Date(terminal.LastUpdated).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### Terminal Information Display
```javascript
import { useTerminalBasics, useTerminalLocations } from 'ws-dottie/wsf-terminals';

function TerminalInfo() {
  const { data: terminals, isLoading: terminalsLoading } = useTerminalBasics();
  const { data: locations, isLoading: locationsLoading } = useTerminalLocations();
  
  if (terminalsLoading || locationsLoading) return <div>Loading terminal information...</div>;
  
  // Combine terminal basic info with locations
  const terminalsWithDetails = terminals?.map(terminal => {
    const location = locations?.find(l => l.TerminalID === terminal.TerminalID);
    return {
      ...terminal,
      ...location
    };
  }) || [];
  
  return (
    <div>
      <h1>Terminal Information</h1>
      <div className="terminal-list">
        {terminalsWithDetails.map(terminal => (
          <div key={terminal.TerminalID} className="terminal-detail-card">
            <h3>{terminal.TerminalName}</h3>
            <div className="terminal-address">
              <p>{terminal.Address}</p>
              <p>{terminal.City}, {terminal.State} {terminal.ZipCode}</p>
            </div>
            <div className="terminal-coords">
              <p>Location: {terminal.Latitude.toFixed(4)}, {terminal.Longitude.toFixed(4)}</p>
            </div>
            <div className="terminal-amenities">
              <p>Restrooms: {terminal.Restrooms ? 'Available' : 'Not Available'}</p>
              <p>Food Service: {terminal.FoodService ? 'Available' : 'Not Available'}</p>
              <p>Parking: {terminal.Parking ? 'Available' : 'Not Available'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🚢 WSF Vessels API

### API Overview
The WSF Vessels API provides comprehensive information about Washington State Ferries fleet, including real-time vessel tracking, specifications, accommodations, and historical data.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **vessel-locations** | Real-time vessel GPS positions, speed, heading, and ETA information | REALTIME |
| **vessel-basics** | Basic vessel information including names, classes, and identifiers | STATIC |
| **vessel-accommodations** | Passenger amenities and accessibility features for each vessel | STATIC |
| **vessel-histories** | Historical vessel position and status data | STATIC |
| **vessel-stats** | Performance statistics and operational metrics for vessels | STATIC |
| **vessel-verbose** | Comprehensive vessel details combining all other endpoint data | STATIC |
| **cache-flush-date** | Timestamp of last data refresh for vessel information | STATIC |

### Key Endpoints

#### Vessel Locations
- **getVesselLocations**: Returns real-time position data for all vessels in the fleet
  - **Input**: No parameters required
  - **Output**: Array of vessel locations with GPS coordinates, speed, heading, terminal assignments, and ETA
  - **Key Fields**: 
    - `VesselID`: Unique vessel identifier
    - `VesselName`: Human-readable vessel name
    - `Latitude`, `Longitude`: GPS coordinates
    - `Speed`: Current speed in knots
    - `Heading`: Direction in degrees (0-359)
    - `DepartingTerminalID/Name`: Origin terminal information
    - `ArrivingTerminalID/Name`: Destination terminal information
    - `Eta`: Estimated arrival time at destination
    - `AtDock`: Boolean indicating if vessel is currently docked

- **getVesselLocationsByVesselId**: Returns real-time position data for a specific vessel
  - **Input**: `VesselID` (integer) - Unique vessel identifier
  - **Output**: Single vessel location object with all fields above

#### Vessel Basics
- **getVesselBasics**: Returns basic information for all vessels
  - **Input**: No parameters required
  - **Output**: Array of vessel basic information
  - **Key Fields**:
    - `VesselID`: Unique vessel identifier
    - `VesselName`: Human-readable vessel name
    - `VesselClass`: Vessel class categorization
    - `YearBuilt`: Year vessel was constructed
    - `Length`: Vessel length in feet
    - `Tonage`: Vessel tonnage

#### Vessel Accommodations
- **getVesselAccommodations**: Returns amenity and accessibility information for all vessels
  - **Input**: No parameters required
  - **Output**: Array of vessel accommodation details
  - **Key Fields**:
    - `VesselID`: Unique vessel identifier
    - `PassengerCapacity`: Maximum passenger capacity
    - `VehicleCapacity`: Maximum vehicle capacity
    - `ADACompliant`: ADA accessibility compliance status
    - `FoodService`: Food service availability
    - `Restrooms`: Restroom facilities information

### Common Use Cases

#### Real-time Vessel Tracking
```javascript
import { useVesselLocations } from 'ws-dottie/wsf-vessels';

function VesselMap() {
  const { data: vessels, isLoading, error } = useVesselLocations();
  
  if (isLoading) return <div>Loading vessels...</div>;
  if (error) return <div>Error loading vessel data: {error.message}</div>;
  
  return (
    <div>
      <h1>Washington State Ferries</h1>
      <div className="vessel-count">
        Active Vessels: {vessels?.filter(v => v.InService).length || 0}
      </div>
      {vessels?.map(vessel => (
        <div key={vessel.VesselID} className="vessel-card">
          <h3>{vessel.VesselName}</h3>
          <div className="vessel-status">
            <span className={`status ${vessel.AtDock ? 'docked' : 'underway'}`}>
              {vessel.AtDock ? 'At Dock' : 'Underway'}
            </span>
            <span className="service-status">
              {vessel.InService ? 'In Service' : 'Out of Service'}
            </span>
          </div>
          <div className="vessel-location">
            <p>Position: {vessel.Latitude.toFixed(4)}, {vessel.Longitude.toFixed(4)}</p>
            <p>Speed: {vessel.Speed} knots</p>
            <p>Heading: {vessel.Heading}°</p>
          </div>
          <div className="vessel-route">
            <p>From: {vessel.DepartingTerminalName}</p>
            <p>To: {vessel.ArrivingTerminalName}</p>
            {vessel.Eta && (
              <p>ETA: {new Date(vessel.Eta).toLocaleTimeString()}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

#### Vessel Information Display
```javascript
import { useVesselBasics, useVesselAccommodations } from 'ws-dottie/wsf-vessels';

function VesselInfo() {
  const { data: vessels, isLoading: vesselsLoading } = useVesselBasics();
  const { data: accommodations, isLoading: accommodationsLoading } = useVesselAccommodations();
  
  if (vesselsLoading || accommodationsLoading) return <div>Loading vessel information...</div>;
  
  // Combine vessel basic info with accommodations
  const vesselsWithDetails = vessels?.map(vessel => {
    const vesselAccommodations = accommodations?.find(a => a.VesselID === vessel.VesselID);
    return {
      ...vessel,
      ...vesselAccommodations
    };
  }) || [];
  
  return (
    <div>
      <h1>Fleet Information</h1>
      <div className="vessel-grid">
        {vesselsWithDetails.map(vessel => (
          <div key={vessel.VesselID} className="vessel-detail-card">
            <h3>{vessel.VesselName}</h3>
            <div className="vessel-specs">
              <p>Class: {vessel.VesselClass}</p>
              <p>Year Built: {vessel.YearBuilt}</p>
              <p>Length: {vessel.Length} feet</p>
              <p>Tonnage: {vessel.Tonage}</p>
            </div>
            <div className="vessel-capacities">
              <p>Passengers: {vessel.PassengerCapacity}</p>
              <p>Vehicles: {vessel.VehicleCapacity}</p>
            </div>
            <div className="vessel-features">
              <p>ADA Compliant: {vessel.ADACompliant ? 'Yes' : 'No'}</p>
              <p>Food Service: {vessel.FoodService ? 'Available' : 'Not Available'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🔗 API Relationships

Ferry APIs work together to provide comprehensive ferry information:

### Vessel + Terminal Integration
```javascript
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useTerminalWaitTimes } from 'ws-dottie/wsf-terminals';

function FerryDashboard() {
  const { data: vessels } = useVesselLocations();
  const { data: waitTimes } = useTerminalWaitTimes();
  
  // Combine vessel locations with terminal wait times
  const vesselsWithWaitTimes = vessels?.map(vessel => {
    const terminalWaitTime = waitTimes?.find(t => t.TerminalID === vessel.ArrivingTerminalID);
    return {
      ...vessel,
      destinationWaitTime: terminalWaitTime?.VehicleWaitTime || 0
    };
  }) || [];
  
  return (
    <div>
      <h1>Ferry Dashboard</h1>
      <div className="vessel-status-grid">
        {vesselsWithWaitTimes.map(vessel => (
          <div key={vessel.VesselID} className="vessel-status-card">
            <h3>{vessel.VesselName}</h3>
            <div className="vessel-position">
              <p>Position: {vessel.Latitude.toFixed(4)}, {vessel.Longitude.toFixed(4)}</p>
              <p>Speed: {vessel.Speed} knots</p>
              <p>Heading: {vessel.Heading}°</p>
            </div>
            <div className="vessel-route">
              <p>From: {vessel.DepartingTerminalName}</p>
              <p>To: {vessel.ArrivingTerminalName}</p>
              {vessel.Eta && (
                <p>ETA: {new Date(vessel.Eta).toLocaleTimeString()}</p>
              )}
            </div>
            <div className="terminal-wait">
              <p>Terminal Wait: {vessel.destinationWaitTime} minutes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Schedule + Fare Integration
```javascript
import { useSailingsBySchedRouteID, useRoutes } from 'ws-dottie/wsf-schedule';
import { useFareLineItemsByTripDateAndTerminals } from 'ws-dottie/wsf-fares';

function TripPlanner() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [tripDate, setTripDate] = useState(new Date());
  const [passengers, setPassengers] = useState({ adult: 1, senior: 0 });
  
  // Get route information
  const { data: routes } = useRoutes();
  const selectedRouteInfo = routes?.find(r => r.RouteID === selectedRoute);
  
  // Get sailings for selected route
  const { data: sailings } = useSailingsBySchedRouteID(
    selectedRoute ? { SchedRouteID: selectedRoute } : null
  );
  
  // Get fare information for selected route
  const { data: fares } = useFareLineItemsByTripDateAndTerminals(
    selectedRouteInfo ? {
      TripDate: tripDate,
      DepartingTerminalID: selectedRouteInfo.DepartingTerminalID,
      ArrivingTerminalID: selectedRouteInfo.ArrivingTerminalID,
      RoundTrip: false
    } : null
  );
  
  // Calculate fare for selected passenger count
  const calculateFare = () => {
    if (!fares) return 0;
    
    const adultFare = fares.find(f => f.PassengerType === 'Adult')?.FareAmount || 0;
    const seniorFare = fares.find(f => f.PassengerType === 'Senior')?.FareAmount || 0;
    
    return (adultFare * passengers.adult) + (seniorFare * passengers.senior);
  };
  
  return (
    <div>
      <h1>Trip Planner</h1>
      
      <div className="trip-planner">
        <div className="route-selection">
          <h2>Select Route</h2>
          <select 
            value={selectedRoute || ''} 
            onChange={(e) => setSelectedRoute(Number(e.target.value))}
          >
            <option value="">Choose a route...</option>
            {routes?.map(route => (
              <option key={route.RouteID} value={route.RouteID}>
                {route.RouteDescription}
              </option>
            ))}
          </select>
        </div>
        
        <div className="trip-details">
          <div className="date-selection">
            <label>
              Date:
              <input 
                type="date" 
                value={tripDate.toISOString().split('T')[0]} 
                onChange={(e) => setTripDate(new Date(e.target.value))}
              />
            </label>
          </div>
          
          <div className="passenger-selection">
            <h3>Passengers</h3>
            <label>
              Adults:
              <input 
                type="number" 
                min="0" 
                value={passengers.adult} 
                onChange={(e) => setPassengers({...passengers, adult: Number(e.target.value)})}
              />
            </label>
            <label>
              Seniors:
              <input 
                type="number" 
                min="0" 
                value={passengers.senior} 
                onChange={(e) => setPassengers({...passengers, senior: Number(e.target.value)})}
              />
            </label>
          </div>
        </div>
        
        {selectedRouteInfo && (
          <div className="route-info">
            <h2>Route Information</h2>
            <p>From: {selectedRouteInfo.DepartingTerminalName}</p>
            <p>To: {selectedRouteInfo.ArrivingTerminalName}</p>
            <p>Crossing Time: {selectedRouteInfo.CrossingTime} minutes</p>
            <p>Fare: ${calculateFare().toFixed(2)}</p>
          </div>
        )}
        
        {sailings && (
          <div className="schedule-display">
            <h2>Available Sailings</h2>
            <div className="sailings-list">
              {sailings.map(sailing => (
                <div key={sailing.SailingID} className="sailing-option">
                  <div className="sailing-times">
                    <span>Departs: {new Date(sailing.DepartTime).toLocaleTimeString()}</span>
                    <span>Arrives: {new Date(sailing.ArriveTime).toLocaleTimeString()}</span>
                  </div>
                  <div className="sailing-vessel">
                    Vessel: {sailing.VesselName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

## 📊 Performance Considerations

### Caching Strategies
- **Vessel Locations**: `REALTIME_UPDATES` (5-second refresh)
- **Terminal Wait Times**: `MINUTE_UPDATES` (1-5 minute refresh)
- **Schedules**: `DAILY_UPDATES` (daily refresh)
- **Fares**: `WEEKLY_UPDATES` (weekly refresh)
- **Vessel/Terminal Information**: `STATIC_UPDATES` (weekly refresh)

### Optimization Tips
- **Vessel Tracking**: Use selective updates for vessels in view
- **Schedule Data**: Cache schedule data for specific routes
- **Fare Calculations**: Pre-calculate common fare combinations
- **Terminal Information**: Store terminal details locally to reduce API calls

## 🔗 Detailed Documentation

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[WSF Fares HTML](../../../redoc/wsf-fares.html)** - Interactive fare documentation
- **[WSF Schedule HTML](../../../redoc/wsf-schedule.html)** - Interactive schedule documentation
- **[WSF Terminals HTML](../../../redoc/wsf-terminals.html)** - Interactive terminal documentation
- **[WSF Vessels HTML](../../../redoc/wsf-vessels.html)** - Interactive vessel documentation

## 📚 Next Steps

- **[React Integration Guide](../guides/react-integration.md)** - React patterns with TanStack Query
- **[Node.js Integration Guide](../guides/nodejs-integration.md)** - Server-side usage patterns
- **[Caching Reference](../reference/caching.md)** - Performance optimization strategies
- **[Error Handling Reference](../reference/error-handling.md)** - Error recovery patterns
