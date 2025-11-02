# Documentation Style Guide

## Overview

This style guide describes the documentation format implemented for the WSDOT/WSF API project. It covers the sources of information used, the style and format of endpoint group documentation, and the style and format of individual Zod schema documentation.

## Purpose

This guide enables future agents and developers to:
- Understand how documentation was created
- Maintain consistency with existing documentation
- Recreate the same format for new endpoints and schemas
- Understand the underlying sources and rationale

## Part A: Sources of Information

### 1. Official API Documentation

**Location**: `docs/references/`
- **API Specifications**: `docs/references/api-specs/[api-name].md`
- **Endpoint Specifications**: `docs/references/endpoint-specs/[api-name]/[endpoint-name].md`

**Usage**: 
- Provides initial understanding of API structure and purpose
- **Important Note**: Official documentation may contain errors or be outdated
- **Canonical Source**: Actual API responses take precedence over official documentation

### 2. Actual API Responses

**Tool**: `npx fetch-dottie [api-name]:[function-name] --limit 10`

**Purpose**:
- Extract concrete examples for descriptions
- Identify edge cases (null values, magic values, empty arrays)
- Validate schema accuracy against actual behavior
- Discover discrepancies between documentation and reality

**Critical Requirement**: All examples in documentation must come from actual API responses, never fabricated.

### 3. Web Research

**Tool**: Brave search via MCP tools (when available)

**Purpose**:
- Understand business context for WSDOT and WSF operations
- Clarify unclear terms or concepts
- Research practical use cases and applications
- Understand data freshness and update cycles

**Note**: Use web research to supplement official documentation, not replace actual API data analysis.

### 4. Existing Codebase

**Files Reviewed**:
- Endpoint group files: `src/apis/[api-name]/[endpoint-group]/[endpoint-group].endpoints.ts`
- Input schemas: `src/apis/[api-name]/[endpoint-group]/[endpoint-group].input.ts`
- Output schemas: `src/apis/[api-name]/[endpoint-group]/[endpoint-group].output.ts`
- Shared schemas: `src/apis/shared/` or `src/apis/[api-name]/shared/`

**Purpose**:
- Understand current implementation patterns
- Maintain consistency with existing documentation
- Identify shared schemas and dependencies

### 5. Best Practices Research

**Location**: `documentation-project/api-documentation-best-practices-report.md`

**Key Guidelines**:
- Content length standards (endpoint: 50-150 words, field: 15-40 words)
- Business-first language approach
- Narrative-first content strategy
- Dual-purpose optimization (human + agent)

## Part B: Endpoint Group Documentation Format

### File Structure

**Location**: `src/apis/[api-name]/[endpoint-group]/[endpoint-group].endpoints.ts`

**Example Structure**:
```typescript
export const [endpointGroup]Group: EndpointGroup = {
  name: "[endpoint-group-name]",
  documentation: {
    resourceDescription: "...",
    businessContext: "...",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "[CACHE_STRATEGY]" as const,
  endpoints: {
    [functionName]: {
      function: "[functionName]",
      endpoint: "/[endpoint-path]",
      inputSchema: i.[inputSchema],
      outputSchema: o.[outputSchema] | z.array(o.[outputSchema]),
      sampleParams: { ... },
      endpointDescription: "...",
    } satisfies EndpointDefinition<...>,
  },
};
```

### Field Documentation Standards

#### resourceDescription

**Format**: Two-sentence framework

**Template**:
```
Each [ResourceName] item represents [primary data category]. [First sentence with 
context and key fields]. [Second sentence with additional context, data source, 
or usage].
```

**Requirements**:
- Start with "Each [ResourceName] item represents..."
- First sentence: Describe what data represents, including key field categories
- Second sentence: Additional context about data source, usage patterns, or business implications
- Word count: 25-50 words (simple resources), 50-75 words (complex resources)
- Include key field categories mentioned in the description

**Examples**:
- "Each VesselLocation item represents real-time vessel tracking data for Washington State Ferries. These include current position (latitude and longitude), speed and heading information, whether or not the vessel is at dock, departure and arrival terminal details, and estimated time of arrival."
- "Each Alert item represents real-time traffic incidents, road conditions, construction, and other events affecting Washington State highways. These include location details, impact levels, start/end times, and estimated duration."

#### businessContext

**Format**: Action-oriented, capability-focused

**Template**:
```
Use to [primary action] by providing [key data elements] for [specific purpose]. 
[Optional: Secondary capability] for [secondary purpose].
```

**Requirements**:
- First sentence: "Use to [primary action] by providing [key data elements] for [specific purpose]."
- Optional second sentence: "[Secondary capability] for [secondary purpose]."
- Word count: 25-50 words total (1-2 sentences)
- No section headers or labels
- Focus on practical capabilities and specific actions
- Use active voice with strong action verbs (Use to, Check, Plan, Monitor, Determine, etc.)
- Reference actual data fields and their purposes

