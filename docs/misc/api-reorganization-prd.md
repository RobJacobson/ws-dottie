# API Reorganization PRD

## Overview

This PRD outlines a major refactor to reorganize the 16 API folders for better maintainability, clearer separation of concerns, and MCP server compatibility.

## Goals

### Primary Goals
1. **Separate concerns**: Input schemas stay with endpoints, output schemas centralized
2. **Reduce file sprawl**: Split large files (>150 lines) into logical groups
3. **Improve discoverability**: Predictable file structure within each API domain
4. **MCP compatibility**: Centralized output schemas with rich `.describe()` annotations
5. **Maintain ergonomics**: Preserve existing public API surface

### Secondary Goals
1. **Reduce schema duplication**: Consolidate cross-cutting schemas
2. **Improve documentation**: Add comprehensive block comments
3. **Enable future tooling**: Structure that supports code generation

## Current State Analysis

### API Folders (16 total)
- `wsdot-border-crossings/` - Simple, 3 files
- `wsdot-bridge-clearances/` - Simple, 4 files  
- `wsdot-commercial-vehicle-restrictions/` - Simple, 3 files
- `wsdot-highway-alerts/` - Complex, 6 files
- `wsdot-highway-cameras/` - Complex, 5 files
- `wsdot-mountain-pass-conditions/` - Simple, 6 files
- `wsdot-toll-rates/` - Complex, 8 files
- `wsdot-traffic-flow/` - Simple, 3 files
- `wsdot-travel-times/` - Simple, 3 files
- `wsdot-weather-information/` - Simple, 4 files
- `wsdot-weather-information-extended/` - Simple, 5 files
- `wsdot-weather-stations/` - Simple, 3 files
- `wsf-fares/` - Complex, 18 files
- `wsf-schedule/` - **Most complex, 43 files**
- `wsf-terminals/` - Complex, 23 files
- `wsf-vessels/` - Complex, 15 files

### Files Requiring Splitting

#### High Priority (Large files >150 lines)
1. `wsdot-highway-alerts/highwayAlerts.ts` (244 lines) → Split by functionality
2. `wsdot-commercial-vehicle-restrictions/commercialVehicleRestrictions.ts` (205 lines) → Split by endpoint type
3. `wsf-schedule/schedule.ts` (167 lines) → Split by endpoint type
4. `wsf-schedule/routeDetails.ts` (159 lines) → Split by functionality
5. `wsf-schedule/terminals.ts` (157 lines) → Split by functionality
6. `wsdot-mountain-pass-conditions/mountainPassConditions.ts` (155 lines) → Split by functionality
7. `wsdot-highway-cameras/highwayCameras.ts` (153 lines) → Split by functionality

#### Medium Priority (Files 100-150 lines)
1. `wsdot-highway-cameras/searchHighwayCameras.ts` (136 lines) → Keep as-is
2. `wsdot-highway-alerts/searchHighwayAlerts.ts` (132 lines) → Keep as-is
3. `wsdot-traffic-flow/trafficFlow.ts` (124 lines) → Keep as-is
4. `wsf-vessels/vesselHistory.ts` (123 lines) → Keep as-is
5. `wsdot-bridge-clearances/bridgeClearances.ts` (116 lines) → Keep as-is
6. `wsf-terminals/terminalSailingSpace.ts` (115 lines) → Keep as-is
7. `wsf-schedule/routes.ts` (114 lines) → Keep as-is
8. `wsdot-toll-rates/tripRatesByDate.ts` (113 lines) → Keep as-is
9. `wsf-schedule/timeAdjustments.ts` (110 lines) → Keep as-is
10. `wsdot-border-crossings/borderCrossings.ts` (108 lines) → Keep as-is
11. `wsf-fares/faresTerminals.ts` (106 lines) → Keep as-is
12. `wsf-schedule/scheduledRoutes.ts` (105 lines) → Keep as-is

## Target Structure

