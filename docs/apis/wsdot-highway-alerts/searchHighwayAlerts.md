# searchHighwayAlerts

Advanced search for highway alerts with multiple filter criteria including state route, region, time range, and milepost range, providing comprehensive filtering capabilities for targeted alert retrieval and complex traffic monitoring scenarios.

## Use Cases
- Advanced traffic alert filtering with multiple criteria
- Time-based alert analysis and reporting
- Route-specific traffic monitoring
- Geographic and temporal alert correlation
- Complex search queries for transportation analysis

## Related Endpoints
- **`getHighwayAlerts`**: Get all current highway alerts
- **`getHighwayAlertsByMapArea`**: Get alerts filtered by map area
- **`getHighwayAlertsByRegionId`**: Get alerts filtered by region ID
- **`getEventCategories`**: Get available event categories

## Code Templates

### Direct API Call
```typescript
import { searchHighwayAlerts } from 'ws-dottie/api/wsdot-highway-alerts';

const alerts = await searchHighwayAlerts({
  StateRoute: 'I-5',
  Region: 'Seattle',
  SearchTimeStart: '2025-08-01',
  SearchTimeEnd: '2025-08-15'
});
console.log(`Found ${alerts.length} matching alerts`);
```

### React Query Hook
```typescript
import { useSearchHighwayAlerts } from 'ws-dottie/api/wsdot-highway-alerts';

function SearchResults({ searchParams }: { searchParams: SearchHighwayAlertsParams }) {
  const { data: alerts, isLoading, error } = useSearchHighwayAlerts(searchParams);
  
  if (isLoading) return <div>Searching alerts...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h3>Search Results</h3>
      <p>Found {alerts?.length || 0} alerts</p>
      {alerts?.map(alert => (
        <div key={alert.AlertID}>
          <h4>{alert.HeadlineDescription}</h4>
          <p>Category: {alert.EventCategory}</p>
          <p>Location: {alert.StartRoadwayLocation.RoadName}</p>
          <p>Start Time: {alert.StartTime.toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
```

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `StateRoute` | `string` | No | Optional state route identifier to filter alerts by specific highway or road. Examples include 'I-5', 'SR 520', 'US-2', or 'I-90'. When provided, only alerts for the specified route are returned. |
| `Region` | `string` | No | Optional region name to filter alerts by geographic area. Examples include 'Seattle', 'Tacoma', 'Spokane', 'Eastern Washington', or 'Western Washington'. When provided, only alerts for the specified region are returned. |
| `SearchTimeStart` | `string` | No | Optional start time for the search period in ISO date format (YYYY-MM-DD). When provided, only alerts that started on or after this date are returned. Used to limit results to recent or specific time periods. |
| `SearchTimeEnd` | `string` | No | Optional end time for the search period in ISO date format (YYYY-MM-DD). When provided, only alerts that started on or before this date are returned. Used in combination with SearchTimeStart to define a specific time range. |
| `StartingMilepost` | `number` | No | Optional starting milepost value to filter alerts by location along a highway. When provided, only alerts that start at or after this milepost are returned. Used to focus on specific highway segments. |
| `EndingMilepost` | `number` | No | Optional ending milepost value to filter alerts by location along a highway. When provided, only alerts that start at or before this milepost are returned. Used in combination with StartingMilepost to define a specific highway segment. |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `alerts[]` | `HighwayAlert[]` | Array of highway alert data filtered by the specified search criteria. Each alert contains the same comprehensive information as the base highway alert schema, including location details, event classification, timing, and descriptive text. |

## Usage Examples

### Example 1: Basic Search with Route Filter
**Input**:
```typescript
const alerts = await searchHighwayAlerts({ StateRoute: 'I-5' });
```

**Output**:
```typescript
console.log(`I-5 alerts: ${alerts.length}`);
```

**Result**:
```
I-5 alerts: 15
```

### Example 2: Regional Search
**Input**:
```typescript
const alerts = await searchHighwayAlerts({ Region: 'Seattle' });
```

**Output**:
```typescript
console.log(`Seattle region alerts: ${alerts.length}`);
```

**Result**:
```
Seattle region alerts: 8
```

### Example 3: Time-Based Search
**Input**:
```typescript
const alerts = await searchHighwayAlerts({
  SearchTimeStart: '2025-08-01',
  SearchTimeEnd: '2025-08-15'
});
```

**Output**:
```typescript
console.log(`August 1-15 alerts: ${alerts.length}`);
```

**Result**:
```
August 1-15 alerts: 23
```

