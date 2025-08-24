# WSDOT Bridge Clearances API

The WSDOT Bridge Clearances API provides comprehensive bridge clearance data for Washington State routes, including height restrictions, location information, and structural details. This API is critical for commercial vehicle route planning, preventing bridge strikes, and supporting transportation infrastructure management.

## Why This API Matters

Bridge clearance data directly impacts:
- **Commercial Vehicle Safety**: Prevents costly and dangerous bridge strikes by providing accurate height restrictions
- **Route Planning**: Enables trucking companies to plan efficient routes that avoid low-clearance bridges
- **Infrastructure Management**: Supports WSDOT's bridge maintenance and safety programs
- **Emergency Response**: Provides critical information for oversized vehicle routing during emergencies
- **Transportation Planning**: Essential data for long-term infrastructure planning and development

## Common Use Cases
- **Commercial Vehicle Route Planning**: Build applications that automatically route trucks around low-clearance bridges
- **Bridge Management Systems**: Create comprehensive bridge monitoring and maintenance applications
- **Safety Alert Systems**: Provide real-time warnings to drivers approaching height-restricted bridges
- **Transportation Planning**: Support infrastructure planning and development decisions
- **Emergency Response**: Enable emergency services to route oversized vehicles safely

## Available Endpoints
| Endpoint | Description | Parameters |
|----------|-------------|------------|
| `getBridgeClearances` | Retrieve bridge clearance data for a specific WSDOT route | `route` (string) |

## Quick Start
```typescript
import { getBridgeClearances } from 'ws-dottie/api/wsdot-bridge-clearances';

const clearances = await getBridgeClearances({ route: "005" });
console.log(`Found ${clearances.length} bridges on I-5`);

// Find bridges with clearance issues
const lowClearanceBridges = clearances.filter(bridge => 
  bridge.VerticalClearanceMinimumInches < 168 // Less than 14 feet
);
console.log(`${lowClearanceBridges.length} bridges have clearance under 14 feet`);
```

## Related APIs
- **WSDOT Highway Alerts**: For traffic incidents affecting bridge access
- **WSDOT Traffic Flow**: For real-time traffic data on bridge approaches
- **WSDOT Commercial Vehicle Restrictions**: For additional vehicle routing constraints

## Data Coverage
The API covers all major Washington State routes including:
- **Interstates**: I-5, I-90, I-405, I-82, I-182
- **State Routes**: SR 20, SR 101, SR 2, SR 97, SR 395
- **US Highways**: US 2, US 12, US 97, US 395

Each bridge record includes precise location data, clearance measurements, and structural information essential for safe commercial vehicle operations.
