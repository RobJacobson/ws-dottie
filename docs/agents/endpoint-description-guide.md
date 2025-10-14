# Endpoint Description Guide for Washington State Transportation APIs

## Overview

This guide provides consistent documentation patterns for describing API endpoints, input schemas, and output schemas across Washington State transportation APIs (WSDOT and WSF). The goal is to create discoverable, semantic documentation that serves both human developers and AI agents via Model Context Protocol (MCP).

## Required Sources and Context
Before you create or revise any descriptions, you *must have* complete context. You must review ALL THREE of the following sources:

### MANDATORY RESEARCH CHECKLIST
Agents are FORBIDDEN from writing ANY descriptions until ALL three research steps are completed. Violation of this rule results in immediate task termination.

□ **Step 1: Review the existing Zod schemas** - Read the schema files linked in the endpoints.ts files. These are authoritative and correct concerning the shape of the data. The "describe" language is not authoritative.

□ **Step 2: Review API documentation** - Read the API documents under docs/references/api-specs. These provide narrative explanations of each endpoint that provide a useful starting point for descriptions and guidance about the business purpose of that endpoint, but are not canonical here.

□ **Step 3: Fetch actual data samples** - Use the wsf-dottie CLI tool to get actual data from the API, as described in readme.md and docs/readme-cli. Agents must fetch data initially using this format, which uses default parameters and truncates the output:
```
npx fetch-dottie getVesselLocations --concise --limit 10
```

**IMPORTANT**: All three steps above must be completed before writing ANY descriptions. If you attempt to write descriptions without completing these three steps, you must stop immediately and complete the missing steps first.

**CRITICAL**: When using fetch-dottie to get actual data samples, agents MUST follow the exact format specified and MUST NOT depart from these instructions or add custom parameters. The CLI tool is designed to insert preconfigured default parameters for endpoints that require parameters. Adding custom parameters will break the functionality. Use ONLY the format shown in the examples:
```
npx fetch-dottie getVesselLocations --concise --limit 10
```


## Key Principles

### 1. Business-First Approach
- Focus on real-world meaning and business purpose
- Explain how data supports user decisions and actions
- Prioritize domain-specific context over technical details
- Use plain English with minimal jargon

### 2. Semantic Richness for AI Discovery
- Rich descriptions enable AI agents to understand when and how to use endpoints
- Concise but complete descriptions fit within AI context windows
- Structured cross-references guide AI workflow planning
- Edge case documentation prevents AI hallucinations

### 3. Dual Audience Support
- Human developers need clear business context and real-world applications
- AI agents need semantic discovery and integration intelligence
- Both audiences benefit from consistent, structured documentation

## Documentation Structure

### A. Input Schema Documentation

#### Template Pattern:
```
[Top-level schema]: "[Brief purpose for retrieving data]"
[Field]: "[Business-focused data type]. [Additional context if needed]."
```

#### Key Requirements:
- **Business Purpose**: Explain what the parameter achieves
- **Data Type Context**: State the business-related format
- **No Date Examples**: Dates don't need examples - developers understand date formats
- **Edge Cases**: Document unusual values and their meaning
- **Length Limits**: 50-400 characters depending on complexity

#### Example:
```typescript
VesselID: z.number().int().describe(
  "Primary key for WSF vessels, as an integer. E.g., '17' for MV Kaleetan, '36' for MV Walla Walla."
)

DateStart: z.string().describe(
  "The start date for vessel history query, as a YYYY-MM-DD string."
)
```

### B. Endpoint description documentation

