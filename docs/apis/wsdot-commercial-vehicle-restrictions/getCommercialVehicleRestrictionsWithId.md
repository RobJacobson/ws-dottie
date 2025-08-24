# getCommercialVehicleRestrictionsWithId

Retrieves commercial vehicle restriction data with unique identifiers, providing the same comprehensive restriction information as the base endpoint plus permanent unique IDs for system integration and data management.

## Use Cases
- System integration requiring unique identifiers for each restriction
- Data correlation across multiple WSDOT systems
- Tracking and reporting on specific restrictions over time
- Database synchronization and data management
- Audit trails and compliance monitoring

## Related Endpoints
- **`getCommercialVehicleRestrictions`**: Get restrictions without unique IDs
- **`getBridgeClearances`**: For bridge height and clearance information
- **`getHighwayAlerts`**: For traffic incident and restriction alerts

## Code Templates

### Direct API Call
```typescript
import { getCommercialVehicleRestrictionsWithId } from 'ws-dottie/api/wsdot-commercial-vehicle-restrictions';

const restrictions = await getCommercialVehicleRestrictionsWithId({});
console.log(`Found ${restrictions.length} restrictions with IDs`);
```

### React Query Hook
```typescript
import { useCommercialVehicleRestrictionsWithId } from 'ws-dottie/api/wsdot-commercial-vehicle-restrictions';

function RestrictionsWithIdDisplay() {
  const { data: restrictions, isLoading, error } = useCommercialVehicleRestrictionsWithId({});
  
  if (isLoading) return <div>Loading restrictions...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h3>Commercial Vehicle Restrictions with IDs</h3>
      <p>Total restrictions: {restrictions?.length || 0}</p>
      {restrictions?.map(restriction => (
        <div key={restriction.UniqueID}>
          <h4>ID: {restriction.UniqueID} - {restriction.BridgeName}</h4>
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
| *None* | *None* | *None* | No parameters required. The API returns all available commercial vehicle restriction data with unique identifiers across Washington State highways. |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `UniqueID` | `string` | Unique identifier assigned to this restriction by the WSDOT system |
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

### Example 1: Basic Retrieval with IDs
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictionsWithId({});
```

**Output**:
```typescript
console.log(`Total restrictions: ${restrictions.length}`);
```

**Result**:
```
Total restrictions: 47
```

### Example 2: Find Specific Restriction by ID
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictionsWithId({});
const specificRestriction = restrictions.find(r => r.UniqueID === '12345');
```

**Output**:
```typescript
if (specificRestriction) {
  console.log(`Found: ${specificRestriction.BridgeName} at ${specificRestriction.LocationName}`);
}
```

**Result**:
```
Found: Aurora Bridge at Downtown Seattle
```

### Example 3: Create ID-Based Lookup Map
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictionsWithId({});
const restrictionMap = new Map(
  restrictions.map(r => [r.UniqueID, r])
);
```

**Output**:
```typescript
console.log(`Lookup map created with ${restrictionMap.size} entries`);
```

**Result**:
```
Lookup map created with 47 entries
```

### Example 4: Track Restriction Changes Over Time
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictionsWithId({});
const recentRestrictions = restrictions.filter(r => 
  new Date(r.DatePosted) > new Date('2025-01-01')
);
```

**Output**:
```typescript
console.log(`Recent restrictions: ${recentRestrictions.length}`);
recentRestrictions.forEach(r => {
  console.log(`ID ${r.UniqueID}: ${r.BridgeName} posted ${r.DatePosted}`);
});
```

**Result**:
```
Recent restrictions: 3
ID 12345: Aurora Bridge posted 2025-01-15T00:00:00.000Z
ID 12346: Tacoma Narrows Bridge posted 2025-01-20T00:00:00.000Z
ID 12347: Floating Bridge posted 2025-02-01T00:00:00.000Z
```

### Example 5: Export Restrictions with IDs for External Systems
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictionsWithId({});
const exportData = restrictions.map(r => ({
  id: r.UniqueID,
  name: r.BridgeName,
  location: r.LocationName,
  weightLimit: r.MaximumGrossVehicleWeightInPounds,
  coordinates: { lat: r.Latitude, lng: r.Longitude }
}));
```

**Output**:
```typescript
console.log(`Exported ${exportData.length} restrictions`);
console.log(JSON.stringify(exportData[0], null, 2));
```

