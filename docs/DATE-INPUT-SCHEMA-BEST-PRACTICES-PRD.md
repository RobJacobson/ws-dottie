# Date Input Schema Best Practices PRD

## Executive Summary

This PRD establishes the standard approach for handling date inputs across all WSDOT/WSF API endpoints. Our APIs are designed to accept JavaScript Date objects as input parameters, which are then automatically converted to the appropriate string format (typically "YYYY-MM-DD") by the `zodFetch` utility before making HTTP requests.

**Key Principle**: All date input parameters should use `z.date()` schemas, not `z.string()` schemas, to ensure type safety and consistent date handling.

## Background

### Current State
- WSDOT/WSF APIs expect date parameters in specific string formats (e.g., "YYYY-MM-DD")
- Our API layer accepts JavaScript Date objects for better developer experience
- Date conversion happens automatically in the `zodFetch` utility
- Some schemas incorrectly use string inputs for dates, causing type mismatches

### Problem Statement
Inconsistent date input schemas across API modules lead to:
- Type safety issues (string vs Date object confusion)
- Inconsistent developer experience
- Potential runtime errors when date strings are passed instead of Date objects
- Maintenance burden of handling multiple date input formats

### Solution
Standardize all date input parameters to use `z.date()` schemas, ensuring:
- Consistent type safety across all APIs
- Automatic date format conversion by `zodFetch`
- Better developer experience with native Date objects
- Reduced chance of date format errors

## Date Input Best Practices

### 1. Input Schema Definition

**✅ CORRECT - Use JavaScript Date objects:**
```typescript
export const getScheduleByRouteParamsSchema = z.object({
  tripDate: z.date().describe("The trip date for which to retrieve schedule information."),
  routeId: z.number().int().positive().describe("Unique identifier for the route.")
});
```

**❌ INCORRECT - Don't use string inputs for dates:**
```typescript
export const getScheduleByRouteParamsSchema = z.object({
  tripDate: z.string().describe("The trip date as YYYY-MM-DD string."), // WRONG!
  routeId: z.number().int().positive().describe("Unique identifier for the route.")
});
```

### 2. Function Parameter Types

**✅ CORRECT - Accept Date objects:**
```typescript
export const getScheduleByRoute = async (
  params: { tripDate: Date; routeId: number }
): Promise<ScheduleResponse[]> => {
  // Implementation
};
```

**❌ INCORRECT - Don't accept string dates:**
```typescript
export const getScheduleByRoute = async (
  params: { tripDate: string; routeId: number } // WRONG!
): Promise<ScheduleResponse[]> => {
  // Implementation
};
```

### 3. JSDoc Examples

**✅ CORRECT - Show Date object usage:**
```typescript
/**
 * @example
 * const schedule = await getScheduleByRoute({ 
 *   tripDate: new Date('2024-01-15'), 
 *   routeId: 1 
 * });
 */
```

**❌ INCORRECT - Don't show string usage:**
```typescript
/**
 * @example
 * const schedule = await getScheduleByRoute({ 
 *   tripDate: '2024-01-15', // WRONG!
 *   routeId: 1 
 * });
 */
```

## How Date Conversion Works

### 1. zodFetch Date Transformation

The `zodFetch` utility automatically handles date conversion:

```typescript
// When a Date object is passed:
const params = { tripDate: new Date('2024-01-15'), routeId: 1 };

// zodFetch converts the Date to string before making the HTTP request:
// tripDate: "2024-01-15" (YYYY-MM-DD format)
```

### 2. URL Construction

Dates are automatically formatted for URL construction:

```typescript
// Input: { tripDate: new Date('2024-01-15'), routeId: 1 }
// URL: /ferries/api/schedule/rest/schedulebyroute/2024-01-15/1
```

### 3. API Compatibility

This approach ensures compatibility with:
- WSF APIs expecting "YYYY-MM-DD" format
- WSDOT APIs expecting various date formats
- Consistent date handling across all endpoints

## Schema Review Process

### 1. Identify Date Input Parameters

Search for date-related input parameters in the specified API module:

