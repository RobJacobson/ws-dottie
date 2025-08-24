# getHighwayAlertById

Retrieves detailed information about a specific highway alert by its unique identifier, providing comprehensive traffic incident data including location details, event classification, timing, and descriptive text for targeted alert monitoring and response.

## Use Cases
- Displaying detailed information for a specific traffic incident
- Building alert detail pages in traffic applications
- Tracking specific alerts over time for status updates
- Emergency response coordination for specific incidents
- Alert history and reporting for specific events

## Related Endpoints
- **`getHighwayAlerts`**: Get all current highway alerts (use to find available alert IDs)
- **`searchHighwayAlerts`**: Search alerts by various criteria
- **`getHighwayAlertsByMapArea`**: Get alerts filtered by geographic area
- **`getEventCategories`**: Get available event categories for classification

## Code Templates

### Direct API Call
```typescript
import { getHighwayAlertById } from 'ws-dottie/api/wsdot-highway-alerts';

const alert = await getHighwayAlertById({ AlertID: 12345 });
console.log(`Alert: ${alert.HeadlineDescription}`);
```

### React Query Hook
```typescript
import { useHighwayAlertById } from 'ws-dottie/api/wsdot-highway-alerts';

function AlertDetail({ alertId }: { alertId: number }) {
  const { data: alert, isLoading, error } = useHighwayAlertById({ AlertID: alertId });
  
  if (isLoading) return <div>Loading alert details...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h3>{alert.HeadlineDescription}</h3>
      <p><strong>Category:</strong> {alert.EventCategory}</p>
      <p><strong>Status:</strong> {alert.EventStatus}</p>
      <p><strong>Priority:</strong> {alert.Priority}</p>
      <p><strong>Location:</strong> {alert.StartRoadwayLocation.RoadName}</p>
      {alert.ExtendedDescription && (
        <p><strong>Details:</strong> {alert.ExtendedDescription}</p>
      )}
    </div>
  );
}
```

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `AlertID` | `number` | Yes | Unique identifier for the specific highway alert to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getHighwayAlerts endpoint or other alert listings. |

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
| `Description` | `string \| null` | Human-readable description of the roadway location where the alert applies |
| `Direction` | `string \| null` | Direction of travel indicator for the roadway location |
| `RoadName` | `string` | Name of the highway or road where the alert is located |
| `Latitude` | `number` | Latitude coordinate of the alert location (may be 0 if not available) |
| `Longitude` | `number` | Longitude coordinate of the alert location (may be 0 if not available) |
| `MilePost` | `number` | Milepost marker indicating distance along the highway (may be 0 if not available) |

## Usage Examples

### Example 1: Basic Alert Retrieval by ID
**Input**:
```typescript
const alert = await getHighwayAlertById({ AlertID: 12345 });
```

**Output**:
```typescript
console.log(`Alert ${alert.AlertID}: ${alert.HeadlineDescription}`);
```

**Result**:
```
Alert 12345: Collision on I-5 at Lake Forest Park
```

### Example 2: Display Complete Alert Information
**Input**:
```typescript
const alert = await getHighwayAlertById({ AlertID: 12345 });
```

**Output**:
```typescript
console.log('Alert Details:');
console.log(`- Headline: ${alert.HeadlineDescription}`);
console.log(`- Category: ${alert.EventCategory}`);
console.log(`- Status: ${alert.EventStatus}`);
console.log(`- Priority: ${alert.Priority}`);
console.log(`- Region: ${alert.Region}`);
console.log(`- County: ${alert.County || 'Not specified'}`);
```

**Result**:
```
Alert Details:
- Headline: Collision on I-5 at Lake Forest Park
- Category: Collision
- Status: Active
- Priority: High
- Region: Puget Sound
- County: King County
```

### Example 3: Check Alert Timing Information
**Input**:
```typescript
const alert = await getHighwayAlertById({ AlertID: 12345 });
```

**Output**:
```typescript
const startTime = new Date(alert.StartTime);
const endTime = alert.EndTime ? new Date(alert.EndTime) : null;
const lastUpdated = new Date(alert.LastUpdatedTime);

console.log(`Started: ${startTime.toLocaleString()}`);
console.log(`Ends: ${endTime ? endTime.toLocaleString() : 'Not specified'}`);
console.log(`Last Updated: ${lastUpdated.toLocaleString()}`);
```

