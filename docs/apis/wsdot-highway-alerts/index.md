# WSDOT Highway Alerts API

The WSDOT Highway Alerts API provides real-time information about traffic incidents, construction activities, weather-related issues, and other events affecting Washington State's highway system. This API is the foundation for traffic monitoring applications, navigation systems, and transportation management tools.

## Why This API Matters

Highway alerts directly impact:
- **Public Safety**: Real-time incident information helps drivers avoid dangerous conditions
- **Traffic Management**: Transportation agencies can monitor and respond to traffic disruptions
- **Navigation Systems**: GPS and mapping applications provide current route conditions
- **Emergency Response**: First responders receive immediate notification of traffic incidents
- **Travel Planning**: Commuters can plan routes around current traffic conditions

## Common Use Cases
- **Traffic Monitoring Applications**: Display current incidents and alerts on maps and dashboards
- **Navigation Systems**: Provide real-time route updates based on current traffic conditions
- **Transportation Management**: Monitor and respond to traffic disruptions across the highway network
- **Emergency Response**: Coordinate emergency services and traffic control during incidents
- **Travel Information**: Provide current conditions to travelers and commuters

## Available Endpoints
| Endpoint | Description | Parameters |
|----------|-------------|------------|
| `getEventCategories` | Retrieve all available event categories | None |
| `getHighwayAlerts` | Get all current highway alerts | None |
| `getHighwayAlertById` | Get specific alert by ID | `alertId` (number) |
| `getHighwayAlertsByMapArea` | Filter alerts by geographic area | `mapArea` (string) |
| `getHighwayAlertsByRegionId` | Filter alerts by region | `regionId` (number) |
| `getMapAreas` | Get available geographic areas | None |
| `searchHighwayAlerts` | Search alerts by criteria | `searchParams` (object) |

## Quick Start
```typescript
import { getHighwayAlerts } from 'ws-dottie/api/wsdot-highway-alerts';

const alerts = await getHighwayAlerts();
console.log(`Found ${alerts.length} current highway alerts`);

// Find critical incidents
const criticalAlerts = alerts.filter(alert => 
  alert.EventCategory === 'Collision' || alert.EventCategory === 'Road Closure'
);
console.log(`${criticalAlerts.length} critical alerts requiring attention`);
```

## Related APIs
- **WSDOT Traffic Flow**: For real-time traffic data and congestion information
- **WSDOT Travel Times**: For route-specific travel time calculations
- **WSDOT Highway Cameras**: For visual verification of traffic conditions
- **WSDOT Weather Information**: For weather-related traffic impacts

## Data Coverage
The API provides comprehensive coverage of:
- **Traffic Incidents**: Collisions, breakdowns, and other roadway incidents
- **Construction Activities**: Road work, lane closures, and construction delays
- **Weather Conditions**: Weather-related impacts on highway operations
- **Special Events**: Planned events affecting traffic flow
- **Maintenance Activities**: Scheduled maintenance and temporary restrictions

This real-time data enables applications to provide current traffic information and help users make informed travel decisions.
