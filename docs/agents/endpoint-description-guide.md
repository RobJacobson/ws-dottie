# Endpoint Description Guide for Washington State Transportation APIs

## Overview

This guide provides consistent documentation patterns for describing API endpoints, input schemas, and output schemas across Washington State transportation APIs (WSDOT and WSF). The goal is to create discoverable, semantic documentation that serves both human developers and AI agents via Model Context Protocol (MCP).

## Required Sources and Context
Before you create or revise any descriptions, you *must have* complete context. You must review:
- The existing Zod schemas linked in the endpoints.ts files. THese are authoritative and correct concerning the shape of the data. The "describe" language is not authoritative.
- The API documents under docs/references/api-specs. These provide narrative explanations of each endpoint that provide a useful starting point for descriptions and guidance about the business purpose of that endpoint, but are not cannonical here.
- Achtual data samples from the API using the wsf-dottie CLI tool, as described in readme.md and docs/readme-cli. Agents must fetch data initially using this format, which uses default parameters and truncates the output:
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

#### Three Endpoint Categories with Standardized Lead Sentences:

**1. All Items Category**: "Returns a list of [DataType] data for all [entities]."
- Use when endpoint returns all items without filtering
- Example: `getAllVesselBasics` returns all vessels

**2. Filtered Items Category**: "Returns a list of [DataType] data for all [entities], filtered by [criteria]."
- Use when endpoint returns subset based on parameters
- Example: `getVesselHistoriesByVesselNameAndDateRange` filters by vessel name and date range

**3. Single Item Category**: "Returns [DataType] data for the [entity] with the given [identifier]."
- Use when endpoint returns one specific item
- Example: `getVesselLocationsByVesselId` returns data for one vessel by ID

#### Template Pattern:
```
[Top-level array]: "[Standardized lead sentence]. [Description of each item in the list, starting with 'Each [item] represents...']. [Data freshness]."
[Field]: "[Purpose]. [Business meaning and context]."
```

#### Key Requirements:
- **Standard Lead**: Use one of the three standardized patterns above, always starting with "Returns"
- **Item Description**: For lists, describe each item using "Each [item] represents..." to clarify individual vs collection
- **Business Meaning**: Explain what the field represents
- **No Date Examples**: Dates don't need examples - developers understand date formats
- **Edge Cases**: Document -1 values, nulls, special codes
- **Data Freshness**: Include "Data is real-time" or "Data updates frequently/infrequently"

#### Examples:
```typescript
// All Items Category
export const vesselBasicsSchema = z.array(vesselBasicSchema).describe(
  "Returns a list of VesselBasic data for all vessels. Each VesselBasic item represents essential vessel details including vessel identification (name and ID), operational status (in service, maintenance, out of service), and ownership information. Data updates infrequently."
)

// Filtered Items Category  
export const vesselHistoryResponseSchema = z.array(vesselHistoryResponseSchema).describe(
  "Returns a list of VesselHistory data for all vessels, filtered by VesselName, start date, and end date. Each VesselHistory item represents a historical record for a single sailing between terminals, including the vessel, the departure details (including departure terminal, scheduled departure time, and actual departure time), and the arrival details (including arrival terminal and estimated arrival time). Data updates infrequently."
)

// Single Item Category
export const vesselLocationsSchema = z.array(vesselLocationSchema).describe(
  "Returns VesselLocation data for the vessel with the given VesselID. Each VesselLocation item represents real-time vessel tracking data including current position (latitude and longitude), speed and heading information, departure and arrival terminal details, and estimated time of arrival. Data is real-time."
)

// Field example
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

### Endpoint Description Example:
```json
{
  "getVesselHistoriesByVesselNameAndDateRange": "Retrieves historical sailing records for a specific WSF vessel within a date range, especially useful for analyzing service patterns and performance. Returns departure/arrival times, terminals, and actual vs scheduled performance. Use with wsf-vessels/getAllVesselBasics to identify vessel IDs, or combine with wsf-schedule/getSchedules to compare planned vs actual operations."
}
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