**Examples**:
- "Use to track real-time vessel positions and calculate arrival times by providing GPS coordinates, speed/heading data, and terminal departure/arrival information for WSF fleet monitoring. Determine current trip status, including start terminal, destination terminal, scheduled departure, at-dock status and ETA for this trip."
- "Use to monitor traffic incidents and plan alternate routes by providing real-time highway alerts, incident locations, and impact assessments for Washington State roads."

#### endpointDescription

**Format**: Clear multiplicity, data type, and scope

**Template**:
```
Returns [multiplicity] of [DataType] for [scope].
```

**Requirements**:
- Multiplicity: Clear indication (single item, array, paginated list)
- DataType: Specific object type being returned
- Scope: Data range (all vessels, specific terminal, etc.)
- Word count: 15-25 words per endpoint description
- Consistency: Use consistent terminology across related endpoints

**Examples**:
- "Returns multiple VesselLocation objects for all vessels in the fleet."
- "Returns a VesselLocation object containing real-time position and status information for the specified vessel."
- "Returns an array of Alert objects for all current highway incidents."
- "Returns a single Alert object for specified AlertID."

### Optional Fields

**updateFrequency**: Only populate if already exists or specifically required
**relatedEndpoints**: Only populate if already exists or specifically required
**usageExamples**: Only populate if already exists or specifically required

**Important**: Do not add fields beyond the existing scope unless explicitly required.

## Part C: Zod Schema Documentation Format

### File Structure

**Location**: 
- Input schemas: `src/apis/[api-name]/[endpoint-group]/[endpoint-group].input.ts`
- Output schemas: `src/apis/[api-name]/[endpoint-group]/[endpoint-group].output.ts`

### Schema-Level Descriptions

#### Input Schema Template

**Format**:
```
"[Action verb] [resource/operation] [optional: scope or constraints], returning 
[output description]. [Optional: Additional context about when to use or what 
it enables]."
```

**Requirements**:
- Start with action verb (Retrieves, Filters, Gets, etc.)
- Describe what the operation does
- Specify what it returns
- Include concrete examples from actual API responses
- Word count: 25-75 words

**Example**:
```typescript
export const getAlertsSchema = z.object({...}).describe(
  "Retrieves highway alerts matching optional filter criteria, returning array 
  of Alert objects. Use for finding specific incidents affecting travel routes 
  for route planning applications."
);
```

#### Output Schema Template

**Format**:
```
"Represents [data category] containing [key field categories], with [optional: 
data characteristics]. E.g., [concrete example from actual data]. [Optional: 
Business purpose or primary use case]. [Optional: Data freshness or update 
characteristics]."
```

**Requirements**:
- Start with "Represents [data category]"
- List key field categories
- Include concrete example from actual API responses
- Mention business purpose or use case
- Optional: Include data freshness information
- Word count: 25-75 words (simple), 50-100 words (complex)

**Example**:
```typescript
export const vesselLocationsSchema = z.object({...}).describe(
  "Represents vessel location data including GPS coordinates, terminal 
  assignments, speed/heading, and ETA information. E.g., vessel 'Chelan' at 
  position 48.596673, -122.94317 departing Orcas Island terminal. Used for 
  real-time vessel tracking and arrival time calculations. Updates every 5 
  seconds."
);
```

### Field-Level Descriptions

#### Preferred Format

**Standard Format**:
```
"[Description of business purpose], as a [business unit type]. E.g., '[concrete 
example]' for [context], '[another example]' for [another context]. [Optional: 
Additional business context or use case]."
```

**Key Requirements**:
- Start with business purpose description
- Specify unit type using business terminology (not data types)
- Include concrete examples from actual API responses
- Examples should be specific and contextualized
- Add business context about when/why to use the field
- Word count: 15-40 words (standard), up to 60 words (complex)

#### Business Unit Type Guidelines

Use business/domain terminology rather than programming data types:

**Date/Time Fields:**
- ✅ "as a UTC datetime" (preferred - accessible and precise)
- ✅ "as a .NET datetime string" (when specifically .NET format `/Date(timestamp)/`)
- ✅ "in ISO datetime format" (when ISO 8601 format strings)
- ✅ "as minutes since midnight"
- ❌ Avoid "as a UTC timestamp" (timestamp implies Unix epoch number)
- ❌ Avoid "as an ISO 8601 datetime" (too technical)
- ❌ Avoid "as a datetime string" (use "in ISO datetime format" instead)

**Geographic Fields:**
- ✅ "in decimal degrees" (not "as a number" or "as decimal degrees")
- ✅ "as a decimal" (for decimal milepost values)
- ✅ "as a milepost marker"

**Identifier Fields:**
- ✅ "as an integer ID" (not "as a number")
- ✅ "as a unique vessel ID"
- ✅ "as a route identifier"
- ✅ "as a bridge identifier"
- ✅ "as a terminal code"

**Measurement Fields:**
- ✅ "as knots"
- ✅ "as degrees"
- ✅ "as minutes"
- ✅ "as cents"
- ✅ "in feet and inches"

**Status/Enum Fields:**
- ✅ "as a status code"
- ✅ "as a boolean"
- ✅ "as an operational status"
- ✅ "as a priority level"

