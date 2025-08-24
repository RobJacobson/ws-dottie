# getBorderCrossings

Retrieves real-time wait time information for all border crossings between Washington State and Canada, including location details, current wait times, and operational status.

## Use Cases
- Displaying current border wait times on travel applications
- Building border crossing monitoring dashboards
- Providing real-time border information to commuters and travelers
- Alerting users to significant delays at specific crossings

## Related Endpoints
This is the only endpoint in the Border Crossings API. For related functionality, see:
- **WSDOT Highway Alerts**: For traffic incidents affecting border approaches
- **WSDOT Traffic Flow**: For real-time traffic data on routes to border crossings

## Code Templates

### Direct API Call
```typescript
import { getBorderCrossings } from 'ws-dottie/api/wsdot-border-crossings';

const crossings = await getBorderCrossings();
console.log(`Found ${crossings.length} border crossings`);

// Find specific crossing by name
const peaceArch = crossings.find(crossing => 
  crossing.CrossingName.includes('Peace Arch')
);
console.log(`Peace Arch wait time: ${peaceArch?.WaitTime} minutes`);
```

### React Query Hook
```typescript
import { useBorderCrossings } from 'ws-dottie/api/wsdot-border-crossings';

function BorderCrossingsDisplay() {
  const { data: crossings, isLoading, error } = useBorderCrossings();
  
  if (isLoading) return <div>Loading border crossings...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h2>Border Crossing Wait Times</h2>
      {crossings.map(crossing => (
        <div key={crossing.CrossingID}>
          <h3>{crossing.CrossingName}</h3>
          <p>Wait Time: {crossing.WaitTime} minutes</p>
          <p>Direction: {crossing.Direction}</p>
          <p>Status: {crossing.Status}</p>
        </div>
      ))}
    </div>
  );
}
```

## Input Parameters

This endpoint requires no parameters.

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `CrossingID` | `number` | Unique identifier for the border crossing in the WSDOT system |
| `CrossingName` | `string` | Human-readable name of the border crossing (e.g., "Peace Arch", "Pacific Highway") |
| `Direction` | `string` | Direction of travel (e.g., "Northbound", "Southbound") |
| `WaitTime` | `number` | Current wait time in minutes. 0 indicates no wait, negative values may indicate closed or unavailable |
| `Status` | `string` | Current operational status (e.g., "Open", "Closed", "Limited") |
| `Latitude` | `number` | GPS latitude coordinate in decimal degrees |
| `Longitude` | `number` | GPS longitude coordinate in decimal degrees |
| `LastUpdated` | `Date` | Timestamp of the last wait time update |

## Usage Examples

### Example 1: Basic Wait Time Display
**Input**:
```typescript
const crossings = await getBorderCrossings();
```

**Output**:
```typescript
console.log(crossings);
```

**Result**:
```
[
  {
    "CrossingID": 1,
    "CrossingName": "Peace Arch",
    "Direction": "Northbound",
    "WaitTime": 15,
    "Status": "Open",
    "Latitude": 49.0028,
    "Longitude": -122.7569,
    "LastUpdated": "2025-08-15T14:30:00.000Z"
  },
  {
    "CrossingID": 2,
    "CrossingName": "Pacific Highway",
    "Direction": "Northbound", 
    "WaitTime": 8,
    "Status": "Open",
    "Latitude": 49.0019,
    "Longitude": -122.7347,
    "LastUpdated": "2025-08-15T14:30:00.000Z"
  }
]
```

### Example 2: Finding Specific Crossing
**Input**:
```typescript
const crossings = await getBorderCrossings();

// Find Peace Arch crossing
const peaceArch = crossings.find(crossing => 
  crossing.CrossingName.includes('Peace Arch')
);

if (peaceArch) {
  console.log(`Peace Arch wait time: ${peaceArch.WaitTime} minutes`);
  console.log(`Status: ${peaceArch.Status}`);
}
```

**Output**:
```typescript
console.log(`Peace Arch wait time: ${peaceArch.WaitTime} minutes`);
console.log(`Status: ${peaceArch.Status}`);
```

**Result**:
```
Peace Arch wait time: 15 minutes
Status: Open
```

### Example 3: Monitoring for Delays
**Input**:
```typescript
const crossings = await getBorderCrossings();

// Find crossings with wait times over 30 minutes
const delayedCrossings = crossings.filter(crossing => 
  crossing.WaitTime > 30 && crossing.Status === "Open"
);

if (delayedCrossings.length > 0) {
  console.log("Significant delays detected:");
  delayedCrossings.forEach(crossing => {
    console.log(`${crossing.CrossingName}: ${crossing.WaitTime} minutes`);
  });
}
```

**Output**:
```typescript
console.log("Significant delays detected:");
delayedCrossings.forEach(crossing => {
  console.log(`${crossing.CrossingName}: ${crossing.WaitTime} minutes`);
});
```

**Result**:
```
Significant delays detected:
Peace Arch: 45 minutes
```

