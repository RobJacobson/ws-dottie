# TSDoc Comments Best Practices

This document outlines the TSDoc commenting style and best practices for the ws-dottie codebase, based on our refactoring work to align comments with official API documentation and real-world usage.

**Important**: This document covers **TSDoc comments only** (JSDoc-style documentation blocks). Zod `.describe()` annotations are covered in a separate document (`docs/misc/zod-describe-annotations-prd.md`) and should not be modified when working with TSDoc comments.

## TSDoc Comment Style Overview

Our TSDoc comments are based on **ground-truth information** from:
- Official API documentation from WSDOT and WSF websites
- Actual curl requests to verify API behavior
- Real response examples from the APIs

This ensures accuracy and provides developers with practical, working examples that reflect actual API behavior.

## Module-Level TSDoc Comments

### Location and Structure
Each API implementation file should begin with a comprehensive TSDoc comment block at the top of the file (not in index files). This comment must contain all of the following elements:

### Required Elements

#### 1. API Name and Description
```typescript
/**
 * WSDOT Travel Times API
 *
 * Real-time travel time data for major highway corridors in Washington State, including current
 * and average travel times between key destinations. Provides route timing information for I-5,
 * I-405, I-90, SR 520, and other major highways with support for HOV lanes and express lanes.
 *
 * This API enables applications to display current traffic conditions, compare current vs average
 * travel times, and provide route planning information. Data includes start/end points with GPS
 * coordinates, milepost information, and route descriptions for major metropolitan areas including
 * Seattle, Bellevue, Everett, Tacoma, and Portland metro regions.
 */
```

#### 2. API Functions List
```typescript
/**
 * API Functions:
 * - getTravelTimeById: Returns one TravelTimeRoute object for the specified TravelTimeID
 * - getTravelTimes: Returns an array of TravelTimeRoute objects for all travel time routes
 */
```

#### 3. Input/Output Overview
```typescript
/**
 * Input/Output Overview:
 * - getTravelTimeById: Input: { travelTimeId: number }, Output: TravelTimeRoute
 * - getTravelTimes: Input: none, Output: TravelTimeRoute[]
 */
```

#### 4. Base Type Definitions
Show the documented base type structure with all officially documented fields and their types:

```typescript
/**
 * Base Type: TravelTimeRoute
 *
 * interface TravelTimeRoute {
 *   AverageTime: number;
 *   CurrentTime: number;
 *   Description: string | null;
 *   Distance: number;
 *   EndPoint: TravelTimeEndpoint | null;
 *   Name: string | null;
 *   StartPoint: TravelTimeEndpoint | null;
 *   TravelTimeID: number;
 *   TimeUpdated: string; // Undocumented field
 * }
 *
 * interface TravelTimeEndpoint {
 *   Description: string | null;
 *   Direction: string | null;
 *   MilePost: number;
 *   RoadName: string | null;
 *   Latitude: number; // Undocumented field
 *   Longitude: number; // Undocumented field
 * }
 *
 * Note: Only include fields that are officially documented. Undocumented fields that appear 
 * in API responses should be marked in examples but not included in the interface.
 */
```

#### 5. Curl Commands and Example Responses
```typescript
/**
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID=1&AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from the single travel time curl command:
 *
 * ```json
 * {
 *   "AverageTime": 25,
 *   "CurrentTime": 25,
 *   "Description": "Everett to Downtown Seattle",
 *   "Distance": 26.72,
 *   "EndPoint": {
 *     "Description": "I-5 @ University St in Seattle",
 *     "Direction": "S",
 *     "Latitude": 47.609294000,
 *     "Longitude": -122.331759000,
 *     "MilePost": 165.83,
 *     "RoadName": "005"
 *   },
 *   "Name": "Everett-Seattle",
 *   "StartPoint": {
 *     "Description": "I-5 @ 41st St in Everett",
 *     "Direction": "S",
 *     "Latitude": 47.964146000,
 *     "Longitude": -122.199237000,
 *     "MilePost": 192.55,
 *     "RoadName": "005"
 *   },
 *   "TimeUpdated": "/Date(1756192200000-0700)/",
 *   "TravelTimeID": 1
 * }
 * ```
 */
```

## Function-Level TSDoc Comments

### API Functions
Each API function must have a comprehensive TSDoc comment with the following structure:

```typescript
/**
 * Retrieves real-time travel time data for a specific highway route by its ID.
 * 
 * @param params - Parameters object for travel time query
 * @param params.travelTimeId - Unique travel time route identifier (positive integer)
 * @returns Promise<TravelTimeRoute> - Real-time travel time data for the specified route
 * 
 * @example
 * const travelTime = await getTravelTimeById({ travelTimeId: 1 });
 * console.log(travelTime.Description);  // "Everett to Downtown Seattle"
 * console.log(travelTime.CurrentTime);  // 25
 * console.log(travelTime.AverageTime);  // 25
 * 
 * @throws {Error} When travel time ID is invalid or API is unavailable
 */
```

### API Functions with No Parameters
```typescript
/**
 * Retrieves real-time travel time data for all available highway routes.
 * 
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<TravelTimeRoute[]> - Array of real-time travel time data for all routes
 * 
 * @example
 * const travelTimes = await getTravelTimes();
 * console.log(travelTimes.length);  // 20
 * 
 * @throws {Error} When API is unavailable
 */
```

