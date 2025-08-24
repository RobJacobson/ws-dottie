# getEventCategories

Retrieves all available event categories used to classify highway alerts and traffic events, providing the foundation for filtering and organizing traffic incident data.

## Why Event Categories Matter

Event categories are the backbone of any effective traffic alert system. They enable users to:

- **Filter alerts by type** - Show only construction alerts when planning a route, or focus on weather-related incidents during storms
- **Prioritize responses** - Emergency services can quickly identify critical incidents like collisions or road closures
- **Build user interfaces** - Create intuitive category-based navigation and filtering systems
- **Generate reports** - Analyze traffic patterns by incident type for transportation planning
- **Set up monitoring** - Configure alerts for specific categories that matter to your application

## How Categories Work with Other Endpoints

The event categories returned by this endpoint are used throughout the highway alerts system:

- **`getHighwayAlerts`** - Each alert includes an `EventCategory` field that matches one of these categories
- **`searchHighwayAlerts`** - Use category names to build advanced search queries
- **`getHighwayAlertsByMapArea`** - Filter alerts by geographic area, then further refine by category
- **`getHighwayAlertsByRegionId`** - Combine regional filtering with category-based analysis

## Use Cases
- Building category-based filtering systems for highway alerts
- Creating dropdown menus and filter interfaces for traffic applications
- Understanding the scope of traffic event types available
- Setting up alert monitoring systems by category
- Data analysis and reporting by event type

## Related Endpoints
- **`getHighwayAlerts`**: Get all current highway alerts - each alert includes an `EventCategory` field that corresponds to one of these categories
- **`searchHighwayAlerts`**: Use these category names as search criteria to find specific types of incidents
- **`getHighwayAlertsByMapArea`**: Filter alerts by geographic area first, then use categories to further refine results

## Code Templates

### Direct API Call
```typescript
import { getEventCategories } from 'ws-dottie/api/wsdot-highway-alerts';

const categories = await getEventCategories();
console.log(`Available categories: ${categories.length}`);
```

### React Query Hook
```typescript
import { useEventCategories } from 'ws-dottie/api/wsdot-highway-alerts';

function CategoryFilter() {
  const { data: categories, isLoading, error } = useEventCategories();
  
  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h3>Filter by Event Category</h3>
      <select>
        <option value="">All Categories</option>
        {categories?.map(category => (
          <option key={category} value={category}>
            {category}
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
| *None* | *None* | *None* | No parameters required. The API returns all available event categories used by highway alerts. |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `categories[]` | `string[]` | Array of event category strings used to classify highway alerts and traffic events. Examples include 'Collision', 'Construction', 'Weather', 'Special Event', 'Road Closure', 'Maintenance', and 'Other'. |

## Usage Examples

### Example 1: Build a Category Filter Interface
**Input**:
```typescript
const categories = await getEventCategories();
```

**Output**:
```typescript
const filterOptions = categories.map(category => ({
  value: category.toLowerCase(),
  label: category,
  count: 0 // Will be populated with actual alert counts
}));
console.log('Filter options created:', filterOptions.length);
```

**Result**:
```
Filter options created: 8
```

### Example 2: Set Up Category-Based Monitoring
**Input**:
```typescript
const categories = await getEventCategories();
```

**Output**:
```typescript
const criticalCategories = ['Collision', 'Road Closure', 'Weather'];
const monitoringSetup = criticalCategories.map(category => ({
  category,
  enabled: true,
  alertThreshold: category === 'Weather' ? 5 : 1
}));
console.log('Monitoring setup complete for critical categories');
```

**Result**:
```
Monitoring setup complete for critical categories
```

### Example 3: Create Category Statistics Dashboard
**Input**:
```typescript
const categories = await getEventCategories();
```

**Output**:
```typescript
const categoryStats = categories.reduce((acc, category) => {
  acc[category] = { count: 0, lastUpdated: null };
  return acc;
}, {});
console.log('Category statistics structure initialized');
```

**Result**:
```
Category statistics structure initialized
```

## Source References

### Official Documentation
- **[WSDOT Highway Alerts API](https://wsdot.wa.gov/apis/highway-alerts/)**: Official API documentation and specifications
- **[WSDOT Traffic Information](https://wsdot.wa.gov/traffic/)**: General traffic information and alert resources

### Implementation Code
- **[getEventCategories Implementation](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/getEventCategories.ts)**: Complete source code with Zod schemas
- **[Highway Alerts Schemas](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-highway-alerts/outputs.ts)**: Input/output validation schemas
