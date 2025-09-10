### Registry Single Source of Truth — PRD

#### Context
The current registry approach is semi-broken:
- Two separate registry files (`wsdot`, `wsf`) attempt to mirror metadata from client modules.
- Information is duplicated and drifts from the real source (client files).
- Scripts attempted to synchronize by copying, which led to corruption and maintenance overhead.

#### Goal
Create a single source of truth for every endpoint with zero duplication, located in each client file. The registry becomes a thin, combined view of per-endpoint metadata defined at the source.

This is designed to support:
- Running fetch functions in production using zodFetch.
- Running fetch functions in testing, including under scripts/validator and our e2e tests, with predefined input parameters for testing.
- Creating a factory for TanStack Query queryOptions.

#### Non-Goals
- No codegen/AST parsing to re-create registries.
- No descriptions or redundant fields in registry metadata.
- No standalone apiType field; derive it from `moduleGroup`.

#### Design Overview
Each endpoint client file exports one canonical metadata object alongside its handler. That metadata contains exactly the essential fields needed across CLI, runtime, and validation:

- endpoint: string (the HTTP path)
- inputSchema: z.ZodSchema<I>
- outputSchema: z.ZodSchema<O>
- input type: inferred from `inputSchema`
- output type: inferred from `outputSchema`
- module name: `moduleGroup` (folder name, e.g. `wsdot-highway-cameras`)
- function name: e.g. `getHighwayCameras`
- sampleParams?: Partial<I> (optional; used for validator/tests)
- cacheStrategy: "MINUTE_UPDATES" | "DAILY_STATIC" | "NONE" | [others]

Most of this information is already contained in each current endpoint file. It simply needs to be refactored and simplified into the desired shape:
- The endpoint, inputSchema, and outputSchema are current defined inside of zodFetch.
- The input type and output type are inferred from the schema.
- The module name is the folder name.
- The sample params are only needed for some fetch functions. They can be taken from the e2e tests.
- The cacheStrategy is currently shown inside of createQueryOptions.

Note on query keys:
- Do not store `queryKey` explicitly. Generate at runtime from stable metadata, e.g. `[moduleGroup, functionName]` (recommended) or `[apiPrefix, feature, functionName]`. Either is sufficient for TanStack Query.

#### Shared Types and Factory
Place types in `src/shared` and expose a helper to reduce boilerplate and keep handler/options consistent.

Type sketch:
```ts
export type CacheStrategy = "MINUTE_UPDATES" | "DAILY_STATIC" | "NONE";

export interface Endpoint<I, O> {
  moduleGroup: string;      // e.g. "wsdot-highway-cameras"
  functionName: string;     // e.g. "getHighwayCameras"
  endpoint: string;         // e.g. "/Traffic/api/.../GetCamerasAsJson"
  inputSchema: z.ZodSchema<I>;
  outputSchema: z.ZodSchema<O>;
  sampleParams?: Partial<I>;
  cacheStrategy: CacheStrategy;
}

export function defineEndpoint<I, O>(meta: Endpoint<I, O>) {
  const handler = (params: I) =>
    zodFetch({
      endpoint: meta.endpoint,
      inputSchema: meta.inputSchema,
      outputSchema: meta.outputSchema,
      params,
    });

  const queryKey = [meta.moduleGroup, meta.functionName] as const;

  const options = createQueryOptions({
    apiFunction: handler,
    queryKey,
    cacheStrategy: meta.cacheStrategy,
  });

  return { meta, handler, options } as const;
}
```

Client file example pattern:
```ts
export const getHighwayCamerasDef = defineEndpoint({
  moduleGroup: "wsdot-highway-cameras",
  functionName: "getHighwayCameras",
  endpoint: "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson",
  inputSchema: getHighwayCamerasParamsSchema,
  outputSchema: camerasSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

export const getHighwayCameras = getHighwayCamerasDef.handler;
export const highwayCamerasOptions = getHighwayCamerasDef.options;
export const getHighwayCamerasMeta = getHighwayCamerasDef.meta;
```

