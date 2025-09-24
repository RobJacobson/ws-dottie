# Unified Zod Schema Annotation Style Guide for WSDOT/WSF APIs

## Overview

This style guide provides comprehensive instructions for AI agents tasked with enhancing Zod 4 schema annotations for the Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF) APIs. The goal is to create semantically rich, dual-purpose annotations that serve both human developers and Model Context Protocol (MCP) servers through a layered hybrid approach using Zod 4's `.meta()` method.

## 🚨 Critical Reminders for Agents

- **Ground Truth is API Data:** Always prioritize actual API data samples over official documentation when discrepancies arise regarding data types, nullability, or specific values.
- **Review Actual Data:** For each endpoint you work on, you **must** fetch and review actual API data samples using `fetch-dottie` CLI or similar tools.
- **Failure Condition:** Any inability to fetch correct data using `fetch-dottie` is a **failure condition**. You must **stop and ask the user** for clarification or assistance immediately.
- **No Schema Modification:** **NEVER modify schema implementations or related fetching logic** unless expressly requested by the user. Your task is to enhance annotations only.
- **Report Discrepancies:** Actively look for and report any discrepancies between our schemas/data and official documentation or unexpected behaviors in data samples.
- **API Access Handled Automatically:** The `ws-dottie` library handles API access codes automatically. Omit `APIAccessCode` from schema parameters as it's handled by the underlying system.
- **Be Concise and Semantic:** Focus on providing meaningful, narrative descriptions that explain the *purpose*, *context*, and *relationships* of data, rather than merely restating obvious types.
- **Provide Relational Context:** It is highly beneficial to provide context about the semantic relationships between different entities and different endpoints. Explain what an entity represents in the real world and how data from different endpoints can be combined or used together.
- **Propose Updates:** If any part of this style guide is confusing, ambiguous, or could be improved, you are encouraged to propose updates.
- **Seek Clarification:** If you are unsure about how to proceed with any portion of the work, stop and request clarification from the user.

## 1. Core Architecture: Layered Hybrid Approach

Our annotations use Zod 4's `.meta()` method to create a **layered hybrid approach** that combines human-first narratives with structured, machine-readable metadata for AI agents and MCP servers.

### Basic Structure

```typescript
import { z } from "zod/v4";

// Field-level annotation
const fieldSchema = z.string().meta({
  description: "Human-first narrative explanation of the field's purpose and context",
  agentMetadata: {
    // Structured metadata for AI agents and MCP servers
    domain: "transportation",
    entity: "ferry_terminal",
    semanticType: "TerminalIdentifier",
    relatedEndpoints: ["wsf-terminals/terminalbasics"],
    examples: [
      { value: 1, description: "'1' for Seattle" },
      { value: 3, description: "'3' for Bainbridge Island" }
    ]
  }
});

// Schema-level annotation
const objectSchema = z.object({
  // field definitions with .meta() annotations
}).meta({
  description: "High-level explanation of the schema's role and contents",
  agentMetadata: {
    // Schema-level metadata
    apiGroup: "wsf-terminals",
    updateFrequency: "cache_dependent",
    businessContext: "Provides basic terminal information for route planning"
  }
});
```

## 2. Narrative Description Guidelines (`meta().description`)

The `description` field should be the primary source of human-readable information, following these principles:

### Length and Structure

- **Field-Level Descriptions:** 1-3 sentences (15-75 words)
- **Schema-Level Descriptions:** 2-4 sentences (25-100 words)
- **Structure:** Purpose Statement → Contextual Details → Usage Insight

### Writing Principles

1. **Semantic Richness:** Go beyond literal definitions. Explain the *why* and *meaning*, not just the *what*
2. **Active Voice:** Use imperative mood ("Identifies" not "Is an identifier for")
3. **Contextual Clarity:** Include domain-specific context that might not be obvious
4. **Example Integration:** Weave examples naturally into descriptions
5. **Relationship Awareness:** Mention connections to other fields or schemas

