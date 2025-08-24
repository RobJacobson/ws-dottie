# getHighwayAlerts

Retrieves all current highway alerts across Washington State, providing comprehensive traffic incident data including collisions, construction, weather events, and road closures for real-time traffic monitoring and route planning.

## Use Cases
- Real-time traffic incident monitoring and display
- Navigation app integration for route planning around incidents
- Transportation agency dashboards for traffic management
- Emergency response coordination and resource allocation
- Public information systems for road condition updates

## Related Endpoints
- **`getEventCategories`**: Get available event categories for filtering
- **`getHighwayAlertById`**: Get specific alert by unique identifier
- **`searchHighwayAlerts`**: Search alerts by various criteria
- **`getHighwayAlertsByMapArea`**: Get alerts filtered by geographic area

## Code Templates

### Direct API Call
```typescript
import { getHighwayAlerts } from 'ws-dottie/api/wsdot-highway-alerts';

const alerts = await getHighwayAlerts();
console.log(`Found ${alerts.length} active alerts`);
```

### React Query Hook
```typescript
import { useHighwayAlerts } from 'ws-dottie/api/wsdot-highway-alerts';

function AlertsDisplay() {
  const { data: alerts, isLoading, error } = useHighwayAlerts();
  
  if (isLoading) return <div>Loading alerts...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h3>Highway Alerts</h3>
      <p>Total alerts: {alerts?.length || 0}</p>
      {alerts?.map(alert => (
        <div key={alert.AlertID}>
          <h4>{alert.HeadlineDescription}</h4>
          <p>Category: {alert.EventCategory}</p>
          <p>Status: {alert.EventStatus}</p>
          <p>Priority: {alert.Priority}</p>
        </div>
      ))}
    </div>
  );
}
```

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *None* | *None* | *None* | No parameters required. The API returns all active highway alerts across Washington State. |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `AlertID` | `number` | Unique identifier assigned to this highway alert by the WSDOT system |
| `HeadlineDescription` | `string` | Brief, concise description of the highway alert for quick reading |
| `ExtendedDescription` | `string \| null` | Detailed description providing comprehensive information about the traffic condition |
| `EventCategory` | `string` | Category classification for the type of highway alert (e.g., 'Collision', 'Construction') |
| `EventStatus` | `string` | Current status of the highway alert (e.g., 'Active', 'Cleared', 'In Progress') |
| `Priority` | `string` | Priority level indicating importance and urgency (e.g., 'High', 'Medium', 'Low') |
| `Region` | `string` | Geographic region of Washington State where the alert is located |
| `County` | `string \| null` | Name of the county where the highway alert is located |
| `StartTime` | `Date` | Timestamp when the highway alert began or first occurred |
| `EndTime` | `Date \| null` | Timestamp when the alert is expected to end or be resolved |
| `LastUpdatedTime` | `Date` | Timestamp when this highway alert was last updated in the WSDOT system |
| `StartRoadwayLocation` | `object` | Geographic starting point of the alert zone along the roadway |
| `EndRoadwayLocation` | `object` | Geographic endpoint of the alert zone along the roadway |

### Roadway Location Fields
| Field | Type | Description |
|-------|------|-------------|
| `RoadName` | `string` | Name of the highway or road where the alert is located |
| `Direction` | `string \| null` | Direction of travel indicator for the roadway location |
| `Latitude` | `number` | Latitude coordinate of the alert location (may be 0 if not available) |
| `Longitude` | `number` | Longitude coordinate of the alert location (may be 0 if not available) |
| `MilePost` | `number` | Milepost marker indicating distance along the highway (may be 0 if not available) |

## Usage Examples

### Example 1: Critical Incident Monitoring
**Input**:
```typescript
const alerts = await getHighwayAlerts();
```

**Output**:
```typescript
const criticalAlerts = alerts.filter(alert => 
  alert.Priority === 'High' && 
  ['Collision', 'Road Closure'].includes(alert.EventCategory)
);
console.log(`Critical incidents requiring immediate attention: ${criticalAlerts.length}`);
```

**Result**:
```
Critical incidents requiring immediate attention: 3
```

### Example 2: Regional Impact Analysis
**Input**:
```typescript
const alerts = await getHighwayAlerts();
```

**Output**:
```typescript
const regionalImpact = alerts.reduce((impact, alert) => {
  const region = alert.Region;
  if (!impact[region]) {
    impact[region] = { total: 0, highPriority: 0, construction: 0 };
  }
  impact[region].total++;
  if (alert.Priority === 'High') impact[region].highPriority++;
  if (alert.EventCategory === 'Construction') impact[region].construction++;
  return impact;
}, {});
console.log('Regional impact analysis:', regionalImpact);
```

**Result**:
```
Regional impact analysis: { "Seattle": { total: 8, highPriority: 2, construction: 3 }, "Spokane": { total: 4, highPriority: 1, construction: 1 } }
```

### Example 3: Construction Schedule Optimization
**Input**:
```typescript
const alerts = await getHighwayAlerts();
```

**Output**:
```typescript
const constructionAlerts = alerts.filter(alert => 
  alert.EventCategory === 'Construction' && alert.EventStatus === 'Active'
);
const constructionSchedule = constructionAlerts.map(alert => ({
  road: alert.StartRoadwayLocation.RoadName,
  startTime: alert.StartTime,
  endTime: alert.EndTime,
  duration: alert.EndTime ? 
    Math.ceil((alert.EndTime.getTime() - alert.StartTime.getTime()) / (1000 * 60 * 60)) : 
    'Unknown'
}));
console.log('Active construction projects:', constructionSchedule);
```

