# getBridgeClearances

Retrieves comprehensive bridge clearance data for a specific WSDOT route, including height restrictions, location information, and structural details. This endpoint is essential for commercial vehicle route planning and preventing bridge strikes.

## Use Cases
- Planning commercial vehicle routes to avoid low-clearance bridges
- Providing real-time bridge clearance information to truck drivers
- Building bridge management and maintenance applications
- Creating safety alerts for vehicles approaching height-restricted bridges
- Supporting transportation planning and infrastructure management

## Related Endpoints
This is the only endpoint in the Bridge Clearances API. For related functionality, see:
- **WSDOT Highway Alerts**: For traffic incidents affecting bridge access
- **WSDOT Traffic Flow**: For real-time traffic data on bridge approaches

## Code Templates

### Direct API Call
```typescript
import { getBridgeClearances } from 'ws-dottie/api/wsdot-bridge-clearances';

const clearances = await getBridgeClearances({ route: "005" });
console.log(`Found ${clearances.length} bridges on I-5`);

// Find bridges with clearance issues
const lowClearanceBridges = clearances.filter(bridge => 
  bridge.VerticalClearanceMinimumInches < 168 // Less than 14 feet
);
console.log(`${lowClearanceBridges.length} bridges have clearance under 14 feet`);
```

### React Query Hook
```typescript
import { useBridgeClearances } from 'ws-dottie/api/wsdot-bridge-clearances';

function BridgeClearancesDisplay({ route }: { route: string }) {
  const { data: clearances, isLoading, error } = useBridgeClearances({ route });
  
  if (isLoading) return <div>Loading bridge clearances...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h2>Bridge Clearances for Route {route}</h2>
      {clearances.map(bridge => (
        <div key={bridge.BridgeNumber}>
          <h3>{bridge.CrossingDescription}</h3>
          <p>Minimum Clearance: {bridge.VerticalClearanceMinimumFeetInch}</p>
          <p>Location: Milepost {bridge.SRMP}</p>
          <p>Last Updated: {bridge.APILastUpdate.toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
```

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `route` | `string` | Yes | WSDOT route identifier for which to retrieve bridge clearance data. Examples include '005' for I-5, '090' for I-90, '405' for I-405. The route should be specified as a zero-padded 3-digit string for interstates (e.g., '005' not '5') or as the full route number for state routes (e.g., '20', '101'). |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `APILastUpdate` | `Date` | Timestamp indicating when this bridge clearance data was last updated in the WSDOT system. All times are in Pacific Time Zone. |
| `BridgeNumber` | `string` | Unique identifier assigned to the bridge by WSDOT for bridge management and record keeping. |
| `ControlEntityGuid` | `string` | Globally unique identifier for the controlling entity responsible for this bridge. |
| `CrossingDescription` | `string` | Human-readable description of what the bridge crosses over or under (e.g., 'Over I-5', 'Over Ship Canal'). |
| `CrossingLocationId` | `number` | Numeric identifier for the specific crossing location where the bridge is situated. |
| `CrossingRecordGuid` | `string` | Globally unique identifier for the crossing record in the WSDOT database. |
| `InventoryDirection` | `string \| null` | Direction indicator for bridge inventory purposes. May be null if not applicable. |
| `Latitude` | `number` | Latitude coordinate of the bridge location in decimal degrees using WGS84 coordinate system. |
| `LocationGuid` | `string` | Globally unique identifier for the geographic location of the bridge. |
| `Longitude` | `number` | Longitude coordinate of the bridge location in decimal degrees using WGS84 coordinate system. |
| `RouteDate` | `Date` | Date when the route information for this bridge was established or last verified. |
| `SRMP` | `number` | State Route Milepost indicating the precise location of the bridge along the state route. |
| `SRMPAheadBackIndicator` | `string \| null` | Indicator showing whether the milepost measurement is ahead or back from the standard reference point. |
| `StateRouteID` | `string` | Official Washington State route identifier where the bridge is located (e.g., '005' for I-5, '090' for I-90). |
| `StateStructureId` | `string` | Official state structure identifier assigned to the bridge by WSDOT. |
| `VerticalClearanceMaximumFeetInch` | `string` | Maximum vertical clearance under the bridge in feet and inches format (e.g., '16-06' for 16 feet 6 inches). |
| `VerticalClearanceMaximumInches` | `number` | Maximum vertical clearance under the bridge in total inches. |
| `VerticalClearanceMinimumFeetInch` | `string` | Minimum vertical clearance under the bridge in feet and inches format (e.g., '15-08' for 15 feet 8 inches). |
| `VerticalClearanceMinimumInches` | `number` | Minimum vertical clearance under the bridge in total inches. This is the key measurement for route planning. |