### Declarative Statement Patterns

To ensure consistency across all APIs, follow these specific patterns:

#### Field Description Templates

**For Identifiers:**
```typescript
"Unique identifier for [entity type] used for [primary purpose]. [Additional context or relationship]."
// Example: "Unique identifier for a WSF terminal used for route planning and fare calculations. Use wsf-terminals/terminalbasics to retrieve terminal details."
```

**For Amounts/Values:**
```typescript
"[Value type] in [units] for [specific purpose], [additional context]. [Business logic or calculation notes]."
// Example: "Fare amount in USD for the specified passenger category, excluding promotional discounts. Walk-on passengers are charged once for round trips."
```

**For Dates/Times:**
```typescript
"[Date/time purpose] in [format] for [specific use case]. [Special handling notes if applicable]."
// Example: "Trip date in YYYY-MM-DD format for fare calculations. Reflects WSF 'sailing day' (3:00 AM Pacific to 2:59 AM next day)."
```

**For Enums/Status Fields:**
```typescript
"[Field purpose] indicating [enum meaning]. [List key values with context]."
// Example: "Fare total type indicating logical grouping (1=Depart, 2=Return, 3=Either, 4=Total). Used for organizing fare calculations by trip leg."
```

#### Schema Description Templates

**For Data Collections:**
```typescript
"Collection of [entity type] providing [primary purpose] for [target users]. [Key components and relationships]. [Usage context and integration notes]."
```

**For Individual Entities:**
```typescript
"Complete [entity type] information including [key components] for [primary use case]. [Relationship to other entities]. [Business context and operational notes]."
```

### Parenthetical Inclusion Patterns

When including sample data or enum values in descriptions, use these consistent patterns:

#### Sample Data Inclusion
```typescript
// For single examples
"Terminal identifier (e.g., 1 for Seattle, 3 for Bainbridge Island)"

// For multiple examples with context
"Fare amount in USD (e.g., $15.50 for adult passenger, $7.75 for child)"

// For conditional examples
"Wind speed in MPH (e.g., 15 for moderate conditions, null if sensor unavailable)"
```

#### Enum Value Inclusion
```typescript
// For numeric enums
"Schedule season (0=Spring, 1=Summer, 2=Fall, 3=Winter)"

// For boolean flags
"Direction independence flag (true if fare amount is the same regardless of departure terminal)"

// For complex enums
"Fare total type (1=Depart leg, 2=Return leg, 3=Either direction, 4=Grand total)"
```

### Tone and Voice Guidelines

- **Use present tense:** "Identifies" not "Is used to identify"
- **Be direct and confident:** "Provides" not "Is intended to provide"
- **Use active voice:** "Enables route planning" not "Route planning is enabled by"
- **Avoid hedging:** "Indicates" not "May indicate" (unless uncertainty is genuine)
- **Be specific:** "Terminal identifier" not "Identifier"
- **Use consistent terminology:** Always "terminal" not "station" for ferry docks

### Examples

```typescript
// Good: Explains purpose and context
z.string().meta({
  description: "Unique ferry terminal identifier used for route planning and passenger navigation"
})

// Good: Includes business context
z.number().meta({
  description: "Fare amount in USD for the specified passenger category, excluding any promotional discounts"
})

// Good: Explains relationships
z.array(z.string()).meta({
  description: "List of valid terminal combinations for fare calculations, referenced by terminal IDs from the terminals endpoint"
})
```

## 3. Agent Metadata Structure (`meta().agentMetadata`)

The `agentMetadata` object provides structured information for AI agents and MCP servers.

### Required Properties

- **`description`**: Always included in the main `meta()` object (not in `agentMetadata`)

### Core Metadata Properties

#### Domain & Entity Context
```typescript
agentMetadata: {
  domain: "transportation" | "weather" | "ferries" | "traffic",
  entity: "ferry_terminal" | "weather_station" | "highway_alert" | "traffic_camera",
  semanticType: "TerminalIdentifier" | "GeographicCoordinate" | "Timestamp" | "MonetaryAmount"
}
```