```bash
# Search for date input parameters
grep_search "z\.string\(\)\.describe.*[Dd]ate" src/api/{api-module}/*.ts
grep_search "z\.string\(\)\.describe.*[Ss]tart.*[Dd]ate" src/api/{api-module}/*.ts
grep_search "z\.string\(\)\.describe.*[Ee]nd.*[Dd]ate" src/api/{api-module}/*.ts
grep_search "z\.string\(\)\.describe.*[Ff]rom.*[Dd]ate" src/api/{api-module}/*.ts
grep_search "z\.string\(\)\.describe.*[Tt]o.*[Dd]ate" src/api/{api-module}/*.ts
```

### 2. Review Input Schemas

Examine each endpoint's input schema for incorrect date handling:

```typescript
// Look for patterns like:
export const someParamsSchema = z.object({
  startDate: z.string().describe("Start date"), // ❌ WRONG!
  endDate: z.string().describe("End date"),   // ❌ WRONG!
  tripDate: z.string().describe("Trip date"), // ❌ WRONG!
});
```

### 3. Check Function Signatures

Verify function parameters match the schema:

```typescript
// Look for mismatches like:
export const someFunction = async (
  params: { startDate: string; endDate: string } // ❌ WRONG!
): Promise<SomeType[]> => {
  // Implementation
};
```

### 4. Review JSDoc Examples

Check documentation for incorrect usage examples:

```typescript
/**
 * @example
 * const result = await someFunction({ 
 *   startDate: '2024-01-01', // ❌ WRONG!
 *   endDate: '2024-12-31'    // ❌ WRONG!
 * });
 */
```

## Schema Correction Process

### 1. Update Input Schema

Change string schemas to date schemas:

```typescript
// Before (incorrect)
export const someParamsSchema = z.object({
  startDate: z.string().describe("Start date"),
  endDate: z.string().describe("End date"),
});

// After (correct)
export const someParamsSchema = z.object({
  startDate: z.date().describe("Start date"),
  endDate: z.date().describe("End date"),
});
```

### 2. Update Type Definitions

Ensure TypeScript types reflect Date objects:

```typescript
// Before (incorrect)
export type SomeParams = {
  startDate: string;
  endDate: string;
};

// After (correct)
export type SomeParams = {
  startDate: Date;
  endDate: Date;
};
```

### 3. Update Function Signatures

Correct function parameter types:

```typescript
// Before (incorrect)
export const someFunction = async (
  params: { startDate: string; endDate: string }
): Promise<SomeType[]> => {
  // Implementation
};

// After (correct)
export const someFunction = async (
  params: { startDate: Date; endDate: Date }
): Promise<SomeType[]> => {
  // Implementation
};
```

### 4. Update JSDoc Examples

Correct usage examples:

```typescript
/**
 * @example
 * const result = await someFunction({ 
 *   startDate: new Date('2024-01-01'), // ✅ CORRECT!
 *   endDate: new Date('2024-12-31')    // ✅ CORRECT!
 * });
 */
```

### 5. Update Test Configurations

Ensure tests use Date objects:

```typescript
// Before (incorrect)
validParams: { 
  startDate: '2024-01-01', 
  endDate: '2024-12-31' 
},

// After (correct)
validParams: { 
  startDate: new Date('2024-01-01'), 
  endDate: new Date('2024-12-31') 
},
```

## Common Date Parameter Names

### 1. Single Date Parameters
- `tripDate` - Date for trip/schedule information
- `date` - Generic date parameter
- `effectiveDate` - Date when something becomes effective
- `asOfDate` - Date for "as of" queries

### 2. Date Range Parameters
- `startDate` / `endDate` - Date range boundaries
- `fromDate` / `toDate` - Alternative date range naming
- `beginDate` / `finishDate` - Alternative date range naming
- `dateFrom` / `dateThru` - Alternative date range naming

### 3. Time-Specific Parameters
- `departureDate` - Date of departure
- `arrivalDate` - Date of arrival
- `scheduledDate` - Scheduled date
- `actualDate` - Actual date

## Validation Rules

### 1. Required Date Fields

```typescript
export const requiredDateSchema = z.date().describe("Required date field");
```

### 2. Optional Date Fields

