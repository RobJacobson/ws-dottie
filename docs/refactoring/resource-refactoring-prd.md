# Resource-Based Architecture Refactoring PRD

## Overview

This PRD provides step-by-step instructions for refactoring all API resource files to use the new resource-based architecture with `resourceDescription` and `endpointDescription` fields.

## Background

The refactoring changes the structure from:
- Using `description` fields with template literals containing `${DESCRIPTION}`
- Having `cacheStrategy` on individual endpoints
- Using generic keys like `all`, `byId`, `filtered`

To:
- Using `resourceDescription` for the resource-level description
- Using `endpointDescription` for one-sentence endpoint descriptions
- Having `cacheStrategy` only on the resource object
- Using function names as endpoint keys

## Step-by-Step Instructions

For each resource file assigned to you:

### Step 1: Read Current File
- Open the resource file (e.g., `src/apis/wsf-vessels/vesselAccommodations.ts`)
- Understand the current structure with DESCRIPTION const and template literals

### Step 2: Identify Changes Needed
- **Remove**: `const DESCRIPTION = "..."` 
- **Change**: `description: DESCRIPTION` → `resourceDescription: "full description text"`
- **Change**: `cacheStrategy: "STATIC"` on individual endpoints → remove these lines
- **Change**: `description: \`Returns...${DESCRIPTION}\`` → `endpointDescription: "Returns..."`
- **Change**: Endpoint keys from `all`, `byId`, `filtered` → match the function name (e.g., `getVesselAccommodations`)

### Step 3: Apply Changes
Use the vesselBasics.ts example as your template:

```typescript
// BEFORE:
const DESCRIPTION = "Each VesselBasic item represents essential vessel details...";

export const vesselBasicsResource = {
  name: "vessel-basics",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getVesselBasics",
      // ... other fields
      cacheStrategy: "STATIC",
      description: `Returns a list of VesselBasic data for all vesselBasics. ${DESCRIPTION}`,
    },
    byId: {
      function: "getVesselBasicsByVesselId",
      // ... other fields
      cacheStrategy: "STATIC", 
      description: `Returns VesselBasic data for the vesselbasic with the given identifier. ${DESCRIPTION}`,
    },
  },
};

// AFTER:
export const vesselBasicsResource = {
  name: "vessel-basics",
  resourceDescription: "Each VesselBasic item represents essential vessel details including vessel identification (name and ID), operational status (in service, maintenance, out of service), and ownership information. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getVesselBasics: {
      function: "getVesselBasics",
      // ... other fields (no cacheStrategy here)
      endpointDescription: "Returns a list of VesselBasic data for all vesselBasics.",
    },
    getVesselBasicsByVesselId: {
      function: "getVesselBasicsByVesselId",
      // ... other fields (no cacheStrategy here)
      endpointDescription: "Returns VesselBasic data for the vesselbasic with the given identifier.",
    },
  },
};
```

### Step 4: Extract One-Sentence Descriptions
- For each endpoint, create a one-sentence `endpointDescription`
- First sentence should describe what that specific endpoint returns
- Keep it concise and focused on the endpoint's functionality

### Step 5: Verify Structure
- Ensure no `cacheStrategy` fields on individual endpoints
- Ensure endpoint keys match function names exactly
- Ensure `resourceDescription` contains the full resource description
- Ensure `endpointDescription` contains only one sentence per endpoint

### Step 6: Test Changes
- Run any existing tests for the API
- Verify the file compiles without TypeScript errors
- Check that imports and exports still work correctly

## Success Criteria

- [ ] All resource files use `resourceDescription` instead of `description`
- [ ] All resource files use `endpointDescription` with one-sentence descriptions
- [ ] No `cacheStrategy` fields on individual endpoints
- [ ] Endpoint keys match function names exactly
- [ ] No template literals with `${DESCRIPTION}` remain
- [ ] All files compile without errors
- [ ] Existing functionality preserved

## Example Files

- **Completed**: `src/apis/wsf-vessels/vesselBasics.ts` (use as reference)
- **Documentation**: `docs/refactoring/resource-based-architecture.md` (updated structure)
- **Types**: `src/apis/types.ts` (updated interfaces)

## Notes for Agents

- Work on one API at a time to avoid conflicts
- Each resource file is independent - you only need to modify the assigned files
- If you encounter any issues or uncertainties, ask for clarification rather than guessing
- The refactoring should not change the actual API functionality, only the code organization
- Pay close attention to the function names when creating endpoint keys