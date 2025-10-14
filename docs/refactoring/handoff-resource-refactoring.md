# Resource-Based Refactoring Handoff

## Overview

This document provides instructions for refactoring the remaining API endpoint files to use the new resource-based architecture. The wsf-vessels API has been successfully refactored as a proof of concept and should serve as the template for all other APIs.

## Instructions

### General Approach
- **DO NOT** attempt to fill in descriptions or make any content changes
- Simply restructure existing endpoint code to align with the new resource-based structure
- Maintain all existing functionality and behavior
- Follow the exact pattern established in the wsf-vessels refactoring

### Pattern to Follow

Each API should be refactored according to this structure:

1. **Create individual resource files** for each distinct data type returned by the API
2. **Update the main endpoints.ts file** to import and re-export all resources while maintaining backward compatibility
3. **Preserve all existing endpoint definitions** - only reorganize them into the new structure

### Resource File Template

```typescript
// Example: src/apis/[api-name]/[resourceName].ts
import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION = "Use the existing description from the original file";

export const [resourceName]Resource = {
  name: "[resource-name]",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const, // or "REALTIME" as appropriate
 endpoints: {
    // Group related endpoints by pattern:
    // all: for endpoints returning all items
    // byId: for endpoints returning single items by ID  
    // filtered: for endpoints returning filtered subsets
  }
};
```

### Refactoring Process

For each API, create a to-do list following the alphabetical order below and work through each item individually.

## To-Do List by API

### 1. wsdot-border-crossings
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 2. wsdot-bridge-clearances
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 3. wsdot-commercial-vehicle-restrictions
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 4. wsdot-highway-alerts
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 5. wsdot-highway-cameras
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 6. wsdot-mountain-pass-conditions
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 7. wsdot-toll-rates
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 8. wsdot-traffic-flow
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 9. wsdot-travel-times
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 10. wsdot-weather-information
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 11. wsdot-weather-readings
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 12. wsdot-weather-stations
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 13. wsf-fares
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 14. wsf-schedule
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

### 15. wsf-terminals
- [ ] Identify distinct data types returned by endpoints
- [ ] Create individual resource files for each data type
- [ ] Move endpoint definitions to appropriate resource files
- [ ] Update main endpoints.ts to re-export resources
- [ ] Verify TypeScript compilation passes

## Important Notes

- **Preserve existing behavior**: Do not change functionality, only restructure
- **Maintain backward compatibility**: The main endpoints.ts file must continue to export the same API definition
- **Follow TypeScript requirements**: Each endpoint must include `cacheStrategy` and `description` fields
- **Reference wsf-vessels**: Use the completed refactoring as a template for all other APIs
- **Test compilation**: Run `npx tsc --noEmit` after each API to verify no type errors

## Subagent Recommendation

This task is well-suited for subdivision with Kilo Code subagents. Each API can be handled independently by a separate agent, with the following approach:
- Assign 3-4 APIs to each subagent to maintain consistency
- Have each subagent report completion status before moving to the next batch
- Use a coordinating agent to verify the final result and ensure all APIs are completed