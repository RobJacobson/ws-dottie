# Endpoint File Conversion Template

## Overview
This document provides exact, mechanical instructions for converting existing endpoint files to use the new `defineEndpoint` pattern. This is a cookie-cutter process with no discretion required.

## Prerequisites
- ✅ `src/shared/endpoints.ts` exists with `defineEndpoint`, `InferInput`, and `InferOutput`
- ✅ `src/shared/utils/dateUtils.ts` exists with date helper functions
- ✅ Pilot conversion completed on `wsdot-highway-cameras` module

## Conversion Process

### Step 1: Update Imports
Replace the existing imports section with this exact pattern:

```ts
import { z } from "zod";
import { [outputSchemaName] } from "@/schemas/[module-folder]";
import {
  defineEndpoint,
  type InferInput,
  type InferOutput,
} from "@/shared/endpoints";
```

**Replacements:**
- `[outputSchemaName]`: The output schema import name (e.g., `highwayCameraSchema`)
- `[module-folder]`: The schema folder name (e.g., `wsdot-highway-cameras`)

### Step 2: Extract Input Schema (if needed)
If the file has parameters, extract the input schema:

```ts
/** Params schema for [functionName] */
export const [functionName]ParamsSchema = z.object({
  // Copy the existing parameter definitions from the zodFetch call
});
```

**Replacements:**
- `[functionName]`: The function name (e.g., `getHighwayCamera`)

### Step 3: Replace Main Function with defineEndpoint
Replace the entire function definition and `createQueryOptions` call with:

```ts
/** Endpoint definition for [functionName] */
export const [functionName]Def = defineEndpoint({
  moduleGroup: "[module-folder]",
  functionName: "[functionName]",
  endpoint: "[endpoint-url]",
  inputSchema: [inputSchemaName],
  outputSchema: [outputSchemaName],
  sampleParams: [sample-params],
  cacheStrategy: "[cache-strategy]",
});
```

**Replacements:**
- `[functionName]`: The function name
- `[module-folder]`: The folder name (e.g., `wsdot-highway-cameras`)
- `[endpoint-url]`: The endpoint URL from the existing `zodFetch` call
- `[inputSchemaName]`: The input schema name (e.g., `getHighwayCameraParamsSchema` or `z.object({})`)
- `[outputSchemaName]`: The output schema name (e.g., `highwayCameraSchema`)
- `[sample-params]`: See Step 4 below
- `[cache-strategy]`: The cache strategy from the existing `createQueryOptions` call

### Step 4: Determine sampleParams
**For parameterless endpoints:**
```ts
sampleParams: {},
```

**For endpoints with parameters:**
1. Check `tests/e2e/config/[module-folder].ts` for `validParams`
2. If found, copy the `validParams` object
3. If not found, use empty object `{}`

**For date parameters, use these patterns:**
- Single future date: `{ dateParam: getSampleDates().tomorrow }`
- Date range: `{ fromDate: getSampleDates().tomorrow, toDate: getSampleDates().dayAfterTomorrow }`
- Historical range: `{ dateStart: getHistoricalDateRange().startOfMonth, dateEnd: getHistoricalDateRange().endOfMonth }`

**Import date helpers if needed:**
```ts
import { getSampleDates, getHistoricalDateRange } from "@/shared/utils/dateUtils";
```

### Step 5: Add Type Exports
Add these exact type exports at the end of the file:

```ts
/** [FunctionName] params type */
export type [FunctionName]Params = InferInput<typeof [functionName]Def>;

/** [OutputTypeName] type */
export type [OutputTypeName] = InferOutput<typeof [functionName]Def>;
```

**Replacements:**
- `[FunctionName]`: Pascal case function name (e.g., `GetHighwayCamera`)
- `[functionName]`: The function name (e.g., `getHighwayCamera`)
- `[OutputTypeName]`: The output type name (e.g., `HighwayCamera`)

### Step 6: Remove Old Code
Delete these items from the file:
- The old function definition (the `async` function)
- The old `createQueryOptions` call
- Any backward compatibility exports
- Any unused imports (linter will help identify these)

## Example Conversion

### Before:
```ts
import { z } from "zod";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";
import { highwayCameraSchema } from "@/schemas/wsdot-highway-cameras";

export const getHighwayCamera = async (params: GetHighwayCameraParams): Promise<HighwayCamera> =>
  zodFetch({
    endpoint: "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson",
    inputSchema: getHighwayCameraParamsSchema,
    outputSchema: highwayCameraSchema,
    params,
  });

export const highwayCameraOptions = createQueryOptions({
  apiFunction: getHighwayCamera,
  queryKey: ["wsdot", "highway-cameras", "getHighwayCamera"],
  cacheStrategy: "DAILY_STATIC",
});

export type GetHighwayCameraParams = z.infer<typeof getHighwayCameraParamsSchema>;
```

### After:
```ts
import { z } from "zod";
import { highwayCameraSchema } from "@/schemas/wsdot-highway-cameras";
import {
  defineEndpoint,
  type InferInput,
  type InferOutput,
} from "@/shared/endpoints";

/** Params schema for getHighwayCamera */
export const getHighwayCameraParamsSchema = z.object({
  /** Camera identifier */
  cameraID: z.number().int(),
});

/** Endpoint definition for getHighwayCamera */
export const getHighwayCameraDef = defineEndpoint({
  moduleGroup: "wsdot-highway-cameras",
  functionName: "getHighwayCamera",
  endpoint: "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson",
  inputSchema: getHighwayCameraParamsSchema,
  outputSchema: highwayCameraSchema,
  sampleParams: { cameraID: 9818 },
  cacheStrategy: "DAILY_STATIC",
});

/** GetHighwayCamera params type */
export type GetHighwayCameraParams = InferInput<typeof getHighwayCameraDef>;

/** HighwayCamera type */
export type HighwayCamera = InferOutput<typeof getHighwayCameraDef>;
```

## Files to Convert

Convert all files in these directories:
- `src/clients/wsdot-*/`
- `src/clients/wsf-*/`

**Do NOT convert:**
- `src/clients/wsdot-highway-cameras/` (already converted)
- Any `index.ts` files

## Validation

After each conversion:
1. Run `npm run build` to ensure no TypeScript errors
2. Check that the file exports `[functionName]Def`
3. Verify type exports are present
4. Ensure no unused imports remain

## Notes

- This is a mechanical process - follow the template exactly
- All necessary information is already in the existing files
- The only lookup required is checking E2E test configs for `sampleParams`
- Do not make any creative decisions - use the exact patterns shown
- Please re-read the PRD after you convert each folder, to ensure that your context is fresh.
