# API Endpoint Refactoring PRD: Co-locating Related Endpoints

## Overview

This PRD outlines a systematic refactoring of the API structure to co-locate closely-related endpoints in single files, eliminating code duplication while maintaining clear organization and developer experience.

## Current State Analysis

### Current Architecture
- **One-file-per-endpoint structure**: Each API endpoint is contained in a separate file
- **Schema sharing pattern**: Array endpoints import schemas from corresponding single-item endpoints
- **Consistent organization**: All files follow the same structural pattern (API functions, input schemas, output schemas, TanStack Query hooks)

### Identified Duplication Patterns

#### 1. Schema Import Duplication
```typescript
// Pattern: Array endpoints importing from single-item endpoints
import { type VesselBasic, vesselBasicSchema } from "./getVesselBasicsById";
import { type HighwayAlert, highwayAlertSchema } from "./getHighwayAlertById";
import { type TravelTimeRoute, travelTimeRouteSchema } from "./getTravelTimeById";
```

#### 2. JSDoc Comment Duplication
- Nearly identical JSDoc comments between related endpoints
- Minor variations only for array vs. single item descriptions
- Duplicate business context and usage examples

#### 3. Schema Description Duplication
- Detailed field descriptions duplicated across related endpoints
- Array schemas reusing single-item schema descriptions
- Inconsistent documentation quality between related endpoints

**Note**: JSDoc comments will be deleted during refactoring rather than merged, as they will be addressed by a separate documentation enhancement project. Zod `.describe()` annotations will be preserved unchanged.

## Problems with Current Approach

### 1. Maintenance Overhead
- Changes to shared concepts require updates across multiple files
- Risk of inconsistent documentation between related endpoints
- Increased cognitive load for developers maintaining related functionality

### 2. Code Duplication
- Significant duplication in JSDoc comments and schema descriptions
- Import complexity for array endpoints
- Schema fragmentation across files

### 3. Developer Experience Issues
- Related functionality scattered across multiple files
- Inconsistent documentation quality
- Complex import patterns for consumers

## Goals of Refactoring

### Primary Goals
1. **Eliminate Code Duplication**: Remove duplicate schema imports, consolidate shared schemas, and eliminate duplicate file structures
2. **Improve Maintainability**: Centralize related functionality for easier maintenance
3. **Enhance Developer Experience**: Keep related endpoints together for better discoverability
4. **Preserve Benefits**: Maintain clear organization and separation of concerns

### Secondary Goals
1. **Simplified Imports**: Reduce import complexity for consumers
2. **Better Testing**: Enable easier testing of related functionality together
3. **Cleaner Code Structure**: Eliminate duplicate file structures and import patterns

## Refactoring Strategy

### Core Principle: Co-locate Related Endpoints
Group closely-related endpoints in the same file while maintaining clear separation between different endpoint types.

### File Organization Pattern
```
src/api/{api-name}/
├── {baseName}.ts           // Contains both array and single-item versions
├── {otherBaseName}.ts      // Contains both array and single-item versions
├── {standaloneEndpoint}.ts // Standalone endpoints with no related versions
└── index.ts                // Clean exports
```

### File Content Organization (Per File)
1. **API Functions** (singular item first, then array)
2. **Input Schemas & Types** (singular item first, then array)
3. **Output Schemas & Types** (shared schemas, then array wrappers)
4. **TanStack Query Hooks** (singular item first, then array)

**Note**: All JSDoc comments will be removed during this refactoring. Zod `.describe()` annotations will be preserved unchanged.

## Detailed Implementation Plan

### Phase 1: WSF Vessels API ✅ COMPLETED

#### Successfully Merged Files
```
getVesselBasics.ts + getVesselBasicsById.ts → vesselBasics.ts ✅
getVesselAccommodations.ts + getVesselAccommodationsById.ts → vesselAccommodations.ts ✅
getVesselLocations.ts + getVesselLocationsByVesselId.ts → vesselLocations.ts ✅
getVesselStats.ts + getVesselStatsById.ts → vesselStats.ts ✅
getVesselVerbose.ts + getVesselVerboseById.ts → vesselVerbose.ts ✅
getVesselHistoryByVesselAndDateRange.ts + getAllVesselHistories.ts → vesselHistory.ts ✅
```

#### Files Left Separate
```
getCacheFlushDateVessels.ts (cache management)
```

#### Results
- **Files reduced**: From 10 individual endpoint files to 5 co-located files
- **All tests passing**: 154/154 e2e validation tests passed
- **No functionality regressions**: All API contracts maintained
- **Circular dependencies eliminated**: `getAllVesselHistories` now co-located with its dependency

