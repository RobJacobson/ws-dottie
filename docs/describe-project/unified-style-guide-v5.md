# API Documentation Style Guide

## Introduction

This style guide provides standards for creating API documentation that serves both human developers and AI agents using Model Context Protocol (MCP) servers. The focus is on creating documentation that explains not just technical specifications, but the real-world meaning and business context behind every piece of information. Since MCP enables AI agents to autonomously discover and invoke API functionality, our documentation must be semantically rich and discoverable for both human and machine readers.

## Project Context

### The Challenge
We are enhancing documentation for existing third-party APIs from the Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF) that have poor documentation quality. The underlying APIs are controlled by WSDOT/WSF and cannot be modified. Our goal is to transform cryptic, terse descriptions into rich, semantic documentation that provides meaningful business context.

### Current State
- **16 APIs** across WSDOT and WSF systems
- **~95 endpoints** total requiring documentation enhancement
- **Inconsistent documentation quality** from original providers
- **Example of poor documentation**: "Retrieves an array of currently active incidents" (WSDOT Highway Alerts)

### Our Solution
Transform poor descriptions into rich, semantic documentation that:
- Explains business purpose and real-world meaning
- Provides discoverability for both humans and AI agents
- Connects related endpoints and data relationships
- Uses plain English with appropriate technical precision

## Core Writing Principles

### 1. Plain English with Business Context
Write naturally as if explaining to a colleague. Focus on what the data means in real-world terms, not just its technical structure.

**Good:**
> "The current toll rate in dollars for the HOV lane segment (e.g., '$1.25', '$3.50'). Use this for cost calculation and trip planning."

**Avoid:**
> "A numeric value representing the monetary amount of the toll charge in USD currency units for the specified highway segment."

### 2. Appropriate Length and Detail
Use a **flexible 1–3 sentence approach**: First sentence provides core description, second adds business context or cross-references, and an optional third clarifies complex or non-obvious fields when needed.

**Obvious fields** (1 sentence; 2 if helpful):
- Basic identifiers: "The vessel's unique identifier as an integer (e.g., 1). Use this with wsf-vessels/vesselBasicsById to fetch detailed vessel information."
- Simple timestamps: "The time when this reading was recorded, in UTC (e.g., '2025-09-15T14:23:45Z')."
- Standard coordinates: "The terminal's latitude coordinate in decimal degrees (e.g., 47.6019). Use this for map positioning and distance calculations."

**Non-obvious or complex fields** (2–3 sentences):
- Business-specific concepts: "The bridge's milepost equation indicator for handling route realignments (A=Ahead, B=Back, null=no equation). This helps navigation systems handle highway realignments and route changes."
- Complex business logic: "The trip date following WSF sailing day logic (3:00 AM Pacific to 2:59 AM next day). Use this date format when querying ferry schedules and fares."
- Domain-specific terminology: "The fare total type indicating trip leg (1=Depart, 2=Return, 3=Either, 4=Total). Use this to organize fare calculations and display appropriate pricing to passengers."

### 3. Cross-Reference Relationships
Add cross-references only during the Integration Phase. Place them at the end of the description: preferably as the final sentence, or appended to the final sentence. First sentence explains the field; a later sentence provides specific integration guidance.

**Good cross-reference (final sentence format):**
> "The vessel's unique identifier as an integer (e.g., '1' for Cathlamet). Use this with wsf-vessels/vesselBasicsById to fetch detailed vessel information, then use with wsf-vessels/vesselAccommodations to get accommodations."

**Avoid embedded cross-references:**
> "The vessel's unique identifier as an integer for fetching detailed vessel information via wsf-vessels/vesselBasicsById and accommodations via wsf-vessels/vesselAccommodations (e.g., '1' for Cathlamet)."

**Avoid generic cross-references:**
> "This might be useful for route planning and navigation systems."

### 4. Meaningful Examples
Use examples that help understanding, not just show data format. Include edge cases and clarify units, but avoid redundant explanations.

**Good examples:**
- **Unit clarification**: "(e.g., '$3.50' for $3.50)" - makes units clear at a glance
- **Single example format**: "(e.g., '$1.25' for normal period, '$0' for free periods)"
- **Multiple values with shared unit**: "(e.g., '5', '35', '-1' for closed)" when unit is mentioned in description  
- **Edge cases with clear status**: "(e.g., '5', '-1' for closed)" - show normal vs special state  
- **⚠️ CLEAR RULE: If field description says "minutes", then examples should NOT repeat "for X minutes"**
- **Geographic coordinates when helpful**: "(e.g., '49.004776°N, -122.756964°W')"

