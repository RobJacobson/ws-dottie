# Infrastructure APIs

This guide covers all infrastructure-related APIs in WS-Dottie, providing comprehensive access to Washington State transportation infrastructure information.

> **📚 Documentation Navigation**: [../../README.md](../../README.md) • [Getting Started](../../getting-started/getting-started.md) • [API Guide](../api-guide.md)

## 🏗️ Overview

WS-Dottie provides access to three infrastructure APIs that cover physical transportation infrastructure throughout Washington State:

| API | Description | Key Features | Update Frequency |
|------|-------------|---------------|------------------|
| **WSDOT Border Crossings** | Wait times and conditions at border crossings | Border planning, wait time monitoring, crossing status | Frequent (5-15m) |
| **WSDOT Bridge Clearances** | Height restrictions for bridges and overpasses | Clearance data, route planning for tall vehicles | Daily |
| **WSDOT Commercial Vehicle Restrictions** | Weight limits and vehicle restrictions | Truck routing, restriction information, compliance data | Weekly |

## 🛃 WSDOT Border Crossings API

### API Overview
The WSDOT Border Crossings API provides real-time information about border crossing wait times and conditions at Washington State crossings into Canada, including lane status and crossing type information.

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
  
  // Find optimal crossing for each type
  const findOptimalCrossing = (crossings) => {
    return crossings?.reduce((best, current) => 
      (best.WaitTime < current.WaitTime) ? best : current
    , crossings[0]);
  };
  
  const optimalPassenger = findOptimalCrossing(passengerCrossings);
  const optimalCommercial = findOptimalCrossing(commercialCrossings);
  const optimalNexus = findOptimalCrossing(nexusCrossings);
  
  return (
    <div>
      <h1>Washington Border Crossings</h1>
      {isLoading && <div>Loading border crossing data...</div>}
      {error && <div>Error loading border crossing data: {error.message}</div>}
      
      <div className="crossing-summary">
        <div className="crossing-type">
          <h2>Passenger Crossings</h2>
          <p>Optimal: {optimalPassenger?.CrossingName} ({optimalPassenger?.WaitTime} min)</p>
        </div>
        <div className="crossing-type">
          <h2>Commercial Crossings</h2>
          <p>Optimal: {optimalCommercial?.CrossingName} ({optimalCommercial?.WaitTime} min)</p>
        </div>
        <div className="crossing-type">
          <h2>NEXUS Crossings</h2>
          <p>Optimal: {optimalNexus?.CrossingName} ({optimalNexus?.WaitTime} min)</p>
        </div>
      </div>
      
      <div className="crossing-sections">
        <div className="crossing-section">
          <h2>Passenger Crossings</h2>
          {passengerCrossings?.map(crossing => (
            <div key={crossing.BorderCrossingID} className={`crossing-item ${crossing === optimalPassenger ? 'optimal' : ''}`}>
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
            <div key={crossing.BorderCrossingID} className={`crossing-item ${crossing === optimalCommercial ? 'optimal' : ''}`}>
              <h3>{crossing.CrossingName}</h3>
              <p>Direction: {crossing.Direction}</p>
              <p>Current Wait: {crossing.WaitTime} minutes</p>
              <p>Lanes Open: {crossing.LanesOpen}/{crossing.LanesTotal}</p>
              <p>Last Updated: {new Date(crossing.LastUpdated).toLocaleString()}</p>
            </div>
          ))}
        </div>
        
        <div className="crossing-section">
          <h2>NEXUS Crossings</h2>
          {nexusCrossings?.map(crossing => (
            <div key={crossing.BorderCrossingID} className={`crossing-item ${crossing === optimalNexus ? 'optimal' : ''}`}>
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

#### Border Crossing Route Planner
```javascript
import { useBorderCrossings } from 'ws-dottie/wsdot-border-crossings';

function BorderCrossingRoutePlanner() {
  const { data: crossings, isLoading, error } = useBorderCrossings();
  const [selectedCrossing, setSelectedCrossing] = useState(null);
  const [vehicleType, setVehicleType] = useState('Passenger');
  
  // Filter crossings by vehicle type
  const filteredCrossings = crossings?.filter(c => c.CrossingType === vehicleType) || [];
  
  // Find optimal crossing based on wait times
  const optimalCrossing = filteredCrossings?.reduce((best, current) => 
    (best.WaitTime < current.WaitTime) ? best : current
  , filteredCrossings[0]);
  
  // Calculate estimated crossing time including wait
  const calculateTotalTime = (crossing, baseTime = 30) => {
    return baseTime + crossing.WaitTime;
  };
  
  return (
    <div>
      <h1>Border Crossing Route Planner</h1>
      {isLoading && <div>Loading border crossing data...</div>}
      {error && <div>Error loading border crossing data: {error.message}</div>}
      
      <div className="crossing-controls">
        <div>
          <label>Vehicle Type: 
            <select 
              value={vehicleType} 
              onChange={e => setVehicleType(e.target.value)}
            >
              <option value="Passenger">Passenger</option>
              <option value="Commercial">Commercial</option>
              <option value="NEXUS">NEXUS</option>
            </select>
          </label>
        </div>
      </div>
      
      <div className="crossing-recommendation">
        <h2>Recommended Crossing</h2>
        {optimalCrossing && (
          <div className="optimal-crossing">
            <h3>{optimalCrossing.CrossingName}</h3>
            <p>Direction: {optimalCrossing.Direction}</p>
            <p>Current Wait: {optimalCrossing.WaitTime} minutes</p>
            <p>Lanes Open: {optimalCrossing.LanesOpen}/{optimalCrossing.LanesTotal}</p>
            <p>Estimated Total Time: {calculateTotalTime(optimalCrossing)} minutes</p>
          </div>
        )}
      </div>
      
      <div className="crossing-list">
        <h2>All Crossings</h2>
        {filteredCrossings?.map(crossing => (
          <div 
            key={crossing.BorderCrossingID} 
            className={`crossing-option ${selectedCrossing?.BorderCrossingID === crossing.BorderCrossingID ? 'selected' : ''}`}
            onClick={() => setSelectedCrossing(crossing)}
          >
            <h3>{crossing.CrossingName}</h3>
            <p>Direction: {crossing.Direction}</p>
            <p>Current Wait: {crossing.WaitTime} minutes</p>
            <p>Lanes Open: {crossing.LanesOpen}/{crossing.LanesTotal}</p>
            <p>Estimated Total Time: {calculateTotalTime(crossing)} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🌉 WSDOT Bridge Clearances API

### API Overview
The WSDOT Bridge Clearances API provides comprehensive information about bridge height restrictions throughout Washington State, including vertical clearance measurements, location data, and route information.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **bridge-clearances** | Vertical clearance measurements for all state bridges | STATIC |

### Key Endpoints

#### Bridge Clearances
- **getBridgeClearances**: Returns clearance data for all bridges in Washington State
  - **Input**: No parameters required
  - **Output**: Array of bridge clearance information
  - **Key Fields**:
    - `BridgeDataGISID`: Unique bridge identifier
    - `StructureName`: Human-readable bridge name
    - `Route`: State route number (e.g., "005" for I-5)
    - `Landmark`: Location description or landmark
    - `Latitude`, `Longitude`: GPS coordinates
    - `VerticalClearance`: Maximum clearance height in feet
    - `LocationDescription`: Detailed location description
    - `StructureType`: Bridge or overpass type

- **getBridgeClearancesByRoute**: Returns clearance data for bridges on a specific route
  - **Input**: `Route` (string) - State route number (e.g., "005" for I-5)
  - **Output**: Array of bridge clearance information for specified route
  - **Key Fields**: Same as getBridgeClearances, filtered by route

### Common Use Cases

#### Route Planning for Tall Vehicles
```javascript
import { useBridgeClearances } from 'ws-dottie/wsdot-bridge-clearances';

function TallVehicleRoutePlanner() {
  const [vehicleHeight, setVehicleHeight] = useState(12); // feet
  const [selectedRoute, setSelectedRoute] = useState('005'); // I-5
  const { data: clearances, isLoading, error } = useBridgeClearances();
  
  // Filter clearances for selected route
  const routeClearances = clearances?.filter(clearance => 
    clearance.Route === selectedRoute
  ) || [];
  
  // Check if vehicle can safely traverse route
  const canTraverseRoute = (clearances, height) => {
    return clearances?.every(clearance => clearance.VerticalClearance > height);
  };
  
  const routeSafe = canTraverseRoute(routeClearances, vehicleHeight);
  
  // Find problematic bridges if any
  const problemBridges = routeClearances?.filter(clearance => 
    clearance.VerticalClearance <= vehicleHeight
  ) || [];
  
  return (
    <div>
      <h1>Bridge Clearance Route Planner</h1>
      {isLoading && <div>Loading bridge data...</div>}
      {error && <div>Error loading bridge data: {error.message}</div>}
      
      <div className="vehicle-input">
        <label>Vehicle Height (feet): 
          <input 
            type="number" 
            value={vehicleHeight} 
            onChange={e => setVehicleHeight(Number(e.target.value))} 
          />
        </label>
      </div>
      
      <div className="route-selection">
        <label>Route: 
          <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)}>
            <option value="005">I-5</option>
            <option value="090">I-90</option>
            <option value="405">I-405</option>
            <option value="005">SR-5</option>
          </select>
        </label>
      </div>
      
      <div className="route-status">
        <h2>Route {selectedRoute} Status</h2>
        <p>Vehicle Height: {vehicleHeight} feet</p>
        <p>Route {routeSafe ? 'Safe' : 'Not Safe'} for this vehicle</p>
        
        {problemBridges.length > 0 && (
          <div className="problem-bridges">
            <h3>Problematic Bridges:</h3>
            {problemBridges.map(bridge => (
              <div key={bridge.BridgeDataGISID} className="bridge-issue">
                <h4>{bridge.StructureName}</h4>
                <p>Location: {bridge.Landmark}</p>
                <p>Clearance: {bridge.VerticalClearance} feet</p>
                <p>Issue: {vehicleHeight - bridge.VerticalClearance} feet too tall</p>
              </div>
            ))}
          </div>
        )}
        
        {routeClearances?.map(clearance => (
          <div key={clearance.BridgeDataGISID} className="clearance-item">
            <h3>{clearance.StructureName}</h3>
            <p>Location: {clearance.Landmark}</p>
            <p>Vertical Clearance: {clearance.VerticalClearance} feet</p>
            <p>Status: {clearance.VerticalClearance > vehicleHeight ? '✅ Safe' : '⚠️ Too Low'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### Bridge Clearance Map
```javascript
import { useBridgeClearances } from 'ws-dottie/wsdot-bridge-clearances';

function BridgeClearanceMap() {
  const { data: clearances, isLoading, error } = useBridgeClearances();
  
  // Process data for map visualization
  const bridgeData = clearances?.map(clearance => ({
    id: clearance.BridgeDataGISID,
    name: clearance.StructureName,
    location: [clearance.Latitude, clearance.Longitude],
    clearance: clearance.VerticalClearance,
    route: clearance.Route
  })) || [];
  
  // Group bridges by clearance height for visualization
  const clearanceGroups = bridgeData.reduce((acc, bridge) => {
    const height = bridge.clearance;
    if (height < 14) acc.low = [...(acc.low || []), bridge];
    else if (height < 16) acc.medium = [...(acc.medium || []), bridge];
    else acc.high = [...(acc.high || []), bridge];
    return acc;
  }, {});
  
  return (
    <div>
      <h1>Washington Bridge Clearances</h1>
      {isLoading && <div>Loading bridge data...</div>}
      {error && <div>Error loading bridge data: {error.message}</div>}
      
      <div className="clearance-summary">
        <div className="clearance-group">
          <h3>Low Clearance (&lt; 14ft)</h3>
          <p>{clearanceGroups.low?.length || 0} bridges</p>
        </div>
        <div className="clearance-group">
          <h3>Medium Clearance (14-16ft)</h3>
          <p>{clearanceGroups.medium?.length || 0} bridges</p>
        </div>
        <div className="clearance-group">
          <h3>High Clearance (&gt; 16ft)</h3>
          <p>{clearanceGroups.high?.length || 0} bridges</p>
        </div>
      </div>
      
      <div className="bridge-map">
        {/* Render map with bridge clearance indicators */}
        {bridgeData.map(bridge => (
          <div key={bridge.id} className="bridge-marker">
            <h3>{bridge.name}</h3>
            <p>Route: {bridge.route}</p>
            <p>Clearance: {bridge.clearance} feet</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🚚 WSDOT Commercial Vehicle Restrictions API

### API Overview
The WSDOT Commercial Vehicle Restrictions API provides comprehensive information about weight limits, vehicle restrictions, and regulatory requirements for commercial vehicles throughout Washington State.

### Endpoint Groups

| Endpoint Group | Description | Cache Strategy |
|----------------|-------------|----------------|
| **cv-restriction-data** | Weight limits and vehicle restrictions for state highways | STATIC |
| **cv-restriction-data-with-id** | Specific restriction data by restriction ID | STATIC |

### Key Endpoints

#### Commercial Vehicle Restrictions
- **getCommercialVehicleRestrictions**: Returns all commercial vehicle restrictions in Washington State
  - **Input**: No parameters required
  - **Output**: Array of commercial vehicle restriction information
  - **Key Fields**:
    - `CommercialVehicleRestrictionID`: Unique restriction identifier
    - `LocationDescription`: Description of restriction location
    - `RouteName`: Highway or route name
    - `StateRoute`: State route number
    - `MaxWeight`: Maximum weight limit in pounds
    - `RestrictedVehicleTypes`: Array of restricted vehicle types
    - `RestrictionReason`: Explanation of restriction
    - `StartDate`, `EndDate`: Validity dates for restriction
    - `Latitude`, `Longitude`: GPS coordinates

- **getCommercialVehicleRestrictionsById**: Returns specific restriction by ID
  - **Input**: `CommercialVehicleRestrictionID` (integer) - Unique restriction identifier
  - **Output**: Single commercial vehicle restriction object with all fields above

### Common Use Cases

#### Commercial Vehicle Route Planner
```javascript
import { useCommercialVehicleRestrictions } from 'ws-dottie/wsdot-commercial-vehicle-restrictions';

function CommercialVehicleRoutePlanner() {
  const [vehicleWeight, setVehicleWeight] = useState(80000); // pounds
  const [vehicleType, setVehicleType] = useState('TRUCK');
  const [selectedRoute, setSelectedRoute] = useState('I-5');
  const { data: restrictions, isLoading, error } = useCommercialVehicleRestrictions();
  
  // Filter restrictions for selected route
  const routeRestrictions = restrictions?.filter(r => 
    r.RouteName.includes(selectedRoute) || r.StateRoute.includes(selectedRoute.replace('I-', ''))
  ) || [];
  
  // Check if vehicle can traverse route
  const canTraverseRoute = (restrictions, weight, type) => {
    return routeRestrictions?.every(restriction => {
      const weightOk = !restriction.MaxWeight || weight <= restriction.MaxWeight;
      const typeOk = !restriction.RestrictedVehicleTypes || 
        !restriction.RestrictedVehicleTypes.includes(type);
      return weightOk && typeOk;
    });
  };
  
  const routeSafe = canTraverseRoute(routeRestrictions, vehicleWeight, vehicleType);
  
  // Find problematic restrictions if any
  const problemRestrictions = routeRestrictions?.filter(restriction => {
    const weightIssue = restriction.MaxWeight && vehicleWeight > restriction.MaxWeight;
    const typeIssue = restriction.RestrictedVehicleTypes && 
      restriction.RestrictedVehicleTypes.includes(vehicleType);
    return weightIssue || typeIssue;
  }) || [];
  
  return (
    <div>
      <h1>Commercial Vehicle Route Planner</h1>
      {isLoading && <div>Loading restriction data...</div>}
      {error && <div>Error loading restriction data: {error.message}</div>}
      
      <div className="vehicle-input">
        <div>
          <label>Vehicle Weight (lbs): 
            <input 
              type="number" 
              value={vehicleWeight} 
              onChange={e => setVehicleWeight(Number(e.target.value))} 
            />
          </label>
        </div>
        
        <div>
          <label>Vehicle Type: 
            <select value={vehicleType} onChange={e => setVehicleType(e.target.value)}>
              <option value="TRUCK">Truck</option>
              <option value="BUS">Bus</option>
              <option value="COMBINATION">Combination Vehicle</option>
            </select>
          </label>
        </div>
        
        <div>
          <label>Route: 
            <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)}>
              <option value="I-5">I-5</option>
              <option value="I-90">I-90</option>
              <option value="I-405">I-405</option>
              <option value="SR-5">SR-5</option>
            </select>
          </label>
        </div>
      </div>
      
      <div className="route-status">
        <h2>Route {selectedRoute} Status</h2>
        <p>Vehicle Weight: {vehicleWeight.toLocaleString()} lbs</p>
        <p>Vehicle Type: {vehicleType}</p>
        <p>Route {routeSafe ? 'Safe' : 'Not Safe'} for this vehicle</p>
        
        {problemRestrictions.length > 0 && (
          <div className="problem-restrictions">
            <h3>Restriction Issues:</h3>
            {problemRestrictions.map(restriction => (
              <div key={restriction.CommercialVehicleRestrictionID} className="restriction-issue">
                <h4>{restriction.LocationDescription}</h4>
                <p>Route: {restriction.RouteName}</p>
                {restriction.MaxWeight && (
                  <p>Weight Limit: {restriction.MaxWeight.toLocaleString()} lbs (exceeded by {(vehicleWeight - restriction.MaxWeight).toLocaleString()} lbs)</p>
                )}
                {restriction.RestrictedVehicleTypes && (
                  <p>Vehicle Type Restriction: {vehicleType} not allowed</p>
                )}
                <p>Reason: {restriction.RestrictionReason}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

#### Vehicle Compliance Checker
```javascript
import { useCommercialVehicleRestrictions } from 'ws-dottie/wsdot-commercial-vehicle-restrictions';

function VehicleComplianceChecker() {
  const [vehicleSpecs, setVehicleSpecs] = useState({
    weight: 80000,
    type: 'TRUCK',
    height: 13.5,
    width: 8.5,
    length: 65
  });
  
  const { data: restrictions, isLoading, error } = useCommercialVehicleRestrictions();
  
  // Check compliance across all restrictions
  const complianceIssues = restrictions?.map(restriction => {
    const issues = [];
    
    if (restriction.MaxWeight && vehicleSpecs.weight > restriction.MaxWeight) {
      issues.push(`Weight exceeds limit by ${vehicleSpecs.weight - restriction.MaxWeight} lbs`);
    }
    
    if (restriction.RestrictedVehicleTypes && 
        restriction.RestrictedVehicleTypes.includes(vehicleSpecs.type)) {
      issues.push(`Vehicle type ${vehicleSpecs.type} not allowed`);
    }
    
    return {
      ...restriction,
      issues,
      isCompliant: issues.length === 0
    };
  }).filter(r => !r.isCompliant) || [];
  
  return (
    <div>
      <h1>Vehicle Compliance Checker</h1>
      {isLoading && <div>Loading restriction data...</div>}
      {error && <div>Error loading restriction data: {error.message}</div>}
      
      <div className="vehicle-specs">
        <h2>Vehicle Specifications</h2>
        <div className="spec-inputs">
          <div>
            <label>Weight (lbs): 
              <input 
                type="number" 
                value={vehicleSpecs.weight} 
                onChange={e => setVehicleSpecs({...vehicleSpecs, weight: Number(e.target.value)})}
              />
            </label>
          </div>
          
          <div>
            <label>Vehicle Type: 
              <select 
                value={vehicleSpecs.type} 
                onChange={e => setVehicleSpecs({...vehicleSpecs, type: e.target.value})}
              >
                <option value="TRUCK">Truck</option>
                <option value="BUS">Bus</option>
                <option value="COMBINATION">Combination Vehicle</option>
              </select>
            </label>
          </div>
          
          <div>
            <label>Height (ft): 
              <input 
                type="number" 
                value={vehicleSpecs.height} 
                onChange={e => setVehicleSpecs({...vehicleSpecs, height: Number(e.target.value)})}
              />
            </label>
          </div>
          
          <div>
            <label>Width (ft): 
              <input 
                type="number" 
                value={vehicleSpecs.width} 
                onChange={e => setVehicleSpecs({...vehicleSpecs, width: Number(e.target.value)})}
              />
            </label>
          </div>
          
          <div>
            <label>Length (ft): 
              <input 
                type="number" 
                value={vehicleSpecs.length} 
                onChange={e => setVehicleSpecs({...vehicleSpecs, length: Number(e.target.value)})}
              />
            </label>
          </div>
        </div>
      </div>
      
      <div className="compliance-results">
        <h2>Compliance Issues ({complianceIssues.length || 0})</h2>
        {complianceIssues.map(issue => (
          <div key={issue.CommercialVehicleRestrictionID} className="compliance-issue">
            <h3>{issue.LocationDescription}</h3>
            <p>Route: {issue.RouteName}</p>
            <ul>
              {issue.issues.map((problem, index) => (
                <li key={index}>{problem}</li>
              ))}
            </ul>
          </div>
        ))}
        
        {complianceIssues.length === 0 && (
          <div className="compliant">
            <p>✅ Vehicle is compliant with all restrictions</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

## 🔗 API Relationships

Infrastructure APIs work together to provide comprehensive transportation infrastructure information:

### Bridge Clearances + Commercial Vehicle Restrictions Integration
```javascript
import { useBridgeClearances } from 'ws-dottie/wsdot-bridge-clearances';
import { useCommercialVehicleRestrictions } from 'ws-dottie/wsdot-commercial-vehicle-restrictions';

function ComprehensiveRoutePlanner() {
  const { data: clearances } = useBridgeClearances();
  const { data: restrictions } = useCommercialVehicleRestrictions();
  const [vehicleSpecs, setVehicleSpecs] = useState({
    weight: 80000,
    height: 13.5,
    type: 'TRUCK'
  });
  
  // Check route compatibility with both clearances and restrictions
  const checkRouteCompatibility = (route) => {
    const routeClearances = clearances?.filter(c => c.Route === route);
    const routeRestrictions = restrictions?.filter(r => 
      r.RouteName.includes(route) || r.StateRoute.includes(route.replace('I-', ''))
    );
    
    const clearanceIssues = routeClearances?.filter(c => 
      c.VerticalClearance < vehicleSpecs.height
    );
    
    const restrictionIssues = routeRestrictions?.filter(r => 
      (r.MaxWeight && vehicleSpecs.weight > r.MaxWeight) ||
      (r.RestrictedVehicleTypes && r.RestrictedVehicleTypes.includes(vehicleSpecs.type))
    );
    
    return {
      route,
      clearanceIssues,
      restrictionIssues,
      isCompatible: clearanceIssues.length === 0 && restrictionIssues.length === 0
    };
  };
  
  const routeCompatibility = ['I-5', 'I-90', 'I-405'].map(checkRouteCompatibility);
  
  return (
    <div>
      <h1>Comprehensive Route Planner</h1>
      
      <div className="vehicle-specs">
        <h2>Vehicle Specifications</h2>
        <div>
          <label>Weight (lbs): 
            <input 
              type="number" 
              value={vehicleSpecs.weight} 
              onChange={e => setVehicleSpecs({...vehicleSpecs, weight: Number(e.target.value)})}
            />
          </label>
        </div>
        <div>
          <label>Height (ft): 
            <input 
              type="number" 
              value={vehicleSpecs.height} 
              onChange={e => setVehicleSpecs({...vehicleSpecs, height: Number(e.target.value)})}
            />
          </label>
        </div>
        <div>
          <label>Vehicle Type: 
            <select 
              value={vehicleSpecs.type} 
              onChange={e => setVehicleSpecs({...vehicleSpecs, type: e.target.value})}
            >
              <option value="TRUCK">Truck</option>
              <option value="BUS">Bus</option>
              <option value="COMBINATION">Combination Vehicle</option>
            </select>
          </label>
        </div>
      </div>
      
      <div className="route-analysis">
        <h2>Route Analysis</h2>
        {routeCompatibility.map(({ route, isCompatible, clearanceIssues, restrictionIssues }) => (
          <div key={route} className={`route-analysis ${isCompatible ? 'compatible' : 'incompatible'}`}>
            <h3>Route {route}</h3>
            <p>Status: {isCompatible ? '✅ Compatible' : '⚠️ Issues Found'}</p>
            
            {clearanceIssues.length > 0 && (
              <div className="issues">
                <h4>Clearance Issues:</h4>
                {clearanceIssues.map(issue => (
                  <p key={issue.BridgeDataGISID}>
                    {issue.StructureName}: {issue.VerticalClearance}ft (need {vehicleSpecs.height}ft)
                  </p>
                ))}
              </div>
            )}
            
            {restrictionIssues.length > 0 && (
              <div className="issues">
                <h4>Restriction Issues:</h4>
                {restrictionIssues.map(issue => (
                  <p key={issue.CommercialVehicleRestrictionID}>
                    {issue.LocationDescription}: {issue.RestrictedVehicleTypes || 'Weight limit exceeded'}
                  </p>
                ))}
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
- **Border Crossings**: `MINUTE_UPDATES` (5-15 minute refresh)
- **Bridge Clearances**: `DAILY_UPDATES` (daily refresh)
- **Commercial Vehicle Restrictions**: `STATIC` (daily refresh)

### Optimization Tips
- **Route Planning**: Pre-filter routes based on vehicle specifications
- **Weight Calculations**: Cache common vehicle type calculations
- **Border Crossings**: Use historical data to predict optimal crossing times
- **Combined Analysis**: Store frequently accessed route combinations locally

## 🔗 Detailed Documentation

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[WSDOT Border Crossings HTML](../../../redoc/wsdot-border-crossings.html)** - Interactive border crossing documentation
- **[WSDOT Bridge Clearances HTML](../../../redoc/wsdot-bridge-clearances.html)** - Interactive bridge documentation
- **[WSDOT Commercial Vehicle Restrictions HTML](../../../redoc/wsdot-commercial-vehicle-restrictions.html)** - Interactive restriction documentation

## 📚 Next Steps

- **[React Integration Guide](../guides/react-integration.md)** - React patterns with TanStack Query
- **[Node.js Integration Guide](../guides/nodejs-integration.md)** - Server-side usage patterns
- **[Caching Reference](../reference/caching.md)** - Performance optimization strategies
- **[Error Handling Reference](../reference/error-handling.md)** - Error recovery patterns