#### Implementation Steps for vesselBasics.ts
1. Create new `vesselBasics.ts` file
2. Copy `getVesselBasicsById.ts` content first (singular item)
3. Add `getVesselBasics.ts` content after (array item)
4. Consolidate shared schemas (remove duplication)
5. **Delete all JSDoc comments** (will be addressed by separate documentation project)
6. **Preserve all Zod `.describe()` annotations unchanged**
7. Update imports and exports
8. Update `index.ts` to export from new file
9. Delete old separate files
10. Run tests to verify functionality

### Phase 2: WSF Terminals API

#### Current Files to Merge
```
getTerminalBasics.ts + getTerminalBasicsByTerminalId.ts → terminalBasics.ts
getTerminalBulletins.ts + getTerminalBulletinsByTerminalId.ts → terminalBulletins.ts
getTerminalLocations.ts + getTerminalLocationsByTerminalId.ts → terminalLocations.ts
getTerminalSailingSpace.ts + getTerminalSailingSpaceByTerminalId.ts → terminalSailingSpace.ts
getTerminalTransports.ts + getTerminalTransportsByTerminalId.ts → terminalTransports.ts
getTerminalVerbose.ts + getTerminalVerboseByTerminalId.ts → terminalVerbose.ts
getTerminalWaitTimes.ts + getTerminalWaitTimesByTerminalId.ts → terminalWaitTimes.ts
```

#### Files to Leave Separate
```
getCacheFlushDateTerminals.ts (cache management)
```

### Phase 3: WSF Schedule API

#### Current Files to Merge
```
getTimeAdjustments.ts + getTimeAdjustmentsByRoute.ts → timeAdjustments.ts
getTerminalsAndMates.ts + getTerminalsAndMatesByRoute.ts → terminalsAndMates.ts
getScheduledRoutes.ts + getScheduledRoutesBySeason.ts → scheduledRoutes.ts
getScheduleTodayByRoute.ts + getScheduleTodayByTerminals.ts → scheduleToday.ts
getScheduleByRoute.ts + getScheduleByTerminals.ts → schedule.ts
getRoutes.ts + getRoutesByTerminals.ts → routes.ts
getRouteDetails.ts + getRouteDetailsByRoute.ts + getRouteDetailsByTerminals.ts → routeDetails.ts
```

#### Files to Leave Separate
```
getAlerts.ts (no related versions)
getAllSailings.ts (no related versions)
getAlternativeFormats.ts (no related versions)
getCacheFlushDateSchedule.ts (cache management)
getSailings.ts (no related versions)
getRoutesWithDisruptions.ts (no related versions)
getTerminals.ts (no related versions)
getTerminalMates.ts (no related versions)
getValidDateRange.ts (no related versions)
getActiveSeasons.ts (no related versions)
```

### Phase 4: WSF Fares API

#### Current Files to Merge
```
getFareLineItems.ts + getFareLineItemsBasic.ts + getFareLineItemsVerbose.ts → fareLineItems.ts
getTerminalCombo.ts + getTerminalComboVerbose.ts → terminalCombo.ts
```

#### Files to Leave Separate
```
getFaresCacheFlushDate.ts (cache management)
getFaresTerminals.ts (no related versions)
getFaresTerminalMates.ts (no related versions)
getFaresValidDateRange.ts (no related versions)
getFareTotals.ts (no related versions)
```

### Phase 5: WSDOT APIs

#### WSDOT Highway Alerts
```
getHighwayAlerts.ts + getHighwayAlertById.ts → highwayAlerts.ts
```

#### WSDOT Highway Cameras
```
getHighwayCameras.ts + getHighwayCamera.ts → highwayCameras.ts
```

#### WSDOT Mountain Pass Conditions
```
getMountainPassConditions.ts + getMountainPassConditionById.ts → mountainPassConditions.ts
```

#### WSDOT Commercial Vehicle Restrictions
```
getCommercialVehicleRestrictions.ts + getCommercialVehicleRestrictionsWithId.ts → commercialVehicleRestrictions.ts
```

#### WSDOT Traffic Flow
```
getTrafficFlows.ts + getTrafficFlowById.ts → trafficFlow.ts
```

#### WSDOT Travel Times
```
getTravelTimes.ts + getTravelTimeById.ts → travelTimes.ts
```

#### WSDOT Weather Information
```
getWeatherInformation.ts + getWeatherInformationByStationId.ts → weatherInformation.ts
getWeatherInformationForStations.ts + getSearchWeatherInformation.ts → weatherInformationSearch.ts
```