**Usage Guidelines:**
- **`domain`**: Use consistent values across related APIs (e.g., "ferries" for all WSF APIs)
- **`entity`**: Be specific about the real-world entity (e.g., "ferry_terminal" not just "terminal")
- **`semanticType`**: Use abstract classifications that help agents understand data purpose

#### Relationships & Dependencies
```typescript
agentMetadata: {
  relatedEndpoints: ["wsf-terminals/terminalbasics", "wsf-schedules/terminals"],
  crossReferences: [
    {
      field: "TerminalComboIndex",
      targetArray: "TerminalComboVerbose",
      description: "Index into the TerminalComboVerbose array to find corresponding terminal combination details"
    }
  ],
  relatesTo: "wsf-terminals/terminalbasics.TerminalID",
  dependsOn: ["DepartingTerminalID", "ArrivingTerminalID"]
}
```

**Usage Guidelines:**
- **`relatedEndpoints`**: Include endpoints that provide valid values or related information
- **`crossReferences`**: Use for complex array indexing relationships (e.g., `/farelineitemsverbose`)
- **`relatesTo`**: Specify exact field relationships using `[api]/[endpoint].[field]` format
- **`dependsOn`**: List fields whose values influence this field's behavior

#### Examples and Enum Values
```typescript
agentMetadata: {
  examples: [
    { value: 1, description: "1 for Seattle terminal" },
    { value: 3, description: "3 for Bainbridge Island terminal" },
    { value: null, description: "null if terminal unavailable" }
  ],
  enumValues: [
    { value: 1, description: "Depart (departure leg)" },
    { value: 2, description: "Return (return leg)" },
    { value: 3, description: "Either (applicable to either leg)" },
    { value: 4, description: "Total (grand total)" }
  ]
}
```

**Usage Guidelines:**
- **`examples`**: Use 2-4 diverse, real-world values from actual API data
- **`enumValues`**: Provide complete mappings for all enum values
- **Include edge cases**: Add `null` examples for nullable fields
- **Be specific**: "1 for Seattle terminal" not just "1"

#### Operational Context
```typescript
agentMetadata: {
  updateFrequency: "real_time" | "cache_dependent" | "static" | "5s" | "90s" | "daily",
  cachingPolicy: "no_cache" | "cache_until_flush" | "long_term_cache",
  businessRules: ["Walk-on passengers charged once for round trips", "Vehicle fares charged per direction"],
  warnings: ["Data changes every 5 seconds - do not cache"],
  units: "MPH" | "USD" | "meters" | "degrees_celsius",
  timezone: "America/Los_Angeles",
  outputTimezone: "UTC"
}
```

**Usage Guidelines:**
- **`updateFrequency`**: Use specific intervals when known (e.g., "5s" for VesselLocations)
- **`cachingPolicy`**: Align with API documentation recommendations
- **`businessRules`**: Include domain-specific logic that affects usage
- **`warnings`**: Add critical operational notes (e.g., caching restrictions)
- **`units`**: Always specify for measurements and amounts
- **`timezone`**: Include for time-sensitive data

#### Validation & Constraints
```typescript
agentMetadata: {
  type: "string" | "number" | "boolean" | "Date" | "object" | "array",
  format: "YYYY-MM-DD" | "ISOString" | "uuid" | "email",
  constraints: "alphanumeric_8_chars" | "min=10" | "max=100" | "pattern=^XYZ-",
  nullable: true | false,
  required: true | false,
  default: "default_value"
}
```

**Usage Guidelines:**
- **`type`**: Supplement Zod's type for clarity (especially for Date objects)
- **`format`**: Specify expected formats for strings and dates
- **`constraints`**: Include validation rules not captured by Zod
- **`nullable`**: Explicitly state for fields that can be null
- **`required`**: Clarify mandatory vs optional fields
- **`default`**: Include when fields have default values