### Example 4: Route and Region Combination
**Input**:
```typescript
const alerts = await searchHighwayAlerts({
  StateRoute: 'I-5',
  Region: 'Seattle'
});
```

**Output**:
```typescript
console.log(`I-5 alerts in Seattle: ${alerts.length}`);
```

**Result**:
```
I-5 alerts in Seattle: 6
```

### Example 5: Milepost Range Search
**Input**:
```typescript
const alerts = await searchHighwayAlerts({
  StateRoute: 'I-5',
  StartingMilepost: 160,
  EndingMilepost: 180
});
```

**Output**:
```typescript
console.log(`I-5 alerts MP 160-180: ${alerts.length}`);
```

**Result**:
```
I-5 alerts MP 160-180: 4
```

### Example 6: Complex Multi-Criteria Search
**Input**:
```typescript
const alerts = await searchHighwayAlerts({
  StateRoute: 'I-5',
  Region: 'Seattle',
  SearchTimeStart: '2025-08-01',
  SearchTimeEnd: '2025-08-15',
  StartingMilepost: 160,
  EndingMilepost: 180
});
```

**Output**:
```typescript
console.log(`Complex search results: ${alerts.length}`);
```

**Result**:
```
Complex search results: 2
```

### Example 7: Recent Alerts Search
**Input**:
```typescript
const today = new Date();
const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
const alerts = await searchHighwayAlerts({
  SearchTimeStart: weekAgo.toISOString().split('T')[0],
  SearchTimeEnd: today.toISOString().split('T')[0]
});
```

**Output**:
```typescript
console.log(`Last 7 days alerts: ${alerts.length}`);
```

**Result**:
```
Last 7 days alerts: 18
```

### Example 8: Route Comparison Search
**Input**:
```typescript
const i5Alerts = await searchHighwayAlerts({ StateRoute: 'I-5' });
const sr520Alerts = await searchHighwayAlerts({ StateRoute: 'SR 520' });
```

**Output**:
```typescript
const comparison = {
  'I-5': i5Alerts.length,
  'SR 520': sr520Alerts.length,
  total: i5Alerts.length + sr520Alerts.length
};
console.log('Route comparison:', comparison);
```

**Result**:
```
Route comparison: { "I-5": 15, "SR 520": 8, total: 23 }
```

### Example 9: Geographic and Temporal Analysis
**Input**:
```typescript
const seattleRecentAlerts = await searchHighwayAlerts({
  Region: 'Seattle',
  SearchTimeStart: '2025-08-01',
  SearchTimeEnd: '2025-08-15'
});
```

**Output**:
```typescript
const categoryBreakdown = seattleRecentAlerts.reduce((acc, alert) => {
  acc[alert.EventCategory] = (acc[alert.EventCategory] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log('Seattle recent alerts by category:', categoryBreakdown);
```

**Result**:
```
Seattle recent alerts by category: { Collision: 3, Construction: 3, Weather: 1, "Special Event": 1 }
```

### Example 10: Advanced Search with Validation
**Input**:
```typescript
const searchParams = {
  StateRoute: 'I-5',
  Region: 'Seattle',
  SearchTimeStart: '2025-08-01',
  SearchTimeEnd: '2025-08-15'
};

// Validate search parameters
const hasValidParams = Object.values(searchParams).some(value => value !== undefined);
if (!hasValidParams) {
  console.log('No search parameters provided, using simple endpoint');
}

const alerts = await searchHighwayAlerts(searchParams);
```

**Output**:
```typescript
const searchSummary = {
  parameters: searchParams,
  results: alerts.length,
  hasResults: alerts.length > 0,
  categories: [...new Set(alerts.map(alert => alert.EventCategory))],
  routes: [...new Set(alerts.map(alert => alert.StartRoadwayLocation.RoadName))]
};

console.log('Search summary:', searchSummary);
```

**Result**:
```
Search summary: { parameters: { StateRoute: "I-5", Region: "Seattle", SearchTimeStart: "2025-08-01", SearchTimeEnd: "2025-08-15" }, results: 6, hasResults: true, categories: ["Collision", "Construction", "Weather"], routes: ["I-5"] }
```

## Source References

### Official Documentation
- **[WSDOT Highway Alerts API](https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html)**: Official API documentation and specifications
- **[WSDOT Traffic Information](https://wsdot.wa.gov/traffic/)**: General traffic information and alert resources

### Implementation Code
- **[searchHighwayAlerts Implementation](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/searchHighwayAlerts.ts)**: Complete source code with Zod schemas
- **[Highway Alert Schemas](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/getHighwayAlerts.ts)**: Input/output validation schemas
