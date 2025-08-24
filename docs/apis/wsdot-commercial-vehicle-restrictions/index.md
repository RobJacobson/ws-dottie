# WSDOT Commercial Vehicle Restrictions API

The WSDOT Commercial Vehicle Restrictions API provides comprehensive information about vehicle size, weight, and access restrictions across Washington State's transportation network. This API is essential for commercial vehicle route planning, compliance monitoring, and transportation safety management.

## Why This API Matters

Commercial vehicle restrictions directly impact:
- **Route Planning**: Enables trucking companies to plan compliant routes that avoid restricted areas
- **Safety Compliance**: Prevents violations and ensures vehicles meet size and weight requirements
- **Operational Efficiency**: Reduces delays and detours by providing accurate restriction information
- **Regulatory Compliance**: Helps carriers maintain compliance with Washington State transportation regulations
- **Infrastructure Protection**: Prevents damage to roads and bridges by enforcing vehicle restrictions

## Common Use Cases
- **Commercial Route Planning**: Build applications that automatically route trucks around restricted areas
- **Compliance Monitoring**: Create systems that verify vehicle compliance before route assignment
- **Restriction Mapping**: Develop comprehensive maps showing all vehicle restrictions across the state
- **Regulatory Reporting**: Generate reports on restriction compliance and enforcement
- **Emergency Response**: Enable emergency services to route oversized vehicles safely

## Available Endpoints
| Endpoint | Description | Parameters |
|----------|-------------|------------|
| `getCommercialVehicleRestrictions` | Retrieve all commercial vehicle restrictions | None |
| `getCommercialVehicleRestrictionsWithId` | Get specific restriction by ID | `restrictionId` (number) |

## Quick Start
```typescript
import { getCommercialVehicleRestrictions } from 'ws-dottie/api/wsdot-commercial-vehicle-restrictions';

const restrictions = await getCommercialVehicleRestrictions();
console.log(`Found ${restrictions.length} vehicle restrictions`);

// Find restrictions by vehicle type
const truckRestrictions = restrictions.filter(restriction => 
  restriction.VehicleType.includes('Truck')
);
console.log(`${truckRestrictions.length} truck-specific restrictions found`);
```

## Related APIs
- **WSDOT Bridge Clearances**: For height and weight restrictions on bridges
- **WSDOT Highway Alerts**: For temporary restrictions and road closures
- **WSDOT Traffic Flow**: For real-time traffic conditions affecting commercial vehicles

## Data Coverage
The API covers all commercial vehicle restrictions including:
- **Vehicle Size Limits**: Height, width, and length restrictions
- **Weight Restrictions**: Axle weight and gross vehicle weight limits
- **Access Restrictions**: Time-of-day and seasonal access limitations
- **Route Restrictions**: Specific highway and bridge access limitations
- **Special Permits**: Requirements for oversized or overweight vehicles

This comprehensive data enables commercial vehicle operators to plan safe, compliant routes throughout Washington State.
