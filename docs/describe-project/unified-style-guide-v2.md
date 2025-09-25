# Unified Zod Schema Annotation Style Guide for WSDOT/WSF APIs (v2)

## Overview

This style guide provides comprehensive instructions for AI agents tasked with enhancing Zod 4 schema annotations for the Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF) APIs. The goal is to create semantically rich, human-readable descriptions that serve both developers and AI agents through a **hybrid approach** using Zod 4's `.describe()` method with minimal, high-value metadata.

## 🚨 Critical Reminders for Agents

- **Ground Truth is API Data:** Always prioritize actual API data samples over official documentation when discrepancies arise regarding data types, nullability, or specific values.
- **Review Actual Data:** For each endpoint you work on, you **must** fetch and review actual API data samples using `fetch-dottie` CLI or similar tools.
- **Failure Condition:** Any inability to fetch correct data using `fetch-dottie` is a **failure condition**. You must **stop and ask the user** for clarification or assistance immediately.
- **No Schema Modification:** **NEVER modify schema implementations or related fetching logic** unless expressly requested by the user. Your task is to enhance annotations only.
- **Report Discrepancies:** Actively look for and report any discrepancies between our schemas/data and official documentation or unexpected behaviors in data samples.
- **API Access Handled Automatically:** The `ws-dottie` library handles API access codes automatically. Omit `APIAccessCode` from schema parameters as it's handled by the underlying system.
- **Focus on Rich Descriptions:** Create comprehensive, narrative descriptions that explain purpose, context, and relationships. Use minimal metadata only for high-value programmatic discovery.
- **Provide Relational Context:** It is highly beneficial to provide context about the semantic relationships between different entities and different endpoints. Explain what an entity represents in the real world and how data from different endpoints can be combined or used together.
- **Propose Updates:** If any part of this style guide is confusing, ambiguous, or could be improved, you are encouraged to propose updates.
- **Seek Clarification:** If you are unsure about how to proceed with any portion of the work, stop and request clarification from the user.

## 1. Core Architecture: Hybrid Approach

Our annotations use Zod 4's `.describe()` method as the primary source of information, supplemented by minimal, high-value metadata for specific programmatic discovery needs.

### Basic Structure

```typescript
import { z } from "zod/v4";

// Field-level annotation
const fieldSchema = z.string().describe(
  "Provides a unique identifier for [entity type] used for [primary purpose]. Use [api]/[endpoint] to retrieve [related data]. [Additional context or business rules]."
).meta({
  // Minimal metadata only for high-value programmatic discovery
  relatedEndpoints: ["api/endpoint"],
  updateFrequency: "static" // Only when not obvious from description
});

// Schema-level annotation
const objectSchema = z.object({
  // field definitions with .describe() annotations
}).describe(
  "Returns a collection of [entity type] providing [primary purpose] for [target users]. Data includes [key components] and updates [frequency]. Use [api]/[endpoint] for [related operations]."
).meta({
  // Schema-level metadata only when needed
  relatedEndpoints: ["api/endpoint"],
  updateFrequency: "1min"
});
```

## 2. Rich Description Guidelines (`.describe()`)

The `description` field should be the primary source of information, following these principles that reflect proper model-entity relationships and conventional API design practices:

### Length and Structure

- **Input Schema Descriptions:** 1-2 sentences (15-40 words)
- **Input Field Descriptions:** 1-2 sentences (20-50 words)
- **Output Schema Descriptions:** 2-3 sentences (30-80 words)
- **Output Field Descriptions:** 1-3 sentences (15-80 words)

### Writing Principles by Schema Type

#### Input Schemas (API Parameters)
1. **Start with "Input parameters to..."** - Clearly indicate these are request parameters
2. **Focus on filtering/selection logic** - Explain how parameters determine results
3. **No output data description** - Don't describe what's returned
4. **No cross-references** - Don't reference other endpoints

#### Input Fields (Individual Parameters)
1. **Start with "A" or "The"** - Describe the parameter as a data type
2. **Explain filtering purpose** - How the parameter affects results
3. **Include examples naturally** - Show typical values

#### Output Schemas (Returned Data)
1. **Start with "Returns..."** - Clearly indicate this is returned data
2. **Specify entity type** - Single entity vs. list of entities
3. **Include usage context** - How the data can be used with other functions
4. **Business context** - Real-world applications

#### Output Fields (Individual Properties)
1. **Start with "The [entity]'s..."** - Describe as a property of the entity
2. **Include data type** - Specify the type of data
3. **Examples at end of first sentence** - Show typical values in parenthetical at the end of the *first sentence* (REQUIRED)
4. **Cross-references for discovery** - How to use with related functions

### Description Templates by Schema Type

#### Input Schema Templates

**For No-Parameter APIs:**
```typescript
"Input parameters to retrieve [entity type] across [scope] (none required)."
// Example: "Input parameters to retrieve a list of all highway cameras across Washington State (none required)."
```

**For Single-Entity Retrieval:**
```typescript
"Input parameter to retrieve a specific [entity type] by [identifier type]."
// Example: "Input parameter to retrieve a specific highway camera by unique identifier."
```

**For Filtered Searches:**
```typescript
"Input parameters to search [entity type] by [filter criteria]. Provides [filtering logic] for [target scope]."
// Example: "Input parameters to search highway cameras by route, region, and milepost range. Provides filtered camera results for specific geographic areas and roadway segments."
```

#### Input Field Templates

**For Identifiers:**
```typescript
"A [entity type] identifier as [data type] for [filtering purpose]. Use this to [selection logic] (e.g., '[example1]', '[example2]')."
// Example: "A state route identifier as a string for filtering highway cameras by specific roadway. Use this to find cameras on particular routes (e.g., 'I-5' for Interstate 5, 'SR-520' for State Route 520)."
```