#### MCP-Specific Hints
```typescript
agentMetadata: {
  discoverable: true | false,
  queryable: true | false,
  query_template: "GET /terminals/{terminal_id}",
  supportsFilteringBy: ["terminalId", "date", "route"],
  readOnlyHint: true | false,
  destructiveHint: true | false,
  idempotentHint: true | false,
  openWorldHint: true | false
}
```

**Usage Guidelines:**
- **`discoverable`**: Mark fields critical for endpoint discovery
- **`queryable`**: Indicate if field can be used in queries
- **`query_template`**: Provide URL patterns for common queries
- **`supportsFilteringBy`**: List fields this schema can be filtered by
- **MCP hints**: Use for schema-level metadata to guide tool behavior

## 4. Date and Time Handling

### Output Dates
```typescript
z.date().meta({
  description: "Timestamp when this weather reading was recorded. This is returned as a JavaScript Date object.",
  agentMetadata: {
    type: "Date",
    format: "ISOString",
    outputTimezone: "UTC"
  }
})
```

### Input Dates
```typescript
z.string().meta({
  description: "Trip date in YYYY-MM-DD format for which to retrieve terminal information",
  agentMetadata: {
    type: "string",
    format: "YYYY-MM-DD"
  }
})
```

### WSF "Sailing Day" Logic
For WSF Schedules and Fares APIs:
```typescript
z.string().meta({
  description: "Trip date in YYYY-MM-DD format. This date parameter should reflect the 'sailing day,' which spans from 3:00 AM Pacific time to 2:59 AM the next calendar day. For instance, an early morning ferry (1:00 AM) on September 23rd would fall under the sailing day of September 22nd.",
  agentMetadata: {
    type: "string",
    format: "YYYY-MM-DD",
    sailingDayLogic: true,
    sailingDayDefinition: "3am_to_2:59am_next_day_pacific_time",
    timezone: "America/Los_Angeles"
  }
})
```

## 5. Domain-Specific Guidelines

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

## 6. Quality Assurance Framework

### Comprehensive Review Checklist

#### Narrative Description Quality
1. **Readability:** Can the description be read aloud naturally without stumbling?
2. **Completeness:** Does it explain purpose and context, not just structure?
3. **Semantic Richness:** Does it answer "What is this for?" and "How is it used?"
4. **Active Voice:** Uses imperative mood and present tense consistently
5. **Specificity:** Avoids generic terms like "identifier" without context
6. **Length:** Stays within word limits (15-75 words for fields, 25-100 for schemas)

#### Metadata Completeness
7. **Domain Context:** Includes appropriate `domain`, `entity`, and `semanticType`
8. **Examples:** Provides 2-4 diverse, real-world examples from actual API data
9. **Relationships:** Documents connections to other endpoints and schemas
10. **Operational Context:** Includes update frequency, caching policy, and business rules
11. **Validation:** Specifies constraints, formats, and data types clearly
12. **MCP Integration:** Includes discoverability and queryability hints where relevant

#### Consistency and Standards
13. **Terminology:** Uses consistent domain terms (e.g., "terminal" not "station")
14. **Patterns:** Follows established templates for similar field types
15. **Formatting:** Uses consistent parenthetical patterns for examples and enums
16. **Cross-References:** Uses proper `[api]/[endpoint]` format for related endpoints

#### Technical Accuracy
17. **Data Validation:** Verifies examples against actual API responses
18. **Type Accuracy:** Ensures metadata types match Zod schema definitions
19. **Relationship Accuracy:** Confirms cross-references point to valid endpoints
20. **Business Logic:** Validates domain-specific rules against real-world behavior

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
- [ ] Clear, declarative description following established patterns
- [ ] Appropriate `domain`, `entity`, and `semanticType` metadata
- [ ] 2-4 real-world examples from actual API data
- [ ] Proper relationship documentation where applicable
- [ ] Operational context (update frequency, caching, business rules)