### TanStack Query Hook Functions
```typescript
/**
 * TanStack Query hook for travel time data with automatic updates (single item).
 * 
 * @param params - Parameters object for travel time query
 * @param params.travelTimeId - Unique travel time route identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TravelTimeRoute, Error> - Query result with real-time travel time data
 * 
 * @example
 * const { data: travelTime, isLoading } = useTravelTimeById({ travelTimeId: 1 });
 * if (travelTime) {
 *   console.log(travelTime.Description);  // "Everett to Downtown Seattle"
 *   console.log(travelTime.CurrentTime);  // 25
 * }
 */
```

### Array Functions
```typescript
/**
 * TanStack Query hook for all travel times with automatic updates (array).
 * 
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TravelTimeRoute[], Error> - Query result with array of real-time travel time data
 * 
 * @example
 * const { data: travelTimes, isLoading } = useTravelTimes();
 * if (travelTimes) {
 *   console.log(travelTimes.length);  // 20
 * }
 */
```

## Schema TSDoc Comments

### Input Schema Comments
```typescript
/** 
 * Parameters for retrieving real-time travel time data for a specific route
 */ 
export const getTravelTimeByIdParamsSchema = z.object({...});

export type GetTravelTimeByIdParams = z.infer<typeof getTravelTimeByIdParamsSchema>;

/**
 * Parameters for retrieving all travel times (no parameters required)
 */
export const getTravelTimesParamsSchema = z.object({}).describe("");

export type GetTravelTimesParams = z.infer<typeof getTravelTimesParamsSchema>;
```

### Output Schema Comments
```typescript
/**
 * Real-time travel time data schema - includes current and average travel times with route details
 */
export const travelTimeRouteSchema = z.object({...});

/**
 * TravelTimeRoute type - represents real-time travel time data for a highway route
 */
export type TravelTimeRoute = z.infer<typeof travelTimeRouteSchema>;

/**
 * Array of travel time route objects - wrapper around travelTimeRouteSchema
 */
export const travelTimeRouteArraySchema = z.array(travelTimeRouteSchema);
```

### Complex Type Documentation
```typescript
/**
 * TravelTimeEndpoint type - represents start or end point of a travel time route
 */
export type TravelTimeEndpoint = z.infer<typeof travelTimeEndpointSchema>;
```

**CRITICAL**: Do not modify any existing `.describe()` calls in Zod schemas. These are beyond the scope of TSDoc comments and must remain exactly as they are.

## Section Comments

Use clear section dividers to organize code:

```typescript
// ============================================================================
// Section Name
//
// Brief description of what's in this section
// ============================================================================
```

Common sections include:
- API Functions
- Input Schemas & Types
- Output Schemas & Types
- React Query Hooks

## Key Principles

1. **Accuracy First**: All TSDoc comments must reflect actual API behavior, not assumptions
2. **Ground-Truth Sources**: Base all information on official documentation and curl verification
3. **Practical Examples**: Include working curl commands and real response data
4. **Completeness**: Cover all public functions and their signatures with precise `@param` documentation
5. **Clarity**: Use clear, concise language that helps developers understand the API
6. **Consistency**: Follow the established format across all API files
7. **TanStack Query Terminology**: Use "TanStack Query" consistently (not "React Query")
8. **No Schema Aliases**: Use full schema names like `zWsdotDate()` directly, not aliases like `zDate`

## Technical Requirements

### Mandatory Empty Object Schemas
All functions must have explicit input schemas, even when no parameters are required:

```typescript
// ✅ CORRECT - Function with no parameters
export const getTravelTimesParamsSchema = z.object({}).describe("");

// ✅ CORRECT - Function with optional parameters  
export const getHighwayAlertsParamsSchema = z.object({
  regionId: z.number().optional().describe("Optional region filter")
}).describe("");

// ❌ INCORRECT - Missing schema for no-parameter function
export const getTravelTimes = async () => { ... }; // WRONG!
```

### Undocumented Fields Handling
When API responses contain fields not mentioned in official documentation:
- **Include all fields** in examples to show complete API behavior
- **Mark undocumented fields** with `// Undocumented field` comments
- **Do not add undocumented fields** to Zod schemas (keep schemas aligned with official docs)
- **Do not include undocumented fields** in the TypeScript interface definition
- **Note the discrepancy** in module comments for future reference

### Error Documentation
Only document errors that are explicitly specified in official API documentation:

```typescript
/**
 * @throws {Error} When travel time ID is invalid or API is unavailable
 * 
 * Note: Only document errors that are explicitly specified in official API documentation.
 * Do not speculate about potential errors - some APIs may return empty arrays or null
 * values instead of throwing errors.
 */
```

## What to Avoid

- Speculative or outdated information
- TSDoc comments that don't match actual API behavior
- Overly technical implementation details
- Missing or incomplete examples
- Inconsistent formatting across files
- Modifying existing Zod `.describe()` calls (these are off-limits)
- Using "React Query" terminology (use "TanStack Query")
- Using schema aliases (use full schema names)
- Including undocumented fields in interface definitions

## Maintenance

When updating API files:
1. Verify curl commands still work
2. Update example outputs if API responses change
3. Ensure function signatures match actual implementation
4. Keep descriptions aligned with official documentation
5. Verify no `.describe()` calls were modified
6. Check TanStack Query terminology is used consistently
7. Verify no schema aliases are used
8. Check that interface definitions only include officially documented fields

This TSDoc commenting style provides developers with reliable, actionable information that directly supports their use of the APIs while maintaining strict separation from Zod schema descriptions.