**For Ranges:**
```typescript
"The [range type] as [data type] for [filtering purpose]. Use this to [selection logic] (e.g., '[example1]', '[example2]'). Use with [related field] to [combined logic]."
// Example: "The starting milepost location as a number for filtering cameras along a specific route segment. Use this to find cameras within a milepost range (e.g., '0' for route beginning, '10' for 10 miles from start). Use with EndingMilepost to define a route segment."
```

#### Output Schema Templates

**For Entity Lists:**
```typescript
"Returns a list of [entity type], including [key data types] for [primary use case]. Provides [business value] for [target users]. Covers [scope and context]."
// Example: "Returns a list of highway alerts, including incident details, location data, timing information, and impact assessment for traffic management and traveler notification systems. Provides comprehensive data for understanding current traffic conditions and planning alternative routes."
```

**For Single Entities:**
```typescript
"Returns information for one [entity type], including [key data types] for [primary use case]. Provides [business value] for [target users]. Covers [scope and context]."
// Example: "Returns information for one highway camera, including location details, image data, and operational status for traffic monitoring and traveler information systems. Provides essential data for real-time traffic visualization and route planning."
```

#### Output Field Templates

**For Identifiers:**
```typescript
"The [entity]'s unique [identifier type] as [data type] (e.g., '[example1]', '[example2]'). Use this [identifier type] to [related function purpose] via [api]/[endpoint]."
// Example: "The highway camera's unique numeric identifier as an integer (e.g., '9818' for Anacortes Airport, '9460' for SR 9 at MP 2.7). Use this ID to fetch data for individual cameras via wsdot-highway-cameras/getHighwayCamera."
```

**For Coordinates:**
```typescript
"The [entity]'s [coordinate type] coordinate in [unit system] for [display purpose] (e.g., '[example1]', '[example2]'). Use this for [usage context]."
// Example: "The highway camera's latitude coordinate in decimal degrees for displaying the camera location on maps and navigation systems (e.g., '47.821539' for Seattle area, '48.498333' for Anacortes). Use this for map positioning and geographic visualization."
```

**For Status/Enum Fields:**
```typescript
"The [entity]'s [field purpose] indicating [enum meaning] ([value mappings]). Used for [business logic]."
// Example: "The highway alert's severity level indicating impact assessment (1=Low, 2=Medium, 3=High, 4=Critical). Used for prioritizing alert display and routing decisions."
```

### Common Anti-Patterns to Avoid

#### Input Schema Anti-Patterns
❌ **Don't describe returned data in input schemas:**
```typescript
// Wrong - describes output data
"Returns parameters for retrieving all highway camera data across Washington State. Provides access to all active traffic monitoring cameras statewide..."

// Correct - focuses on input parameters
"Input parameters to retrieve a list of all highway cameras across Washington State (none required)."
```

❌ **Don't include cross-references in input schemas:**
```typescript
// Wrong - includes output usage
"Input parameters to retrieve highway camera data. Use wsdot-highway-cameras/getHighwayCameras for current camera data."

// Correct - focuses on parameters only
"Input parameters to retrieve a list of all highway cameras across Washington State (none required)."
```

#### Output Schema Anti-Patterns
❌ **Don't include redundant cross-references in output schemas:**
```typescript
// Wrong - redundant cross-reference
"Returns a list of highway alerts for traffic management systems. Use wsdot-highway-alerts/getAlerts for current alert conditions."

// Correct - focuses on data and usage context
"Returns a list of highway alerts, including incident details, location data, timing information, and impact assessment for traffic management and traveler notification systems."
```

#### Field Description Anti-Patterns
❌ **Don't use action verbs for output fields:**
```typescript
// Wrong - uses action verb
"Provides a unique numeric identifier for the highway camera used for system integration..."

// Correct - describes as entity property
"The highway camera's unique numeric identifier as an integer (e.g., 9818 for Anacortes Airport, 9460 for SR 9 at MP 2.7)."
```

❌ **Don't use action verbs for input fields:**
```typescript
// Wrong - uses action verb
"Provides a state route identifier for filtering highway cameras..."

// Correct - describes as parameter
"A state route identifier as a string for filtering highway cameras by specific roadway."
```

### Example Data Formatting Rules

**All example data must be in quotes to indicate literal values and placed at the end of the first sentence:**

✅ **Correct Examples:**
```typescript
// String identifiers - examples at end of first sentence
"A state route identifier as a string for filtering highway cameras by specific roadway (e.g., 'I-5', 'SR-520'). Use this to find cameras on particular routes."

// Numeric identifiers - examples at end of first sentence
"The highway camera's unique numeric identifier as an integer (e.g., '9818', '9460'). Use this ID to fetch data for individual cameras via wsdot-highway-cameras/getHighwayCamera."

// Coordinates - examples at end of first sentence
"The camera's latitude coordinate in decimal degrees for displaying the camera location on maps (e.g., '47.821539', '48.498333'). Use this for map positioning and geographic visualization."

// Milepost values - examples at end of first sentence
"The starting milepost location as a number for filtering cameras along a specific route segment (e.g., '0', '10', '15.5'). Use this to find cameras within a milepost range."
```

❌ **Incorrect Examples:**
```typescript
// Examples at end of description - wrong placement
"A state route identifier as a string for filtering highway cameras by specific roadway. Use this to find cameras on particular routes (e.g., 'I-5', 'SR-520')."

// Examples in middle of description - wrong placement
"A state route identifier as a string (e.g., 'I-5', 'SR-520') for filtering highway cameras."

// Missing quotes - unclear if literal values
"A state route identifier as a string (e.g., I-5, SR-520)."
"The highway camera's unique numeric identifier as an integer (e.g., 9818, 9460)."
```