#### Should-Have Elements
- [ ] Enum value mappings for enum fields
- [ ] Cross-reference documentation for complex array structures
- [ ] MCP-specific hints for discoverability
- [ ] Validation constraints and format specifications
- [ ] Timezone and unit specifications where relevant

#### Quality Indicators
- [ ] Description reads naturally when spoken aloud
- [ ] Examples are diverse and representative
- [ ] Business context is clear and accurate
- [ ] Relationships to other entities are well-documented
- [ ] Metadata is complete and consistent with similar fields

## 7. Implementation Guidelines

### Agent Workflow

#### Step 1: Data Collection and Analysis
1. **Fetch Real Data:** Use `fetch-dottie` to get actual API responses
2. **Review Documentation:** Study official API docs for context
3. **Identify Relationships:** Map connections between endpoints and fields
4. **Note Discrepancies:** Flag any mismatches between docs and data

#### Step 2: Annotation Creation
1. **Start with Purpose:** Write clear, declarative descriptions
2. **Add Context:** Include domain-specific information and relationships
3. **Structure Metadata:** Complete `agentMetadata` with all relevant keys
4. **Include Examples:** Use diverse, real-world values from API data
5. **Document Relationships:** Add cross-references and endpoint connections

#### Step 3: Quality Review
1. **Read Aloud Test:** Ensure descriptions flow naturally
2. **Completeness Check:** Verify all required metadata is present
3. **Consistency Review:** Check against established patterns
4. **Accuracy Validation:** Confirm examples and relationships are correct

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
}).meta({
  description: "Parameters for calculating WSF ferry fares",
  agentMetadata: {
    apiGroup: "wsf-fares",
    businessContext: "Input parameters for fare calculation requests"
  }
});
```

### Naming Conventions
- **API References:** Use `[api]/[endpoint]` format (e.g., `"wsf-terminals/terminalbasics"`)
- **Field References:** Use `[api]/[function].[fieldname]` format
- **Consistent Terminology:** Use established domain glossary terms

### Annotation Priority Order

When creating annotations, prioritize in this order:

1. **Core Description:** Clear, declarative narrative explanation
2. **Domain Context:** `domain`, `entity`, `semanticType`
3. **Examples:** Real-world values from API data
4. **Relationships:** `relatedEndpoints`, `crossReferences`
5. **Operational Context:** `updateFrequency`, `cachingPolicy`, `businessRules`
6. **Validation Details:** `type`, `format`, `constraints`
7. **MCP Integration:** `discoverable`, `queryable`, MCP hints

### Common Patterns by Field Type

#### Identifier Fields
```typescript
// Pattern: "Unique identifier for [entity] used for [purpose]. [Relationship context]."
z.integer().meta({
  description: "Unique identifier for a WSF terminal used for route planning and fare calculations. Use wsf-terminals/terminalbasics to retrieve terminal details.",
  agentMetadata: {
    domain: "ferries",
    entity: "terminal",
    semanticType: "TerminalIdentifier",
    relatedEndpoints: ["wsf-terminals/terminalbasics"],
    examples: [{ value: 1, description: "1 for Seattle terminal" }],
    discoverable: true,
    queryable: true
  }
})
```

#### Amount/Value Fields
```typescript
// Pattern: "[Value type] in [units] for [purpose], [context]. [Business logic]."
z.number().meta({
  description: "Fare amount in USD for the specified passenger category, excluding promotional discounts. Walk-on passengers are charged once for round trips.",
  agentMetadata: {
    domain: "ferries",
    entity: "fare",
    semanticType: "MonetaryAmount",
    units: "USD",
    examples: [{ value: 15.50, description: "$15.50 for adult passenger" }],
    businessRules: ["Walk-on passengers charged once for round trips"]
  }
})
```

#### Date/Time Fields
```typescript
// Pattern: "[Date purpose] in [format] for [use case]. [Special handling]."
z.string().meta({
  description: "Trip date in YYYY-MM-DD format for fare calculations. Reflects WSF 'sailing day' (3:00 AM Pacific to 2:59 AM next day).",
  agentMetadata: {
    domain: "ferries",
    entity: "trip_date",
    semanticType: "Date",
    type: "string",
    format: "YYYY-MM-DD",
    sailingDayLogic: true,
    timezone: "America/Los_Angeles",
    examples: [{ value: "2025-04-01", description: "April 1, 2025" }]
  }
})
```

#### Enum/Status Fields
```typescript
// Pattern: "[Field purpose] indicating [enum meaning]. [Value mappings]."
z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).meta({
  description: "Fare total type indicating logical grouping (1=Depart, 2=Return, 3=Either, 4=Total). Used for organizing fare calculations by trip leg.",
  agentMetadata: {
    domain: "ferries",
    entity: "fare_total_type",
    semanticType: "FareCategory",
    enumValues: [
      { value: 1, description: "Depart (departure leg)" },
      { value: 2, description: "Return (return leg)" },
      { value: 3, description: "Either (applicable to either leg)" },
      { value: 4, description: "Total (grand total)" }
    ]
  }
})
```

## 8. Best Practices Summary

1. **Start with Purpose:** Every description should answer "What is this for?"
2. **Include Context:** Add domain-specific information that provides meaning
3. **Use Examples:** Provide realistic examples that illustrate usage
4. **Document Relationships:** Explain how schemas connect to each other
5. **Be Consistent:** Follow established patterns across all schemas
6. **Test Readability:** Ensure descriptions flow naturally when read aloud
7. **Consider Users:** Write for both developers and automated systems
8. **Maintain Accuracy:** Verify all information against actual API behavior

## 9. Comprehensive Examples and Anti-Patterns

### Field-Level Examples

#### ❌ Poor Examples (Anti-Patterns)

```typescript
// Too generic - no context or purpose
z.string().meta({
  description: "A string value"
})