#### Direct CLI Integration
- Provide a barrel `src/clients/index.ts` that re-exports all `*Def` endpoint definitions.
- Update CLI to import endpoint definitions directly, eliminating the registry layer entirely.
- CLI uses `endpointDef.meta.inputSchema` for validation and `endpointDef.handler` for execution.
- Help text uses output schema descriptions (e.g., "Coverage Area: Statewide. Provides access to...") for function descriptions.
- No duplication, no registry files, and no sync issues.

#### Validator Refactor
- Load the combined registry. Build:
  - `ENDPOINT_URLS` from `endpoint`
  - `MODULE_GROUPS` from `moduleGroup`
  - `ENDPOINT_PARAMS` from optional `sampleParams`
- Determine base URL and API key parameter from `moduleGroup` prefix (`wsf` vs `wsdot`).
- Remove hardcoded mappings.

#### Migration Plan
1) Add shared types and `defineEndpoint` helper in `src/shared`.
2) Convert one module end-to-end (e.g., `wsdot-highway-cameras`) to validate the approach.
3) Add barrel `src/clients/index.ts` that re-exports all `*Def` endpoint definitions.
4) Update CLI to use direct imports from barrel, eliminating registry layer entirely.
5) Refactor validator to consume endpoint definitions directly.
6) Migrate remaining modules to `defineEndpoint` pattern (mechanical change).
7) Remove legacy split registries and any copy/sync scripts.

#### Detailed Implementation Template

**Step 1: Shared Types and Factory**
```ts
// src/shared/endpoints.ts
export type CacheStrategy = "MINUTE_UPDATES" | "DAILY_STATIC" | "NONE" | "REALTIME_UPDATES" | "FIVE_MINUTE_UPDATES" | "HOURLY_UPDATES" | "DAILY_UPDATES" | "WEEKLY_STATIC";

export interface Endpoint<I, O> {
  moduleGroup: string;      // e.g. "wsdot-highway-cameras"
  functionName: string;     // e.g. "getHighwayCameras"
  endpoint: string;         // e.g. "/Traffic/api/.../GetCamerasAsJson"
  inputSchema: z.ZodSchema<I>;
  outputSchema: z.ZodSchema<O>;
  sampleParams?: Partial<I>;
  cacheStrategy: CacheStrategy;
}

export function defineEndpoint<I, O>(meta: Endpoint<I, O>) {
  const handler = (params: I) =>
    zodFetch({
      endpoint: meta.endpoint,
      inputSchema: meta.inputSchema,
      outputSchema: meta.outputSchema,
      params,
    });

  const queryKey = [meta.moduleGroup, meta.functionName] as const;

  const options = createQueryOptions({
    apiFunction: handler,
    queryKey,
    cacheStrategy: meta.cacheStrategy,
  });

  return { meta, handler, options } as const;
}
```

**Step 2: Client File Conversion Pattern**
```ts
// Before (current pattern):
export const getHighwayCameras = async (params: GetHighwayCamerasParams): Promise<Cameras> =>
  zodFetch({
    endpoint: "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson",
    inputSchema: getHighwayCamerasParamsSchema,
    outputSchema: camerasSchema,
    params,
  });

export const highwayCamerasOptions = createQueryOptions({
  apiFunction: getHighwayCameras,
  queryKey: ["wsdot", "highway-cameras", "getHighwayCameras"],
  cacheStrategy: "DAILY_STATIC",
});

// After (new pattern):
export const getHighwayCamerasDef = defineEndpoint({
  moduleGroup: "wsdot-highway-cameras",
  functionName: "getHighwayCameras",
  endpoint: "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson",
  inputSchema: getHighwayCamerasParamsSchema,
  outputSchema: camerasSchema,
  sampleParams: {}, // From E2E test validParams
  cacheStrategy: "DAILY_STATIC",
});

// Export types for external use
export type GetHighwayCamerasParams = z.infer<typeof getHighwayCamerasParamsSchema>;
export type HighwayCameras = z.infer<typeof camerasSchema>;
```