**Exception:** Enum values with mappings don't need quotes:
```typescript
"The alert's severity level indicating impact assessment (1=Low, 2=Medium, 3=High, 4=Critical)."
```

### Parenthetical Inclusion Patterns

When including sample data or enum values in descriptions, use these consistent patterns:

#### Sample Data Inclusion
```typescript
// For single examples
"Provides terminal identifier (e.g., '1' for Seattle, '3' for Bainbridge Island)"

// For multiple examples with context
"Returns fare amount in USD (e.g., '$15.50' for adult passenger, '$7.75' for child)"

// For conditional examples
"Returns wind speed in MPH (e.g., '15' for moderate conditions, null if sensor unavailable)"
```

#### Enum Value Inclusion
```typescript
// For numeric enums
"Returns schedule season (0=Spring, 1=Summer, 2=Fall, 3=Winter)"

// For boolean flags
"Indicates direction independence flag (true if fare amount is the same regardless of departure terminal)"

// For complex enums
"Indicates fare total type (1=Depart leg, 2=Return leg, 3=Either direction, 4=Grand total)"
```

### Tone and Voice Guidelines

#### For Input Schemas
- **Start with "Input parameters to..."** - Clearly indicate these are request parameters
- **Use present tense:** "Input parameters to retrieve" not "Input parameters that are used to retrieve"
- **Be concise:** Focus on parameter purpose, not output data

#### For Input Fields
- **Start with "A" or "The"** - Describe the parameter as a data type
- **Use present tense:** "A state route identifier as a string" not "A state route identifier that is a string"
- **Be specific:** "State route identifier" not "Route identifier"

#### For Output Schemas
- **Start with "Returns..."** - Clearly indicate this is returned data
- **Use present tense:** "Returns a list of" not "Will return a list of"
- **Be specific:** "Highway camera" not "Camera"

#### For Output Fields
- **Start with "The [entity]'s..."** - Describe as a property of the entity
- **Use present tense:** "The camera's location" not "The camera's location that is"
- **Be specific:** "Highway camera's unique identifier" not "Unique identifier"
- **Use consistent terminology:** Always "highway camera" not "traffic camera"

## 3. Minimal Metadata Structure (`.meta()`)

The `meta()` object should contain only high-value metadata that provides genuine programmatic discovery benefits.

### What to Include

#### `relatedEndpoints` (High Value)
```typescript
.meta({
  relatedEndpoints: ["wsf-terminals/terminalbasics", "wsf-schedules/terminals"]
})
```

**Usage Guidelines:**
- Include endpoints that provide valid values or related information
- Use for programmatic discovery by agents
- Format: `["api/endpoint", "api/endpoint"]`

#### `updateFrequency` (Caching Strategy)
```typescript
.meta({
  updateFrequency: "real-time" // or "static"
})
```

**Usage Guidelines:**
- Use `"real-time"` for data that changes frequently and shouldn't be cached
- Use `"static"` for reference data that rarely changes and can be cached
- Include "real-time" in descriptions when appropriate (e.g., "real-time weather data")
- Do not include "static" in descriptions - it's implied for non-real-time data
- Examples of real-time: weather conditions, vessel locations, traffic alerts, border crossing wait times
- Examples of static: terminal lists, route definitions, bridge clearances, fare schedules

#### `businessRules` (Complex Domain Logic Only)
```typescript
.meta({
  businessRules: [
    "Bridge height measured from road surface to lowest point of bridge superstructure",
    "Walk-on passengers charged once for round trips"
  ]
})
```

**Usage Guidelines:**
- Only for complex business logic that's hard to express concisely in descriptions
- Use for rules that require structured form for agent processing
- Keep to essential rules only

### What to Exclude

**Do NOT include these redundant or easily inferable metadata:**
- `semanticType` - Redundant with description
- `domain` - Obvious from API context
- `entity` - Redundant with description
- `examples` - Already in description
- `constraints` - Already in Zod schema
- `type` - Already in Zod schema
- `format` - Already in description
- `nullable` - Already in Zod schema
- `units` - Already in description
- `timezone` - Already in description when relevant

## 4. Comprehensive Examples by Schema Type

### Input Schema Examples
```typescript
// Good: No-parameter API
z.object({}).describe(
  "Input parameters to retrieve a list of all highway cameras across Washington State (none required)."
)

// Good: Single-entity retrieval
z.object({
  CameraID: z.number()
}).describe(
  "Input parameter to retrieve a specific highway camera by unique identifier."
)

// Good: Filtered search
z.object({
  StateRoute: z.string(),
  StartingMilepost: z.number(),
  EndingMilepost: z.number()
}).describe(
  "Input parameters to search highway cameras by route, region, and milepost range. Provides filtered camera results for specific geographic areas and roadway segments."
)
```

### Input Field Examples
```typescript
// Good: Identifier parameter
z.string().describe(
  "A state route identifier as a string for filtering highway cameras by specific roadway. Use this to find cameras on particular routes (e.g., 'I-5' for Interstate 5, 'SR-520' for State Route 520)."
)

// Good: Range parameter
z.number().describe(
  "The starting milepost location as a number for filtering cameras along a specific route segment. Use this to find cameras within a milepost range (e.g., '0' for route beginning, '10' for 10 miles from start). Use with EndingMilepost to define a route segment."
)
```