### Example 4: Route Planning & Optimization
**Input**:
```typescript
const crossings = await getBorderCrossings();

// Find the crossing with the shortest wait time for route planning
const bestCrossing = crossings.reduce((best, current) => 
  current.WaitTime < best.WaitTime ? current : best
);

console.log(`Best crossing option: ${bestCrossing.CrossingName} (${bestCrossing.WaitTime} min wait)`);
console.log(`Location: ${bestCrossing.Latitude}, ${bestCrossing.Longitude}`);
```

**Output**:
```typescript
console.log(`Best crossing option: ${bestCrossing.CrossingName} (${bestCrossing.WaitTime} min wait)`);
console.log(`Location: ${bestCrossing.Latitude}, ${bestCrossing.Longitude}`);
```

**Result**:
```
Best crossing option: Pacific Highway (8 min wait)
Location: 49.0019, -122.7347
```

### Example 5: Operational Status Monitoring
**Input**:
```typescript
const crossings = await getBorderCrossings();

// Check if any crossings are closed or have limited service
const operationalIssues = crossings.filter(crossing => 
  crossing.Status !== "Open" || crossing.WaitTime < 0
);

if (operationalIssues.length > 0) {
  console.log("Operational issues detected:");
  operationalIssues.forEach(crossing => {
    console.log(`${crossing.CrossingName}: ${crossing.Status} (Wait: ${crossing.WaitTime} min)`);
  });
} else {
  console.log("All crossings operating normally");
}
```

**Output**:
```typescript
console.log("All crossings operating normally");
```

**Result**:
```
All crossings operating normally
```

### Example 6: Geographic Analysis & Clustering
**Input**:
```typescript
const crossings = await getBorderCrossings();

// Group crossings by approximate geographic region
const regions = {
  "Blaine Area": crossings.filter(c => c.Latitude > 48.9 && c.Longitude > -122.8),
  "Lynden Area": crossings.filter(c => c.Latitude > 48.9 && c.Longitude < -122.8)
};

Object.entries(regions).forEach(([region, crossings]) => {
  const avgWait = crossings.reduce((sum, c) => sum + c.WaitTime, 0) / crossings.length;
  console.log(`${region}: ${crossings.length} crossings, avg wait: ${avgWait.toFixed(1)} min`);
});
```

**Output**:
```typescript
Object.entries(regions).forEach(([region, crossings]) => {
  const avgWait = crossings.reduce((sum, c) => sum + c.WaitTime, 0) / crossings.length;
  console.log(`${region}: ${crossings.length} crossings, avg wait: ${avgWait.toFixed(1)} min`);
});
```

**Result**:
```
Blaine Area: 2 crossings, avg wait: 11.5 min
Lynden Area: 1 crossing, avg wait: 8.0 min
```

### Example 7: Historical Wait Time Analysis
**Input**:
```typescript
const crossings = await getBorderCrossings();

// Analyze wait time patterns across all crossings
const waitTimeStats = {
  total: crossings.length,
  average: crossings.reduce((sum, c) => sum + c.WaitTime, 0) / crossings.length,
  max: Math.max(...crossings.map(c => c.WaitTime)),
  min: Math.min(...crossings.map(c => c.WaitTime)),
  congested: crossings.filter(c => c.WaitTime > 30).length
};

console.log("Wait Time Analysis:");
console.log(`Total crossings: ${waitTimeStats.total}`);
console.log(`Average wait: ${waitTimeStats.average.toFixed(1)} minutes`);
console.log(`Range: ${waitTimeStats.min} - ${waitTimeStats.max} minutes`);
console.log(`Congested crossings (>30 min): ${waitTimeStats.congested}`);
```

**Output**:
```typescript
console.log("Wait Time Analysis:");
console.log(`Total crossings: ${waitTimeStats.total}`);
console.log(`Average wait: ${waitTimeStats.average.toFixed(1)} minutes`);
console.log(`Range: ${waitTimeStats.min} - ${waitTimeStats.max} minutes`);
console.log(`Congested crossings (>30 min): ${waitTimeStats.congested}`);
```

**Result**:
```
Wait Time Analysis:
Total crossings: 3
Average wait: 11.5 minutes
Range: 8 - 15 minutes
Congested crossings (>30 min): 0
```

### Example 8: Real-Time Alert System
**Input**:
```typescript
const crossings = await getBorderCrossings();

// Create alerts for significant changes or issues
const alerts = [];

crossings.forEach(crossing => {
  if (crossing.WaitTime > 45) {
    alerts.push({
      level: "HIGH",
      message: `Severe delay at ${crossing.CrossingName}: ${crossing.WaitTime} minutes`,
      crossing: crossing.CrossingName,
      waitTime: crossing.WaitTime
    });
  } else if (crossing.WaitTime > 20) {
    alerts.push({
      level: "MEDIUM",
      message: `Moderate delay at ${crossing.CrossingName}: ${crossing.WaitTime} minutes`,
      crossing: crossing.CrossingName,
      waitTime: crossing.WaitTime
    });
  }
  
  if (crossing.Status !== "Open") {
    alerts.push({
      level: "CRITICAL",
      message: `${crossing.CrossingName} is ${crossing.Status}`,
      crossing: crossing.CrossingName,
      status: crossing.Status
    });
  }
});

// Send alerts if any exist
if (alerts.length > 0) {
  console.log("Border Crossing Alerts:");
  alerts.forEach(alert => {
    console.log(`[${alert.level}] ${alert.message}`);
  });
} else {
  console.log("No alerts - all crossings operating normally");
}
```

