# getHighwayAlertsByRegionId

Retrieves highway alerts filtered by a specific WSDOT region ID, providing targeted traffic incident data for particular geographic regions within Washington State using numeric region identifiers.

## Use Cases
- Region-specific traffic monitoring using WSDOT's numeric region system
- Geographic filtering of alerts for regional transportation applications
- Regional emergency response coordination and resource allocation
- Regional traffic management and reporting systems
- Integration with existing WSDOT region-based systems

## Related Endpoints
- **`getHighwayAlerts`**: Get all current highway alerts
- **`getHighwayAlertsByMapArea`**: Get alerts filtered by map area name
- **`getMapAreas`**: Get available map areas and region information
- **`searchHighwayAlerts`**: Search alerts by various criteria

## Code Templates

### Direct API Call
```typescript
import { getHighwayAlertsByRegionId } from 'ws-dottie/api/wsdot-highway-alerts';

const alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
console.log(`Found ${alerts.length} alerts in region 1`);
```

### React Query Hook
```typescript
import { useHighwayAlertsByRegionId } from 'ws-dottie/api/wsdot-highway-alerts';

function RegionAlerts({ regionId }: { regionId: number }) {
  const { data: alerts, isLoading, error } = useHighwayAlertsByRegionId({ RegionId: regionId });
  
  if (isLoading) return <div>Loading region alerts...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h3>Region {regionId} Highway Alerts</h3>
      <p>Total alerts: {alerts?.length || 0}</p>
      {alerts?.map(alert => (
        <div key={alert.AlertID}>
          <h4>{alert.HeadlineDescription}</h4>
          <p>Category: {alert.EventCategory}</p>
          <p>Priority: {alert.Priority}</p>
          <p>Location: {alert.StartRoadwayLocation.RoadName}</p>
        </div>
      ))}
    </div>
  );
}
```

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `RegionId` | `number` | Yes | The WSDOT region ID to filter highway alerts by. This ID represents a specific geographic region within Washington State where alerts should be retrieved. Examples include region IDs for Northwest, Northeast, Southwest, Southeast, Central, Olympic Peninsula, or Puget Sound areas. |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `alerts[]` | `HighwayAlert[]` | Array of highway alert data filtered by the specified region ID. Each alert contains the same comprehensive information as the base highway alert schema, including location details, event classification, timing, and descriptive text. |

## Usage Examples

### Example 1: Basic Region ID Filtering
**Input**:
```typescript
const alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
```

**Output**:
```typescript
console.log(`Region 1 alerts: ${alerts.length}`);
```

**Result**:
```
Region 1 alerts: 12
```

### Example 2: Compare Multiple Regions
**Input**:
```typescript
const region1Alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
const region2Alerts = await getHighwayAlertsByRegionId({ RegionId: 2 });
```

**Output**:
```typescript
console.log(`Region 1: ${region1Alerts.length}, Region 2: ${region2Alerts.length}`);
```

**Result**:
```
Region 1: 12, Region 2: 8
```

### Example 3: Regional Alert Category Analysis
**Input**:
```typescript
const region1Alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
```

**Output**:
```typescript
const categoryCounts = region1Alerts.reduce((acc, alert) => {
  acc[alert.EventCategory] = (acc[alert.EventCategory] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
console.log('Region 1 alerts by category:', categoryCounts);
```

**Result**:
```
Region 1 alerts by category: { Collision: 5, Construction: 4, Weather: 2, "Special Event": 1 }
```

### Example 4: Regional Priority Analysis
**Input**:
```typescript
const region1Alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
```

**Output**:
```typescript
const priorityCounts = region1Alerts.reduce((acc, alert) => {
  acc[alert.Priority] = (acc[alert.Priority] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const highPriorityCount = (priorityCounts['High'] || 0) + (priorityCounts['Critical'] || 0);
console.log(`High priority alerts in region 1: ${highPriorityCount}`);
```

**Result**:
```
High priority alerts in region 1: 3
```

### Example 5: Regional Status Distribution
**Input**:
```typescript
const region1Alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
```

**Output**:
```typescript
const statusCounts = region1Alerts.reduce((acc, alert) => {
  acc[alert.EventStatus] = (acc[alert.EventStatus] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const activeAlerts = statusCounts['Active'] || 0;
const resolvedAlerts = statusCounts['Resolved'] || 0;
console.log(`Active: ${activeAlerts}, Resolved: ${resolvedAlerts}`);
```

**Result**:
```
Active: 9, Resolved: 3
```

### Example 6: Regional Route Analysis
**Input**:
```typescript
const region1Alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
```

**Output**:
```typescript
const routeCounts = region1Alerts.reduce((acc, alert) => {
  const roadName = alert.StartRoadwayLocation.RoadName;
  acc[roadName] = (acc[roadName] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log('Alerts by route in region 1:', routeCounts);
```

**Result**:
```
Alerts by route in region 1: { "I-5": 6, "SR 520": 3, "I-90": 2, "US-2": 1 }
```