### Output Schema Examples
```typescript
// Good: Entity list
z.array(cameraSchema).describe(
  "Returns a list of highway cameras, including location details, image data, and operational status for traffic monitoring and traveler information systems. Provides comprehensive data for real-time traffic visualization and route planning. Covers all WSDOT-operated cameras statewide."
)

// Good: Single entity
z.object({
  CameraID: z.number(),
  DisplayLatitude: z.number(),
  DisplayLongitude: z.number()
}).describe(
  "Returns information for one highway camera, including location details, image data, and operational status for traffic monitoring and traveler information systems. Provides essential data for real-time traffic visualization and route planning."
)
```

### Output Field Examples
```typescript
// Good: Identifier field
z.number().describe(
  "The highway camera's unique numeric identifier as an integer (e.g., '9818' for Anacortes Airport, '9460' for SR 9 at MP 2.7). Use this ID to fetch data for individual cameras via wsdot-highway-cameras/getHighwayCamera."
)

// Good: Coordinate field
z.number().describe(
  "The highway camera's latitude coordinate in decimal degrees for displaying the camera location on maps and navigation systems (e.g., '47.821539' for Seattle area, '48.498333' for Anacortes). Use this for map positioning and geographic visualization."
)

// Good: Status field
z.number().describe(
  "The highway alert's severity level indicating impact assessment (1=Low, 2=Medium, 3=High, 4=Critical). Used for prioritizing alert display and routing decisions."
)
```

## 5. Date and Time Handling

### Output Dates
```typescript
z.date().describe("Returns the timestamp when this weather reading was recorded as a JavaScript Date object in UTC. Use wsdot-weather/weatherInfo for current conditions.")
```

### Input Dates
```typescript
z.string().describe("Returns the trip date in YYYY-MM-DD format for which to retrieve terminal information. Use wsf-schedules/routes for schedule lookups.")
```

### WSF "Sailing Day" Logic
For WSF Schedules and Fares APIs:
```typescript
z.string().describe("Returns the trip date in YYYY-MM-DD format reflecting the 'sailing day' (3:00 AM Pacific to 2:59 AM next calendar day). Use wsf-schedules/routes for schedule lookups. Early morning ferries (1:00 AM) on September 23rd fall under the sailing day of September 22nd.")
```

## 6. Domain-Specific Guidelines

### Transportation APIs (WSDOT/WSF)

#### Terminals and Routes
- Always include geographic context
- Explain relationship to other terminals/routes
- Mention fare implications when relevant

#### Fares and Pricing
- Always specify currency (USD)
- Explain calculation logic
- Include category context

### Weather and Environmental Data

#### Measurements
- Always include units
- Explain sensor limitations
- Mention update frequencies

#### Geographic Data
- Specify coordinate system
- Include precision expectations
- Explain location context

## 7. Quality Assurance Framework

### Comprehensive Review Checklist

#### Narrative Description Quality
1. **Verb-Starting:** Does the description start with an action verb?
2. **Readability:** Can the description be read aloud naturally without stumbling?
3. **Completeness:** Does it explain purpose, context, and cross-references?
4. **Semantic Richness:** Does it answer "What is this for?" and "How is it used?"
5. **Active Voice:** Uses imperative mood and present tense consistently
6. **Specificity:** Avoids generic terms like "identifier" without context
7. **Length:** Stays within word limits (20-100 words for fields, 30-120 for schemas)
8. **Cross-References:** Includes related endpoints for discoverability

#### Metadata Completeness
9. **Minimal Approach:** Only includes high-value metadata (`relatedEndpoints`, `updateFrequency`, `businessRules`)
10. **No Redundancy:** Avoids duplicating information already in description or Zod schema
11. **Programmatic Value:** Metadata provides genuine discovery benefits for agents

#### Consistency and Standards
12. **Terminology:** Uses consistent domain terms (e.g., "terminal" not "station")
13. **Patterns:** Follows established templates for similar field types
14. **Formatting:** Uses consistent parenthetical patterns for examples and enums
15. **Cross-References:** Uses proper `[api]/[endpoint]` format for related endpoints

#### Technical Accuracy
16. **Data Validation:** Verifies examples against actual API responses
17. **Type Accuracy:** Ensures descriptions match Zod schema definitions
18. **Relationship Accuracy:** Confirms cross-references point to valid endpoints
19. **Business Logic:** Validates domain-specific rules against real-world behavior

### Enhanced Discrepancy Reporting

Create a markdown table with "Endpoint/Field" and "Notes" columns:

| Endpoint/Field | Notes |
|----------------|-------|
| `wsf-fares/terminals.TerminalID` | Field marked as non-nullable but returns null in some test cases |
| `wsdot-weather/weatherInfo.WindSpeed` | Unclear about units - documentation says MPH but data appears to be KPH |
| `wsf-schedules/SailingDate` | Unclear if sailing day logic applies to this specific field - request clarification |

**Report Categories:**
- **Nullability Mismatches:** Fields marked non-nullable that return null/undefined
- **Data Type Mismatches:** Actual API data types differ from schema definitions
- **Unit/Format Discrepancies:** Documentation vs. actual data format differences
- **Conceptual Unclarity:** Questions about business logic or domain concepts
- **Relationship Issues:** Cross-references that don't resolve or seem incorrect

### Validation Criteria

#### Must-Have Elements
- [ ] Verb-starting description following established patterns
- [ ] Cross-reference to related endpoints
- [ ] Real-world examples from actual API data
- [ ] Business context and operational notes
- [ ] Minimal, high-value metadata only

#### Should-Have Elements
- [ ] Enum value mappings for enum fields
- [ ] Geographic or operational scope context
- [ ] Data freshness indicators when relevant
- [ ] Business rule integration