**Mandatory real data**:
- Use examples taken from actual API responses. If you cannot fetch data, do not write related descriptions and request assistance; this is a blocking condition.

**Avoid redundant explanations:**
- Don't do: "(e.g., '5' for 5 minutes, '35' for 35 minutes)" - repetitive when unit is same
- Do this instead: "(e.g., '5', '35', '-1' for closed)"
- When explaining units is helpful: "(e.g., '$3.50' for $3.50, null if unavailable)"
- Avoid: "(e.g., '$3.50' for $3.50, '$1.25' for $1.25)" when repeating same format

**Nulls and sentinel values:**
- Do not say "nullable"; instead, include null directly in examples when applicable (e.g., "(e.g., 47.6019; null when unknown)").
- Include sentinel values alongside normal examples with a brief label (e.g., "(e.g., 5, 35, -1 for closed)").

**Currency examples:**
- Use USD with a dollar sign and two decimals unless otherwise specified by the API (e.g., '$3.50').

## Documentation Structure

### Five Components of Documentation

1. **Endpoint Descriptions**: High-level business purpose and use cases
2. **Input Schema Descriptions**: What inputs are required and their purpose
3. **Input Field Descriptions**: Individual parameter explanations
4. **Output Schema Descriptions**: What data is returned and how to use it
5. **Output Field Descriptions**: Individual field explanations with business context

### Bottom-Up Approach

Follow this sequence when working on each API:

1. **Research Phase**: Understand the business domain and relationships
   - Capture endpoint-purpose notes and target users for context (do not write final endpoint descriptions yet)
2. **Parameter Phase**: Document individual input/output fields
3. **Schema Phase**: Write input/output schema descriptions  
4. **Endpoint Phase**: Write endpoint-level descriptions
5. **Integration Phase**: Add cross-endpoint relationships

### Holistic Perspective While Writing Bottom-Up
- While documenting fields and schemas, consider the endpoint's overall purpose captured during Research
- Do not prematurely write the endpoint description; synthesize it after field and schema details are complete
- Use the holistic understanding to guide clarity, terminology, and which cross-references to plan for Integration

## Writing Guidelines by Component

### Endpoint Descriptions
Write 1–2 sentences that explain the business purpose and primary use cases. Do not include data examples in endpoint descriptions; examples are limited to fields. Cross-references at the endpoint level are allowed, but add them during the Integration Phase as final sentence(s) following the same format rules defined below.

**Template:**
> "[Action] [entity type] for [primary use case]. [Business context and target users]."

**Examples:**
- "Shows current wait times at Canadian border crossings to help travelers choose the fastest route."
- "Lists all ferry vessels with basic info like names and capacity for trip planning."
- "Calculates toll costs for HOV lanes to help drivers decide whether to use them."

### Input Schema Descriptions
Explain what parameters are required and their purpose.

**Templates:**
- No parameters: "Input parameters to retrieve all [entity type] across [scope] (none required)."
- Single entity: "Input parameters to retrieve a specific [entity type] by [identifier]."
- Filtered search: "Input parameters to search [entity type] by [criteria] for [purpose]."

### Input Field Descriptions
Describe individual parameters with their purpose and examples. Include a real example for every field at the end of the first sentence in parentheses; add a second sentence for usage guidance or cross-references.
Implementation note: Fill in the cross-reference sentence during the Integration Phase; leave it blank in earlier phases.

**Template:**
> "A [parameter type] as [data type] for [purpose] (e.g., [example])."

**Examples:**
- "A vessel identifier as an integer for retrieving specific ferry vessel information (e.g., '1' for Cathlamet)."
- "A trip date in YYYY-MM-DD format for ferry schedule lookups (e.g., '2025-10-01')."

### Output Schema Descriptions
Explain what data is returned, including the top-level container type and typical cardinality, and its business value.

**Template:**
> "Returns [container] of [entity type] including [key data] for [use case] (typically [cardinality]). [Business context]. [Data freshness]."

**Examples:**
- "Returns an array of vessel position records including current location, speed, and heading for passenger tracking and arrival predictions (typically dozens). Real-time data (updates about every X minutes)."
- "Returns an array of bridge clearance records including height restrictions and location details for commercial vehicle routing (varies by route). Data updates infrequently."

### Output Field Descriptions
Use the **flexible 1–3 sentence approach**: First sentence describes the field and ends with a real example in parentheses; second sentence provides business context or cross-references, and an optional third clarifies complex edge cases.
Implementation note: Fill in the cross-reference sentence during the Integration Phase; leave it blank in earlier phases.

**Template:**
> "The [entity]'s [field purpose] as [data type] (e.g., [example]). [Business context or cross-reference as separate sentence]."

