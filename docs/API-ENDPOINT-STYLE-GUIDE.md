# API Endpoint File Style Guide

## Overview
This guide establishes the standard structure and naming conventions for all API endpoint files in the WS-Dottie project. Each endpoint file should be self-contained with the main API function, input/output schemas, and TanStack Query hook.

## File Structure Order
Each endpoint file must follow this exact order:

1. **Imports** (at the very top)
2. **API Function** (including ENDPOINT constant)
3. **Input Schema & Types**
4. **Output Schema & Types**
5. **TanStack Query Hook**

## File Naming Convention
- **Pattern**: `get{EndpointName}.ts`
- **Example**: `getVesselLocationsByVesselId.ts`
- **Rule**: File name must exactly match the main API function name

## Block Comment Structure
Use Pascal Case for block comment headers with clear separation. Each block comment should include the relevant function, schema, and type names:

```typescript
// ============================================================================
// API Function
//
// getEndpointName
// ============================================================================


// ============================================================================
// Input Schema & Types
//
// getEndpointNameParamsSchema
// GetEndpointNameParams
// ============================================================================


// ============================================================================
// Output Schema & Types
// 
// endpointResponseSchema
// EndpointResponse
// ============================================================================


// ============================================================================
// TanStack Query Hook
//
// useEndpointName
// ============================================================================

```

## 1. Imports Section
- **Location**: Always at the very top of the file
- **Organization**: Let Biome handle import ordering automatically
- **Include**: All necessary imports for schemas, types, utilities, and dependencies

## 2. API Function Section

### Block Comment
```typescript
// ============================================================================
// API Function
//
// getEndpointName
// ============================================================================
```

### ENDPOINT Constant
- **Naming**: Always use `ENDPOINT` (not descriptive names like `WSF_VESSELS_BASE`)
- **Location**: Immediately after the block comment, before the function
- **Format**: Full endpoint URL with parameter placeholders (e.g., `{vesselId}`)

### Function Naming Convention
- **Pattern**: `get{EndpointName}`
- **Example**: `getVesselLocationsByVesselId`
- **Rule**: Must match the filename exactly

### Function Documentation
- **JSDoc**: Rich documentation with `@param`, `@returns`, and `@example`
- **Description**: Clear explanation of what the endpoint does
- **Parameters**: Document each parameter with examples
- **Returns**: Document the return type and structure

## 3. Input Schema & Types Section

### Block Comment
```typescript
// ============================================================================
// Input Schema & Types
//
// getEndpointNameParamsSchema
// GetEndpointNameParams
// ============================================================================
```

### Schema Naming Convention
- **Pattern**: `get{FunctionName}ParamsSchema`
- **Example**: `getVesselLocationsByVesselIdParamsSchema`
- **Rule**: Must include the full function name

### Type Naming Convention
- **Pattern**: `Get{FunctionName}Params`
- **Example**: `GetVesselLocationsByVesselIdParams`
- **Rule**: Pascal Case with "Get" prefix and "Params" suffix

### Schema Documentation
- **Rich Descriptions**: Use `.describe()` for all fields with MCP-ready documentation
- **Validation**: Include appropriate Zod validators (`.int()`, `.positive()`, etc.)
- **Cross-field Validation**: Use `.refine()` for complex validation rules

### Imported Schemas
If importing schemas or params from other files, note this in the comment, e.g.:
```typescript
// ============================================================================
// ...
// getEndpointNameParamsSchema (imported from ./getVesselBasics)
// ============================================================================
```

## 4. Output Schema & Types Section

### Block Comment
```typescript
// ============================================================================
// Output Schema & Types
// 
// endpointResponseSchema
// EndpointResponse
// ============================================================================
```

### Schema Naming Convention
- **Single Entity**: `{entityName}Schema`
- **Array Entity**: `{entityName}ArraySchema`
- **Examples**: `vesselLocationSchema`, `vesselLocationArraySchema`
- **Rule**: Use the entity name, not the function name

### Type Naming Convention
- **Pattern**: `{EntityName}` (Pascal Case)
- **Example**: `VesselLocation`
- **Rule**: Direct inference from schema: `z.infer<typeof {schemaName}>`