### New Schema Organization
```
src/
├── schemas/                          # Centralized output schemas only
│   ├── shared/                       # Cross-cutting schemas
│   │   ├── cacheFlushDate.zod.ts
│   │   └── roadwayLocation.zod.ts
│   ├── wsf-schedule/                 # WSF schedule schemas (separate files)
│   │   ├── schedule.zod.ts
│   │   ├── scheduleTerminal.zod.ts
│   │   ├── route.zod.ts
│   │   ├── sailing.zod.ts
│   │   ├── scheduleTerminalCombo.zod.ts
│   │   └── [all other existing .zod.ts files]
│   ├── wsf-fares/                    # WSF fares schemas (separate files)
│   │   ├── fareLineItems.zod.ts
│   │   ├── terminalCombo.zod.ts
│   │   ├── faresTerminal.zod.ts
│   │   └── [all other existing .zod.ts files]
│   ├── wsf-terminals/                # WSF terminals schemas (separate files)
│   │   ├── terminal.zod.ts
│   │   ├── terminalBasics.zod.ts
│   │   └── [all other existing .zod.ts files]
│   ├── wsf-vessels/                  # WSF vessels schemas (separate files)
│   │   ├── vessel.zod.ts
│   │   ├── vesselBasics.zod.ts
│   │   └── [all other existing .zod.ts files]
│   ├── wsdot-border-crossings/       # WSDOT schemas (separate files)
│   │   └── borderCrossings.zod.ts
│   ├── wsdot-bridge-clearances/
│   │   ├── bridgeDataGIS.zod.ts
│   │   └── clearance.zod.ts
│   └── [other wsdot-* folders with their .zod.ts files]
```

### New Client Organization
```
src/clients/                          # Renamed from 'api' for clarity
├── wsf-schedule/
│   ├── routes.ts                     # Route-related endpoints
│   ├── sailings.ts                   # Sailing-related endpoints  
│   ├── terminals.ts                  # Basic terminal endpoints
│   ├── terminal-combos.ts            # Terminal combination endpoints
│   ├── alerts.ts                     # Alert endpoints
│   ├── schedule.ts                   # Schedule endpoints
│   └── index.ts                      # Re-exports
├── wsf-fares/
│   ├── fareLineItems.ts
│   ├── terminalCombo.ts
│   ├── faresTerminals.ts
│   └── index.ts
├── wsf-terminals/
│   ├── terminalBasics.ts
│   ├── terminalLocations.ts
│   ├── terminalVerbose.ts
│   └── index.ts
├── wsf-vessels/
│   ├── vesselBasics.ts
│   ├── vesselHistory.ts
│   ├── vesselVerbose.ts
│   └── index.ts
└── [all other wsdot-* and wsf-* client folders]
```

## Migration Strategy

### Phase 1: Schema Centralization ✅ COMPLETED
1. ✅ Create `src/schemas/` directory structure (moved from `src/api/schemas/`)
2. ✅ Move all `.zod.ts` files to appropriate schema subfolders
3. ✅ Update imports in client files to use centralized schemas
4. ✅ Test that JavaScript build works

### Phase 2: Client Organization ✅ COMPLETED
1. ✅ Rename `src/api/` to `src/clients/` for better clarity
2. ✅ Update all import paths to use new client structure
3. ✅ Create index files for each schema subfolder
4. ✅ Update main index.ts and cli.ts imports

### Phase 3: Schema Naming Conflicts 🔄 IN PROGRESS
1. 🔄 Resolve duplicate type names between different APIs
2. 🔄 Rename conflicting schemas (e.g., `terminalCombo` → `scheduleTerminalCombo`)
3. 🔄 Update all references to use new schema names
4. 🔄 Fix TypeScript compilation errors

### Phase 4: File Splitting (Future)
1. Split `wsf-schedule/schedule.ts` into logical groups
2. Split `wsf-schedule/terminals.ts` into `terminals.ts` + `terminal-combos.ts`
3. Reorganize other complex API folders
4. Update index files and exports

### Phase 5: Documentation & MCP Support (Future)
1. Add comprehensive block comments
2. Add `.describe()` annotations to schemas
3. Update documentation

### Phase 6: Cleanup (Future)
1. Remove old schema files
2. Update import paths
3. Final testing

## Detailed Implementation Plan

### Phase 1: Schema Centralization (2-3 days)

#### Step 1.1: Create Schema Structure
```bash
mkdir -p src/api/schemas/shared
mkdir -p src/api/schemas/wsf
mkdir -p src/api/schemas/wsdot
```

