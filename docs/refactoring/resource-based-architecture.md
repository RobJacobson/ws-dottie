# Resource-Based Architecture Refactoring

## Overview

This document outlines a refactoring plan to transition from the current API-based endpoint structure to a resource-based architecture. The goal is to organize our code around business data domains (resources) rather than external API boundaries, making the codebase more intuitive, maintainable, and DRY.

## Current Structure Problems

1. **Flat endpoint arrays** - All endpoints in a single API are treated equally
2. **Repetitive definitions** - Similar patterns (all/some/one) are repeated for each endpoint
3. **Artificial boundaries** - Code organization follows external API structure rather than business logic
4. **Schema separation** - Schemas are in separate files, creating cognitive overhead
5. **Agent confusion** - Hard to understand relationships between similar endpoints

## Proposed Solution: Resource-Based Architecture

### Terminology

- **Resource**: A type of response data (e.g., VesselHistory, TerminalLocation)
- **Resource File**: A single file containing all endpoints that return a specific resource type
- **Resource Group**: Endpoints within a resource file organized by their pattern (all/some/one)

### Structure

```
src/apis/[api-name]/
  - [resourceName].ts           # Single resource file
  - shared/
    - schemas.ts                # Shared schemas for the API
  - endpoints.ts                # Legacy compatibility file (re-exports all resources)
```

### Resource File Structure

```typescript
// src/apis/wsf-vessels/vesselHistories.ts
import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION = "Each VesselHistory item represents a historical record for a single sailing between terminals...";

export const vesselHistoriesResource = {
  name: "vessel-histories",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getVesselHistories",
      endpoint: "/vesselHistory",
      inputSchema: i.getAllVesselHistorySchema,  // Using original schema
      outputSchema: z.array(o.vesselHistoryResponseSchema),  // Using original schema
      sampleParams: {},
      cacheStrategy: "STATIC",  // Required field
      description: `Returns a list of VesselHistory data for all vesselHistories. ${DESCRIPTION}`,  // Required field
    } satisfies EndpointDefinition,
    filtered: {
      function: "getVesselHistoriesByVesselNameAndDateRange",
      endpoint: "/vesselHistory/{VesselName}/{DateStart}/{DateEnd}",
      inputSchema: i.getVesselHistorySchema,  // Using original schema
      outputSchema: z.array(o.vesselHistoryResponseSchema),  // Using original schema
      sampleParams: {
        VesselName: "Tacoma",
        DateStart: "2025-09-01",
        DateEnd: "2025-10-01",
      },
      cacheStrategy: "STATIC", // Required field
      description: `Returns a list of VesselHistory data for all vesselHistories, filtered by vessel name, start date, and end date. ${DESCRIPTION}`,  // Required field
    } satisfies EndpointDefinition,
  }
};
```

### Schema Organization

- **Current approach**: Using original input/output schemas from `original/inputSchemas.original.ts` and `original/outputSchemas.original.ts`
- **Future optimization**: Resource-specific schemas could be defined directly in the resource file
- **Shared schemas**: Could be placed in `shared/schemas.ts` within each API folder for future use
- **Cross-API schemas**: Could go in `src/apis/shared/schemas.ts` if needed

### Endpoint Patterns

Each resource will follow these patterns:

1. **all**: Returns all items of the resource type
2. **byId**: Returns a single item by ID
3. **filtered**: Returns a subset based on criteria

## Benefits

### For Developers
- **Better organization**: Related endpoints are grouped together
- **Easier discovery**: Find all endpoints for a resource type in one place
- **Reduced cognitive load**: Schemas and endpoints co-located
- **Consistent patterns**: Clear, predictable structure

### For Agents
- **Clearer instructions**: Simple patterns to follow
- **Less repetition**: Common descriptions and configurations
- **Better maintainability**: Changes contained within resource files

### For the Codebase
- **DRY principles**: Eliminate repetitive endpoint definitions
- **Better testing**: Each resource can be tested independently
- **Easier refactoring**: Changes to a resource are isolated

## Migration Plan

### Phase 1: Implementation
1. Create resource files for wsf-vessels (proof of concept)
2. Update the main endpoints.ts to re-export resources
3. Update consuming code to use new structure
4. Verify all functionality works as expected

### Phase 2: Expansion
1. Apply the same pattern to other APIs (wsdot, etc.)
2. Refine the shared schema organization
3. Update documentation and agent instructions

### Phase 3: Optimization
1. Remove original schema files if no longer needed
2. Potentially eliminate the legacy endpoints.ts files
3. Consider further organizational improvements

## Implementation Details

### New Type Definitions

```typescript
export interface ResourceDefinition {
  name: string;
  description: string;
  cacheStrategy: "STATIC" | "REALTIME";
  endpoints: Record<string, EndpointDefinition>;
}
```

### Helper Functions

Update existing helper functions to work with the new structure:

```typescript
function allItems(resourceName: string, description: string): string {
  return `Returns a list of ${resourceName} data for all ${getEntityPlural(resourceName)}. ${description}`;
}

function singleItem(resourceName: string, description: string): string {
  return `Returns ${resourceName} data for the ${getEntityName(resourceName)} with the given identifier. ${description}`;
}

function filteredItems(resourceName: string, description: string, filters: string): string {
  return `Returns a list of ${resourceName} data for all ${getEntityPlural(resourceName)}, filtered by ${filters}. ${description}`;
}
```

## Testing Strategy

1. **Unit Tests**: Each resource file can be tested independently
2. **Integration Tests**: Verify that the re-exported endpoints work correctly
3. **End-to-End Tests**: Ensure all functionality remains intact
4. **Performance Tests**: Verify no performance degradation

## Rollback Plan

If issues arise, we can:
1. Revert to the original structure
2. Maintain both structures temporarily during transition
3. Use feature flags to control which structure is active

## Success Metrics

- [ ] Reduced code duplication
- [ ] Improved developer experience
- [ ] Clearer agent instructions
- [ ] Maintained functionality
- [ ] Better test coverage
- [ ] No performance degradation