#### WSDOT APIs with No Related Endpoints (Leave Separate)
```
wsdot-border-crossings: getBorderCrossings.ts
wsdot-bridge-clearances: getBridgeClearances.ts
wsdot-toll-rates: getTollRates.ts, getTollTripInfo.ts, getTollTripRates.ts, getTollTripVersion.ts, getTripRatesByDate.ts
wsdot-weather-stations: getWeatherStations.ts
wsdot-weather-information-extended: getWeatherInformationExtended.ts
```

## Implementation Guidelines

### File Naming Convention
- Use base name without "By" suffixes: `vesselBasics.ts` (not `getVesselBasics.ts`)
- For multiple related endpoints: `fareLineItems.ts` (contains basic, verbose, and standard versions)
- Maintain descriptive names that indicate the domain concept

### Content Organization (Per File)
```typescript
// 1. Imports
import { z } from "zod";
import { useQueryWithAutoUpdate, tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";

// 2. API Functions (singular first, then array)
export const getVesselBasicsById = async (params: GetVesselBasicsByIdParams): Promise<VesselBasic> => { ... }
export const getVesselBasics = async (): Promise<VesselBasic[]> => { ... }

// 3. Input Schemas & Types (singular first, then array)
export const getVesselBasicsByIdParamsSchema = z.object({ ... })
export type GetVesselBasicsByIdParams = z.infer<typeof getVesselBasicsByIdParamsSchema>

// 4. Output Schemas & Types (shared schemas first, then array wrappers)
export const vesselBasicSchema = z.object({ ... })
export const vesselBasicArraySchema = z.array(vesselBasicSchema)
export type VesselBasic = z.infer<typeof vesselBasicSchema>

// 5. TanStack Query Hooks (singular first, then array)
export const useVesselBasicsById = (params: { vesselId: number }, options?: TanStackOptions<VesselBasic>) => { ... }
export const useVesselBasics = (options?: TanStackOptions<VesselBasic[]>) => { ... }
```

**Note**: This example shows the structure without JSDoc comments, which will be removed during refactoring. All Zod `.describe()` annotations will be preserved unchanged.

### Schema Consolidation Rules
1. **Keep single-item schemas as primary**: Use the most detailed schema as the base
2. **Create array wrappers**: `z.array(baseSchema)` for array endpoints
3. **Delete all JSDoc comments**: Remove all JSDoc comments (will be addressed by separate documentation project)
4. **Preserve Zod annotations**: Keep all Zod `.describe()` annotations unchanged
5. **Maintain type exports**: Export both individual and array types

### Import/Export Strategy
1. **Update index.ts files**: Export from new co-located files
2. **Maintain backward compatibility**: Ensure existing imports still work
3. **Update internal imports**: Fix any cross-file imports within the same API

## Ambiguous Cases and Decision Framework

### Clear Merge Cases
- **Pattern**: `getX.ts` + `getXById.ts` → `x.ts`
- **Pattern**: `getX.ts` + `getXByY.ts` → `x.ts`
- **Pattern**: `getX.ts` + `getXBasic.ts` + `getXVerbose.ts` → `x.ts`

### Unclear Cases (Require Analysis)

#### 1. WSF Schedule Complex Cases
- **getRouteDetails.ts + getRouteDetailsByRoute.ts + getRouteDetailsByTerminals.ts**
  - **Decision**: Merge into `routeDetails.ts` (all deal with route details)
  - **Rationale**: Same domain concept, different parameter patterns

#### 2. WSF Fares Complex Cases
- **getFareLineItems.ts + getFareLineItemsBasic.ts + getFareLineItemsVerbose.ts**
  - **Decision**: Merge into `fareLineItems.ts` (all deal with fare line items)
  - **Rationale**: Same domain concept, different detail levels

#### 3. WSDOT Weather Information
- **getWeatherInformationForStations.ts + getSearchWeatherInformation.ts**
  - **Decision**: Merge into `weatherInformationSearch.ts` (both search-related)
  - **Rationale**: Both are search variants of weather information

### Leave Separate Cases
- **Cache management endpoints**: `getCacheFlushDate*.ts`
- **Standalone endpoints with no related versions**: `getAlerts.ts`, `getAllSailings.ts`
- **Unique parameter patterns**: `getVesselHistoryByVesselAndDateRange.ts`
- **Different domains**: `getTollRates.ts` vs `getTollTripInfo.ts`

## Testing and Validation Strategy

### Pre-Refactoring
1. **Run full test suite**: Ensure all tests pass before starting
2. **Document current behavior**: Note any edge cases or special behaviors
3. **Create backup**: Git branch for rollback if needed