- **Examples:**
- "The vessel's unique identifier as an integer (e.g., 1 for Cathlamet). Use this with wsf-vessels/vesselBasicsById to fetch detailed vessel information."
- "The terminal's latitude coordinate in decimal degrees (e.g., '47.821539' for Seattle area). Use this for map positioning and distance calculations."

**Critical Cross-Reference Format:**
- **Use exact endpoint function names**: `wsf-vessels/vesselBasicsById` (not `wsf-vessels/vesselBasics`)
- **Common correct patterns**:
  - `wsdot-traffic-flow/getTrafficFlow` (not `wsdot-traffic-flow/flowData`)
  - `wsdot-travel-times/getTravelTimes` (not `wsdot-travel-times/travelTimes`) 
  - `wsdot-highway-alerts/getAlerts` (not `wsdot-highway-alerts/alerts`)
- **Always use '/functionName'** never generic names

## Common Field Types

### Identifiers
**Simple IDs**: "The [entity]'s unique identifier as [type] (e.g., [example]). Use this with [api]/[endpoint] to fetch related information."
**Complex IDs**: "The bridge's two-part identifier combining route and sequence number (e.g., '520/36.8P'). This format helps identify specific bridge locations along highway routes."

### Dates and Times
**Simple timestamps**: "The time when [event] occurred, in UTC."
**Business dates**: "The trip date in YYYY-MM-DD format following WSF sailing day logic (3:00 AM to 2:59 AM next day). Use this date format when querying ferry schedules and fares."

### Coordinates
**Basic coordinates**: "The [entity]'s [coordinate type] coordinate in decimal degrees (e.g., [example]). Use this for map positioning and distance calculations."
**With context**: "The terminal's latitude coordinate in decimal degrees for map display (e.g., '47.821539' for Seattle area). Combine with longitude for precise location mapping."

### Amounts and Values
**Simple amounts**: "The [value type] in [units] for [purpose] (e.g., '$3.50' for $3.50). Use this for cost calculations and user display."
**Calculated values**: "The fare amount in USD excluding promotional discounts (e.g., '$15.50' for $15.50). Combine with discount information for final pricing."
**Time values with edge cases**: "The wait time in minutes (e.g., '5', '35', '-1' for closed). Use this to compare crossing options and choose the fastest route."

### Status and Enums
**Simple enums**: "The [entity]'s [purpose] indicating [meaning] (e.g., '[values]'). Use this to display appropriate status information to users."
**Complex enums**: "The fare total type indicating trip leg (1=Depart, 2=Return, 3=Either, 4=Total). Use this to organize fare calculations and display appropriate pricing to passengers."

## Cross-Reference Guidelines
## Data Freshness Guidance
-### Example Formatting Rules
- **Numbers**: unquoted (e.g., 1, 47.6019)
- **Strings**: single-quoted (e.g., 'Cathlamet', '2025-09-15T14:23:45Z', '$3.50')
- **Booleans/null**: unquoted true, false, null
- **Collections**: JSON-like where helpful (e.g., [1, 2, 3], { key: 'value' })

When writing schema-level descriptions, include a data freshness clause using these defaults:
- **WSDOT endpoints (generally static)**: "Data updates infrequently."
- **WSF endpoints with cache metadata**: "Data updates infrequently (use cacheFlushDate for the last-updated time)."
- **Real-time feeds** (e.g., weather, toll rates, traffic alerts, vessel positions): "Real-time data (updates about every X seconds/minutes)." If the update interval is documented, include it; otherwise, leave "X" for the user to specify later.


### When to Include Cross-References
- **Specific endpoint relationships**: When data from one endpoint is used as input for another
- **Workflow guidance**: When endpoints are designed to work together
- **Discovery purposes**: When related data provides additional context

### Cross-Reference Format
Use as a final sentence or appended clause with specific guidance using exact function names (typically the last sentence). Apply these rules to both field and endpoint descriptions. The canonical source of function names is the `id` field in `src/clients/**` (format: `api:endpoint`); convert to `api/endpoint` when writing documentation. You may either:
 - Write a single final sentence that lists multiple references with "or" when appropriate (e.g., "Use with [api1]/[endpointA] to get A, or with [api1]/[endpointB] to get B.")
 - Write multiple short final sentences, especially when crossing API boundaries (e.g., "Use with [api1]/[endpointA] to get A. Use with [api2]/[endpointY] to get Y.")

**Format Requirements:**
1. **Timing**: Add cross-references only in the Integration Phase  
2. **Placement**: Put cross-references at the end—final sentence or appended clause  
3. **No embedding**: Do not insert mid-sentence cross-references  
4. **Verb choice**: Prefer "Use with X to do Y" for sequential flows (A output → B input). Reserve "Combine with X to do Y" for true A+B→C combinations.