**Result**:
```
Started: 8/15/2025, 2:30:00 PM
Ends: 8/15/2025, 5:30:00 PM
Last Updated: 8/15/2025, 3:45:00 PM
```

### Example 4: Analyze Alert Location Details
**Input**:
```typescript
const alert = await getHighwayAlertById({ AlertID: 12345 });
```

**Output**:
```typescript
const startLocation = alert.StartRoadwayLocation;
const endLocation = alert.EndRoadwayLocation;

console.log('Start Location:');
console.log(`- Road: ${startLocation.RoadName}`);
console.log(`- Direction: ${startLocation.Direction || 'Not specified'}`);
console.log(`- Milepost: ${startLocation.MilePost || 'Not specified'}`);
console.log(`- Coordinates: ${startLocation.Latitude}, ${startLocation.Longitude}`);

console.log('End Location:');
console.log(`- Road: ${endLocation.RoadName}`);
console.log(`- Direction: ${endLocation.Direction || 'Not specified'}`);
console.log(`- Milepost: ${endLocation.MilePost || 'Not specified'}`);
```

**Result**:
```
Start Location:
- Road: I-5
- Direction: Northbound
- Milepost: 167
- Coordinates: 47.7562, -122.2847
End Location:
- Road: I-5
- Direction: Northbound
- Milepost: 169
- Coordinates: 47.7589, -122.2812
```

### Example 5: Create Alert Summary for Display
**Input**:
```typescript
const alert = await getHighwayAlertById({ AlertID: 12345 });
```

**Output**:
```typescript
const alertSummary = {
  id: alert.AlertID,
  headline: alert.HeadlineDescription,
  category: alert.EventCategory,
  status: alert.EventStatus,
  priority: alert.Priority,
  location: `${alert.StartRoadwayLocation.RoadName} MP ${alert.StartRoadwayLocation.MilePost}`,
  startTime: alert.StartTime,
  endTime: alert.EndTime,
  description: alert.ExtendedDescription || alert.HeadlineDescription
};

console.log('Alert Summary:', alertSummary);
```

**Result**:
```
Alert Summary: { id: 12345, headline: "Collision on I-5 at Lake Forest Park", category: "Collision", status: "Active", priority: "High", location: "I-5 MP 167", startTime: "2025-08-15T14:30:00.000Z", endTime: "2025-08-15T20:30:00.000Z", description: "Collision on I-5 at Lake Forest Park" }
```

### Example 6: Validate Alert Data Completeness
**Input**:
```typescript
const alert = await getHighwayAlertById({ AlertID: 12345 });
```

**Output**:
```typescript
const validationResults = {
  hasValidId: alert.AlertID > 0,
  hasHeadline: alert.HeadlineDescription && alert.HeadlineDescription.length > 0,
  hasCategory: alert.EventCategory && alert.EventCategory.length > 0,
  hasStatus: alert.EventStatus && alert.EventStatus.length > 0,
  hasPriority: alert.Priority && alert.Priority.length > 0,
  hasLocation: alert.StartRoadwayLocation.RoadName && alert.StartRoadwayLocation.RoadName.length > 0,
  hasStartTime: alert.StartTime instanceof Date,
  hasCoordinates: alert.StartRoadwayLocation.Latitude !== 0 && alert.StartRoadwayLocation.Longitude !== 0
};

console.log('Data validation results:', validationResults);
```

**Result**:
```
Data validation results: { hasValidId: true, hasHeadline: true, hasCategory: true, hasStatus: true, hasPriority: true, hasLocation: true, hasStartTime: true, hasCoordinates: true }
```

### Example 7: Calculate Alert Duration
**Input**:
```typescript
const alert = await getHighwayAlertById({ AlertID: 12345 });
```

**Output**:
```typescript
if (alert.EndTime) {
  const startTime = new Date(alert.StartTime);
  const endTime = new Date(alert.EndTime);
  const durationMs = endTime.getTime() - startTime.getTime();
  const durationHours = Math.round(durationMs / (1000 * 60 * 60));
  
  console.log(`Alert duration: ${durationHours} hours`);
} else {
  console.log('Alert end time not specified');
}
```

**Result**:
```
Alert duration: 3 hours
```

### Example 8: Create Alert Map Marker Data
**Input**:
```typescript
const alert = await getHighwayAlertById({ AlertID: 12345 });
```