**Output**:
```typescript
console.log("No alerts - all crossings operating normally");
```

**Result**:
```
No alerts - all crossings operating normally
```

### Example 9: Travel Time Estimation
**Input**:
```typescript
const crossings = await getBorderCrossings();

// Estimate total travel time including wait times
const estimateTravelTime = (crossingName, baseTravelTime = 15) => {
  const crossing = crossings.find(c => 
    c.CrossingName.toLowerCase().includes(crossingName.toLowerCase())
  );
  
  if (!crossing) {
    return { error: "Crossing not found" };
  }
  
  const totalTime = baseTravelTime + crossing.WaitTime;
  const status = crossing.WaitTime > 30 ? "Expect delays" : "Normal conditions";
  
  return {
    crossing: crossing.CrossingName,
    baseTravelTime,
    waitTime: crossing.WaitTime,
    totalTime,
    status,
    location: `${crossing.Latitude}, ${crossing.Longitude}`
  };
};

// Get estimates for different crossings
const peaceArchEstimate = estimateTravelTime("Peace Arch", 20);
const pacificHighwayEstimate = estimateTravelTime("Pacific Highway", 18);

console.log("Travel Time Estimates:");
console.log(`Peace Arch: ${peaceArchEstimate.totalTime} min total (${peaceArchEstimate.status})`);
console.log(`Pacific Highway: ${pacificHighwayEstimate.totalTime} min total (${pacificHighwayEstimate.status})`);
```

**Output**:
```typescript
console.log("Travel Time Estimates:");
console.log(`Peace Arch: ${peaceArchEstimate.totalTime} min total (${peaceArchEstimate.status})`);
console.log(`Pacific Highway: ${pacificHighwayEstimate.totalTime} min total (${pacificHighwayEstimate.status})`);
```

**Result**:
```
Travel Time Estimates:
Peace Arch: 35 min total (Normal conditions)
Pacific Highway: 26 min total (Normal conditions)
```

### Example 10: Data Export & Reporting
**Input**:
```typescript
const crossings = await getBorderCrossings();

// Prepare data for export to different formats
const exportData = {
  timestamp: new Date().toISOString(),
  summary: {
    totalCrossings: crossings.length,
    averageWaitTime: crossings.reduce((sum, c) => sum + c.WaitTime, 0) / crossings.length,
    operationalStatus: crossings.every(c => c.Status === "Open") ? "All Operational" : "Issues Detected"
  },
  crossings: crossings.map(c => ({
    name: c.CrossingName,
    waitTime: c.WaitTime,
    status: c.Status,
    coordinates: [c.Latitude, c.Longitude],
    lastUpdated: c.LastUpdated
  }))
};

// Export as JSON for reporting systems
const jsonExport = JSON.stringify(exportData, null, 2);
console.log("Data Export Summary:");
console.log(`Generated: ${exportData.timestamp}`);
console.log(`Crossings: ${exportData.summary.totalCrossings}`);
console.log(`Status: ${exportData.summary.operationalStatus}`);
console.log(`JSON length: ${jsonExport.length} characters`);
```

**Output**:
```typescript
console.log("Data Export Summary:");
console.log(`Generated: ${exportData.timestamp}`);
console.log(`Crossings: ${exportData.summary.totalCrossings}`);
console.log(`Status: ${exportData.summary.operationalStatus}`);
console.log(`JSON length: ${jsonExport.length} characters`);
```

**Result**:
```
Data Export Summary:
Generated: 2025-08-15T14:30:00.000Z
Crossings: 3
Status: All Operational
JSON length: 847 characters
```

## API Testing Note

> **Important**: The examples above use representative data. In production documentation, these examples should be generated from actual API calls using the `$WSDOT_ACCESS_CODE` environment variable to ensure current, accurate data from August 2025 or later.

## Source References

### Official Documentation
- **[WSDOT Border Crossings API](https://wsdot.wa.gov/apis/border-crossings/)**: Official API documentation and specifications
- **[WSDOT Border Information](https://wsdot.wa.gov/travel/border-crossings/)**: General border crossing information and resources

### Implementation Code
- **[getBorderCrossings Implementation](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-border-crossings/getBorderCrossings.ts)**: Complete source code with Zod schemas
- **[Border Crossings Schemas](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-border-crossings/outputs.ts)**: Input/output validation schemas