### Schema Documentation
- **Rich Descriptions**: Comprehensive `.describe()` annotations for MCP compatibility
- **Field-level Descriptions**: Each field should have detailed explanation
- **Schema-level Description**: Overall schema should describe the complete data structure

### Imported Schemas
If importing schemas or types from other files, note this in the comment, e.g.:
```typescript
// ============================================================================
// endpointResponseSchema (imported from ./getVesselBasics)
// ============================================================================
```

## 5. TanStack Query Hook Section

### Block Comment
```typescript
// ============================================================================
// TanStack Query Hook
//
// useEndpointName
// ============================================================================
```

### Hook Naming Convention
- **Pattern**: `use{FunctionName}`
- **Example**: `useVesselLocationsByVesselId`
- **Rule**: Must include the full function name with "use" prefix

### Hook Documentation
- **JSDoc**: Rich documentation matching the API function
- **Parameters**: Document both the main params and options
- **Returns**: Document the React Query result structure
- **Examples**: Include usage examples with the hook

### Hook Implementation
- **Query Key**: Structured as `["api", "category", "endpoint", "params..."]`
- **Query Function**: Call the main API function directly
- **Options**: Use shared TanStack options and merge with passed options

## Naming Convention Summary

| Component | Pattern | Example |
|-----------|---------|---------|
| **File Name** | `get{EndpointName}.ts` | `getVesselLocationsByVesselId.ts` |
| **API Function** | `get{EndpointName}` | `getVesselLocationsByVesselId` |
| **Input Schema** | `get{FunctionName}ParamsSchema` | `getVesselLocationsByVesselIdParamsSchema` |
| **Input Type** | `Get{FunctionName}Params` | `GetVesselLocationsByVesselIdParams` |
| **Output Schema** | `{entityName}Schema` | `vesselLocationSchema` |
| **Output Type** | `{EntityName}` | `VesselLocation` |
| **Query Hook** | `use{FunctionName}` | `useVesselLocationsByVesselId` |
| **Endpoint Constant** | `ENDPOINT` | `ENDPOINT` |

## Consistency Rules

1. **No Random Ordering**: The four main sections must always appear in the specified order
2. **No Mid-file Imports**: All imports must be at the very top
3. **Consistent Naming**: Follow the exact naming patterns specified above
4. **Rich Documentation**: All schemas and functions must have comprehensive JSDoc
5. **MCP Ready**: All schema descriptions should be AI-friendly for future MCP integration

## Example Template

```typescript
import { /* imports */ } from "/* packages */";


// ============================================================================
// API Function
//
// getEndpointName
// ============================================================================

getEndpointName

const ENDPOINT = "/api/path/{param}";

/**
 * Rich JSDoc documentation
 */
export const getEndpointName = async (params: GetEndpointNameParams): Promise<EndpointResponse> => {
  return zodFetch(ENDPOINT, {
    input: getEndpointNameParamsSchema,
    output: endpointResponseSchema,
  }, params);
};

// ============================================================================
// Input Schema & Types
//
// getEndpointNameParamsSchema
// GetEndpointNameParams
// ============================================================================

getEndpointNameParamsSchema
GetEndpointNameParams

export const getEndpointNameParamsSchema = z.object({
  // schema definition
});

export type GetEndpointNameParams = z.infer<typeof getEndpointNameParamsSchema>;

// ============================================================================
// Output Schema & Types
// 
// endpointResponseSchema
// EndpointResponse
// ============================================================================

endpointResponseSchema
EndpointResponse

export const endpointResponseSchema = z.object({
  // schema definition
});

export type EndpointResponse = z.infer<typeof endpointResponseSchema>;

// ============================================================================
// TanStack Query Hook
//
// useEndpointName
// ============================================================================

useEndpointName

export const useEndpointName = (params: GetEndpointNameParams, options?: TanStackOptions<EndpointResponse>) => {
  return useQuery({
    queryKey: ["api", "category", "endpoint", params],
    queryFn: () => getEndpointName(params),
    ...options,
  });
};
```

This style guide ensures consistency across all 90+ API endpoints and provides a clear template for refactoring efforts.
