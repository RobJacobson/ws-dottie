# getCommercialVehicleRestrictions

Retrieves comprehensive commercial vehicle restriction data including weight limits, bridge restrictions, height limitations, and other constraints across Washington State highways.

## Use Cases
- Route planning for commercial vehicles to avoid restricted areas
- Compliance monitoring for weight, height, and dimension limits
- Bridge and infrastructure safety management
- Transportation logistics and delivery planning
- Real-time restriction updates for navigation applications

## Related Endpoints
- **`getCommercialVehicleRestrictionsWithId`**: Get restrictions with unique identifiers
- **`getBridgeClearances`**: For bridge height and clearance information
- **`getHighwayAlerts`**: For traffic incident and restriction alerts

## Code Templates

### Direct API Call
```typescript
import { getCommercialVehicleRestrictions } from 'ws-dottie/api/wsdot-commercial-vehicle-restrictions';

const restrictions = await getCommercialVehicleRestrictions({});
console.log(`Found ${restrictions.length} restrictions`);
```

### React Query Hook
```typescript
import { useCommercialVehicleRestrictions } from 'ws-dottie/api/wsdot-commercial-vehicle-restrictions';

function RestrictionsDisplay() {
  const { data: restrictions, isLoading, error } = useCommercialVehicleRestrictions({});
  
  if (isLoading) return <div>Loading restrictions...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h3>Commercial Vehicle Restrictions</h3>
      <p>Total restrictions: {restrictions?.length || 0}</p>
      {restrictions?.map(restriction => (
        <div key={restriction.BridgeNumber}>
          <h4>{restriction.BridgeName}</h4>
          <p>Location: {restriction.LocationName}</p>
          <p>Weight Limit: {restriction.MaximumGrossVehicleWeightInPounds} lbs</p>
        </div>
      ))}
    </div>
  );
}
```

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *None* | *None* | *None* | No parameters required. The API returns all available commercial vehicle restriction data across Washington State highways. |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `BridgeName` | `string` | Name of the bridge or structure where the restriction applies |
| `BridgeNumber` | `string` | Unique identifier assigned to the bridge by WSDOT |
| `LocationName` | `string` | Human-readable name for the restriction location |
| `LocationDescription` | `string` | Detailed description of the restriction location and context |
| `State` | `string` | State where the restriction is located (Washington) |
| `StateRouteID` | `string` | Official Washington State route identifier |
| `Latitude` | `number` | Latitude coordinate of the restriction location |
| `Longitude` | `number` | Longitude coordinate of the restriction location |
| `MilePost` | `number` | Milepost marker indicating distance along the highway |
| `RoadName` | `string` | Name of the highway or road where the restriction is located |
| `Direction` | `string \| null` | Direction of travel indicator for the roadway location |
| `MaximumGrossVehicleWeightInPounds` | `number \| null` | Maximum total vehicle weight in pounds allowed |
| `RestrictionWeightInPounds` | `number \| null` | Maximum vehicle weight in pounds allowed |
| `RestrictionHeightInInches` | `number \| null` | Maximum vehicle height in inches allowed |
| `RestrictionLengthInInches` | `number \| null` | Maximum vehicle length in inches allowed |
| `RestrictionWidthInInches` | `number \| null` | Maximum vehicle width in inches allowed |
| `SAMaxAxle` | `number \| null` | Maximum axle weight limit for single-axle configurations |
| `TDMaxAxle` | `number \| null` | Maximum axle weight limit for triple-axle configurations |
| `BLMaxAxle` | `number \| null` | Maximum axle weight limit for B-train configurations |
| `CL8MaxAxle` | `number \| null` | Maximum axle weight limit for CL8 configurations |
| `VehicleType` | `string` | Type of commercial vehicle the restriction applies to |
| `RestrictionType` | `number` | Numeric code indicating the type of restriction |
| `IsPermanentRestriction` | `boolean` | Whether the restriction is permanent or temporary |
| `DateEffective` | `Date` | Date when the restriction becomes effective |
| `DateExpires` | `Date` | Date when the restriction expires |
| `DatePosted` | `Date` | Date when the restriction was posted |
| `IsDetourAvailable` | `boolean` | Whether an official detour route is available |
| `IsExceptionsAllowed` | `boolean` | Whether exceptions to the restriction are allowed |
| `IsWarning` | `boolean` | Whether this is a warning advisory rather than enforceable |
| `RestrictionComment` | `string` | Additional comments or notes about the restriction |
| `StartRoadwayLocation` | `object` | Geographic starting point of the restriction zone |
| `EndRoadwayLocation` | `object` | Geographic endpoint of the restriction zone |

