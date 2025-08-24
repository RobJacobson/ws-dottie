# getMapAreas

Retrieves all available geographic map areas used for filtering highway alerts by location, enabling applications to provide region-specific traffic information and localized alert filtering.

## Why Map Areas Matter

Geographic filtering is essential for effective traffic management because:

- **Local Relevance**: Users only care about traffic conditions in areas they're traveling through
- **Regional Planning**: Transportation agencies need to focus on specific geographic regions
- **User Experience**: Applications can provide relevant information without overwhelming users with distant alerts
- **Resource Allocation**: Emergency services can prioritize responses based on geographic impact
- **Navigation Context**: Route planning requires understanding conditions in specific travel corridors

## How Map Areas Work with Other Endpoints

Map areas provide the geographic foundation for the highway alerts system:

- **`getHighwayAlertsByMapArea`** - Use these area identifiers to filter alerts by specific geographic regions
- **`getHighwayAlerts`** - Combine with map area filtering to create focused alert views
- **`searchHighwayAlerts`** - Include geographic constraints in search queries
- **`getHighwayAlertsByRegionId`** - Alternative geographic filtering using region IDs

## Use Cases
- Building geographic filtering systems for highway alerts
- Creating region-specific traffic monitoring dashboards
- Developing location-aware navigation applications
- Supporting transportation planning by geographic area
- Enabling emergency response coordination by region

## Related Endpoints
- **`getHighwayAlertsByMapArea`**: Filter alerts by specific map area identifiers
- **`getHighwayAlertsByRegionId`**: Alternative geographic filtering using region IDs
- **`getHighwayAlerts`**: Get all alerts, then filter by map area programmatically

## Code Templates

### Direct API Call
```typescript
import { getMapAreas } from 'ws-dottie/api/wsdot-highway-alerts';

const mapAreas = await getMapAreas();
console.log(`Available map areas: ${mapAreas.length}`);
```

### React Query Hook
```typescript
import { useMapAreas } from 'ws-dottie/api/wsdot-highway-alerts';

function MapAreaSelector() {
  const { data: mapAreas, isLoading, error } = useMapAreas();
  
  if (isLoading) return <div>Loading map areas...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h3>Select Geographic Area</h3>
      <select>
        <option value="">All Areas</option>
        {mapAreas?.map(area => (
          <option key={area.MapAreaId} value={area.MapAreaId}>
            {area.MapAreaName}
          </option>
        ))}
      </select>
    </div>
  );
}
```

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *None* | *None* | *None* | No parameters required. The API returns all available geographic map areas used for filtering highway alerts. |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `MapAreaId` | `number` | Unique identifier for the geographic map area |
| `MapAreaName` | `string` | Human-readable name of the geographic area (e.g., "Seattle Metro", "Spokane Region") |
| `Description` | `string` | Detailed description of the geographic area and its boundaries |
| `IsActive` | `boolean` | Indicates whether this map area is currently active and available for filtering |

## Usage Examples

### Example 1: Build Geographic Filter Interface
**Input**:
```typescript
const mapAreas = await getMapAreas();
```

**Output**:
```typescript
const areaOptions = mapAreas
  .filter(area => area.IsActive)
  .map(area => ({
    value: area.MapAreaId,
    label: area.MapAreaName,
    description: area.Description
  }));
console.log('Active map areas loaded:', areaOptions.length);
```

**Result**:
```
Active map areas loaded: 12
```

### Example 2: Set Up Regional Monitoring
**Input**:
```typescript
const mapAreas = await getMapAreas();
```

**Output**:
```typescript
const monitoringRegions = mapAreas
  .filter(area => area.IsActive)
  .map(area => ({
    areaId: area.MapAreaId,
    areaName: area.MapAreaName,
    enabled: true,
    alertCount: 0
  }));
console.log('Regional monitoring configured for all active areas');
```

**Result**:
```
Regional monitoring configured for all active areas
```

### Example 3: Create Geographic Alert Summary
**Input**:
```typescript
const mapAreas = await getMapAreas();
```

**Output**:
```typescript
const areaSummary = mapAreas.reduce((summary, area) => {
  summary[area.MapAreaName] = {
    id: area.MapAreaId,
    active: area.IsActive,
    alertCount: 0
  };
  return summary;
}, {});
console.log('Geographic alert summary structure created');
```

**Result**:
```
Geographic alert summary structure created
```

## Source References

### Official Documentation
- **[WSDOT Highway Alerts API](https://wsdot.wa.gov/apis/highway-alerts/)**: Official API documentation and specifications
- **[WSDOT Traffic Information](https://wsdot.wa.gov/traffic/)**: General traffic information and geographic resources

### Implementation Code
- **[getMapAreas Implementation](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/getMapAreas.ts)**: Complete source code with Zod schemas
- **[Highway Alerts Schemas](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/outputs.ts)**: Input/output validation schemas