// Redundant type information - states the obvious
z.number().meta({
  description: "A number representing the amount"
})

// Missing context - doesn't explain what it's for
z.string().meta({
  description: "Terminal ID"
})

// Passive voice and hedging - weak and unclear
z.string().meta({
  description: "May be used to identify a terminal"
})

// Missing metadata - no structured information for agents
z.string().meta({
  description: "Unique ferry terminal identifier used for route planning"
})
```

#### ✅ Good Examples

```typescript
// Terminal ID with full context and metadata
z.string().meta({
  description: "Unique identifier for a WSF terminal used for route planning and fare calculations. Use wsf-terminals/terminalbasics to retrieve terminal details.",
  agentMetadata: {
    domain: "ferries",
    entity: "terminal",
    semanticType: "TerminalIdentifier",
    relatedEndpoints: ["wsf-terminals/terminalbasics", "wsf-schedules/terminals"],
    examples: [
      { value: 1, description: "1 for Seattle terminal" },
      { value: 3, description: "3 for Bainbridge Island terminal" }
    ],
    discoverable: true,
    queryable: true
  }
})

// Fare amount with business context
z.number().meta({
  description: "Fare amount in USD for the specified passenger category, excluding promotional discounts. Walk-on passengers are charged once for round trips.",
  agentMetadata: {
    domain: "ferries",
    entity: "fare",
    semanticType: "MonetaryAmount",
    units: "USD",
    examples: [
      { value: 15.50, description: "$15.50 for adult passenger" },
      { value: 7.75, description: "$7.75 for child passenger" }
    ],
    businessRules: ["Walk-on passengers charged once for round trips"]
  }
})

// Date field with sailing day logic
z.string().meta({
  description: "Trip date in YYYY-MM-DD format for fare calculations. Reflects WSF 'sailing day' (3:00 AM Pacific to 2:59 AM next day).",
  agentMetadata: {
    domain: "ferries",
    entity: "trip_date",
    semanticType: "Date",
    type: "string",
    format: "YYYY-MM-DD",
    sailingDayLogic: true,
    sailingDayDefinition: "3am_to_2:59am_next_day_pacific_time",
    timezone: "America/Los_Angeles",
    examples: [
      { value: "2025-04-01", description: "April 1, 2025" }
    ]
  }
})