#### Step 1.2: Move Shared Schemas
- Move `src/api/shared/roadwayLocation.zod.ts` → `src/api/schemas/shared/`
- Move `src/api/wsf-schedule/cacheFlushDate.zod.ts` → `src/api/schemas/shared/`
- Move `src/api/wsf-fares/cacheFlushDate.zod.ts` → `src/api/schemas/shared/`
- Move `src/api/wsf-terminals/cacheFlushDate.zod.ts` → `src/api/schemas/shared/`

#### Step 1.3: Organize API-Specific Schemas
- **wsf-schedule**: Move 43 `.zod.ts` files to `src/api/schemas/wsf-schedule/` (keep as separate files)
- **wsf-fares**: Move 18 `.zod.ts` files to `src/api/schemas/wsf-fares/` (keep as separate files)
- **wsf-terminals**: Move 23 `.zod.ts` files to `src/api/schemas/wsf-terminals/` (keep as separate files)
- **wsf-vessels**: Move 15 `.zod.ts` files to `src/api/schemas/wsf-vessels/` (keep as separate files)
- **wsdot-***: Move each API's schemas to their respective folders (keep as separate files)

#### Step 1.4: Update Imports
- Update all endpoint files to import from new schema locations
- Test that everything compiles

### Phase 2: File Splitting (3-4 days)

#### Step 2.1: Split wsf-schedule (Most Complex)
- `schedule.ts` (167 lines) → Split into:
  - `schedule.ts` (keep 4 schedule endpoints together)
  - Add block comments for clarity
- `terminals.ts` (157 lines) → Split into:
  - `terminals.ts` (basic terminal operations)
  - `terminal-combos.ts` (terminal combination operations)
- `routeDetails.ts` (159 lines) → Split into:
  - `route-details.ts` (route detail operations)
  - `route-search.ts` (route search operations)

#### Step 2.2: Split Other Large Files
- `wsdot-highway-alerts/highwayAlerts.ts` (244 lines) → Split by functionality
- `wsdot-commercial-vehicle-restrictions/commercialVehicleRestrictions.ts` (205 lines) → Split by endpoint type
- `wsdot-mountain-pass-conditions/mountainPassConditions.ts` (155 lines) → Split by functionality
- `wsdot-highway-cameras/highwayCameras.ts` (153 lines) → Split by functionality

#### Step 2.3: Update Index Files
- Update each API's `index.ts` to re-export from new structure
- Ensure backward compatibility

### Phase 3: Documentation & MCP Support (1-2 days)

#### Step 3.1: Add Block Comments
- Add comprehensive block comments to all endpoint files
- Use consistent format across all APIs

#### Step 3.2: Add Schema Descriptions
- Add `.describe()` annotations to all schemas
- Focus on MCP server compatibility

### Phase 4: Cleanup (1 day)

#### Step 4.1: Remove Old Files
- Remove old `.zod.ts` files
- Clean up unused imports

#### Step 4.2: Final Testing
- Run full test suite
- Verify MCP server compatibility
- Update documentation

## Risk Mitigation

### Rollback Strategy
1. Keep original files until migration is complete
2. Use feature flags if needed
3. Maintain comprehensive test coverage
4. Document all changes

### Testing Strategy
1. Run existing tests after each phase
2. Add integration tests for critical paths
3. Test MCP server compatibility
4. Verify all imports work correctly

## Success Criteria

### Functional Requirements
- [ ] All existing functionality preserved
- [ ] All tests pass
- [ ] No breaking changes to public API
- [ ] MCP server can access rich schema descriptions

### Non-Functional Requirements
- [ ] File sizes under 150 lines (where possible)
- [ ] Clear separation of concerns
- [ ] Improved discoverability
- [ ] Reduced schema duplication

## Timeline

- **Phase 1**: 2-3 days (Schema centralization)
- **Phase 2**: 3-4 days (File splitting)
- **Phase 3**: 1-2 days (Documentation)
- **Phase 4**: 1 day (Cleanup)

**Total**: 7-10 days

## Dependencies

- No external dependencies
- Requires careful coordination to avoid conflicts
- May need to pause other development during migration

## Acceptance Criteria

1. All 16 API folders follow consistent structure
2. Large files (>150 lines) are split appropriately
3. Output schemas are centralized and MCP-ready
4. Input schemas remain with their endpoints
5. All existing functionality works unchanged
6. Code is more maintainable and discoverable

## Next Steps

1. Review and approve this PRD
2. Create detailed implementation tasks
3. Begin with Phase 1 (Schema centralization)
4. Execute migration in phases with testing at each step