#### Quality Indicators
- [ ] Description reads naturally when spoken aloud
- [ ] Examples are diverse and representative
- [ ] Business context is clear and accurate
- [ ] Relationships to other entities are well-documented
- [ ] Metadata is minimal and non-redundant

## 8. Implementation Guidelines

### Agent Workflow

#### Step 1: Data Collection and Analysis
1. **Fetch Real Data:** Use `fetch-dottie` to get actual API responses
2. **Review Documentation:** Study official API docs for context
3. **Identify Relationships:** Map connections between endpoints and fields
4. **Note Discrepancies:** Flag any mismatches between docs and data

#### Step 2: Annotation Creation
1. **Start with Action Verbs:** Write descriptions that start with "Provides", "Returns", "Indicates"
2. **Add Context:** Include domain-specific information and relationships
3. **Include Cross-References:** Add related endpoints for discoverability
4. **Add Examples:** Use diverse, real-world values from API data
5. **Minimal Metadata:** Add only high-value metadata (`relatedEndpoints`, `updateFrequency`, `businessRules`)

#### Step 3: Quality Review
1. **Read Aloud Test:** Ensure descriptions flow naturally
2. **Verb Check:** Verify all descriptions start with action verbs
3. **Cross-Reference Check:** Confirm all related endpoints are included
4. **Metadata Check:** Ensure metadata is minimal and non-redundant
5. **Accuracy Validation:** Confirm examples and relationships are correct

#### Step 4: Discrepancy Reporting
1. **Create Report Table:** Document any issues found
2. **Categorize Issues:** Use established report categories
3. **Request Clarification:** Ask questions about unclear concepts
4. **Propose Improvements:** Suggest style guide updates if needed

### File Organization
```typescript
// Group related schemas
export const terminalSchemas = {
  base: terminalBaseSchema,
  combo: terminalComboSchema,
  list: terminalListSchema
};

// Use consistent naming
export const fareCalculationInputSchema = z.object({
  // input fields
}).describe("Returns parameters for calculating WSF ferry fares including terminal combinations and passenger categories. Use wsf-fares/calculateFares for fare calculations.");
```

### Naming Conventions
- **API References:** Use `[api]/[endpoint]` format (e.g., `"wsf-terminals/terminalbasics"`)
- **Field References:** Use `[api]/[function].[fieldname]` format
- **Consistent Terminology:** Use established domain glossary terms

### Internal Array Schema Descriptions

Internal array schemas (like `spaceForArrivalTerminalsListSchema`, `departingSpacesListSchema`, etc.) should include concise but informative descriptions that explain their purpose and context within the parent schema.

#### Guidelines for Internal Array Descriptions

1. **Start with "Array of"** - Clearly indicate this is an array structure
2. **Explain Purpose** - Describe what the array contains and why it exists
3. **Reference Parent Context** - Explain how it relates to the parent schema
4. **Keep Concise** - Use 1-2 sentences (20-40 words) for internal arrays
5. **Include Business Value** - Explain the operational or business purpose

#### Examples

```typescript
// Good: Internal array with clear purpose and context
export const spaceForArrivalTerminalsListSchema = z.array(
  spaceForArrivalTerminalSchema
).describe(
  "Array of arrival terminal space availability data for this sailing departure, including reservation and drive-up space counts for each destination terminal."
);

// Good: Internal array with parent context
export const departingSpacesListSchema = z.array(departingSpaceSchema).describe(
  "Array of upcoming sailing departures from this terminal with real-time space availability, vessel information, and departure scheduling data."
);

// Good: Internal array with business context
export const transitLinksListSchema = z.array(transitLinkSchema).describe(
  "Array of transit agency connections providing links to public transportation services that connect with this terminal for multimodal trip planning."
);
```

#### What NOT to Include

- **Don't describe the element type** - The element schema already has its own description
- **Don't include examples** - Internal arrays typically don't need examples
- **Don't add metadata** - Internal arrays rarely need `.meta()` calls
- **Don't reference other endpoints** - Internal arrays are implementation details

#### When to Skip Descriptions

Internal array schemas that are purely structural (like simple wrappers around base types) may not need descriptions if:
- The array name clearly indicates its purpose
- The element schema provides sufficient context
- The array is only used in one place

### Annotation Priority Order

When creating annotations, prioritize in this order:

1. **Verb-Starting Description:** Clear, action-oriented narrative explanation
2. **Cross-References:** Related endpoints for discoverability
3. **Examples:** Real-world values from API data
4. **Business Context:** Operational and business logic information
5. **Minimal Metadata:** Only high-value programmatic discovery metadata

### Common Patterns by Field Type

#### Identifier Fields
```typescript
// Pattern: "Provides a unique identifier for [entity] used for [purpose]. Use [api]/[endpoint] to retrieve [related data]. [Additional context]."
z.integer().describe("Provides a unique identifier for a WSF terminal used for route planning and fare calculations. Use wsf-terminals/terminalbasics to retrieve terminal details. Terminal IDs remain consistent across all WSF systems.")
  .meta({
    relatedEndpoints: ["wsf-terminals/terminalbasics", "wsf-schedules/terminals"]
  })
```

#### Amount/Value Fields
```typescript
// Pattern: "Returns the [value type] in [units] for [purpose]. Used for [business context] with [related endpoint]. [Business logic]."
z.number().describe("Returns the fare amount in USD for the specified passenger category, excluding promotional discounts. Used for fare calculations with wsf-fares/calculateFares. Walk-on passengers are charged once for round trips.")
  .meta({
    relatedEndpoints: ["wsf-fares/calculateFares"]
  })
```