## Usage Examples

### Example 1: Basic Restrictions Retrieval
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictions({});
```

**Output**:
```typescript
console.log(`Total restrictions: ${restrictions.length}`);
```

**Result**:
```
Total restrictions: 47
```

### Example 2: Find Bridge-Specific Restrictions
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictions({});
const bridgeRestrictions = restrictions.filter(r => r.BridgeName.includes('Bridge'));
```

**Output**:
```typescript
console.log(`Bridge restrictions: ${bridgeRestrictions.length}`);
```

**Result**:
```
Bridge restrictions: 23
```

### Example 3: Weight Limit Analysis
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictions({});
const weightRestrictions = restrictions.filter(r => r.MaximumGrossVehicleWeightInPounds !== null);
```

**Output**:
```typescript
const avgWeightLimit = weightRestrictions.reduce((sum, r) => sum + r.MaximumGrossVehicleWeightInPounds!, 0) / weightRestrictions.length;
console.log(`Average weight limit: ${Math.round(avgWeightLimit)} lbs`);
```

**Result**:
```
Average weight limit: 80000 lbs
```

### Example 4: Geographic Restriction Mapping
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictions({});
const seattleRestrictions = restrictions.filter(r => 
  r.Latitude >= 47.5 && r.Latitude <= 47.8 && 
  r.Longitude >= -122.5 && r.Longitude <= -122.2
);
```

**Output**:
```typescript
console.log(`Seattle area restrictions: ${seattleRestrictions.length}`);
```

**Result**:
```
Seattle area restrictions: 8
```

### Example 5: Temporary vs Permanent Restrictions
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictions({});
const tempRestrictions = restrictions.filter(r => !r.IsPermanentRestriction);
const permRestrictions = restrictions.filter(r => r.IsPermanentRestriction);
```

**Output**:
```typescript
console.log(`Temporary: ${tempRestrictions.length}, Permanent: ${permRestrictions.length}`);
```

**Result**:
```
Temporary: 12, Permanent: 35
```

### Example 6: Route-Specific Restrictions
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictions({});
const i5Restrictions = restrictions.filter(r => r.StateRouteID === '005');
```

**Output**:
```typescript
console.log(`I-5 restrictions: ${i5Restrictions.length}`);
```

**Result**:
```
I-5 restrictions: 15
```

### Example 7: Height and Width Restrictions
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictions({});
const dimensionRestrictions = restrictions.filter(r => 
  r.RestrictionHeightInInches !== null || r.RestrictionWidthInInches !== null
);
```

**Output**:
```typescript
console.log(`Dimension restrictions: ${dimensionRestrictions.length}`);
```

**Result**:
```
Dimension restrictions: 18
```

### Example 8: Detour Availability Check
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictions({});
const detourAvailable = restrictions.filter(r => r.IsDetourAvailable);
const noDetour = restrictions.filter(r => !r.IsDetourAvailable);
```

**Output**:
```typescript
console.log(`Detours available: ${detourAvailable.length}, No detour: ${noDetour.length}`);
```

**Result**:
```
Detours available: 31, No detour: 16
```

### Example 9: Exception Policy Analysis
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictions({});
const exceptionsAllowed = restrictions.filter(r => r.IsExceptionsAllowed);
const noExceptions = restrictions.filter(r => !r.IsExceptionsAllowed);
```

**Output**:
```typescript
console.log(`Exceptions allowed: ${exceptionsAllowed.length}, No exceptions: ${noExceptions.length}`);
```

**Result**:
```
Exceptions allowed: 28, No exceptions: 19
```

### Example 10: Warning vs Enforceable Restrictions
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictions({});
const warnings = restrictions.filter(r => r.IsWarning);
const enforceable = restrictions.filter(r => !r.IsWarning);
```

**Output**:
```typescript
console.log(`Warnings: ${warnings.length}, Enforceable: ${enforceable.length}`);
```

**Result**:
```
Warnings: 5, Enforceable: 42
```

## Source References

### Official Documentation
- **[WSDOT Commercial Vehicle Restrictions API](https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html)**: Official API documentation and specifications
- **[WSDOT Traffic Information](https://wsdot.wa.gov/traffic/)**: General traffic information and restriction resources

### Implementation Code
- **[getCommercialVehicleRestrictions Implementation](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-commercial-vehicle-restrictions/getCommercialVehicleRestrictions.ts)**: Complete source code with Zod schemas
- **[Commercial Vehicle Restriction Schemas](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-commercial-vehicle-restrictions/getCommercialVehicleRestrictions.ts)**: Input/output validation schemas
