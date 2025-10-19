# Simplified Endpoint Description Process

## Overview
This guide breaks down the endpoint description task into two clear, separate steps that agents can follow without confusion.

## Step 1: Update endpoints.ts (No Creativity Required)

### What You Need to Do:
1. **Identify the endpoint category** for each endpoint in the `endpoints.ts` file:
   - **All Items**: Endpoints returning all available data without filtering (e.g., `/routes/{TripDate}`)
   - **Single Item**: Endpoints returning one specific item (e.g., `/routes/{TripDate}/{RouteID}`)
   - **Filtered Items**: Endpoints returning a subset based on parameters (e.g., `/routedetails/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}`)

2. **Use the correct function call** based on the category:
   - For "All Items": `allItems("EntityName", DESCRIPTIONS)`
   - For "Single Item": `singleItem("EntityName", DESCRIPTIONS)`
   - For "Filtered Items": `filteredItems("EntityName", DESCRIPTIONS, "filter criteria")`

3. **Identify the correct entity name** by looking at the output schema:
   - `z.array(o.routeSchema)` → EntityName = "Route"
   - `o.routeDetailSchema` → EntityName = "RouteDetail"
   - `z.array(o.sailingSchema)` → EntityName = "Sailing"

4. **For filteredItems, determine filter criteria from the input schema**:
   - Look at the input schema object (e.g., `i.routeDetailsByTripDateAndTerminalsSchema`)
   - Extract parameter names from the Zod schema definition
   - Use human-readable descriptions of these parameters for the filter criteria
   - Common patterns:
     - `{TripDate}` → "trip date"
     - `{RouteID}` → "route ID"
     - `{DepartingTerminalID}/{ArrivingTerminalID}` → "terminal combination"
     - `{VesselName}/{DateStart}/{DateEnd}` → "vessel name, start date, and end date"

### Examples:
```typescript
// All Items - returns all routes for a trip date
description: allItems("Route", SCHEDULE_DESCRIPTIONS)

// Single Item - returns one specific route detail
description: singleItem("RouteDetail", SCHEDULE_DESCRIPTIONS)

// Filtered Items - returns route details filtered by date and terminals
description: filteredItems("RouteDetail", SCHEDULE_DESCRIPTIONS, "trip date and terminal combination")
```

### What NOT to Do:
- ❌ Don't guess the function to use - look at the input schema parameters
- ❌ Don't make up entity names - use what's in the output schema
- ❌ Don't create new entity names that don't match the schema

## Step 2: Create/Update descriptions.ts (Requires Research)

### What You Need to Do:
1. **Research each entity type** by reviewing:
   - Zod schemas in `original/inputSchemas.original.ts` and `original/outputSchemas.original.ts`
   - API documentation in `docs/references/api-specs/`
   - Sample data using `npx fetch-dottie [function] --concise --limit 10`

2. **Write entity descriptions** using this template:
   ```
   EntityName: "Each EntityName item represents [business meaning and context]. [Data freshness information]."
   ```

3. **Include data freshness** using one of these phrases:
   - "Data updates infrequently" (for static data like terminal info)
   - "Data updates frequently" (for alerts, disruptions)
   - "Data is real time" (for live data like vessel locations)

### Examples:
```typescript
Route: "Each Route item represents basic route information including route identification (ID, abbreviation, and name), region ID, and any service disruptions affecting the route. Data updates infrequently.",

ServiceDisruption: "Each ServiceDisruption item represents service disruption alerts affecting routes, including bulletin ID, flags, publication date, and disruption description. These provide important operational updates and service alerts. Data updates frequently.",
```

### What NOT to Do:
- ❌ Don't fabricate examples not supported by actual data
- ❌ Don't guess business meaning - research from actual data and documentation
- ❌ Don't forget the data freshness information

## Quick Reference

### For endpoints.ts file:
1. Look at the output schema to identify the entity name
2. Look at the input parameters to determine if it's allItems, singleItem, or filteredItems
3. Use the appropriate function call with the correct entity name

### For descriptions.ts file:
1. Research the actual data structure from schemas and samples
2. Write business-focused descriptions starting with "Each [EntityName] item represents..."
3. Include appropriate data freshness information

## Common Mistakes to Avoid

1. **Wrong function calls**: Always match the endpoint pattern (all/filtered/single) to the function
2. **Wrong entity names**: Always use entity names that match the schema exactly
3. **Missing data freshness**: Always include how often the data updates
4. **Guessing business meaning**: Always research from actual data and documentation

## Pre-Submission Checklist

Before submitting your work, verify each item:

### For endpoints.ts:
- [ ] All endpoint descriptions use the correct function: `allItems()`, `singleItem()`, or `filteredItems()`
- [ ] All entity names match exactly what's in the output schema
- [ ] All import statements are present: `import { allItems, singleItem, filteredItems } from "@/apis/describe";`
- [ ] All descriptions reference the correct DESCRIPTIONS constant (e.g., `SCHEDULE_DESCRIPTIONS`)

### For descriptions.ts:
- [ ] Each entity description starts with "Each [EntityName] item represents..."
- [ ] Each entity description ends with data freshness information
- [ ] All descriptions are based on actual data and documentation, not fabricated
- [ ] All entity names match those referenced in endpoints.ts

### General:
- [ ] All research steps were completed before writing descriptions
- [ ] Zod schemas were reviewed for each entity
- [ ] API documentation was consulted for business context
- [ ] Sample data was fetched using the CLI tool to verify actual data structure