### During Refactoring
1. **Incremental testing**: Test after each file merge
2. **Import validation**: Verify all imports work correctly
3. **Type checking**: Ensure TypeScript compilation succeeds
4. **Functionality testing**: Verify API functions work as expected

### Post-Refactoring
1. **Full test suite**: Run all tests to ensure no regressions
2. **Integration testing**: Test with consuming applications
3. **Documentation review**: Verify documentation is accurate and complete
4. **Performance testing**: Ensure no performance regressions

## Rollback Plan

### Immediate Rollback
1. **Git revert**: Revert to previous commit if issues arise
2. **File restoration**: Restore individual files from backup
3. **Import fixes**: Update imports back to original structure

### Partial Rollback
1. **Selective file restoration**: Restore problematic files individually
2. **Hybrid approach**: Keep some co-located files, revert others
3. **Gradual migration**: Move back to one-file-per-endpoint for specific APIs

## Success Metrics

### Quantitative Metrics
- **Reduced file count**: Target 30-40% reduction in total API files
- **Eliminated duplication**: Remove duplicate schema imports and file structures
- **Maintained functionality**: 100% test pass rate
- **No performance regression**: API response times within 5% of baseline

### Qualitative Metrics
- **Improved developer experience**: Easier navigation and maintenance
- **Cleaner code structure**: Eliminated duplicate file structures and import patterns
- **Reduced cognitive load**: Developers can find related functionality together
- **Maintained clarity**: Clear separation between different endpoint types

## Timeline and Phases

### Phase 1: WSF Vessels (Week 1)
- **Days 1-2**: Implement vesselBasics.ts, vesselAccommodations.ts
- **Days 3-4**: Implement vesselLocations.ts, vesselStats.ts, vesselVerbose.ts
- **Day 5**: Update index.ts, run tests, user review

### Phase 2: WSF Terminals (Week 2)
- **Days 1-3**: Implement all terminal endpoint merges
- **Days 4-5**: Update index.ts, run tests, user review

### Phase 3: WSF Schedule (Week 3)
- **Days 1-4**: Implement complex schedule endpoint merges
- **Day 5**: Update index.ts, run tests, user review

### Phase 4: WSF Fares (Week 4)
- **Days 1-2**: Implement fare endpoint merges
- **Days 3-5**: Update index.ts, run tests, user review

### Phase 5: WSDOT APIs (Weeks 5-8)
- **Week 5**: WSDOT Highway Alerts, Highway Cameras
- **Week 6**: WSDOT Mountain Pass Conditions, Commercial Vehicle Restrictions
- **Week 7**: WSDOT Traffic Flow, Travel Times
- **Week 8**: WSDOT Weather Information APIs

## Risk Mitigation

### Technical Risks
- **Breaking changes**: Comprehensive testing and gradual rollout
- **Import complexity**: Clear documentation of new import patterns
- **Performance impact**: Monitor API response times during migration

### Process Risks
- **Scope creep**: Strict adherence to merge criteria
- **Quality degradation**: Maintain documentation standards
- **Timeline overrun**: Phased approach with user reviews

## Conclusion

This refactoring will significantly improve the codebase by eliminating duplication, improving maintainability, and enhancing developer experience while preserving the benefits of clear organization. The phased approach ensures minimal risk and allows for user feedback at each stage.

The co-location strategy strikes the right balance between reducing duplication and maintaining clarity, making the codebase more maintainable and easier to understand for both current and future developers.

## Important Notes on Documentation

### JSDoc Comments
- **All JSDoc comments will be deleted** during this refactoring project
- **Do not attempt to merge or consolidate** JSDoc comments between related endpoints
- JSDoc comments will be addressed by a separate documentation enhancement project
- This approach avoids wasting effort on comment consolidation and keeps the refactoring focused on structural improvements

### Zod Schema Descriptions
- **All Zod `.describe()` annotations must be preserved unchanged**
- These annotations contain valuable business context and API documentation
- They are separate from JSDoc comments and serve different purposes
- Preserving them ensures no loss of important API documentation

### Focus of This Refactoring
This project focuses on:
1. **Structural improvements**: Co-locating related endpoints
2. **Code deduplication**: Eliminating duplicate schema imports and file structures
3. **Import simplification**: Reducing complexity in import patterns
4. **Maintainability**: Centralizing related functionality

This project does NOT focus on:
1. **Documentation quality**: JSDoc comments will be addressed separately
2. **Schema descriptions**: Zod annotations are preserved unchanged
3. **Business logic changes**: All functionality remains identical