### Example 7: Regional Time-Based Analysis
**Input**:
```typescript
const region1Alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
```

**Output**:
```typescript
const today = new Date();
const todayAlerts = region1Alerts.filter(alert => {
  const alertDate = new Date(alert.StartTime);
  return alertDate.toDateString() === today.toDateString();
});

const recentAlerts = region1Alerts.filter(alert => {
  const alertDate = new Date(alert.StartTime);
  const hoursAgo = (today.getTime() - alertDate.getTime()) / (1000 * 60 * 60);
  return hoursAgo <= 24;
});

console.log(`Today's region 1 alerts: ${todayAlerts.length}`);
console.log(`Last 24 hours: ${recentAlerts.length}`);
```

**Result**:
```
Today's region 1 alerts: 7
Last 24 hours: 10
```

### Example 8: Regional Geographic Bounds
**Input**:
```typescript
const region1Alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
```

**Output**:
```typescript
const alertsWithCoordinates = region1Alerts.filter(alert => 
  alert.StartRoadwayLocation.Latitude !== 0 && 
  alert.StartRoadwayLocation.Longitude !== 0
);

const coordinateBounds = alertsWithCoordinates.reduce((bounds, alert) => {
  bounds.minLat = Math.min(bounds.minLat, alert.StartRoadwayLocation.Latitude);
  bounds.maxLat = Math.max(bounds.maxLat, alert.StartRoadwayLocation.Latitude);
  bounds.minLng = Math.min(bounds.minLng, alert.StartRoadwayLocation.Longitude);
  bounds.maxLng = Math.max(bounds.maxLng, alert.StartRoadwayLocation.Longitude);
  return bounds;
}, { minLat: 90, maxLat: -90, minLng: 180, maxLng: -180 });

console.log('Region 1 coordinate bounds:', coordinateBounds);
```

**Result**:
```
Region 1 coordinate bounds: { minLat: 47.5, maxLat: 48.2, minLng: -122.8, maxLng: -121.9 }
```

### Example 9: Regional Alert Summary Dashboard
**Input**:
```typescript
const region1Alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
```

**Output**:
```typescript
const dashboardData = {
  regionId: 1,
  totalAlerts: region1Alerts.length,
  byCategory: region1Alerts.reduce((acc, alert) => {
    acc[alert.EventCategory] = (acc[alert.EventCategory] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byPriority: region1Alerts.reduce((acc, alert) => {
    acc[alert.Priority] = (acc[alert.Priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byStatus: region1Alerts.reduce((acc, alert) => {
    acc[alert.EventStatus] = (acc[alert.EventStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byRoute: region1Alerts.reduce((acc, alert) => {
    const roadName = alert.StartRoadwayLocation.RoadName;
    acc[roadName] = (acc[roadName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
};

console.log('Region 1 dashboard data:', dashboardData);
```

**Result**:
```
Region 1 dashboard data: { regionId: 1, totalAlerts: 12, byCategory: { Collision: 5, Construction: 4, Weather: 2, "Special Event": 1 }, byPriority: { High: 2, Medium: 8, Low: 2 }, byStatus: { Active: 9, Resolved: 3 }, byRoute: { "I-5": 6, "SR 520": 3, "I-90": 2, "US-2": 1 } }
```

### Example 10: Export Regional Alerts for Analysis
**Input**:
```typescript
const region1Alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
```

**Output**:
```typescript
const exportData = {
  regionId: 1,
  exportTime: new Date().toISOString(),
  totalAlerts: region1Alerts.length,
  alerts: region1Alerts.map(alert => ({
    id: alert.AlertID,
    headline: alert.HeadlineDescription,
    category: alert.EventCategory,
    status: alert.EventStatus,
    priority: alert.Priority,
    region: alert.Region,
    county: alert.County,
    startTime: alert.StartTime.toISOString(),
    endTime: alert.EndTime?.toISOString() || null,
    lastUpdated: alert.LastUpdatedTime.toISOString(),
    location: {
      road: alert.StartRoadwayLocation.RoadName,
      direction: alert.StartRoadwayLocation.Direction,
      milepost: alert.StartRoadwayLocation.MilePost,
      coordinates: {
        lat: alert.StartRoadwayLocation.Latitude,
        lng: alert.StartRoadwayLocation.Longitude
      }
    }
  }))
};

console.log(`Exported ${exportData.totalAlerts} alerts from region ${exportData.regionId}`);
```

**Result**:
```
Exported 12 alerts from region 1
```

## Source References

### Official Documentation
- **[WSDOT Highway Alerts API](https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html)**: Official API documentation and specifications
- **[WSDOT Traffic Information](https://wsdot.wa.gov/traffic/)**: General traffic information and alert resources

### Implementation Code
- **[getHighwayAlertsByRegionId Implementation](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/getHighwayAlertsByRegionId.ts)**: Complete source code with Zod schemas
- **[Highway Alert Schemas](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/getHighwayAlerts.ts)**: Input/output validation schemas
