# WSF Schedules Endpoint Description Implementation - Handoff

## Task Overview
Implement descriptions for the wsf-schedules endpoint following the same pattern used for the wsf-terminals endpoint.

## Research Requirements
Before writing any descriptions, complete the mandatory research checklist:

### Step 1: Review existing Zod schemas
- Examine `src/apis/wsf-schedules/original/inputSchemas.original.ts`
- Examine `src/apis/wsf-schedules/original/outputSchemas.original.ts`

### Step 2: Review API documentation
- Read `docs/references/api-specs/api-specs-wsdot/wsf-schedules.md`

### Step 3: Fetch actual data samples
Use the wsf-dottie CLI tool to get actual data from the API:
```
npx fetch-dottie getRouteDetails --concise --limit 10
npx fetch-dottie getSchedSailingsBySchedRoute --concise --limit 10
npx fetch-dottie getActiveScheduledSeasons --concise --limit 10
npx fetch-dottie getValidDateRange --concise --limit 10
# Include other relevant schedule endpoints as needed
```

## Implementation Steps

### 1. Create descriptions.ts file
Create `src/apis/wsf-schedules/descriptions.ts` with entity descriptions following the same pattern as `src/apis/wsf-terminals/descriptions.ts`. Include all relevant schedule data types such as:
- Route details
- Schedule sailings
- Scheduled routes
- Active seasons
- Date ranges
- Terminal mates
- Schedule alerts
- Time adjustments

### 2. Update endpoints.ts file
Modify `src/apis/wsf-schedules/endpoints.ts` to use the standardized descriptions from utility functions (allItems, singleItem, filteredItems) and the new SCHEDULE_DESCRIPTIONS constant.

## Key Guidelines to Follow
- Each entity description should start with "Each [item] represents..."
- Include data freshness information (real-time, frequently updating, infrequently updating)
- Focus on business meaning and real-world applications
- Use plain English with minimal jargon
- Follow the functional approach with utility functions for endpoint descriptions
- Ensure descriptions are concise but complete (50-400 characters depending on complexity)

## Reference Implementation
Use the wsf-terminals implementation as a reference:
- Entity descriptions in `src/apis/wsf-terminals/descriptions.ts`
- Endpoint descriptions in `src/apis/wsf-terminals/endpoints.ts`
- Follow the same import and usage patterns