**Text Fields:**
- ✅ "as a human-readable description"
- ✅ "as a terminal abbreviation"
- ✅ "as a route designation"

#### Field Description Templates

**Template 1: Simple Identifier/Name Field**
```
"[Business purpose], as a [business unit type]. E.g., '[example]' for [context]. 
[Optional: How it's used]."
```

**Template 2: Field with Multiple Examples**
```
"[Business purpose], as a [business unit type]. E.g., '[example1]' for [context1], 
'[example2]' for [context2]. [Optional: Business implications]."
```

**Template 3: Complex Field with Context**
```
"[Business purpose], as a [business unit type]. E.g., '[example]' for [context]. 
[Technical details or format]. [When/why this field is used or what it enables]."
```

**Template 4: Enum/Union Fields**
```
"[Business purpose], as a [business unit type]. Valid values: [value1] ([meaning1]), 
[value2] ([meaning2]). E.g., '[example1]' indicates [scenario1], '[example2]' 
indicates [scenario2]. [When each value applies or business implications]."
```

**Template 5: Nullable/Optional Fields**
```
"[Business purpose], as a [business unit type]. E.g., '[example]' when [condition], 
null when [null condition]. [Business implications of null vs. present value]."
```

### Examples from Actual Codebase

#### Schema-Level Example

```typescript
export const vesselLocationsSchema = z
  .object({
    // ... fields ...
  })
  .describe(
    "Represents vessel location data including GPS coordinates, terminal " +
    "assignments, speed/heading, and ETA information. E.g., vessel 'Chelan' at " +
    "position 48.596673, -122.94317 departing Orcas Island terminal. Used for " +
    "real-time vessel tracking and arrival time calculations. Updates every 5 " +
    "seconds."
  );
```

#### Field-Level Examples

```typescript
VesselID: z
  .number()
  .int()
  .describe(
    "Unique vessel identifier, as an integer ID. E.g., '2' for vessel Chelan, " +
    "'38' for vessel Yakima. Used as primary key for vessel location tracking."
  ),

Latitude: z
  .number()
  .describe(
    "Vessel GPS latitude coordinate, in decimal degrees. E.g., '48.529468' for " +
    "vessel Chelan near Friday Harbor, '48.548502' for vessel Yakima near " +
    "Anacortes."
  ),

Speed: z
  .number()
  .describe(
    "Vessel speed over ground, as knots. E.g., '15.7' for vessel Chelan in " +
    "transit, '0' when vessel is docked like Suquamish. Used for voyage progress " +
    "tracking and arrival time calculations."
  ),

AtDock: z
  .boolean()
  .describe(
    "Vessel docked status, as a boolean. E.g., true for docked vessels like " +
    "Suquamish and Puyallup, false for vessels in transit like Chelan and " +
    "Yakima. Determines whether vessel is currently at terminal or underway."
  ),

LeftDock: zDotnetDate()
  .nullable()
  .describe(
    "Timestamp when vessel last departed from dock, as a UTC datetime. E.g., " +
    "'2025-09-08T01:20:00.000Z' for vessel Chelan that left Friday Harbor at " +
    "6:20 PM, null when vessel is currently docked. Used to calculate voyage " +
    "duration and departure delay tracking."
  ),
```

## Quality Checklist

### Endpoint Group Documentation

- [ ] resourceDescription follows two-sentence framework
- [ ] resourceDescription word count within guidelines (25-50 simple, 50-75 complex)
- [ ] businessContext follows canonical pattern (Use to [action] by providing [data])
- [ ] businessContext word count within guidelines (25-50 words)
- [ ] All endpoint descriptions follow standardized pattern
- [ ] Endpoint description word count within guidelines (15-25 words)
- [ ] Terminology is consistent across related endpoints
- [ ] Key field categories are mentioned in resource descriptions

### Zod Schema Documentation

- [ ] Schema-level description follows template with concrete examples
- [ ] Field descriptions use preferred format: "[description], as a [business unit]. E.g., '[example]'"
- [ ] All examples extracted from actual API responses (fetch-dottie data)
- [ ] Business context included, not just technical details
- [ ] Examples are specific and contextualized
- [ ] Null values documented where they occur
- [ ] Magic values documented where they exist
- [ ] Consistent terminology with related schemas
- [ ] No boilerplate restatements of field names
- [ ] Word counts within guidelines (15-40 words for fields, 25-75 for schemas)
- [ ] Business unit types used (not data types)
- [ ] Schema validated against actual API responses

## Key Principles

1. **Actual Data is Canonical**: Official documentation may contain errors; actual API responses are always the source of truth
2. **Business-First Language**: Lead with business purpose, then technical details
3. **Example-Driven**: All examples must come from actual API responses
4. **Consistent Format**: Follow established templates and patterns
5. **Actionable Content**: Enable immediate implementation and decision-making
6. **Dual-Purpose**: Serve both human developers and AI agents effectively

This style guide ensures consistent, high-quality documentation that effectively serves both human developers and AI agents while maintaining accuracy and reducing maintenance overhead.