**Result**:
```
Active construction projects: [
  { road: "I-5", startTime: "2025-08-15T06:00:00.000Z", endTime: "2025-08-15T18:00:00.000Z", duration: 12 },
  { road: "SR 520", startTime: "2025-08-15T08:00:00.000Z", endTime: "2025-08-15T16:00:00.000Z", duration: 8 }
]
```

### Example 4: Weather-Related Incident Tracking
**Input**:
```typescript
const alerts = await getHighwayAlerts();
```

**Output**:
```typescript
const weatherAlerts = alerts.filter(alert => 
  alert.EventCategory === 'Weather' && alert.EventStatus === 'Active'
);
const weatherImpact = weatherAlerts.reduce((impact, alert) => {
  const county = alert.County || 'Unknown';
  if (!impact[county]) impact[county] = [];
  impact[county].push({
    description: alert.HeadlineDescription,
    priority: alert.Priority,
    startTime: alert.StartTime
  });
  return impact;
}, {});
console.log('Weather-related incidents by county:', weatherImpact);
```

**Result**:
```
Weather-related incidents by county: { "King": [{ description: "Fog reducing visibility", priority: "Medium", startTime: "2025-08-15T05:00:00.000Z" }] }
```

### Example 5: Emergency Response Coordination
**Input**:
```typescript
const alerts = await getHighwayAlerts();
```

**Output**:
```typescript
const emergencyAlerts = alerts.filter(alert => 
  alert.Priority === 'High' && 
  ['Collision', 'Road Closure', 'Emergency'].includes(alert.EventCategory)
);
const responsePlan = emergencyAlerts.map(alert => ({
  id: alert.AlertID,
  location: `${alert.StartRoadwayLocation.RoadName} at MP ${alert.StartRoadwayLocation.MilePost}`,
  category: alert.EventCategory,
  priority: alert.Priority,
  responseTime: new Date().getTime() - alert.StartTime.getTime()
}));
console.log('Emergency response plan:', responsePlan);
```

**Result**:
```
Emergency response plan: [
  { id: 12345, location: "I-5 at MP 167", category: "Collision", priority: "High", responseTime: 1800000 }
]
```

### Example 6: Traffic Pattern Analysis
**Input**:
```typescript
const alerts = await getHighwayAlerts();
```

**Output**:
```typescript
const timeAnalysis = alerts.reduce((analysis, alert) => {
  const hour = alert.StartTime.getHours();
  if (!analysis[hour]) analysis[hour] = { count: 0, categories: {} };
  analysis[hour].count++;
  analysis[hour].categories[alert.EventCategory] = 
    (analysis[hour].categories[alert.EventCategory] || 0) + 1;
  return analysis;
}, {});
console.log('Incident patterns by hour:', timeAnalysis);
```

**Result**:
```
Incident patterns by hour: { "6": { count: 3, categories: { "Construction": 2, "Weather": 1 } }, "14": { count: 2, categories: { "Collision": 1, "Special Event": 1 } } }
```

### Example 7: Route Planning Integration
**Input**:
```typescript
const alerts = await getHighwayAlerts();
```

**Output**:
```typescript
const routeAlerts = alerts.filter(alert => 
  alert.EventStatus === 'Active' && 
  ['I-5', 'I-90', 'SR 520'].includes(alert.StartRoadwayLocation.RoadName)
);
const routeStatus = routeAlerts.reduce((status, alert) => {
  const road = alert.StartRoadwayLocation.RoadName;
  if (!status[road]) status[road] = [];
  status[road].push({
    category: alert.EventCategory,
    priority: alert.Priority,
    location: alert.StartRoadwayLocation.MilePost
  });
  return status;
}, {});
console.log('Major route status:', routeStatus);
```

**Result**:
```
Major route status: { "I-5": [{ category: "Construction", priority: "Medium", location: 167 }], "SR 520": [{ category: "Construction", priority: "Low", location: 8 }] }
```

### Example 8: Maintenance Planning Dashboard
**Input**:
```typescript
const alerts = await getHighwayAlerts();
```

**Output**:
```typescript
const maintenanceAlerts = alerts.filter(alert => 
  alert.EventCategory === 'Maintenance' && alert.EventStatus === 'Active'
);
const maintenanceSchedule = maintenanceAlerts.map(alert => ({
  id: alert.AlertID,
  road: alert.StartRoadwayLocation.RoadName,
  description: alert.HeadlineDescription,
  startTime: alert.StartTime,
  estimatedDuration: alert.EndTime ? 
    Math.ceil((alert.EndTime.getTime() - alert.StartTime.getTime()) / (1000 * 60 * 60)) : 
    'Ongoing',
  priority: alert.Priority
}));
console.log('Maintenance schedule:', maintenanceSchedule);
```

**Result**:
```
Maintenance schedule: [
  { id: 12346, road: "SR 99", description: "Pothole repair", startTime: "2025-08-15T07:00:00.000Z", estimatedDuration: 4, priority: "Medium" }
]
```

## Source References

### Official Documentation
- **[WSDOT Highway Alerts API](https://wsdot.wa.gov/apis/highway-alerts/)**: Official API documentation and specifications
- **[WSDOT Traffic Information](https://wsdot.wa.gov/traffic/)**: General traffic information and alert resources

### Implementation Code
- **[getHighwayAlerts Implementation](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/getHighwayAlerts.ts)**: Complete source code with Zod schemas
- **[Highway Alerts Schemas](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/outputs.ts)**: Input/output validation schemas