#### Date/Time Fields
```typescript
// Pattern: "Returns the [date purpose] in [format] for [use case]. [Special handling]. Use [api]/[endpoint] for [related operations]."
z.string().describe("Returns the trip date in YYYY-MM-DD format for fare calculations. Reflects WSF 'sailing day' (3:00 AM Pacific to 2:59 AM next day). Use wsf-schedules/routes for schedule lookups.")
  .meta({
    relatedEndpoints: ["wsf-schedules/routes"]
  })
```

#### Enum/Status Fields
```typescript
// Pattern: "Indicates the [field purpose] with [enum meaning] (1=Value1, 2=Value2, 3=Value3). Used for [business logic]. [Additional context]."
z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).describe("Indicates the fare total type with logical grouping (1=Depart, 2=Return, 3=Either, 4=Total). Used for organizing fare calculations by trip leg. Each leg may have different pricing rules.")
```

## 9. Update Frequency Guidelines

### Real-Time Data Classification

When documenting update frequencies, follow these simplified guidelines:

#### Real-Time Data
Use `"real-time"` for data that changes frequently and shouldn't be cached:
- **Weather conditions** and station readings
- **Vessel positions** with speed, bearing, and location updates
- **Traffic flow sensors** with continuous speed and volume measurements
- **Highway alerts** and incident reports
- **Border crossing wait times**
- **Mountain pass conditions**
- **Toll rates** and pricing information
- **Real-time tracking systems** where position changes frequently

#### Static Data
Use `"static"` for reference data that rarely changes and can be cached:
- **Terminal lists** and route definitions
- **Bridge clearances** and infrastructure data
- **Fare schedules** and seasonal information
- **Route definitions** and terminal combinations
- **Reference data** that updates infrequently

### Real-Time Description Requirements

For any schema with real-time data, include "real-time" in the description:

```typescript
// ✅ Good: Includes "real-time" in description
z.array(borderCrossingSchema).describe("Returns a collection of real-time border crossing wait time data providing comprehensive coverage of all monitored crossings into Canada. Data includes wait times, crossing names, and location details. Use wsdot-border-crossings/getBorderCrossings for current conditions.")
  .meta({
    updateFrequency: "real-time"
  })

// ❌ Poor: Missing "real-time" context
z.array(borderCrossingSchema).describe("Returns a collection of border crossing wait time data providing comprehensive coverage of all monitored crossings into Canada. Data includes wait times, crossing names, and location details. Use wsdot-border-crossings/getBorderCrossings for current conditions.")
```

**Note:** Do not include "static" in descriptions - it's implied for non-real-time data.

## 10. Best Practices Summary

1. **Start with Action Verbs:** Every description should start with "Provides", "Returns", "Indicates", or "Shows"
2. **Include Cross-References:** Add related endpoints for discoverability
3. **Use Examples:** Provide realistic examples that illustrate usage
4. **Place Examples at End of First Sentence:** Always put "(e.g., 'example1', 'example2')" at the end of the first sentence (REQUIRED for all output fields)
5. **Document Relationships:** Explain how schemas connect to each other
6. **Be Consistent:** Follow established patterns across all schemas
7. **Test Readability:** Ensure descriptions flow naturally when read aloud
8. **Minimal Metadata:** Only include high-value metadata for programmatic discovery
9. **Maintain Accuracy:** Verify all information against actual API behavior

## 11. Comprehensive Examples and Anti-Patterns

### Field-Level Examples

#### ❌ Poor Examples (Anti-Patterns)

```typescript
// Too generic - no context or purpose
z.string().describe("A string value")

// Redundant type information - states the obvious
z.number().describe("A number representing the amount")

// Missing context - doesn't explain what it's for
z.string().describe("Terminal ID")

// Passive voice and hedging - weak and unclear
z.string().describe("May be used to identify a terminal")

// Missing cross-references - no discoverability
z.string().describe("Unique ferry terminal identifier used for route planning")

// Doesn't start with action verb
z.string().describe("Unique identifier for a WSF terminal used for route planning")
```

#### ✅ Good Examples

```typescript
// Terminal ID with full context and cross-references - examples at end of first sentence
z.string().describe("Provides a unique identifier for a WSF terminal used for route planning and fare calculations (e.g., '1' for Seattle, '3' for Bainbridge Island). Use wsf-terminals/terminalbasics to retrieve terminal details. Terminal IDs remain consistent across all WSF systems.")
  .meta({
    relatedEndpoints: ["wsf-terminals/terminalbasics", "wsf-schedules/terminals"]
  })

// Fare amount with business context - examples at end of first sentence
z.number().describe("Returns the fare amount in USD for the specified passenger category, excluding promotional discounts (e.g., '$15.50' for adult passenger, '$7.75' for child). Used for fare calculations with wsf-fares/calculateFares. Walk-on passengers are charged once for round trips.")
  .meta({
    relatedEndpoints: ["wsf-fares/calculateFares"]
  })

// Date field with sailing day logic - examples at end of first sentence
z.string().describe("Returns the trip date in YYYY-MM-DD format for fare calculations (e.g., '2024-01-15' for January 15, 2024). Reflects WSF 'sailing day' (3:00 AM Pacific to 2:59 AM next day). Use wsf-schedules/routes for schedule lookups.")
  .meta({
    relatedEndpoints: ["wsf-schedules/routes"]
  })

// Enum field with complete value mapping - examples at end of first sentence
z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).describe("Indicates the fare total type with logical grouping (1=Depart, 2=Return, 3=Either, 4=Total). Used for organizing fare calculations by trip leg. Each leg may have different pricing rules.")

// Complex cross-reference field - examples at end of first sentence
z.integer().describe("Provides an array index referencing TerminalComboVerbose array to find corresponding terminal combination details (e.g., '0' for first combination, '1' for second combination). Use wsf-fares/terminals for terminal combination information. Index values start at 0.")
  .meta({
    relatedEndpoints: ["wsf-fares/terminals"]
  })
```

