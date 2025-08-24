# getHighwayAlertsByMapArea

Retrieves highway alerts filtered by a specific map area or region, enabling geographic-based traffic incident monitoring and localized alert systems for targeted areas within Washington State.

## Use Cases
- Local traffic monitoring for specific cities or regions
- Geographic filtering of alerts for regional applications
- City-specific traffic information systems
- Regional emergency response coordination
- Localized navigation and route planning

## Related Endpoints
- **`getMapAreas`**: Get available map areas for filtering
- **`getHighwayAlerts`**: Get all current highway alerts
- **`getHighwayAlertsByRegionId`**: Get alerts filtered by region ID
- **`searchHighwayAlerts`**: Search alerts by various criteria

## Code Templates

### Direct API Call
```typescript
import { getHighwayAlertsByMapArea } from 'ws-dottie/api/wsdot-highway-alerts';

const alerts = await getHighwayAlertsByMapArea({ MapArea: 'Seattle' });
console.log(`Found ${alerts.length} alerts in Seattle area`);
```

### React Query Hook
```typescript
import { useHighwayAlertsByMapArea } from 'ws-dottie/api/wsdot-highway-alerts';

function SeattleAlerts() {
  const { data: alerts, isLoading, error } = useHighwayAlertsByMapArea({ MapArea: 'Seattle' });
  
  if (isLoading) return <div>Loading Seattle alerts...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h3>Seattle Area Highway Alerts</h3>
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
| `MapArea` | `string` | Yes | The map area or region to filter highway alerts by. Examples include 'Seattle', 'Tacoma', 'Spokane', 'Eastern Washington', or 'Western Washington'. This parameter filters alerts to show only those relevant to the specified geographic area. |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `alerts[]` | `HighwayAlert[]` | Array of highway alert data filtered by the specified map area. Each alert contains the same comprehensive information as the base highway alert schema, including location details, event classification, timing, and descriptive text. |

## Usage Examples

### Example 1: Basic Map Area Filtering
**Input**:
```typescript
const alerts = await getHighwayAlertsByMapArea({ MapArea: 'Seattle' });
```

**Output**:
```typescript
console.log(`Seattle area alerts: ${alerts.length}`);
```

**Result**:
```
Seattle area alerts: 8
```

### Example 2: Compare Multiple Map Areas
**Input**:
```typescript
const seattleAlerts = await getHighwayAlertsByMapArea({ MapArea: 'Seattle' });
const tacomaAlerts = await getHighwayAlertsByMapArea({ MapArea: 'Tacoma' });
```

**Output**:
```typescript
console.log(`Seattle: ${seattleAlerts.length}, Tacoma: ${tacomaAlerts.length}`);
```

**Result**:
```
Seattle: 8, Tacoma: 3
```

### Example 3: Regional Alert Analysis
**Input**:
```typescript
const easternAlerts = await getHighwayAlertsByMapArea({ MapArea: 'Eastern Washington' });
```

**Output**:
```typescript
const categoryCounts = easternAlerts.reduce((acc, alert) => {
  acc[alert.EventCategory] = (acc[alert.EventCategory] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
console.log('Eastern Washington alerts by category:', categoryCounts);
```

**Result**:
```
Eastern Washington alerts by category: { Collision: 2, Construction: 4, Weather: 1 }
```

### Example 4: City-Specific Traffic Monitoring
**Input**:
```typescript
const spokaneAlerts = await getHighwayAlertsByMapArea({ MapArea: 'Spokane' });
```

**Output**:
```typescript
const activeAlerts = spokaneAlerts.filter(alert => alert.EventStatus === 'Active');
const highPriorityAlerts = activeAlerts.filter(alert => 
  ['High', 'Critical'].includes(alert.Priority)
);

console.log(`Active alerts: ${activeAlerts.length}`);
console.log(`High priority: ${highPriorityAlerts.length}`);
```

**Result**:
```
Active alerts: 5
High priority: 2
```

### Example 5: Western vs Eastern Washington Comparison
**Input**:
```typescript
const westernAlerts = await getHighwayAlertsByMapArea({ MapArea: 'Western Washington' });
const easternAlerts = await getHighwayAlertsByMapArea({ MapArea: 'Eastern Washington' });
```

**Output**:
```typescript
const comparison = {
  western: {
    total: westernAlerts.length,
    collisions: westernAlerts.filter(a => a.EventCategory === 'Collision').length,
    construction: westernAlerts.filter(a => a.EventCategory === 'Construction').length
  },
  eastern: {
    total: easternAlerts.length,
    collisions: easternAlerts.filter(a => a.EventCategory === 'Collision').length,
    construction: easternAlerts.filter(a => a.EventCategory === 'Construction').length
  }
};
console.log('Regional comparison:', comparison);
```

**Result**:
```
Regional comparison: { western: { total: 15, collisions: 6, construction: 7 }, eastern: { total: 7, collisions: 2, construction: 4 } }
```

### Example 6: Create Map Area Dashboard
**Input**:
```typescript
const seattleAlerts = await getHighwayAlertsByMapArea({ MapArea: 'Seattle' });
```

**Output**:
```typescript
const dashboardData = {
  mapArea: 'Seattle',
  totalAlerts: seattleAlerts.length,
  byCategory: seattleAlerts.reduce((acc, alert) => {
    acc[alert.EventCategory] = (acc[alert.EventCategory] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byPriority: seattleAlerts.reduce((acc, alert) => {
    acc[alert.Priority] = (acc[alert.Priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byStatus: seattleAlerts.reduce((acc, alert) => {
    acc[alert.EventStatus] = (acc[alert.EventStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
};
console.log('Seattle dashboard data:', dashboardData);
```

**Result**:
```
Seattle dashboard data: { mapArea: "Seattle", totalAlerts: 8, byCategory: { Collision: 3, Construction: 3, Weather: 1, "Special Event": 1 }, byPriority: { High: 2, Medium: 5, Low: 1 }, byStatus: { Active: 6, Resolved: 2 } }
```

### Example 7: Route-Specific Alerts by Map Area
**Input**:
```typescript
const seattleAlerts = await getHighwayAlertsByMapArea({ MapArea: 'Seattle' });
```

**Output**:
```typescript
const i5Alerts = seattleAlerts.filter(alert => 
  alert.StartRoadwayLocation.RoadName.includes('I-5') ||
  alert.EndRoadwayLocation.RoadName.includes('I-5')
);
const sr520Alerts = seattleAlerts.filter(alert => 
  alert.StartRoadwayLocation.RoadName.includes('SR 520') ||
  alert.EndRoadwayLocation.RoadName.includes('SR 520')
);

console.log(`I-5 alerts in Seattle: ${i5Alerts.length}`);
console.log(`SR 520 alerts in Seattle: ${sr520Alerts.length}`);
```

**Result**:
```
I-5 alerts in Seattle: 4
SR 520 alerts in Seattle: 2
```

### Example 8: Time-Based Analysis by Map Area
**Input**:
```typescript
const seattleAlerts = await getHighwayAlertsByMapArea({ MapArea: 'Seattle' });
```

**Output**:
```typescript
const today = new Date();
const todayAlerts = seattleAlerts.filter(alert => {
  const alertDate = new Date(alert.StartTime);
  return alertDate.toDateString() === today.toDateString();
});

const recentAlerts = seattleAlerts.filter(alert => {
  const alertDate = new Date(alert.StartTime);
  const hoursAgo = (today.getTime() - alertDate.getTime()) / (1000 * 60 * 60);
  return hoursAgo <= 24;
});

console.log(`Today's Seattle alerts: ${todayAlerts.length}`);
console.log(`Last 24 hours: ${recentAlerts.length}`);
```

**Result**:
```
Today's Seattle alerts: 5
Last 24 hours: 7
```

### Example 9: Geographic Coordinate Analysis by Map Area
**Input**:
```typescript
const seattleAlerts = await getHighwayAlertsByMapArea({ MapArea: 'Seattle' });
```

**Output**:
```typescript
const alertsWithCoordinates = seattleAlerts.filter(alert => 
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

console.log('Seattle alert coordinate bounds:', coordinateBounds);
```

**Result**:
```
Seattle alert coordinate bounds: { minLat: 47.5, maxLat: 47.8, minLng: -122.5, maxLng: -122.2 }
```

### Example 10: Export Map Area Alerts for External Systems
**Input**:
```typescript
const seattleAlerts = await getHighwayAlertsByMapArea({ MapArea: 'Seattle' });
```

**Output**:
```typescript
const exportData = {
  mapArea: 'Seattle',
  exportTime: new Date().toISOString(),
  totalAlerts: seattleAlerts.length,
  alerts: seattleAlerts.map(alert => ({
    id: alert.AlertID,
    headline: alert.HeadlineDescription,
    category: alert.EventCategory,
    status: alert.EventStatus,
    priority: alert.Priority,
    startTime: alert.StartTime.toISOString(),
    endTime: alert.EndTime?.toISOString() || null,
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

console.log(`Exported ${exportData.totalAlerts} Seattle alerts`);
```

**Result**:
```
Exported 8 Seattle alerts
```

## Source References

### Official Documentation
- **[WSDOT Highway Alerts API](https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html)**: Official API documentation and specifications
- **[WSDOT Traffic Information](https://wsdot.wa.gov/traffic/)**: General traffic information and alert resources

### Implementation Code
- **[getHighwayAlertsByMapArea Implementation](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/getHighwayAlertsByMapArea.ts)**: Complete source code with Zod schemas
- **[Highway Alert Schemas](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/getHighwayAlerts.ts)**: Input/output validation schemas