```typescript
export const optionalDateSchema = z.date().optional().describe("Optional date field");
```

### 3. Nullable Date Fields

```typescript
export const nullableDateSchema = z.date().nullable().describe("Nullable date field");
```

### 4. Date Range Validation

```typescript
export const dateRangeSchema = z.object({
  startDate: z.date().describe("Start date"),
  endDate: z.date().describe("End date")
}).refine(
  (data) => data.startDate <= data.endDate,
  {
    message: "Start date must be before or equal to end date",
    path: ["endDate"]
  }
);
```

## Testing Considerations

### 1. Test Data Setup

```typescript
// Use Date objects in test configurations
validParams: {
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31')
},
```

### 2. Edge Case Testing

```typescript
// Test boundary dates
customTests: [
  {
    name: "should handle date boundaries correctly",
    test: async () => {
      const result = await apiFunction({
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-01') // Same day
      });
      expect(result).toBeDefined();
    }
  }
]
```

### 3. Invalid Date Testing

```typescript
// Test invalid date handling
invalidParams: [
  {
    params: { startDate: new Date('invalid'), endDate: new Date('2024-12-31') },
    expectedError: "Invalid date"
  }
]
```

## Implementation Checklist

### For Each API Module Review:

- [ ] **Identify all date input parameters**
- [ ] **Review input schemas for incorrect string types**
- [ ] **Check function parameter types**
- [ ] **Review JSDoc examples**
- [ ] **Update schemas to use `z.date()`**
- [ ] **Update TypeScript types**
- [ ] **Update function signatures**
- [ ] **Update JSDoc examples**
- [ ] **Update test configurations**
- [ ] **Run tests to verify changes**
- [ ] **Document any breaking changes**

### Schema Update Template:

```typescript
// 1. Update schema
export const paramsSchema = z.object({
  // Before: startDate: z.string().describe("Start date"),
  startDate: z.date().describe("Start date"), // ✅ CORRECT!
  
  // Before: endDate: z.string().describe("End date"),
  endDate: z.date().describe("End date"),   // ✅ CORRECT!
});

// 2. Update type
export type Params = z.infer<typeof paramsSchema>;

// 3. Update function signature
export const someFunction = async (params: Params): Promise<Result[]> => {
  // Implementation
};

// 4. Update JSDoc example
/**
 * @example
 * const result = await someFunction({
 *   startDate: new Date('2024-01-01'), // ✅ CORRECT!
 *   endDate: new Date('2024-12-31')    // ✅ CORRECT!
 * });
 */
```

## Benefits of Standardization

### 1. Developer Experience
- **Type Safety**: Compile-time validation of date parameters
- **Consistency**: Same date handling across all APIs
- **IntelliSense**: Better IDE support for date parameters
- **Documentation**: Clear examples using Date objects

### 2. Maintainability
- **Single Pattern**: One way to handle dates across all APIs
- **Reduced Bugs**: Eliminates string vs Date confusion
- **Easier Testing**: Consistent test data patterns
- **Clear Contracts**: Obvious parameter expectations

### 3. API Compatibility
- **Automatic Conversion**: `zodFetch` handles format conversion
- **WSDOT/WSF Compliance**: Correct date formats sent to APIs
- **Error Prevention**: No manual date string formatting needed
- **Future-Proof**: Easy to change date formats if APIs change

## Conclusion

Standardizing date input schemas to use JavaScript Date objects provides significant benefits in type safety, developer experience, and maintainability. The automatic conversion by `zodFetch` ensures compatibility with WSDOT/WSF API requirements while maintaining a clean, consistent interface for developers.

**Key Takeaway**: All date input parameters should use `z.date()` schemas, not `z.string()` schemas. This ensures type safety and automatic date format conversion.

## Next Steps

1. **Review the specified API module** for incorrect date input schemas
2. **Identify all date parameters** that use string inputs
3. **Update schemas** to use `z.date()` instead of `z.string()`
4. **Update related code** (types, functions, examples, tests)
5. **Verify changes** by running tests
6. **Document any breaking changes** for users

This standardization will improve the overall quality and consistency of our API layer while maintaining full compatibility with external WSDOT/WSF APIs.