## Usage Examples

### Example 1: Basic Bridge Information
**Input**:
```typescript
const clearances = await getBridgeClearances({ route: "005" });
```

**Output**:
```typescript
console.log(clearances);
```

**Result**:
```
[
  {
    "APILastUpdate": "2025-08-15T14:30:00.000Z",
    "BridgeNumber": "005/001",
    "ControlEntityGuid": "12345678-1234-1234-1234-123456789012",
    "CrossingDescription": "Over I-5",
    "CrossingLocationId": 1001,
    "CrossingRecordGuid": "87654321-4321-4321-4321-210987654321",
    "InventoryDirection": "Northbound",
    "Latitude": 47.6062,
    "LocationGuid": "11111111-2222-3333-4444-555555555555",
    "Longitude": -122.3321,
    "RouteDate": "2025-08-15T14:30:00.000Z",
    "SRMP": 165.2,
    "SRMPAheadBackIndicator": "Ahead",
    "StateRouteID": "005",
    "StateStructureId": "005-001",
    "VerticalClearanceMaximumFeetInch": "16-06",
    "VerticalClearanceMaximumInches": 198,
    "VerticalClearanceMinimumFeetInch": "15-08",
    "VerticalClearanceMinimumInches": 188
  }
]
```

### Example 2: Finding Low Clearance Bridges
**Input**:
```typescript
const clearances = await getBridgeClearances({ route: "005" });

// Find bridges with clearance under 14 feet (168 inches)
const lowClearanceBridges = clearances.filter(bridge => 
  bridge.VerticalClearanceMinimumInches < 168
);

console.log(`Found ${lowClearanceBridges.length} bridges with clearance under 14 feet`);
lowClearanceBridges.forEach(bridge => {
  console.log(`${bridge.CrossingDescription}: ${bridge.VerticalClearanceMinimumFeetInch}`);
});
```

**Output**:
```typescript
console.log(`Found ${lowClearanceBridges.length} bridges with clearance under 14 feet`);
lowClearanceBridges.forEach(bridge => {
  console.log(`${bridge.CrossingDescription}: ${bridge.VerticalClearanceMinimumFeetInch}`);
});
```

**Result**:
```
Found 2 bridges with clearance under 14 feet
Over I-5: 13-06
Under SR 520: 13-11
```

### Example 3: Route Planning for Commercial Vehicles
**Input**:
```typescript
const clearances = await getBridgeClearances({ route: "005" });

// Check if a 14-foot truck can safely travel this route
const vehicleHeightInches = 14 * 12; // 14 feet = 168 inches
const safeBridges = clearances.filter(bridge => 
  bridge.VerticalClearanceMinimumInches > vehicleHeightInches
);

const clearanceIssues = clearances.filter(bridge => 
  bridge.VerticalClearanceMinimumInches <= vehicleHeightInches
);

console.log(`Route Safety Analysis for ${vehicleHeightInches / 12}-foot vehicle:`);
console.log(`Safe bridges: ${safeBridges.length}`);
console.log(`Clearance issues: ${clearanceIssues.length}`);

if (clearanceIssues.length > 0) {
  console.log("Bridges to avoid:");
  clearanceIssues.forEach(bridge => {
    console.log(`- ${bridge.CrossingDescription} at milepost ${bridge.SRMP} (${bridge.VerticalClearanceMinimumFeetInch})`);
  });
}
```

**Output**:
```typescript
console.log(`Route Safety Analysis for ${vehicleHeightInches / 12}-foot vehicle:`);
console.log(`Safe bridges: ${safeBridges.length}`);
console.log(`Clearance issues: ${clearanceIssues.length}`);
```

**Result**:
```
Route Safety Analysis for 14-foot vehicle:
Safe bridges: 8
Clearance issues: 2
Bridges to avoid:
- Over I-5 at milepost 165.2 (13-06)
- Under SR 520 at milepost 167.8 (13-11)
```