**Result**:
```
Exported 47 restrictions
{
  "id": "12345",
  "name": "Aurora Bridge",
  "location": "Downtown Seattle",
  "weightLimit": 80000,
  "coordinates": {
    "lat": 47.6321,
    "lng": -122.3567
  }
}
```

### Example 6: Analyze Restrictions by Unique ID Patterns
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictionsWithId({});
const idPatterns = restrictions.reduce((acc, r) => {
  const prefix = r.UniqueID.substring(0, 2);
  acc[prefix] = (acc[prefix] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
```

**Output**:
```typescript
console.log('ID prefix distribution:', idPatterns);
```

**Result**:
```
ID prefix distribution: { "12": 23, "13": 15, "14": 9 }
```

### Example 7: Create Restriction Database Records
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictionsWithId({});
const dbRecords = restrictions.map(r => ({
  restriction_id: r.UniqueID,
  bridge_name: r.BridgeName,
  bridge_number: r.BridgeNumber,
  location_name: r.LocationName,
  latitude: r.Latitude,
  longitude: r.Longitude,
  weight_limit: r.MaximumGrossVehicleWeightInPounds,
  is_permanent: r.IsPermanentRestriction,
  effective_date: r.DateEffective,
  expires_date: r.DateExpires
}));
```

**Output**:
```typescript
console.log(`Database records prepared: ${dbRecords.length}`);
```

**Result**:
```
Database records prepared: 47
```

### Example 8: Monitor Specific Restrictions by ID
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictionsWithId({});
const monitoredIds = ['12345', '12346', '12347'];
const monitoredRestrictions = restrictions.filter(r => 
  monitoredIds.includes(r.UniqueID)
);
```

**Output**:
```typescript
monitoredRestrictions.forEach(r => {
  console.log(`ID ${r.UniqueID}: ${r.BridgeName} - Status: ${r.IsPermanentRestriction ? 'Permanent' : 'Temporary'}`);
});
```

**Result**:
```
ID 12345: Aurora Bridge - Status: Permanent
ID 12346: Tacoma Narrows Bridge - Status: Temporary
ID 12347: Floating Bridge - Status: Permanent
```

### Example 9: Generate Restriction Reports by ID
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictionsWithId({});
const reportData = restrictions.map(r => ({
  id: r.UniqueID,
  bridge: r.BridgeName,
  route: r.StateRouteID,
  weight: r.MaximumGrossVehicleWeightInPounds,
  height: r.RestrictionHeightInInches,
  length: r.RestrictionLengthInInches,
  width: r.RestrictionWidthInInches,
  detour: r.IsDetourAvailable,
  exceptions: r.IsExceptionsAllowed
}));
```

**Output**:
```typescript
console.log(`Report generated for ${reportData.length} restrictions`);
```

**Result**:
```
Report generated for 47 restrictions
```

### Example 10: Validate Restriction Data Integrity
**Input**:
```typescript
const restrictions = await getCommercialVehicleRestrictionsWithId({});
const validationResults = restrictions.map(r => ({
  id: r.UniqueID,
  hasValidId: r.UniqueID && r.UniqueID.length > 0,
  hasValidCoordinates: r.Latitude && r.Longitude,
  hasValidDates: r.DateEffective && r.DateExpires,
  hasValidBridgeInfo: r.BridgeName && r.BridgeNumber
}));
```

**Output**:
```typescript
const validRestrictions = validationResults.filter(r => 
  r.hasValidId && r.hasValidCoordinates && r.hasValidDates && r.hasValidBridgeInfo
);
console.log(`Valid restrictions: ${validRestrictions.length}/${restrictions.length}`);
```

**Result**:
```
Valid restrictions: 45/47
```

## Source References

### Official Documentation
- **[WSDOT Commercial Vehicle Restrictions API](https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html)**: Official API documentation and specifications
- **[WSDOT Traffic Information](https://wsdot.wa.gov/traffic/)**: General traffic information and restriction resources

### Implementation Code
- **[getCommercialVehicleRestrictionsWithId Implementation](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-commercial-vehicle-restrictions/getCommercialVehicleRestrictionsWithId.ts)**: Complete source code with Zod schemas
- **[Commercial Vehicle Restriction Schemas](https://github.com/your-org/ws-dottie/blob/main/src/api/wsdot-commercial-vehicle-restrictions/getCommercialVehicleRestrictions.ts)**: Input/output validation schemas
