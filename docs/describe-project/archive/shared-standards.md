# Shared Standards for API Documentation

This document provides comprehensive standards and guidelines for agents working on API documentation enhancement. All agents must follow these standards consistently.

## Table of Contents

1. [Quick Start Checklist](#quick-start-checklist)
2. [File Naming and Structure](#file-naming-and-structure)
3. [Code Modification Rules](#code-modification-rules)
4. [Writing Standards](#writing-standards)
5. [Field Description Guidelines](#field-description-guidelines)
6. [Schema Documentation](#schema-documentation)
7. [Endpoint Descriptions](#endpoint-descriptions)
8. [Cross-Reference Guidelines](#cross-reference-guidelines)
9. [Data and Examples](#data-and-examples)
10. [Quality Control](#quality-control)
11. [Common Issues and Solutions](#common-issues-and-solutions)

---

## Quick Start Checklist

**Before starting work, ensure you understand:**

✅ **Critical Rules:**
- NEVER modify existing code except `.describe()` annotations
- NEVER modify JSDoc comments
- ALWAYS use exact API data with single quotes in examples
- ALWAYS add `.describe()` clauses to all schema definitions and all fields
- ALWAYS use aliased import paths (`@/apis/shared/`) not relative paths

✅ **File Naming:**
- Work files: `src/apis/[api-name]/working/[file-type].[agent-name].[extension]`
- Cross-references: Use client function names like `api-name/function-name`

✅ **Writing Style:**
- Business context first, technical details second
- Plain English, conversational tone
- Active voice throughout
- Focus on real-world meaning and purpose

---

## File Naming and Structure

### Work-in-Progress Files
All agent work goes in the `working/` subdirectory:

```
src/apis/[api-name]/working/[file-type].[agent-name].[extension]
```

**Examples:**
- `src/apis/wsdot-border-crossings/working/inputSchemas.alice.ts`
- `src/apis/wsdot-border-crossings/working/outputSchemas.alice.ts`
- `src/apis/wsdot-border-crossings/working/endpointDescriptions.alice.json`

### Client File References
For cross-references, use the client function names:

```
[api-name]/[function-name]
```

**Examples:**
- `wsdot-border-crossings/getBorderCrossings`
- `wsf-vessels/vesselBasicsById`

The cannonoical API names and function names are those contained in the relevant client definition files under src/clients. E.g.:

```
// src/clients/wsdot-commercial-vehicle-restrictions/getCommercialVehicleRestrictions.ts

/** Endpoint metadata for src/clients/wsdot-commercial-vgetCommercialVehicleRestrictions */
export const getCommercialVehicleRestrictionsMeta: EndpointDefinition<
  CommercialVehicleRestrictionsInput,
  CommercialVehicleRestrictions
> = {
  api: "wsdot-commercial-vehicle-restrictions",
  function: "getCommercialVehicleRestrictions",
  endpoint:
    "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson",
  ...
};
```

### Import Path Requirements

**Shared Schemas (Canonical):**
```typescript
import { schemaName } from "@/apis/shared/schemaName.original"; // Direct use
// OR
import { schemaName } from "@/apis/shared"; // If re-exported from index.ts
```

**API-specific Schemas:**
```typescript
import { schemaName } from "@/schemas/[api-name]/schemaName.zod";
```

**❌ NEVER:**
- Use relative paths (e.g., `../shared/schema.alice`)
- Import agent-suffixed files (e.g., `roadwayLocationSchema.Alice.ts`)
- Reference `.original` files in working code (except shared schemas)

### Final File Structure
```bash
src/apis/[api-name]/
├── inputSchemas.original.ts           # Original (renamed)
├── outputSchemas.original.ts          # Original (renamed)
├── inputSchemas.final.ts              # Editor synthesis
├── outputSchemas.final.ts             # Editor synthesis
├── endpointDescriptions.final.json    # Editor synthesis
├── domain-analysis.final.md           # Editor synthesis
└── working/                           # All WIP files
    ├── inputSchemas.alice.ts
    ├── outputSchemas.alice.ts
    ├── endpointDescriptions.alice.json
    └── [... other agent files ...]
```

---

## Code Modification Rules

### CRITICAL: What Agents Can and Cannot Modify

**✅ PERMITTED:**
1. **`.describe()` annotations**: Add or modify for narrative documentation
2. **`domain-analysis.[agent].md` files**: Create comprehensive domain analysis
3. **`endpointDescriptions.[agent].json` files**: Create high-level endpoint descriptions

**❌ STRICTLY PROHIBITED:**
- Modifying existing JSDoc comments
- Altering function bodies or variable declarations
- Changing import statements
- Adding custom metadata or new JSDoc blocks
- Renaming schema variables
- Any code structure changes
- Running npm build

**Preserve original code integrity at all costs.**

---

## Writing Standards

### Core Principles

**Business Context First**
- Explain real-world meaning and purpose
- Connect to business workflows and use cases
- Answer "Why would someone use this?"

**Plain English**
- Natural, conversational language
- Write as if explaining to a colleague
- Avoid technical jargon without explanation
- Use active voice throughout

**Literal Data Usage**
- Use exact API response data with single quotes
- Preserve original formats exactly
- Include anomalous values with explanatory labels
- No data transformation permitted

**Conciseness and Value**
- Don't be "Captain Obvious" - avoid filler words or descriptions for obvious points
- Focus on decision-making value
- Write for sophisticated developers and agents
- Be specific and actionable

**Consistency**
- Use domain-appropriate terms consistently
- Maintain parallel structure for related fields
- Apply templates for similar field types

**Factual Grounding**
- Base descriptions on WSDOT API specification
- Use actual API data and website information
- Apply common sense, but don't speculate
- Prefer existing WSDOT language as starting point

---

## Field Description Guidelines

Field descriptions must follow this structure:

1. **Lead Sentence**: A lead sentence that provides a concise description of what the field represents and its data type. This is usually described as a property of a specific entity, such as "... for this vessel" or "... for this border crossing." This is always required.

2. **E.g. Example Sentence**: An "E.g." sentence that provides one, two, or three examples of the literal data returned by the API (always enclosed in single quotes) plus a description of what entity or context that value relates to. Guidance:

  a. Do not include this sentence for cases below, such as dates, where an concrete example is obvious and would not provide additional context.

  b. Provide one example for obvious cases, like typical ID values. For example (as a TerminalID field): "E.g., '7' for Seattle."

  c. Provide multiple examples where the examples are different in kind and more examples would provide additional context, such as ones that represent different types of objects or edge cases. For example (with border crossing wait times): "E.g., '5' for a five-minute wait time, or '-1' if the lane is closed or unavailable."

  Always look for undocumented edge cases in the data, such as "-1" or "null." If found, provide an explanation about the context for that edge case. However, do not speculate about the reasons for those edge cases, unless they are obvious. For example, use "E.g., "[some-value] for [describe], or null if unavailable." Expand on why it could be null or some other edge case if that is obvious from the surrounding context or documented.

  In complex cases, these examples may require one or two additional sentences of context. For example, see BorderCrossinglocation below.

3. **Further description of data**: Up to two additional sentences that provide further explanation of what this data represents, if that is nonobvious from the context and further explanation is required. Avoid unnecessary, obvious descriptions. Keep it simple.

4. **Business context**: One concluding sentence to explain the business context and purpose of this field, but only if that is nonobvious. For example, there is no need to explain that a standard "ID" field represents a unique ID to identify some entity in the system, that a "minimum bridge clearance" for a bridge represents the minimum safe clearance for a bridge, or that a last-updated date represents the time when the data was last updated.

Examples of 1, 2, and 3:

*borderCrossingDataSchema.CrossingName:*

Original description: 
"Common name of the crossing."

Revised description: 
"The common name for this border crossing lane, as a string. E.g., 'I5' for the main I-5 crossing, 'SR539Nexus' for the NEXUS lane at the SR 539 crossing, or 'SR543Trucks' for commercial vehicle lanes. ..." (Multiple classes of objects.)


*borderCrossingDataSchema.Time:*

Original description: 
"When the reading was taken."

Revised description: 
"The time when this border crossing lane's's reading was last updated, as a UTC date." (No example is needed for a generic date.)


*borderCrossingDataSchema.WaitTime:*

Original description: 
"Current time to cross border"

Revised description: 
"The estimated wait time to cross the border for this border crossing lane, in minutes. E.g., '5' for a five-minute wait time, or '-1' if the lane is closed or unavailable. ..."


*bridgeDataGISSchema.BridgeNumber:*

Original description: 
"A two-part identifier that has a unique set of up to 10 alphanumeric characters. The first part of the Bridge Number is the State Route associated with the bridge, either as a part of the route, or the route is under or adjacent to the bridge. The second part of the Bridge Number is the number or number and alpha character combination assigned to the bridge. If a Bridge is less than 20 feet in length, the sequence number is carried to the 100th (0.01)."
  
Revised description:
"A two-part unique ID for the bridge as a string. E.g., '5/650E' for a bridge along interstate I-5 with an identifier of 650E, or '12/348N' for a bridge along U.S. Route 12 with an identifier of 348N. The first part is the State Route identifier associated with the bridge, either as a part of the route, or the route under or adjacent to the bridge. The second part is an identifier assigned to the bridge." (A complex example that requires additional context about the meaning of the ID format, unlike a standard numerical ID.) 

*borderCrossingDataSchema.Location:*

Original description:
"Where the crossing is located."

Revised description:

"A RoadwayLocation object that indicates where this border crossing lane is located, including coordinates and highway information. E.g., detailed location data for 'I-5 General Purpose' and 'SR 543 Nexus Lane'. This field contains null for specialized lanes like Nexus or truck lanes that share location data with their main crossing (SR539Nexus, SR539Trucks). The null values indicate these lanes share physical infrastructure with the main crossing rather than having independent locations."


### Length Targets by Complexity

Do not follow these rules mechanically. Instead, direct the level of explanation to whether the field is obvious or complex:

- **Simple fields** (IDs, timestamps, coordinates): Typically 1 sentence plus example (only if needed) (50-150 chars)
- **Moderate complexity** (business logic, enums): Typically 2-3 sentences (150-400 chars)
- **High complexity** (domain-specific concepts): Typically 3-4 sentences (400-600 chars)


### Templates for Common Field Types

#### Identifiers
```
"The unique ID for [this entity], as a/an [type]. E.g., '[single-example] for [name or identifier].'"
"The unique ID for this terminal, as an integer. E.g., '3' for Bainbridge Island."
"The unique ID for this bridge, as a GUID. E.g., '035e8793-d467-4ac4-b38f-0f9602f89f6c' for BridgeNumber 12/348S."
```

#### Timestamps
```
"The [entity or event], as a UTC date." (No example needed.)
"The scheduled departure for this vessel, as a UTC date."
```

#### Coordinates
```
"The [latitude/longitude] of [this entity], in decimal degrees. E.g., '[coordinate]' for [location or entity]."
"The latitude of this bridge, in decimal degrees. E.g., '46.626058' for BridgeNumber 12/348S.
```

#### Amounts
```
"The [value-type] of/for [this entity], in [units]. E.g., '[example]' for [explanation]."
"The maximum vertical clearance for this bridge in inches, as a number. E.g., '193' for a bridge with maximum clearance of 16 feet and 1 inch."
"The maximum vertical clearance for this bridge in feet and inches, as a string. E.g., '16 ft 1 in' for a maximum clearance of 193 inches.
```

#### Boolean Flags
```
"Whether the [entity] is [condition]. I.e., 'true' if [describe-case], 'false' if [describe-case])." 
"Whether this vessel is at dock. I.e., 'true' if docked at a terminal, 'false' if at sea."
```

### Parallel language

Use parallel language between similar fields for related concepts:

VerticalClearanceMaximumInches: "The maximum vertical clearance for this bridge in inches, as a number. ..."
VerticalClearanceMaximumFeetInch: "The maximum vertical clearance for this bridge in feet and inches, as a string. ..."
VerticalClearanceMaximumInches: "The minimum vertical clearance for this bridge in inches, as a number. ..."
VerticalClearanceMinimumFeetInch: "The minimum vertical clearance for this bridge in feet and inches, as a string. ..."

Also use parallel language for equivalent examples and business-context explanations, if included.


## Schema Documentation

### CRITICAL Requirements

- **ALL schema definitions MUST have a detailed `.describe()` clause**
- **DO NOT modify existing JSDoc comments** - preserve original WSDOT documentation
- **DO NOT add new JSDoc comments** - use `.describe()` annotations instead
- **Preserve original variable names** - do not rename schema variables

### Input Schema Templates

```typescript
// No parameters
"Input parameters to retrieve all [entity type] across [scope] (none required)."

// Single entity
"Input parameters to retrieve a specific [entity type] by [identifier]."

// Filtered search
"Input parameters to search [entity type] by [criteria] for [purpose]."
```

### Output Schema Templates

```typescript
"Returns [container] of [entity type] including [key data] for [use case] (typically [cardinality]). [Business context]. [Data freshness]."
```

### Data Freshness Documentation

**MANDATORY for all endpoint descriptions:**

- **Default for WSDOT APIs**: `'Data updates infrequently.'`
- **Real-time/Dynamic APIs**: `'Data is real-time.'` (when no specific cadence documented)
- **Specific cadence documented**: `'Data updates every [X] minutes.'` (only if officially documented)
- **No inferences**: Don't state specific update cadences unless officially documented
- **Consistency**: Apply the same statement across all files for the API

### Schema Documentation Examples

#### ✅ CORRECT
```typescript
/**
 * Schema for GetBorderCrossings input parameters
 */
export const getBorderCrossingsInputSchema = z.object({}).describe(
  "Input parameters to retrieve all border crossing wait times across Washington State (none required)."
);
```

#### ❌ WRONG
```typescript
/**
 * Input parameters to retrieve all border crossing wait times across Washington State (none required).
 * This endpoint provides comprehensive wait time data for all active US-Canada border crossings.
 */
export const getBorderCrossingsInputSchema = z.object({});
```

---

## Endpoint Descriptions

### Format and Structure

The `endpointDescriptions.[agent].json` file **MUST** contain a single JSON object with:
- **Key**: Endpoint's canonical name (e.g., `api-name/endpoint-name`)
- **Value**: Single, plain-text narrative string (maximum 3-5 sentences)

### Required Content Elements

**Synthesize these into a coherent narrative:**

1. **High-Level Function**: What the endpoint does
2. **Business Purpose/Value**: Why it's important, real-world benefits
3. **Target Users**: Who primarily benefits
4. **Key Use Cases**: Specific scenarios where it's used
5. **Cross-References**: Related APIs/endpoints with their purpose

### Template Structure

```
"[High-level function]. [Business purpose/value]. Target users include [list]. Key use cases are [list]. [Cross-references naturally integrated]."
```

### Cross-Reference Integration

Cross-references **MUST** be integrated naturally into the narrative string:

```
"Shows current wait times at Canadian border crossings to help travelers choose the fastest route. Use with wsdot-traffic-flow/getTrafficFlow to get comprehensive travel conditions and with wsdot-highway-alerts/getAlerts to identify potential delays."
```

---

## Cross-Reference Guidelines

### Placement Rules

**CRITICAL**: All cross-references **MUST ONLY** appear in `endpointDescriptions.[agent].json` files. They **MUST NOT** appear in `.describe()` annotations within schema files.

### Verb Usage

- **"Use with"**: For sequential flows (A output → B input)
- **"Combine with"**: For true A+B→C combinations
- **Multiple references**: Use "or" for alternatives, separate sentences for different APIs

### Format Requirements

```
"[Description]. Use this with [api]/[endpoint] to [purpose] and with [api2]/[endpoint2] to [purpose2]."
```

### Common Integration Patterns

- **Traffic conditions**: `wsdot-traffic-flow/getTrafficFlow`
- **Travel calculations**: `wsdot-travel-times/getTravelTimes`
- **Travel alerts**: `wsdot-highway-alerts/getAlerts`
- **Vehicle restrictions**: `wsdot-bridge-clearances/getBridgeClearances`
- **Ferry routes**: `wsf-vessels/vesselBasicsById`, `wsf-terminals/terminalBasicsById`

### Examples

#### ✅ GOOD
```
"The vessel's unique identifier as an integer (e.g., '1'). Use this with wsf-vessels/vesselBasicsById to fetch detailed vessel information."
```

#### ❌ AVOID
```
"This relates to terminal information and schedule data."
"Binary indicator showing lane direction via wsdot-travel-times/getTravelTimes"
```

---

## Data and Examples

### Example Decision Tree

**Use SINGLE example when:**
- Values are the same type/format
- Examples don't illustrate different categories
- Field represents homogeneous data (IDs, measurements, timestamps)

**Use MULTIPLE examples when:**
- Examples show **different categories** within the same field
- Examples illustrate **different states or conditions**
- Examples demonstrate **format variations** users need to understand
- Field represents **enum-like values** with distinct meanings

**Quality Test**: Ask "Do these examples teach the user something different about the field's possible values or business meaning?" If no, use one example.

### Formatting Rules

- **Always use single quotes** for all data examples
- **Preserve original formats** exactly (e.g., 'true', '35', 'null')
- **Include anomalous values** with explanatory labels
- **No data transformation** permitted

### Example Formats by Field Type

**Multiple Examples (Different Categories):**
```
"(e.g., 'I' for increasing milepost direction, 'D' for decreasing milepost direction, 'B' for both directions)"
```

**Single Examples (Homogeneous Data):**
```
"(e.g., '174' inches)"
"(e.g., '47.961343' for Seattle area bridge location)"
```

**Edge Cases:**
```
"(e.g., '15' for normal wait, '-1' for lane closed)"
```

### CRITICAL: Edge Case Documentation

**MANDATORY**: Actively look for and document edge cases - unusual values representing special conditions:

- **Magic numbers**: Values like `-1`, `0`, `999` indicating special states
- **Special strings**: Values like 'CLOSED', 'N/A', 'UNKNOWN' representing conditions
- **Format**: Use pattern: `(e.g., 'normal value' for normal condition, 'edge value' for special condition)`
- **Business context**: Explain what the edge case means in real-world terms

---

## Quality Control

### Context Distribution Strategy

**Endpoint Level**: Overall API purpose, target users, primary workflows  
**Schema Level**: Dataset characteristics, data patterns  
**Field Level**: Specific field purpose, format distinctions, edge cases

**Avoid Redundancy**: Don't repeat obvious API context in every field description.

### Length Management for Scale (1000+ Fields)

- **Pattern consolidation**: Create reusable description patterns for similar field types
- **Essential-only content**: Focus on decision-making value, eliminate redundancy
- **Tiered detail**: Core description + optional extended context for complex cases

### Data Fetching Standards

- **Always use `--limit 500`** for all data fetching commands
- This prevents context overflow on APIs with many endpoints
- Provides representative sample for documentation
- Monitor context usage throughout work

### Large API Strategy

For APIs with >10 endpoints:
1. Process 3-4 endpoints per session
2. Complete full phase for those endpoints
3. Move to next batch and repeat
4. Final integration phase combines all work

---

## Common Issues and Solutions

### Missing .describe() Annotations
**Problem**: Adding JSDoc comments instead of `.describe()` annotations  
**Solution**: ALWAYS add `.describe()` clauses to schema definitions, preserve original JSDoc comments  
**Do Not**: Modify existing JSDoc comments or rename schema variables

### Over-Engineering Simple Fields
**Problem**: Writing too much for obvious fields  
**Solution**: Use templates for simple fields, focus on business context for complex ones

### Missing Business Context
**Problem**: Technical descriptions without real-world meaning  
**Solution**: Always explain what the data means in practice

### Inconsistent Examples
**Problem**: Examples don't match actual API data  
**Solution**: Use only literal data from API responses with single quotes

### Generic Descriptions
**Problem**: Descriptions like "A string value" or "An identifier"  
**Solution**: Always include business context and real-world meaning

### Incorrect Endpoint Names
**Problem**: Using generic names instead of exact function names  
**Solution**: Always use exact endpoint function names from `src/clients/**`

### Embedded Cross-References
**Problem**: Adding cross-references mid-sentence in schema files  
**Solution**: Only add cross-references in `endpointDescriptions.json` files

### Non-Actionable Cross-References
**Problem**: Generic references like "This might be useful for route planning"  
**Solution**: Provide specific, actionable guidance with exact endpoint names

### Data Fetching Failures
**Problem**: `fetch-dottie` returns no data  
**Solution**: Stop work and request assistance  
**Do Not**: Use curl, direct HTTP requests, or workarounds

---

**Next Steps**: Review this document thoroughly, then proceed to the appropriate phase guide based on your current work stage.