### Example 4: Geographic Bridge Analysis
**Input**:
```typescript
const clearances = await getBridgeClearances({ route: "005" });

// Analyze bridges by geographic region
const regions = {
  "Seattle Area": clearances.filter(b => b.Latitude > 47.5 && b.Latitude < 47.7),
  "Tacoma Area": clearances.filter(b => b.Latitude > 47.2 && b.Latitude < 47.4),
  "Olympia Area": clearances.filter(b => b.Latitude > 46.9 && b.Latitude < 47.1)
};

Object.entries(regions).forEach(([region, bridges]) => {
  if (bridges.length > 0) {
    const avgClearance = bridges.reduce((sum, b) => sum + b.VerticalClearanceMinimumInches, 0) / bridges.length;
    const minClearance = Math.min(...bridges.map(b => b.VerticalClearanceMinimumInches));
    
    console.log(`${region}: ${bridges.length} bridges`);
    console.log(`  Average clearance: ${(avgClearance / 12).toFixed(1)} feet`);
    console.log(`  Minimum clearance: ${(minClearance / 12).toFixed(1)} feet`);
  }
});
```

**Output**:
```typescript
Object.entries(regions).forEach(([region, bridges]) => {
  if (bridges.length > 0) {
    const avgClearance = bridges.reduce((sum, b) => sum + b.VerticalClearanceMinimumInches, 0) / bridges.length;
    const minClearance = Math.min(...bridges.map(b => b.VerticalClearanceMinimumInches));
    
    console.log(`${region}: ${bridges.length} bridges`);
    console.log(`  Average clearance: ${(avgClearance / 12).toFixed(1)} feet`);
    console.log(`  Minimum clearance: ${(minClearance / 12).toFixed(1)} feet`);
  }
});
```

**Result**:
```
Seattle Area: 4 bridges
  Average clearance: 15.2 feet
  Minimum clearance: 13.5 feet
Tacoma Area: 3 bridges
  Average clearance: 16.1 feet
  Minimum clearance: 15.8 feet
Olympia Area: 2 bridges
  Average clearance: 16.5 feet
  Minimum clearance: 16.2 feet
```

### Example 5: Bridge Maintenance Planning
**Input**:
```typescript
const clearances = await getBridgeClearances({ route: "005" });

// Identify bridges that may need attention based on clearance
const maintenanceConcerns = clearances.filter(bridge => {
  const clearanceFeet = bridge.VerticalClearanceMinimumInches / 12;
  return clearanceFeet < 14 || clearanceFeet < 15; // Flag bridges under 14ft or 15ft
});

console.log("Maintenance Planning Report:");
console.log(`Total bridges: ${clearances.length}`);
console.log(`Critical bridges (<14ft): ${maintenanceConcerns.filter(b => b.VerticalClearanceMinimumInches < 168).length}`);
console.log(`Attention needed (<15ft): ${maintenanceConcerns.filter(b => b.VerticalClearanceMinimumInches < 180).length}`);

if (maintenanceConcerns.length > 0) {
  console.log("\nBridges requiring attention:");
  maintenanceConcerns.forEach(bridge => {
    const clearance = (bridge.VerticalClearanceMinimumInches / 12).toFixed(1);
    console.log(`- ${bridge.CrossingDescription} (MP ${bridge.SRMP}): ${clearance} ft`);
  });
}
```

**Output**:
```typescript
console.log("Maintenance Planning Report:");
console.log(`Total bridges: ${clearances.length}`);
console.log(`Critical bridges (<14ft): ${maintenanceConcerns.filter(b => b.VerticalClearanceMinimumInches < 168).length}`);
console.log(`Attention needed (<15ft): ${maintenanceConcerns.filter(b => b.VerticalClearanceMinimumInches < 180).length}`);
```

**Result**:
```
Maintenance Planning Report:
Total bridges: 10
Critical bridges (<14ft): 2
Attention needed (<15ft): 4

Bridges requiring attention:
- Over I-5 (MP 165.2): 13.5 ft
- Under SR 520 (MP 167.8): 13.9 ft
- Over Ship Canal (MP 170.1): 14.2 ft
- Under I-90 (MP 172.3): 14.8 ft
```

## API Testing Note

> **Important**: The examples above use representative data. In production documentation, these examples should be generated from actual API calls using the `$WSDOT_ACCESS_CODE` environment variable to ensure current, accurate data from August 2025 or later.

## Source References

### Official Documentation
- **[WSDOT Bridge Clearances API](https://wsdot.wa.gov/apis/bridge-clearances/)**: Official API documentation and specifications
- **[WSDOT Bridge Information](https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html)**: General bridge clearance information and resources

### Implementation Code
- **[getBridgeClearances Implementation](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-bridge-clearances/getBridgeClearances.ts)**: Complete source code with Zod schemas
- **[Bridge Clearances Schemas](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-bridge-clearances/getBridgeClearances.ts)**: Input/output validation schemas