### Schema-Level Examples

#### ❌ Poor Schema Examples

```typescript
// Too generic - no business context
z.object({
  // fields
}).describe("An object containing data")

// Missing operational context
z.object({
  // fields
}).describe("Terminal information including ID and description")
```

#### ✅ Good Schema Examples

```typescript
// Complete terminal schema with full context
z.object({
  terminalID: z.integer().describe("Provides a unique identifier for a WSF terminal used for route planning and fare calculations. Use wsf-terminals/terminalbasics to retrieve terminal details."),
  description: z.string().describe("Returns the human-readable name of the terminal for display purposes. Use wsf-terminals/terminalbasics for complete terminal information.")
}).describe("Returns complete WSF terminal information including identifier and display name for route planning and passenger navigation. Provides essential data for fare calculations and schedule lookups. Use wsf-terminals/terminalbasics for detailed terminal information.")
  .meta({
    relatedEndpoints: ["wsf-terminals/terminalbasics", "wsf-schedules/terminals", "wsf-fares/terminals"],
    updateFrequency: "static"
  })
```

### Common Mistakes to Avoid

1. **Generic Descriptions:** "A string value" → "Provides a unique identifier for a WSF terminal"
2. **Missing Context:** "Terminal ID" → "Provides a unique identifier for a WSF terminal used for route planning"
3. **Passive Voice:** "Is used to identify" → "Provides"
4. **Redundant Type Info:** "A number representing the amount" → "Returns the fare amount in USD"
5. **Missing Cross-References:** No related endpoints → Clear endpoint connections
6. **Inconsistent Examples:** "1" → "1 for Seattle terminal"
7. **Missing Business Context:** No operational information → Clear business logic
8. **Doesn't Start with Verb:** "Unique identifier" → "Provides a unique identifier"

## 12. Domain Glossary Reference

### Ferry System Components (WSF APIs)

#### Core Ferry Entities
- **Terminal:** Physical dock or station where ferry vessels depart from and arrive at. Terminals serve as critical hubs for passenger and vehicle boarding, fare collection, and schedule adherence within the ferry network. Identified by `TerminalID`.
- **Vessel:** Physical ferry boat that transports passengers and/or vehicles across specific routes. Vessels have unique characteristics, capacities, and operational statuses, and are identified by `VesselID`.
- **Route:** Defined path or sequence of stops a ferry vessel follows between specific terminals. Routes represent the logical connections within the ferry system and are typically identified by a `RouteID`.
- **Scheduled Route (SchedRoute):** A specific operational plan for a `Route` that is active during a particular `Season`. A scheduled route might have specific notes, contingencies, or service disruptions associated with it. Identified by `SchedRouteID`.
- **Sailing:** A planned departure time for a vessel on a specific `Scheduled Route`, organized by direction of travel and days of operation. Sailings represent individual trip offerings within the schedule and are identified by `SailingID`.
- **Journey:** A single, complete trip made by a specific `Vessel` along a `Sailing`, typically stopping at one or more terminals to complete a full passage in one direction. Journeys can have attributes like reservation availability or international travel indications. Identified by `JourneyID`.
- **TerminalMate:** Refers to an `ArrivingTerminalID` that is a valid destination terminal for a given `DepartingTerminalID` on a specific `TripDate`. This concept highlights the directional relationships between terminals within the ferry network.
- **Season:** A defined period of time (e.g., "Spring," "Summer," "Fall," "Winter") during which specific ferry schedules and fares are active. Seasons dictate the operational context for `Scheduled Routes` and `Sailings`. Identified by `ScheduleID`.

#### Ferry Fare System
- **Fare Line Item:** A specific category of fare (e.g., "Adult (age 19 - 64)," "Standard Vehicle") with an associated cost (`Amount`), collected for a particular journey. Fare line items are grouped into `Category` (e.g., "Passenger", "Vehicle"). Identified by `FareLineItemID`.
- **Terminal Combo:** A valid combination of departing and arriving terminals for fare calculation purposes. Represents the logical pairing of terminals that can be used together for pricing.
- **Fare Total Type:** Logical grouping for fare totals: 1=Depart (departure leg), 2=Return (return leg), 3=Either (applicable to either leg), 4=Total (grand total).

#### Ferry Operational Data
- **Cache Flush Date:** Timestamp indicating when certain service data was last changed. Used for coordinating application caching strategies.
- **Valid Date Range:** Date range for which fares or schedule data is currently published and available.
- **Terminal Sailing Space:** Real-time data about available drive-up and reservation spaces for select departures. Updates every 5 seconds.
- **Terminal Wait Times:** Tips and wait time conditions for both vehicles and walk-on passengers at terminals.

### WSDOT Traffic & Travel

#### Highway Management
- **Highway Alert:** An active incident or advisory (e.g., collision, construction, weather event) affecting a segment of the highway system, providing critical real-time information for travelers. These are logged in the WSDOT ROADS system.
- **Area:** List of map areas available for traffic alert queries, used for filtering and organizing highway alerts by geographic regions.
- **Roadway Location:** Describes a specific location on a WA State Highway, providing precise geographic context for traffic incidents and conditions.