// Enum field with complete value mapping
z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).meta({
  description: "Fare total type indicating logical grouping (1=Depart, 2=Return, 3=Either, 4=Total). Used for organizing fare calculations by trip leg.",
  agentMetadata: {
    domain: "ferries",
    entity: "fare_total_type",
    semanticType: "FareCategory",
    enumValues: [
      { value: 1, description: "Depart (departure leg)" },
      { value: 2, description: "Return (return leg)" },
      { value: 3, description: "Either (applicable to either leg)" },
      { value: 4, description: "Total (grand total)" }
    ]
  }
})

// Complex cross-reference field
z.integer().meta({
  description: "Array index referencing TerminalComboVerbose array to find corresponding terminal combination details.",
  agentMetadata: {
    domain: "ferries",
    entity: "array_index",
    semanticType: "ArrayIndex",
    crossReferences: [
      {
        field: "TerminalComboIndex",
        targetArray: "TerminalComboVerbose",
        description: "Index into the TerminalComboVerbose array to find corresponding terminal combination details"
      }
    ],
    examples: [
      { value: 0, description: "0 for first terminal combination" },
      { value: 5, description: "5 for sixth terminal combination" }
    ]
  }
})
```

### Schema-Level Examples

#### ❌ Poor Schema Examples

```typescript
// Too generic - no business context
z.object({
  // fields
}).meta({
  description: "An object containing data"
})

// Missing operational context
z.object({
  // fields
}).meta({
  description: "Terminal information including ID and description"
})
```

#### ✅ Good Schema Examples

```typescript
// Complete terminal schema with full context
z.object({
  terminalID: z.integer().meta({
    description: "Unique identifier for a WSF terminal used for route planning and fare calculations",
    agentMetadata: {
      domain: "ferries",
      entity: "terminal",
      semanticType: "TerminalIdentifier",
      examples: [{ value: 1, description: "1 for Seattle terminal" }]
    }
  }),
  description: z.string().meta({
    description: "Human-readable name of the terminal for display purposes",
    agentMetadata: {
      domain: "ferries",
      entity: "terminal",
      semanticType: "TerminalName",
      examples: [{ value: "Seattle", description: "Seattle terminal" }]
    }
  })
}).meta({
  description: "Complete WSF terminal information including identifier and display name for route planning and passenger navigation. Provides essential data for fare calculations and schedule lookups.",
  agentMetadata: {
    domain: "ferries",
    entity: "terminal",
    apiGroup: "wsf-terminals",
    updateFrequency: "cache_dependent",
    businessContext: "Provides basic terminal information for route planning and fare calculations",
    relatedEndpoints: ["wsf-schedules/terminals", "wsf-fares/terminals"],
    discoverable: true,
    queryable: true
  }
})
```

### Common Mistakes to Avoid

1. **Generic Descriptions:** "A string value" → "Unique identifier for a WSF terminal"
2. **Missing Context:** "Terminal ID" → "Unique identifier for a WSF terminal used for route planning"
3. **Passive Voice:** "Is used to identify" → "Identifies"
4. **Redundant Type Info:** "A number representing the amount" → "Fare amount in USD"
5. **Missing Metadata:** No `agentMetadata` → Complete structured metadata
6. **Inconsistent Examples:** "1" → "1 for Seattle terminal"
7. **Missing Relationships:** No `relatedEndpoints` → Clear endpoint connections
8. **No Business Context:** Missing operational and business logic information

## 10. Domain Glossary Reference

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

This style guide prioritizes human comprehension while providing structured metadata for automated systems, creating annotations that serve both audiences effectively while maintaining the abstraction layers provided by the `ws-dottie` library.