**Output**:
```typescript
const mapMarker = {
  id: alert.AlertID,
  title: alert.HeadlineDescription,
  position: {
    lat: alert.StartRoadwayLocation.Latitude,
    lng: alert.StartRoadwayLocation.Longitude
  },
  category: alert.EventCategory,
  priority: alert.Priority,
  status: alert.EventStatus,
  roadName: alert.StartRoadwayLocation.RoadName,
  milepost: alert.StartRoadwayLocation.MilePost
};

console.log('Map marker data prepared:', mapMarker);
```

**Result**:
```
Map marker data prepared: { id: 12345, title: "Collision on I-5 at Lake Forest Park", position: { lat: 47.7562, lng: -122.2847 }, category: "Collision", priority: "High", status: "Active", roadName: "I-5", milepost: 167 }
```

### Example 9: Generate Alert Notification Text
**Input**:
```typescript
const alert = await getHighwayAlertById({ AlertID: 12345 });
```

**Output**:
```typescript
const notificationText = `🚨 ${alert.Priority} Priority Alert: ${alert.HeadlineDescription}
📍 Location: ${alert.StartRoadwayLocation.RoadName} MP ${alert.StartRoadwayLocation.MilePost}
⏰ Started: ${new Date(alert.StartTime).toLocaleTimeString()}
📋 Status: ${alert.EventStatus}
${alert.ExtendedDescription ? `ℹ️ Details: ${alert.ExtendedDescription}` : ''}`;

console.log('Notification text:', notificationText);
```

**Result**:
```
Notification text: 🚨 High Priority Alert: Collision on I-5 at Lake Forest Park
📍 Location: I-5 MP 167
⏰ Started: 2:30:00 PM
📋 Status: Active
ℹ️ Details: Multiple vehicle collision blocking northbound lanes
```

### Example 10: Export Alert for External Systems
**Input**:
```typescript
const alert = await getHighwayAlertById({ AlertID: 12345 });
```

**Output**:
```typescript
const exportData = {
  alert_id: alert.AlertID,
  headline: alert.HeadlineDescription,
  extended_description: alert.ExtendedDescription,
  event_category: alert.EventCategory,
  event_status: alert.EventStatus,
  priority: alert.Priority,
  region: alert.Region,
  county: alert.County,
  start_time: alert.StartTime.toISOString(),
  end_time: alert.EndTime?.toISOString() || null,
  last_updated: alert.LastUpdatedTime.toISOString(),
  start_location: {
    road_name: alert.StartRoadwayLocation.RoadName,
    direction: alert.StartRoadwayLocation.Direction,
    latitude: alert.StartRoadwayLocation.Latitude,
    longitude: alert.StartRoadwayLocation.Longitude,
    milepost: alert.StartRoadwayLocation.MilePost
  },
  end_location: {
    road_name: alert.EndRoadwayLocation.RoadName,
    direction: alert.EndRoadwayLocation.Direction,
    latitude: alert.EndRoadwayLocation.Latitude,
    longitude: alert.EndRoadwayLocation.Longitude,
    milepost: alert.EndRoadwayLocation.MilePost
  }
};

console.log('Export data prepared:', exportData);
```

**Result**:
```
Export data prepared: { alert_id: 12345, headline: "Collision on I-5 at Lake Forest Park", extended_description: "Multiple vehicle collision blocking northbound lanes", event_category: "Collision", event_status: "Active", priority: "High", region: "Puget Sound", county: "King County", start_time: "2025-08-15T14:30:00.000Z", end_time: "2025-08-15T20:30:00.000Z", last_updated: "2025-08-15T15:45:00.000Z", start_location: { road_name: "I-5", direction: "Northbound", latitude: 47.7562, longitude: -122.2847, milepost: 167 }, end_location: { road_name: "I-5", direction: "Northbound", latitude: 47.7589, longitude: -122.2812, milepost: 169 } }
```

## Source References

### Official Documentation
- **[WSDOT Highway Alerts API](https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html)**: Official API documentation and specifications
- **[WSDOT Traffic Information](https://wsdot.wa.gov/traffic/)**: General traffic information and alert resources

### Implementation Code
- **[getHighwayAlertById Implementation](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/getHighwayAlertById.ts)**: Complete source code with Zod schemas
- **[Highway Alert Schemas](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/getHighwayAlertById.ts)**: Input/output validation schemas
