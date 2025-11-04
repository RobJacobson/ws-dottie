# Infrastructure APIs

This guide covers all infrastructure-related APIs in WS-Dottie, providing comprehensive access to Washington State transportation infrastructure information.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🏗️ Overview

WS-Dottie provides access to three infrastructure APIs that cover physical transportation infrastructure throughout Washington State:

| API | Description | Key Features | Update Frequency |
|------|-------------|---------------|------------------|
| **WSDOT Bridge Clearances** | Height restrictions for bridges and overpasses | Daily |
| **WSDOT Commercial Vehicle Restrictions** | Weight limits and vehicle restrictions | Weekly |
| **WSDOT Border Crossings** | Wait times and conditions at border crossings | Frequent (5-15m) |

## 🌉 WSDOT Bridge Clearances API

### Key Features
- **Bridge height restrictions** for all state highways
- **Vertical clearance data** for route planning
- **Location-based filtering** by route number
- **Structure information** including bridge type and construction

### Common Use Cases

#### Route Planning for Tall Vehicles
```javascript
import { useBridgeClearances } from 'ws-dottie';

function TallVehicleRoutePlanner() {
  const [vehicleHeight, setVehicleHeight] = useState(12); // feet
  const [selectedRoute, setSelectedRoute] = useState('I-5');
  const { data: clearances, isLoading } = useBridgeClearances({ route: '005' });
  
  // Check if vehicle can safely traverse route
  const canTraverseRoute = (clearances, height) => {
    return clearances?.every(clearance => clearance.VerticalClearance > height);
  };
  
  const routeSafe = canTraverseRoute(clearances, vehicleHeight);
  
  return (
    <div>
      <h1>Bridge Clearance Route Planner</h1>
      {isLoading && <div>Loading bridge data...</div>}
      
      <div className="vehicle-input">
        <label>Vehicle Height (feet): 
          <input 
            type="number" 
            value={vehicleHeight} 
            onChange={e => setVehicleHeight(Number(e.target.value))} 
          />
        </label>
      </div>
      
      <div className="route-status">
        <h2>Route {selectedRoute} Status</h2>
        <p>Vehicle Height: {vehicleHeight} feet</p>
        <p>Route {routeSafe ? 'Safe' : 'Not Safe'} for this vehicle</p>
        
        {clearances?.map(clearance => (
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
import { useBridgeClearances } from 'ws-dottie';

function BridgeClearanceMap() {
  const { data: clearances, isLoading } = useBridgeClearances();
  
  // Process data for map visualization
  const bridgeData = clearances?.map(clearance => ({
    id: clearance.BridgeDataGISID,
    name: clearance.StructureName,
    location: [clearance.Latitude, clearance.Longitude],
    clearance: clearance.VerticalClearance,
    route: clearance.Route
  }));
  
  return (
    <div>
      <h1>Washington Bridge Clearances</h1>
      {isLoading && <div>Loading bridge data...</div>}
      
      <div className="bridge-map">
        {/* Render map with bridge clearance indicators */}
        {bridgeData?.map(bridge => (
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

### Key Features
- **Weight restrictions** for bridges and highways
- **Vehicle type limitations** by road class
- **Seasonal restrictions** and temporary limitations
- **Route-specific restrictions** for commercial vehicles

### Common Use Cases

#### Commercial Vehicle Route Planner
```javascript
import { useCommercialVehicleRestrictions } from 'ws-dottie';