**Good:**
> "The terminal's unique identifier as an integer (e.g., '7'). Use this to get arriving terminals. Use with wsf-schedule/terminalMates to find connecting routes and with wsf-fares/terminalCombo to calculate fares."

**Avoid:**
> "This relates to terminal information and schedule data."  
> "Use this to display crossings on maps via wsdot-traffic-flow/getTrafficFlow..." (#WRONG EMBEDDING)
> "Binary indicator showing lane direction via wsdot-travel-times/getTravelTimes" (#WRONG PATTERN)

**Critical: Use Exact Function Names**
- ✅ `wsdot-traffic-flow/getTrafficFlow` (not `wsdot-traffic-flow/flowData`)
- ✅ `wsdot-travel-times/getTravelTimes` (not `wsdot-travel-times/travelTimes`)
- ✅ `wsdot-highway-alerts/getAlerts` (not `wsdot-highway-alerts/alerts`)
- ✅ `wsdot-bridge-clearances/getBridgeClearances` for vehicle restrictions
- ✅ `wsf-vessels/vesselBasicsById` for vessel details
- ✅ `wsf-terminals/terminalBasicsById` for terminal information

**Finding Cross-Reference Opportunities:**
- **Review API Index**: Check `docs/getting-started-cli.md` section "📊 Available APIs" 
- **Common Integration Patterns**:
  - Traffic conditions: `wsdot-traffic-flow/getTrafficFlow`
  - Travel calculations: `wsdot-travel-times/getTravelTimes`
  - Travel alerts: `wsdot-highway-alerts/getAlerts`
  - Vehicle restrictions: `wsdot-bridge-clearances/getBridgeClearances`
  - Ferry routes: `wsf-vessels/vesselBasicsById`, `wsf-vessels/vesselAccommodations`, `wsf-terminals/terminalBasicsById`

### Cross-Reference Timing
Add cross-references during the **Integration Phase** after completing all other descriptions. This ensures comprehensive understanding of how endpoints work together.

## Quality Guidelines

### Readability Standards
- **Natural language**: Write as if speaking to a colleague
- **Active voice**: Use declarative statements, not passive constructions
- **Appropriate length**: 1-2 sentences for simple fields, 2-3 for complex ones
- **Clear examples**: Use realistic values that aid understanding

### Consistency Standards
- **Terminology**: Use consistent domain terms throughout
- **Format**: Follow established patterns for similar field types
- **Cross-references**: Use proper `[api]/[endpoint]` format
- **Examples**: Place at end of first sentence in parentheses

### Business Context Standards
- **Real-world meaning**: Explain what the data represents in practice
- **Usage guidance**: Explain when and how to use the information
- **Relationships**: Connect related endpoints and data
- **Domain knowledge**: Include relevant business logic and rules

## Success Criteria

Good API documentation should:
- **Enable discovery**: Help both humans and AI agents find relevant endpoints
- **Provide context**: Explain business purpose and real-world meaning
- **Guide usage**: Show how to use data effectively
- **Connect relationships**: Link related endpoints and data
- **Use natural language**: Be readable and conversational
- **Include practical examples**: Show realistic usage scenarios

The goal is documentation that transforms cryptic technical descriptions into clear, actionable guidance that serves both human developers and AI agents through rich, discoverable descriptions with clear business context.

## Agent File Naming Convention

When multiple agents work on the same API independently, use agent-specific file extensions to distinguish their work. Agents must always create/edit agent-suffixed files and must not modify canonical unsuffixed files:

### File Naming Pattern
- **Agent Alice**: `*.alice.ts`, `*.alice.json`
- **Agent Bob**: `*.bob.ts`, `*.bob.json`  
- **Agent Charlie**: `*.charlie.ts`, `*.charlie.json`

### Examples
```bash
# Input schemas
inputSchemas.alice.ts
inputSchemas.bob.ts

# Output schemas  
outputSchemas.alice.ts
outputSchemas.bob.ts

# Endpoint descriptions
endpointDescriptions.alice.json
endpointDescriptions.bob.json
```
### Editing Rule
- Create and edit only agent-suffixed files (e.g., `*.alice.ts`, `*.bob.json`). Do not modify canonical unsuffixed files (e.g., `inputSchemas.ts`, `outputSchemas.ts`, `endpointDescriptions.json`). This preserves independence and avoids conflicts when multiple agents contribute.

This naming convention allows the user to:
- Compare different approaches from multiple agents
- Select the best elements from each implementation
- Maintain clear separation of independent work
- Easily identify which agent produced which files


