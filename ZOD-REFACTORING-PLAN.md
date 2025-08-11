# Zod-First Refactoring Plan

> **WS-Dottie API Library Migration to Zod v4**

This document outlines a systematic approach to refactor the WS-Dottie API library from manual TypeScript types and date parsing to a Zod-first approach using Zod v4. The plan prioritizes maintaining WSDOT/WSF documentation as the single source of truth while ensuring comprehensive validation and type safety.

## Table of Contents

- [Executive Summary](#executive-summary)
- [Current State Analysis](#current-state-analysis)
- [Proposed Zod-First Architecture](#proposed-zod-first-architecture)
- [Detailed Implementation Plan](#detailed-implementation-plan)
- [Validation Strategy](#validation-strategy)
- [Migration Timeline](#migration-timeline)
- [Risk Mitigation](#risk-mitigation)
- [Success Metrics](#success-metrics)
- [Questions for Clarification](#questions-for-clarification)

## Executive Summary

This proposal outlines a systematic approach to refactor the WS-Dottie API library from manual TypeScript types and date parsing to a Zod-first approach using Zod v4. The plan prioritizes maintaining WSDOT/WSF documentation as the single source of truth while ensuring comprehensive validation and type safety.

### Key Benefits

- **7-14x faster** parsing with Zod v4
- **Smaller bundles** with better tree-shaking
- **Runtime validation** catches API changes
- **Automatic type safety** from schema definitions
- **Simplified maintenance** with single schema definitions

## Current State Analysis

### Current Architecture

- **16 APIs** with manual TypeScript type definitions
- **Manual date parsing** via custom `dateParsers.ts` utilities
- **Zod schemas** only used for e2e validation tests
- **WSDOT/WSF documentation** as source of truth in `docs/apis/` directory

### Key Challenges

- Type definitions and validation schemas can drift
- Manual date parsing requires custom maintenance
- No runtime validation of API responses
- Separate maintenance of types and validation

## Proposed Zod-First Architecture

### Core Principles

1. **Single Source of Truth**: Zod schemas define both validation and types
2. **Documentation-Driven**: All schemas based on WSDOT/WSF documentation
3. **Runtime Safety**: Automatic validation of all API responses
4. **Type Inference**: TypeScript types automatically derived from Zod schemas
5. **Transform-First**: Date parsing handled via Zod transforms
6. **Co-location**: Schemas live alongside API files for better organization

### New Architecture Benefits

- **7-14x faster** parsing with Zod v4
- **Smaller bundles** with better tree-shaking
- **Runtime validation** catches API changes
- **Automatic type safety** from schema definitions
- **Simplified maintenance** with single schema definitions

## Detailed Implementation Plan

### Phase 1: Foundation & Pilot API (WSDOT Weather Information)

#### Step 1.1: Setup Zod v4 Infrastructure

```bash
# Update to Zod v4
npm install zod@^4.0.0

# Create shared utilities directory
mkdir -p src/shared/schemas
```

#### Step 1.2: Create Base Zod Utilities

Create `src/shared/schemas/date-transforms.ts`:

```typescript
import { z } from "zod";

// WSDOT date format: "/Date(timestamp)/"
export const wsdotDateSchema = z
  .string()
  .regex(/^\/Date\(\d+(-\d+)?\)\/$/)
  .transform((val) => {
    const timestamp = parseInt(val.slice(6, 19), 10);
    return new Date(timestamp);
  });

// WSF date format: "MM/DD/YYYY"
export const wsfDateSchema = z
  .string()
  .regex(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  .transform((val) => {
    const [, month, day, year] = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)!;
    return new Date(Number(year), Number(month) - 1, Number(day));
  });

// WSF datetime format: "MM/DD/YYYY HH:MM:SS AM/PM"
export const wsfDateTimeSchema = z
  .string()
  .regex(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})\s+(AM|PM)$/i)
  .transform((val) => {
    const match = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})\s+(AM|PM)$/i)!;
    const [, month, day, year, hours, minutes, seconds, ampm] = match;
    const adjustedHours = ampm.toUpperCase() === "PM" 
      ? (Number(hours) === 12 ? 12 : Number(hours) + 12)
      : (Number(hours) === 12 ? 0 : Number(hours));
    return new Date(Number(year), Number(month) - 1, Number(day), adjustedHours, Number(minutes), Number(seconds));
  });
```

#### Step 1.3: Create WSDOT Weather Information Schema

Create `src/api/wsdot-weather-information/schema.ts`:

```typescript
import { z } from "zod";
import { wsdotDateSchema } from "@/shared/schemas/date-transforms";

// Based on WSDOT documentation and current API responses
export const weatherInfoSchema = z.object({
  BarometricPressure: z.number().nullable(),
  Latitude: z.number(),
  Longitude: z.number(),
  PrecipitationInInches: z.number().nullable(),
  ReadingTime: wsdotDateSchema,
  RelativeHumidity: z.number().nullable(),
  SkyCoverage: z.string().nullable(),
  StationID: z.number(),
  StationName: z.string(),
  TemperatureInFahrenheit: z.number().nullable(),
  Visibility: z.number().nullable(),
  WindDirection: z.number().nullable(),
  WindDirectionCardinal: z.string().nullable(),
  WindGustSpeedInMPH: z.number().nullable(),
  WindSpeedInMPH: z.number().nullable(),
});

export const weatherInformationArraySchema = z.array(weatherInfoSchema);

// Type inference
export type WeatherInfo = z.infer<typeof weatherInfoSchema>;
export type WeatherInformationResponse = z.infer<typeof weatherInformationArraySchema>;
```

#### Step 1.4: Update API Implementation

Update `src/api/wsdot-weather-information/api.ts`:

```typescript
import { createFetchFactory } from "@/shared/fetching/api";
import { weatherInformationArraySchema, weatherInfoSchema } from "./schema";
import type { WeatherInfo, WeatherInformationResponse } from "./schema";

const createFetch = createFetchFactory(
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc"
);

// Add validation wrapper
const validateResponse = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data);
};

export const getWeatherInformation = createFetch<WeatherInformationResponse>(
  "/GetCurrentWeatherInformationAsJson"
).pipe((data) => validateResponse(weatherInformationArraySchema, data));

export const getWeatherInformationByStationId = createFetch<
  { stationId: number },
  WeatherInfo
>("/GetCurrentWeatherInformationByStationIDAsJson?StationID={stationId}")
.pipe((data) => validateResponse(weatherInfoSchema, data));
```

#### Step 1.5: Update Tests

Update `tests/e2e/validation/wsdot-weather-information/schemas.ts`:

```typescript
// Import from new schema location
export { weatherInfoSchema, weatherInformationArraySchema } from "@/api/wsdot-weather-information/schema";
```

#### Step 1.6: Remove Old Types

Delete `src/api/wsdot-weather-information/types.ts` and update imports.

#### Step 1.7: Validate Pilot Implementation

```bash
# Run tests for pilot API
npm run test:e2e:validation -- wsdot-weather-information
npm run test:e2e:api -- wsdot-weather-information
```

### Phase 2: Systematic API Migration

#### Migration Order (Based on Complexity)

1. **WSDOT Weather Information** ✅ (Pilot)
2. **WSDOT Weather Stations** (Simple, static data)
3. **WSDOT Border Crossings** (Simple, real-time)
4. **WSDOT Highway Cameras** (Simple, static)
5. **WSDOT Bridge Clearances** (Simple, static)
6. **WSDOT Commercial Vehicle Restrictions** (Simple, static)
7. **WSDOT Toll Rates** (Medium complexity)
8. **WSDOT Traffic Flow** (Medium complexity)
9. **WSDOT Travel Times** (Medium complexity)
10. **WSDOT Highway Alerts** (Medium complexity)
11. **WSDOT Mountain Pass Conditions** (Medium complexity)
12. **WSDOT Weather Information Extended** (Complex, many fields)
13. **WSF Fares** (Complex, many endpoints)
14. **WSF Terminals** (Complex, many endpoints)
15. **WSF Schedule** (Complex, many endpoints)
16. **WSF Vessels** (Complex, many endpoints)

#### Step 2.1: Create Migration Template

For each API, follow this template:

1. **Create schema file**: `src/api/{api-name}/schema.ts`
2. **Update API implementation**: `src/api/{api-name}/api.ts`
3. **Update tests**: `tests/e2e/validation/{api-name}/`
4. **Remove old types**: Delete `src/api/{api-name}/types.ts`
5. **Update exports**: Update `src/api/{api-name}/index.ts`
6. **Run validation**: Ensure all tests pass before proceeding

#### Step 2.2: WSDOT Weather Stations Migration

```typescript
// src/api/wsdot-weather-stations/schema.ts
export const weatherStationDataSchema = z.object({
  Latitude: z.number(),
  Longitude: z.number(),
  StationCode: z.number(),
  StationName: z.string(),
});

export type WeatherStationData = z.infer<typeof weatherStationDataSchema>;
```

### Phase 3: Advanced Features

#### Step 3.1: Enhanced Date Transforms

Create specialized transforms for different API patterns:

```typescript
// src/shared/schemas/date-transforms.ts
export const createWsdotDateSchema = (fieldName: string) =>
  z.string()
    .regex(/^\/Date\(\d+(-\d+)?\)\/$/)
    .transform((val) => {
      const timestamp = parseInt(val.slice(6, 19), 10);
      return new Date(timestamp);
    })
    .describe(`WSDOT date format for ${fieldName}`);

export const createWsfDateSchema = (fieldName: string) =>
  z.string()
    .regex(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
    .transform((val) => {
      const [, month, day, year] = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)!;
      return new Date(Number(year), Number(month) - 1, Number(day));
    })
    .describe(`WSF date format for ${fieldName}`);
```

#### Step 3.2: Schema Composition

Create reusable schema components:

```typescript
// src/shared/schemas/common-schemas.ts
export const locationSchema = z.object({
  Latitude: z.number(),
  Longitude: z.number(),
});

export const nullableNumberSchema = z.number().nullable();
export const nullableStringSchema = z.string().nullable();
```

#### Step 3.3: Error Handling Enhancement

```typescript
// src/shared/schemas/error-handling.ts
export const createApiValidator = <T>(schema: z.ZodSchema<T>) => ({
  validate: (data: unknown): T => schema.parse(data),
  validateSafe: (data: unknown) => schema.safeParse(data),
  validateAsync: async (data: unknown): Promise<T> => schema.parseAsync(data),
  validateSafeAsync: async (data: unknown) => schema.safeParseAsync(data),
});
```

### Phase 4: Performance Optimization

#### Step 4.1: Bundle Size Optimization

```typescript
// Use Zod Mini for production builds
import { z } from "zod/mini"; // Smaller bundle size
```

#### Step 4.2: Schema Caching

```typescript
// Cache parsed schemas for better performance
const schemaCache = new Map<string, z.ZodSchema>();

export const getCachedSchema = <T>(key: string, schema: z.ZodSchema<T>): z.ZodSchema<T> => {
  if (!schemaCache.has(key)) {
    schemaCache.set(key, schema);
  }
  return schemaCache.get(key)!;
};
```

## Validation Strategy

### Documentation Compliance

- All schemas must match WSDOT/WSF documentation exactly
- Field names, types, and constraints must align with official docs
- Date formats must match documented API responses

### Testing Strategy

1. **E2E Validation Tests**: Ensure schemas validate real API responses
2. **Type Safety Tests**: Verify TypeScript types match runtime validation
3. **Performance Tests**: Measure parsing speed improvements
4. **Bundle Size Tests**: Monitor bundle size impact

### Quality Gates

- All existing tests must pass
- No runtime validation errors in production
- Bundle size must not increase significantly
- All API responses must validate successfully

## Migration Timeline

### Week 1: Foundation & Pilot

- Setup Zod v4 infrastructure
- Complete WSDOT Weather Information migration
- Validate pilot implementation

### Week 2-3: Simple APIs

- Migrate 6 simple APIs (Weather Stations, Border Crossings, etc.)
- Establish patterns and templates

### Week 4-5: Medium Complexity APIs

- Migrate 5 medium complexity APIs
- Add advanced features and optimizations

### Week 6-7: Complex APIs

- Migrate 4 complex APIs (WSF APIs)
- Performance optimization and final validation

### Week 8: Final Validation

- Comprehensive testing
- Documentation updates
- Performance benchmarking

## Risk Mitigation

### Rollback Strategy

- Each API migration is independent
- Can rollback individual APIs if issues arise
- Maintain old type definitions during transition

### Testing Strategy

- Comprehensive e2e tests for each API
- Performance benchmarking before/after
- Bundle size monitoring

### Documentation Strategy

- Update all API documentation to reflect Zod schemas
- Maintain WSDOT/WSF documentation as source of truth
- Document migration patterns for future reference

## Success Metrics

### Performance

- **7-14x faster** parsing (Zod v4 benchmark)
- **Reduced bundle size** with better tree-shaking
- **Faster TypeScript compilation** with improved type inference

### Quality

- **100% test coverage** maintained
- **Zero runtime validation errors** in production
- **Complete documentation compliance** with WSDOT/WSF APIs

### Developer Experience

- **Simplified maintenance** with single schema definitions
- **Better IntelliSense** with inferred types
- **Runtime safety** with automatic validation

## Questions for Clarification

1. **Pilot API Selection**: Should we proceed with WSDOT Weather Information as the pilot, or would you prefer a different API?

2. **Date Format Handling**: Are there any specific date format edge cases we should be aware of beyond the documented WSDOT/WSF formats?

3. **Error Handling**: How should we handle validation errors in production? Should we log them, throw them, or handle them gracefully?

4. **Bundle Size**: What's the acceptable threshold for bundle size increase, if any?

5. **Testing Strategy**: Should we maintain the existing e2e test structure or modify it to work better with Zod schemas?

6. **Documentation Updates**: Should we update the API documentation to reflect the new Zod-based approach, or keep it focused on the external API interface?

---

This plan provides a systematic approach to migrate your codebase to a Zod-first architecture while maintaining the WSDOT/WSF documentation as the single source of truth. Each phase builds upon the previous one, ensuring we can validate and rollback if needed.