function CommercialVehicleRoutePlanner() {
  const [vehicleWeight, setVehicleWeight] = useState(80000); // pounds
  const [vehicleType, setVehicleType] = useState('TRUCK');
  const [selectedRoute, setSelectedRoute] = useState('I-90');
  const { data: restrictions, isLoading } = useCommercialVehicleRestrictions();
  
  // Filter restrictions for selected route
  const routeRestrictions = restrictions?.filter(r => 
    r.RouteName.includes(selectedRoute) || r.StateRoute.includes(selectedRoute)
  );
  
  // Check if vehicle can traverse route
  const canTraverseRoute = (restrictions, weight, type) => {
    return routeRestrictions?.every(restriction => {
      const weightOk = !restriction.MaxWeight || weight <= restriction.MaxWeight;
      const typeOk = !restriction.RestrictedVehicleTypes || 
        restriction.RestrictedVehicleTypes.includes(type);
      return weightOk && typeOk;
    });
  };
  
  const routeSafe = canTraverseRoute(routeRestrictions, vehicleWeight, vehicleType);
  
  return (
    <div>
      <h1>Commercial Vehicle Route Planner</h1>
      {isLoading && <div>Loading restriction data...</div>}
      
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
      </div>
      
      <div className="route-status">
        <h2>Route {selectedRoute} Status</h2>
        <p>Vehicle Weight: {vehicleWeight} lbs</p>
        <p>Vehicle Type: {vehicleType}</p>
        <p>Route {routeSafe ? 'Safe' : 'Not Safe'} for this vehicle</p>
        
        {routeRestrictions?.map(restriction => (
          <div key={restriction.CommercialVehicleRestrictionID} className="restriction-item">
            <h3>{restriction.LocationDescription}</h3>
            <p>Max Weight: {restriction.MaxWeight || 'No limit'} lbs</p>
            <p>Restrictions: {restriction.RestrictedVehicleTypes || 'None'}</p>
            <p>Status: {restriction.MaxWeight && vehicleWeight <= restriction.MaxWeight ? '✅ OK' : '⚠️ Over limit'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### Vehicle Compliance Checker
```javascript
import { useCommercialVehicleRestrictions } from 'ws-dottie';

function VehicleComplianceChecker() {
  const [vehicleSpecs, setVehicleSpecs] = useState({
    weight: 80000,
    type: 'TRUCK',
    height: 13.5,
    width: 8.5,
    length: 65
  });
  
  const { data: restrictions, isLoading } = useCommercialVehicleRestrictions();
  
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
  }).filter(r => !r.isCompliant);
  
  return (
    <div>
      <h1>Vehicle Compliance Checker</h1>
      {isLoading && <div>Loading restriction data...</div>}
      
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
        <h2>Compliance Issues ({complianceIssues?.length || 0})</h2>
        {complianceIssues?.map(issue => (
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
        
        {complianceIssues?.length === 0 && (
          <div className="compliant">
            <p>✅ Vehicle is compliant with all restrictions</p>
          </div>
        )}
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
  const nexusCrossings = crossings?.filter(c => c.CrossingType === 'NEXUS');
  
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
        
        <div className="crossing-section">
          <h2>NEXUS Crossings</h2>
          {nexusCrossings?.map(crossing => (
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

#### Border Crossing Route Planner
```javascript
import { useBorderCrossings } from 'ws-dottie';

function BorderCrossingRoutePlanner() {
  const { data: crossings, isLoading } = useBorderCrossings();
  const [selectedCrossing, setSelectedCrossing] = useState(null);
  const [vehicleType, setVehicleType] = useState('Passenger');
  
  // Filter crossings by vehicle type
  const filteredCrossings = crossings?.filter(c => c.CrossingType === vehicleType);
  
  // Find optimal crossing based on wait times
  const optimalCrossing = filteredCrossings?.reduce((best, current) => 
    (best.WaitTime < current.WaitTime) ? best : current
  , filteredCrossings[0]);
  
  return (
    <div>
      <h1>Border Crossing Route Planner</h1>
      {isLoading && <div>Loading border crossing data...</div>}
      
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
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🔗 API Relationships

Infrastructure APIs work together to provide comprehensive transportation infrastructure information:

### Bridge Clearances + Commercial Vehicle Restrictions Integration
```javascript
import { useBridgeClearances, useCommercialVehicleRestrictions } from 'ws-dottie';

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
    const routeRestrictions = restrictions?.filter(r => r.RouteName.includes(route));
    
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
- **Bridge Clearances**: `DAILY_UPDATES` (daily refresh)
- **Commercial Vehicle Restrictions**: `WEEKLY_UPDATES` (weekly refresh)
- **Border Crossings**: `MINUTE_UPDATES` (5-15 minute refresh)

### Optimization Tips
- **Route Planning**: Pre-filter routes based on vehicle specifications
- **Weight Calculations**: Cache common vehicle type calculations
- **Border Crossings**: Use historical data to predict optimal crossing times

## 🔗 Detailed Documentation

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[WSDOT Bridge Clearances HTML](../../../redoc/wsdot-bridge-clearances.html)** - Interactive bridge documentation
- **[WSDOT Commercial Vehicle Restrictions HTML](../../../redoc/wsdot-commercial-vehicle-restrictions.html)** - Interactive restriction documentation
- **[WSDOT Border Crossings HTML](../../../redoc/wsdot-border-crossings.html)** - Interactive border crossing documentation

## 📚 Next Steps

- **[React Integration Guide](../guides/react-integration.md)** - React patterns with TanStack Query
- **[Node.js Integration Guide](../guides/nodejs-integration.md)** - Server-side usage patterns
- **[Caching Reference](../reference/caching.md)** - Performance optimization strategies
- **[Error Handling Reference](../reference/error-handling.md)** - Error recovery patterns
