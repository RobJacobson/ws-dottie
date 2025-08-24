# WSDOT Border Crossings API

The WSDOT Border Crossings API provides real-time wait time information for all border crossings between Washington State and Canada. This API is essential for travel applications, border monitoring systems, and transportation planning that requires current border crossing conditions.

## Why This API Matters

Border crossing wait times directly impact:
- **Travel Planning**: Commuters and travelers need real-time information to choose optimal crossing times
- **Commercial Operations**: Trucking companies and logistics providers require accurate wait time data for route optimization
- **Emergency Response**: Border agencies need current status information for operational planning
- **Tourism and Commerce**: Cross-border businesses and visitors depend on reliable crossing information

## Common Use Cases
- **Travel Applications**: Display current wait times to help users choose optimal crossing times
- **Border Monitoring Dashboards**: Real-time status monitoring for transportation agencies and border services
- **Commercial Vehicle Planning**: Route optimization for trucks and commercial vehicles crossing the border
- **Emergency Response**: Current border status for emergency services and border patrol operations
- **Tourism Information**: Real-time crossing conditions for visitors and tourism applications

## Available Endpoints
| Endpoint | Description | Parameters |
|----------|-------------|------------|
| `getBorderCrossings` | Retrieve real-time wait times for all border crossings | None |

## Quick Start
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

## Related APIs
- **WSDOT Highway Alerts**: For traffic incidents affecting border approaches
- **WSDOT Traffic Flow**: For real-time traffic data on routes to border crossings
- **WSDOT Travel Times**: For route-specific travel information to border crossings

## Data Refresh
Border crossing data is updated in real-time by WSDOT, providing current wait times and operational status for all major crossings between Washington State and Canada.