**Step 3: Direct CLI Integration**
```ts
// src/cli/commands/index.ts
import * as allEndpoints from "../clients";

export const handleCommand = async (
  functionName: string,
  paramsString: string,
  options: CliOptions
): Promise<void> => {
  // Find the endpoint definition
  const endpointDef = allEndpoints[`${functionName}Def` as keyof typeof allEndpoints];
  
  if (!endpointDef) {
    displayFunctionNotFound(functionName, getAvailableFunctions(), options);
    return;
  }

  // Execute using the endpoint definition directly
  await executeFunction(functionName, paramsString, endpointDef, options);
};

// Generate help from endpoint definitions using output schema descriptions
export const generateHelpText = (): string => {
  const functionList = Object.entries(allEndpoints)
    .filter(([key]) => key.endsWith('Def'))
    .map(([key, def]) => {
      const functionName = key.replace('Def', '');
      // Extract description from output schema (e.g., "Coverage Area: Statewide. Provides access to...")
      const description = def.meta.outputSchema.description || 
        `${def.meta.moduleGroup} - ${def.meta.functionName}`;
      return `  ${chalk.cyan(functionName)} - ${description}`;
    })
    .join("\n");
  // ... rest of help text
};
```

#### Backward Compatibility
- Maintain existing function exports and options during migration by re-exporting from the new `defineEndpoint` return value.

#### Risks & Mitigations
- Touches many files: mitigate via incremental module-by-module migration and CI checks.
- Inconsistent naming across modules: enforce `functionName` and `moduleGroup` via lint or simple tests.
- Query key changes: we use `[moduleGroup, functionName]`, which are stable and unique.

#### Acceptance Criteria
- Single combined registry exists and is derived solely from `*Meta` exports.
- All endpoints expose canonical metadata, handler, and options via `defineEndpoint`.
- Build passes; validator uses registry-derived metadata with no hardcoded maps.
- No descriptions or `apiType` stored; query keys derived at runtime.

#### Sample Parameters Strategy

Based on investigation of E2E test configurations, we need to extract sample parameters for endpoints that require them. The current patterns are:

**Date Parameters:**
- **Future dates**: Most endpoints use `getTestDates().tomorrow` for single date parameters
- **Date ranges**: Use `getTestDates().tomorrow` and `getTestDates().dayAfterTomorrow` for ranges
- **Historical data**: Use `getHistoricalDateRange()` which provides current month start/end dates
- **No hardcoded dates**: All dates are dynamically generated to prevent obsolescence

**Parameter Patterns:**
- **Parameterless endpoints**: Many endpoints require no parameters (`{}`)
- **ID-based endpoints**: Use valid IDs from test data (e.g., terminal IDs, vessel IDs)
- **Date-based endpoints**: Use dynamic date generation functions
- **Search endpoints**: Use valid search terms from test data

**Implementation Approach:**
1. Create shared date utilities in `src/shared/utils/dateUtils.ts`:
   ```ts
   export const getSampleDates = () => {
     const tomorrow = new Date();
     tomorrow.setDate(tomorrow.getDate() + 1);
     
     const dayAfterTomorrow = new Date();
     dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
     
     return { tomorrow, dayAfterTomorrow };
   };
   
   export const getHistoricalDateRange = () => {
     const now = new Date();
     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
     const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
     return { startOfMonth, endOfMonth };
   };
   ```

2. Extract sample parameters from E2E test configs where `validParams` is defined
3. Make `sampleParams` optional in the `Endpoint` interface
4. Use dynamic date generation to ensure parameters remain valid over time

**Sample Parameter Extraction Examples:**
- **Parameterless**: `sampleParams: {}` (from `validParams: {}`)
- **Single date**: `sampleParams: { tripDate: getSampleDates().tomorrow }`
- **Date range**: `sampleParams: { fromDate: getSampleDates().tomorrow, toDate: getSampleDates().dayAfterTomorrow }`
- **Historical range**: `sampleParams: { dateStart: getHistoricalDateRange().startOfMonth, dateEnd: getHistoricalDateRange().endOfMonth }`
- **ID-based**: `sampleParams: { cameraID: 9818 }` (from test data)
- **Complex**: `sampleParams: { tripDate: getSampleDates().tomorrow, departingTerminalID: 1, arrivingTerminalID: 10 }`



