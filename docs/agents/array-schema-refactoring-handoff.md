# Array Schema Refactoring Handoff

## Context

The user wants to simplify the verbose array-based schema definitions across all API folders in `src/apis/*`. Currently, the codebase uses verbose patterns like:

```typescript
// Current verbose pattern
export const vesselBasicDetailsListSchema = z.array(vesselBasicSchema);
export type VesselBasicDetailsList = z.infer<typeof vesselBasicDetailsListSchema>;

// Used in endpoints as:
outputSchema: output.vesselBasicDetailsListSchema,
```

**Goal**: Replace with inline `z.array()` usage to reduce boilerplate and follow modern best practices.

## Target Pattern

```typescript
// Remove the verbose array schemas entirely
// Use inline in endpoints:
outputSchema: z.array(output.vesselBasicSchema),
```

## API Folders to Process (in order)

1. **wsf-vessels** - Start here (smallest, good test case)
2. **wsf-terminals** 
3. **wsf-fares**
4. **wsf-schedule**
5. **wsdot-border-crossings**
6. **wsdot-bridge-clearances**
7. **wsdot-commercial-vehicle-restrictions**
8. **wsdot-highway-alerts**
9. **wsdot-highway-cameras**
10. **wsdot-mountain-pass-conditions**
11. **wsdot-toll-rates**
12. **wsdot-traffic-flow**
13. **wsdot-travel-times**
14. **wsdot-weather**

## Process for Each API Folder

### Step 1: Analyze Current Array Schemas
```bash
grep -n "ListSchema.*=.*z\.array" src/apis/{API_NAME}/original/outputSchemas.original.ts
grep -n "export type.*List.*=" src/apis/{API_NAME}/original/outputSchemas.original.ts
```

### Step 2: Update outputSchemas.original.ts
Remove verbose array schema definitions like:
```typescript
/**
 * Vessel Basic Details List Schema
 */
export const vesselBasicDetailsListSchema = z.array(vesselBasicSchema);
export type VesselBasicDetailsList = z.infer<typeof vesselBasicDetailsListSchema>;
```

**Keep only**: Single entity schemas and any schemas with special constraints.

### Step 3: Update endpoints.ts
Add zod import:
```typescript
import { z } from "zod";
```

Replace array schema references:
```typescript
// Before:
outputSchema: output.vesselBasicDetailsListSchema,

// After:
outputSchema: z.array(output.vesselBasicSchema),
```

### Step 4: Update index.ts
Remove array type exports from the export list:
```typescript
// Remove these types:
VesselBasicDetailsList,
VesselAccommodationsList,
// etc.
```

### Step 5: Test Changes
```bash
npm run build
npm run test
```

## Specific Patterns to Look For

### Array Schema Patterns to Remove
```typescript
export const {EntityName}ListSchema = z.array({entityName}Schema);
export type {EntityName}List = z.infer<typeof {EntityName}ListSchema>;

export const {EntityName}DetailsListSchema = z.array({entityName}Schema);
export type {EntityName}DetailsList = z.infer<typeof {EntityName}DetailsListSchema>;
```

### Endpoint Patterns to Update
```typescript
// Array endpoints (plural function names):
outputSchema: output.{entityName}ListSchema,
outputSchema: output.{entityName}DetailsListSchema,

// Single entity endpoints (keep as-is):
outputSchema: output.{entityName}Schema,
```

## Important Notes

1. **Don't change single entity schemas** - only remove array wrappers
2. **Keep schemas with constraints** - if a schema has `.min()`, `.max()`, or other validations
3. **Update both input and output schemas** if they have array patterns
4. **Test each API individually** before moving to the next
5. **Use git commits** between each API to track progress

## Example: WSF Vessels (First API)

### Current State Analysis
- 6 array schemas to remove:
  - `vesselBasicDetailsListSchema`
  - `vesselAccommodationsListSchema` 
  - `vesselStatsListSchema`
  - `vesselLocationsListSchema`
  - `vesselVerboseDetailsListSchema`
  - `vesselHistoryResponseListSchema`

### Files to Update
1. `src/apis/wsf-vessels/original/outputSchemas.original.ts` - Remove array schemas
2. `src/apis/wsf-vessels/endpoints.ts` - Add zod import, update outputSchema references
3. `src/apis/wsf-vessels/index.ts` - Remove array type exports

### Expected Outcome
- Remove ~60 lines of boilerplate code
- Endpoints use inline `z.array()` 
- Cleaner, more maintainable schema definitions

## Validation Commands

After each API:
```bash
# Check for remaining ListSchema patterns
grep -r "ListSchema" src/apis/{API_NAME}/

# Check for remaining array type exports
grep -r "List.*=" src/apis/{API_NAME}/index.ts

# Build and test
npm run build
npm run lint
```

## Success Criteria

- [ ] No `*ListSchema` exports in any API folder
- [ ] No `*List` type exports in index.ts files  
- [ ] All endpoints use inline `z.array()` for arrays
- [ ] All tests pass
- [ ] Build succeeds
- [ ] Significant reduction in boilerplate code

## Estimated Impact

- **Lines removed**: ~50-100 per API folder
- **APIs affected**: 14 total
- **Total reduction**: ~700-1400 lines of boilerplate
- **Maintenance benefit**: Much easier to add new array endpoints