#### Border and Commercial Vehicle Management
- **Border Crossing:** A specific point of entry between Washington State and Canada, monitored for real-time wait times to assist travelers. Coverage includes I-5, SR-543, SR-539, and SR-9 crossings.
- **Border Crossing Data:** Information about Canadian border crossing wait times, including current conditions and estimated delays.
- **Commercial Vehicle Restriction (CVRestriction):** Represents restrictions for commercial vehicles, including weight limits, route restrictions, and seasonal limitations. Coverage is statewide.

#### Traffic Monitoring
- **Traffic Flow:** Real-time data collected from sensors on highways indicating current traffic conditions, such as speed and congestion levels. Conditions range from 'Unknown' to 'StopAndGo'. Coverage includes Vancouver, Olympia, Tacoma, Seattle, Spokane. Data is provided by regional Traffic Management Centers and updated every 90 seconds.
- **Flow Data:** A data structure that represents a Flow Station, containing sensor readings and traffic condition assessments.
- **Travel Time Route:** A pre-defined segment of a highway used to calculate estimated travel times between two points, often considering current traffic conditions. Coverage includes Seattle, Tacoma, Snoqualmie Pass.
- **Travel Times:** Provides travel times for many popular travel routes around Washington State, helping travelers plan their journeys.

#### Mountain Pass Management
- **Mountain Pass:** A high-elevation roadway that crosses a mountain range, subject to specific weather and travel conditions that can impact accessibility. Conditions are monitored in real-time. Coverage includes 15 passes.
- **Pass Condition:** A data structure that represents the conditions of a mountain pass, including weather, road conditions, and travel restrictions.
- **Travel Restriction:** A travel restriction for mountain passes, including chain requirements, closures, or other limitations.

#### Toll Management
- **Toll Rate:** Toll information for HOV (High Occupancy Vehicle) lanes, including current pricing and payment methods.
- **Toll Trip Info:** A data contract that represents Trip Information details for tolled routes.
- **Toll Trips:** A data contract that represents Toll Trips, including route information and pricing.
- **Toll Trip Version:** A data contract that represents published Toll Trip Version number, used for tracking pricing changes.
- **Trip Rate:** A data contract that represents Trip rate information for toll calculations.

### WSDOT Weather & Environmental Data

#### Weather Infrastructure
- **Weather Station:** A physical installation maintained by WSDOT that collects various meteorological data (e.g., air temperature, wind speed, precipitation, road surface temperature) from a specific geographic location. Identified by `StationId` and `StationName`.
- **Weather Station Data:** Contains information about weather stations, including location, capabilities, and operational status.
- **Weather Stations:** Return current list of weather stations maintained by WSDOT, providing a comprehensive inventory of available weather monitoring points.

#### Weather Measurements
- **Weather Reading:** A specific set of meteorological measurements (e.g., air temperature, wind speed, precipitation) recorded at a particular `Weather Station` at a `ReadingTime`. This represents a snapshot of weather conditions.
- **Weather Information (WeatherInfo):** Current or historical aggregated weather data derived from one or more `Weather Stations`, providing a summary of conditions.
- **Weather Information:** Returns current weather information from weather stations that are run by the Washington State Department of Transportation.
- **Scanweb Sub-Surface Measurements:** Measurements recorded by sub-surface sensors, providing data about road conditions below the surface.
- **Scanweb Surface Measurements:** Measurements recorded by surface sensors, providing data about road surface conditions including temperature, moisture, and traction.

### WSDOT Infrastructure & Monitoring

#### Bridge Management
- **Bridge Data GIS:** A record containing the location and clearance information of a bridge structure, used for navigation and safety purposes.
- **Clearance:** Bridge clearance information, including height restrictions and safety warnings. Important for commercial vehicle routing.

#### Traffic Monitoring Infrastructure
- **Camera:** Information about traffic cameras used for monitoring highway conditions and incidents. Coverage is statewide, providing access to camera images that appear on Traffic pages. Currently supports snapshots (not full video). Camera availability changes infrequently.
- **Highway Cameras:** Coverage Area: Statewide. Provides access to the camera images that appear on our Traffic pages. Currently only supports snap shots (not full video). The available cameras does not change very often.

### Entity Relationships and Discoverability

#### Ferry System Relationships
- **Vessels** travel between **Terminals** along **Routes**
- **Routes** are organized into **Scheduled Routes** for specific **Seasons**
- **Sailings** define departure times for **Scheduled Routes**
- **Journeys** represent actual vessel trips following **Sailings**
- **TerminalMates** define valid terminal combinations for fare calculations
- **Fare Line Items** apply to specific **Terminal Combos** and **Journeys**

#### WSDOT System Relationships
- **Weather Stations** provide **Weather Readings** that contribute to **Weather Information**
- **Highway Alerts** affect specific **Roadway Locations** within defined **Areas**
- **Traffic Flow** data comes from **Flow Stations** along **Travel Time Routes**
- **Mountain Passes** have **Pass Conditions** that may include **Travel Restrictions**
- **Border Crossings** provide **Border Crossing Data** for wait time information
- **Commercial Vehicle Restrictions** apply to specific routes and conditions

#### Cross-System Integration
- **Weather Information** influences **Mountain Pass Conditions** and **Travel Restrictions**
- **Traffic Flow** data affects **Travel Times** calculations
- **Highway Alerts** may impact **Border Crossing** wait times
- **Weather Stations** provide data for both traffic safety and mountain pass management

This comprehensive glossary provides the semantic foundation for understanding how entities relate to each other across the WSDOT and WSF systems, enabling agents to create meaningful, contextually rich descriptions that enhance discoverability and usability.

This style guide prioritizes human comprehension and agent utility through rich, verb-starting descriptions while providing minimal, high-value metadata for programmatic discovery, creating annotations that serve both audiences effectively while maintaining the abstraction layers provided by the `ws-dottie` library.