Always follow these requirements for the textual description property for each endpoint definition under src/apis/*/endpoints.ts:

#### New Functional Approach

We now use a functional approach to keep descriptions DRY (Don't Repeat Yourself) and ensure consistency. This approach separates entity descriptions from endpoint patterns.

**1. Entity Descriptions**: Define reusable descriptions for each data entity in `src/apis/[api-name]/descriptions.ts`. These descriptions focus on what each entity represents and end with data freshness information.

**2. Endpoint Categories**: Use utility functions from `src/apis/describe.ts` to create standardized endpoint descriptions:
- `allItems()`: For endpoints returning all items without filtering
- `singleItem()`: For endpoints returning one specific item
- `filteredItems()`: For endpoints returning a subset based on parameters

#### Template Pattern:
```
// In descriptions.ts - Entity descriptions
EntityName: "Each EntityName item represents [business meaning and context]. [Data freshness]."

// In endpoints.ts - Using utility functions
description: allItems("EntityName", DESCRIPTIONS)
description: singleItem("EntityName", DESCRIPTIONS)
description: filteredItems("EntityName", DESCRIPTIONS, "filter criteria")
```

#### Key Requirements:
- **Entity Descriptions**: Create reusable entity descriptions in `descriptions.ts` files that start with "Each [item] represents..."
- **Standard Lead**: Use utility functions to create standardized lead sentences that start with "Returns"
- **Business Meaning**: Explain what the entity represents in business context
- **No Date Examples**: Dates don't need examples - developers understand date formats
- **Edge Cases**: Document -1 values, nulls, special codes
- **Data Freshness**: Include "Data is real-time", "Data updates frequently", or "Data updates infrequently" in entity descriptions

#### Examples:
```typescript
// In src/apis/wsf-vessels/descriptions.ts - Entity descriptions
export const VESSEL_DESCRIPTIONS = {
  VesselBasic: "Each VesselBasic item represents essential vessel details including vessel identification (name and ID), operational status (in service, maintenance, out of service), and ownership information. Data updates infrequently.",
  VesselLocation: "Each VesselLocation item represents real-time vessel tracking data including current position (latitude and longitude), speed and heading information, departure and arrival terminal details, and estimated time of arrival. Data is real time, updated every few seconds.",
  CacheFlushDate: "Returns the date and time when the WSF vessel data was last updated. This operation helps applications coordinate caching of vessel data that changes infrequently. When the returned date changes, applications should refresh their cached data. Data updates infrequently."
} as const;

// In src/apis/wsf-vessels/endpoints.ts - Using utility functions
import { allItems, singleItem, filteredItems } from "@/apis/describe";
import { VESSEL_DESCRIPTIONS } from "./descriptions";

// All Items Category
{
  function: "getVesselBasics",
  endpoint: "/vesselBasics",
  outputSchema: z.array(o.vesselBasicSchema),
  description: allItems("VesselBasic", VESSEL_DESCRIPTIONS),
}

// Single Item Category
{
  function: "getVesselBasicsByVesselId",
  endpoint: "/vesselBasics/{VesselID}",
  outputSchema: o.vesselBasicSchema,
  description: singleItem("VesselBasic", VESSEL_DESCRIPTIONS),
}

// Filtered Items Category
{
  function: "getVesselHistoriesByVesselNameAndDateRange",
  endpoint: "/vesselHistory/{VesselName}/{DateStart}/{DateEnd}",
  outputSchema: z.array(o.vesselHistoryResponseSchema),
  description: filteredItems(
    "VesselHistory",
    VESSEL_DESCRIPTIONS,
    "VesselName, start date, and end date"
  ),
}

// Field example (unchanged)
Latitude: z.number().describe(
  "Current latitude coordinate for vessel position, as a decimal degree. Updates every 5 seconds when vessel is in transit."
)
```

## Special Considerations

### 1. ID Fields
- **Primary Keys**: "Primary key for [entities], as [type]. E.g., '[examples]'."
- **Secondary IDs**: Name the system and explain its purpose
- **Reference IDs**: Explain what entity it references and API cross-reference opportunities

### 2. Cache Flush Date Endpoints
These endpoints serve a technical purpose without direct business meaning:
- Explain the caching mechanism
- Describe when to use for cache invalidation
- Don't force business context where none exists

### 3. Parallel Language
When multiple fields represent the same concept in different formats, use parallel language:
```typescript
// Same concept: bridge clearance in different units
VerticalClearanceFeet: z.string().describe("Bridge clearance in feet and inches format.")
VerticalClearanceInches: z.number().int().describe("Bridge clearance in inches for calculations.")
```

### 4. Edge Cases
Document unusual values with business context:
- Negative values (e.g., -1 for closed/unavailable)
- Null values and their meaning
- Special status codes
- Magic numbers with business significance

### 5. Date Fields - No Examples Policy
Date fields should not include examples as they add no value:
- **Avoid**: "E.g., '2025-07-04' for holiday travel analysis" (obvious and adds no value)
- **Use**: Simply describe the purpose and format without examples
- **Rationale**: Developers and agents understand date formats and will choose relevant dates for their use case

### 6. Key Data Summary - Grouping by Concept
When describing the key actionable data, group related information together:
- **Concept Grouping**: Organize data by logical groupings (e.g., "vessel details", "departure details", "arrival details", "weather conditions", "traffic data")
- **Actionable Focus**: Highlight the most important data elements that drive decision-making
- **Plain English**: Use clear, scannable language that's easy to understand
- **Avoid Generic**: Replace vague phrases like "analyzing service patterns" with specific data elements

### 7. List vs Individual Item Clarification
When describing arrays/lists, clarify the relationship between the collection and individual items:
- **Use**: "Each [item] represents..." to describe individual items within the list
- **Purpose**: Distinguish between what the collection provides vs what each item contains
- **Clarity**: Prevent confusion between list-level and item-level information

### 8. Integration Patterns
When appropriate, reference related endpoints:
- Sequential workflows (A → B → C)
- Real-time + context combinations
- Alternative scenarios when primary options are unavailable

## When to Provide More Documentation

### High-Documentation Endpoints:
- Complex data structures with many fields
- Endpoints with non-obvious relationships to other APIs
- Critical real-time data affecting safety/operations
- Endpoints with significant business logic complexity
- Endpoints with multiple use cases or audiences

### Low-Documentation Endpoints:
- Simple data retrieval with obvious purpose
- Technical utility endpoints (like cache flush)
- Endpoints with straightforward one-to-one relationships

## Data Freshness Categories

- **Real-time**: Updates continuously (vessel locations, traffic flow)
- **Frequently updating**: Several times per hour (weather, alerts)  
- **Infrequently updating**: Daily or weekly (schedules, infrastructure data)

## Examples for WSF Vessels API

### Input Schema Example:
```typescript
export const getVesselHistorySchema = z.object({
 VesselName: z.string().describe(
    "The name of the vessel to query, as a string. E.g., 'Kaleetan' for MV Kaleetan, 'Walla Walla' for MV Walla Walla. Used to retrieve historical sailing records for specific vessels."
  ),
  DateStart: z.string().describe(
    "The start date for history query, as a YYYY-MM-DD string. Defines the beginning of the date range for vessel history."
  ),
  DateEnd: z.string().describe(
    "The end date for history query, as a YYYY-MM-DD string. Defines the end of the date range for vessel history."
  )
}).describe("Input parameters for vessel history endpoint with vessel name and date range.")
```

### Output Schema Example:
```typescript
// Filtered Items Category
export const vesselHistoryResponseSchema = z.array(z.object({
 Vessel: z.string().describe(
    "The name of the vessel that made the sailing, as a string. E.g., 'Kaleetan' for MV Kaleetan, 'Walla Walla' for MV Walla Walla. Identifies which vessel was assigned to this sailing."
  ),
  Departing: z.string().describe(
    "The departing terminal name for this sailing, as a string. E.g., 'Seattle' for Seattle terminal, 'Bainbridge' for Bainbridge Island. Shows the origin point of the sailing."
  ),
  ActualDepart: zDotnetDate().nullable().describe(
    "The actual departure time from the terminal, as a UTC date. May differ from scheduled time due to weather or operational delays."
  )
})).describe("Returns a list of VesselHistory data for all vessels, filtered by VesselName, start date, and end date. Each VesselHistory item represents a historical record for a single sailing between terminals, including the vessel, the departure details (including departure terminal, scheduled departure time, and actual departure time), and the arrival details (including arrival terminal and estimated arrival time). Data updates infrequently.")
```


## Quality Standards

### Do:
- ✅ Focus on user decision-making needs
- ✅ Use real-world examples from actual data (except dates)
- ✅ Document business-critical edge cases
- ✅ Explain WSF-specific operational details
- ✅ Provide actionable guidance for both humans and AI
- ✅ Use standardized lead sentences for output schemas that start with "Returns"
- ✅ Favor "list" over "array" in descriptions
- ✅ Use "Each [item] represents..." for list item descriptions
- ✅ Group key data by concept in output schema descriptions
- ✅ Avoid examples for dates (obvious and add no value)

### Don't:
- ❌ Explain generic data type behaviors
- ❌ State obvious technical uses
- ❌ Repeat information clear from field names
- ❌ Include examples for date fields
- ❌ Fabricate examples not supported by actual data
- ❌ Over-explain simple, self-evident fields
- ❌ Use "array" instead of "list" in descriptions
- ❌ Start output schema descriptions with anything other than "Returns"
- ❌ Use generic phrases like "analyzing service patterns" without specific data
- ❌ Mix list-level and item-level descriptions without clarification

This guide provides the foundation for consistent, discoverable API documentation that serves both human developers and AI agents effectively.